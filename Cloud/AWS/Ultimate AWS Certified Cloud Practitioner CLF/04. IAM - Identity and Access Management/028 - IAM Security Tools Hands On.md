# 🧪 Thực hành: Đọc Credentials Report và Access Advisor

> Nguồn: `028-IAM-Security-Tools-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20208136)

Bài trước chúng ta đã biết lý thuyết về hai công cụ bảo mật của IAM. Giờ mình sẽ thao tác trực tiếp trên console: tạo **Credentials Report** và xem **Access Advisor** cho một user.

---

### 📊 Tạo Credentials Report

Từ menu bên trái, mình bấm **Credential report**, rồi chọn **Download credential report** — kết quả là một file **CSV**.

Vì đây là tài khoản luyện tập nên báo cáo khá đơn giản, chỉ có **2 dòng**: **root account** và tài khoản tên **stephane**.

---

### 🔎 Đọc các cột trong báo cáo

Với mỗi user, các bạn sẽ thấy:

* **Thời điểm user được tạo**.
* **Password có được bật không**, lần cuối dùng và lần cuối thay đổi.
* **Lần xoay mật khẩu (rotation) kế tiếp** — nếu password rotation được bật.
* **MFA có đang hoạt động không** — trong tài khoản demo, root account đã bật MFA, còn tài khoản stephane thì chưa.
* **Access keys**: đã được tạo chưa (stephane có, root thì không), lần cuối xoay, lần cuối dùng...
* Các **certificate** và thông tin khác.

Báo cáo này **cực kỳ hữu ích** để tìm ra những user lâu ngày không đổi mật khẩu, không dùng tài khoản... — tức là những người cần bạn để mắt tới từ **góc độ bảo mật**.

---

### 🧭 Xem Access Advisor

Mình mở user **stephane** → bấm **Access Advisor** ở phía bên phải. Công cụ này hiển thị **các dịch vụ mà user đã truy cập và thời điểm truy cập**. Trong tài khoản demo:

* Đã truy cập: **Organizations**, **Health**, **IAM**, **EC2**, **Resource Explorer**.
* Chưa truy cập: ví dụ **Alexa for Business**, **AWS App2Container**...

Danh sách dịch vụ dài tới **37 trang**, trong khi có thể user chỉ cần một vài dịch vụ chứ không phải tất cả. Giao diện cho phép **xem chi tiết (drill down)**: nếu user truy cập một dịch vụ cụ thể như **Amazon EC2**, bạn sẽ thấy dịch vụ này được cấp quyền qua policy **administrator access**.

**Chốt lại:** Access Advisor rất hữu ích khi bạn cần **quản lý quyền truy cập chi tiết (granular)** cho user trên AWS.

---

Vậy là các bạn đã biết dùng cả hai công cụ bảo mật của IAM. Hẹn gặp các bạn ở bài tiếp theo! 🚀
