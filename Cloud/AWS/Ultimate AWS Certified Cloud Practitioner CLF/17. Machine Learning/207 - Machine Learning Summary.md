# 🏁 Tổng kết Machine Learning: Các dịch vụ AWS nhất định phải nhớ

> Nguồn: `207-Machine-Learning-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20245410)

Chúng ta đã đi hết chương Machine Learning! Bài này mình sẽ **ôn tập nhanh toàn bộ dịch vụ** — đây là danh sách các bạn **buộc phải nhớ khi bước vào phòng thi**. Nắm chắc phần này, các bạn sẽ giành được **một vài điểm** rất đáng giá.

---

### 📋 Bảng tổng hợp dịch vụ Machine Learning

| Dịch vụ | Công dụng chính |
|---|---|
| **Rekognition** | Phát hiện khuôn mặt, gán nhãn, nhận diện người nổi tiếng |
| **Transcribe** | Chuyển audio thành text, tạo phụ đề |
| **Polly** | Chuyển text thành audio (ngược với Transcribe) |
| **Translate** | Dịch ngôn ngữ |
| **Lex** | Xây dựng chatbot hội thoại; ghép với Connect thành contact center |
| **Connect** | Tổng đài liên hệ (contact center) trên cloud |
| **Comprehend** | Xử lý ngôn ngữ tự nhiên (NLP) |
| **SageMaker** | Dịch vụ ML đầy đủ cho developer và data scientist |
| **Kendra** | Công cụ tìm kiếm tài liệu bằng machine learning |
| **Personalize** | Gợi ý cá nhân hóa theo thời gian thực |
| **Textract** | Phát hiện và trích xuất text, dữ liệu từ tài liệu |

---

### 🔑 Các cặp dễ nhầm cần khắc cốt ghi tâm

* **Transcribe ↔ Polly**: một chiều là **speech → text**, chiều ngược lại là **text → speech**. Đề thi rất hay hoán đổi hai dịch vụ này.
* **Lex ↔ Comprehend**: Lex hiểu **ý định trong hội thoại** để làm chatbot; Comprehend thì **phân tích văn bản** (NLP). Thấy NLP là chọn Comprehend.
* **Connect** không đứng một mình — hãy nhớ nó là **contact center trên cloud**, thường đi kèm Lex.
* **Kendra vs Textract**: Kendra **tìm kiếm câu trả lời** trong tài liệu; Textract **trích xuất text và dữ liệu** từ tài liệu quét.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Dịch vụ nào chuyển audio thành text và tạo phụ đề?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Transcribe.
Giải thích: Transcribe chuyên chuyển speech thành text.
Tham chiếu: Mục Bảng tổng hợp dịch vụ.

</details>

**Câu 2:** Dịch vụ nào là "phiên bản ngược" của Polly?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Transcribe — vì Polly chuyển text thành audio còn Transcribe chuyển audio thành text.
Giải thích: Đây là cặp đối lập kinh điển của chương.
Tham chiếu: Mục Các cặp dễ nhầm.

</details>

**Câu 3:** Bạn cần xây chatbot hội thoại và một contact center trên cloud. Dùng những dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Lex để xây chatbot, kết hợp Amazon Connect để tạo contact center trên cloud.
Giải thích: Lex và Connect thường đi cùng nhau.
Tham chiếu: Mục Bảng tổng hợp dịch vụ.

</details>

**Câu 4:** Dịch vụ nào dùng cho NLP?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Comprehend.
Giải thích: Thấy NLP trong đề là nghĩ ngay Comprehend.
Tham chiếu: Mục Bảng tổng hợp dịch vụ.

</details>

**Câu 5:** Dịch vụ nào là công cụ tìm kiếm tài liệu được hỗ trợ bởi machine learning?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Kendra.
Giải thích: Kendra đánh chỉ mục tài liệu và tìm kiếm bằng ngôn ngữ tự nhiên.
Tham chiếu: Mục Bảng tổng hợp dịch vụ.

</details>

---

Vậy là các bạn đã nắm trọn bộ **dịch vụ Machine Learning trên AWS**: Rekognition, Transcribe, Polly, Translate, Lex, Connect, Comprehend, SageMaker, Kendra, Personalize và Textract. *Hãy đọc lại bảng tổng hợp vài lần trước khi thi — chỉ cần nhớ đúng dịch vụ nào làm việc gì là các bạn đã có thêm điểm chắc chắn.*

Chúng ta sẽ tiếp tục hành trình với những chủ đề tiếp theo của khóa học. Hẹn gặp các bạn ở bài giảng sau! 🚀
