# ⚙️ Chọn công nghệ cho Collaborative Document Editor: Công nghệ phục vụ kiến trúc

> Nguồn: `126-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49990481)

Kiến trúc đã rõ, giờ là bước cuối: **chọn công nghệ và hạ tầng** khớp với các yêu cầu đã xác định. Nhưng trước khi đi vào danh sách, mình muốn nhấn mạnh một nguyên tắc xuyên suốt: **lựa chọn công nghệ phải phục vụ kiến trúc, chứ không được dẫn dắt kiến trúc**.

---

### 💡 Nguyên tắc chọn công nghệ

Ở thời điểm này, chúng ta đã hiểu rất rõ kiến trúc của hệ thống. Việc còn lại là chọn những công nghệ **phù hợp với yêu cầu đã nhận diện** — chứ không phải chọn công nghệ vì nó phổ biến rồi uốn kiến trúc theo nó. Hãy giữ nguyên tắc đó trong đầu khi đọc qua các lựa chọn dưới đây.

---

### 🧱 Application stack và giao tiếp

* **Front-end:** **React** cho web và **React Native** cho mobile — mang lại trải nghiệm soạn thảo phong phú, tương tác tốt trên mọi nền tảng.
* **Back-end:** **Node.js** rất phù hợp để quản lý lượng lớn **kết nối WebSocket**, nên là lựa chọn mạnh cho tầng đồng bộ thời gian thực.
* **Giao tiếp nội bộ:** **gRPC** cung cấp giao tiếp service-to-service nhanh và hiệu quả.
* **API:** dùng hai hướng khác nhau theo mẫu tương tác — **REST** cho quản lý tài liệu (tạo tài liệu, lấy metadata, truy cập lịch sử phiên bản), và **WebSockets** cho cộng tác liên tục, độ trễ thấp trong suốt phiên chỉnh sửa.

---

### 📦 Lưu trữ và hạ tầng

Các loại dữ liệu khác nhau có yêu cầu lưu trữ khác nhau, nên hệ thống dùng nhiều giải pháp thay vì một công cụ cho tất cả:

| Thành phần | Lựa chọn | Lý do |
|---|---|---|
| Nội dung tài liệu và snapshot | AWS S3 hoặc Google Cloud Storage | Phù hợp tự nhiên để lưu object |
| Users, permissions, document metadata | Postgres | Dữ liệu có cấu trúc, ràng buộc rõ ràng |
| Dữ liệu document-oriented | MongoDB | Linh hoạt khi schema cứng nhắc không lý tưởng |
| Sự kiện bất đồng bộ | Kafka | Hỗ trợ phần hướng sự kiện, ghép nối lỏng giữa các service |
| Triển khai microservices | Kubernetes | Mỗi service mở rộng độc lập, đơn giản hóa deploy và vận hành |

**Kafka** đặc biệt quan trọng với phần **event-driven** của hệ thống: các service giao tiếp bất đồng bộ mà không bị ghép nối chặt (tightly coupled).

---

### 🔐 Bảo mật và bài học then chốt

Bảo mật được xây vào **mọi tầng** của hệ thống:

* **OAuth2** và **JWT** cung cấp xác thực và phân quyền an toàn.
* **TLS** bảo vệ dữ liệu khi truyền qua mạng.
* **AES** mã hóa dữ liệu khi lưu trữ (at rest).

Điều quan trọng cần nhớ: **giá trị không nằm ở tên công nghệ cụ thể**. Trong hệ thống production thực tế, các lựa chọn này có thể thay đổi tùy theo chuyên môn của tổ chức hoặc nền tảng cloud đang dùng. Điều quan trọng hơn nhiều là **hiểu vì sao mỗi công nghệ khớp với yêu cầu kiến trúc**. Một kiến trúc sư giỏi luôn bắt đầu từ bài toán, thiết kế kiến trúc, rồi mới chọn công nghệ hỗ trợ tốt nhất cho thiết kế đó.

---

Vậy là chúng ta đã có bộ công nghệ đại diện: React/React Native cho client, Node.js cho tầng WebSocket, gRPC và REST cho giao tiếp, S3/Postgres/MongoDB cho lưu trữ, Kafka cho sự kiện, Kubernetes cho triển khai, cùng OAuth2, JWT, TLS và AES cho bảo mật. Ở bài tiếp theo — cũng là bài cuối của case study — chúng ta sẽ ghép tất cả thành **kiến trúc hoàn chỉnh** và đi qua hành trình của người dùng từ lúc đăng nhập đến từng thao tác chỉnh sửa. Hẹn gặp lại các bạn! 🚀
