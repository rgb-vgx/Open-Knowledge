# ⚙️ Nền tảng đấu giá — Bước 4: Chọn công nghệ theo yêu cầu, không theo trào lưu

> Nguồn: `091-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49837035)

Sau khi đã thiết kế kiến trúc về mặt khái niệm, bước hợp lý tiếp theo là **chọn công nghệ có thể hỗ trợ những quyết định kiến trúc đó**. Và đây là điều mình muốn nhấn mạnh ngay: **mục tiêu không phải là tìm ra công nghệ tốt nhất, mà là chọn công nghệ thỏa mãn các yêu cầu chức năng và phi chức năng của chúng ta**.

Cùng đi qua từng lớp công nghệ cho nền tảng đấu giá — và nhớ rằng, như mọi quyết định kiến trúc khác, đây đều là **trade-off**.

---

### 🧩 Application stack — front-end và back-end

| Thành phần | Lựa chọn tiêu biểu | Vì sao phù hợp |
|---|---|---|
| **Front-end** | **React** hoặc **Vue** | Rất phù hợp để xây giao diện người dùng **phản hồi nhanh, có cập nhật real-time** |
| **Back-end** | **Node.js** hoặc **Java với Spring Boot** | Cả hai đều có khả năng xử lý **khối lượng lớn API request** và đáp ứng mức **đồng thời (concurrency)** mà nền tảng đấu giá yêu cầu |

Điểm chung của các lựa chọn này: chúng không được chọn vì "đang thịnh hành", mà vì **khớp với đặc thù của nền tảng** — giao diện phải cập nhật liên tục, backend phải chịu tải request lớn và xử lý cạnh tranh đặt giá.

---

### ⚡ Dữ liệu, hiệu năng và giao tiếp real-time

* Về lưu trữ, **Postgres** là lựa chọn phù hợp cho **dữ liệu giao dịch và dữ liệu quan hệ** của nền tảng.
* **Redis** bổ trợ bằng cách **cache những thông tin được truy cập thường xuyên**, chẳng hạn **chi tiết các phiên đấu giá đang hoạt động** — nhờ đó **giảm tải cho database** và **cải thiện thời gian phản hồi**.
* Để đạt mục tiêu về **độ sẵn sàng và hiệu năng**, chỉ chọn đúng ngôn ngữ lập trình là chưa đủ: **traffic cần được phân tán qua nhiều instance ứng dụng bằng load balancer (bộ cân bằng tải)**, để **không server nào trở thành điểm nghẽn**.
* **Giao tiếp real-time được xử lý bằng WebSocket**, cho phép nền tảng **thông báo tức thì cho người dùng mỗi khi hoạt động đấu giá thay đổi**. Redis cũng đóng vai trò quan trọng ở đây: **phục vụ nhanh những dữ liệu được yêu cầu thường xuyên thay vì liên tục truy vấn database chính**.

---

### 🔐 Bảo mật và tối ưu chi phí

Bảo mật phải được cân nhắc xuyên suốt hệ thống:

* Cơ chế xác thực như **OAuth2** giúp **xác minh người dùng an toàn**.
* **SSL và TLS bảo vệ dữ liệu trên đường truyền** giữa client và các service backend, đảm bảo **thông tin nhạy cảm như thông tin đăng nhập và chi tiết thanh toán luôn được mã hóa khi truyền đi**.

Và cuối cùng, **quyết định hạ tầng cũng ảnh hưởng đến chi phí**: chạy nền tảng trên cloud cho phép hưởng lợi từ **mô hình pay-as-you-go (trả theo mức dùng)**, chỉ trả cho tài nguyên thực sự tiêu thụ. Kết hợp với **auto-scaling**, nền tảng có thể **tự động thêm năng lực trong giai đoạn đấu giá sôi động và giảm tài nguyên khi nhu cầu hạ xuống** — **cân bằng cả hiệu năng lẫn chi phí vận hành**.

---

### 💡 Bài học: lý do quan trọng hơn sản phẩm

Một điều quan trọng cần nhớ: **những công nghệ trên chỉ là ví dụ, không phải yêu cầu bắt buộc**. Các **nguyên tắc kiến trúc vẫn giữ nguyên** dù bạn chọn framework, database hay nhà cung cấp cloud khác.

Trong phỏng vấn system design cũng như trong các buổi thảo luận kiến trúc thực tế, **lý do đằng sau lựa chọn công nghệ quan trọng hơn hẳn sản phẩm cụ thể mà bạn chọn**. Đây cũng là tinh thần xuyên suốt khóa học: **hiếm khi có thiết kế hoàn hảo, mọi quyết định đều là trade-off — và người phỏng vấn muốn nghe cách bạn lý giải trade-off đó**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao React hoặc Vue phù hợp với front-end của nền tảng đấu giá?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chúng phù hợp để xây giao diện phản hồi nhanh với cập nhật real-time.

Giải thích: Trải nghiệm đấu giá đòi hỏi người dùng thấy thay đổi gần như tức thì.

Tham chiếu: Mục Application stack — front-end và back-end.

</details>

**Câu 2:** Back-end cần đáp ứng những yêu cầu gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xử lý khối lượng lớn API request và hỗ trợ mức đồng thời mà nền tảng đấu giá yêu cầu.

Giải thích: Node.js hoặc Java với Spring Boot đều đáp ứng được các yêu cầu này.

Tham chiếu: Mục Application stack — front-end và back-end.

</details>

**Câu 3:** Redis giúp gì cho nền tảng đấu giá?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cache thông tin truy cập thường xuyên như chi tiết phiên đấu giá đang hoạt động để giảm tải database.

Giải thích: Nhờ đó thời gian phản hồi được cải thiện.

Tham chiếu: Mục Dữ liệu, hiệu năng và giao tiếp real-time.

</details>

**Câu 4:** Vì sao cần load balancer dù đã chọn đúng ngôn ngữ lập trình?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để phân tán traffic qua nhiều instance, tránh việc một server trở thành điểm nghẽn.

Giải thích: Đây là điều kiện để đạt mục tiêu về độ sẵn sàng và hiệu năng.

Tham chiếu: Mục Dữ liệu, hiệu năng và giao tiếp real-time.

</details>

**Câu 5:** Vì sao nói "lý do quan trọng hơn sản phẩm" khi chọn công nghệ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì các công nghệ chỉ là ví dụ; nguyên tắc kiến trúc giữ nguyên dù bạn chọn framework hay cloud khác.

Giải thích: Trong phỏng vấn, cách lý giải trade-off được đánh giá cao hơn sản phẩm cụ thể.

Tham chiếu: Mục Bài học — lý do quan trọng hơn sản phẩm.

</details>

---

Vậy là chúng ta đã chọn xong bộ công nghệ cho nền tảng đấu giá: **React hoặc Vue, Node.js hoặc Java Spring Boot, Postgres kết hợp Redis, load balancer, WebSocket, OAuth2, SSL/TLS và mô hình cloud pay-as-you-go với auto-scaling**.

Ở bài cuối của case study, chúng ta sẽ **gom tất cả lại thành kiến trúc hoàn chỉnh** và xem nền tảng đấu giá vận hành end-to-end như thế nào. Hẹn gặp lại các bạn! 🚀
