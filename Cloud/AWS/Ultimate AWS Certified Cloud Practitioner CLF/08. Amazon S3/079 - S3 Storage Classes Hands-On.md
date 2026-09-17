# 🧊 Thực hành S3 Storage Classes: Đổi lớp lưu trữ và tự động hóa bằng Lifecycle Rule

> Nguồn: `079-S3-Storage-Classes-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055952)

Ở bài trước chúng ta đã nắm lý thuyết về storage class. Hôm nay mình cùng **thực hành trực tiếp**: tạo bucket, upload object, xem và đổi storage class, rồi thiết lập **lifecycle rule** để AWS tự động chuyển dữ liệu giữa các tầng.

---

### 🗂️ Tạo bucket và xem danh sách storage class

1. Tạo bucket mới, đặt tên **s3-storage-classes-demos-2022**, chọn region bất kỳ rồi tạo.
2. Vào bucket → **Upload** → **Add files** → chọn **coffee.JPEG**.
3. Mở **Properties** của object: mục **Storage class** hiển thị toàn bộ storage class dành cho object trên S3.
4. Mỗi class đi kèm **4 cột thông tin** cần chú ý:
   * Số lượng **AZ** mà class sử dụng
   * **Minimum storage duration** — thời gian lưu trữ tối thiểu
   * **Minimum billable object size** — kích thước object tối thiểu bị tính phí
   * Phí **monitoring và auto-tiering**

Mặc định, object mới thuộc class **S3 Standard**.

---

### 💡 Điểm mặt các storage class

* **S3 Standard** — lớp cơ bản, mặc định.
* **S3 Intelligent-Tiering** — dành cho khi bạn chưa biết pattern truy cập dữ liệu và muốn AWS tự phân tầng giúp bạn.
* **S3 Standard-IA** — dữ liệu ít truy cập nhưng vẫn cần độ trễ thấp.
* **S3 One Zone-IA** — dữ liệu có thể tạo lại được, chỉ lưu ở **một AZ**; nếu AZ bị hủy, object có nguy cơ bị mất.
* **Ba lớp Glacier**: Glacier Instant Retrieval, Glacier Flexible Retrieval và Glacier Deep Archive.
* **Reduced Redundancy** — lớp đã **deprecated (ngừng hỗ trợ)**, không được mô tả trong khóa học.

---

### ✏️ Đổi storage class cho object đã upload

* Lúc upload, mình chọn **Standard-IA**; object hiển thị đúng class này trong bucket.
* Vào **Properties**, scroll xuống, chọn **Edit storage class**:
  1. Đổi sang **One-Zone-IA** → Save changes. Object giờ chỉ nằm trong một zone duy nhất.
  2. Có thể sửa tiếp sang **Glacier Instant Retrieval** để archive object.
  3. Hoặc chọn **Intelligent-Tiering** để AWS tự xếp đúng tầng theo pattern truy cập.

*Sức mạnh của storage class nằm ở chỗ bạn có thể chuyển đổi qua lại giữa các lớp bất cứ lúc nào.*

---

### ⏳ Tự động hóa chuyển tầng bằng Lifecycle Rule

1. Vào bucket → **Management** → **Create lifecycle rule**.
2. Đặt tên rule, ví dụ **DemoRule**, áp dụng cho toàn bộ object trong bucket.
3. Chọn transition cho **current versions**:
   * Sau **30 ngày** → **Standard-IA**
   * Sau **60 ngày** → **Intelligent-Tiering**
   * Sau **180 ngày** → **Glacier Flexible Retrieval**
4. Review toàn bộ transition rồi lưu. AWS sẽ tự động di chuyển object giữa các tầng thay bạn.

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Storage class mặc định của object mới là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 Standard.
Giải thích: Đây là lớp cơ bản mặc định nếu bạn không chọn class khác khi upload.
Tham chiếu: Mục Tạo bucket và xem danh sách storage class.

</details>

**Câu 2:** Class nào dành cho dữ liệu ít truy cập nhưng vẫn cần độ trễ thấp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 Standard-IA.
Giải thích: IA là Infrequent Access — ít truy cập nhưng vẫn giữ low latency.
Tham chiếu: Mục Điểm mặt các storage class.

</details>

**Câu 3:** Rủi ro của S3 One Zone-IA là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Object có thể bị mất nếu AZ duy nhất bị hủy.
Giải thích: Class này chỉ lưu dữ liệu ở một AZ, phù hợp với dữ liệu có thể tạo lại được.
Tham chiếu: Mục Điểm mặt các storage class.

</details>

**Câu 4:** Vì sao Reduced Redundancy không được dạy trong khóa?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì đây là lớp đã deprecated.
Giải thích: Giảng viên không mô tả lớp này trong khóa học.
Tham chiếu: Mục Điểm mặt các storage class.

</details>

**Câu 5:** Lifecycle rule DemoRule chuyển object sang Standard-IA sau bao nhiêu ngày?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 30 ngày.
Giải thích: Sau 60 ngày chuyển tiếp sang Intelligent-Tiering và 180 ngày sang Glacier Flexible Retrieval.
Tham chiếu: Mục Tự động hóa chuyển tầng bằng Lifecycle Rule.

</details>

---

Vậy là các bạn đã thực hành trọn vẹn storage class: xem, đổi thủ công và tự động hóa bằng lifecycle rule. *Nhớ kỹ các mốc 30/60/180 ngày nhé — những con số này rất dễ xuất hiện trong đề thi.*

Ở bài tiếp theo, mình sẽ giới thiệu một storage class "đặc biệt" — **S3 Express One Zone**. Hẹn gặp các bạn ở đó! 🚀
