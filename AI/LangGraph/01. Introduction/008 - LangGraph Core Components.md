# 🧩 Các thành phần cốt lõi của LangGraph: Nodes, Edges và State (Hiểu trước khi code!)

Chào các bạn, mình là Eden đây! Trong bài này, chúng ta sẽ cùng điểm qua — từ góc nhìn lý thuyết — **những thành phần cốt lõi của LangGraph**.

Đây là bài cực kỳ quan trọng, bởi vì **ngay sau bài này, chúng ta sẽ bắt tay vào hiện thực dự án bằng chính những thành phần đó!**

### 🏗️ Bức tranh tổng thể: một control flow được định nghĩa rõ ràng

Với LangGraph, chúng ta sẽ hiện thực một **control flow (luồng điều khiển) được định nghĩa rõ ràng**, hay còn gọi là **state machine (máy trạng thái)**, hay **graph (đồ thị)** — các bạn muốn gọi tên nào cũng được.

Ý tưởng cơ bản: **bên trong luồng điều khiển được định nghĩa và giới hạn phạm vi rõ ràng đó, chúng ta tận dụng các LLM**, và chúng đóng một vai trò cực kỳ then chốt:

* LLM **quyết định trong luồng điều khiển rằng chúng ta sẽ đi đâu tiếp theo** — đây là phần **phi xác định (non-deterministic)**.
* Hoặc bên trong luồng đó, ta có thể **thực thi các lời gọi LLM (LLM call) hay lời gọi agent (agent call)**.

---

### 🧱 Ba thành phần cốt lõi: Nodes, Edges, Conditional Edges

Để bắt đầu, chúng ta cần **ba thành phần cốt lõi**:

1. **Nodes (nút):** thực chất chính là **các hàm Python (Python functions)**. Bạn có thể đặt bất kỳ code nào bạn muốn vào đó — code deterministic (Python thông thường), code gọi LLM, hoặc thậm chí là **một LLM agent**. Bạn có toàn quyền linh hoạt về việc mình muốn làm gì bên trong node.
2. **Edges (cạnh):** kết nối các node với nhau trong quá trình thực thi của graph.
3. **Conditional edges (cạnh có điều kiện):** giúp **ra quyết định** nên đi đến node A hay node B. Phần này **năng động và có thể cực kỳ linh hoạt** — chính là sức mạnh của graph. Nhờ đó, chúng ta kiểm soát hoàn toàn cách mình di chuyển trong quá trình thực thi graph.

Ngoài ra, có **hai node đặc biệt được tích hợp sẵn (built-in)**:

* **Start node:** điểm vào (entry point) cho quá trình thực thi graph — chúng ta sẽ bắt đầu từ đó.
* **End node:** node cuối cùng được thực thi.

Cả hai node này **không thực sự làm gì cả** — các bạn có thể xem chúng như những thao tác rỗng (no operation).

---

### 🗃️ State — trái tim của mọi graph

Một trong những khái niệm quan trọng nhất của LangGraph là **state (trạng thái)** — hay còn gọi là **agent state**.

* State đơn giản chỉ là một **dictionary** chứa những thông tin quan trọng để theo dõi graph: kết quả thực thi của các node, các kết quả tạm thời (temporary results), hay thậm chí là **lịch sử hội thoại (chat history)**.
* Nó có thể **khá đơn giản** — ví dụ chỉ lưu chat history, tức kết quả trả về của LLM sau mỗi lần gọi. Nhưng nó cũng có thể **rất phức tạp**, tùy biến theo bất cứ thứ gì bạn muốn.
* State **mang tính cục bộ (local) với graph**: mọi node trong graph đều có thể truy cập nó trong quá trình thực thi, và nó cũng hiện diện trên mỗi edge.
* Nó có thể chỉ tồn tại trong lúc chạy (runtime), **nhưng cũng có thể được lưu vào bộ lưu trữ bền vững (persistent storage)**. Nếu vì lý do nào đó bạn muốn dừng luồng thực thi của graph rồi **tiếp tục lại đúng điểm đó với state đã có**, ta có thể làm được nhờ **persistence (lưu trữ bền vững)** — và điều này sẽ được trình diễn trong khóa học.

**Điểm đặc biệt của node:** như đã nói, mỗi node là một hàm, nhưng là **hàm đặc biệt — luôn nhận đầu vào là state hiện tại của graph**, nơi chứa mọi thông tin node cần để làm việc. Và **giá trị mà hàm node trả về chính là phần cập nhật của state**: nó luôn trả về một dictionary với các key thể hiện những gì ta muốn cập nhật trong state.

Kết quả là: **mọi node đều cập nhật state**, nên **state thay đổi dần theo thời gian**, và các **edge cùng conditional edge dựa vào state để quyết định đi node A hay node B**. Phần mềm của chúng ta sẽ vận hành đúng như vậy.

---

### 🔁 Cycles, Human-in-the-loop và Persistence

Còn vài khái niệm quan trọng cho phần còn lại của khóa học:

* **Cycles (chu trình) và loops (vòng lặp):** với LangGraph, chúng ta có thể hiện thực **các vòng lặp** — một thứ cực kỳ mạnh mẽ mà trước đây với LangChain rất khó làm. Chúng ta sẽ bàn sâu hơn về điều này trong khóa học.
* **Human-in-the-loop (con người can thiệp giữa vòng chạy):** nếu bạn muốn nhận **phản hồi từ con người** để quyết định hướng đi trong quá trình thực thi graph — đến node A hay node B — thì LangGraph giúp bạn hiện thực điều này rất dễ dàng.
* **Persistence (lưu trữ bền vững):** LangGraph đi kèm những hàm tích hợp sẵn, rất gọn gàng và đơn giản, giúp **lưu state của graph**. Điều này không chỉ khiến phần mềm của bạn **robust (mạnh mẽ) và fault tolerant (chịu lỗi tốt)** hơn, mà còn cho phép hiện thực những logic rất thú vị — mình sẽ trình diễn trong khóa học — mang lại trải nghiệm người dùng tuyệt vời.

Với những thành phần cốt lõi này, chúng ta có thể xây dựng những thứ vô cùng nâng cao. *Nếu lý thuyết hôm nay có hơi nhiều, các bạn đừng lo — từ bài sau chúng ta sẽ bắt tay ngay vào code và mọi thứ sẽ trở nên rõ ràng!*

Hẹn gặp lại các bạn ở dự án đầu tiên! 🚀
