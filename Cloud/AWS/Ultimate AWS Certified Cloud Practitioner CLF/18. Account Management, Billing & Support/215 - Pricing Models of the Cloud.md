# 💸 Bốn mô hình định giá của AWS: Trả tiền thông minh cho đúng nhu cầu

> Nguồn: `215-Pricing-Models-of-the-Cloud.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056378)

Tiền nong luôn là chủ đề được hỏi nhiều trong đề thi, và bài này sẽ trang bị cho các bạn bức tranh tổng thể về **cách AWS tính phí**. *Đừng lo nếu có nhiều con số — các bạn không cần học thuộc chi tiết từng dịch vụ*, đề thi chủ yếu kiểm tra **tư duy và lý do đằng sau chi phí**.

---

### 🎯 Bốn mô hình định giá của AWS

AWS có **bốn mô hình định giá** chính:

1. **Pay as you go (dùng bao nhiêu trả bấy nhiêu)** — bạn giữ được sự **agile (linh hoạt)**: khởi động, dừng và xóa tài nguyên bất cứ lúc nào; **responsive (phản ứng nhanh)** và có thể **scale theo nhu cầu** khi nhu cầu phát sinh.
2. **Save when you reserve (tiết kiệm khi đặt trước)** — giúp **giảm thiểu rủi ro**, có **ngân sách dự đoán được** và đáp ứng **yêu cầu dài hạn**. Ví dụ: **instance reservation** cho **EC2, DynamoDB, ElastiCache, RDS và Redshift**.
3. **Pay less by using more (dùng nhiều trả ít hơn)** — bạn nhận **volume-based discount (giảm giá theo khối lượng)**, ví dụ khi vượt một mốc dung lượng khoảng **5 terabyte**, phần dung lượng tiếp theo sẽ rẻ hơn.
4. **Hưởng lợi khi AWS lớn lên** — khi hạ tầng AWS mở rộng, họ có **cost savings** và **chia sẻ lại cho bạn**. AWS nổi tiếng với việc **giảm giá hàng tháng hoặc hàng năm**: càng nhiều người dùng AWS, quy mô càng lớn, **economy of scale (lợi thế kinh tế theo quy mô)** càng được chuyển thành discount cho khách hàng.

---

### 🎁 Free tier cho tài khoản mới: Free plan vs Paid plan

Khi tạo tài khoản AWS hoàn toàn mới, bạn nhận **tối đa 200 USD credit**, sau đó **chọn giữa free plan và paid plan**:

| Tiêu chí | Free plan | Paid plan |
|---|---|---|
| Credit khởi đầu | 200 USD | 200 USD |
| Khi hết credit | Tài khoản **tự động bị xóa**, không phát sinh phí | **Bị tính phí**, tài khoản tiếp tục dùng được |
| Thời hạn | Hết hạn sau **6 tháng** | Không giới hạn |

Cả hai gói đều có **200 USD credit** và quyền truy cập **Always Free Services (dịch vụ miễn phí mãi mãi)** — tức một số dịch vụ luôn có **hạn mức miễn phí hàng tháng**, bất kể bạn dùng gói nào:

* **Lambda**: **1 triệu request/tháng** và **400.000 GB-giây compute/tháng**.
* **DynamoDB**: **25 GB storage** và **200 triệu request/tháng**.

---

### 🖥️ EC2: on-demand, reserved, spot và dedicated host

Với **EC2 on-demand**, bạn trả tiền theo những gì mình dùng. Các yếu tố ảnh hưởng giá gồm:

* **Số lượng instance** và **cấu hình instance** (bao nhiêu CPU, bao nhiêu RAM).
* **Region** bạn đang dùng, **operating system (hệ điều hành)** và **software cài trên instance**.
* **Instance type và instance size**.
* Nếu dùng **load balancer**: **thời gian chạy** và **lượng dữ liệu được xử lý**.
* **Detailed monitoring** trên EC2: trả thêm phí để nhận **CloudWatch metrics mỗi phút** thay vì mỗi 5 phút.

| Mô hình | Ưu đãi | Cam kết | Đặc điểm cần nhớ |
|---|---|---|---|
| **On-Demand** | Không | Không | Tối thiểu **60 giây**; Linux/Windows tính theo giây, các loại khác theo giờ |
| **Reserved** | Tới **75%** | **1 hoặc 3 năm** | Trả trước toàn phần/ một phần/ không trả trước — trả trước nhiều, giảm sâu hơn |
| **Spot** | Tới **90%** | Không | **Bid** vào capacity nhàn rỗi; rủi ro **bị thu hồi** nếu có người trả cao hơn |
| **Dedicated Host** | Tùy chọn | Tùy chọn | Chạy **một mình trên host dành riêng** cho bạn; có thể on-demand hoặc reserved |

Ngoài ra còn có **Savings Plan** — một giải pháp thay thế cho tất cả các mô hình trên, và mình sẽ dành hẳn một bài riêng để nói về nó.

---

### 📦 Compute và storage: Lambda, ECS, Fargate, S3, EFS, EBS

**Compute:**

* **Lambda**: trả theo **số API call** và **thời gian chạy (duration) × dung lượng RAM** gán cho function.
* **ECS – EC2 launch type**: **không mất phí dùng ECS**, nhưng bạn trả tiền cho **EC2 instance chạy bên dưới** cluster.
* **Fargate**: không quản lý EC2 instance, thay vào đó trả cho **từng container** theo **CPU và memory** được gán.

**Storage:**

* **S3**: các storage class cần nhớ cho đề thi gồm **S3 Standard, S3 Infrequent Access, S3 One-Zone IA, S3 Intelligent Tiering, Glacier và Glacier Deep Archive**. Bạn trả tiền cho **số lượng và kích thước object** (giá **theo bậc** — càng nhiều, càng lớn càng được giảm), **request ra/vào**, **data transfer out** (đưa dữ liệu **vào** S3 thì miễn phí), **S3 Transfer Acceleration** và **lifecycle transition** giữa các storage class.
* **EFS**: trả **theo mức sử dụng**, có **tier Infrequent Access** và **lifecycle rules**.
* **EBS**: trả theo **loại volume (hiệu năng)**, **dung lượng GB bạn provision trước** — *bạn trả tiền bất kể có dùng hay không*, **IOPS** (general purpose SSD thì đã bao gồm; provisioned IOPS thì trả theo IOPS; magnetic thì trả theo số request), **EBS snapshot** (theo GB/tháng) và **data transfer out** (dữ liệu ghi vào EBS thì miễn phí).

---

### 🧾 Database, CloudFront và chi phí network

**RDS**: tính phí **theo giờ**, phụ thuộc **engine, kích thước, memory class**; có thể **on-demand hoặc reserved 1–3 năm** (trả trước). Về backup: thường **không mất phí lưu trữ backup lên tới 100% dung lượng database trong một region** — nên trên thực tế backup thường miễn phí nếu database chưa đầy. Bạn vẫn trả cho **storage nền EBS**, **số request input/output mỗi tháng**, **loại triển khai single-AZ hay multi-AZ** (multi-AZ nghĩa là trả cho **hai database**), và **data transfer out** (vào thì miễn phí).

**CloudFront**: là một **CDN (Content Delivery Network)** hoạt động toàn cầu, nên giá phụ thuộc **nơi nội dung được phục vụ** — theo châu lục như **America, Europe, South America, Japan, Australia, India**. Càng dùng nhiều ở một **edge location (điểm biên)**, bạn càng được giảm giá, và hóa đơn được **tổng hợp cho mọi edge location**. Data transfer **ra khỏi** CloudFront thì trả phí, **vào** thì miễn phí; ngoài ra bạn trả theo **số request**.

**Network** — phần "khó nhằn" nhất nhưng được giảng viên đơn giản hóa như sau:

* Traffic **đi vào** EC2 luôn **miễn phí**.
* Hai EC2 trong **cùng một AZ** nói chuyện với nhau qua **private IP** thì **miễn phí**.
* Hai EC2 **khác AZ**: nếu dùng **public IP**, traffic đi qua internet và tốn **2 cent/GB**; nếu dùng **private IP**, chỉ tốn **1 cent/GB**.
* EC2 ở **region khác** tốn **2 cent/GB** như một khoản **inter-region cost**.

*Tóm lại: hãy luôn ưu tiên **private IP** để vừa tiết kiệm vừa có hiệu năng mạng tốt hơn.* Và nếu muốn tiết kiệm tối đa, dùng **một AZ duy nhất** — nhưng đánh đổi bằng **high availability (khả năng sẵn sàng cao)**. Đây chính là **trade-off giữa chi phí và độ sẵn sàng**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Mô hình EC2 nào cho ưu đãi tới 75% và cần cam kết 1 hoặc 3 năm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Reserved Instances.

Giải thích: Trả trước càng nhiều thì mức giảm càng sâu.

Tham chiếu: Mục EC2 on-demand, reserved, spot và dedicated host.

</details>

**Câu 2:** Spot Instances cho ưu đãi tối đa bao nhiêu và có rủi ro gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tới 90% so với on-demand; rủi ro bị thu hồi nếu có người trả giá cao hơn.

Giải thích: Spot là hình thức bid vào capacity EC2 nhàn rỗi.

Tham chiếu: Mục EC2 on-demand, reserved, spot và dedicated host.

</details>

**Câu 3:** Lambda tính phí dựa trên những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Số API call và thời gian chạy × dung lượng RAM gán cho function.

Giải thích: Không trả theo máy chủ, mà theo lượt gọi và thời gian xử lý.

Tham chiếu: Mục Compute và storage.

</details>

**Câu 4:** Đưa dữ liệu vào S3, EBS hay RDS có mất phí không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — dữ liệu đi vào (in) miễn phí; chỉ dữ liệu đi ra (out) mới tốn phí.

Giải thích: Quy tắc data transfer in/out này lặp lại ở S3, EBS, RDS và CloudFront.

Tham chiếu: Mục Compute và storage; Mục Database, CloudFront và network.

</details>

**Câu 5:** Giao tiếp giữa hai EC2 khác AZ nên dùng public IP hay private IP?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Private IP — chỉ 1 cent/GB thay vì 2 cent/GB khi dùng public IP (traffic phải đi qua internet).

Giải thích: Dùng private IP vừa tiết kiệm chi phí vừa cải thiện hiệu năng mạng.

Tham chiếu: Mục Database, CloudFront và network.

</details>

---

Đó là toàn cảnh về định giá trên AWS. Nhớ rằng: đề thi **không hỏi chi tiết vụn vặt của từng dịch vụ**, mà kiểm tra việc bạn **hiểu lý do đằng sau chi phí** — ví dụ khi nào dùng reserved, khi nào dùng spot, vì sao private IP rẻ hơn. Nắm được tư duy đó là bạn đã thắng một nửa.

Bài tiếp theo chúng ta sẽ "zoom" vào **Savings Plan** — cách tiết kiệm mới, linh hoạt hơn cả Reserved Instances. Hẹn gặp các bạn ở đó! 🚀
