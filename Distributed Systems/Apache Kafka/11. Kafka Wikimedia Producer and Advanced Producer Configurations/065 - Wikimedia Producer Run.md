# Bấm Run Và Kiểm Chứng: Dữ Liệu Wikimedia Đã Vào Kafka Thật Chưa?

Code bài trước mới chỉ nằm trên IDE. Bài này trả lời câu hỏi quan trọng nhất của mọi pipeline: làm sao chắc chắn message đã vào đúng topic, đúng partition, consumer đọc được? Chúng ta sẽ tạo topic, run producer, rồi kiểm chứng bằng hai con đường độc lập — Conduktor UI và CLI.

---

## 1. Vấn đề: Producer Chạy Không Lỗi Chưa Có Nghĩa Là Dữ Liệu Đúng

`producer.send()` là async và mặc định không ném exception ra mặt bạn khi broker có vấn đề nhẹ — nó retry ngầm hoặc buffer lại. Log thấy JSON chảy không đồng nghĩa Kafka đã commit. Vì vậy quy trình kiểm chứng chuẩn luôn có ba bước: tạo topic đúng spec trước, quan sát log producer, rồi đọc lại từ Kafka bằng một consumer độc lập.

## 2. Cơ Chế: Tạo Topic Trước Rồi Mới Gửi

### 2.1. Vì sao phải tạo topic `wikimedia.recentchange` bằng tay?

Bạn có thể để broker tự tạo topic (auto-create) khi producer gửi lần đầu, nhưng topic đó sẽ có 1 partition và `replication.factor=1` với mọi default — không thể hiện được phân phối đa partition, và sang môi trường khác default có thể khác. Tạo tay để chốt spec:

| Thuộc tính | Giá trị lab | Vì sao |
|---|---|---|
| Tên | `wikimedia.recentchange` | Khớp code `String topic` ở bài 064 |
| Partitions | `3` | Đủ để thấy message phân phối (key null → sticky/round-robin) |
| Replication factor | `1` | Local chỉ có 1 broker, để 3 sẽ lỗi `NotEnoughReplicas` |

Tạo bằng Conduktor UI: Console → Topics → Create Topic → điền tên, partitions = 3, RF = 1. Hoặc CLI:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --create --topic wikimedia.recentchange --partitions 3 --replication-factor 1
```

### 2.2. Chuyện gì xảy ra khi bấm Run?

1. Log in toàn bộ producer config (`acks`, `batch.size`, `linger.ms`, `compression.type`...) — hãy lướt qua để làm quen, bài 066 sẽ mổ chi tiết.
2. Dòng `EventSource client using URI https://stream.wikimedia.org/...` báo SSE đã nối thành công.
3. Hàng loạt `INFO` in nội dung JSON từng event — chứng tỏ `onMessage` đang được gọi và `send()` đang chạy.
4. Song song, topic size trong Conduktor tăng liên tục (vài trăm record sau vài chục giây, lên MB rất nhanh). Mỗi record có key `null`, value là JSON với các field `type`, `title`, `user`, `bot`, `server_name`.

Key `null` là chủ ý của demo: message sẽ dàn đều trên 3 partitions thay vì dồn về một chỗ (cơ chế sticky partitioner ở bài 075).

## 3. Config Liên Quan

Bài này không đổi config nào — nhưng có ba điểm cần đối chiếu với log khởi động:

- **`bootstrap.servers = 127.0.0.1:9092`**: nếu log báo `Connection refused`, 99% là Docker Kafka chưa chạy hoặc đụng port (xem lại bài 062).
- **`acks` và `enable.idempotence`**: giá trị bạn thấy ở đây chính là default của client version đang dùng. Client 3.x sẽ là `acks=-1 (all)` + `enable.idempotence=true`; client 2.8 sẽ là `acks=1` + `false`. Ghi nhớ để bài 070 đối chiếu.
- **`batch.size=16384`, `linger.ms=0`, `compression.type=none`**: baseline chưa tuning. Bài 072-074 sẽ đổi cả ba.

## 4. Code Ví Dụ: Hai Cách Đọc Lại Để Kiểm Chứng

Không cần sửa code producer. Chỉ cần đọc lại topic bằng hai cách độc lập.

