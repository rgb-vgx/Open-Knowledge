# 🪣 Amazon S3: Tổng quan "kho lưu trữ vô hạn" của AWS

> Nguồn: `068-S3-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055904)

Chào mừng các bạn đến với section **Amazon S3** — một trong những section quan trọng nhất của khóa học. **S3 (Simple Storage Service — dịch vụ lưu trữ đối tượng)** là một trong những viên gạch nền tảng của AWS và được quảng cáo là **khả năng lưu trữ vô hạn (infinitely scaling storage)**. Rất nhiều website trên thế giới đang chạy dựa trên S3, và rất nhiều dịch vụ AWS khác cũng tích hợp với S3.

Trong section này, chúng ta sẽ đi từng bước qua các tính năng chính của S3. *Đừng lo nếu bạn chưa từng dùng dịch vụ lưu trữ nào — mình sẽ giải thích mọi thứ từ đầu.*

---

### 🎯 Vì sao S3 quan trọng và các use case chính

Vì bản chất cốt lõi của S3 là **storage (lưu trữ)**, nó có vô số use case:

* **Backup và storage** — lưu file của bạn, ổ đĩa, dữ liệu...
* **Disaster recovery (khôi phục sau thảm họa)** — chuyển dữ liệu sang region khác; nếu một region gặp sự cố, dữ liệu vẫn được sao lưu ở nơi khác.
* **Archival (lưu trữ dài hạn)** — archive file vào S3 và lấy lại sau này với chi phí rẻ hơn rất nhiều.
* **Hybrid cloud storage** — khi bạn có storage on-premises (tại chỗ) và muốn mở rộng lên cloud.
* **Host ứng dụng và media** — video, hình ảnh...
* **Data lake** để lưu lượng lớn dữ liệu và chạy **big data analytics**.
* **Phân phối software updates**.
* **Host static website**.

Hai ví dụ thực tế đáng nhớ: **NASDAQ** lưu **7 năm dữ liệu** trong **S3 Glacier** — dịch vụ archival của S3; còn **Sysco** chạy analytics trên dữ liệu và thu về insight kinh doanh từ Amazon S3.

---

### 🪣 Bucket — "thư mục" trên cloud

Amazon S3 cho phép các bạn lưu **object (file)** vào **bucket (thùng chứa)** — hiểu đơn giản như các directory trong cloud. Điều quan trọng nhất cần nhớ: **bucket được định nghĩa ở cấp region**. Giao diện S3 là **global** — bạn nhìn thấy bucket từ mọi region — nhưng mỗi bucket thực chất thuộc về **một region cụ thể**.

Về naming, có một thay đổi mới các bạn cần biết:

* **Trước đây:** tên bucket phải **globally unique (duy nhất toàn cầu)** — trên toàn thế giới, mọi region, mọi tài khoản.
* **Bây giờ:** có thêm **account regional namespace** — bạn có thể dùng lại cùng một tên bucket giữa các region và tài khoản; AWS tự thêm suffix để đảm bảo tên vẫn duy nhất.

Các ràng buộc đặt tên bucket:

* Không dùng **chữ in hoa**, không dùng **underscore**; không được là **địa chỉ IP**.
* Phải bắt đầu bằng **chữ thường hoặc chữ số**.
* Không bắt đầu bằng prefix **xn--**.
* Không kết thúc bằng hậu tố **-s3alias**.

*Cứ dùng chữ thường với chữ số và giữ mọi thứ đơn giản — bạn sẽ không gặp vấn đề gì.*

---

### 📄 Object, key và những con số cần nhớ

Object là những file bạn upload lên, và mỗi object có một **key** — chính là **full path của file**. Ví dụ file `my_file.txt` ở thư mục gốc có key là `my_file.txt`; nếu lồng trong folder thì key là `my_folder/another_folder/my_file.txt`. Một key gồm **prefix** (phần đường dẫn) và **object name** (tên file).

Điều thú vị: **S3 không thực sự có khái niệm directory**. Trên console bạn sẽ thấy folder và tưởng rằng mình đang tạo thư mục, nhưng thực chất mọi thứ đều là **key** — những cái tên rất dài có chứa dấu slash.

Các con số quan trọng cho đề thi:

* **Kích thước object tối đa: 50 TB**.
* File **lớn hơn 5 GB** bắt buộc dùng **multi-part upload (upload nhiều phần)**. Ví dụ file **5 TB** phải upload **ít nhất 1.000 phần**, mỗi phần 5 GB.
* Object có **metadata** — các cặp key-value do hệ thống hoặc người dùng đặt.
* Object có **tags** — cặp Unicode key-value, **tối đa 10**, rất hữu ích cho **security** và **lifecycle**.
* Object có **version ID** nếu bạn bật **versioning**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Bucket của Amazon S3 được định nghĩa ở cấp nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cấp region.

Giải thích: Dù giao diện S3 là global và hiển thị bucket từ mọi region, mỗi bucket được tạo trong một region cụ thể.

Tham chiếu: Mục Bucket — thư mục trên cloud.

</details>

**Câu 2:** Kích thước tối đa của một object trên S3 là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 50 TB.

Giải thích: File lớn hơn 5 GB bắt buộc dùng multi-part upload.

Tham chiếu: Mục Object, key và những con số cần nhớ.

</details>

**Câu 3:** Một file 5 TB phải được upload thành ít nhất bao nhiêu phần?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ít nhất 1.000 phần, mỗi phần 5 GB.

Giải thích: File lớn hơn 5 GB phải dùng multi-part upload.

Tham chiếu: Mục Object, key và những con số cần nhớ.

</details>

**Câu 4:** Số tag tối đa trên một object S3 là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 10.

Giải thích: Tag là cặp Unicode key-value, hữu ích cho security và lifecycle.

Tham chiếu: Mục Object, key và những con số cần nhớ.

</details>

**Câu 5:** NASDAQ lưu 7 năm dữ liệu ở dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 Glacier — dịch vụ archival của Amazon S3.

Giải thích: Đây là ví dụ thực tế về use case archival của S3.

Tham chiếu: Mục Vì sao S3 quan trọng và các use case chính.

</details>

---

Vậy là các bạn đã nắm được bức tranh tổng quan về Amazon S3: bucket, object, key và những con số quan trọng. Đây là nền tảng cho toàn bộ section này đấy nhé — *hãy đảm bảo bạn nắm chắc trước khi đi tiếp*.

Ở bài sau, chúng ta sẽ vào AWS console và tự tay tạo bucket đầu tiên, upload file và khám phá object. Hẹn gặp các bạn ở đó! 🚀
