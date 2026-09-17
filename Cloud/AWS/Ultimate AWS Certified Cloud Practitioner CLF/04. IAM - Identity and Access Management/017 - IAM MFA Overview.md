# 🔐 Bảo vệ tài khoản AWS — Password Policy và MFA

> Nguồn: `017-IAM-MFA-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20208142)

Đã có users và groups, giờ là lúc **bảo vệ chúng khỏi bị xâm phạm**. AWS cung cấp **2 cơ chế phòng thủ**: **password policy** và **MFA**. Cả hai đều cực kỳ quan trọng, và MFA là chủ đề **chắc chắn có trong đề thi**.

---

### 🧱 Phòng thủ 1 — Password Policy

Mật khẩu càng mạnh, tài khoản càng an toàn. Trong AWS, bạn có thể thiết lập **password policy (chính sách mật khẩu)** với các tùy chọn:

* **Độ dài tối thiểu** của mật khẩu.
* **Yêu cầu loại ký tự**: chữ in hoa, chữ in thường, chữ số, ký tự đặc biệt (non-alphanumeric, ví dụ dấu hỏi `?`).
* **Cho phép hoặc không** IAM users tự đổi mật khẩu.
* **Bắt buộc đổi mật khẩu sau một thời gian** — ví dụ **mỗi 90 ngày** mật khẩu hết hạn.
* **Ngăn tái sử dụng mật khẩu** — user không được đổi sang mật khẩu đang dùng hoặc đã từng dùng.

Password policy giúp bạn chống lại **brute force attack (tấn công dò mật khẩu)**.

---

### 🔑 Phòng thủ 2 — MFA

**MFA (Multi-Factor Authentication — xác thực đa yếu tố)** là cơ chế thứ hai — bạn có thể đã gặp trên các website khác, nhưng trên AWS nó là **điều bắt buộc phải biết** và rất được khuyến nghị dùng.

MFA = **mật khẩu bạn biết** + **thiết bị bảo mật bạn sở hữu**. Ví dụ bạn **Alice** biết mật khẩu và có thiết bị sinh **MFA token** — khi đăng nhập cần cả hai. Lợi ích: kể cả khi mật khẩu bị đánh cắp, tài khoản **vẫn không bị xâm phạm**, vì hacker cần cả **thiết bị vật lý** (ví dụ điện thoại) của Alice — điều khó xảy ra hơn nhiều.

> Bạn nên bảo vệ **tối thiểu root account** — và tốt nhất là **toàn bộ IAM users**.

---

### 📱 Các loại MFA device trên AWS

| Loại thiết bị | Ví dụ | Đặc điểm |
|---|---|---|
| **Virtual MFA device** | Google Authenticator, Authy | Chạy trên điện thoại, không cần thiết bị vật lý |
| **U2F Security Key** | YubiKey của Yubico | Thiết bị vật lý, hỗ trợ nhiều root/IAM user |
| **Hardware key fob MFA** | Thiết bị của Gemalto | Thiết bị vật lý dạng móc khóa |
| **GovCloud key fob** | SurePassID | Riêng cho AWS GovCloud của chính phủ Mỹ |

Chi tiết đáng nhớ:

* **Google Authenticator** chỉ hoạt động với **một điện thoại tại một thời điểm**; **Authy** hỗ trợ **nhiều token trên cùng một thiết bị** — bạn có thể chứa root account, IAM user, account khác, IAM user khác... **bao nhiêu cũng được**.
* **U2F (Universal 2nd Factor)** là thiết bị vật lý của **bên thứ ba** (Yubico, không phải AWS), gắn được vào móc chìa khóa, và **một key hỗ trợ nhiều root/IAM user**.
* **Gemalto** cung cấp hardware key fob; **SurePassID** cung cấp key fob riêng cho **AWS GovCloud** — cũng đều là bên thứ ba.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Hai cơ chế bảo vệ tài khoản AWS được nhắc trong bài là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Password policy và MFA. Giải thích: Một cái tăng độ mạnh mật khẩu, một cái thêm lớp xác thực thứ hai. Tham chiếu: Toàn bài.
</details>

**Câu 2:** MFA là sự kết hợp của hai yếu tố nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mật khẩu bạn biết + thiết bị bảo mật bạn sở hữu. Giải thích: Kẻ tấn công cần cả thiết bị vật lý, ví dụ điện thoại. Tham chiếu: Mục Phòng thủ 2.
</details>

**Câu 3:** Authy khác Google Authenticator ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Authy hỗ trợ nhiều token trên một thiết bị; Google Authenticator chỉ một điện thoại tại một thời điểm. Tham chiếu: Mục Các loại MFA device.
</details>

**Câu 4:** YubiKey do ai cung cấp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Yubico — bên thứ ba, không phải AWS. Giải thích: Đây là U2F Security Key dạng thiết bị vật lý. Tham chiếu: Mục Các loại MFA device.
</details>

**Câu 5:** Password policy giúp chống lại kiểu tấn công nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Brute force attack. Giải thích: Mật khẩu dài và phức tạp hơn giúp tài khoản an toàn hơn. Tham chiếu: Mục Phòng thủ 1.
</details>

---

Nắm chắc hai lớp phòng thủ này là bạn đã bảo vệ tài khoản AWS đúng cách. Ở bài tiếp theo, chúng ta sẽ **thực hành thiết lập password policy và bật MFA cho root account**. Hẹn gặp các bạn! 🚀
