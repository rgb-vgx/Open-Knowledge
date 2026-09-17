# 🛡️ AWS Elastic Disaster Recovery (DRS) — khôi phục hệ thống chỉ trong vài phút

> Nguồn: `243-AWS-Elastic-Disaster-Recovery-DRS.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/26623554)

Sau khi đã nắm 4 chiến lược disaster recovery, chúng ta cùng tìm hiểu một dịch vụ cụ thể giúp hiện thực hóa việc đó: **AWS Elastic Disaster Recovery (DRS)**. Điểm thú vị là dịch vụ này từng có một cái tên khác — hoàn toàn có thể xuất hiện trong đề thi.

---

### 🔍 DRS là gì?

**AWS Elastic Disaster Recovery**, viết tắt là **DRS**, cho phép các bạn **nhanh chóng và dễ dàng khôi phục các server vật lý, server ảo và server chạy trên cloud vào AWS** để làm disaster recovery.

*Trước đây dịch vụ này có tên là **CloudEndure Disaster Recovery**, vì CloudEndure đã được AWS mua lại — sau đó nó được đổi tên thành một dịch vụ AWS chính thức. Nếu gặp cái tên CloudEndure trong đề, các bạn cứ liên hệ ngay đến DRS nhé.*

---

### 🎯 DRS bảo vệ những gì?

Các tình huống sử dụng DRS rất thực tế:

* **Bảo vệ các database quan trọng nhất** — ví dụ **Oracle, MySQL, SQL Server**.
* **Bảo vệ các enterprise app (ứng dụng doanh nghiệp)** — ví dụ **SAP**.
* **Bảo vệ dữ liệu khi bị tấn công tống tiền** — kẻ tấn công xâm nhập và đòi tiền chuộc (ransom).

---

### ⚙️ Nhân bản liên tục ở mức block — trái tim của DRS

Cách hoạt động của DRS là **continuous block-level replication (nhân bản liên tục ở mức block)** các server từ **corporate data center (trung tâm dữ liệu của doanh nghiệp)** lên cloud:

* **Operating system, ứng dụng, database** của bạn đều ghi xuống disk.
* Một **AWS replication agent (tác nhân nhân bản)** được cài đặt trong corporate data center.
* Nhờ agent này, các disk được **nhân bản liên tục** lên một **staging environment (môi trường tạm)** trong AWS, với **EC2 instance và EBS volume chi phí thấp**.

```mermaid
flowchart LR
    A[Corporate data center] --> B[AWS Replication Agent]
    B --> C[Staging environment trong AWS]
    C --> D[Fail over trong vài phút]
    D --> E[Production với EC2 và EBS mạnh hơn]
    E --> F[Failback về data center]
```

---

### 🚨 Fail over và failback — hai tình huống then chốt

* **Fail over (chuyển đổi dự phòng):** khi thảm họa xảy ra với data center và bạn cần khôi phục hệ thống, bạn có thể **fail over trong vài phút** từ staging sang production bằng cách tạo **EC2 instance lớn hơn, EBS volume tốt hơn** — thế là đã hoàn tất disaster recovery.
* **Failback (quay về):** khi corporate data center của bạn hoạt động trở lại, hệ thống **quay về data center** và bạn tiếp tục vận hành bình thường.

*Ở cấp độ Cloud Practitioner, các bạn chỉ cần nhớ: DRS = nhân bản liên tục từ data center lên staging rẻ tiền trong AWS, fail over nhanh khi có thảm họa, rồi failback khi mọi thứ ổn.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Tên cũ của AWS Elastic Disaster Recovery là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CloudEndure Disaster Recovery.

Giải thích: CloudEndure được AWS mua lại và dịch vụ được đổi tên thành Elastic Disaster Recovery.

Tham chiếu: Mục DRS là gì.

</details>

**Câu 2:** DRS có thể khôi phục những loại server nào vào AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Server vật lý, server ảo và server trên cloud.

Giải thích: Đây là phạm vi hỗ trợ của dịch vụ.

Tham chiếu: Mục DRS là gì.

</details>

**Câu 3:** DRS nhân bản dữ liệu theo cơ chế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Continuous block-level replication — nhân bản liên tục ở mức block.

Giải thích: OS, ứng dụng và database ghi xuống disk, rồi được nhân bản liên tục lên AWS.

Tham chiếu: Mục Nhân bản liên tục ở mức block.

</details>

**Câu 4:** Staging environment trong AWS dùng loại tài nguyên nào để tiết kiệm chi phí?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** EC2 instance và EBS volume chi phí thấp.

Giải thích: Khi cần production, bạn mới tạo EC2/EBS lớn hơn, mạnh hơn.

Tham chiếu: Mục Nhân bản liên tục ở mức block.

</details>

**Câu 5:** Failback là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hệ thống quay về corporate data center khi data center hoạt động trở lại.

Giải thích: Đây là bước đưa hệ thống về trạng thái vận hành bình thường sau fail over.

Tham chiếu: Mục Fail over và failback.

</details>

---

Vậy là các bạn đã nắm **AWS Elastic Disaster Recovery (DRS)**: ông vua nhân bản liên tục từ data center lên AWS, fail over vài phút, failback an toàn. Ở bài tiếp theo, chúng ta sẽ tìm hiểu **AWS DataSync** — dịch vụ chuyên di chuyển dữ liệu lớn lên cloud. Hẹn gặp lại! 🚀
