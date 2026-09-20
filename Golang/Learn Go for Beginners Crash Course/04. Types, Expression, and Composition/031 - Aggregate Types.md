# 🧱 Aggregate Types trong Go — Array và Struct, dùng cái nào và khi nào?

> Nguồn: `031-Aggregate-Types.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161952)

Chúng ta vừa đi hết nhóm **basic types**, giờ là lúc bước sang nhóm thứ hai: **aggregate types** — những kiểu "gom" nhiều mảnh thông tin lại với nhau, gồm **array** và **struct**. Mình sẽ bắt đầu với array cho đúng thứ tự, rồi dành phần lớn thời gian cho struct, vì đó mới là nhân vật các bạn sẽ gặp hằng ngày.

Mình đã xóa sạch nội dung cũ trong `main` để bắt đầu lại từ đầu cho gọn gàng.

### 📚 Array — dài cố định và đếm từ `0`

Array trong Go **không được dùng thường xuyên** như ở các ngôn ngữ khác, đơn giản vì Go có **slices (lát cắt)** — các bạn có thể hình dung slice giống như array nhưng có thêm nhiều chức năng. Dù vậy, các bạn vẫn nên biết array, và cú pháp của nó rất đơn giản:

```go
var myStrings [3]string
myStrings[0] = "cat"
myStrings[1] = "dog"
myStrings[2] = "fish"

fmt.Println("First element in array is", myStrings[0])
```

Các bạn khai báo array bằng cách đặt **độ dài trong dấu ngoặc vuông**, rồi đến kiểu dữ liệu. Giống như hầu hết ngôn ngữ lập trình, array **bắt đầu đếm từ `0`**: phần tử đầu là vị trí `0`, thứ hai là `1`, thứ ba là `2`. Chạy `go run main.go`, ta được "First element in array is cat" — đổi số `0` thành `1` thì ra `dog`, thành `2` thì ra `fish`.

Mình cũng thử đổi thành array of ints — sửa giá trị thành `1`, `5`, `7` — chạy tốt. *Nhưng nhớ nhé, đổi kiểu thành `int` mà vẫn gán chuỗi là lỗi ngay.*

Thẳng thắn mà nói: **các bạn sẽ không dùng array nhiều trong Go**, hầu hết thời gian là slice. Biết nó tồn tại là đủ.

### 🏗️ Struct — kiểu tổ hợp được dùng suốt ngày

Struct được xếp vào aggregate types vì nó **có thể chứa nhiều mảnh thông tin**, tức là "tổ hợp" (aggregate) nhiều loại dữ liệu.

Cách làm quen thuộc: khai báo một `type`, đặt tên, nói đó là `struct`, rồi mô tả những thông tin nó chứa. Vài bài trước chúng ta đã làm điều này với type `user`; lần này mình dùng ví dụ chiếc xe:

* `numberOfTires` — kiểu `int`.
* `luxury` — kiểu `bool` (xe sang hay không).
* `bucketSeats` — kiểu `bool`.
* `make` và `model` — kiểu `string`.
* `year` — kiểu `int`.

Sau khi đã mô tả type, mình vẫn cần **một biến** thuộc type đó: `var myCar car`. Từ đó, mình điền từng field bằng **cú pháp dấu chấm**:

```go
var myCar car
myCar.numberOfTires = 4
myCar.luxury = false
myCar.make = "Volkswagen"
```

Các bạn cứ thoải mái điền từng field kiểu như vậy.

Struct còn có **cú pháp viết tắt** để vừa khai báo vừa điền giá trị trong một bước — thứ các bạn sẽ thấy xuất hiện liên tục trong code Go:

```go
myCar := car{
    numberOfTires: 4,
    luxury:        true,
    bucketSeats:   true,
    make:          "Volvo",
    model:         "xc90",
    year:          2019,
}
```

Cuối cùng, in thông tin ra bằng `fmt.Printf` — lưu ý phải là `Printf` chứ không phải `Println`, vì mình dùng các placeholder `%d`, `%s`. Kết quả in ra là "My car is a 2019 Volvo xc90" (mình có sửa lại một chút lỗi gõ ở model). Và nếu các bạn thấy `printf` in ra có dấu `%` lạ lơ lửng ở cuối dòng — đó là chuyện bình thường, vì `Printf` không tự xuống dòng.

| Tiêu chí | Array | Struct |
|---|---|---|
| Chứa gì | Nhiều phần tử **cùng một kiểu** | Nhiều mảnh thông tin **có thể khác kiểu** |
| Kích thước | Cố định khi khai báo, ví dụ `[3]string` | Cố định theo các field đã định nghĩa |
| Truy cập | Theo chỉ số: `myStrings[0]` | Theo tên field: `myCar.make` |
| Tần suất trong khóa học | Ít dùng, thường được thay bằng slice | Dùng rất nhiều |

---

### ✅ Tự kiểm tra nhanh

**1. Vì sao array ít được dùng trong Go?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì Go có slice — giống như array nhưng có thêm nhiều chức năng.
Giải thích: Phần lớn trường hợp người ta dùng slice; array vẫn tồn tại nhưng ít gặp.
Tham chiếu: Mục "Array — dài cố định và đếm từ 0"

</details>

**2. Cú pháp khai báo array độ dài 3 kiểu string là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `var myStrings [3]string`.
Giải thích: Độ dài nằm trong ngoặc vuông, kiểu dữ liệu đặt sau.
Tham chiếu: Mục "Array — dài cố định và đếm từ 0"

</details>

**3. Array của Go đếm phần tử từ đâu?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Từ `0`.
Giải thích: Phần tử đầu ở vị trí `0`, phần tử thứ ba ở vị trí `2`.
Tham chiếu: Mục "Array — dài cố định và đếm từ 0"

</details>

**4. Vì sao struct thuộc nhóm aggregate types?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì struct có thể chứa nhiều mảnh thông tin — nó "tổ hợp" nhiều loại dữ liệu lại.
Giải thích: Ví dụ type `car` chứa cả `int`, `bool` và `string`.
Tham chiếu: Mục "Struct — kiểu tổ hợp được dùng suốt ngày"

</details>

**5. Cách điền dữ liệu cho field của struct là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng cú pháp dấu chấm, ví dụ `myCar.numberOfTires = 4`; hoặc dùng cú pháp viết tắt vừa khai báo vừa điền giá trị.
Giải thích: Cú pháp viết tắt với `car{...}` là cách rất phổ biến trong code Go.
Tham chiếu: Mục "Struct — kiểu tổ hợp được dùng suốt ngày"

</details>

---

Chúng ta sẽ gặp struct rất nhiều trong phần còn lại của khóa, còn array thì gần như chỉ để biết mặt. *Các bạn chưa cần nhớ hết mọi thứ ở bài này — cứ để struct ngấm dần qua ví dụ.* Bài tiếp theo chúng ta chuyển sang **reference types**, bắt đầu với **pointers**. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Udemy — Aggregate Types](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161952)
