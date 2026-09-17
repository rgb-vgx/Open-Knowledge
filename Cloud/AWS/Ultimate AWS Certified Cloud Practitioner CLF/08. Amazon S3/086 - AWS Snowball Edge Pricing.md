# 💰 Snowball Edge Pricing: Chiều dữ liệu nào miễn phí, chiều nào mất tiền?

> Nguồn: `086-AWS-Snowball-Edge---Pricing.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/40425912)

Pricing của Snowball Edge khá đơn giản nhưng cực dễ xuất hiện trong đề thi. Mình sẽ tách rõ **hai khoản phí**, **chiều dữ liệu miễn phí**, và **hai mức giá thuê thiết bị** để các bạn nắm chắc.

---

### 🎯 Hai khoản phí bạn phải trả

1. **Phí sử dụng thiết bị (usage)**.
2. **Data transfer out of AWS** — tức dữ liệu đi ra khỏi AWS.

---

### 🔁 Chiều dữ liệu và chi phí

| Chiều dữ liệu | Chi phí |
|---|---|
| Từ AWS vào Snowball Edge rồi bạn nhận | Có tính phí |
| Từ Snowball Edge vào Amazon S3 | **0 USD/GB — miễn phí** |

Nói cách khác: **đưa dữ liệu vào Amazon S3 là miễn phí**, còn lấy dữ liệu ra khỏi AWS thì bạn phải trả tiền.

---

### 📅 On-demand — trả theo job

* Bạn trả **một khoản phí dịch vụ một lần cho mỗi job (one-time service fee)**.
* Trong phí đó đã bao gồm:
  * **10 ngày** sử dụng cho Snowball Edge Storage Optimized **80 TB**
  * **15 ngày** sử dụng cho bản **210 TB**
* **Ngày vận chuyển không được tính** vào hạn mức 10/15 ngày đó; ship từ AWS đến bạn hoặc từ bạn về AWS đều **miễn phí**.
* Quá hạn mức, bạn trả thêm **theo số ngày** phát sinh.

---

### 🤝 Committed upfront — cam kết trả trước

* Bạn trả trước cho **monthly, một năm hoặc ba năm** sử dụng thiết bị Snowball Edge.
* Hình thức này dành cho **edge computing**.
* Đổi lại, bạn được **giảm giá tới 62%** vì đã cam kết dài hạn.

---

### 🧠 Ghi nhớ nhanh cho đề thi

Mọi thứ đều phải trả tiền, **ngoại trừ dữ liệu đi vào Amazon S3 — 0 USD/GB**.

---

### 🧪 Tự kiểm tra nhanh

**Câu 1:** Hai khoản phí của Snowball Edge là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phí sử dụng thiết bị và phí data transfer out of AWS.
Giải thích: Bạn trả cho việc dùng thiết bị và cho dữ liệu đi ra khỏi AWS.
Tham chiếu: Mục Hai khoản phí bạn phải trả.

</details>

**Câu 2:** Chiều truyền dữ liệu nào miễn phí?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Từ Snowball Edge vào Amazon S3 — 0 USD/GB.
Giải thích: Đưa dữ liệu vào S3 là miễn phí, còn lấy dữ liệu ra khỏi AWS thì có phí.
Tham chiếu: Mục Chiều dữ liệu và chi phí.

</details>

**Câu 3:** Gói on-demand bao gồm bao nhiêu ngày sử dụng cho mỗi bản thiết bị?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 10 ngày cho bản 80 TB và 15 ngày cho bản 210 TB.
Giải thích: Đây là số ngày nằm trong phí dịch vụ một lần của mỗi job.
Tham chiếu: Mục On-demand — trả theo job.

</details>

**Câu 4:** Ngày vận chuyển có bị tính vào hạn mức 10/15 ngày không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không, ngày shipping không tính vào hạn mức.
Giải thích: Shipping từ AWS đến bạn hoặc từ bạn về AWS đều miễn phí.
Tham chiếu: Mục On-demand — trả theo job.

</details>

**Câu 5:** Cam kết trả trước (committed upfront) giúp bạn tiết kiệm bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giảm giá tới 62%.
Giải thích: Đổi lấy cam kết monthly, một năm hoặc ba năm, dành cho edge computing.
Tham chiếu: Mục Committed upfront — cam kết trả trước.

</details>

---

Vậy là các bạn đã nắm gọn pricing Snowball Edge. *Chỉ cần nhớ một câu: "vào S3 miễn phí, ra khỏi AWS thì trả tiền" — và con số giảm giá 62% là bạn đã sẵn sàng cho câu hỏi pricing.*

Bài tiếp theo chúng ta sẽ tìm hiểu **AWS Storage Gateway** — cây cầu nối lưu trữ on-premises lên cloud. Hẹn gặp các bạn ở đó! 🚀
