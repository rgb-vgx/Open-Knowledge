# Producer Callback: Biết Message Rơi Vào Partition, Offset Nào

Gửi xong mà không biết message đi đâu thì chẳng khác nào gửi thư không cần biên nhận. Bài này gắn **callback** vào `producer.send()` để nhận `RecordMetadata` (topic, partition, offset, timestamp) cho từng message, rồi dùng chính callback đó để chứng kiến hành vi **StickyPartitioner** — lý do vì sao gửi lẻ thì partition ngẫu nhiên, gửi chùm thì dính chặt một partition.

---

## 1. Concept: Callback và StickyPartitioner

`producer.send(record)` có overload thứ hai nhận thêm `Callback` với một method duy nhất:

```java
void onCompletion(RecordMetadata metadata, Exception e);
```

* Callback chạy mỗi khi broker ack (thành công) hoặc khi gửi lỗi (exception).
* Quy ước: `e == null` nghĩa là thành công, đọc `metadata.topic()`, `metadata.partition()`, `metadata.offset()`, `metadata.timestamp()`. Ngược lại log `e` ra.

Hiểu callback rồi mới hiểu được partitioner. Tài liệu cũ hay nói "không key thì round-robin", nhưng producer hiện đại (Kafka 2.4+) dùng **StickyPartitioner** (tên đầy đủ `UniformStickyPartitioner`) làm default:

* **Gửi lẻ từng message, cách nhau một lúc:** mỗi lần gửi là một batch mới, partitioner "dính" ngẫu nhiên vào một partition rồi... lần sau lại dính partition khác. Nhìn log sẽ thấy partition nhảy lung tung: 1, 0, 1, 2... — tưởng round-robin nhưng thực ra là sticky chọn lại sau mỗi batch đã gửi xong.
* **Gửi chùm 10-30 message dồn dập:** tất cả dồn vào **cùng một batch, cùng một partition** để tiết kiệm request. Chạy lại chương trình có thể dính partition khác (0, 1 hoặc 2), nhưng trong một lần chạy thì cả chùm dính nhau.
* Chỉ khi bạn ép `partitioner.class=RoundRobinPartitioner` (mỗi message một partition) mới ra round-robin thật — nhưng **không nên dùng ở production** vì tốn batch, giảm throughput. Tương tự, đừng hạ `batch.size` xuống vài trăm bytes chỉ để demo — default 16KB là chuẩn production.

Cách xác nhận producer đang dùng partitioner nào: nhìn log khởi động của producer, tìm dòng `partitioner.class = null` nghĩa là default (sticky). Chỉ khi bạn set tường minh mới hiện tên class.

## 2. Code hoàn chỉnh

Duplicate class `ProducerDemo` thành `ProducerDemoWithCallback`:

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

public class ProducerDemoWithCallback {

    private static final Logger log = LoggerFactory.getLogger(ProducerDemoWithCallback.class.getSimpleName());

    public static void main(String[] args) throws InterruptedException {
        log.info("I am a Kafka producer with callback!");

        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "127.0.0.1:9092");
        properties.setProperty("key.serializer", StringSerializer.class.getName());
        properties.setProperty("value.serializer", StringSerializer.class.getName());

        // Demo-only: thu nhỏ batch để thấy sticky chuyển partition nhanh hơn.
        // Production giữ default 16KB — XÓA hoặc comment dòng này khi code thật.
        properties.setProperty("batch.size", "400");

