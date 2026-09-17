# 🧵 Single Listener, Acceptor and Reader: Kiến Trúc Một Thread "Cân" Mọi Connection Của Node.js

Pattern đầu tiên, đơn giản nhất, cũng là pattern làm nên tên tuổi của Node.js: **một listener, một acceptor, và cũng chính nó là reader**. Nghe có vẻ liều lĩnh, nhưng nó hoạt động tốt đến mức cả một hệ sinh thái xây trên nó. Cùng mình mổ xẻ nhé.

### 🟢 Node.js: một process làm cả ba vai

Node.js là ví dụ hoàn hảo: **single listener, single acceptor, và cùng là reader** — tất cả trong **một process duy nhất**, thực chất là **single-threaded (đơn luồng)**.

Diễn biến trong kiến trúc đó:

* Backend application là **một process duy nhất**; phía trước vẫn là client, kernel và các queue mà chúng ta đã bàn.
* Process này gọi listen — kernel tạo **accept queue** và các buffer (bộ đệm) cho nó, rồi nó ngồi lắng nghe.
* Khi một connection tới, **cũng chính process này accept** — mấy "chấm xanh" trong sơ đồ của mình chính là các connection.
* Cũng chính process này **read từ tất cả các connection** — read, read, read liên tục.
* Nhờ vậy nó **quản lý được rất nhiều connection** mà kiến trúc vẫn chỉ là một process làm cả ba việc.

Làm sao một thread đọc nổi hàng tá connection? Nhờ **epoll** — mô hình asynchronous socket reading chúng ta đã bàn: "Đây là một loạt file descriptor, hãy báo cho tôi khi có cái nào ready". Trong Node.js, điều này xảy ra **hoàn toàn phía sau hậu trường** — backend developer viết Node không phải tự tay làm, mọi thứ diễn ra tự động.

---

### 😬 Vấn đề: một thread không thể "chiều" quá nhiều connection cùng lúc

Kiến trúc đẹp ở độ đơn giản, nhưng có cái giá:

* Khi số connection tăng, process này trở nên **chatty (nói chuyện quá nhiều)** — nó phải quay sang tiếp chuyện với từng connection.
* Việc đọc từ tất cả connection **không thật sự fair (công bằng)** — connection này có thể được phục vụ nhanh, connection khác phải chờ.
* Hệ quả là **OS bị ứ**: cả **receive queue lẫn accept queue đều có thể đầy**, vì một thread đơn độc không thể theo kịp tốc độ dữ liệu đổ về.
* Nói cách khác: càng nhiều connection, process này càng dễ trở thành **nút thắt cổ chai** ngay bên trong lòng OS.

*Biểu hiện ra ngoài của tất cả những điều này rất đơn giản: app chậm, request chờ lâu — trong khi CPU của bạn vẫn... nhàn rỗi. Đó là kiểu vấn đề khó đoán nhất.*

*Nghe có vẻ nghiêm trọng, nhưng cộng đồng Node.js có một câu trả lời cực kỳ thanh lịch.*

---

### 🚀 Cách "scale" đặc sản của Node.js: spin thêm process

Giải pháp không nằm ở việc thêm thread phức tạp, mà là: **spin up thêm Node process**.

* Bạn có thể chạy **5 process Node**, mỗi process vẫn **single-thread** như cũ.
* Mỗi process tự listen/accept/read độc lập — không phải đấu tranh với mutex hay multi-threading rối rắm.
* Nhờ vậy bạn vẫn khai thác được **nhiều core của CPU**, và toàn bộ OS là tài nguyên chung để các process chia nhau.
* Mỗi process vẫn giữ nguyên "bộ não" đơn giản của mình — không mutex, không chia sẻ state phức tạp giữa các thread.

Triết lý ở đây rất rõ: **giữ mọi thứ đơn giản, nhân bản thay vì làm phức tạp**. *Đó là lý do mình rất thích Node.js — nó khiến bài toán khó trở nên dễ suy luận.*

*Một điều thú vị: giải pháp cho vấn đề "một thread quá tải" hóa ra không phải là làm thread đó thông minh hơn, mà là... chạy thêm vài bản sao của nó. Đôi khi cách giải quyết đơn giản nhất lại là cách hiệu quả nhất.*

Đổi lại, mỗi connection thuộc về đúng một process, và các process không chia sẻ connection với nhau — chi tiết này rất quan trọng khi ta bước sang các pattern tiếp theo.

Pattern "một thread cho tất cả" đã rõ. Nhưng nếu thay vì nhân bản process, ta **nhân bản reader bên trong process** thì sao? Đó là nội dung bài tiếp theo — **single listener, acceptor với nhiều reader**. Hẹn gặp lại! 🚀
