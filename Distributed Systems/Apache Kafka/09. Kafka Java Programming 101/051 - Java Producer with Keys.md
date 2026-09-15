# Producer With Keys: Cùng Key, Cùng Partition — Nền Móng Của Thứ Tự

Bài trước ta thấy message không key rơi vào partition nào là do StickyPartitioner "dính" theo batch. Vậy nếu nghiệp vụ bắt buộc mọi event của cùng một thực thể (một xe tải, một user, một đơn hàng) phải giữ đúng thứ tự thì sao? Câu trả lời là **key**. Bài này gửi 10 key `id_0`...`id_9` lặp lại 2 lần và chứng minh: cùng key luôn về cùng partition, chạy lại vẫn vậy.

---

## 1. Concept: Key quyết định partition như thế nào?

Khi `ProducerRecord` có key khác null, `DefaultPartitioner` bỏ qua sticky và tính toán xác định (deterministic):

```
partition = murmur2(keyBytes) % partitionCount
```

Hệ quả:

* Cùng key `id_2` gửi bao nhiêu lần cũng ra cùng một số partition (ví dụ partition 2), chừng nào số partition của topic không đổi.
* Khác key có thể trùng partition (hash collision modulo) — ví dụ `id_1`, `id_3`, `id_6` cùng về partition 0. Key đảm bảo "cùng key cùng chỗ", không đảm bảo "khác key khác chỗ".
* Thứ tự chỉ được đảm bảo **trong một partition**. Nên muốn giữ thứ tự cho một thực thể, bắt buộc pin nó bằng key. Không key thì không có đảm bảo thứ tự nào cả.
* Đổi số partition của topic (tăng từ 3 lên 6) sẽ làm công thức modulo đổi kết quả — key cũ có thể nhảy partition mới. Vì vậy số partition nên chốt sớm, tránh tăng bừa trên topic cần thứ tự.

Trong bài này key và value đều là `String`, nên `key.serializer` và `value.serializer` vẫn là `StringSerializer`. Callback được thu gọn chỉ còn log `key` và `partition` để mắt dễ đối chiếu.

## 2. Code hoàn chỉnh

Duplicate class `ProducerDemoWithCallback` thành `ProducerDemoKeys`, xóa `batch.size`, `partitioner.class`, vòng lặp 30 message và sleep cũ, thay bằng code này:

```java
package io.conduktor.demos.kafka;

import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

public class ProducerDemoKeys {

    private static final Logger log = LoggerFactory.getLogger(ProducerDemoKeys.class.getSimpleName());

    public static void main(String[] args) throws InterruptedException {
        log.info("I am a Kafka producer with keys!");

        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "127.0.0.1:9092");
        properties.setProperty("key.serializer", StringSerializer.class.getName());
        properties.setProperty("value.serializer", StringSerializer.class.getName());

        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        String topic = "demo_java";

        // Gửi 2 batch giống hệt nhau để chứng minh tính ổn định
        for (int j = 0; j < 2; j++) {
            for (int i = 0; i < 10; i++) {
                String key = "id_" + i;
                String value = "hello world " + i;

                ProducerRecord<String, String> producerRecord =
                        new ProducerRecord<>(topic, key, value);

                producer.send(producerRecord, new Callback() {
                    @Override
                    public void onCompletion(RecordMetadata metadata, Exception e) {
                        if (e == null) {
                            log.info("Key: " + key + " | Partition: " + metadata.partition());
                        } else {
                            log.error("Error while producing", e);
                        }
                    }
                });
            }
            // Nghỉ giữa 2 batch để log tách rõ, dễ đọc
            Thread.sleep(500);
        }

        producer.flush();
        producer.close();
    }
}
```

### Giải thích từng đoạn

**Tách biến `topic`, `key`, `value`.** Transcript externalize 3 biến này để constructor `new ProducerRecord<>(topic, key, value)` đọc rõ ràng. Overload 3 tham số này khác hẳn bài đầu (`topic, value`): tham số thứ hai giờ là key, không phải value. Đảo lộn là bug kinh điển — log ra sẽ thấy key null hết.

**Vòng lặp ngoài `j < 2`.** Đây là điểm mấu chốt của demo: gửi cùng 10 key hai lần. Nếu key hoạt động đúng, ánh xạ batch 2 phải photocopy batch 1. Không có vòng ngoài thì bạn chỉ thấy "mỗi key một partition" mà không chứng minh được tính lặp lại.

