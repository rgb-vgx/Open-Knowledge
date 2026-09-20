# 🔢 Các toán tử cơ bản trong Go — diện tích hình tròn, chia số nguyên và lũy thừa

> Nguồn: `072-Primary-Operators.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162298)

Chào các bạn! Hôm nay mình đi qua những **toán tử toán học cơ bản** trong Go. Mình vẫn dùng project `operators` từ bài trước, chỉ xóa sạch nội dung hàm `main` rồi bắt đầu lại. *Cứ gõ theo mình, sai cũng không sao — điều quan trọng là các bạn thấy được cách mọi thứ hoạt động.*

---

### ⭕ Phép nhân — và hằng số `math.Pi`

Giả sử mình muốn diễn đạt công thức tính **diện tích hình tròn**: `area = πr²`. Làm sao viết điều đó trong Go?

1. Khai báo biến `radius` (bán kính) bằng `12.0`. Lưu ý: **phải viết `.0`**, nếu không Go sẽ hiểu `radius` là số nguyên (integer) và kết quả sẽ không như mong đợi — mình cần nó là số thực (float).
2. Với số π, mình **không cần** gõ `3.141592...`. Go đã có sẵn hằng số này trong package `math`, chỉ cần gọi `math.Pi` (nhớ lấy đúng `Pi`, không phải một hằng số tên na ná khác nhé).
3. Vì chưa biết cách bình phương một số, mình tạm nhân `radius * radius`.

```go
radius := 12.0
area := math.Pi * radius * radius
fmt.Println("Area is", area)
```

Chạy `go run main.go`, kết quả là **452.38...** cùng một loạt chữ số phía sau — chính xác là π (một `float` có sẵn trong thư viện chuẩn) nhân với bình phương bán kính. Vì ở đây chỉ toàn phép nhân, thứ tự nhân thế nào cũng cho cùng một kết quả.

---

### ➗ Chia số nguyên và chia số thực — hai thế giới khác nhau

Đây là chỗ rất nhiều người mới bị "vấp". Thử **chia số nguyên** trước:

```go
half := 1 / 2
fmt.Println("Half with integer division is", half)

halfFloat := 1.0 / 2.0
fmt.Println("Half float is", halfFloat)
```

`1 / 2` nghe như phải bằng `0.5`, nhưng vì cả hai toán hạng đều là **số nguyên**, phép chia số nguyên chỉ làm việc với số nguyên — kết quả in ra là **0**. Muốn kết quả chính xác, phải dùng số thực: lần này ta được **0.5** — đúng như mong đợi. Từ đây rút ra hai quy tắc:

* Muốn phép chia (hay phép nhân) chính xác với số không nguyên → dùng `float32` hoặc `float64`.
* **Không trộn** `float32` và `float64` trong cùng một biểu thức — chọn một loại và giữ nguyên, nếu không sẽ gặp lỗi biên dịch (compiler error).

| Phép toán | Kiểu dữ liệu | Kết quả |
|---|---|---|
| `1 / 2` | int | 0 |
| `1.0 / 2.0` | float | 0.5 |

---

### ⚡ Lũy thừa — đừng dùng dấu `^`

Nhiều người đến từ ngôn ngữ khác cứ tưởng có thể viết `3 ^ 2` để bình phương. Nhưng trong Go, dấu `^` là toán tử **bitwise XOR** — thuộc phần lập trình nâng cao và hầu như không gặp trong công việc hằng ngày, nên khóa này sẽ không đi vào. Kết quả của nó không phải phép mũ:

```go
bad := 3 ^ 2
fmt.Println("bad 3 squared is", bad)

