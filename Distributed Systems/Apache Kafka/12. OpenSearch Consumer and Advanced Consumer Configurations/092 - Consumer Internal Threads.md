# Luồng Ngầm Trong Consumer: Heartbeat, Poll Và Vì Sao Xử Lý Chậm Bị Đá Khỏi Group

Chuỗi 6 Parts (083–091) đã cho bạn pipeline chạy được: bulk nhanh, commit chủ động, shutdown sạch, replay an toàn. Hai bài cuối rời code để lên tầm vận hành. Bài này mổ **internal threads** của consumer — cơ chế khiến consumer xử lý chậm 6 phút bỗng bị rebalance, mất partitions đang đọc dở.

---

## 1. Vấn đề: Consumer Vẫn Sống Mà Sao Kafka Bảo Nó Chết?

Triệu chứng kinh điển production: consumer log vẫn chạy, CPU vẫn bận xử lý batch, nhưng Conduktor báo group rebalance liên tục, partitions nhảy qua lại giữa các members, lag không giảm mà log thì đầy `CommitFailedException` / `WakeupException` lạ.

Nguyên nhân: bạn tưởng consumer là một luồng, nhưng thực ra là **hai luồng độc lập** với hai nhiệm vụ sống còn khác nhau — và bạn để luồng xử lý "bóp nghẹt" luồng còn lại:

```mermaid
graph TB
    subgraph "KafkaConsumer (1 instance)"
        HT["Heartbeat Thread (nền)<br/>gửi heartbeat mỗi 3s<br/>=> 'tôi còn sống'"]
        PT["Poll Thread (chính)<br/>poll() lấy data + xử lý<br/>=> 'tôi còn làm việc'"]
    end
    HT -->|heartbeat.interval.ms<br/>session.timeout.ms| COORD["Group Coordinator<br/>(một broker)"]
    PT -->|poll() + max.poll.interval.ms| COORD
```

* Heartbeat thread chứng minh **process còn sống** (chưa crash, chưa kill).
* Poll thread chứng minh **đang tiến triển** (không kẹt trong xử lý).

Chết luồng nào cũng bị đá, nhưng vì lý do khác nhau — và fix cũng khác nhau. Không phân biệt được hai cái này thì tuning mù.

## 2. Cơ Chế: Hai Luồng, Hai Bộ Timer

### 2.1. Heartbeat thread — phát hiện crash

Luồng nền gửi heartbeat định kỳ tới Group Coordinator (một broker được bầu làm quản lý group).

| Config | Mặc định | Ý nghĩa |
|---|---|---|
| `heartbeat.interval.ms` | 3000 (3s) | Chu kỳ gửi heartbeat |
| `session.timeout.ms` | 45000 (45s, Kafka 3.0+; bản cũ 10000) | Quá từng này không thấy heartbeat → coi member chết → rebalance |

Quy tắc ngón tay cái: `heartbeat.interval.ms ≈ session.timeout.ms / 3`. Để 3s/45s mặc định là đã đúng tỉ lệ.

Khi nào chỉnh?

* Muốn **rebalance nhanh** khi consumer crash thật (kill pod, OOM): hạ xuống, ví dụ heartbeat 1s + session 4–10s. Đánh đổi: mạng chập chờn 5 giây là bị đá oan → rebalance thừa.
* Môi trường mạng ổn định, muốn ít rebalance oan: giữ hoặc tăng session timeout.

Heartbeat **không biết** bạn xử lý nhanh hay chậm. Consumer kẹt 10 phút trong `for` xử lý mà process còn sống thì heartbeat vẫn gửi đều — coordinator tưởng mọi thứ ổn. Đó là lý do cần luồng thứ hai.

### 2.2. Poll thread — phát hiện kẹt xử lý

Coordinator còn trông chờ `poll()` được gọi **thường xuyên**. Khoảng cách tối đa giữa hai `poll()` cho phép:

| Config | Mặc định | Ý nghĩa |
|---|---|---|
| `max.poll.interval.ms` | 300000 (5 phút) | Quá từng này không `poll()` → coi member lỗi xử lý → đá khỏi group, rebalance |

