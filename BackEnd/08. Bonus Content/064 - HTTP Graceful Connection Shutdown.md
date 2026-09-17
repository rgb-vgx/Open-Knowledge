# 🚦 HTTP Graceful Connection Shutdown: cách server tạm biệt client một cách êm ái

Có rất nhiều lý do khiến một server muốn đóng connection đang mở — từ client "phá" connection, đến server quá tải, đến việc connection đã bị dùng quá lâu và tích tụ đầy rác trong bộ nhớ. Đóng thẳng tay thì dễ, nhưng làm sao để đóng mà **không đập cửa vào mặt người ta** mới là nghệ thuật: đó chính là **graceful shutdown (tắt êm)**.

Trong bài này, mình sẽ nói vì sao chúng ta cần graceful shutdown, cách nó hoạt động trong **HTTP/1.1** với `Connection: close`, và cách HTTP/2 làm điều tương tự bằng **GOAWAY frame** — kèm câu chuyện về những bug đã từng khiến cả trang web bị vỡ.

### 🤔 Vì sao server lại muốn đóng một connection?

Có ba nhóm lý do chính:

* **Client lạm dụng connection** — gửi một lượng lớn request trong thời gian cực ngắn, khiến backend quá tải. Lưu ý: chỉ riêng việc **đọc và parse request** đã tốn thời gian, đó là một chuyện; thời gian **xử lý thực tế** của request lại là chuyện khác. Server có thể nói: "Thế là hơi quá sức với tôi rồi, thống nhất đóng connection nhé".
* **Server quá tải tổng thể** — không phải do client này mà do các hoạt động nền khác: hết memory, hết CPU. Người implement giao thức quyết định giải phóng connection, đóng nó lại. Có thể client không còn ở đó, hoặc không đủ quan trọng — đóng để giải phóng memory mà "thở" một chút.
* **Connection bị dùng và tái sử dụng quá lâu** — cả núi request đã gửi, cả núi response đã stream, và một lượng lớn cấu trúc dữ liệu bị cache rồi bỏ quên ở đó. *Các bạn có thể nói "vậy là code dở, sao không dọn dẹp sau mỗi request?" — nói thì dễ hơn làm.* Vì lý do caching kiểu "có thể mình sẽ dùng lại cấu trúc này", ta giữ nó lại; request sau tới thì ta quên mất; hoặc cái vùng nhớ đó chẳng bao giờ được dùng lại. Rất nhiều lý do khiến một connection đơn lẻ chiếm đầy tài nguyên.

Đóng connection chính là **bảo ứng dụng backend hãy hủy mọi cấu trúc dữ liệu liên quan**. Điều này đặc biệt đúng với lập trình hướng đối tượng, nơi có **object lồng trong object, nested object** — tất cả đều nặng và chiếm memory. Ta muốn xả sạch chúng.

Vì vậy có một thực hành phổ biến: **đạt một số lượng request nhất định trên mỗi connection thì đóng nó lại**, hoặc bảo client đóng rồi tạo connection hoàn toàn mới. *Không phải đuổi client đi mãi — hãy quay lại, nhưng với một connection mới tinh, file descriptor mới, không còn chút rác cũ nào. Mọi người đều vui vẻ.*

---

### 🧹 Graceful shutdown: đóng cửa nhưng đừng đập cửa

Bạn có thể hỏi: "Hussein, sao không reset hay gửi thẳng FIN cho xong?" — Làm được, nhưng hơi **thô lỗ**, kiểu đóng sầm cửa vào mặt người khác. Không hay chút nào.

**Graceful shutdown (tắt êm)** nghĩa là bảo client đóng và tự dọn dẹp, nhưng theo cách cho **cả server lẫn client thời gian để bảo trì**: server kịp xử lý những request đã nhận, còn client biết để **ngừng gửi request mới** vì chúng sẽ không được xử lý. Nói cách khác: *"Tôi sắp tắt, đây là thông báo để bạn ngừng gửi request cho tôi."*

Một kịch bản rất đời: server không hề quá tải, nhưng connection đã tồn tại quá lâu và cần được thay mới — cứ đóng rồi tạo cái mới, sạch sẽ, để mọi cấu trúc dữ liệu liên quan biến mất cùng connection cũ.

---

