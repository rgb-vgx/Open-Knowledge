# ⚙️ Chuẩn bị môi trường cho LangChain Search Agent (uv, Tavily & LangSmith)

> Nguồn: `017-Setting-Up-the-Environment-for-a-LangChain-Search-Agent.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/53365483)

Chào các bạn, Eden đây! Trước khi viết dòng code đầu tiên cho search agent, chúng ta cần dựng cho xong "căn nhà" của nó đã: **môi trường Python, dependencies và API key**.

Bạn nhớ checkout đúng branch nhé — mình đã đính link trong phần Tài nguyên (Resources) của video.

---

### 🌿 Branch và khởi tạo dự án

Toàn bộ code của section này nằm ở branch **`project/react-search-agent`**. Vì lý do kỹ thuật, mình commit code lên branch này chứ không phải branch ở góc dưới bên trái màn hình.

Đầu tiên, khởi tạo dự án Python bằng **`uv init`**, rồi cài các dependencies quen thuộc:

* **`langchain`** — "linh hồn" của khóa học.
* **`langchain-openai`** — tích hợp OpenAI mà chúng ta đã bàn ở các video trước.
* **`langchain-tavily`** — "nhân vật mới" của section này.
* **`tavily-python`** — SDK gốc của Tavily, sẽ dùng cho một mục đích rất quan trọng ở bài sau.
* **`python-dotenv`** — nạp biến môi trường như các bài trước.
* **`black`** và **`isort`** — để format code cho gọn gàng.

Sau khi chạy `uv add`, bạn có thể xem danh sách package trong **`pyproject.toml`**, còn muốn biết phiên bản chính xác thì xem **`uv.lock`**.

---

### 🔎 Tại sao lại là Tavily?

Tavily là bên thứ ba giúp chúng ta **kết nối agent với web**, biến agent thành một "cỗ máy tìm kiếm". Ngoài search, Tavily còn có nhiều API hữu ích khác như **Tavily Crawl, Tavily Map, Tavily Extract** — những service rất đáng dùng cho AI agent (và chúng ta sẽ gặp lại chúng ở phần sau của khóa học).

Lý do Tavily trở thành lựa chọn phổ biến nhất để tích hợp web search vào agent:

* **API xuất sắc**, dễ dùng, scale tốt.
* **Có mặt trong documentation chính thức** như service search engine mặc định khi xây agent.
* Gần như là **những người đầu tiên** kết nối một agent với khả năng tìm kiếm.
* **Gói free rất hào phóng: 1.000 API requests mỗi tháng** — quá đủ cho khóa học này.

Mình có thử nhanh trong **API playground** với câu hỏi kiểu "what are the latest Anthropic models": kết quả trả về **URL nguồn** cùng phần **content** (ví dụ nội dung nói về **Claude Opus 4.1**). Search còn hỗ trợ filter nâng cao, nhưng trong section này chúng ta chỉ dùng những thứ cơ bản.

---

### 🔑 Lấy API key và cấu hình biến môi trường

Đăng nhập Tavily (mình dùng Google), vào phần environment để xem **API keys**, bấm dấu cộng để tạo key mới, đặt tên, giới hạn usage theo tháng rồi nhấn **Create**. Bạn có thể xem lại và copy key vừa tạo.

Trong file **`.env`**, mình có:

* **`OPENAI_API_KEY`** — như các section trước.
* **`LANGSMITH_TRACING=true`** và **`LANGSMITH_API_KEY`** — để bật tracing (theo dõi luồng chạy) và xem trace.
* **Project LangSmith** — mình đổi thành dự án của search agent.
* **`TAVILY_API_KEY`** — key vừa lấy từ giao diện Tavily.

*Lưu ý cực quan trọng:* tên biến môi trường phải là **`TAVILY_API_KEY`**, vì LangChain sẽ tìm đúng tên đó để xác thực với service — cơ chế hoàn toàn giống `OPENAI_API_KEY` mà bạn đã quen.

---

### 📝 Bắt đầu với main.py

Quay lại file **`main.py`**, mình chạy thử đoạn boilerplate để chắc chắn mọi thứ hoạt động, rồi bắt đầu phần import: nạp hàm **`load_dotenv`** và gọi nó ngay đầu file để load toàn bộ biến môi trường từ `.env`.

---

### 💻 Code mẫu đầy đủ — `main.py`

Toàn bộ code của bài nằm trong file `main.py` (tham khảo từ repo chính thức của khóa học):

```python
from dotenv import load_dotenv

load_dotenv()


def main():
    print("Hello from langchain-course!")


if __name__ == "__main__":
    main()
```

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Code của section này nằm ở branch nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Branch `project/react-search-agent`.

Giải thích: Mình commit code lên branch này vì lý do kỹ thuật, không phải branch hiển thị ở góc dưới màn hình.

Tham chiếu: Mục Branch và khởi tạo dự án.

</details>

**Câu 2:** Vì sao cài cả `tavily-python` lẫn `langchain-tavily`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `tavily-python` là SDK gốc, sẽ dùng cho một mục đích rất quan trọng ở bài sau; `langchain-tavily` là tích hợp sẵn cho LangChain.

Giải thích: Bài sau ta tự viết tool bằng SDK trước, rồi mới chuyển sang tool vendor.

Tham chiếu: Mục Branch và khởi tạo dự án.

</details>

**Câu 3:** Tên biến môi trường cho Tavily bắt buộc là gì, vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `TAVILY_API_KEY` — vì LangChain tìm đúng tên đó để xác thực với service.

Giải thích: Cơ chế hoàn toàn giống `OPENAI_API_KEY` mà bạn đã quen.

Tham chiếu: Mục Lấy API key.

</details>

**Câu 4:** Gói free của Tavily cho bao nhiêu request mỗi tháng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 1.000 API requests mỗi tháng.

Giải thích: Quá đủ cho khóa học, và Tavily được chọn nhờ API tốt, scale tốt, có mặt trong documentation chính thức.

Tham chiếu: Mục Tại sao lại là Tavily.

</details>

**Câu 5:** Hai biến LangSmith trong `.env` dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bật tracing và xem trace các lần chạy agent.

Giải thích: `LANGSMITH_TRACING=true` và `LANGSMITH_API_KEY`, kèm tên project của search agent.

Tham chiếu: Mục Lấy API key.

</details>

Thế là xong phần setup! Mọi thứ đã sẵn sàng để chúng ta viết agent thật. Hẹn gặp các bạn ở bài tiếp theo nhé! 🚀

## Nguồn tham khảo

- [Udemy — Setting Up the Environment for a LangChain Search Agent](https://ua.udemy.com/course/langchain/learn/lecture/53365483)
- [LangChain Docs — Tavily Search integration](https://docs.langchain.com/oss/python/integrations/tools/tavily_search)
- [Tavily Docs — LangChain integration](https://docs.tavily.com/documentation/integrations/langchain)
- [LangSmith Docs — Trace with LangChain](https://docs.langchain.com/langsmith/trace-with-langchain)
