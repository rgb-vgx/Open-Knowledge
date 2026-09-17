# 🧠 Mổ xẻ câu hỏi mẫu: Tư duy làm bài thi Cloud Practitioner

> Nguồn: `270-Exam-Sample-Question-Walkthrough.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056508)

Trong bài này, mình sẽ cùng các bạn đi qua một vài **câu hỏi thi mẫu** để hiểu đề được xây dựng thế nào, cách trả lời và cách tư duy. Một lưu ý nhỏ trước tiên: nếu bạn tự làm thử, **thứ tự câu hỏi của bạn có thể khác của mình** — *đừng hoảng, cứ bình tĩnh làm bài của mình*.

Mình khuyên các bạn **tự làm hết các câu hỏi trước**, rồi hãy xem mình phân tích để hiểu cách mình suy nghĩ.

---

### 🧭 Đa số câu hỏi trông như thế nào?

Phần lớn câu hỏi có dạng **"pick-a-service" ở mức tổng quan**: đưa ra một định nghĩa hoặc tình huống, rồi yêu cầu chọn dịch vụ phù hợp. Nghe có vẻ đáng sợ, nhưng thực ra khá trực diện.

---

### 🔐 Câu 1 — Bảo vệ dữ liệu nhạy cảm trong S3

Đề: một người dùng cần **tự động phát hiện, phân loại và bảo vệ dữ liệu nhạy cảm lưu trong Amazon S3**. Các lựa chọn: **Inspector**, **Macie**, **GuardDuty**, **Secrets Manager**.

* **Inspector** — chủ yếu để kiểm tra các **EC2 instance**.
* **Macie** — chính là dịch vụ làm đúng việc này: bảo vệ dữ liệu nhạy cảm trong **Amazon S3**.
* **GuardDuty** — bảo vệ tài khoản của bạn một cách tự động.
* **Secrets Manager** — quản lý secrets.

**Đáp án: Macie.** Đúng như ví dụ này, các câu hỏi thường chỉ là "định nghĩa + chọn dịch vụ".

---

### 🖥️ Câu 2 & 3 — EC2 và phân phối nội dung

**Câu 2:** dịch vụ nào cho phép mua **EC2 capacity (năng lực EC2) chưa dùng với mức giá thường được giảm**? Lựa chọn: **Reserved Instances**, **On-Demand**, **Dedicated**, **Spot Instances**.

* **Reserved** — khi bạn biết chắc mình cần instance trong **1 hoặc 3 năm**.
* **On-Demand** — chế độ mặc định để khởi chạy instance, có thể **terminate bất cứ lúc nào**.
* **Dedicated** — khi bạn muốn **phần cứng dành riêng**.
* **Spot** — đúng chính xác việc mua **EC2 capacity chưa dùng**. → **Đáp án: Spot Instances.**

**Câu 3:** một công ty host **static website (website tĩnh) từ một S3 bucket**, dịch vụ nào đạt **độ trễ thấp hơn và tốc độ truyền cao**? Lựa chọn: **Beanstalk**, **DynamoDB Accelerator (DAX)**, **Route 53**, **CloudFront**.

* **Beanstalk** — khởi chạy ứng dụng **Java hoặc Node.js** trong một dịch vụ duy nhất.
* **DAX** — tăng tốc **chính DynamoDB**.
* **Route 53** — mạng và **DNS**.
* **CloudFront** — dùng cùng S3, **cache dữ liệu của S3 trực tiếp trong CloudFront**, giúp đạt độ trễ thấp và tốc độ truyền cao. → **Đáp án: CloudFront.**

---

### 🧑💻 Câu 4 & 5 — Developer và High Availability

**Câu 4:** công ty chuyển hoạt động phát triển lên AWS, cần **lưu trữ và quản lý mã nguồn của lập trình viên**. Lựa chọn: **CodeArtifact**, **CodeBuild**, **CodePipeline**, **CodeCommit**. Đáp án là **CodeCommit** — nơi bạn commit code, lưu và quản lý source code.

*Mẹo nhỏ: bạn chỉ cần biết đáp án đúng là gì, không nhất thiết phải hiểu hết các đáp án còn lại.*

**Câu 5:** lợi ích của việc triển khai ứng dụng **EC2 trên nhiều Availability Zone (AZ — vùng sẵn sàng)** là gì? Đề yêu cầu **chọn 2 đáp án**, và đáp án đúng là:

1. **Ngăn chặn single point of failure (điểm hỏng đơn lẻ).**
2. **Tăng availability (độ sẵn sàng) của ứng dụng** — đây chính là "high availability".

Còn đây là lý do các đáp án kia sai:

* Không phải để **giảm chi phí** — vì bạn phải dùng nhiều AZ hơn.
* Không phải để phục vụ người dùng **cross-region với độ trễ thấp** — vì các AZ nằm trong **cùng một region**.
* Không phải để **tăng tải** — thực tế là **chia tải** giữa nhiều zone.

---

### ⚠️ Câu 6 — Câu hỏi "gài": migrate server hay migrate database?

Đề: công ty có **server Linux on-premises chạy Oracle database**, muốn migrate **database server** sang chạy trên **EC2 instance** trong AWS. Lựa chọn: **AWS Database Migration Service**, **Migration Hub**, **AWS Application Migration Service**, **AWS Application Discovery Service**.

* **Migration Hub** — giám sát tổng thể các cuộc migration.
* **Application Discovery Service** — phát hiện các ứng dụng cần migrate.
* Có **2 đáp án trông hợp lý**: Database Migration Service (DMS) và Application Migration Service (MGN).

Đáp án đúng là **Application Migration Service (MGN)** — và đây là một câu hỏi "gài" đáng chú ý. Bạn muốn migrate một database, đúng — nhưng **đích đến là EC2 instance**, không phải một dịch vụ database. Điều quan trọng là bạn đang **migrate cả server Linux lên EC2**; việc server đó chạy Oracle không làm đổi bản chất.

**DMS dùng để migrate database sang một dịch vụ database** (ví dụ đích là Amazon RDS), còn ở đây đích là EC2 → đây là migration của server → chọn **Application Migration Service**.

---

Vậy là các bạn đã thấy đề thi không hề "đánh đố" quá đáng — chủ yếu là hiểu dịch vụ nào dùng cho việc gì. *Cứ luyện nhiều, mắt bạn sẽ tự nhận ra đáp án nhanh hơn.*

Ở bài tiếp theo, mình sẽ chia sẻ những **mẹo thi** quan trọng nhất trước khi các bạn bước vào phòng thi. Hẹn gặp các bạn ở đó! 🚀
