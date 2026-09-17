# ⚙️ Chuẩn bị môi trường cho LangChain Search Agent (uv, Tavily & LangSmith)

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

Thế là xong phần setup! Mọi thứ đã sẵn sàng để chúng ta viết agent thật. Hẹn gặp các bạn ở bài tiếp theo nhé! 🚀
