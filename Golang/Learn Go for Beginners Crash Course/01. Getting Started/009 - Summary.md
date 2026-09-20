# 🎉 Tổng kết chặng Getting Started — Từ cài đặt đến Eliza biết nói

> Nguồn: `009-Summary.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161734)

Chúng ta vừa đi hết chặng đầu tiên của khóa học. Trong **chưa đầy một giờ đồng hồ**, các bạn đã cài Go, cài công cụ, viết chương trình đầu tiên và dựng được một chương trình trò chuyện nho nhỏ. Bài này mình sẽ điểm lại toàn bộ để các bạn thấy mình đã đi được bao xa — kèm một món quà nhỏ ở cuối.

*Đọc chậm thôi, đây là lúc ôn lại chứ chưa phải học nội dung mới.*

---

### 🕐 Chưa đầy một giờ, chúng ta đã học được gì?

Danh sách khá dài đấy:

* Cài **Go** lên máy cá nhân.
* Cài một **IDE** (môi trường phát triển tích hợp) là **Visual Studio Code**.
* Biết rằng Go **không cần runtime** như Java hay C#, mà là ngôn ngữ **biên dịch (compiled)** — khác với Python hay PHP — và ngôn ngữ biên dịch thì **rất, rất nhanh**.
* Tạo dự án **hello world** đầu tiên để in chữ ra console.
* Hiểu **code block** là gì — mọi thứ nằm giữa cặp ngoặc nhọn của một hàm.
* Biết **gọi hàm**: dùng package `fmt` (thuộc standard library) để in ra màn hình.
* Biết **truyền tham số**: gọi hàm `response` trong package `doctor` và truyền input người dùng vào.
* Biết tạo **biến** theo hai cách khác nhau.
* Biết **hàm `main`** là điểm khởi đầu của chương trình.

---

### 🧱 Những viên gạch nền móng của Go

Vài quy tắc nền tảng, mình gom lại cho các bạn dễ nhớ:

| Quy tắc | Nội dung |
|---|---|
| Package declaration | Mọi file Go **phải** có, và là dòng đầu tiên |
| Package chính | Phải có package `main`; thường đặt tên `main` nhưng **không bắt buộc** |
| Hàm main | Là điểm vào chương trình; không nhận tham số |
| Biến | Tạo bằng `var` kèm kiểu dữ liệu, hoặc viết tắt `:=` |
| In ra màn hình | Gọi hàm trong package `fmt` của standard library |
| Truyền tham số | Ví dụ truyền input người dùng vào hàm `response` của package `doctor` |

Các bạn có thể để ý: mọi thứ đều xoay quanh những viên gạch nhỏ này. Nắm chắc chúng rồi, phần còn lại của Go sẽ dễ thở hơn rất nhiều.

---

### 🤖 Từ Hello World đến Eliza — và những gì còn phía trước

Chúng ta đã biến dự án hello world đơn giản thành một chương trình **mô phỏng trò chuyện với Eliza** — chương trình có thể nhận câu người dùng gõ, trả lời, và thoát khi gõ **quit**.

Nhưng còn **rất nhiều thứ các bạn chưa hiểu**, và điều đó hoàn toàn bình thường. Chẳng hạn, các bạn đã hiểu một phần những gì diễn ra trong package `doctor`, nhưng chắc chắn chưa hiểu hết — và có thể các bạn đang thấy hơi ngợp.

*Đừng ngợp nhé. Người làm code nhiều năm cũng bối rối suốt, và khi mới chập chững với Go thì chuyện hơi rối là hoàn toàn dễ hiểu.*

Mình hứa: trong phần còn lại của khóa học, chúng ta sẽ đi qua **từng thứ một** trong file `doctor` và còn nhiều hơn thế nữa. Chúng ta sắp bước sang section mới.

---

### 📦 Bonus — đóng gói chương trình thành file thực thi với go build

Đây là món quà nhỏ trước khi kết thúc. Lâu nay chúng ta chạy chương trình bằng `go run main.go` — cách này hoạt động tốt, nhưng nó **biên dịch lại chương trình mỗi lần chạy**.

Mình muốn **build** chương trình thành một file thực thi (executable). Chỉ cần một lệnh: `go build -o Eliza main.go`.

Sau đó, nếu các bạn gõ `ls` (trên macOS/Linux) hoặc `dir` (trên Windows), các bạn sẽ thấy một file mới tên là **Eliza** vừa được tạo ra. Chạy nó bằng đúng tên file — `Eliza` — chương trình hoạt động y như cũ, và mình vẫn gõ **quit** để thoát. Đó chính là phiên bản đã biên dịch của chương trình.

Vài lưu ý quan trọng:

1. Trên **Windows**, các bạn cần build thành `go build -o Eliza.exe main.go`. Nếu không có đuôi `.exe`, Windows có thể không nhận ra đây là file thực thi.
2. Go **đủ thông minh** để khi biên dịch `main.go`, nó tự phát hiện file này đang dùng những package khác — một số thuộc standard library, cộng thêm package `doctor` do chúng ta thêm vào — và đóng gói tất cả thành một file thực thi duy nhất.

| Tiêu chí | `go run main.go` | `go build -o Eliza main.go` |
|---|---|---|
| Kết quả | Biên dịch rồi chạy ngay | Tạo ra file thực thi tên `Eliza` |
| Biên dịch | Mỗi lần chạy đều biên dịch lại | Biên dịch một lần |
| Chạy lại | Phải gõ `go run main.go` | Chạy trực tiếp file `Eliza` |
| Trên Windows | Dùng như bình thường | Cần đặt tên `Eliza.exe` |

---

### ✅ Tự kiểm tra nhanh

**1. Go là ngôn ngữ biên dịch hay thông dịch, và khác Java/C# ở điểm nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Go là ngôn ngữ biên dịch (khác Python/PHP) và **không cần runtime** như Java hay C#.
Giải thích: Nhờ biên dịch trước, chương trình Go chạy rất nhanh và phân phối gọn gàng hơn.
Tham chiếu: Mục "Chưa đầy một giờ, chúng ta đã học được gì".

</details>

**2. Code block trong Go là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là mọi thứ nằm giữa cặp ngoặc nhọn của một hàm (ví dụ hàm `main`).
Giải thích: Khối code này thuộc về hàm chứa nó và được thực thi khi hàm chạy.
Tham chiếu: Mục "Chưa đầy một giờ, chúng ta đã học được gì".

</details>

**3. Hàm `main` có vai trò gì, và package chính có bắt buộc tên `main` không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hàm `main` là điểm khởi đầu của chương trình; package chính thường đặt tên `main` nhưng **không bắt buộc**.
Giải thích: Mọi file Go phải có package declaration; quy ước đặt package chính là `main`.
Tham chiếu: Mục "Những viên gạch nền móng của Go".

</details>

**4. Hai cách khai báo biến trong Go là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng `var` kèm kiểu dữ liệu, hoặc dùng cú pháp viết tắt `:=`.
Giải thích: `:=` để Go tự suy ra kiểu từ giá trị bên phải; `var` thì tường minh hơn nhưng dài hơn.
Tham chiếu: Mục "Những viên gạch nền móng của Go".

</details>

**5. `go build` khác `go run` ở điểm nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `go run` biên dịch và chạy ngay mỗi lần gọi; `go build` tạo ra file thực thi (`Eliza`, hoặc `Eliza.exe` trên Windows) để chạy trực tiếp.
Giải thích: Go tự phát hiện các package được dùng — kể cả package `doctor` — và đóng gói vào file thực thi.
Tham chiếu: Mục "Bonus — đóng gói chương trình thành file thực thi với go build".

</details>

---

Vậy là chặng "Getting Started" đã khép lại, và các bạn đã có trong tay những viên gạch đầu tiên của Go: biết cài đặt, biết chạy, biết đọc code. Ở **section tiếp theo**, chúng ta sẽ đi sâu hơn vào ngôn ngữ — nơi những điều còn mơ hồ trong file `doctor` sẽ dần sáng tỏ. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [go command — tài liệu chính thức](https://pkg.go.dev/cmd/go)
- [How to Write Go Code](https://go.dev/doc/code)