### 🔌 HTTP/1.1: connection pool và header `Connection: close`

Trong HTTP/1.1, thứ bảo vệ backend chính là **connection pool (gộp kết nối) của browser** — theo mình, một trong những quyết định hay nhất mà đội ngũ maintain browser từng làm. Nó hoạt động **theo từng domain**.

Ví dụ bạn vào một website (cứ cho là HTTP/1.1): bạn tải trang HTML, trang này kéo theo một loạt fetch request, ảnh, file CSS, file JavaScript cùng domain. Ta có một connection đã thiết lập sẵn — nhưng CSS, JS, ảnh đều là những request mới. **Chrome mở tối đa sáu connection**, gửi request đồng thời trên sáu kết nối đó; xong request nào thì connection đó rảnh ra để gửi request tiếp. Bạn bị **xếp hàng, không thể gửi quá sáu request một lúc**. Con số này được **hardcode trong code Chrome**; Firefox dùng con số khác (mình nhớ mang máng là 8 hoặc 12).

*Và đây là thiết kế rất thông minh:* backend nhận request **nhỏ giọt sáu cái một lượt**, có thể đoán trước, chia khối gọn gàng — dù tổng request có thể rất nhiều.

Để khởi tạo việc đóng connection, HTTP dùng **response header `Connection: close`**, và cả client lẫn server đều có thể gửi. Mặc định của HTTP/1.1 là keep-alive, còn header này nói: "Tôi không muốn giữ connection nữa, đóng nó đi". Server có thể đáp lại client rằng hãy tạo một connection mới tinh, để Chrome đóng cái cũ và mở cái mới — tái chế tài nguyên, dọn sạch rác đã cache. Một quy trình dọn dẹp hết sức tự nhiên.

Ngay cả **Nginx** cũng có cấu hình `keepalive_requests`, mặc định là **100**: sau 100 request trên cùng một connection HTTP/1.1, Nginx sẽ **thông báo một cách nhã nhặn** với client rằng "đủ rồi, ta gửi cả núi request trên connection này rồi". Không nhất thiết là lạm dụng — bạn có thể chỉ gửi một request mỗi phút, hoàn toàn không quá tải — nhưng connection đã tích tụ đầy rác được cache và cấu trúc memory gắn vào nó. Đóng connection để bảo application/user space dọn dẹp, rồi tạo cái mới. Các proxy cũng đều có tùy chọn này.

---

### 🌊 HTTP/2: một connection, nhiều stream — bài học từ con số 100

HTTP/2 khác hẳn: **một connection duy nhất, nhiều stream**. Client muốn gửi request thì tạo một stream, **đánh số lẻ**: 1, 3, 5, 7, 9, 11... còn stream do server tạo **bắt đầu bằng số chẵn**, nhưng rất hiếm gặp vì lựa chọn duy nhất của server là **HTTP push** — thứ đã bị vô hiệu hóa vĩnh viễn vì quá rắc rối.

Vậy nếu muốn gửi thêm request, bạn chỉ cần tạo stream mới trên **cùng một pipe, cùng một connection**. Nhưng gửi được bao nhiêu? Đây chính là vấn đề: HTTP/1.1 có pool xinh đẹp giới hạn sáu connection, nên một trang "hư" request 100 resource thì backend cũng chỉ nhận sáu cái một lượt. **HTTP/2 không có pool như vậy ở phía client.** Thay vào đó có **max concurrent streams** được đàm phán giữa server và client — server nói "đây là số stream tối đa mở cùng lúc", và có thể coi một stream như một request. **Mặc định thường là 100, đôi khi 200.** *100 vẫn là con số rất lớn.* (gRPC còn "quá tải" cơ chế này cho kết nối hai chiều và nhiều tính năng hơn nữa.)

Đó là lý do khi HTTP/2 bắt đầu phổ biến: bạn chỉ cần **bật một bit** báo "server hỗ trợ HTTP/2" qua **ALPN trong TLS**, Chrome lập tức gửi ồ ạt request vì không còn hàng đợi của pool nữa — "trước đây tôi gửi sáu cái một lúc, giờ tôi gửi được 100". Backend quá tải chỉ vì một bit được bật lên, và có rất nhiều ví dụ ngoài kia. Giải pháp "thêm phần cứng, dựng thêm server" thì đúng là có tác dụng — nhưng nếu không hiểu gốc rễ, bạn sẽ mãi tự hỏi chuyện gì đã xảy ra. *Đó không phải cách mình làm việc: mình luôn muốn đi tới tận cùng của vấn đề, để không còn bị "mù" nữa.*

