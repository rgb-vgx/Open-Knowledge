# 🔎 Retrieve Node: Lấy ngữ cảnh liên quan từ vector store cho LLM

Chào các bạn, Eden đây! Trong bài này, chúng ta sẽ triển khai **retrieve node** — node đầu tiên trong graph. Node này sẽ nhận state, lấy ra câu hỏi mà người dùng đã đặt, rồi **truy xuất những tài liệu liên quan** cho câu hỏi đó bằng khả năng **semantic search (tìm kiếm ngữ nghĩa)** của vector store.

### 🎯 Nhiệm vụ của Retrieve Node

Luồng hoạt động của node rất rõ ràng:

1. Nhận **state** làm đầu vào.
2. **Trích xuất câu hỏi (question)** mà người dùng đã hỏi.
3. Gọi vector store để **retrieve các tài liệu liên quan**.
4. **Cập nhật lại state**, cụ thể là trường `documents`, để giữ những tài liệu vừa lấy về.

Nói cách khác, node này chính là cầu nối giữa câu hỏi của người dùng và kho tri thức mà chúng ta đã index ở bài trước.

---

### 🧩 Viết node trong `nodes/retrieve.py`

Mình vào package **nodes**, tạo file mới tên **retrieve.py** và bắt đầu với các import:

* Từ `typing`: import **Any** và **Dict** để **type hinting (khai báo kiểu dữ liệu)**.
* Import **GraphState** — vì đó là đầu vào của node, đồng thời là thứ node sẽ cập nhật.
* Import **retriever** từ file `ingestion` — biến này đang trỏ tới vector store local với toàn bộ embedding đã được lưu sẵn.

Tiếp theo, mình định nghĩa node dưới dạng một **hàm (function)**: nhận vào `state` và trả về một **dictionary** chứa những gì cần cập nhật trong state:

```python
from typing import Any, Dict

from graph.state import GraphState
from ingestion import retriever


def retrieve(state: GraphState) -> Dict[str, Any]:
    print("---RETRIEVE---")
    question = state["question"]

    documents = retriever.invoke(question)
    return {"documents": documents, "question": question}
```

Trong hàm này, mình in ra thông báo rằng đang retrieve, trích xuất `question` từ state hiện tại, rồi gọi **`retriever.invoke(question)`** — phương thức này sẽ thực hiện semantic search và trả về tất cả tài liệu liên quan.

Giá trị trả về của node là state mới: trường `documents` được cập nhật bằng những tài liệu vừa retrieve. Ngoài ra, mình cũng thêm cả **question gốc** vào phần trả về — *thật ra điều này là không bắt buộc, mình chỉ làm cho chắc ăn thôi.*

Vậy là node đầu tiên đã xong! Nếu muốn xem code chính xác, các bạn hãy tham khảo **branch tương ứng trên GitHub**. Trong các video tiếp theo, chúng ta sẽ lần lượt xây thêm nhiều node nữa để hoàn thiện luồng Corrective RAG. Hẹn gặp lại các bạn! 🚀
