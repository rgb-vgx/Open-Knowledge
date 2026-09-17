# 🧷 Socket Sharding: Nhiều Listener Cùng Một Port Và Cú Trick Đẹp Của Linux Kernel

Thử tưởng tượng bạn chạy hai process cùng listen trên `127.0.0.1:8080` — Node.js sẽ từ chối thẳng thừng với lỗi "address in use". Ấy vậy mà các proxy lớn như Nginx, Envoy lại làm điều tương tự như một thói quen. Bí mật nằm ở **socket reuse port** và kỹ thuật có tên **socket sharding (chia cổng theo luồng)**. Đây là pattern mình thích nhất trong cả section — cùng xem vì sao nhé.

### 🚫 Vì sao listen trùng port thường thất bại?

Quy tắc nền tảng của mọi backend:

* Bạn **có thể** listen trên `127.0.0.1:8080` và `192.168.1.105:8080` cùng lúc — khác địa chỉ thì không conflict (xung đột).
* Nhưng **hai process cùng listen trên một địa chỉ và một port** thì bị từ chối — đó là lỗi "address in use" mà chắc hẳn các bạn đã từng thấy.

---

### ✨ SO_REUSEPORT: nhiều process, một port, OS chia hộ

Đây là ngoại lệ đẹp đẽ: tùy chọn **socket reuse / reuse port** cho phép **chia sẻ socket giữa nhiều process**. Cơ chế bên dưới:

1. OS tạo **một accept queue cho mỗi process** — mỗi bên có **socket ID riêng** và bộ queue riêng.
2. Connection tới được OS **phân phối xuống các queue khác nhau**, dựa trên **hash algorithm (thuật toán băm)** — kiểu gần như round robin: queue 1 lấy cái này, queue 2 lấy cái kia.
3. Mỗi process/thread gọi `accept` trên socket của mình **mà không tranh giành với ai** — bạn là người duy nhất nhìn thấy socket đó.

Đó chính là **socket sharding (chia cổng theo luồng)**: bạn "shard" socket ra nhiều process, tất cả cùng listen trên một address, một port — miễn là bật option đó. Kết quả: **không ai giẫm chân ai**, OS lo phần phân phối. *Trong Nginx, Envoy và hầu hết proxy hiện đại, đây gần như là mặc định — chẳng có lý do gì để không bật nó.*

Lưu ý: trong các ngôn ngữ bậc cao như JavaScript/Node, bạn **có thể không tìm thấy option này**; nhưng với C/C++, bạn hoàn toàn có thể tự làm chủ và bật nó.

---

### 🛡️ Bảo mật: chống kẻ xấu hijack port

Một câu hỏi tinh tế: nếu ai cũng bật reuse port được, vậy **một process độc hại hay một container xấu** cứ listen cùng port rồi hút hết connection của bạn thì sao?

* Linux kernel biết chuyện này và có cơ chế chống **port hijacking (chiếm đoạt cổng)**.
* Khi listen với option này, bạn phải chỉ định **một special key (khóa đặc biệt)** — chỉ những process biết key mới được chia sẻ port đó.
* Process lạ không có key sẽ không được kernel phân phối gì cả — "đồ xấu thì đừng hòng".

Kernel thực sự là một thế giới của riêng nó, và đây là ví dụ đẹp cho việc nó âm thầm bảo vệ bạn.

---

### ⚖️ Nhưng khoan — bài toán load balancing vẫn quay lại!

Đừng tưởng socket sharding giải quyết hết. Vấn đề "công bằng" vẫn còn nguyên:

* Trong cùng một process, một thread có thể gánh **connection HTTP/1.1 nhẹ tênh**, trong khi thread khác gánh **connection HTTP/3/QUIC nặng trịch** — và QUIC còn phức tạp hơn nữa.
* Với QUIC, phía OS chỉ thấy **UDP datagram (gói dữ liệu UDP)** — kernel không hiểu gì về QUIC, nó **chỉ chuyển tiếp lên app**. Mọi logic như SYN, acknowledgement phải làm trong **userspace**.
* Đến thời điểm quay bài, **QUIC vẫn chưa nằm trong kernel** (khác TCP — thứ có sẵn đủ queue trong kernel). Nếu một ngày QUIC xuống kernel, app sẽ "mỏng" hơn — nhưng hiện tại mọi thứ vẫn ở userspace.

Giải pháp quen thuộc: tạo **thêm một tầng worker thread** chuyên đọc và hiểu request, rồi chuyển tiếp request cho các thread khác execute. Kiến trúc sẽ phức tạp hơn hẳn, nhưng hiệu năng thu lại mình tin là xứng đáng.

Đó là pattern cuối cùng hiện tại của section này — và mình sẽ còn bổ sung thêm khi cập nhật khóa học. Còn giờ, hãy chuyển sang một chủ đề mà mọi backend engineer phải "thuộc lòng": **idempotency (tính bất biến khi lặp)** — hẹn gặp ở bài tiếp theo! 🚀
