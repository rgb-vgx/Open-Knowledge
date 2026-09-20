# 🧱 Tự định nghĩa kiểu dữ liệu với struct — và in số thực cho thật đẹp

> Nguồn: `025-Experimenting-with-String-Interpolation.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161912)

Chào các bạn! Hôm nay chúng ta tiếp tục làm việc với package `fmt`, nhưng lần này có một ý tưởng mới khá thú vị: **tự tạo kiểu dữ liệu cho riêng mình**. Từ đầu khóa tới giờ, chúng ta toàn dùng những kiểu có sẵn — `int`, `string`, `rune`... Giờ là lúc bạn tự đứng ra thiết kế kiểu của chính mình.

Mình bắt đầu từ code của bài trước: chương trình hỏi tên và tuổi, lưu vào hai biến rồi in ra. Việc đầu tiên là xóa dòng comment không cần nữa và dọn dẹp một chút cho gọn.

---

### 🎯 Câu hỏi thứ ba: con số yêu thích

Mình muốn hỏi thêm: **"What is your favorite number?"**. Điểm đặc biệt: con số này có thể là **số nguyên** như `7`, hoặc **số thực** như `10.17` — người dùng không cần biết sự khác biệt, cứ nhập thứ họ thích.

Cách làm cũ là tạo thêm biến thứ ba. Nhưng mình không muốn làm vậy — thay vào đó, mình sẽ gói cả ba mẩu thông tin (tên, tuổi, số yêu thích) vào **một kiểu dữ liệu tự định nghĩa**.

---

### 🧱 Tạo type `user` với `struct`

Go cho phép ta tự tạo kiểu bằng keyword `type`, và để gom nhiều mẩu thông tin vào một chỗ thì dùng keyword `struct` — kèm một cặp ngoặc nhọn, bên trong khai báo những gì kiểu này sẽ chứa:

```go
type user struct {
    userName       string
    age            int
    favoriteNumber float64
}
```

Vài điều cần nắm:

* Đây là **một kiểu (type), không phải một biến**.
* Kiểu `user` này gom ba trường: tên người dùng (string), tuổi (int), và số yêu thích (float64). Mình còn đùa rằng sẽ đánh vần "favorite" theo kiểu Canada vì mình đang sống ở Canada.
* Về số thực, Go có hai loại: `float32` và `float64`. Khác biệt quan trọng nhất giữa chúng là `float64` chứa được **những con số lớn hơn**. Mình chọn `float64` phòng khi có ai đó có số yêu thích... hơi khủng.

| Tiêu chí | `float32` | `float64` |
|---|---|---|
| Kích thước | 32-bit | 64-bit |
| Số lưu được | Nhỏ hơn | Lớn hơn |
| Lựa chọn của mình | — | Dùng `float64` cho chắc |

---

### 👤 Dùng biến `user` thay cho từng biến rời

Trong `main`, mình tạo một biến tên `user` kiểu `user` (chữ u thường — mình thích vậy) — một biến rỗng của kiểu vừa định nghĩa. Rồi thay vì gán kết quả vào các biến `username`, `age` rời rạc, ta gán vào từng trường của nó:

* `user.userName = readString("What is your name?")`
* `user.age = readInt("How old are you?")`
* Khi in, thay `username` bằng `user.userName` và `age` bằng `user.age`.

Chạy thử — mọi thứ vẫn hoạt động trơn tru. Cái hay của struct là mình có thể thêm **bao nhiêu trường cũng được**, tất cả nằm gọn trong một kiểu duy nhất.

---

### 🔁 `readFloat` và `strconv.ParseFloat`

Để hỏi số yêu thích, mình copy hàm `readInt` xuống cuối file và sửa lại:

1. Đổi tên thành `readFloat`, trả về `float64` thay vì `int`.
2. Thay `strconv.Atoi` bằng `strconv.ParseFloat` — hàm này chuyển chuỗi thành số thực.
3. `ParseFloat` cần **hai tham số**: chuỗi cần chuyển và con số `32` hoặc `64`. Vì đang dùng `float64` nên mình truyền `64`.
4. Đổi thông báo lỗi thành `Please enter a number` — giờ người dùng nhập gì cũng được, miễn là đúng định dạng số.

Trong `main`, thêm dòng: `user.favoriteNumber = readFloat("What is your favorite number?")`.

---

### 🖨️ In số thực với `%.2f`

Giờ thêm số yêu thích vào câu in cuối. Theo **cheat sheet** mình đưa ở bài trước:

* Số thực dùng placeholder `%f`.
* Thêm `.2`, `.4`... để quyết định số chữ số sau dấu chấm: `%.2f` là hai chữ số, `%.4f` là bốn chữ số.

```go
fmt.Printf("Your name is %s and you are %d years old. Your favorite number is %.2f.\n",
    user.userName, user.age, user.favoriteNumber)
