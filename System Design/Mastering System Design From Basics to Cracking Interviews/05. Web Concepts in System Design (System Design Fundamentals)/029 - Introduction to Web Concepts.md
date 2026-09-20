# 🌐 Web Concepts — Nền tảng nằm sau mọi ứng dụng hiện đại

> Nguồn: `029-Introduction-to-Web-Concepts.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49522129)

Chào mừng các bạn đến với section mới **Web Concepts in System Design**. Ở đây, chúng ta sẽ mổ xẻ những khái niệm web đang âm thầm vận hành mọi ứng dụng hiện đại, rồi xem chúng ảnh hưởng thế nào đến **scalability (khả năng mở rộng)**, **security (bảo mật)**, **performance (hiệu năng)** và các quyết định kiến trúc trong system design thực tế.

---

### 🎯 Vì sao phải học web concepts?

Gần như mọi ứng dụng quy mô lớn ngày nay — dù là **e-commerce (thương mại điện tử)**, **social network (mạng xã hội)**, **SaaS (phần mềm dạng dịch vụ)** hay **cloud service (dịch vụ đám mây)** — đều được xây dựng trên nền tảng các công nghệ web.

* Là kiến trúc sư và kỹ sư, chúng ta **không thể thiết kế hệ thống hiệu quả** nếu không hiểu các thành phần web tương tác với nhau như thế nào.
* Khi hệ thống lớn dần từ hàng trăm lên hàng triệu người dùng, những quyết định về **state management (quản lý trạng thái)**, **communication pattern (mẫu giao tiếp)**, **caching (bộ đệm)**, **authentication (xác thực)** và **data exchange (trao đổi dữ liệu)** bắt đầu có tác động kiến trúc rất lớn.
* Sự khác biệt giữa một hệ thống "scale mượt mà" và một hệ thống "vật lộn dưới tải" thường nằm ở việc hiểu đúng những nguyên lý web nền tảng này.

Đây cũng là nhóm chủ đề **xuất hiện thường xuyên trong phỏng vấn system design**: session management, cookies, caching, **CORS**, authentication và tương tác browser–server. Người phỏng vấn hỏi không phải vì đó là kiến thức vụn vặt, mà vì chúng tiết lộ mức độ hiểu hệ thống thực tế của các bạn.

---

### 🗺️ Lộ trình của section

1. **Web sessions & state management** — vì HTTP vốn **stateless (không lưu trạng thái)**, mọi ứng dụng web đều cần chiến lược để "nhớ" người dùng qua các request. Chúng ta sẽ xem cookies, **server-side sessions** và **token-based authentication** giải bài toán này ra sao, cùng ảnh hưởng của chúng tới scalability, security và thiết kế hệ phân tán.
2. **Serialization (tuần tự hóa dữ liệu)** — nền tảng giao tiếp và trao đổi dữ liệu giữa các service. Các format phổ biến như **JSON**, **XML**, **protocol buffers** và **Avro** sẽ được soi qua trade-off giữa khả năng đọc được, hiệu năng, kích thước payload và tính đa nền tảng.
3. **CORS & browser security model** — vì sao trình duyệt hạn chế request cross-origin, **same-origin policy** hoạt động thế nào, và CORS mở truy cập có kiểm soát ra sao để thiết kế web app, API an toàn giữa nhiều domain.
4. **Tổng kết section** — nối tất cả khái niệm vào kiến trúc thực tế, các quyết định kỹ thuật và những tình huống phỏng vấn thường gặp.

---

### 🎓 Mục tiêu: học để suy nghĩ như kiến trúc sư

Mục tiêu của section này không chỉ là hiểu "web hoạt động thế nào", mà là **suy nghĩ như một kiến trúc sư** — người biết tận dụng các khái niệm web để thiết kế hệ thống tốt hơn.

*Đừng lo nếu các bạn chưa từng đi sâu vào những chủ đề này — cứ đi từng bước, đây không phải cuộc đua.*

Kết thúc section, các bạn sẽ không chỉ nắm vững nền tảng web, mà còn hiểu chúng định hình thiết kế của một hệ thống **có thể mở rộng, an toàn và sẵn sàng cho production** như thế nào.

---

Vậy là chúng ta đã có tấm bản đồ cho section Web Concepts. Bài tiếp theo sẽ bắt đầu với **web sessions và quản lý trạng thái** — câu chuyện thú vị về cách ứng dụng "nhớ" người dùng. Hẹn gặp lại các bạn! 🚀
