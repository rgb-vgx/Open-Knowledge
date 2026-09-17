# 🔌 WebSocket Proxying: Khi Layer 4 và Layer 7 "đối đầu" qua một đường hầm hai chiều

Đây là phần "thịt" của khóa học mà mình rất thích: chúng ta sẽ nói về **WebSocket proxying** ở **layer 4** và **layer 7**. Khi mình nói "proxying" trong bài này, các bạn hiểu là **reverse proxying** cho chính xác — load balancing, API gateway chỉ là những tập con của nó.

Chúng ta sẽ đi từ nền tảng TCP/IP, rồi xem từng byte chảy qua "trên dây" như thế nào trong hai cấu hình. Đi hết bài này, các bạn sẽ thấy rõ vì sao cùng là WebSocket mà cách xử lý lại khác nhau một trời một vực.

---

### 🌐 Nhìn TCP/IP bằng con mắt của backend engineer

TCP là viết tắt của **Transmission Control Protocol**, IP là **Internet Protocol**. Network engineer nhìn hai thứ này hoàn toàn khác chúng ta — những người làm backend và software engineering. Đây là cách mình nhìn:

* **IP** là một packet ở **layer 3** với địa chỉ IP đích, địa chỉ IP nguồn và dữ liệu.
* **TCP** ngồi cao hơn, dùng IP, thêm **port nguồn và port đích** cùng rất nhiều thứ khác, rồi nhét tất cả vào một IP packet.
* Kết quả: ta có **TCP segment** và **IP packet**.

Vậy nhìn vào TCP/IP, ta thấy bốn thứ: **port**, **địa chỉ IP**, và **khái niệm connection** trong TCP — vì TCP có SYN/ACK và sequence, một giao thức cực kỳ **stateful (lưu trạng thái)**.

Ở **layer 4**, nguyên tắc là ta **không nên nhìn vào dữ liệu** bên trong IP hay TCP — chỉ nhìn metadata: IP, port, connection, sequence. Dữ liệu có thể đã bị mã hóa sau một **TLS handshake** trước đó, nên nhìn cũng không thấy gì. Kể cả khi không mã hóa (ví dụ port 80), quy tắc vẫn là: *đừng nhìn*. Thực tế vẫn có người nhìn, router đôi khi vẫn làm những trò như vậy — nhưng đó là ngoại lệ, không phải quy tắc. Một khi bạn bắt đầu mổ xẻ nội dung, bạn đã được xếp vào một tầng khác rồi.

Với **layer 7 (application)** thì ngược lại: bạn có mọi thứ layer 4 có, **cộng thêm nội dung ứng dụng**. Bạn phải giải mã, phải **terminate TLS (kết thúc TLS tại proxy)**, phải phục vụ chứng chỉ của chính mình, phải nhìn thẳng vào nội dung. Cái hay là bạn thấy được **header**, thấy được **đường dẫn**: `/chat`, `/media`... Từ đó bạn làm được những rule thông minh trong nginx hay bất kỳ proxy nào:

* Ai vào `/chat` → tới server này.
* Ai vào `/media` → media nặng hơn chat, cho sang server khỏe hơn.

Layer 4 không bao giờ làm được điều đó, vì nó không được phép nhìn vào dữ liệu.

---

### 🔌 Layer 4 proxy cho WebSocket — một đường hầm mù

Layer 4 proxy trên WebSocket đơn giản là **một tunnel (đường hầm)**. Ngay khi bạn gửi request TCP tới, nginx biết nó phải chọn một backend và **tunnel mọi thứ** bạn gửi về backend đó — mãi mãi.

Cách triển khai phổ biến: nginx chặn (intercept) request mở connection, rồi tạo một **connection mới ở phía backend**. Một số proxy thông minh hơn, dùng các shortcut tối ưu, vì việc "reserve" một connection lâu dài cho backend rất tốn kém. Nhưng ý tưởng chung là vậy:

