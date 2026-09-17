# ⚡ Synchronous vs Asynchronous: Câu hỏi duy nhất quyết định cách backend vận hành

Trong suốt sự nghiệp làm backend của mình, chủ đề lặp đi lặp lại nhiều nhất — ở cả code ứng dụng, operating system lẫn database — chính là **synchronous (đồng bộ) vs asynchronous (bất đồng bộ)**. Tất cả thu về một câu hỏi duy nhất: **khi mình gửi một request và đang chờ kết quả, mình có thể xử lý việc khác được không?** Nắm được câu trả lời này, các bạn sẽ nắm được gần như mọi thứ vận hành phía dưới đường truyền.

### 🎯 Gốc rễ: "in sync" thực ra là gì?

Từ "synchronous" xuất phát từ hình ảnh hai **sine wave (sóng hình sin)** cùng pha, cùng hướng, cùng nhịp — đó là "in sync". Khái niệm này có nguồn gốc từ **động cơ bất đồng bộ (asynchronous motors)**, nơi tốc độ xung nhịp không hoàn toàn trùng nhau. Khi những chiếc máy tính đầu tiên ra đời, **mọi thứ đều synchronous**: request và response, client và server bước đi cùng một nhịp.

Nhưng trong lập trình, chúng ta lại thường **mong muốn asynchronous hơn**. Client và server **không cần** cùng nhịp, cũng chẳng cần giữ pha như hệ thống điện. Mỗi bên cứ việc làm việc của riêng mình — *ở backend, chúng ta không giữ pha; chúng ta muốn hai bên rời nhau ra.*

---

### 🔌 Synchronous IO: gửi request xong là "đứng hình"

Cách nguyên thủy nhất: **caller (bên gọi) gửi request rồi block (chặn) luôn**. Trong lúc chờ, nó không làm được gì cả:

* Code phía dưới **không chạy được**.
* Timer ở background **không có cơ hội** kêu.
* Event (sự kiện) cần đánh thức **không được xử lý**.

Trải nghiệm thời thập niên 90: dựng ứng dụng **VB5** (ngôn ngữ đầu tiên của mình) với một vòng lặp đang chạy — bạn bấm nút, nút không thèm phản ứng. Tất cả là single-threaded, và tiến trình đang bị block. Người ta phải thêm một thứ gọi là **DoEvents** để UI sống lại, đủ thấy synchronous khó chịu thế nào.

Ở tầng CPU câu chuyện cũng tương tự: process chỉ là một tập lệnh, nhưng vừa phát lệnh IO đọc disk/network thì **CPU đá nó ra khỏi processor** vì "mày đang chờ, đâu có gì để chạy" — và đẩy process khác vào. Đó là **context switching (chuyển ngữ cảnh)**. Chi phí chỉ cỡ **micro giây**, nhưng xảy ra liên tục thì **cộng dồn lại thành đáng kể** — nhất là khi thao tác đọc file phải đi qua **kernel → driver → disk controller (SSD/HDD)** trong khi cả kernel lẫn application chẳng làm gì ngoài chờ. *Một sự lãng phí thời gian hoàn toàn.*

---

### ⚙️ Asynchronous IO: readiness, completion và "trò lừa" thread

Với **asynchronous IO**, caller gửi request rồi **tiếp tục làm việc** cho tới khi có response. Nhưng làm sao biết response đã về? Có **hai trường phái**:

1. **Kiểm tra readiness (trạng thái sẵn sàng)** — dòng họ **poll/select** rồi **epoll** trên Linux: "đây là một đám file descriptor, báo tôi khi chúng sẵn sàng đọc". Đây là kiểm tra non-blocking, nhưng để ý: **ready khác với complete** — nó chỉ báo "có dữ liệu đang chờ trong kernel".
2. **Chờ completion (hoàn tất)** — **I/O completion ports** trên Windows hay **io_uring** trên Linux: "khi nào xong thì ghi kết quả vào hàng đợi completion này".

Node.js dùng **epoll** trên Linux và **completion ports** trên Windows. Khi cả hai cách đều không tiện, nó chơi bài **"để người khác bị block thay mình"**: main thread biết đọc file là blocking nên **spin up một thread phụ** đọc file hộ, còn main thread vẫn tự do chạy event loop, phục vụ request, phản hồi UI. Thread phụ bị OS đá ra khỏi CPU, nhưng main thread vẫn nằm nguyên ở đó.

Node.js mặc định có khoảng **4 worker threads** xoay quanh thư viện nền tảng, có thể cấu hình — nhưng đừng vượt quá số CPU vì vô nghĩa. Biết workload của mình là **IO-bound hay CPU-bound** sẽ giúp các bạn chỉnh con số này hợp lý. *Máy tính vốn "ngốc", còn phần mềm thì đầy trò lừa — và chúng ta chơi trò đó với chúng.*

---

### 🧠 Synchronicity là thuộc tính của client — callback, promise, async/await

