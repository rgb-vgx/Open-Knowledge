# 🧯 Dọn dẹp lúc shutdown: tắt ứng dụng mà không bỏ rơi email nào

> Nguồn: `064-Adding-cleanup-tasks-to-the-shutdown-function.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32252140)

Mọi thứ đã gần hoàn hảo: email chạy nền, helper gọn gàng, handler đã gọi gửi thư. Nhưng còn mảnh ghép cuối — **dọn dẹp khi tắt ứng dụng**. Nếu bỏ qua bước này, người dùng có thể bấm Ctrl+C và... đúng lúc đó một email đang bay dở sẽ chết lặng lẽ. Hôm nay mình hoàn thiện `shutdown()`, rồi chạy thử toàn bộ dây chuyền để xem thành quả.

### 🧹 `shutdown()` — nơi dọn dẹp

Trong `main.go`, gần cuối file là hàm `shutdown` — hàm được `listenForShutdown` gọi khi ứng dụng nhận tín hiệu dừng. Đây là chỗ ta thực hiện các việc cleanup.

Ở đó đã có sẵn đoạn chờ cho **WaitGroup rỗng** — tức là đợi mọi email đang gửi xong. Việc cần thêm là xử lý bộ ba channel của mailer.

### 🚪 Done channel — nhưng đặt ở đâu mới đúng?

Ý tưởng đầu tiên: gửi `true` vào `app.Mailer.DoneChan` để báo cho listener goroutine dừng lại. Nghe hợp lý, nhưng khoan — mình muốn các bạn tự hỏi: **nên đặt dòng này ở đây, hay để sau?**

Nghĩ kỹ sẽ thấy: mình đang **block cho tới khi WaitGroup rỗng**, tức là chờ gửi xong hết email. Nếu báo dừng goroutine quá sớm thì email còn đang xếp hàng sẽ không được xử lý nữa. Nên tín hiệu dừng **phải diễn ra sau khi đã gửi xong mọi email** — không phải đặt lên trước.

### 📪 Đóng các channel

Sau khi đã chờ xong và báo dừng, ta đóng toàn bộ channel — đặt ngay sau đoạn comment nói về việc đóng channel:

```go
app.Wait.Wait()

app.Mailer.DoneChan <- true

close(app.Mailer.MailerChan)
close(app.Mailer.ErrorChan)
close(app.Mailer.DoneChan)
```

Thứ tự rất rõ ràng: **chờ** → **báo dừng** → **đóng channel**. Vậy là ứng dụng có thể tắt một cách êm ái, không bỏ rơi công việc nào.

### 🧪 Chạy thử: đăng nhập sai và soi MailHog

Giờ đến phần thú vị nhất:

1. Trong terminal, gõ `make restart` — nếu app đang chạy thì nó khởi động lại, và Docker images vẫn chạy nền phía sau.
2. Mở trình duyệt, reload trang cho chắc mọi thứ hoạt động.
3. Đăng nhập bằng địa chỉ hợp lệ `admin@example.com` nhưng gõ **sai mật khẩu** (mình gõ đại chữ `wrong`) → nhận thông báo `invalid credentials`.
4. Mở tab MailHog đang chạy song song — và kìa: **email "failed login attempt"** đã nằm trong hộp thư!

Email hiện lên với bản HTML được format đàng hoàng — *ừ thì chưa lung linh như mình muốn, nhưng muốn đẹp cỡ nào là do mình chỉnh template* — kèm cả bản plain text. Mọi thứ chạy đúng như thiết kế.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao tín hiệu dừng qua `DoneChan` phải đặt sau khi chờ WaitGroup rỗng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mình đang block chờ gửi xong mọi email; báo dừng quá sớm sẽ khiến công việc còn xếp hàng không được xử lý.

Giải thích: Thứ tự đúng là chờ → báo dừng → đóng channel.

Tham chiếu: Mục Done channel.

</details>

**Câu 2:** Trong `shutdown()`, những channel nào được đóng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cả ba: `MailerChan`, `ErrorChan` và `DoneChan`.

Giải thích: Đóng sau khi đã gửi tín hiệu dừng cho listener goroutine.

Tham chiếu: Mục Đóng các channel.

</details>

**Câu 3:** Nếu bỏ qua cleanup này thì hậu quả là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Công việc đang chạy nền hoặc đang xếp hàng có thể chết lặng lẽ khi ứng dụng dừng.

Giải thích: Đó là lý do section này đặt mục tiêu "tắt app mà không bỏ rơi việc gì".

Tham chiếu: Đoạn mở bài.

</details>

**Câu 4:** Trong màn demo, MailHog nhận được gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Email "failed login attempt" với hai phiên bản: HTML format đàng hoàng và plain text.

Giải thích: Kết quả của việc đăng nhập sai mật khẩu với `admin@example.com`.

Tham chiếu: Mục Chạy thử.

</details>

**Câu 5:** Sau section này, khóa học sẽ làm gì tiếp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cài đặt logic cho người dùng đăng ký và subscribe một trong ba dịch vụ, rồi quay lại với nhiều logic concurrent hơn.

Giải thích: Đây là các task còn đang comment trong `handlers.go`.

Tham chiếu: Đoạn kết bài.

</details>

Vậy là dây chuyền gửi email bất đồng bộ đã hoàn chỉnh từ đầu tới cuối: channel, goroutine, xử lý lỗi, và cleanup lúc tắt. Bài sau chúng ta sẽ cho người dùng đăng ký và chọn gói dịch vụ — rồi sau đó là thêm nhiều logic concurrency thú vị nữa. Hẹn gặp lại các bạn! 🚀
