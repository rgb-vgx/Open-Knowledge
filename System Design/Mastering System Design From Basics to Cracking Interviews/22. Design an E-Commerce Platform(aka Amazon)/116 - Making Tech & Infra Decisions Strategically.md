# 🧰 E-Commerce Platform: Chọn tech & hạ tầng một cách chiến lược

> Nguồn: `116-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49955309)

Bước 4 của case study — **chọn công nghệ và hạ tầng**. Lúc này chúng ta đã hiểu rất rõ về yêu cầu, scale và kiến trúc của hệ thống; việc còn lại là chọn những công nghệ thỏa mãn các yêu cầu đó. Nhắc lại một điều quan trọng: *đây không phải những lựa chọn duy nhất đúng* — chúng là ví dụ thực tế phù hợp với nhu cầu của hệ thống này.

---

### 🗄️ Công nghệ cho từng loại dữ liệu

| Thành phần | Lựa chọn | Vì sao |
|---|---|---|
| Dữ liệu giao dịch | **Postgres** | Relational database đáng tin cậy, nhất quán và có transactional guarantees cho user, inventory, order, payment |
| Tìm kiếm sản phẩm | **Elasticsearch** | Tối ưu cho tìm kiếm và lọc nhanh trên catalog sản phẩm lớn |
| Caching | **Redis** | Phục vụ sản phẩm phổ biến, session và tồn kho từ bộ nhớ, giảm tải database |
| Giao tiếp bất đồng bộ | **Kafka** | Event-driven messaging; AWS SQS cũng là lựa chọn hoàn toàn hợp lệ |

Với **dữ liệu giao dịch**, Postgres là nền tảng vững chắc: nó cung cấp tính nhất quán và các **transactional guarantees** mà các phần như người dùng, tồn kho, đơn hàng và thanh toán đều cần. Với **tìm kiếm sản phẩm**, Elasticsearch bổ sung khả năng tìm kiếm và lọc nhanh trên catalog lớn. Lớp **caching** dùng Redis để giảm tải database bằng cách phục vụ thông tin sản phẩm, dữ liệu session và thông tin tồn kho hay được đọc trực tiếp từ bộ nhớ — qua đó cải thiện thời gian phản hồi tổng thể.

Với **giao tiếp bất đồng bộ**, chúng ta dùng Kafka, dù một managed service như AWS SQS cũng hoàn toàn hợp lệ. *Quyết định quan trọng ở đây không phải công nghệ cụ thể, mà là việc áp dụng cách tiếp cận hướng sự kiện (event-driven)* — để các tác vụ nền như cập nhật tồn kho và gửi thông báo không làm chậm những request hướng tới người dùng.

---

### ☁️ Hạ tầng: dựa vào managed services

Từ góc độ hạ tầng, chúng ta dựa vào các **managed cloud services** của những nhà cung cấp như **AWS, Azure hoặc GCP**. Managed database, object storage và messaging service giúp giảm công sức vận hành, cho phép đội ngũ tập trung nhiều hơn vào việc xây tính năng thay vì quản lý hạ tầng.

Đây là minh chứng trực tiếp cho ràng buộc "đội ngũ DevOps/SRE tối thiểu" đã chốt ở bài đầu case study: mọi lựa chọn hạ tầng đều phải phục vụ mục tiêu **đơn giản trong vận hành**.

---

### 🔐 Bảo mật: xác thực và thanh toán

* **Xác thực:** dùng các giao thức chuẩn của ngành như **OAuth2** và **OpenID Connect**, với **JWT (JSON Web Token)** cho session người dùng an toàn kiểu stateless.
* **Thanh toán:** giao phó cho một **external payment gateway** như **Stripe** hoặc **Razorpay** — tận dụng hạ tầng thanh toán an toàn và tuân thủ của họ thay vì tự xây từ đầu.
* **Giao tiếp:** mô hình kết hợp **REST API** cho các thao tác request-response đồng bộ và **event-driven messaging** cho luồng công việc bất đồng bộ. Kết quả là hệ thống vừa nhạy bén với người dùng, vừa scale tốt phía sau.

---

### 💡 Nguyên tắc vàng: công nghệ đi sau kiến trúc

Một điểm cuối rất đáng ghi nhớ: **lựa chọn công nghệ phải luôn đến sau các quyết định kiến trúc**.

1. Trước tiên, xác định vấn đề mình đang giải.
2. Sau đó, thiết kế kiến trúc.
3. Cuối cùng, mới chọn công nghệ hỗ trợ tốt nhất cho thiết kế ấy.

Đó là cách những kiến trúc sư kinh nghiệm tiếp cận system design trong thực tế — và cũng là cách các bạn nên trình bày trong phỏng vấn. Đừng bắt đầu bằng "em sẽ dùng Kafka, Redis, Kubernetes", hãy bắt đầu bằng "hệ thống này có bài toán gì, vì sao cần event-driven, vì sao cần cache".

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Công nghệ nào được chọn cho dữ liệu giao dịch và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Postgres — vì cung cấp tính nhất quán và transactional guarantees cho user, inventory, order, payment.

Giải thích: Đây là nhóm dữ liệu nghiệp vụ then chốt, không thể chấp nhận mất nhất quán.

Tham chiếu: Mục Công nghệ cho từng loại dữ liệu.

</details>

**Câu 2:** Hai vai trò của Redis trong hệ thống này là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cache thông tin sản phẩm, dữ liệu session và tồn kho hay được đọc, giúp giảm tải database và cải thiện thời gian phản hồi.

Giải thích: Phục vụ dữ liệu nóng từ bộ nhớ thay vì truy vấn database cho mọi request.

Tham chiếu: Mục Công nghệ cho từng loại dữ liệu.

</details>

**Câu 3:** Quyết định quan trọng nhất khi chọn Kafka là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không phải công nghệ cụ thể, mà là việc áp dụng cách tiếp cận hướng sự kiện (event-driven).

Giải thích: Mục tiêu là để các tác vụ nền như cập nhật tồn kho và thông báo không làm chậm request người dùng; AWS SQS cũng là lựa chọn hợp lệ.

Tham chiếu: Mục Công nghệ cho từng loại dữ liệu.

</details>

**Câu 4:** Bộ giao thức xác thực nào được sử dụng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** OAuth2 và OpenID Connect, với JWT cho session stateless an toàn.

Giải thích: Đây là các giao thức chuẩn của ngành cho xác thực.

Tham chiếu: Mục Bảo mật.

</details>

**Câu 5:** Vì sao nói "công nghệ đi sau kiến trúc"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì phải xác định vấn đề, thiết kế kiến trúc trước, rồi mới chọn công nghệ hỗ trợ thiết kế đó.

Giải thích: Đó là cách kiến trúc sư kinh nghiệm tiếp cận, tránh chọn công nghệ theo trào lưu.

Tham chiếu: Mục Nguyên tắc vàng.

</details>

---

Vậy là chúng ta đã chốt xong bộ công nghệ và hạ tầng cho từng phần của hệ thống. Ở bài tiếp theo — bài cuối của case study — chúng ta sẽ ghép mọi thứ thành **một bản thiết kế hoàn chỉnh** và xem hệ thống vận hành end-to-end như thế nào. Hẹn gặp lại các bạn! 🚀
