# 📬 Backend Accept Connection Như Thế Nào? Hành Trình Từ SYN Đến File Descriptor

Có một câu hỏi mình nhận được rất nhiều: **"Làm sao backend accept connection?"** Nghe thì đơn giản — cứ gọi accept là xong — nhưng sự thật hoàn toàn khác. Trước khi có connection để đọc, kernel (nhân hệ điều hành) và backend application đã chia nhau một loạt công việc mà nếu không hiểu, các bạn sẽ không bao giờ gỡ nổi bài toán performance.

Hôm nay mình sẽ zoom thật sâu vào backend: từ lúc packet chạm card mạng, qua hai hàng đợi bên trong kernel, cho đến khoảnh khắc application gọi `accept()`. Biết đâu sau bài này, vài bạn sẽ còn hứng thú đóng góp cho chính Linux kernel — vì công việc ở đó vẫn chưa hoàn thành đâu.

### 🔌 Nhắc lại nhanh: TCP handshake và lý do nó "stateful"

TCP là protocol phổ biến và có mặt khắp nơi nhất, gần như mọi thứ được xây trên nó. Cách một connection được thiết lập:

1. Client gửi một IP packet chứa **SYN** — yêu cầu đồng bộ sequence number giữa hai bên.
2. Server nhận SYN và trả về **SYN-ACK** — gửi số của mình và xác nhận số của client.
3. Client trả lời bằng **ACK** — hoàn tất **three-way handshake (bắt tay ba bước)**.

Vì TCP **stateful (lưu trạng thái)**, hai bên liên tục tăng sequence number khi nhận packet và giữ chúng đồng bộ. Khoảnh khắc chúng lệch nhau nghĩa là có gì đó sai — connection bị reset.

Nhưng đó là phía client. **Chuyện gì xảy ra ở phía backend?** Đó mới là phần thú vị.

---

### 🌐 Listen không chỉ là "một cái port"

Khi server listen, nó listen trên **một địa chỉ và một port** — không bao giờ chỉ mình port. Lý do: máy tính của bạn có **nhiều network interface**, mỗi interface có IP riêng:

* **Loopback** — máy nào cũng có, là `127.0.0.1` (IPv4) và `::1` (IPv6). Chỉ máy đó truy cập được.
* Interface mạng nội bộ do router cấp, ví dụ `192.168.1.3`.
* Interface public với IP public nếu máy bạn lộ ra Internet.

Đây là lý do **listen trên đúng một address quan trọng đến vậy**:

* Nếu bạn chỉ nói "listen on port 8080", bạn đang listen trên **tất cả các interface** — biểu diễn bằng `0.0.0.0`. Đây là **default** của Node.js và nhiều framework khác. *Mình nói thẳng: đây là bad practice, đừng bao giờ làm.*
* Hãy tưởng tượng bạn làm một **admin API** chỉ để dùng từ loopback. Nếu listen all interfaces, API đó lộ ra ngoài dù bạn không hề có ý định đó.
* Đó là lý do cứ vài hôm lại có tin **Elasticsearch, MongoDB bị lộ dữ liệu**: người ta spin up database mặc định listen trên mọi interface, vô tình phơi nó ra public Internet. Bạn nói "có username/password mà"? Mật khẩu default dễ bị phá lắm.
* Database **không có việc gì phải lộ ra public Internet** — đây là DB 101: đặt trong private network, có reverse proxy, và chỉ cho một số address được truy cập.

---

### 🧠 Kernel làm gì và backend làm gì? (socket, connection, file descriptor)

Điểm mấu chốt: **kernel làm handshake, không phải application.**

* Application chỉ nói: "Này kernel, tôi listen trên address và port này." Kernel tạo một **socket** và một loạt data structure để tự quản lý.
* Client gửi SYN → kernel (không phải app) trả SYN-ACK → client trả ACK → kernel tạo connection và đặt nó vào một chỗ "ngon lành".
* Chỉ đến lúc đó backend mới **physically accept connection**, bằng cách **di chuyển nó từ kernel space sang userspace** — tức memory của process.
* Socket trả về cho application chỉ là **một integer** — định danh duy nhất, trao tay qua lại giữa app và kernel.
* Khi accept xong, kernel tạo **file descriptor (fd, bộ mô tả file)** cho connection. Đây là con trỏ đại diện cho connection: muốn đọc ghi gì bạn chỉ định fd đó; muốn đóng, gọi close.
* Linux xử lý **mọi thứ bằng file descriptor**: connection, socket, file, network, máy in, thiết bị... tất cả.
* **Phân biệt socket và connection**: socket là cái bạn listen lên; connection là thứ bạn nhận được khi ai đó kết nối tới. Hãy nghĩ socket như ổ cắm gắn tường, còn connection là từng thiết bị cắm vào đó. **Một socket có thể sinh ra hàng trăm connection.**
* Vậy "backend handle được bao nhiêu connection?" — một process hoàn toàn có thể xử lý **1.000 connection**, vì suy cho cùng chúng chỉ là một đám file descriptor. Thử thách thật sự nằm ở việc **shuffle và đọc/ghi đồng thời trên nhiều fd** — chính là bài toán **10K connection problem (vấn đề 10.000 kết nối)** mà chúng ta sẽ bàn sau.

---

### 📬 Hai hàng đợi trong kernel: SYN queue và accept queue

