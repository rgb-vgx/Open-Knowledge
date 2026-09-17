# 🧪 Thực hành Security Groups: Xóa thử một rule để hiểu ngay lỗi timeout

> Nguồn: `037-Security-Groups-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055680)

Lý thuyết security group đã có, giờ là lúc **tự tay thử nghiệm** trên instance đang chạy. Trong bài này, chúng ta sẽ xem inbound/outbound rules, **xóa thử rule port 80** để tận mắt thấy lỗi timeout, rồi thêm lại và kiểm chứng mọi thứ hoạt động trở lại. *Đây là cách học nhớ nhất — làm rồi sẽ không quên.*

---

### 🔍 Xem security group của instance

Trong màn hình instance, các bạn bấm vào mục **Security** để xem nhanh security group gắn với máy, cùng **inbound rules** và **outbound rules**.

Để thấy trang đầy đủ, vào menu bên trái: **Networking & Security → Security Groups**. Hiện tại console có **2 security group**:

* **default** — security group AWS tạo sẵn theo mặc định.
* **launch-wizard-1** — security group đầu tiên được tạo khi chúng ta launch EC2 instance.

Mỗi security group có một **ID (định danh)** giống như instance có instance ID. Mở **inbound rules** — đây là các rule cho phép kết nối **từ bên ngoài vào** instance — các bạn sẽ thấy **2 rule**: **SSH trên port 22** từ mọi nơi (`0.0.0.0/0`) và **HTTP trên port 80** từ mọi nơi. Chính rule port 80 này giúp web server truy cập được.

---

### 🧪 Xóa thử rule port 80 — timeout xuất hiện

Hãy bấm **Edit inbound rules** và **xóa rule port 80** rồi lưu lại. Lúc này chỉ còn port 22.

Quay lại trang web của instance và refresh — các bạn sẽ thấy màn hình **loading vô hạn**. Đó chính là **timeout**: kết nối cứ cố mãi, không thành công, rồi thất bại.

Đây là **tip cực quan trọng**: bất cứ khi nào bạn thấy **timeout** khi kết nối vào EC2 — dù là SSH, HTTP hay bất kỳ giao thức nào — thì **100% là do security group**. Lúc đó, hãy vào kiểm tra lại security group rules ngay.

---

### ➕ Thêm rule trở lại và chọn source

Để sửa, ta thêm lại rule:

1. Chọn type **HTTP** — port **80** sẽ tự điền.
2. Ở phần source, chọn **Anywhere IPv4** (`0.0.0.0/0`).
3. Bấm **Save rules**.

Refresh trang web — mọi thứ **hoạt động trở lại**. Rule inbound đúng là "chìa khóa" của vấn đề.

Điều hay là bạn có thể thêm **bất kỳ inbound rule nào**: nhập port hoặc dải port tùy ý (ví dụ **443 cho HTTPS**), hoặc chọn thẳng từ **dropdown** làm phím tắt (HTTPS sẽ tự điền 443). Phần source cũng rất linh hoạt:

* **Custom CIDR** — chặn theo dải IP, ví dụ "Anywhere".
* **Security groups** hoặc **prefix list** — sẽ học ở các bài sau.
* **My IP** — chỉ cho phép đúng IP của bạn. *Nhưng coi chừng: nếu IP của bạn thay đổi, bạn sẽ bị timeout và mất kết nối vào instance.*

---

### 🔁 Outbound rules và quan hệ nhiều-nhiều

Chuyển sang tab **outbound rules**: các bạn thấy rule cho phép **mọi traffic IPv4 đi tới mọi nơi** — nhờ đó EC2 instance có **kết nối internet đầy đủ**.

Hai điều cuối cần ghi nhớ:

* Một instance có thể gắn **nhiều security group** (1, 2, 3... thậm chí 5) và **các rule cộng dồn vào nhau**.
* Một security group — như **launch-wizard-1** — có thể được gắn cho **nhiều instance khác nhau**.

Nói cách khác, quan hệ giữa instance và security group là **nhiều-nhiều**, đúng như lý thuyết đã học.

---

Vậy là các bạn đã tận mắt chứng kiến sức mạnh của security group: xóa một rule là website "tắt ngóm", thêm lại là chạy ngay. *Khi gặp timeout trong bài thi hay công việc thực tế, hãy nhớ ngay đến bài thực hành này.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **SSH** — cách kết nối vào server từ xa, và chọn phương pháp phù hợp với hệ điều hành của bạn. Hẹn gặp các bạn! 🚀