* Client kết nối vào port front-end của nginx → nginx tạo connection backend.
* Mọi dữ liệu gửi tới connection front-end đó được tunnel **mù quáng** sang connection backend.
* HTTP, gRPC hay WebSocket — nginx **không cần quan tâm**.
* Nginx thậm chí **không cần hiểu giao thức WebSocket**, vì nó chỉ là một "dumb tunnel". Backend connection là **private**, dành riêng cho client đó.

Giờ hãy xem kịch bản có TLS trên port 443:

1. Client mở connection; nginx tunnel thẳng xuống backend.
2. Client gửi **TLS handshake**; nginx chuyển tiếp mù — handshake đi thẳng tới backend.
3. Backend trả lời kèm certificate, public key và tham số **Diffie-Hellman**; nginx chuyển tiếp nguyên vẹn về client.
4. Client và server có chung một **symmetric key**. Điều quan trọng: **các middle box (kể cả nginx) không bao giờ biết key này** — trừ khi làm trò gì đó mờ ám. Nghĩa là **mã hóa end-to-end hoàn toàn**.
5. Client gửi **upgrade handshake (bắt tay nâng cấp giao thức)** để chuyển kết nối lên WebSocket. Nginx thậm chí không biết đó là upgrade request — nó chỉ thấy dữ liệu đi qua port được cấu hình để tunnel. Backend hiểu giao thức WebSocket, xử lý `switching protocol`, và nginx chuyển tiếp packet về client.
6. Từ đây là **giao tiếp hai chiều (bidirectional)**: client gửi gì, nginx chuyển mù xuống backend; backend trả lời, nginx chuyển về client.

Có một chi tiết cực kỳ quan trọng ở cấu hình này: bạn **phải chỉnh timeout** để nginx không tự đóng connection chỉ vì lâu rồi không ai gửi dữ liệu. Đây là chỗ khá "khoai", bạn sẽ phải chỉnh config một chút. Khi client đóng kết nối, backend mới có thể đóng connection private của mình một cách an toàn.

---

### 🛡️ Layer 7 proxy cho WebSocket — giải mã để "soi" và route

Cùng kịch bản, nhưng mọi thứ khác ngay từ TLS handshake. Lần này nginx **không** chuyển tiếp mù:

* Nginx trả lời client bằng **certificate, public key và tham số Diffie-Hellman của chính nó**. Một **TLS session** được thiết lập giữa client và nginx.
* Nginx muốn giải mã mọi thứ bạn gửi để nhìn thấy nội dung — *mọi API gateway đều làm chính xác điều này, và không nhiều người biết.*
* Vì vậy bạn phải đặt **certificate và private key** trong nginx. Có nơi còn chia sẻ thẳng cert + private key của server cho nginx — điều này bị nhiều người phản đối; một số người tạo cert/SSL key riêng cho nginx.

Sau đó, client gửi request upgrade WebSocket. Nginx **thấy toàn bộ nội dung** và lúc này **chưa hề chạm vào backend**. Nginx tự nhủ: "để tôi xem bạn muốn gì đã" rồi mới mở connection tới backend — có thể là 7, 8 backend, bất kỳ con số nào — và **load balance** theo cấu hình.

Đến lượt mình, nginx gửi một **TLS handshake mới** tới backend (nếu backend không hỗ trợ TLS thì là kết nối không mã hóa). Trong cloud, mình vẫn khuyên mã hóa đường backend: software-defined networking khiến mọi thứ dùng chung, bạn không biết ai có thể sniff traffic của mình. Private LAN thì tùy mức độ nhạy cảm của dữ liệu.

Chỉ khi backend trả về `switching protocol`, nginx mới phát `switching protocol` của chính nó về client — hai connection hoàn toàn khác nhau. Và đây là sức mạnh của layer 7:

* Vào `/index.html` → à, HTML bình thường, fetch trang.
* Vào `/chat`, `/superchat`, `/feed` → đây là WebSocket request, đi đúng tới server tương ứng.

**Layer 4 không thể làm bất kỳ trò thông minh nào như vậy.**

---

