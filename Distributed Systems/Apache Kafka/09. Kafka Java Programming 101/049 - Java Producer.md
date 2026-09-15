# Producer Đầu Tiên: Gửi "Hello World" Vào Kafka Chỉ Với 4 Bước

Bạn đã có project chạy được. Giờ là lúc gửi message đầu tiên vào Kafka. Bài này viết class `ProducerDemo` hoàn chỉnh: cấu hình `bootstrap.servers` + serializer, tạo `KafkaProducer<String, String>`, gửi một `ProducerRecord` vào topic `demo_java`, rồi verify bằng console consumer.

---

## 1. Concept: Producer hoạt động như thế nào?

Producer có 4 bước bất biến, nhớ kỹ vì mọi bài producer sau chỉ mở rộng từ đây:

1. **Tạo properties** — Kafka biết kết nối tới đâu (`bootstrap.servers`) và serialize key/value kiểu gì (`key.serializer`, `value.serializer`).
2. **Tạo producer** — `new KafkaProducer<>(properties)`.
3. **Tạo + gửi record** — `new ProducerRecord<>(topic, value)`, rồi `producer.send(record)`. Lưu ý: `send()` là **bất đồng bộ (asynchronous)** — nó chỉ đưa vào buffer, chưa chắc đã bay tới broker.
4. **Flush + close** — `producer.flush()` ép gửi hết và block cho tới khi xong, `producer.close()` cũng flush ngầm rồi đóng kết nối. Nếu quên cả hai và `main()` kết thúc ngay, message có thể **chưa kịp gửi đã mất**.

Hai khái niệm serializer cần hiểu: Kafka chỉ truyền **bytes**. Bạn đưa `String` vào thì `StringSerializer` sẽ biến nó thành bytes trước khi gửi. Sau này consumer sẽ dùng `StringDeserializer` để làm ngược lại. Key và value serializer phải khớp với kiểu generics `KafkaProducer<String, String>`.

Về kết nối, có 2 lựa chọn:

* Localhost không bảo mật: chỉ cần `bootstrap.servers=127.0.0.1:9092`.
* Conduktor Playground (có UI quan sát): giữ `bootstrap.servers` trỏ tới cluster playground + thêm 3 dòng `security.protocol=SASL_SSL`, `sasl.jaas.config=...`, `sasl.mechanism=PLAIN`. Bài này demo trên Playground để nhìn thấy topic, nhưng code chạy y hệt trên localhost nếu bạn comment 3 dòng SASL đi.

## 2. Code hoàn chỉnh

Tạo topic `demo_java` (3 partitions) trước bằng CLI hoặc Conduktor UI. Sau đó dùng class này:

```java
package io.conduktor.demos.kafka;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

public class ProducerDemo {

    private static final Logger log = LoggerFactory.getLogger(ProducerDemo.class.getSimpleName());

    public static void main(String[] args) {
        log.info("I am a Kafka producer!");

        // 1. Producer properties: kết nối + serializer
        Properties properties = new Properties();

        // Kết nối localhost (không bảo mật)
        properties.setProperty("bootstrap.servers", "127.0.0.1:9092");

        // Nếu dùng Conduktor Playground: comment dòng localhost ở trên,
        // mở 4 dòng dưới và thay bằng thông tin cluster của bạn
        // properties.setProperty("bootstrap.servers", "cluster.playground.cdkt.io:9092");
        // properties.setProperty("security.protocol", "SASL_SSL");
        // properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"...\" password=\"...\";");
        // properties.setProperty("sasl.mechanism", "PLAIN");

        // Producer behavior: key và value đều là String
        properties.setProperty("key.serializer", StringSerializer.class.getName());
        properties.setProperty("value.serializer", StringSerializer.class.getName());

        // 2. Tạo producer
        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        // 3. Tạo record: gửi vào topic demo_java, value "hello world"
        ProducerRecord<String, String> producerRecord =
                new ProducerRecord<>("demo_java", "hello world");

        // 4. Gửi (async) rồi flush + close (sync)
        producer.send(producerRecord);
        producer.flush();
        producer.close();
    }
}
```

