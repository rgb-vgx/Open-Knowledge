# 🧭 Tóm tắt Cloud Integrations: SQS, SNS, Kinesis và Amazon MQ

> Nguồn: `152-Cloud-Integrations-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20260658)

Chúng ta đã đi hết section **Cloud Integrations**! Bài này mình sẽ tổng kết lại toàn bộ kiến thức quan trọng nhất về SQS, SNS, Kinesis và Amazon MQ — đây là những gì bạn cần "mang vào phòng thi".

---

### 📬 SQS — Queuing và Decoupling

* Là **queuing service (dịch vụ hàng đợi)** của AWS, có thể có **nhiều producer** cùng đẩy message vào queue.
* Message được giữ **tối đa 14 ngày** trong queue, sau đó bị xóa.
* **Consumer đọc message và chia nhau lượt đọc** — mỗi message chỉ một consumer xử lý.
* Khi message được đọc và xử lý xong thì **bị xóa vĩnh viễn** khỏi queue.
* Dùng để **decouple ứng dụng trong AWS**.

👉 Hễ thấy **queuing và decoupling** thì nghĩ đến **SQS**.

---

### 📢 SNS — Notification và Pub/Sub

* Là **notification service (dịch vụ thông báo)** của AWS, gồm **producers và subscribers**.
* Subscriber có thể là **email, Lambda, SQS queue, HTTP, mobile**...
* Nếu một SNS topic có nhiều subscriber thì **tất cả đều nhận được message**.
* **SNS không lưu trữ message** — đây **không phải durable store (nơi lưu trữ bền vững)**.
* Dùng cho **pub/sub, subscriber, topic và notification trong AWS**.

👉 Hễ thấy **notification, pub/sub, subscriber, topic** thì nghĩ đến **SNS**.

---

### 🌊 Kinesis và 🐇 Amazon MQ

* **Kinesis** là dịch vụ **real-time data streaming**, **có data persistence (lưu trữ dữ liệu)** và cho phép bạn **chạy analytics trên dữ liệu theo thời gian thực**.
* **Amazon MQ** là **managed message broker cho ActiveMQ và RabbitMQ** trên cloud. Nếu bạn muốn **migrate từ on-premises lên cloud** mà vẫn dùng các protocol như **MQTT, AMQP**..., đây chính là dịch vụ dành cho bạn.

---

### 📊 Bảng đối chiếu nhanh

| Dịch vụ | Mô hình | Đặc điểm chính |
|---|---|---|
| **SQS** | Queue | Message giữ tối đa 14 ngày; consumer chia nhau đọc rồi xóa; decouple ứng dụng |
| **SNS** | Pub/Sub | Mọi subscriber nhận tất cả message; không lưu trữ message |
| **Kinesis** | Real-time streaming | Có data persistence; phân tích dữ liệu thời gian thực |
| **Amazon MQ** | Message broker | Cho ActiveMQ/RabbitMQ; dùng protocol mở khi migrate từ on-premises |

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Message trong SQS queue được giữ tối đa bao lâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tối đa 14 ngày.

Giải thích: Sau thời gian đó message bị xóa; consumer phải xử lý và xóa message trước hạn.

Tham chiếu: Mục SQS — Queuing và Decoupling.

</details>

**Câu 2:** Với SQS, các consumer nhận message như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Họ chia nhau lượt đọc (split the reads) — mỗi message do một consumer xử lý, xong thì xóa.

Giải thích: Đây là điểm khác biệt với SNS, nơi mọi subscriber đều nhận được message.

Tham chiếu: Mục SQS — Queuing và Decoupling.

</details>

**Câu 3:** SNS có lưu trữ message không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — SNS không giữ lại message, không phải durable store.

Giải thích: Vì vậy đừng chọn SNS khi đề yêu cầu lưu trữ message bền vững.

Tham chiếu: Mục SNS — Notification và Pub/Sub.

</details>

**Câu 4:** Kinesis có ưu điểm gì nổi bật?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Real-time data streaming, có data persistence và chạy được analytics theo thời gian thực.

Giải thích: Đây là khác biệt của Kinesis so với SQS/SNS.

Tham chiếu: Mục Kinesis và Amazon MQ.

</details>

**Câu 5:** Từ khóa "queuing and decoupling" trong đề thi gợi đến dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** SQS.

Giải thích: Đây là exam tip được nhấn mạnh trong bài tổng kết.

Tham chiếu: Mục SQS — Queuing và Decoupling.

</details>

---

Vậy là chúng ta đã khép lại section **Cloud Integrations** với bốn dịch vụ cốt lõi: SQS, SNS, Kinesis và Amazon MQ. Các bạn hãy dành chút thời gian tự vẽ lại luồng **producer → queue → consumer** và **fan-out của SNS** để ghi nhớ thật chắc nhé.

Hẹn gặp các bạn ở section tiếp theo! 🚀