        // Demo-only: muốn ép round-robin từng message thì mở dòng này.
        // Production KHÔNG dùng — tốn request, giảm throughput.
        // properties.setProperty("partitioner.class", "org.apache.kafka.clients.producer.RoundRobinPartitioner");

        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        // Gửi 10 batch, mỗi batch 30 message, nghỉ 500ms giữa batch
        for (int j = 0; j < 10; j++) {
            for (int i = 0; i < 30; i++) {
                ProducerRecord<String, String> producerRecord =
                        new ProducerRecord<>("demo_java", "hello world " + i);

                producer.send(producerRecord, new Callback() {
                    @Override
                    public void onCompletion(RecordMetadata metadata, Exception e) {
                        if (e == null) {
                            log.info("Received new metadata \n" +
                                    "Topic: " + metadata.topic() + "\n" +
                                    "Partition: " + metadata.partition() + "\n" +
                                    "Offset: " + metadata.offset() + "\n" +
                                    "Timestamp: " + metadata.timestamp());
                        } else {
                            log.error("Error while producing", e);
                        }
                    }
                });
            }
            Thread.sleep(500);
        }

        producer.flush();
        producer.close();
    }
}
```

### Giải thích từng đoạn

**`new Callback()`匿名 class.** `onCompletion` nhận 2 tham số. Đừng đổi tên `Exception e` thành gì khó hiểu — check `e == null` là đủ phân biệt thành công/thất bại. Nhánh lỗi luôn `log.error(..., e)` để giữ stacktrace.

**Vòng lặp đơn trước, vòng lặp đôi sau.** Bắt đầu với 1 message đơn để thấy partition ngẫu nhiên mỗi lần run. Sau đó bọc trong `for (i < 10)` gửi 10 message dồn dập — cả 10 sẽ cùng partition (ví dụ toàn partition 1). Cuối cùng nâng lên 30 message/batch + sleep 500ms + 10 batch ngoài để thấy sticky nhảy: batch này partition 2, batch sau partition 0, rồi 1... Mỗi batch là một "dính" mới.

**`Thread.sleep(500)` phải try/catch.** Vì `main` khai báo `throws InterruptedException` nên code trên gọn hơn; nếu không throws thì bọc `try { Thread.sleep(500); } catch (InterruptedException e) { e.printStackTrace(); }`.

**`flush()` nằm NGOÀI vòng lặp.** Đặt flush trong loop là ép gửi từng message — phá hết batching, demo sticky sẽ sai. Flush/close chỉ gọi một lần cuối chương trình.

## 3. Chạy và kiểm tra

1. Chạy lần 1 với 1 message đơn, chạy đi chạy lại: log `Partition: 1`, rồi `Partition: 0`, rồi `Partition: 1` — ngẫu nhiên mỗi run.
2. Chạy bản 10 message dồn dập: cả 10 dòng log cùng `Partition: 1` (số cụ thể tùy run, nhưng 10 dòng giống nhau).
3. Chạy bản full (10 batch x 30 message + `batch.size=400`): log nhảy `partition 2 → 0 → 2 → 0 → 1...` theo từng batch 30 message.
4. Mở dòng `partitioner.class` trong log khởi động để xác nhận đang dùng default (null = sticky).

## 4. Pitfalls

* **Tưởng không key thì luôn round-robin.** Sai ở producer mới. Không key + gửi nhanh = sticky dồn một partition. Muốn phân tán đều thì dùng key (bài sau), không phải ép RoundRobinPartitioner.
* **Để `batch.size=400` và `RoundRobinPartitioner` lọt ra production.** Cả hai chỉ để demo. Quên xóa là throughput tụt, request phình.
* **Quên `flush()` ngoài loop.** Chương trình kết thúc trước khi callback kịp chạy — log không hiện metadata, tưởng gửi lỗi.
* **Log callback quá verbose.** Mỗi message một block 4 dòng. Demo 300 message là log trôi rất nhanh — khi debug chỉ log `topic-partition@offset` gọn lại.

## Kết Luận

Nhớ hai câu: **callback là biên nhận của từng message; sticky là chiến lược dồn batch để nhanh.** Gửi lẻ thấy ngẫu nhiên, gửi chùm thấy dính — cùng một partitioner, khác nhịp gửi.

Bài tiếp theo chúng ta sẽ gửi message **có key** (`id_0`...`id_9`): cùng key luôn về cùng partition, và chạy 2 lần vẫn ánh xạ y hệt — nền tảng của mọi đảm bảo thứ tự trong Kafka.
