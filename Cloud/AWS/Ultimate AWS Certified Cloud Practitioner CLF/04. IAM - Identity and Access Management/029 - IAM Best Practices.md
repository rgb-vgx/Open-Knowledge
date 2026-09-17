# 🧭 IAM Best Practices: Những nguyên tắc không thể bỏ qua

> Nguồn: `029-IAM-Best-Practices.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20260600)

Phần IAM sắp khép lại, và trước khi các bạn mang kiến thức này ra dùng thật, mình muốn gửi gắm những **best practices (thực hành tốt nhất)**. Đây là các nguyên tắc giúp bạn tránh sai sót bảo mật — và cũng rất dễ xuất hiện trong đề thi.

---

### 🚫 Đừng dùng root account cho công việc hằng ngày

* **Không dùng root account**, ngoại trừ lúc **thiết lập tài khoản AWS** ban đầu. Đến giờ các bạn đã có **2 tài khoản**: root account và tài khoản cá nhân của mình.
* **Một AWS user = một người thật**. Nếu bạn bè muốn dùng AWS, **đừng đưa credentials của bạn cho họ** — hãy tạo cho họ một user riêng.

---

### 👥 Quản lý quyền ở cấp group

* Gán **users vào groups**, và gán **permission cho groups** — như vậy bảo mật được quản lý ở **cấp group**.
* Tạo **password policy mạnh** cho người dùng.
* Bật và **thực thi MFA (Multi-Factor Authentication — xác thực đa yếu tố)** để tài khoản an toàn hơn trước hacker.

---

### 🎭 Roles và access keys

* Tạo và dùng **roles** mỗi khi gán quyền cho **dịch vụ AWS**, bao gồm cả **EC2 Instance** (máy chủ ảo).
* Nếu dùng AWS **theo lập trình (programmatically)** — qua **CLI** hoặc **SDK** — các bạn phải tạo **access keys**. Hãy coi access keys **như mật khẩu**: cực kỳ bí mật, chỉ giữ cho riêng mình.

---

### 🧰 Rà soát quyền và bảo vệ tài khoản

* Muốn chỉnh sửa quyền của tài khoản, hãy dùng **IAM Credentials Report** hoặc **IAM Access Advisor**.
* Và lời nhắc cuối, mình nói rất nghiêm túc: **tuyệt đối không bao giờ chia sẻ IAM users và access keys của bạn với bất kỳ ai**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Khi nào thì được dùng root account?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ khi thiết lập tài khoản AWS ban đầu.

Giải thích: Mọi công việc thường ngày nên dùng user riêng.

Tham chiếu: Mục Đừng dùng root account cho công việc hằng ngày.

</details>

**Câu 2:** Nếu bạn bè muốn dùng AWS, bạn nên làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tạo một user riêng cho họ, không chia sẻ credentials của mình.

Giải thích: Một AWS user tương ứng một người thật.

Tham chiếu: Mục Đừng dùng root account cho công việc hằng ngày.

</details>

**Câu 3:** Vì sao nên gán permission cho groups thay vì từng user?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để bảo mật được quản lý ở cấp group.

Giải thích: Gán user vào group rồi gán quyền cho group giúp quản lý nhất quán hơn.

Tham chiếu: Mục Quản lý quyền ở cấp group.

</details>

**Câu 4:** Access keys dùng cho việc gì và cần đối xử thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng khi truy cập AWS qua CLI hoặc SDK; phải coi như mật khẩu và giữ bí mật.

Giải thích: Access keys rất nhạy cảm, chỉ giữ cho riêng mình.

Tham chiếu: Mục Roles và access keys.

</details>

**Câu 5:** Hai công cụ IAM giúp rà soát quyền của tài khoản là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** IAM Credentials Report và IAM Access Advisor.

Giải thích: Dùng để chỉnh sửa, đánh giá quyền của tài khoản.

Tham chiếu: Mục Rà soát quyền và bảo vệ tài khoản.

</details>

---

Vậy là bạn đã nắm trọn bộ best practices của IAM. Ở bài tiếp theo, chúng ta sẽ bàn về **mô hình trách nhiệm chung (Shared Responsibility Model)** áp dụng cho IAM. Hẹn gặp các bạn ở đó! 🚀
