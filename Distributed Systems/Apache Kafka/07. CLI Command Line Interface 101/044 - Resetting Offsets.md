# Resetting Offsets: Tua Lại Con Trỏ Consumer — Thao Tác Nguy Hiểm Nhất Section

Consumer group nhớ vị trí bằng offset đã commit. Bình thường nó chỉ tiến về phía trước. Bài này học cách bẻ con trỏ đó quay ngược lại để đọc lại dữ liệu cũ — kỹ năng cứu nguy khi deploy code lỗi bỏ sót message, nhưng cũng là thao tác dễ gây đọc trùng hàng loạt hoặc bỏ qua dữ liệu nếu làm ẩu.

---

## 1. Bài Toán: Deploy Lỗi, Cần Đọc Lại 5 Message Vừa Bỏ Qua

Tình huống ở bài trước: `my-first-application` đọc `third_topic`, producer gửi thêm A, B, C, D, E tạo lag 2, 1, 2. Giả sử consumer chạy bản code lỗi, commit offset nhưng xử lý sai — 5 message coi như mất dù vẫn nằm trong topic (Kafka giữ 7 ngày mặc định). Xóa group rồi đọc lại từ đầu thì quá thô bạo. Reset offset cho phép tua chính xác về điểm cần thiết.

Điều kiện tiên quyết, nhắc 3 lần vì quan trọng:

> **Không một consumer nào của group được đang chạy khi reset. Dừng hết consumer trước, reset xong mới khởi động lại.**

Reset trong lúc consumer chạy sẽ bị từ chối (báo lỗi `member still active`) hoặc tệ hơn — consumer đang chạy commit đè lên vị trí bạn vừa reset.

## 2. Quy Trình Chuẩn: `--describe` → `--dry-run` → `--execute`

Mọi lần reset đều đi 3 bước. Bỏ bước nào cũng là liều lĩnh.

### Bước 1 — Xem vị trí hiện tại

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --describe --group my-first-application
```

```
GROUP                TOPIC        PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
my-first-application third_topic  0          14              16              2
my-first-application third_topic  1          13              14              1
my-first-application third_topic  2          25              27              2
```

Group đang nợ 5 message — đúng 5 message code lỗi vừa xử lý sai.

### Bước 2 — Chạy thử với `--dry-run`

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-first-application \
  --reset-offsets --to-earliest \
  --topic third_topic --dry-run
```

* `--reset-offsets` — chuyển lệnh sang chế độ reset (không có flag này thì các flag bên dưới vô nghĩa).
* `--to-earliest` — tua về offset nhỏ nhất còn lưu trong partition (đầu dữ liệu còn retention).
* `--topic third_topic` — giới hạn reset trên topic này (bỏ flag topic là reset toàn bộ topic group đang đọc — cực kỳ nguy hiểm).
* `--dry-run` — chỉ in kế hoạch, **không thay đổi gì**.

Output mẫu:

```
GROUP                TOPIC        PARTITION  NEW-OFFSET
my-first-application third_topic  0          0
my-first-application third_topic  1          0
my-first-application third_topic  2          0
```

NEW-OFFSET = 0/0/0 nghĩa là sẽ đọc lại từ đầu. Kiểm tra kỹ bảng này — đây là cơ hội cuối để phát hiện mình chọn nhầm chiến lược.

### Bước 3 — Thực thi với `--execute`

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-first-application \
  --reset-offsets --to-earliest \
  --topic third_topic --execute
```

* `--execute` — thực sự ghi offset mới. Thay `--dry-run` bằng `--execute`, không bao giờ dùng cả hai cùng lúc.

Kiểm tra lại bằng `--describe`: LAG phình to (bằng toàn bộ message trong topic) vì CURRENT-OFFSET về 0 trong khi LOG-END-OFFSET đứng yên. Khởi động lại consumer cùng group — nó đọc lại toàn bộ từ đầu. Đọc xong, LAG về 0.

Trên UI Conduktor (Consumer Groups → chọn group → Reset Offsets) bạn làm được điều tương tự bằng vài click: chọn topic, chọn partition, chọn strategy — trực quan hơn và khó gõ nhầm hơn CLI.

## 3. Khi Nào Dùng Chiến Lược Nào?

`--to-earliest` chỉ là một trong nhiều chiến lược. Chọn sai là đọc trùng cả triệu message hoặc nhảy cóc mất dữ liệu:

```bash
# Về đầu dữ liệu còn lưu (đọc lại toàn bộ)
--reset-offsets --to-earliest --topic third_topic --execute

# Về cuối topic (bỏ qua mọi message cũ, chỉ đọc message mới từ giờ)
--reset-offsets --to-latest --topic third_topic --execute

# Lùi/tới N message từ vị trí hiện tại (âm = lùi, dương = tới)
--reset-offsets --shift-by -10 --topic third_topic --execute

