# 📲 Thực hành — Password Policy và MFA cho Root Account

> Nguồn: `018-IAM-MFA-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20208116)

Trong bài này, chúng ta sẽ **thực hành 2 lớp bảo vệ** cho tài khoản AWS: thiết lập **password policy** và bật **MFA cho root account**. *Đây là bài rất nên làm theo — nhưng hãy đọc kỹ cảnh báo của mình trước khi bật MFA nhé.*

---

### 🔑 Bước 1 — Thiết lập Password Policy

Vào **Account settings** ở menu bên trái, tìm mục **Password policy** và bấm **Edit**. Bạn có 2 lựa chọn:

* Dùng **IAM default password policy** với các yêu cầu có sẵn.
* **Tùy chỉnh**: bắt buộc độ dài tối thiểu, yêu cầu chữ in hoa, chữ in thường, chữ số, ký tự đặc biệt.

Ngoài ra có thể bật **password expiration** — ví dụ **hết hạn sau 90 ngày**, hoặc yêu cầu **admin reset**, cho phép user tự đổi mật khẩu, hoặc **ngăn tái sử dụng mật khẩu**. Tất cả chỉnh được ngay trong IAM console — đó là phần bảo mật thứ nhất.

---

### ⚠️ Bước 2 — Cảnh báo quan trọng trước khi bật MFA cho root

Bấm vào **tên account → Security credentials** (khi đang đăng nhập root) để thấy **security credentials của root user**. Root là tài khoản **quan trọng nhất**, và MFA là cách bảo vệ nó.

Trước khi làm, mình phải nói thật: **đã có học viên tự khóa mình khỏi tài khoản vì mất thiết bị MFA**. Vì vậy:

* Nếu bạn **có nguy cơ mất iPhone** hoặc thiết bị — **đừng làm theo**, chỉ xem video là đủ.
* Nếu vẫn muốn thực hành, bạn có thể **xóa MFA device sau khi kích hoạt**.

---

### 📱 Bước 3 — Gán MFA device

1. Đặt tên thiết bị — mình đặt **my iPhone**.
2. Chọn loại MFA: **authenticator app**, **security key** hoặc **hardware TOTP token**. Mình chọn **authenticator app** (dạng **virtual**).
3. AWS hiển thị **danh sách ứng dụng tương thích** cho Android và iOS. Mình dùng **Twilio Authy**.
4. Trên điện thoại: mở app → **add account** → **scan QR code** (bấm **Show QR code** trên AWS) → lưu lại.
5. Nhập **2 mã MFA liên tiếp** mà app sinh ra (trong video là **301935** và **792843**) để AWS kiểm tra thiết bị hoạt động đúng. *Mã của bạn sẽ khác — điều đó hoàn toàn bình thường.*
6. Bấm **Add MFA**. Hiện tại AWS cho phép tới **8 MFA devices** cho một tài khoản; có thể **remove** từng thiết bị nếu muốn.

---

### ✅ Bước 4 — Đăng nhập với MFA

Log out khỏi AWS rồi đăng nhập lại bằng **root account + mật khẩu**. Sau khi nhập đúng mật khẩu, AWS yêu cầu thêm **mã MFA** — mở app, lấy mã, bấm submit. Vậy là bạn đã đăng nhập thành công với **thêm một lớp bảo vệ** cho tài khoản.

---

Vậy là tài khoản của các bạn đã được bảo vệ bằng cả password policy lẫn MFA. Ở bài tiếp theo, chúng ta sẽ tìm hiểu **3 cách truy cập AWS: Management Console, CLI và SDK** cùng **access keys**. Hẹn gặp các bạn! 🚀
