# ⚔️ Mang logic Rock Paper Scissors vào web — package `rps` đầu tiên

> Nguồn: `093-Implementing-the-rock-paper-scissors-logic.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162392)

Chào các bạn! HTML đã xong, giờ là lúc mang **bộ não của game** từ bản console vào phiên bản web. Thay vì gõ lại từ đầu, chúng ta sẽ tái sử dụng chính code cũ — *đúng tinh thần "one problem, one solution" mà mình luôn nhắc các bạn*. Đi từng bước nhé.

### 🎮 Handler mới cho đường dẫn `/play`

Trong `main.go` của project web, mình tạo hàm `playRound` — mỗi lần chơi một ván trên website, đây là thứ sẽ được gọi. Nó cũng là một **handler**, nên nhận đúng hai tham số quen thuộc:

```go
func playRound(w http.ResponseWriter, r *http.Request) {
}
```

Rồi trong `main`, mình đăng ký thêm route `http.HandleFunc("/play", playRound)` ngay trước route trang chủ. Nghĩa là khi ai đó vào `địa-chỉ-server/play`, hàm `playRound` sẽ xử lý. Hiện tại nó chưa làm gì cả — nhưng chúng ta đã có **đường đi** tới nơi diễn ra trận đấu.

---

### 📦 Tạo package `rps` — tái sử dụng code bản console

Mình không muốn gõ lại toàn bộ logic rock paper scissors từ đầu, nên: tạo thư mục mới tên `rps` (viết tắt của **rock paper scissors**) trong project web; tạo file `rps.go` với khai báo `package rps`; rồi mở lại project console cũ và copy phần **constants** trong `main.go` sang — mình biết sẽ cần dùng chúng.

Giờ mình viết hàm chơi một ván. Vì hàm này cần được gọi từ **package khác**, mình **bắt đầu bằng chữ in hoa** — nhớ lại bài *Exported vs Unexported* nhé, quy tắc cũ vẫn đúng ở đây. Hàm sẽ trả về **ba giá trị**: một số nguyên (ván đó hòa, người chơi thắng hay máy thắng), một chuỗi (máy đã chọn gì, ví dụ "computer chose rock") và một chuỗi nữa (kết quả ván đấu). Để code biên dịch được ngay, mình tạm trả về `0, "", ""` — chạy được đã, logic tính sau — *cách làm rất hiệu quả khi bạn mới bắt đầu, đừng ngại.*

---

### 🎲 Gieo xúc xắc cho máy và xác định ai thắng

Quay lại bản console: có mấy thứ chúng ta **bỏ qua** vì web không cần — xóa màn hình, đọc input bằng `bufio`, in hướng dẫn, hay kiểm tra lựa chọn của người chơi. Nhưng **random number generator** thì chắc chắn phải mang theo. Mình gõ tay dòng này để VS Code tự thêm import giúp:

```go
rand.Seed(time.Now().UnixNano())
```

Hàm `PlayRound` nhận **một tham số duy nhất**: `playerValue` kiểu `int`. Trên trang web, mỗi nút bấm mang một giá trị số — `0`, `1`, `2` ứng với rock, paper, scissors — và con số đó được truyền vào. Sau khi gieo xúc xắc, mình khởi tạo biến `computerChoice` kiểu string rỗng rồi gán thông báo kiểu `"computer chose rock"` để lát nữa hiển thị lên trang.

Phần "ai thắng" mình copy từ bản console sang và chỉnh lại: thay vì in ra màn hình, mình **gán vào biến `roundResult`** (khởi tạo chuỗi rỗng) — nếu `playerValue` bằng giá trị của máy thì là *"it's a draw"*, hai nhánh còn lại dùng đúng **phép modulus** đã làm ở bản console để gán *"player wins"* hoặc *"computer wins"*. Vì không còn vòng lặp, mình xóa luôn biến đếm `i` và nhánh xử lý giá trị `-1` (phần kiểm tra input nhập sai) — không cần thiết nữa.

Cuối cùng, mình định nghĩa ba hằng số biểu diễn kết quả:

```go
const (
    playerWins   = 1
    computerWins = 2
    draw         = 3
)
```

Các giá trị này **hoàn toàn tùy ý**. Trong hàm, mình khai báo `winner` kiểu `int` khởi tạo bằng `0`, gán `winner` bằng `draw`, `playerWins` hay `computerWins` tương ứng từng nhánh, rồi trả về cả ba giá trị: `winner`, `computerChoice`, `roundResult`.

---

### ✅ Chạy thử — trang trắng nhưng log biết ai thắng

Package đã xong nhưng chưa được ai gọi. Trong handler `playRound` ở `main`, mình gọi hàm vừa viết:

```go
winner, computerChoice, roundResult := rps.PlayRound(1)
log.Println(winner, computerChoice, roundResult)
```

Mình tạm truyền số `1` cho đủ tham số để biên dịch — lát nữa nó sẽ là lựa chọn thật từ người chơi.

Chạy `go run main.go`, mở trình duyệt vào `/play` — **màn hình trắng trơn, đúng như dự kiến** vì handler chưa ghi gì về trình duyệt. Nhưng nhìn xuống terminal thì thấy kết quả: `2 computer chose scissors computer wins`. Tải lại trang, log lại hiện `3 computer chose paper it's a draw`. Logic đã chạy chuẩn!

---

Logic game đã chạy đúng "sau hậu trường". Việc còn thiếu là để **trình duyệt và backend trò chuyện với nhau theo thời gian thực** — người chơi bấm nút, trang web gửi lựa chọn đi, và nhận kết quả về hiển thị ngay. Hẹn gặp lại ở bài tiếp theo! 🚀

## Nguồn tham khảo

- [pkg.go.dev — math/rand](https://pkg.go.dev/math/rand)
