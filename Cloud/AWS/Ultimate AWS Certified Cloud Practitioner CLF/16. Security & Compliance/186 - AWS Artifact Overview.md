# 📜 AWS Artifact: Tải báo cáo compliance chỉ với vài cú click

> Nguồn: `186-Artifact-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056324)

**AWS Artifact** là cái tên cuối cùng trong section Security & Compliance, và cũng là một trong những dịch vụ "dễ ăn điểm" nhất: đề thi chỉ hỏi bạn nó dùng để làm gì. Nếu bạn từng cần chứng minh với khách hàng hoặc auditor rằng hệ thống trên AWS đạt chuẩn bảo mật, đây chính là công cụ dành cho bạn.

---

### 🎯 Artifact có thật sự là một service không?

Về bản chất, **AWS Artifact không hẳn là một dịch vụ** — nhưng nó được AWS **trình bày như một service trong console**.

Vậy nó là gì? Đây là một **portal (cổng thông tin)** cho phép khách hàng **truy cập theo yêu cầu (on-demand)** vào:

* **Compliance reports (báo cáo tuân thủ)**
* **AWS agreements (các thỏa thuận của AWS)**

Mọi thứ đều có thể **tải về (download)** — và đây là **dịch vụ toàn cầu (global service)**.

---

### 📊 Reports — báo cáo từ các auditor bên thứ ba

Các **Artifact reports** mà bạn tải về chính là **tài liệu bảo mật và tuân thủ do các third-party auditors (đơn vị kiểm toán độc lập) cấp**, ví dụ:

* **ISO certifications** — các chứng nhận ISO.
* **PCI reports** — báo cáo theo tiêu chuẩn Payment Card Industry (ngành thẻ thanh toán).
* **SOC reports** — báo cáo kiểm soát hệ thống.

Trên console, mình thấy có **61 reports** sẵn sàng để tải. Khi bấm tải một báo cáo, bạn chỉ cần **accept NDA (chấp nhận thỏa thuận bảo mật)** là xong.

---

### 📝 Agreements — thỏa thuận bạn có thể accept

**Artifact agreements** cho phép bạn **xem xét (review)**, **chấp nhận (accept)** và **theo dõi trạng thái (track status)** của các thỏa thuận AWS, ví dụ:

* **BAA (Business Associate Agreement)** — thỏa thuận dành cho lĩnh vực y tế.
* **HIPAA (Health Insurance Portability and Accountability Act)** — *chuẩn y tế này có thể xuất hiện trong đề thi*, áp dụng cho tài khoản cá nhân hoặc trong organization của bạn.

Các thỏa thuận này hữu ích khi bạn cần:

* Hỗ trợ **internal audit (kiểm toán nội bộ)** trong công ty.
* **Chứng minh compliance** khi dùng AWS cloud với khách hàng, đối tác.

---

### 🧪 Thao tác nhanh trên console

Trong console AWS Artifact:

1. Bạn có thể chọn **view reports** hoặc **view agreements**.
2. Vào **Reports**: thấy **61 reports**, chọn một báo cáo, bấm tải, **accept NDA** — thế là có file dùng cho compliance nội bộ.
3. Vào **Agreements**: thấy **3 account agreements** và **không có organization agreements**.
4. Ví dụ mình chọn **BAA agreement**, bấm **accept**, cuộn xuống xác nhận rồi **download** — xong.

*Đơn giản đến mức khó tin, đúng không?* Cách duy nhất để nhớ Artifact cho đề thi là: **tải compliance reports + agreements**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** AWS Artifact là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một portal cho phép truy cập on-demand các compliance reports và AWS agreements.
Giải thích: Nó không hẳn là một service, nhưng được AWS giới thiệu như một service trong console.
Tham chiếu: Mục Artifact có thật sự là một service không.

</details>

**Câu 2:** Các report trên Artifact đến từ đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Từ các third-party auditors (kiểm toán bên thứ ba).
Giải thích: Gồm ISO certifications, PCI reports và SOC reports.
Tham chiếu: Mục Reports — báo cáo từ các auditor bên thứ ba.

</details>

**Câu 3:** Artifact agreements cho phép bạn làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Review, accept và track status các thỏa thuận như BAA hoặc HIPAA.
Giải thích: Thỏa thuận áp dụng cho tài khoản cá nhân hoặc trong organization.
Tham chiếu: Mục Agreements — thỏa thuận bạn có thể accept.

</details>

**Câu 4:** Khi tải một report trên Artifact, bạn cần chấp nhận gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chấp nhận NDA.
Giải thích: Sau khi accept NDA là bạn có thể download báo cáo về dùng.
Tham chiếu: Mục Reports — báo cáo từ các auditor bên thứ ba.

</details>

**Câu 5:** Artifact reports được dùng để làm gì trong doanh nghiệp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hỗ trợ internal audit và chứng minh compliance khi dùng AWS cloud.
Giải thích: Đây là tài liệu bảo mật, tuân thủ chính thức để xuất trình.
Tham chiếu: Mục Agreements — thỏa thuận bạn có thể accept.

</details>

---

Vậy là các bạn đã đi hết một loạt dịch vụ bảo mật của AWS: từ **Shared Responsibility Model**, **Shield/WAF**, **Network Firewall**, **Firewall Manager**, **Pen testing**, **KMS/CloudHSM**, **ACM**, **Secrets Manager** đến **Artifact**. *Cứ từng bước một, các bạn đang xây dựng nền tảng vững chắc cho kỳ thi đấy!*

Section Security & Compliance vẫn còn nhiều điều thú vị phía trước. Hẹn gặp các bạn ở bài tiếp theo! 🚀
