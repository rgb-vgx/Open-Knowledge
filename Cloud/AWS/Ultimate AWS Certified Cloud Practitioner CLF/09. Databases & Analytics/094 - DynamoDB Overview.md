# 🧨 DynamoDB: Database serverless với độ trễ một chữ số mili-giây

> Nguồn: `094-DynamoDB-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055996)

Giờ là lúc nói về **DynamoDB** — một trong những **flagship product** của AWS. Đây là database **NoSQL, fully managed và serverless**, được thiết kế để chịu tải khổng lồ với độ trễ cực thấp. Cùng mình khám phá nhé!

---

### 🎯 DynamoDB là gì và mạnh cỡ nào?

**DynamoDB** là database **fully managed, highly available**, với dữ liệu được **replicate trên 3 Availability Zone**. Nó thuộc họ **NoSQL** — không phải relational database.

Những con số và đặc điểm bạn cần nhớ:

* **Flagship product** của AWS, scale tới workload khổng lồ.
* Là **distributed serverless database** — bạn **không cần provision server**. Với RDS hay ElastiCache, bạn phải chọn instance type; còn DynamoDB thì không. *Đúng là vẫn có server ở backend, nhưng chúng ta không nhìn thấy chúng.*
* Scale tới **hàng triệu request mỗi giây**, **hàng nghìn tỷ (trillions) row**, và **hàng trăm TB storage**.
* Hiệu năng **nhanh và ổn định**, với **single digit millisecond latency (độ trễ một chữ số mili-giây)** — đây là từ khóa bạn sẽ tìm trong đề thi.
* Tích hợp với **IAM** cho security, authorization và administration.
* **Chi phí thấp** và có khả năng **auto scaling**.
* Hai **table class**: **Standard** và **Infrequent Access (IA)** — phân loại dữ liệu để tiết kiệm chi phí.

*Mẹo thi:* thấy từ khóa **serverless** và **low latency / single digit millisecond latency** — hãy nghĩ ngay đến DynamoDB.

---

### 🗂️ Dữ liệu trong DynamoDB trông như thế nào?

DynamoDB là **key-value database** và dữ liệu trông như sau:

* **Primary key** được tạo từ **một hoặc hai cột**: **partition key** và **sort key**.
* Bên phải là các **attribute** — nơi bạn tự định nghĩa các cột cho dữ liệu của mình.
* Tất cả các item được lưu **từng hàng một (row by row)**.

Cách hoạt động rất đơn giản, nhưng hãy luôn nhớ: **đây là NoSQL database** — truy xuất dữ liệu độ trễ thấp trên nền tảng serverless.

---

### 🔥 DAX — cache in-memory dành riêng cho DynamoDB

**DynamoDB Accelerator (DAX)** là **fully managed in-memory cache cho DynamoDB**. Trong đề thi, cả hai tên **DAX** và **DynamoDB Accelerator** đều được dùng.

* Đây là cache **chuyên cho DynamoDB**, không giống **ElastiCache**.
* Khi ứng dụng muốn cache những object **đọc thường xuyên nhất**, bạn đặt **DAX** ở giữa làm lớp cache trước DynamoDB.
* DAX được thiết kế **chỉ cho DynamoDB** — vì vậy trong trường hợp này bạn **không dùng ElastiCache**, dù về lý thuyết là có thể. DAX tích hợp sẵn với DynamoDB tốt hơn nhiều.
* Hiệu năng **nhanh gấp 10 lần**: thay vì độ trễ **mili-giây**, bạn đạt độ trễ **micro-giây** khi truy cập bảng DynamoDB.
* **Fully secure, highly scalable, highly available**.

| Tiêu chí | DynamoDB | RDS |
|---|---|---|
| Loại database | NoSQL key-value | Relational, dùng SQL |
| Hạ tầng | Serverless, không cần provision server | Phải provision instance type |
| Cache phù hợp | DAX, tích hợp sẵn cho DynamoDB | ElastiCache, dùng được cho nhiều loại database |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** DynamoDB thuộc họ database nào và replicate trên bao nhiêu AZ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** NoSQL, replicate trên 3 Availability Zone.

Giải thích: DynamoDB là fully managed, highly available, không phải relational database.

Tham chiếu: Mục DynamoDB là gì và mạnh cỡ nào.

</details>

**Câu 2:** Vì sao DynamoDB được gọi là serverless database?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì bạn không cần provision server — khác với RDS hay ElastiCache phải chọn instance type.

Giải thích: Vẫn có server ở backend, nhưng người dùng không nhìn thấy và không phải quản lý.

Tham chiếu: Mục DynamoDB là gì và mạnh cỡ nào.

</details>

**Câu 3:** Từ khóa nào trong đề thi dẫn đến DynamoDB?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Serverless và low latency / single digit millisecond latency.

Giải thích: DynamoDB cũng scale tới hàng triệu request mỗi giây, hàng nghìn tỷ row, hàng trăm TB storage.

Tham chiếu: Mục DynamoDB là gì và mạnh cỡ nào.

</details>

**Câu 4:** DAX khác ElastiCache ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** DAX chỉ dùng cho DynamoDB và tích hợp sẵn với DynamoDB; ElastiCache có thể dùng cho nhiều loại database khác.

Giải thích: DAX là fully managed in-memory cache chuyên biệt cho DynamoDB.

Tham chiếu: Mục DAX.

</details>

**Câu 5:** DAX cải thiện hiệu năng như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhanh gấp 10 lần — từ độ trễ mili-giây xuống micro-giây.

Giải thích: DAX cache các object đọc thường xuyên, fully secure, highly scalable và highly available.

Tham chiếu: Mục DAX.

</details>

---

Vậy là các bạn đã nắm được **DynamoDB** và **DAX** — cặp đôi serverless + cache siêu nhanh của AWS. *Nhớ kỹ các con số: 3 AZ, triệu request/giây, nghìn tỷ row, micro-giây — đề thi rất chuộng những chi tiết này.*

Ở bài tiếp theo, chúng ta sẽ tự tay tạo bảng DynamoDB đầu tiên trên console. Hẹn gặp các bạn ở đó! 🚀
