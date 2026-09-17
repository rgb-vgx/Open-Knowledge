# 🛠️ Thực hành tạo IAM Role cho EC2

> Nguồn: `026-IAM-Roles-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20054646)

Lý thuyết đã rõ, giờ chúng ta cùng **tạo một IAM Role thực tế**. Role này sẽ dành cho EC2 — tuy chưa dùng được ngay, nhưng khi sang phần EC2, chúng ta sẽ quay lại với nó.

---

### 🚪 Bước 1: Mở trang Roles

Ở menu bên trái, các bạn bấm vào **Roles**. Có thể tài khoản của bạn đã có sẵn một vài role — hai hay nhiều hơn cũng không quan trọng. Chúng ta sẽ **tạo role của riêng mình**.

Nhắc lại cho chắc: **role là cách để gán quyền cho các thực thể AWS** để chúng làm việc trên AWS.

---

### 🛠️ Bước 2: Chọn loại role và dịch vụ

Có **5 loại role** các bạn có thể tạo. Loại cần biết cho bài thực hành này — và cho kỳ thi — là **role cho một dịch vụ AWS (AWS service)**.

Chọn xong, các bạn chọn tiếp **dịch vụ sẽ dùng role**:

* Các dịch vụ phổ biến: **EC2**, **Lambda**...
* Hoặc gần như **mọi dịch vụ trên AWS** đều có thể dùng role — đây là kiến thức rất phổ biến trong AWS, vì vậy chúng ta học nó.

Mình chọn **EC2**, với use case đơn giản là **EC2** (bỏ qua các lựa chọn khác), rồi bấm **Next**.

---

### 📜 Bước 3: Gán policy cho role

Tiếp theo, ta cần gắn quyền cho role:

1. Chọn policy **IAMReadOnlyAccess** — cho phép EC2 Instance **đọc mọi thứ trong IAM**.
2. Bấm **Next**.
3. Đặt tên role: **DemoRoleForEC2**.
4. Kiểm tra phần **trusted entities (thực thể tin cậy)**: role này **có thể được assume (đảm nhận) bởi dịch vụ EC2** — chính điều này định nghĩa nó là **role cho Amazon EC2**.

---

### ✅ Bước 4: Kiểm tra và tạo role

Xác nhận lại quyền — role đang có **IAM read only access** — rồi bấm **Create role**.

Role mới xuất hiện trong danh sách role của bạn, và các bạn có thể kiểm tra lại quyền của nó bất cứ lúc nào.

*Lưu ý: hiện tại chúng ta chưa dùng được role này — phải đợi đến phần EC2. Nhưng các bạn đã biết cách **tạo role cho EC2 và gán đúng quyền** rồi đấy!*

Vậy là xong một kỹ năng quan trọng khác của IAM. Hẹn gặp các bạn ở bài tiếp theo! 🚀
