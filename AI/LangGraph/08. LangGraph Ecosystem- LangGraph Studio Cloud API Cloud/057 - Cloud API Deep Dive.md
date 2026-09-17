# 🧩 LangGraph Cloud API Deep Dive: Assistants, Threads và Runs — bộ ba "linh hồn" của mọi ứng dụng LLM

Chào các bạn, Eden đây! 👋
Ở bài trước, chúng ta đã có một web server API chạy local. Lần này, mình sẽ cùng các bạn **mổ xẻ nội dung** của API đó — bộ **LangGraph Cloud API** với những khái niệm có thể còn mới, nhưng sẽ theo các bạn suốt hành trình xây dựng ứng dụng LLM production.

*Nghe hơi nhiều khái niệm phải không? Đừng lo — mình sẽ đi từng bước thật chậm rãi.*

---

### 📚 Tài liệu API "xịn sò" được sinh tự động

Đội ngũ **LangChain** không chỉ tạo cho chúng ta **web server API**, mà còn tạo luôn một **file tài liệu (docs)** cực kỳ đẹp, được xây dựng theo **OpenAPI specification**. API chúng ta đang xem có tên là **LangGraph Cloud API**.

API này gồm một số **data model (mô hình dữ liệu)** chính:

* **Assistants**
* **Threads**
* **Runs**
* **Cron jobs**

Điều đáng nói: LangChain **lấy compiled graph của bạn rồi tự động sinh ra các endpoint** dùng chính graph đó. Đội ngũ LangChain có rất nhiều kinh nghiệm xây ứng dụng Generative AI, nên họ **biết chính xác loại API nào cần được expose** — những thứ gần như chắc chắn bạn sẽ cần khi **tích hợp back-end với front-end**.

Theo mình, **LangGraph API hiện đang bị đánh giá thấp (underrated)** — không nhiều người biết nó tiết kiệm cho chúng ta bao nhiêu thời gian và công sức. Một ứng dụng LLM khi lên production sẽ cần nói chuyện với front-end, cần API cho **user management (quản lý người dùng)**. Có sẵn những API này giúp mọi thứ dễ thở hơn rất nhiều.

---

### 🤖 Assistants — "khuôn mặt" của graph

**Assistants API** được lấy cảm hứng rất nhiều từ **OpenAI Assistants API** ra mắt tại **Dev Day 2023**. Trong API này có **2 nhóm endpoint**: một để **create (tạo)** và một để **manage (quản lý)** — liệt kê, xóa, thay đổi...

Vậy **assistant là gì**? Đơn giản là một **abstraction (lớp trừu tượng) của một instance của compiled graph**. Nó che đi **cognitive architecture (kiến trúc nhận thức)** của graph và giúp chúng ta **run (chạy)** graph về sau. Sự linh hoạt nằm ở chỗ:

* Có thể tạo nhiều assistant dùng **cùng graph với cùng configuration (cấu hình)**.
* Hoặc **cùng graph nhưng configuration khác nhau** — mỗi assistant sẽ hành xử khác nhau một chút.
* Thậm chí các assistant có thể **trỏ tới những graph khác nhau**.

Khi tạo assistant, body request cần:

1. **Assistant ID** — nếu không truyền, hệ thống sẽ **tự sinh** cho bạn.
2. **Graph ID** — là một string, **phải khớp với một trong các graph khai báo trong `langgraph.json`**. Nhớ lại bài trước: graph của chúng ta tên là **`agent`**, trỏ tới file **`graph.py`** và biến **`app`** chứa compiled graph. LangGraph Cloud API sẽ dùng ID này để biết graph nằm ở đâu, biến nào giữ nó — rồi **tự lo phần nặng nhọc** là orchestrate và chạy nó.
3. **Configuration** — cấu hình cho compiled graph của bạn.
4. **Metadata** — tùy chọn, để gắn nhãn chú thích cho assistant.

Mình gọi thử **Test Request** tới đường dẫn `/assistants` với payload chứa `graph_id` là `agent` — kết quả trả về **HTTP 200** kèm **Assistant ID** (mình lưu lại để dùng tiếp), cùng **`created_at`** và **`updated_at`** — hữu ích nếu bạn muốn cập nhật assistant trỏ sang graph khác.

*Câu hỏi nhỏ cho các bạn: tất cả thông tin này được lưu ở đâu?* Câu trả lời là: trong **container Postgres** mà LangGraph Cloud API đã tạo khi chúng ta chạy `langgraph up`. Khi chạy **local**, chúng ta tự lo database. Nhưng ở **production**, khi cần **nhiều dung lượng lưu trữ hơn, khả năng mở rộng (scalability), tính sẵn sàng (availability) và độ bền dữ liệu (durability)** thì việc tự vận hành database là cả một vấn đề — và đó chính là lúc **LangGraph Cloud** ra tay. Gọi **Get Assistant** với ID vừa lưu, bạn sẽ nhận về đúng thông tin của assistant đó — thực chất đây là một **CRUD API** tra cứu trong bảng assistants.

