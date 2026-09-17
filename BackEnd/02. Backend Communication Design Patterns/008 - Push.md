# ⚡ Push: Khi server chủ động đẩy dữ liệu về client — nhanh nhất, nhưng có cái giá

Nếu các bạn muốn client nhận kết quả **nhanh nhất có thể, ngay lập tức**, thì push là một trong những pattern nổi tiếng nhất để làm điều đó ở backend. Nhưng như mọi thứ khác, nó có ưu điểm lẫn nhược điểm — và mình sẽ mổ xẻ cả hai trong bài này.

### 📬 Vì sao cần push: khi request/response hết "jive"

**Request/response không phải lúc nào cũng lý tưởng.** Ví dụ với **real-time notification**: ai đó vừa login, ai đó vừa upload một video YouTube, ai đó vừa đăng tweet... Làm sao client biết sự kiện đó đã xảy ra?

Client không thể tự hỏi "có gì mới không?" rồi mong có kết quả — vì **client không hề có kiến thức về sự kiện đó, server mới là bên có**. Đây là một **event (sự kiện)**, khác với "dữ liệu client biết trước".

* Bạn vẫn có thể làm kiểu request/response: "Có notification chưa? Có notification chưa?" — nhưng cách này **không scale tốt**.
* **Push model** tỏa sáng ở đúng chỗ này: server biết có chuyện gì đó và **chủ động đẩy kết quả về client**.
* **Chatting app là ví dụ hoàn hảo** cho push. Từ khóa nằm ở chữ **"push" — đẩy, hay đúng hơn là "ép"**: bạn ép dữ liệu sang phía client.

*Điều đó tốt trong nhiều trường hợp, nhưng đôi khi cũng xấu — vì rất nhiều client không kham nổi tải mà bạn đang đẩy sang. Chút nữa mình sẽ nói rõ.*

---

### 🔌 Push hoạt động thế nào: chỉ cần một kết nối đã mở

Đây là cách nó chạy: **client kết nối tới server**, server gửi dữ liệu cho client, và **client không cần request gì cả**. Thứ duy nhất phải tồn tại là **một kết nối đã được thiết lập** — đó là "medium" để dữ liệu đi qua.

Nói cách khác, nó gần như một **unidirectional stream (luồng một chiều) từ phía server**. Để hỗ trợ điều này, protocol phải **bidirectional (hai chiều)** — mình có thể tranh luận một chút vì bạn cũng có thể có luồng một chiều từ một phía, nhưng về mặt kỹ thuật, **TCP có thể làm push**, còn một protocol hai chiều thì vẫn tốt hơn cho trường hợp này.

* **RabbitMQ** chọn đúng model này: khi bạn submit message vào queue system, có các client consume queue đó — nhưng thay vì để consumer tự kéo, RabbitMQ **đẩy nội dung của queue đi ngay khi có entry mới** tới các client đang kết nối. **Kafka thì chọn cách khác** — mình sẽ nói ở phần nhược điểm.
* **gRPC** cũng hỗ trợ mode này: **unidirectional server-side streaming** — client không yêu cầu gì mà vẫn nhận dữ liệu. Rất thú vị, và ta có thể "chơi chiêu" để request/response làm việc chung với push.
* **Timeline**: client — server — một **bidirectional connection** đã mở sẵn. Backend nhận một message "từ hư không" (out of the blue), vì ở phía đầu kia đang có chuyện xảy ra: người ta gửi message, gửi request, upload file. Nhiều client khác cũng đang kết nối tới đó. Khoảnh khắc có message — "ai đó vừa upload video YouTube" — ta đẩy kết quả đó về **tất cả client đang kết nối**.

*Push thật ra không hề ma thuật: bạn có một kết nối, và bạn đang ghi trực tiếp vào socket của client.* Ta gọi nó là push vì kết quả được đẩy đi ngay khi event phát sinh — **bạn không chờ, không đợi client hỏi**.

---

### 📈 Scale chỗ này không đùa: bài học từ YouTube

Tưởng tượng một kênh kiểu PewDiePie hay Mr. Beast với **100 triệu subscriber**, và mọi người đều bật push notification mặc định.

**Thực tế YouTube tắt push mặc định** — vì họ không làm nổi. Nó bất khả thi vì hai lý do:

1. Việc duy trì kết nối "sống" liên tục cho 100 triệu người là điều **không thể**.
2. Kể cả tất cả đều connected, bạn vẫn phải **loop qua từng người** và tiêu tốn tài nguyên để push, push, push liên tục.

Vậy YouTube làm khác: họ **đẩy notification tới Apple hoặc Android cloud**, và chính các nền tảng đó chịu trách nhiệm đẩy tiếp xuống client theo nhịp của họ. *Push notification thực tế là một hệ thống rất phức tạp, không phải cứ "nối thẳng tới consumer" là xong.*

---

### ⚖️ Ưu và nhược điểm: không có bữa trưa miễn phí

**Ưu điểm** rõ ràng nhất: **real-time**. Sự kiện vừa xảy ra là kết quả được đẩy đi ngay lập tức — đó chính là định nghĩa của push.

**Nhược điểm 1 — client phải online.** Client phải **đang kết nối vật lý** tới server đang đẩy thì mới nhận được gì đó. Bạn không thể push cho một client đang offline. (Bạn có thể gửi dữ liệu vào server, rồi khi client kết nối lại mới đẩy — nhưng không thể đẩy khi họ đang offline.)

