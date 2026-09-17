# 🌐 Hết cổng TCP: câu chuyện thật về ephemeral ports và cú "đơ" của web server

Mình luôn tin rằng **bug chính là thứ làm nên trải nghiệm của một kỹ sư phần mềm** — chính khoảnh khắc va phải bug, vượt qua nó và xử lý nó là phần thú vị nhất của nghề. Có bug bạn sửa được, có bug bạn chỉ work around, có bug tự nhiên biến mất vì những thứ chẳng liên quan gì tới nó.

Hôm nay mình muốn kể các bạn nghe về một bug cực kỳ thú vị mà mình chưa từng gặp trước đây, chỉ mới va phải trong vài tháng gần đây: **hết sạch ephemeral ports (cổng tạm thời)** trong TCP connection. Nghe khó tin đúng không, vì có tới khoảng 65.000 cổng — nhưng các bạn hoàn toàn có thể chạm ngưỡng đó nếu viết code kém hiệu quả. *Và trong ca này, chính mình là người viết code kém hiệu quả đó.*

### 🧩 Hệ thống và triệu chứng của bug

Hệ thống mình gặp khá đơn giản, chỉ có hai mảnh ghép quan trọng:

* Một **web server** công khai nhận connection từ client (browser, cuộc gọi, mọi thứ).
* Một **message broker** nhận job/message do web server đẩy sang, sau đó được xử lý bởi các service downstream.

Sau một vài commit được đẩy lên repo, hệ thống vẫn chạy rất mượt: request được xử lý nhanh, gửi gì trả về nấy. Nhưng sau vài nghìn request — không có con số chính xác — **web server ngừng phản hồi hoàn toàn**. Client chờ mãi rồi bỏ cuộc (client timeout), và vì có proxy đứng giữa nên còn sinh thêm proxy timeout, khiến vấn đề trông mơ hồ hơn.

Nếu gọi trực tiếp vào web server sau ngưỡng đó, request cứ xử lý mãi không xong; thỉnh thoảng trả về sau vài phút rồi chết hẳn. Thử lại thì chạy được, rồi lại sập. Một hành vi rất khó chịu.

---

### 🔍 Điều tra: nguyên tắc của mình là không nhảy vào repo trước

Mình thường **không mở source code hay comment trong repo đầu tiên**, dù chúng có thể chỉ ra ngay lỗi nằm ở đâu. Với mình đó là bước cuối. Việc đầu tiên phải là điều tra vấn đề — thậm chí **black box testing**: chỉ nhìn vào hành vi của hệ thống như một chiếc hộp và xem nó giao tiếp với nhau thế nào. Mình có cả một khóa học chuyên về troubleshooting backend application, và đây chính là quy trình mình dạy ở đó.

Vào web server, mình gõ `netstat` để xem toàn bộ connection. Và mình thấy **một cơn lũ connection đi ra** từ web server tới message broker — điều hoàn toàn bất thường:

* Về lý thuyết chỉ cần **1 connection**, vì message broker này hỗ trợ **multiplexing (ghép kênh)** — gửi nhiều request đồng thời trên cùng một connection.
* Kể cả khi hệ thống quá tải thì cùng lắm là 2.
* Nhưng mình thấy **10.000, rồi 20.000 connection** mỗi khi hệ thống sập. Đó là hồi chuông báo động.

Biết thủ phạm rồi vẫn chưa đủ. Câu hỏi mình luôn đặt ra là **"tại sao"** — vì sao nhiều connection lại làm web server chết? *Đây là bản tính của mình, và nó giúp mình hiểu tận gốc thay vì chỉ revert commit cho xong.*

---

### 🌐 Giải mã ephemeral ports: vì sao chỉ có khoảng 25.000 kết nối?

Để hiểu bug, phải hiểu TCP. Khi một client kết nối tới server, nó kết nối tới **IP và port nổi tiếng** (ví dụ HTTPS port 443). Sau bước DNS, bạn có thể nhận về nhiều IP nhờ redundancy, nhưng cuối cùng vẫn chỉ chọn một. Vậy ta biết:

* **Source IP** — IP của bạn (tạm bỏ qua NAT cho đơn giản).
* **Destination IP và destination port** — cố định theo server.

Thứ duy nhất biến thiên là **source port**, và kernel có nhiệm vụ gán ngẫu nhiên một cổng trong dải **ephemeral ports (cổng tạm thời)** để hoàn thiện bộ bốn thông tin (four-tuple) của connection. Với IPv4, dải này là **32.768 đến 60.999** — khoảng 30.000 cổng trong tổng số chừng 65.000, và vấn đề bắt đầu xuất hiện quanh mốc 20.000–25.000. Con số này khớp với những gì mình quan sát được.

