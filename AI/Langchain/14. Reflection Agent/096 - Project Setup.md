# 🛠️ Project Setup: Dựng "bệ phóng" cho Reflection Agent với Poetry, PyCharm và biến môi trường

> Nguồn: `096-Project-Setup.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/51118767)

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

| File | Chứa gì | Vai trò |
|---|---|---|
| `pyproject.toml` | Khai báo các dependency | Định nghĩa dự án cần những gì |
| `poetry.lock` | Phiên bản chính xác của từng package | Khóa phiên bản để mọi lần cài đều đồng bộ |

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

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Lệnh nào khởi tạo môi trường ảo và sinh ra file `pyproject.toml`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `poetry init` — cứ nhấn Enter cho mọi câu hỏi.

Giải thích: Sau lệnh này, môi trường ảo của Poetry sẵn sàng kèm file `pyproject.toml`.

Tham chiếu: Mục Khởi tạo dự án và môi trường ảo với Poetry.

</details>

**Câu 2:** `poetry.lock` khác `pyproject.toml` ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `pyproject.toml` khai báo dependency, còn `poetry.lock` chứa phiên bản chính xác của từng package.

Giải thích: Nhờ đó ta kiểm tra được mọi thứ đồng bộ trước khi code.

Tham chiếu: Mục Cấu hình PyCharm và kiểm tra phiên bản dependencies.

</details>

**Câu 3:** Dự án dùng phiên bản LangChain và LangGraph nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** LangChain 0.1.16 và LangGraph 0.38 — đều là bản mới nhất tại thời điểm quay video.

Giải thích: Hai con số này nằm trong `poetry.lock`.

Tham chiếu: Mục Cấu hình PyCharm và kiểm tra phiên bản dependencies.

</details>

**Câu 4:** File `.env` chứa những gì và được nạp bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chứa các API key như OpenAI, LangSmith cùng biến `LANGCHAIN_TRACING_V2=true` và `LANGCHAIN_PROJECT`; nạp bằng `load_dotenv`.

Giải thích: `load_dotenv` đọc toàn bộ biến môi trường từ file `.env` vào chương trình.

Tham chiếu: Mục Tạo file .env và Chạy sanity check.

</details>

**Câu 5:** Vì sao không cần cấu hình interpreter thủ công trong PyCharm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** PyCharm tự động phát hiện môi trường ảo của Poetry.

Giải thích: Nhờ vậy ta chỉ cần mở đúng thư mục dự án là dùng được ngay.

Tham chiếu: Mục Cấu hình PyCharm và kiểm tra phiên bản dependencies.

</details>

Vậy là phần "boilerplate" đã hoàn tất: đầy đủ dependencies, biến môi trường đã load ổn thỏa. Giờ là lúc chuyển sang phần thú vị nhất — **viết code LangGraph**! Hẹn gặp các bạn ở bài tiếp theo nhé! 🚀

## Nguồn tham khảo

- [Udemy — Project Setup](https://ua.udemy.com/course/langchain/learn/lecture/51118767)
- [Poetry — Documentation](https://python-poetry.org/docs/)
