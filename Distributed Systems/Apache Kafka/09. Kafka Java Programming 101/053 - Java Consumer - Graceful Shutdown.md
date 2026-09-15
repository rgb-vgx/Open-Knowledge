# Graceful Shutdown: Tắt Consumer Sạch Với WakeupException Và Shutdown Hook

Bài trước vòng `while (true)` đọc ngon, nhưng tắt bằng nút Stop là kill abrupt — lần join sau mất ~30s, log rebalance rối tung. Bài này bọc consumer trong shutdown hook chuẩn: `consumer.wakeup()` + `WakeupException` + `mainThread.join()` + `consumer.close()`. Đây là pattern bắt buộc cho mọi consumer production.

---

## 1. Concept: Vì Sao Không Thể `break` Vòng Poll?

`consumer.poll()` là blocking call — nó có thể đang chờ broker tới 1 giây. Không có cách nào từ thread khác "bẻ" vòng loop một cách an toàn ngoài cơ chế Kafka sinh ra cho việc này: `wakeup()`.

Luồng hoạt động:

1. JVM nhận tín hiệu shutdown (Ctrl+C, nút Stop, SIGTERM) → chạy **shutdown hook** bạn đã đăng ký bằng `Runtime.getRuntime().addShutdownHook()`.
2. Trong hook, gọi `consumer.wakeup()`. Đây là method duy nhất của `KafkaConsumer` an toàn để gọi từ thread khác.
3. Lần `poll()` đang chạy (hoặc lần kế tiếp) lập tức ném `WakeupException`.
4. Bạn `catch (WakeupException)` — đây là exception **dự kiến**, chỉ log `consumer is starting to shut down`, không coi là lỗi.
5. Khối `finally` gọi `consumer.close()` — đóng kết nối sạch, **commit offset** đã xử lý, gửi `LeaveGroup` để group rebalance ngay thay vì chờ timeout.
6. Hook gọi `mainThread.join()` để chờ main thread chạy xong `finally` rồi JVM mới thoát hẳn.

Hai `catch` riêng biệt là chủ ý: `WakeupException` (expected shutdown) vs `Exception` (unexpected — log error kèm stacktrace). Đừng gộp chung.

## 2. Code hoàn chỉnh

Duplicate `ConsumerDemo` thành `ConsumerDemoWithShutdown`:

```java
package io.conduktor.demos.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class ConsumerDemoWithShutdown {

    private static final Logger log = LoggerFactory.getLogger(ConsumerDemoWithShutdown.class.getSimpleName());

    public static void main(String[] args) {
        log.info("I am a Kafka consumer with graceful shutdown!");

        String groupId = "my-java-application";
        String topic = "demo_java";

        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "127.0.0.1:9092");

        // Nếu dùng Conduktor Playground: comment dòng trên, mở 4 dòng dưới
        // properties.setProperty("bootstrap.servers", "cluster.playground.cdkt.io:9092");
        // properties.setProperty("security.protocol", "SASL_SSL");
        // properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"...\" password=\"...\";");
        // properties.setProperty("sasl.mechanism", "PLAIN");

        properties.setProperty("key.deserializer", StringDeserializer.class.getName());
        properties.setProperty("value.deserializer", StringDeserializer.class.getName());
        properties.setProperty("group.id", groupId);
        properties.setProperty("auto.offset.reset", "earliest");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);

        // 1. Giữ reference tới main thread để hook join vào
        final Thread mainThread = Thread.currentThread();

        // 2. Đăng ký shutdown hook — chạy khi JVM nhận tín hiệu tắt
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                log.info("Detected a shutdown, let's exit by calling consumer.wakeup()...");
                consumer.wakeup();

                // Chờ main thread chạy xong try/catch/finally rồi mới cho JVM thoát
                try {
                    mainThread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        try {
            // 3. Subscribe + poll loop nằm TRONG try để hứng WakeupException
            consumer.subscribe(Arrays.asList(topic));

            while (true) {
                ConsumerRecords<String, String> records =
                        consumer.poll(Duration.ofMillis(1000));

                for (ConsumerRecord<String, String> record : records) {
                    log.info("Key: " + record.key() + ", Value: " + record.value());
                    log.info("Partition: " + record.partition() + ", Offset: " + record.offset());
                }
            }

        } catch (WakeupException e) {
            // 4a. Expected — shutdown chủ động, không phải lỗi
            log.info("Consumer is starting to shut down...");

        } catch (Exception e) {
            // 4b. Unexpected — lỗi thật, cần stacktrace
            log.error("Unexpected exception in the consumer", e);

        } finally {
            // 5. Luôn close: ngắt kết nối sạch + commit offset + leave group
            consumer.close();
            log.info("The consumer is now gracefully shut down.");
        }
    }
}
```

