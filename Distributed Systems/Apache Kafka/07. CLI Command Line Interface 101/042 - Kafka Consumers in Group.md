# Consumer Group: Chia Partitions Cho Nhiều Consumer Cùng Đọc Song Song

Một console consumer đọc gộp 3 partitions thì throughput bị giới hạn ở một tiến trình. Bài này chúng ta giải bài toán scale chiều đọc: chạy nhiều consumer cùng một `--group` để mỗi người ôm một tập partition riêng, đọc song song mà không message nào bị đọc trùng.

---

## 1. Bài Toán: 3 Partitions Thì Cần Mấy Consumer?

Hình dung `third_topic` có 3 partitions. Nếu chỉ có 1 consumer, nó phải đọc cả 3 — vừa chậm vừa là điểm chết duy nhất. Nếu có đúng 3 consumer cùng group, mỗi người một partition là đẹp nhất. Nếu có tới 4 consumer mà chỉ có 3 partitions thì sao? Consumer thừa sẽ ngồi chơi — và đó chính là demo của bài này.

Chuẩn bị topic sạch:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic third_topic --partitions 3 --replication-factor 1
```

## 2. Consumer Đầu Tiên Với `--group`

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic third_topic --group my-first-application
```

* `--group my-first-application` — khai báo consumer thuộc group nào. Đây là flag biến consumer đơn lẻ thành thành viên của consumer group, kích hoạt cơ chế chia partition và commit offset.

Terminal đứng im vì topic đang rỗng. Mở terminal thứ hai chạy producer rải đều (chỉ dùng để học, không dùng production):

```bash
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic third_topic \
  --producer-property partitioner.class=org.apache.kafka.clients.producer.RoundRobinPartitioner
```

Gõ `test` ở producer — chữ `test` hiện ngay ở consumer. Một mình nó đang ôm cả 3 partitions nên message nào cũng về tay nó.

## 3. Thêm Consumer Thứ Hai, Thứ Ba: Message Tự Chia

Giữ nguyên consumer 1, mở terminal thứ ba chạy **đúng lệnh consumer y hệt** (cùng topic, cùng `--group my-first-application`).

Gõ tiếp ở producer:

```
>hello
>world
>last
```

Kết quả mẫu:

* Consumer 1 nhận `hello` và `last`.
* Consumer 2 nhận `world`.

Không có message nào bị trùng — group đã chia 3 partitions thành 2 + 1. Consumer 1 ôm 2 partitions nên nhận 2 message, consumer 2 ôm 1 partition nên nhận 1.

Thêm consumer thứ ba (terminal thứ tư, cùng lệnh). Gõ tiếp:

```
>one
>two
>three
```

Mỗi consumer nhận đúng 1 message. Rebalance vừa xảy ra: group chia lại 3 partitions cho 3 consumer, mỗi người một cái — trạng thái cân bằng lý tưởng.

## 4. Khi Consumer Thừa: 4 Consumer Cho 3 Partitions

Mở consumer thứ tư cùng group. Gõ thêm message — consumer 4 không nhận gì cả.

Nguyên tắc sắt cần khắc ghi:

> **Số consumer đang chạy trong một group vượt quá số partition thì consumer thừa sẽ idle, không được gán partition nào.**

Không có lỗi, không có cảnh báo — chỉ đơn giản là không có việc để làm. Muốn tận dụng consumer 4 thì phải tăng partition của topic (xem `--alter` ở bài Topics CLI).

Thử tắt bớt một consumer (Ctrl+C ở consumer 3), gõ tiếp `a`, `b`, `c` — mỗi consumer còn lại nhận 1 message. Tắt tiếp consumer 2, chỉ còn consumer 1, gõ `d`, `e`, `f` — một mình nó nhận cả 3 (chia 2 + 1 kiểu cũ: ví dụ `d`, `e` về consumer 1a, `f` về consumer còn lại — phân bổ chính xác tùy đợt rebalance). Mỗi lần thêm/bớt consumer, group **rebalance**: dừng chia việc cũ, chia lại từ đầu trong vài giây.

## 5. Offset Đã Commit: Consumer Restart Chỉ Đọc Phần Còn Thiếu

Tiếp tục demo với group đang chạy. Giữ producer mở, gõ thêm `j`, `k` rồi tắt hết consumer đi (không consumer nào trong group còn chạy). Khởi động lại một consumer cùng group:

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic third_topic --group my-first-application
```

Nó nhận ngay `j` và `k` — phần message gửi trong lúc không ai đọc (lag). Nó **không** đọc lại từ đầu, vì offset đã commit cho group được lưu trên broker. Thứ tự `j` trước hay `k` trước có thể đảo do nằm khác partition — bình thường.

## 6. Group Mới + `--from-beginning`: Đọc Lại Từ Đầu

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic third_topic --group my-second-application --from-beginning
```

* `--group my-second-application` — group hoàn toàn mới, chưa có offset nào được commit.
* `--from-beginning` — vì là group mới nên flag này có tác dụng: đọc từ offset 0 mọi partition.

Output: toàn bộ message từ `test` tới `k` hiện ra. Chạy lại **đúng lệnh đó lần nữa** — lần này terminal đứng im. Vì sao? `my-second-application` giờ đã có offset committed, `--from-beginning` chỉ có ý nghĩa **lần đầu tiên group đọc topic**. Từ lần thứ hai, consumer luôn tiếp tục từ offset đã commit, flag này bị lờ đi.

Hai group `my-first-application` và `my-second-application` cùng đọc một topic mà không ảnh hưởng nhau — mỗi group có con trỏ offset riêng. Đây chính là mô hình "một dòng dữ liệu, nhiều hệ thống độc lập" (dashboard + notification cùng đọc `trucks_gps`) đã học ở bài lý thuyết.

## Cạm Bẫy Thường Gặp

* **Hai consumer cùng đọc mà message bị trùng.** Kiểm tra ngay `--group`: khác tên group là hai luồng đọc độc lập, trùng message là đúng. Muốn chia việc thì phải cùng tên group.
* **Thêm consumer mà throughput không tăng.** Đếm lại: consumer đã vượt partition chưa? Thừa thì idle, muốn nhanh hơn phải tăng partition trước.
* **Tưởng `--from-beginning` lúc nào cũng đọc từ đầu.** Chỉ đúng với group mới chưa commit offset. Group cũ muốn đọc lại phải reset offset (bài 044) — không có đường tắt.
* **Rebalance liên tục khi consumer chập chờn.** Consumer join/leave liên tục khiến group rebalance không ngừng, throughput sụt. Production cần tune `session.timeout.ms`, `max.poll.interval.ms` — consumer chết thật hay chỉ xử lý chậm phải phân biệt rõ.

## Kết Luận

Tóm một câu: **cùng `--group` thì Kafka chia mỗi partition cho đúng một consumer (thừa consumer thì ngồi chơi, thiếu thì một consumer ôm nhiều), offset commit theo group nên restart chỉ đọc phần thiếu, và `--from-beginning` chỉ linh nghiệm với group mới.**

Bài tiếp theo chúng ta soi sâu hơn bằng `kafka-consumer-groups.sh`: liệt kê group, `--describe` để thấy current-offset, log-end-offset và lag từng partition, và hiểu consumer không khai `--group` sẽ sinh ra group tạm thế nào.
