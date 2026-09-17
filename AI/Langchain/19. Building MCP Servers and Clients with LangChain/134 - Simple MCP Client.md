# 🔌 MCP Client Đa Server: Một Client Kết Nối Cả Thế Giới Công Cụ

Chào các bạn, mình là Eden đây! 👋 Sau khi đã có hai MCP server "cây nhà lá vườn" — một chạy qua STDIO và một chạy qua SSE — giờ là lúc viết **client để kết nối tới cả hai cùng lúc**. Đây là bài chúng ta chạm tay vào code thật sự.

---

### ▶️ Bước 1: Khởi động hai server

Đầu tiên, mình chạy server SSE quen thuộc:

* Chạy **`uv run servers/weather_server.py`** → server lắng nghe ở **port 8000**.

Sau đó mở thêm một terminal mới và chạy server STDIO:

* Chạy **`uv run servers/math_server.py`** với các phép toán → server cũng đang chạy.

Có cả hai server "sống" cùng lúc, chúng ta đã sẵn sàng cho phần chính.

---

### 🧩 LangChain MultiServerMCPClient: Trừu tượng hóa thông minh

Mình tạo file mới tên là **`langchain_client.py`** — cái tên đã nói lên tất cả: chúng ta sẽ hiện thực một **LangChain multi-server client**.

Trước đây mình từng nói rằng **giữa client và MCP server là quan hệ một-một (one-to-one)**. Điều đó **vẫn đúng** — nhưng LangChain đã **trừu tượng hóa** giúp chúng ta: bên trong client đa server này sẽ có **nhiều MCP client riêng lẻ**.

Nhờ đó, chúng ta có thể:

* Kết nối tới **nhiều MCP server một cách dễ dàng**.
* **Không cần tự viết client riêng** cho từng server.
* Quản lý mọi kết nối từ một chỗ duy nhất.

Đây là client mới do **LangChain viết sẵn**, giúp việc tích hợp MCP vào ứng dụng LangChain trở nên gọn gàng hơn hẳn.

---

### 💻 Bước 2: Viết code khởi tạo client

Đây là những gì mình import cho file client mới:

```python
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
```

Ngoài ra, mình khởi tạo **LLM** và dùng **`load_dotenv`** như ở các bài trước. Sau đó là một sanity check nhỏ: định nghĩa hàm **`async def main()`** chỉ in ra dòng `"hello langchain mcp"`, và chạy nó bằng **`asyncio`**.

```python
async def main():
    print("hello langchain mcp")
```

Chạy **`uv run langchain_client.py`** — mọi thứ hoạt động đúng như mong đợi. Bộ khung client đã sẵn sàng!

*Các bạn đừng lo nếu file mới chỉ mới "hello" mà chưa làm gì — đây chính là cách mình xây dựng từng bước để mỗi thay đổi đều dễ kiểm soát và dễ gỡ lỗi.*

*(À, nhớ import `asyncio` nếu bạn không muốn quên như mình nhé!)*

---

Vậy là chúng ta đã có bộ khung client với **`MultiServerMCPClient`** — thứ sẽ giúp kết nối tới nhiều server cùng lúc. Ở bài tiếp theo, chúng ta sẽ **nối client này với hai server đang chạy** và để LLM thực sự gọi tool qua MCP. Hẹn gặp lại các bạn! 🚀