### Giải thích từng đoạn

**`final Thread mainThread = Thread.currentThread()`.** Phải `final` để inner class `new Thread()` trong hook truy cập được. Đây là cầu nối giữa hook thread (thread 0 phụ) và main thread đang kẹt trong `poll()`.

**`consumer.wakeup()` trong hook.** Một dòng nhưng là toàn bộ "phép thuật". Không gọi `consumer.close()` trực tiếp trong hook — close từ thread khác trong lúc poll đang chạy là unsafe. Wakeup chỉ "đánh thức" poll để nó tự ném exception, còn close vẫn chạy trên main thread trong `finally`.

**`mainThread.join()` trong hook.** Nếu thiếu dòng này, JVM có thể thoát ngay sau khi hook xong, main thread chưa kịp chạy `finally` → close dang dở, offset chưa commit, group không nhận `LeaveGroup`. `join()` ép hook chờ main làm xong. Phải bọc try/catch `InterruptedException`.

**`try` bao cả `subscribe` + `while`.** Transcript nhấn mạnh đưa cả subscribe vào try. Vì `poll()` ở dòng nào trong loop cũng có thể ném `WakeupException`, try phải bao toàn bộ loop.

**`finally { consumer.close(); }`.** Close làm 3 việc: revoke partitions đã assign, commit offset (với auto-commit), gửi leave group → các consumer còn lại rebalance **ngay lập tức** thay vì chờ session timeout. Đó là lý do bài sau demo 2-3 consumer tắt mở mượt mà.

**Bỏ log `Polling...` mỗi vòng.** Bài group sau sẽ chạy nhiều instance song song — log polling mỗi giây nhân 3 instance sẽ nhấn chìm log quan trọng (rebalance, partition assignment). Transcript xóa dòng này từ đây.

## 3. Chạy và kiểm tra

1. Run `ConsumerDemoWithShutdown.main()`. Thấy log join group rồi `poll` im lặng (không còn dòng Polling mỗi giây).
2. Bấm Stop (hoặc Ctrl+C). Quan sát log theo đúng thứ tự:
   * Thread phụ: `Detected a shutdown, let's exit by calling consumer.wakeup()...`
   * Main thread: `Consumer is starting to shut down...`
   * Log graceful: `revoking previously assigned partitions`, `leaving the group`, `metrics shut down`...
   * Dòng cuối: `The consumer is now gracefully shut down.`
3. Restart consumer ngay: join lại **nhanh** (vài giây), không còn cảnh chờ ~30s như bản kill abrupt. Vì group đã nhận `LeaveGroup` sạch.
4. Produce thêm message trong lúc consumer tắt, bật lại: consumer đọc đúng batch mới từ committed offset, không đọc lại cũ, không mất mới.

## 4. Pitfalls

* **Gọi `consumer.close()` trong hook thay vì `wakeup()`.** Close không thread-safe khi poll đang chạy — có thể deadlock hoặc `ConcurrentModificationException`. Luôn wakeup từ hook, close trên main thread.
* **Quên `mainThread.join()`.** Triệu chứng: log `gracefully shut down` không bao giờ hiện, offset commit dở dang, lần sau đọc lại dữ liệu cũ. Hook thoát trước khi main dọn xong.
* **Chỉ catch `Exception` chung, không catch riêng `WakeupException`.** Kết quả: mỗi lần tắt sạch log vẫn báo error đỏ lòm — gây hoảng không cần thiết và che mất lỗi thật. Tách hai catch như mẫu.
* **Để `while (true)` ngoài try.** `WakeupException` ném ra ngoài try → rơi vào uncaught, `finally` không chạy, consumer không close. Try phải bao loop.
* **Tưởng `close()` là mất offset.** Ngược lại: close với auto-commit sẽ commit nốt offset đã poll+xử lý. Kill -9 (không qua hook) mới mất cơ hội commit cuối.

## Kết Luận

Một câu: **hook gọi `wakeup()`, poll ném `WakeupException`, main catch rồi `close()` trong `finally` — đó là shutdown graceful.** Thuộc pattern này trước khi đụng tới consumer group.

Bài tiếp theo chúng ta sẽ chạy 1 rồi 2 rồi 3 instance `ConsumerDemoWithShutdown` cùng `group.id` trên topic 3 partitions, quan sát rebalance chia partition (1 consumer ôm 3, 2 consumer chia 2-1, 3 consumer mỗi người 1) và tắt từng instance để thấy group tự chia lại ngay lập tức.
