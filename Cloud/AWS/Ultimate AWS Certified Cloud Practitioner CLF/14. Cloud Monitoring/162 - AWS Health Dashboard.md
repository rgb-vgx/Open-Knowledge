# 🏥 AWS Health Dashboard: Theo dõi "sức khỏe" AWS trước khi sự cố ảnh hưởng bạn

> Nguồn: `162-AWS-Health-Dashboard.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056236)

Chào các bạn! Hôm nay chúng ta cùng tìm hiểu **AWS Health Dashboard** — dịch vụ trả lời câu hỏi: "AWS hôm nay có ổn không, và có sự cố nào đang ảnh hưởng đến mình không?". Đây là bài lý thuyết quan trọng, vì đề thi rất hay khai thác việc phân biệt hai phần của Health Dashboard.

---

### 🧭 Hai phần của Health Dashboard

Health Dashboard gồm **hai phần** rõ rệt:

1. **Service History** — sức khỏe của các dịch vụ AWS.
2. **Health Dashboard cho tài khoản của bạn (Your Accounts)** — những gì ảnh hưởng trực tiếp đến bạn.

*Nghe thì đơn giản, nhưng đây chính là chỗ dễ mất điểm nhất nếu không nắm kỹ. Cùng đi từng phần nhé.*

---

### 📊 Service History — sức khỏe tổng thể của mọi dịch vụ

**Service History** hiển thị tình trạng của **tất cả các region và tất cả các dịch vụ**.

* Bạn theo dõi được, dựa trên region mình đang ở, **một service đã hoạt động thế nào, có gặp vấn đề gì không**.
* Có thể xem **lịch sử theo từng ngày**.
* Có **RSS feed** để bạn đăng ký theo dõi.

Trước đây phần này được gọi là **AWS Service Health Dashboard** — giờ chỉ còn là thông tin chung về tình trạng dịch vụ.

---

### 🏥 Health Dashboard cho tài khoản của bạn

Phần thứ hai là **AWS Health Dashboard** dành cho **tài khoản của bạn**.

* Tên cũ là **AWS Personal Health Dashboard (PHD)**; nay là **Health Dashboard for Your Accounts**.
* Nó cung cấp **alerts (cảnh báo)** và **remediation guidance (hướng dẫn khắc phục)** khi AWS có những **event ảnh hưởng trực tiếp đến bạn**.

Sự khác biệt cốt lõi:

* **Service Health Dashboard**: hiển thị **tình trạng chung của tất cả dịch vụ**.
* **Account Health Dashboard**: cho bạn góc nhìn về **hiệu năng (performance) và tính sẵn sàng (availability)** của đúng những dịch vụ và tài nguyên bạn đang dùng trong tài khoản.

Ngoài ra, phần dành cho tài khoản còn:

* Cung cấp **thông tin liên quan và kịp thời**.
* Gửi **notifications** để bạn **chủ động (proactively)** theo dõi các **hoạt động bảo trì theo lịch (scheduled maintenance)**.
* Cho phép **tổng hợp dữ liệu (aggregate data) cho toàn bộ AWS organization** của bạn.

| Tiêu chí | Service Health | Account Health |
|---|---|---|
| Phạm vi | Tất cả region và dịch vụ | Tài khoản và tài nguyên của bạn |
| Nội dung | Tình trạng chung, lịch sử theo ngày, RSS feed | Alert và hướng dẫn khắc phục khi bị ảnh hưởng |
| Tên cũ | AWS Service Health Dashboard | AWS Personal Health Dashboard (PHD) |
| Dữ liệu tổ chức | Thông tin chung | Tổng hợp toàn bộ AWS organization |

---

### 📍 Truy cập Health Dashboard ở đâu?

Rất đơn giản: bấm vào **góc trên bên phải màn hình, cạnh biểu tượng chuông (bell)** là bạn vào được Health Dashboard.

Vài đặc điểm cần nhớ:

* Đây là **global service (dịch vụ toàn cầu)**.
* Nó hiển thị trực tiếp **các outage ảnh hưởng đến chính bạn**.
* Bạn có **event log** để xem lại các sự kiện trong quá khứ.
* Ví dụ mình từng thấy một **sự cố EC2 ở US East 2** có thể đã ảnh hưởng đến mình.

Từ đó, bạn nhận được **alerts, thông tin khắc phục, thông báo chủ động** khi có **thay đổi theo lịch (scheduled change)** cũng như các **hoạt động theo lịch (scheduled activities)**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** AWS Health Dashboard gồm hai phần nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Service History (sức khỏe dịch vụ) và Health Dashboard cho tài khoản của bạn.

Giải thích: Một phần là thông tin chung, một phần là thông tin ảnh hưởng trực tiếp đến bạn.

Tham chiếu: Mục Hai phần của Health Dashboard.

</details>

**Câu 2:** Tên cũ của Health Dashboard cho tài khoản là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS Personal Health Dashboard (PHD).

Giải thích: Nay được gọi là Health Dashboard for Your Accounts.

Tham chiếu: Mục Health Dashboard cho tài khoản của bạn.

</details>

**Câu 3:** Điểm khác biệt chính giữa Service Health Dashboard và Account Health Dashboard là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Service Health hiển thị tình trạng chung của tất cả dịch vụ; Account Health cho biết hiệu năng và tính sẵn sàng của dịch vụ, tài nguyên bạn đang dùng.

Giải thích: Account Health chỉ tập trung vào những gì ảnh hưởng trực tiếp đến tài khoản của bạn.

Tham chiếu: Mục Health Dashboard cho tài khoản của bạn.

</details>

**Câu 4:** Bạn truy cập Health Dashboard bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bấm vào góc trên bên phải màn hình, cạnh biểu tượng chuông.

Giải thích: Đây là lối vào nhanh Health Dashboard trên AWS console.

Tham chiếu: Mục Truy cập Health Dashboard ở đâu.

</details>

**Câu 5:** Account Health Dashboard hỗ trợ gì cho tổ chức của bạn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tổng hợp dữ liệu (aggregate data) cho toàn bộ AWS organization.

Giải thích: Nhờ vậy bạn có góc nhìn sức khỏe cho mọi tài khoản trong tổ chức.

Tham chiếu: Mục Health Dashboard cho tài khoản của bạn.

</details>

---

Vậy là các bạn đã phân biệt được rõ hai phần của Health Dashboard. *Nhớ nhanh: Service Health = toàn cầu, đại chúng; Account Health = riêng bạn, ảnh hưởng trực tiếp.*

Ở bài tiếp theo, chúng ta sẽ mở console và thực hành xem Service Health lẫn Account Health. Hẹn gặp các bạn ở đó! 🚀
