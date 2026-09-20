# 🎮 Câu lệnh if — Bắt tay vào game rock paper scissors

> Nguồn: `061-if-statement.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162246)

Hôm nay chúng ta sẽ nhìn câu lệnh `if` kỹ càng hơn một chút. Các bạn đã gặp nó vài lần trong khóa học rồi, nhưng mình muốn cả lớp cùng chắc chắn về cách nó vận hành. Và để cho vui, chúng ta sẽ khởi động dự án **rock paper scissors (oẳn tù tì)** — dự án sẽ theo chúng ta suốt chương này.

Mình bắt đầu từ một cửa sổ Visual Studio Code trống, nên các bạn cứ mở máy lên và làm cùng mình nhé.

---

### 🗂️ Khởi động dự án rock paper scissors

Các bước mình làm lần lượt như sau:

1. Bấm nút **Open Folder**, tạo một thư mục mới tên là **rock paper scissors** rồi mở nó trong VS Code.
2. Mở cửa sổ terminal và chạy `go mod init` với tên module mình dùng — lệnh này tạo ra file `go.mod` cho dự án.
3. Tạo file mới tên `main.go`.

Trong phần **course resources (tài nguyên khóa học)** của bài này, các bạn sẽ thấy một file để tải về. Các bạn mở nó bằng trình soạn thảo yêu thích, copy toàn bộ nội dung rồi dán vào `main.go` — mình cũng vừa dán xong, và giờ chúng ta cùng đi qua từng phần của đoạn code này.

---

### 📦 Hằng số, biến và những bước chuẩn bị

Đoạn code khá đơn giản: vẫn là `package main` với các import quen thuộc, rồi tới phần hằng số. Lần này mình dùng một cú pháp hơi khác để khai báo ba hằng số ở cấp package:

```go
const (
	ROCK     = 0
	PAPER    = 1
	SCISSORS = 2
)
```

Các bạn để ý mình viết hoa tên hằng số. Đó là một **quy ước trong Go**: hằng số thường được viết toàn chữ hoa để các bạn dễ nhận ra và tránh vô tình thay đổi nó trong code — vì như các bạn biết, chương trình **không thể thay đổi giá trị của hằng số**.

Trong hàm `main`, mình lần lượt:

* Seed (khởi tạo hạt giống) bộ sinh số ngẫu nhiên bằng `time.Now().UnixNano()` để có số ngẫu nhiên "xịn".
* Khai báo hai biến: `playerChoice` là chuỗi rỗng và `playerValue` là số nguyên `int` bằng `-1`.
* Dùng package random để sinh số ngẫu nhiên cho lựa chọn của máy tính.

*À, mình phải thành thật xin lỗi các bạn một chút: ở chỗ sinh số ngẫu nhiên mình gõ nhầm số 3, đúng ra phải là số 2, và mình đã sửa lại ngay. Lỗi đánh máy nhỏ thôi, các bạn cứ thoải mái.*

Tiếp theo, như mọi khi, mình tạo một biến `reader` dùng package `bufio` để đọc dữ liệu nhập từ bàn phím. Rồi mình gọi hàm `clearScreen` — hàm này chỉ làm một việc là xóa cửa sổ terminal. Tùy hệ điều hành mà cách xóa khác nhau:

* Trên **Windows** là lệnh `cls`.
* Trên **Mac** là lệnh `clear`.

Mình quyết định bằng `runtime.GOOS` — một hằng số có sẵn mà chương trình Go nhận được lúc chạy, cho biết đang ở hệ điều hành nào. Nếu `runtime.GOOS` chứa chuỗi `windows` thì ta đang ở Windows, còn lại là Linux hoặc Mac. Sau khi xóa màn hình, chương trình in ra lời nhắc `Please enter rock paper or scissors`, đọc dữ liệu người dùng nhập (chờ ký tự xuống dòng) rồi cắt bỏ ký tự `\n` đó.

---

### 🔍 Câu lệnh if xuất hiện

Đây chính là lúc chúng ta dùng `if`. Mục tiêu: xem người chơi gõ gì, và nếu là `rock` thì gán `playerValue` bằng hằng số tương ứng, ở đây là `ROCK` — tức `0`.

```go
if playerChoice == "rock" {
	playerValue = ROCK
}
```

Rất đơn giản phải không? Câu lệnh `if` chỉ gồm **từ khóa `if`** theo sau là một **biểu thức Boolean**. Ở đây mình chỉ có một điều kiện duy nhất.

Rồi mình copy và dán thêm hai lần nữa: nếu người chơi gõ `paper` thì `playerValue` bằng hằng số `PAPER` (giá trị `1`), còn `scissors` thì bằng `SCISSORS` (giá trị `2`). Ba câu `if` này nằm lần lượt ở các dòng 35, 39 và 43 trong file.

*Tất nhiên, các bạn sẽ không viết code kiểu này trong dự án thật — mình cố ý làm vậy để bắt đầu thật chậm từ chính câu lệnh `if`.*

---

### 🖨️ In kết quả và chạy thử

Chương trình chưa hoàn chỉnh, nhưng chúng ta nên in ra chút thông tin để xem mọi thứ có chạy đúng không. Mình dùng `fmt.Println` để in một dòng trống trước — lý do là ở trên mình dùng `fmt.Print` cho câu hỏi, nên nếu không xuống dòng thì phần in ra sẽ dính ngay sau câu hỏi, trông không đẹp mắt chút nào.

Sau đó chương trình in ra `player chose` kèm `playerChoice` và `value is` kèm `playerValue`, rồi tới `computer chose` kèm `computerValue`.

Bây giờ chạy thử bằng `go run main.go`. Mình nhập `paper`. Kết quả hiện ra: *player chose paper và value là 1*, *computer chose 1*. Trong lần này hai bên hòa nhau.

Ở bài tới, mình sẽ chỉ các bạn **hai cách cải thiện** đoạn code này: một bằng `else` và một bằng `switch`. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [A Tour of Go — Flow control](https://go.dev/tour/flowcontrol/1)
- [The Go Programming Language Specification](https://go.dev/ref/spec)
