# 🔀 switch — Khi nào nên dùng thay cho if/else?

> Nguồn: `063-More-on-if-and-else-and-introducting-switch.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162254)

Game rock paper scissors của chúng ta đang tiến triển tốt, và các bạn đã hiểu cách `if`/`else` vận hành. Hôm nay mình giới thiệu thêm một thuật ngữ mới: **câu lệnh `switch`** — một biến thể của `if`/`else`, phù hợp hơn khi có nhiều biểu thức Boolean cần kiểm tra.

Chúng ta sẽ làm hai việc: dùng `switch` để in ra lựa chọn của máy tính, rồi dùng nó để xác định ai thắng ván đấu.

---

### 🎯 In lựa chọn của máy tính bằng switch

Hiện tại trong hàm `main`, chúng ta đang: seed bộ sinh số ngẫu nhiên, khởi tạo vài biến, quyết định lựa chọn của máy tính ở dòng 25, rồi đọc dữ liệu để biết người chơi chọn gì.

Mình bỏ phần in ở cuối đi và thay bằng việc in ra lựa chọn của máy tính. Có thể làm bằng `if computerValue == 0`, rồi `else if computerValue == 1`... nhưng đây đúng là cơ hội tuyệt vời để học `switch`.

`switch` hoạt động như thế này: từ khóa `switch`, rồi **switch trên một biến** — ở đây là `computerValue` — tiếp theo là cặp ngoặc nhọn. Bên trong, chúng ta liệt kê các **`case`** có thể xảy ra:

```go
switch computerValue {
case ROCK:
	fmt.Println("computer chose rock")
	break
case PAPER:
	fmt.Println("computer chose paper")
	break
case SCISSORS:
	fmt.Println("computer chose scissors")
	break
}
```

Với mỗi `case`, chúng ta viết dấu hai chấm rồi tới các lệnh cần làm. Ở đây mình in ra máy tính đã chọn gì, sau đó gõ `break` để thoát khỏi `switch`. À, các bạn để ý là **không có dấu chấm phẩy** nhé — mình gõ `break` rồi gõ dấu `;` theo phản xạ thôi, vì nhiều ngôn ngữ lập trình khác yêu cầu dấu chấm phẩy, còn Go thì không.

Còn một câu lệnh nữa có thể đặt trong `switch`, đó là **`default`** — trường hợp mặc định, chạy khi không `case` nào khớp. Ở ví dụ này mình để nó rỗng vì không có tình huống nào khác ngoài ba lựa chọn kia, nhưng **để `default` ở đó vẫn là thói quen tốt**.

Sau đó, để chương trình biên dịch được, mình vẫn phải xử lý biến `playerValue` — nên mình in nó ra. Các bạn thử chạy `go run main.go`: máy tính chọn rock, còn `playerValue` là `0`. Vậy là `switch` đã hoạt động.

---

### 🏆 Xác định người thắng bằng if và switch

Ví dụ trên hơi đơn giản, nên giờ ta làm phức tạp hơn: xác định ai thắng ván đấu.

Đầu tiên là một câu `if`: nếu `playerValue` bằng `computerValue` thì in ra `it's a draw` — hòa. Nếu không hòa, mình dùng `switch` trên `playerValue`, với ba `case` là `ROCK`, `PAPER`, `SCISSORS`:

* **`case ROCK`**: nếu `computerValue` là `PAPER` thì giấy thắng đá — máy tính thắng. Ngược lại, người chơi thắng.
* **`case PAPER`**: nếu `computerValue` là `SCISSORS` thì kéo cắt giấy — máy tính thắng. Ngược lại, người chơi thắng.
* **`case SCISSORS`**: nếu `computerValue` là `ROCK` thì đá làm cùn kéo — máy tính thắng. Ngược lại, người chơi thắng.
* **`default`**: in ra `invalid choice`, vì nếu người chơi không nhập rock, paper hay scissors thì hẳn là họ gõ thứ gì đó không hợp lệ.

Mình copy các khối logic này cho ba `case` và sửa lại cho phù hợp. Lại thêm mấy dấu chấm phẩy "theo phản xạ" nữa — mình gõ xong lại phải xóa đi.

---

### 🧪 Chạy thử bốn tình huống

Mình chạy `go run main.go` và thử lần lượt:

1. Nhập `rock` → computer chose scissors, **player wins**. Đá làm cùn kéo, hợp lý.
2. Nhập `scissors` → computer chose paper, **player wins**. Hai trên hai, mình chơi giỏi thật!
3. Nhập `paper` → **it's a draw**.
4. Nhập `fish` → computer chose rock, **invalid choice**.

---

### 🧠 Vì sao switch chỉ chạy đúng một case?

Ví dụ trên cũng cho thấy cách `switch` hoạt động. Mình switch trên `computerValue` — một số nguyên. Nếu số nguyên đó là `ROCK`, tức hằng số `0`, chương trình in ra một dòng rồi `break`; nếu là `PAPER`, tức `1`, in dòng khác rồi `break`; nếu là `SCISSORS`, tức `2`, cũng tương tự. `break` đưa chương trình **nhảy thẳng ra khỏi** `switch`.

Giống như chỉ một nhánh `else` được chạy trong chuỗi `if`, trong `switch` cũng **chỉ một `case`** được chạy mà thôi. Các ngôn ngữ khác xử lý chuyện này khác một chút — họ cho phép `switch` khớp nhiều điều kiện cùng lúc, ví dụ vừa bằng `1` vừa lớn hơn hoặc bằng `1`. Nhưng Go không như vậy: Go cố gắng giữ mọi thứ **đơn giản nhất có thể**, nên chỉ một `case` được khớp.

Nếu không `case` nào khớp, phần nằm sau từ khóa `default` sẽ được chạy. Để `default` rỗng thì không có gì xảy ra; còn trong game của chúng ta, nếu người chơi nhập sai thì `default` in ra `invalid choice`.

| Tiêu chí | `if` / `else if` | `switch` |
|---|---|---|
| Phù hợp khi | Ít nhánh điều kiện | Nhiều nhánh, cùng so sánh một giá trị |
| Số nhánh được chạy | Một nhánh `true` đầu tiên | Một `case` khớp đầu tiên |
| Nhánh mặc định | `else` (nếu có) | `default` ở cuối danh sách case |
| Độ dễ đọc | Rối khi có nhiều nhánh | Gọn gàng, dễ đọc hơn |
| Thoát nhánh | Không cần | Dùng `break` để nhảy ra ngoài `switch` |

---

### 🏋️ Challenge: chơi đúng ba ván

Hiện tại game chỉ chạy **một lần** rồi kết thúc. Nhiệm vụ của các bạn lần này là:

* Sửa chương trình để nó chơi **đúng ba ván** rồi mới thoát.
* Nói cách khác, các bạn sẽ chơi game ba lần, sau đó chương trình kết thúc.

Nghe có vẻ phải lặp lại phần thân trong hàm `main` ba lần — *việc này không khó lắm đâu, các bạn cứ thử sức nhé.* Lời giải của mình sẽ có ở bài tiếp theo! 🚀
