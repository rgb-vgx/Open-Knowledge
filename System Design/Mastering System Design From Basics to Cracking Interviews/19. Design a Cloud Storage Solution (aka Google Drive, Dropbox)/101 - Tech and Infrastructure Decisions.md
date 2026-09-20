# ⚙️ Quyết định công nghệ & hạ tầng cho dịch vụ lưu trữ đám mây

> Nguồn: `101-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49872217)

Chúng ta đã hoàn thành phần lớn thiết kế kiến trúc. Bước cuối cùng trong **bước 4** là chọn **công nghệ và hạ tầng** hỗ trợ tốt nhất cho các quyết định kiến trúc đó. Điểm cần nhấn mạnh: những lựa chọn này không diễn ra tách rời — chúng được dẫn dắt bởi yêu cầu và ràng buộc đã nhận diện xuyên suốt case study.

---

### 🧱 Microservices & hạ tầng container

Kiến trúc tổng thể đi theo hướng **microservices**, cho phép mỗi năng lực lớn — upload, metadata, synchronization, versioning — tiến hóa và scale độc lập. Chạy các service này trong **container** được quản lý bởi những nền tảng như **Docker và Kubernetes** giúp việc deploy, scale và vận hành hiệu quả hơn rất nhiều.

---

### 💾 Lưu trữ & caching phân tầng

* Với nội dung file thật và dữ liệu, **object storage là lựa chọn tự nhiên**. Những giải pháp như **Amazon S3 hoặc MinIO** được thiết kế để xử lý khối lượng lớn dữ liệu phi cấu trúc, đồng thời cung cấp độ bền và khả năng mở rộng mà nền tảng lưu trữ đám mây yêu cầu.
* Với metadata, ta dùng **kết hợp nhiều database**: thông tin có cấu trúc như bản ghi file, quyền sở hữu, quyền truy cập hợp với **relational database như Postgres**; còn metadata linh hoạt hoặc tăng trưởng nhanh giao cho **NoSQL như MongoDB** — để mỗi workload dùng đúng mô hình lưu trữ phù hợp.
* Để tăng hiệu năng, ta đưa **caching vào nhiều tầng**: metadata truy cập thường xuyên giữ trong **in-memory cache như Redis**, còn nội dung file phân phối qua **CDN** để người dùng tải từ vị trí gần họ hơn — giảm latency và giảm tải backend.

---

### 🌐 API gateway & autoscaling

**API gateway** nằm ở rìa hệ thống, làm điểm vào duy nhất cho request của client. Nó đảm nhận định tuyến request và bảo mật, để các service backend giữ tập trung vào logic nghiệp vụ cốt lõi.

Cuối cùng, hạ tầng phải thích ứng khi nhu cầu thay đổi: **autoscaling** cho phép service lớn lên lúc cao điểm và thu nhỏ khi nhu cầu giảm, giúp duy trì hiệu năng mà vẫn dùng tài nguyên hiệu quả.

Nhìn lại toàn bộ bước 4, các lựa chọn chính có thể tóm gọn như sau:

| Hạng mục | Lựa chọn | Lý do then chốt |
|---|---|---|
| Kiến trúc tổng thể | Microservices | Upload, metadata, sync, versioning tiến hóa và scale độc lập |
| Triển khai | Docker & Kubernetes | Deploy, scale và vận hành hiệu quả hơn |
| Nội dung file | Amazon S3 hoặc MinIO | Object storage cho dữ liệu phi cấu trúc khối lượng lớn, độ bền cao |
| Metadata có cấu trúc | Postgres | Bản ghi file, quyền sở hữu, quyền truy cập |
| Metadata linh hoạt | MongoDB | Không hợp schema cứng, tăng trưởng nhanh |
| Cache metadata | Redis | In-memory, phục vụ truy cập thường xuyên |
| Phân phối file | CDN | Tải từ vị trí gần người dùng, giảm latency và tải backend |
| Điểm vào hệ thống | API gateway | Định tuyến và bảo mật tập trung |
| Co giãn hạ tầng | Autoscaling | Lớn lên lúc cao điểm, thu nhỏ khi nhu cầu giảm |

---

Để ý rằng **không lựa chọn công nghệ nào là tùy tiện**. Mỗi quyết định đều trực tiếp hỗ trợ một yêu cầu đã bàn từ trước — dù là scalability, reliability, performance hay cost efficiency. Và đó chính là tư duy của một thiết kế hệ thống tốt: **kiến trúc dẫn dắt việc chọn công nghệ, chứ không phải ngược lại.**

Ở bài tiếp theo — cũng là bài cuối của case study — mình và các bạn sẽ ghép mọi thứ lại thành **kiến trúc hoàn chỉnh** của dịch vụ lưu trữ đám mây và theo chân một lần upload từ đầu đến cuối. Hẹn gặp lại các bạn! 🚀