**Nhược điểm 2 — client phải kham nổi tải.** Đây cũng là lý do **Kafka không chọn model push như RabbitMQ**. Push nghĩa là: "đây là data, đây là data, tôi đẩy cho bạn và tôi không cần biết". Nghĩa là **client phải đủ sức xử lý**. Server không biết client có theo kịp hay không (dù ở tầng TCP có cơ chế flow control).

* Nếu bạn push liên tục, client có thể đang xử lý nhưng không đuổi kịp — bạn đang **ép**, và một client đơn giản có thể **crash**.
* Đó là lý do **Kafka chuyển sang log polling** (sẽ nói ở bài khác).

**Nhược điểm 3 — cần protocol hai chiều** để hỗ trợ việc đẩy dữ liệu.

Còn **polling** thì được ưu tiên cho những **client nhẹ**: client tự kéo theo nhịp của mình, chỉ gửi request khi biết mình kham nổi. Nếu chỉ có một video được upload hay một sự kiện nhỏ, bạn chẳng bận tâm — nhưng khi **khối lượng dữ liệu lớn**, nó cộng dồn lại và trở thành vấn đề thật sự.

---

### 💻 Demo: WebSocket chat — thấy push bằng mắt thường

Mình đã viết một app WebSocket đơn giản để hai hoặc nhiều người chat với nhau. Ngay khi message được gửi tới server, **server đẩy message đó cho tất cả client** — đúng nghĩa push notification. Lý do làm được: **WebSocket là protocol hai chiều** vì nó dùng TCP ở bên dưới. (WebSocket sẽ có cả một section riêng, nên các bạn đừng lo.)

**Phía server** (Node.js với thư viện WebSocket):

1. Tạo một **HTTP server**, rồi truyền server đó xuống object WebSocket để thiết lập **WebSocket handshake** — lệnh **upgrade**.
2. Lắng nghe trên port 8080.
3. Event WebSocket **chỉ chạy khi có người gửi request upgrade thật sự** — bạn có thể connect qua TLS handshake cả ngày, nhưng không có upgrade request thì không có gì xảy ra.
4. Mỗi connection được accept **trở thành một instance riêng**. Wire event lên đó: ai gửi message trên connection này thì **loop qua tất cả connection** và gửi lại (broadcast).
5. Dùng **remote port làm unique identifier** cho user — mẹo hay, vì trong một TCP connection luôn có source IP, source port, destination IP, destination port; **source port luôn khác nhau**, nên định danh được người dùng.
6. Khi có người mới kết nối, push connection đó vào **array connections** và thông báo cho mọi người: "user X vừa kết nối".

**Phía client** (trình duyệt, mở nhiều tab = nhiều user): tạo `new WebSocket('ws://localhost:8080')`, và in message nhận được ra console. Vừa làm vậy là một request được tạo ngay, connection object có remote port riêng (ví dụ 64876).

**Diễn biến demo:**

* Chạy server: thấy thông báo "user 64876 just connected" nhưng client đầu tiên không nhận được — vì **chưa kịp wire event** (mọi thứ xảy ra quá nhanh, ta chưa gắn handler).
* Wire event xong, chat thử: gửi "Hey" → chính mình nhận lại (vì broadcast cho tất cả), client kia cũng nhận → **đó là push**. Gửi "Hi" từ người khác → mọi người nhận gần như ngay lập tức: message đi tới server, server rebroadcast cho tất cả.
* Có thể viết logic để người gửi không nhận lại message của chính mình, và nó chạy được với **nhiều client**, không chỉ 1–2.
* Mở thêm client mới: event chạy, ta thấy "94 disconnected, 94 just connected" — ai cũng thấy thông báo, rồi chat tiếp với nhau thoải mái. Bạn hoàn toàn có thể gắn thêm button trên một trang HTML, nhưng đó là toàn bộ tinh thần của push notification.

*Điểm cốt lõi: **không ai kết nối trực tiếp với ai** — tất cả client nối vào **một server trung tâm**, server nhận message và có trách nhiệm lặp lại message cho mọi client đang kết nối.*

Code này chưa hoàn hảo: nếu client disconnect, server cần biết cách **bỏ qua và xóa connection đó khỏi array**. Demo đóng một tab: server không crash, nhưng mọi người không nhận được message (vì đang gửi vào connection đã đóng), và array vẫn còn 3 connection dù một người đã ngắt — trạng thái `connected` của user đó là `false`. Cách sửa đơn giản: thêm `if (connected)` trước khi send; nhưng vẫn lãng phí khi loop qua connection đã chết — có thể dùng map. Mình để phần "nitty gritty" đó cho các bạn tự làm.

Vậy là push cần **bidirectional**; nếu xây được unidirectional từ server thì bạn cũng có push. Khác hẳn với việc dùng `curl` hỏi liên tục "có message chưa? có message chưa?" — theo cách này, **kết quả được đẩy tới bạn**.

Còn rất nhiều thứ đang chờ phía trước — bài tiếp theo chúng ta sẽ bàn về **synchronous vs asynchronous (đồng bộ vs bất đồng bộ)** trong workload backend. Hẹn gặp lại các bạn! 🚀
