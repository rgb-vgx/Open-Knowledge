# 🧰 Helper function: gửi email chỉ còn đúng một dòng

> Nguồn: `062-Writing-a-helper-function-to-send-email-easily.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32252108)

Code gửi email trong nền đã chạy, nhưng còn một "cơn đau" nhỏ: mỗi lần gửi, ta phải nhớ tăng WaitGroup lên một — mà đây đúng là kiểu việc mình **hay quên nhất**. Thay vì tự trách bản thân, mình viết luôn một helper function để mọi chuyện diễn ra tự động. Ngắn thôi, vài phút là xong.

### 🧠 Vì sao cần helper?

Nhớ lại luồng hoạt động: khi có message gửi vào `app.Mailer.MailerChan`, listener goroutine sẽ fire off `sendMail` như một goroutine riêng. Nghĩa là **mỗi lần** gửi message vào channel, ta cần **tăng WaitGroup thêm 1** — nếu quên thì "bad things will happen", chuyện chẳng lành sẽ tới. WaitGroup ở đây chính là `app.Wait`, được lấy từ application config rồi truyền vào mailer.

Và thành thật với các bạn: mình là người **chắc chắn sẽ quên** việc này. Nên cách tốt nhất là để code tự lo, thay vì trông chờ vào trí nhớ. *Các bạn cũng sẽ thấy đây là mẹo rất đáng bắt chước: việc gì dễ quên, hãy để hàm lo giúp.*

### 📄 `helper.go` — wrapper nhỏ, lợi ích lớn

Trong folder `cmd/web`, mình tạo file mới `helper.go`, `package main`, với đúng một hàm:

```go
func (app *config) sendEmail(msg Message) {
	app.Wait.Add(1)
	app.Mailer.MailerChan <- msg
}
```

Hàm có receiver `app *config`, nhận một tham số `msg Message` và không trả về gì. Bên trong chỉ có hai dòng:

1. `app.Wait.Add(1)` — tăng WaitGroup, không bao giờ quên nữa.
2. `app.Mailer.MailerChan <- msg` — đẩy message vào channel để listener xử lý.

### ✅ Gửi email giờ chỉ một dòng

Từ giờ, muốn gửi email ở bất kỳ đâu trong ứng dụng, mình chỉ cần gọi `app.sendEmail(msg)`. Không phải nhớ WaitGroup, không phải đụng tới channel — mọi thứ đã được gói gọn.

*Một hàm "dead simple" đúng nghĩa, nhưng sẽ tiết kiệm cho các bạn kha khá thời gian gỡ lỗi về sau.*

Giờ thì mang helper này ra dùng thử thôi: bài sau mình gửi email thông báo khi người dùng đăng nhập sai. Hẹn gặp lại các bạn! 🚀
