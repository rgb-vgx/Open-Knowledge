# 🧾 Assignment operators — `x++`, `*=`, `/=` và điều Go nhất quyết nói "không"

> Nguồn: `078-Assignment-Operators.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162328)

Chào các bạn! Đây là bài cuối cùng của chương Operators, và mình muốn dành nó cho **assignment operators (toán tử gán)**. Chúng ta đã gặp chúng vài lần rồi, nhưng lần này mình sẽ điểm qua đầy đủ những toán tử bạn có thể dùng. Mình xóa sạch hàm `main`, xóa hàm cũ và cả import để bắt đầu lại từ con số không nhé.

---

### 🔄 Ôn lại `++` và `--`

Bắt đầu với biến `x` kiểu số nguyên:

```go
x := 12
x++
fmt.Println("x is now", x)
```

`x++` cộng 1 vào `x` — in ra **13**. Đổi thành `x--`, chương trình in ra **12**. Quá quen thuộc rồi, đúng không?

---

### ✖️ Nhóm gán rút gọn: `*=` và `/=`

Giữ nguyên `x`, mình tạo thêm biến `y`:

```go
y := 10
y *= 2
fmt.Println("y is now", y)
```

`y *= 2` lấy `y` nhân với 2 rồi **gán ngược lại** cho `y` — kết quả là **20**. Đổi thành `y /= 2`:

```go
y /= 2
fmt.Println("y is now", y)
```

`y` chia 2 và gán lại, còn **5**. Đây là những toán tử bạn sẽ thấy dùng rất thường xuyên trong code thực tế.

| Toán tử | Ý nghĩa | Ví dụ trong bài | Kết quả |
|---|---|---|---|
| `++` | Tăng thêm 1 | `x := 12; x++` | 13 |
| `--` | Giảm đi 1 | `x--` | 12 |
| `*=` | Nhân rồi gán | `y := 10; y *= 2` | 20 |
| `/=` | Chia rồi gán | `y /= 2` | 5 |

---

### 🚫 Vì sao `z := y -= 8` không chạy trong Go?

Ở nhiều ngôn ngữ khác, toán tử gán có một **tác dụng phụ ngoài ý muốn**. Ví dụ trong Java, nếu bạn viết kiểu "gán kết quả của `y -= 8` cho `z`" (mình dùng tạm syntax Go để minh họa), thì phép tính sẽ được gán cho `z` **đồng thời** giá trị của `y` cũng bị thay đổi — một phép toán ảnh hưởng tới hai biến.

Nếu bạn thử `z := y -= 8` trong Go, bạn sẽ nhận **lỗi biên dịch** ngay lập tức. Các tác giả của Go đã nhìn vào cách các ngôn ngữ khác xử lý và nói: *"Đó là ý tưởng tồi, chúng ta đừng làm vậy."* Nhờ thế, Go không cho phép kiểu viết gây nhầm lẫn này — và mình thấy đó thật sự là một điều tốt.

---

### 🧠 Chốt lại chương Operators

Vậy là chúng ta đã đi qua:

* Các toán tử gán quen thuộc như `++`, `--`, `*=`, `/=`;
* và cả những toán tử bạn có thể chưa từng thấy trước đây.

Hiểu cách chúng hoạt động là một chuyện — **hiểu precedence của chúng cũng quan trọng không kém**, vì đó là thứ quyết định kết quả cuối cùng của mọi biểu thức. Nắm được cả hai, các bạn đã có trong tay bộ công cụ toán học khá đầy đủ của Go. *Cứ thong thả ôn lại, không có gì phải vội cả.*

Chúng ta sẽ sang chương tiếp theo nhé — hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Udemy — Assignment Operators](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162328)
