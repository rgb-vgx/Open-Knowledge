# Auto Offset Commit: Vì Sao Mặc Định Là At-Least-Once (Và Khi Nào Mất Bảo Đảm Đó)?

Suốt các bài consumer ta chưa từng gọi `commit()` mà restart vẫn đọc tiếp đúng chỗ. Ai đã commit offset hộ ta? Bài này bóc cơ chế **auto commit**: `enable.auto.commit=true` + `auto.commit.interval.ms=5000` phối hợp với `poll()` ra sao, điều kiện nào cho at-least-once, và khi nào lỡ commit trước khi xử lý xong.

---

## 1. Concept: Commit tự động chạy theo nhịp `poll()`

Hai config quyết định (cả hai đều là default nên log consumer nào cũng thấy):

* `enable.auto.commit = true` — cho phép consumer tự commit nền.
* `auto.commit.interval.ms = 5000` — chu kỳ tối thiểu giữa hai lần commit: 5 giây.

Cơ chế chính xác (hiểu sai chỗ này là mất at-least-once):

1. Bạn gọi `poll()`. Timer 5 giây bắt đầu chạy từ lần commit trước.
2. Broker trả message. Bạn xử lý (log, ghi DB, gọi API...).
3. Bạn gọi `poll()` tiếp. Lúc này consumer kiểm tra: từ lần commit trước đã quá 5 giây chưa?
   * Chưa → thôi, poll tiếp như thường.
   * Rồi → **commit bất đồng bộ (commit async)** offset của batch vừa xử lý xong, rồi mới thực hiện poll mới. Timer reset.

Điểm mấu chốt: commit xảy ra **trong lần `poll()` tiếp theo sau khi đủ 5 giây**, và commit offset của **batch đã poll về và (giả định là) đã xử lý xong**. Toàn bộ suy luận at-least-once / at-most-once đều từ đây mà ra.

### Khi nào là at-least-once?

Điều kiện duy nhất: **mọi message poll về đều được xử lý thành công TRƯỚC khi gọi `poll()` tiếp theo.**

Vì commit luôn đi sau xử lý, nếu app crash giữa chừng (đang xử lý batch, chưa kịp poll tiếp → chưa commit), lần restart sau consumer đọc lại từ committed offset cũ → batch đang dở được đọc lại. Đọc lại còn hơn mất — đó là at-least-once.

### Khi nào vỡ bảo đảm?

* **Xử lý bất đồng bộ sau poll.** Poll về quăng sang thread khác xử lý rồi poll tiếp ngay. Commit 5 giây tick trong khi thread xử lý còn chạy → commit offset của message **chưa xử lý xong**. Crash lúc này là mất message (at-most-once ngoài ý muốn).
* **Poll tiếp khi batch cũ chưa xong.** Cùng bản chất: commit vượt mặt xử lý.
* Muốn kiểm soát chặt (commit đúng sau khi DB ghi xong, retry khi lỗi...) phải tắt auto (`enable.auto.commit=false`) và tự gọi `commitSync()`/`commitAsync()` — đó là chủ đề advanced, khóa này chỉ chỉ mặt đặt tên.

## 2. Code: Không cần code mới — đọc log consumer cũ

Bài này không thêm class. Mở lại `ConsumerDemoWithShutdown` (hoặc bản cooperative) và nhìn hai dòng trong log khởi động:

```
auto.commit.interval.ms = 5000
enable.auto.commit = true
```

Đối chiếu với poll loop đã có:

```java
while (true) {
    // Mỗi lần poll: nếu từ commit trước đã quá 5s
    // -> commit async offset batch cũ, rồi mới poll batch mới
    ConsumerRecords<String, String> records =
            consumer.poll(Duration.ofMillis(1000));

    // Điều kiện at-least-once: xử lý HẾT records ở đây...
    for (ConsumerRecord<String, String> record : records) {
        log.info("Key: " + record.key() + ", Value: " + record.value());
        log.info("Partition: " + record.partition() + ", Offset: " + record.offset());
    }
    // ...TRƯỚC khi vòng lặp gọi poll() tiếp theo
}
```

