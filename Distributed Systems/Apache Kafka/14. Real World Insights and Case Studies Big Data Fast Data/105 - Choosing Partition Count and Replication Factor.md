# Chọn Partition Count Và Replication Factor: Hai Con Số Quyết Định Số Phận Topic

Bạn có thể chọn sai serializer rồi sửa, chọn sai API rồi migrate. Nhưng hai con số **partition count** và **replication factor** khi tạo topic thì khác: đổi giữa chừng vừa tốn kém vừa phá vỡ cam kết (mất ordering theo key, tăng tải replication, tốn disk). Bài này cho bạn cách chọn đúng ngay từ đầu.

---

## 1. Vì Sao Hai Tham Số Này Quan Trọng Nhất?

Hãy hình dung topic có 2 partitions, replication factor 2. Mỗi partition có 1 leader + 1 follower nằm trên 2 brokers.

Chuyện gì xảy ra nếu đổi giữa vòng đời topic?

| Thay đổi giữa chừng | Hậu quả |
|---|---|
| **Tăng partition count** (2 -> 3) | Key từng về partition cũ giờ hash sang partition mới — **vỡ ordering theo key**. Consumer dùng key để giữ thứ tự (user_id, taxi_id, post_id) sẽ thấy dữ liệu cùng key xuất hiện ở 2 partitions khác nhau |
| **Tăng replication factor** (2 -> 3) | Mỗi partition thêm 1 replica: thêm network replication, thêm disk, thêm latency nếu `acks=all` (phải chờ thêm 1 replica acknowledge) |

Cả hai đều "làm được" về mặt kỹ thuật (Kafka cho tăng partitions, và tăng replication bằng reassignment), nhưng cái giá là H performance đảo lộn và cam kết cũ vỡ. Vì vậy phải tính toán trước khi `create topic`.

## 2. Partition Count: Cân Giữa Song Song Và Chi Phí

### 2.1. Nguyên lý: mỗi partition là một đơn vị song song

Thông lượng (throughput) của một partition đơn lẻ bị giới hạn bởi tốc độ ghi/đọc của một broker — thực tế đo được khoảng **vài MB/s** (tùy phần cứng, phải benchmark trên cluster của chính bạn).

Thêm partitions nghĩa là:

* **Tốt:** dàn tải ra nhiều brokers, chạy được nhiều consumers trong một group hơn (số consumer active tối đa = số partitions), chịu được peak throughput cao hơn.
* **Xấu:** nhiều leader elections hơn khi broker chết (với ZooKeeper; KRaft/KIP-500 cải thiện điểm này), nhiều file handles mở trên broker, nhiều memory cho replication, nhiều internal bookkeeping.

### 2.2. Công thức khởi đầu (rule of thumb)

> **Cluster nhỏ (< 6 brokers): partitions = 3 x số brokers. Cluster lớn (> 12 brokers): partitions = 2 x số brokers.**

Ví dụ: cluster 3 brokers -> bắt đầu với ~9 partitions cho topic throughput trung bình. Cluster 15 brokers -> ~30 partitions.

Sau đó **điều chỉnh lên** nếu:

* Bạn biết sẽ có nhiều consumers trong group cần chạy song song để đuổi kịp peak (flash sale, giao thừa với GetTaxi, trending với MySocialMedia).
* Producer throughput dự kiến tăng mạnh trong 1-2 năm tới. Rẻ hơn nhiều nếu provision dư từ đầu thay vì tăng sau và vỡ ordering key.

Và luôn **test thực tế**: benchmark producer throughput/partition trên phần cứng của bạn, rồi chia tổng throughput mục tiêu cho con số đó.

### 2.3. Giới hạn toàn cluster (đừng tạo 1000 partitions "cho chắc")

| Giới hạn | Con số (thời ZooKeeper) |
|---|---|
| Tổng partitions toàn cluster | Tối đa ~**200.000** (giới hạn scaling ZooKeeper) |
| Partitions mỗi broker | Soft limit ~**4.000** |
| Vượt quá thì sao? | Thêm brokers. Vượt 200.000 thì theo mô hình Netflix: tách thêm Kafka cluster độc lập |
| Tương lai KRaft | Không còn ZooKeeper, mục tiêu scale tới **hàng triệu partitions** |

Sai lầm kinh điển của người mới: topic nào cũng 1000 partitions "cho chắc ăn throughput". Kết quả là cluster vài chục topics đã chạm trần file handles và elections chậm chạp. **Bắt đầu hợp lý, đo, rồi mới tăng.**

