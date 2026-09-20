# 📝 Tổng kết chương Types, Expression và Composition

> Nguồn: `045-Summary.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162082)

Chúng ta vừa đi qua một lượng kiến thức không hề nhỏ. Trước khi bước sang chương mới, mình muốn cùng các bạn "gấp gọn" lại những điểm chính — vì ôn tập là cách tốt nhất để biến kiến thức thành của mình. Đừng lo nếu có mục nào chưa thật chắc, chúng ta sẽ còn gặp lại chúng xuyên suốt khóa học.

### 🧱 Các kiểu cơ bản (basic types)

* `int` — số nguyên, chỉ chứa số tròn (whole numbers).
* `uint` — số nguyên không dấu, nhận giá trị **từ 0 trở lên** (unsigned integers).
* `float32` và `float64` — kiểu số thực (floating point numbers).
* `bool` — chỉ có thể là `true` hoặc `false`.
* `string` — chuỗi ký tự, đặt trong **dấu ngoặc kép** hoặc **dấu backtick**.
* `rune` — từng ký tự đơn lẻ cấu thành nên string.

Go còn nhiều kiểu khác nữa, nhưng đây là những kiểu các bạn sẽ gặp phần lớn thời gian.

---

### 📦 Kiểu tổng hợp (aggregate) và kiểu tham chiếu (reference)

* **Array (mảng)** — các bạn không dùng thường xuyên trong Go, nhưng nó vẫn tồn tại.
* **Struct** — kiểu do chúng ta tự định nghĩa; một biến có thể chứa các member thuộc bất kỳ kiểu nào, kể cả struct khác.
* **Pointer (con trỏ)** — kiểu bắt đầu bằng dấu `*` để trỏ tới một địa chỉ bộ nhớ. Khi làm việc với con trỏ, các bạn sẽ còn gặp dấu `&` — cặp dấu này luôn đi cùng nhau trong chương về pointers.
* **Slice** — "anh em" của array với rất nhiều chức năng bổ sung.
* **Map** — cấu trúc dữ liệu key-value: lưu thứ gì đó theo một key, và tra cứu giá trị bằng chính key đó.
* **Function** — các bạn đã gặp rất nhiều lần.
* **Channel** — "đường ống" nối goroutine này với goroutine khác, để truyền dữ liệu qua lại.

| Nhóm kiểu | Bao gồm |
|---|---|
| Basic types | `int`, `uint`, `float32`, `float64`, `bool`, `string`, `rune` |
| Aggregate types | Array, Struct |
| Reference types | Pointer, Slice, Map, Function, Channel |

---

### 🧩 Interface và composition

Mình đã đi qua cả **interface** lẫn cách hiện thực interface. Trong Go, một type hiện thực interface **đơn giản bằng cách hiện thực tất cả các method mà interface đó có** — không cần khai báo gì thêm, không có từ khóa `implements` như nhiều ngôn ngữ khác.

Còn **composition** — một trong những tính năng mạnh mẽ nhất của Go — cho phép các bạn **nhúng type vào trong type**, và nhờ đó có quyền truy cập cả member lẫn hàm của type được nhúng. Nhớ lại bài học về composition nhé: đó là cách Go thay thế cho kế thừa, giúp code gọn hơn, dễ bảo trì hơn.

---

### 🧠 Boolean và quy tắc đặt tên

Về **biểu thức Boolean**, chúng ta đã làm quen với đủ bộ phép toán:

* `==` — bằng nhau (equality).
* `!=` — khác nhau (not equal).
* `>`, `<`, `>=`, `<=` — lớn hơn, nhỏ hơn, lớn hơn hoặc bằng, nhỏ hơn hoặc bằng.

Và cả **compound Booleans (Boolean ghép)**, ví dụ `x > 10 && y < 20`, hoặc `x > 10 || y < 20`. Trong đó dấu hai sọc dọc `||` là toán tử **hoặc (or)**.

Về **exported vs unexported**: chữ HOA có ý nghĩa quyết định đối với **hằng ở package level, biến ở package level, hàm và type**. Bắt đầu bằng chữ HOA thì thế giới bên ngoài package nhìn thấy được; bắt đầu bằng chữ thường thì chỉ nội bộ package dùng được mà thôi.

---

### 🚀 Tiếp theo là gì?

Ở chương tới, chúng ta sẽ chuyển sang **vòng lặp `for`** với tất cả các biến thể khác nhau trong Go, cùng một số cấu trúc ra quyết định bổ sung nữa. Đây là chương rất thú vị — các bạn sẽ thấy Go làm được nhiều thứ với chỉ một từ khóa `for` duy nhất.

### 🎯 Tự kiểm tra nhanh

**1. Kiểu `uint` khác `int` ở điểm nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `uint` là số nguyên không dấu, chỉ nhận giá trị từ 0 trở lên.
Giải thích: `int` chứa số nguyên nói chung, còn `uint` không có phần âm.
Tham chiếu: Mục "Các kiểu cơ bản (basic types)"

</details>

**2. Array thuộc nhóm kiểu nào, và nó có phổ biến trong Go không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Aggregate type; trong Go nó tồn tại nhưng ít được dùng thường xuyên.
Giải thích: Cùng nhóm aggregate còn có struct — kiểu do chúng ta tự định nghĩa.
Tham chiếu: Mục "Kiểu tổng hợp (aggregate) và kiểu tham chiếu (reference)"

</details>

**3. Channel dùng để làm gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là "đường ống" nối các goroutine lại với nhau để truyền dữ liệu qua lại.
Giải thích: Channel nằm trong nhóm reference types cùng pointer, slice, map, function.
Tham chiếu: Mục "Kiểu tổng hợp (aggregate) và kiểu tham chiếu (reference)"

</details>

**4. Trong Go, một type hiện thực interface bằng cách nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bằng cách hiện thực tất cả các method mà interface đó có.
Giải thích: Không cần khai báo "implements" — Go xác định điều này một cách tự nhiên.
Tham chiếu: Mục "Interface và composition"

</details>

**5. Với package-level constant, biến, hàm và type thì điều gì quyết định tính exported?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chữ cái đầu — chữ HOA là exported, chữ thường là unexported.
Giải thích: Chỉ những tên bắt đầu bằng chữ HOA mới nhìn thấy được từ ngoài package.
Tham chiếu: Mục "Boolean và quy tắc đặt tên"

</details>

---

Vậy là chúng ta đã khép lại chương **Types, Expression and Composition**. Nếu các bạn ra được 5/5 câu hỏi trên, các bạn đã sẵn sàng cho những gì phía trước; còn nếu chưa, cũng đừng bận tâm — quay lại bài nào cần xem lại là được. Hãy nghỉ một chút, rồi chúng ta cùng bước vào thế giới của `for` loops. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Udemy — Summary](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162082)
