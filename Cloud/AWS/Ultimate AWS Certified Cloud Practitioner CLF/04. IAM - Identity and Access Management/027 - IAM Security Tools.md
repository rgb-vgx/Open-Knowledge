# 🛡️ IAM Security Tools: Credentials Report và Access Advisor

> Nguồn: `027-IAM-Security-Tools.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20208152)

Chúng ta đang đến gần cuối phần IAM rồi! Trước khi tổng kết, mình muốn giới thiệu **hai công cụ bảo mật** quan trọng của IAM: **Credentials Report** và **Access Advisor**. Đây là những công cụ giúp bạn kiểm soát quyền truy cập tài khoản của mình.

---

### 📊 IAM Credentials Report

* Đây là công cụ ở **cấp tài khoản (account-level)**.
* Báo cáo chứa **toàn bộ users trong tài khoản** và **trạng thái các credentials (thông tin xác thực)** của họ.

Chúng ta sẽ tạo báo cáo này ngay trong bài thực hành kế tiếp và xem chi tiết bên trong có gì.

---

### 🔍 IAM Access Advisor

* Đây là công cụ ở **cấp người dùng (user-level)**.
* Access Advisor cho biết **những quyền dịch vụ nào đã được cấp cho user** và **lần cuối các dịch vụ đó được truy cập là khi nào**.

Vì sao công cụ này hữu ích? Vì nó gắn với **nguyên tắc least privilege (quyền tối thiểu)**. Nhờ Access Advisor, các bạn thấy được **quyền nào đang không được dùng đến** và có thể **thu hồi bớt** để user chỉ còn đúng những quyền cần thiết.

---

### 📋 So sánh nhanh hai công cụ

| Tiêu chí | Credentials Report | Access Advisor |
|---|---|---|
| Phạm vi | Account-level | User-level |
| Nội dung | Users và trạng thái credentials | Quyền dịch vụ và lần truy cập cuối |
| Dùng khi | Kiểm tra tình trạng credentials | Thu hồi quyền không dùng |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** IAM Credentials Report được tạo ở cấp nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Account-level (cấp tài khoản).

Giải thích: Báo cáo bao quát toàn bộ users của tài khoản.

Tham chiếu: Mục IAM Credentials Report.

</details>

**Câu 2:** Credentials Report chứa những thông tin gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tất cả users trong tài khoản và trạng thái các credentials của họ.

Giải thích: Đây là công cụ để nhìn nhanh tình trạng xác thực của mọi user.

Tham chiếu: Mục IAM Credentials Report.

</details>

**Câu 3:** IAM Access Advisor hoạt động ở cấp nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** User-level (cấp người dùng).

Giải thích: Công cụ này phân tích cho từng user cụ thể.

Tham chiếu: Mục IAM Access Advisor.

</details>

**Câu 4:** Access Advisor hiển thị những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Các service permission đã cấp cho user và lần cuối những dịch vụ đó được truy cập.

Giải thích: Nhờ đó bạn biết quyền nào thực sự được dùng.

Tham chiếu: Mục IAM Access Advisor.

</details>

**Câu 5:** Access Advisor hỗ trợ thực hiện nguyên tắc bảo mật nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nguyên tắc least privilege (quyền tối thiểu).

Giải thích: Phát hiện quyền không dùng để giảm bớt quyền của user.

Tham chiếu: Mục IAM Access Advisor.

</details>

---

Ở bài tiếp theo, mình sẽ hướng dẫn các bạn **tự tay tạo Credentials Report và xem Access Advisor** trên console. Hẹn gặp các bạn ở đó! 🚀
