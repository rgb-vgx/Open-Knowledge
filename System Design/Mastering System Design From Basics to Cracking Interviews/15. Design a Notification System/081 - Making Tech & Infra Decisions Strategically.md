# ⚙️ Chọn công nghệ cho Notification System: Từ Kafka đến SendGrid

> Nguồn: `081-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49819513)

High-level design đã gần hoàn tất, giờ là thời điểm bàn về **công nghệ và hạ tầng** có thể nâng đỡ kiến trúc đó. Nhớ nhé: trong system design **hiếm khi có một technology stack đúng duy nhất** — mục tiêu của chúng ta là chọn những công cụ phù hợp với yêu cầu về khả năng mở rộng, vận hành và nghiệp vụ.

---

### 💡 Chọn công cụ theo yêu cầu, không theo độ phổ biến

Vì phần lớn hệ thống của chúng ta là **event-driven (hướng sự kiện)**, mỗi quyết định công nghệ cần trả lời được: nó giúp gì cho khả năng mở rộng, độ tin cậy, và mức độ đơn giản khi vận hành? Danh sách dưới đây là những lựa chọn tiêu biểu — các bạn hoàn toàn có thể thay bằng công cụ tương đương, miễn là lý do chọn vẫn vững.

---

### 📨 Message broker — quyết định hạ tầng quan trọng nhất

Vì toàn bộ hệ thống xoay quanh sự kiện, **message broker là một trong những quyết định hạ tầng quan trọng nhất**:

| Tiêu chí | Kafka | Amazon SQS |
|---|---|---|
| Mức kiểm soát | Kiểm soát chi tiết throughput | Ít kiểm soát hơn, đổi lại đơn giản |
| Vận hành | Cần đội ngũ vận hành broker | Dịch vụ fully managed, gần như không phải vận hành |
| Phù hợp khi | Khối lượng cực lớn, cần tinh chỉnh sâu | Ưu tiên giảm chi phí vận hành |

Cụ thể: nếu xây nền tảng xử lý khối lượng thông báo cực lớn với yêu cầu **kiểm soát throughput ở mức chi tiết**, **Kafka** là lựa chọn xuất sắc. Ngược lại, nếu bạn thích một dịch vụ **fully managed với chi phí vận hành tối thiểu**, **Amazon SQS** là phương án mạnh. Lựa chọn ở đây không chỉ là chuyện tính năng, mà là quyết định giữa **nhiều quyền kiểm soát hơn** hay **vận hành đơn giản hơn**.

---

### 🏭 Template, kênh gửi và nền tảng triển khai

**Sinh nội dung thông điệp:** chúng ta cần một **templating engine** như **Handlebars** hoặc **Liquid**. Chúng cho phép tách phần trình bày khỏi business logic, giúp việc bảo trì, cá nhân hóa và bản địa hóa thông báo trở nên dễ dàng hơn nhiều mà không phải sửa code ứng dụng.

**Kênh giao nhận:** thay vì tự xây hạ tầng gửi tin, chúng ta thường tích hợp với các **nhà cung cấp chuyên biệt**:

* **SendGrid** cho email.
* **Twilio** cho SMS.
* **Firebase Cloud Messaging** cho push notification.

Đây đều là những nền tảng trưởng thành, có khả năng mở rộng, được xây dựng chuyên cho việc giao thông điệp đáng tin cậy.

**Nền tảng triển khai:** các service có thể được triển khai dưới dạng **microservice chạy trên Kubernetes** hoặc **serverless function với AWS Lambda**. Kubernetes cho quyền kiểm soát lớn hơn với các service chạy dài hạn và hành vi mở rộng; serverless giảm chi phí vận hành cho khối lượng công việc hướng sự kiện. Lựa chọn đúng phụ thuộc vào **độ trưởng thành vận hành của đội ngũ, đặc điểm khối lượng công việc và bài toán chi phí**.

**Mở rộng theo tải:** lưu lượng không hằng định, nên các worker service cần **mở rộng theo chiều ngang** khi nhu cầu tăng. **Horizontal pod auto-scaling** của Kubernetes có thể tự động tăng giảm số worker dựa trên các chỉ số như **mức sử dụng CPU** hoặc **độ sâu queue (queue depth)** — giúp hệ thống xử lý hiệu quả cả lưu lượng bình thường lẫn các đỉnh tăng vọt.

---

### 🗄️ Lưu trữ, bảo mật và observability

**Lưu trữ theo loại dữ liệu:** các loại dữ liệu khác nhau có yêu cầu lưu trữ khác nhau.

* **Tùy chọn người dùng** phù hợp tự nhiên với **relational database** như **Postgres**.
* **Template thông báo** có thể lưu trong **object storage** như **S3**, nơi chúng dễ quản lý và **đánh phiên bản độc lập** với code ứng dụng.

**Bảo mật:** API cần được bảo vệ bằng xác thực dựa trên **JWT** kèm **role-based access control (phân quyền theo vai trò)**, đảm bảo các thao tác quản trị chỉ những người dùng được phép mới truy cập được.

**Observability:** monitoring và logging là điều kiện bắt buộc để vận hành nền tảng. Các công cụ như **Prometheus** và **Grafana** mang lại tầm nhìn về sức khỏe và hiệu năng hệ thống; còn giải pháp **centralized logging** như **CloudWatch** giúp chẩn đoán lỗi và audit quá trình xử lý thông báo.

Bài học quan trọng nhất của bước này: **những lựa chọn công nghệ nên nâng đỡ kiến trúc, chứ không định hình nó**. Một notification system tốt không thành công vì nó dùng Kafka, Kubernetes hay Postgres — nó thành công vì **mỗi công nghệ đều được chọn để thỏa mãn một yêu cầu kiến trúc cụ thể**, dù là khả năng mở rộng, độ tin cậy, sự đơn giản khi vận hành hay hiệu quả chi phí. Hãy bắt đầu từ yêu cầu, rồi mới chọn công nghệ đáp ứng tốt nhất — đó là tư duy các bạn nên rèn luyện như một system designer.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Khi nào nên chọn Kafka thay vì Amazon SQS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi cần xử lý khối lượng cực lớn với kiểm soát throughput chi tiết; SQS phù hợp khi ưu tiên dịch vụ fully managed, vận hành đơn giản.

Giải thích: Đây là lựa chọn giữa nhiều quyền kiểm soát hơn và ít chi phí vận hành hơn.

Tham chiếu: Mục Message broker.

</details>

**Câu 2:** Templating engine như Handlebars hay Liquid mang lại lợi ích gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tách phần trình bày khỏi business logic, giúp bảo trì, cá nhân hóa và bản địa hóa thông báo mà không sửa code ứng dụng.

Giải thích: Nội dung nằm trong template, code chỉ cung cấp dữ liệu động.

Tham chiếu: Mục Template, kênh gửi và nền tảng triển khai.

</details>

**Câu 3:** Kubernetes và AWS Lambda khác nhau ở điểm nào khi triển khai?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kubernetes cho nhiều quyền kiểm soát với service chạy dài hạn và hành vi mở rộng; Lambda giảm chi phí vận hành cho workload hướng sự kiện.

Giải thích: Lựa chọn phụ thuộc độ trưởng thành của đội ngũ, đặc điểm workload và chi phí.

Tham chiếu: Mục Template, kênh gửi và nền tảng triển khai.

</details>

**Câu 4:** Horizontal pod auto-scaling của Kubernetes có thể dựa trên những chỉ số nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mức sử dụng CPU hoặc độ sâu queue.

Giải thích: Nhờ đó hệ thống xử lý hiệu quả cả lưu lượng bình thường lẫn đỉnh tăng vọt.

Tham chiếu: Mục Template, kênh gửi và nền tảng triển khai.

</details>

**Câu 5:** Tùy chọn người dùng và template thông báo nên lưu ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tùy chọn người dùng lưu trong relational database như Postgres; template lưu trong object storage như S3 để dễ đánh phiên bản độc lập.

Giải thích: Mỗi loại dữ liệu có yêu cầu lưu trữ khác nhau.

Tham chiếu: Mục Lưu trữ, bảo mật và observability.

</details>

---

Vậy là chúng ta đã có bộ công nghệ đại diện: Kafka hoặc SQS cho broker, Handlebars/Liquid cho template, SendGrid/Twilio/FCM cho kênh gửi, Kubernetes hoặc Lambda cho triển khai, Postgres và S3 cho lưu trữ, cùng JWT, Prometheus/Grafana và CloudWatch cho bảo mật và quan sát. Ở bài tiếp theo — cũng là bài cuối của case study — chúng ta sẽ ghép tất cả thành **kiến trúc hoàn chỉnh** và đi qua toàn bộ vòng đời của một thông báo từ sự kiện nghiệp vụ đến tay người dùng. Hẹn gặp lại các bạn! 🚀
