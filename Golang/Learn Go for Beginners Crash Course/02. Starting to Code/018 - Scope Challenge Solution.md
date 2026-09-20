# 🧭 Giải Scope Challenge: Nối biến, package và hàm thành một dòng in hoàn chỉnh

> Nguồn: `018-Scope-Challenge-Solution.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161798)

Không biết các bạn làm bài thử thách tới đâu rồi? Hy vọng là mọi thứ suôn sẻ. Dù kết quả thế nào, chúng ta vẫn cùng nhau đi qua từng bước một — theo đúng cách mình tiếp cận bài toán này.

Cách mình làm là xử lý từng yêu cầu một, xong cái nào thì xóa comment của cái đó.

### ✅ Yêu cầu 1 và 2: `myVar` và `blockVar`

Đầu tiên là khai báo **package level** cho package `main`:

```go
var myVar string
```

Rồi **block level** trong hàm `main`:

```go
var blockVar string
```

Cả hai đều là `string`. Ban đầu chúng chưa có giá trị, nên mình gán luôn: `blockVar` nhận "this is the block level variable", còn `myVar` nhận "this is a package level variable".

---

### 🧩 Yêu cầu 3: `PackageVar` trong packageOne

Mình chuyển sang file `package.go` và khai báo biến **ngoài hàm**, tức ở cấp package:

```go
var PackageVar = "this is a package level variable in packageOne"
```

Vậy là xong yêu cầu thứ ba, mình xóa comment tương ứng trong `main.go`.

---

### 🚚 Yêu cầu 4 và 5: hàm `PrintMe` và lời gọi từ `main`

Trong `packageOne`, mình tạo hàm `PrintMe` — **chữ P viết hoa** để nó là exported function. Ban đầu hàm chưa nhận tham số nào.

Từ `main.go`, mình gọi `packageOne.PrintMe`, và như lần trước, phải **tự tay import** `myApp/packageOne` — một "đặc sản" nho nhỏ của Visual Studio Code mà mình vẫn hay gặp.

Tới đây đề bài lộ ra một chi tiết thú vị: `PrintMe` phải in ba giá trị, nhưng nó chỉ có thể "tự thấy" `PackageVar`. Còn `myVar` và `blockVar` **chỉ tồn tại trong package `main`**, nên chúng phải được **truyền vào như tham số**. Mình sửa chữ ký hàm để nhận hai chuỗi, đặt tên là `s1` và `s2`:

```go
func PrintMe(s1, s2 string) {
	fmt.Println(s1, s2, PackageVar)
}
```

Còn trong `main` là lời gọi:

```go
packageOne.PrintMe(myVar, blockVar)
```

---

### 🏃 Chạy thử và đối chiếu

Chạy `go run main.go`, cả ba giá trị được in ra **trên một dòng** đúng như yêu cầu:

* `myVar` — biến package level của `main`, truyền vào qua `s1`.
* `blockVar` — biến block level trong `main`, truyền vào qua `s2`.
* `PackageVar` — biến package level của `packageOne`, hàm tự truy cập được vì nó nằm cùng package.

Nếu bài giải của các bạn khác mình một chút thì cũng chẳng sao. Hãy quay lại xem vài bài giảng trước, đọc lại vài lần và chỉnh code đến khi nó chạy được — *cách đó mới là cách học thật sự.*

Giờ thì đi tiếp thôi! 🚀
