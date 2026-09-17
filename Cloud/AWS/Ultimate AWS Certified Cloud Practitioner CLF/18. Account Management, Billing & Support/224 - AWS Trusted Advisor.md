# 🛡️ AWS Trusted Advisor: Trợ lý rà soát tài khoản AWS

> Nguồn: `224-AWS-Trusted-Advisor.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056418)

**AWS Trusted Advisor** là dịch vụ cho bạn một **đánh giá tổng quan (high-level account assessment)** về tài khoản AWS — không cần cài đặt gì cả. Nó kiểm tra tài khoản của bạn và đưa ra lời khuyên, và đây là kiến thức chắc chắn có trong đề thi.

---

### 🔍 Trusted Advisor kiểm tra những gì?

Các **check (bài kiểm tra)** của Trusted Advisor xoay quanh những câu hỏi như:

* Bạn có **EBS Public Snapshots** không?
* Bạn có **RDS Public Snapshots** không?
* Bạn có đang **dùng root account** cho tài khoản của mình không?

Tất cả các check này được nhóm thành **sáu category**:

1. **Cost optimization (tối ưu chi phí)**
2. **Performance (hiệu năng)**
3. **Security (bảo mật)**
4. **Fault tolerance (chịu lỗi)**
5. **Service limits (giới hạn dịch vụ)**
6. **Operational excellence (vận hành xuất sắc)**

---

### 🗂️ Core checks và Full checks

Trusted Advisor có hai bộ check:

* **Core checks** — bộ kiểm tra cốt lõi.
* **Full checks** — bộ kiểm tra đầy đủ.

Để dùng **full set of checks**, bạn cần có gói **Business hoặc Enterprise support plan**. Đặc biệt hơn, khi dùng Business hoặc Enterprise, bạn còn được **truy cập Trusted Advisor bằng API thông qua AWS Support API (programmatic access)**.

| Tiêu chí | Core checks | Full checks |
|---|---|---|
| Điều kiện | Có sẵn khi dùng Trusted Advisor | Cần Business hoặc Enterprise support plan |
| Phạm vi | Chủ yếu nhóm Security và Service limits | Đủ cả sáu nhóm kiểm tra |
| Truy cập API | Không | Có, qua AWS Support API |

---

### 🧪 Trusted Advisor trong thực tế

Trong console, mình thấy Trusted Advisor đưa ra **recommendations**:

* **0 action** được khuyến nghị.
* **2 investigation (điều tra)** cần xem xét — cả hai thuộc nhóm **Security**: một bucket của mình đang **cho phép truy cập toàn cầu (global access)**, và **29 trong số 60 security group rule** cho phép truy cập không giới hạn vào một port cụ thể. *Có thể đó là chủ ý, nhưng cũng có thể là lỗ hổng — mình cần kiểm tra lại.*

Điểm đáng chú ý: vì tài khoản demo dùng gói support cơ bản, mình bị nhắc **nâng cấp support plan** để mở toàn bộ check. Cụ thể:

* Các nhóm **Cost optimization, Performance, Fault tolerance, Operational excellence** — không có check nào khả dụng.
* Chỉ nhóm **Security** có **core checks**: Bucket Permissions, Security Group Ports, EBS Public Snapshot, RDS Public Snapshot...
* Muốn xem **advanced security checks** — lại phải nâng cấp gói.

Ngoài ra, bạn có thể xem **Service limits** ngay trong Trusted Advisor: **Auto Scaling Groups, CloudFormation Stacks, DynamoDB Read và Write Capacity**...

Tóm lại, Trusted Advisor **không thú vị lắm nếu bạn không trả tiền cho support plan**, nhưng ít nhất các bạn đã hiểu nó hoạt động thế nào để trả lời đúng câu hỏi trong đề thi.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Trusted Advisor có cần cài đặt gì không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — đây là dịch vụ có sẵn, không cần cài đặt.

Giải thích: Nó đưa ra đánh giá tổng quan về tài khoản của bạn.

Tham chiếu: Mục Trusted Advisor kiểm tra những gì.

</details>

**Câu 2:** Trusted Advisor có bao nhiêu nhóm kiểm tra và gồm những nhóm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Sáu nhóm: cost optimization, performance, security, fault tolerance, service limits và operational excellence.

Giải thích: Mỗi nhóm gồm nhiều check cụ thể.

Tham chiếu: Mục Trusted Advisor kiểm tra những gì.

</details>

**Câu 3:** Muốn dùng full set of checks cần gói support nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Business hoặc Enterprise support plan.

Giải thích: Gói thấp hơn chỉ có core checks.

Tham chiếu: Mục Core checks và Full checks.

</details>

**Câu 4:** Programmatic access (truy cập bằng API) đến Trusted Advisor có được qua đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS Support API — khi dùng gói Business hoặc Enterprise.

Giải thích: Đây là quyền lợi đi kèm gói support cao.

Tham chiếu: Mục Core checks và Full checks.

</details>

**Câu 5:** Kể tên vài check ví dụ mà Trusted Advisor thực hiện?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** EBS Public Snapshots, RDS Public Snapshots, dùng root account; ngoài ra còn Bucket Permissions, Security Group Ports...

Giải thích: Các check này tập trung vào bảo mật và giới hạn dịch vụ.

Tham chiếu: Mục Trusted Advisor kiểm tra những gì và Mục Trusted Advisor trong thực tế.

</details>

---

Vậy là các bạn đã hiểu cách Trusted Advisor rà soát tài khoản AWS và vì sao gói support ảnh hưởng đến lượng check bạn được xem.

Ở bài tiếp theo, chúng ta sẽ so sánh chi tiết các gói **Support Plans** của AWS. Hẹn gặp các bạn ở đó! 🚀
