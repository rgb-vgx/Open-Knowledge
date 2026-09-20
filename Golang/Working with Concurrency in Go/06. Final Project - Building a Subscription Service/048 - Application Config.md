# 🧰 Application Config: "trạm trung chuyển" của mọi thành phần

> Nguồn: `048-Setting-up-the-application-config.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32192620)

Chúng ta đã có session, đã có kết nối database. Hôm nay mình dựng **application config** — cấu trúc giúp mọi thành phần trong ứng dụng **chia sẻ** session, database, logger và WaitGroup với nhau. Đây là kiểu "một chỗ để tất cả cùng nhìn vào" rất quen thuộc với dân Go.

### 📄 Tạo `config.go`

Trong folder `cmd/web`, mình tạo file mới tên `config.go`, vẫn là `package main`, và định nghĩa một type tên `config` — một struct với vài field:

* `session` — con trỏ tới `scs.SessionManager`.
* `DB` — con trỏ tới `sql.DB`. *Có thể chưa dùng ngay, nhưng cứ để đó.*
* `infoLog` — con trỏ `log.Logger`, cách tiện lợi để ghi thông tin ra console hoặc file log.
* `errorLog` — cũng là `*log.Logger`.
* `Wait` — con trỏ tới `sync.WaitGroup`. Mình thấy "Wait" là một cái tên hay.

Type này sau đó sẽ được dùng làm **receiver** cho các hàm khác nhau, để chúng chia sẻ chung application config. Các field chắc chắn sẽ còn được thêm dần về sau.

### 🧩 Nối config vào `main()`

Quay lại `main.go`:

* Bỏ dòng `db.Ping()` vì sắp tới không cần nữa.
* Tạo **WaitGroup** tên `wg` với `sync.WaitGroup{}` — nhớ có cặp ngoặc nhọn nhé.
* Tạo biến `app` kiểu `config` và gán các field: `session`, `DB`, và con trỏ tới `wg`.

Tất nhiên lúc này `app` chưa được dùng nên chương trình **chưa compile** — nhưng chúng ta đang ở giữa công việc, sắp xong thôi.

### 📝 Thêm hai logger

Mình thêm comment `create loggers` rồi viết:

```go
infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
```

Giải thích nhanh:

* Ghi ra `os.Stdout`. **Trong production** bạn sẽ cho nó ghi ra file, nhưng hiện tại chưa phải production.
* Tiền tố `"INFO"` / `"ERROR"` kèm ký tự **tab**.
* Cả hai đều in **ngày và giờ** (`log.Ldate | log.Ltime`).
* Riêng error log có thêm **`log.Lshortfile`** — để biết lỗi xảy ra ở file nào.

Sau đó mình gán hai logger này vào `app.infoLog` và `app.errorLog`.

### 🧭 Tiếp theo là gì?

Application config đã có. Các bước tiếp theo theo đúng lộ trình:

1. Set up **mail** — gửi email khi có người mua subscription hoặc tạo tài khoản.
2. Tạo các **channel** — có thể làm cùng lúc với mail.
3. **Lắng nghe kết nối web** — cần một file `routes.go` dùng package `chi` đã import, và ít nhất một handler.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Type `config` dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Làm receiver để chia sẻ cấu hình ứng dụng (session, database, logger, WaitGroup) giữa các thành phần.

Giải thích: Thay vì truyền lắt nhắt từng thứ, mọi hàm đều có thể "nhìn" vào một config chung.

Tham chiếu: Mục Tạo config.go.

</details>

**Câu 2:** Field `Wait` có kiểu gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `*sync.WaitGroup`.

Giải thích: WaitGroup sẽ được dùng để đợi các goroutine xử lý xong trước khi ứng dụng thoát.

Tham chiếu: Mục Tạo config.go.

</details>

**Câu 3:** Vì sao error log có thêm `log.Lshortfile`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để biết lỗi xảy ra ở file nào.

Giải thích: Khi debug, biết vị trí phát sinh lỗi giúp tiết kiệm rất nhiều thời gian.

Tham chiếu: Mục Thêm hai logger.

</details>

**Câu 4:** Vì sao chương trình chưa compile sau bài này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì biến `app` chưa được sử dụng — sẽ dùng khi lắng nghe kết nối web.

Giải thích: Chúng ta đang xây dở từng bước; compile lỗi tạm thời là chuyện bình thường.

Tham chiếu: Mục Nối config vào main.

</details>

**Câu 5:** Bước tiếp theo sau application config là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Set up mail, tạo channels, và lắng nghe kết nối web với file routes dùng `chi` cùng ít nhất một handler.

Giải thích: Đây là các mảnh ghép còn thiếu để ứng dụng chạy thật sự.

Tham chiếu: Mục Tiếp theo là gì.

</details>

Vậy là chúng ta đã có một "trạm trung chuyển" gọn gàng cho toàn bộ ứng dụng. Bài sau, mình thêm route và handler để lần đầu tiên web server thật sự khởi động. Hẹn gặp lại các bạn! 🚀
