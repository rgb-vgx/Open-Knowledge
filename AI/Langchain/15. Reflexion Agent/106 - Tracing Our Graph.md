# 📊 Tracing Our Graph: Đọc "nhật ký hành trình" của Reflexion Agent trên LangSmith

Chào các bạn, mình là Eden đây! Graph đã chạy thành công, và hôm nay chúng ta sẽ cùng mở **LangSmith** để **review toàn bộ trace** của Reflexion Agent. Đây là lúc để thấy rõ kiến trúc mà chúng ta thiết kế "sống dậy" như thế nào trong thực tế — và cũng là lúc phát hiện một "cú twist" khá thú vị. Cùng bắt đầu nhé!

### 📈 Tổng quan trace: 50 giây và 35K tokens

Mình thu gọn trace lại để chỉ còn các node đang chạy, và đây là những con số đáng chú ý:

* Toàn bộ quá trình chạy mất **gần 50 giây**.
* Chi phí tiêu tốn: **35K tokens**.

Một cái giá khá "chát" nhưng hoàn toàn hợp lý cho một kiến trúc nhiều vòng lặp như thế này.

---

### 🔍 Đọc trace theo kiến trúc

Giờ hãy cùng đối chiếu trace với kiến trúc của chúng ta:

1. **Responder (draft node)** — tạo bản nháp đầu tiên. Trace cho thấy đầy đủ **response field**, **critique (reflection)** và **search queries**. Reflection gồm thuộc tính **missing** (thông tin còn thiếu) và **superfluous** (thông tin nên loại bỏ). Số tool call lúc này là **1** — mở sâu vào trace của lời gọi LLM, ta thấy **một invocation duy nhất gọi tool `AnswerQuestion`**. Điều này rất thú vị: chính object Pydantic của chúng ta đã được dùng làm tool.
2. **Execute tools node** — chạy **3 search query**:
   * *AI-powered SOC startups venture fundings in 2025*
   * *autonomous SOC market sizing and use cases*
   * *comparative analysis of AI SOC platforms*
   
   Và đây là một điểm rất hay: cả ba query **chạy đồng thời (concurrently)** — bằng chứng là thời điểm bắt đầu (start time) của chúng **giống hệt nhau**. `ToolNode` hỗ trợ chạy nhiều tool song song, đúng như mình đã hứa!
3. Sau khi chạy xong node này, ta có một **AI message chứa hàng loạt kết quả tool call**. Tiếp đó là **Reviser node**: nó nhận toàn bộ lịch sử tool execution cùng search results, cùng câu trả lời đầu tiên và critique, rồi **revise câu trả lời dựa trên kết quả tìm kiếm**, tạo thêm **critique mới** và **thêm trích dẫn (citation)**. Phản hồi trả về là một **revised answer** — cũng là một tool call, và nếu đào sâu hơn sẽ thấy một **LLM call** với schema của `ReviseAnswer` đầy đủ chi tiết.
4. Tiếp theo là **conditional loop (event_loop)**: nếu đếm được nhiều hơn 2 tool call thì kết thúc; nếu chưa thì lặp thêm một vòng với **bộ search query mới**. Lần này, event_loop trả về "đi tiếp execute tools" — và các query mới hoàn toàn khác lần đầu: *AI SOC ROI case studies*, *autonomous SOC market size in 2025*, và *industry adoption in AI SOC*.

---

### ⏱️ Cú twist: MAX_ITERATIONS = 2 nhưng chạy... 3 vòng!

Đến đây là phần thú vị nhất. Sau lần revision thứ hai, theo lý thuyết chúng ta sẽ **kết thúc** vì số tool call đã lớn hơn 2. Nhưng không — hãy cùng đếm lại nào:

* Tool call thứ nhất: từ responder (đầu quá trình).
* Tool call thứ hai: từ reviser.
* Và những chỗ khác **không phải là tool call** (vì tool node không tạo tool call).

Vậy tại sao graph vẫn đi tiếp? Nguyên nhân nằm ở **thời điểm cập nhật state**: khi `event_loop` chạy lần thứ hai, **revised node vẫn chưa hoàn tất** — nghĩa là state chưa được cập nhật với tool call mới. Vì thế số đếm vẫn **nhỏ hơn `MAX_ITERATIONS`**, và graph lại rẽ vào **execute tools** thêm một lần nữa.

Sau khi execute tools xong (dù bước này không tạo tool call), state đã được cập nhật từ node revise. Khi đó `event_loop` chạy lại, số tool call **đã lớn hơn 2**, và graph mới thực sự đi đến **END**.

Kết quả: với `MAX_ITERATIONS = 2`, chúng ta thực tế có **3 vòng revision**, chứ không phải 2. **Đây là lỗi của mình — xin lỗi các bạn nhé!** Dù sao thì, chúng ta đã có **3 phiên bản revision** chất lượng để chiêm ngưỡng.

---

### 🔜 Bài học và hướng đi: để LLM làm "trọng tài"

Vậy là chúng ta vừa hoàn thành kiến trúc **Reflexion** và rút ra một bài học xương máu: **việc canh đúng số vòng lặp hóa ra không hề đơn giản chút nào!**

Ở section tiếp theo, chúng ta sẽ thay thế `max_iterations` bằng **một LLM đóng vai trò trọng tài (LLM as a judge)** — để chính LLM quyết định xem có nên lặp thêm một vòng nữa hay không. Kiến trúc này nằm trong section **Agentic RAG**, với tài liệu chính thức trong LangGraph Agentic RAG — hứa hẹn sẽ là chương hấp dẫn tiếp theo của hành trình.

Cảm ơn các bạn đã đồng hành qua section Reflexion đầy "cam go" này. Nghỉ ngơi một chút, rồi chúng ta lại lên đường nhé! 🚀
