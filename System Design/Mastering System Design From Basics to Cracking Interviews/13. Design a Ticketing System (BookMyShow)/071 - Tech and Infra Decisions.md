# ⚙️ Chọn công nghệ & hạ tầng — mỗi lựa chọn phải trả lời một bài toán

> Nguồn: `071-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49756447)

Chúng ta đang ở **bước 4**: đưa ra các **quyết định công nghệ và hạ tầng**. Kiến trúc đã hoàn tất, và đây là bước cuối cùng — chọn những công cụ hỗ trợ tốt nhất cho các yêu cầu đã xác định. *Hãy nhớ: hiếm khi có một lựa chọn công nghệ đúng duy nhất. Điều quan trọng là chọn công cụ **khớp với bài toán** mình đang giải.*

---

### 🎯 Nguyên tắc chọn công nghệ theo bài toán

Đây là tinh thần xuyên suốt bước 4: **mỗi lựa chọn công nghệ phải xuất phát từ một yêu cầu kiến trúc cụ thể**, không phải từ độ phổ biến của công nghệ đó. Khi bước vào hệ thống, chúng ta đi từ điểm vào, qua tầng xác thực, tầng dữ liệu, xử lý bất đồng bộ, cho tới hạ tầng và khả năng quan sát — mỗi chặng là một quyết định có lý do rõ ràng.

---

### 🚪 Điểm vào hệ thống và xác thực

Với **API gateway**, chúng ta có hai hướng tùy bối cảnh:

* **Nginx** — nếu muốn giải pháp **tự quản (self-managed)** với mức kiểm soát cao hơn.
* **AWS API Gateway** — nếu đang xây dựng trên nền tảng **serverless** và muốn dùng dịch vụ được quản lý sẵn.

Cả hai đều cung cấp những năng lực cần thiết: **request routing, authentication và rate limiting**.

Với **xác thực**, chúng ta dùng **OAuth2 kết hợp JWT token**. Đây là cơ chế xác thực **an toàn và stateless (phi trạng thái)**: các back-end service có thể **xác minh danh tính người dùng mà không cần duy trì session state** — cực kỳ phù hợp với hệ phân tán, nơi request có thể được xử lý bởi bất kỳ instance nào.

---

### 💾 Tầng dữ liệu: Postgres, MongoDB/Elasticsearch và Redis

Mỗi loại dữ liệu có đặc tính riêng, nên công nghệ lưu trữ cũng khác nhau:

* **Booking database dùng Postgres** — vì các thao tác đặt vé đòi hỏi **đảm bảo giao dịch mạnh (strong transactional guarantees)**. Khi xử lý thanh toán và xác nhận reservation, **tính nhất quán quan trọng hơn hẳn throughput ghi thô**.
* **Sự kiện và thông tin venue dùng MongoDB hoặc Elasticsearch** — dữ liệu sự kiện có **cấu trúc linh hoạt**, và người dùng **tìm kiếm, lọc sự kiện thường xuyên**, khiến những công nghệ này rất phù hợp với workload đó.
* **Redis làm caching layer** — lưu những thông tin được truy cập thường xuyên như **tình trạng ghế**, đồng thời hỗ trợ **giữ ghế tạm thời thông qua cơ chế hết hạn theo thời gian (time-based expiration)**, giúp xử lý lượng đọc lớn hiệu quả hơn nhiều.

---

### 🔄 Bất đồng bộ, dịch vụ ngoài, hạ tầng và observability

Phần còn lại của hệ thống được ghép nối bởi các quyết định về xử lý nền, tích hợp bên ngoài và vận hành:

* **Kafka cho xử lý bất đồng bộ** — thay vì bắt người dùng chờ các tác vụ nền hoàn tất, service **publish event** và chúng được xử lý độc lập. Cách này hữu ích cho **notification, logging và các workload bất đồng bộ khác**.
* **Payment Service tích hợp Stripe hoặc Razorpay** — vì đây là **phụ thuộc bên ngoài**, chúng ta dựa vào **retry và hỗ trợ webhook** để luồng booking vẫn đáng tin ngay cả khi phản hồi thanh toán bị trễ.
* **Giao tiếp với khách hàng** — dùng các dịch vụ chuyên biệt: dịch vụ email chuyên dụng của AWS cho email và **Twilio cho SMS**. Thay vì tự xây hạ tầng thông báo, chúng ta tận dụng dịch vụ đã được tối ưu cho **tỷ lệ gửi thành công cao và khả năng mở rộng**.
* **Hạ tầng chạy trên Kubernetes** — với **auto-scaling**, nền tảng tự động **thêm hoặc bớt năng lực theo traffic**, điều đặc biệt quan trọng với các đợt **flash sale khó lường**.
* **Observability** — không hệ thống production nào hoàn chỉnh nếu thiếu khả năng quan sát: **Prometheus và Grafana** cung cấp metrics và dashboard để theo dõi sức khỏe, hiệu năng theo thời gian thực; còn **ELK stack** tập trung log, giúp **chẩn đoán sự cố và xử lý incident production** dễ dàng hơn nhiều.

| Thành phần | Lựa chọn | Vì sao |
|---|---|---|
| API gateway | Nginx hoặc AWS API Gateway | Routing, authentication, rate limiting |
| Xác thực | OAuth2 + JWT | Stateless, không cần session state |
| Booking database | Postgres | Đảm bảo giao dịch, nhất quán |
| Sự kiện, venue | MongoDB hoặc Elasticsearch | Linh hoạt, tìm kiếm và lọc tốt |
| Cache | Redis | Tình trạng ghế, giữ ghế theo TTL |
| Xử lý bất đồng bộ | Kafka | Publish event, xử lý độc lập |
| Thanh toán | Stripe hoặc Razorpay | Retry và webhook |
| Thông báo | Dịch vụ email chuyên dụng của AWS và Twilio | Tỷ lệ gửi cao, dễ mở rộng |
| Hạ tầng | Kubernetes | Auto-scaling theo traffic |
| Observability | Prometheus, Grafana, ELK | Metrics, dashboard, log tập trung |

Bài học chốt của bước 4: **mọi lựa chọn công nghệ đều được dẫn dắt bởi một yêu cầu kiến trúc cụ thể** — Postgres mang lại **nhất quán giao dịch**, Redis mang lại **hiệu năng**, Kafka mở ra **xử lý bất đồng bộ**, Kubernetes đem đến **khả năng mở rộng**, còn bộ công cụ monitoring cải thiện **khả năng quan sát vận hành**. Trong kiến trúc production, chúng ta **không chọn công nghệ vì chúng phổ biến** — chúng ta chọn vì chúng **giải quyết những bài toán cụ thể** của hệ thống.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao booking database chọn Postgres?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì booking cần đảm bảo giao dịch mạnh — khi xử lý thanh toán và xác nhận reservation, nhất quán quan trọng hơn throughput ghi thô.

Giải thích: Đây là ví dụ cho nguyên tắc chọn công nghệ theo yêu cầu kiến trúc.

Tham chiếu: Mục Tầng dữ liệu.

</details>

**Câu 2:** OAuth2 kết hợp JWT mang lại lợi thế gì cho hệ phân tán?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xác thực an toàn và stateless — back-end service xác minh danh tính người dùng mà không cần duy trì session state.

Giải thích: Request có thể được xử lý bởi bất kỳ instance nào, rất phù hợp hệ phân tán.

Tham chiếu: Mục Điểm vào hệ thống và xác thực.

</details>

**Câu 3:** Redis đảm nhận những vai trò gì trong hệ thống?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cache thông tin truy cập thường xuyên như tình trạng ghế, và hỗ trợ giữ ghế tạm thời bằng cơ chế hết hạn theo thời gian.

Giải thích: Nhờ đó hệ thống xử lý lượng đọc lớn hiệu quả hơn.

Tham chiếu: Mục Tầng dữ liệu.

</details>

**Câu 4:** Kafka được dùng để làm gì trong kiến trúc này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xử lý bất đồng bộ: service publish event để các tác vụ như notification, logging được xử lý độc lập thay vì bắt người dùng chờ.

Giải thích: Nhờ vậy luồng booking vẫn nhanh và phản hồi tốt.

Tham chiếu: Mục Bất đồng bộ, dịch vụ ngoài, hạ tầng và observability.

</details>

**Câu 5:** Vì sao Kubernetes auto-scaling đặc biệt quan trọng với ticketing system?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nó tự động thêm hoặc bớt năng lực theo traffic, cần thiết cho các đợt flash sale có lưu lượng khó lường.

Giải thích: Đây là lựa chọn hạ tầng trả lời trực tiếp yêu cầu scalability.

Tham chiếu: Mục Bất đồng bộ, dịch vụ ngoài, hạ tầng và observability.

</details>

---

Vậy là các bạn đã đi qua toàn bộ **bước 4**: từ API gateway và xác thực, tầng dữ liệu, xử lý bất đồng bộ, tích hợp thanh toán và thông báo, cho tới hạ tầng và observability. Điều đáng mang theo không phải là danh sách công nghệ, mà là **cách tư duy**: mỗi công cụ ở đây tồn tại để phục vụ một yêu cầu cụ thể mà chúng ta đã nhận diện từ đầu case study.

Ở bài cuối cùng của case study, chúng ta sẽ ghép tất cả lại thành **kiến trúc hoàn chỉnh** và xem hệ thống vận hành end-to-end như thế nào. Hẹn gặp lại các bạn! 🚀
