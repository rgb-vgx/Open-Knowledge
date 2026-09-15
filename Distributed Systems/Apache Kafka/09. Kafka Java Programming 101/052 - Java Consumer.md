# Consumer Đầu Tiên: Vòng Lặp poll() Và Lần Join Group Đáng Nhớ

Producer gửi đi, ai nhận về? Bài này viết class `ConsumerDemo` hoàn chỉnh: cấu hình `key.deserializer`/`value.deserializer`, `group.id`, `auto.offset.reset=earliest`, `subscribe()` topic `demo_java`, rồi vòng lặp `poll()` vô hạn để đọc lại đúng dữ liệu producer đã gửi — kèm cách đọc log join group mà người mới nào cũng bỡ ngỡ lần đầu.

---

## 1. Concept: Consumer pull, không phải push

Khác với nhiều hệ message queue push tin tới consumer, Kafka consumer **chủ động pull**:

* `consumer.subscribe(topics)` — đăng ký "tôi muốn đọc topic này". Có thể subscribe nhiều topic, nhưng bài này chỉ một: `demo_java`.
* `consumer.poll(Duration)` — hỏi broker "có gì mới cho tôi không?". Có thì trả về ngay, không có thì chờ tối đa `timeout` (ở đây 1000ms) rồi trả về rỗng. Timeout này để khỏi spam broker liên tục.
* Trả về là `ConsumerRecords<String, String>` — một tập records. Duyệt từng `ConsumerRecord` để lấy `key()`, `value()`, `partition()`, `offset()`.

Ba config quyết định số phận consumer:

* **Deserializer ngược với serializer.** Producer dùng `StringSerializer` thì consumer phải dùng `StringDeserializer` cho cả key và value. Topic chứa Avro thì phải dùng Avro deserializer — sai là lỗi runtime.
* **`group.id`.** Định danh consumer group, ở đây `my-java-application`. Cùng `group.id` thì chia nhau partitions; khác `group.id` thì mỗi group nhận đủ bản copy. Bài này đặt biến `groupId` riêng ở đầu để đổi nhanh.
* **`auto.offset.reset`.** Chỉ có tác dụng khi **chưa có committed offset** (group mới tinh hoặc partition mới). Ba giá trị: `none` (chưa có offset thì fail luôn — phải seed offset trước, không dùng cho demo), `earliest` (đọc từ đầu topic, tương đương `--from-beginning` của CLI), `latest` (chỉ đọc message mới từ giờ trở đi). Vì muốn đọc toàn bộ lịch sử `demo_java`, ta chọn `earliest`.

Hiểu vậy rồi hãy nhìn log join group lần đầu: consumer tìm thấy 3 partitions (`demo_java-0/1/2`), không thấy committed offset nào, nên `auto.offset.reset=earliest` kích hoạt — reset cả 3 về offset 0 rồi bắt đầu kéo dữ liệu theo từng batch lớn (mỗi poll có thể trả về tới ~1MB từ một partition, nên log sẽ thấy cả chùm partition 2, rồi 1, rồi 0).

## 2. Code hoàn chỉnh

Tạo class `ConsumerDemo` (copy phần kết nối từ `ProducerDemo`, xóa phần producer, thay bằng code này):

```java
package io.conduktor.demos.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class ConsumerDemo {

    private static final Logger log = LoggerFactory.getLogger(ConsumerDemo.class.getSimpleName());

    public static void main(String[] args) {
        log.info("I am a Kafka consumer!");

        String groupId = "my-java-application";
        String topic = "demo_java";

        // 1. Consumer properties: kết nối + deserializer + group + offset reset
        Properties properties = new Properties();

        // Kết nối localhost (không bảo mật)
        properties.setProperty("bootstrap.servers", "127.0.0.1:9092");

        // Nếu dùng Conduktor Playground: comment dòng trên, mở 4 dòng dưới
        // properties.setProperty("bootstrap.servers", "cluster.playground.cdkt.io:9092");
        // properties.setProperty("security.protocol", "SASL_SSL");
        // properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"...\" password=\"...\";");
        // properties.setProperty("sasl.mechanism", "PLAIN");

        // Deserialize key/value String (ngược với StringSerializer bên producer)
        properties.setProperty("key.deserializer", StringDeserializer.class.getName());
        properties.setProperty("value.deserializer", StringDeserializer.class.getName());

        // Consumer group
        properties.setProperty("group.id", groupId);

        // Đọc từ đâu khi chưa có offset: none / earliest / latest
        properties.setProperty("auto.offset.reset", "earliest");

        // 2. Tạo consumer
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);

        // 3. Subscribe topic (nhận Collection — có thể nhiều topic)
        consumer.subscribe(Arrays.asList(topic));

        // 4. Poll loop vô hạn
        while (true) {
            log.info("Polling...");

            ConsumerRecords<String, String> records =
                    consumer.poll(Duration.ofMillis(1000));

            for (ConsumerRecord<String, String> record : records) {
                log.info("Key: " + record.key() + ", Value: " + record.value());
                log.info("Partition: " + record.partition() + ", Offset: " + record.offset());
            }
        }
    }
}
```

### Giải thích từng đoạn

**`groupId` externalize ở đầu.** Transcript cố tình tách `String groupId = "my-java-application"` ra biến để đổi nhanh khi demo nhiều group. `group.id` trong properties trỏ tới biến này. Đừng hardcode chuỗi group trực tiếp vào `setProperty` nếu bạn định chạy nhiều consumer song song sau này.

