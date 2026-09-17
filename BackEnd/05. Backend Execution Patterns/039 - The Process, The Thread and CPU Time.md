# 🧠 Process và Thread: Cuộc chiến giành từng mili-giây CPU

Trước khi bước vào bất kỳ chủ đề execution nào, mình cần các bạn trả lời được một câu: **process (tiến trình) và thread (luồng) khác nhau ở đâu?** Khi mình nói "process", các bạn phải có một hình ảnh trong đầu; khi mình nói "thread", phải là một hình ảnh khác. Lẫn lộn hai từ này thì mọi thứ về multi-process, multithreading hay single-threaded phía sau sẽ rối tung hết.

### 🧩 Process là gì, nhìn từ con mắt CPU?

Từ góc nhìn CPU, process **chỉ là một tập instruction (tập lệnh)**.

* Chúng giống như một đống assembly code hay machine language đã được compile cho processor đó, truyền từ application của bạn lúc compile.
* Các instruction này phải được thực thi **tuần tự, từng cái một**, đúng theo yêu cầu của process.
* Process có một **vùng memory cách ly** dành riêng cho nó: không ai đọc được memory này ngoài chính process — hoặc process con của nó.
* Biến bạn khai báo nằm trong **heap**. Cứ hình dung heap như một bãi chứa: bạn quăng biến và địa chỉ memory vào đó.
* Ví dụ gần gũi: **Redis** là in-memory cache — toàn bộ key-value nằm trong memory của nó. Nghĩa là Redis chính là một process với vùng memory dành riêng.
* Mỗi process có **process identifier (PID)** — định danh duy nhất do OS gán.
* Và process được **scheduled (lên lịch)** vào CPU để thực thi — chi tiết này quan trọng hơn các bạn tưởng.

---

### 🪶 Thread là gì?

Trên Linux — nền tảng cho hầu hết giải thích của mình — thread được gọi là **lightweight process (LWP, process hạng nhẹ)**.

* Nói cách khác: thread là một process **kế thừa memory từ process cha**.
* Nó vẫn có tập instruction như process, nhưng **chia sẻ memory với cha** — đó là khác biệt duy nhất.
* Không có vùng memory riêng cho thread, nên các thread (và cả process cha) **tranh nhau** trên cùng memory location.
* Muốn thay đổi memory thì phải **lock** — khái niệm **mutex** mà các bạn hay gặp trong database. Chỉ một thứ được truy cập memory location tại một thời điểm.
* Thread cũng có ID duy nhất, vì xét cho cùng nó cũng là một process — chỉ là bản nhẹ, không cần cấu trúc memory pointer riêng.
* Và tất nhiên, thread cũng được schedule vào CPU để giành lấy thời gian quý giá.

---

### ⚖️ CPU là tài nguyên khan hiếm: bao nhiêu process là quá nhiều?

Đây là phần chúng ta hay bỏ qua. **CPU là tài nguyên khan hiếm, và mọi thứ đều đang tranh nhau cho nó.**

* Bạn có máy **4 core** và **10 process**? OS sẽ phân phối các process lên 4 core đó.
* Có một "thỏa thuận" giữa kernel và CPU: chừng nào process còn instruction thật để chạy, nó được schedule và có CPU time.
* Nhưng khoảnh khắc một instruction đòi **fetch memory location** (đọc biến, đọc dữ liệu) — nó bị **đá khỏi CPU**.
* Tệ hơn: instruction đọc lượng memory lớn hoặc đọc từ đĩa — bị đá ra ngay lập tức.
* Vì sao? Hàng trăm process khác đang **đói (starving)** chờ CPU để chạy đúng thứ CPU sinh ra để làm: cộng, trừ, hash, crypto...
* **Nginx và Envoy** — những proxy mình sẽ lấy làm ví dụ — ra quyết định quý giá dựa trên sự thật này. *Bị đá khỏi CPU là điều tệ nhất có thể xảy ra; backend của bạn nên bám CPU càng nhiều càng tốt.*
* Vậy bao nhiêu process là quá nhiều? Nếu chỉ có 1 core, CPU về lý thuyết chỉ thực thi instruction của một process tại một thời điểm (bỏ qua hyper-threading, khi CPU có hai hardware thread chạy song song — thứ "ma thuật" mà mình không rành vì không phải dân phần cứng).
* **Quy tắc ngón tay**: số process = số core/hardware thread. Máy 4 core thì spin up khoảng 4 process, mỗi process gắn với một core — cách này mới tối ưu.
* Ngược lại, spin up **100 process** trên máy 4 core không hề làm app nhanh hơn. Bạn gom request vào 100 process? Chắc chắn rồi. Nhưng ngay sau đó chúng ngồi chờ CPU time không tồn tại: 4 process chạy trên 4 core, còn **94 process đứng đợi**.
* Tệ hơn, process trên core bị **context switch (chuyển ngữ cảnh)** vô cớ vì scheduler thấy những process khác đang đói.
* Đây là chỗ **scheduler (bộ lập lịch)** trở thành một bộ môn nghệ thuật: khi nào đá một process ra, khi nào đưa process khác vào, process được chờ bao lâu... đều là bài toán khó.

---

### 🏗️ Ba kiến trúc thực thi backend

