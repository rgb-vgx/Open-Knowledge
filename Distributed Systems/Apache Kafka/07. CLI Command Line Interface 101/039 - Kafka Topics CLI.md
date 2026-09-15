# Kafka Topics CLI: Tạo, Soi và Xóa Topic Bằng Tay

Producer chưa gửi được message nào nếu topic chưa tồn tại (trừ khi bạn bật auto-create — điều không nên làm ở production). Bài này biến `kafka-topics.sh` thành con dao đa năng: tạo topic đúng số partition và replication factor ngay từ đầu, liệt kê, mô tả chi tiết từng partition đang nằm ở broker nào, và xóa khi không cần nữa.

---

## 1. Chuẩn Bị Kết Nối: File `playground.config`

Khi làm việc với cluster có bảo mật (như Conduktor Playground), mọi lệnh topics đều cần thêm thông tin xác thực. Cách làm là tạo một file config 3 dòng ngay tại thư mục bạn chạy lệnh:

```bash
# Nội dung file playground.config (3 dòng)
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="..." password="...";
```

Từ đây, mọi lệnh với Playground đều có tiền tố chung:

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --list
```

* `--command-config playground.config` — truyền thông tin SASL/SSL cho cluster có bảo mật.
* `--bootstrap-server` — URL của cluster. Với localhost không bảo mật thì bỏ `--command-config` đi, chỉ giữ `--bootstrap-server localhost:9092`.

Một mẹo chẩn đoán: nếu chạy lệnh mà Kafka chỉ in ra cả trang help thay vì thực thi, nghĩa là bạn thiếu action (`--create`, `--list`, `--describe`, `--alter`, `--delete`). Đọc dòng lỗi đầu tiên, Kafka ghi rất rõ nguyên nhân.

## 2. Tạo Topic: `--create`

### 2.1. Tạo topic đơn giản nhất

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --create --topic first_topic
```

```bash
# Cùng lệnh trên localhost không bảo mật
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic first_topic
```

* `--create` — hành động tạo mới.
* `--topic first_topic` — tên topic. Đặt tên snake_case, không dấu, không khoảng trắng.

Output mẫu khi thành công:

```
Created topic first_topic.
```

Vào UI Conduktor (Console Home, chọn đúng playground ở góc phải) bạn sẽ thấy `first_topic` xuất hiện ngay — mặc định 3 partitions theo cấu hình của Playground.

### 2.2. Chỉ định rõ số partition

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --create --topic second_topic --partitions 5
```

* `--partitions 5` — tạo topic với 5 partitions (đánh số 0–4).

Luôn explicit số partition. Partition quyết định độ song song tối đa của consumer group (bao nhiêu consumer đọc cùng lúc). Tạo xong gần như không giảm được, chỉ tăng được — nên suy nghĩ trước, đừng để mặc định cho xong.

### 2.3. Replication factor: vì sao localhost chỉ dùng được `--replication-factor 1`?

```bash
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic third_topic --partitions 3 --replication-factor 2
```

Output mẫu (lỗi cố ý):

```
Error: replication factor: 2 larger than available brokers: 1
```

* `--replication-factor 2` — mỗi partition có 2 bản sao trên 2 broker khác nhau để chịu lỗi.

Nguyên tắc sắt: **replication factor không bao giờ được lớn hơn số broker.** Localhost của bạn chỉ có 1 broker nên chỉ dùng được `--replication-factor 1`. Trên Playground có hàng chục brokers (ví dụ 39 brokers), bạn có thể đặt 2, 3 tùy ý. Thực tế Playground ép mọi topic về replication factor 3 để tối ưu — dù bạn truyền `--replication-factor 1` hay `2`, kết quả describe vẫn ra 3.

Best practice production: replication factor 3 cho topic quan trọng.

## 3. Liệt Kê Topic: `--list`

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --list
```

Output mẫu:

```
first_topic
second_topic
third_topic
```

Có UI thì list bằng mắt nhanh hơn, nhưng trên server không UI hoặc trong script CI/CD, đây là cách duy nhất để kiểm tra topic đã tồn tại chưa trước khi produce.