### 4.1. Cách 1 — Conduktor UI (trực quan)

Vào topic `wikimedia.recentchange` → tab Consumer/Data. Nhấn Refresh sẽ thấy số record và dung lượng tăng theo thời gian thực. Click vào một record xem value: JSON đầy đủ `type`, `title`, `user`, `bot`, `server_name`. Chuyển qua lại giữa các partition để xác nhận message đã dàn đều chứ không dồn một chỗ.

### 4.2. Cách 2 — CLI `kafka-console-consumer` (đối chứng)

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic wikimedia.recentchange
```

Lệnh này đọc từ "hiện tại trở đi" (latest), không đọc lại từ đầu — phù hợp vì stream chảy liên tục. Bạn sẽ thấy JSON tuôn màn hình, chứng tỏ producer và broker đều sống. Nhấn `Ctrl+C` để dừng. Nếu muốn đọc từ đầu:

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic wikimedia.recentchange --from-beginning
```

Cẩn thận: topic vài phút đã có hàng nghìn record, `--from-beginning` sẽ tuôn rất lâu. Với mạng SSE nhanh, CLI gần như không đọc kịp để "ngắm" — đó chính là lý do UI tồn tại: pause, filter, xem từng record.

## 5. Safe / High-Throughput Preset Liên Quan

Chưa áp preset. Nhưng bài này cho bạn **baseline để so sánh**: với config mặc định, producer vẫn nuốt kịp ~30 msg/s của Wikimedia trên localhost mà không lỗi. Mọi tuning sau phải tốt hơn baseline ở ít nhất một chiều (an toàn hơn hoặc nhanh hơn) mà không phá chiều còn lại.

```text
Baseline bài 065 (để đối chiếu sau):
- Topic: 3 partitions, RF=1, key=null -> dàn đều
- Producer: default client -> chạy ổn, log chảy, consumer đọc được
- Consumer: không cần config gì thêm dù sau này bật compression (broker/consumer tự xử)
```

## 6. Cạm Bẫy Thường Gặp

- **Chưa tạo topic mà trông chờ auto-create.** Vẫn chạy được nhưng topic chỉ có 1 partition — demo phân phối đa partition thất bại mà không báo lỗi rõ ràng.
- **Tạo topic RF=3 trên local 1 broker.** Producer gửi với `acks=all` sẽ nhận `NotEnoughReplicasException`. Local luôn RF=1 trừ khi bạn dựng 3 broker.
- **Producer báo nối được nhưng topic mãi rỗng.** Kiểm tra: (1) tên topic trong code khớp đúng `wikimedia.recentchange` (sai một ký tự là gửi sang topic khác, auto-create âm thầm); (2) mạng có ra được `stream.wikimedia.org` không (`curl -N` test như bài 063); (3) có bấm nhầm Stop ngay sau Run không.
- **Dùng `--from-beginning` trên topic lớn rồi tưởng treo.** Không treo, chỉ là quá nhiều dữ liệu. Dùng consumer không `--from-beginning` hoặc xem UI.
- **Kill producer bằng nút Stop và lo mất vài record cuối.** Bình thường ở lab: `send()` async còn vài record trong buffer chưa flush. Production sẽ dùng `flush()` + `close(timeout)` + callback — ra khỏi phạm vi bài này.
- **Để producer chạy hàng giờ quên tắt.** Topic local phình lên hàng GB, đầy disk Docker. Lab chỉ cần chạy vài phút để kiểm chứng rồi tắt. Muốn chạy dài hãy đặt retention ngắn cho topic lab.

## Kết Luận

Tóm lại một câu: **tạo topic 3 partitions trước, bấm Run thấy log JSON chảy và topic size tăng, rồi đối chứng bằng cả Conduktor UI lẫn `kafka-console-consumer` — ba tín hiệu cùng xanh thì pipeline Wikimedia mới coi là chạy thật.**

Bài tiếp theo chúng ta sẽ dừng lại một nhịp: mở log config producer vừa thấy ra mổ — `acks`, `batch.size`, `linger.ms`... mỗi cái nghĩa là gì, cái nào đáng tuning — để từ bài 067 đi sâu từng config một.
