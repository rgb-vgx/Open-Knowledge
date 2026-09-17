# 🧪 Hands-on: Tạo RDS database, snapshot và dọn dẹp tài nguyên

> Nguồn: `091-RDS-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055980)

Được rồi, lý thuyết đủ rồi — chúng ta cùng vào **RDS console** để tạo database thật và thực hành snapshot nhé. *Các bạn hãy mở AWS console và làm theo mình, học qua thực hành là cách nhớ lâu nhất.*

---

### 🛠️ Tạo database với full configuration

1. Trong console **Aurora và RDS**, chọn **Databases** ở menu bên trái, rồi bấm **Create database**.
2. Chọn **Full configuration** thay vì *Easy create* — vì chúng ta muốn xem hết các tùy chọn.
3. Chọn **engine**: Aurora (MySQL hoặc Postgres compatible), MySQL, Postgres... Trong bài này, mình chọn **MySQL** cho đơn giản. **Engine version** cứ để mặc định.
4. Chọn **template**:
   * **Production** — mở ra nhiều setting hơn, gồm **Multi-AZ DB instance deployment** với 2 instance, hoặc **Multi-AZ DB cluster deployment** với 3 instance.
   * **Dev/Test**.
   * **Free tier** — chỉ cho phép **Single-AZ database instance deployment** với 1 instance.
5. Mình chọn **Free tier** và giữ mặc định phần database. Về **credential management**, có 2 lựa chọn: tự đặt password, hoặc để **AWS Secrets Manager** quản lý password (an toàn nhất nhưng **có tính phí**). Bài này dùng **self-manage**, đặt một **master password** (mật khẩu của mình rất yếu, mình biết điều đó!) và bật **password authentication**. Vẫn có tùy chọn dùng **IAM** để authenticate vào database.
6. **Instance configuration**: dùng **db.t4g.micro** (bạn có thể thấy db.t3.micro hoặc loại khác — cứ chọn mặc định). **Storage**: **20 GB**.
7. Trong **additional storage configuration**, có tùy chọn bật **storage autoscaling** — nếu dùng hết storage, database có thể tự scale lên tới **1.000 GB**.
8. **Connectivity**: chọn *don't connect to an EC2 compute resource*, dùng **default VPC**, giữ **subnet group** mặc định, và bật **Public access: Yes** để truy cập database từ bên ngoài bằng public IP.
9. **VPC security group**: chọn **Create new**, đặt tên **demo-rds**.
10. Không đặt preference cho AZ, không dùng **RDS Proxy**. **Port 3306** — đây là cổng để kết nối vào MySQL.
11. Monitoring: chọn **standard insights**; có thể bật **enhanced monitoring** và export logs nếu muốn.
12. Xem **estimated monthly cost**: RDS free tier áp dụng cho các instance type này trong **12 tháng**. Sau đó bấm **Create database** và chờ vài phút.

---

### 🔎 Kiểm tra database sau khi tạo

Sau khi database được tạo, trang summary cho bạn nhiều thông tin hữu ích:

* **Nơi launch** — ví dụ **eu-central-1a**.
* **Endpoint** và **port** để kết nối vào database.
* **VPC security group** đã tạo cho RDS instance, với **inbound rule** mở **port 3306** vào instance — vậy là mình có thể kết nối đúng cổng tới MySQL.
* Tab **Monitoring**: thông tin về **CPU utilization**, **login events**... — bạn bắt đầu thấy rõ sức mạnh của **managed service**.
* Cùng với đó là **configuration, backups và tags**.

*Một database trên cloud được quản lý sẵn sẽ mang lại lợi thế rất lớn: monitoring, cấu hình và backup đều nằm trong tầm tay.*

---

### 📸 Làm việc với snapshot: restore, copy, share

1. Vào **Actions → Take snapshot**, đặt tên **demo-snapshot**. Lần đầu mình chưa làm được vì database đang trong giai đoạn backup — phải chờ đến khi database ở trạng thái **available**.
2. Khi snapshot đã **available**, bạn có thể **Actions → Restore snapshot** để tạo database mới từ snapshot.
   * Lý do nên làm việc này: tạo database lớn hơn, tạo bản copy, hoặc tạo phiên bản với cấu hình khác.
3. **Copy snapshot** sang **region khác** — cực hữu ích cho **disaster recovery** khi muốn restore database ở một region AWS khác.
4. **Share snapshot** với các tài khoản khác để họ restore database trực tiếp từ snapshot của bạn.

---

### 🧹 Dọn dẹp tài nguyên

1. **Xóa snapshot** đã tạo.
2. Chọn database → **Actions → Delete**.
3. Trong hộp thoại xóa: **không** tạo final snapshot, **không** giữ automated backups, tích xác nhận rằng mọi thứ sẽ bị xóa.
4. Gõ **delete me** và xác nhận — thế là xong.

---

Vậy là các bạn đã tự tay tạo một RDS database, tạo snapshot và làm quen với các thao tác quản trị cơ bản. *Managed service giúp bạn không phải quản lý quá nhiều hạ tầng — đây chính là điều làm nên sức mạnh của cloud.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu các kiểu triển khai RDS: **Read Replica, Multi-AZ và Multi-Region**. Hẹn gặp các bạn ở đó! 🚀
