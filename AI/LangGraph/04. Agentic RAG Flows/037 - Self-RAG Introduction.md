# 🪞 Self-RAG: Dạy AI "tự soi gương" trước khi trả lời (Ý tưởng cực hay!)

Chào các bạn, Eden đây! Hy vọng các bạn đang tận hưởng dự án của chúng ta. Sau khi đã có một **Agentic RAG flow** chạy ngon lành, hôm nay mình giới thiệu một ý tưởng nâng cấp cực kỳ thú vị: **Self-RAG**.

---

### 📚 Self-RAG là gì?

Self-RAG được lấy cảm hứng từ **Self-RAG paper (bài báo Self-RAG)**, và ý tưởng cốt lõi rất trực diện: chúng ta sẽ **reflect (phản tư)** lại chính câu trả lời mà model vừa tạo ra.

Cụ thể, mình lấy **generation (câu trả lời đã sinh)** đặt cạnh **các tài liệu** và kiểm tra xem model có **hallucinate (bịa đặt/ảo giác)** hay không — tức là câu trả lời có thực sự **grounded (bám rễ)** vào nội dung tài liệu hay không.

---

### 🔍 Hai câu hỏi phản tư quyết định "số phận" câu trả lời

Quy trình Self-RAG xoay quanh hai bước kiểm tra:

1. **Câu trả lời có grounded trong tài liệu không?**
   * Nếu **có** → tuyệt vời, chúng ta chuyển sang bước thứ hai.
   * Nếu **không** (tức là model đã hallucinate) → chúng ta cần **regenerate (sinh lại)** câu trả lời để buộc nó bám sát tài liệu.
2. **Câu trả lời có thực sự trả lời đúng câu hỏi gốc của người dùng không?**
   * Nếu **có** → chúng ta tự tin trả kết quả về cho người dùng.
   * Nếu **không** → rất có thể chúng ta cần **web search**, vì trong **vector store** khó mà tìm thêm được thông tin gì mới mẻ nữa.

---

### 🗺️ Kế hoạch bài này: làm từ A đến Z

Lý thuyết đã rõ, giờ là hành động. Trong video này mình sẽ cùng các bạn:

* Viết **các chain** đảm nhiệm việc phản tư.
* Viết **test** để kiểm chứng từng chain hoạt động đúng.
* Thêm **các node** tương ứng vào graph.
* Nối tất cả **conditional branch (nhánh điều kiện)** để luồng chạy thông minh hơn hẳn.

*Đừng lo nếu bạn thấy hơi nhiều bước — chúng ta sẽ làm chậm mà chắc, từng phần một.*

Hãy sẵn sàng gặp lại trong code nhé — một chút kiên nhẫn nữa thôi là các bạn sẽ làm chủ Self-RAG! 🚀
