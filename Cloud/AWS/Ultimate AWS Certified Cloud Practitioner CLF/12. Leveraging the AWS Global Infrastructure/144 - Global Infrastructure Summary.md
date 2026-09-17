# 🧭 Tổng kết hạ tầng toàn cầu AWS: Bản đồ ôn thi trong 5 phút

> Nguồn: `144-Leveraging-the-AWS-Global-Infrastructure-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20260650)

Chúng ta vừa đi hết một chặng đường dài của section **Leveraging the AWS Global Infrastructure**. Giờ là lúc mình cùng các bạn **hệ thống lại toàn bộ kiến thức** thành một bản đồ gọn gàng để ôn thi. *Đây là bài tổng kết cực kỳ quan trọng — hãy đọc chậm và nhớ kỹ nhé!*

---

### 🧾 Bảng tổng hợp các dịch vụ toàn cầu

| Dịch vụ | Vai trò chính |
|---|---|
| Route 53 | Global DNS — route người dùng tới deployment gần nhất, ít latency nhất |
| CloudFront | Global CDN — cache nội dung tại Edge Locations, giảm latency |
| S3 Transfer Acceleration | Tăng tốc upload/download toàn cầu vào Amazon S3 |
| Global Accelerator | Qua Edge Locations và mạng toàn cầu — tăng availability và performance |
| Outposts | Mang dịch vụ AWS vào data center của bạn bằng Outposts racks |
| WaveLength | Đưa dịch vụ ra edge nhờ mạng 5G — ultra-low latency |
| Local Zones | Đưa compute, database, storage đến gần người dùng |

---

### 🔍 Những chi tiết đáng nhớ

* **Route 53** — global DNS, cách tuyệt vời để route người dùng tới deployment gần nhất với độ trễ thấp nhất. Bạn đã học cách **tạo records** và trỏ từ **hostname sang IP**. Dịch vụ này cũng rất hữu ích khi xây dựng **disaster recovery strategies**.
* **CloudFront** — global CDN, đã được nối trực tiếp với **Amazon S3**. Nhờ replicate một phần dữ liệu ứng dụng vào các **AWS Edge Locations**, độ trễ giảm xuống; thêm khả năng **cache các request phổ biến**, trải nghiệm người dùng được cải thiện rõ rệt.
* **S3 Transfer Acceleration** — tăng tốc upload và download toàn cầu vào S3, cũng tận dụng **Edge Locations** của AWS.
* **Global Accelerator** — một lần nữa, dùng Edge Locations và mạng toàn cầu để mang lại **global application availability và performance** tốt hơn.
* **Outposts** — cách **mở rộng hạ tầng AWS vào data center của chính bạn**: Outposts racks được đặt ngay on-premises, "cloud của AWS" nằm trong data center của bạn.
* **WaveLength** — đưa dịch vụ ra edge nhờ mạng **5G**, mang lại ứng dụng **ultra-low latency**.
* **Local Zones** — đưa compute, database, storage của AWS đến gần người dùng hơn, ví dụ tại **Boston, Dallas, Miami, Chicago**... Cực kỳ phù hợp cho **latency sensitive applications** cần truy cập nội bộ thật nhanh tại một khu vực cụ thể của nước Mỹ hoặc thế giới — *hiện tại chủ yếu vẫn là nước Mỹ*.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Dịch vụ nào của AWS đóng vai trò global DNS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Route 53.

Giải thích: Route người dùng tới deployment gần nhất với độ trễ thấp nhất, hỗ trợ cả disaster recovery.

Tham chiếu: Mục Những chi tiết đáng nhớ.

</details>

**Câu 2:** CloudFront đã được kết nối với dịch vụ nào, và mang lại lợi ích gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kết nối với Amazon S3; replicate một phần dữ liệu ứng dụng vào Edge Locations và cache request phổ biến — giảm latency, cải thiện trải nghiệm người dùng.

Tham chiếu: Mục Những chi tiết đáng nhớ.

</details>

**Câu 3:** Dịch vụ nào tăng tốc upload/download toàn cầu vào Amazon S3?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 Transfer Acceleration, tận dụng Edge Locations của AWS.

Tham chiếu: Mục Những chi tiết đáng nhớ.

</details>

**Câu 4:** Dịch vụ nào mang các dịch vụ AWS vào data center on-premises của bạn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS Outposts — thông qua các Outposts racks đặt trong data center của bạn.

Tham chiếu: Mục Những chi tiết đáng nhớ.

</details>

**Câu 5:** WaveLength gắn với công nghệ nào và mang lại điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Gắn với mạng 5G; mang lại ứng dụng ultra-low latency ở edge.

Tham chiếu: Mục Những chi tiết đáng nhớ.

</details>

---

Vậy là xong section hạ tầng toàn cầu! Các bạn đã có trong tay bộ công cụ để đưa ứng dụng ra toàn cầu: DNS, CDN, tăng tốc, mở rộng ra edge, vào tận data center, và cả 5G. *Cứ ôn lại bảng tổng hợp phía trên vài lần là các bạn sẽ nhớ rất nhanh.*

Ở bài tiếp theo, chúng ta sẽ bước sang section mới về **Cloud Integrations**, bắt đầu với bức tranh tổng quan các dịch vụ tích hợp. Hẹn gặp các bạn ở đó! 🚀