Khi bàn ở mức request/response giữa hai thực thể riêng biệt, sync/async hóa ra là **thuộc tính của phía client**: "tôi có chờ được không, hay tôi làm việc khác trong lúc chờ?". Ngày nay **gần như không còn client library nào gọi mạng kiểu synchronous** — **fetch**, **Axios**... đều asynchronous, vì ta gửi rất nhiều request và muốn làm việc khác trong lúc chờ.

Con đường tiến hóa trong code:

1. **Callback (hàm gọi lại)** — kiểu cũ nhưng vẫn "chạy tốt": đọc file, xong thì gọi hàm `onReadFinished` với toàn bộ nội dung file.
2. **Promise (lời hứa)** — tương tự future trong C++, gọi `.then()` để đăng ký việc cần làm khi xong.
3. **Async/await** — vẫn là bất đồng bộ, nhưng **trông như đồng bộ**: nó "chặn" phần code phía dưới trong tầm nhìn của bạn, song thực tế **không hề block**. Chỉ là **syntactic sugar (đường cú pháp)** cho dễ đọc khi code sau phụ thuộc giá trị phía trước.

Trong Node.js có **event loop (vòng lặp sự kiện)** chạy mãi để hỏi: có callback nào không? có timer không? có việc gì đang chờ không?

Ví dụ đời thường cho dễ nhớ: **họp** là synchronous — hỏi John một câu mà John không trả lời thì cực kỳ awkward; còn **email** là asynchronous — gửi xong mình đi làm việc khác. Chat trên Teams/Slack thì tùy: trả lời liền lúc là sync, lúc khác lại thành async.

---

### 📬 Async ở khắp nơi: queue, Postgres WAL, replication và OS cache

Vài ví dụ thực chiến mình rất tâm đắc:

* **Asynchronous backend processing**: thay vì bắt client chờ một request dài, backend **trả ngay** "tôi đã xếp hàng job của bạn" kèm **job ID/task ID**. Request được ném vào **queue (hàng đợi)**; client có thể lưu job ID xuống disk rồi **disconnect**, khi quay lại thì hỏi "job này xong chưa?". Cách kiểm tra có rất nhiều: **push, pull, long polling, publish/subscribe** — sẽ bàn ở các bài sau.
* **Postgres asynchronous commits**: khi commit một transaction, thay đổi được ghi vào **WAL (write-ahead log)** và **pages**. Commit đồng bộ sẽ **chờ WAL được flush thẳng xuống disk, bỏ qua OS cache**, rồi mới báo thành công — rất đắt. Với async commit, transaction xong về mặt logic là **trả success ngay**, không chờ ghi disk. Nghe là thấy nguy hiểm: nếu write thất bại sau đó, hoặc server crash khi WAL còn trong memory, ta mất dữ liệu và có thể sinh **dirty read**.
* **Asynchronous replication**: primary writer + các replica phục vụ đọc. Replication đồng bộ buộc tất cả (hoặc đa số) replica commit trước — kéo theo **two-phase commit, three-phase commit, Paxos**. Replication bất đồng bộ thì primary commit và trả kết quả trước, nhân bản chạy nền — *cái giá là consistency (tính nhất quán)*.
* **Ghi file qua OS cache**: khi bạn ghi file, dữ liệu **không xuống disk ngay** mà nằm trong **file system cache**, được gom thành page rồi flush bất đồng bộ. Nếu không gom, disk bị phân mảnh, và SSD thì hao mòn "erasable unit" rất nhanh. Còn dân database muốn chắc ăn thì dùng **fsync** để bỏ qua OS cache, flush thẳng xuống đĩa — *và mình nhớ Linus Torvalds không hề thích những "workaround/hack" mà dân database yêu cầu.*

---

### 🧪 Demo: nhìn tận mắt sync vs async trong Node.js

Mình dựng hai file demo, toàn bộ source code sẽ được chia sẻ cho các bạn.

Bản **synchronous** đọc file bằng `readFileSync`:

1. In "1".
2. Đọc file (bị **block** ngay tại đây).
3. In nội dung file.
4. In "2".

Kết quả: **1 → file → 2**. Bị chặn thật sự, không làm gì khác được.

Bản **asynchronous** dùng `readFile` với callback `(error, data)`: in "1", in "2", rồi mới tới nội dung file (dạng Buffer, cần decode/`toString`). Kết quả: **1 → 2 → file**. Vì `null` ở tham số error nghĩa là không có lỗi.

Sự khác biệt nằm ở **thứ tự thực thi** — và đó chính là async: *miễn là tôi còn đi tiếp được trong lúc chờ, tôi sẽ chơi trò này.*

*Đây là bài học mình muốn các bạn khắc cốt: nếu không hiểu mọi thứ vận hành thế nào, bạn không thể tối ưu được bất cứ thứ gì — chỉ ngồi nhìn hệ thống chậm mà không biết vì sao.*

Và nhớ nhé: **asynchronous execution có mặt ở khắp mọi nơi**. Ở bài tiếp theo, mình sẽ chỉ các bạn pattern giao tiếp đầu tiên tận dụng chính nó: **polling (hỏi vòng)**. Hẹn gặp lại! 🚀
