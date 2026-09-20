# 🌐 Nhập liệu console với package bên thứ ba đầu tiên — và bí mật của dấu gạch dưới

> Nguồn: `021-Console-Input-with-a-Package.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161880)

Chào các bạn! Hôm nay chúng ta viết một ứng dụng đọc ghi console "chỉn chu" hơn, rồi cùng mở cánh cửa bước vào thế giới **package bên thứ ba** — thứ sẽ theo các bạn suốt khi làm việc với Go. Mình đi thật chậm: tạo project, khởi tạo module, viết lại phần đọc input quen thuộc, rồi mới nâng cấp lên kỹ thuật lắng nghe phím bấm.

---

### 🛠️ Dựng project `console-app`

Mình mở Visual Studio Code, chọn **Open Folder**, tạo thư mục mới tên `console-app` rồi mở lên. Việc đầu tiên — như mình sẽ còn nhắc dài dài — là tạo thói quen khởi tạo Go module cho mọi project:

1. Mở terminal, chắc chắn con trỏ đang đứng trong thư mục sẽ chứa source code.
2. Gõ `go mod init myapp` (mình đặt tên app là `myapp`).
3. File `go.mod` xuất hiện — lần này chúng ta sẽ dùng đến nó.

Tiếp theo, tạo file `main.go` với `package main` và hàm `func main()` rỗng. Rồi chúng ta viết lại phần nhập liệu — đúng kiểu đã làm trong chương trình Eliza.

---

### 📥 Đọc input quen thuộc bằng `bufio`

Biến `reader` khai báo dạng ngắn, gán bằng `bufio.NewReader(os.Stdin)` — *đừng lo nếu `os.Stdin` còn lạ, cứ hiểu nôm na là "bàn phím của chương trình".* Visual Studio Code đôi khi "chưa tỉnh ngủ" không tự import `os` giúp mình, nên mình gõ tay thêm dòng import. Chuyện thường ngày, các bạn cứ bình tĩnh.

Rồi tới vòng lặp vô hạn, in một mũi tên `-> ` làm dấu nhắc, và đọc dữ liệu:

```go
reader := bufio.NewReader(os.Stdin)

