# 🌐 Host website tĩnh trên Amazon S3: Tổng quan

> Nguồn: `072-S3-Website-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055922)

Bạn có biết Amazon S3 có thể biến bucket của bạn thành một **website truy cập được từ internet**? Bài này mình sẽ giới thiệu tính năng **static website hosting** — bước đệm hoàn hảo cho bài thực hành ngay sau đó.

---

### 🌍 S3 host static website như thế nào?

S3 có thể **host các static website (website tĩnh)** và cho phép truy cập từ internet. Cấu trúc rất đơn giản:

* Một **bucket chứa file** — có thể là **HTML** hoặc **hình ảnh**.
* Bật tính năng tương thích với **website hosting** trên bucket.
* Người dùng truy cập bucket qua **website URL** tương ứng.

Một điểm thú vị: **website URL phụ thuộc vào AWS region** nơi bạn tạo bucket. Có hai dạng URL trông rất giống nhau, chỉ khác:

* Một dạng dùng **dấu gạch ngang (-)**.
* Một dạng dùng **dấu chấm (.)**.

*Các bạn không cần nhớ chi tiết này — chỉ cần biết URL phụ thuộc region là đủ.*

---

### 🔓 Điều kiện bắt buộc: public reads

Website sẽ **không hoạt động** nếu bucket chưa bật **public reads**. Đây chính là lý do chúng ta học **S3 bucket policy** ở bài trước.

Ghi nhớ dấu hiệu lỗi này:

* Nếu sau khi bật public reads cho bucket mà bạn gặp lỗi **403 Forbidden**, nghĩa là **bucket của bạn chưa public**.
* Cách xử lý: gắn một **S3 bucket policy cho phép public** — đúng như policy chúng ta đã tạo bằng Policy Generator.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon S3 có thể host loại website nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Static website (website tĩnh).

Giải thích: Bucket chứa HTML, images... và được bật website hosting.

Tham chiếu: Mục S3 host static website như thế nào.

</details>

**Câu 2:** Website URL của S3 phụ thuộc vào yếu tố nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS region nơi tạo bucket.

Giải thích: Hai dạng URL chỉ khác nhau dấu gạch ngang và dấu chấm.

Tham chiếu: Mục S3 host static website như thế nào.

</details>

**Câu 3:** Bucket cần điều kiện gì để website hoạt động?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Public reads — object phải được public.

Giải thích: Không có public reads, website sẽ không truy cập được.

Tham chiếu: Mục Điều kiện bắt buộc: public reads.

</details>

**Câu 4:** Lỗi 403 Forbidden khi mở website S3 nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bucket chưa public.

Giải thích: Cần gắn bucket policy cho phép public.

Tham chiếu: Mục Điều kiện bắt buộc: public reads.

</details>

**Câu 5:** Công cụ nào giúp bucket S3 trở nên public?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 bucket policy cho phép public access.

Giải thích: Đây là kiến thức từ bài S3 Security trước đó.

Tham chiếu: Mục Điều kiện bắt buộc: public reads.

</details>

---

Vậy là các bạn đã hiểu cách S3 host static website và điều kiện để website hoạt động. *Ngắn gọn thôi, nhưng đây là nền tảng cho bài thực hành tiếp theo.*

Ở bài sau, chúng ta sẽ bật static website hosting, upload file HTML và mở website đầu tiên của mình. Hẹn gặp các bạn! 🚀
