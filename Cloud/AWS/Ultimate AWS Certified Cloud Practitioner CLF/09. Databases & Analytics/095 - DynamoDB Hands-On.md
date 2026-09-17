# 🧪 Hands-on: Tạo bảng DynamoDB và thêm item đầu tiên

> Nguồn: `095-DynamoDB-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055998)

Được rồi, chúng ta cùng thực hành **DynamoDB** một chút nhé! Bài này rất nhanh gọn: tạo một bảng, thêm vài item và cảm nhận sự linh hoạt của NoSQL. *Các bạn hãy mở console và làm theo mình.*

---

### 🆕 Tạo bảng DemoTable

1. Trong DynamoDB console, bấm tạo table và đặt tên **DemoTable**.
2. Chỉ định **partition key** là **user_id**. *Sort key nằm ngoài phạm vi đề thi Cloud Practitioner, nên bài này chỉ xét partition key.*
3. Phần settings cứ **để mặc định** — bạn không cần biết chi tiết cách hoạt động.
4. Kéo xuống và bấm **Create table**.

Điểm thú vị: bạn đang tạo một **table mà không cần tạo database** — database đã tồn tại sẵn, vì đây là **serverless**, không cần provision server. Bạn chỉ cần nói: *"Mình muốn bảng này, hãy tạo nó cho mình, còn chạy thế nào mình không cần biết."* Đó chính là sức mạnh của DynamoDB và của các dịch vụ serverless.

---

### ✍️ Thêm item vào bảng

Khi table đã sẵn sàng, bấm **View items** và thực hành thêm dữ liệu:

1. Ban đầu, **0 item** được trả về vì chưa có gì cả.
2. Bấm **Create item** và nhập:
   * **user_id** = **1234**
   * **first_name** = **Stephane**
   * **last_name** = **Maarek**
   * một field kiểu number — ví dụ **favorite_number** = **42**
3. Bấm **Create item** — item đã được ghi vào DynamoDB.

Rất đơn giản phải không? Bạn **không phải khai báo schema** — schema **tự động được suy diễn (inferred)**, và giờ bạn có **4 attribute (cột)** trong item của mình.

---

### 🧩 Độ linh hoạt kiểu NoSQL

Bây giờ tạo item thứ hai: **user_id** = **45678**, chỉ thêm **first_name** = **Alice**, rồi bấm **Create item**.

Kết quả: item của Alice **không có last_name và favorite_number**, nhưng DynamoDB **vẫn chấp nhận**. Đây là kiểu database và cách insert dữ liệu **cực kỳ linh hoạt** — chính những đặc tính này làm nên sức hút của DynamoDB.

---

### ⚠️ Khác biệt với RDS: một bảng duy nhất, không join

Điểm khác biệt quan trọng so với RDS:

* DynamoDB lưu **toàn bộ dữ liệu trong một table duy nhất**.
* **Không có cách nào join** bảng này với bảng khác.
* Vì vậy nó **không phải relational database** — đúng nghĩa **NoSQL (not only SQL)**.

Hệ quả: bạn cần đảm bảo mọi dữ liệu liên quan được **định dạng đầy đủ ngay trong bảng DynamoDB chính**. Tư duy thiết kế database sẽ thay đổi đôi chút so với cách làm quen thuộc.

*Lưu ý:* đây chỉ là bài hands-on tổng quan — DynamoDB còn rất nhiều thứ để học, và đó là trọng tâm của kỳ thi **Certified Developer**, không phải Cloud Practitioner.

---

### 🧹 Dọn dẹp tài nguyên

1. Xóa table — bạn cũng có thể xóa luôn các **CloudWatch alarm** liên quan.
2. Gõ **delete** vào ô xác nhận và thế là xong.

---

Vậy là các bạn đã tự tay tạo bảng DynamoDB, thêm item và thấy được sự khác biệt giữa NoSQL với relational database. *Học qua thực hành kiểu này sẽ giúp kiến thức "dính" lâu hơn rất nhiều.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **DynamoDB Global Tables** — tính năng đưa bảng DynamoDB ra toàn cầu với độ trễ thấp. Hẹn gặp các bạn ở đó! 🚀
