# 🎨 Làm đẹp trang chủ với Bootstrap — nhanh, gọn, và "có gu"

> Nguồn: `091-Improving-our-Home-Page.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162376)

Chào các bạn! Trang `index.html` của chúng ta đang chạy được, nhưng nói thật lòng thì... *nhìn không được đẹp lắm*. Hôm nay mình sẽ cùng các bạn làm hai việc: tạo ba "ô" sẵn sàng hiển thị kết quả từng ván, và khoác lên trang một bộ cánh gọn gàng bằng **Bootstrap**.

### 📝 Ba nơi hiển thị kết quả — thẻ `p` và thuộc tính `id`

Ngay dưới đường kẻ ngang, mình tạo **ba đoạn văn** bằng thẻ `p` (paragraph), mỗi đoạn phụ trách một việc:

1. **Người chơi đã chọn gì** (ví dụ "player chose rock").
2. **Máy đã chọn gì** (ví dụ "computer chose paper").
3. **Kết quả ván đó** — ai là người thắng.

Làm sao trình duyệt biết **khi cần đổi nội dung thì đổi ở đoạn nào**? Câu trả lời là gán cho mỗi đoạn một `id`: `player_choice`, `computer_choice` và `round_result`. Trong thẻ mở, mình thêm một **thuộc tính (attribute)** tên `id`, viết dạng *tên thuộc tính + dấu bằng + giá trị trong dấu ngoặc kép*.

Lưu ý nhỏ nhưng quan trọng: **đừng dùng dấu cách** trong `id` — đó là thói quen xấu. Thay vào đó dùng **snake case**, tức chỗ nào cần cách ra thì thay bằng dấu gạch dưới `_`. Mình tạm đặt vài dòng chữ mẫu vào ba đoạn để thấy chúng nằm ở đâu trên trang.

---

### 🎨 Bootstrap — "bộ đồ" có sẵn của cộng đồng web

Trang của chúng ta vẫn chưa đẹp như bản demo đầu section, nên mình mở thêm một tab tới **getbootstrap.com**. Bootstrap là một **CSS framework (cascading style sheet framework)** — do chính những người vận hành Twitter phát triển và cực kỳ phổ biến.

Cách "nhập khẩu" nó vào trang rất thú vị:

1. Trên trang Bootstrap, cuộn xuống phần **jsDelivr**, tìm đoạn *"when you only need to include Bootstrap's compiled CSS"*.
2. Bấm nút **Copy**.
3. Quay lại VS Code, chèn vào **dòng 7** — ngay sau thẻ `meta` viewport và **trước thẻ mở `title`** — rồi lưu lại.

Tải lại trang, ban đầu mọi thứ thay đổi rất ít — nhưng ba nút bấm đã trông nhỉnh hơn một chút. Bootstrap thuần túy là **sự tiện lợi**: nó giúp ta khỏi phải tự định nghĩa một núi style, và với mục đích của khóa học thì quá đủ.

---

### 📦 `div class="container"` — đưa nội dung vào giữa trang

Điều đầu tiên cần biết về Bootstrap: nó **mong đợi nội dung trong thẻ `body` nằm trong một `div` (division)**, và `div` đó cần có thuộc tính `class` với giá trị `container`. Nhớ viết đúng chính tả, sai một chữ là không chạy đâu nhé!

Khi mình gõ xong thẻ mở `div`, VS Code tự động viết luôn thẻ đóng giúp mình. Mình cắt thẻ đóng đó, dời xuống **ngay trước thẻ đóng `body`**, rồi thụt lề (tab) lại cho gọn gàng — thẻ `div` mở và đóng phải thẳng hàng với nhau.

Tải lại trang: toàn bộ nội dung đã **vào giữa trang**. Tuyệt! Nhưng tiêu đề vẫn dính sát mép trên, mà mình thì hơi khó tính chuyện đó — nên mình thêm class `mt-4` cho thẻ `h1` (`mt` là **margin top**, số `4` tương ứng một đơn vị nào đó, không quan trọng lắm). Tiêu đề tụt xuống một chút, hài hòa hơn hẳn.

---

### 🔘 Nút "xịn", câu hướng dẫn và `&nbsp;`

Với Bootstrap, cứ dùng `class` — đây chính là **CSS class**: bạn muốn kiểu trang trí gì thì gọi tên class đó. Mình làm lần lượt: thêm `btn` cho nút (trông vẫn chưa ra dáng nút lắm), rồi thêm `btn-outline-secondary` — tải lại trang, nút đẹp lên trông thấy. Nút thứ hai dùng `btn-outline-danger`, nút thứ ba dùng `btn-outline-success`, nhớ đặt giá trị trong **dấu ngoặc kép**.

| Class Bootstrap | Tác dụng |
|---|---|
| `container` | Bọc nội dung, căn ra giữa trang |
| `mt-4` | Thêm khoảng cách phía trên (margin top) cho `h1` |
| `btn` | Tạo kiểu dáng nút bấm |
| `btn-outline-secondary` / `danger` / `success` | Nút viền màu cho từng nút rock / paper / scissors |

Sau đó mình thêm hai thẻ `br` — viết tắt của **line break**, tức xuống dòng, giống như nhấn Enter trong word processor — để tạo khoảng trống, rồi chèn câu hướng dẫn *"Choose rock, paper or scissors!"* trong thẻ `p`, kèm một thẻ `hr` nữa phía trên. Tải lại, trang đã gọn gàng và dễ nhìn hơn hẳn.

Còn hai đoạn "player choice" và "computer choice" vẫn là chữ mẫu. Mình xóa chúng đi và thay bằng **non-breaking space** `&nbsp;` — thứ mà dân làm web dùng hoài. Các bạn thử nghĩ mà xem: nếu gõ liền 15–20 dấu cách, trang web tải lại vẫn chỉ hiện **một dấu cách duy nhất** — HTML tự gộp khoảng trắng! Nên `&nbsp;` (bắt đầu bằng dấu `&`, kết thúc bằng dấu `;`) nói với trình duyệt: *"trong thẻ p này có nội dung đấy, chỉ là một khoảng trắng"* — và nó giữ đúng một khoảng trắng để ta dễ thay nội dung về sau.

Vậy là trang đã sẵn sàng về mặt giao diện. *Đừng lo nếu các bạn chưa quen HTML hay Bootstrap* — mình đi hơi nhanh phần này vì mục tiêu chính vẫn là Go.

---

Trang web đã có giao diện ổn áp, ba ô kết quả đã sẵn sàng. Bước tiếp theo gồm hai phần: viết một ít **JavaScript** cho trang, và bổ sung code Go để ứng dụng lắng nghe thêm đường dẫn `/play` — đồng thời **gửi trang HTML thật** thay vì chuỗi hello world. Hẹn gặp lại các bạn ở bài sau! 🚀

## Nguồn tham khảo

- [Bootstrap — trang chủ chính thức](https://getbootstrap.com/)
