# 🎓 Tổng kết Security in System Design — bảo mật là chuỗi quyết định thiết kế

> Nguồn: `061-Summary-and-Recap-Designing-Secure-Distributed-Systems.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49632579)

Chúng ta đã đi hết section **Security in System Design**. Nếu phải chốt lại một điều duy nhất, thì đó là: **security không phải một tính năng thêm vào cuối dự án, mà là tập hợp các quyết định thiết kế ảnh hưởng đến mọi tầng của hệ phân tán**. Bài recap này sẽ đi nhanh qua những trụ cột chúng ta đã dựng.

---

### 🧩 Từ CIA triad đến các mối đe dọa

Chúng ta bắt đầu với **CIA triad** — ba mục tiêu cốt lõi: **bảo vệ dữ liệu nhạy cảm (confidentiality), giữ nguyên tính toàn vẹn (integrity) và duy trì khả năng phục vụ (availability)** ngay cả khi có lỗi hoặc bị tấn công.

Từ đó, chúng ta khảo sát những mối đe dọa phổ biến: **DDoS, man-in-the-middle, injection và spoofing**. Kiến trúc tốt bắt đầu bằng việc **hiểu mình đang phòng thủ chống lại điều gì** — threat modeling với STRIDE, nhận diện attack surface, entry point và tài sản quan trọng chính là bước đi đầu tiên đó.

---

### 🔐 Identity, access và bảo vệ dữ liệu

Tiếp theo là **identity and access management**: **authentication** xác minh người dùng là ai, **authorization** quyết định họ được làm gì. Các công nghệ như **OAuth2, OpenID Connect, JWT** cùng những mô hình access control như **RBAC, ABAC** và **SSO** giúp thực thi các quyết định này nhất quán trên mọi ứng dụng hiện đại.

Song song, chúng ta học cách **bảo vệ chính dữ liệu**: mã hóa **at rest và in transit**, dùng **TLS, HTTPS**, **hashing kèm salting** cho mật khẩu. Nhờ đó, kể cả khi giao tiếp bị chặn hoặc storage bị xâm nhập, **thông tin nhạy cảm vẫn được bảo vệ**.

---

### 🧱 Hạ tầng và chiến lược defense in depth

Cuối cùng, chúng ta mở rộng ra tầng hạ tầng: **firewall, reverse proxy, rate-limiting, network segmentation, zero-trust** và các cơ chế bảo mật cloud-native như **IAM, API gateway** — tất cả cùng tạo nên **nhiều lớp phòng thủ**.

**Bài học then chốt của cả section: security không bao giờ là một cơ chế duy nhất — nó là chiến lược defense in depth, nơi mỗi lớp củng cố những lớp còn lại.**

---

### 📝 Năm điều đáng nhớ nhất

Trước khi khép lại, mình muốn các bạn mang theo năm điểm cô đọng nhất — tất cả đều đã xuất hiện xuyên suốt section:

1. **Security là yêu cầu phi chức năng nền tảng** — phải được thiết kế từ đầu, không phải vá về sau.
2. **CIA triad là la bàn** — bảo vệ confidentiality, giữ vững integrity và duy trì availability.
3. **Xác thực rồi mới ủy quyền** — authentication trả lời "bạn là ai", authorization trả lời "bạn được làm gì".
4. **Mã hóa cả at rest lẫn in transit; mật khẩu thì hash kèm salt** — không bao giờ lưu plaintext.
5. **Defense in depth** — nhiều lớp phòng thủ từ mạng đến ứng dụng, theo tinh thần *"never trust, always verify"*.

---

Vậy là chúng ta đã có đủ nền tảng để thiết kế hệ thống **an toàn theo thiết kế**. Ở section tiếp theo, mình sẽ cùng các bạn gom mọi kiến thức đã học vào **system design blueprint** — framework từng bước để tiếp cận mọi bài toán kiến trúc thực tế và tự tin xử lý phỏng vấn system design. Hẹn gặp lại các bạn! 🚀