Khi bạn listen, kernel tạo cho bạn **hai hàng đợi nằm trong kernel**, cả hai đều có kích thước hữu hạn. Đây là hành trình đầy đủ của một connection:

1. **SYN đến**: đầu tiên, NIC (network interface controller, card mạng) nhận frame gửi tới MAC address của nó, lấy ra IP packet rồi chuyển cho OS. Linux kernel xử lý toàn bộ phần TCP.
2. Kernel ghi thông tin SYN vào **SYN queue**: source IP, source port, destination IP, destination port. Sau đó trả **SYN-ACK** cho client và **giữ entry đó lại** — lúc này vẫn chưa có connection.
3. **ACK đến**: kernel tìm SYN khớp trong queue. Match bằng gì? Bằng **source IP và source port** — vì có thể đang có cả chục SYN nằm đó, mỗi nguồn là duy nhất.
4. Tìm thấy → xóa entry khỏi SYN queue, đưa connection hoàn chỉnh sang **accept queue (hàng đợi chấp nhận)**. Một **file descriptor** được tạo cho connection đó.
5. Backend gọi **`accept()`** → kernel bê connection ra khỏi accept queue và giao fd cho application.

Vài chi tiết cực quan trọng:

* Bạn accept 10 connection thì phải gọi `accept()` **10 lần**.
* Nếu gọi `accept()` khi queue rỗng, **nó block (chặn)**. Đây là lý do bạn cần xử lý **asynchronously (bất đồng bộ)** — mình đã nói kỹ ở phần async vs sync.
* Việc matching ACK với SYN nghe đơn giản nhưng là **CPU work thật sự**: so sánh IP, hashing, port matching... Kernel làm việc này liên tục. Vì thế những máy cloud **48 core** thường **dành riêng vài core cho networking** — chúng biết mình sẽ bị "đập" bởi hàng triệu client đang thiết lập TCP connection.
* Đó cũng là lý do đừng nhồi database, reverse proxy và web server lên cùng một máy. Chúng sẽ **starve (đói)** lẫn nhau vì tranh CPU. Chạy thử thì không sao, nhưng đo performance thì đó là ý tồi.
* Kích thước hai queue được chỉnh qua **backlog (hàng đợi kết nối)** khi gọi listen. Node.js không expose API này — đây là C stuff, rất gần "kim loại". Muốn chạm vào, bạn cần C, Rust hoặc Go. *Node.js không hề tệ, nó chỉ không được sinh ra cho việc tinh chỉnh networking cao cấp.*
* Bên dưới, có những **smart NIC** (card mạng thông minh) được Intel phát triển với công nghệ họ gọi là DDP — họ đẩy logic TCP xuống thẳng card mạng để CPU rảnh tay làm việc khác. Cách này có cả ưu và nhược điểm.

---

### 🔥 Khi hàng đợi đầy: SYN flooding, SYN cookies và nghệ thuật troubleshooting

**Vì sao lại có accept queue? Vì backend... lười.** Backend application không accept connection đủ nhanh. Đây chính là bài toán số một mà các **reverse proxy** như Nginx, Envoy sinh ra để giải quyết: đứng ở edge (API gateway) và accept connection nhanh nhất có thể, rồi đẩy cho backend xử lý.

Khi accept queue đầy, connection mới không còn chỗ. Kernel thậm chí **không gửi SYN-ACK trở lại**. Nếu bạn chạy `tcpdump`, bạn sẽ thấy các ACK không hề được gửi ra từ kernel.

* **SYN flooding**: client xấu gửi SYN nhưng **không bao giờ gửi ACK**. SYN queue cứ thế bị lấp đầy — với backlog 10 và 10 client như vậy là hết chỗ. Client hợp lệ cũng không thể kết nối, vì handshake là stateful và cần chỗ để lưu trạng thái.
* Giải pháp cho SYN flooding là **SYN cookies**: gửi kèm state trong chính SYN để handshake trở nên **stateless (không lưu trạng thái)** ở phía server — biết bạn là ai mà không cần lưu gì. Cách này cũng có vấn đề riêng, và **Cloudflare** là nguồn đọc cực tốt vì họ gặp những vấn đề này suốt ngày.
* **Backlog quá nhỏ** cũng là vấn đề: backlog 5-6 thì vài connection là đầy. Mình nhớ default là **1000**, nhưng bạn có thể cần cấu hình lại. Tăng backlog nghĩa là cấu trúc dữ liệu lớn hơn, **tốn memory hơn** — có phù hợp với kiến trúc backend của bạn hay không, đó là câu hỏi của bạn.
* Và đây là mảnh ghép cuối: khi bạn ngồi nhìn trình duyệt quay mãi không load, **có cả triệu thứ có thể đang xảy ra**: connection chưa được thiết lập, handshake TLS thất bại, request không được gửi tới vì CPU backend đang bận, hoặc request đã được xử lý nhưng response chưa về. Chính vì thế, **đoán mò là vô dụng** — bạn cần tooling và sự hiểu biết để chẩn đoán đúng chỗ. Đó chính là nghệ thuật troubleshooting, và cũng là mục đích của khóa học này.

Đến đây các bạn đã thấy connection đi qua những gì trước khi chạm tới code của mình. Hiểu được ranh giới kernel ↔ application, các bạn sẽ nhìn ra ngay bottleneck nằm ở đâu. Bài tiếp theo tụi mình sẽ nói về **cách backend đọc và gửi dữ liệu trên socket** — đừng bỏ lỡ nhé! 🚀
