# ✅ Lời giải thử thách menu — q, Q và tin nhắn rỗng

> Nguồn: `056-Solution-to-Challenge.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162224)

Chào các bạn! Không biết các bạn xử lý thử thách menu app thế nào? *Mình hy vọng nó không quá khó* — cả hai phần đều nằm gọn trong những gì chúng ta đã học. Cùng xem lời giải của mình nhé, biết đâu cách của các bạn còn hay hơn.

### 🧩 Vấn đề 1: thoát bằng cả `q` lẫn `Q`

Phần này khá dễ. Chúng ta chỉ cần nhìn vào **biểu thức Boolean ở dòng 41** — dòng bắt đầu vòng lặp `for` — và thêm một điều kiện nữa:

```go
char != 'q' && char != 'Q'
```

Ý nghĩa: vòng lặp chỉ tiếp tục khi ký tự vừa bấm **không phải `q` và cũng không phải `Q`**. Vậy là xong vấn đề thoát chương trình bằng cả hai kiểu chữ.

---

### 🗺️ Vấn đề 2: nhớ lại bài học về map

Phần "không in ra tin nhắn rỗng" mới thú vị hơn, và nó đòi hỏi các bạn nhớ lại **bài học về map**. Nhắc nhanh: chúng ta có một **map** tên `coffees`, tra cứu giá trị bằng **index** dạng số.

Vậy muốn biết index người dùng vừa chọn có thật sự tồn tại trong map hay không, ta kiểm tra như sau:

* Gán hai giá trị trả về khi tra map: `l, ok := coffees[i]` — `ok` sẽ là `true` nếu entry tồn tại, `false` nếu không.
* Đưa câu lệnh in vào trong `if ok` — nghĩa là **chỉ in khi entry thật sự có**.
* Còn giá trị `l` mình không dùng tới, nên có thể bỏ đi bằng dấu gạch dưới `_` — đúng cách chúng ta từng làm với `range`.

Nhờ vậy, khi index không tồn tại, chương trình chẳng in gì cả thay vì in "you chose nothing".

---

### 🧪 Chạy thử và một lời ghi chú

Chạy `go run main.go` và thử lại:

* `1` → cappuccino, `6` → espresso.
* `w` → **không có gì xảy ra**, vì `w` không tồn tại trong map. Điều này chấp nhận được, tuy chưa lý tưởng — *thật ra chúng ta nên có một error check tử tế ở đây, và mình sẽ xử lý nó trong vài bài tới.*
* `Q` hoa → chương trình thoát gọn gàng.

Mọi thứ hoạt động đúng như mong đợi.

---

### 💬 Về chuyện "nhiều cách giải"

Các bạn hoàn toàn có thể đã làm theo cách khác mình. Điều đó **không sao cả** — miễn là chương trình đạt cùng kết quả. Cách của mình hợp với mình, cách của bạn hợp với bạn, và lập trình vốn dĩ luôn có nhiều đường để đến đích.

Cá nhân mình thường chọn cách **ít dòng code nhất**, vì mình thích code gọn gàng, dễ đọc. Nhưng nếu cách của bạn dài hơn một chút mà bạn thấy rõ ràng hơn thì cũng hoàn toàn hợp lý. *Quan trọng là hiểu mình đang viết gì.*

---

Menu app coi như hoàn chỉnh. Nhưng còn một câu hỏi thú vị mà mình nghe rất nhiều: giữa hai cách viết khác nhau nhưng cùng kết quả, **cách nào thật ra tốt hơn?** Bài tiếp theo chúng ta sẽ mổ xẻ câu hỏi đó — kèm một ví dụ đếm cụ thể. Hẹn gặp lại! 🚀
