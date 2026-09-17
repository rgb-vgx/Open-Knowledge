# 🏢 AWS Outposts: Mang cloud AWS về tận data center của bạn

> Nguồn: `140-AWS-Outposts.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682596)

Bài trước chúng ta đã đi vòng quanh thế giới với Global Accelerator. Lần này, mình muốn kéo các bạn về "nhà" — chính là data center của doanh nghiệp bạn — với **AWS Outposts**, một bước phát triển thú vị cho các hệ thống **hybrid cloud**. *Chủ đề này hoàn toàn có thể xuất hiện trong đề thi đấy nhé.*

---

### ☁️ Hybrid cloud là gì?

Các doanh nghiệp giữ **hạ tầng on-premises (tại chỗ)** song song với hạ tầng cloud được gọi là **hybrid cloud (cloud lai)**.

Vấn đề nằm ở chỗ: khi vận hành hybrid cloud, bạn phải sống với **hai thế giới IT khác nhau**:

* Một bên là cloud AWS — dùng **AWS console, CLI và API**.
* Một bên là hạ tầng on-premises — hệ thống riêng, cách vận hành riêng.

Hệ quả là bạn cần **hai bộ kỹ năng khác nhau, hai loại API khác nhau**, và mọi thứ trở nên phức tạp.

---

### 🧱 Outposts — giải pháp của AWS

AWS nhận ra rằng nhiều công ty sẽ chạy hybrid cloud, nên họ tạo ra **Outposts**: những **server rack** cung cấp đúng hạ tầng, dịch vụ, API và công cụ của AWS để bạn xây ứng dụng **ngay tại on-premises, giống hệt như trên cloud**.

Cách hoạt động:

1. AWS đến **lắp đặt và quản lý** các Outpost rack — đây là các server nằm **trong hạ tầng on-premises của bạn**.
2. Các server này được nạp sẵn các dịch vụ AWS để bạn dùng ngay tại chỗ.
3. Trong corporate data center của bạn sẽ có Outpost rack do AWS thiết lập, **mở rộng dịch vụ AWS trực tiếp vào data center on-premises**.

Theo mình, đây thực sự là một bước tiến mang tính cách mạng.

```mermaid
flowchart LR
    A[Workload chạy tại data center của bạn] --> B[Outposts racks do AWS lắp đặt và quản lý]
    B --> C[Mở rộng lên AWS cloud khi bạn sẵn sàng]
```

---

### ⚠️ Trách nhiệm của bạn thay đổi thế nào?

Có một khác biệt quan trọng giữa **EC2 chạy trên cloud** và **EC2 chạy trong data center của chính bạn**:

* Trên cloud, AWS lo phần lớn hạ tầng vật lý.
* Với Outposts, rack nằm trong data center của bạn — nghĩa là **bạn phải chịu trách nhiệm về bảo mật, bao gồm cả bảo mật vật lý cho chính chiếc rack đó**.

---

### ✅ Lợi ích của Outposts

* **Low latency access** tới các hệ thống on-premise.
* **Local data processing** — dữ liệu có thể **không bao giờ rời khỏi hệ thống on-premises**, không cần lên cloud.
* **Data residency (lưu trú dữ liệu)** — dữ liệu nằm trong data center của chính bạn.
* **Dễ dàng migration** — bắt đầu chuyển từ on-premises lên Outpost, khi sẵn sàng thì chuyển tiếp từ Outpost lên cloud.
* **Fully managed service** — AWS quản lý dịch vụ cho bạn.

Với Outposts, hiện tại bạn có thể chạy nhiều dịch vụ như: **Amazon EC2, Amazon EBS, Amazon S3, Amazon EKS, Amazon ECS, Amazon RDS và Amazon EMR**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Hybrid cloud là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là mô hình doanh nghiệp giữ hạ tầng on-premises song song với hạ tầng cloud.

Giải thích: Khi đó bạn phải vận hành cả API và kỹ năng của hai thế giới IT.

Tham chiếu: Mục Hybrid cloud là gì.

</details>

**Câu 2:** AWS Outposts là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là các server rack cung cấp hạ tầng, dịch vụ, API và công cụ AWS ngay trong hạ tầng on-premises của bạn.

Tham chiếu: Mục Outposts — giải pháp của AWS.

</details>

**Câu 3:** Ai lắp đặt và quản lý Outpost rack, và trách nhiệm nào thuộc về bạn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS lắp đặt và quản lý rack (fully managed); còn bạn chịu trách nhiệm bảo mật, bao gồm bảo mật vật lý của rack vì nó nằm trong data center của bạn.

Tham chiếu: Mục Outposts — giải pháp của AWS và Trách nhiệm của bạn.

</details>

**Câu 4:** Outposts giúp gì cho dữ liệu của bạn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Local data processing và data residency — dữ liệu có thể không bao giờ rời khỏi hệ thống on-premises.

Tham chiếu: Mục Lợi ích của Outposts.

</details>

**Câu 5:** Kể tên các dịch vụ AWS có thể chạy trên Outposts.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon EC2, Amazon EBS, Amazon S3, Amazon EKS, Amazon ECS, Amazon RDS và Amazon EMR.

Tham chiếu: Mục Lợi ích của Outposts.

</details>

---

Vậy là các bạn đã hiểu hybrid cloud và cách Outposts kéo cloud AWS về tận data center. *Điểm cần nhớ nhất: Outposts là managed service của AWS, nhưng bảo mật vật lý của rack vẫn là trách nhiệm của bạn.*

Ở bài tiếp theo, chúng ta sẽ lên sóng 5G với **AWS WaveLength** — dịch vụ mang ứng dụng đến sát người dùng với độ trễ cực thấp. Hẹn gặp các bạn ở đó! 🚀
