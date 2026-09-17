# 🗺️ 7 chiến lược di chuyển lên cloud (The 7 Rs) — bản đồ cho mọi cuộc migration

> Nguồn: `245-Cloud-Migration-Strategies---The-7Rs.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/43749434)

Chuyển lên cloud không chỉ có một cách — AWS có hẳn **7 chiến lược (The 7 Rs)** được mô tả trong blog chính thức của AWS. Đây là chủ đề **rất dễ xuất hiện trong đề thi** dưới dạng: *"Chiến lược nào được sử dụng trong tình huống này?"*. Cùng nhau đi hết 7 chữ R nhé!

*Lời khuyên của mình: sau bài này, nếu có thời gian, các bạn nên đọc blog gốc của AWS về 7 Rs để hiểu sâu hơn — còn trong bài này, chúng ta tập trung vào các khái niệm.*

---

### 📖 Bức tranh tổng quan 7 chữ R

| Chiến lược | Cách hiểu nhanh | Ví dụ / Ghi chú |
|---|---|---|
| **Retire** | Tắt những gì không cần | Giảm bề mặt tấn công, tiết kiệm 10–20% |
| **Retain** | Không migrate, giữ nguyên on-premises | Vì security, compliance, performance... |
| **Relocate** | Dịch chuyển nguyên trạng sang môi trường cloud | VMware on-prem → VMware Cloud on AWS |
| **Rehost** | Lift and shift — bê nguyên ứng dụng lên | Có thể tiết kiệm tới 30% chi phí |
| **Replatform** | Lift and reshape — tối ưu nhẹ | Database → RDS, app → Elastic Beanstalk |
| **Repurchase** | Drop and shop — đổi sản phẩm khác | CRM → Salesforce, HR → Workday |
| **Refactor / Re-architect** | Viết lại theo cloud-native | Nhiều công nhất, lợi nhất |

Dưới đây là chi tiết từng chiến lược để các bạn nắm thật chắc.

---

### 🚪 Nhóm "không migrate hoặc bỏ đi": Retire, Retain, Relocate

**1. Retire — tắt những gì không cần.** Nếu có dịch vụ bạn không cần migrate, hãy tắt nó đi. Lợi ích:

* **Tăng bảo mật** vì có ít dịch vụ đang hoạt động hơn → giảm bề mặt bị tấn công (reduce attack surface).
* **Tiết kiệm chi phí**, có thể **10–20%**.
* **Tập trung nguồn lực** vào những tài nguyên thực sự cần duy trì.

**2. Retain — giữ nguyên on-premises.** Đây vẫn là một quyết định hợp lệ trong chiến lược migration. Bạn có thể giữ tài nguyên tại chỗ vì:

* **Security (bảo mật)**
* **Data compliance (tuân thủ dữ liệu)**
* **Performance (hiệu năng)**
* **Unresolved dependencies (phụ thuộc chưa giải quyết được)**
* Hoặc đơn giản là **không có giá trị kinh doanh** khi migrate, hay **quá phức tạp**.

**3. Relocate — dịch chuyển nguyên trạng.** Bạn chuyển ứng dụng từ on-premises sang phiên bản cloud của nó, hoặc chuyển **EC2 instance** sang **VPC, account hay AWS region** khác. Ví dụ: bạn quản lý server on-premises bằng **VMware software-defined data centers (SDDC)** và muốn giữ nguyên mọi thứ nhưng chạy trên **VMware Cloud on AWS** — chỉ relocate, không thay đổi gì cả.

---

### 🚚 Nhóm "dịch chuyển": Rehost, Replatform, Repurchase

**4. Rehost — lift and shift.** Đây là kiểu migration **đơn giản nhất**: bạn bê nguyên **application, database và data** lên AWS. Máy có thể là **physical, virtual hoặc từ cloud khác** chuyển vào AWS cloud.

* **Không tối ưu hóa cloud** gì cả — ứng dụng giữ nguyên như cũ, chỉ tận dụng tài nguyên cloud.
* Nhờ đó có thể **tiết kiệm tới 30% chi phí**.
* **AWS Application Migration Service** chính là dịch vụ giúp bạn làm lift-and-shift.

**5. Replatform — lift and reshape.** Bạn vẫn giữ **kiến trúc lõi của ứng dụng**, nhưng tận dụng tối ưu hóa cloud để **tiết kiệm thời gian và tiền bạc** nhờ chuyển sang dịch vụ **fully-managed hoặc serverless**. Ví dụ:

* Migrate database vào **RDS** thay vì bê lên EC2 — RDS cho bạn lợi ích về **backup, resiliency (khả năng phục hồi), high availability (sẵn sàng cao)**...
* Migrate ứng dụng sang **Elastic Beanstalk**.

**6. Repurchase — drop and shop.** Bạn **chuyển sang một sản phẩm khác** trong lúc lên cloud, ví dụ chuyển sang nền tảng **SaaS (Software as a Service)**. Cách này **tốn kém trong ngắn hạn nhưng triển khai rất nhanh**. Ví dụ:

* CRM → **Salesforce**
* HR → **Workday**
* CMS → **Drupal**

---

### 🏗️ Nhóm "làm lại từ đầu": Refactor / Re-architect

Đây là chiến lược bạn **tưởng tượng lại cách kiến trúc ứng dụng bằng các tính năng cloud-native**. Lý do để chọn con đường này:

* Cải thiện **scalability (khả năng mở rộng), performance (hiệu năng), security (bảo mật) và agility (sự linh hoạt)**.
* **Chia nhỏ monolithic application (ứng dụng nguyên khối)** thành **microservices**.

Đây là chiến lược **tốn nhiều công sức nhất**, nhưng thường đem lại **lợi ích lớn nhất** từ khả năng của cloud. Ví dụ: chuyển ứng dụng sang **serverless architecture** hoặc dùng **Amazon S3** để lưu trữ dữ liệu.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Chiến lược nào là "lift and shift"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Rehost.

Giải thích: Bê nguyên ứng dụng lên cloud, không tối ưu hóa gì.

Tham chiếu: Mục Nhóm dịch chuyển.

</details>

**Câu 2:** Retire có thể giúp tiết kiệm chi phí khoảng bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 10–20%.

Giải thích: Tắt các dịch vụ không cần thiết còn giúp giảm bề mặt tấn công và tập trung nguồn lực.

Tham chiếu: Mục Nhóm không migrate hoặc bỏ đi.

</details>

**Câu 3:** Migrate database sang RDS là ví dụ của chiến lược nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Replatform (lift and reshape).

Giải thích: Không đổi kiến trúc lõi nhưng chuyển sang dịch vụ fully-managed để hưởng lợi ích backup, resiliency, high availability.

Tham chiếu: Mục Nhóm dịch chuyển.

</details>

**Câu 4:** Chuyển CRM sang Salesforce là chiến lược nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Repurchase (drop and shop).

Giải thích: Đổi sang sản phẩm SaaS khác; tốn kém ngắn hạn nhưng triển khai nhanh.

Tham chiếu: Mục Nhóm dịch chuyển.

</details>

**Câu 5:** Chiến lược nào đòi hỏi nhiều công sức nhất nhưng đem lại nhiều lợi ích nhất?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Refactor / Re-architect.

Giải thích: Tái kiến trúc theo cloud-native, ví dụ chuyển sang serverless hoặc chia nhỏ monolith thành microservices.

Tham chiếu: Mục Nhóm làm lại từ đầu.

</details>

---

Vậy là các bạn đã đi hết **The 7 Rs**: Retire, Retain, Relocate, Rehost, Replatform, Repurchase và Refactor. Hãy nhớ cả 7 để không bị "khớp" khi đề hỏi chiến lược nào phù hợp với tình huống nào nhé. Ở bài tiếp theo, chúng ta tìm hiểu bộ đôi **Application Discovery Service** và **Application Migration Service**. Hẹn gặp lại! 🚀
