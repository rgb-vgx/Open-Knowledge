# ✅ Hoàn thiện Guess the Number: Phép toán cuối và "mánh" luôn ra 3

> Nguồn: `013-Finishing-Guess-the-Number.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161768)

Còn đúng một bước nữa để trò chơi hoàn chỉnh. Trong bài này chúng ta sẽ tính đáp án, chạy thử từ đầu đến cuối, và cùng "bật mí" vì sao trò chơi này thực chất chỉ là một mánh toán học đơn giản.

### 🧮 Bước cuối: tính `answer`

Mình bỏ comment cho biến `answer` ở đầu chương trình, rồi làm phép toán theo đúng thứ tự mà phần hướng dẫn đã in ra:

```go
answer = firstNumber * secondNumber - subtraction

fmt.Println("the answer is", answer)
```

Để ý nhé: mình nhân `firstNumber` với `secondNumber`, rồi trừ đi `subtraction`. Nhưng...

---

### 🎩 Bí mật: đáp án luôn là 3

Điểm thú vị là **chương trình chưa bao giờ dùng đến con số mà người chơi đang nghĩ**. Đây chỉ là một mánh toán học đơn giản — các bạn thử google "math tricks" là sẽ thấy nó ngay ở trang đầu tiên.

Cùng xem lại một lượt chơi: nghĩ số **10**, nhân với 2 được 20, nhân tiếp với 5 được 100, chia cho số ban đầu (10) được 10, trừ 7 còn **3**. Đáp án luôn luôn là 3, dù người chơi chọn số nào.

Và điều đáng tự hào là chúng ta đã làm được kha khá thứ:

* **Lắng nghe input** từ người dùng dưới dạng bấm phím Enter.
* **In phản hồi** ra màn hình.
* Toàn bộ đều dùng **biến** để tổ chức.

---

### 📌 Hai điều mình muốn các bạn để ý

Thứ nhất, cách chúng ta in chuỗi hiện tại vẫn rất đơn giản và cơ bản. Có nhiều cách in tốt hơn, cho ta **kiểm soát nhiều hơn** về thông tin hiển thị, cách định dạng số thập phân và đủ thứ khác — *đừng lo, mình sẽ đưa các bạn tới đó trong thời gian tới*.

Thứ hai, về phép toán trong Go:

* Dấu nhân là `*` (dấu hoa thị).
* Dấu chia là `/` (dấu gạch chéo).

Đây là cách viết phép toán trong Go, và thực ra là ở gần như mọi ngôn ngữ lập trình. Các bạn sẽ còn gặp lại chúng nhiều lần nữa.

---

Trò chơi đã chạy trơn tru từ đầu đến cuối — một cột mốc nho nhỏ đáng ghi nhận. Những bài tới, chúng ta sẽ làm trò chơi này phức tạp hơn một chút bằng cách thêm logic mới. Nhớ lưu lại code trước khi đi tiếp nhé! 🚀
