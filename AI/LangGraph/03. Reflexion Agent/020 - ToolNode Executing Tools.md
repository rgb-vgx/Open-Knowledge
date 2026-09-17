# 🔧 ToolNode: "Cỗ máy" thực thi tool giúp bạn tiết kiệm hàng tấn công việc

Chào các bạn, mình là Eden đây! 👋 Video này đánh dấu một cột mốc quan trọng: chúng ta sẽ implement **tool executor node** (node thực thi tool) — nhân vật nhận vào **AI message** chứa các **search query** mà agent muốn tra cứu, rồi chạy **Tavily** để mang về kết quả và thông tin thời gian thực từ internet.

Tin vui là sau video này, chúng ta sẽ có đủ **mọi mảnh ghép** cho graph và sẵn sàng dựng nó. Cùng vào code thôi!

---

### 🧰 Chuẩn bị "đồ nghề": file tool_executor.py và StructuredTool

Mình tạo file mới tên **`tool_executor.py`**, mở đầu bằng `load_dotenv` và nạp biến môi trường như thường lệ. Sau đó mình import **`TavilySearch`** từ **`langchain_tavily`** — nhớ cài package bằng `poetry add langchain-tavily` và chuẩn bị **Tavily API key** trong file `.env` nhé.

*Mình có copy API key của mình vào file `.env` để demo, nhưng các bạn đừng lo — mình đã **revoke (thu hồi)** toàn bộ key sau khi quay xong video này!*

Tiếp theo là **`StructuredTool`** — class của LangChain cho phép biến một **Python function** thành **tool** mà LLM có thể dùng. Nó cung cấp cho LLM một **structured schema (lược đồ có cấu trúc)** của function, giúp LLM hiểu đúng cách sử dụng tool này.

Cuối cùng, mình import **`ToolNode`** từ LangGraph, cùng hai class **`AnswerQuestion`** và **`ReviseAnswer`** đã xây dựng ở các video trước.

---

### 🧠 ToolNode: class "đỡ việc" đỉnh nhất mà LangGraph dành cho bạn

`ToolNode` là một class cực hay vì nó **tiết kiệm cho chúng ta hàng tấn công việc**. Đây là một **node (nút)** trong LangGraph mà ta có thể invoke, và khi chạy nó sẽ:

1. Nhìn vào **state (trạng thái)** ở key **`messages`**.
2. Kiểm tra **message cuối cùng**.
3. Xem LLM có quyết định **tool call** nào không.
4. Nếu có, nó **thực thi đúng tool đó** — thậm chí chạy **song song (parallel)** nhiều tool một lúc.

*Trước đây, mọi thứ phải tự làm bằng tay.* Mình từng làm đúng như vậy trong phiên bản gốc của khóa học, nên mình giữ lại phần implementation thủ công đó dưới dạng **bài optional** — để các bạn thấy tận mắt `ToolNode` đã "gánh" giúp chúng ta những gì.

---

### ✨ Chiêu hay: một search engine, hai tool, hai cái tên

Mình khởi tạo object `TavilySearch` với **`max_results=5`** — đơn giản để mỗi query trả về 5 kết quả. Object này cho ta một **LangChain tool** bọc sẵn chức năng của search engine.

Nhưng mình không dùng nó "trần" như mọi khi. Từ chính tool đó, mình tạo ra **hai tool khác nhau** — cùng chung chức năng Tavily search nhưng **khác tên**, vì chúng phục vụ hai mục đích trong workflow:

* **`answer_question`** — dùng ở **giai đoạn research ban đầu**, khi agent trả lời câu hỏi lần đầu.
* **`revise_answer`** — dùng ở **giai đoạn revision**, khi agent cải thiện câu trả lời dựa trên **reflection**.

Về lý thuyết, dùng một tool duy nhất cũng chạy được. Nhưng **hai cái tên riêng** giúp hệ thống biết chính xác **search được kích hoạt ở giai đoạn nào** — research ban đầu hay research để revise — nhờ đó việc **debug và đánh giá câu trả lời** trở nên dễ dàng hơn nhiều.

---

### 🧩 Lắp ráp: run_queries, StructuredTool.from_function và ToolNode

"Ngôi sao" của file là function **`run_queries`**, nhận vào **`search_queries`** — một **list of strings** — với description *"run the generated queries"*. Mình thêm cả `**kwargs` vào chữ ký hàm để nếu LLM truyền thêm giá trị nào khác thì cũng không bị lỗi.

Phần implementation rất gọn: mình chạy tool search trên các query và dùng phương thức **`batch`** để thực thi chúng **đồng thời (concurrently)** thay vì lần lượt.

Từ function này, **`StructuredTool.from_function`** giúp mình "đúc" ra hai tool với đầy đủ **schema và description**:

* Tool thứ nhất mang tên của class **`AnswerQuestion`**.
* Tool thứ hai chạy **cùng function** nhưng mang tên của class **`ReviseAnswer`**.

Cả hai đều chạy chung `run_queries`, và mình lấy **tên class** để đặt tên tool — đó chính là lý do ta cần hai object này.

Cuối cùng, mình khởi tạo object **`ToolNode`** và truyền vào **list hai tool** vừa tạo. Từ giờ, node này sẽ tự soi state, kiểm tra message cuối và thực thi đúng tool call liên quan.

Mình format code, commit lên **branch reflection agent** của repository — như mọi khi, commit của video này nằm trong phần **Resources** nhé.

Vậy là toàn bộ "đồ nghề" đã sẵn sàng, chúng ta có thể dựng graph được rồi! Còn một món quà nhỏ: trong các bài **optional** kế tiếp, mình sẽ đưa các bạn về "thời kỳ đồ đá" — tự tay viết tool executor mà không có `ToolNode` — để bạn thấy rõ giá trị của nó. Hẹn gặp lại! 🚀
