# ⚡ S3 Express One Zone: Storage class hiệu năng cao trong một AZ duy nhất

> Nguồn: `080-S3-Express-One-Zone.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/51958377)

Đây là một storage class khá đặc biệt nên mình tách riêng thành một bài giảng. Nó không nằm trong bucket S3 thông thường mà được thiết kế cho tốc độ cực cao — đổi lại là sự đánh đổi về tính sẵn sàng.

---

### 🚀 Một storage class hoàn toàn khác biệt

* **S3 Express One Zone** là storage class **hiệu năng cao** nhưng chỉ lưu trong **một Availability Zone duy nhất**.
* Object không nằm trong bucket S3 tiêu chuẩn mà trong **directory bucket** — một loại bucket đặc biệt.
* Bucket này không trải rộng trên nhiều AZ mà nằm đúng **một AZ do bạn chọn**.

*Chính vì chỉ có một zone nên đây là storage class rất khác so với phần còn lại của S3.*

---

### ⚙️ Hiệu năng và bài toán đánh đổi

* Xử lý **hàng trăm nghìn request mỗi giây** với độ trễ **single-digit millisecond (một chữ số mili-giây)**.
* Hiệu năng **gấp khoảng 10 lần S3 Standard**, chi phí **thấp hơn khoảng 50%**.
* **Durability tốt**, nhưng **availability thấp hơn**: thay vì 3 AZ có replication, bạn chỉ có 1 AZ.
* Nếu AZ đó gặp sự cố, bạn sẽ **bị ảnh hưởng trực tiếp**.

---

### 🎯 Dùng cho ai và tích hợp với gì?

Ý tưởng chính là **co-locate (đặt cùng chỗ) storage và compute trong cùng một AZ** → giảm độ trễ, thậm chí giảm cả chi phí networking.

Use case phù hợp:

* Ứng dụng nhạy cảm độ trễ (latency sensitive)
* Ứng dụng data-intensive (dữ liệu lớn)
* AI và ML training
* Financial modeling (mô hình hóa tài chính)
* Media processing (xử lý media)
* High performance computing (tính toán hiệu năng cao)

Tích hợp tốt nhất với các dịch vụ dữ liệu như **SageMaker Model Training, Athena, EMR và Glue**.

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Object của S3 Express One Zone được lưu ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trong directory bucket, tại một Availability Zone duy nhất.
Giải thích: Đây là loại bucket đặc biệt, khác bucket S3 tiêu chuẩn trải trên nhiều AZ.
Tham chiếu: Mục Một storage class hoàn toàn khác biệt.

</details>

**Câu 2:** Hiệu năng và chi phí của nó so với S3 Standard thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hiệu năng gấp khoảng 10 lần, chi phí thấp hơn khoảng 50%.
Giải thích: Đây là lợi thế chính của class này.
Tham chiếu: Mục Hiệu năng và bài toán đánh đổi.

</details>

**Câu 3:** Điểm đánh đổi lớn nhất của S3 Express One Zone là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Availability thấp hơn vì chỉ nằm trong một AZ.
Giải thích: Nếu AZ gặp sự cố, bạn bị ảnh hưởng trực tiếp.
Tham chiếu: Mục Hiệu năng và bài toán đánh đổi.

</details>

**Câu 4:** Độ trễ và khả năng xử lý request của class này ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hàng trăm nghìn request mỗi giây với độ trễ một chữ số mili-giây.
Giải thích: Đây là mức hiệu năng rất cao, phù hợp ứng dụng nhạy cảm độ trễ.
Tham chiếu: Mục Hiệu năng và bài toán đánh đổi.

</details>

**Câu 5:** Kể tên các dịch vụ tích hợp tốt nhất với S3 Express One Zone.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** SageMaker Model Training, Athena, EMR và Glue.
Giải thích: Đây là các dịch vụ dữ liệu được nhắc trong bài.
Tham chiếu: Mục Dùng cho ai và tích hợp với gì.

</details>

---

Vậy là các bạn đã hiểu vì sao S3 Express One Zone cần một bài riêng: hiệu năng vượt trội nhưng gắn chặt với một AZ duy nhất. *Hãy nhớ con số "10 lần hiệu năng, rẻ hơn 50%" — rất dễ gặp trong đề.*

Bài tiếp theo chúng ta sẽ tìm hiểu **S3 Encryption** và hai mô hình mã hóa dữ liệu. Hẹn gặp các bạn ở đó! 🚀
