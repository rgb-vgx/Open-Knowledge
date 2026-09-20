# 🎯 Precedence trong Go — thứ tự ưu tiên và cẩm nang tra cứu

> Nguồn: `073-Precedence.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162302)

Hôm nay chúng ta nói về **precedence (thứ tự ưu tiên)** — một trong những bài "nền móng" quan trọng nhất của chương. Mình vẫn dùng project cũ, xóa sạch hàm `main` và cả import để bắt đầu từ một project Go trống. Trước khi vào code, mình muốn chỉ các bạn vài trang web để tra cứu về sau — link của tất cả đều nằm trong phần tài nguyên của bài giảng này.

---

### 🌐 Ba nguồn tài liệu đáng bookmark

1. **Go language specification** — [go.dev/ref/spec](https://go.dev/ref/spec), tài liệu kỹ thuật chính thức của Go. Nó khá "đặc" và khó đọc, nhưng khó là có lý do: viết một ngôn ngữ lập trình vốn không dễ. Phần chúng ta quan tâm là **arithmetic operators**.
2. **golangprograms.com** — trình bày các toán tử (cộng, trừ, nhân, chia...) ở dạng đơn giản hơn, kèm ví dụ cho từng cái.
3. **TutorialsPoint** — trang [Operators Precedence](https://www.tutorialspoint.com/go/go_operators_precedence.htm), đúng chủ đề bài này: một "cheat sheet" cho biết thứ tự đánh giá kèm ví dụ. Vài thứ như nhóm bitwise các bạn cứ bỏ qua.

Các bạn nên bookmark những tài liệu này và quay lại mỗi khi bí cách viết một biểu thức trong Go.

---

### ✖️ Nhân và chia — ngoặc đơn có thật sự cần thiết?

Mình viết ba biến gần giống nhau:

```go
a := 12.0 * 3.0 / 4.0
b := (12.0 * 3.0) / 4.0
c := 12.0 * (3.0 / 4.0)
fmt.Println("a", a, "b", b, "c", c)
```

`12 * 3 = 36`, `36 / 4 = 9` — chạy lên, cả ba đều in ra **9 9 9**. Nghĩa là với phép nhân và chia, ngoặc đơn ở đây **dư thừa**, không thay đổi kết quả chút nào.

Tuy vậy, khi biểu thức dài hơn và có **tên biến**, ngoặc đơn có thể giúp người đọc — kể cả chính các bạn sáu tháng sau — hiểu ngay ý đồ của đoạn code. Đó là một lý do hoàn toàn hợp lệ để thêm ngoặc đơn dù không bắt buộc.

---

### 🕳️ Cái bẫy "unclear" — chia số nguyên một lần nữa

Đây là ví dụ cho thấy vì sao phải cực kỳ cẩn thận:

```go
unclear := 12 * (3 / 4)
fmt.Println("unclear is", unclear)
```

Nhìn qua, `3 / 4 = 0.75` và `12 * 0.75 = 9`. Nhưng nhớ rằng 12, 3 và 4 **đều là số nguyên (int)**, nên toán tử gán cũng ngầm hiểu kết quả là `int` — Visual Studio Code hiện rõ điều đó. Kết quả thực tế là **0**, vì trong phép chia số nguyên, compiler chỉ quan tâm phần bên trái dấu thập phân: `0.75` bị cắt thành `0`. Và số nào nhân với 0 cũng bằng 0.

Đúng là "unclear" — rất khó đọc. Các bạn nhớ để ý kiểu dữ liệu mỗi khi làm toán nhé.

---

### 🥇 Ngoặc đơn — precedence cao nhất

Ngoặc đơn có **thứ tự ưu tiên cao nhất**. Ví dụ:

```go
f := 12.0 / 3.0 / 4.0
fmt.Println("f is", f)
```

`12 / 3 = 4`, `4 / 4 = 1` — kết quả là **1**, không bất ngờ gì. Nhưng khi đổi lại:

```go
f = 12.0 / (3.0 / 4.0)
```

Compiler làm theo đúng thứ tự: thấy ngoặc đơn trước → `3.0 / 4.0 = 0.75`, rồi `12 / 0.75 = 16`. Kết quả là **16** — hoàn toàn hợp lý khi nghĩ kỹ: phần trong ngoặc được tính thành một con số duy nhất trước, sau đó mới chia.

---

### ➕➖ Cộng trừ và lúc precedence "lộ diện"

Cộng và trừ thì rất dễ:

```go
x := 12 + 3 - 4
y := (12 + 3) - 4
z := 12 + (3 - 4)
fmt.Println("x", x, "y", y, "z", z)
```

`12 + 3 = 15`, `15 - 4 = 11` — cả ba in ra **11 11 11**. Ngoặc đơn vẫn chưa tạo khác biệt.

Nhưng giờ mình **đổi dấu trừ thành dấu nhân** ở cả ba dòng, kết quả lập tức khác hẳn: **24, 60, 24**.

* `x = 12 + 3 * 4 = 24` — nhân trước, cộng sau.
* `y = (12 + 3) * 4 = 60` — ngoặc đơn được tính trước.
* `z = 12 + (3 * 4) = 24` — ngoặc đơn ở đây lại dư thừa.

Precedence thật sự quan trọng, và các bạn sẽ quen rất nhanh thôi. Quy tắc thì y hệt **thứ tự phép toán các bạn học ở tiểu học**:

| Mức ưu tiên | Nhóm toán tử | Ví dụ |
|---|---|---|
| 1 — cao nhất | Ngoặc đơn `( )` | `12.0 / (3.0 / 4.0)` → 16 |
| 2 | Nhân `*`, chia `/` | `12.0 * 3.0 / 4.0` → 9 |
| 3 — thấp nhất | Cộng `+`, trừ `-` | `12 + 3 - 4` → 11 |

Điểm khác duy nhất so với toán học: muốn viết phép nhân, ta dùng dấu `*` thay vì dấu `x` hay dấu chấm như trong toán cao cấp. Còn thứ tự thì vẫn là: **ngoặc đơn trước, rồi nhân chia, rồi cộng trừ**.

---

### ✅ Tự kiểm tra nhanh

**1. Vì sao tài liệu Go specification được mô tả là "khó đọc"?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì viết một ngôn ngữ lập trình vốn là việc khó, nên tài liệu kỹ thuật rất "đặc".
Giải thích: Phần liên quan bài này là arithmetic operators; càng lập trình lâu bạn càng quay lại trang này nhiều.
Tham chiếu: Mục "Ba nguồn tài liệu đáng bookmark"

</details>

**2. Vì sao ba biến `a`, `b`, `c` đều cho kết quả 9?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì khi biểu thức chỉ có nhân và chia, ngoặc đơn là dư thừa — kết quả không đổi.
Giải thích: `12 * 3 / 4` luôn cho 9 dù nhóm thế nào.
Tham chiếu: Mục "Nhân và chia — ngoặc đơn có thật sự cần thiết?"

</details>

**3. Vì sao `12 * (3 / 4)` lại cho ra 0?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì 3, 4, 12 đều là int nên phép chia số nguyên cắt `0.75` thành `0`.
Giải thích: Compiler chỉ quan tâm phần bên trái dấu thập phân; 12 × 0 = 0.
Tham chiếu: Mục "Cái bẫy unclear — chia số nguyên một lần nữa"

</details>

**4. `12.0 / (3.0 / 4.0)` cho kết quả bao nhiêu và vì sao?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 16, vì ngoặc đơn có precedence cao nhất.
Giải thích: `3.0 / 4.0 = 0.75` được tính trước, rồi `12 / 0.75 = 16`.
Tham chiếu: Mục "Ngoặc đơn — precedence cao nhất"

</details>

**5. Khi đổi dấu trừ thành dấu nhân ở ba biến `x`, `y`, `z`, kết quả là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 24, 60 và 24.
Giải thích: `x = 12 + 3 * 4 = 24`; `y = (12 + 3) * 4 = 60`; `z = 12 + (3 * 4) = 24` — precedence thật sự tạo khác biệt.
Tham chiếu: Mục "Cộng trừ và lúc precedence lộ diện"

</details>

---

Nắm chắc thứ tự ưu tiên rồi, các bạn sẽ đọc và viết biểu thức Go nhẹ nhàng hơn rất nhiều — và nhớ quay lại ba trang tài liệu kia khi cần nhé. Bài tiếp theo, chúng ta sẽ khám phá **modulus** sâu hơn, với một bài toán đời thường thú vị: "tháng sau là tháng mấy?". Hẹn gặp lại! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [TutorialsPoint — Go Operators Precedence](https://www.tutorialspoint.com/go/go_operators_precedence.htm)
- [Udemy — Precedence](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162302)
