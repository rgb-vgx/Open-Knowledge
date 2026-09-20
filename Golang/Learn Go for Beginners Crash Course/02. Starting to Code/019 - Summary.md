# 📌 Tổng kết "Starting to Code": Biến, scope và quy tắc exported

> Nguồn: `019-Summary.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161804)

Chúng ta đã đi qua một chặng khá dài với biến và scope. Trước khi rời phần này, cùng mình điểm lại những điều quan trọng nhất — đây là những viên gạch nền cho mọi chương trình Go về sau.

### 📦 Biến: khai báo trước, dùng sau

Biến **phải được khai báo trước khi dùng**, và chúng ta có mấy cách khai báo:

1. Dùng `var` rồi gán giá trị.
2. Dùng shorthand (`:=`) — Go tự suy ra kiểu; ví dụ gán một chuỗi thì biến tự có kiểu `string`.
3. Dùng `var` với kiểu nhưng **không gán giá trị** — biến nhận zero value: `string` là chuỗi rỗng, `int` là `0`.

| Cách | Ví dụ | Ghi chú |
|---|---|---|
| Hai bước | `var a int` rồi `a = 2` | Khai báo trước, gán sau |
| Kèm giá trị | `var b = "hello"` | Kiểu được suy ra từ giá trị |
| Shorthand | `c := "hello"` | Gọn nhất |
| Không giá trị | `var d string` | Nhận zero value |

Điều then chốt: dù chọn cách nào, biến cũng phải được khai báo và **phải có kiểu** trước khi dùng. Nếu bạn không gán giá trị, biến `someVar` kiểu `string` sẽ là chuỗi rỗng, còn kiểu `int` sẽ là số 0 — *thường thì đó không phải thứ bạn muốn trong code*. Vậy nên: khai báo, cho kiểu, gán giá trị trước khi dùng.

---

### 🔭 Scope: block và package

* `blockVar` khai báo **bên trong hàm `main`** là biến block level — chỉ hàm đó nhìn thấy.
* `myVar` khai báo ở **cấp package** nên mọi hàm trong package (ở đây là `main`) đều dùng được.

---

### 🌐 Exported và unexported

Trong `package.go` của `packageOne`, biến `PackageVar` nằm ở cấp package. Vì tên bắt đầu bằng **chữ HOA**, nó là **exported variable** — package khác truy cập được.

Quy tắc này áp dụng y hệt cho hàm:

* Tên hàm bắt đầu bằng **chữ HOA** → dùng được cả trong lẫn ngoài package.
* Tên hàm bắt đầu bằng **chữ thường** → chỉ dùng được trong package khai báo nó.

---

### ✅ Tự kiểm tra nhanh

**1. Trước khi dùng một biến, bạn bắt buộc phải làm gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khai báo biến và đảm bảo nó có kiểu dữ liệu.
Giải thích: Biến phải được khai báo trước khi dùng, bằng bất kỳ cách nào trong ba cách đã học.
Tham chiếu: Mục Biến: khai báo trước, dùng sau.
</details>

**2. Biến kiểu `int` không được gán giá trị sẽ chứa gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Số `0` (zero value).
Giải thích: Với `string` thì zero value là chuỗi rỗng — thường không phải giá trị bạn mong muốn.
Tham chiếu: Mục Biến: khai báo trước, dùng sau.
</details>

**3. Biến `blockVar` truy cập được từ đâu?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ bên trong hàm `main` — nơi nó được khai báo.
Giải thích: Biến block level không nhìn thấy được từ hàm khác.
Tham chiếu: Mục Scope: block và package.
</details>

**4. Biến `myVar` ở cấp package dùng được ở đâu?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Mọi hàm trong package `main`.
Giải thích: Package level variable có mặt ở mọi nơi trong package chứa nó.
Tham chiếu: Mục Scope: block và package.
</details>

**5. Vì sao `PackageVar` truy cập được từ ngoài `packageOne`?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì tên bắt đầu bằng chữ HOA, tức đã được export.
Giải thích: Quy tắc chữ cái đầu áp dụng cho cả biến lẫn hàm.
Tham chiếu: Mục Exported và unexported.
</details>

---

### 🐹 Về chương trình Eliza

Chắc hẳn các bạn vẫn chưa hiểu hết mọi thứ trong chương trình Eliza, đặc biệt là phần trong package `doctor`. Điều đó hoàn toàn bình thường — *rồi các bạn sẽ hiểu, từ từ thôi.*

Chừng này là đủ cho phần này rồi. Hẹn gặp lại ở phần tiếp theo! 🚀
