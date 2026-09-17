# 📖 Đọc và Gửi Dữ Liệu Trên Socket: Chặng Cuối Trước Khi Request Chạm Tới Code Của Bạn

Chúng ta đã nói về SYN queue, accept queue và cách backend nhận connection — nhưng lúc đó chưa có một byte dữ liệu nào được truyền đi, mới chỉ là thiết lập connection. Giờ là lúc nói về việc **đọc và ghi dữ liệu trên socket (ổ cắm mạng)**: đọc request để hiểu khách hàng muốn gì, ghi response để trả lời. Đây chính là điểm giao thoa mà **công việc của kernel kết thúc** và **công việc của backend process bắt đầu**.

Nhiều bạn sẽ nói: "Mình có làm mấy thứ này đâu?" Đúng — vì **library làm hộ các bạn**. Nhưng biết library làm gì và mình làm gì là điều bắt buộc nếu muốn debug được latency và performance. Đi thôi!

### 📥 Receive buffer: kernel nhận dữ liệu thay bạn như thế nào?

Khi client gửi dữ liệu trên một connection đã thiết lập, nó bắt đầu write vào **socket connection file descriptor (bộ mô tả file của socket)** của mình. Ở phía backend, dòng chảy diễn ra như sau:

1. **NIC** (network interface controller, card mạng) nhận frame, parse frame và giao phần dữ liệu cho OS dưới dạng **IP packet**.
2. OS parse tiếp để tìm port — lưu ý **port nằm trong segment chứ không nằm trong IP packet**.
3. Kernel match connection với **receive buffer (bộ đệm nhận)** tương ứng và đặt dữ liệu vào **receive queue**. Kernel làm việc này **không cần app yêu cầu** — nó cứ nhận rồi cất đó cho backend process tiêu thụ.
4. Kernel **acknowledge (xác nhận)** dữ liệu và cập nhật **flow control window (cửa sổ điều khiển luồng)**. Nếu **delayed acknowledgement (acknowledgement trì hoãn)** được bật, kernel sẽ không ack từng byte một mà chờ thêm dữ liệu rồi ack một lần.

Ví dụ mình hay dùng: receive buffer giới hạn **1000 byte**, vừa nhận **500 byte** — nhưng không còn đúng 500 byte trống, vì bản thân data structure còn chiếm chỗ cho metadata. Kernel sẽ báo cho client: "Tôi chỉ còn chừng này chỗ thôi" và window thu nhỏ lại. Tại sao buffer đầy? **Vì backend process lười — nó chưa chịu gọi read.** Và nếu buffer hết chỗ, kernel **drop packet** luôn: "Xin lỗi, hết chỗ". Đó là lý do **application phải gọi read càng nhanh càng tốt** để giải phóng receive queue. Client chậm, backend chậm — tất cả đều trả giá.

---

### 🧩 Gọi read: một lần copy từ kernel sang userspace — và giấc mơ zero copy

Khi app gọi `read`, dữ liệu được **copy từ receive buffer (kernel space) vào memory của process (userspace)**. Process có vùng memory riêng; một khi dữ liệu đã sang đó, kernel có thể giải phóng vùng nhớ của mình.

Nghe ổn, nhưng có vấn đề: **copying rất tốn kém**. Từng lần chỉ vài microsecond, nhưng cộng dồn lại thì phần lớn thời gian có thể bị "đốt" vào việc copy. Các kỹ sư kernel hiểu điều đó — mới chỉ trước đây không lâu còn có patch tối ưu cho Linux kernel, và tại thời điểm ghi bài này (tháng 10/2022) đang có đề xuất dùng **zero copy (không copy)**: thay vì copy dữ liệu, cho backend **trỏ thẳng vào vùng nhớ shared (chia sẻ)** giữa kernel và userspace. Chúng ta vẫn chưa hoàn hảo, và còn rất nhiều việc phải làm ở tầng này.

---

### 🔐 Sau khi copy: decrypt TLS rồi parse HTTP

Dữ liệu vừa copy chỉ là **một đám bytes thô**. Và mặc định thì nó còn **được mã hóa** nữa. Symmetric key (khóa đối xứng) để decrypt do **backend giữ** — đây không phải việc của kernel. Bạn dùng OpenSSL, LibreSSL, wolfSSL hay bất kỳ TLS library nào cũng được; ngay cả HTTP library bạn import cũng dùng TLS library bên dưới.

