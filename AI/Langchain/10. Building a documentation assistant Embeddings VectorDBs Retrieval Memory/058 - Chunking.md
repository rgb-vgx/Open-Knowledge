# ✂️ Chunking: Chia nhỏ tài liệu LangChain để RAG "nhẹ gánh" hơn

Trong vài video tới, mình và các bạn sẽ cùng **chunking (chia nhỏ)** toàn bộ tài liệu LangChain thành những đoạn nhỏ hơn, để có thể cung cấp chúng làm context cho LLM. Bước tiếp theo là **embed** — biến các chunk thành vector — rồi **đánh index (index)** vào vector store.

Nghe qua thì nhiều công đoạn, nhưng đây là một trong những bước dễ triển khai nhất của cả pipeline đấy!

### 🧩 Chia nhỏ tài liệu với RecursiveCharacterTextSplitter

Toàn bộ quá trình chunking được thực hiện bằng **RecursiveCharacterTextSplitter** của LangChain. Mình cấu hình cho nó hai tham số quan trọng:

* **`chunk_size = 4000`** — giới hạn mỗi chunk tối đa 4000 ký tự.
* **`chunk_overlap = 200`** — 200 ký tự chồng lấn giữa các chunk liền kề.

Cách hoạt động của splitter này là **chia một cách có ngữ nghĩa (semantically)**: đầu tiên nó thử tách theo **đoạn văn (paragraph)**, rồi mới đến **dòng mới (new line)**, cứ thế đệ quy cho tới khi thỏa mãn kích thước mong muốn. Nếu muốn đào sâu hơn về RecursiveCharacterTextSplitter, các bạn có thể xem lại video chuyên đề mà mình đã làm riêng cho nó.

Sau khi có object text splitter, chúng ta chỉ cần gọi method có sẵn là **`split_documents`**, truyền vào danh sách LangChain documents. Kết quả nhận về là một danh sách documents **dài hơn hẳn** — vì mỗi document gốc đã bị chia thành nhiều chunk. Sau đó mình log lại mọi thứ để tiện theo dõi. Đúng là LangChain làm hết phần việc nặng nhọc cho chúng ta!

---

### 🎯 Đừng tìm "viên đạn bạc": chunking là một chủ đề sâu

Điều đầu tiên mình muốn lưu ý: **đây không phải là phương pháp chunking vạn năng**. Chunking là một chủ đề rất sâu, với rất nhiều chiến lược khác nhau để các bạn khám phá, chẳng hạn:

* **Small-to-big** — chunk nhỏ để tìm kiếm, nhưng trả về ngữ cảnh lớn hơn.
* **Semantic chunking** — tách dựa trên ngữ nghĩa thay vì ký tự.
* Và còn rất nhiều kỹ thuật tối ưu thú vị khác cho giai đoạn này.

---

### 💡 "RAG đã chết" vì context window khổng lồ? Không hề!

Các LLM ngày nay sở hữu **token limit** ngày càng lớn: đến năm 2025, Anthropic đã đạt **1 triệu token**, còn **Gemini 2.5** lên tới **2 triệu input token**. Vì thế, nhiều người nói rằng **RAG đã chết**.

Mình khẳng định rõ: **RAG không chết, nó đang tiến hóa.** Ngay cả khi context window khổng lồ xuất hiện, kỹ thuật chunking vẫn quan trọng, và đây là lý do:

1. **Hiệu quả chi phí (cost efficiency):** Nhét cả một tài liệu triệu token vào LLM sẽ **chậm hơn đáng kể** và **đắt hơn nhiều lần** so với việc chỉ retrieve đúng đoạn snippet liên quan bằng RAG.
2. **Độ chính xác và giảm nhiễu (precision & noise reduction):** RAG lọc ra **chỉ những chunk liên quan nhất**, từ đó giảm mạnh **hallucination (ảo giác)** và **positional bias (thiên lệch vị trí)** thường gặp ở phương pháp long context. Kết hợp thêm **retrieval with intelligent reordering (truy hồi và sắp xếp lại thông minh)** sẽ nâng chất lượng câu trả lời mà vẫn dùng ít token hơn so với nạp toàn bộ ngữ cảnh — điều này đã được chứng minh.
3. **Tính năng hướng người dùng:** RAG cho phép hiển thị **nguồn của từng mảnh thông tin** trong câu trả lời. Người dùng có thể truy vết câu trả lời về tận gốc — điều cực kỳ quan trọng để tạo **niềm tin** vào hệ thống AI, và đặc biệt thiết yếu trong các **môi trường bị quản lý chặt (regulated environments)**.

Nói ngắn gọn: các mô hình long context **bổ trợ** cho RAG, giúp RAG xử lý những prompt và chuỗi ngữ cảnh phong phú hơn một cách hiệu quả. **Larger context windows don't kill RAG — they amplify it and magnify the strings!**

Còn bây giờ, hãy lấy toàn bộ số chunk vừa tạo, biến chúng thành vector và đánh index vào vector store thôi. Hẹn gặp các bạn ở bài tiếp theo! 🚀