**Callback thu gọn.** Bài callback trước log đủ topic/partition/offset/timestamp. Bài này chỉ giữ `key` và `metadata.partition()` (trong code transcript ghi `metadata.partition()`, bản nói nhầm `metadata.key` — key nằm ở biến `key` ngoài, không nằm trong metadata). Log gọn giúp đối chiếu 20 dòng trong nháy mắt.

**`Thread.sleep(500)` giữa batch.** Không phải để sticky chuyển partition (có key thì sticky không còn tác dụng), mà chỉ để tách log batch 1 và batch 2 cho dễ nhìn. Muốn gọn thì khai báo `main throws InterruptedException` như trên; nếu không, bọc try/catch quanh sleep.

**Xóa `batch.size` và `partitioner.class` demo.** Bài trước hạ batch xuống 400 và ép RoundRobin chỉ để demo. Bài này phải xóa cả hai để về default — có key thì `DefaultPartitioner` tự hash, ép partitioner khác sẽ phá demo.

## 3. Chạy và kiểm tra

1. Đảm bảo topic `demo_java` có 3 partitions (tạo từ bài Producer đầu).
2. Run `ProducerDemoKeys.main()`. Output kỳ vọng dạng này (số partition cụ thể có thể khác tùy hash, nhưng cấu trúc phải giống):

```
Key: id_1 | Partition: 0
Key: id_3 | Partition: 0
Key: id_6 | Partition: 0
Key: id_2 | Partition: 2
Key: id_4 | Partition: 2
Key: id_5 | Partition: 2
Key: id_7 | Partition: 2
Key: id_9 | Partition: 2
Key: id_0 | Partition: 1
Key: id_8 | Partition: 1
--- batch 2 lặp lại y hệt ---
Key: id_1 | Partition: 0
Key: id_2 | Partition: 2
...
```

3. Check Batch 2: `id_2` batch 1 ở partition nào thì batch 2 phải ở đúng partition đó. Đây là assert quan trọng nhất bài này.
4. Verify bằng Conduktor UI: mở topic `demo_java`, xem message giờ có cột key (`id_0 | hello world 0`), mở metadata thấy partition khớp log.
5. Chạy lại chương trình lần nữa: ánh xạ vẫn y hệt (deterministic), khác hẳn bài không key mỗi lần run nhảy lung tung.

## 4. Pitfalls

* **Tưởng khác key thì khác partition.** Sai. Hash modulo có va chạm — 10 key trên 3 partition chắc chắn có key phải ở chung. Muốn mỗi key một partition riêng thì số key phải ít hơn hoặc bằng số partition và may mắn không collision — đừng thiết kế dựa vào may mắn.
* **Tăng partition sau khi đã dùng key.** Thêm partition làm modulo đổi, key cũ nhảy chỗ mới, thứ tự liên partition vỡ. Chốt partition count từ đầu cho topic cần thứ tự; nếu bắt buộc tăng, chấp nhận consumer phải chịu giai đoạn chuyển tiếp.
* **Key null lẫn key có giá trị trong cùng topic.** Message null key đi theo sticky (nhảy batch), message có key đi theo hash — hai luồng trộn vào nhau khiến debug partition rối. Một topic nên thống nhất hoặc toàn có key, hoặc toàn không.
* **Dùng key là object phức tạp rồi serializer không ổn định.** Hash tính trên bytes sau serialize. Đổi serializer (ví dụ JSON field order đổi) là bytes đổi, partition đổi dù "key logic" giống nhau. Key nên là string/number ổn định như `truck_id`, `user_id`, `order_id`.
* **Nhầm thứ tự tham số `ProducerRecord`.** `(topic, value)` 2 tham số vs `(topic, key, value)` 3 tham số. Truyền nhầm là key thành value, partition tính sai hết mà code vẫn compile.

## Kết Luận

Một câu: **không key thì partition theo batch (sticky), có key thì partition theo hash của key — cùng key, cùng partition, mãi mãi.** Đó là viên gạch đầu tiên của mọi đảm bảo thứ tự trong Kafka.

Bài tiếp theo chúng ta đổi vai: viết `ConsumerDemo` đầu tiên với `key.deserializer`/`value.deserializer`, `group.id`, `auto.offset.reset=earliest`, vòng lặp `poll(Duration.ofMillis(1000))` và đọc log join group + reset offset để thấy consumer nhận lại đúng dữ liệu producer vừa gửi.
