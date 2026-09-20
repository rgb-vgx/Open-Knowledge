# 🛠️ Functions trong Go — variadic, naked return và "gắn" hàm vào type

> Nguồn: `035-Functions.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161980)

Reference type tiếp theo của chúng ta là **function** — thứ các bạn đã gặp nhiều lần. Nhưng lần này mình muốn chỉ cho các bạn thấy vài "ngóc ngách" thú vị: cách đặt tên cho giá trị trả về, hàm nhận số tham số tùy ý, và đặc biệt là cách **gắn hàm vào một type**. Đây là nền móng để chúng ta hiểu interface ở bài sau.

### 🔁 Ôn bài và "naked return"

Bắt đầu bằng hàm quen thuộc:

```go
func addTwoNumbers(x, y int) int {
    return x + y
}
```

Hàm nhận hai tham số `x`, `y` đều là `int` và trả về một `int`. Gọi trong `main` với `z := addTwoNumbers(2, 4)` rồi in `z`, ta được `6` — đúng như mong đợi.

Giờ là một biến thể kỳ lạ hơn một chút: mình có thể **đặt tên cho giá trị trả về** bằng cách viết `(sum int)`, rồi trong thân hàm gán `sum = x + y` và gọi `return` trống không. Cách này gọi là **naked return**.

Về mặt kỹ thuật thì các bạn **có thể** làm vậy. Nhưng thực tế gần như không ai dùng: chính các tác giả Go nói rằng chỉ nên dùng naked return cho **những hàm cực ngắn**, vì nó làm khả năng đọc code tệ đi. *Mình hoàn toàn đồng ý với họ.* Các bạn muốn dùng cũng được, nhưng thật sự không cần thiết.

### ➕ Variadic function — "bao nhiêu tham số cũng được"

Giờ đến phần hay hơn: mình tạo hàm `sumMany`, nhưng lần này có thể nhận **số lượng tham số tùy ý**. Cú pháp nằm ở dấu ba chấm `...`:

```go
func sumMany(nums ...int) int {
    total := 0
    for _, x := range nums {
        total = total + x
    }
    return total
}
```

Vì không biết trước sẽ có bao nhiêu số — có thể một, có thể 77 — mình khởi tạo `total` bằng `0`, rồi dùng vòng lặp `range` bỏ qua index và cộng dồn từng phần tử `x` vào `total`.

Gọi `sumMany(2, 3, 4, 5)` → tổng là `14`. Thêm `88`, `7` và `-5` vào danh sách, chạy lại → `104`. Cứ thoải mái nhét bao nhiêu số tùy thích.

Hàm kiểu này gọi là **variadic function**. Một lưu ý quan trọng:

* Tham số variadic **phải nằm ở cuối cùng** danh sách tham số.
* Trong danh sách chỉ được có **một** tham số variadic — không thể có hai.
* Lý do rất dễ hiểu: nếu không, trình biên dịch sẽ chẳng biết tham số nào thuộc về cái nào.

### 🐾 Method receiver — gắn hàm vào type

Đây là phần mình muốn các bạn chú ý nhất. Mình tạo một type:

```go
type animal struct {
    name         string
    sound        string
    numberOfLegs int
}
```

Rồi mình "gắn" hàm vào type đó bằng một thứ gọi là **receiver**:

```go
func (a *animal) says() {
    fmt.Printf("a %s says %s\n", a.name, a.sound)
}
```

Receiver `a` chính là con trỏ tới `animal`, đặt **ngay sau từ khóa `func`** và **trước tên hàm**. Nhờ vậy, mỗi khi ai gọi hàm này trên một biến kiểu `animal`, hàm sẽ dùng chính giá trị của biến đó. Trong thân hàm mình in `a.name` và `a.sound`.

Thử ngay trong `main`: tạo `var dog animal`, gán `dog.name = "dog"`, `dog.sound = "woof"`, `dog.numberOfLegs = 4`, rồi gọi `dog.says()`. *Để ý nhé — biến mà cũng có hàm riêng để gọi đấy!* Kết quả in ra "a dog says woof".

Các bạn có thể đã để ý dấu `%` lạ ở cuối dòng trong lần chạy đầu — đó là vì mình quên ký tự xuống dòng. Thêm nó vào là gọn gàng ngay.

Mình còn tạo thêm một animal nữa bằng cú pháp viết tắt:

```go
cat := animal{
    name:         "cat",
    sound:        "meow",
    numberOfLegs: 4,
}
```

Gọi `cat.says()` → "a cat says meow". Và mình viết thêm hàm `howManyLegs` — cũng dùng receiver `a *animal`, in ra dạng "a cat has 4 legs". Gọi `cat.howManyLegs()`, mọi thứ chạy trơn tru.

Tóm lại: **receiver là cách Go gắn hàm vào type**, và các bạn có thể gắn bao nhiêu hàm tùy thích. Cách này cực kỳ thông dụng, dễ hiểu và cực kỳ hiệu quả — khi sang **interfaces**, các bạn sẽ thấy nó phát huy sức mạnh.

| Loại hàm | Cú pháp | Ghi chú |
|---|---|---|
| Hàm thường | `func addTwoNumbers(x, y int) int` | Trả về bằng `return x + y` |
| Named return + naked return | `func ...(x, y int) (sum int)` rồi `return` | Làm được nhưng gần như không ai dùng; chỉ hợp hàm rất ngắn |
| Variadic | `func sumMany(nums ...int) int` | Nhận bao nhiêu tham số cùng kiểu cũng được; phải đặt cuối danh sách |
| Method receiver | `func (a *animal) says()` | Gắn hàm vào type; gọi qua `dog.says()` |

---

### ✅ Tự kiểm tra nhanh

**1. Naked return là gì và có nên dùng không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là việc đặt tên cho giá trị trả về rồi `return` trống. Làm được nhưng gần như không ai dùng.
Giải thích: Các tác giả Go khuyên chỉ dùng cho hàm cực ngắn vì làm giảm khả năng đọc code.
Tham chiếu: Mục "Ôn bài và naked return"

</details>

**2. Variadic function là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hàm nhận số lượng tham số tùy ý, khai báo bằng dấu `...` như `nums ...int`.
Giải thích: Ví dụ `sumMany(2, 3, 4, 5)` cho tổng `14`.
Tham chiếu: Mục "Variadic function"

</details>

**3. Ràng buộc của tham số variadic là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phải đặt ở cuối danh sách tham số, và mỗi danh sách chỉ được có một tham số variadic.
Giải thích: Nếu không, trình biên dịch không biết tham số nào thuộc về cái nào.
Tham chiếu: Mục "Variadic function"

</details>

**4. Receiver trong `func (a *animal) says()` nằm ở đâu và có ý nghĩa gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nằm ngay sau `func` và trước tên hàm; nó cho hàm dùng chính giá trị của biến kiểu `animal` khi được gọi.
Giải thích: Nhờ receiver, hàm trở thành "thuộc về" type và gọi được bằng `dog.says()`.
Tham chiếu: Mục "Method receiver"

</details>

**5. Mình có thể gắn bao nhiêu hàm vào một type?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bao nhiêu cũng được.
Giải thích: Ví dụ type `animal` có cả `says` và `howManyLegs`; cách này sẽ rất hữu ích khi học interfaces.
Tham chiếu: Mục "Method receiver"

</details>

---

Receiver là khái niệm đặc biệt quan trọng — *các bạn cứ gõ lại ví dụ vài lần là sẽ thấy nó tự nhiên ngay.* Bài tiếp theo chúng ta làm quen với **channels**, một trong những tính năng mạnh mẽ nhất của Go. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Package fmt](https://pkg.go.dev/fmt)
- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Udemy — Functions](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161980)
