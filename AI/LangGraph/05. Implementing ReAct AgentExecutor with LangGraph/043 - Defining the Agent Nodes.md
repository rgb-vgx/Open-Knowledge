# 🧱 Building Blocks: Định nghĩa các Node của Agent trong LangGraph (Reasoning Node & ToolNode)

Chào các bạn, mình là Eden đây! 👋

Sang bài này chúng ta mở file **`node.py`** và implement các **node (nút)** — những khối xây dựng nên graph của agent: node suy luận và node thực thi tool. Nghe có vẻ nhiều, nhưng nhờ các primitive (khối nguyên thủy) mà LangGraph cung cấp, code sẽ ngắn hơn các bạn tưởng đấy.

---

### 📥 Imports và MessagesState

Đầu tiên, import `load_dotenv` từ `dotenv` để nạp biến môi trường, rồi import các primitive từ `langgraph.graph`: **`Graph`** và **`MessagesState`**.

**`MessagesState`** là một object đơn giản, chứa một dictionary với key **`messages`** — bên trong là **danh sách các message**. Nó sẽ **theo dõi trạng thái của toàn bộ message** qua lại giữa agent: **human message** và **AI message**.

Tiếp theo, import từ `langgraph.prebuilt` một node dựng sẵn tên là **`ToolNode`**. Đây là node chuyên **thực thi tool**: nó kiểm tra **message cuối cùng** giữa agent và human; nếu message cuối là một **AI message có tool call hợp lệ**, nó sẽ chạy code của tool tương ứng — miễn là `ToolNode` được khởi tạo với object tools. Nếu agent quyết định chạy search hoặc gọi hàm triple, mọi thứ sẽ diễn ra bên trong node này.

Cuối cùng, import từ `react.py`: **LLM đã bind tools** và **danh sách tools**. Sau đó gọi `load_dotenv()`.

---

### 🤖 Node suy luận: agent_reason

Ta bắt đầu với một **system message** chung chung: *"You are a helpful assistant with access to tools that you can use to answer the question."*

Rồi đến **node đầu tiên — agent reasoning node**. Node nhận vào **state (MessagesState)** — một dictionary có key `messages` — và làm đúng một việc: **gọi LLM với input của người dùng**. Vì LLM đã được bind tools và dùng function calling, nó sẽ "gánh" toàn bộ phần suy luận:

```python
def agent_reason(state: MessagesState):
    response = llm.invoke(
        [{"role": "system", "content": system_message}, *state["messages"]]
    )
    return {"messages": [response]}
```

*Ở lần lặp đầu tiên, state chỉ có một **human message**; lần lặp thứ hai sẽ có thêm response của agent, rồi cứ thế tiếp tục — mọi thông tin đều nằm trong `messages`.* Mình truy cập key `messages` trong state bằng cú pháp dictionary key thay vì Python property, để **an toàn hơn về sau**.

Sau khi node chạy xong, ta **cập nhật state** bằng cách return một dictionary có key `messages` chứa một list — trong list đó là response từ LLM (một **AI message**). Giá trị này sẽ được **append** vào state, nối thêm một message mới bên cạnh những message đã có.

---

### 🔧 Node thực thi tool: ToolNode

Node này giúp LangGraph chạy các tool mà chúng ta cần. Ta khởi tạo một object `ToolNode` từ `langgraph.prebuilt` và truyền vào **hai LangChain tool**: search tool và triple (multiply) tool.

```python
from langgraph.prebuilt import ToolNode

tool_node = ToolNode(tools)
```

Node này **gánh rất nhiều việc nặng**: nó có thể chạy tool **song song (parallel)**, chạy ở **streaming mode**, và còn nhiều tính năng hay ho khác. Trong bài này chúng ta chỉ dùng **phiên bản vanilla (mặc định)** thôi.

*Trước khi có object này, chúng ta từng phải viết rất nhiều boilerplate code chỉ để chạy tool trong graph — giờ thì mọi thứ đã gọn gàng hơn hẳn.*

Cuối cùng, mình **commit** các thay đổi với tên **notes** và push lên repository để các bạn tiện tham khảo.

Vậy là các graph node đã hoàn thành mà không cần viết nhiều code, nhờ dùng các **LangGraph primitive** và **function calling** — LLM tự làm phần reasoning, không cần prompt đặc biệt gì cả. Bài sau, chúng ta sẽ **ghép mọi thứ lại** và dựng nên graph hoàn chỉnh. Hẹn gặp lại các bạn! 🚀
