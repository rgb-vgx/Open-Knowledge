# 🗣️ Amazon Polly: Biến văn bản thành giọng nói bằng Deep Learning

> Nguồn: `199-Polly-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056354)

Sang bài này, chúng ta làm quen với **Amazon Polly** — dịch vụ **ngược lại hoàn toàn với Transcribe**: thay vì chuyển speech thành text, Polly biến **text thành speech (giọng nói)** bằng **deep learning**.

Nhờ Polly, các bạn có thể tạo ra những **ứng dụng biết nói**.

---

### 🎯 Polly là gì?

Polly dùng deep learning để chuyển văn bản thành audio. Ví dụ, với câu:

> *"Hello, my name is Stephane and this is a demo of Amazon Polly."*

Polly sẽ tạo ra một đoạn audio và các bạn có thể phát ngay. *Mình nghĩ mình nói tiếng Anh còn tự nhiên hơn nó ấy chứ* — nhưng đây là một demo rất thuyết phục, đúng không nào?

---

### 🖥️ Thử Polly trên console

1. Mở **Amazon Polly console**.
2. Nhập đoạn text: *"Hi, my name is Stephane. I love AWS courses, and I love machine learning."*
3. Bấm **Listen** — Polly đọc lại đoạn văn bản đó bằng giọng nói.

*Các bạn cứ mở console và nghịch thử — học qua thực hành luôn là cách nhớ lâu nhất.*

---

### 🤖 Standard engine — giọng "robot" hơn

Nếu muốn giọng đọc **nghe robot hơn**, các bạn chỉ cần chuyển sang **standard engine**. Cùng một đoạn text nhưng engine khác nhau sẽ cho ra chất giọng khác nhau.

*Mẹo nhỏ: hãy nhớ **Polly và Transcribe là một cặp đối lập** — đề thi rất thích hỏi kiểu này.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon Polly làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Biến text (văn bản) thành speech (giọng nói/audio).
Giải thích: Đây là chức năng cốt lõi của Polly.
Tham chiếu: Mục Polly là gì.

</details>

**Câu 2:** Polly là "phiên bản ngược" của dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Transcribe — vì Transcribe chuyển speech thành text, còn Polly chuyển text thành speech.
Giải thích: Cặp đối lập này rất hay được hỏi trong đề thi.
Tham chiếu: Mục Polly là gì.

</details>

**Câu 3:** Polly sử dụng công nghệ gì để tạo giọng nói?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Deep learning.
Giải thích: Chính deep learning giúp giọng đọc tự nhiên và rõ ràng.
Tham chiếu: Mục Polly là gì.

</details>

**Câu 4:** Muốn có giọng đọc "robot" hơn thì dùng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Standard engine.
Giải thích: Các engine khác nhau cho ra chất giọng khác nhau.
Tham chiếu: Mục Standard engine.

</details>

**Câu 5:** Polly giúp bạn tạo ra loại ứng dụng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ứng dụng biết nói — ứng dụng có khả năng đọc văn bản thành giọng nói.
Giải thích: Đây là ứng dụng thực tế phổ biến nhất của Polly.
Tham chiếu: Mục Polly là gì.

</details>

---

Vậy là xong một dịch vụ cực kỳ dễ nhớ: **Polly = text → speech**, dùng deep learning, có **standard engine** cho giọng robot hơn. *Chỉ cần nhớ nó "nói" được — thế là nắm chắc điểm phần này.*

Bài tiếp theo chúng ta sẽ gặp **Amazon Translate** — dịch vụ dịch ngôn ngữ. Hẹn gặp các bạn! 🚀
