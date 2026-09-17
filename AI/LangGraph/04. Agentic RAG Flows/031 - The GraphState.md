# 🧠 GraphState: "Bộ nhớ" chảy xuyên suốt các node trong LangGraph

Chào các bạn, Eden đây! Trong bài này — một bài khá ngắn và đơn giản thôi — chúng ta sẽ định nghĩa **graph state (trạng thái của graph)**, thứ sẽ được truyền qua lại giữa các node trong suốt quá trình thực thi.

### 📌 "Thiết kế trước, code sau": State cần những gì?

Trước khi viết code, mình muốn cùng các bạn **thảo luận trước đã**. Chúng ta cần những gì trong state?

* **question** — câu hỏi của người dùng. Luôn cần tham chiếu tới nó, dù là để xác định tài liệu truy xuất có liên quan không, hay để biết cần tìm gì trên internet.
* **documents** — những tài liệu giúp trả lời câu hỏi: có thể là tài liệu retrieve được, hoặc kết quả trả về từ web search.
* **web_search** — một **boolean flag** cho biết chúng ta có cần tìm thêm kết quả trên mạng hay không.
* **generation** — câu trả lời được sinh ra.

Mình luôn thích tư duy kiểu này: hiểu rõ mình cần lưu cái gì, rồi mới bắt tay vào khai báo. Vì state chính là "bộ nhớ" mà mọi node đều đọc và ghi vào.

---

### 🧱 Khai báo state trong `state.py`

Mở file `state.py`, đầu tiên là import `List` và `TypedDict` từ `typing`. Sau đó, mình tạo class **GraphState** kế thừa từ `TypedDict` — class này chứa tất cả các trường chúng ta cần cho quá trình graph thực thi:

```python
from typing import List, TypedDict


class GraphState(TypedDict):
    question: str
    generation: str
    web_search: bool
    documents: List[str]
```

Giải thích nhanh từng trường:

* `question` và `generation` là **string**.
* `web_search` là **boolean**.
* `documents` là **danh sách các string** — chính là danh sách nội dung của những tài liệu liên quan.

Vậy là xong! *Chỉ đơn giản vậy thôi, nhưng đây chính là nền tảng cho toàn bộ luồng reflection mà chúng ta sắp xây dựng.*

Nếu các bạn muốn xem code chính xác, hãy tham khảo **branch tương ứng của bài này trên GitHub**. Trong video tiếp theo, chúng ta sẽ triển khai **retrieve node** đầu tiên. Hẹn gặp lại các bạn! 🚀
