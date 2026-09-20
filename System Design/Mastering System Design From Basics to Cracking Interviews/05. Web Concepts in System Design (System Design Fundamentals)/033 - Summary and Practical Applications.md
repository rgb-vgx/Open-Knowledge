# 🧭 Tổng kết Web Concepts — Từ nền tảng đến ứng dụng thực tế

> Nguồn: `033-Summary-Practical-Applications.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49522141)

Vậy là chúng ta đã đi trọn section **Web Concepts in System Design**. Đây là lúc mình và các bạn cùng lùi lại một bước, nhìn lại toàn bộ nền tảng đã xây — và quan trọng hơn, xem những khái niệm này kết nối với nhau trong một hệ thống thực tế như thế nào.

---

### 🗺️ Nhìn lại chặng đường đã qua

Chúng ta bắt đầu với cách ứng dụng web giao tiếp qua **client-server model (mô hình máy khách – máy chủ)** và **request-response cycle (chu trình yêu cầu – phản hồi)**, cùng lý do vì sao các chủ đề như statelessness, performance, scalability và security ngày càng quan trọng khi hệ thống lớn lên.

Từ đó, chúng ta đi qua ba trụ cột chính:

1. **Quản lý trạng thái trong một giao thức stateless** — cookies, **server-side sessions**, **JWT (JSON Web Token)** và **token-based authentication**, kèm các cân nhắc bảo mật và thách thức mở rộng trong môi trường production.
2. **Serialization** — cơ chế để các hệ thống trao đổi và lưu trữ dữ liệu hiệu quả. Thay vì chỉ liệt kê format, chúng ta bàn về trade-off giữa **readability (khả năng đọc)**, **performance (hiệu năng)** và **compatibility (tương thích)** — và vì sao lựa chọn đúng lại quan trọng với API, database, caching layer và giao tiếp phân tán.
3. **Web security** — qua lăng kính **same-origin policy** và **CORS**: cách giao tiếp cross-origin được kiểm soát, rủi ro từ cấu hình kém, và vai trò của **reverse proxy (proxy ngược)** cùng **API gateway (cổng API)** ở quy mô lớn.

---

### 🧩 Bức tranh lớn

Ghép tất cả lại, đây là **nền móng của một hệ thống web an toàn, đáng tin cậy và có khả năng mở rộng**. Với kiến trúc sư, hiểu những nguyên lý nền tảng này giúp chúng ta ra quyết định thiết kế tốt hơn **từ rất lâu trước khi** bước vào câu chuyện hạ tầng hay kiến trúc phân tán.

Cụ thể, các bạn đã có trong tay:

* Cách hệ thống giao tiếp và lý do **statelessness** vừa là ưu điểm vừa là thách thức.
* Hai mô hình xác thực với trade-off rõ ràng: **kiểm soát phiên** đổi lấy **scalability**.
* Bộ ba trade-off của serialization: **readability — performance — compatibility**.
* Ranh giới bảo mật của trình duyệt và cách **CORS** mở quyền có kiểm soát.

*Đây chính là kiểu hiểu biết mà người phỏng vấn muốn thấy — không phải nhớ định nghĩa, mà là nhìn ra ảnh hưởng kiến trúc của từng khái niệm.*

---

### ➡️ Tiếp theo: Scalability

Ở section tới, chúng ta chuyển sang **scalability (khả năng mở rộng)** — bộ môn thiết kế hệ thống sao cho vẫn hiệu quả khi người dùng, lưu lượng và dữ liệu tiếp tục tăng. Các chủ đề sẽ gồm **scaling strategies (chiến lược mở rộng)**, **load balancing (cân bằng tải)**, **auto-scaling**, cách tiếp cận cloud-native và những trade-off mà kỹ sư phải cân nhắc.

---

Vậy là các bạn đã nắm trọn nền tảng web concepts — bạn đã hiểu cách hệ thống giao tiếp, quản lý trạng thái, trao đổi dữ liệu và thực thi bảo mật. Hãy giữ tinh thần đó: hiểu nguyên lý trước, tối ưu sau. Hẹn gặp lại các bạn ở section Scalability! 🚀
