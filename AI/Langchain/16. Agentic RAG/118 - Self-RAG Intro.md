# 🪞 Self-RAG: Dạy Agent biết tự soi lại câu trả lời của chính mình

Mình hy vọng các bạn đã thấy hứng thú với dự án Agentic RAG vừa hoàn thành. Trong bài này, chúng ta sẽ nâng cấp nó lên một tầng "tự nhận thức" với **Self-RAG** — kỹ thuật được xây dựng từ **Self-RAG paper**.

### 💡 Self-RAG là gì?

Nói một cách dễ hiểu, Self-RAG nghĩa là chúng ta sẽ **phản chiếu (reflect) lại câu trả lời mà model đã sinh ra** — thay vì cứ thế trả thẳng cho người dùng.

Cụ thể, mình lấy **generation** (câu trả lời LLM vừa tạo) đem so sánh với **documents** đã retrieve, để kiểm tra xem model có **hallucinate (bịa)** hay không. Câu hỏi trọng tâm ở đây là:

* Câu trả lời có thật sự **grounded** (bám chắc, neo vào) tài liệu không?
* Hay model đang "tự diễn" những thông tin không hề tồn tại trong ngữ cảnh?

Nói ngắn gọn: **đừng tin ngay, hãy kiểm chứng trước khi trao câu trả lời cho người dùng.**

---

### 🔍 Lớp phản chiếu thứ nhất: kiểm tra grounding

Bước đầu tiên là kiểm tra xem câu trả lời có **grounded trong tài liệu** hay không:

* Nếu **grounded** → tuyệt vời, xem như "cool" luôn, ta sẵn sàng bước sang giai đoạn hai.
* Nếu **hallucinated** (không grounded) → ta **regenerate**, tức sinh lại câu trả lời và buộc nó phải bám sát tài liệu.

Tài liệu chính là "mặt đất" để câu trả lời đứng vững. Không có grounding thì câu trả lời không đáng tin.

---

### ❓ Lớp phản chiếu thứ hai: câu trả lời có đúng câu hỏi?

Khi câu trả lời đã grounded, ta chuyển sang bước thứ hai: **phản chiếu xem câu trả lời có trả lời đúng câu hỏi ban đầu của người dùng hay không**.

* Nếu **có** → chúc mừng, ta có thể **trả câu trả lời cho người dùng**.
* Nếu **không** → nhiều khả năng ta cần **web search**, vì tìm thêm trong vector store cũng không tìm được thông tin nào mới.

Điểm mình thích ở Self-RAG là agent không chỉ "trả lời", mà còn tự đặt câu hỏi: *câu trả lời này có thật sự ích cho người hỏi không?*

---

### ⚙️ Kế hoạch triển khai end-to-end

Trong bài này, mình sẽ làm trọn vẹn luồng Self-RAG từ đầu đến cuối:

1. Viết các **chain** phản chiếu.
2. Viết **test** cho chúng.
3. Thêm các **node** tương ứng vào luồng.
4. Và tất nhiên, thêm toàn bộ **conditional branch** (nhánh điều kiện) để agent tự chọn bước tiếp theo.

*Đừng lo nếu bạn cảm thấy hơi choáng* — chúng ta đã có sẵn cấu trúc từ dự án trước, nên mọi thứ sẽ dễ hơn rất nhiều.

Hẹn gặp các bạn ở bài tiếp theo, khi chúng ta bắt tay vào code thật đấy! 🚀