---

### 🚪 GOAWAY frame: lời tạm biệt lịch sự và những bug để đời

Trong HTTP/2, cách graceful shutdown có tên là **GOAWAY frame** — một **setting frame** giống như frame server dùng để báo window size hay max concurrent streams. Trong GOAWAY, server gửi kèm **stream number cuối cùng mà nó cam kết sẽ xử lý**; mọi stream phía trên số đó, server nói thẳng: "Tôi không hứa xử lý thêm đâu".

Và đây là phần thú vị: **trong khoảng 2017–2018**, suốt một thời gian dài, **Chrome và Firefox mắc bug** — server gửi GOAWAY frame nhưng Chrome không hiểu đó là gì, vì tính năng chưa được implement hoặc implement sai. Có một **bug của Chrome với số hiệu 40555364** cho ai muốn tra cứu.

Chuyện xảy ra như sau: giả sử client đã gửi 50 request, và stream cuối cùng là 101. Server gửi `GOAWAY 101` — tức là "stream cuối cùng tôi cam kết xử lý là 101, trên mức đó tôi sẽ đóng connection, đừng gửi gì mới nữa". Nhưng Chrome phản ứng kiểu "cái quái gì thế này?", rồi **tiếp tục tạo request mới trên cùng connection từ 103, 105...** và cứ thế gửi. Những request này sẽ thất bại: server bảo "tôi đã nói dừng rồi mà". Server **reject liên tục** — reject bằng cách lờ đi, hoặc trả về lỗi, hoặc cứ để client chờ, tùy theo implementation. Mọi kiểu hành vi bất ngờ đều có thể xảy ra, và đó là một thời kỳ hỗn loạn. Đến nay bạn vẫn có thể thấy lỗi này trong console nếu ứng dụng gửi quá nhiều request với backend hoặc client implement dở.

Bug thứ hai còn tệ hơn: không chỉ tiếp tục gửi request, Chrome/Firefox còn **không bao giờ retry** những request nằm trên số 101 — dù về mặt kỹ thuật chúng đã thất bại. Đúng ra khi nhận GOAWAY, client nên tạo connection mới, và trên connection mới đó các stream sẽ được xử lý bình thường; nhưng thay vì vậy, client **bỏ qua luôn**. Hậu quả: **trang web bị vỡ** — một file CSS hoặc JavaScript không load được, và chỉ cần một resource không xử lý xong là cả trang hỏng. *Các bạn thấy đấy, mọi chuyện phức tạp đến mức nào khi chuẩn không được implement đúng.*

Ngay cả khi mọi bên cư xử đúng, vẫn có một **race condition**: vì độ trễ mạng, client có thể nhận GOAWAY frame **muộn hơn**, khi nó đã gửi một loạt request sau mốc 101 rồi. Trong trường hợp đó, **client phải tự chịu trách nhiệm** graceful shutdown connection: "À, GOAWAY đã tới, connection đang đóng... mình lỡ gửi mấy request sau 101 rồi, tốt nhất nên retry chúng". Bạn có thể **tự phục hồi một cách êm ái** — nghe thật đẹp phải không?

**Tóm lại:** graceful shutdown là thứ cực kỳ quan trọng và chúng ta cần nó. Vì client cư xử tệ, vì bảo trì, vì một connection cần phải "đi" — kể cả khi server không hề quá tải, ta vẫn đóng connection cũ và tạo connection mới tinh, để mọi cấu trúc dữ liệu liên quan biến mất, và thông báo cho backend dọn dẹp. Hy vọng backend đủ thông minh để tìm hết cấu trúc liên quan và xóa sạch, để cái mới được dựng lên. Chuyện cache cũ có bị bỏ hay không là quyết định của backend — có thể cache vẫn được tái sử dụng cho connection mới, tất cả tùy vào implementation. Đó là cách graceful shutdown hoạt động trong HTTP/1.1 và HTTP/2, và riêng chuyện GOAWAY thì thật sự rất đáng để các bạn đào sâu. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
