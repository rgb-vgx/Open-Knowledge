# 🔍 LangGraph là gì và vì sao nó khác biệt với LangChain? (Câu chuyện về những vòng lặp)

Chào các bạn, mình là Eden đây! Trong bài này, chúng ta sẽ cùng trả lời ba câu hỏi: **LangGraph là gì, vì sao chúng ta cần nó, và nó khác gì so với LangChain**.

Đây là phần lý thuyết quan trọng, giúp các bạn hiểu rõ "linh hồn" của LangGraph trước khi bắt tay vào code đấy nhé.

### 🧰 LangChain — framework tuyệt vời, nhưng còn những giới hạn

**LangChain đã tồn tại được một năm** và là một framework tuyệt vời để xây dựng các ứng dụng generative (AI tạo sinh). Nếu bạn muốn xây dựng ứng dụng **RAG (Retrieval-Augmented Generation — sinh văn bản có tăng cường truy xuất)** hay thậm chí là agent, LangChain đều sẵn sàng giúp bạn.

Framework này đã đi một chặng đường dài theo hướng ngày càng tốt hơn:

* **An toàn hơn, linh hoạt hơn, dễ đọc hơn, dễ dùng hơn** — đặc biệt nhờ **LangChain Expression Language (LCEL)** tận dụng sức mạnh của **khả năng lắp ghép (composability)**.
* Việc tương tác với các thành phần của chain giờ đây không thể thuận tiện hơn.
* LangChain là framework **open-source** hiện đang tiên phong trong rất nhiều nghiên cứu về agent.

Trong LangChain, chúng ta có thể xây dựng agent — mình thậm chí đã giới thiệu điều này cùng logic đằng sau nó trong khóa học của mình. **Nhưng chúng ta vẫn có những giới hạn.**

---

### 📊 Phổ tự chủ: từ code deterministic đến autonomous agent

Để dễ hình dung, các bạn hãy nghĩ về một **phổ mức độ tự chủ (levels of autonomy)** của các hệ thống AI. Đây cũng là sơ đồ mà LangChain công bố khi ra mắt LangGraph, nhằm minh họa những thách thức khi xây dựng các hệ thống phức tạp:

* **Một đầu phổ — code deterministic (mã xác định):** chúng ta tự viết code, không tích hợp LLM, biết chính xác đầu vào, đầu ra và từng bước thực thi. Hệ thống **cực kỳ ổn định và đáng tin cậy** nhưng **hoàn toàn không linh hoạt** vì mọi thứ đều bị "hard-code".
* **Giữa phổ — một lời gọi LLM:** chúng ta vẫn kiểm soát luồng, LLM chỉ tạo ra **một đầu ra duy nhất** trong toàn bộ luồng (ví dụ để tóm tắt, trích xuất thông tin, trích xuất thực thể). Rất đơn giản — ví dụ một công ty an ninh mạng gọi LLM để giải thích một cảnh báo — hữu ích nhưng chưa thực sự phức tạp.
* **Xa hơn — chaining (chuỗi hóa):** lấy đầu ra của LLM này làm đầu vào cho LLM khác. Ví dụ điển hình là luồng **RAG**: đưa câu hỏi gốc cho LLM đầu tiên, dùng **embeddings** để truy xuất các tài liệu liên quan, rồi **augment (tăng cường)** prompt gốc và gửi tất cả cho LLM để sinh câu trả lời. Trong một chain, LLM quyết định đầu ra ở **nhiều bước**, không chỉ một bước.
* **Đầu còn lại — autonomous agent (agent tự chủ):** tự nghĩ ra nhiệm vụ, tự viết code, chạy code, sắp xếp lại nhiệm vụ và viết code mới. Siêu linh hoạt, có thể nhận những prompt như "hãy biến tôi thành YouTuber số một" và về lý thuyết là làm được.

**Nhưng trên thực tế, những hệ thống như vậy không thực sự tồn tại.** Các dự án như **AutoGPT, GPT Engineer, BabyAGI** đã cố gắng hiện thực điều này. Chúng rất quan trọng với ngành — thúc đẩy đổi mới và mở rộng giới hạn — nhưng chưa hướng tới production: chúng ta không thấy chúng được dùng trong môi trường thực tế, vì chúng **quá linh hoạt** và ta **phụ thuộc quá nhiều vào LLM**. Khi đó, LLM có xu hướng "lan man" và không trả về đúng thứ ta muốn.

Lý do rất đơn giản: ở mức cơ bản nhất, **LLM chỉ là những "sinh vật thống kê" (statistical creatures) — đoán từng token một.** Vậy nên autonomous agent thì **linh hoạt nhưng không đáng tin cậy**.

---

### 🔀 LLM router và giới hạn "không có cycles" của LangChain

Một khái niệm quan trọng khác là **LLM router** — một loại chain dùng LLM để quyết định xem nên đi hướng nào. Ví dụ: LLM quyết định chạy nhánh code số 1 hay nhánh số 2, đi tìm trong database hay tìm kiếm trên web. Đây là lần đầu tiên **LLM quyết định các bước cần thực hiện**, giúp ta xây dựng hệ thống linh hoạt hơn nữa.

Tuy nhiên, có một điểm cực kỳ quan trọng: **trong một LLM router không có cycles (chu trình)**. Trên sơ đồ, có một đường nét đứt — **mọi thứ phía dưới đường đó được coi là agent/agentic application**, còn **mọi thứ phía trên đều đã được LangChain hiện thực rất tốt**. Mình là fan cứng của LangChain và tin rằng chỉ với những building block đó, ta đã có thể xây dựng hệ thống rất nâng cao.

Vậy giới hạn nằm ở đâu?

* Với **LangChain Expression Language**, chúng ta **không thể tạo cycles** — chỉ có thể tạo **acyclic graph (đồ thị không chu trình)**, tức một luồng được viết sẵn từ trước.
* Chúng ta **không thể lặp lại (iterate)**, không thể quay về node ban đầu và bắt đầu lại quy trình.
* LangChain có những hiện thực cho việc này, nhưng đều là **ad hoc (tùy nghi)**, ví dụ thuật toán **ReAct** — nơi trong mã nguồn thực sự có một vòng lặp `while`.

Và đây chính xác là lúc **LangGraph** bước vào cuộc chơi!

---

### 🗺️ LangGraph: "xây dựng language agent như những đồ thị"

LangGraph mang đến **một chiều không gian tự do và phức tạp mới** cho agent: chúng ta có thể **hiện thực cycles (chu trình)**. Tính năng này cực kỳ quan trọng khi muốn xây dựng những agent phức tạp với một mức độ tự do mà trước đây chúng ta chưa từng quen.

Khái niệm này gắn liền với **flow engineering (kỹ thuật thiết kế luồng)**:

* Chúng ta — lập trình viên — **định nghĩa luồng chạy (flow)** của chương trình.
* LLM có thể **hòa vào luồng đó** và giúp quyết định: đi flow A hay flow B, kết thúc, hay quay lại điểm bắt đầu để tiếp tục?
* Chính các **cycles** mang lại nguồn tự do to lớn này.

Trong tài liệu của LangGraph, nó được mô tả là **"building language agents as graphs" (xây dựng language agent dưới dạng đồ thị)** — toàn bộ logic, toàn bộ luồng của agent được biểu diễn như một graph, thậm chí là graph có chu trình. Với LangGraph, việc hiện thực những giải pháp này **vô cùng thanh lịch và dễ dàng**.

Và chúng ta sẽ cùng xây dựng những hệ thống rất nâng cao như vậy ngay trong khóa học này! Hãy tiếp tục theo dõi nhé! 🚀
