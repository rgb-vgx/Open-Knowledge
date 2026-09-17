# 🖥️ Lightsail Hands-On: Dựng WordPress trong vài phút

> Nguồn: `117-Lightsail-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20515564)

Trong bài này, mình sẽ cho các bạn thấy **Lightsail trông như thế nào** và dựng thử một website WordPress. Chúng ta sẽ không nghịch quá nhiều, nhưng đủ để bạn hình dung dịch vụ này đơn giản đến mức nào.

Ngay từ cái nhìn đầu tiên, bạn sẽ thấy **Lightsail trông không giống AWS chút nào** — nó là một dịch vụ tách biệt vì **không có tích hợp tốt với hệ sinh thái AWS**.

---

### 🧭 Tạo instance đầu tiên

1. Vào Lightsail và bấm tạo **instance**. Tại đây bạn **chọn region và Availability Zone (AZ)** cho instance — lưu ý là **số lượng region khả dụng khá hạn chế** (ví dụ mình chọn Ireland).
2. Chọn **instance image** — tương ứng với **AMI** bên EC2, nhưng trong Lightsail mọi thứ được **ẩn bớt cho đơn giản**.
3. Chọn **blueprint (bản mẫu)**: có thể là **OS only** (tương tự EC2), hoặc nhóm **Apps**. Ví dụ: chọn **WordPress** và bấm tạo → bạn có ngay một website WordPress.
4. Một số tùy chọn nâng cao vẫn có nhưng bị giấu khá kỹ: **launch script** (chính là **EC2 user data**), hoặc **đổi SSH key pair**.

*Lightsail "nhẹ" đúng như tên gọi của nó — mục tiêu là giúp bạn nhanh chóng lên AWS mà không cần hiểu toàn bộ hạ tầng bên dưới.*

---

### 💰 Chọn instance plan

Điểm thú vị nhất là phần **instance plan**:

* Ít tùy biến hơn nhiều — **không thấy EC2 instance type**, chỉ thấy các gói kèm **giá hiển thị rõ ràng**.
* Ví dụ gói **3,5 USD/tháng, tháng đầu miễn phí** — bạn thấy ngay lượng **RAM, CPU và dung lượng disk** nhận được.
* Số lượng gói cũng ít, cao nhất lên tới **160 USD/tháng** với **32 GB memory, 8 vCPU, 640 GB SSD và 7 TB network transfer**.

Mình chọn gói nằm trong **free tier** để thực hành — *nhưng nhớ kỹ: dùng xong phải xóa instance ở cuối bài nhé!*

Instances được tạo kiểu **WordPress one** — và để ý này: **không có security group, không có networking, không có EBS volume**. Mọi thứ được thiết kế để cực kỳ đơn giản — đó chính là tinh thần của Lightsail.

---

### 🗄️ Database, networking và storage

Trong lúc instance đang khởi tạo, bạn có thể tạo **database**:

* Lưu ý đây **không phải RDS**, mà là cơ sở dữ liệu của Lightsail — đơn giản hơn nhiều.
* Chọn region, AZ, **loại database**; nhập **credentials (thông tin đăng nhập)**.
* Chọn **standard database** hoặc **high availability**.
* Về giá: **tháng đầu khoảng 3 USD, sau đó 15 USD/tháng**.

Phần **networking** có thể tạo **load balancer**; phần **storage** cho thêm dung lượng disk và **snapshot để backup**. Tất cả gói gọn trong một giao diện — *một phiên bản AWS siêu đơn giản, đúng như tên Lightsail.*

---

### 🌐 SSH và xem WordPress

* Bấm vào instance để mở **SSH terminal ngay trên trình duyệt** — kết nối thẳng vào EC2 instance phía sau. Instance cần chút thời gian boot, *các bạn đợi một lát rồi thử lại nhé*.
* Không cần gõ lệnh nào — **WordPress đã được deploy sẵn**.
* Lấy **public IP** của instance, mở trong tab mới → bạn sẽ thấy **blog "hello world"** của WordPress đang chạy.

Mình không phải chuyên gia WordPress nên sẽ không chỉnh sửa gì thêm, nhưng điều quan trọng đã rõ: mọi thứ được tạo ra **rất nhanh và rất dễ**.

---

### 🧹 Dọn dẹp để không mất phí

Khi xong việc, hãy **xóa instance**: bấm **Delete** để tránh phát sinh chi phí.

Một lưu ý cho kỳ thi: Lightsail **hiếm khi là đáp án đúng** — nó thường xuất hiện dưới dạng **distractor (đáp án gây nhiễu)**. Tuy vậy, biết dịch vụ hoạt động thế nào vẫn rất đáng giá để không bị "lừa" trong phòng thi.

Vậy là bạn đã thấy Lightsail tận mắt. Ở bài tiếp theo, chúng ta sẽ **tổng kết toàn bộ section** này — ECS, Lambda, Batch, Lightsail và cả API Gateway. Hẹn gặp các bạn! 🚀
