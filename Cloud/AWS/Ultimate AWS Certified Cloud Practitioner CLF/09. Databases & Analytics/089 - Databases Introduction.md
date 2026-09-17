# 🗄️ Database trên AWS: Relational, NoSQL và câu chuyện managed service

> Nguồn: `089-Databases-Introduction.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20118314)

Chào mừng các bạn đến với section **Databases & Analytics**! Trước khi đi vào từng dịch vụ cụ thể, mình muốn giới thiệu bức tranh tổng quan: **database là gì**, có những loại nào, và vì sao dùng **managed database** trên AWS lại là lựa chọn sáng suốt.

*Đừng lo nếu bạn chưa từng làm việc với database bao giờ* — mình sẽ giải thích mọi thứ từ đầu.

---

### 📦 Vì sao cần database thay vì lưu file?

Khi lưu dữ liệu trên disk — dù là **EBS volume**, **EC2 Instance Store** hay **Amazon S3** — các bạn đều gặp những giới hạn nhất định. Nếu muốn lưu dữ liệu **có cấu trúc**, database chính là lựa chọn phù hợp.

Lợi ích của database:

* Xây dựng được **index (chỉ mục)** để truy vấn, tìm kiếm dữ liệu hiệu quả.
* Dữ liệu **có cấu trúc** rõ ràng — thay vì thao tác theo từng file như EFS, EBS, Instance Store hay S3.
* Định nghĩa được **quan hệ (relationship)** giữa các tập dữ liệu.

Các database hiện nay đều được **tối ưu cho một mục đích riêng**, với tính năng, hình dạng và ràng buộc khác nhau. Trong đề thi, các bạn sẽ phải xác định **database nào phù hợp nhất với use case mà câu hỏi đưa ra**.

---

### 🧮 Relational database — cứ nghe SQL là nghĩ tới

Relational database là loại phổ biến nhất, xưa nay vẫn vậy. Các bạn cứ hình dung nó giống **bảng tính Excel**, nhưng có **liên kết giữa các bảng** với nhau.

Ví dụ:

* Bảng **students** gồm 4 cột: student ID, department ID, name, email.
* Bảng **departments** gồm department ID và nhiều thông tin khác.
* Database định nghĩa **quan hệ** giữa cột department ID của bảng students và cột department ID của bảng departments.
* Có thể thêm bảng **subjects** và liên kết với bảng students bằng một quan hệ nữa.

Điểm đặc biệt: relational database dùng **SQL** để truy vấn, tra cứu. *Vậy nên khi nghe đến SQL, các bạn hãy nghĩ ngay đến relational database.*

---

### 🧩 NoSQL database — linh hoạt và mở rộng ngang

**NoSQL** nghĩa là **non-SQL** — tức **non-relational**. Đây là nhóm database hiện đại hơn, được xây dựng cho **một mục đích cụ thể với data model xác định**, và có **schema linh hoạt (flexible schema)** để phục vụ ứng dụng hiện đại. Schema chính là "hình dạng" của dữ liệu.

Lợi ích của NoSQL:

* **Linh hoạt hơn**, data model dễ tiến hóa và thay đổi.
* **Scalable** — thiết kế để **scale out** bằng cách thêm các server phân tán, tức **horizontal scaling**. Trong khi relational database khó thêm server, thường phải **scale up theo chiều dọc (vertical scaling)**.
* **Hiệu năng cao**, tối ưu cho một data model cụ thể.
* **Giàu tính năng** vì các kiểu dữ liệu được tối ưu cho model đó.

Các ví dụ NoSQL: **key-value**, **document**, **graph**, **in-memory**, **search** — tất cả sẽ xuất hiện trong section này.

| Tiêu chí | Relational | NoSQL |
|---|---|---|
| Ngôn ngữ truy vấn | SQL | Không dùng SQL |
| Schema | Cố định, có quan hệ giữa bảng | Linh hoạt, dễ thay đổi |
| Mở rộng | Scale up theo chiều dọc | Scale out theo chiều ngang |
| Ví dụ | Students, departments, subjects | Key-value, document, graph, in-memory, search |

---

### 🔍 Dữ liệu JSON trong NoSQL

NoSQL có thể lưu dữ liệu dạng **JSON (JavaScript Object Notation)** — đúng định dạng các bạn từng gặp khi viết **IAM policy**.

Đặc điểm của JSON:

* Không giống bảng tính Excel chút nào.
* Có thể **lồng nhau (nested)** — ví dụ trường *address* nằm bên trong object cấp cao hơn.
* Các field có thể **thay đổi theo thời gian** — bạn hoàn toàn có thể thêm field mới.
* Hỗ trợ **array** — ví dụ John, 30 tuổi, sở hữu 3 chiếc xe: Ford, BMW và Fiat. *Anh chàng này khá may mắn đấy!*

---

### ☁️ Managed database trên AWS — ai chịu trách nhiệm gì?

AWS cung cấp sẵn các **managed database** với rất nhiều lợi ích:

* **Provision cực nhanh**.
* Thiết kế sẵn với **high availability (tính sẵn sàng cao)**.
* **Vertical và horizontal scaling** đều dễ dàng.
* **Backup và restore tự động**, kèm operations và upgrades.
* **AWS chịu trách nhiệm patch hệ điều hành** của instance bên dưới — không còn là việc của bạn.
* **Monitoring và alerting** được tích hợp sẵn.

Ngược lại, bạn vẫn có thể **tự chạy database trên EC2**, nhưng khi đó bạn phải tự lo hết: **resiliency, backup, patching, high availability, fault tolerance và scaling**. *Vì vậy, với rất nhiều use case, managed database chính là "vị cứu tinh".*

Trong section này, chúng ta sẽ lần lượt khám phá các managed database của AWS và use case phù hợp của từng dịch vụ.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Khi nghe đến SQL, bạn nên nghĩ tới loại database nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Relational database.

Giải thích: Relational database dùng SQL làm ngôn ngữ truy vấn, tra cứu.

Tham chiếu: Mục Relational database.

</details>

**Câu 2:** NoSQL mở rộng theo chiều nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Horizontal scaling — scale out bằng cách thêm các server phân tán.

Giải thích: Relational database thường phải scale up theo chiều dọc, còn NoSQL sinh ra để scale out.

Tham chiếu: Mục NoSQL database.

</details>

**Câu 3:** Schema trong ngữ cảnh database nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Schema là "hình dạng" của dữ liệu.

Giải thích: NoSQL có flexible schema nên data model dễ thay đổi, tiến hóa theo thời gian.

Tham chiếu: Mục NoSQL database.

</details>

**Câu 4:** Dữ liệu JSON có những đặc điểm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hỗ trợ dữ liệu lồng nhau (nested), field thay đổi được theo thời gian, và hỗ trợ array.

Giải thích: JSON (JavaScript Object Notation) là định dạng phổ biến để mô tả dữ liệu trong NoSQL — cũng chính là định dạng của IAM policy.

Tham chiếu: Mục Dữ liệu JSON trong NoSQL.

</details>

**Câu 5:** Nếu tự chạy database trên EC2, bạn phải tự lo những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Resiliency, backup, patching, high availability, fault tolerance và scaling.

Giải thích: Với managed database, AWS lo phần lớn các việc này, đặc biệt là patch hệ điều hành.

Tham chiếu: Mục Managed database trên AWS.

</details>

---

Vậy là các bạn đã nắm được hai nhóm database lớn nhất và giá trị của managed service. *Hãy nhớ: đề thi rất thích hỏi "database nào phù hợp với use case này" — nên nắm rõ đặc điểm từng loại là chìa khóa.*

Ở bài tiếp theo, chúng ta sẽ bắt đầu với dịch vụ relational database đầu tiên: **RDS** và **Aurora**. Hẹn gặp các bạn ở đó! 🚀
