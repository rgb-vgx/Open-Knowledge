# 🧭 Backend Communication Design Patterns: Những "first principles" mình đúc kết sau 17–18 năm làm backend

Chào mừng các bạn đến với section đầu tiên của khóa học! Mình rất hào hứng được bắt đầu hành trình này cùng các bạn — và trước khi đi vào từng pattern cụ thể, mình muốn kể các bạn nghe vì sao section này lại đáng để học.

### 🧱 17–18 năm làm backend và những pattern cứ lặp lại

Suốt 17–18 năm xây dựng phần mềm, mình luôn để ý một điều: **backend application gần như luôn phải giao tiếp với client** — đó chính là lý do nó mang tên "back**end**".

Khi xây dựng những ứng dụng đó, mình thấy **các pattern (mẫu hình) cứ xuất hiện lặp đi lặp lại**. Mình đã cố gắng đúc kết chúng thật gọn gàng trong section này từ nhiều nguồn:

* Kinh nghiệm cá nhân của chính mình.
* Những bài viết mình từng đọc.
* Quan sát cách các công ty lớn như **Netflix, Google, Twitter** xây dựng ứng dụng.

Mình không chỉ "sưu tầm" cho vui — đây là những bài học đến từ trải nghiệm và từ cách các hệ thống lớn vận hành ngoài thực tế.

---

### 🧠 Đây không phải một danh sách đóng

Mình phải nói rõ ngay: **đây không phải những pattern duy nhất tồn tại.**

Pattern mới có thể xuất hiện bất cứ lúc nào. Biết đâu chính bạn — người đang xem khóa học này — sẽ là người phát minh ra một pattern chưa từng có trong tương lai.

Nhưng mình luôn tin rằng **mọi thứ đều được xây trên các first principles (nguyên lý gốc)**, và hiểu thật chắc những nguyên lý này là điều cực kỳ giá trị.

---

### 🗺️ Bản đồ những gì chúng ta sẽ đi qua

* **Request/response model** — mô hình kinh điển, thanh lịch và đơn giản bậc nhất.
* **Synchronous vs asynchronous (đồng bộ và bất đồng bộ)** — ở góc độ request, và ở góc độ execution (thực thi) nói chung.
* **Push model, poll model, long poll model** — cùng rất nhiều kỹ thuật khác ở phía backend.
* **Publish/Subscribe (pub/sub)** — mô hình mà các bạn sẽ gặp lại rất nhiều trong thế giới hệ thống phân tán.

---

### 🔌 Vì sao networking lại có mặt trong section backend?

Còn một thứ nữa mình muốn nhắc riêng: **multiplexing và demultiplexing (ghép kênh và tách kênh)** — nghe thuần networking đúng không?

Tin hay không thì mình bắt đầu thấy chúng xuất hiện trong chính các **backend communication protocol**. Với mình, chúng nằm rất khớp ở đây, nên mình đưa luôn vào section này.

*Nếu bạn từng nghĩ networking và backend là hai thế giới tách biệt, section này sẽ khiến bạn nghĩ lại đấy.*

---

### 💡 Kết: hiểu pattern để nhìn ra nguyên lý, không phải để copy

Các pattern trong section này là **bộ khung tư duy** — hiểu rồi, các bạn sẽ nhận ra chúng xuất hiện ở khắp nơi, từ HTTP, DNS cho tới các hệ thống chat hay notification.

Và bài đầu tiên chúng ta chạm tới sẽ là mô hình kinh điển nhất của mọi backend: **request/response**. Hẹn gặp các bạn ở bài tiếp theo! 🚀
