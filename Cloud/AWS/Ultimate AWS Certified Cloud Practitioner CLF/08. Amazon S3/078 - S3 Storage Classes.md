# 🧊 Các Storage Class của Amazon S3: Từ Standard đến Deep Archive

> Nguồn: `078-S3-Storage-Classes-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055948)

Amazon S3 có rất nhiều **storage class (lớp lưu trữ)** với mức giá và tốc độ truy xuất khác nhau. Bài này mình sẽ đi qua từng class — và nhớ nhé, **các bạn cần biết chúng cho kỳ thi**. Khi tạo object, bạn chọn class; có thể sửa thủ công; hoặc dùng **S3 Lifecycle configurations** để tự động chuyển object giữa các class.

---

### 🗂️ Bảy storage class của Amazon S3

1. **S3 Standard — General Purpose**.
2. **S3 Infrequent Access (Standard-IA)**.
3. **S3 One Zone-Infrequent Access (One Zone-IA)**.
4. **Glacier Instant Retrieval**.
5. **Glacier Flexible Retrieval**.
6. **Glacier Deep Archive**.
7. **S3 Intelligent-Tiering**.

---

### 🛡️ Durability và Availability — hai khái niệm nền tảng

**Durability (độ bền)** nói về việc object **có bị mất hay không**. S3 có durability cực cao: **11 nines (99.999999999%)**. Nghĩa là nếu bạn lưu **10 triệu object**, trung bình bạn chỉ mất **1 object mỗi 10.000 năm**. **Durability giống nhau ở mọi storage class.**

**Availability (độ sẵn sàng)** là mức độ sẵn sàng phục vụ, **phụ thuộc vào storage class**:

* **S3 Standard: 99.99% availability** — tương đương khoảng **53 phút mỗi năm** dịch vụ không sẵn sàng, bạn sẽ gặp lỗi khi thao tác. Hãy tính đến điều này khi phát triển ứng dụng.

---

### 💰 Chi tiết từng nhóm storage class

**S3 Standard** — class mặc định, dành cho dữ liệu **truy cập thường xuyên**; **low latency, high throughput**; chịu được **2 concurrent facility failures (sự cố hạ tầng đồng thời)**. Use case: big data analytics, mobile & gaming, content distribution.

**S3 Standard-IA (Infrequent Access)** — dữ liệu **ít truy cập hơn** nhưng cần truy xuất **nhanh khi cần**; chi phí lưu **thấp hơn** Standard nhưng **tốn phí khi retrieval (lấy dữ liệu về)**. Availability **99.9%**. Use case: disaster recovery, backups.

**S3 One Zone-IA** — chỉ nằm trong **một AZ (Availability Zone)**; dữ liệu **sẽ mất nếu AZ đó bị phá hủy**; availability thấp hơn: **99.5%**. Use case: bản sao phụ của backup, dữ liệu on-premises, hoặc dữ liệu **có thể tạo lại được**.

**Glacier — nhóm lưu trữ "lạnh"**, chi phí thấp, dành cho **archiving và backup**; bạn trả tiền lưu trữ **cộng thêm phí retrieval**:

* **Glacier Instant Retrieval** — truy xuất trong **milliseconds**, phù hợp dữ liệu **truy cập mỗi quý**; **thời gian lưu tối thiểu 90 ngày**.
* **Glacier Flexible Retrieval** — từng có tên là *Amazon S3 Glacier* và được đổi tên khi AWS thêm tier mới. Ba lựa chọn retrieval: **Expedited 1–5 phút**, **Standard 3–5 giờ**, **Bulk miễn phí 5–12 giờ**; lưu tối thiểu **90 ngày**.
* **Glacier Deep Archive** — dành cho **lưu trữ dài hạn**, chi phí **thấp nhất**; hai tier retrieval: **Standard 12 giờ** và **Bulk 48 giờ**; lưu tối thiểu **180 ngày**.

**S3 Intelligent-Tiering** — tự động **di chuyển object giữa các access tier dựa trên usage pattern**, không có **retrieval charges**, nhưng có **phí monitoring hàng tháng** và **auto tiering fee**. Các tier:

* **Frequent Access** — mặc định, tự động.
* **Infrequent Access** — tự động cho object không được truy cập **30 ngày**.
* **Archive Instant Access** — tự động cho object không truy cập **hơn 90 ngày**.
* **Archive Access** — tùy chọn, cấu hình từ **90 đến hơn 700 ngày**.
* **Deep Archive Access** — tùy chọn, cho object không truy cập từ **180 đến hơn 700 ngày**.

*Nói ngắn gọn: Intelligent-Tiering cho bạn "ngồi chơi" trong khi S3 tự sắp xếp object.*

---

### 📊 Bảng so sánh nhanh

| Storage class | Availability | Lưu tối thiểu | Phù hợp cho |
|---|---|---|---|
| Standard | 99.99% | — | Dữ liệu truy cập thường xuyên |
| Standard-IA | 99.9% | — | Disaster recovery, backups |
| One Zone-IA | 99.5% | — | Bản sao phụ, dữ liệu tái tạo được |
| Glacier Instant Retrieval | — | 90 ngày | Truy cập mỗi quý, cần milliseconds |
| Glacier Flexible Retrieval | — | 90 ngày | Archive, chờ từ phút đến giờ |
| Glacier Deep Archive | — | 180 ngày | Lưu dài hạn, chi phí thấp nhất |
| Intelligent-Tiering | — | — | Tự động chuyển tier theo usage |

Durability là **11 nines ở mọi class**. *Bạn **không cần nhớ** các con số và bảng pricing (ví dụ pricing ở us-east-1) — chỉ cần hiểu ý nghĩa và tên của từng class là đủ.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Durability của Amazon S3 là bao nhiêu và có khác nhau giữa các class không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 11 nines (99.999999999%) và giống nhau ở mọi storage class.

Giải thích: 10 triệu object thì trung bình mất 1 object mỗi 10.000 năm.

Tham chiếu: Mục Durability và Availability.

</details>

**Câu 2:** S3 Standard có availability bao nhiêu và tương đương bao lâu mỗi năm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 99.99% — khoảng 53 phút mỗi năm dịch vụ không sẵn sàng.

Giải thích: Availability phụ thuộc vào storage class.

Tham chiếu: Mục Durability và Availability.

</details>

**Câu 3:** Storage class nào có chi phí thấp nhất cho lưu trữ dài hạn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Glacier Deep Archive.

Giải thích: Đổi lại, retrieval mất 12 giờ (Standard) hoặc 48 giờ (Bulk).

Tham chiếu: Mục Chi tiết từng nhóm storage class.

</details>

**Câu 4:** Glacier Deep Archive có thời gian lưu tối thiểu bao lâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 180 ngày.

Giải thích: Glacier Instant Retrieval và Flexible Retrieval là 90 ngày.

Tham chiếu: Mục Chi tiết từng nhóm storage class.

</details>

**Câu 5:** Intelligent-Tiering có thu retrieval charges không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — nhưng có phí monitoring hàng tháng và auto tiering fee.

Giải thích: Class này tự động chuyển object giữa các tier theo usage.

Tham chiếu: Mục Chi tiết từng nhóm storage class.

</details>

---

Vậy là các bạn đã đi hết bảy storage class, hiểu durability vs availability và biết khi nào dùng class nào. *Đừng cố nhớ bảng giá — hãy hiểu tên và mục đích của từng class, thế là đủ cho đề thi.*

Ở bài sau, chúng ta sẽ vào console thực hành chuyển đổi giữa các storage class. Hẹn gặp lại! 🚀
