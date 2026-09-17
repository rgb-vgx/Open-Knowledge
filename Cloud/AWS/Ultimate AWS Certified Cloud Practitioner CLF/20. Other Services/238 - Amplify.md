# 🛠️ AWS Amplify — bộ công cụ xây dựng full-stack web và mobile

> Nguồn: `238-Amplify.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/33532798)

Nối tiếp bài AppSync, chúng ta cùng tìm hiểu **AWS Amplify** — bộ công cụ và dịch vụ giúp các bạn **phát triển và triển khai ứng dụng full-stack (cả frontend lẫn backend) có khả năng mở rộng** cho web và mobile. Nếu cần một câu so sánh dễ nhớ, hãy xem Amplify như **"Elastic Beanstalk dành cho ứng dụng web và mobile"**.

---

### 🎯 Amplify là gì?

Amplify là một **set of tools and services (bộ công cụ và dịch vụ)** giúp bạn develop và deploy **scalable full stack web and mobile applications (ứng dụng full-stack web và mobile có khả năng mở rộng)**.

Nói cách khác, Amplify mang đến một **comprehensive suite (bộ giải pháp toàn diện)** để quản lý mọi thứ bạn cần cho ứng dụng web và mobile của mình.

---

### 🧰 Amplify quản lý được những gì?

Thông qua Amplify, các bạn có thể quản lý:

* **Authentication (xác thực)**
* **Storage (lưu trữ)**
* **API** — cả **REST API** lẫn **GraphQL API**
* **CI/CD (Continuous Integration/Continuous Delivery — tích hợp và triển khai liên tục)**
* **PubSub (publish-subscribe — xuất bản/đăng ký)**
* **Analytics (phân tích)**
* **Machine learning (học máy)**
* **Monitoring (giám sát)**
* Nguồn **source code (mã nguồn)** từ AWS, GitHub hoặc các nơi khác

---

### 🏗️ Amplify Studio và backend bên dưới

Khi vào Amplify, các bạn có thể mở **Amplify Studio** — nơi thiết lập mọi thứ mình cần: **data, authentication, storage, functions, GraphQL API**...

Ở hậu trường, Amplify sẽ cấu hình một **Amplify backend**, và backend này tận dụng các dịch vụ AWS quen thuộc:

* **Amazon S3** — lưu trữ
* **Amazon Cognito** — xác thực
* **AWS AppSync** — backend GraphQL
* **API Gateway** — backend REST
* **SageMaker**, **Lex**, **Lambda**, **DynamoDB**...
* ...và nhiều dịch vụ khác nữa.

Vì vậy, hãy xem Amplify như một **wrapper (lớp bao) tiện lợi** quanh các dịch vụ AWS này — mục tiêu là giúp các bạn xây backend cho ứng dụng mobile nhanh hơn rất nhiều.

*Đừng lo nếu danh sách dịch vụ bên dưới hơi dài — điều cần nhớ là Amplify lo phần "keo dính", còn các dịch vụ kia vẫn là những gì các bạn đã học.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** AWS Amplify là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bộ công cụ và dịch vụ giúp phát triển, triển khai ứng dụng full-stack web và mobile có khả năng mở rộng.

Giải thích: Amplify quản lý toàn diện mọi thứ bạn cần cho ứng dụng web/mobile.

Tham chiếu: Mục Amplify là gì.

</details>

**Câu 2:** Amplify thường được ví như dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Elastic Beanstalk dành cho ứng dụng web và mobile.

Giải thích: Đây là cách so sánh dễ nhớ để hình dung vai trò của Amplify.

Tham chiếu: Mục Amplify là gì.

</details>

**Câu 3:** Amplify Studio dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thiết lập data, authentication, storage, functions, GraphQL API... cho backend.

Giải thích: Studio là nơi bạn quản lý mọi cấu hình cần thiết.

Tham chiếu: Mục Amplify Studio và backend bên dưới.

</details>

**Câu 4:** Amplify hỗ trợ những loại API nào, tương ứng với dịch vụ AWS nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** REST API qua API Gateway và GraphQL API qua AWS AppSync.

Giải thích: Đây là hai lựa chọn backend API phổ biến trong Amplify.

Tham chiếu: Mục Amplify Studio và backend bên dưới.

</details>

**Câu 5:** Kể tên một vài dịch vụ AWS mà Amplify backend tận dụng ở hậu trường.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ví dụ: S3, Cognito, AppSync, API Gateway, SageMaker, Lex, Lambda, DynamoDB.

Giải thích: Amplify đóng vai trò lớp wrapper quanh các dịch vụ này.

Tham chiếu: Mục Amplify Studio và backend bên dưới.

</details>

---

Vậy là các bạn đã hiểu Amplify: một lớp wrapper tiện lợi giúp xây backend mobile/web nhanh chóng trên nền các dịch vụ AWS quen thuộc. Ở bài tiếp theo, chúng ta sẽ cầm chuột thiết kế hạ tầng với **AWS Infrastructure Composer**. Hẹn gặp lại! 🚀
