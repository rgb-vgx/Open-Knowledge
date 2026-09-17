# 🧱 Shared Responsibility Model: AWS lo phần nào, bạn lo phần nào?

> Nguồn: `177-Shared-Responsibility-Model-Reminders-Examples.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056304)

Chào mừng các bạn đến với section **Security & Compliance**! Mở màn, chúng ta sẽ chính thức hóa một khái niệm đã xuất hiện xuyên suốt khóa học: **Shared Responsibility Model (Mô hình trách nhiệm chung)**.

Đây là chủ đề *gần như chắc chắn xuất hiện trong đề thi — ít nhất 2 đến 3 câu* — nên các bạn hãy nắm thật chắc: phần nào là việc của AWS, phần nào là việc của bạn.

---

### 🎯 AWS chịu trách nhiệm gì? — Security OF the cloud

**AWS chịu trách nhiệm về "security of the cloud" (bảo mật của chính đám mây)**. Cụ thể:

* Toàn bộ **hạ tầng** AWS cung cấp: **hardware (phần cứng)**, **software (phần mềm)**, **facilities (cơ sở vật chất)** và **networking (mạng)** — vì chính hạ tầng này chạy mọi dịch vụ bạn dùng.
* Mọi **dịch vụ được AWS quản lý** như **S3**, **DynamoDB**, **RDS** — phần vận hành thuộc về AWS.

Nói ngắn gọn: cứ là hạ tầng gốc và các dịch vụ managed, AWS lo.

---

### 🔐 Khách hàng chịu trách nhiệm gì? — Security IN the cloud

Khi AWS đã cung cấp dịch vụ cho bạn, **cách bạn sử dụng dịch vụ đó là trách nhiệm của bạn** — "security in the cloud". Lấy ví dụ với **EC2 instance**, bạn phải:

* Quản lý **operating system (hệ điều hành)**: vá lỗi (**patching**) và cập nhật thường xuyên.
* Cấu hình **firewall**: **Network ACL** và **Security Group**.
* Gán đúng quyền cho instance thông qua **IAM instance role**.
* **Mã hóa application data (dữ liệu ứng dụng)** theo yêu cầu compliance (tuân thủ) của bạn.

---

### ⚙️ Những kiểm soát được chia sẻ giữa hai bên

Có những hạng mục được **shared (chia sẻ)** giữa bạn và AWS:

* **Patch management (quản lý vá lỗi)**
* **Configuration management (quản lý cấu hình)**
* **Awareness and training (nhận thức và đào tạo)**

Ví dụ dễ hiểu: nếu dùng **RDS**, AWS vá lỗi cho bạn; còn nếu dùng **EC2**, bạn phải tự vá hệ điều hành — đó là lý do gọi là "shared control". Về đào tạo, AWS phải huấn luyện nhân viên của họ dùng đúng cơ sở vật chất và tuân thủ guideline bảo mật; còn bạn phải đào tạo nhân viên của mình dùng cloud đúng cách.

---

### 🗄️ Ví dụ chi tiết: RDS và S3

**Với Amazon RDS:**

* **AWS** quản lý EC2 instance bên dưới, chặn **SSH access**, tự động vá **database** và **operating system**, duy trì instance và disk hoạt động ổn định theo thời gian.
* **Bạn** chịu trách nhiệm: kiểm tra **port, IP và inbound rules** của security group cho database; tạo **user trong database** và phân quyền theo ý muốn; chọn database **public hay không public access**; dùng **parameter groups** để ép buộc kết nối mã hóa; và **bật mã hóa dữ liệu** trong database nếu muốn.

**Với Amazon S3:**

* **AWS** đảm bảo **unlimited storage (lưu trữ không giới hạn)**, cung cấp mã hóa khi bạn bật, **tách biệt dữ liệu** giữa các khách hàng, và đảm bảo **nhân viên AWS không thể truy cập dữ liệu** của bạn.
* **Bạn** chịu trách nhiệm: cấu hình **bucket** theo chuẩn của mình, viết **bucket policy** phù hợp, dùng **IAM users và roles** đúng cách, và **bật encryption** với scheme (cơ chế) mà bạn chọn.

| Hạng mục | AWS | Khách hàng |
|---|---|---|
| Hạ tầng, phần cứng, mạng | ✅ | |
| Dịch vụ managed như S3, RDS, DynamoDB | ✅ | |
| OS và vá lỗi trên EC2 | | ✅ |
| Firewall, IAM, mã hóa dữ liệu | | ✅ |
| Patch, configuration, training | 🤝 | 🤝 |

---

### 📊 Bức tranh tổng thể theo sơ đồ AWS

Theo sơ đồ trên website AWS: **trách nhiệm "in the cloud" thuộc về khách hàng**, gồm **data, applications, platform, identity and access management**, cấu hình **operating system, network, firewall**, **client-side data encryption**, **server-side encryption** và **network traffic protection**.

Ngược lại, **trách nhiệm "of the cloud" thuộc về AWS**, gồm **software (các dịch vụ)**, đảm bảo **compute, storage, database, networking** hoạt động đúng, cùng **hardware** và **global infrastructure**: **regions, AZ và edge locations**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** "Security of the cloud" là trách nhiệm của ai?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS.
Giải thích: AWS bảo vệ hạ tầng, phần cứng, phần mềm, cơ sở vật chất và mạng — cũng như các dịch vụ managed.
Tham chiếu: Mục AWS chịu trách nhiệm gì.

</details>

**Câu 2:** Với EC2 instance, ai chịu trách nhiệm vá operating system?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khách hàng (bạn).
Giải thích: Đây là "security in the cloud" — bạn quản lý OS, firewall, IAM role và mã hóa dữ liệu.
Tham chiếu: Mục Khách hàng chịu trách nhiệm gì.

</details>

**Câu 3:** Kể tên các kiểm soát được chia sẻ giữa khách hàng và AWS.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Patch management, configuration management, awareness and training.
Giải thích: Ví dụ RDS thì AWS vá lỗi, còn EC2 thì bạn tự vá — hai bên cùng tham gia.
Tham chiếu: Mục Những kiểm soát được chia sẻ.

</details>

**Câu 4:** Với RDS, việc vá database và operating system do ai thực hiện?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS.
Giải thích: AWS cũng chặn SSH access, duy trì instance và disk; bạn chỉ lo security group, user, public access và mã hóa.
Tham chiếu: Mục Ví dụ chi tiết: RDS và S3.

</details>

**Câu 5:** Với S3, ai chịu trách nhiệm bật mã hóa cho dữ liệu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khách hàng.
Giải thích: AWS cung cấp mã hóa khi bạn bật, nhưng việc bật và chọn scheme là trách nhiệm của bạn.
Tham chiếu: Mục Ví dụ chi tiết: RDS và S3.

</details>

---

Vậy là các bạn đã nắm được đường ranh giới quan trọng nhất của bảo mật AWS. *Nhớ kỹ: "of the cloud" là AWS, "in the cloud" là bạn* — đề thi rất thích hỏi 2–3 câu về mô hình này.

Bài tiếp theo, chúng ta sẽ học cách chống lại một trong những cuộc tấn công đáng sợ nhất: **DDoS** — cùng **WAF** và **Shield**. Hẹn gặp các bạn ở đó! 🚀
