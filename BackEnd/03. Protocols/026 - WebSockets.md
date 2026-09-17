# 🔌 WebSockets: Kênh hai chiều thời gian thực được xây trên nền HTTP

Chào các bạn! Hôm nay chúng ta cùng mổ xẻ **WebSockets (kênh giao tiếp hai chiều dành cho web)**. Câu hỏi mình luôn đặt ra ở đầu bài là: TCP vốn đã là giao thức hai chiều rồi, tại sao chúng ta không mang thẳng nó ra cho trình duyệt dùng? Câu trả lời sẽ dẫn chúng ta đi qua toàn bộ cơ chế thú vị đằng sau WebSocket — từ handshake cho tới cái bug "disconnect" mà mình cố tình để lộ trong demo.

### 🎯 Vì sao không thể "phơi" TCP thẳng ra trình duyệt?

Về mặt kỹ thuật, **TCP** đúng là giao thức hai chiều. Nhưng mở nó ra cho browser là một ý tồi:

* Với TCP, bạn có thể kết nối tới server của mình, tới **SMTP server**, tới vô số dịch vụ khác. Mở toang cánh cửa đó cho trình duyệt là cực kỳ nguy hiểm.
* Chỉ cần có link, bất kỳ ai cũng lấy được đoạn **JavaScript** đó và làm đủ thứ.
* Vì vậy web được bảo vệ dưới chiếc ô của **HTTP**. Không phải cứ muốn hai chiều là được đâu.

Cách WebSocket giải quyết rất khéo: nó **nằm trên HTTP** và dùng một "hợp đồng" đặc biệt để cấp cho client quyền đi vòng xuống kết nối TCP bên dưới. Chỉ khi client chứng minh được rằng nó hiểu cách **upgrade (nâng cấp)** kết nối HTTP thành WebSocket, server mới mở kết nối TCP nền và cho phép giao tiếp hai chiều. *Đó chính là "trick" của WebSocket.*

Giao thức này có hai dạng: `ws://` cho bản thường và `wss://` cho bản bảo mật.

---

### ⚙️ Handshake: từ keep-alive của HTTP/1.1 tới 101 Switching Protocols

Nhắc lại một chút: **HTTP/1.0** mở kết nối, gửi request, đóng kết nối, rồi gửi request tiếp, đóng tiếp… Chậm và lãng phí, mình không thích chút nào. **HTTP/1.1** giải quyết bằng cách giữ kết nối **persistent (thường trú)**: mở một connection, gửi bao nhiêu request tùy thích, xong mới đóng.

Chính việc giữ connection sống đã mở ra cơ hội làm WebSocket:

1. Mở kết nối, rồi chạy **WebSocket handshake (bắt tay)** — về bản chất chỉ là một HTTP request với ngữ nghĩa đặc biệt.
2. Nhận response kiểu "kết nối của bạn giờ là WebSocket rồi nhé" — thế là hết ràng buộc.
3. Server gửi được cho client, client gửi được cho server, client gửi tiếp, server gửi lại, cả hai gửi cùng lúc cũng chẳng sao. **Hai chiều (bidirectional)** thực thụ, không còn là một request một response như HTTP nữa.
4. Xong việc thì đóng kết nối.

*Với HTTP/1.0 — nơi kết nối bị đóng sau mỗi request — WebSocket sẽ không bao giờ hoạt động được, các bạn ạ.*

Chi tiết handshake rất đáng để soi kỹ. Phía client gửi `GET /chat` — method, path, protocol, host như một request bình thường, kèm thêm vài thứ đặc biệt:

* **Upgrade header** — header mà server hiểu được, và nó là **hop-by-hop header**, nghĩa là mọi hop trên đường đi đều phải hiểu và tôn trọng nó.
* **sub-protocol** — ví dụ `chat`. Cái này chẳng liên quan gì tới WebSocket cả, nó là thứ bạn tự định nghĩa để backend hiểu bạn muốn gì.
* Server trả về **101 Switching Protocols** — mã đại diện cho việc chuyển giao thức. Hai bên đồng ý kết nối này không còn là HTTP nữa. Server cũng nói luôn nó chỉ hỗ trợ `chat` chứ không hỗ trợ `Super Chat`, nên chỉ chốt được kèo `chat` thôi.
* Trong response còn có một **key** — kết quả của một phép toán phía server. Server dùng key này để đảm bảo không phải ai muốn là upgrade được: client phải thật sự biết mình đang làm gì, cần logic phức tạp hơn một chút.

---

### 🌐 WebSocket dùng vào việc gì?

Trong video mình đã tự tay build một chat app với nhiều người tham gia, và mình nghĩ nó là ví dụ hoàn hảo — cứ xem lại video đó là đủ. Nói chung, bất cứ thứ gì liên quan tới **push (đẩy dữ liệu)**, **real time** và cần nhanh thì đều là đất diễn của WebSocket:

* **Ứng dụng chat** — mình đã dựng nguyên một cái.
* **Live feed**, **multiplayer gaming**.
* **Twitch** dùng WebSocket. **WhatsApp** dùng WebSocket, ít nhất là trên web. **Discord** dùng WebSocket cho chat và WebRTC cho âm thanh.
* Hiển thị **tiến trình công việc, log** về cho client cũng làm được.

---

### 📊 Ưu điểm và những cái giá phải trả