### 🔄 "Hai WebSocket" và hành trình message qua hai chặng mã hóa

Về mặt kỹ thuật, lúc này ta có **hai WebSocket connection** được gắn (tag) vào nhau. Mọi thứ bạn gửi ở connection này luôn chảy sang connection kia, và ngược lại. Hãy tưởng tượng hai chiếc chìa khóa màu:

1. Client mã hóa message bằng **key hồng** rồi gửi cho nginx.
2. Nginx giải mã bằng key hồng, **xem nội dung** — bạn có thể chặn bad words ngay tại đây, logic gì cũng viết được.
3. Nginx mã hóa lại bằng **key vàng** rồi gửi backend.
4. Backend giải mã bằng key vàng của riêng nó, xử lý, rồi trả về bằng key vàng.
5. Nginx giải mã, mã hóa lại bằng key hồng và trả về client. Client đóng thì backend cũng đóng.

Zoom ra một chút để so sánh với **HTTP load balancing layer 7 thông thường**. Nginx có thể **preheat** các connection backend: mở sẵn một loạt TCP connection và giữ chúng nóng. Không phải proxy nào cũng làm vậy — nó tùy tình huống, tùy memory, tùy cấu hình (ví dụ cấu hình yêu cầu giữ bao nhiêu connection mở sẵn).

Với HTTP request thường: client mở TCP connection mới, TLS handshake, gửi request — đúng kiểu request-response. Nginx giải mã, nhìn vào, rồi cân bằng tải, ví dụ round robin:

* Request thứ nhất → connection/server thứ nhất.
* Request thứ hai → nhớ ra lần trước đã chọn server nào, lần này chọn server khác.

Và câu hỏi kinh điển: **load balancing khác gì proxying?** *Y hệt nhau.* Load balancing chỉ là một reverse proxy **thông minh hơn**. Mọi load balancer là reverse proxy, nhưng không phải reverse proxy nào cũng là load balancer — vì reverse proxy chỉ terminate kết nối rồi gửi tới backend, còn load balancer làm điều đó **một cách thông minh**.

---

### 💡 WebSocket load balancing — những giới hạn bạn buộc phải biết

Điểm khác biệt lớn nhất khi nginx làm load balancer cho WebSocket:

* Nginx có thể **không** preheat connection backend — làm hoặc không đều có lý do, vì WebSocket connection **đắt hơn** HTTP thường: một khi mở ra, nó trở thành private.
* Khi client upgrade và tunnel hình thành, connection này **không bao giờ được dùng cho client khác**. N client → **N backend connection bị reserve**. Rất tiếc: **không có pooling, không có chia sẻ**.
* Load balancing diễn ra ở **cấp connection**: connection mới có thể đi sang server khác. Nhưng **từng message WebSocket thì không bao giờ được rải sang server khác** — server sẽ không hiểu nổi, thứ tự (order) phải được giữ nguyên, và đây là bài toán stateful. Gửi message cho server này rồi message kế cho server khác là "all bets are off".
* Nếu bạn thực sự muốn một **message-by-message load balancer** ở cấp WebSocket, bạn phải **tự xây từ đầu**. Ví dụ: một centralized server nơi mọi message đổ về — cách này đôi khi còn hiệu quả hơn. Nhưng tất cả phụ thuộc vào use case.

*Bài học lớn nhất mình muốn các bạn mang về: bạn có thể làm được rất nhiều trò nếu hiểu rõ chuyện gì đang diễn ra bên dưới đường truyền, và hiểu chính xác mình muốn gì.*

---

Vậy là chúng ta đã đi hết hành trình WebSocket proxying: **layer 4** tunnel mù, giữ mã hóa end-to-end nhưng không thông minh; **layer 7** giải mã để route, cache và áp logic — nhưng phải giữ cert, tốn kém hơn và cần hiểu giao thức. Chọn cái nào hoàn toàn phụ thuộc vào bài toán của các bạn.

Còn rất nhiều điều thú vị phía trước trong hành trình Proxying and Load Balancing này. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
