# ⚙️ Khởi tạo dự án Agentic RAG với LangGraph: Poetry, PyCharm và bản cập nhật mới nhất

Chào các bạn, Eden đây! Trong bài này, chúng ta sẽ cùng nhau **thiết lập dự án cho reflection agent** của mình. Cụ thể, mình sẽ tạo thư mục dự án, dùng **Poetry** để tạo môi trường ảo và cài đặt dependency, cấu hình **PyCharm** trỏ đúng vào môi trường ảo đang dùng, rồi tạo file `.env` chứa các API key cần thiết.

### 🧰 Dựng "bộ khung" dự án với Poetry

Mình bắt đầu bằng việc `cd` vào Desktop, tạo một thư mục mới tên là **LangGraphCourse**, rồi chạy `poetry init` và nhấn Enter để đi tiếp qua các bước thiết lập. Lúc này mình đã có file **pyproject.toml** — nhưng chưa có gì được cài đặt cả, nên chúng ta sẽ cài mọi thứ bằng `poetry add`:

* **Beautiful Soup** — LangChain sẽ dùng thư viện này để tải các file từ web về, phục vụ việc ingest vào vector store.
* **LangChain**, **LangGraph**, **LangChain Hub**.
* **LangChain Community** — để dùng các third-party loader khi nạp tài liệu.
* **Tavily SDK** — cho search engine của chúng ta.
* **Chroma** — open-source vector store.
* **python-dotenv** — quản lý biến môi trường.
* **Black** và **Isort** — định dạng code.
* **PyTest** — vì chúng ta sẽ viết test.

Toàn bộ code của bài này và cả series nằm trên **GitHub**, ở branch `one start here`. Nếu cần so sánh hoặc xem mình đang dùng phiên bản nào, các bạn cứ thoải mái tham khảo nhé!

---

### 🔄 Cập nhật quan trọng: LangChain Community đã bị deprecated

Đây là đoạn mình quay bổ sung sau này (cũng khoảng **hai năm** kể từ lúc quay video gốc, nên trông mình có "già" hơn một chút 😄). Lý do là mình muốn đảm bảo chúng ta **khớp với phiên bản LangChain mới nhất**. Tin vui là toàn bộ code vẫn giữ nguyên, chỉ thay đổi một vài import:

* **LangChain Community đã deprecated**, nên chúng ta không cài package này nữa.
* Với document loader, thay vào đó hãy cài **LangChain-Unstructured**.
* Với text reader, cài **LangChain-TextReaders**.

Mình cũng muốn nhấn mạnh: **viết test trong các ứng dụng generative là điều cực kỳ quan trọng** — và đó là lý do mình nhất định đưa phần testing vào khóa học này.

---

### 🗝️ Cấu hình .env và kiểm tra "sức khỏe" dự án

Sau khi các package được cài xong, mình mở dự án bằng **PyCharm**. PyCharm tự phát hiện môi trường Poetry, mình bấm approve và để nó index toàn bộ package. Mở file **pyproject.toml** là thấy ngay các phiên bản đang dùng — và mình sẽ luôn cập nhật repository của khóa học theo phiên bản LangChain, LangGraph mới nhất.

Tiếp theo, mình tạo file **.env** để chứa biến môi trường:

* **OpenAI API key** và **LangSmith API key** (chúng ta dùng LangSmith để tracing).
* Bật **LangSmith Tracing**, với project đặt tên là **Crag**.
* **Tavily API key** cho search engine.
* Biến **PYTHONPATH** trỏ về thư mục gốc của dự án.

Cuối cùng, mình tạo file **main.py** với code boilerplate: nạp biến môi trường rồi in ra dòng `Hello Advanced RAG`. Chạy thử như một **sanity check** — mọi thứ hoạt động trơn tru!

*Nếu bạn thấy có bước nào chưa khớp, đừng lo — cứ xem lại branch `one start here` trong repository để đối chiếu nhé.*

Trong video tiếp theo, chúng ta sẽ cùng điểm qua **cấu trúc repository**. Hẹn gặp lại các bạn! 🚀
