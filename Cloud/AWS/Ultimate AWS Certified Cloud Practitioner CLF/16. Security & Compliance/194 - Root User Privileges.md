# 👑 Quyền hạn đặc biệt chỉ root user mới có (Đừng bỏ qua!)

> Nguồn: `194-Root-User-Privileges.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682630)

Trong các kỳ thi AWS, câu hỏi về **root user (người dùng gốc)** xuất hiện khá thường xuyên: *"Hành động nào chỉ root user mới làm được?"* Bài này mình sẽ liệt kê đầy đủ để các bạn ghi nhớ, đặc biệt là những ý quan trọng nhất.

---

### 👑 Root user là ai?

* Root user là **account owner (chủ tài khoản)** — **user đầu tiên** được dùng khi tài khoản được tạo.
* Root user có **quyền truy cập hoàn toàn (complete access)** vào mọi dịch vụ và tài nguyên AWS.
* Điểm mấu chốt: root user có thể làm những việc mà **ngay cả user có quyền cao nhất được tạo trong tài khoản cũng không làm được**.

Về nguyên tắc an toàn:

* Hãy **khóa tài khoản root lại (lock away the account)**, cùng với **access key** và **secret access key**.
* **Không dùng root user cho công việc hằng ngày, kể cả các tác vụ quản trị.**
* Thay vào đó, hãy tạo một **admin user riêng** trong tài khoản.

*Nghe thì đơn giản, nhưng đây là lời khuyên bảo mật quan trọng bậc nhất mà AWS luôn nhấn mạnh.*

---

### 🔐 Những việc CHỈ root user làm được

1. **Thay đổi account settings**: account name, email address, mật khẩu root user và access key của root user.
2. **Xem một số tax invoices (hóa đơn thuế)** nhất định.
3. **Đóng tài khoản AWS (close your account)**.
4. **Khôi phục quyền cho IAM user (restore IAM user permissions)**.
5. **Thay đổi hoặc hủy AWS Support plan**.
6. **Đăng ký làm seller trên Reserved Instance Marketplace**.
7. **Cấu hình S3 bucket để bật MFA**.
8. **Sửa hoặc xóa S3 bucket policy** đang gặp **VPC ID hoặc VPC endpoint ID không hợp lệ**.
9. **Đăng ký GovCloud**.

Đặc biệt chú ý mục **đăng ký làm seller trên Reserved Instance Marketplace** — mình lấy ví dụ cho dễ nhớ ngay sau đây.

---

### 💡 Use case: bán lại Reserved Instance

Giả sử bạn mua một **Reserved Instance (RI) 3 năm**, nhưng sau **2 năm** bạn nhận ra mình không cần dùng nữa. AWS có một **marketplace** cho phép bạn **bán lại Reserved Instance**. Tuy nhiên, để làm được điều đó:

1. Bạn phải **đăng ký làm seller** trên marketplace.
2. Và **chỉ root user mới có thể đăng ký**.

*Đây là use case rất dễ vào đề — nhớ kỹ "RI Marketplace = root user" nhé!*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Root user là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là chủ tài khoản, user đầu tiên khi tài khoản được tạo, có toàn quyền với mọi dịch vụ và tài nguyên AWS.
Giải thích: Root user có thể làm cả những việc user quyền cao nhất cũng không làm được. Tham chiếu: Mục Root user là ai.

</details>

**Câu 2:** Bạn nên dùng root user như thế nào cho an toàn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khóa tài khoản root, không dùng cho công việc hằng ngày (kể cả quản trị), và tạo một admin user riêng.
Giải thích: Đây là khuyến nghị bảo mật quan trọng. Tham chiếu: Mục Root user là ai.

</details>

**Câu 3:** Kể 3 hành động chỉ root user thực hiện được.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ví dụ: đóng tài khoản AWS, thay đổi/hủy AWS Support plan, đăng ký seller trên Reserved Instance Marketplace.
Giải thích: Ngoài ra còn đổi account settings, xem tax invoices, restore IAM permissions... Tham chiếu: Mục Những việc chỉ root user làm được.

</details>

**Câu 4:** Vì sao đăng ký seller trên Reserved Instance Marketplace lại cần root user?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chỉ root user mới được đăng ký làm seller — cần thiết khi bạn muốn bán lại RI không còn dùng.
Giải thích: Ví dụ RI 3 năm, dùng 2 năm rồi muốn bán lại. Tham chiếu: Mục Use case bán lại Reserved Instance.

</details>

**Câu 5:** Hai hành động liên quan đến S3 mà chỉ root user làm được là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cấu hình S3 bucket để bật MFA; sửa/xóa bucket policy gặp VPC ID hoặc VPC endpoint ID không hợp lệ.
Giải thích: Cùng với đăng ký GovCloud. Tham chiếu: Mục Những việc chỉ root user làm được.

</details>

---

Vậy là các bạn đã có trọn danh sách "quyền lực" của root user. *Nếu chỉ nhớ 4 ý: đổi account settings, đóng tài khoản, đổi/hủy support plan và đăng ký seller ở RI Marketplace — thì bạn đã nắm phần lớn điểm của dạng câu hỏi này.*

Ở bài tiếp theo, chúng ta sẽ khám phá **IAM Access Analyzer** — công cụ phát hiện tài nguyên bị chia sẻ ra bên ngoài. Hẹn gặp các bạn! 🚀
