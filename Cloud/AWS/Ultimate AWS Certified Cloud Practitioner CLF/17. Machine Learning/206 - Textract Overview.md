# 📄 Amazon Textract: Trích xuất văn bản và dữ liệu từ tài liệu quét

> Nguồn: `206-Textract-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/32411778)

**Amazon Textract** — cái tên đã nói rõ chức năng: **extract text**, tức trích xuất văn bản. Dịch vụ này giúp các bạn lấy **text, chữ viết tay và dữ liệu** ra khỏi mọi tài liệu được quét (scanned document).

Phía sau hậu trường, tất nhiên rồi, là **AI và machine learning** đang làm việc.

---

### 🎯 Textract hoạt động như thế nào?

Hãy tưởng tượng bạn có một **bằng lái xe (driver license)**:

1. Upload tài liệu vào Amazon Textract.
2. Textract **tự động phân tích** tài liệu.
3. Kết quả trả về cho bạn dưới dạng **data file (tệp dữ liệu)** — bạn có thể trích xuất **ngày sinh, số giấy tờ (document ID)**...

Textract xử lý được cả **form (biểu mẫu)** và **table (bảng biểu)**, đọc được **PDF, hình ảnh** và nhiều định dạng khác.

---

### 💼 Use case theo ngành

* **Financial services (dịch vụ tài chính)**: xử lý **invoice (hóa đơn)** và **báo cáo tài chính**.
* **Healthcare (y tế)**: xử lý **hồ sơ bệnh án (medical records)** và **yêu cầu bồi thường bảo hiểm (insurance claims)**.
* **Public sector (khu vực công)**: xử lý **tờ khai thuế (tax forms)**, **giấy tờ tùy thân (ID documents)** và **hộ chiếu (passports)**.

*Nhớ nhanh: cần "đọc" dữ liệu từ tài liệu scan — nghĩ ngay đến Textract.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon Textract dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trích xuất text, chữ viết tay và dữ liệu từ tài liệu được quét.
Giải thích: Đúng như tên gọi "extract text".
Tham chiếu: Mục Textract hoạt động như thế nào.

</details>

**Câu 2:** Công nghệ nào chạy phía sau Textract?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AI và machine learning.
Giải thích: Nhờ đó Textract mới "đọc" được tài liệu tự động.
Tham chiếu: Mục Textract hoạt động như thế nào.

</details>

**Câu 3:** Với một bằng lái xe, Textract có thể trích xuất những thông tin gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ngày sinh, số giấy tờ (document ID) và nhiều thông tin khác.
Giải thích: Kết quả trả về dưới dạng data file.
Tham chiếu: Mục Textract hoạt động như thế nào.

</details>

**Câu 4:** Textract có xử lý được form, table và các định dạng PDF, hình ảnh không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — Textract xử lý được form, table, PDF, hình ảnh...
Giải thích: Đây là các định dạng tài liệu phổ biến nhất.
Tham chiếu: Mục Textract hoạt động như thế nào.

</details>

**Câu 5:** Nêu use case của Textract trong ngành y tế.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xử lý hồ sơ bệnh án (medical records) và yêu cầu bồi thường bảo hiểm (insurance claims).
Giải thích: Đây là ví dụ giảng viên nêu cho ngành healthcare.
Tham chiếu: Mục Use case theo ngành.

</details>

---

Vậy là các bạn đã nắm được **Amazon Textract**: trích xuất text, chữ viết tay và dữ liệu khỏi tài liệu quét, xử lý được cả form và table. *Dịch vụ này dễ nhớ nhất chương — chỉ cần gắn nó với hình ảnh tài liệu scan.*

Và như vậy là chúng ta đã đi hết các dịch vụ ML chính! Bài tiếp theo sẽ là bài **tổng kết Machine Learning** — danh sách các bạn buộc phải nhớ trước kỳ thi. Hẹn gặp các bạn! 🚀
