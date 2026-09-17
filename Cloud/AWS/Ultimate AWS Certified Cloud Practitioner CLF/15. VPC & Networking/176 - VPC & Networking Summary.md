# 📋 Tổng kết VPC & Networking: Chọn đúng dịch vụ trong một nốt nhạc

> Nguồn: `176-VPC-Networking-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20237280)

Chúng ta đã học rất nhiều về **VPC** — giờ là lúc điểm lại toàn bộ để không quên gì. Đề thi phần này không bắt bạn xây dựng hạ tầng, mà hỏi **"nhu cầu này thì dùng sub-service nào?"** — nên bài tổng kết này chính là "bản đồ chọn đáp án" của các bạn.

*Hãy đọc chậm và ghi nhớ từng dòng, vì đây là những câu gần như chắc chắn xuất hiện.*

---

### 🧱 Nền tảng: VPC, subnet, internet và NAT

* **VPC** = **virtual private cloud (đám mây riêng ảo)** — và bên trong VPC bạn có **subnet**.
* **Subnet** gắn với **một Availability Zone cụ thể** và là một **phân vùng mạng (network partition)** trong VPC.
* Muốn có **internet access ở cấp VPC** → tạo **Internet Gateway**.
* Nếu instance là **private** và nằm trong **private subnet** → dùng **NAT Gateway** (do AWS quản lý) hoặc **NAT instances** (bạn tự quản lý) để cấp internet access cho private subnet.

---

### 🔐 Firewall: NACL và Security Group

* **Stateless (không lưu trạng thái)** → **NACL (Network ACL)** — đóng vai trò **rule cho subnet** với cả **inbound và outbound**.
* **Stateful (lưu trạng thái)** → **Security Group** — hoạt động ở **cấp EC2 instance hoặc ENI**.

| Tiêu chí | NACL | Security Group |
|---|---|---|
| Trạng thái | Stateless | Stateful |
| Phạm vi | Subnet | EC2 instance hoặc ENI |
| Vai trò | Rule inbound và outbound cho subnet | Rule stateful cho instance |

---

### 🔗 Kết nối trong AWS: peering, Elastic IP, endpoint

* **VPC peering** — nối hai VPC có **dải IP không trùng nhau (non-overlapping)**. Peering là **non-transitive (không bắc cầu)**: nếu A nối B và B nối C thì **A không nói chuyện được với C**.
* **Elastic IP** — **địa chỉ IPv4 public cố định**, và bạn vẫn **bị tính phí nếu không dùng**.
* **VPC Endpoint** — **truy cập riêng tư (private access)** tới mọi dịch vụ AWS ngay trong VPC.
* **PrivateLink** — kết nối riêng tư tới **dịch vụ của bên thứ ba** trong VPC của bên thứ ba.
* **VPC Flow Logs** — xem **log lưu lượng mạng**.

---

### 🌍 Kết nối riêng tư với bên ngoài AWS

| Nhu cầu | Dịch vụ |
|---|---|
| Nối data center on-premises lên AWS qua internet, có mã hóa | **Site-to-Site VPN** |
| Đưa máy tính cá nhân của bạn vào thẳng VPC | **Client VPN** (OpenVPN) |
| Kết nối riêng tư, trực tiếp giữa AWS và data center | **Direct Connect** |
| Nối mọi thứ: hàng nghìn VPC, on-premises, Site-to-Site VPN, Direct Connect... | **Transit Gateway** |

Đây là chìa khóa cuối cùng: đề thi sẽ yêu cầu bạn **chọn đúng sub-service trong VPC** theo nhu cầu được mô tả. Chỉ cần nhớ bảng trên là bạn xử lý ngon lành.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Muốn có internet access ở cấp VPC, bạn tạo gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Internet Gateway.

Giải thích: Nếu instance là private trong private subnet thì dùng NAT Gateway hoặc NAT instances.

Tham chiếu: Mục Nền tảng.

</details>

**Câu 2:** Firewall stateless dùng cho subnet là dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** NACL (Network ACL).

Giải thích: NACL là stateless và áp rule inbound/outbound cho subnet; Security Group là stateful.

Tham chiếu: Mục Firewall.

</details>

**Câu 3:** VPC peering có bắc cầu (transitive) không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — peering là non-transitive.

Giải thích: A nối B, B nối C thì A không tự động nói chuyện được với C.

Tham chiếu: Mục Kết nối trong AWS.

</details>

**Câu 4:** Elastic IP có đặc điểm gì đáng lưu ý?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là IPv4 public cố định, và vẫn bị tính phí nếu không dùng.

Giải thích: Đừng quên chi phí này khi ôn thi.

Tham chiếu: Mục Kết nối trong AWS.

</details>

**Câu 5:** Muốn kết nối riêng tư, trực tiếp giữa AWS và data center, bạn dùng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Direct Connect.

Giải thích: Site-to-Site VPN đi qua internet; Client VPN dành cho máy tính cá nhân; Transit Gateway dùng để nối mọi thứ ở quy mô lớn.

Tham chiếu: Mục Kết nối riêng tư với bên ngoài AWS.

</details>

---

Vậy là các bạn đã đi hết phần **VPC & Networking** với đầy đủ công cụ trong tay: từ subnet, firewall, cho tới endpoint, VPN, Direct Connect và Transit Gateway. *Hãy coi bài này là "sổ tay ôn thi" — mỗi khi đề mô tả một nhu cầu, chỉ cần tra lại bảng là ra đáp án.*

Chúng ta sẽ tiếp tục hành trình ở bài tiếp theo của khóa học. Hẹn gặp các bạn! 🚀
