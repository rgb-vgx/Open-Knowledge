# 🛠️ Project Setup: Chuẩn bị môi trường cho Reflexion Agent (Poetry, PyCharm, .env)

> Nguồn: `101-Project-Setup.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/51122509)

Chào các bạn, lại là Eden đây! Trước khi bước vào phần code "nặng đô" của Reflexion Agent, chúng ta sẽ cùng nhau **thiết lập dự án** thật chỉn chu. Cụ thể: tạo thư mục dự án, dùng **Poetry** tạo môi trường ảo và cài dependencies, mở **PyCharm** cấu hình đúng interpreter, rồi tạo file **`.env`** chứa các API key.

### 🗂️ Tạo dự án và cài dependencies

Đầu tiên, mình vào Desktop, tạo một thư mục mới đặt tên là **reflection agent**, rồi `cd` vào trong đó. Tiếp theo, mình chạy `poetry init` để khởi tạo môi trường ảo và bắt đầu cài package — sau lệnh này, ta có ngay file `pyproject.toml`.

Danh sách dependencies cho dự án lần này:

1. **`python-dotenv`** — nạp biến môi trường từ file `.env`.
2. **`black` và `isort`** — format code gọn gàng.
3. **`langchain`** — thư viện chính.
4. **`langchain-openai`** — để kết nối với các model OpenAI.
5. **`langgraph`** — và tất nhiên, "nhân vật không thể thiếu" của chúng ta.

Chỉ mất vài giây thôi, tất cả dependencies đã được cài xong xuôi.

---

### 🖥️ Mở PyCharm và kiểm tra interpreter

Mình mở PyCharm và chọn mở project **reflection agent** vừa tạo. Điểm đáng chú ý: ở góc dưới bên phải, **PyCharm đã tự động phát hiện môi trường ảo Poetry**, và project interpreter của chúng ta đã được trỏ đúng vào môi trường có đầy đủ package. *Các bạn không cần làm gì thêm — PyCharm lo hết cho mình rồi!*

---

### 🔑 File .env: ba "chìa khóa" cho ba dịch vụ

Giờ là bước quan trọng: tạo file `.env` và điền các biến môi trường cần thiết:

* **OpenAI API key** — vì chúng ta sẽ trò chuyện với **GPT-4 Turbo**.
* **Tavily API key** — vì cần một search engine để tìm kiếm trực tuyến.
* **LangSmith API key** — vì chúng ta sẽ dùng LangSmith để **monitoring (giám sát)** và **tracing (theo dõi luồng chạy)**.

| Biến môi trường | Dịch vụ | Dùng cho |
|---|---|---|
| OpenAI API key | GPT-4 Turbo | Viết bài và viết critique |
| Tavily API key | Tavily | Tìm kiếm trực tuyến theo thời gian thực |
| LangSmith API key | LangSmith | Monitoring và tracing |

Ngoài ra, mình cũng đặt thêm hai biến quen thuộc:

* **`LANGCHAIN_TRACING_V2=true`** — bật tracing.
* **`LANGCHAIN_PROJECT`** — đặt tên hiển thị trên UI là **reflection agent**.

---

### ✅ Tạo main.py, cấu hình runner và chạy thử

Mình tạo file **`main.py`** với đoạn boilerplate quen thuộc:

```python
if __name__ == "__main__":
    print("hello reflection")
```

Tiếp đến, mình cấu hình runner cho PyCharm: bấm **Edit Configurations**, chọn nút dấu cộng, chọn **Python**, đổi tên thành **main**, và trỏ script đến file `Main.py` của chúng ta rồi bấm Apply/OK.

Cuối cùng, mình thêm đoạn import `load_dotenv` để **nạp toàn bộ biến môi trường**, rồi chạy thử mọi thứ. Kết quả: chương trình chạy tốt, các biến môi trường được nạp đầy đủ.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Dự án này cần ba API key nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** OpenAI API key, Tavily API key và LangSmith API key.

Giải thích: OpenAI để gọi GPT-4 Turbo, Tavily để tìm kiếm trực tuyến, LangSmith để monitoring và tracing.

Tham chiếu: Mục File .env.

</details>

**Câu 2:** Hai biến môi trường quen thuộc dùng để bật tracing và đặt tên project là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `LANGCHAIN_TRACING_V2=true` và `LANGCHAIN_PROJECT` — đặt tên hiển thị là **reflection agent**.

Giải thích: Đây là hai biến được thêm cùng các API key trong file `.env`.

Tham chiếu: Mục File .env.

</details>

**Câu 3:** Vì sao cần Tavily API key trong khi section trước không có?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì Reflexion Agent cần một search engine để tìm dữ liệu trực tuyến.

Giải thích: Search tool giúp agent lấy thông tin thời gian thực và trích dẫn nguồn.

Tham chiếu: Mục File .env.

</details>

**Câu 4:** Các bước cấu hình runner trong PyCharm là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Edit Configurations → nút dấu cộng → Python → đổi tên thành **main** → trỏ script đến file `Main.py` → Apply/OK.

Giải thích: Nhờ vậy ta có thể chạy file main trực tiếp từ PyCharm.

Tham chiếu: Mục Tạo main.py, cấu hình runner và chạy thử.

</details>

**Câu 5:** Vì sao không cần cấu hình interpreter thủ công?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** PyCharm đã tự động phát hiện môi trường ảo Poetry.

Giải thích: Project interpreter được trỏ đúng vào môi trường đã cài đầy đủ package.

Tham chiếu: Mục Mở PyCharm và kiểm tra interpreter.

</details>

Vậy là chúng ta đã sẵn sàng bắt tay vào viết agent đầu tiên! Hẹn gặp lại các bạn ở bài tiếp theo nhé! 🚀

## Nguồn tham khảo

- [Udemy — Project Setup](https://ua.udemy.com/course/langchain/learn/lecture/51122509)
- [Poetry — Documentation](https://python-poetry.org/docs/)
- [LangChain Docs — Tavily search integration](https://docs.langchain.com/oss/python/integrations/tools/tavily_search)