Quy trình thực tế trong backend:

1. **Decrypt** nội dung bằng symmetric key — đây là CPU work thật sự.
2. **Parse HTTP/1.1**: thấy `GET /...`, rồi đọc từng header. Gặp `Content-Length: 10` thì biết cần đọc thêm 10 byte nữa.
3. Library kiểu Express **wired một event** cho request, tạo **request object** và populate headers vào đó.
4. Cuối cùng — sau từng ấy công đoạn — backend developer mới nhận được thông báo: "Có request mới đây!" và thấy một object JSON xinh xắn.

*Các bạn thấy chưa — chỉ để có được cái request đó, biết bao nhiêu việc phải xảy ra. Đừng bao giờ coi đó là hộp đen.*

---

### ⚡ Đọc bất đồng bộ: select, epoll, io_uring và completion port

Nếu buffer đang rỗng mà bạn gọi read thì bạn sẽ **bị block (chặn)**: OS đưa process ra khỏi CPU và bạn không execute được gì cả. Đây là lúc **select**, **epoll** (Linux), **IO completion port** (Windows) và **io_uring** xuất hiện:

* **Readiness model (mô hình sẵn sàng) — epoll/select:** bạn đưa cho OS một loạt file descriptors và nói "khi nào bất kỳ cái nào ready thì báo tôi". Process chỉ read khi thật sự có dữ liệu, nên không lãng phí thời gian copy trong lúc chờ.
* **io_uring:** bạn đưa yêu cầu read vào một **ring**, kernel làm hộ, và khi xong thì dữ liệu được đặt vào **vùng shared giữa kernel và userspace** — nhờ vậy zero copy mới khả thi.

---

### 📤 Gửi dữ liệu: send buffer, MSS và Nagle's algorithm

Muốn trả response, app gọi kiểu `response.end()` hoặc `write` — nhưng dòng chảy bên dưới mới thú vị:

1. Library chuẩn bị dữ liệu, **mã hóa bằng TLS**, rồi mới gọi `send` xuống OS.
2. Dữ liệu lại được **copy từ process memory sang kernel space** (send buffer) — lại một lần copy tốn kém nữa.
3. Kernel **không gửi ngay**. Nó chờ đủ dữ liệu để lấp đầy **MSS (maximum segment size, kích thước segment tối đa)** vì lý do hiệu quả.

Đây là lúc **Nagle's algorithm (thuật toán gộp gói tin)** phát huy "tác dụng": bạn gõ `ls` rồi Enter — chỉ vài byte dữ liệu, trong khi mỗi TCP segment mang theo tới **40 byte header** (TCP + IP). Gửi từng byte một là lãng phí băng thông kinh khủng, nên Nagle nói: "Chờ đã, chờ thêm dữ liệu rồi gộp lại mà gửi". Chính vì ghét sự chờ đợi này mà **curl đã tắt Nagle's algorithm** — họ nói thẳng: "Tôi biết mình đang làm gì, có dữ liệu thì gửi ngay". Bản chất đây là cuộc đánh đổi giữa **efficiency (hiệu quả băng thông)** và **latency (độ trễ)** — và là lựa chọn của cả backend lẫn client. Mình sẽ có hẳn một bài riêng về Nagle's algorithm ở cuối section này.

Và nhớ nhé: **send gần như là bất đồng bộ**. Gọi send không có nghĩa dữ liệu đã bay đi ngay — kernel đợi đủ dữ liệu, gửi đi, client ack xong mới có thể bỏ nó khỏi buffer. Đó là **sliding window (cửa sổ trượt)** mà chúng ta đã bàn ở phần TCP.

Tóm lại, cả hai chiều đều có thể vỡ: nếu backend **không đọc đủ nhanh**, receive buffer đầy → kernel hết chỗ → drop packet → client chịu khổ và chậm dần. Nghe có vẻ OS sẽ không bao giờ "bỏ rơi" bạn, nhưng đây là khóa intermediate-to-advanced — chúng ta phải nói cả những điều không vui này.

Các bạn đã hiểu kernel đọc/ghi hộ mình những gì. Bài tiếp theo, mình sẽ đặt tên và tách vai cho từng phần công việc đó: **listener (bộ lắng nghe)**, **acceptor (bộ chấp nhận kết nối)** và **reader**. Hẹn gặp lại! 🚀
