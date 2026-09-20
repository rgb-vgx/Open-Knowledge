# ☕ Menu app bản while — Thử thách đổi vòng lặp vô hạn

> Nguồn: `055-The-While-Loop-in-our-Menu-App.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162210)

Chào các bạn! Hôm nay chúng ta mang kiến thức về `for` áp dụng vào một chương trình quen thuộc: **menu app** đơn giản mà chúng ta từng làm. Mình sẽ đổi vòng lặp vô hạn của nó sang **kiểu while**, và ở cuối bài sẽ có một **thử thách nho nhỏ** dành cho các bạn. Nghe vui rồi đấy chứ?

### 🧋 Ôn lại menu app

Project của mình tên là `console-app`. Chương trình chỉ làm đúng một việc: in ra danh sách các món cà phê và chạy mãi cho đến khi bạn bấm phím `q`. Chạy lại cho chắc:

* Gõ `1` → "you chose cappuccino".
* Gõ `2` → "you chose latte".
* Gõ `q` → chương trình thoát.

Đơn giản vậy thôi. Điểm mình muốn sửa nằm ở **dòng 39** — một **infinite for loop** quen mặt: `for`, rồi mở ngoặc nhọn, không có gì khác. Vòng lặp này chạy mãi mãi, và chương trình thoát ra được là nhờ đoạn kiểm tra ở các **dòng 45, 46, 47**: nếu người dùng gõ `q` thường hoặc `Q` hoa thì nhảy ra khỏi vòng lặp.

---

### 🔧 Đổi sang kiểu while

Mục tiêu: thay vòng lặp vô hạn bằng **`for` cộng một biểu thức Boolean** — đúng kiểu while của Go.

Các bước mình làm:

1. Chừa vài dòng trống quanh dòng 39.
2. Khai báo biến ký tự **trước** vòng lặp: `char := ' '` — gán một dấu cách, đơn giản vì dấu cách không phải chữ `q`. (Lưu ý: `GetSingleKey` của package `keyboard` trả về một `rune`, mà rune thì phải có ít nhất một ký tự, không thể để rỗng.)
3. Điều kiện vòng lặp: `for char != 'q'`.
4. Bên trong vòng lặp, vì `char` đã được khai báo từ trước, mình **không dùng `:=` nữa** mà dùng dấu `=` để gán giá trị mới mỗi lần người dùng bấm phím.
5. Comment các dòng kiểm tra `q`/`Q` cũ ở 45–47 — giờ chúng không còn cần thiết.

| | Trước (infinite for) | Sau (kiểu while) |
|---|---|---|
| Vòng lặp | `for` vô hạn | `for char != 'q'` |
| Cách thoát | kiểm tra `q`/`Q` rồi `break` | điều kiện chuyển thành sai |
| Biến `char` | khai báo trong thân vòng lặp | khởi tạo trước, gán lại bằng `=` |

---

### 🧪 Chạy thử: hai vấn đề lộ ra

Chạy `go run main.go`, mình nhập `1` → cappuccino, `6` → espresso, rồi gõ `q`. Chương trình **thoát đúng như mong đợi**, nhưng có hai chỗ chưa ổn:

1. Khi gõ `q`, màn hình in ra **"you chose nothing"** — một thông điệp vô nghĩa, vì `q` đâu phải món cà phê nào.
2. Mình giữ `Shift` và gõ `Q` hoa... chương trình **không thoát nữa**! Trước khi sửa thì `Q` hoa hoạt động, còn bây giờ chỉ còn `q` thường thoát được.

Mình ghi chú lại hai vấn đề này để lát nữa xử lý — và cũng để giao cho các bạn làm thử.

---

### 🎯 Thử thách của bạn

Nhiệm vụ của các bạn lần này gồm hai phần:

* Sửa để vòng lặp **chỉ tiếp tục khi người dùng chưa gõ `q` hoặc `Q`** (cả chữ thường lẫn chữ hoa đều phải thoát được).
* In ra một **thông điệp ý nghĩa** khi người dùng gõ `q`, thay vì "you chose nothing".

*Không khó lắm đâu, chỉ mất một chút thời gian suy nghĩ thôi.* Nếu bí, đừng lo — bài tiếp theo mình sẽ trình bày lời giải của mình. Hẹn gặp lại! 🚀
