# 🔐 Amazon Macie: Tìm dữ liệu nhạy cảm trong S3 bằng machine learning

> Nguồn: `190-Macie-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056344)

Tiếp theo chương trình, chúng ta tìm hiểu **Amazon Macie** — dịch vụ chuyên săn tìm **dữ liệu nhạy cảm** trong các bucket S3 của bạn. Bài này rất ngắn, nhưng đây là dạng câu hỏi "định vị dịch vụ" rất phổ biến trong đề thi.

---

### 🧠 Macie là gì?

Macie là dịch vụ **fully managed (được quản lý hoàn toàn)** về **data security (bảo mật dữ liệu)** và **data privacy (quyền riêng tư dữ liệu)**. Nó sử dụng:

* **Machine learning (học máy)**.
* **Pattern matching (khớp mẫu)**.

Mục tiêu là **discover (khám phá)** và **protect (bảo vệ)** dữ liệu nhạy cảm trong AWS. Cụ thể, Macie cảnh báo các dữ liệu nhạy cảm như **PII (personally identifiable information — thông tin định danh cá nhân)**.

---

### 📁 Macie hoạt động như thế nào?

1. Dữ liệu **PII nằm trong các S3 bucket** của bạn.
2. Macie phân tích và **phát hiện dữ liệu nào được xếp loại là PII**.
3. Macie **thông báo cho bạn qua EventBridge** về các phát hiện.
4. Từ EventBridge, các bạn có thể tích hợp tiếp vào **SNS topic**, **Lambda function** và nhiều thứ khác.

Điều quan trọng cần nhớ: Macie **chỉ làm đúng một việc** — tìm dữ liệu nhạy cảm trong **S3 buckets**.

---

### ⚡ Bật Macie dễ như thế nào?

* Chỉ cần **một click** để bật.
* Bạn **chỉ định các S3 bucket** muốn theo dõi — thế là xong.

*Ngắn gọn vậy thôi, nhưng đủ để bạn "ăn điểm" nếu đề hỏi dịch vụ nào phát hiện PII trong S3.*

---

### 🗂️ Phân biệt nhanh GuardDuty — Inspector — Macie

| Dịch vụ | Tìm gì? | Phạm vi |
|---|---|---|
| **GuardDuty** | Mối đe dọa, hành vi độc hại | CloudTrail, VPC Flow Logs, DNS logs |
| **Inspector** | Lỗ hổng phần mềm (CVE) | EC2, ECR, Lambda |
| **Macie** | Dữ liệu nhạy cảm (PII) | S3 buckets |

---

Vậy là xong Macie: **fully managed, ML + pattern matching, S3 + PII, findings qua EventBridge**. *Một câu chốt dễ nhớ: Macie = "máy dò" dữ liệu nhạy cảm cho S3.*

Ở bài tiếp theo, chúng ta sẽ gặp **AWS Security Hub** — nơi hội tụ mọi findings bảo mật về một dashboard duy nhất. Hẹn gặp các bạn! 🚀
