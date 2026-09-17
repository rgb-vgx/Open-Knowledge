# 🐰 Amazon MQ: Cầu nối cho ứng dụng truyền thống lên Cloud (Tổng quan)

> Nguồn: `151-Amazon-MQ-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682606)

SQS và SNS rất tuyệt — nhưng cả hai đều là **cloud-native service** với protocol và API riêng của AWS. Vậy nếu công ty bạn đang chạy ứng dụng truyền thống **on-premises** dùng các protocol mở thì sao? Đó chính là lúc **Amazon MQ** tỏa sáng.

---

### 🎯 Vì sao cần Amazon MQ?

**SQS** và **SNS** là dịch vụ cloud-native vì chúng dùng **proprietary protocol (giao thức độc quyền)** của AWS — tức là bộ API riêng của AWS.

Trong khi đó, các ứng dụng truyền thống chạy **on-premises (tại chỗ, trong data center của bạn)** thường dùng các **open protocol (giao thức mở)** như:

* **MQTT**
* **AMQP**
* **STOMP**
* **Openwire**
* **WSS**

Khi migrate ứng dụng lên cloud, có thể bạn **không muốn re-engineer (viết lại) ứng dụng** để dùng protocol/API của SQS hay SNS. Thay vào đó, bạn muốn giữ nguyên những protocol quen thuộc như MQTT, AMQP...

---

### 🐇 Amazon MQ là gì?

Rất đơn giản: **Amazon MQ là managed message broker service (dịch vụ message broker được quản lý) cho hai công nghệ**:

* **RabbitMQ**
* **ActiveMQ**

Đây là những công nghệ on-premises cung cấp quyền truy cập vào các open protocol vừa nhắc. Nhờ Amazon MQ, bạn có được phiên bản **managed** của các broker này ngay trên cloud.

---

### ⚠️ Những điều cần lưu ý về Amazon MQ

Vì bản chất là broker truyền thống chạy trên server, Amazon MQ có vài "đánh đổi":

* **Không scale mạnh như SQS hay SNS** — hai dịch vụ kia gần như scale vô hạn.
* Vì **chạy trên server**, bạn có thể gặp **server issue**.
* Muốn **high availability**, bạn có thể chạy mô hình **multi-AZ với failover**.

Một điểm thú vị: Amazon MQ có **cả queue feature (giống SQS)** lẫn **topic feature (giống SNS)** trong **cùng một broker**.

| Tiêu chí | SQS / SNS | Amazon MQ |
|---|---|---|
| Protocol | Riêng của AWS (proprietary) | Mở: MQTT, AMQP, STOMP, Openwire, WSS |
| Khả năng scale | Gần như vô hạn | Thấp hơn, chạy trên server |
| Khi nào dùng | Ứng dụng cloud-native | Migrate ứng dụng on-premises giữ nguyên protocol |

---

### 🎯 Khi nào dùng Amazon MQ?

Amazon MQ **chỉ nên dùng khi và chỉ khi** công ty đang **migrate lên cloud** và **cần dùng một trong các open protocol** như MQTT, AMQP, STOMP...

Còn lại, hãy dùng **SQS và SNS** — vì chúng **scale tốt hơn nhiều** và **tích hợp sâu hơn** với các dịch vụ AWS khác.

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Amazon MQ là managed message broker cho hai công nghệ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** RabbitMQ và ActiveMQ.

Giải thích: Đây là hai công nghệ on-premises phổ biến được Amazon MQ đưa lên cloud dưới dạng managed.

Tham chiếu: Mục Amazon MQ là gì.

</details>

**Câu 2:** Khi nào nên chọn Amazon MQ thay vì SQS/SNS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi công ty migrate lên cloud và cần dùng các open protocol như MQTT, AMQP, STOMP...

Giải thích: Amazon MQ giúp không phải re-engineer ứng dụng đang dùng protocol truyền thống.

Tham chiếu: Mục Khi nào dùng Amazon MQ.

</details>

**Câu 3:** Vì sao Amazon MQ không scale tốt bằng SQS/SNS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì Amazon MQ chạy trên server, nên có thể gặp server issue và không scale gần như vô hạn như SQS/SNS.

Giải thích: SQS/SNS là serverless, còn MQ là broker truyền thống được quản lý.

Tham chiếu: Mục Những điều cần lưu ý về Amazon MQ.

</details>

**Câu 4:** Làm sao để Amazon MQ đạt tính sẵn sàng cao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chạy mô hình multi-AZ với failover.

Giải thích: Đây là cách bù đắp cho việc MQ chạy trên server.

Tham chiếu: Mục Những điều cần lưu ý về Amazon MQ.

</details>

**Câu 5:** Amazon MQ hỗ trợ cả queue lẫn topic không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — MQ có queue feature giống SQS và topic feature giống SNS trong cùng một broker.

Giải thích: Đây là điểm đặc biệt so với việc phải dùng riêng SQS và SNS.

Tham chiếu: Mục Những điều cần lưu ý về Amazon MQ.

</details>

---

Vậy là các bạn đã biết Amazon MQ dành cho ai và dùng trong tình huống nào. Ở bài tiếp theo — cũng là bài cuối section — chúng ta sẽ **tóm tắt toàn bộ Cloud Integrations** bằng một bảng đối chiếu cực dễ nhớ. Hẹn gặp các bạn ở đó! 🚀
