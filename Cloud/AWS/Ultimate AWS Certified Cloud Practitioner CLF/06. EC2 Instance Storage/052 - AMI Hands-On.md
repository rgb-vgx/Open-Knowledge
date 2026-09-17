# 🧪 Thực hành AMI: đóng gói EC2 thành khuôn mẫu boot nhanh

> Nguồn: `052-AMI-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055814)

Được rồi, đến lúc thực hành **AMI**! Chúng ta sẽ khởi tạo một instance, cài **Apache web server** bằng **user data**, rồi đóng gói nó thành AMI và dùng AMI đó để launch instance mới nhanh hơn hẳn. *Đây là bài rất trực quan — các bạn mở console làm cùng mình nhé!*

---

### 🚀 Bước 1: Launch instance và cài Apache bằng user data

1. Vào trang tạo instance, chọn **Amazon Linux 2** và instance type **t2.micro**.
2. Chọn **key pair** có sẵn, chỉnh **network settings** và chọn **security group** đã dùng ở bài trước.
3. Giữ nguyên storage, mở **Advanced details → User data** và dán script — lần này **copy toàn bộ script TRỪ dòng cuối**:
   * Các dòng đầu cài **HTTPD (Apache web server)**.
   * Dòng cuối tạo **index file** — nhưng lần này ta **không cần**, vì mục tiêu là tạo AMI đóng gói sẵn Apache.
4. Launch instance. Instance chạy và script cài Apache ở hậu trường.

*Lưu ý:* nếu bạn mở public IPv4 quá sớm (nhớ dùng giao thức **HTTP**), bạn sẽ gặp lỗi **connection refused**. Hãy kiên nhẫn chờ **1–2 phút** cho user data script chạy lần đầu, rồi refresh — bạn sẽ thấy trang test mặc định của Apache. *Đừng vội, cứ để nó hoàn tất!*

---

### 💿 Bước 2: Tạo AMI từ instance

1. Right-click instance → **Image and templates → Create image**.
2. Đặt tên, ví dụ **demo image**, giữ các settings mặc định rồi bấm **Create image**.
3. Vào menu **AMIs**: **demo AMI** đã được đăng ký (registered), trạng thái **pending** trong lúc tạo.
4. Chờ một chút cho đến khi trạng thái chuyển thành **created** — AMI đã sẵn sàng.

---

### 🚀 Bước 3: Launch instance mới từ AMI

1. Từ danh sách AMI, bấm **Launch instance from AMI** — hoặc vào trang tạo instance và mở tab **My AMIs / Owned by me** để chọn **demo image**.
2. Chọn key pair (tùy bạn), chỉnh network settings và chọn lại security group cũ.
3. Ở **Advanced → User data**, lần này bạn chỉ copy **3 dòng đầu** và **dòng cuối** — dòng **echo** để ghi file mới. Không cần cài lại HTTPD vì **AMI đã chứa sẵn Apache**.
4. Chờ instance **running**, lấy **public IP** và mở lên — bạn sẽ thấy **"Hello World"**, và đáng chú ý là **nhanh hơn hẳn** vì không phải cài HTTPD lại.

---

### 💡 Vì sao AMI lại mạnh đến vậy?

Hãy tưởng tượng bạn cần cài **phần mềm bảo mật**, **prerequisite software (phần mềm điều kiện tiên quyết)**... mất 2–3 phút. Quy trình chuẩn sẽ là:

1. Cài đặt tất cả mọi thứ.
2. **Đóng gói thành AMI**.
3. **Launch instance từ AMI** — boot nhanh hơn rất nhiều.
4. Tùy chỉnh nốt những gì cần ở cuối, và bạn đã sẵn sàng.

---

### 🧹 Bước 4: Dọn dẹp

Khi demo xong, hãy **terminate cả hai instance** để dọn tài nguyên. Thế là xong bài thực hành!

---

Vậy là các bạn đã tự tay tạo AMI và thấy tận mắt lợi ích của nó: **boot nhanh hơn, cấu hình sẵn sàng, tái sử dụng dễ dàng**. *AMI chính là "khuôn đúc" để nhân bản EC2 instance của bạn.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **EC2 Image Builder** — dịch vụ tự động hóa việc tạo AMI và **có xuất hiện trong đề thi**. Hẹn gặp các bạn ở đó! 🚀
