# 🧠 Stateful vs Stateless: Đừng Học Định Nghĩa, Hãy Nhìn Hệ Quả

Mình muốn bắt đầu bài này bằng một lời cảnh báo: đây là chủ đề **gây tranh cãi** nhất trong giới engineering. Người ta cãi nhau về định nghĩa **stateful (lưu trạng thái)** và **stateless (không lưu trạng thái)** suốt ngày, nhưng với mình, định nghĩa chẳng quan trọng. Cái quan trọng là **hệ quả của nó** — và đó là thứ mình muốn các bạn mang theo sau bài này.

### 🧠 Định nghĩa chỉ là trò chơi chữ — hệ quả mới đáng nói

Cách mình nhìn nhận vấn đề: đây là **cách bạn lưu trạng thái trong ứng dụng, và bạn có phụ thuộc vào việc trạng thái đó luôn hiện diện hay không**.

* **Stateful backend**: lưu trạng thái về client **trong bộ nhớ của chính nó**, và quan trọng hơn — **phụ thuộc vào việc thông tin đó còn ở đó** để hoạt động đúng. Mất nó là hỏng.
* **Stateless backend**: không lưu trạng thái về client trên server; **client có trách nhiệm mang theo trạng thái trong mỗi request**. Nếu backend crash, bạn vẫn dựng lại được mọi thứ mà không cần "nhớ" gì cả.

Bạn có thể áp dụng cách nhìn này cho cả **hệ thống, backend, một function, hay một giao thức**. Nó phụ thuộc vào cách bạn nhìn.

Một điều thú vị: backend **stateless vẫn có thể ghi dữ liệu ra chỗ khác** — như database, như log. Bạn ghi log vào DB, tắt app, bật lại, chẳng sao cả — vẫn là stateless. Ngược lại, một app stateful cũng có thể lưu state ra ngoài (ví dụ database):

* Nhìn ở góc hệ thống: **toàn bộ kiến trúc là stateful** vì có một state store mà ta phụ thuộc vào.
* Nhìn ở góc ứng dụng: **app vẫn là stateless** — mình có thể giết nó, khởi động lại từ đầu, nó vẫn chạy, vì việc đọc dữ liệu từ app khác là trách nhiệm của app khác.

---

### 🔑 Phép thử của mình: restart backend giữa chừng, client có sống sót?

Đây là câu hỏi mình luôn hỏi mọi người để xác định backend của họ stateless hay không:

1. Backend đang chạy, phục vụ client.
2. Bạn cho backend **nghỉ (idle)** rồi **restart** nó.
3. Những client đang kết nối trước đó có thể **hoàn thành workflow của họ mà không hề hấn gì** không?

* Nếu **có** → ứng dụng của bạn là stateless.
* Nếu **không** → tồn tại một state store ở đâu đó mà bạn đã làm mất, và client đang phụ thuộc vào nó. Đó chính là vấn đề.

*Đừng xem "stateless" như một tấm huy chương để đạt được. Nó chỉ là một trạng thái, và cả stateful lẫn stateless đều có ưu điểm lẫn nhược điểm.*

---

### 🍪 Session login: nơi stateful gãy và sticky session ra đời

Ví dụ kinh điển: ứng dụng login. Người dùng vào trang login, nhập username/password, backend gọi Postgres xác thực, rồi **sinh ra session ID**, lưu nó **ngay trong bộ nhớ của mình** (không lưu vào database) và trả session đó về cho client, thường qua cookie.

Các request sau, cookie tự động gửi kèm session. Backend chỉ cần hỏi: "Session này có trong memory của mình không?" — có thì đã xác thực trước đó rồi, cho qua. *Đó chính là cách cache hoạt động: kiểm tra tại chỗ để đỡ một chuyến đi tới database.*

Nhưng đây là chỗ nó gãy:

* Backend restart hoặc crash → session trong memory **biến mất**.
* Người dùng refresh trang → backend không tìm thấy session → **trả về trang login**.
* Hồi thập niên 90, bạn login xong, bấm refresh là bay về trang login. Có lúc được, có lúc không.

Vì sao "có lúc được, có lúc không"? Vì khi phát triển, bạn chạy **một máy duy nhất** nên luôn trúng cùng một backend, không bao giờ thấy vấn đề. Nhưng khi có **load balancing**, request lúc trúng server có session, lúc trúng server không có — thế là gãy.

Đó là lý do **sticky session** xuất hiện: cấu hình load balancer để **mọi request từ một client luôn đi về cùng một backend**. Có những hệ thống stateful bắt buộc phải làm vậy. Mình từng phải dùng cách này khi làm một **ứng dụng gaming**, để giảm số lần ghi database trong một khoảng thời gian ngắn.

Còn nếu giải theo hướng stateless? Đơn giản: **lưu session vào database**. Backend luôn kiểm tra database xem session có hợp lệ không. Vậy là bạn có thể **spin up bao nhiêu backend cũng được**: user đi lạc sang server nào cũng hoạt động, vì server nào cũng nói chuyện với database.