Kịch bản dính đòn với chính code Part 5: `poll()` trả 500 records JSON to, mỗi record parse + gắn bulk chậm, rồi `bulk()` tới OpenSearch free tier ở xa mất 6 phút mới xong → chưa kịp `poll()` tiếp thì đã quá 5 phút → bị đá. Partitions thu hồi, giao cho member khác, member khác đọc lại từ committed cũ → **xử lý trùng cả batch** (may idempotent nên không bẩn, nhưng tốn gấp đôi công).

Fix theo thứ tự ưu tiên:

1. **Xử lý nhanh lên**: bulk đã làm (Part 5), tăng `fetch` tuning bên dưới, tối ưu parse.
2. **Giảm việc mỗi vòng**: hạ `max.poll.records` (mặc định 500) xuống 100–200 nếu mỗi record nặng. Ít records/vòng → vòng nhanh → `poll()` dày.
3. **Nới timer**: tăng `max.poll.interval.ms` lên 10 phút cho job nặng (Spark, ML inference). Đừng nới vô tội vạ — consumer kẹt thật thì 10 phút sau mới phát hiện.

### 2.3. Cụm fetch tuning — throughput vs latency

Khi consumer đã ổn định (không rebalance oan) mà vẫn chậm, mới đụng tới nhóm này. Mặc định đủ tốt cho 90% trường hợp.

| Config | Mặc định | Tăng lên thì | Giảm xuống thì |
|---|---|---|---|
| `max.poll.records` | 500 | Batch dày, throughput cao, nhưng vòng lâu (dễ vượt `max.poll.interval`) | Vòng nhanh, `poll()` dày, ít trùng khi rebalance |
| `fetch.min.bytes` | 1 (byte) | Broker dồn đủ data mới trả → ít request, throughput cao, latency tăng | Trả ngay có gì → latency thấp, nhiều request |
| `fetch.max.wait.ms` | 500 | Chờ tối đa từng này để đủ `fetch.min.bytes` → trần của latency thêm | Trả sớm hơn, ít chờ |
| `max.partition.fetch.bytes` | 1MB | Mỗi partition trả nhiều hơn/vòng — tốn RAM (100 partitions × 1MB = 100MB+) | Tiết kiệm RAM, hợp consumer nhỏ, message to thì phải giảm |
| `fetch.max.bytes` | 55MB (bản mới; cũ 50MB) | Mỗi fetch trả nhiều hơn nếu đủ RAM | Hãm RAM khi partitions đông |

Ví dụ tuning có chủ đích:

* Pipeline Wikimedia → OpenSearch local cần **throughput**: `fetch.min.bytes=1MB`, `fetch.max.wait.ms=500`, `max.poll.records=500` — dồn batch dày cho bulk nuốt một lần.
* Consumer alerting cần **latency**: `fetch.min.bytes=1`, giữ `fetch.max.wait.ms` thấp — có 1 message là trả ngay, đừng chờ dồn.
* Consumer mobile RAM ít, đọc 100 partitions: hạ `max.partition.fetch.bytes` xuống 256KB để RAM ceiling ~25MB thay vì 100MB.

## 3. Code: Áp Vào Pipeline OpenSearch Thế Nào?

Không có code mới — chỉ là 3 profiles config minh họa gắn vào `createKafkaConsumer()`:

```java
// Profile 1: mặc định — học và demo (Part 2-6 đang dùng)
props.setProperty(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, "500"); // default, khỏi set cũng được

// Profile 2: record nặng / OpenSearch xa (Bonsai) — vòng nhanh, ít kẹt
props.setProperty(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, "100");
props.setProperty(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, "600000"); // 10 phút

// Profile 3: cần throughput local tối đa — dồn batch dày cho bulk
props.setProperty(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, String.valueOf(1024 * 1024)); // 1MB
props.setProperty(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, "500");
```

Giải thích:

* Đừng copy cả 3 profiles cùng lúc — chọn **một** theo mục tiêu (demo / chống kẹt / throughput).
* `MAX_POLL_INTERVAL_MS_CONFIG` chỉ nới khi đã đo và biết vòng xử lý dài bao nhiêu. Đo bằng log: timestamp `Received N` vòng này tới vòng sau. Nếu 6 phút thì set 10 phút + margin, đồng thời tìm cách giảm vòng (bulk nhỏ hơn, records ít hơn).
* Mọi tuning fetch đều phải đo lại lag trên Conduktor trước/sau. Không đo mà đoán là tuning mù —规则 đầu tiên của performance.

