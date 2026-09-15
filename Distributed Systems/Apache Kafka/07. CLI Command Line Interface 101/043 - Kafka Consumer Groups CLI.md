# Kafka Consumer Groups CLI: Soi Lag, Chia Việc Và Dọn Group Rác

Bài trước ta đứng ở góc nhìn consumer: chạy nhiều tiến trình cùng `--group` và quan sát message tự chia. Bài này đổi góc nhìn sang người vận hành: dùng `kafka-consumer-groups.sh` để trả lời 3 câu hỏi sống còn trong production — có bao nhiêu group đang đọc topic của tôi, mỗi group còn nợ bao nhiêu message (lag), và consumer nào đang ôm partition nào.

---

## 1. Bài Toán: Consumer Chạy Ngầm Thì Biết Nó Đang Ở Đâu?

Console consumer tắt đi là hết dấu vết, nhưng consumer group thì sống dai trên broker cùng với offset đã commit. Khi dashboard báo "dữ liệu trễ 10 phút", việc đầu tiên của on-call engineer là `--describe` group đó: lag bao nhiêu, kẹt ở partition nào, consumer nào còn sống. Bài này luyện đúng phản xạ đó.

Ba action chính:

| Action | Câu hỏi nó trả lời |
|---|---|
| `--list` | Có những group nào? |
| `--describe --group <tên>` | Group đó đọc tới đâu, nợ bao nhiêu? |
| `--delete --group <tên>` | Xóa group không dùng nữa |

## 2. Liệt Kê Group: `--list`

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
```

Output mẫu:

```
my-first-application
my-second-application
```

* `--bootstrap-server` — giống mọi lệnh CLI khác, trỏ tới cluster. Với Playground có bảo mật thì thêm `--command-config playground.config` như bài Topics CLI.

Hai group này chính là hai `--group` ta đã chạy ở bài trước. Trên UI Conduktor (mục Consumer Groups) bạn cũng thấy đúng 2 cái tên đó — CLI và UI đọc cùng một nguồn trên broker.

## 3. Mô Tả Group: `--describe` — Đọc Bảng Lag Như Dân Vận Hành

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --describe --group my-second-application
```

* `--describe` — xem chi tiết offset từng partition.
* `--group my-second-application` — group cần soi.

Output mẫu khi group đã đọc kịp (lag 0):

```
GROUP                 TOPIC        PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG  CONSUMER-ID       HOST
my-second-application third_topic  0          14              14              0    -                 -
my-second-application third_topic  1          14              14              0    -                 -
my-second-application third_topic  2          14              14              0    -                 -
```

Cách đọc từng cột:

* `PARTITION` — partition nào của topic.
* `CURRENT-OFFSET` — offset group đã commit (đã xử lý xong tới đây).
* `LOG-END-OFFSET` — offset mới nhất hiện có trong partition (producer đã ghi tới đây).
* `LAG = LOG-END-OFFSET − CURRENT-OFFSET` — số message còn nợ. **LAG là metric quan trọng nhất khi vận hành Kafka.** LAG = 0 là khỏe, LAG tăng dần là consumer đuối hoặc chết.
* `CONSUMER-ID` — id consumer đang ôm partition. Dấu `-` nghĩa là hiện không có consumer nào chạy (group đang dừng).

### 3.1. Demo tạo lag: produce thêm, chưa consume

Giữ group dừng (không consumer nào chạy), mở producer gửi 5 message vào `third_topic`:

```
>A
>B
>C
>D
>E
```

Chạy lại `--describe`:

```
GROUP                 TOPIC        PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG  CONSUMER-ID  HOST
my-second-application third_topic  0          14              16              2    -            -
my-second-application third_topic  1          13              14              1    -            -
my-second-application third_topic  2          25              27              2    -            -
```

`CURRENT-OFFSET` đứng yên (không ai đọc), `LOG-END-OFFSET` tăng (producer vẫn ghi) → LAG = 2, 1, 2. Tổng nợ 5 message — khớp đúng 5 dòng vừa gửi. Đây chính là cách on-call xác định "hệ thống trễ bao nhiêu message và kẹt ở partition nào".