---

### 🧵 Threads — "bộ nhớ" gom mọi lượt chạy

Sau assistant, chúng ta cần **thread**. Khi invoke compiled graph, ta có thể **gắn kèm một thread ID**. Vậy thread là gì?

**Thread là một abstraction chứa toàn bộ state tích lũy của một nhóm invocations (một nhóm runs).**

Khi đã gắn thread và bật **persistence (lưu trữ bền vững)** với **checkpoints (điểm lưu trạng thái)**, bạn có thể:

* Biết **state tại mọi thời điểm**.
* **Rerun** và **reiterate** qua từng node, từng bước.
* Nắm được **state thay đổi thế nào qua các lần node thực thi**.

*Nghe hơi trừu tượng phải không?* Mình hứa là sau vài video này, cộng với video về **persistence và interrupts**, các bạn sẽ hiểu chính xác chuyện gì đang diễn ra. Cứ nghĩ đơn giản: **thread là một môi trường biệt lập (isolated environment) cho một lượt chạy graph**.

Khi tạo thread, mình **không truyền ID và cũng không truyền assistant ID** — thread **có thể được chia sẻ giữa nhiều assistant**, vì nó lưu thông tin của tất cả các invocation. Chạy Test Request, ta nhận về **thread ID** — nhớ lưu lại để dùng cho bước sau.

---

### 🏃 Runs — phát súng khai hỏa

Cuối cùng: **run** chính là **lần invocation thực sự của graph với input bạn cung cấp**. Payload tạo run gồm:

1. **`thread_id`** — field **tùy chọn**, nhưng mình khuyên **gắn một thread cho mỗi run**.
2. **`assistant_id`** — **bắt buộc**, vì hệ thống cần biết chạy graph nào.
3. **`checkpoint_id`** — tùy chọn, dùng khi bạn muốn **tiếp tục một graph đang bị interrupt**.
4. **`metadata`** — mình để trống.
5. **`config`** — mình truyền vào `tags` một list chứa string **`hidden`**, chỉ để thêm "gia vị" cho ví dụ. Tag này sẽ **lan truyền theo suốt quá trình graph thực thi** và sau đó bạn có thể **xem cũng như filter theo tag trong LangSmith**.
6. **`configurable`** — một dictionary rỗng, chứa các giá trị tương ứng với **configurable object** khi invoke graph bằng Python. Lưu ý thú vị: qua LangGraph Cloud API, ta **không gửi thread ID trong `configurable`** — LangGraph Cloud API **tự lo việc propagate** dựa trên thread ID ở đường dẫn.
7. **`multitask_strategy`** — đặt là **`reject`**. *Thú thật, mình chưa biết chính xác field này làm gì — ai có giải thích rõ hơn thì báo cho mình nhé!*
8. **`input`** — một trong những phần quan trọng nhất: **đúng dictionary mà bạn dùng để invoke graph**, ví dụ `{"question": "what is agent memory"}`.

Gửi request, ta nhận về **run ID, thread ID, assistant ID, thời điểm tạo, status `pending`**, input, tags, metadata... Gọi **List Runs** với run ID, giờ ta thấy **status: success** — graph đã chạy xong.

*Nhưng này, câu trả lời đâu?* Bạn để ý sẽ không thấy answer trong run. **Câu trả lời nằm trong thread** — vì thread mới là nơi **tổng hợp state của tất cả các run**. Gọi API lấy thread ID, mở key **`values`**, ta thấy **state đầy đủ**, trong đó field **`generation`** chứa câu trả lời — đúng kiểu **cướp biển** mà chúng ta đã "chỉnh nóng" ở bài trước!

Và đây nữa: **trace của toàn bộ quá trình graph thực thi** — bạn thấy **tag `hidden`**, thời điểm invocation, **LLM đã trả lời gì, những node nào đã chạy theo thứ tự nào, tool result ra sao**...

Mình biết bài này cùng các bài trước có **rất nhiều ý tưởng và thuật ngữ mới**. Việc đầu tiên mình muốn các bạn làm: **dừng lại, hít một hơi thật sâu** — vì không hiểu hết ngay lần đầu là **hoàn toàn bình thường**. Hồi mới gặp những khái niệm này, chính mình cũng chật vật y như vậy. Việc thứ hai: **xem lại vài video gần đây**, mọi thứ sẽ thấm hơn nhiều.

Ở bài tới, chúng ta sẽ **deploy lên cloud** và xem cách **LangGraph Cloud** — giải pháp managed đang mở cho tất cả mọi người — vận hành. Hẹn gặp lại các bạn! 🚀
