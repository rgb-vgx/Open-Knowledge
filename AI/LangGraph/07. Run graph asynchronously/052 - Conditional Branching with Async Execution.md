# 🔀 Conditional branching với async: Rẽ nhánh theo điều kiện mà các node vẫn chạy song song

Chào các bạn, Eden đây! 👋 Trong bài này, chúng ta sẽ kết hợp hai "tuyệt chiêu" đã học: **conditional branching (rẽ nhánh theo điều kiện)** và **async execution (chạy bất đồng bộ)**. Kết quả sẽ là một graph vừa biết "suy nghĩ" để chọn đường, vừa biết chạy song song để tiết kiệm thời gian.

Topology của bài hôm nay như sau:

1. Bắt đầu từ **node A**.
2. Từ A có **ba nhánh điều kiện** dẫn tới B, C và D.
3. Tùy vào state, ta sẽ chạy song song **B và C**, hoặc chạy song song **C và D**.
4. Sau đó, tất cả gom về **node E**.

---

### 🧱 Cập nhật state: thêm "công tắc" `which`

Đầu tiên, mình xóa toàn bộ node và edge đã dựng ở bài trước để bắt đầu lại. Sau đó, state được bổ sung một attribute mới tên là **`which`** — "công tắc" quyết định nhánh nào sẽ được chạy trong bước rẽ nhánh này.

`which` sẽ giữ một trong hai giá trị:

* **`"bc"`** — chạy song song node B và node C.
* **`"cd"`** — chạy song song node C và node D.

Giá trị này do **người dùng truyền vào lúc invoke graph**, dưới dạng string. Các bạn để ý: node C xuất hiện ở cả hai nhánh — chi tiết này khiến bài toán rẽ nhánh trở nên thú vị hơn một chút.

---

### 🧩 Dựng node và hàm "định tuyến"

Mình dán đoạn snippet tạo các node `a`, `b`, `c`, `d`, `e` cùng chuỗi string tương ứng để in ra, và nối edge từ start node vào **node A**. Lưu ý: lúc này chỉ dựng node, chưa dựng edge giữa chúng.

Tiếp theo là phần cốt lõi — **conditional edge function** (hàm quyết định đường đi dựa trên state). Mình import `Sequence` và viết hàm như sau:

```python
def route_bc_or_cd(state: State) -> Sequence[str]:
    if state["which"] == "cd":
        return ["c", "d"]
    return ["b", "c"]
```

Hàm nhận `state` làm input và trả về một **sequence (list các string)** — chính là danh sách các node sẽ được thực thi song song. Nếu `which` là `"cd"`, ta trả về `["c", "d"]`; ngược lại trả về `["b", "c"]`.

*Các giá trị này hoàn toàn mang tính minh họa* — các bạn có thể đặt bất kỳ logic nào mình muốn, thậm chí **dùng chính LLM để quyết định** nên đi nhánh nào. Hàm này chính là "bộ não" định tuyến cho quá trình thực thi graph.

---

### 🗺️ `add_conditional_edges` và bí mật của `path_map`

Giờ mình tạo biến **`intermediate`** chứa tất cả các node có thể đi tới từ A: `b`, `c`, `d`. Rồi gọi `add_conditional_edges` với ba tham số:

1. **Source:** node `a`.
2. **Logic:** hàm `route_bc_or_cd` vừa viết.
3. **Path map:** biến `intermediate`.

Nhiều bạn sẽ nghĩ tham số thứ ba là "thừa", nhưng không hề nhé! **Path map** giúp ích cho việc **vẽ graph**. Nó có thể là một dictionary ánh xạ string sang tên node, hoặc đơn giản là một **list tên node** — LangGraph sẽ dùng các giá trị này để vẽ.

Nếu bỏ qua `intermediate`, LangGraph sẽ mặc định rằng từ A có thể đi tới **mọi node**, và bạn sẽ nhận về một graph đầy những edge thừa thãi, rối rắm. Vì vậy hãy luôn khai báo rõ ràng — code và hình vẽ của bạn sẽ dễ đọc hơn rất nhiều.

Cuối cùng, mình nối **B, C, D → E**, rồi **E → END**. Xong phần dựng graph!

---

### ✅ Chạy thử hai kịch bản

Mình comment dòng invoke để vẽ graph trước — topology in ra **chính xác** như thiết kế. Sau đó bỏ comment và invoke với state có `which` để trống: kết quả là **A → B và C song song → E**, đúng như logic của hàm định tuyến.

Đổi `which` thành `"cd"` rồi chạy lại: lần này **C và D** chạy song song trước khi gom về E. Mọi thứ hoạt động chính xác với toàn bộ conditional edge.

Các bạn có thể xem trace chi tiết của cả hai lần chạy trên **LangSmith** — cách đọc trace vẫn giống các bài trước nên mình không nhắc lại nữa. Hãy tự chạy thử trong môi trường của mình để cảm nhận rõ nhất nhé!

Ở bài cuối của section, chúng ta sẽ dừng lại một chút để nhìn vào **mặt trái của async execution**: những rủi ro cần đề phòng và best practice để tránh chúng. Hẹn gặp lại các bạn! 🚀
