# 🧭 Tổng kết Security & Compliance: Bản đồ ôn thi trong một bài

> Nguồn: `196-Security-Compliance-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20237316)

Chúng ta đã đi qua một section **rất dài** — mình biết điều đó, và có rất nhiều thứ phải nhớ. Vì vậy bài này sẽ là **bản đồ tổng kết** toàn bộ Security & Compliance, giúp các bạn ôn nhanh trước khi bước sang phần tiếp theo. *Đừng lo nếu thấy nhiều — chỉ cần nắm các cặp "dịch vụ ↔ mục đích" là bạn đã đi được nửa chặng đường rồi!*

---

### 🔐 Bảo mật hạ tầng & mã hóa

* **Shared Responsibility Model (Mô hình trách nhiệm chung)** — đã được nhắc xuyên suốt khóa học, các bạn cần nắm chắc.
* **Shield** — lớp bảo vệ **DDoS tự động**; nếu dùng **Shield Advanced** thì được hỗ trợ **24/7**.
* **WAF (Web Application Firewall)** — firewall **lọc các request đến** dựa trên những **rule cụ thể**.
* **KMS** — quản lý **encryption key** của bạn trên AWS.
* **CloudHSM** — mã hóa bằng **hardware**; lần này **không phải AWS quản lý key** mà chính chúng ta quản lý encryption key — **AWS chỉ quản lý phần hardware** phía sau.
* **ACM (AWS Certificate Manager)** — **cung cấp, quản lý và triển khai chứng chỉ SSL/TLS**, giúp có **in-flight encryption (mã hóa trên đường truyền)**.
* **Artifact** — nơi truy cập các **compliance reports (báo cáo tuân thủ)** như **PCI**, **ISO**...

---

### 🕵️ Phát hiện, giám sát & xử lý sự cố

| Cần gì? | Dịch vụ |
|---|---|
| Phát hiện hành vi độc hại | **GuardDuty** — phân tích VPC logs, DNS logs, CloudTrail logs |
| Tìm lỗ hổng phần mềm | **Inspector** — EC2, container image trên ECR, Lambda |
| Bảo vệ VPC khỏi tấn công mạng | **Network Firewall** |
| Theo dõi thay đổi cấu hình & compliance | **Config** — kèm các Config rules |
| Tìm dữ liệu nhạy cảm | **Macie** — PII trong S3 buckets |
| Theo dõi API call của người dùng | **CloudTrail** |
| Gom findings từ nhiều dịch vụ, nhiều tài khoản | **Security Hub** |
| Truy nguyên nhân gốc thật nhanh | **Detective** — liên kết các dịch vụ lại với nhau |

*Một cặp bài trùng cần nhớ: Security Hub gom findings — Detective đi tìm root cause.*

---

### 🧑⚖️ Con người & quyền hạn

* **AWS Abuse team** — nơi bạn báo cáo hành vi lạm dụng tài nguyên AWS cho mục đích bất hợp pháp; qua **form** hoặc **email**.
* **Root user** — 4 việc quan trọng nhất cần nhớ: **thay đổi account settings**, **đóng tài khoản AWS**, **thay đổi/hủy AWS Support plan**, **đăng ký làm seller trên Reserved Instance Marketplace**.
* **IAM Access Analyzer** — xác định tài nguyên nào đang được chia sẻ ra bên ngoài, tức **ngoài zone of trust**.
* **Firewall Manager** — quản lý **security rules trong toàn organization**: cho **security group**, **WAF**, **Shield**...

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Bốn hành động quan trọng nhất mà chỉ root user làm được là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thay đổi account settings, đóng tài khoản AWS, thay đổi/hủy AWS Support plan, đăng ký seller trên Reserved Instance Marketplace.
Giải thích: Đây là nhóm câu hỏi rất hay gặp trong đề. Tham chiếu: Mục Con người & quyền hạn.

</details>

**Câu 2:** Dịch vụ nào tìm lỗ hổng trong EC2, container image trên ECR và Lambda?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Inspector.
Giải thích: Inspector quét CVE cho cả ba loại tài nguyên này. Tham chiếu: Mục Phát hiện, giám sát & xử lý sự cố.

</details>

**Câu 3:** Dịch vụ nào gom findings từ nhiều dịch vụ và nhiều tài khoản AWS về một nơi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS Security Hub.
Giải thích: Security Hub là hub trung tâm; Detective dùng để truy root cause. Tham chiếu: Mục Phát hiện, giám sát & xử lý sự cố.

</details>

**Câu 4:** Macie dùng để làm gì và trên dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tìm dữ liệu nhạy cảm (ví dụ PII — thông tin cá nhân) trong Amazon S3 buckets.
Giải thích: Macie dùng machine learning và pattern matching. Tham chiếu: Mục Phát hiện, giám sát & xử lý sự cố.

</details>

**Câu 5:** Khi nghi ngờ tài nguyên AWS bị dùng cho mục đích lạm dụng hoặc bất hợp pháp, bạn nên làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Liên hệ AWS Abuse team — qua form trực tuyến hoặc email.
Giải thích: Đây là kênh chính thức để báo cáo. Tham chiếu: Mục Con người & quyền hạn.

</details>

---

*Các bạn đã đi hết một section dài — hãy tự thưởng cho mình một tràng pháo tay!* Những kiến thức này không chỉ để thi mà còn dùng ngay trong công việc hằng ngày.

Ở phần tiếp theo, chúng ta sẽ bước sang nội dung mới trong hành trình chinh phục **CLF-C02**. Cứ từng bước một, mình đồng hành cùng các bạn. Hẹn gặp lại! 🚀
