# ⚙️ Chọn công nghệ cho News Feed: Yêu cầu kiến trúc dẫn đường, không phải tên sản phẩm

> Nguồn: `076-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49775853)

Kiến trúc đã có, giờ là lúc chọn **công nghệ và hạ tầng** để hiện thực hóa nó. Nhưng trước khi đi vào từng sản phẩm cụ thể, mình muốn nhấn mạnh một điều: **không có một technology stack đúng duy nhất**. Những lựa chọn trong bài là các đại diện phù hợp với yêu cầu hệ thống — và nhiều phương án khác cũng có thể hiệu quả tương đương. Điều quan trọng là tư duy đằng sau chúng.

---

### 💡 Nguyên tắc dẫn đường trước khi chọn công nghệ

Thay vì tập trung vào tên sản phẩm, hãy bắt đầu từ các nguyên tắc. Chúng ta biết đây là hệ thống:

* **Read-heavy** — phải giao nội dung với độ trễ thấp.
* Hỗ trợ **tương tác thời gian thực**.
* Cần mở rộng đến số lượng người dùng khổng lồ.

Mỗi công nghệ được chọn phải giúp đạt một hoặc nhiều mục tiêu trên, đồng thời giữ hệ thống ở mức **vận hành được (operationally manageable)**. Nói cách khác: công nghệ phục vụ yêu cầu kiến trúc, không phải ngược lại.

---

### 🗄️ Lưu trữ dữ liệu: NoSQL, relational và object storage

Mỗi loại dữ liệu có một kiểu khối lượng công việc khác nhau, nên cần những lựa chọn lưu trữ khác nhau:

| Loại dữ liệu | Lựa chọn tiêu biểu | Vì sao phù hợp |
|---|---|---|
| Dữ liệu lõi: users, tweets, timelines | Distributed NoSQL như Cassandra hoặc DynamoDB | Mở rộng theo chiều ngang, chịu được khối lượng đọc/ghi lớn |
| Engagement: like, retweet | Relational hoặc key-value nhanh như Postgres hay Redis | Tùy vào access pattern và yêu cầu nhất quán |
| Media: ảnh, video | Object storage như Amazon S3 hoặc Google Cloud Storage | File lớn hơn nhiều so với dữ liệu có cấu trúc |
| Giao media nhanh toàn cầu | CDN như Cloudflare hoặc Akamai | Đưa file đến người dùng nhanh ở mọi nơi |

Cụ thể:

* **Dữ liệu ứng dụng lõi** như users, tweets và timelines: các **distributed NoSQL database** như Cassandra hoặc DynamoDB là ứng viên tốt, vì chúng **mở rộng theo chiều ngang (scale horizontally)** và xử lý được lượng lớn cả lượt đọc lẫn lượt ghi.
* **Dữ liệu tương tác** như like hay retweet: một **relational database** hoặc **key-value store** nhanh như Postgres hay Redis có thể phù hợp, tùy vào **access pattern (mẫu truy cập)** và yêu cầu về tính nhất quán.
* **Media** là kiểu khối lượng hoàn toàn khác: ảnh và video lớn hơn nhiều so với dữ liệu có cấu trúc, nên thường được lưu trong **object storage** như Amazon S3, Google Cloud Storage, và được giao đi bởi một **CDN** như Cloudflare hay Akamai.

---

### 📨 Queue, broker và caching cho công việc bất đồng bộ

Vì phần lớn công việc nặng — fan-out, xử lý media, sự kiện tương tác — được đẩy ra khỏi request path, hạ tầng bất đồng bộ là phần không thể thiếu:

* **Message broker** như **Kafka** hoặc **RabbitMQ** giúp **giảm ghép nối (decouple)** các service và xử lý tác vụ nền như fan-out, sự kiện engagement và media pipeline mà không chặn request của người dùng.
* **Caching (bộ đệm)** đặc biệt quan trọng vì timeline và các tweet phổ biến được đọc liên tục. Các công nghệ như **Redis** hoặc **Memcached** cho phép phục vụ dữ liệu nóng trực tiếp từ bộ nhớ, từ đó **giảm đáng kể độ trễ và tải cho database**.

---

### 🏗️ Hạ tầng, khả năng quan sát và chịu lỗi

Phần hạ tầng và vận hành khép lại bức tranh công nghệ:

* **Container platform** như **Kubernetes** hoặc **ECS** giúp triển khai và **tự động mở rộng (auto-scale)** từng microservice khi nhu cầu thay đổi.
* **API gateway** hoặc **Envoy** cung cấp điểm vào tập trung để định tuyến request, thực thi xác thực và áp dụng giới hạn tốc độ.
* **Observability (khả năng quan sát)** và **resilience (khả năng chịu lỗi)**: không hệ thống production nào hoàn chỉnh nếu thiếu hai điều này. Các công cụ như **Prometheus** và **Grafana** giúp theo dõi sức khỏe hệ thống, trong khi những kỹ thuật như **retry (thử lại)**, **circuit breaker (ngắt mạch)** và **queue** ngăn lỗi cục bộ lan rộng thành lỗi dây chuyền trên toàn nền tảng.

Bài học quan trọng nhất của bước này **không phải là ghi nhớ một danh sách công nghệ**, mà là hiểu rằng **lựa chọn công nghệ phải luôn đi theo yêu cầu kiến trúc**:

* Chúng ta không chọn Redis vì nó phổ biến, mà vì **cache với độ trễ thấp giải quyết một bài toán cụ thể**.
* Chúng ta không đưa Kafka vào vì nó đang thịnh hành, mà vì **messaging bất đồng bộ cải thiện khả năng mở rộng và tách rời các service**.

Đó chính là tư duy mà những kiến trúc sư giàu kinh nghiệm mang theo trong mọi quyết định công nghệ.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao distributed NoSQL như Cassandra hay DynamoDB phù hợp với dữ liệu lõi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chúng mở rộng theo chiều ngang và xử lý được khối lượng đọc/ghi lớn.

Giải thích: Users, tweets và timelines cần lưu trữ chịu tải cao ở quy mô lớn.

Tham chiếu: Mục Lưu trữ dữ liệu.

</details>

**Câu 2:** Media nên được lưu và giao đi bằng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lưu trong object storage như Amazon S3 hoặc Google Cloud Storage; giao qua CDN như Cloudflare hoặc Akamai.

Giải thích: Ảnh và video lớn hơn nhiều so với dữ liệu có cấu trúc.

Tham chiếu: Mục Lưu trữ dữ liệu.

</details>

**Câu 3:** Message broker như Kafka hay RabbitMQ mang lại lợi ích gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giảm ghép nối các service và xử lý tác vụ nền mà không chặn request người dùng.

Giải thích: Fan-out, engagement events và media pipeline đều có thể chạy bất đồng bộ.

Tham chiếu: Mục Queue, broker và caching.

</details>

**Câu 4:** Vì sao caching rất quan trọng với hệ thống này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì timeline và tweet phổ biến được đọc liên tục; cache giúp giảm độ trễ và giảm tải database.

Giải thích: Redis hoặc Memcached phục vụ dữ liệu nóng trực tiếp từ bộ nhớ.

Tham chiếu: Mục Queue, broker và caching.

</details>

**Câu 5:** Circuit breaker và queue giúp gì cho hệ thống?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ngăn lỗi cục bộ lan rộng thành lỗi dây chuyền trên toàn nền tảng.

Giải thích: Đây là các kỹ thuật resilience, đi kèm với retry.

Tham chiếu: Mục Hạ tầng, khả năng quan sát và chịu lỗi.

</details>

---

Vậy là chúng ta đã có bộ công nghệ đại diện: NoSQL và object storage cho dữ liệu, Kafka/RabbitMQ cho bất đồng bộ, Redis/Memcached cho caching, Kubernetes/ECS cho triển khai, cùng Prometheus/Grafana và các kỹ thuật chịu lỗi. Quan trọng hơn danh sách, các bạn đã nắm được nguyên tắc: **bắt đầu từ yêu cầu, rồi mới chọn công nghệ đáp ứng tốt nhất**. Ở bài tiếp theo, chúng ta sẽ ghép mọi mảnh ghép lại thành **kiến trúc cuối cùng** của hệ thống news feed. Hẹn gặp lại các bạn! 🚀
