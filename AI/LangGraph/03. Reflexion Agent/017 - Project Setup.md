# ⚙️ Project Setup cho Reflexion Agent: Dựng môi trường "chuẩn bài" chỉ trong vài phút

> Nguồn: `017-Project-Setup.txt` · [Udemy](https://ua.udemy.com/course/langgraph/learn/lecture/43511258)

Chào các bạn, mình là Eden đây! 👋 Trước khi bắt tay vào code agent, chúng ta cần một nền móng vững chắc: **project directory**, **virtual environment**, **dependencies** và **API key**. Video này sẽ đưa các bạn đi qua toàn bộ quá trình đó với **Poetry**, **PyCharm** và một file `.env` gọn gàng.

---

### 📁 Tạo project và cài dependencies với Poetry

Đầu tiên, mình vào desktop, tạo một thư mục mới tên là **reflection_agent**, rồi `cd` vào đó. Sau đó mình chạy **Poetry** để khởi tạo **virtual environment** và bắt đầu cài package — các bạn sẽ thấy file `pyproject.toml` xuất hiện.

Các dependency mình cài gồm:

* **python-dotenv** — quản lý biến môi trường.
* **black** — formatting code.
* **langchain** và **langchain-openai**.
* Và tất nhiên không thể thiếu **langgraph**.

Quá trình cài đặt chỉ mất vài giây. Sau khi xong, mình tạo luôn file `.env`.

---

### 💻 Mở PyCharm và cấu hình interpreter

Mình mở **PyCharm**, chọn **Open project** và tìm thư mục **reflection_agent**. Điểm hay là PyCharm **tự phát hiện Poetry virtual environment** — ở góc dưới bên phải, các bạn sẽ thấy project interpreter đã được trỏ đúng vào environment chứa các package vừa cài.

---

### 🔑 "Bơm" API key vào file .env

Đây là bước quan trọng nhất về mặt cấu hình. File `.env` cần ba API key:

1. **OpenAI API key** — để giao tiếp với GPT-4 Turbo.
2. **Tavily API key** — để có search engine tra cứu online.
3. **LangChain API key** — để dùng **LangSmith** cho monitoring và tracing.

Ngoài ra, mình set thêm `LANGCHAIN_TRACING_V2=true` và đặt tên project là `reflection agent` (biến `LANGCHAIN_PROJECT`) — tên này sẽ được hiển thị trên giao diện LangSmith.

---

### ▶️ File main.py và cấu hình runner

Mình tạo file **main.py** với boilerplate quen thuộc `if __name__ == "__main__"`, in ra dòng **"hello reflection"**, rồi cấu hình runner của PyCharm:

1. Click **Edit Configurations**.
2. Bấm nút **+** và chọn **Python**.
3. Đổi tên thành **main**.
4. Ở mục script, chọn file `main.py`.
5. Bấm **Apply**.

Sau đó mình thêm `from dotenv import load_dotenv`, gọi hàm load biến môi trường và chạy thử — mọi thứ hoạt động trơn tru, **biến môi trường đã được nạp đúng**.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Poetry đóng vai trò gì trong project này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khởi tạo và quản lý virtual environment cùng dependencies, sinh ra file `pyproject.toml`.

Giải thích: Nhờ Poetry, môi trường tách biệt và dependency được quản lý tập trung.

Tham chiếu: Mục Tạo project và cài dependencies.

</details>

**Câu 2:** Ba API key cần điền vào file `.env` là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** OpenAI API key, Tavily API key và LangChain API key.

Giải thích: OpenAI để gọi GPT-4 Turbo, Tavily cho search engine, LangChain key cho LangSmith.

Tham chiếu: Mục Bơm API key vào file .env.

</details>

**Câu 3:** `LANGCHAIN_TRACING_V2=true` và `LANGCHAIN_PROJECT` dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bật tracing và đặt tên project hiển thị trên giao diện LangSmith.

Giải thích: Tên project ví dụ là `reflection agent` — dùng để phân tách các lần chạy trên LangSmith.

Tham chiếu: Mục Bơm API key vào file .env.

</details>

**Câu 4:** Vì sao không cần cấu hình interpreter thủ công trong PyCharm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** PyCharm tự phát hiện Poetry virtual environment và trỏ đúng interpreter.

Giải thích: Ở góc dưới bên phải, interpreter đã được gắn vào environment chứa package vừa cài.

Tham chiếu: Mục Mở PyCharm và cấu hình interpreter.

</details>

**Câu 5:** Các bước tạo runner cho `main.py` trong PyCharm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Edit Configurations → nút + → chọn Python → đặt tên `main` → chọn script `main.py` → Apply.

Giải thích: Sau đó chạy thử với `load_dotenv` để kiểm tra biến môi trường đã được nạp.

Tham chiếu: Mục File main.py và cấu hình runner.

</details>

*Nếu bạn từng "vật lộn" với cấu hình interpreter hay biến môi trường, thì mình tin bước này sẽ khiến bạn thở phào.* Môi trường đã sẵn sàng, giờ là lúc viết agent! Video tiếp theo chúng ta sẽ bắt đầu với **Actor Agent** nhé! 🚀

## Nguồn tham khảo

- [Udemy — Project Setup](https://ua.udemy.com/course/langgraph/learn/lecture/43511258)
- [Poetry — Documentation](https://python-poetry.org/docs/)
- [LangSmith Docs — Trace LangGraph applications](https://docs.langchain.com/langsmith/trace-with-langgraph)
