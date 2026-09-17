# 🧠 Amazon Comprehend: Xử lý ngôn ngữ tự nhiên (NLP) cho văn bản

> Nguồn: `202-Comprehend-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20587268)

**Amazon Comprehend** là một trong những dịch vụ dễ nhớ nhất của chương này. Tên nói lên tất cả: Comprehend dùng để **comprehend (thấu hiểu)** văn bản — hay nói cách khác, đây là dịch vụ **NLP (Natural Language Processing — xử lý ngôn ngữ tự nhiên)**.

*Mẹo thi cực kỳ quan trọng: hễ thấy từ **NLP** trong đề, hãy nghĩ ngay đến **Amazon Comprehend**.*

---

### 🎯 Comprehend là gì?

Comprehend là dịch vụ **fully managed (được quản lý hoàn toàn)** và **serverless (không cần quản lý máy chủ)**. Nó dùng **machine learning** để tìm ra **insight (thông tin chi tiết)** và **mối quan hệ** ẩn trong văn bản của bạn.

Nói cách khác: bạn đưa vào thật nhiều dữ liệu — văn bản hoặc dữ liệu phi cấu trúc — và Comprehend làm phần còn lại để cố gắng hiểu ý nghĩa của chúng.

---

### 🔍 Comprehend "hiểu" được những gì?

* **Nhận biết ngôn ngữ** của đoạn text.
* **Trích xuất key phrase (cụm từ khóa)**, địa điểm, con người, thương hiệu, sự kiện.
* **Sentiment analysis (phân tích cảm xúc)**: đoạn text tích cực hay tiêu cực đến mức nào.
* **Tokenization và parts of speech (tách từ và nhận diện từ loại)**.
* Xử lý cả **audio**.
* **Tổ chức một tập hợp nhiều file text theo chủ đề** — và tự tìm ra các chủ đề đó.

---

### 💼 Use case thực tế của NLP

1. **Phân tích tương tác khách hàng**: khách gửi rất nhiều email, bạn muốn hiểu điều gì dẫn đến trải nghiệm tích cực hoặc tiêu cực. Comprehend trích xuất các đặc điểm, bạn nhận được **business insight** và từ đó cải thiện dịch vụ.
2. **Nhóm bài viết theo chủ đề**: thay vì đọc từng bài một, bạn đưa hàng loạt bài viết vào Comprehend và nhận lại danh sách chủ đề để nhóm chúng lại.

*Bài này có thể nhiều thông tin hơn mức đề thi cần, nhưng chỉ cần nhớ một câu: **Comprehend = NLP**.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon Comprehend là dịch vụ cho lĩnh vực gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** NLP (Natural Language Processing — xử lý ngôn ngữ tự nhiên).
Giải thích: Đây là điểm nhận diện quan trọng nhất của dịch vụ.
Tham chiếu: Mục Comprehend là gì.

</details>

**Câu 2:** Comprehend có phải dịch vụ fully managed và serverless không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — Comprehend là dịch vụ fully managed và serverless.
Giải thích: Bạn không phải quản lý server, chỉ đưa dữ liệu vào.
Tham chiếu: Mục Comprehend là gì.

</details>

**Câu 3:** Sentiment analysis cho bạn biết điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mức độ tích cực hoặc tiêu cực của đoạn văn bản đang phân tích.
Giải thích: Một trong những tính năng phổ biến nhất của Comprehend.
Tham chiếu: Mục Comprehend hiểu được những gì.

</details>

**Câu 4:** Nêu hai use case tiêu biểu của Comprehend.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phân tích email khách hàng để tìm yếu tố dẫn tới trải nghiệm tích cực/tiêu cực; nhóm các bài viết theo chủ đề do Comprehend tự phát hiện.
Giải thích: Đây là hai ví dụ giảng viên đưa ra.
Tham chiếu: Mục Use case thực tế của NLP.

</details>

**Câu 5:** Đề thi nhắc đến NLP thì bạn chọn dịch vụ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Amazon Comprehend.
Giải thích: Đây là mẹo nhận diện nhanh trong đề thi.
Tham chiếu: Mục Comprehend là gì.

</details>

---

Vậy là các bạn đã nắm được **Comprehend = NLP**: fully managed, serverless, dùng machine learning để tìm insight trong văn bản — từ sentiment analysis đến nhóm chủ đề. *Một câu duy nhất để nhớ cho phòng thi: thấy NLP, nghĩ Comprehend.*

Bài tiếp theo chúng ta sẽ gặp **Amazon SageMaker** — dịch vụ ML "nặng đô" dành cho developer và data scientist. Hẹn gặp các bạn! 🚀
