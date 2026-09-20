# 🧮 Expressions trong Go — hiểu một lần, đọc code nhẹ cả đời

> Nguồn: `038-Expressions.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162008)

Chúng ta đã dùng **expressions (biểu thức)** suốt khóa học từ đầu tới giờ, nhưng chưa một lần gọi chúng bằng tên. Hôm nay mình muốn dành chút thời gian nói rõ khái niệm này — vì nó xuất hiện trong mọi cuốn sách, mọi tutorial mà các bạn sẽ đọc sau này.

Mình bắt đầu với một project Go rỗng, tạo vài biến và đi từ những viên gạch nhỏ nhất.

### 🧱 Biến và literal — viên gạch đầu tiên

```go
age := 10
name := "Jack"
rightHanded := true
```

Cả ba biến vừa tạo đều được gán một **literal (giá trị viết thẳng)** — từ này các bạn sẽ nghe rất nhiều khi học lập trình:

* `age` được gán **integer literal** là `10`.
* `name` được gán **string literal** là `"Jack"`.
* `rightHanded` được gán **Boolean literal** là `true`.

Literal rất đơn giản: đó là giá trị được viết ra trực tiếp trong code.

### 🔍 Thế nào là một expression?

Giờ mình in thông tin ra bằng `fmt.Printf` với các placeholder `%s`, `%d`, `%t` cho `name`, `age`, `rightHanded`. Nhìn qua thì bình thường, nhưng có một chi tiết đáng chú ý:

Dù biến `rightHanded` được gán **literal** `true`, khi nó xuất hiện trong dòng `Printf`, nó trở thành một **expression**. Vì tại thời điểm chương trình chạy, giá trị hiện tại của `rightHanded` mới là thứ được thay vào placeholder `%t`.

Minh họa cho rõ: nếu trước dòng `Printf`, bạn viết `rightHanded = false` — dù ở trên nó được gán literal `true` — thì khi chương trình đi tới dòng in, giá trị `false` mới là thứ được đưa vào và in ra. Đó chính là bản chất "được tính tại thời điểm chạy".

Vậy định nghĩa gọn gàng là: **expression là một đoạn code có thể được tính (evaluate) thành một giá trị duy nhất**.

```go
ageIn10Years := age + 10
isTeenager := age >= 13
```

* `age + 10` là một expression — nó tính ra một giá trị duy nhất (trong trường hợp này là `20`).
* `age >= 13` cũng là một expression hoàn toàn hợp lệ — nó tính ra `false`, vì tuổi hiện tại của Jack là `10`.

Các bạn cứ yên tâm, phép so sánh cho ra `true`/`false` cũng là một giá trị, nên nó là expression đúng nghĩa.

### ➗ Đếm thử expressions trong 20 dòng code

Mình thử đếm xem đoạn code nhỏ này có bao nhiêu expression. Kết quả: **8 expressions trong khoảng 20 dòng code** — nhiều hơn các bạn tưởng đấy. Cụ thể:

* `10` trên dòng gán `age` — không phải expression, đây là **integer literal**.
* `"Jack"` — không phải expression, đây là **string literal**.
* `true` — cũng không phải expression, đây là **Boolean literal**.
* Nhưng `age + 10` — là expression, vì tính ra `20`.
* Và `age >= 13` — là expression, vì tính ra `false`.
* Cùng nhiều chỗ khác được tính tại thời điểm chạy.

| Thứ | Loại | Ví dụ | Là expression? |
|---|---|---|---|
| `10` | Integer literal | `age := 10` | Không |
| `"Jack"` | String literal | `name := "Jack"` | Không |
| `true` | Boolean literal | `rightHanded := true` | Không |
| `age + 10` | Biểu thức số học | `ageIn10Years := age + 10` | Có |
| `age >= 13` | Biểu thức so sánh | `isTeenager := age >= 13` | Có |
| `rightHanded` trong `Printf` | Được tính tại runtime | Thay vào placeholder `%t` | Có |

### 🚫 Điều không được phép làm

Các bạn **không thể** viết ngược kiểu này:

```go
age + 10 = 20
```

Với toán tử gán `=`, expression **phải nằm bên phải dấu bằng**. Viết ngược lại là không hợp lệ, và IDE sẽ báo lỗi kiểu *"expected identifier on left side of the assignment operator"*. Điều này nghe khá hiển nhiên, nhưng biết để không bối rối khi gặp thông báo lỗi là được.

Expressions sẽ theo các bạn suốt quãng đường lập trình. Các bạn sẽ **gần như không bao giờ gọi chúng bằng tên**, nhưng giờ thì các bạn đã biết chúng là gì rồi: **một đoạn code có thể tính thành một giá trị duy nhất**. Chỉ vậy thôi.

---

### ✅ Tự kiểm tra nhanh

**1. Expression được định nghĩa thế nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là một đoạn code có thể được tính (evaluate) thành một giá trị duy nhất.
Giải thích: Giá trị đó có thể là số, chuỗi, hay `true`/`false` từ phép so sánh.
Tham chiếu: Mục "Thế nào là một expression?"

</details>

**2. `10`, `"Jack"`, `true` có phải là expression không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — chúng là literal (integer literal, string literal, Boolean literal).
Giải thích: Literal là giá trị viết thẳng, không cần tính toán.
Tham chiếu: Mục "Biến và literal" và "Đếm thử expressions"

</details>

**3. Vì sao `rightHanded` trong `Printf` lại là expression?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì tại runtime, giá trị hiện tại của nó mới được thay vào placeholder `%t`.
Giải thích: Nếu đổi thành `false` trước khi in, kết quả in ra sẽ là `false` dù ban đầu gán `true`.
Tham chiếu: Mục "Thế nào là một expression?"

</details>

**4. `age >= 13` tính ra giá trị gì và vì sao?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `false`, vì tuổi hiện tại là `10`.
Giải thích: Phép so sánh cho ra `true`/`false` nên cũng là một expression.
Tham chiếu: Mục "Thế nào là một expression?"

</details>

**5. Vì sao `age + 10 = 20` là sai?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì expression phải nằm bên phải toán tử gán; IDE sẽ báo lỗi "expected identifier on left side of the assignment operator".
Giải thích: Bên trái dấu `=` phải là một biến/định danh, không phải biểu thức.
Tham chiếu: Mục "Điều không được phép làm"

</details>

---

Các bạn đã có trong tay một nền tảng khá vững về biểu thức rồi đấy. *Cứ thong thả ôn lại, không có gì phải vội cả.* Bài tiếp theo chúng ta sẽ nói về **Booleans** — nơi các điều kiện thật sự "sống". Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Package fmt](https://pkg.go.dev/fmt)
- [Udemy — Expressions](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162008)
