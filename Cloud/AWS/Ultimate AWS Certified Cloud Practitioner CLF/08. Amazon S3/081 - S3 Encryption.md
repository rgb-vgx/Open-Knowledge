# 🔐 S3 Encryption: Server-side mặc định hay Client-side tự lo?

> Nguồn: `081-S3-Encryption.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/29102298)

Mã hóa S3 là chủ đề **có thể xuất hiện trong đề thi**, nên mình dành một bài để review nhanh ở mức high-level. Điều quan trọng nhất cần nhớ: **server-side encryption luôn được bật mặc định**.

---

### 🛡️ Server-side encryption — mặc định luôn bật

* Mỗi khi bạn **tạo bucket** hoặc **upload object**, dữ liệu sẽ được mã hóa.
* Cách hoạt động: user upload object lên Amazon S3 → khi object đến bucket, **Amazon S3 sẽ mã hóa nó** vì mục đích bảo mật.
* Vì **server (máy chủ) thực hiện việc mã hóa**, mô hình này được gọi là **server-side encryption**.

*Đây là mô hình mặc định và luôn hoạt động — bạn không cần làm gì thêm.*

---

### 🔑 Client-side encryption — bạn mã hóa trước khi upload

* Ngược lại với server-side, **client-side encryption** là khi **người dùng tự mã hóa file trước khi upload**.
* "Ổ khóa" nằm trong tay người dùng: file được mã hóa ngay phía bạn, sau đó mới được đưa vào bucket.

*Cả hai mô hình đều tồn tại trên AWS — tùy nhu cầu mà bạn chọn.*

---

### ⚖️ So sánh nhanh hai mô hình

| Tiêu chí | Server-side | Client-side |
|---|---|---|
| Ai mã hóa | Amazon S3 | Người dùng |
| Thời điểm | Sau khi object vào bucket | Trước khi upload |
| Mặc định | Luôn bật | Tự làm nếu muốn |

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Mô hình mã hóa nào luôn được bật mặc định trên S3?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Server-side encryption.
Giải thích: Mặc định mỗi khi tạo bucket hoặc upload object, dữ liệu đã được mã hóa.
Tham chiếu: Mục Server-side encryption.

</details>

**Câu 2:** Trong server-side encryption, ai là người thực hiện mã hóa?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon S3 — tức server.
Giải thích: Object được mã hóa khi nó đến bucket, nên gọi là server-side.
Tham chiếu: Mục Server-side encryption.

</details>

**Câu 3:** Trong client-side encryption, ai mã hóa và ở thời điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Người dùng mã hóa file trước khi upload.
Giải thích: "Ổ khóa" do người dùng giữ, file đã mã hóa mới được đưa lên bucket.
Tham chiếu: Mục Client-side encryption.

</details>

**Câu 4:** Cả hai mô hình mã hóa này có tồn tại trên AWS không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có, cả hai đều tồn tại.
Giải thích: Tùy nhu cầu, bạn có thể dùng server-side hoặc client-side; mặc định là server-side.
Tham chiếu: Mục Client-side encryption.

</details>

**Câu 5:** Vì sao server-side encryption được nhắc trong bài này là quan trọng cho thi cử?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì đây là câu hỏi có thể xuất hiện trong đề, và điều cần nhớ là nó luôn bật mặc định.
Giải thích: Bài giảng là phần review mức high-level để phục vụ kỳ thi.
Tham chiếu: Mục Server-side encryption.

</details>

---

Vậy là các bạn đã nắm hai mô hình mã hóa của S3 chỉ trong vài phút. *Chỉ cần nhớ: "server-side mặc định luôn bật" là bạn đã giữ chắc một điểm trong đề thi.*

Bài tiếp theo, chúng ta sẽ nói về **IAM Access Analyzer for S3** — công cụ giúp phát hiện bucket bị chia sẻ ngoài ý muốn. Hẹn gặp các bạn ở đó! 🚀
