# Thực Hành Cooperative Rebalance: Chỉ Revoke Đúng Partition Cần Chuyển

Lý thuyết bài trước nói cooperative chỉ chuyển đúng partition cần thiết. Bài này chứng minh bằng log thật: copy thành `ConsumerDemoCooperative`, set `partition.assignment.strategy` về `CooperativeStickyAssignor`, chạy 1-2-3 instance và đọc dòng `revoked/assigned` để thấy sự khác biệt với eager.

---

## 1. Concept: Một dòng config, hai thế giới khác nhau

Mặc định Kafka 3.0 consumer khởi động với strategy list `[RangeAssignor, CooperativeStickyAssignor]` — nhưng `RangeAssignor` đứng trước nên có quyền ưu tiên, group vẫn rebalance theo kiểu **eager** khi các member chưa đồng nhất protocol.

Muốn ép cooperative hoàn toàn, thêm đúng một dòng vào properties:

```java
properties.setProperty(
    "partition.assignment.strategy",
    CooperativeStickyAssignor.class.getName());
```

Từ đây consumer chỉ nói protocol cooperative. Lần rolling bounce đầu group có thể vẫn eager (trộn protocol cũ/mới), từ lần restart thứ hai trở đi cả group cùng protocol và rebalance incremental có hiệu lực.

Dấu hiệu nhận biết trên log (quan trọng hơn code):

* **Eager:** khi member mới join, member cũ log revoke **toàn bộ** partitions đang giữ, ngừng poll một lúc, rồi nhận assignment mới.
* **Cooperative:** member cũ chỉ log revoke **đúng partition cần nhường** (ví dụ chỉ `demo_java-2`), các partition còn lại (`demo_java-0`, `demo_java-1`) vẫn poll ra dữ liệu bình thường trong lúc rebalance. Member mới log `assigned demo_java-2`.

## 2. Code hoàn chỉnh

Duplicate `ConsumerDemoWithShutdown` thành `ConsumerDemoCooperative`, giữ nguyên toàn bộ shutdown hook + poll loop, chỉ thêm 1 dòng config:

```java
package io.conduktor.demos.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.CooperativeStickyAssignor;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class ConsumerDemoCooperative {

    private static final Logger log = LoggerFactory.getLogger(ConsumerDemoCooperative.class.getSimpleName());

    public static void main(String[] args) {
        log.info("I am a Kafka consumer with cooperative rebalance!");

        String groupId = "my-cooperative-app";
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

        // Ép cooperative: chỉ dùng CooperativeStickyAssignor
        properties.setProperty(
                "partition.assignment.strategy",
                CooperativeStickyAssignor.class.getName());

        // Static membership (optional): mỗi instance một id cố định, duy nhất.
        // Mở khi muốn restart không rebalance; demo này cứ để comment.
        // properties.setProperty("group.instance.id", "consumer-1"); // instance 2 -> consumer-2, ...

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);

        final Thread mainThread = Thread.currentThread();

        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                log.info("Detected a shutdown, let's exit by calling consumer.wakeup()...");
                consumer.wakeup();
                try {
                    mainThread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        try {
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
            log.info("Consumer is starting to shut down...");
        } catch (Exception e) {
            log.error("Unexpected exception in the consumer", e);
        } finally {
            consumer.close();
            log.info("The consumer is now gracefully shut down.");
        }
    }
}
```

### Giải thích từng đoạn

**`groupId` mới (`my-cooperative-app`).** Dùng group mới để tách khỏi các demo eager trước — log `assigned partitions` lần đầu sẽ sạch (3 partitions cùng lúc, kèm dòng `added partitions` đặc trưng của cooperative thay vì log eager cũ). Nếu tái dùng group cũ, offset đã commit từ bài trước khiến demo khó đọc.

**Import `CooperativeStickyAssignor`.** Class nằm trong `org.apache.kafka.clients.consumer`. Dùng `CooperativeStickyAssignor.class.getName()` thay vì gõ chuỗi tay để refactor an toàn — gõ sai một chữ là consumer fallback strategy khác mà không báo lỗi rõ.

**`group.instance.id` để comment.** Transcript nhắc config này (`null` mặc định) nhưng không demo vì khó diễn bằng tay: mỗi instance phải hardcode id khác nhau trước khi run. Giữ comment + ghi chú để khi chạy Kubernetes/static deploy bạn biết phải mở ở đâu. Mở sai (trùng id) còn tệ hơn không mở.

**Phần còn lại giữ nguyên.** Shutdown hook, `WakeupException`, `finally close()` copy y từ bài graceful shutdown — cooperative không thay đổi cách tắt, chỉ thay đổi cách chia partition.

## 3. Chạy và kiểm tra

1. Bật `Allow multiple instances` cho Run Configuration của `ConsumerDemoCooperative` (thao tác như bài consumer group).
2. Run instance 1. Kiểm tra đầu log: `partition.assignment.strategy = CooperativeStickyAssignor` (chỉ 1 assignor, không còn Range). Cuối log join: `assigned partitions: demo_java-0, 1, 2` (kèm chữ `added`).
3. Run instance 2. Đọc log instance 1: chỉ thấy `revoked demo_java-2` (incremental), `demo_java-0` và `demo_java-1` vẫn poll bình thường — không có cảnh revoke toàn bộ. Log instance 2: `assigned demo_java-2`.
4. Run instance 3. Instance 1 log `revoked demo_java-1` rồi còn `demo_java-0`; instance 2 giữ nguyên `demo_java-2` (log assignment không đổi — bằng chứng "ai không liên quan thì không bị động"); instance 3 nhận `demo_java-1`.
5. Đối chiếu: mỗi instance chạy producer test (`ProducerDemoKeys`) → message partition nào chỉ hiện ở instance giữ partition đó.

## 4. Pitfalls

* **Set cooperative cho 1 instance mà quên 2 instance còn lại.** Group trộn protocol → fallback eager. Triệu chứng: log vẫn revoke toàn bộ dù đã set assignor mới. Fix: mọi instance cùng code, cùng strategy.
* **Đọc log cũ (eager) để kết luận cooperative không hiệu quả.** Lần bounce đầu sau khi đổi strategy vẫn có thể eager ( rolling). Restart thêm một vòng nữa rồi hãy đánh giá.
* **Tái dùng `group.id` cũ rồi thắc mắc sao assignment lạ.** Offset và generation cũ còn đó. Demo sạch thì dùng group mới như mẫu (`my-cooperative-app`).
* **`group.instance.id` trùng nhau.** Member sau join sẽ fence (đá) member trước có cùng static id → rebalance liên tục, log toàn `member fenced`. Mỗi instance một id duy nhất, hoặc đừng set.
* **Tưởng cooperative là hết rebalance.** Không — rebalance vẫn xảy ra khi join/leave, chỉ là nhẹ và incremental hơn. Muốn restart không rebalance hẳn thì phải thêm static membership.

## Kết Luận

Một câu: **thêm một dòng `CooperativeStickyAssignor`, log revoke từ "tất cả" thành "đúng một partition" — đó là cooperative.** Nhẹ, ít gián đoạn, và xứng đáng thành default tương lai.

Bài tiếp theo chúng ta sẽ bóc cơ chế commit offset tự động: `enable.auto.commit=true` + `auto.commit.interval.ms=5000` phối hợp với `poll()` ra sao, khi nào ta được đảm bảo at-least-once và khi nào lỡ commit trước khi xử lý xong thì mất message.
