# 🕸️ Building Our LangGraph Graph: Ghép mọi mảnh ghép thành Reflexion Agent hoàn chỉnh

Chào các bạn, mình là Eden đây! 👋 Đây là video được **quay lại (refilmed)** để khớp với phiên bản LangGraph mới nhất — bản mình dùng là **1.0.5**, và toàn bộ nội dung được cập nhật theo **LangGraph 1.x+**. Chúng ta sẽ cùng mở `main.py`, assemble mọi mảnh ghép và dựng nên **graph hoàn chỉnh** cho Reflexion Agent.

---

### 📥 Imports, state và "nút thắt" MAX_ITERATIONS

Đầu tiên là các import:

* **Literal** từ `typing`.
* **AIMessage** và **ToolMessage** — hai loại message chúng ta sẽ làm việc.
* Từ `langgraph`: **START**, **END** và **StateGraph**.
* **MessagesState** — vì state graph của chúng ta chỉ chứa một **list of messages**. Ở section Reflection Agent, chúng ta từng tự tay implement "message state" này; lần này có thể import sẵn từ **`langgraph.prebuilt`** cho gọn.
* Từ **`chains.py`**: **first responder chain** và **Revisor chain**; từ **`tool_executor.py`**: node **execute tools** — thực chất là một **ToolNode**, chuyên chạy các tool (search tool của chúng ta) **concurrently (song song)**.

```python
from typing import Literal
from langchain_core.messages import AIMessage, ToolMessage
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import MessagesState

MAX_ITERATIONS = 2
```

Biến **MAX_ITERATIONS = 2** nghĩa là chỉ cho phép **tối đa hai vòng revision**. Đây là một **heuristic**, chưa phải cách làm hay nhất: muốn nâng cấp, ta có thể tích hợp kiến trúc **LLM as a judge** — thay vì giới hạn bằng con số, hãy để một **LLM call** tự quyết định có nên chạy tiếp hay không. Cách này sẽ xuất hiện ở **section tiếp theo**, nơi chúng ta xây một **agentic solution**.

---

### 🧱 Hai node chính: draft và revised

**Draft node** nhận **state** (list of messages) và gọi **first responder chain**, truyền toàn bộ messages vào key `messages`. Ở lần chạy đầu tiên, message đầu vào chính là **human message** chứa input của người dùng.

Response trả về có dạng **AnswerQuestion**, gồm ba phần: **answer** (câu trả lời), **reflection** (điều gì cần thay đổi, còn thiếu gì, còn thừa gì) và **search_queries** (những truy vấn sẽ được tìm kiếm ở bước sau). Nhận xong, mình **append message này vào state**.

**Revised node** làm việc tương tự: gọi **Revisor chain** với toàn bộ messages hiện có, sửa câu trả lời dựa trên **kết quả tool** — chính là những **critique có cấu trúc Pydantic** — rồi cũng **append vào state của graph**.

---

### 🔀 Conditional edge "event_loop": đếm tool call để dừng vòng lặp

Vì dùng **function calling** để ép **structured output**, mỗi **tool call** thực chất là một **LLM response**. Điều này cho chúng ta cách đếm số vòng lặp:

1. Gọi **responder** → **một** tool call.
2. **Execute tools** → đây là **ToolNode**, không có LLM nào gọi tool, nên **không tính**.
3. Gọi **Revisor chain** → sinh thêm **một** tool call.

Quy tắc: nếu **tổng số tool call > 2** thì dừng (**END**), ngược lại đi tiếp tới **execute tools**. Mình implement thành **conditional edge** tên **event_loop**: iterate qua các message, đếm số tool call, rồi trả về một trong hai giá trị — **execute tools** hoặc **END**. Nhờ đó vòng lặp chỉ chạy đúng **hai vòng**.

---

### 🕸️ Lắp ráp graph, compile và chạy thử

Mình khởi tạo **StateGraph** với **MessagesState**, thêm ba node rồi nối các edge theo đúng kiến trúc:

```python
graph = StateGraph(MessagesState)

graph.add_node("draft", draft_node)
graph.add_node("execute_tools", execute_tools_node)
graph.add_node("revised", revised_node)

graph.add_edge(START, "draft")
graph.add_edge("draft", "execute_tools")
graph.add_edge("execute_tools", "revised")

graph.add_conditional_edges("revised", event_loop, ["execute_tools", END])

graph = graph.compile()
print(graph.get_graph().draw_mermaid())
```

Từ **START**, graph đi vào **draft** để nhận input người dùng. Sau đó là chuỗi quen thuộc: **draft → execute_tools → revised**, rồi từ **revised** rẽ nhánh có điều kiện — hoặc kết thúc, hoặc quay lại tìm kiếm và revise theo truy vấn mới. Tham số thứ ba của `add_conditional_edges` là **list các node** có thể chạy sau nhánh điều kiện; các giá trị này phải **khớp với những gì event_loop trả về**, đồng thời giúp bản vẽ graph hiển thị rõ ràng. Mình **compile** graph rồi **print với mermaid**, copy sang **mermaid.live** để xem toàn bộ luồng chạy.

Giờ hãy invoke thử:

```python
graph.invoke({"messages": [{"role": "user", "content": "Write about AI-Powered SOC, autonomous SOC problem domain, list startups that have raised capital on that"}]})
```

Ta truyền vào một **dictionary** với key `messages`. Với `role: "user"`, LangChain sẽ tự **cast thành HumanMessage**, và phần `content` là câu hỏi demo quen thuộc về **AI-powered SOC / autonomous SOC**.

Chạy debug, mình kiểm tra response: message cuối cùng là một **AI message** chứa **tool call**, và trong `args` chính là **câu trả lời đã revise**. Muốn in đẹp, chỉ cần: kiểm tra message cuối là AI message và có tool call → lấy tool call đầu tiên (vì chỉ có một) → vào `args` → đọc key **answer**, rồi in toàn bộ messages còn lại.

Và đây là kết quả! Bài viết in ra khá chi tiết: **AI-powered SOC** giảm **false positive tới 50%**, tự động hóa **70% cảnh báo thường ngày**, cắt thời gian điều tra **70–90%**; **autonomous SOC** xử lý phản hồi rủi ro thấp như **cách ly email, cô lập endpoint, cấu hình lại firewall**, kéo **dwell time** và **MTTR** xuống **dưới 5 phút**. Danh sách startup cũng được chia theo **maturity tier**: **leaders** có Darktrace, **scale-ups** có Exabeam và Cybereason, **innovators** có Deep Instinct hay Blue Mirror. *Một câu trả lời có số liệu, có citation — đúng tinh thần Reflexion!*

Vậy là chúng ta đã có một **Reflexion Agent** hoàn chỉnh chạy bằng LangGraph phiên bản mới. Video tiếp theo, mình sẽ mở **LangSmith** và mổ xẻ từng bước chạy của nó nhé! 🚀
