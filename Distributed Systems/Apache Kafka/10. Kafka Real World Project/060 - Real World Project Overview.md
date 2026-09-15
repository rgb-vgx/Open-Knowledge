# Project Thực Tế: Stream Wikimedia Vào Kafka Rồi Đổ Ra OpenSearch

Học producer/consumer rời rạc mãi thì không thành kỹ năng. Phần này gom tất cả lại thành một pipeline thật: **producer đọc stream thay đổi Wikimedia → topic Kafka → consumer ghi vào OpenSearch** để search được. Bài này là bản overview: kiến trúc, yêu cầu, và lộ trình từ code tay tới Kafka Connect + Kafka Streams. Hai bài sau sẽ bắt tay implement.

---

## 1. Concept: Kiến trúc pipeline 2 chặng

```
Wikimedia SSE stream  ──>  Kafka Producer (Java)  ──>  Topic: wikimedia.recentchange
                                                              │
                                                              v
                                                    Kafka Consumer (Java)  ──>  OpenSearch index
```

* **Chặng 1 — Producer.** Nguồn là stream công khai của Wikimedia (RecentChange firehose: mỗi lần ai đó sửa Wikipedia, một event JSON chảy ra). Producer giữ kết nối stream mở liên tục (SSE — Server-Sent Events), mỗi event là một `ProducerRecord` vào topic. Không key phức tạp — quan trọng là throughput ổn định, reconnect khi stream đứt.
* **Chặng 2 — Consumer.** Kéo event từ topic, parse JSON, ghi vào OpenSearch (fork open-source của Elasticsearch) để search/full-text. Consumer chạy poll loop + graceful shutdown + group như đã học; điểm mới là sink ghi ra hệ thống ngoài thay vì log.
* **Vì sao bài này đáng làm?** Đây là lần đầu bạn thấy Kafka đúng vai trò của nó: **log trung tâm** giữa nguồn chảy liên tục và hệ đọc (search index). Nguồn có sập, consumer có restart — dữ liệu vẫn nằm trong topic chờ (retention 7 ngày default), không mất như gọi API trực tiếp.

Dù bạn không code Java cũng nên đọc: mọi khái niệm (topic, producer streaming, consumer sink, Connect/Streams ở chặng nâng cấp) đều là kiến thức Kafka thuần, độc lập ngôn ngữ.

## 2. Code: Chưa code — chuẩn bị gì?

Bài overview không có code mới. Thứ tự làm việc khuyến nghị:

1. Đọc 2 link demo cách dùng Wikimedia stream mà tác giả đính kèm ở bài text tiếp theo (xem stream JSON trông thế nào, thử mở bằng curl/browser).
2. Tự implement trước theo khung đã học:
   * Producer: vòng đọc stream → `producer.send(new ProducerRecord<>("wikimedia.recentchange", eventJson))` + callback + `flush/close`.
   * Consumer: `subscribe` topic → `poll` → parse JSON → client OpenSearch `index()` → (giữ auto commit như bài 057, xử lý xong trước poll tiếp để giữ at-least-once).
3. Không làm được cũng không sao — các bài walk-through sau sẽ code mẫu từng bước.

Điều kiện tiên quyết từ phần 09: project Gradle chạy được, `kafka-clients` + `slf4j` đủ, topic tạo sẵn, cluster (localhost hoặc Playground) + một instance OpenSearch local/Docker để consumer trỏ tới.

## 3. Chạy và kiểm tra (mục tiêu cuối phần)

Pipeline coi là xong khi:

* Producer log `partition/offset` tăng đều (stream chảy → Kafka nhận).
* Mở topic `wikimedia.recentchange` trên UI/CLI thấy event JSON mới liên tục.
* Query OpenSearch trả về document vừa consume (search thử tiêu đề bài vừa sửa trên Wikipedia).
* Kill consumer rồi bật lại: đọc tiếp từ committed offset, không mất event stream trong lúc consumer chết (chừng nào trong retention).

## 4. Pitfalls

* **Nhảy vào code khi chưa xem stream mẫu.** Event Wikimedia có field lồng nhau, có event heartbeat rác. Không xem mẫu trước thì consumer parse lỗi hàng loạt. Mở link demo + quan sát JSON trước, code sau.
* **Producer không reconnect.** Stream SSE đứt là bình thường (mạng, server đóng idle). Producer production phải có vòng reconnect + backoff; demo đơn giản ít nhất cũng phải log lỗi rõ thay vì chết im.
* **Consumer ghi OpenSearch đồng bộ từng record mà topic burst.** Mỗi `poll()` trả về hàng trăm records, mỗi record một request HTTP riêng là chậm + dễ timeout → poll trễ → rebalance. Giải pháp: bulk index theo batch (một bulk cho cả `ConsumerRecords` vừa poll), đúng tinh thần "xử lý hết batch trước poll tiếp".
* **Bỏ qua idempotency phía OpenSearch.** At-least-once của consumer nghĩa là event có thể đọc lại → ghi trùng document. Dùng event id của Wikimedia làm document `_id` để ghi lại cùng id thì ghi đè thay vì trùng.
* **Nhầm mục tiêu 2 nấc.** Nấc 1 (bài tập): code tay producer + consumer Java. Nấc 2 (sau walk-through): thay producer tay bằng **SSE Source Connector**, thay đếm/thống kê bằng **Kafka Streams**, thay consumer tay bằng **Elasticsearch Sink Connector**. Đừng trộn: đang code tay lại lôi config Connect vào.

## Kết Luận

Một câu: **Wikimedia chảy vào topic, topic nuôi OpenSearch — Kafka ở giữa làm bộ đệm bền vững.** Hiểu kiến trúc này thì phần code sau chỉ là lắp ráp kỹ năng cũ.

Bài tiếp theo (bài tập thực hành) chúng ta sẽ nhận đề bài chi tiết + link stream Wikimedia và hai link demo, tự implement producer trước rồi consumer sau — làm được tới đâu hay tới đó, rồi đối chiếu với bài solution walk-through.
