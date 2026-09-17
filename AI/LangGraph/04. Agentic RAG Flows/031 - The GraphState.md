# 🧠 GraphState: "Bộ nhớ" chảy xuyên suốt các node trong LangGraph

> Nguồn: `031-Managing-Information-Flow-in-LangGraph-The-GraphState.txt` · [Udemy](https://ua.udemy.com/course/langgraph/learn/lecture/43831146)

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

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Graph state là gì và được dùng như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là trạng thái được truyền qua lại giữa các node trong suốt quá trình graph thực thi.

Giải thích: State chính là "bộ nhớ" mà mọi node đều đọc và ghi vào.

Tham chiếu: Đoạn mở đầu.

</details>

**Câu 2:** GraphState cần những trường nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `question`, `documents`, `web_search` và `generation`.

Giải thích: Đây là những gì workflow cần lưu xuyên suốt quá trình chạy.

Tham chiếu: Mục "Thiết kế trước, code sau".

</details>

**Câu 3:** Trường `web_search` có kiểu dữ liệu gì và dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Boolean flag — cho biết chúng ta có cần tìm thêm kết quả trên mạng hay không.

Giải thích: Nó điều khiển việc có nhảy sang nhánh tìm kiếm bên ngoài hay không.

Tham chiếu: Mục "Thiết kế trước, code sau".

</details>

**Câu 4:** Trường `documents` chứa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Danh sách các string — nội dung những tài liệu liên quan, có thể từ retrieve hoặc từ web search.

Giải thích: Đây là ngữ cảnh để trả lời câu hỏi.

Tham chiếu: Mục Khai báo state trong state.py.

</details>

**Câu 5:** Vì sao Eden nhấn mạnh tư duy "thiết kế trước, code sau"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì cần hiểu rõ mình cần lưu cái gì rồi mới khai báo, tránh thiết kế state thừa hoặc thiếu.

Giải thích: State là nền tảng cho toàn bộ luồng reflection sắp xây dựng.

Tham chiếu: Mục "Thiết kế trước, code sau".

</details>

Nếu các bạn muốn xem code chính xác, hãy tham khảo **branch tương ứng của bài này trên GitHub**. Trong video tiếp theo, chúng ta sẽ triển khai **retrieve node** đầu tiên. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Udemy — Managing Information Flow in LangGraph: The GraphState](https://ua.udemy.com/course/langgraph/learn/lecture/43831146)
- [Docs by LangChain — Graph API overview](https://docs.langchain.com/oss/python/langgraph/graph-api)
- [Docs by LangChain — Use the graph API](https://docs.langchain.com/oss/python/langgraph/use-graph-api)
