# 🖥️ Amazon WorkSpaces — desktop Windows/Linux ngay trên cloud

> Nguồn: `234-WorkSpaces-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682644)

Tiếp theo hành trình, chúng ta cùng tìm hiểu **Amazon WorkSpaces** — dịch vụ cho phép các bạn có một chiếc desktop Windows hoặc Linux "đặt" ngay trong cloud. Trong đề thi, nếu thấy **virtual desktop (máy tính để bàn ảo)** hay **managed desktop as a service**, hãy nghĩ ngay tới WorkSpaces nhé.

---

### 🎯 WorkSpaces là gì?

Amazon WorkSpaces là **managed desktop as a service (DaaS — desktop dạng dịch vụ được quản lý)**, giúp các bạn dễ dàng **provision (cung cấp)** desktop **Windows hoặc Linux**.

Ý tưởng rất đơn giản: nếu ai đó cần một chiếc laptop Windows trên cloud, họ có thể làm điều đó bằng WorkSpaces. Dịch vụ này giúp doanh nghiệp **loại bỏ on-premises VDI (Virtual Desktop Infrastructure — hạ tầng máy tính để bàn ảo đặt tại chỗ)** truyền thống — thay vì duy trì VDI trong công ty, bạn chuyển hẳn lên cloud. Nếu đề thi nhắc tới **virtual desktop** hoặc **managed desktop as a service**, đáp án chính là WorkSpaces.

---

### ⚙️ Vì sao WorkSpaces đáng dùng?

* **Nhanh và mở rộng tốt** — scale nhanh chóng tới **hàng nghìn người dùng**.
* **Bảo mật** — tích hợp với **KMS (Key Management Service — dịch vụ quản lý khóa)**.
* **Pay as you go (trả theo mức dùng)** — chỉ trả tiền cho thời gian sử dụng desktop thực tế.

```mermaid
flowchart LR
    A[Người dùng từ xa] --> B[WorkSpaces desktop]
    B --> C[VPC và dữ liệu doanh nghiệp]
```

Ví dụ: bạn đang ở nhà và muốn truy cập một Windows desktop bảo mật từ trong AWS. Bạn provision một desktop bằng WorkSpaces, rồi truy cập cloud hoặc **corporate data center (trung tâm dữ liệu doanh nghiệp)** trực tiếp từ desktop ảo đó — an toàn, và có thể nằm trong **VPC (Virtual Private Cloud — mạng ảo riêng)** của bạn.

---

### 🗺️ Mẹo thi: giảm latency cho WorkSpaces

Đề thi từng hỏi về cách **giảm latency (độ trễ)** cho WorkSpaces. Nguyên tắc vàng: **triển khai càng gần người dùng càng tốt**.

Ví dụ doanh nghiệp có hai văn phòng ở **California** và **Paris**:

* Đặt một WorkSpaces ở khu vực **Mỹ** để người dùng California truy cập trực tiếp.
* Đặt một WorkSpaces khác gần người dùng **châu Âu**.

Nói cách khác, các bạn nên có số **workspace region (vùng đặt workspace)** tương ứng với số địa điểm của công ty để giảm latency. Và hãy nhớ quy tắc này không chỉ đúng với WorkSpaces: *muốn giảm latency cho bất kỳ ứng dụng nào, hãy triển khai gần người dùng.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon WorkSpaces thuộc loại dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Managed desktop as a service (DaaS) — cung cấp desktop Windows hoặc Linux.

Giải thích: WorkSpaces cho phép bạn provision desktop Windows/Linux một cách nhanh chóng.

Tham chiếu: Mục WorkSpaces là gì.

</details>

**Câu 2:** WorkSpaces giúp doanh nghiệp loại bỏ hạ tầng nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** On-premises VDI (Virtual Desktop Infrastructure).

Giải thích: Thay vì duy trì VDI tại chỗ, doanh nghiệp chuyển desktop lên cloud.

Tham chiếu: Mục WorkSpaces là gì.

</details>

**Câu 3:** Dịch vụ nào được tích hợp giúp WorkSpaces bảo mật hơn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** KMS (Key Management Service).

Giải thích: WorkSpaces tích hợp KMS, đồng thời hoạt động theo mô hình pay as you go.

Tham chiếu: Mục Vì sao WorkSpaces đáng dùng.

</details>

**Câu 4:** Công ty có văn phòng ở California và Paris nên triển khai WorkSpaces thế nào để giảm latency?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Triển khai ở nhiều workspace region, đặt gần người dùng — một ở Mỹ, một ở châu Âu.

Giải thích: Nguyên tắc chung: deploy càng gần người dùng càng tốt.

Tham chiếu: Mục Mẹo thi.

</details>

**Câu 5:** Mô hình thanh toán của WorkSpaces là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Pay as you go — chỉ trả cho mức sử dụng desktop thực tế.

Giải thích: Nhờ vậy chi phí gắn với nhu cầu sử dụng thực tế của người dùng.

Tham chiếu: Mục Vì sao WorkSpaces đáng dùng.

</details>

---

Vậy là các bạn đã nắm chắc WorkSpaces: DaaS cho desktop Windows/Linux, bảo mật bằng KMS, trả theo mức dùng, và luôn triển khai gần người dùng. Ở bài tiếp theo, chúng ta sẽ gặp một dịch vụ rất dễ nhầm với nó: **Amazon AppStream 2.0**. Hẹn gặp lại! 🚀