### 3.2. Xả lag: chạy consumer, quan sát CONSUMER-ID

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic third_topic --group my-second-application
```

Consumer in ra đúng 5 message còn nợ. Trong lúc consumer còn chạy, mở terminal khác `--describe` lại — cột `CONSUMER-ID` giờ có giá trị (dài, ngẫu nhiên, ví dụ `console-consumer-b46f...`), cột `HOST` hiện địa chỉ máy chạy. LAG về 0 ở cả 3 dòng. Tắt consumer đi, `--describe` lại: `CONSUMER-ID` về `-` nhưng LAG vẫn 0 — offset đã commit nên group nhớ vị trí, không đọc lại.

### 3.3. Hai consumer cùng group: thấy tận mắt partition chia thế nào

Chạy thêm một console consumer nữa cùng `--group my-second-application`. `--describe` lúc cả hai đang chạy:

```
GROUP                 TOPIC        PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG  CONSUMER-ID
my-second-application third_topic  0          16              16              0    console-consumer-B46...
my-second-application third_topic  1          14              14              0    console-consumer-B46...
my-second-application third_topic  2          27              27              0    console-consumer-FA1...
```

Partition 0 và 1 cùng một CONSUMER-ID (B46...), partition 2 thuộc CONSUMER-ID khác (FA1...). Đây là bằng chứng dạng bảng cho hiện tượng đã thấy ở bài trước: một consumer ôm 2 partitions, consumer mới ôm 1. Trên UI Conduktor, mở group này bạn cũng thấy 2 consumer với tập partition được gán tương ứng.

## 4. Consumer Không Khai `--group`: Group Tạm Sinh Ra Rồi Tự Mất

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic third_topic --from-beginning
```

Lệnh này không có `--group`, nhưng Kafka vẫn cần group để commit offset nên nó tự sinh một group tên kiểu `console-consumer-12345`. Chạy `--list` ngay lúc đó bạn sẽ thấy group lạ xuất hiện. Vài phút sau khi tắt consumer, group này tự biến mất (broker dọn group rỗng, không commit mới).

Kết luận thực hành: **luôn khai `--group` explicit ở production.** Group tạm vừa khó giám sát (tên ngẫu nhiên), vừa không tái sử dụng được offset — mỗi lần chạy là đọc lại từ đầu hoặc mất vị trí.

## 5. Xóa Group: `--delete`

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --delete --group my-second-application
```

* `--delete` — xóa metadata group (offset đã commit) khỏi broker.

Chỉ xóa khi chắc chắn: không còn consumer nào trong group đang chạy, và bạn chấp nhận lần chạy sau với tên group này sẽ như group mới (kết hợp `--from-beginning` thì đọc lại từ đầu). Group đang có member active sẽ báo lỗi, phải dừng hết consumer trước.

## Cạm Bẫy Thường Gặp

* **Nhìn LAG = 0 rồi kết luận hệ thống khỏe.** LAG 0 trong khi `CONSUMER-ID` toàn `-` chỉ nghĩa là "không nợ vì không ai giao việc mới" — producer dừng thì LAG cũng 0. Phải đối chiếu với tốc độ producer.
* **LAG tăng đều ở một partition duy nhất.** Dấu hiệu partition đó nóng (key phân bố lệch) hoặc consumer ôm nó bị chậm. Đừng scale cả group vội — xem phân bố key trước.
* **Dùng group tạm để chạy job định kỳ.** Mỗi lần tên khác nhau, offset không kế thừa, monitoring không theo dõi được. Đặt tên group cố định, có ý nghĩa (`billing-retry-v2`, `search-indexer`).
* **Xóa nhầm group production.** Offset mất là phải đọc lại hoặc bỏ qua message — cả hai đều đau. Backup offset (ghi lại CURRENT-OFFSET trước khi xóa) hoặc dùng reset offset có `--dry-run` ở bài sau thay vì xóa.

## Kết Luận

Tóm một câu: **`kafka-consumer-groups.sh --list` để điểm danh, `--describe --group <tên>` để đọc LAG (`LOG-END-OFFSET − CURRENT-OFFSET`) và xem ai ôm partition nào, luôn đặt tên group explicit thay vì để Kafka sinh group tạm.**

Bài tiếp theo là bài nguy hiểm nhất section: reset offset — tua lại con trỏ đã commit để đọc lại dữ liệu cũ, với đầy đủ cảnh báo khi nào dùng `--to-earliest`, `--shift-by`, `--to-datetime` và khi nào tuyệt đối không được động vào.
