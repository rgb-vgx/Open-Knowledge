# ⚡ SSH vào EC2 trên Windows 10 bằng PowerShell (Siêu nhanh)

> Nguồn: `041-How-to-SSH-using-Windows-10.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055732)

Nếu các bạn đang dùng **Windows 10**, không cần PuTTY nữa — hệ điều hành đã có sẵn lệnh `ssh`. Mình sẽ dùng **PowerShell** để SSH vào EC2 Instance, và bạn cũng có thể làm tương tự với Command Prompt.

*Nếu máy bạn không có sẵn lệnh SSH, đừng lo — cứ dùng phương pháp PuTTY ở bài trước.*

---

### 🔍 Kiểm tra SSH có sẵn hay không

1. Mở **Windows PowerShell**.
2. Gõ `ssh` rồi Enter.
3. Nếu thấy hướng dẫn sử dụng lệnh hiện ra → lệnh đã có sẵn.
4. Không thấy gì → máy bạn chưa có SSH, hãy quay lại dùng phương pháp PuTTY ở bài trước.

---

### 📂 Di chuyển tới thư mục chứa file PEM

1. Ban đầu mình đang ở `C:\users\stephanemaarek`, gõ `ls` thì **không thấy file pem** vì nó nằm trên desktop.
2. Gõ `cd .\Desktop` để chuyển thư mục, rồi `clear` để xóa màn hình.
3. Gõ `ls` lại → thấy `EC2Tutorial.pem` (file quan trọng duy nhất) và cả file `.ppk` — file PPK chỉ dùng cho PuTTY, không có cũng không sao.

---

### ⚙️ Chạy lệnh SSH

Trước tiên hãy chắc chắn **security group đã mở port 22 cho SSH** — chúng ta đã kiểm tra và đang mở đúng. Sau đó chạy lệnh, rất giống với cách làm trên Mac:

```bash
ssh -i EC2Tutorial.pem ec2-user@<public-ip>
```

Mẹo nhỏ: bạn có thể gõ **Tab** để tự động hoàn thiện tên file (bấm Tab tiếp để chuyển giữa `.ppk` và `.pem`). Lệnh này nói rằng: hãy đăng nhập vào địa chỉ IP này bằng user **ec2-user** — đúng user chúng ta có vì đang dùng Amazon Linux.

Bấm **Enter**, hệ thống hỏi độ tin cậy của host → trả lời **yes**, và các bạn đã vào được máy.

---

### 🔐 Nếu gặp lỗi permission

Đôi khi bạn sẽ gặp lỗi về quyền của file key. Cách sửa:

1. Thoát ra, tìm file `.pem`, **chuột phải → Properties → tab Security**.
2. Bấm **Advanced** — điều đầu tiên: đảm bảo **owner của file chính là bạn** (bấm **Change**, chọn object types và locations trên máy của bạn, gõ tên bạn).
3. Bấm **Disable inheritance → Remove all inherited permissions**.
4. Xóa các mục như **System** và **Administrator** — họ không cần quyền truy cập file này.
5. Thêm chính bạn làm principal (gõ tên, **Check Names**) và cấp **Full control**, bấm OK.

Sau đó, khi xem lại Security, bạn chỉ thấy duy nhất tên mình với full permission — chạy lại lệnh SSH sẽ **không còn bị hỏi yes/no** nữa.

---

### ✅ SSH từ Command Prompt và thoát

Cách này hoạt động với cả **Command Prompt**: mở lên, `cd` tới desktop (không vào đúng thư mục là không chạy được), dán lệnh vào và SSH thành công.

Để thoát session, gõ `exit` hoặc bấm **Ctrl + D**. Vậy là các bạn đã SSH thẳng từ Windows vào EC2 instance — giờ chúng ta chính thức bắt đầu khóa học được rồi. Hẹn gặp các bạn ở bài sau! 🚀
