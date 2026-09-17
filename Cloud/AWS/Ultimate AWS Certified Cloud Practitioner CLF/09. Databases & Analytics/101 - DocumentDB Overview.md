# 🍃 Amazon DocumentDB: Phiên bản Aurora dành cho MongoDB

> Nguồn: `101-DocumentDB-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682532)

Trong bài này, chúng ta gặp một người "anh em" của Aurora: **Amazon DocumentDB** — được AWS xây dựng như **phiên bản Aurora dành cho MongoDB**. *Nếu bạn chưa từng nghe đến MongoDB cũng đừng lo, mọi thứ sẽ rõ ngay bên dưới.*

---

### 🧩 DocumentDB là gì?

* Giống như **Aurora** là cách AWS hiện thực hóa một phiên bản **cloud-native** của **PostgreSQL** và **MySQL**, thì **DocumentDB** chính là **phiên bản Aurora dành cho MongoDB**.
* **MongoDB** là một **NoSQL database (cơ sở dữ liệu phi quan hệ)** khác — *điều này rất quan trọng, đề thi rất hay hỏi*.
* **DocumentDB là NoSQL database** và **tương thích với MongoDB**.
* MongoDB được dùng để **lưu trữ, truy vấn và đánh index (chỉ mục) dữ liệu JSON**.

---

### 🏗️ Kiến trúc và khả năng mở rộng

DocumentDB có **khái niệm deployment tương tự Aurora**, nghĩa là:

* **Fully managed database (được quản lý hoàn toàn)**.
* **Highly available (tính sẵn sàng cao)**.
* Dữ liệu được **replicate (sao chép) qua 3 Availability Zones (vùng sẵn sàng)**.
* Storage **tự động tăng theo từng bước 10 gigabytes**.
* Được thiết kế để **scale tới hàng triệu request mỗi giây (millions of requests per second)**.

---

### 🎯 Mẹo thi

* Thấy **MongoDB** → nghĩ **DocumentDB**.
* Thấy **NoSQL database** → nghĩ **DocumentDB** và **DynamoDB**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** DocumentDB tương thích với database nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** MongoDB.

Giải thích: DocumentDB được xem là phiên bản Aurora dành cho MongoDB.

Tham chiếu: Mục DocumentDB là gì.

</details>

**Câu 2:** DocumentDB thuộc nhóm database nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** NoSQL database.

Giải thích: DocumentDB lưu trữ, truy vấn và đánh index dữ liệu JSON — giống MongoDB.

Tham chiếu: Mục DocumentDB là gì.

</details>

**Câu 3:** Dữ liệu của DocumentDB được replicate như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Qua 3 Availability Zones.

Giải thích: Nhờ vậy DocumentDB có tính sẵn sàng cao, tương tự Aurora.

Tham chiếu: Mục Kiến trúc và khả năng mở rộng.

</details>

**Câu 4:** Storage của DocumentDB tự động tăng ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tự động tăng theo từng bước 10 gigabytes.

Giải thích: Đây là đặc điểm vận hành bạn cần nhớ của DocumentDB.

Tham chiếu: Mục Kiến trúc và khả năng mở rộng.

</details>

**Câu 5:** DocumentDB có thể scale tới mức nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tới hàng triệu request mỗi giây.

Giải thích: DocumentDB được thiết kế cho workload rất lớn; đề thi thấy NoSQL thì nghĩ DocumentDB và DynamoDB.

Tham chiếu: Mục Kiến trúc và khả năng mở rộng.

</details>

---

Vậy là bạn đã nắm được **Amazon DocumentDB**: *NoSQL, tương thích MongoDB, replicate qua 3 AZ và scale tới hàng triệu request mỗi giây*. Từ khóa "MongoDB" giờ đây đã có chủ rồi nhé!

Ở bài tiếp theo, chúng ta sẽ khám phá **Amazon Neptune** — graph database cho dữ liệu liên kết. Hẹn gặp các bạn ở đó! 🚀
