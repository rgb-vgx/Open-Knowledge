# 📊 Redshift: Kho dữ liệu phân tích cho bài toán OLAP

> Nguồn: `097-Redshift-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056000)

Loại database tiếp theo chúng ta tìm hiểu là **Redshift**. Đây là một dịch vụ rất khác so với RDS: nó dựa trên **PostgreSQL** nhưng **không phục vụ giao dịch**, mà chuyên cho **analytics và data warehousing (kho dữ liệu)**. Cùng mình khám phá nhé!

---

### 🧮 OLTP vs OLAP — Redshift sinh ra để làm gì?

* Redshift là database **dựa trên PostgreSQL**, nhưng **không dùng cho OLTP (Online Transaction Processing)** — đó là "địa hạt" của RDS.
* Thay vào đó, Redshift là **OLAP (Online Analytical Processing)** — dùng để **phân tích dữ liệu và làm data warehousing**.
* *Mẹo thi:* bất cứ khi nào đề nói database cần làm **warehouse** và cần **phân tích (analytics)** trên đó, **Redshift chính là đáp án**.

| Tiêu chí | OLTP | OLAP |
|---|---|---|
| Viết tắt | Online Transaction Processing | Online Analytical Processing |
| Mục đích | Xử lý giao dịch | Phân tích, data warehousing |
| Dịch vụ AWS | RDS | Redshift |

---

### 🏗️ Sức mạnh của Redshift

Cách vận hành và những điểm mạnh bạn cần nhớ:

* **Không load dữ liệu liên tục** — bạn load theo định kỳ, ví dụ **mỗi giờ một lần**.
* Cực kỳ giỏi **phân tích dữ liệu và tính toán**.
* Hiệu năng **tốt hơn 10 lần** so với các data warehouse khác.
* Scale tới **petabytes** dữ liệu.
* Dữ liệu lưu theo **cột** — gọi là **columnar storage**, thay vì theo hàng. *Thấy "columnar" là nghĩ ngay Redshift.*
* Sử dụng **MPP engine (Massively Parallel Query Execution)** để tính toán cực nhanh.
* Trả tiền theo mức sử dụng (**pay as you go**) dựa trên instance bạn đã provision.
* Có **giao diện SQL** để truy vấn.
* Tích hợp với các công cụ **BI (business intelligence)** như **QuickSight** hoặc **Tableau** để dựng dashboard trên dữ liệu trong data warehouse.

*Tóm gọn:* data warehouse dùng để tính toán, phân tích trên tập dữ liệu lớn và có thể dựng dashboard — Redshift là lựa chọn hoàn hảo cho use case đó.

---

### ⚡ Redshift Serverless — không cần quản lý hạ tầng

Redshift có thêm tính năng **Redshift Serverless**, cho phép bạn chạy Redshift mà **không phải lo scale hay provision data warehouse**. AWS (đúng như tên gọi "serverless") sẽ làm việc đó cho bạn.

Lợi ích:

* Chạy workload analytics **không cần quản lý hạ tầng data warehouse**.
* **Chỉ trả tiền cho những gì bạn dùng** — tiết kiệm chi phí.
* Use case: **báo cáo (reporting)**, ứng dụng **dashboard**, hoặc **realtime analytics**.

Cách hoạt động:

1. Bật **Amazon Redshift Serverless** trên tài khoản của bạn.
2. Kết nối **Redshift Query Editor** hoặc bất kỳ công cụ nào khác để bắt đầu viết query.
3. Redshift Serverless tự động chạy query, **tự provision và scale capacity** dựa trên workload và chính query đó.
4. Bạn chỉ trả tiền cho **compute và storage** được dùng trong quá trình phân tích.

*Đây là lựa chọn rất hiệu quả về chi phí so với chạy Redshift thông thường, và đề thi cũng có thể hỏi bạn về nó.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Redshift phục vụ loại xử lý nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** OLAP (Online Analytical Processing) — phân tích dữ liệu và data warehousing.

Giải thích: OLTP (Online Transaction Processing) là địa hạt của RDS.

Tham chiếu: Mục OLTP vs OLAP.

</details>

**Câu 2:** Từ khóa nào trong đề thi dẫn bạn đến Redshift?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Data warehouse, analytics và columnar.

Giải thích: Redshift là database dựa trên PostgreSQL chuyên cho phân tích.

Tham chiếu: Mục OLTP vs OLAP và Sức mạnh của Redshift.

</details>

**Câu 3:** Redshift mạnh đến mức nào về hiệu năng và dung lượng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hiệu năng tốt hơn 10 lần các data warehouse khác và scale tới petabytes dữ liệu.

Giải thích: Dữ liệu lưu theo cột (columnar storage) và xử lý bằng MPP engine.

Tham chiếu: Mục Sức mạnh của Redshift.

</details>

**Câu 4:** Redshift có thể tích hợp với công cụ BI nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** QuickSight hoặc Tableau.

Giải thích: Tích hợp BI giúp dựng dashboard trên dữ liệu trong data warehouse.

Tham chiếu: Mục Sức mạnh của Redshift.

</details>

**Câu 5:** Redshift Serverless có lợi ích gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chạy analytics mà không cần quản lý hạ tầng data warehouse, tự provision và scale theo workload, chỉ trả tiền cho compute và storage đã dùng.

Giải thích: Phù hợp cho reporting, dashboard và realtime analytics.

Tham chiếu: Mục Redshift Serverless.

</details>

---

Vậy là các bạn đã hiểu vì sao **Redshift** là "ngôi sao" của data warehouse trên AWS — *hãy nhớ bộ ba từ khóa: warehouse, analytics, columnar.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **Amazon EMR** — giải pháp Hadoop cluster cho big data. Hẹn gặp các bạn ở đó! 🚀
