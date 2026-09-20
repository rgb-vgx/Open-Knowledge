# ⚙️ Chat app — Bước 4: Chọn công nghệ và hạ tầng theo nhu cầu kiến trúc

> Nguồn: `086-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49824343)

Sau khi đã thiết kế xong kiến trúc, bước tiếp theo là **chọn công nghệ có thể hiện thực hóa kiến trúc đó**. Và đây là điều mình muốn các bạn ghi nhớ ngay từ đầu: **hiếm khi có một technology stack đúng duy nhất** — điều quan trọng nhất là hiểu **vì sao một công cụ phù hợp với một bài toán cụ thể**.

Chúng ta sẽ đi lần lượt qua từng lớp: nhắn tin, giao tiếp real-time, thông báo offline, dữ liệu, rồi đến hạ tầng và vận hành.

---

### 🧩 Chọn công nghệ theo nhu cầu kiến trúc

Mỗi nhu cầu kiến trúc đã định hình ở các bước trước sẽ dẫn đến một nhóm công nghệ phù hợp:

| Nhu cầu kiến trúc | Lựa chọn tiêu biểu | Vì sao phù hợp |
|---|---|---|
| Nhắn tin bất đồng bộ, đáng tin cậy | **Kafka** hoặc **AWS SQS** | Kafka cho throughput cực cao và event streaming bền vững; SQS (managed service) giúp giảm gánh nặng vận hành |
| Giao tiếp real-time | **WebSocket**, framework **SignalR** | Kết nối thường trực, độ trễ thấp; SignalR trong hệ .NET đơn giản hóa việc xây và quản lý kết nối real-time |
| Thông báo khi offline | **Firebase Cloud Messaging** | Thông báo cho người dùng ngay cả khi họ không có kết nối WebSocket đang hoạt động |
| Lưu tin nhắn | **NoSQL database** | Schema linh hoạt, chịu được khối lượng ghi rất lớn |
| Dữ liệu giao dịch nhất quán | **Postgres** | Phù hợp cho dữ liệu cần **strong consistency** như cài đặt người dùng, application metadata |
| Cache và phiên | **Redis** | Cache active session và thông tin truy cập thường xuyên, giảm độ trễ tổng thể |

Điểm quan trọng nhất: **nhu cầu kiến trúc (architectural need) mới là thứ quyết định, công nghệ cụ thể có thể thay đổi**. Nhắn tin bất đồng bộ và đáng tin cậy là yêu cầu — Kafka hay SQS chỉ là hai cách hiện thực hóa khác nhau tùy bối cảnh.

---

### ☸️ Hạ tầng: scale độc lập và vận hành production

Từ góc nhìn hạ tầng, việc **triển khai các service dưới dạng microservices trên Kubernetes** cho chúng ta sự linh hoạt để **scale từng thành phần độc lập**. Không phải service nào cũng chịu tải giống nhau — ví dụ **Connection Manager có thể cần nhiều instance hơn hẳn Notification Service**.

* **Event-driven scaling với KEDA** cho phép các worker service **tự động mở rộng và thu hẹp theo độ sâu hàng đợi (queue depth)** hoặc theo workload thực tế.
* Với các hệ thống production, **security và observability** là bắt buộc: **OAuth 2.0** cung cấp cơ chế xác thực chuẩn hóa giữa các nền tảng, còn các công cụ giám sát như **Prometheus** và **Grafana** giúp chúng ta hiểu sức khỏe và hiệu năng của hệ thống.
* **Log aggregation (tập trung log) và alerting** cho phép chẩn đoán sự cố nhanh chóng khi có vấn đề.
* Để tăng khả năng chịu lỗi, **triển khai trên nhiều region kèm load balancing** đảm bảo ứng dụng tiếp tục hoạt động kể cả khi một phần hạ tầng trở nên không khả dụng.

---

### 💡 Bài học lớn: công nghệ đi sau kiến trúc

Bài học quan trọng nhất của bước này có thể tóm gọn trong một câu: **lựa chọn công nghệ phải luôn tuân theo yêu cầu kiến trúc**.

Trình tự đúng mà chúng ta đã đi là: **trước tiên nhận diện vấn đề, sau đó thiết kế kiến trúc để giải chúng, và chỉ đến bây giờ mới chọn công nghệ hỗ trợ tốt nhất cho thiết kế đó**. Đây chính là cách tư duy mà những kiến trúc sư giàu kinh nghiệm áp dụng khi xây hệ thống production — và cũng là cách trả lời ghi điểm trong phỏng vấn system design.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Khi cần throughput cực cao và event streaming bền vững, message broker nào thường phù hợp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kafka.

Giải thích: Nếu xây trên nền cloud được quản lý và muốn giảm gánh nặng vận hành, một managed service như AWS SQS cũng là lựa chọn mạnh.

Tham chiếu: Mục Chọn công nghệ theo nhu cầu kiến trúc.

</details>

**Câu 2:** Vì sao NoSQL phù hợp để lưu tin nhắn chat?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nó cung cấp schema linh hoạt và xử lý được khối lượng ghi rất lớn.

Giải thích: Trong khi đó, dữ liệu cần nhất quán mạnh như cài đặt người dùng vẫn phù hợp với database quan hệ như Postgres.

Tham chiếu: Mục Chọn công nghệ theo nhu cầu kiến trúc.

</details>

**Câu 3:** Redis đóng vai trò gì trong kiến trúc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cache active session và thông tin truy cập thường xuyên để giảm độ trễ.

Giải thích: Redis bổ trợ cho cả NoSQL lẫn database quan hệ trong hệ thống.

Tham chiếu: Mục Chọn công nghệ theo nhu cầu kiến trúc.

</details>

**Câu 4:** KEDA giúp ích gì cho việc scaling?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tự động mở rộng và thu hẹp worker service theo độ sâu hàng đợi hoặc workload.

Giải thích: Đây là event-driven scaling, phù hợp vì các service chịu tải rất khác nhau.

Tham chiếu: Mục Hạ tầng — scale độc lập và vận hành production.

</details>

**Câu 5:** Trình tự đúng khi đưa ra quyết định công nghệ là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhận diện vấn đề, thiết kế kiến trúc, rồi mới chọn công nghệ hỗ trợ thiết kế đó.

Giải thích: Công nghệ phải tuân theo yêu cầu kiến trúc, chứ không phải ngược lại.

Tham chiếu: Mục Bài học lớn — công nghệ đi sau kiến trúc.

</details>

---

Vậy là chúng ta đã chọn xong bộ công nghệ và hạ tầng: **Kafka hoặc SQS cho messaging, WebSocket và SignalR cho real-time, FCM cho thông báo offline, NoSQL kết hợp Postgres và Redis cho dữ liệu, cùng Kubernetes, KEDA, Prometheus, Grafana cho vận hành**.

Ở bài tiếp theo — cũng là bài cuối của case study — chúng ta sẽ **gom tất cả lại thành sơ đồ kiến trúc hoàn chỉnh** và xem hệ thống vận hành end-to-end như thế nào. Hẹn gặp lại các bạn! 🚀
