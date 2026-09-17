# 🧪 Hands-on: Tạo và thực hành SQS Queue trên AWS Console

> Nguồn: `147-SQS-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056164)

Được rồi, lý thuyết đã đủ — giờ chúng ta cùng **thực hành SQS** trên AWS console. Bài này hoàn toàn miễn phí và rất nhanh, các bạn hãy mở console lên và làm cùng mình nhé!

---

### 🧱 Bước 1: Tạo queue

1. Vào dịch vụ **SQS** — đây là **message queuing service**, kiểu dịch vụ **high-throughput system-to-system messaging** (nhắn tin giữa các hệ thống với thông lượng cao).
2. Bấm **Create queue**. Bạn sẽ thấy có **2 loại queue**: **standard queue** và **FIFO queue**.
3. *Phần này vượt xa phạm vi đề thi Cloud Practitioner*, nên mình chỉ chọn **standard** và đặt tên queue là **demo-sqs**.
4. Về **configuration** và **access policy** — cứ để mặc định, chưa cần quan tâm vì đây là kiến thức nâng cao hơn mức cần thiết.
5. Bấm **Create queue** để hoàn tất.

Queue của bạn đã sẵn sàng để gửi và nhận message!

---

### 🔍 Bước 2: Xem thông tin queue

Ở trang chi tiết queue, các bạn có thể xem **loại queue, tên queue, encryption** có được bật hay không... Khi bấm **More**, bạn sẽ thấy thêm thông tin về:

* **Messages available** — số message đang chờ xử lý.
* **Messages in flight** — số message đang được consumer xử lý.
* **Messages delayed** — số message đang bị trễ.

---

### ✉️ Bước 3: Gửi message vào queue

1. Ở góc trên bên phải, bấm **Send and receive messages**.
2. Trong ô gửi message, nhập **hello world** rồi bấm **Send message**.
3. Message đã được gửi và sẵn sàng để nhận. Nếu bấm **View details**, bạn sẽ thấy **message ID** và **MD5 attributes** của message.
4. Kéo xuống phần **receive messages**, bạn sẽ thấy **1 message available**.
5. Gửi thêm một message nữa (nhập **hello** rồi **Send message**) — bây giờ số message available là **2**.

---

### 📥 Bước 4: Poll và xử lý message

1. Bấm **Poll for messages** — hệ thống sẽ lấy message về cho bạn.
2. Hai message vừa gửi hiện ra; bấm vào một message để **đọc body** — đúng là **hello world** mà bạn đã gửi. Bạn cũng có thể xem các attributes khác.
3. Trong thực tế, **application của bạn sẽ đọc message được code sẵn** để lấy nội dung này ra xử lý.
4. Khi xử lý xong, bạn **xóa message** để loại nó khỏi queue — lúc này **messages available về 0**.

Rất đơn giản, nhưng đó chính là cách SQS hoạt động ở mức tổng quan.

---

### 🧹 Bước 5: Dọn dẹp — xóa queue

1. Quay lại danh sách **Queues** để xem toàn bộ queue của bạn.
2. Bấm xóa queue **demo-sqs**, rồi nhập chữ **delete** để xác nhận.

*Việc xóa không tốn tiền, nhưng dọn dẹp sau khi thực hành xong là thói quen tốt — hãy giữ thói quen này trong suốt khóa học!*

---

Vậy là các bạn đã tự tay tạo queue, gửi message, poll message và xóa queue thành công. Thực hành thế này sẽ giúp kiến thức về SQS "neo" rất chắc trong đầu cho kỳ thi. Ở bài tiếp theo, chúng ta sẽ tìm hiểu một dịch vụ streaming cực thú vị: **Amazon Kinesis**. Hẹn gặp các bạn ở đó! 🚀