Minh họa timeline (interval 5s):

```
t=0s   poll() -> batch A (xử lý A xong)
t=1s   poll() -> batch B (xử lý B xong)      [chưa đủ 5s, chưa commit]
t=3s   poll() -> batch C (xử lý C xong)      [chưa đủ 5s, chưa commit]
t=6s   poll() -> VÌ đã quá 5s: commit async offset A+B+C, rồi mới poll batch D
       timer reset, chu kỳ mới bắt đầu
```

Vì vòng lặp mẫu xử lý đồng bộ (log xong mới poll tiếp) nên ta đang ở at-least-once đúng chuẩn. Crash ở bất kỳ đâu trước commit → đọc lại, không mất.

## 3. Chạy và kiểm tra

1. Run consumer bất kỳ từ bài trước, restart giữa chừng khi đang có dữ liệu mới: consumer đọc tiếp từ committed offset, không đọc lại hàng loạt cũ, không bỏ sót mới. Đó là auto commit đang làm việc.
2. Muốn thấy commit thưa: để consumer poll topic rỗng 10 giây — không có batch mới thì không có gì để commit, log im lặng là bình thường.
3. Muốn thấy commit dày: produce liên tục + xử lý nhanh — mỗi ~5 giây một commit async nền. Bật log DEBUG `org.apache.kafka.clients.consumer` sẽ thấy dòng commit (mặc định INFO không hiện).
4. Kiểm chứng at-least-once: produce 10 message, kill -9 consumer ngay khi nó đang log batch (chưa tới kỳ commit), restart → vài message cuối batch được đọc lại. Đọc lại = đúng thiết kế, không phải bug.

## 4. Pitfalls

* **Tưởng commit theo đồng hồ đúng 5 giây một lần.** Sai. Commit chỉ xảy ra **khi gọi `poll()`** và đã quá 5 giây. App ngừng poll (treo ở xử lý nặng 1 phút) thì suốt 1 phút đó không commit gì cả — và broker còn có thể đá consumer khỏi group vì không poll.
* **Xử lý chậm hơn poll timeout rồi đổ lỗi commit.** Vấn đề thật là `max.poll.interval.ms` (mặc định 5 phút): quá thời gian này không poll lại thì bị coi là chết, rebalance đá ra. Auto commit không cứu được thiết kế xử lý quá lâu trong poll loop — phải tăng `max.poll.interval.ms` hoặc chuyển xử lý nặng ra thread riêng + commit tay.
* **Tắt `enable.auto.commit` mà không viết commit tay.** Hậu quả: offset không bao giờ commit, restart là đọc lại từ `auto.offset.reset` — topic lớn thì đọc lại hàng triệu message. Tắt auto thì phải có `commitSync/commitAsync` tương ứng.
* **Nhầm commit async nền với commit đồng bộ.** Auto commit là async: lỗi commit (rebalance xen vào) chỉ log, không ném exception cho bạn xử lý. Cần chắc chắn commit thành công (ví dụ trước khi ghi checkpoint) thì phải `commitSync()`.
* **`consumer.close()` trong `finally` cũng commit.** Nên lần tắt graceful cuối cùng offset được đẩy lên mới nhất — đừng ngạc nhiên khi restart sau tắt sạch không đọc lại gì.

## Kết Luận

Một câu: **auto commit = poll đều + xử lý xong trước poll tiếp + commit async mỗi 5 giây = at-least-once miễn phí; poll tiếp khi chưa xử lý xong = tự phá bảo đảm.** Nhớ timeline này trước khi đụng tới commit tay.

Bài tiếp theo chúng ta sẽ nhìn bản đồ advanced (assign/seek đọc offset tay, rebalance listener, consumer đa thread) để biết khi nào cần rời khỏi poll loop cơ bản — và vì sao người mới + Java trung bình nên bỏ qua chúng lúc này.
