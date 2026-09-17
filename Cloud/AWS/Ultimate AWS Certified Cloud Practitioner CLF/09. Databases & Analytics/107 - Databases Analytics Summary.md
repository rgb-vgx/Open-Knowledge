# 🗺️ Tổng kết Databases & Analytics: Bản đồ dịch vụ database trên AWS

> Nguồn: `107-Databases-Analytics-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20260728)

Chúng ta đã đi hết section **Databases & Analytics**! Bài cuối này mình tổng hợp lại toàn bộ dịch vụ thành một **bản đồ tra cứu nhanh**, vì đề thi chỉ cần bạn biết **database nào tương ứng với use case nào**. Cùng ôn lại nhé!

---

### 📋 Bảng tra cứu use case → dịch vụ

| Use case | Dịch vụ | Ghi chú |
|---|---|---|
| Relational database, OLTP | **RDS**, **Aurora** | Hỗ trợ ngôn ngữ SQL |
| In-memory database hoặc cache | **ElastiCache** | |
| Key-value database | **DynamoDB** | Serverless |
| Cache riêng cho DynamoDB | **DAX** | Cache làm riêng cho DynamoDB |
| Data warehousing, OLAP | **Redshift** | Truy vấn bằng SQL |
| Hadoop cluster, big data | **EMR** | Phân tích big data |
| Query S3 serverless bằng SQL | **Athena** | |
| Dashboard, BI serverless | **QuickSight** | Trực quan hóa, tương tác |
| MongoDB, dữ liệu JSON | **DocumentDB** | NoSQL, "Aurora của MongoDB" |
| Blockchain | **Managed Blockchain** | Hyperledger Fabric và Ethereum |
| ETL | **Glue** | Kèm dịch vụ data catalog |
| Database migration | **DMS** | Từ on-premises lên cloud, đổi loại database |
| Graph database | **Neptune** | Dữ liệu liên kết |
| Time-series database | **Timestream** | Dữ liệu biến đổi theo thời gian |

---

### 🧠 Những điểm cần nhớ sâu

* **OLTP (Online Transaction Processing — xử lý giao dịch trực tuyến)** với relational database → **RDS** và **Aurora**, cả hai đều hỗ trợ **SQL**.
* Với **RDS**, bạn cần phân biệt rõ **Multi-AZ deployment**, **Read Replicas** và **Multi-Region**, cùng **use case của từng loại**.
* **OLAP (Online Analytical Processing — xử lý phân tích trực tuyến)** và **data warehousing (kho dữ liệu)** → **Redshift**.
* **DocumentDB** là một **NoSQL database** nữa bên cạnh **DynamoDB** — nhớ "MongoDB → DocumentDB".
* **DMS** giúp chuyển database từ **on-premises lên cloud**, hoặc **chuyển đổi giữa hai loại database khác nhau**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Relational database phục vụ OLTP thì dùng dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** RDS và Aurora.

Giải thích: Cả hai đều hỗ trợ ngôn ngữ SQL để truy vấn dữ liệu.

Tham chiếu: Mục Bảng tra cứu và Những điểm cần nhớ sâu.

</details>

**Câu 2:** In-memory database hoặc in-memory cache thì dùng dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** ElastiCache.

Giải thích: Đây là dịch vụ in-memory cache của AWS.

Tham chiếu: Mục Bảng tra cứu.

</details>

**Câu 3:** Key-value database serverless là dịch vụ nào, và cache dành riêng cho nó là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** DynamoDB (serverless) và DAX (cache làm riêng cho DynamoDB).

Giải thích: DAX là công nghệ caching chuyên cho DynamoDB.

Tham chiếu: Mục Bảng tra cứu.

</details>

**Câu 4:** Dịch vụ nào để query dữ liệu trên S3 serverless bằng SQL, và dịch vụ nào để tạo dashboard BI serverless?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Athena cho query S3; QuickSight cho dashboard BI.

Giải thích: QuickSight cũng dùng cho business intelligence và tạo visual tương tác.

Tham chiếu: Mục Bảng tra cứu.

</details>

**Câu 5:** Ghép đúng: MongoDB, graph, time series tương ứng với dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** MongoDB → DocumentDB; graph → Neptune; time series → Timestream.

Giải thích: DocumentDB là NoSQL "Aurora của MongoDB", Neptune là graph database, Timestream là time-series database.

Tham chiếu: Mục Bảng tra cứu.

</details>

---

Vậy là các bạn đã hoàn thành trọn vẹn section **Databases & Analytics** — *hãy giữ lại bảng tra cứu này để ôn nhanh trước kỳ thi nhé!*

Ở phần tiếp theo, chúng ta sẽ bước sang **Other Compute Services** với Docker, ECS, Lambda, Batch và Lightsail. Hẹn gặp các bạn ở đó! 🚀