## 4. Mô Tả Topic: `--describe` — Đọc Vị Leader, Replicas, ISR

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --describe --topic first_topic
```

* `--describe` — xem chi tiết cấu hình và vị trí từng partition.
* `--topic first_topic` — topic cần soi (bắt buộc đi kèm `--describe`).

Output mẫu (số broker sẽ khác máy bạn):

```
Topic: first_topic  TopicId: abc123  PartitionCount: 3  ReplicationFactor: 3
Topic: first_topic  Partition: 0  Leader: 31  Replicas: 31,15,5  Isr: 31,15,5
Topic: first_topic  Partition: 1  Leader: 14  Replicas: 14,1,9   Isr: 14,1,9
Topic: first_topic  Partition: 2  Leader: 7   Replicas: 7,22,11  Isr: 7,22,11
```

Cách đọc từng cột:

* `Partition: 0` — id của partition trong topic (0, 1, 2).
* `Leader: 31` — broker 31 đang là leader, mọi ghi/đọc của partition 0 đi qua nó.
* `Replicas: 31,15,5` — 3 bản sao nằm trên broker 31, 15, 5. Đếm số lượng là ra replication factor.
* `Isr: 31,15,5` — In-Sync Replicas, các bản sao đang đồng bộ kịp leader. Nếu `Isr` ít hơn `Replicas` nghĩa là có broker chép chậm hoặc chết — dấu hiệu cần điều tra.

So sánh với localhost 1 broker để khỏi nhầm lẫn hai loại số:

```
Topic: first_topic  Partition: 0  Leader: 0  Replicas: 0  Isr: 0
```

Ở đây `Partition: 0` là id partition, còn `Leader: 0`, `Replicas: 0` là broker id 0. Trùng số 0 nhưng ý nghĩa hoàn toàn khác nhau.

### Tăng số partition: `--alter`

Partition chỉ tăng, không giảm. Khi topic bị nghẽn (consumer lag kéo dài, throughput ghi tăng), bạn nới rộng bằng:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 \
  --alter --topic first_topic --partitions 6
```

* `--alter` — sửa cấu hình topic đã tồn tại.
* `--partitions 6` — số partition mới, bắt buộc lớn hơn số hiện tại.

Lưu ý: tăng partition phá vỡ thứ tự key cũ (key trước đây về partition 0–2 giờ có thể về 3–5) và làm loãng dữ liệu. Hãy tăng khi topic còn ít dữ liệu hoặc đã chấp nhận đánh đổi thứ tự.

## 5. Xóa Topic: `--delete`

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --delete --topic second_topic
```

Output mẫu:

```
# Không in gì đặc biệt, kiểm tra lại bằng --list
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> --list
```

> Cảnh báo Windows: nếu bạn dùng Windows thuần (không WSL2), **đừng chạy `--delete`** trong bài lab này. Có lỗi đã biết khiến cluster local crash nặng sau khi xóa topic. Bỏ qua bước delete trên Windows, xem kết quả trên Playground là đủ.

Trên Playground bạn cũng có thể xóa bằng UI cho nhanh. CLI sinh ra là để dùng khi không có UI hoặc cần script hàng loạt.

## Cạm Bẫy Thường Gặp

* **Quên `--bootstrap-server` hoặc `--command-config`.** Lệnh in help thay vì chạy. Luôn kiểm tra 3 mảnh: công cụ + kết nối + action.
* **Đặt replication factor lớn hơn số broker.** Lỗi `larger than available brokers` là chắc chắn. Localhost 1 broker thì replication factor luôn là 1.
* **Nhầm partition id với broker id trong output `--describe`.** `Partition: 0` khác `Leader: 0`. Đọc theo tên cột, đừng đoán theo số.
* **Xóa topic trên Windows non-WSL2.** Treo cluster như đã cảnh báo ở trên.
* **Phó mặc số partition cho default.** Sau này muốn giảm không được, tăng thì ảnh hưởng key. Hãy chọn explicit ngay lúc `--create`.

## Kết Luận

Tóm một câu: **`kafka-topics.sh` xoay quanh 5 action `--create --list --describe --alter --delete`, luôn đi kèm `--bootstrap-server`, thêm `--command-config` khi cluster có bảo mật, và output `--describe` cho bạn biết chính xác mỗi partition đang sống ở broker nào.**

Bài tiếp theo chúng ta sẽ gửi message đầu tiên vào topic vừa tạo bằng `kafka-console-producer.sh` — và xem chuyện gì xảy ra khi produce vào topic chưa tồn tại, khi gửi không key và khi gửi có key.
