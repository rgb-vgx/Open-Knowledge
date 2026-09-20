# 🗺️ Maps trong Go — key, value và những quy tắc "bất di bất dịch"

> Nguồn: `034-Maps.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161972)

Ta đã đi qua pointers và slices, giờ đến **maps** — reference type tiếp theo. Các bạn đã gặp map trước đây rồi, nhưng mình muốn ôn lại và bổ sung vài điểm quan trọng mà người mới hay vấp phải.

Nhắc nhanh: **map là cặp key–value**. Các bạn tra cứu một thứ trong map bằng **key** để lấy **value** tương ứng.

### 🧠 Tạo map đúng cách — coi chừng nil map

Có một điều các bạn **không thể** làm: khai báo `var myMap map[string]string` rồi dùng luôn. Khai báo như vậy tạo ra một **nil map**, và các bạn chẳng làm được gì với nó cả. Nên khi tạo map, ta dùng từ khóa `make`:

```go
intMap := make(map[string]int)
```

Đọc cú pháp này như sau: key là `string` (đó là cách mình tra cứu), và map sẽ lưu các số nguyên. Thế là mình có `intMap`.

### 🤝 Map là reference type — khỏi cần pointer

Một điểm cần khắc cốt: **map là reference type, và vì vậy nó luôn được truyền theo tham chiếu**. Nghĩa là các bạn **không cần dùng pointer** với map. Các bạn sẽ rất hiếm khi — nếu không muốn nói là chẳng bao giờ — thấy con trỏ tới map trong code Go. Làm việc với map thì quên pointer đi cho nhẹ đầu.

Giờ đổ dữ liệu vào map:

```go
intMap["one"] = 1
intMap["two"] = 2
intMap["three"] = 3
intMap["four"] = 4
intMap["five"] = 5
```

Không bất ngờ gì: các value là số tương ứng với tên key.

### 🎲 Thứ tự trong map — đừng bao giờ tin!

Đây là điều rất quan trọng: **map không được sắp xếp**. Mình chứng minh ngay bằng cách duyệt map bằng cú pháp `range` y như đã làm với slice:

```go
for key, value := range intMap {
    fmt.Println(key, value)
}
```

Chạy lần đầu, các bạn có thể nhận `four five one two three`. Chạy lại lần nữa, đôi khi nó lại ra **đúng thứ tự mình đã nhập**. Rồi lần khác lại ngẫu nhiên. Đây là quyết định có chủ đích của đội ngũ phát triển Go: **không ai được sắp xếp map, và không ai được giả định rằng dữ liệu đưa vào map sẽ được lấy ra theo đúng thứ tự đó**.

Thú thật, mình chạy thử mấy lần mà map cứ in đúng thứ tự — chắc nên đi mua vé số. *Nhưng các bạn đừng dựa vào may mắn đó nhé, vì nó không đáng tin đâu.*

Xóa một key khỏi map thì cực dễ:

```go
delete(intMap, "four")
```

Sau khi xóa, duyệt map chỉ còn `one, two, three, five`. Bỏ dòng `delete` đi thì `four` xuất hiện trở lại — đúng như mong đợi.

### ✅ Kiểm tra tồn tại, cập nhật giá trị

Kiểm tra xem một key có tồn tại trong map không là thao tác các bạn sẽ dùng **liên tục**. Cách làm: tra map và nhận **hai giá trị trả về** — value và biến `ok` kiểu Boolean:

```go
value, ok := intMap["four"]
if ok {
    fmt.Println(value, "is in map")
} else {
    fmt.Println(value, "is not in map")
}
```

`ok` sẽ là `true` nếu key tồn tại, `false` nếu không. Khi không tìm thấy, value nhận **giá trị mặc định** của kiểu dữ liệu — với `int` là `0`. Vì mình vừa xóa key `four` nên chương trình in ra "0 is not in map". Nếu comment dòng `delete` đi và chạy lại, các bạn sẽ nhận "4 is in map" — nó tìm thấy thật.

Cập nhật giá trị cũng đơn giản không kém:

```go
intMap["two"] = 4
```

Dòng này **ghi đè** giá trị cũ của key `two` trong map.

| Thao tác | Cú pháp | Ghi chú |
|---|---|---|
| Tạo map | `make(map[string]int)` | Chỉ khai báo `var` sẽ ra nil map, không dùng được |
| Gán / cập nhật | `intMap["two"] = 4` | Ghi đè giá trị cũ |
| Xóa key | `delete(intMap, "four")` | Xóa hẳn key khỏi map |
| Kiểm tra tồn tại | `value, ok := intMap["four"]` | `ok` là `true`/`false` |
| Duyệt map | `for key, value := range intMap` | Thứ tự không xác định |

Maps cực kỳ hữu ích, xuất hiện khắp nơi và các bạn sẽ dùng chúng thường xuyên trong Go. Một điểm cộng nữa: **tra cứu trong map cực nhanh** — tốn rất rất ít thời gian. Nhanh, dễ dùng, và không bao giờ phải lo về pointer. Đây là kiểu dữ liệu các bạn nên làm quen thật kỹ.

---

### ✅ Tự kiểm tra nhanh

**1. Vì sao không nên dùng `var myMap map[string]string` rồi thao tác luôn?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì đó là nil map, không làm được gì cả; phải tạo bằng `make`.
Giải thích: `intMap := make(map[string]int)` mới tạo ra map dùng được.
Tham chiếu: Mục "Tạo map đúng cách"

</details>

**2. Vì sao làm việc với map không cần pointer?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì map là reference type, luôn được truyền theo tham chiếu.
Giải thích: Rất hiếm khi thấy con trỏ tới map trong code Go.
Tham chiếu: Mục "Map là reference type"

</details>

**3. Map có đảm bảo thứ tự các key khi duyệt không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không. Thứ tự là ngẫu nhiên, dù đôi khi trùng với thứ tự nhập vào.
Giải thích: Đội ngũ Go quyết định không ai được sắp xếp map hay giả định thứ tự truy xuất.
Tham chiếu: Mục "Thứ tự trong map — đừng bao giờ tin!"

</details>

**4. Làm sao kiểm tra một key có tồn tại trong map?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tra map với hai giá trị trả về: `value, ok := intMap["four"]`; kiểm tra `ok` là `true`/`false`.
Giải thích: Khi không tìm thấy, value nhận giá trị mặc định của kiểu (với `int` là `0`).
Tham chiếu: Mục "Kiểm tra tồn tại, cập nhật giá trị"

</details>

**5. Cách xóa một key và cập nhật một giá trị trong map?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xóa bằng `delete(intMap, "four")`; cập nhật bằng gán đè `intMap["two"] = 4`.
Giải thích: Gán lại theo key sẽ ghi đè giá trị cũ.
Tham chiếu: Mục "Thứ tự trong map" và "Kiểm tra tồn tại, cập nhật giá trị"

</details>

---

Maps nhanh, gọn và cực kỳ tiện — *các bạn cứ thực hành vài lần là quen tay ngay.* Bài tiếp theo chúng ta sẽ xem **functions** dưới góc nhìn reference type, cùng variadic và method receiver. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Package builtin — make, delete](https://pkg.go.dev/builtin)
- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Udemy — Maps](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161972)
