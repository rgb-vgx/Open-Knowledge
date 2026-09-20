# 🧰 Taxi Hailing App: Chọn tech & hạ tầng một cách chiến lược

> Nguồn: `121-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49971993)

Bước 4 của case study Taxi Hailing — **ra quyết định công nghệ và hạ tầng**. Có một điều cần nhớ trước khi bắt đầu: system design hiếm khi là việc tìm ra công nghệ tốt nhất; nó là việc **chọn đúng công cụ cho bài toán đang giải, cùng những trade-off mà bạn sẵn sàng chấp nhận**. Hãy cùng mình đi qua từng nhóm quyết định.

---

### 📡 Real-time & giao tiếp

| Nhu cầu | Lựa chọn | Ghi chú |
|---|---|---|
| Rider–driver real-time | **WebSockets** hoặc **MQTT** | Kết nối thường trực, độ trễ thấp; MQTT hấp dẫn khi băng thông hạn chế hoặc kết nối kém ổn định |
| Service-to-service | **gRPC** | Hiệu quả, tối ưu cho giao tiếp nội bộ độ trễ thấp |
| API cho client bên ngoài | **REST** | Đơn giản, hệ sinh thái hỗ trợ rộng |

Cụ thể hơn: cho giao tiếp giữa rider và tài xế, cả **WebSockets** lẫn **MQTT** đều cung cấp kết nối thường trực với độ trễ thấp. WebSockets là lựa chọn phổ biến cho hầu hết ứng dụng mobile và web, trong khi MQTT trở nên hấp dẫn khi băng thông mạng hạn chế hoặc kết nối kém tin cậy hơn. Giữa các service backend, **gRPC** thường được ưu tiên vì hiệu quả và tối ưu cho giao tiếp nội bộ độ trễ thấp. Còn **REST** vẫn là lựa chọn xuất sắc để phơi API cho client bên ngoài nhờ sự đơn giản và hệ sinh thái rộng.

---

### 🗄️ Lưu trữ dữ liệu: không có một database cho mọi thứ

Không phải dữ liệu nào cũng có cùng đặc điểm, nên dùng một database duy nhất cho tất cả hiếm khi là giải pháp lý tưởng.

* **Relational database** như **Postgres hoặc MySQL** rất phù hợp cho dữ liệu giao dịch có cấu trúc: tài khoản người dùng, chuyến đi và thanh toán.
* Với **bộ dữ liệu khối lượng lớn hoặc linh hoạt** như RideLog, một **NoSQL database** như **MongoDB hoặc Cassandra** có thể phù hợp hơn.
* Bên cạnh lưu trữ lâu dài, **Redis** và **Kafka** phục vụ những mục đích khác nhau: Redis giảm độ trễ nhờ caching, còn Kafka cho phép **event-driven streaming (truyền sự kiện)** có khả năng mở rộng giữa các service.

---

### 🗺️ Geospatial indexing — bài toán tìm tài xế gần

Để tìm tài xế gần một cách hiệu quả, chúng ta cần **geospatial indexing (chỉ mục không gian địa lý)**:

| Cách tiếp cận | Đặc điểm |
|---|---|
| **Geohashing** | Cách phân vùng vị trí theo địa lý đơn giản, dễ triển khai |
| **H3** | Mô hình indexing nâng cao hơn, độ chính xác được cải thiện cho nhiều truy vấn dựa trên vị trí |

Lựa chọn giữa hai cách phụ thuộc vào **độ chính xác** mà ứng dụng cần và **pattern truy vấn** của nó — không có lựa chọn nào thắng tuyệt đối.

---

### ☸️ Scale, resilience và bài toán nhất quán

* **Horizontal scaling:** dù deploy trên **AWS, Azure hay GCP**, kiến trúc phải hỗ trợ mở rộng ngang để thêm instance khi nhu cầu tăng.
* **Kubernetes:** chạy service trong Kubernetes giúp đơn giản hóa việc triển khai, điều phối (orchestration) và scale microservices. Kết hợp với **auto-scaling** và **load balancing**, nền tảng có thể thích ứng với các đợt traffic tăng vọt mà vẫn giữ hiệu năng ổn định.
* **Multi-region replication (nhân bản đa vùng):** cải thiện tính sẵn sàng và giúp nền tảng phục hồi sau sự cố ở cấp vùng.
* **Consistency:** không phải chỗ nào cũng cần cùng mức đảm bảo nhất quán. **Eventual consistency** thường chấp nhận được với dữ liệu thay đổi liên tục như cập nhật vị trí, trong khi các thao tác như chuyển trạng thái chuyến đi và xử lý thanh toán cần **strong consistency** hơn — vì ở những chỗ đó, tính đúng đắn quan trọng hơn tốc độ tuyệt đối.

Điểm mấu chốt của bước này: **kiến trúc là một chuỗi trade-off**. Mỗi lựa chọn công nghệ đều ảnh hưởng đến hiệu năng, khả năng mở rộng, độ phức tạp vận hành và chi phí. Việc của kiến trúc sư không phải chọn công nghệ phổ biến nhất, mà là chọn công nghệ **thỏa mãn tốt nhất cả yêu cầu chức năng lẫn phi chức năng** của hệ thống.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Khi nào MQTT hấp dẫn hơn WebSockets?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi băng thông mạng hạn chế hoặc kết nối kém tin cậy hơn.

Giải thích: Cả hai đều cho kết nối thường trực độ trễ thấp; WebSockets phổ biến cho mobile/web còn MQTT phù hợp môi trường mạng yếu.

Tham chiếu: Mục Real-time & giao tiếp.

</details>

**Câu 2:** Vì sao dùng relational database cho trip và payment nhưng NoSQL cho ride logs?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì trip và payment là dữ liệu có cấu trúc cần giao dịch; ride logs có khối lượng lớn và linh hoạt hơn.

Giải thích: Không phải dữ liệu nào cũng có cùng đặc điểm, nên không dùng một database cho mọi thứ.

Tham chiếu: Mục Lưu trữ dữ liệu.

</details>

**Câu 3:** Geohashing và H3 khác nhau ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Geohashing là cách phân vùng địa lý đơn giản; H3 là mô hình nâng cao với độ chính xác tốt hơn cho nhiều truy vấn vị trí.

Giải thích: Lựa chọn phụ thuộc độ chính xác và pattern truy vấn ứng dụng cần.

Tham chiếu: Mục Geospatial indexing.

</details>

**Câu 4:** Kubernetes kết hợp với auto-scaling và load balancing mang lại gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giúp triển khai, điều phối và scale microservices; thích ứng traffic tăng vọt với hiệu năng ổn định.

Giải thích: Kubernetes đơn giản hóa vận hành, còn auto-scaling và load balancing xử lý biến động tải.

Tham chiếu: Mục Scale, resilience và bài toán nhất quán.

</details>

**Câu 5:** Vì sao chuyển trạng thái chuyến đi cần strong consistency hơn cập nhật vị trí?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì tính đúng đắn quan trọng hơn tốc độ tuyệt đối ở các thao tác như trạng thái chuyến và thanh toán.

Giải thích: Vị trí thay đổi liên tục nên eventual consistency chấp nhận được; trạng thái chuyến thì không.

Tham chiếu: Mục Scale, resilience và bài toán nhất quán.

</details>

---

Vậy là chúng ta đã chốt bộ công nghệ cho giao tiếp, lưu trữ, chỉ mục địa lý và hạ tầng scale. Ở bài tiếp theo — bài cuối của case study — chúng ta sẽ ghép tất cả thành **bản thiết kế cuối cùng** và xem luồng chuyến đi vận hành end-to-end. Hẹn gặp lại các bạn! 🚀
