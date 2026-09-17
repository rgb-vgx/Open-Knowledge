# 🧩 Persistence trong LangGraph: Khi AI Agent biết "nhớ" và chạy tiếp đúng chỗ

Xin chào, lại là Eden đây! 👋 Hôm nay chúng ta sẽ nói về một tính năng mà mình xem là **cực kỳ quan trọng với mọi ứng dụng đạt chuẩn production (production grade)**: đó là **persistence (lưu trữ bền vững)** trong LangGraph.

Nếu các bạn từng thắc mắc làm sao để agent "dừng lại hỏi người dùng rồi chạy tiếp đúng chỗ cũ", hay đơn giản là làm sao nó nhớ được mọi thứ đã xảy ra, thì bài này chính là dành cho các bạn.

---

### 🎯 Persistence trong LangGraph nghĩa là gì?

Trong LangGraph, persistence có nghĩa là chúng ta có thể **lưu lại state (trạng thái) sau khi các node (nút) thực thi** — tại bất kỳ thời điểm nào — vào một **persistent storage (kho lưu trữ bền vững)** và có thể **truy xuất lại sau đó**, kể cả sau nhiều lần chạy hoặc nhiều lần bị ngắt quãng.

Nghe đơn giản vậy thôi, nhưng đây chính là nền móng cho rất nhiều tính năng nâng cao mà các bạn sẽ gặp xuyên suốt khóa học.

---

### 💬 Human-in-the-loop: lý do đầu tiên và lớn nhất

Vì sao persistence lại quan trọng đến vậy? Đầu tiên, nó mở đường cho các workflow **human-in-the-loop (con người can thiệp giữa vòng chạy)**.

Hầu hết ứng dụng chúng ta xây sẽ là **user facing (hướng tới người dùng cuối)**, nghĩa là sẽ có lúc cần nhận input từ người dùng, và sẽ có những node phụ thuộc hoàn toàn vào dữ liệu đó.

Điều tuyệt vời là LangGraph cho chúng ta một cách cực kỳ tiện lợi để **dừng việc thực thi graph (đồ thị)** lại. Framework sẽ tự động **checkpoint (lưu trạng thái)** vào persistent storage. Sau đó chúng ta đi lấy input từ người dùng, rồi **resume (chạy tiếp)** graph từ đúng điểm đã dừng, mang theo dữ liệu mới.

*Nếu không có persistence, chúng ta không thể làm được điều này.* Chính vì vậy mình luôn nhấn mạnh: đây là kiến thức bắt buộc phải nắm.

---

### 🧠 Memory, debugging và history

Persistence không chỉ phục vụ human-in-the-loop. Nó còn mang lại nhiều thứ giá trị khác:

* **Memory (bộ nhớ):** agent nhớ được những gì đã diễn ra.
* **Debugging (gỡ lỗi):** soi lại từng bước chạy để tìm vấn đề.
* **History (lịch sử):** xem lại toàn bộ quá trình thực thi.

Và nếu các bạn muốn có **nhiều session (phiên) của cùng một người dùng**, thì persistence là thứ bắt buộc phải có.

---

### ⚙️ Checkpointer — "trái tim" của persistence

Vậy LangGraph hiện thực hóa persistence như thế nào? Bằng các **checkpointer object**. Đây là **persistence layer (tầng lưu trữ)** mà LangGraph dựng sẵn cho chúng ta: nó nhận state và ghi vào persistent storage.

Bạn biết LangChain có rất nhiều integration với database đúng không? Persistence cũng vậy, ta có thể lưu vào:

* **Document database (cơ sở dữ liệu tài liệu):** Firestore, MongoDB.
* **Relational database (cơ sở dữ liệu quan hệ):** Postgres, SQLite, MySQL.
* **Graph database (cơ sở dữ liệu đồ thị):** Neo4j, AWS Neptune.

Trong khóa học này, mình sẽ tập trung vào **SQLite**. Cách dùng rất đơn giản: import checkpointer từ `langgraph`, tạo một instance, và nó sẽ nhận state của chúng ta để persist xuống SQLite.

Điểm hay là storage có thể là **database local** ngay trên máy bạn, hoặc **database remote được quản lý** như Cloud SQL trên Google Cloud, AWS, hay Supabase — bạn chỉ cần đưa vào **connection string** mong muốn.

Và đây là phần quan trọng nhất: khi tạo graph, chúng ta **truyền checkpointer vào lúc compile**. LangGraph sẽ tự động **persist state sau mỗi lần một node thực thi**. Mỗi node chạy xong tạo ra một state mới, và state đó được ghi vào database để ta truy xuất lại bất cứ lúc nào.

Chính điều này cho phép ta dừng graph giữa chừng, lấy input người dùng, rồi chạy tiếp đúng chỗ đã dừng — tất cả nhờ checkpointer.

---

Đó là toàn bộ tư duy đằng sau persistence trong LangGraph. Lý thuyết đã rõ, giờ là lúc bắt tay vào code để các bạn thấy mọi thứ diễn ra "rõ như ban ngày". Hẹn gặp lại ở bài thực hành nhé! 🚀