### Giải thích từng đoạn

**Logger thay cho `System.out.println`.** `LoggerFactory.getLogger(ProducerDemo.class.getSimpleName())` lấy từ `slf4j-api` + `slf4j-simple` đã khai báo ở bài setup. Nếu log không hiện, kiểm tra lại `build.gradle` đã sửa `testImplementation` thành `implementation` chưa.

**`bootstrap.servers`.** Đây là danh sách broker để producer "gõ cửa" lần đầu. Không cần liệt kê hết broker trong cluster — chỉ cần 1-2 địa chỉ đúng là producer tự discovery metadata còn lại.

**`key.serializer` / `value.serializer`.** Phải là tên class đầy đủ, ở đây `StringSerializer.class.getName()`. Nếu producer khai báo `<String, String>` mà serializer lại là `IntegerSerializer` thì runtime sẽ báo lỗi serialize ngay.

**`new ProducerRecord<>("demo_java", "hello world")`.** Constructor này có nhiều overload: `(topic, value)`, `(topic, key, value)`, `(topic, partition, key, value)...`. Bản đơn giản nhất này gửi value không key — key là `null`, partition do StickyPartitioner quyết định (học ở bài callback sau). IntelliJ hiện gợi ý `topic =`, `value =` ngay trên code — đó chỉ là inlay hint của IDE, không phải code thật, đừng copy chữ `topic =` vào.

**`send()` vs `flush()` vs `close()`.** `send()` trả về ngay (async). `flush()` block cho tới khi mọi record trong buffer được ack. `close()` tự gọi `flush()` rồi mới đóng. Trong demo ghi cả hai để nhấn mạnh flush tồn tại như một API riêng — code production gọi `send()` liên tục và chỉ `close()` khi app tắt.

## 3. Chạy và kiểm tra

1. Run `ProducerDemo.main()`. Log sẽ rất dài (producer in toàn bộ config khi khởi động) — đó là bình thường.
2. Verify cách 1 — Conduktor UI: mở topic `demo_java`, thấy một record `null | hello world`.
3. Verify cách 2 — CLI với cùng file config kết nối:

```bash
kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 \
  --topic demo_java --from-beginning
# kỳ vọng: hello world
```

Nếu dùng Playground thì `--bootstrap-server` và `--consumer.config` trỏ tới file `playground.config` của bạn, bỏ `--group` nếu có, thêm `--from-beginning`.

## 4. Pitfalls

* **Quên `flush()`/`close()` thì message "bốc hơi".** `main()` kết thúc trước khi buffer kịp gửi. Luôn close producer trước khi app exit.
* **Chưa tạo topic `demo_java` đã chạy.** Tùy cấu hình `auto.create.topics.enable`, có cluster tự tạo topic với 1 partition thay vì 3 như ý bạn — kết quả demo partition sau sẽ lệch. Tạo topic trước cho chắc.
* **Copy nhầm inlay hint của IntelliJ.** Thấy `ProducerRecord<>(topic = "demo_java", value = "hello world")` trên màn hình mà gõ nguyên chữ `topic =` vào là lỗi compile. Code thật chỉ có 2 chuỗi.
* **Để cả localhost và Playground cùng lúc.** Hai `bootstrap.servers` thì dòng sau ghi đè dòng trước. Dùng cái nào thì comment cái kia.
* **Dán `sasl.jaas.config` thiếu dấu `;` cuối.** Blob Playground copy về phải giữ nguyên cả dấu chấm phẩy và để IntelliJ tự escape quote — sửa tay rất dễ sai.

## Kết Luận

Một câu: **properties (kết nối + serializer) → `KafkaProducer` → `ProducerRecord` → `send` + `flush`/`close`.** Nắm 4 bước này là bạn đã có khung xương của mọi producer.

Bài tiếp theo chúng ta sẽ gắn **callback** vào `send()` để biết mỗi message thực sự rơi vào partition và offset nào, và chứng kiến tận mắt hành vi **StickyPartitioner** khi gửi chùm message liên tục.
