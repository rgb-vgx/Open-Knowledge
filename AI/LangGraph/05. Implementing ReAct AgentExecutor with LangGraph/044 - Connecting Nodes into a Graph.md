# 🕸️ Bringing Your ReAct Agent to Life: Nối các Node thành Graph hoàn chỉnh

Chào các bạn, mình là Eden đây! 👋

Đã đến lúc **ghép tất cả mọi thứ lại** trong file `main.py`: chúng ta sẽ implement graph ReAct của LangGraph — định nghĩa **node**, **edge (cạnh)**, **entry point**, rồi **compile** thành một app có thể chạy được.

---

### 📥 Imports và các hằng số

Bắt đầu với imports:

* Từ `langchain_core.messages` — **`HumanMessage`**, input để khởi động graph.
* Từ `langgraph.graph` — **`MessagesState`** (giữ toàn bộ message của chúng ta) và **`StateGraph`** — graph **tổng quát nhất**, có thể nhận bất kỳ state object nào chúng ta đưa vào. Đây là cách chúng ta khởi tạo graph.
* Từ `node.py` — **agent reasoning node** và **tool node** mà chúng ta đã viết.

Tiếp đó, mình định nghĩa vài **hằng số** để code gọn gàng, khỏi phải gõ lại chuỗi mỗi lần dùng:

```python
AGENT_REASON = "agent_reason"
ACT = "act"
LAST = -1
```

Hằng số `LAST = -1` dùng **cú pháp Python** để tham chiếu **message cuối cùng** giữa người dùng và agent — để dành cho phần sau, và cũng để code dễ đọc hơn.

---

### 🧩 Khởi tạo StateGraph và thêm node

Ta tạo một object state graph với `MessagesState`, đặt tên biến là **`flow`**:

```python
flow = StateGraph(MessagesState)

flow.add_node(AGENT_REASON, agent_reason)
flow.add_node(ACT, tool_node)
```

Để ý là mình dùng các hằng số vừa định nghĩa. Cursor auto-complete cho mình một **edge từ START đến `agent_reason`** — đúng về mặt logic, nhưng mình muốn định nghĩa theo cách khác. Mình dùng **`flow.set_entry_point(AGENT_REASON)`**: cách này cũng tạo một cạnh từ **node bắt đầu** đi tới node agent reasoning, và là cách mình thích dùng.

---

### 🔀 Conditional edge và hàm should_continue

Giờ hãy thêm các **edge**. Đầu tiên là **conditional edge (cạnh có điều kiện)** từ `agent_reason`, đi tới **tool node** hoặc **END** tùy theo một hàm mà chúng ta viết: **`should_continue`**.

```python
flow.add_conditional_edges(
    AGENT_REASON,
    should_continue,
    {END: END, ACT: ACT},
)
```

Tham số thứ ba là một **dictionary ánh xạ (mapping)**: từ chuỗi `end` sang node `END`, và từ chuỗi `act` sang node `ACT`. Mapping này cho LangGraph biết: giá trị nào mà `should_continue` trả về — **`end`** hay **`act`** — thì sẽ đi tới node tương ứng. Nhờ đó graph vẽ được **những đường nét đứt (dotted lines)** như các bạn thấy. *Nếu không viết mapping này, graph vẫn chạy đúng như mong muốn, chỉ có bản vẽ là không rõ ràng thôi.* Nó định nghĩa những node nào có thể đến sau `agent_reason`: tool node và node END.

Giờ implement `should_continue` — hàm nhận **state (MessagesState)** và trả về **chuỗi (string)** chỉ định node sẽ chạy sau `agent_reason`:

```python
def should_continue(state: MessagesState) -> str:
    messages = state["messages"]
    last_message = messages[LAST]
    if last_message.tool_calls:
        return ACT
    return END
```

Cách quyết định: kiểm tra **message cuối cùng** (đây chính là lúc dùng đến hằng số `LAST`).

* Nếu message cuối là một **tool call** → đi tới **tool node**. Nghĩa là reasoning engine đã quyết định cần gọi tool và đã có đủ thông tin về arguments → ta thực thi tool đó.
* Nếu **không có tool call** → kết thúc (**END**). Đây là **heuristic** cho biết LLM đã đủ sức trả lời câu hỏi, dù có dùng tool hay không.

Cuối cùng, định nghĩa edge từ **`ACT` quay về `AGENT_REASON`**: sau khi gọi tool xong, ta muốn agent **suy luận lại** để xem nên trả lời luôn hay chạy thêm một tool call nữa.

---

### ▶️ Compile, vẽ đồ thị và một lỗi nhỏ đáng nhớ

Vậy là graph đã đủ node, entry point và edge. Ta **compile** nó:

```python
app = flow.compile()
app.get_graph().draw_mermaid_png(output_file_path="flow.png")
```

Mình in đồ thị ra bằng hàm **`draw_mermaid_png`** để xuất thành file **`flow.png`**, xem có đúng hình vẽ mình trình bày trong video không.

Chạy lần đầu thì gặp **lỗi**: không import được `MessagesState`. Nguyên nhân là **thiếu một chữ "S"** — một lỗi nhỏ mà Cursor gây ra. Mình sửa lại, và nhận ra mình cũng quên cập nhật phần còn lại của code (kể cả trong `should_continue`) từ `MessageState` sang `MessagesState`. Sửa xong, chạy lại — **boom!** Đồ thị hiện ra đúng như hình mình đã chia sẻ.

Bài sau chúng ta sẽ **chạy thử toàn bộ** và mổ xẻ các **trace** để xem chính xác mọi thứ vận hành ra sao. Hẹn gặp lại các bạn! 🚀
