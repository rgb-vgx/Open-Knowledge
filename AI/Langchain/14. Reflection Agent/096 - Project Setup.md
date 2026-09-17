# 🛠️ Project Setup: Dựng "bệ phóng" cho Reflection Agent với Poetry, PyCharm và biến môi trường

Chào các bạn, mình là Eden đây! Trong bài này, chúng ta sẽ cùng nhau **thiết lập dự án reflection agent** — một khâu tưởng chừng nhàm chán nhưng lại quyết định sự mượt mà cho toàn bộ hành trình phía sau. Cụ thể, chúng ta sẽ tạo thư mục dự án, dùng **Poetry** để tạo môi trường ảo và cài dependencies, cấu hình **PyCharm** trỏ đúng vào môi trường ảo đó, rồi tạo file **`.env`** để chứa các API key.

### 🗂️ Khởi tạo dự án và môi trường ảo với Poetry

Đầu tiên, mình vào Desktop tạo một thư mục mới đặt tên là **Reflection agent**, sau đó `cd` vào trong đó. Tiếp theo, mình chạy lệnh `poetry init` và cứ nhấn Enter cho mọi câu hỏi — vậy là môi trường ảo của Poetry đã sẵn sàng, kèm theo file `pyproject.toml` vừa được sinh ra.

Bây giờ là lúc cài các package cần thiết cho dự án bằng `poetry add`:

1. **`python-dotenv`** — để nạp các biến môi trường từ file `.env`.
2. **`black` và `isort`** — bộ đôi công cụ giúp format code gọn gàng, chỉn chu.
3. **`langchain`** — thư viện chính của khóa học.
4. **`langchain-openai`** — vì chúng ta sẽ gọi model **GPT-3.5**.
5. **`langgraph`** — "nhạc trưởng" sẽ điều phối graph của chúng ta.

Poetry sẽ mất vài giây để cài đặt, sau đó mọi thứ đã sẵn sàng để sử dụng.

---

### 🖥️ Cấu hình PyCharm và kiểm tra phiên bản dependencies

Mình mở PyCharm, chọn mở project mới và trỏ đến thư mục **Reflection agent** vừa tạo. PyCharm sẽ **tự động phát hiện môi trường ảo của Poetry**, giúp chúng ta không phải cấu hình thủ công.

Trong project lúc này có hai file rất đáng chú ý:

* **`pyproject.toml`** — nơi khai báo các dependency của dự án.
* **`poetry.lock`** — nơi chứa phiên bản chính xác của từng package đang dùng.

Trước khi viết code, mình ghé kiểm tra phiên bản trong `poetry.lock` để chắc chắn mọi thứ đồng bộ: **LangChain 0.1.16** và **LangGraph 0.38** — cả hai đều là phiên bản mới nhất tại thời điểm quay video.

---

### 🔑 Tạo file .env và "khai báo" các API key

Mình tạo file `.env` và dán vào các biến môi trường cần thiết cho dự án:

* **OpenAI API key** — để gọi LLM (mình tin chắc các bạn đã biết cách lấy key này).
* **LangSmith API key** — phục vụ cho việc **tracing (theo dõi và gỡ lỗi luồng chạy)**.
* **`LANGCHAIN_TRACING_V2=true`** — bật chế độ tracing.
* **`LANGCHAIN_PROJECT`** — đặt tên hiển thị cho project là **reflection agent**.

---

### ✅ Chạy "sanity check" cho dự án

Mình tạo file **`main.py`** — file chính của dự án — với đoạn boilerplate quen thuộc:

```python
if __name__ == "__main__":
    print("hello langgraph")
```

Mình chạy thử ngay để kiểm tra và kết quả hiển thị tốt. Tiếp đó, mình import hàm `load_dotenv` và gọi nó để **nạp toàn bộ biến môi trường** từ file `.env`, rồi chạy ở chế độ debug. Dùng Evaluate Expression, mình import `os` và kiểm tra giá trị của key **OPENAI_API_KEY** — giá trị đã được nạp thành công.

Vậy là phần "boilerplate" đã hoàn tất: đầy đủ dependencies, biến môi trường đã load ổn thỏa. Giờ là lúc chuyển sang phần thú vị nhất — **viết code LangGraph**! Hẹn gặp các bạn ở bài tiếp theo nhé! 🚀
