# ⚡ Chạy bất đồng bộ trong LangGraph: Fan-out/Fan-in "có sẵn" mà không cần asyncio hay multithreading

> Nguồn: `050-Implementing-Async-Execution.txt` · [Udemy](https://ua.udemy.com/course/langgraph/learn/lecture/44823401)

Chào các bạn, Eden đây! 👋 Trong bài này, mình sẽ giới thiệu một phần rất quan trọng của LangGraph: **chạy bất đồng bộ (async execution)**. Với các ứng dụng production-grade (chuẩn môi trường thực tế), ta cần khả năng chạy task bất đồng bộ hoặc thực thi song song để tiết kiệm thời gian — quan trọng nhất là **trả kết quả về cho người dùng thật nhanh**.

Tin vui là LangGraph khiến việc này dễ đến bất ngờ, vì nó **hỗ trợ sẵn (out of the box)**.

---

### 🎯 Không cần asyncio, không cần multithreading

Điểm mình thích nhất: các bạn **không cần dùng tới các package như `asyncio` hay multithreading**. LangGraph sẽ lo toàn bộ phần "nặng nhọc" cho bạn.

Tất cả những gì ta cần làm là **định nghĩa node và edge theo một cách nhất định để chúng fan out (tỏa ra)**. Từ đó, LangGraph sẽ tự suy luận rằng đây là một **async flow (luồng bất đồng bộ)** và tự xử lý mọi thứ phía sau. Nghe khá "ảo" phải không? Hãy cùng vào code để mọi thứ rõ ràng hơn nhé!

---

### ⚙️ Dựng file `async.py` và class node "tái sử dụng"

Để tiết kiệm thời gian, mình không tạo project mới mà **dùng lại project cũ**, nơi mọi dependency đã được cài sẵn. Mình tạo một file mới tên **`async.py`** — đây sẽ là "nhân vật chính" của bài này.

Mình bắt đầu với `if __name__ == "__main__":` in ra dòng "hello async" rồi chạy thử để **sanity check** trước khi làm gì tiếp theo. Sau đó, ta load environment variables và import các "đồ nghề" quen thuộc:

* `operator`, `Annotated`, `Any`, `TypedDict`.
* `StateGraph`, `START`, `END`.

State của chúng ta cực kỳ đơn giản: một dictionary với key **`aggregate`** — danh sách các string mà ta muốn append vào **sau mỗi lần node chạy xong**.

Về phần node, chức năng cũng rất đơn giản: **in ra tên node khi nó được thực thi**. Vì hành vi này lặp đi lặp lại ở nhiều node, mình tạo hẳn một **class** để tái sử dụng:

```python
class ReturnNodeValue:
    def __init__(self, node_secret: str):
        self._value = node_secret

    def __call__(self, state: State) -> Any:
        print(f"Adding {self._value} to {state['aggregate']}")
        return {"aggregate": [self._value]}
```

Giải thích một chút nhé:

1. Hàm `__init__` nhận vào tên node và lưu vào thuộc tính private **`_value`**.
2. Ta **override hàm `__call__`** để object trở nên **callable (gọi được như hàm)** — vì khi thêm node vào graph, LangGraph yêu cầu một hàm nhận `state` và cập nhật `state`.
3. Bên trong, object in ra thông báo đang thêm node nào vào state, rồi trả về state mới với `aggregate` được append tên node.

*Đây là một design pattern rất đẹp mỗi khi các bạn cần nhân bản cùng một chức năng cho nhiều node khác nhau.*

---

### 🕸️ Fan-out rồi fan-in: trái tim của async execution

Giờ là phần thú vị nhất — dựng graph:

1. Khởi tạo `StateGraph` với state schema đã định nghĩa ở trên.
2. Thêm **node A** — một object `ReturnNodeValue` với giá trị `"I'm A"` — rồi nối từ `START` vào A.
3. Thêm tiếp **node B, C, D**.
4. Nối **A → B** và **A → C**. Chính thao tác này tạo ra **parallel execution (thực thi song song)**: một node tỏa ra hai node — gọi là **fan-out**.
5. Gom tất cả lại bằng cách nối **B → D** và **C → D** — gọi là **fan-in**.
6. Cuối cùng nối **D → END** và compile graph.

```python
builder.add_edge("a", "b")
builder.add_edge("a", "c")
builder.add_edge("b", "d")
builder.add_edge("c", "d")
```

Sơ đồ topology của graph:

```mermaid
flowchart TD
    S[START] --> A[Node A]
    A --> B[Node B]
    A --> C[Node C]
    B --> D[Node D]
    C --> D
    D --> E[END]
```

Mình in graph ra file **`async.png`** để kiểm tra topology, chạy thử và xác nhận nó đúng như hình dung: A tỏa ra B, C rồi gom về D.

Và các bạn để ý nhé — ta **không hề viết một hàm async nào**, cũng **không tạo thread nào cả**. LangGraph làm hết! Điểm mấu chốt của graph này chỉ là minh họa cách B và C có thể chạy đồng thời.

---

### 🔍 Kiểm chứng: chạy thật và nhìn trace trên LangSmith

Mình invoke graph với input là dictionary có `aggregate` khởi tạo bằng danh sách rỗng, kèm config `thread_id = "foo"` (chỉ để tiện cho phần tracing, chẳng có lý do đặc biệt nào cả).

Kết quả in ra cho ta bằng chứng rõ ràng:

* Node **A** chạy trước tiên.
* Tiếp đó là **B** và **C** — cả hai đều nhận state `"I'm A"`, chứng tỏ **chúng chạy đồng thời**.
* Khi **D** chạy, B và C đã xong xuôi.

Để bằng chứng thuyết phục hơn, mình thêm các biến môi trường tracing (`LANGCHAIN_PROJECT`, `LANGCHAIN_TRACING_V2=true`, `LANGCHAIN_API_KEY`) và thêm `time.sleep(1)` vào mỗi node. Chạy lại, các bạn thấy rõ độ trễ: B và C ngủ 1 giây **cùng lúc**, rồi D mới chạy sau đó.

Và trên **LangSmith**, trace còn rõ ràng hơn nữa:

* Node A chạy lúc **7:04:34**.
* Node B chạy lúc **7:04:35**, node C chạy **đúng cùng thời điểm**.
* Node D chạy muộn hơn 1 giây, lúc **7:04:36**.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao LangGraph chạy song song được mà ta không cần viết code async?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ cần định nghĩa node/edge để fan out — LangGraph tự suy luận đây là async flow và lo phần còn lại.

Giải thích: Graph A → B và A → C khiến B, C được xếp chạy cùng lúc.

Tham chiếu: Mục Fan-out rồi fan-in.

</details>

**Câu 2:** Fan-out và fan-in khác nhau thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Fan-out là một node tỏa ra nhiều node; fan-in là nhiều node gom về một node.

Giải thích: A → B, A → C là fan-out; B → D, C → D là fan-in.

Tham chiếu: Mục Fan-out rồi fan-in.

</details>

**Câu 3:** Class `ReturnNodeValue` dùng kỹ thuật gì để trở thành node?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Override `__call__` để object trở nên callable, nhận `state` và trả về update.

Giải thích: Nhờ vậy cùng một hành vi được tái sử dụng cho nhiều node.

Tham chiếu: Mục Dựng file `async.py`.

</details>

**Câu 4:** Bằng chứng nào cho thấy B và C chạy đồng thời?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `time.sleep(1)` cùng timestamp trên LangSmith: B và C cùng thời điểm, D chạy sau đúng 1 giây.

Giải thích: Nếu chạy tuần tự, tổng thời gian sẽ dài hơn hẳn.

Tham chiếu: Mục Kiểm chứng trên LangSmith.

</details>

**Câu 5:** `aggregate` được gom giá trị từ các node bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mỗi node trả về list `[self._value]`; state dùng `Annotated` cùng `operator` để cộng dồn thay vì ghi đè.

Giải thích: Nhờ đó kết quả của mọi node đều được giữ lại trong state.

Tham chiếu: Mục Dựng file `async.py`.

</details>

Đó chính là async execution trong LangGraph: gọn gàng, trực quan và hiệu quả. Ở bài tiếp theo, chúng ta sẽ thêm một bước phụ sau node B để graph "khó nhằn" hơn một chút — và xem fan-out/fan-in xử lý ra sao nhé! 🚀

## Nguồn tham khảo

- [Udemy — Implementing Async Execution](https://ua.udemy.com/course/langgraph/learn/lecture/44823401)
- [LangGraph Docs — Use the graph API](https://docs.langchain.com/oss/python/langgraph/use-graph-api)
