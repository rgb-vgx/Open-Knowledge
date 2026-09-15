# Bản Đồ Advanced: Assign/Seek, Rebalance Listener, Consumer Đa Thread — Khi Nào Cần?

Bạn đã đi hết mạch cơ bản: producer, callback, key, consumer, shutdown, group, rebalance, offset commit. Trong folder code còn 3 demo advanced: `ConsumerDemoAssignSeek`, `ConsumerDemoRebalanceListener`, `ConsumerDemoThreads`. Bài này không dạy code chi tiết mà cho bạn **bản đồ**: mỗi cái giải quyết nỗi đau nào, khi nào cần, và vì sao người mới nên bỏ qua lúc này.

---

## 1. Concept: Ba cánh cửa vượt ra khỏi poll loop cơ bản

Poll loop + `subscribe()` + auto commit đã đủ cho đa số consumer: đọc từ group-managed offset, rebalance tự động, commit nền mỗi 5 giây. Ba demo advanced dành cho ba trường hợp poll loop cơ bản không làm được:

### `ConsumerDemoAssignSeek` — đọc offset chỉ định bằng tay

* **Vấn đề:** `subscribe()` giao assignment và offset cho group quản lý. Nhưng đôi khi bạn muốn: đọc lại đúng partition 2 từ offset 137 để debug, replay một đoạn lịch sử, hoặc mỗi consumer giữ partition cố định không cần group.
* **Giải pháp:** `consumer.assign(List<TopicPartition>)` (gán tay partition, bỏ qua group/rebalance) + `consumer.seek(partition, offset)` (nhảy con trỏ tới offset bất kỳ).
* **Giá phải trả:** mất hết lợi ích group — không rebalance, không load balancing, tự quản offset. Dùng sai là một consumer ôm partition chết mà group không cứu được.

### `ConsumerDemoRebalanceListener` — can thiệp vào thời khắc rebalance

* **Vấn đề:** Rebalance revoke partition giữa lúc bạn đang xử lý dở batch. Với auto commit, offset batch dở có thể chưa commit → đọc lại (chấp nhận được). Nhưng nếu bạn ghi state ra DB/file local thì cần commit tay + dọn state **ngay trước khi mất partition**.
* **Giải pháp:** `subscribe(topics, new ConsumerRebalanceListener())` với hai callback: `onPartitionsRevoked` (sắp mất partition → commit sync + flush state) và `onPartitionsAssigned` (vừa nhận partition → seek/khôi phục state).
* **Giá phải trả:** code phức tạp, sai thứ tự commit trong listener là mất hoặc trùng dữ liệu âm thầm.

### `ConsumerDemoThreads` — chạy consumer trong thread riêng

* **Vấn đề:** `poll()` loop chiếm main thread. App vừa consume vừa serve API, vừa chạy scheduler thì main thread bận — cần consumer chạy nền trong thread riêng, main thread làm việc khác, shutdown phối hợp cả hai.
* **Giải pháp:** bọc consumer (kèm `wakeup()` + `close()` từ bài graceful shutdown) trong thread/worker riêng, điều phối start/stop với app lifecycle.
* **Giá phải trả:** đa thread + Kafka consumer **không thread-safe** (ngoài `wakeup()`): một consumer chỉ được một thread chạm vào. Muốn song song thật thì mỗi thread một consumer riêng (mỗi thread một member trong group), không phải nhiều thread chung một consumer.

## 2. Code: Đâu là điểm khác so với bài cơ bản?

Không có code mới phải viết. Chỉ cần nhớ **một dòng signature** phân biệt mỗi demo với poll loop chuẩn:

```java
// Cơ bản (đã học): subscribe + poll + auto commit
consumer.subscribe(Arrays.asList(topic));
consumer.poll(Duration.ofMillis(1000));

// AssignSeek: gán tay, nhảy offset — không dùng group
consumer.assign(Arrays.asList(new TopicPartition(topic, 0)));
consumer.seek(new TopicPartition(topic, 0), 137L);

// RebalanceListener: hook vào thời khắc chia partition
consumer.subscribe(Arrays.asList(topic), new ConsumerRebalanceListener() {
    public void onPartitionsRevoked(Collection<TopicPartition> partitions) { /* commit + flush state */ }
    public void onPartitionsAssigned(Collection<TopicPartition> partitions) { /* khôi phục state */ }
});

// Threads: cùng consumer cơ bản nhưng chạy trong thread riêng,
// main thread làm việc khác, shutdown bằng wakeup() liên thread
```

Chi tiết từng demo có tutorial dài riêng trong mục `Kafka Programming Tutorials → Java Kafka Programming → Advanced Kafka Consumer Tutorials with Java` (rebalance listener, seek/assign, consumer in threads). Học khi cần, đừng học trước.

## 3. Chạy và kiểm tra: Có cần chạy không?

* Người mới / Java trung bình: **không cần**. Poll loop cơ bản + cooperative rebalance + auto commit đã đủ để làm project thực tế ở phần 10 (Wikimedia → Kafka → OpenSearch).
* Khi nào quay lại:
  * Cần replay/debug offset cụ thể → mở AssignSeek.
  * Consumer giữ state local hoặc commit tay chính xác → mở RebalanceListener.
  * App đa nhiệm (consume + serve) → mở Threads.
* Nếu mở: chạy từng demo độc lập, đọc log `seek/assigned/revoked/thread` rồi đối chiếu với tutorial advanced tương ứng.

## 4. Pitfalls

* **Học advanced trước khi vững cơ bản.** Chưa thuộc `wakeup()` + group + auto commit mà nhảy vào listener/threads thì mỗi lỗi đều trông như "Kafka bug" trong khi là lỗi lifecycle của chính bạn. Thứ tự học: vững phần 09 trước, advanced sau.
* **Dùng `assign()` cho consumer production cần scale.** `assign()` vô hiệu hóa group — thêm instance không chia việc, chết instance không ai cứu. Trừ khi bạn đang viết tool replay/debug, production consumer luôn `subscribe()`.
* **Nhiều thread chung một `KafkaConsumer`.** Consumer không thread-safe. Ngoại lệ duy nhất là `wakeup()` được gọi từ thread khác. Mọi `poll/commit/subscribe` khác phải cùng một thread.
* **Quên commit trong `onPartitionsRevoked`.** Partition bị lấy đi mà offset batch dở chưa commit → member mới đọc lại (tốt nhất) hoặc bạn đã ghi nửa batch ra DB mà offset chưa lên → trùng lặp khó gỡ.
* **Đa thread rồi vẫn auto commit + xử lý async sau poll.** Đây là cách nhanh nhất để phá at-least-once như bài offset commit đã cảnh báo — sang threads mà vẫn giữ thói quen poll-xong-quăng-thread-khác thì commit vượt mặt xử lý.

## Kết Luận

Một câu: **cơ bản đủ xài thì đừng advanced; cần replay tay thì AssignSeek, cần dọn state khi mất partition thì RebalanceListener, cần consumer chạy nền thì Threads — mỗi cái một nỗi đau, không cái nào là "nâng cấp mặc định".**

Phần tiếp theo (phần 10) chúng ta sẽ dùng toàn bộ kỹ năng producer/consumer cơ bản để làm project thực tế: producer đọc stream Wikimedia đẩy vào topic, consumer kéo về ghi vào OpenSearch — và sau đó nâng cấp lên Kafka Connect + Kafka Streams.