Ưu điểm đầu tiên là **full duplex (hai chiều đồng thời)**: bạn không cần polling vòng vòng hỏi "có gì mới không?" — dữ liệu tự được đẩy về. Ưu điểm thứ hai, và cũng là điều quan trọng bậc nhất: **tương thích và thân thiện với firewall**. WebSocket đi qua cổng 80/443, gần như không ai dám chặn hai cổng đó — *trừ khi bạn đang ở trên máy bay và họ muốn bạn đi qua gateway của họ*. Nếu tự dựng TCP với cổng riêng, cổng đó hoàn toàn có thể bị chặn ở phía server.

Còn đây là những cái giá:

* **Proxy ở layer 7 rất tricky** — proxy phải hiểu cách terminate kết nối WebSocket, đọc message, rồi mở một kết nối WebSocket mới tới server đích và chuyển tiếp. Không phải bất khả thi, nhưng "thú vị" lắm.
* Một số proxy cắt kết nối nếu thấy client không gửi gì: "Sao kết nối này nằm im lâu thế?". WebSocket là kết nối sống lâu, nhưng thường cũng chẳng sống nổi cả tiếng đồng hồ.
* Kết nối có thể bị đóng bởi một trong hai bên, hoặc bởi router trung gian — chúng có thể đơn giản là "quên" một kết nối TCP của WebSocket. Vì thế trên đường truyền luôn có **ping/pong** gửi định kỳ để giữ kết nối sống.
* **Stateful (có lưu trạng thái)** — cả client lẫn server đều giữ trạng thái về kết nối. Với HTTP, connection là **ephemeral (tạm thời)**: đóng rồi mở cái khác, chẳng ai bận tâm. Còn WebSocket, bạn phải dùng đúng cái connection đã thiết lập với server.
* Vì stateful nên **scale ngang (horizontal scaling)** khó hơn. Có thể làm **layer 4 load balancing** — cách dễ nhất, nhưng khá "ngốc" và tốn tài nguyên backend: nó chỉ dựa trên connection, và mỗi connection vĩnh viễn bị khóa vào một backend, không thể dùng cho việc gì khác.

Vậy có nhất thiết phải dùng WebSocket không? **Tuyệt đối không.** Nguyên tắc của mình rất đơn giản: bạn có *thực sự* cần giao tiếp hai chiều không? Nếu không, hãy dùng **long polling** hoặc **server-sent events (sự kiện đẩy từ server)** — long polling suy cho cùng vẫn là HTTP nên tương thích với mọi thứ; còn WebSocket kéo theo header phụ và đủ thứ phải quản lý. *Không cần thì đừng dùng.*

---

### 🧩 Demo: chat server, push notification và bài học từ bug disconnect

Mình build demo bằng Node.js: tạo một HTTP server, rồi truyền server đó xuống đối tượng WebSocket để thực hiện handshake upgrade. Điểm đẹp là event của WebSocket **chỉ chạy khi có request upgrade hợp lệ** — bạn có thể connect qua TLS handshake cả ngày, nhưng event chỉ fire khi có người gửi request WebSocket thật.

Cách hoạt động cực đơn giản:

* Server giữ một **mảng connections** — mỗi connection là một user. Ai connect thì push vào mảng; ai gửi message thì loop qua mảng và gửi cho tất cả.
* Mẹo nhận diện user mình rất thích: dùng **remote port**. Một kết nối TCP luôn có source IP, source port, destination IP, destination port; source port luôn unique vì đó là user đang kết nối. Trong demo mình thấy port `64876` đóng vai trò định danh.
* Khi có người connect, server thông báo "user 64876 just connected" cho mọi người (kể cả chính họ).
* Phía client chỉ cần mở browser, tạo một đối tượng WebSocket trỏ tới `ws://localhost:8080` và gắn `onmessage` để in message. Mở nhiều browser là có nhiều user.

Gửi "hi" từ một client, server rebroadcast ngay lập tức, mọi client nhận được gần như đồng thời. *Đây chính là push notification: bạn không hỏi "có tin nhắn không?", mà nó tự được đẩy tới bạn.* Và nhớ cho kỹ: **tất cả client đều kết nối tới một server trung tâm**, không ai nối trực tiếp với nhau; server nhận message rồi có trách nhiệm lặp lại cho mọi client khác.

Còn đây là bug đáng giá nhất của buổi demo: khi một client biến mất (đóng trình duyệt), server vẫn loop và gửi vào connection đã chết, thậm chí có thể crash. Trong demo, state của connection cho thấy `connected` chuyển thành false. Cách sửa: thêm điều kiện "nếu còn connected thì mới gửi", và hay hơn nữa là dùng map hoặc loại connection chết khỏi mảng — chứ loop qua những connection đã ngắt là lãng phí. *Code không hoàn hảo, và đó mới là phần thú vị: các bạn cứ thử và tự tay sửa nó.*

Tóm lại, chúng ta đã đi qua WebSocket là gì, vì sao không thể phơi TCP trực tiếp cho browser, handshake diễn ra thế nào, dùng ở đâu, ưu nhược điểm ra sao, và một demo push notification chạy thật. Hiểu được những thứ "dưới đường truyền" như thế này thì khi latency tăng hay connection rớt, các bạn sẽ biết phải tìm ở đâu. Hẹn gặp lại ở bài tiếp theo — **HTTP/2** — nơi chúng ta xem người ta tiến hóa giao thức như thế nào nhé. 🚀