for {
    fmt.Print("-> ")
    userInput, _ := reader.ReadString('\n')
    userInput = strings.Replace(userInput, "\n", "", -1)

    if userInput == "quit" {
        break
    }
    fmt.Println(userInput)
}
```

Vài điều cần giải thích cho rõ:

* `ReadString` nhận **một tham số** là delimiter (dấu phân cách) kiểu `byte` — vì là `byte` nên phải viết trong **nháy đơn**: `'\n'` chính là phím Enter. Hàm **trả về hai giá trị**: chuỗi vừa đọc (mình lưu vào `userInput`) và một `error` nếu có trục trặc.
* Dấu gạch dưới `_` nghĩa đen là: *"Mình không cần giá trị thứ hai, cứ vứt nó đi."* Chuyện xử lý lỗi tử tế mình sẽ bàn ở các bài sau.
* `strings.Replace(userInput, "\n", "", -1)` cắt ký tự Enter dính ở cuối câu — tham số `-1` nghĩa là thay thế ở **mọi nơi** nó xuất hiện.

Nếu người dùng gõ `quit` thì `break`; ngược lại chương trình in lại (echo) dữ liệu. Chạy `go run main.go`: gõ `hello` → in lại `hello`; `goodbye` → in lại; `quit` → kết thúc. Mọi thứ chạy đúng như mong đợi.

---

### 🌐 Package bên thứ ba đầu tiên — `keyboard`

Giờ là phần thú vị. Nếu chỉ muốn người dùng **bấm phím Escape** thay vì gõ `quit` rồi Enter thì phải làm sao? Go không có sẵn cách đọc một ký tự đơn rồi xử lý ngay — ít nhất là không dễ như C# hay C. Tự viết thì được, nhưng sẽ tốn khoảng **100 dòng code**. Đây đúng là cơ hội tuyệt vời để dùng package bên thứ ba lần đầu tiên.

Mình mở `github.com/eiannone/keyboard` — một package cộng đồng, import y hệt cách import từ thư viện chuẩn. Trang hướng dẫn cài ghi rõ: `go get -u github.com/eiannone/keyboard`. Mình copy, dán vào terminal rồi Enter.

Bên trái cửa sổ Explorer xuất hiện file mới `go.sum` — **bạn sẽ không bao giờ phải sửa file này**, Go tool chain tự quản lý. Mở `go.mod`, bạn thấy hai mục require: một từ GitHub (do nhà phát triển độc lập viết), một từ golang.org (do chính đội ngũ Go phát triển). Cả hai đều không cần bạn quản lý tay.

---

### 🔒 Mở keyboard, `defer` đóng — và vòng lặp chờ phím

Sau khi import `github.com/eiannone/keyboard`, VS Code hiện gạch ngoằn ngoèo vì ta import mà chưa dùng. Mình xóa hết code cũ, để lại `main` rỗng, rồi bắt đầu:

```go
err := keyboard.Open()
if err != nil {
    log.Fatal(err)
}
defer func() {
    _ = keyboard.Close()
}()
```

Giải thích từng phần:

* `keyboard.Open()` trả về một `error` — nếu có lỗi, `log.Fatal` in ra và dừng hẳn chương trình. `log` là package có sẵn trong thư viện chuẩn.
* `defer` là keyword mình chưa từng nhắc tới: phần đứng sau `defer` **không chạy ngay**, mà chạy khi hàm hiện tại (hàm chứa nó) kết thúc.
* Mình dùng một **hàm ẩn danh (anonymous function)** để gọi `keyboard.Close()` lúc chương trình kết thúc, và bỏ qua error khi đóng bằng dấu `_`. Mở gì thì đóng nấy — đây là pattern cực kỳ phổ biến trong Go.

Tiếp theo, in hướng dẫn rồi vào vòng lặp vô hạn gọi `keyboard.GetSingleKey()`:

```go
char, key, err := keyboard.GetSingleKey()
if err != nil {
    log.Fatal(err)
}
if key == keyboard.KeyEsc {
    fmt.Println("Program exiting.")
    break
}
```

`GetSingleKey` trả về **ba giá trị**: ký tự `char`, giá trị phím `key`, và `error`. `keyboard.KeyEsc` là một **constant** có sẵn trong package — đúng kiểu những constants ta từng dùng trong game đoán số. Nếu có lỗi, mình cũng `log.Fatal`; nếu phím là Escape thì in `Program exiting.` rồi thoát vòng lặp. Với các phím khác, mình in thông báo `You pressed` kèm ký tự hoặc giá trị phím tùy trường hợp.

Chạy thử `go run main.go`: bấm `t` → `You pressed 116`; bấm `f` → `You pressed 102`; bấm Enter → `You pressed 013`; bấm Escape → `You pressed 027` rồi `Program exiting.` và chương trình dừng lại. Những con số đó chính là mã ký tự — bài sau chúng ta sẽ dùng package `fmt` để in ra ký tự thật sự thay vì những con số khô khan này.

---

### ✅ Tự kiểm tra nhanh

**1. Vì sao `'\n'` phải đặt trong nháy đơn?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì delimiter của `ReadString` có kiểu `byte`, mà `byte` viết bằng nháy đơn — `'\n'` chính là phím Enter, còn nháy đôi dành cho `string`.
Tham chiếu: Mục "Đọc input quen thuộc bằng bufio".

</details>

**2. Dấu gạch dưới `_` khi gọi `ReadString('\n')` có ý nghĩa gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bỏ qua giá trị thứ hai (error) mà hàm trả về — `ReadString` trả về cả chuỗi và error, `_` nghĩa là "không cần giá trị này".
Tham chiếu: Mục "Đọc input quen thuộc bằng bufio".

</details>

**3. File `go.sum` có phải chỉnh sửa bằng tay không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — Go tool chain tự quản lý file này; bạn chỉ cần `go get` để thêm package, phần còn lại Go lo.
Tham chiếu: Mục "Package bên thứ ba đầu tiên".

</details>

**4. `defer` hoạt động như thế nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phần sau `defer` không chạy ngay, mà chạy khi hàm hiện tại kết thúc — nhờ vậy ta đóng keyboard đúng lúc mà không phải nhớ gọi thủ công.
Tham chiếu: Mục "Mở keyboard, defer đóng".

</details>

**5. Lệnh `go get -u github.com/eiannone/keyboard` dùng để làm gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tải (và cập nhật) package bên thứ ba về cho project — sau đó package xuất hiện trong `go.mod` và `go.sum`, sẵn sàng để import.
Tham chiếu: Mục "Package bên thứ ba đầu tiên".

</details>

---

Vậy là chúng ta đã biết import package bên thứ ba, mở/đóng tài nguyên bằng `defer`, và bắt trọn từng phím bấm. Bài tiếp theo, mình sẽ dùng kỹ thuật này để dựng một **menu cà phê** chọn bằng một phím, đồng thời làm quen với `rune` và một kiểu dữ liệu mới toanh: `map`. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [eiannone/keyboard — GitHub](https://github.com/eiannone/keyboard)
- [bufio — pkg.go.dev](https://pkg.go.dev/bufio)
- [os — pkg.go.dev](https://pkg.go.dev/os)
- [strings — pkg.go.dev](https://pkg.go.dev/strings)
- [log — pkg.go.dev](https://pkg.go.dev/log)