## 3. Replication Factor: Cân Giữa Bền Vững Và Tốc Độ

### 3.1. Nguyên lý: N replicas chịu được N-1 brokers chết

| Replication factor | Chịu lỗi | Cái giá |
|---|---|---|
| 1 | Broker chết là mất dữ liệu (leader duy nhất) — **cấm ở production** | Nhanh nhất, rẻ nhất, và nguy hiểm nhất |
| 2 | Chịu được 1 broker chết | Tối thiểu cho production, availability vừa phải |
| **3 (khuyến nghị mặc định)** | Chịu được 2 brokers chết, availability tốt với `min.insync.replicas=2` + `acks=all` (mặc định từ Kafka 3.0) | Tốn thêm 50% disk so với factor 2, latency cao hơn vì chờ nhiều replica acknowledge |
| 4 | Khi dữ liệu cực kỳ quan trọng | Replication nặng, chỉ dùng có lý do rõ ràng |

### 3.2. Khuyến nghị thực hành

1. **Mặc định production: replication factor = 3** (đòi hỏi ít nhất 3 brokers). Đừng bao giờ để 1 ở production — đó là lỗi phổ biến nhất giảng viên thấy ngoài thực tế.
2. **Nếu replication làm chậm producer:** nâng cấp broker (disk nhanh hơn, network tốt hơn) thay vì hạ replication factor. Đánh đổi durability lấy latency là giao dịch lỗ về dài hạn.
3. **Kết hợp với `acks=all` + `min.insync.replicas=2`:** bộ ba này cho durability + availability cân bằng. `acks=all` chờ đủ replicas, `min.insync.replicas` đảm bảo vẫn ghi được khi 1 broker chết.

## 4. Checklist Trước Khi Tạo Topic Production

```bash
# Ví dụ: topic orders, cluster 3 brokers, throughput trung bình
bin/kafka-topics.sh --create \
  --bootstrap-server localhost:9092 \
  --topic orders \
  --partitions 9 \
  --replication-factor 3 \
  --config min.insync.replicas=2 \
  --config retention.ms=604800000
```

Giải thích từng lựa chọn:

* `--partitions 9`: 3 brokers x 3 theo công thức cluster nhỏ.
* `--replication-factor 3`: mặc định production.
* `min.insync.replicas=2`: chịu được 1 broker chết mà vẫn ghi được với `acks=all`.
* `retention.ms=604800000` (7 ngày): mặc định Kafka. Topic log/metrics ephemeral có thể ngắn hơn, topic transactions/bank cần đổ sang lưu trữ dài hạn qua Connect Sink thay vì giữ mãi trong Kafka.

## Cạm Bẫy Thường Gặp

* **Tăng partitions sau khi đã dùng key, rồi ngạc nhiên vì mất thứ tự.** Key hash modulo số partitions — đổi mẫu số là đổi mapping. Nếu nghiệp vụ bắt buộc ordering theo key (lịch sử giao dịch một tài khoản), hãy chốt partition count từ đầu.
* **Replication factor 1 ở production "vì mới demo".** Demo sống 3 tháng thành hệ thống thật, broker chết một lần là mất dữ liệu không cứu được.
* **Mỗi topic 1000 partitions cho "chắc".** Vài chục topic kiểu này là cluster chạm trần 200.000 partitions, ZooKeeper elections chậm, brokers ngốn file handles.
* **Không benchmark mà đoán throughput/partition.** "Vài MB/s" là ước lượng, con số thật phụ thuộc disk, network, message size, compression, acks. Đo trên cluster của bạn.
* **Quên rằng partitions cũng giới hạn số consumer.** Group 20 consumers mà topic 6 partitions thì 14 consumers ngồi chơi. Muốn scale consumer thì phải có đủ partitions từ đầu.

## Kết Luận

Nhớ hai câu thần chú: **partitions chốt theo throughput + số consumer song song cần thiết (khởi đầu 2-3x số brokers, rồi benchmark), replication factor chốt 3 cho production và không bao giờ 1.** Đắt hơn một chút disk hôm nay rẻ hơn nhiều so với vỡ ordering hay mất dữ liệu ngày mai.

Bài tiếp theo chúng ta lo chuyện tưởng nhỏ mà gây đau đầu lớn khi cluster có hàng trăm topics: **đặt tên topic sao cho có quy ước, tìm kiếm và phân quyền được.**
