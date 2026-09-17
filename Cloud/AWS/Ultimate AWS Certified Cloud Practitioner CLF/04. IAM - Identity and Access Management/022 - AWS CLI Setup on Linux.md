# 🐧 Cài AWS CLI trên Linux chỉ với 3 lệnh

> Nguồn: `022-AWS-CLI-Setup-on-Linux.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20395729)

Sau khi đã biết cách cài AWS CLI trên Windows và Mac, bài này mình sẽ hướng dẫn các bạn cài **AWS CLI trên Linux**. Cách làm cực gọn: chỉ **3 lệnh** trong terminal là xong, và các bạn có thể chạy mọi câu lệnh AWS ngay sau đó.

---

### 🔍 Bước chuẩn bị: chọn đúng phiên bản AWS CLI

Mình bắt đầu bằng việc Google hướng dẫn cài đặt, rồi chọn **cài AWS CLI Version 2 trên Linux** — vì đây là **phiên bản mới nhất**.

Các bạn cứ tìm đến trang hướng dẫn cài đặt rồi cuộn xuống phần cài CLI. Ở đó AWS đã chuẩn bị sẵn các lệnh cho chúng ta.

---

### 📦 Cài đặt với 3 lệnh

Đúng như mình nói, quy trình chỉ gồm 3 bước:

1. **Tải file Zip chứa bộ cài:** mình copy lệnh đầu tiên, mở terminal và dán vào — installer bắt đầu được tải về máy.
2. **Giải nén (unzip):** copy lệnh thứ hai, dán vào terminal để giải nén bộ cài.
3. **Chạy installer với quyền root:** mình dùng `sudo` để chạy phần cài đặt. Hệ thống sẽ hỏi mật khẩu, các bạn nhập vào là quá trình cài đặt diễn ra.

*Nếu bạn chưa từng dùng terminal trên Linux thì cũng đừng lo — chỉ cần copy/paste đúng 3 lệnh là được.*

---

### ✅ Kiểm tra cài đặt thành công

Xong 3 lệnh, các bạn kiểm tra bằng:

```bash
aws --version
```

Nếu mọi thứ suôn sẻ, kết quả sẽ hiển thị **AWS CLI phiên bản 2** (con số cụ thể tùy thời điểm cài), kèm thông tin về **Python**, **Linux** và **Botocore** — vậy là các bạn đã sẵn sàng.

Mẹo nhỏ: nếu thư mục `/usr/local/bin` đã nằm trong `PATH`, các bạn chỉ cần gõ `aws --version`; nếu không, có thể gọi trực tiếp qua đường dẫn đầy đủ `/usr/local/bin/aws --version`.

Khi lệnh này chạy được, các bạn có thể dùng **bất kỳ câu lệnh nào của AWS CLI** và tiếp tục với các bài giảng còn lại.

---

### ⚠️ Nếu gặp trục trặc

*Đừng vội nản* — nếu quá trình cài đặt có vấn đề, các bạn hãy đọc phần hướng dẫn xử lý lỗi ở cuối trang; nó sẽ chỉ rõ chuyện gì đang xảy ra.

Vậy là AWS CLI trên Linux đã xong! Ở bài tiếp theo, chúng ta sẽ cùng **thực hành các câu lệnh CLI đầu tiên** trên AWS. Hẹn gặp các bạn ở đó! 🚀
