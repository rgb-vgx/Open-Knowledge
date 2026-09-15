# Kafka Console Producer CLI: Gửi Message Đầu Tiên Vào Topic

Topic đã tạo ở bài trước vẫn rỗng. Bài này chúng ta cho dữ liệu chảy vào bằng `kafka-console-producer.sh` — công cụ gửi message thủ công từ terminal. Đây là cách nhanh nhất để test pipeline, giả lập producer thật trước khi viết code.

---

## 1. Bài Toán: Kiểm Tra Topic Có Nhận Dữ Liệu Không?

Bạn vừa tạo `first_topic`. Làm sao biết nó hoạt động? Viết ngay một producer Java thì quá nặng cho một câu hỏi đơn giản. Console producer giải quyết trong 10 giây: gõ lệnh, nhập từng dòng, mỗi dòng Enter là một message vào Kafka.

Hai kịch bản bài này bao phủ:

1. Produce không key (key = null) — mặc định, message phân tán round-robin/sticky qua các partition.
2. Produce có key — cùng key luôn về cùng partition, giữ thứ tự theo thực thể.

## 2. Produce Cơ Bản Không Key

### 2.1. Lệnh chuẩn

```bash
kafka-console-producer.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --topic first_topic
```

```bash
# Cùng lệnh trên localhost không bảo mật
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic first_topic
```

* `--topic first_topic` — topic đích, bắt buộc phải tồn tại trước (xem ngoại lệ auto-create ở mục 4).
* `--command-config` + `--bootstrap-server` — thông tin kết nối, giống hệt bài Topics CLI.
* Không có `--property` gì thêm nghĩa là key = null.

Chạy xong terminal hiện dấu `>` chờ nhập. Gõ thử:

```
>hello world
>my name is Stephane from Conduktor
>I love Kafka
```

Mỗi dòng Enter là một message đã vào Kafka. Nhấn `Ctrl+C` để thoát producer.

Vào UI Conduktor mở `first_topic` bạn sẽ thấy 3 message với key `null` và value đúng 3 dòng trên. Nếu dùng localhost không UI, sang bài Consumer sau bạn sẽ đọc lại để kiểm chứng.

### 2.2. Tùy biến độ tin cậy với `--producer-property`

```bash
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic first_topic \
  --producer-property acks=all
```

* `--producer-property acks=all` — leader chờ tất cả ISR xác nhận mới trả ACK. Chậm hơn nhưng an toàn nhất, chống mất dữ liệu khi broker chết.

Phía producer bạn không thấy gì khác — vẫn gõ dòng nào vào dòng đó. Điểm khác nằm ở backend: message chỉ được coi là ghi thành công khi đủ bản sao. Các giá trị `acks` cần nhớ: `0` (không chờ, nhanh nhất, dễ mất), `1` (chờ leader, mặc định), `all` (chờ đủ ISR, an toàn nhất).

## 3. Produce Vào Topic Chưa Tồn Tại: Playground Báo Lỗi, Localhost Tự Tạo

```bash
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic new_topic
```

```
>hello world
```

Chuyện gì xảy ra tùy cluster:

* **Conduktor Playground (auto-create bị tắt):** sau vài giây bạn nhận lỗi `Topic new_topic not present in metadata` hoặc timeout. Kiểm tra `kafka-topics.sh --list` sẽ thấy `new_topic` không hề được tạo. Đây là hành vi đúng ở production — bắt buộc tạo topic explicit trước.
* **Localhost mặc định (auto-create đang bật):** lần gửi đầu báo 1–2 cảnh báo `Leader not available`, lần thứ 3 trở đi gửi lọt. Chạy `--list` sẽ thấy `new_topic` tự xuất hiện với 1 partition (theo `num.partitions` trong `server.properties`).

Đổi default nếu muốn:

```properties
# Trong server.properties của broker local
num.partitions=3
```

Từ đó topic auto-create sẽ có 3 partitions. Nhưng best practice nhắc lại lần nữa: **tắt auto-create ở production, luôn tạo topic bằng `kafka-topics.sh --create` với partition và replication factor explicit.**

## 4. Produce Có Key: `--property parse.key=true`

Mặc định key luôn null. Muốn gửi key, thêm hai property:

```bash
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic first_topic \
  --property parse.key=true \
  --property key.separator=:
```

* `parse.key=true` — bật chế độ đọc key từ input.
* `key.separator=:` — mọi thứ bên trái dấu `:` là key, bên phải là value.

Input mẫu:

```
>example key:example value
>name:Stephane
```

Vào UI kiểm tra: message 1 có key `example key`, value `example value`; message 2 key `name`, value `Stephane`. Từ đây Kafka hash key để pin message về cùng partition — cùng `name` luôn về cùng partition, đảm bảo thứ tự per-key (đã học ở bài Topics/Partitions/Offsets).

Vì `first_topic` hiện chỉ có 1 partition nên mọi message dồn về partition 0, chưa thấy được hiệu ứng phân tán. Sang bài Consumer với topic 3 partitions bạn sẽ thấy rõ cùng key về cùng partition khác nhau thế nào.

Lưu ý: ở chế độ parse key, dòng nào **không có dấu `:`** sẽ ném exception ngay. Đó không phải lỗi Kafka — là input của bạn sai format đã khai báo.

## Cạm Bẫy Thường Gặp

* **Produce vào nhầm topic do gõ sai tên.** Trên Playground thì lỗi timeout khó hiểu; trên localhost thì vô tình tạo topic rác. Luôn `--list` trước khi produce.
* **Tưởng `acks=all` làm producer hiện gì đó khác.** Không. Khác biệt nằm ở độ bền backend, không nằm ở output terminal.
* **Quên `Ctrl+C` để thoát rồi tưởng terminal treo.** Dấu `>` là producer đang chờ input — cứ `Ctrl+C` là ra.
* **Dùng console producer để benchmark.** Đừng. Nó gửi từng dòng thủ công, throughput thấp. Benchmark dùng `kafka-producer-perf-test.sh`.

## Kết Luận

Tóm một câu: **`kafka-console-producer.sh --topic <tên> (+ --property parse.key=true --property key.separator=: nếu cần key)` là cách nhanh nhất để bơm dữ liệu test vào topic, mỗi dòng Enter là một message, luôn tạo topic trước thay vì trông chờ auto-create.**

Bài tiếp theo chúng ta sẽ đọc lại toàn bộ những message vừa gửi bằng `kafka-console-consumer.sh` — từ đọc message mới nhất, đọc từ đầu topic, tới hiện cả partition và timestamp để kiểm chứng thứ tự per-partition.