Trong hệ thống của mình, ba thông tin đều cố định: source IP là web server, destination IP và destination port là của message broker. Nghĩa là chỉ còn **khoảng 20.000–25.000 cổng nguồn** để tạo connection từ web server sang broker — nghe ít, nhưng hợp lý vì cả hai đầu đều cố định.

Còn phía client kết nối vào web server thì **không bao giờ là vấn đề**: dù destination IP và port của web server cố định, nhưng source IP thay đổi liên tục — 100.000 client thì mỗi client một connection với một IP khác nhau, nên có thể "quẩy" thoải mái. Các dải ephemeral ports cũng khác nhau giữa Windows, Linux và các kernel khác.

---

### 🐛 Gốc rễ: mỗi request một connection mới, cộng thêm ping-pong keep-alive

Bug nằm trong logic kết nối tới message queue của web server. Đúng ra nó phải **tìm connection đang có và tái sử dụng**; nếu chưa có thì mới tạo mới. Nhưng trong ca này, **mỗi request lại tạo một connection mới** rồi để đó.

Đáng lẽ các connection idle sẽ tự chết sau một thời gian nhờ TCP timeout — nhưng có một thứ làm mọi chuyện tệ hơn: **custom client logic cố tình giữ connection sống** bằng cơ chế kiểu **ping-pong**. Đây là **keep-alive ở tầng application (L7)**, *không phải* TCP keep-alive của kernel — tức là ứng dụng gửi qua lại những gói gần như rỗng, kiểu "tao vẫn ở đây, tao vẫn dùng kết nối này", chỉ để duy trì kết nối. Chính những "chatter" vô nghĩa đó khiến số connection không bao giờ được giải phóng, vừa tốn tài nguyên vừa thêm overhead.

Khi chạm ngưỡng ephemeral port, request mới **mắc kẹt ngay trong kernel** — không thể tạo nổi connection. Trong khi đó, request ở web server là **synchronous (đồng bộ)**, tức là **blocking**: nó chờ cho tới khi nhận được phản hồi từ message queue mới mở block và trả kết quả về client. Thế là rơi vào bế tắc: *không thể trả lời client cho tới khi có phản hồi từ message queue, mà không thể tạo connection để gửi sang message queue.*

Web server "phát điên", rồi các ứng dụng khác bắt đầu hỏng theo vì chúng cũng cần kết nối tới máy đó và cũng tiêu tốn ephemeral ports. Kết quả: một bug lan dây chuyền rất "đẹp".

---

### 💡 Cách sửa và những cạm bẫy ai cũng có thể gặp

Sau khi xác định được bệnh, mình sửa đúng chỗ: **tái sử dụng connection đang có** thay vì luôn tạo mới. Hệ thống trở về với **một connection duy nhất đẹp đẽ** — chỉ một resource mà đi được rất xa.

Hóa ra đây không phải vấn đề hiếm gặp: **Cloudflare có hẳn một bài blog** về việc hết ephemeral ports, và mọi thứ có thể diễn biến rất xấu. Vài điểm cần lưu ý:

* **Trên cùng một máy sẽ tệ hơn**: ví dụ loopback `127.0.0.1` kết nối tới port 80 local, source port cũng nằm trên `127.0.0.1`, dẫn tới hết ephemeral ports cho cả kết nối loopback. Mình khuyên hạn chế dùng TCP/IP cho loopback khi có thể, dùng IPC thay thế — nhưng đôi khi không thể, nhất là khi làm side proxy: container chia sẻ loopback và cần kết nối lẫn nhau để sidecar proxying hoạt động, lúc đó buộc phải dùng TCP/IP.
* **Kết nối tới port đích khác** (ví dụ FTP port 21, SSH port 22) về lý thuyết có thể tái sử dụng ephemeral ports vì đó là **tuple khác** — nhưng một số kernel **không cho phép**, vì điều đó đôi khi làm hỏng ứng dụng: nhiều ứng dụng coi source port là duy nhất độc lập, chứ không xét theo cả tuple. Điều này khiến bài toán thậm chí còn thú vị hơn.

Bug này là minh chứng rõ nhất cho triết lý của mình: viết code xong không có nghĩa là hiểu hệ thống. Hiểu TCP ở mức "under the wire" sẽ giúp các bạn nhìn ra ngay cái bẫy "mỗi request một connection" — trước khi nó làm sập production của bạn. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
