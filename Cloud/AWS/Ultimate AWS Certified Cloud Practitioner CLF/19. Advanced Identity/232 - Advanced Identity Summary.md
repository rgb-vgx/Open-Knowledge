# 🧭 Tóm tắt Advanced Identity: Bản đồ danh tính trên AWS

> Nguồn: `232-Advanced-Identity---Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20587302)

Chúng ta đã đi hết section **Advanced Identity**! Bài này mình sẽ tổng kết lại toàn bộ các dịch vụ quản lý danh tính trên AWS để các bạn "mang vào phòng thi". *Các bạn hãy đọc chậm một chút và tự nhẩm lại từng dịch vụ nhé.*

---

### 🧱 Nền tảng: IAM và AWS Organizations

* **IAM (Identity and Access Management)** — làm **identity and access management bên trong tài khoản AWS**; đây là nơi bạn tạo các **user tin cậy thuộc công ty mình**.
* **AWS Organizations** — dù đã học ở section trước, nó cũng liên quan tới chuyên đề này, vì nhờ Organizations bạn có thể **quản lý nhiều tài khoản** cùng lúc.

---

### 🔑 STS và Amazon Cognito

* **STS (Security Token Service)** — cách AWS cấp **credential tạm thời, quyền hạn giới hạn** để truy cập tài nguyên AWS.
* **Amazon Cognito** — tạo **database user cho ứng dụng mobile và web** của bạn.

---

### 🏢 Directory Services và IAM Identity Center

* **Directory Services** — tích hợp **Microsoft Active Directory** vào AWS.
* **IAM Identity Center** — **một login cho nhiều tài khoản và ứng dụng**, giúp bạn di chuyển liền mạch giữa các tài khoản khác nhau.

---

### 📊 Bảng đối chiếu nhanh

| Dịch vụ | Dùng cho | Từ khóa nhận diện |
|---|---|---|
| **IAM** | Quản lý danh tính và truy cập trong tài khoản AWS | User tin cậy thuộc công ty bạn |
| **AWS Organizations** | Quản lý nhiều tài khoản AWS | Nhiều account |
| **STS** | Cấp credential tạm thời, quyền hạn giới hạn | Temporary, limited privileges |
| **Cognito** | Database user cho ứng dụng web và mobile | User ứng dụng, social login |
| **Directory Services** | Tích hợp Microsoft Active Directory vào AWS | Active Directory |
| **IAM Identity Center** | Một login cho nhiều account và application | Single sign-on |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** IAM dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Identity and access management bên trong tài khoản AWS; tạo user tin cậy thuộc công ty bạn.
Giải thích: Đây là dịch vụ nền tảng của mọi chuyên đề về danh tính.
Tham chiếu: Mục Nền tảng IAM và AWS Organizations.

</details>

**Câu 2:** STS cấp loại credential như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Credential tạm thời (temporary) và quyền hạn giới hạn (limited-privileged).
Giải thích: Chúng có thời hạn và cấu hình được expiration period.
Tham chiếu: Mục STS và Amazon Cognito.

</details>

**Câu 3:** Cognito tạo ra gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Database user cho các ứng dụng mobile và web.
Giải thích: Dành cho hàng triệu người dùng cuối, không phải nhân viên công ty.
Tham chiếu: Mục STS và Amazon Cognito.

</details>

**Câu 4:** Khi nào bạn cần đến Directory Services?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi cần tích hợp Microsoft Active Directory vào AWS.
Giải thích: Đây là từ khóa nhận diện của dịch vụ này.
Tham chiếu: Mục Directory Services và IAM Identity Center.

</details>

**Câu 5:** Dịch vụ nào cho phép một login dùng cho nhiều tài khoản AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS IAM Identity Center.
Giải thích: Giúp bạn di chuyển liền mạch giữa các account và ứng dụng.
Tham chiếu: Mục Directory Services và IAM Identity Center.

</details>

---

Vậy là chúng ta đã khép lại section **Advanced Identity** với bức tranh đầy đủ: **IAM, Organizations, STS, Cognito, Directory Services và IAM Identity Center**. *Các bạn hãy tự kể lại từng dịch vụ dùng cho việc gì — làm được điều đó là các bạn đã sẵn sàng cho đề thi.*

Hẹn gặp các bạn ở section tiếp theo: **Other Services**! 🚀
