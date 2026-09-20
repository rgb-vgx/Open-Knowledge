# 🔢 Basic Types trong Go — `int`, `float`, `string`, `bool` và những điều mình muốn các bạn nhớ

> Nguồn: `030-Basic-Types.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161946)

Hôm nay chúng ta bắt đầu đi sâu vào kiểu dữ liệu, và mình sẽ khởi động với nhóm đầu tiên: **basic types** — gồm số, chuỗi và Boolean. Các bạn đã gặp cả ba nhóm này rồi, nên bài này chủ yếu để chỉ ra vài điều tinh tế mà mình không muốn các bạn bỏ lỡ.

Mình đã tạo sẵn một project mới: chạy `go mod init`, có file `go mod`, và một file `main.go` chỉ gồm khai báo package cùng hàm `main` rỗng. Đơn giản vậy thôi — chúng ta gõ từ từ.

### 🔢 Họ nhà số nguyên: vì sao cứ dùng `int`?

Đầu tiên là kiểu số nguyên. Nếu mình tạo một biến ở **cấp package** (package level) như `var myInt int = 10`, thì biến đó có mặt ở mọi hàm trong package, và mình có thể in nó ra trong `main`.

Nhưng còn có những kiểu int khác mà các bạn nên **biết là nó tồn tại**, dù thực tế gần như không dùng:

* `int16` — số nguyên 16-bit.
* `int32` — số nguyên 32-bit.
* `int64` — số nguyên 64-bit.

Vì sao Go vừa có `int`, vừa có ba kiểu kia? Vì chương trình có thể được biên dịch cho nhiều **kiến trúc máy** khác nhau — điện thoại, máy tính cũ, máy tính hiện đại — với bộ xử lý 16, 32 hay 64-bit. Nếu các bạn biết chắc chỉ chạy trên máy 64-bit thì dùng `int64` sẽ **hiệu quả hơn một chút**; tương tự với `int32` cho kiến trúc 32-bit.

Nhưng thực tế thì các bạn **gần như không bao giờ dùng** mấy kiểu này — chính các tác giả Go cũng **khuyên dùng `int`** thay vì chúng. Và trong suốt khóa học, mình cũng sẽ dùng `int` gần như tuyệt đối.

Còn một người họ hàng nữa: `uint` — **unsigned integer**, tức số nguyên **không dấu**, chỉ chứa giá trị dương hoặc `0`. Nếu các bạn thử gán `-10` vào `uint`, chương trình sẽ báo lỗi ngay. Khi nào cần chắc chắn biến chỉ chứa giá trị không âm, `uint` là chỗ tốt để lưu.

### 🌊 `float32` và `float64` — không có kiểu `float` chung chung

Với số thực, Go **không có** kiểu tên là `float`. Chỉ có `float32` và `float64`.

* `float32` là số thực 32-bit — nó **chứa được số khá lớn**.
* `float64` là số thực 64-bit — chứa được số **lớn hơn nhiều**.

Vậy nên nếu công việc của các bạn dính tới những con số thật lớn, hãy chọn `float64`. Còn phần lớn trường hợp, `float32` có lẽ là đủ.

Giờ mình gán thử giá trị cho tất cả và in ra cho các bạn xem — cũng là dịp ôn lại chút:

```go
var myInt int = 10
var myUint uint = 20
var myFloat32 float32 = 10.1
var myFloat64 float64 = 100.1

