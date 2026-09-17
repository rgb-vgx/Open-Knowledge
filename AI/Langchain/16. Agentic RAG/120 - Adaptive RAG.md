# 🧭 Adaptive RAG: Chiếc "bộ định tuyến" đưa câu hỏi đi đúng luồng

Chúng ta đã đi đến phần cuối cùng của section Agentic RAG rồi! Trong bài này, mình sẽ triển khai một phiên bản **Adaptive RAG**, dựa trên một **research paper** — nghe "kêu" vậy thôi chứ thực chất nó là cách nói hoa mỹ của việc dùng **question router** (bộ định tuyến câu hỏi) để đưa câu hỏi vào những luồng RAG khác nhau.

### 🎯 Hai luồng RAG trong bài

Trong bài, chúng ta dùng **hai luồng RAG**:

1. **Web search:** tìm kiếm trên internet, rồi tiếp tục theo đúng logic downstream mà chúng ta đã xây dựng.
2. **Retrieval augmentation:** tận dụng kho tài liệu trong **vector store**.

Luồng xử lý rất tự nhiên: nhận câu hỏi người dùng → quyết định xem thông tin trả lời có nằm trong vector store hay không → nếu không, ta chuyển hướng sang **web search** và trả lời từ đó.

Nhiệm vụ chính hôm nay: viết **question router chain**. Mình cũng sẽ viết test cho nó và tích hợp vào graph bằng **conditional entry point** (điểm vào có điều kiện).

---

### 🔌 Router chain với Literal và structured output

Mình tạo file `router.py` trong package `chains`. Bắt đầu từ import đáng chú ý nhất: **`Literal` từ `typing`**.

*Nếu bạn chưa quen `Literal` thì đừng lo* — nó cho phép khai báo rằng một biến chỉ được nhận **một tập giá trị định trước**, cực kỳ hữu ích cho validation và type checking.

Tiếp theo là class `RouteQuery` kế thừa BaseModel với một attribute duy nhất là `data_source`, chỉ nhận hai giá trị:

* `vectorstore` — nếu câu trả lời nằm trong kho vector.
* `web_search` — nếu cần tìm kiếm bên ngoài bằng **Tavily**.

Khi khởi tạo `Field`, mình truyền dấu `...` (ellipsis) — nghĩa là field này **bắt buộc** khi tạo object. Description của field: *"Given a user question choose to route it to web search or a vectorstore."*

```python
class RouteQuery(BaseModel):
    data_source: Literal["vectorstore", "web_search"] = Field(
        ...,
        description="Given a user question choose to route it to web search or a vectorstore.",
    )

question_router = route_prompt | llm.with_structured_output(RouteQuery)
```

Sau đó mình khởi tạo LLM với structured output — tức là gắn Pydantic class này để được gọi như một **function call**. System prompt mô tả vai trò: *"You are an expert at routing a user question to a vectorstore or web search"* — và nêu rõ vector store chứa tài liệu về **agents, prompt engineering và adversarial attacks** (đúng những bài báo mình đã ingest ở đầu section). Câu hỏi thuộc các chủ đề này thì dùng vector store, **mọi thứ khác thì dùng web search**.

Cuối cùng, `ChatPromptTemplate.from_messages` với system message và human message chứa câu hỏi, rồi ta pipe prompt vào router để tạo chain `question_router`.

---

### 🧪 Test định tuyến

Mình vào file test và viết hai case — *nhớ đặt import router sau `load_dotenv` để không dính lỗi môi trường nhé*:

* **Route tới vector store:** câu hỏi "agent memory" → assert `data_source == "vectorstore"`. Pass.
* **Route tới web search:** câu hỏi "how to make pizza" → pass.

Chạy toàn bộ test, tất cả đều xanh — cảm giác ngắm những dấu check màu xanh đúng là rất "đã". Một ghi chú nhỏ: các test hoàn toàn độc lập nên có thể tối ưu bằng cách chạy **song song (concurrently)**, nhưng mình để dành cho phần sau của khóa học.

---

### 🧭 Conditional entry point và chạy thử

Graph mới sẽ bắt đầu từ start node, rồi rẽ nhánh điều kiện: hoặc vào **retrieve**, hoặc vào **web search**, tùy theo router. Điểm mới ở đây là **conditional entry point** — hiểu đơn giản là một **conditional edge gắn với node đầu tiên** của entry point, đóng vai trò định tuyến.

Mình viết hàm `route_question(state)`:

* In log để biết đang ở bước routing.
* Lấy câu hỏi từ graph state, chạy `question_router` và lưu kết quả vào biến `source` kiểu `RouteQuery` (nhớ là chain trả về object nhờ structured output).
* Nếu `data_source` là web search → return node **web search**; nếu là vector store → return node **retrieve** để chạy retrieval augmentation.

Sau đó mình gọi `set_conditional_entry_point(route_question, path_map)` với path map: web search → web search, retrieve → retrieve. Phần còn lại của graph giữ nguyên như cũ — không thêm node nào mới, chỉ thêm một conditional edge từ entry point.

Chạy thử với "what is agent memory" → câu hỏi được route vào **vector store**, chạy retrieval augmentation rồi theo đúng luồng quen thuộc, cuối cùng trả về đáp án như mong muốn; các bạn có thể xem toàn bộ trace trên **LangSmith**. Đổi query sang **"how to make pizza"** → lần này route thẳng sang **web search**, Tavily chạy và flow tiếp tục đến câu trả lời.

Vậy là chúng ta đã hoàn thành luồng **Adaptive RAG**! Chỉ với một conditional edge ở entry point, agent đã biết tự chọn "đúng cửa" cho từng câu hỏi. Chặng đường Agentic RAG khép lại ở đây — hãy tự hào vì các bạn đã đi qua một trong những chủ đề khó nhất của khóa học. Hẹn gặp lại ở những bài tiếp theo! 🚀
