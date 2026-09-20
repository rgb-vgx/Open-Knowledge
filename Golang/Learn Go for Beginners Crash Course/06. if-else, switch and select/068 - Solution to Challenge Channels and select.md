# ✅ Lời giải challenge — Đưa mọi thông báo đi qua channel

> Nguồn: `068-Solution-to-Challenge.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162286)

Các bạn làm challenge thế nào? Mình đoán là khi bắt tay vào, các bạn nhận ra nó **khó hơn một chút** so với tưởng tượng — và lý do nằm ở cách channel vận hành. Hôm nay mình sẽ đi qua lời giải của mình, và như thường lệ, mọi thay đổi đều nằm trong file `game.go`.

Trước khi bắt đầu, mình nhắc lại: trong source code, mỗi chỗ mình sửa đều được đánh dấu bằng **ba dấu sao** trong comment (mình thấy vài chỗ lỡ ghi hai dấu sao nên sửa lại cho nhất quán — chi tiết nhỏ thôi).

---

### 🧠 Vì sao challenge khó hơn bạn tưởng

Phần gây khó dễ nhiều nhất chính là việc **gửi thông tin trở lại channel** để báo cho chỗ đã gọi hàm rằng: channel đã làm xong việc của nó.

Nói cách khác, gửi thông báo đi mới chỉ là một nửa câu chuyện — các bạn còn phải báo hiệu rằng "xong rồi" để chương trình biết lúc nào có thể đi tiếp.

---

### 📨 Bí quyết: gửi tín hiệu "đã xong" về channel

Cách xử lý rất gọn: mình **gửi một chuỗi rỗng trở lại `g.DisplayChan`** ngay sau khi gửi nội dung cần in. Như vậy mọi thứ đã được xử lý xong xuôi.

Nghe đơn giản, nhưng nếu bỏ qua bước này thì chương trình có thể rơi vào tình trạng "dùng channel khi nó chưa in xong". Đó chính là lý do chúng ta cần tín hiệu phản hồi.

---

### 📖 Sprintf — in mà không in

Ở hàm `PrintIntro` (phần in hướng dẫn), thay vì gọi `fmt.Println` trực tiếp, mình dùng **`fmt.Sprintf`** để tạo ra chuỗi rồi gửi chuỗi đó vào display channel:

* `Sprintf` trả về một chuỗi, không in ra màn hình — đúng thứ chúng ta cần khi "đầu ra" phải đi qua channel.
* Sau khi gửi, mình **chờ** channel báo "đã xong" trước khi đi tiếp.

Mình làm y hệt như vậy trong hàm `PlayRound`: dùng `fmt.Sprintf` để dựng chuỗi, gửi vào display channel, rồi chờ channel xử lý xong. Và mình lặp lại cách làm này **nhất quán ở mọi chỗ khác** trong file `game.go` — đó chính là nội dung toàn bộ challenge.

---

### 🤝 So sánh lời giải của bạn và của mình

*Hy vọng các bạn cũng có một lời giải tương tự. Nếu các bạn làm theo cách hơi khác một chút thì cũng chẳng sao, miễn là chương trình chạy đúng kết quả.*

Điều mình khuyên các bạn làm là dành chút thời gian **so sánh lời giải của mình và của các bạn**, rồi tự đánh giá xem cách nào tốt hơn. Kỹ năng đọc code và cân nhắc giữa các lời giải cũng quan trọng không kém kỹ năng viết code.

Vậy là chúng ta đã xong phần channel và `select` với game rock paper scissors. Cùng nhìn lại toàn bộ chương trong bài **tổng kết** tiếp theo nhé. Hẹn gặp lại các bạn! 🚀
