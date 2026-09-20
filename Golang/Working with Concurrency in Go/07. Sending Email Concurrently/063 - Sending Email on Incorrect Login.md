# 🕵️ Bắt quả tang đăng nhập sai: gửi email cảnh báo trong nền

> Nguồn: `063-Sending-an-email-on-incorrect-login.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32252610)

Đã đến lúc mang "vũ khí" mới ra dùng thật: gửi email bằng concurrency code. Chỗ hợp lý nhất để thử là hàm xử lý đăng nhập — khi người dùng gõ sai mật khẩu, ta gửi một email cảnh báo. Và các bạn để ý nhé, mình còn cố tình "phanh" lại một nhịp trước khi chạy: liệu đã đủ điều kiện để chạy code concurrent cho tử tế chưa?

### 🔍 Điểm chèn lý tưởng: `postLoginPage`

Trong `handlers.go`, hàm `postLoginPage`, mình kéo xuống đoạn có comment **check password**. Ở đó, việc đầu tiên là lấy giá trị `validPassword` bằng cách gọi method `passwordMatches` có sẵn trên type `user`.

Có hai lần kiểm tra lỗi, và mình xử lý khác nhau:

* **Lần kiểm tra lỗi thứ nhất** — chỉ để xem có trục trặc gì khi gọi hàm không. Khi nó fail, ta **không biết** mật khẩu đúng hay sai, nên mình bỏ qua, không làm gì cả.
* **Lần thứ hai** — lúc này đã có `validPassword` trong tay, nghĩa là biết chắc người dùng gõ đúng hay sai mật khẩu. Nếu `validPassword` là `false` → gửi email thông báo.

*Ghi chú nhỏ cho môi trường production: các bạn nên đếm số lần đăng nhập sai và chỉ gửi email sau lần thứ ba, chứ không phải lần nào cũng gửi. Ở đây mình gửi ngay để... tiện test thôi!*

### 📧 Soạn email "failed login attempt"

Đến phần dùng helper. Đầu tiên tạo một biến `Message`:

* `FromName` và `From` để **trống** — dùng giá trị mặc định từ mailer.
* `To` là người dùng vừa đăng nhập sai: dùng biến `email` đã lấy được từ trước đó trong hàm.
* `Subject`: `failed log in attempt`.
* `Data`: nội dung `invalid login attempt`.

Bạn có thể đặt thông điệp chi tiết, "sang" hơn — nhưng mục tiêu chính là thử xem cơ chế chạy được không.

### 🚀 Gọi helper — và email bay đi trong nền

Giờ thì chỉ còn một dòng:

```go
app.sendEmail(msg)
```

Message được đẩy vào mailer channel, listener bắt lấy và fire off goroutine gửi email. Nếu mọi thứ thuận lợi, người dùng đăng nhập sai sẽ nhận được cảnh báo mà trang web vẫn mượt, không phải chờ.

### 🧠 Khoan chạy đã — còn thiếu gì?

Trước khi bấm nút, mình muốn các bạn tự hỏi: **"Đã làm đủ mọi thứ để viết code concurrent cho tử tế chưa?"** Đừng chạy vội, cứ nghĩ thử.

Câu trả lời là: chưa. Quay lại `main.go`, trong hàm `main` có `listenForShutdown`; khi nhận tín hiệu `SIGINT` hoặc `SIGTERM`, nó gọi `app.shutdown()` — nơi thực hiện các việc dọn dẹp. WaitGroup đang chờ là tốt, nhưng vẫn còn **cleanup cần làm thêm**: báo cho listener goroutine dừng và đóng các channel lại. Mình sẽ xử lý ở bài sau, rồi mới chạy thử để xem mọi thứ có hoạt động thật không.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao bỏ qua lần kiểm tra lỗi thứ nhất của `passwordMatches`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì khi hàm fail ở bước này, ta chưa biết mật khẩu đúng hay sai — chưa có cơ sở để gửi thông báo.

Giải thích: Chỉ đến lần kiểm tra thứ hai, khi đã có `validPassword`, ta mới biết chắc.

Tham chiếu: Mục Điểm chèn lý tưởng.

</details>

**Câu 2:** Khi nào email cảnh báo được gửi đi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi `validPassword` là `false`, tức người dùng gõ sai mật khẩu.

Giải thích: Đây là điểm chèn để tận dụng concurrency code vừa xây.

Tham chiếu: Mục Điểm chèn lý tưởng.

</details>

**Câu 3:** Ở production nên làm khác gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nên đếm số lần đăng nhập sai và chỉ gửi email sau lần kiểm tra thứ ba (hoặc tương tự).

Giải thích: Tránh gửi mail cho mỗi lần gõ nhầm; ở đây gửi ngay là để tiện test.

Tham chiếu: Mục Điểm chèn lý tưởng.

</details>

**Câu 4:** Trường nào của message được để trống và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `From` và `FromName` — để dùng giá trị mặc định từ mailer.

Giải thích: `sendMail` đã có logic tự điền người gửi mặc định khi các trường này rỗng.

Tham chiếu: Mục Soạn email.

</details>

**Câu 5:** Trước khi chạy thử, còn thiếu việc gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cleanup trong `shutdown()`: báo cho goroutine listener dừng lại và đóng các channel.

Giải thích: WaitGroup đang chờ là tốt, nhưng chưa đủ để tắt ứng dụng gọn gàng.

Tham chiếu: Mục Khoan chạy đã.

</details>

Mọi mảnh ghép đã nằm đúng chỗ, chỉ còn thiếu mảnh cuối: dọn dẹp lúc shutdown. Bài sau mình hoàn thiện nốt rồi chạy thử đăng nhập sai để xem email bay vào MailHog thế nào. Hẹn gặp lại các bạn! 🚀
