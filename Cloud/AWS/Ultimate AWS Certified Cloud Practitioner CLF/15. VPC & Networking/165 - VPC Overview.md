# 🗺️ Tổng quan về VPC: Bức tranh mạng riêng trên AWS

> Nguồn: `165-VPC-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056240)

Chào mừng các bạn đến với section **VPC & Networking** — chủ đề về mạng riêng trên AWS. Bài mở màn này sẽ vẽ ra bức tranh tổng thể: VPC là gì, section sẽ đi qua những khái niệm nào, và quan trọng nhất là **chúng "nặng" đến đâu trong đề thi CLF-C02**.

*Đừng lo nếu bạn nghe VPC có vẻ phức tạp — ở cấp Cloud Practitioner, mình chỉ cần các bạn hiểu ở mức tổng quan.*

---

### 🎯 VPC là gì và vì sao cần biết?

**VPC (Virtual Private Cloud — mạng riêng ảo)** là trọng tâm của section này, và đây chỉ là một **crash course (khóa học nhanh)** về VPC.

Thú thật, VPC khá phức tạp. Nếu bạn định thi **AWS Certified Solutions Architect Associate** hoặc **AWS Certified SysOps Administrator Associate**, đây là chủ đề bạn phải hiểu thật sâu. Còn ở cấp **Cloud Practitioner**, bạn chỉ cần nắm **một vài khái niệm ở mức high-level (tổng quan)** và biết chúng dùng để làm gì.

---

### 📚 Section này sẽ đi qua những gì?

Danh sách các khái niệm chúng ta sẽ chạm tới:

* **VPC** và **Subnets (mạng con)**
* **Internet Gateways** và **NAT Gateways**
* **Security Groups (nhóm bảo mật)** và **Network ACL (NACL — danh sách kiểm soát truy cập mạng)**
* **VPC Flow Logs (nhật ký luồng)** và **VPC Peering (kết nối ngang hàng giữa các VPC)**
* **VPC Endpoints**
* **Site-to-Site VPN** và **Direct Connect**
* **Transit Gateway**

Mình sẽ lần lượt điểm qua tổng quan từng thứ một. Riêng phần hands-on (thực hành), các bạn sẽ được xem **VPC mặc định (default VPC)** mà AWS tạo sẵn — *sẽ không phải dựng VPC từ đầu đâu.*

---

### 🎯 Mức độ quan trọng trong đề thi CLF-C02

Tin vui: toàn bộ kiến thức trên tương ứng với **chưa tới 1–2 câu** trong đề thi CCP. Chiến lược vì thế rất rõ ràng: **hiểu ở mức tổng quan, nắm công dụng của từng dịch vụ**, đừng sa đà vào chi tiết. Đề thi về VPC khá là high-level, nên chỉ cần bạn theo sát bài này và cả section là ổn.

Nếu giữa chừng có chỗ nào chưa thông, **hãy cứ yên tâm**: cuối section sẽ có một **bài summary (tổng kết)** nhắc lại từng dịch vụ trong danh sách trên. Học hết section rồi quay lại summary, mọi thứ sẽ khớp vào nhau.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** VPC viết tắt của cụm từ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Virtual Private Cloud.

Giải thích: Đây là mạng riêng ảo — nơi bạn triển khai tài nguyên AWS.

Tham chiếu: Mục VPC là gì và vì sao cần biết.

</details>

**Câu 2:** Chứng chỉ nào đòi hỏi bạn phải hiểu VPC thật sâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS Certified Solutions Architect Associate và AWS Certified SysOps Administrator Associate.

Giải thích: Ở cấp Cloud Practitioner, VPC chỉ cần học ở mức tổng quan.

Tham chiếu: Mục VPC là gì và vì sao cần biết.

</details>

**Câu 3:** Section VPC & Networking bao gồm những chủ đề nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** VPC, Subnets, Internet Gateways, NAT Gateways, Security Groups, NACL, VPC Flow Logs, VPC Peering, VPC Endpoints, Site-to-Site VPN, Direct Connect và Transit Gateway.

Giải thích: Tất cả đều được điểm qua ở mức tổng quan.

Tham chiếu: Mục Section này sẽ đi qua những gì.

</details>

**Câu 4:** Kiến thức VPC chiếm khoảng bao nhiêu câu trong đề thi CCP?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chưa tới 1–2 câu.

Giải thích: Vì vậy chỉ cần học ở mức high-level là đủ.

Tham chiếu: Mục Mức độ quan trọng trong đề thi CLF-C02.

</details>

**Câu 5:** Phần hands-on của section này sẽ làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xem default VPC mà AWS tạo sẵn, không dựng VPC từ đầu.

Giải thích: Cách học nhẹ nhàng để tập trung vào khái niệm.

Tham chiếu: Mục Section này sẽ đi qua những gì.

</details>

---

Vậy là bạn đã có tấm bản đồ cho section **VPC & Networking**. Nhớ công thức nhé: **học tổng quan, hiểu công dụng, đừng học quá sâu** — thế là đủ cho kỳ thi CLF-C02.

Ở bài tiếp theo, chúng ta sẽ tìm hiểu về **địa chỉ IP trong AWS** trước khi chính thức bước vào VPC. Hẹn gặp các bạn! 🚀
