# Kafka SDK: Vì Sao Khóa Này Dùng Java Client Chính Chủ?

Bạn muốn code Kafka bằng Python, Go, Node.js cho nhanh? Khoan. Toàn bộ phần lập trình trong khóa này dùng **Java SDK chính chủ** của Apache Kafka — và đó là lựa chọn có chủ ý. Bài này giải thích tại sao, khi nào bạn được phép dùng ngôn ngữ khác, và cần chuẩn bị gì trước khi viết dòng `KafkaProducer` đầu tiên.

---

## 1. Official SDK duy nhất: Java

Apache Kafka được viết bằng Java/Scala. Client library chính thức, được maintain cùng release với broker, cũng là **Java client** (`org.apache.kafka:kafka-clients`).

Đặc điểm của Java client:

* **Low-level, đầy đủ nhất.** Mọi config (`bootstrap.servers`, `enable.auto.commit`, `partition.assignment.strategy`...) xuất hiện ở Java đầu tiên, document đầy đủ nhất.
* **Ổn định theo version broker.** Nâng broker lên 3.x mà client Java cũ vẫn tương thích tốt, vì cùng team phát triển.
* **Là基准 để các SDK khác port theo.** Hiểu Java client thì đọc code Python/Go bạn vẫn hiểu ngay `send()`, `poll()`, `commitSync()` tương ứng là gì.

Hệ quả: học Java client một lần, bạn nắm **mental model chuẩn** của Kafka (producer async + callback, consumer poll loop + offset commit + rebalance). Đổi ngôn ngữ chỉ là đổi cú pháp.

## 2. Các SDK cộng đồng cho ngôn ngữ khác

Nếu dự án của bạn không dùng Java, Kafka vẫn có client cộng đồng cho hầu hết ngôn ngữ phổ biến: Python (`confluent-kafka-python`, `kafka-python`), Go (`sarama`, `confluent-kafka-go`), Node.js (`kafkajs`), .NET, Rust, C/C++...

Danh sách đầy đủ được tác giả khóa học tổng hợp tại:

* `Conduktor.io/kafka/kafka-sdk-list` (đường dẫn `kafka/kafka-sdk-list`)

Lưu ý quan trọng:

* Đây là **community supported**, không phải official. Chất lượng, độ phủ API, tốc độ cập nhật khác nhau.
* Không đảm bảo hành vi **giống 100% Java**. Ví dụ cơ chế `StickyPartitioner`, `CooperativeStickyAssignor`, `WakeupException` có thể được đặt tên hoặc implement khác.
* Nếu bạn adapt code trong khóa này sang ngôn ngữ khác, hãy đối chiếu document của SDK đó, đừng copy nguyên config Java sang.

| Nhu cầu | Gợi ý |
|---|---|
| Học nghiêm túc, hiểu sâu internals | Dùng Java theo khóa học |
| Prototype nhanh bằng Python/Node | Được, nhưng tự chịu rủi ro khác biệt API |
| Production đa ngôn ngữ | Ưu tiên SDK của Confluent (nếu có) vì được test kỹ với broker mới |

## 3. Prerequisite trước khi code

Khóa học giả định bạn đã có **Java cơ bản**: class, `main()`, generics (`KafkaProducer<String, String>`), exception `try/catch/finally`, lambda/thread ở mức đọc hiểu.

Môi trường sẽ setup ở bài sau:

* IntelliJ IDEA Community + JDK 11 (khuyến nghị Amazon Corretto 11).
* Gradle (khuyến nghị) hoặc Maven — code Java giống nhau, chỉ khác file khai báo dependency.
* Một cluster để trỏ `bootstrap.servers` tới: localhost `127.0.0.1:9092` hoặc Conduktor Playground (có UI quan sát topic/consumer group).

## Cạm Bẫy Thường Gặp

* **Hỏi "Maven hay Gradle tốt hơn cho Kafka?"** Trả lời: như nhau. Kafka chỉ cần `kafka-clients` + `slf4j`. Chọn cái bạn ít sai syntax nhất. Khóa này dùng Gradle vì ngắn gọn.
* **Dùng SDK Python rồi thắc mắc sao không có `WakeupException`.** Đó là API đặc thù Java consumer. SDK khác dùng cơ chế shutdown khác (signal/close flag).
* **Học chay không chạy code.** Phần này mỗi bài đều có output log để đối chiếu (metadata, partition assignment, rebalance). Không chạy thì không cảm được StickyPartitioner hay rebalance là gì.

## Kết Luận

Chốt một câu: **học Java client chính chủ để nắm chuẩn, sau đó port sang ngôn ngữ khác nếu cần.** Đừng làm ngược lại.

Bài tiếp theo chúng ta sẽ tạo project `kafka-beginners-course` + module `kafka-basics` từ con số 0, khai báo `kafka-clients`, `slf4j-api`, `slf4j-simple` và chạy thử `Hello World` để xác nhận môi trường sạch sẽ trước khi viết Producer đầu tiên.
