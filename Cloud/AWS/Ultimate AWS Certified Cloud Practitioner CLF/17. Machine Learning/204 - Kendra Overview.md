# 📚 Amazon Kendra: Công cụ tìm kiếm tài liệu thông minh bằng Machine Learning

> Nguồn: `204-Kendra-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/26623518)

Dịch vụ ML tiếp theo là **Amazon Kendra** — một **dịch vụ tìm kiếm tài liệu được quản lý hoàn toàn (fully-managed document search service)**, hoạt động nhờ machine learning.

Điểm thú vị: Kendra không chỉ tìm từ khóa, mà còn **trích xuất câu trả lời ngay trong nội dung tài liệu**.

---

### 🎯 Kendra tìm kiếm trên những nguồn nào?

Kendra có thể "đọc" rất nhiều định dạng: **text, PDF, HTML, PowerPoint, Microsoft Word, FAQ**...

Tài liệu có thể nằm rải rác ở nhiều **data source (nguồn dữ liệu)** khác nhau. Kendra sẽ **đánh chỉ mục (index)** tất cả và xây dựng bên trong một **knowledge index (chỉ mục tri thức)** được hỗ trợ bởi machine learning.

---

### 🔍 Trải nghiệm tìm kiếm như Google

Kendra cung cấp khả năng **tìm kiếm bằng ngôn ngữ tự nhiên (natural language search)** — giống như các bạn gõ câu hỏi lên Google.

Ví dụ: người dùng hỏi *"Where is the IT support desk?"* — Kendra trả lời ngay *"1st floor"* (tầng 1), bởi nó biết được điều này từ tất cả tài liệu nó đã thu thập.

---

### 📈 Học tăng dần và tinh chỉnh kết quả

* **Incremental learning (học tăng dần)**: Kendra học từ **tương tác và phản hồi của người dùng** để ưu tiên những kết quả tìm kiếm được yêu thích hơn.
* **Fine tune (tinh chỉnh)**: điều chỉnh kết quả dựa trên **độ quan trọng của dữ liệu**, **độ mới (freshness)** hoặc các **custom filter (bộ lọc tùy chỉnh)** của bạn.

*Mẹo thi: hễ đề nhắc đến **document search service**, hãy chọn ngay **Amazon Kendra**.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon Kendra là loại dịch vụ gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dịch vụ tìm kiếm tài liệu được quản lý hoàn toàn, hoạt động nhờ machine learning.
Giải thích: Đây là định nghĩa cốt lõi cần nhớ cho đề thi.
Tham chiếu: Mục Kendra tìm kiếm trên những nguồn nào.

</details>

**Câu 2:** Kendra có thể xử lý những định dạng tài liệu nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Text, PDF, HTML, PowerPoint, Microsoft Word, FAQ...
Giải thích: Kendra đọc được rất nhiều định dạng phổ biến.
Tham chiếu: Mục Kendra tìm kiếm trên những nguồn nào.

</details>

**Câu 3:** Kendra trả lời câu hỏi "Where is the IT support desk?" như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trả lời "1st floor" — vì Kendra biết thông tin này từ các tài liệu nó đã thu thập.
Giải thích: Đây là ví dụ minh họa khả năng tìm kiếm ngôn ngữ tự nhiên.
Tham chiếu: Mục Trải nghiệm tìm kiếm như Google.

</details>

**Câu 4:** Incremental learning của Kendra là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kendra học từ tương tác và phản hồi của người dùng để ưu tiên những kết quả tìm kiếm được yêu thích hơn.
Giải thích: Càng dùng, kết quả tìm kiếm càng "hiểu ý" người dùng.
Tham chiếu: Mục Học tăng dần và tinh chỉnh kết quả.

</details>

**Câu 5:** Bạn có thể tinh chỉnh kết quả tìm kiếm của Kendra dựa trên những yếu tố nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Độ quan trọng của dữ liệu, độ mới (freshness) hoặc custom filter do bạn định nghĩa.
Giải thích: Giúp kết quả phù hợp với nhu cầu riêng của doanh nghiệp.
Tham chiếu: Mục Học tăng dần và tinh chỉnh kết quả.

</details>

---

Vậy là các bạn đã nắm được **Amazon Kendra**: đánh chỉ mục tài liệu, tìm kiếm bằng ngôn ngữ tự nhiên, học tăng dần từ người dùng và tinh chỉnh kết quả. *Nhớ một câu cho phòng thi: **document search → Kendra**.*

Bài tiếp theo chúng ta sẽ gặp **Amazon Personalize** — dịch vụ gợi ý cá nhân hóa theo thời gian thực. Hẹn gặp các bạn! 🚀
