# 🧩 Ghép nối Graph hoàn chỉnh: Khi mọi node "nối vòng tay lớn" và agent chạy thật

Chặng cuối đã đến! Hôm nay mình sẽ kết nối toàn bộ node và edge đã xây dựng thành một **LangGraph agent hoàn chỉnh**, rồi chạy thử để xem Agentic RAG "sống" như thế nào.

### 📦 Chuẩn bị: export node và khai báo hằng số

Trước khi lắp graph, có hai việc dọn dẹp nhỏ:

1. **File `__init__.py` trong package `nodes`:** import toàn bộ node chúng ta đã tạo — `generate`, `grade_documents`, `retrieve`, `web_search` — và khai báo `__all__` chứa tên các node. Nhờ vậy, các node có thể được import từ bên ngoài package một cách gọn gàng.
2. **File `const.py`:** định nghĩa các hằng số là **tên node** dùng trong graph (viết hoa), ví dụ `RETRIEVE = "retrieve"` với giá trị viết thường. Mục đích là **tránh trùng lặp code**: mọi nơi đều tham chiếu hằng số, nếu cần đổi tên node thì chỉ sửa một chỗ duy nhất.

---

### 🔀 Hàm quyết định: đi web search hay đi generate?

Mở file `graph.py`, mình import các thứ cần thiết: `load_dotenv`, các thành phần từ `langgraph.graph`, bộ hằng số, các node và `GraphState`.

Nhìn vào sơ đồ graph, sau node **grade_documents** sẽ có **hai nhánh**:

* Đi tới **web search** nếu phát hiện **ít nhất một tài liệu không liên quan** đến câu hỏi.
* Đi tới **generate** nếu **mọi tài liệu đều hợp lệ** và liên quan.

Đây chính là **conditional edge** (cạnh điều kiện) của graph. Mình viết hàm `decide_to_generate(state)` để quyết định:

```python
def decide_to_generate(state):
    if state["web_search"]:
        return "web_search"
    else:
        return "generate"

workflow.add_conditional_edges(
    "grade_documents",
    decide_to_generate,
    {"web_search": "web_search", "generate": "generate"},
)
```

Lưu ý nhỏ: mình **return hằng số** (tên node) trong hàm quyết định. Tham số thứ ba — **path map** — thực ra không bắt buộc ở đây vì hàm đã trả về đúng tên node; mình đưa vào để các bạn biết option này tồn tại. Nó đặc biệt hữu ích khi hàm quyết định của bạn không trả về tên node, ví dụ map giá trị trả về sang một node khác hoặc sang `END`.

---

### 🗺️ Lắp ráp và compile workflow

Các bước nối graph:

1. Tạo `workflow = StateGraph(GraphState)` với state chúng ta đã định nghĩa.
2. `add_node` cho **4 node**: `retrieve` (chạy hàm retrieve), `grade_documents`, `generate`, `web_search` — tên viết thường đúng như trong sơ đồ.
3. Đặt **entry point** là node `retrieve` — hàm đầu tiên chạy để lấy tài liệu.
4. Thêm **edge** từ `retrieve` sang `grade_documents`.
5. Thêm **conditional edge** từ `grade_documents` với hàm `decide_to_generate` như trên.
6. Sau web search, ta đã có kết quả nên nối **edge** từ `web_search` sang `generate`.
7. Cuối cùng nối **edge** từ `generate` tới `END`.
8. **Compile** graph và in ra file `graph.png` để xem cấu trúc.

---

### ✅ Chạy thử và kiểm chứng

Trong `main.py`, mình import graph và invoke với câu hỏi **"what is agent memory"**. Nhìn vào log, các bạn sẽ thấy đúng trình tự:

* Retrieve documents.
* Kiểm tra độ liên quan (check relevance) và xem tài liệu nào liên quan hoặc không.
* Phát hiện **một tài liệu không liên quan** → thực thi **external search**.
* Đi tiếp tới node **generate** và nhận về câu trả lời — chất lượng khá tốt.

Mở file `graph.png` ra, bạn sẽ thấy đúng sơ đồ mình vẽ. Còn trên **LangSmith**, trace của lần chạy cho thấy toàn bộ node đã thực thi theo đúng thứ tự; ví dụ ở node web search, bạn thấy câu query **"what is agent memory"** được gửi đi tìm kiếm.

Cuối cùng, nếu muốn xem code, các bạn ghé **GitHub repository** ở branch **LangGraph** — toàn bộ implementation vừa rồi nằm ở đó, đã được cập nhật với phiên bản LangChain và LangGraph mới nhất.

Chúc mừng các bạn — chúng ta đã có một **Agentic RAG hoàn chỉnh** chạy được từ đầu đến cuối! Nhưng còn một câu hỏi thú vị: *nếu LLM trả lời sai hoặc "bịa" thì sao?* Bài tiếp theo, mình sẽ giới thiệu **Self-RAG** — dạy agent tự soi lại câu trả lời của chính mình. Hẹn gặp lại! 🚀