good := math.Pow(3.0, 2.0)
fmt.Println("good 3 squared is", good)
```

Hai dòng lệnh cho ra **1** và **9**: dấu `^` không phải phép mũ, còn cách đúng để lũy thừa là dùng package `math` với hàm `math.Pow`. Hàm này nhận vào `float64` và trả về `float64` — Visual Studio Code hiện ngay gợi ý đó khi bạn gõ, nên mình truyền `3.0` và `2.0`. Kết quả là **9** — đúng bằng 3 × 3. Và nếu muốn nâng lên lũy thừa 7, chỉ cần đổi thành `3.0` và `7.0`: kết quả là **2,187**.

---

### 🧩 Ôn lại modulus

Toán tử modulus (`%`) cho chúng ta **phần dư** của phép chia. Mình tạo biến `remainder`:

```go
remainder := 50 % 3
fmt.Println("Remainder is", remainder)
```

Kết quả là **2** — vì 3 chia vào 50, số chia hết gần nhất là 48, còn dư lại 2.

---

### ⬆️⬇️ Toán tử unary `++` và `--`

Cuối bài, mình xem lại nhóm **toán tử một ngôi (unary operators)**. Ví dụ dễ thấy nhất:

```go
x := 3
x++
fmt.Println("x is now", x)
```

`x++` cộng thêm 1 vào `x`, nên in ra là **4**. Tương tự, `x--` trừ đi 1; mình làm liên tiếp hai lần `x--` thì `x` đi từ 4 → 3 → **2**.

Một điểm hay của Go: ngôn ngữ này **không có** dạng `--x` (giảm trước) như C#. Mình thấy dạng đó rất khó hiểu — *"chắc người nghĩ ra nó hôm đó bị mệt"* — vì một phép toán lại ảnh hưởng tới hai biến cùng lúc; may mắn là các tác giả của Go đã bỏ hẳn nó. Tương tự, `y := x++` cũng **không hợp lệ** — bạn sẽ nhận lỗi biên dịch ngay. Nếu thật sự cần, phải viết tách ra: `var y = x` rồi `y++`, nhưng tình huống đó rất hiếm gặp.

---

### ✅ Tự kiểm tra nhanh

**1. Vì sao phải viết `radius := 12.0` thay vì `radius := 12`?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì cần `radius` là số thực (float).
Giải thích: Nếu viết `12`, Go hiểu là integer và kết quả diện tích sẽ không như mong đợi.
Tham chiếu: Mục "Phép nhân — và hằng số math.Pi"

</details>

**2. `1 / 2` cho ra kết quả gì và vì sao?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `0`, vì đây là phép chia số nguyên.
Giải thích: Phép chia số nguyên chỉ làm việc với số nguyên; muốn ra `0.5` phải dùng `1.0 / 2.0`.
Tham chiếu: Mục "Chia số nguyên và chia số thực"

</details>

**3. Dấu `^` trong Go có phải phép lũy thừa không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — nó là toán tử bitwise XOR.
Giải thích: `3 ^ 2` cho ra `1`; muốn lũy thừa phải dùng `math.Pow(3.0, 2.0)`.
Tham chiếu: Mục "Lũy thừa — đừng dùng dấu ^"

</details>

**4. `math.Pow` nhận tham số kiểu dữ liệu gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `float64` (và trả về `float64`).
Giải thích: Đó là lý do phải truyền `3.0`, `2.0` thay vì `3`, `2`.
Tham chiếu: Mục "Lũy thừa — đừng dùng dấu ^"

</details>

**5. Vì sao không được trộn `float32` và `float64` trong cùng biểu thức?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì sẽ gặp lỗi biên dịch (compiler error).
Giải thích: Hãy chọn một loại float và dùng nhất quán trong suốt biểu thức.
Tham chiếu: Mục "Chia số nguyên và chia số thực"

</details>

---

Các bạn vừa đi qua gần hết nhóm toán tử số học của Go rồi đấy: nhân, chia, lũy thừa, modulus và unary. *Chưa hiểu hết cũng không sao* — bài sau chúng ta sẽ bàn kỹ về **precedence**, thứ tự ưu tiên khi các toán tử này đứng cạnh nhau. Hẹn gặp lại! 🚀

## Nguồn tham khảo

- [Go Packages — math](https://pkg.go.dev/math)
- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Udemy — Primary Operators](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162298)
