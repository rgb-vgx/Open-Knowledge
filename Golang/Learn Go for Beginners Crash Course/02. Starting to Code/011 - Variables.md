# 📦 Biến trong Go: 3 cách khai báo bạn sẽ gặp suốt khóa học

> Nguồn: `011-Variables.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161752)

Bài này và vài bài tiếp theo chúng ta sẽ nói kỹ về **biến (variables)**. Mình sẽ mở Visual Studio Code và tạo một dự án hoàn toàn mới tên là `variables` — các bạn hãy mở theo để gõ cùng mình nhé. *Cứ gõ theo, sai cũng không sao, sửa được hết.*

### 🛠️ Tạo dự án mới

Nếu ứng dụng hello world lúc trước vẫn đang mở, các bạn cứ đóng nó lại, vào menu **File** và chọn **New Window**. Sau đó:

1. Mở một folder mới trong thư mục làm việc của các bạn và đặt tên là `variables`.
2. Đóng màn hình welcome, đưa chuột lên tên project trong mục **Explorer**.
3. Tạo file mới với tên `main.go` — giống hệt cách chúng ta làm ở bài trước.

File Go luôn bắt đầu bằng khai báo `package main`, sau đó là hàm `func main()`. Các bạn đã quen với điều này rồi: **mọi file Go đều phải bắt đầu bằng một khai báo package**.

---

### 📦 Cách 1: Khai báo hai bước với `var`

Đây là cách "dài dòng" nhất, cần hai bước. Mình tạo biến tên `firstNumber`:

```go
package main

func main() {
	var firstNumber int
	firstNumber = 2
}
```

Bước một: dùng từ khóa `var`, đặt tên biến. Lưu ý lần này mình **không dùng `string`** như bài trước, mà dùng `int` — kiểu dữ liệu dành cho số nguyên (whole numbers, integers) trong Go.

Bước hai: gán giá trị cho biến. Và nhớ nhé, **một khi đã khai báo biến, kiểu gì cũng phải dùng nó, nếu không sẽ dính lỗi biên dịch**. *Các bạn cứ bình tĩnh, lỗi đó sẽ tự biến mất khi chúng ta dùng biến.*

---

### ⚠️ Quy tắc đặt tên biến

Có vài quy tắc về cách đặt tên biến trong Go. Nếu các bạn thử đặt tên bắt đầu bằng chữ số, ví dụ `1number`, Visual Studio Code sẽ báo ngay lỗi kiểu *"expected identifier, found 1"*.

Tên biến **phải bắt đầu bằng một chữ cái** — chữ hoa hay chữ thường đều được, và mình nhắc luôn là chúng **có phân biệt** đấy, nhưng chuyện đó để sau. Ngoài chữ cái, Go cho phép duy nhất thêm ký tự `_` (underscore) ở vị trí bắt đầu; mình thì sẽ không dùng nó, chỉ cần các bạn nhớ quy tắc thôi.

---

### 📦 Cách 2 và cách 3: Một bước, gọn gàng hơn

Cách thứ hai vẫn dùng từ khóa `var`, nhưng không ghi kiểu dữ liệu: đặt tên biến, theo sau là dấu `=` và giá trị. Cách thứ ba là **shorthand (viết tắt)** — thứ các bạn sẽ thấy xuất hiện rất nhiều khi đọc code Go:

```go
	var secondNumber = 5

	subtraction := 7
```

Khi dùng shorthand với `:=`, các bạn **không cần khai báo type** — cứ để Go tự "nhìn" giá trị và suy ra kiểu. Cả ba cách đều dùng tốt như nhau; quan trọng là các bạn thấy cách nào hợp lý và dễ đọc với mình nhất.

| Cách khai báo | Cú pháp | Ghi chú |
|---|---|---|
| Hai bước | `var firstNumber int` rồi `firstNumber = 2` | Khai báo trước, gán giá trị sau |
| Một bước với `var` | `var secondNumber = 5` | Gán giá trị ngay khi khai báo |
| Shorthand | `subtraction := 7` | Gọn nhất, xuất hiện rất nhiều trong code Go |

Còn một trường hợp nữa: có những biến được khai báo **ngoài hàm** — ở cấp package — và ở đó các bạn thậm chí không cần gán giá trị ngay. Chúng ta sẽ gặp lại chuyện này khi nói về **scope**.

---

### 🎮 Chuẩn bị cho trò chơi mới

Với những biến vừa tạo, chúng ta sẽ dựng một trò chơi đơn giản: người chơi chọn một số từ **1 đến 10**, làm vài phép toán với số đó, rồi nhận đáp án — bắt đầu ở bài sau.

---

### ✅ Tự kiểm tra nhanh

**1. Điều gì xảy ra nếu bạn khai báo một biến mà không dùng nó?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chương trình dính lỗi biên dịch.
Giải thích: Trong Go, một khi đã khai báo biến — bằng bất kỳ cách nào — bạn bắt buộc phải sử dụng nó.
Tham chiếu: Mục Cách 1: Khai báo hai bước với var.
</details>

**2. Tên biến trong Go được phép bắt đầu bằng gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một chữ cái (hoa hoặc thường) hoặc ký tự `_`.
Giải thích: Không được bắt đầu bằng chữ số, ví dụ `1number` sẽ báo lỗi.
Tham chiếu: Mục Quy tắc đặt tên biến.
</details>

**3. Cách khai báo nào cho phép Go tự suy ra kiểu dữ liệu?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Shorthand `:=`.
Giải thích: Bạn không cần ghi type; Go nhìn giá trị được gán để tự xác định kiểu.
Tham chiếu: Mục Cách 2 và cách 3.
</details>

**4. `int` là kiểu dữ liệu dùng cho gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Số nguyên (whole numbers/integers).
Giải thích: Ở bài trước chúng ta chỉ dùng `string`; Go còn nhiều kiểu built-in khác, `int` là một trong số đó.
Tham chiếu: Mục Cách 1: Khai báo hai bước với var.
</details>

**5. Cách khai báo hai bước khác gì cách khai báo một bước?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hai bước tách việc khai báo và gán giá trị; một bước gộp cả hai.
Giải thích: Ví dụ `var firstNumber int` rồi `firstNumber = 2` so với `var secondNumber = 5`.
Tham chiếu: Mục Cách 2 và cách 3.
</details>

---

Ba cách khai báo này sẽ theo các bạn suốt khóa học, nên nếu chưa nhớ hết cũng đừng bận tâm — gặp nhiều là tự khắc nhớ. Bài sau chúng ta biến chúng thành một trò chơi nho nhỏ! 🚀

## Nguồn tham khảo

- [A Tour of Go — Variables](https://go.dev/tour/basics/8)
- [Udemy — Variables](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161752)
