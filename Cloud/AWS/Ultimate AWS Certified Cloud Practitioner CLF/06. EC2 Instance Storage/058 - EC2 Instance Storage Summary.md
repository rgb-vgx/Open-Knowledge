# 📋 Tổng kết EC2 Instance Storage: Tất cả lưu trữ trong một bài

> Nguồn: `058-EC2-Instance-Storage-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20260618)

Chúng ta đã đi hết section **EC2 Instance Storage** — từ EBS, AMI, Instance Store, EFS cho tới FSx. Đây là lúc cùng nhau **hệ thống hóa kiến thức** để các bạn bước vào phòng thi với một bức tranh thật rõ ràng.

Bài tổng kết này ngắn gọn nhưng cực kỳ giá trị — *đừng bỏ qua nhé!*

---

### 💾 EBS volumes

**EBS (Elastic Block Store)** là **network drive (ổ đĩa mạng)** gắn vào EC2:

* Gắn được vào **một EC2 instance tại một thời điểm**.
* Được **mapped (ánh xạ) vào một Availability Zone cụ thể**.
* Dùng **EBS snapshot** để:
  * **Backup** dữ liệu.
  * **Chuyển dữ liệu** từ EBS volume này sang **Availability Zone khác**.

---

### 🖼️ AMI và EC2 Image Builder

**AMI (Amazon Machine Image)** là những **EC2 instance image sẵn dùng**, kèm theo các **tùy chỉnh (customizations)** mà bạn muốn.

Nếu muốn **tự động hóa quy trình tạo AMI**, các bạn dùng dịch vụ **EC2 Image Builder**:

* Tự động **build (tạo)** AMI
* Tự động **test (kiểm thử)** AMI
* Tự động **distribute (phân phối)** AMI

---

### ⚡ EC2 Instance Store

Một kiểu lưu trữ cho hiệu năng tối đa:

* Là **hardware disk (đĩa phần cứng)** hiệu năng rất cao gắn vào EC2 instance.
* **Dữ liệu sẽ mất** nếu instance bị **stop hoặc terminate**.
* Chỉ phù hợp cho dữ liệu tạm, không dùng lưu trữ lâu dài.

---

### 🗂️ EFS và các storage class

**EFS (Elastic File System)** cho các bạn một **NFS (Network File System)** có thể gắn vào **hàng trăm instance trong một region**:

* Không còn "khóa" vào một AZ nữa — phạm vi giờ là **cấp region (vùng)**.
* Muốn **tối ưu chi phí**: dùng **EFS-IA** để chuyển các file ít dùng sang **lớp lưu trữ chi phí thấp hơn**.

---

### 🪟 FSx: hai phiên bản cần nhớ

* **FSx for Windows File Server** — network file system dành cho **máy chủ Windows**.
* **FSx for Lustre** — phục vụ **High Performance Computing (HPC)** trên **Linux file system**.

---

### 📊 Bảng tổng hợp toàn section

| Dịch vụ | Loại lưu trữ | Phạm vi | Điểm cần nhớ |
|---|---|---|---|
| EBS | Ổ đĩa mạng | 1 instance, 1 AZ | Snapshot để backup và chuyển AZ |
| EC2 Instance Store | Đĩa phần cứng | Gắn với server vật lý | Hiệu năng cực cao, mất dữ liệu khi stop/terminate |
| EFS | File system mạng | Nhiều instance, nhiều AZ trong region | Chỉ Linux; EFS-IA giảm chi phí |
| FSx for Windows | File system chia sẻ | Windows | SMB, NTFS, Active Directory |
| FSx for Lustre | File system hiệu năng cao | HPC | Linux + cluster, lưu trên S3 |

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** EBS volume gắn được vào bao nhiêu EC2 instance cùng lúc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một instance tại một thời điểm.

Giải thích: EBS cũng được ánh xạ vào một Availability Zone cụ thể.

Tham chiếu: Mục EBS volumes.

</details>

**Câu 2:** Dịch vụ nào giúp tự động build, test và distribute AMI?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** EC2 Image Builder.

Giải thích: Dùng khi muốn tự động hóa quy trình tạo AMI thay vì làm thủ công.

Tham chiếu: Mục AMI và EC2 Image Builder.

</details>

**Câu 3:** Phạm vi hoạt động của EFS là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cấp region — có thể gắn vào hàng trăm instance, không bị khóa vào một AZ.

Giải thích: Đây là điểm khác biệt lớn so với EBS.

Tham chiếu: Mục EFS và các storage class.

</details>

**Câu 4:** EFS-IA dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chuyển các file ít sử dụng sang lớp lưu trữ chi phí thấp hơn.

Giải thích: Giúp tối ưu chi phí cho EFS.

Tham chiếu: Mục EFS và các storage class.

</details>

**Câu 5:** FSx for Lustre phục vụ loại workload nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** High Performance Computing (HPC) trên Linux file system.

Giải thích: Trong khi FSx for Windows phục vụ máy chủ Windows.

Tham chiếu: Mục FSx hai phiên bản.

</details>

---

Vậy là các bạn đã có trong tay **bản đồ toàn bộ lưu trữ EC2**: EBS cho ổ đĩa mạng gắn một instance, Instance Store cho hiệu năng phần cứng, EFS cho file system dùng chung, và FSx cho Windows/HPC. *Cứ ôn lại bảng tổng hợp vài lần là các bạn sẽ nhớ như in.*

Section này khép lại, và ở bài tiếp theo chúng ta sẽ cùng **dọn dẹp tài nguyên** để bắt đầu phần mới với một "trang giấy trắng". Hẹn gặp các bạn! 🚀