fmt.Println(myInt, myUint, myFloat32, myFloat64)
```

Chạy `go run main.go`, kết quả in ra đúng như các bạn đoán: `10 20 10.1 100.1`. Không có gì bất ngờ cả.

| Kiểu | Chứa gì | Ghi chú |
|---|---|---|
| `int` | Số nguyên | Dùng gần như mọi lúc, được các tác giả Go khuyên dùng |
| `int16` / `int32` / `int64` | Số nguyên theo độ rộng bit | Tối ưu nhẹ theo kiến trúc máy; thực tế gần như không dùng |
| `uint` | Số nguyên dương hoặc `0` | Không nhận giá trị âm |
| `float32` | Số thực | Đa số trường hợp là đủ |
| `float64` | Số thực, dải lớn hơn nhiều | Dùng khi cần số rất lớn |
| `string` | Chuỗi ký tự | Bất biến (immutable) |
| `bool` | `true` hoặc `false` | Không chứa được gì khác |

---

### 📝 String là bất biến — điều thú vị các bạn nên biết

Với chuỗi, mình tạo một biến cục bộ trong `main` tên `myString` và gán cho nó... không gì cả, tức chuỗi rỗng. In ra, các bạn thấy một dòng trông như trống — nhưng thực ra nó là **empty string**.

Giờ đến phần thú vị. Mình gán `myString = "Trevor"`, in ra, rồi đổi thành `myString = "John"`. Nhìn qua thì có vẻ mình đã **thay đổi giá trị** của chuỗi — nhưng không phải vậy.

Strings trong Go là **immutable (bất biến)**. Nghĩa là khi các bạn "đổi giá trị" một chuỗi, thực chất Go **tạo ra một chuỗi hoàn toàn mới** rồi lưu vào biến. Các bạn tạm cứ tin mình đi — muốn chứng minh thì phải mở source code của Go ra xem, hơi mất thời gian một chút.

Với những chương trình cực lớn, nơi từng **nanosecond** đều đáng giá, chuyện này có thể ảnh hưởng tới hiệu năng. Còn trong đa số trường hợp, các bạn cứ dùng chuỗi như bình thường, chỉ cần **biết nó là bất biến** là được.

### ✅ Boolean — chỉ có đúng hai giá trị

Đến kiểu cuối cùng của basic types: Boolean. Mình có `var myBool bool = true`.

* Gán `myBool = "yellow"` → lỗi.
* Gán `myBool = 0` → cũng lỗi.
* Chỉ có duy nhất `true` hoặc `false` được phép.

Điều mình muốn các bạn mang theo từ bài này: **cứ dùng `int`**; `uint` và `int16/32/64` chỉ cần biết mặt; số thực thì `float32` cho đa số, `float64` cho số thật lớn; Boolean thì chỉ có `true`/`false`. Vậy là đủ.

---

### ✅ Tự kiểm tra nhanh

**1. Kiểu số nguyên nào mình nên dùng phần lớn thời gian?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `int`.
Giải thích: Các tác giả Go khuyên dùng `int` thay cho `int16/int32/int64`.
Tham chiếu: Mục "Họ nhà số nguyên"

</details>

**2. Vì sao Go có thêm các kiểu `int16`, `int32`, `int64`?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì kiến trúc bộ xử lý có thể là 16, 32 hoặc 64-bit; build riêng cho nền tảng nào thì dùng kiểu đó hiệu quả hơn một chút.
Giải thích: Tuy nhiên thực tế gần như không dùng; Go khuyến khích dùng `int`.
Tham chiếu: Mục "Họ nhà số nguyên"

</details>

**3. `uint` khác `int` ở điểm nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `uint` là số nguyên không dấu, chỉ chứa giá trị dương hoặc `0`; gán số âm sẽ lỗi.
Giải thích: Phù hợp khi muốn chắc chắn biến không bao giờ âm.
Tham chiếu: Mục "Họ nhà số nguyên"

</details>

**4. Khi nào nên chọn `float64` thay vì `float32`?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi cần xử lý những con số thật lớn.
Giải thích: Cả hai đều chứa được số lớn, nhưng `float64` có dải giá trị lớn hơn nhiều.
Tham chiếu: Mục "float32 và float64"

</details>

**5. "String bất biến" nghĩa là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi đổi giá trị chuỗi, Go tạo một chuỗi mới rồi lưu vào biến, chứ không sửa chuỗi cũ tại chỗ.
Giải thích: Điều này có thể ảnh hưởng hiệu năng ở chương trình rất lớn, nhưng đa số trường hợp cứ dùng bình thường.
Tham chiếu: Mục "String là bất biến"

</details>

---

Các bạn vừa nắm xong nhóm kiểu nền tảng nhất. *Nếu có chỗ nào còn mơ hồ, đừng lo — chúng ta sẽ dùng chúng liên tục nên sẽ khắc sâu dần.* Bài tiếp theo là **aggregate types**, bắt đầu với array và struct. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification — Types](https://go.dev/ref/spec)
- [Package fmt](https://pkg.go.dev/fmt)
- [Udemy — Basic Types](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161946)