Thứ tự xử lý sự cố rebalance liên tục (runbook bỏ túi):

```
1. Log có "Member ... sending LeaveGroup" / "rebalance" dày? -> check heartbeat/session (mạng? GC pause dài?).
2. Log có "Maximum poll interval ... exceeded"? -> vòng xử lý quá lâu: giảm max.poll.records / tăng max.poll.interval / tối ưu bulk.
3. Lag tăng + không rebalance? -> không phải threads, là throughput: fetch tuning + bulk + partitions.
```

## 4. Bảng So Sánh: Hai Cái Chết Của Consumer

| Tiêu chí | Chết heartbeat (`session.timeout.ms`) | Chết poll (`max.poll.interval.ms`) |
|---|---|---|
| Nguyên nhân | Process crash/kill, mạng đứt, GC pause quá dài | Xử lý một batch quá lâu, kẹt vòng lặp, deadlock |
| Ai phát hiện | Thiếu heartbeat tới coordinator | Thiếu `poll()` tới coordinator |
| Mặc định | 45s không heartbeat | 5 phút không poll |
| Fix | Hạ heartbeat/session để phát hiện nhanh; chữa mạng/GC | Giảm `max.poll.records`; tăng interval; tối ưu xử lý |
| Triệu chứng log | `Member failed`, rebalance ngay sau crash | `Maximum poll interval exceeded`, rebalance khi consumer vẫn "sống" |
| Liên quan Part nào | Part 6 shutdown sạch (`close()` gửi LeaveGroup, không chờ timeout) | Part 5 bulk (vòng nhanh thì poll dày) |

Nhớ một câu: **heartbeat trả lời "còn sống không", poll trả lời "còn làm không"**. Sống mà không làm thì vẫn bị đá.

## 5. Pitfalls

* **Hạ `session.timeout.ms` quá thấp (1–2s) trên mạng chập chờn.** Heartbeat trễ 2s vì GC là bị đá oan → rebalance storm → càng rebalance càng chậm → vòng lặp chết. Production giữ ≥ 6–10s trừ khi mạng rất tốt.
* **Tăng `max.poll.interval.ms` lên 1 giờ để "khỏi bị đá".** Che triệu chứng, không chữa bệnh. Consumer kẹt thật thì 1 giờ sau mới phát hiện, lag đội lên trời. Luôn tối ưu vòng xử lý trước, nới timer sau.
* **Tăng `max.poll.records` lên 5000 tưởng "nhanh hơn".** Vòng 5000 records xử lý 8 phút → vượt interval → bị đá → đọc lại 5000 → vòng lặp trùng. Batch to chỉ nhanh khi xử lý kịp trong interval.
* **Set `fetch.min.bytes=5MB` cho consumer alerting.** Broker chờ dồn đủ 5MB mới trả → alert trễ hàng phút. Throughput và latency là trade-off trực tiếp — chọn một.
* **Quên RAM khi đọc nhiều partitions.** 100 partitions × `max.partition.fetch.bytes=1MB` = 100MB/vòng tối thiểu, chưa kể buffer, gson parse, bulk giỏ. Consumer OOM giữa chừng rồi đổ cho Kafka — oan.
* **Để default rồi kết luận "Kafka tự rebalance vô lý".** Rebalance luôn có lý do: crash, deploy rolling, scale members, hoặc 2 timer trên. Đọc log coordinator + consumer trước khi kết luận.

## Kết Luận

Tóm một câu: **heartbeat (`session.timeout.ms`) phát hiện chết process, `poll()` (`max.poll.interval.ms`) phát hiện kẹt xử lý — xử lý nhanh + poll dày thì ở lại group, không thì bị đá và đọc lại.**

Bài tiếp theo (093, bài cuối section) chúng ta sang tối ưu hạ tầng đa-datacenter: **replica fetching / rack awareness** — cho consumer đọc từ replica gần nhất thay vì leader xa, giảm latency và tiền cross-AZ — khép lại toàn bộ cấu hình consumer nâng cao.