# Nhảy tới offset tuyệt đối (khi đã biết chính xác con số từ log lỗi)
--reset-offsets --to-offset 12345 --topic third_topic:0 --execute

# Nhảy tới thời điểm (đọc lại từ 8h sáng hôm qua, ví dụ sau sự cố deploy lúc 7h)
--reset-offsets --to-datetime 2026-09-15T08:00:00.000 --topic third_topic --execute

# Về vị trí đã commit hiện tại (hủy các thay đổi reset thử nghiệm chưa execute)
--reset-offsets --to-current --topic third_topic --execute
```

Bảng quyết định nhanh:

| Tình huống | Chiến lược |
|---|---|
| Code lỗi bỏ sót, cần xử lý lại toàn bộ | `--to-earliest` |
| Dữ liệu cũ đã vô nghĩa (test, spam), chỉ cần message mới | `--to-latest` |
| Chỉ lỗi N message gần nhất (biết số lượng) | `--shift-by -N` |
| Biết chính xác offset hỏng từ log/monitoring | `--to-offset <số>` |
| Biết chính xác thời điểm sự cố bắt đầu | `--to-datetime <mốc>` |
| Reset nhầm, muốn hoàn tác trước khi consumer chạy lại | `--to-current` (chỉ có tác dụng nếu offset chưa bị consumer mới commit đè) |

Lưu ý `--to-datetime`: Kafka tìm offset đầu tiên có timestamp ≥ mốc bạn đưa, theo timestamp ghi của broker (hoặc timestamp trong payload tùy cấu hình topic). Sai lệch vài message quanh mốc là bình thường — đừng mong chính xác tuyệt đối.

Có thể giới hạn theo partition: `--topic third_topic:0,1` chỉ reset partition 0 và 1, partition 2 giữ nguyên. Hữu ích khi chỉ một partition bị lỗi key lệch.

## 4. Ba Kịch Bản Tuyệt Đối Không Reset Bừa

1. **Consumer vẫn đang chạy.** Dừng hết đã. Reset trong lúc rebalance có thể cho kết quả nửa vời: partition này reset xong, partition kia bị commit đè.
2. **Không giới hạn `--topic` trên group đọc nhiều topic.** Một lệnh reset không `--topic` tua toàn bộ group — hệ thống downstream nhận lũ đọc trùng từ mọi nguồn cùng lúc.
3. **Reset về `--to-latest` để "xả lag cho nhanh".** Lag là triệu chứng, không phải bệnh. Xả bằng cách bỏ qua message nghĩa là chấp nhận mất dữ liệu. Chỉ dùng khi đã xác nhận với nghiệp vụ rằng dữ liệu nợ đó bỏ được.

Mọi thao tác reset ở production nên đi kèm: ghi lại output `--describe` trước reset (để hoàn tác), chạy `--dry-run` và paste kết quả vào ticket/change request, reset giờ thấp điểm, và báo trước cho team downstream về đợt đọc trùng sắp tới (consumer cần idempotent để chịu được đọc trùng — chủ đề của phần Exactly-Once sau này).

## Cạm Bẫy Thường Gặp

* **Nhầm `--dry-run` với `--execute`.** Chạy `--dry-run` xong tưởng đã reset, khởi động consumer và ngạc nhiên vì không đọc lại gì. Luôn `--describe` sau reset để xác nhận offset đã đổi.
* **Dùng `--shift-by` số dương quá tay.** `--shift-by 10000` trong lúc LAG chỉ 100 là nhảy qua cả message chưa đọc — mất dữ liệu âm thầm, không báo lỗi.
* **Reset xong quên khởi động lại consumer rồi kết luận "reset không có tác dụng".** LAG sau reset phình to là đúng — phải chạy consumer nó mới xả.
* **Reset group sai vì tên giống nhau (`billing` vs `billing-retry`).** `--list` và `--describe` đúng tên trước, copy-paste tên group thay vì gõ tay.

## Kết Luận

Tóm một câu: **reset offset là dừng hết consumer → `--describe` ghi lại vị trí → `--dry-run` kiểm tra kế hoạch → `--execute` → `--describe` xác nhận → mới khởi động lại consumer; chọn `--to-earliest` để đọc lại toàn bộ, `--shift-by -N` / `--to-datetime` để tua chính xác, `--to-latest` chỉ khi chấp nhận mất dữ liệu cũ.**

Section CLI tới đây là trọn vẹn: tạo topic, produce, consume, group, soi lag, reset offset. Bài tiếp theo chúng ta rời terminal một chút để nhìn lại toàn bộ những gì vừa làm dưới góc UI Conduktor — công cụ giúp bạn làm mọi thao tác trên bằng click chuột khi không muốn gõ lệnh.