```

Chạy thử với con số `3.1415` (xấp xỉ số pi) → in ra `3.14`. Đổi thành `%.4f` → in ra bốn chữ số sau dấu chấm. Tùy nhu cầu mà các bạn chọn độ chính xác.

Cuối bài, một quan sát thú vị: mình thử thêm hẳn một trường nữa vào struct — `ownsADog` kiểu `bool` (true/false, có nuôi chó hay không) — nhưng **chưa dùng tới nó**. Chương trình vẫn chạy ngon lành, không hề báo lỗi: Go không bận tâm nếu vài trường chưa được dùng. Và đây cũng là thực hành cực kỳ phổ biến trong Go — tự định nghĩa type giúp code sạch sẽ, dễ chỉnh sửa, và bạn không phải nhớ 25 biến rời rạc: chỉ một biến với 25 thành viên trong cấu trúc của nó.

---

### ✅ Tự kiểm tra nhanh

**1. `struct` là gì và được khai báo bằng keyword nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là kiểu dữ liệu tự định nghĩa gom nhiều trường thông tin, khai báo bằng keyword `struct`.
Giải thích: Kết hợp với keyword `type` để đặt tên cho kiểu mới.
Tham chiếu: Mục "Tạo type user với struct".

</details>

**2. Vì sao mình chọn `float64` thay vì `float32`?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì `float64` là số 64-bit, chứa được những con số lớn hơn.
Giải thích: Khác biệt quan trọng nhất giữa hai loại float là dung lượng số lưu được.
Tham chiếu: Mục "Tạo type user với struct".

</details>

**3. `strconv.ParseFloat` cần những tham số nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hai tham số: chuỗi cần chuyển, và `32` hoặc `64`.
Giải thích: Vì dùng `float64`, mình truyền `64`; thiếu tham số thứ hai sẽ báo lỗi ngay.
Tham chiếu: Mục "readFloat và strconv.ParseFloat".

</details>

**4. `%.2f` nghĩa là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** In số thực với đúng 2 chữ số sau dấu chấm.
Giải thích: `3.1415` với `%.2f` cho ra `3.14`; đổi thành `%.4f` sẽ in 4 chữ số.
Tham chiếu: Mục "In số thực với %.2f".

</details>

**5. Chuyện gì xảy ra nếu một trường trong struct không được dùng?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không có lỗi gì cả — Go không quan tâm.
Giải thích: Ví dụ trường `ownsADog` kiểu bool thêm vào mà chưa dùng vẫn chạy bình thường.
Tham chiếu: Mục "In số thực với %.2f".

</details>

---

Chúng ta đã biết tạo kiểu riêng, biết nhận số thực từ người dùng, và biết in số thực cho đẹp. Bài tiếp theo sẽ là một **thử thách nhỏ**: vận dụng tất cả những gì đã học để hỏi người dùng một câu hỏi yes/no bằng một phím bấm duy nhất. Nghe quen không? Đúng rồi — chính là kỹ thuật lắng nghe phím từ bài Hammer Bitcoin. Các bạn sẵn sàng chưa? Hẹn gặp ở bài sau! 🚀

## Nguồn tham khảo

- [strconv — pkg.go.dev](https://pkg.go.dev/strconv)
- [fmt — pkg.go.dev](https://pkg.go.dev/fmt)
