# 🧪 Hands-on: Tạo SNS Topic và gửi thông báo qua Email

> Nguồn: `150-SNS-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056156)

Được rồi, chúng ta cùng **thực hành SNS** trên console. Bài này rất đơn giản: tạo một topic, đăng ký nhận thông báo qua email rồi gửi thử một message để xem nó "bay" vào hộp thư như thế nào nhé!

---

### 🧱 Bước 1: Tạo SNS Topic

1. Vào console của **Simple Notification Service (SNS)**.
2. Bấm tạo topic với tên **demo SNS**.
3. Để tất cả tùy chọn ở mặc định rồi bấm **Create topics**.

---

### 📮 Bước 2: Tạo Subscription

Ý tưởng là gửi message vào topic này và để các subscriber của topic nhận được message. Ở mục **Subscriptions**, ban đầu số lượng là **0**, bấm tạo một subscription mới. Bạn sẽ thấy rất nhiều **protocol (giao thức)** cho subscription:

* **HTTP**
* **HTTPS**
* **Email**
* **Email-JSON**
* **SQS**
* **Lambda**

*Có rất nhiều target cho SNS — cứ nhớ rằng gửi một message vào topic thì **mọi subscriber**, bất kể protocol nào, đều nhận được message đó.*

Để thực hành nhanh, mình chọn **Email** và dùng **stephaneccpdemo@mailinator.com** làm endpoint. Nếu bạn chưa biết, **Mailinator** là dịch vụ cung cấp **địa chỉ email tạm thời (temporary email)** — mở hộp thư của mailbox này là xem được email gửi tới.

Sau khi tạo subscription, quay lại topic **demo SNS**, bạn sẽ thấy subscription đang ở trạng thái **Pending confirmation (chờ xác nhận)**.

---

### ✅ Bước 3: Xác nhận subscription

1. Mở mailbox trên Mailinator, bạn sẽ thấy một email từ AWS yêu cầu **xác nhận subscription**.
2. Bấm xác nhận — **subscription ID được confirmed**.

*Nếu bạn khéo tay, có thể tạo thêm nhiều subscription khác, nhưng các protocol ngoài email thường phức tạp hơn để thiết lập, nên bài này chúng ta chỉ cần một subscription là đủ.* Về nguyên tắc, một SNS topic có thể có **rất nhiều subscriber**.

---

### ✉️ Bước 4: Publish message và kiểm chứng

1. Bấm **Publish message**.
2. Nhập **subject** là *demo subject line*.
3. Nhập **payload** là **hello world**.
4. Bấm publish — message đã được gửi thành công, và mọi subscriber của bạn sẽ nhận được message này.

Quay lại inbox trên Mailinator, bạn sẽ thấy một email mới với tiêu đề **demo subject line** và nội dung **hello world** — vậy là SNS đã hoạt động chính xác!

---

### 🧹 Bước 5: Dọn dẹp

Khi thực hành xong, bạn có thể **xóa topic** — việc này **không tốn tiền**, nhưng dọn dẹp sau khi làm lab vẫn là thói quen tốt.

---

Vậy là các bạn đã tự tay tạo SNS topic, xác nhận subscription qua email và publish message thành công. Sang bài tiếp theo, chúng ta sẽ làm quen với **Amazon MQ** — dịch vụ message broker dành cho các ứng dụng truyền thống đang chuyển lên cloud. Hẹn gặp các bạn ở đó! 🚀
