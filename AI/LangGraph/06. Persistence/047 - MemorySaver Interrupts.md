# ⏸️ Dừng đúng lúc, chạy tiếp đúng chỗ: MemorySaver + Interrupts cho Human-in-the-loop

Chào các bạn, lại là Eden đây! 👋 Ở bài trước chúng ta đã hiểu vì sao **persistence (lưu trữ bền vững)** là tính năng sống còn. Còn hôm nay, mình sẽ cùng các bạn dựng thử một graph có **interrupt (ngắt giữa chừng)** để lấy **human feedback (phản hồi từ con người)**, rồi dùng **MemorySaver** để lưu state lại.

Đây là bài "dựng hạ tầng" thuần túy: graph của chúng ta **sẽ không gọi LLM**, mục tiêu duy nhất là để các bạn thấy LangGraph hỗ trợ luồng human-in-the-loop (con người can thiệp giữa vòng chạy) tiện lợi như thế nào.

---

### 🗺️ Luồng chạy chúng ta sẽ xây

Kiến trúc rất đơn giản, đi đúng theo sơ đồ:

1. Bắt đầu từ **start node**.
2. Chạy **step one** — node này chỉ in ra màn hình.
3. **Interrupt** trước khi lấy human feedback.
4. Nhận human feedback và **cập nhật state** với dữ liệu đó.
5. Tiếp tục thực thi sang **step three**, rồi tới **end**.

Mục tiêu cuối cùng là để các bạn xây được ứng dụng thực tế: **dừng graph, lấy phản hồi từ người dùng, rồi chạy tiếp với phản hồi đó.**

---

### ⚙️ Khởi tạo project

Mình mở terminal, vào Desktop và tạo thư mục mới tên là **human in the loop and memory** — đây sẽ là project của chúng ta.

1. Khởi tạo môi trường ảo cho project với **Poetry** và **Python 3**.
2. Cài các package cần thiết: **langgraph**, **langchain-community**, package cho biến môi trường (**python-dotenv**), cùng **black** và **isort** để format code.
3. Mở project bằng **PyCharm** — IDE tự nhận diện được môi trường Poetry nên mình chỉ cần bấm OK và chờ mọi thứ load xong.
4. Tạo file **.env** để dành sẵn cho biến môi trường, và tạo file **main.py**.

---

### 🧩 Dựng graph và gắn MemorySaver

Bắt đầu với import: `TypedDict` cho state, và từ LangGraph chúng ta lấy `StateGraph`, `START`, `END` — những cái tên đã quá quen thuộc. Điểm mới của bài này là **MemorySaver**.

**MemorySaver là một checkpointer (điểm lưu trạng thái):** nó lưu state sau mỗi lần node thực thi, nhưng lưu **trong bộ nhớ (in-memory)**. Kiểu lưu này là **ephemeral (tạm thời)** — chương trình kết thúc là mất sạch. Tuy vậy, đây là điểm khởi đầu rất tốt để các bạn "cảm" được các state object được checkpoint trông như thế nào.

**State của graph** cực kỳ gọn, chỉ gồm hai thứ: **input từ người dùng** và **user feedback** — thứ sẽ được thu thập trong lúc graph chạy.

Tiếp theo là các node: **step one** nhận state nhưng không thay đổi gì, chỉ in ra; **human feedback** cũng nhận state, không làm gì ngoài việc in; và **step three** — lại chỉ in. Cả ba node đều "nhẹ" đúng như mục tiêu của bài: tập trung vào hạ tầng.

Sau đó mình nối mọi thứ lại bằng `StateGraph`, tạo object tên `builder`, rồi lần lượt `add_node` cho ba node và nối các **edge (cạnh)** theo đúng luồng: **START → step one → human feedback → step three → END**.

---

### 🔍 Interrupt trước khi hỏi người dùng

Đây là phần "ăn tiền" của bài học. Mình tạo object **MemorySaver**, rồi khi **compile** graph sẽ truyền nó vào tham số **checkpointer** — nó chịu trách nhiệm persist state vào bộ nhớ sau mỗi lần graph chạy.

Đặc biệt, mình thêm một keyword argument nữa: **interrupt before**, và truyền vào tên node **human feedback**. Điều này có nghĩa: trước khi chạy node human feedback, graph sẽ **dừng thực thi lại**.

Vì state đã được checkpoint, kèm cả việc ta đang dừng ở điểm nào, nên ta có thể đi lấy input từ người dùng, rồi **resume** graph chạy tiếp **đúng điểm đã dừng**. Tất cả là nhờ checkpointer ghi nhớ giúp ta điểm dừng và state lúc đó.

*Đây chính là kỹ thuật bạn sẽ dùng cho ứng dụng hướng tới người dùng, khi muốn agent nhận thêm phản hồi từ con người.*

Cuối cùng, mình in và vẽ graph bằng `get_graph().draw_mermaid()`, xuất ra file **graph.png**. Khi chạy thì gặp lỗi thiếu module HTTP, mình chỉ cần cài bổ sung package còn thiếu bằng Poetry rồi chạy lại. Kết quả là file graph.png hiện ra đúng cái graph các bạn thấy trong bài giảng.

---

Vậy là hạ tầng đã xong! Ở bài tiếp theo, chúng ta sẽ **chạy thật** graph này, quan sát từng state được checkpoint, và tự tay cập nhật state với phản hồi của người dùng. Hẹn gặp lại các bạn! 🚀
