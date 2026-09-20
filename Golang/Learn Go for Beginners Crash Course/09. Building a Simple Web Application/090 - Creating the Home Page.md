# 📄 Tạo trang chủ đầu tiên — tách HTML ra file `index.html`

> Nguồn: `090-Creating-the-Home-Page.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162372)

Chào các bạn! Bài trước chúng ta đã gửi được HTML về trình duyệt, nhưng phải nhét HTML vào một biến string trong code Go. Lần này mình muốn trang web nằm trong **một file riêng** — như cách người ta vẫn làm ngoài đời thực. *Cứ thong thả, chúng ta sẽ đi từng bước chậm rãi như mọi khi.*

### 🚪 Vì sao phải tách HTML ra file riêng?

Trong một web application bận rộn, các bạn có thể có **hàng trăm trang**. Nếu viết từng trang dưới dạng biến string trong chương trình Go, mỗi lần sửa một chữ là phải biên dịch lại — cực kỳ phiền phức.

Nên lần này mình dừng ứng dụng (nhấn `Ctrl+C`) và tạo một file mới trong khung Explorer bên trái: file này **không phải file Go**, mà có tên `index.html`. Đuôi `.html` là cách đặt tên chuẩn cho web page.

---

### ⚡ Dùng Emmet tạo khung HTML5 trong một nốt nhạc

Vì đang dùng Visual Studio Code, chúng ta được "ăn gian" một chút: VS Code có sẵn **Emmet**. Mở file `index.html`, gõ `html:5` rồi nhấn phím **Tab** — Emmet tự sinh cho chúng ta một trang HTML5 rỗng nhưng đầy đủ khung. Giờ mình cùng đi qua từng dòng:

| Dòng trong file | Ý nghĩa |
|---|---|
| `<!DOCTYPE html>` | Khai báo đây là trang HTML5 — chuẩn của web hiện nay |
| `lang="en"` | Trình duyệt bỏ qua, chỉ cho biết ngôn ngữ đang viết là tiếng Anh |
| `head` | Chứa các khai báo; rất ít nội dung trong này hiện ra cho người dùng |
| `charset="utf-8"` | Cho phép hiển thị ký tự tiếng Anh chuẩn, cả bảng chữ cái Hy Lạp hay kanji |
| `meta http-equiv ...` | Nói với browser "tôi là trang hiện đại, hãy render theo chuẩn hiện đại" |
| `meta viewport` | Quy định cách xử lý khi cửa sổ đổi kích thước; `initial-scale=1` để không zoom |
| `title` | Thứ hiện lên trên **tab trình duyệt** — như tab Google hiện chữ "Google" |

Mình đổi nội dung thẻ `title` thành `Rock, Paper, Scissors` — tên mà trang này sẽ dùng về sau.

---

### 🖱️ Xem trước và thêm nội dung vào trang

Mẹo hay cho các bạn: mở một tab mới trong trình duyệt, chọn **File → Open File**, vào thư mục project Visual Studio (sắp xếp theo **Date Modified** cho dễ tìm) và mở `index.html`. Từ giờ, mỗi lần sửa file và tải lại trang, các bạn thấy thay đổi ngay lập tức.

Và đây là một phát hiện thú vị: mình đặt tên trang rồi mà phần thân trang vẫn trống trơn. Vì sao? Vì **thứ hiện ra trong cửa sổ nằm trong thẻ `body`** — mà `body` đang rỗng.

Mình bắt đầu đưa nội dung vào `body`:

1. Gõ dòng chữ `rock paper scissors` — tải lại trang, chữ hiện ra, nhưng chưa đẹp.
2. Bọc nó trong thẻ `h1` — chữ trở thành tiêu đề, trông giống cái tựa hơn hẳn. Thẻ `h` có nhiều cấp độ, `h1` là cấp cao nhất.
3. Thêm thẻ `hr` — viết tắt của **horizontal rule**, tức đường kẻ ngang. Lưu ý: `hr` là thẻ **không có thẻ đóng**, nó tồn tại một mình.
4. Cuối cùng, thêm ba nút bấm bằng thẻ `button` — một cho `rock`, một cho `paper`, một cho `scissors`.

```html
<h1>Rock, Paper, Scissors</h1>
<hr>
<button>Rock</button>
<button>Paper</button>
<button>Scissors</button>
```

Kết quả là ba nút bấm *"đơn sắc"* đúng nghĩa đen — chưa đẹp chút nào, nhưng chính xác là điểm khởi đầu mình muốn.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Dòng đầu tiên `<!DOCTYPE html>` có ý nghĩa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khai báo với trình duyệt rằng đây là trang HTML5.
Giải thích: HTML5 là chuẩn web page ở thời điểm khóa học được ghi hình.
Tham chiếu: Mục "Dùng Emmet tạo khung HTML5".

</details>

**Câu 2:** Nội dung người dùng nhìn thấy trên trang nằm ở thẻ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thẻ `body`.
Giải thích: Phần thân trang trống thì cửa sổ trình duyệt cũng trống, dù `title` đã đặt.
Tham chiếu: Mục "Xem trước và thêm nội dung vào trang".

</details>

**Câu 3:** Thẻ `title` hiển thị ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trên tab trình duyệt.
Giải thích: Ví dụ tab của google.com hiện chữ "Google"; phần lớn nội dung trong `head` không hiện cho người dùng.
Tham chiếu: Mục "Dùng Emmet tạo khung HTML5".

</details>

**Câu 4:** `charset="utf-8"` để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cho phép hiển thị nhiều loại ký tự và ngôn ngữ khác nhau — từ tiếng Anh chuẩn đến bảng chữ cái Hy Lạp hay kanji.
Giải thích: Đây là khai báo bộ ký tự của trang.
Tham chiếu: Mục "Dùng Emmet tạo khung HTML5".

</details>

**Câu 5:** Thẻ `hr` có gì đặc biệt?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nó là **horizontal rule** — đường kẻ ngang — và **không có thẻ đóng**, tồn tại độc lập một mình.
Giải thích: Hầu hết mọi thứ trong HTML tạo bằng thẻ; một số thẻ không cần thẻ đóng.
Tham chiếu: Mục "Xem trước và thêm nội dung vào trang".

</details>

---

Trang chủ đã có tiêu đề, đường kẻ và ba nút — nhưng còn thiếu chỗ để hiển thị kết quả từng ván. Bài tiếp theo, chúng ta sẽ **trang trí trang này bằng Bootstrap** và tạo ba "ô" sẵn sàng nhận phản hồi: người chơi chọn gì, máy chọn gì, và ai thắng ván đó. Hẹn gặp lại! 🚀
