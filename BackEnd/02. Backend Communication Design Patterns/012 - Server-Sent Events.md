# 📡 Server-Sent Events: Một Request, Nhưng Phản Hồi Không Bao Giờ Kết Thúc

Đây là một trong những pattern mình yêu thích nhất, đến mức mình từng lưỡng lự không biết có nên xếp nó vào phần design pattern hay không. Khi lần đầu hiểu ra **server-sent events (sự kiện đẩy từ server)**, mình chỉ nghĩ: "Ai thiết kế ra thứ này đúng là thiên tài". Hôm nay mình sẽ mổ xẻ cái trick cực kỳ đơn giản nhưng cực kỳ thanh lịch phía sau nó, kèm theo một cạm bẫy mà các bạn sẽ gặp ngay khi dùng nó trong thực tế.

### 🎯 Cái trick: một request, một response không có điểm kết thúc

Ý tưởng nền tảng vẫn là request/response, nhưng bị "bẻ" theo một cách rất thông minh:

* Client gửi **một request duy nhất**.
* Server trả về **một response rất, rất dài** — về mặt kỹ thuật nó **không bao giờ kết thúc**, vì server không ghi hai dòng cuối để đóng response lại.
* Thay vì trả một cục dữ liệu hoàn chỉnh, server liên tục ghi vào response những **mini message (message nhỏ)**.
* Client đủ thông minh để **parse từng chunk** và tách ra các message/event riêng biệt nằm giữa dòng dữ liệu đó.

Điểm mấu chốt: HTTP vẫn là giao thức có khởi đầu và kết thúc, nhưng server-sent events biến nó thành **streaming model một chiều từ server xuống client**. Client cứ lắng nghe dòng chảy đó và "nhặt" ra từng sự kiện.

Đây là thứ thuần HTTP. Nó không chạy trên các giao thức khác, nhưng bù lại nó chạy trên **mọi TCP server thông thường** — các bạn không cần dựng một WebSocket server mới dùng được nó.

---

### 📬 Vì sao lại cần nó: bài toán notification thời gian thực

Request/response thuần không lý tưởng cho notification. Client muốn biết ngay lập tức khi: có người vừa đăng nhập, có tin nhắn mới vừa tới...

Các bạn có thể dùng **WebSocket** — server chủ động đẩy message bất ngờ xuống client. Cách đó hoạt động, nhưng khá **hạn chế** vì client phải nói chuyện bằng một giao thức hoàn toàn khác.

Server-sent events thì khác: nó vẫn là request/response, vẫn là HTTP. Cụ thể hơn:

1. Client gửi request đặc biệt với **content type đặc biệt**.
2. Server set header `Content-Type: text/event-stream`.
3. Từ đó trở đi, mọi thứ server ghi thêm vào body đều được client hiểu là **các event riêng lẻ**.
4. Mỗi event bắt đầu bằng chữ `data:` và kết thúc bằng **hai dòng xuống dòng** — đó chính là ranh giới xác định event.

Nghe hơi "hacky" một chút, nhưng nó hoạt động. Server không bao giờ viết dấu kết thúc response, mà chỉ ghi thêm các mini event có thể tạm dừng (pause) ở giữa.

---

### ⚙️ Demo: EventSource trong browser và một request "không bao giờ xong"

Trong demo của mình:

* Server là một app Express chạy ở cổng 8888. Route gốc trả về chữ "hello" để tránh chuyện CORS.
* Route `/stream` set một header duy nhất rồi chạy hàm `send()`, mỗi giây ghi thêm một event kèm số đếm.
* Phía client, browser cung cấp sẵn object **`EventSource`** — có mặt trong mọi browser — chuyên xử lý kiểu stream này.

Mình mở console, tạo một `EventSource` trỏ thẳng vào `/stream`. Và điều thú vị xảy ra:

* Network tab cho thấy request đã gửi, response đã nhận, dữ liệu đang về... nhưng console **không in gì cả**.
* Lý do: mình chưa "nối dây" cho event. Phải gắn `onmessage` rồi `console.log` thì mỗi mini message mới được đẩy vào một **MessageEvent object** đầy đủ.
* Nhìn vào Network tab, request ghi rõ là **chưa kết thúc**. Một request không có điểm dừng — đó chính là server-sent events.

Vậy là xong. Một request, dữ liệu cứ thế chảy về mãi, client tự tách event. Thanh lịch và đơn giản đến mức khó tin.

---

### ⚠️ Cạm bẫy: sáu kết nối và bài toán connection pooling

Cho tới lúc này mọi thứ đều đẹp. Nhưng đây là chỗ các bạn phải cực kỳ cẩn thận, và nó liên quan trực tiếp đến HTTP/1.1:

1. Trình duyệt Chrome giới hạn **tối đa 6 TCP connection tới một domain**. Nhiều browser khác cũng theo quy tắc này.
2. Ở HTTP/1.1, mỗi connection chỉ chạy **một request tại một thời điểm**; vừa gửi request là connection bị đánh dấu **busy** và không dùng được nữa cho tới khi xong. Cơ chế pipeline có tồn tại nhưng đầy vấn đề nên gần như không ai dùng.
3. Vì vậy browser mở sẵn tối đa 6 connection để phục vụ mọi thứ: CSS, JavaScript, các file khác...
4. Nhưng server-sent events là **request không bao giờ kết thúc**. Nếu cả 6 connection đều là SSE request thì cả 6 đều busy vĩnh viễn.
5. Kết quả: mọi request khác trên cùng domain **bị đói tài nguyên** — đến một file JavaScript cũng không tải nổi.

Đó là lý do HTTP/2 hợp lý hơn hẳn: các bạn có thể có **vô số stream trên cùng một connection**, mỗi connection chứa nhiều stream (giới hạn khoảng 200 và có thể cấu hình). Một connection, nhiều dòng dữ liệu song song — không còn cảnh 6 connection bị chiếm sạch.

*Nhớ nhé: đừng học thuộc những con số này. Hiểu cách mọi thứ vận hành thì tự khắc các mảnh ghép sẽ khớp vào nhau khi bạn gặp vấn đề thật.*

---

### 💡 Ưu, nhược điểm và chỗ đứng của pattern này

Server-sent events có **ưu điểm** rõ rệt: real time thực sự, tương thích với cả request/response lẫn mô hình HTTP, và server chỉ cần là web server bình thường (tối thiểu HTTP/1.1 — HTTP/1.0 không hỗ trợ streaming nên không chạy được).

Nhưng nó cũng có **nhược điểm**:

* Client **phải luôn online** để nhận các mini response.
* Client có thể không theo kịp đống message server đẩy xuống — cùng vấn đề như push: client có thể ngắt kết nối, còn server thì phải gánh trạng thái và tài nguyên để giữ kết nối đó, tạo áp lực lên backend.
* Nếu client quá nhẹ, không đủ "thông minh" để xử lý stream, **polling (dài hoặc ngắn)** lại là lựa chọn hợp lý hơn.

Hiểu được những đánh đổi đó, các bạn mới chọn đúng pattern cho đúng bài toán. Còn bây giờ, mình sẽ dẫn các bạn sang một pattern cũng thuộc hàng "ruột" của mình: **publish-subscribe (phát-thu)** — cách để các service nói chuyện với nhau mà không cần biết mặt nhau. 🚀