* **Single-threaded process**: một process, một thread. **Node.js** là ví dụ điển hình (nó có thêm vài core thread dùng theo nhu cầu, nhưng chủ yếu là single-threaded). Vẻ đẹp: đơn giản, không phải vật lộn với thread.
* **Multi-process**: backend gồm nhiều process, mỗi process có memory riêng. **Nginx** spin up các worker process như vậy — mỗi worker có memory riêng, cộng thêm một vùng **shared memory (memory chia sẻ)**.
* Đặc biệt, bạn có thể cấp một pool memory chia sẻ cho nhiều process, tách khỏi memory riêng của từng process. **Postgres và MySQL** làm chuyện này với **shared buffer pool**: nơi chứa các page đọc từ đĩa — heap, indexes... tất cả chỉ là một blob các page trong memory.
* Lợi thế: nếu có 4 process và 4 core, mỗi process chiếm một core và chạy song song. Nếu request đến ào ạt mà chỉ có một process single-thread ghim vào một CPU, request phải xếp hàng chờ; còn nhiều process thì request được rải ra và xử lý đồng thời — cứ hình dung như một dây chuyền thật sự.
* Multi-process dùng **fork**: process con được cấp phát memory riêng, nên nó **tốn memory hơn** multithread.
* Nhưng nhớ: không phải việc gì process làm cũng xứng đáng với CPU. Process đọc đĩa, đọc một blob memory lớn... CPU hiếm khi được dùng, trừ khi bạn chạy thuật toán đồ họa, hash, cộng trừ nhân chia — những phép tính ở tầng CPU. Đây là lúc câu hỏi **IO bound hay CPU bound** xuất hiện. Backend của bạn đang thật sự làm gì mới là điều quyết định.
* **Multi-threaded**: một process, nhiều thread. Thread chia sẻ memory nên chúng **tranh nhau**, và **race condition (tranh chấp dữ liệu)** xuất hiện nếu không lock đúng cách. Thread có thể được schedule lên các CPU khác nhau, và kiến trúc này tốn ít memory hơn multi-process.
* Ví dụ kinh điển: hai thread cùng **tăng một biến**. Thread đọc giá trị 2, cả hai cùng cộng thành 3, cả hai cùng ghi 3 — sai! Lẽ ra phải lên 3 rồi lên 4. Vì vậy thread phải **acquire một lock** — mutex hoặc latch. Ví dụ ứng dụng multi-threaded: **Apache, Envoy, SQL Server**.

---

### 📸 Hai câu chuyện thực chiến: Redis snapshot và SQL Server

**Câu chuyện 1 — Redis và phép thuật Copy-on-Write.** Redis có tính năng **asynchronous snapshot**: định kỳ (mình nhớ là mỗi 3 giây) nó lấy toàn bộ cache và flush xuống đĩa để persist key-value. Nghe đơn giản nhưng cực khó implement:

1. Nếu Redis đang ghi 3GB xuống đĩa mà ai đó thay đổi dữ liệu thì sao? Snapshot nghĩa là "một khoảnh khắc thời gian" — dữ liệu thay đổi giữa chừng làm mất tính nhất quán, kiểu như một key đã backup lại liên quan tới key vừa bị sửa.
2. Cách an toàn là cấm thay đổi memory trong lúc backup. Nhưng vậy thì một lệnh `set` mất 3-5 giây — **throughput giảm, latency tăng**.
3. Giải pháp: **fork** một process, copy toàn bộ memory sang đó và chạy backup trên process mới, master cứ việc thay đổi. Nhưng copy hàng gigabyte rất tốn kém.
4. Chìa khóa nằm ở **copy-on-write (COW)**: khi fork, OS chỉ copy những page **sắp bị thay đổi**. Hai process cùng trỏ vào một memory khi cả hai chỉ đọc; khoảnh khắc một page bị sửa, page gốc được copy sang process mới trước khi ghi đè. Nhờ vậy process backup luôn giữ được trạng thái gốc. *Một chiêu của OS thông minh đến mức đáng kinh ngạc.*

**Câu chuyện 2 — SQL Server và cơn ác mộng khóa ở leaf page.** Trong SQL Server, **primary clustered key** khiến mọi insert phải đi theo đúng thứ tự vào **leaf page** — nơi chứa toàn bộ row và được sắp xếp. Mình dùng cluster key auto-increment và insert hàng triệu row:

* SQL Server mặc định spin up nhiều thread để làm việc. Mỗi thread nhận một mẻ insert.
* Vì thứ tự bắt buộc, các row 1, 2, 3, 4, 5 đều phải ghi vào **cùng một page**.
* Kết quả: các thread tranh nhau ghi vào cùng memory location — đúng kiểu race condition đã nói, nên chúng phải lock/unlock liên tục. Chờ đợi là thứ tệ nhất trong database.
* Throughput ghi của mình tụt thê thảm vì cứ lock, unlock, lock, unlock.
* Sau khi hiểu ra, tụi mình chuyển sang **dồn các lệnh ghi trên cùng một connection** thay vì nhiều session. SQL Server đủ thông minh để dùng **một thread duy nhất**: lock một lần, insert 10 row, rồi unlock. Hết cảnh nhiều thread giành nhau cái leaf page cuối.
* Nếu muốn, bạn có thể tắt threading theo từng instance — dùng **MAXDOP 1** để chỉ tạo một thread.

*Hiểu được những chuyện như thế này là thứ khiến bạn trở thành một backend engineer giỏi hơn hẳn — vì bạn có thể đi vòng qua vấn đề ngay khi hiểu gốc rễ của nó.*

Đó là toàn bộ cuộc chiến process vs thread! Giờ các bạn đã có hình ảnh rõ ràng trong đầu, bài tiếp theo tụi mình đi vào câu hỏi cực kỳ thú vị: **backend thật sự accept connection như thế nào?** Hẹn gặp lại ở bài sau. 🚀
