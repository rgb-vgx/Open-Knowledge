# 🧪 Phát thư đầu tiên: gửi email đồng bộ để kiểm chứng

> Nguồn: `060-Sending-a-message-synchronously.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32250808)

Mailer đã dựng xong và mình "nghĩ" nó chạy được — nhưng nghĩ thì không đủ, phải **kiểm chứng**. Bài này mình gửi email theo cách **đồng bộ** (synchronously) trước, để chắc chắn mọi thứ hoạt động, rồi mới chuyển sang goroutine ở bài sau. Một route test nhỏ thôi, nhưng là cột mốc đáng nhớ đấy.

### 🧪 Route test

Trong file routes (`root.go`), mình thêm một route `test-email` cùng handler viết ngay tại chỗ, nhận response writer và request như mọi handler khác.

### ⚙️ Khai báo `Mail` với cấu hình hard-code

Vì đang test nên mình hard-code hết các giá trị:

* `Domain`: `localhost`.
* `Host`: `localhost` — email sẽ đi qua **MailHog** đang chạy trong Docker images.
* `Port`: `1025` — cổng SMTP của MailHog.
* `Encryption`: `none` — vì đang phát triển.
* `FromAddress`: một địa chỉ kiểu `info@mycompany.com`, `FromName`: `info`.
* `Wait` và `DoneChan`: để trống vì chưa dùng tới.
* `ErrorChan`: khởi tạo bằng `make(chan error)`.

### ✉️ Message tối giản và gọi `sendMail`

Message chỉ cần đủ trường tối thiểu: `To` là một địa chỉ email, `Subject` là `test email`, `Data` mang giá trị `hello world`. Sau đó mình gọi `m.sendMail(msg, m.ErrorChan)` — truyền message và error channel vào.

Khi mở handler này (giả sử Docker images với MailHog đang chạy nền), mình kỳ vọng: **màn hình trắng**, nhưng email được gửi đi. Nghe hơi ngược đời, mà đúng là vậy — handler không render gì cả, nó chỉ gửi mail.

### 📥 Chạy thử và mở MailHog

1. Trong terminal, chạy `make start` — nếu app đang chạy thì `make restart`.
2. Mở trình duyệt, reload trang chủ để chắc mọi thứ ổn.
3. Truy cập đường dẫn `/test-email` → màn hình trắng.
4. Mở MailHog ở `localhost:8025` — và kìa, email đã nằm trong hộp thư!

Trong MailHog có **hai phiên bản** của cùng một email: một bản định dạng HTML, một bản text.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao phải gửi đồng bộ trước khi chuyển sang bất đồng bộ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để xác minh mailer hoạt động thật, rồi mới đưa nó vào chạy nền bằng goroutine.

Giải thích: Nếu gửi trực tiếp còn không chạy thì gửi trong goroutine càng khó gỡ lỗi.

Tham chiếu: Đoạn mở bài.

</details>

**Câu 2:** MailHog lắng nghe SMTP ở cổng nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cổng `1025`.

Giải thích: Đây là cổng SMTP mặc định của MailHog, còn giao diện web ở cổng 8025.

Tham chiếu: Mục Khai báo Mail.

</details>

**Câu 3:** Sau khi truy cập `/test-email`, màn hình hiển thị gì và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Màn hình trắng — bình thường, vì handler không render gì, nó chỉ gửi email.

Giải thích: Dấu hiệu thành công không nằm ở trình duyệt mà ở hộp thư MailHog.

Tham chiếu: Mục Message tối giản.

</details>

**Câu 4:** Trong MailHog, mình thấy gì sau khi gửi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hai phiên bản của cùng một email: một bản HTML và một bản text.

Giải thích: Đúng như thiết kế trong `sendMail`: plain text là body chính, HTML là alternative.

Tham chiếu: Mục Chạy thử và mở MailHog.

</details>

**Câu 5:** Bước tiếp theo sau khi xác minh email chạy được là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chuyển sang gửi email bằng goroutine trong background.

Giải thích: Đây chính là mục tiêu của cả section này.

Tham chiếu: Đoạn kết bài.

</details>

Vậy là từ giờ mình đã biết chắc: email gửi thật được. Bước tiếp theo — đúng như tên section — là đẩy nó vào background bằng goroutine. Hẹn gặp lại các bạn ở bài sau! 🚀

## Nguồn tham khảo

- [MailHog — GitHub](https://github.com/mailhog/MailHog)
