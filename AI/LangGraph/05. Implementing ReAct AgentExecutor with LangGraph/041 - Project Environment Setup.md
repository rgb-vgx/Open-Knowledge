# ⚙️ Get Started: Dựng môi trường cho dự án ReAct Agent (Poetry, API keys & cấu trúc thư mục)

Chào các bạn, mình là Eden đây! 👋

Trước khi lao vào code logic agent, chúng ta cần hoàn tất phần **boilerplate setup (cài đặt nền tảng)**. Bài này sẽ nhanh và gọn thôi: dựng **virtual environment (môi trường ảo) bằng Poetry**, cài toàn bộ dependencies, và điền đầy đủ API keys vào file `.env`. Xong bài này là chúng ta sẵn sàng implement ReAct graph.

---

### 🛠️ Khởi tạo project và cài dependencies

Chúng ta bắt đầu từ một thư mục trống. Các bước lần lượt như sau:

1. Chạy lệnh `poetry init` để khởi tạo Poetry project — mình cứ nhấn Enter cho hết các câu hỏi mặc định.
2. Thêm file `.gitignore` và dán vào nội dung **gitignore chuẩn của Python**. Điểm mình quan tâm nhất ở đây là file này đảm bảo **các file `.env` không bao giờ bị đẩy lên GitHub**, nhờ vậy **API keys của các bạn không bị lộ**. Nội dung file này các bạn có thể lấy từ repository của khóa học hoặc trong phần tài nguyên của video.
3. Cài các package cần thiết: **`langchain`**, **`langchain-openai`**, **`langchain-tavily`** (cho search), **`langgraph`**, và **`python-dotenv`** (để load biến môi trường). Cuối cùng thêm **`black`** và **`isort`** để format code sau khi viết xong.
4. Mở `pyproject.toml` kiểm tra — các bạn sẽ thấy đầy đủ các dependencies vừa cài.

---

### 🔑 File .env và các API key cần thiết

Tạo file `.env` và dán vào toàn bộ biến môi trường của project. *Đừng lo về việc mình làm lộ API key nhé — mình đã thu hồi (revoke) chúng trước khi publish video này rồi!*

Nội dung gồm:

* **OpenAI API key** — để chúng ta có thể tạo các LLM call.
* **LangChain API key** — để bật **LangChain tracing**.
* **`LANGCHAIN_TRACING_V2=true`** — bật tracing phiên bản 2.
* **Tên project: `react function calling`** — để các trace của graph và các API call tới OpenAI được gom nhóm đúng chỗ.
* **API key của Tavily** — để dùng search API.

---

### ✅ Kiểm tra nhanh và tạo skeleton code

Tạo file `main.py` — đây sẽ là nơi chúng ta chạy mọi thứ trong project:

```python
from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()
    print("hello react langgraph with function calling")
```

Mình in ra một câu để **sanity check (kiểm tra nhanh)**, đồng thời dùng `load_dotenv()` để nạp biến môi trường. Ban đầu mình còn in cả **OpenAI API key** ra như một phép thử để chắc chắn file `.env` được load đúng — chạy lên thấy giá trị hiện ra là mọi thứ hoạt động như mong đợi. Kiểm tra xong thì mình xóa dòng in key đó khỏi code.

Tiếp theo, tạo hai file để chứa logic:

* **`react.py`** — sẽ chứa **reasoning engine (bộ máy suy luận)** của agent.
* **`node.py`** — sẽ chứa **implementation của các graph node (nút trong đồ thị)**.

Chúng ta sẽ implement hai file này trong các video kế tiếp.

---

### 📦 Commit và lưu trữ trên repository

Mình commit toàn bộ thay đổi với tên **Project Setup** rồi push lên repository. Nếu muốn xem code tham khảo, các bạn cứ vào repository, chọn nhánh **`project/react-async-function-calling`** và xem trong danh sách commit — commit này chứa đầy đủ mọi thứ chúng ta làm trong bài hôm nay.

Vậy là môi trường đã sẵn sàng! Bài sau chúng ta sẽ bắt đầu "lắp não" cho agent. Hẹn gặp lại các bạn! 🚀
