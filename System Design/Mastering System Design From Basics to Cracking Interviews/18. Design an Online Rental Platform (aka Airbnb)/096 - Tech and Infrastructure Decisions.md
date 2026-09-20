# ⚙️ Quyết định công nghệ & hạ tầng cho nền tảng cho thuê nhà

> Nguồn: `096-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49841687)

Chúng ta đã tới **bước 4 — đưa ra các quyết định chiến lược về công nghệ và hạ tầng**. Điểm hay là tới đây, mọi lựa chọn đều trở thành **kết quả tự nhiên** của những gì đã học về yêu cầu, quy mô và điểm nghẽn — chứ không phải chuyện "chọn công nghệ nào cho oai".

---

### 📈 Mở rộng & high availability

Vì thiết kế cho hàng triệu người dùng, ứng dụng phải **scale theo chiều ngang (horizontal scaling)** — thêm instance khi nhu cầu tăng. Một nền tảng cloud như **Azure** cho phép tài nguyên compute tự tăng/giảm theo lưu lượng.

High availability cũng quan trọng không kém: người dùng kỳ vọng nền tảng luôn truy cập được, đặc biệt vào các mùa du lịch cao điểm. Ta dùng:

* **Load balancer (bộ cân bằng tải)** để phân phối traffic.
* **Nhân bản database (replication) qua nhiều region** để loại bỏ single point of failure (điểm lỗi đơn) và tăng khả năng chống chịu sự cố.

---

### 💾 Lưu trữ theo loại dữ liệu & xử lý bất đồng bộ

Với lưu trữ, ta chọn công nghệ **dựa trên loại dữ liệu**:

* Dữ liệu nghiệp vụ giao dịch thuộc về **relational SQL database**.
* Ảnh và video phù hợp hơn với **Azure Blob Storage** — object storage có khả năng mở rộng và độ bền cao, với chi phí thấp hơn hẳn so với việc lưu file lớn trong database.

Để hệ thống luôn phản hồi nhanh, các tác vụ nền chạy lâu cần được **xử lý bất đồng bộ**. Những công nghệ như **RabbitMQ hoặc Kafka** cho phép các service giao tiếp qua sự kiện, nhờ đó những workflow như xử lý thanh toán hay gửi thông báo diễn ra mà không chặn request của người dùng.

Hiệu năng còn được cải thiện thêm nhờ **caching**: **Redis** lưu dữ liệu được truy cập thường xuyên, giảm các truy vấn database lặp lại và giúp những request phổ biến được phục vụ nhanh hơn rất nhiều.

---

### 🧩 Microservices & observability

Kiến trúc tổng thể đi theo hướng **microservices**. Bằng cách tách các năng lực như booking, payment, availability và search thành những service độc lập, ta có thể scale, deploy và bảo trì từng phần theo đúng workload của nó — thay vì đối xử với cả ứng dụng như một khối duy nhất.

Và không hệ thống production nào hoàn chỉnh nếu thiếu **observability (khả năng quan sát)**:

* **Monitoring** giúp hiểu sức khỏe của nền tảng.
* **Centralized logging (logging tập trung)** giúp kỹ sư điều tra lỗi và chẩn đoán sự cố nhanh chóng.

Cùng nhau, chúng mang lại tầm nhìn vận hành cần thiết để điều hành một hệ thống lớn một cách đáng tin cậy.

---

Bài học quan trọng nhất của bài này: **quyết định công nghệ không bao giờ được đến trước**. Chúng luôn phải xuất phát từ yêu cầu, quy mô và các thách thức kiến trúc đã nhận diện xuyên suốt quá trình thiết kế. Khi lý luận đã vững, việc chọn công nghệ trở thành một quyết định đơn giản hơn nhiều.

Ở bài tiếp theo, mình và các bạn sẽ ghép tất cả lại thành **kiến trúc cuối cùng** của nền tảng cho thuê nhà và đi theo một hành trình booking trọn vẹn từ đầu đến cuối. Hẹn gặp lại các bạn! 🚀
