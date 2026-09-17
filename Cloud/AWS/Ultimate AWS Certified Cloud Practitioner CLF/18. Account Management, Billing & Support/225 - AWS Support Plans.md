# 🎧 Các gói Support của AWS: Basic, Business Support+, Enterprise và Unified Operations

> Nguồn: `225-Support-Plans-for-AWS.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20118390)

Khi dùng AWS, bạn sẽ cần đến **hỗ trợ (support)** — và AWS có nhiều gói với mức giá, cam kết thời gian phản hồi và tính năng khác nhau. Trong bài này, mình đi qua từng gói: **Basic (miễn phí)**, **Business Support+**, **Enterprise Support** và **Unified Operations**. *Đề thi có hai câu hỏi khá dễ về việc chọn gói support, nên đây là bài không thể bỏ qua!*

Một điểm chung: các gói đều có **mức chi tiêu tối thiểu (minimum spend)** và cấu trúc giá dựa trên **số tiền bạn dùng (charges) và tỷ lệ phần trăm**. Nhưng quan trọng nhất vẫn là **tính năng** của từng gói.

---

### 🆓 Basic Support — miễn phí

* **Customer service & communities với quyền truy cập 24/7**, kèm **documentation, whitepapers và support forums**.
* **Trusted Advisor với 7 check**.
* **Guidance (hướng dẫn)** triển khai tài nguyên theo **best practices** để tăng hiệu năng và cải thiện bảo mật.
* **AWS Personal Health Dashboard** — góc nhìn cá nhân hóa về tình trạng dịch vụ, cảnh báo khi tài nguyên của bạn bị ảnh hưởng.

---

### 💼 Business Support+ — cho production workloads

* Phản hồi **real-time và theo ngữ cảnh (contextual)** thông qua **Generative AI**.
* **Trusted Advisor full checks** + **API access**.
* **24/7 access to Cloud Support Engineers** qua **phone, web và chat**.
* **Unlimited cases và unlimited contacts**.
* Cam kết **không quá 30 phút** để có người hỗ trợ thật xử lý sự cố **business-critical system down**.
* **Third-party software support** — ví dụ EC2 của bạn chạy **Ubuntu** thay vì Amazon Linux thì Cloud Support Engineers vẫn hỗ trợ được.

---

### 🏢 Enterprise Support — cho business-critical workloads

Gói này dành cho **production hoặc business-critical workloads**, bao gồm mọi tính năng của gói trước, cộng thêm:

* **Technical Account Manager (TAM) chỉ định riêng**.
* Cam kết phản hồi **dưới 15 phút** cho sự cố **production-critical**.
* **AWS Security Incident Response team** — hỗ trợ phục hồi sau sự cố bảo mật.
* **Business reviews** từ các chuyên gia AWS.
* **AWS Countdown event management** — hỗ trợ chuyên biệt do TAM dẫn dắt để bạn thành công trong các sự kiện kinh doanh quan trọng.

---

### 🛰️ Unified Operations — cho mission-critical workloads

Gói **Unified Operations** hoạt động 24/7, dành cho **mission-critical workloads**, gồm mọi tính năng của **Business Support+** và thêm:

* **Application Architecture Guidance** — tư vấn thiết kế kiến trúc phù hợp với use case và workload, thông qua một **engagement ngắn hạn** với AWS Support để phân tích sâu rồi đưa ra hướng dẫn.
* Đội ngũ chuyên gia chỉ định: **TAM**, **Domain Specialist Engineer (DSE)**, **Senior Billing and Account Specialist (SBAS)**, **Incident Management Engineer (IME)**, **Migration Specialist on-demand**, **Specialist Support Engineer (SSE)**.
* **AWS Countdown Premium** và **AWS Customer Incident Response Team (CIRT)**.
* **Critical workloads review** và **operational procedures**.

---

### 📊 So sánh nhanh bốn gói

| Tiêu chí | Basic | Business Support+ | Enterprise Support | Unified Operations |
|---|---|---|---|---|
| Phù hợp với | Mọi tài khoản | Production workloads | Business-critical workloads | Mission-critical workloads |
| Trusted Advisor | 7 checks | Full checks + API | Full checks + API | Full checks + API |
| Phản hồi sự cố | Không cam kết | ≤ 30 phút | ≤ 15 phút | Kế thừa + chuyên gia chuyên biệt |
| Điểm nhấn | 24/7 customer service, Health Dashboard | Cloud Support Engineers 24/7, Generative AI | TAM, Security Incident Response | TAM, DSE, SBAS, IME, CIRT, Countdown Premium |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Gói support nào miễn phí?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Basic Support.

Giải thích: Đây là gói mặc định, kèm 24/7 customer service và Personal Health Dashboard.

Tham chiếu: Mục Basic Support.

</details>

**Câu 2:** Basic Support có bao nhiêu Trusted Advisor check?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 7 check.

Giải thích: Muốn full checks phải lên gói Business hoặc Enterprise.

Tham chiếu: Mục Basic Support.

</details>

**Câu 3:** Business Support+ cam kết thời gian phản hồi tối đa bao lâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không quá 30 phút cho sự cố business-critical system down.

Giải thích: Gói này cũng có unlimited cases và unlimited contacts.

Tham chiếu: Mục Business Support+.

</details>

**Câu 4:** Enterprise Support có những điểm nhấn gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phản hồi dưới 15 phút cho production-critical, TAM chỉ định riêng, AWS Security Incident Response team, business reviews và AWS Countdown event management.

Giải thích: Gói này dành cho production hoặc business-critical workloads.

Tham chiếu: Mục Enterprise Support.

</details>

**Câu 5:** Unified Operations dành cho loại workload nào và có chuyên gia nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mission-critical workloads, 24/7; có TAM, DSE, SBAS, IME, Migration Specialist on-demand, SSE, cùng Countdown Premium và CIRT.

Giải thích: Đây là gói cao cấp nhất, kế thừa mọi tính năng của Business Support+.

Tham chiếu: Mục Unified Operations.

</details>

---

Vậy là các bạn đã phân biệt được cả bốn gói support — từ miễn phí đến mission-critical. *Cứ nhớ theo mức độ workload: production → Business Support+, business-critical → Enterprise, mission-critical → Unified Operations.*

Ở bài tiếp theo, chúng ta tổng kết **best practices quản lý tài khoản AWS**. Hẹn gặp các bạn ở đó! 🚀
