# 🕰️ S3 Versioning: Bảo vệ file khỏi ghi đè và xóa nhầm

> Nguồn: `074-S3-Versioning-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20055932)

Chúng ta đã biết cách tạo website trên S3 — nhưng sẽ thế nào nếu bạn muốn **cập nhật website một cách an toàn**? Câu trả lời là **versioning**. Bài này mình sẽ giải thích versioning hoạt động ra sao và vì sao đây là best practice cho mọi bucket.

---

### 🔁 Versioning hoạt động thế nào?

Versioning là một **setting bật ở cấp bucket**. Khi đã bật:

* Mỗi lần người dùng upload một file, S3 tạo một **version** của file đó tại key đã chọn.
* Nếu bạn **upload lại cùng key** — tức là ghi đè file cũ — S3 sẽ **không ghi mất bản cũ**, mà tạo **version 2**, rồi **version 3**, v.v.

Nói cách khác, mọi phiên bản của file đều được giữ lại theo thời gian.

---

### 💡 Vì sao nên bật versioning?

**Versioning là best practice cho bucket của bạn.** Hai lợi ích chính:

1. **Bảo vệ khỏi việc xóa ngoài ý muốn (unintended deletes):** khi bạn xóa một file, S3 thực chất chỉ thêm một **delete marker (dấu xóa)** — và bạn có thể **khôi phục** các version trước đó.
2. **Dễ dàng roll back về version cũ:** nếu muốn quay lại trạng thái của file hai ngày trước, bạn chỉ cần roll back.

---

### ⚠️ Những điều cần lưu ý

* Mọi file **chưa được versioning trước khi bạn bật tính năng** sẽ có **version ID là null**.
* Nếu bạn **suspend (tạm dừng) versioning**, các version cũ **không bị xóa** — đây là thao tác an toàn.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Versioning được bật ở cấp nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cấp bucket.

Giải thích: Đây là setting của bucket, không phải của từng object.

Tham chiếu: Mục Versioning hoạt động thế nào.

</details>

**Câu 2:** Upload lại cùng một key khi đã bật versioning thì điều gì xảy ra?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 tạo một version mới (version 2, 3...) thay vì ghi mất bản cũ.

Giải thích: Các phiên bản cũ vẫn được giữ lại.

Tham chiếu: Mục Versioning hoạt động thế nào.

</details>

**Câu 3:** Xóa một file khi bật versioning thực chất làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thêm một delete marker, và bạn có thể khôi phục các version trước đó.

Giải thích: Nhờ vậy versioning bảo vệ khỏi xóa ngoài ý muốn.

Tham chiếu: Mục Vì sao nên bật versioning.

</details>

**Câu 4:** File upload trước khi bật versioning có version ID là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** null.

Giải thích: File không được versioning trước đó sẽ mang version null.

Tham chiếu: Mục Những điều cần lưu ý.

</details>

**Câu 5:** Suspend versioning có xóa các version cũ không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — đây là thao tác an toàn.

Giải thích: Version cũ vẫn được giữ nguyên khi bạn tạm dừng versioning.

Tham chiếu: Mục Những điều cần lưu ý.

</details>

---

Vậy là các bạn đã hiểu versioning: bật ở cấp bucket, giữ mọi phiên bản file, chống xóa nhầm và cho phép roll back. *Đây là kiến thức rất hay được hỏi trong đề thi đấy nhé.*

Ở bài sau, chúng ta sẽ vào console bật versioning, tạo version mới và thực hành rollback. Hẹn gặp lại! 🚀
