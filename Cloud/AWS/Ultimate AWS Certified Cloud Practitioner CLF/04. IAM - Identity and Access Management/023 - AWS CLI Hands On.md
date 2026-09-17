# 🔑 AWS CLI Hands-On: Access Keys và câu lệnh đầu tiên

> Nguồn: `023-AWS-CLI-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20054628)

Đã đến lúc chúng ta dùng AWS CLI thực sự! Trong bài này, mình sẽ **tạo access key (khóa truy cập)**, cấu hình CLI và chạy những câu lệnh đầu tiên. Các bạn hãy mở console lên và làm theo mình nhé.

---

### 🔑 Tạo Access Key trong IAM

Mình bấm vào **username của mình (Stephane)** → chọn **Security credentials** → cuộn xuống và bấm **Create access key**.

Các bạn sẽ thấy một số lựa chọn về mục đích sử dụng. Tùy vào lựa chọn mà AWS sẽ đưa ra **gợi ý giải pháp thay thế**:

* Nếu chọn dùng cho **CLI**, AWS khuyên dùng **CloudShell** — mình sẽ demo ở bài sau, nên các bạn đừng lo.
* Hoặc dùng **CLI V2 với xác thực qua IAM Identity Center** — cách này hơi phức tạp nên mình sẽ không đi sâu.
* Còn tùy bài toán (local code chạy ngoài AWS, chạy trong AWS...) mà phần gợi ý phía dưới sẽ khác nhau.

Ở đây mình vẫn chọn tạo access key cho CLI, đánh dấu **"I understand the above recommendation"**, vì điều quan trọng là các bạn phải hiểu access key là gì và hoạt động thế nào.

⚠️ **Lưu ý cực quan trọng:** đây là **lần duy nhất** các bạn nhìn thấy **access key** và **secret access key** — hãy lưu lại ngay.

*Giao diện console có thể đã thay đổi đôi chút so với lúc ghi hình, nhưng các thao tác không đổi.*

---

### ⚙️ Cấu hình AWS CLI

Việc đầu tiên là cấu hình CLI:

```bash
aws configure
```

Lần lượt nhập:

1. **AWS Access Key ID** → dán access key vừa tạo.
2. **AWS Secret Access Key** → dán secret key.
3. **Default region name** → chọn region gần bạn. Mình chọn `eu-west-1` vì mọi bài hướng dẫn của mình dùng region này; các bạn cứ chọn region của riêng mình. Tên region có thể xem ngay trong dropdown trên console — vừa có tên, vừa có **region code**.
4. **Default output format** → cứ Enter để bỏ qua.

---

### 🧪 Chạy thử câu lệnh đầu tiên

CLI đã sẵn sàng, giờ chạy:

```bash
aws iam list-users
```

Kết quả trả về danh sách user trong tài khoản: username **Stephane**, **UserId**, **ARN**, ngày tạo và thời điểm mật khẩu được dùng lần cuối — thông tin tương tự như khi xem trên Management Console. *Vậy là console và CLI cung cấp cùng loại thông tin, chỉ khác cách truy cập.*

---

### 🔒 Kiểm chứng quyền hạn qua CLI

Để các bạn thấy CLI và console hành xử giống nhau, mình thử **gỡ user Stephane khỏi group admin** — thao tác này mình làm bằng **root account**. Sau khi refresh console, mình nhận lỗi **không có quyền**. Chạy lại `aws iam list-users` trên CLI, kết quả cũng **bị từ chối (denied)**.

**Bài học:** quyền trên CLI hoàn toàn giống quyền trên IAM console. Bạn có thể truy cập AWS bằng **Management Console**, hoặc bằng **access key + secret access key** cấu hình cho CLI.

*Và tất nhiên, đừng quên thêm user trở lại group nhé* — mình vào Groups → admins → add user Stephane trở lại để một lần nữa trở thành administrator. Quên bước này là "thảm họa" đấy!

Vậy là các bạn đã biết tạo access key và dùng AWS CLI. Hẹn gặp các bạn ở bài tiếp theo! 🚀
