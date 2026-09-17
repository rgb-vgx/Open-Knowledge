# 🏎️ HTTPS over TCP với TLS 1.3 và 0-RTT: Gửi Request Trong Cùng Hơi Thở

Đây là một bài rất thú vị, và thật ra nó **đang ngày càng trở nên phổ biến**: **HTTPS over TCP với TLS 1.3 và 0-RTT (gửi dữ liệu ngay vòng đầu)**. Ý tưởng rất đơn giản: nếu trước đó client và server đã từng nói chuyện TLS với nhau, thì lần này chúng ta không bắt tay lại từ đầu nữa.

Điểm khác biệt so với TLS 1.3 "thường" nằm ở chỗ: lần này client không cần chờ đàm phán xong mới gửi dữ liệu — request được gửi ngay trong lượt **Client Hello** đầu tiên. Đó chính là ý nghĩa của cái tên **0-RTT (gửi dữ liệu ngay vòng đầu)**.

Nghe có vẻ mới, nhưng thực ra đây là kết quả tự nhiên của một câu hỏi rất cũ: nếu hai bên đã từng tin nhau, tại sao lần sau lại phải bắt tay từ số không?

### 🔁 Điều kiện tiên quyết: một phiên cũ và pre-shared key

Giả sử trước đây đã có một phiên TLS giữa client và server, và **server biết về phiên đó**. Khi ấy, một **pre-shared key (khóa chia sẻ trước)** có thể đã được chia sẻ cho client.

Khi client quay lại và **đưa ra một hint (gợi ý)** về key đó, server có thể dùng luôn key ấy và **bắt đầu mã hóa ngay lập tức** — không cần đàm phán lại từ đầu. Đây chính là bản chất của **session resumption (tái sử dụng phiên)**: phiên cũ được dùng lại thay vì xây mới từ số không.

Câu hỏi đặt ra rất tự nhiên: nếu key đã có sẵn trong tay cả hai bên, tại sao còn phải đàm phán lại làm gì? Đó chính là lúc 0-RTT phát huy tác dụng.

---

### 🏃 Client Hello và GET request trong cùng một hơi thở

Bước đầu vẫn không đổi vì chúng ta **vẫn chạy trên TCP**: vẫn phải làm **three-way handshake (bắt tay ba bước)**.

Nhưng rồi chuyện hay xảy ra:

1. Client gửi **Client Hello** kèm **TLS extension** tên là **pre-shared key**.
2. Ngay lập tức, nó dùng **symmetric key đã sinh sẵn** từ phiên trước để mã hóa luôn request.
3. Vậy là **Client Hello và GET request được gửi đi trong cùng một hơi thở**.

Phía server, nếu chấp nhận pre-shared key, nó sẽ đáp lại kiểu: "Ồ, anh này muốn resume phiên cũ đây mà. Được, tôi tin anh" — gửi **Server Hello** — và thực tế là nó **đã giải mã xong GET request** rồi.

Điểm mấu chốt nằm ở chữ "trong cùng một hơi thở": hai gói tin được gửi đi cùng nhau, không gói nào phải chờ gói kia.

Server xử lý request và kết thúc kết nối ngay tại đó. Bao nhiêu round trip tiết kiệm được hết.

Và đây là điều mình muốn các bạn để ý: server không hề chờ tới khi handshake kết thúc mới hiểu request — nó đã hiểu request ngay từ gói đầu tiên.

---

### ⏱️ Cả cuộc chơi chỉ là bài toán chờ đợi

*Mình muốn các bạn ghi nhớ điều này: toàn bộ câu chuyện HTTPS rốt cuộc chỉ là một bài toán chờ đợi — và chính **thời gian chờ là thứ giết chết chúng ta**.*

Vấn đề nằm ở **round trip time (thời gian một vòng khứ hồi)**: bạn gửi request, rồi phải **ngồi chờ** tới khi response về mới làm được việc tiếp theo. Đó là **latency (độ trễ)** — và chúng ta muốn cắt nó đi.

Nếu client gửi được dữ liệu **trước** — ngay trong vòng đầu tiên — thì tất nhiên response cũng về nhanh hơn, và độ trễ gần như biến mất.

Các bạn để ý nhé: 0-RTT **không xóa bỏ three-way handshake của TCP** — vì vẫn chạy trên TCP nên nó vẫn phải làm đủ. Cái được cắt bỏ là chặng chờ đàm phán TLS trước khi request lên đường.

Nói cách khác, tối ưu HTTPS thực chất là tối ưu số lần phải ngồi chờ.

Ở bài cuối của section, chúng ta sẽ đẩy ý tưởng này lên đỉnh cao: **0-RTT trên nền QUIC**. Hẹn gặp lại! 🚀
