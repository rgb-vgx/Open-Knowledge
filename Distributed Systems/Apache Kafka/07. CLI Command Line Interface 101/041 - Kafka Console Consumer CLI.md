# Kafka Console Consumer CLI: Đọc Message Và Kiểm Chứng Thứ Tự Per-Partition

Producer đã bơm message vào topic ở bài trước. Bài này chúng ta đọc lại chúng bằng `kafka-console-consumer.sh` — và nhân tiện kiểm chứng tận mắt khẳng định quan trọng nhất của Kafka: **thứ tự chỉ đảm bảo trong một partition, không đảm bảo giữa các partitions.**

---

## 1. Bài Toán: Tại Sao Consumer Chạy Mà Không Thấy Gì?

Người mới hay gặp cảnh: chạy consumer, terminal đứng im, tưởng consumer hỏng. Thực ra 90% là do consumer mặc định **chỉ đọc message mới (tail)** — message gửi từ trước đó nó bỏ qua hết. Hiểu hai chế độ đọc là xong:

* Mặc định: chỉ nhận message gửi **sau** thời điểm consumer khởi động.
* `--from-beginning`: đọc toàn bộ từ offset 0 tới hiện tại.

## 2. Đọc Message Mới Nhất (Tail Mode)

Chuẩn bị: tạo `second_topic` 3 partitions để thấy hiệu ứng phân tán (topic 1 partition ở bài trước không đủ):

```bash
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic second_topic --partitions 3 --replication-factor 1
```

Đọc tail:

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic second_topic
```

* `--topic second_topic` — topic cần đọc.
* Không có `--from-beginning` nghĩa là tail mode: đứng chờ message mới.

Terminal đứng im là bình thường — vì chưa ai gửi gì sau thời điểm consumer chạy. Mở thêm một terminal thứ hai, chạy producer phân tán đều:

```bash
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic second_topic \
  --producer-property partitioner.class=org.apache.kafka.clients.producer.RoundRobinPartitioner
```

* `partitioner.class=RoundRobinPartitioner` — ép mỗi message sang partition kế tiếp. Chỉ dùng để học: nhìn rõ message nhảy qua lại giữa partitions. **Tuyệt đối không dùng ở production** — đây là partitioner kém hiệu quả nhất, phá vỡ batching (mặc định Kafka dồn ~16KB vào cùng partition cho nhanh).

Gõ ở producer:

```
>hello world
>my name is Stephane
>it's working
```

Cả 3 dòng hiện ngay ở terminal consumer. Nhấn `Ctrl+C` để dừng consumer. Chạy lại đúng lệnh consumer đó mà không gửi gì thêm — terminal lại đứng im. Đó chính là tail mode: message cũ đã bị bỏ qua.

## 3. Đọc Từ Đầu: `--from-beginning`

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic second_topic --from-beginning
```

* `--from-beginning` — đọc từ offset 0 của mọi partition.

Output mẫu (thứ tự có thể khác máy bạn):

```
hello world
it's working
my name is Stephane
one
three
two
```

Bạn gửi theo thứ tự `hello world → my name is Stephane → it's working → one → two → three`, nhưng đọc ra lại lộn xộn (`three` trước `two`, `two` trước `one`). Đây không phải bug — là hệ quả tất yếu của 3 partitions: mỗi partition giữ thứ tự nội bộ, nhưng consumer đọc gộp từ 3 partitions thì thứ tự toàn cục không còn.

Đối chứng: đọc `first_topic` (1 partition) với `--from-beginning` sẽ ra đúng thứ tự gửi 100%. Muốn scale (nhiều partition) thì phải chấp nhận mất thứ tự toàn cục — đánh đổi cốt lõi của Kafka.

## 4. Hiện Partition, Key, Timestamp Với `--formatter`

Output mặc định chỉ in value — không biết message từ partition nào. Thêm formatter để soi:

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic second_topic --from-beginning \
  --formatter kafka.tools.DefaultMessageFormatter \
  --property print.timestamp=true \
  --property print.key=true \
  --property print.value=true \
  --property print.partition=true
```

* `--formatter kafka.tools.DefaultMessageFormatter` — bộ format output của consumer.
* `print.timestamp=true` — in thời điểm message được ghi.
* `print.key=true` — in key (mặc định ẩn, bài Producer ta gửi key null nên cột này sẽ là `null`).
* `print.value=true` — in value.
* `print.partition=true` — in số partition chứa message. Đây là flag quan trọng nhất bài này.

Output mẫu:

```
CreateTime:1700000000000  Partition:1  null  hello world
CreateTime:1700000001000  Partition:1  null  one
CreateTime:1700000002000  Partition:2  null  my name is Stephane
CreateTime:1700000003000  Partition:2  null  two
CreateTime:1700000004000  Partition:0  null  it's working
CreateTime:1700000005000  Partition:0  null  three
```

Đọc bảng này, mọi thắc mắc ở mục 3 được giải đáp: trong partition 1, `hello world` đứng trước `one` — đúng thứ tự; trong partition 2, `my name is Stephane` trước `two` — đúng thứ tự. Chỉ khi gộp 3 partitions lại mới thấy "lộn xộn". Trên UI Conduktor bạn cũng kiểm chứng được bằng cách lọc theo partition (Topics → `second_topic` → filter Partition 0 → chỉ còn 2 message).

## Cạm Bẫy Thường Gặp

* **Consumer chạy mà trống trơn.** Kiểm tra ngay: có quên `--from-beginning` không? Producer đã gửi gì sau khi consumer chạy chưa?
* **Hoảng vì message "sai thứ tự".** Với topic nhiều partition, đó là hành vi đúng. Cần thứ tự toàn cục cho một thực thể (một user, một đơn hàng) thì dùng key để pin về cùng partition.
* **Mang `RoundRobinPartitioner` lên production.** Nhắc lại: chỉ dùng để demo. Production để Kafka tự batch theo sticky partitioner mặc định.
* **Đọc topic nhiều partition bằng một console consumer rồi kết luận throughput thấp.** Một consumer đọc gộp nhiều partition không đại diện cho tốc độ thật — throughput thật đến từ consumer group nhiều consumer (bài sau).

## Kết Luận

Tóm một câu: **`kafka-console-consumer.sh --topic <tên>` đọc message mới, thêm `--from-beginning` để đọc từ đầu, thêm `--formatter ... --property print.partition=true` để thấy thứ tự per-partition — và chính output đó chứng minh thứ tự toàn cục không tồn tại trên topic nhiều partition.**

Bài tiếp theo chúng ta nâng cấp lên consumer group: chạy nhiều console consumer cùng một `--group` để xem Kafka chia partitions cho từng consumer ra sao, và chuyện gì xảy ra khi số consumer vượt số partition.