**`subscribe(Arrays.asList(topic))`.** `subscribe()` nhận `Collection<String>`, nên dù một topic cũng phải bọc trong list. IntelliJ sẽ gợi ý `Collections.singletonList()` vì list một phần tử — giữ `Arrays.asList()` cũng được, để sau thêm `topic2` cho tiện. Đây là subscribe **dynamic** (broker tự assign partition + rebalance); khác với `assign()` gán tay partition (học ở bài advanced).

**`poll(Duration.ofMillis(1000))`.** Tham số Duration là "chờ tối đa bao lâu nếu chưa có dữ liệu". Có dữ liệu là trả ngay, không bắt chờ đủ 1 giây. Đặt 1000ms là cân bằng: đủ nhanh để demo thấy log chạy, đủ thưa để không nện broker. Poll quá nhanh (vài ms) trong loop vô hạn là anti-pattern ở production khi topic rỗng.

**Vòng `for (record : records)`.** `records` có thể rỗng (không log gì thêm ngoài "Polling..."), có thể chứa hàng nghìn record từ nhiều partitions. Consumer kéo rất hiệu quả: một poll có thể mang về cả batch partition 2, rồi poll sau mang batch partition 1, 0 — nên log sẽ thấy từng chùm cùng partition đi liền nhau, đừng ngạc nhiên.

**Chưa có `close()`, chưa shutdown hook.** Bài này cố tình để `while (true)` thô để bạn thấy vấn đề: tắt bằng nút Stop là kill abrupt, rebalance lần sau chậm (~30s mới join lại được). Bài tiếp theo sẽ fix bằng `wakeup()` + shutdown hook.

## 3. Chạy và kiểm tra

1. Đảm bảo topic `demo_java` đã có dữ liệu (chạy `ProducerDemoKeys` trước đó).
2. Run `ConsumerDemo.main()`. Lần đầu sẽ thấy theo thứ tự:
   * Log config: `auto.offset.reset=earliest`, `group.id=my-java-application`, `key.deserializer=StringDeserializer`.
   * `Polling...` vài lần trong lúc consumer join group.
   * Dòng join group: `found 3 partitions (demo_java-2, demo_java-1, demo_java-0)`, `no committed offset found` → `resetting offset to 0` cho cả 3 partitions.
   * Bùng nổ log `Key: id_X, Value: hello world X` theo chùm partition.
3. Trong lúc consumer đang chạy, mở terminal chạy `ProducerDemoKeys` một lần nữa — quay lại log consumer sẽ thấy ngay batch mới (`partition 2, 1, 0...`) mà không cần restart. Đó là poll loop đang sống.
4. Stop consumer (kill), chạy lại ngay: lần này log hiện `setting offset for partition demo_java-0 to ...527, ...14, ...535` (số cụ thể tùy dữ liệu bạn có) rồi chỉ `Polling...` mà không đọc lại dữ liệu cũ. Vì sao? Offset đã được auto-commit ở lần chạy trước (chi tiết ở bài offset commit), group quay lại đúng vị trí đã đọc.
5. Produce thêm message mới rồi run consumer lại: sau một lúc (có thể ~30s vì lần stop trước không graceful) consumer join lại và đọc đúng batch mới.

## 4. Pitfalls

* **`auto.offset.reset=latest` rồi thắc mắc "sao không đọc được dữ liệu cũ".** `latest` chỉ đọc từ thời điểm subscribe trở đi. Muốn đọc lịch sử phải `earliest`. Và nhớ: setting này **chỉ có tác dụng lần đầu** (chưa có committed offset). Đổi từ `latest` sang `earliest` sau khi group đã commit thì không có tác dụng gì — phải đổi `group.id` mới hoặc reset offset.
* **`group.id` đặt trùng với người khác / lần chạy cũ khi muốn đọc lại từ đầu.** Muốn đọc lại toàn bộ mà lười reset offset: đổi sang group mới + `earliest` là xong. Ngược lại, muốn tiếp tục thì giữ nguyên group.
* **Deserializer không khớp serializer.** Producer gửi String mà consumer dùng `IntegerDeserializer` là exception ngay khi poll. Luôn đối chiếu cặp serializer/deserializer theo kiểu dữ liệu topic.
* **Poll timeout quá nhỏ + xử lý nặng trong loop.** Bài offset commit sau sẽ nói kỹ: nếu xử lý mỗi batch quá lâu mới poll lại, broker tưởng consumer chết và đá khỏi group (rebalance). Demo `poll(1000)` + log nhẹ thì an toàn.
* **Tắt consumer bằng Stop và tưởng là xong.** Lần join sau chậm hẳn vì group phải chờ `session.timeout.ms` mới phát hiện member cũ mất. Đừng đánh giá performance join group qua lần kill abrupt này — bài graceful shutdown sẽ cho thấy join/leave sạch nhanh thế nào.

## Kết Luận

Một câu: **`subscribe()` một lần, `poll()` mãi mãi — lần đầu đọc từ `auto.offset.reset`, lần sau đọc tiếp từ committed offset.** Nắm được vòng đời này là bạn đã hiểu 80% consumer.

Bài tiếp theo chúng ta sẽ bọc vòng loop này trong `try/catch WakeupException` + `finally consumer.close()`, thêm shutdown hook với `consumer.wakeup()` và `mainThread.join()` để tắt consumer gracefully — tiền đề bắt buộc trước khi demo consumer group rebalance.
