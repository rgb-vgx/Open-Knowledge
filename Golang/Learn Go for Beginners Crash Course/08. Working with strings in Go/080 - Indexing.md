# 🔢 Indexing trong Go — Vì sao mọi thứ lại bắt đầu từ số 0?

> Nguồn: `080-Indexing.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162342)

Nếu có thứ gì khiến sinh viên năm nhất khoa học máy tính đau đầu, thì đó chính là **cách chúng ta đếm trong lập trình**. Trong bài này, mình muốn nói kỹ về **indexing (đánh chỉ số)** — cách đếm từng phần tử trong chuỗi, trong mảng và trong slice. *Đây là chủ đề mà mình tin chắc sau vài lần sửa cùng một lỗi, nó sẽ trở thành bản năng của các bạn.*

---

### 🧹 Khởi động lại với biến courseName

Mình quay lại project cũ, xóa các import statement và dọn sạch hàm `main()` để bắt đầu từ con số không. Đầu tiên, khai báo một biến chứa tên khóa học:

```go
courseName := "Learn Go for Beginners Crash Course"
fmt.Println(courseName[0])
```

Ngay trên biến này, mình dán vào một "bảng đồ" chuẩn bị trước khi quay: hàng dưới đếm đơn vị 0–9 lặp đi lặp lại cho từng ký tự, hàng trên đếm hàng chục. Nhờ đó, các bạn nhìn là biết ngay ký tự nào ứng với index nào.

Giờ thử đoán xem `courseName[0]` in ra gì? Mình chạy `go run main.go`, và kết quả **không phải chữ `L`** như nhiều người tưởng, mà là **`76`** — giá trị int, chính là rune tương ứng với chữ `L`. Muốn in ra chữ, mình phải **cast (ép kiểu)** nó sang string:

```go
fmt.Println(string(courseName[0]))
```

Lần này chữ `L` hiện ra đúng như mong đợi.

---

### 🏢 Vì sao lại đếm từ số 0?

Mình muốn in chữ `G` trong "Go" — nhìn bảng đồ, nó nằm ở **index 6**, tức vị trí thứ 7 nếu đếm theo cách thông thường. Đếm từ 0 nên ký tự thứ 7 mang index 6.

Nghe lạ đúng không? Nhưng thật ra ngoài đời chúng ta cũng đếm như vậy. Mình lấy ví dụ từ trải nghiệm bản thân: ở Canada, và ở mọi tiểu bang nước Mỹ mà mình từng đến (48 trong tổng số 50 tiểu bang), khi vào một tòa nhà hay khách sạn, tầng trệt được gọi là **ground floor** — tức tầng số 0. Bấm thang máy lên một tầng, nút kế tiếp luôn ghi số **2**, chứ không phải số 1. Hóa ra lối đếm từ 0 chẳng hề xa lạ.

| Ký tự | Index | Vị trí nếu đếm từ 1 |
|---|---|---|
| `L` trong "Learn" | 0 | 1 |
| `G` trong "Go" | 6 | 7 |
| `s` cuối "Beginners" | 21 | 22 |
| `C` trong "Course" | 29 | 30 |

---

### 🔁 Duyệt chuỗi bằng vòng for

Sau đó, mình viết một vòng lặp để in ra một đoạn của chuỗi, dùng `fmt.Print` (print chứ không phải print line, để các ký tự nằm liền nhau):

```go
for i := 0; i <= 21; i++ {
    fmt.Print(string(courseName[i]))
}
```

Vòng lặp chạy từ 0 đến **index 21** (bao gồm cả 21), in ra: `Learn Go for Beginners`. Rất gọn.

Rồi mình sao chép nguyên đoạn code đó, thêm một dòng trống phía trước cho dễ nhìn, và đổi điểm bắt đầu thành **index 13**, giữ nguyên điểm kết thúc 21. Chạy lại, chương trình chỉ in ra đúng một từ: `Beginners`.

Chuyện này thoạt nghe khó hiểu, và hầu như lúc nào cũng vậy — người mới học lập trình hay quên mất rằng chúng ta bắt đầu từ vị trí 0. Nhưng sau một thời gian, sau vài lần sửa đi sửa lại cùng một lỗi như thế, nó sẽ trở thành phản xạ tự nhiên. *Mình hứa đấy.*

---

### ✅ Tự kiểm tra nhanh

**1. `courseName[0]` in ra gì nếu không cast sang string?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `76` — giá trị int, tức rune của chữ `L`.
Giải thích: Muốn in ra chữ phải cast sang string bằng `string(courseName[0])`.
Tham chiếu: Mục "Khởi động lại với biến courseName"

</details>

**2. Chữ `G` trong "Go" nằm ở index nào và vì sao?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Index 6.
Giải thích: Đó là ký tự thứ 7, nhưng vì đếm từ 0 nên mang index 6.
Tham chiếu: Mục "Vì sao lại đếm từ số 0?"

</details>

**3. Ví dụ tòa nhà được nhắc tới để làm gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để cho thấy đếm từ 0 cũng xuất hiện ngoài đời thực.
Giải thích: Tầng trệt là ground floor — tầng số 0; nút thang máy kế tiếp ghi số 2.
Tham chiếu: Mục "Vì sao lại đếm từ số 0?"

</details>

**4. Vòng lặp `for i := 0; i <= 21; i++` in ra gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `Learn Go for Beginners`.
Giải thích: Vòng lặp chạy từ 0 đến hết index 21, dùng `fmt.Print` nên các ký tự nằm liền nhau.
Tham chiếu: Mục "Duyệt chuỗi bằng vòng for"

</details>

**5. Khi đổi điểm bắt đầu thành 13 và giữ điểm kết thúc 21, kết quả là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `Beginners`.
Giải thích: Chỉ còn các ký tự từ index 13 đến 21 được in ra.
Tham chiếu: Mục "Duyệt chuỗi bằng vòng for"

</details>

---

Indexing thoạt nhìn chỉ là chuyện nhỏ, nhưng nó là nền móng cho mọi thứ liên quan tới chuỗi, mảng và slice trong Go — nên mình rất mong các bạn nắm chắc nó. Bài tiếp theo, chúng ta sẽ cùng xem **độ dài chuỗi (string length)** và một cạm bẫy kinh điển: `index out of range`. Hẹn gặp lại các bạn! 🚀
