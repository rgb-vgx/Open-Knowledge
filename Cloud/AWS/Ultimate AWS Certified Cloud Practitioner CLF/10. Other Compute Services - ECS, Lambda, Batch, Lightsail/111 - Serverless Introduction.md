# ⚡ Serverless là gì? Đừng nhầm với "không có server"

> Nguồn: `111-Serverless-Introduction.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056030)

Chào mừng các bạn đến với phần **Serverless** — một trong những chủ đề quan trọng nhất của khóa học và cũng rất hay xuất hiện trong đề thi. Mình sẽ bắt đầu bằng câu hỏi đơn giản nhất: *serverless thực sự nghĩa là gì?*

---

### ⚡ Serverless là gì?

**Serverless là một mô hình mới (new paradigm)** trong đó **lập trình viên không còn quản lý server nữa**. Họ chỉ làm điều mình giỏi nhất: **deploy code hoặc deploy function**.

Ban đầu, serverless được tiên phong dưới dạng **Function as a Service (hàm như một dịch vụ)** với **AWS Lambda**: bạn chỉ deploy code, và mỗi function sẽ được dịch vụ Lambda chạy một cách độc lập. Ngày nay, thuật ngữ serverless còn được dùng rộng hơn cho **những gì được quản lý (managed)** — bao gồm cả **serverless database, messaging, storage**, v.v.

---

### 🧭 Serverless không có nghĩa là "không có server"

Đây là điểm rất dễ gây nhầm lẫn: **serverless không có nghĩa là không có server**. Phía sau hậu trường **vẫn có server**, nếu không thì dịch vụ làm sao chạy được.

Điều khác biệt nằm ở chỗ: với tư cách người dùng cuối, **bạn không quản lý, không provision (cung cấp) và thậm chí không nhìn thấy server**. Bạn chỉ tập trung vào code và logic nghiệp vụ.

*Ghi nhớ nhanh: "serverless" = "bạn không thấy server", chứ không phải "không có server".*

---

### 🧱 Những dịch vụ serverless bạn đã dùng từ đầu khóa

Thực ra chúng ta đã dùng một số dịch vụ serverless ngay từ những bài đầu tiên:

* **Amazon S3** — dùng làm lớp lưu trữ nhưng không hề quản lý server nào. S3 có thể **scale vô hạn**, bạn chỉ cần upload file lên là xong.
* **DynamoDB** — bạn tạo bảng nhưng **không provision server** cho bảng đó; bảng có thể **tự động scale** theo tải.
* **Fargate** — chạy Docker container mà không cần tạo EC2 instance. Ngược lại, **ECS phải tạo EC2 instance để chạy container nên không phải serverless**.
* **Lambda** — dịch vụ tiên phong của serverless, cho phép bạn **chạy function trên cloud**. Chúng ta sẽ học trong bài tiếp theo.

---

### 🎯 Chốt lại

Serverless là tư duy: **bạn không quản lý hạ tầng, AWS lo phần đó**. Từ S3, DynamoDB, Fargate đến Lambda — tất cả đều mang tinh thần này.

*Đừng lo nếu khái niệm còn mới với bạn — chỉ vài bài nữa thôi, mọi thứ sẽ rõ ràng hơn rất nhiều!*

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Serverless nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mô hình mới trong đó lập trình viên không quản lý server, chỉ deploy code hoặc function.

Giải thích: Đây là định nghĩa cốt lõi của serverless.

Tham chiếu: Mục Serverless là gì.

</details>

**Câu 2:** Serverless có nghĩa là không có server đúng không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không. Server vẫn tồn tại phía sau, chỉ là người dùng không quản lý, provision hay nhìn thấy chúng.

Giải thích: Nếu không có server, dịch vụ không thể hoạt động.

Tham chiếu: Mục Serverless không có nghĩa là không có server.

</details>

**Câu 3:** Dịch vụ nào tiên phong cho serverless dạng Function as a Service?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS Lambda.

Giải thích: Lambda cho phép bạn deploy code và chạy từng function độc lập.

Tham chiếu: Mục Serverless là gì.

</details>

**Câu 4:** Vì sao S3 và DynamoDB được gọi là serverless?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì bạn không provision server nào cho chúng; S3 scale vô hạn, DynamoDB tự auto scale theo tải.

Giải thích: Người dùng không quản lý server phía sau các dịch vụ này.

Tham chiếu: Mục Những dịch vụ serverless bạn đã dùng từ đầu khóa.

</details>

**Câu 5:** Vì sao ECS chạy trên EC2 không phải là serverless?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì bạn phải tự tạo EC2 instance để chạy container; Fargate mới là serverless.

Giải thích: Serverless đòi hỏi bạn không phải quản lý server.

Tham chiếu: Mục Những dịch vụ serverless bạn đã dùng từ đầu khóa.

</details>

---

Vậy là bạn đã hiểu đúng bản chất của serverless. Ở bài tiếp theo, chúng ta sẽ đi sâu vào dịch vụ tiên phong của nó: **AWS Lambda**. Hẹn gặp các bạn! 🚀
