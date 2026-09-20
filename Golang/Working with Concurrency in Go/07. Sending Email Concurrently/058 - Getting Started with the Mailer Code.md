# 📮 Dựng bộ khung mailer: type Mail, type Message và hàm sendMail

> Nguồn: `058-Getting-started-with-the-mailer-code.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32188454)

Chúng ta đã biết mục tiêu: gửi email **bất đồng bộ** qua goroutine. Nhưng muốn gửi bất đồng bộ thì trước hết… phải gửi được email đã. Trong bài này, mình dựng file `mailer.go` với hai type nền tảng `Mail` và `Message`, rồi viết hàm `sendMail` để có thể gửi email theo cách đồng bộ trước, sau đó mới chuyển sang chạy nền. Hơi dài một chút, nhưng mọi thứ về sau đều xoay quanh hai type này, nên các bạn chịu khó đi cùng mình nhé.

### 📦 Hai package giúp việc gửi mail "đỡ đau"

Trong folder `cmd/web`, mình tạo file `mailer.go`, `package main`. Về lý thuyết có thể làm tất cả bằng thư viện chuẩn, nhưng có hai package sẽ khiến việc gửi email nhẹ nhàng hơn hẳn:

* **`github.com/vanng822/go-premailer/premailer`** — chuyên **inline CSS** (đưa CSS vào thẳng thẻ HTML), giúp email HTML tương thích với nhiều email client khác nhau.
* **`github.com/xhit/go-simple-mail/v2`** — package gửi mail thực thụ. Nhớ kỹ: **dùng v2**, kể cả khi v3 đã ra nhé.

```bash
go get github.com/vanng822/go-premailer/premailer
go get github.com/xhit/go-simple-mail/v2
```

Một lưu ý nhỏ ở phần import: phải chắc chắn package mail đang dùng đúng bản **v2**, vì thiếu `/v2` là mọi thứ lệch ngay.

### 🖥️ `type Mail` — mô tả mail server

Type đầu tiên mô tả **mail server** mà ta sẽ kết nối tới:

* `Domain` (string) — chạy local là `localhost`, còn production bạn sẽ gắn email với một domain cụ thể.
* `Host` (string) — mail host đang dùng.
* `Port` (int) — cổng mail server lắng nghe.
* `Username`, `Password` (string) — tài khoản đăng nhập server.
* `Encryption` (string) — server có mã hóa không. Production **gần như chắc chắn là có**, còn khi phát triển thì không.
* `FromAddress`, `FromName` (string) — địa chỉ và tên người gửi mặc định; email gửi đi luôn phải đến từ ai đó.
* `Wait *sync.WaitGroup` — "đồ nghề" concurrency, chưa dùng ngay nhưng sẽ dùng sớm thôi.
* `MailerChan chan Message`, `ErrorChan chan error`, `DoneChan chan bool` — cũng chưa dùng ngay: một channel nhận email cần gửi, một channel hứng lỗi, một channel để tắt.

### ✉️ `type Message` — mô tả một email cụ thể

Type thứ hai mô tả **nội dung một email**:

* `From`, `FromName` (string) — để **ghi đè** người gửi mặc định khi cần.
* `To` (string) — gửi cho ai.
* `Subject` (string) — tiêu đề email.
* `Attachments []string` — danh sách đường dẫn đầy đủ của file đính kèm; là slice nên có thể đính kèm nhiều file.
* `Data` (kiểu `any`) — nội dung thân email. Nếu bạn dùng Go cũ hơn 1.18 thì viết `interface{}`, công dụng tương đương.
* `DataMap map[string]any` — cách tiện để đưa dữ liệu vào template sẽ render.
* `Template` (string) — template nào dùng để render email.

Mình để sẵn một comment làm dấu: sẽ có một hàm **lắng nghe message trên mailer channel**, để viết sau.

### 🛠️ `sendMail` — từ template tới lúc gửi

Hàm có receiver `m *Mail`, nhận vào `msg Message` và `errorChan chan error` (mọi lỗi đều đẩy vào channel này).

**1. Dùng template mặc định.** Nếu `msg.Template` rỗng, gán thành `"mail"` — khớp với hai file có sẵn trong folder templates: `mail.html.gohtml` và `mail.plain.gohtml`. Từ đây đã thấy ý đồ: mỗi email sẽ gửi **hai phiên bản**, plain text cho mọi email client trên đời, và HTML đẹp đẽ cho số đông còn lại.

**2. Dùng người gửi mặc định.** Nếu `msg.From` rỗng thì lấy `m.FromAddress`; nếu `msg.FromName` rỗng thì lấy `m.FromName`.

**3. Chuẩn bị dữ liệu cho template.** Template cần dữ liệu nằm trong key tên `message`:

```go
data := map[string]any{
    "message": msg.Data,
}
msg.DataMap = data
```

**4. Gọi hai hàm build.** `m.buildHTMLMessage(msg)` và `m.buildPlainTextMessage(msg)` — lúc này mình mới khai báo **stub** (hàm rỗng) trả về `""` và `nil`, để bài sau hoàn thiện. Có lỗi thì đẩy thẳng vào `errorChan`.

**5. Kết nối SMTP server.** Tạo `mail.NewSMTPClient()` rồi gán Host, Port, Username, Password, `Encryption = m.getEncryption(m.Encryption)`. Tiếp theo: `KeepAlive = false` (vì đâu phải giây nào cũng gửi mail), `DisconnectTimer` và `SendTimeout` đều là `10 * time.Second`. Gọi `server.Connect()` để có client — lỗi thì vào `errorChan`.

**6. Soạn và gửi email:**

```go
email := mail.NewMSG()
email.SetFrom(msg.From)
email.AddTo(msg.To)
email.SetSubject(msg.Subject)
email.SetBody(mail.TextPlain, plainMessage)
email.AddAlternative(mail.TextHTML, formattedMessage)
```

Body chính là bản plain text; bản HTML được thêm vào như **alternative**. Nếu `len(msg.Attachments) > 0`, mình range qua slice và gọi `email.Attach(x)` cho từng file. Cuối cùng là `email.Send(client)`, lỗi vẫn đẩy vào `errorChan`.

### 🔐 `getEncryption` — chuỗi nhập vào, hằng số trả ra

Package mail quy định sẵn các hằng số mã hóa, nên mình viết một hàm nhỏ nhận chuỗi và trả về đúng hằng số:

* Giá trị **TLS** → `mail.EncryptionSTARTTLS`.
* Giá trị **`ssl`** → `mail.EncryptionSSLTLS`.
* Giá trị **`none`** → `mail.EncryptionNone` (đúng thứ ta dùng khi phát triển).
* Không khớp gì cả → mặc định `mail.EncryptionSTARTTLS`, vì đây là kiểu phổ biến nhất, "far and away".

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao cần package premailer khi gửi email HTML?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nó inline CSS, giúp email HTML tương thích hơn với nhiều email client.

Giải thích: Đây chỉ là package tiện ích; thư viện chuẩn vẫn gửi được nhưng sẽ vất vả hơn.

Tham chiếu: Mục Hai package giúp việc gửi mail "đỡ đau".

</details>

**Câu 2:** Package gửi mail thực thụ tên gì và dùng phiên bản nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `github.com/xhit/go-simple-mail/v2` — dùng v2 kể cả khi v3 đã ra.

Giải thích: Import thiếu `/v2` sẽ khiến mọi thứ lệch ngay.

Tham chiếu: Mục Hai package giúp việc gửi mail "đỡ đau".

</details>

**Câu 3:** Khi message không chỉ định template, mặc định là gì và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mặc định là `"mail"`, vì tên này khớp cả hai file `mail.html.gohtml` và `mail.plain.gohtml`.

Giải thích: Nhờ đó một email gửi đi có cả bản HTML lẫn bản plain text.

Tham chiếu: Mục sendMail.

</details>

**Câu 4:** Hai dạng nội dung được đưa vào email như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Plain text đặt làm body chính bằng `SetBody(mail.TextPlain, plainMessage)`, HTML thêm vào bằng `AddAlternative(mail.TextHTML, formattedMessage)`.

Giải thích: Mọi email client đều đọc được plain text; phần lớn client hiển thị bản HTML.

Tham chiếu: Mục sendMail.

</details>

**Câu 5:** `getEncryption` trả về gì với các giá trị `none`, `ssl` và trường hợp không khớp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `none` → `mail.EncryptionNone`; `ssl` → `mail.EncryptionSSLTLS`; không khớp gì → mặc định `mail.EncryptionSTARTTLS`.

Giải thích: STARTTLS là kiểu phổ biến nhất trong thực tế.

Tham chiếu: Mục getEncryption.

</details>

Khung đã vững: mail server, message, kết nối SMTP, gửi mail. Còn hai hàm build message vẫn đang là stub — bài sau mình hoàn thiện chúng và cho **inline CSS** vào cuộc. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [vanng822/go-premailer — GitHub](https://github.com/vanng822/go-premailer)
- [xhit/go-simple-mail — GitHub](https://github.com/xhit/go-simple-mail)
