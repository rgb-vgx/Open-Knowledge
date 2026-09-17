# 🔄 Recap: LangChain Deep Agents triển khai Skill Middleware thế nào?

Chào các bạn, mình là Eden đây! Trước khi bước vào **lớp sâu nhất** — đọc mã nguồn — chúng ta hãy dành một chút thời gian để **hệ thống hóa** những gì đã quan sát được ở phần trace. Nắm chắc phần này sẽ khiến đoạn code phía trước trở nên dễ hiểu hơn rất nhiều.

---

### 🔁 Nhắc lại "agent loop" quen thuộc

Hãy nhớ lại **agent loop (vòng lặp agent)** mà chúng ta đều đã biết:

1. Bắt đầu bằng một **LLM call** với câu hỏi.
2. LLM **quyết định có gọi tool hay không**.
3. Nếu có, tool được **thực thi**, rồi vòng lặp quay lại bước suy luận.
4. LLM tiếp tục quyết định: **trả lời luôn** hay **gọi thêm tool** khác.

Cứ như vậy cho tới khi có câu trả lời cuối cùng. Đây là nền móng mà mọi agent đều dựa vào.

---

### 🧩 Cơ chế thứ nhất: Before Agent Middleware

Vào **agent harness** của LangChain Deep Agents, nhóm LangChain đã cài đặt một **before agent middleware**. Cơ chế này chạy **khi session bắt đầu nạp và agent chuẩn bị hoạt động**: việc đầu tiên là **nạp toàn bộ skill khả dụng vào bộ nhớ của agent**.

Đây chính là **skill discovery** — xem agent có những skill nào, **tên** là gì và **nằm ở đâu**. Kết quả được lưu vào **agent state (bộ nhớ của agent)**.

---

### 📬 Cơ chế thứ hai: Middleware trước mỗi LLM call

LangChain còn thêm một middleware **chạy trước mỗi LLM call**. Nhiệm vụ của nó là **nối thêm "skill systems appendix" vào system prompt**.

Phần phụ lục này chứa:

* **Toàn bộ skill khả dụng** của agent.
* **Vị trí của chúng**.
* **Vài hướng dẫn về cách progressive disclosure hoạt động**.

Nhờ vậy, ở **mỗi request**, agent luôn có phần này trong system prompt và hành xử dựa trên nó: hoặc **quyết định dùng một skill**, hoặc **quyết định dùng một tool** khác mà nó sở hữu. Đây chính xác là hành vi chúng ta đã quan sát trong các trace ở bài trước.

---

### 🎯 Ghi nhớ gì trước khi mở code?

Tóm gọn lại thành hai bước:

1. **Discovery** — nạp danh sách skill vào state ngay khi bắt đầu session.
2. **Injection** — đưa skill vào system prompt trước mỗi lần gọi LLM, để LLM tự quyết định.

Đó là hai mảnh ghép làm nên toàn bộ cơ chế skill trong deep agents. Và ở bài tiếp theo, chúng ta sẽ mở **source code** ra xem chúng được viết như thế nào. Hẹn gặp lại các bạn! 🚀
