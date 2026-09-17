# ⚙️ Project Setup cho Reflexion Agent: Dựng môi trường "chuẩn bài" chỉ trong vài phút

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

*Nếu bạn từng "vật lộn" với cấu hình interpreter hay biến môi trường, thì mình tin bước này sẽ khiến bạn thở phào.* Môi trường đã sẵn sàng, giờ là lúc viết agent! Video tiếp theo chúng ta sẽ bắt đầu với **Actor Agent** nhé! 🚀