*Toàn bộ hệ thống lúc này vẫn stateful — vì có state nằm trong database. Nhưng tính stateless là thuộc tính của **chính backend**: mình có thể kill nó, restart nó, tạo cái mới, hoàn toàn ổn.* Tất nhiên, nếu database chết thì cả hệ thống vô nghĩa — nhưng đó là câu chuyện định nghĩa, và đúng như mình nói từ đầu: đừng bám vào định nghĩa.

---

### 🌐 Giao thức cũng stateful hoặc stateless: TCP, UDP, DNS và QUIC

Không chỉ ứng dụng — **giao thức** cũng được thiết kế để lưu trạng thái hoặc không.

**TCP là stateful rõ ràng:**

* Mọi segment đều gắn **sequence number**, và sequence được lưu ở cả hai đầu.
* Có hẳn một **state machine**: connection đang mở, đang established, đang chờ, đang đóng...
* Hai bên cùng duy trì window size, flow control, congestion control window.
* Nếu những thông tin này mất, connection trở nên vô nghĩa — bạn phải reset nó.

**UDP thì hoàn toàn stateless:** nó là message-based, không lưu gì cả. Bạn có thể gửi nhiều datagram và chúng được nhiều server nhận — chẳng sao.

**DNS là ví dụ đẹp nhất:** bạn gửi một UDP datagram chứa DNS query, không có connection, chỉ có địa chỉ IP, destination port và một local port do bạn sinh ra. Vì không có connection, UDP không giúp bạn biết packet nào là của ai — nên **DNS tự gắn query ID cho mỗi lượt hỏi**, và server trả query ID đó về đúng port đã gửi. Hệ điều hành map theo destination port để đưa dữ liệu về đúng application.

Bạn có thể cãi: nếu ứng dụng chết thì destination port không tồn tại, chẳng có ai nhận datagram — vậy DNS client/server có phải stateful? Có thể. Nhưng giao thức UDP thì **stateless** — "bạn tự ngắt kết nối thì đó là lỗi của bạn". Đây đúng là một **con dốc trơn**, nên mình nhắc lại: hãy cầm muối mà ăn.

**QUIC** thì thú vị hơn: nó gửi **connection ID** để định danh connection. QUIC **stateful** vì hành xử như TCP với đủ loại trạng thái, nhưng vì chạy trên UDP (stateless), nó **phải gửi kèm connection ID trong mọi UDP packet** — tức là **mang trạng thái đi xuyên qua chính giao thức stateless bên dưới**.

Twist ở đây là: bạn có thể xây **giao thức stateless trên nền giao thức stateful** và ngược lại. HTTP là stateless (request/response, server chết thì server khác lên thay, bạn chẳng bận tâm) — nhưng nó chạy trên TCP stateful. Nếu TCP connection đứt? Cứ tạo cái mới, vì TCP chỉ là phương tiện truyền tải. Ngược lại, QUIC là giao thức **stateful chạy trên UDP stateless**.

---

### 🎟️ JWT, hệ thống stateless thật sự và triết lý "không có gì hoàn hảo"

Một hệ thống **hoàn toàn stateless** rất hiếm gặp: trạng thái phải được mang theo trong từng request, và backend chỉ phụ thuộc vào chính input. Ví dụ: ứng dụng kiểm tra một số có phải số nguyên tố hay không — nhận request, tính, trả về, xong. (Tất nhiên, nếu bạn lưu kết quả vào database thì hệ thống lại thành stateful.)

**JSON Web Token (JWT)** là ví dụ hoàn hảo của stateless: mọi thứ nằm trong token, không cần hỏi server nào khác. Nhưng chính điều đó vừa là ưu điểm, vừa là nhược điểm:

* Nếu token bị đánh cắp và bạn muốn **vô hiệu hoá** nó? Với session ID thì dễ — vào database đổi thành invalid, lần validate kế tiếp sẽ bị chặn. Với JWT thì bạn **không nói chuyện với server nào cả**, nên kẻ gian cứ dùng token đến khi nó hết hạn.
* Đó là lý do JWT có **refresh token**: access token làm thật ngắn, refresh token dài hơn. Nhưng nếu refresh token bị đánh cắp thì... lại về bài toán cũ.

Cuối cùng, hãy dùng **TLS** để mã hoá mọi thứ, và cư xử cẩn thận nhất có thể.

Xin đừng nghĩ mọi thứ trong backend engineering đã được giải quyết hết. Nhiều kỹ sư nói như thể họ biết tuốt, nhưng **không phải vậy** — còn rất nhiều lỗ hổng. Người ta chỉ nói về vấn đề khi nó nổ ra, còn những lỗ hổng âm thầm thì có người biết, có người không. Cách duy nhất để trở thành backend engineer giỏi hơn là hiểu rõ hệ thống hiện tại và **những giới hạn của nó**. Biết giới hạn, bạn tìm cách lách qua — đó là điều tốt nhất có thể làm ở thời điểm hiện tại. *Và định nghĩa thì chẳng đi tới đâu cả — hãy cầm muối mà ăn.* Hẹn gặp các bạn ở bài cuối của section: **sidecar pattern (container phụ trợ)** — nâng cấp giao thức mà không cần đụng vào code. 🚀
