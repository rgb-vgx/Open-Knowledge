# 🏆 Lời giải challenge — Chơi rock paper scissors đúng ba ván

> Nguồn: `064-Solution-to-Challenge.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162258)

Các bạn làm bài challenge thế nào? Mình chắc là sau khi bắt tay vào, các bạn nhận ra nó **không chỉ đơn giản là bọc vài dòng code trong một vòng lặp `for`**. Các bạn còn phải sửa cả những chỗ mà chương trình **ra quyết định** nữa.

Hôm nay mình sẽ chạy lời giải hoàn chỉnh của mình, rồi cùng các bạn đi qua từng thay đổi trong code. Code của mình vẫn có sẵn trong course resources để các bạn tải về nếu muốn.

---

### 🎬 Chạy thử lời giải hoàn chỉnh

Mình mở terminal và chạy `go run main.go`. Đầu tiên chương trình in ra hướng dẫn: rock paper and scissors, game chơi ba ván, ai thắng hai ván thì thắng cả game, good luck. Rồi tới **Round one**.

1. Mình nhập `rock` → player chose rock, computer chose scissors, **player wins**. Tiếp theo là vòng hai.
2. Lần này mình nhập `fish` — dữ liệu không hợp lệ. Kết quả: player chose fish, computer chose paper, **invalid choice**. Và chương trình **lặp lại vòng hai**, đây chính là một trong những thay đổi mà các bạn cần làm.
3. Mình nhập `paper` → player chose paper, computer chose scissors. Kéo cắt giấy nên **computer wins**.
4. Vòng cuối mình nhập `paper`, kết quả là **hòa**. Mình nhập `paper` lần nữa và lần này **player wins**.

Cuối cùng chương trình in điểm: player hai trên ba, computer một trên ba, **player thắng cả game**.

---

### 🔧 Những thay đổi quan trọng trong hàm main

Trong source code, mỗi chỗ mình sửa đều được đánh dấu bằng **ba dấu sao** để các bạn dễ nhận ra. Cụ thể:

* Thêm hai biến để theo dõi điểm số: `playerScore` và `computerScore` (quanh dòng 24).
* In ra phần hướng dẫn bằng `fmt.Println`.
* Thêm vòng lặp `for` ở dòng 39: `i` bắt đầu từ `1`, chạy khi `i <= 3`, và tăng `i` thêm một sau mỗi vòng.
* Bên trong vòng lặp, in một dòng trống rồi in số vòng hiện tại (`round` kèm `i`), sau đó gạch dưới cho đẹp mắt.
* **Chuyển phần tính lựa chọn của máy tính vào bên trong vòng lặp.** Nếu để ngoài, máy tính sẽ giữ nguyên một lựa chọn cho cả ba ván, chơi sẽ rất nhanh chán.
* **Reset `playerValue` về `-1` khi lựa chọn không hợp lệ.** Đây là chỗ rất dễ bỏ sót — mình cũng nói luôn là nếu các bạn quên thì đừng buồn, vì nó dễ sơ ý thật. Nếu không reset, `playerValue` sẽ giữ nguyên giá trị của lần chọn trước đó, và logic phía dưới sẽ chạy sai.
* In lựa chọn của người chơi ở dạng **viết hoa** cho khớp với cách in lựa chọn của máy tính — thay đổi này chỉ để nhìn cho đẹp.

---

### 🧮 Hòa thì chơi lại, nhập sai cũng chơi lại

Ở phần xử lý kết quả (quanh dòng 82), khi hai bên **hòa**, mình trừ `i` đi một để vòng lặp lặp lại **chính ván đó**. Mình dùng cách viết tắt `i--`. Nếu không làm vậy, chương trình có thể gặp ba lần hòa liên tiếp và chẳng ai thắng cả game.

Điều tương tự cũng đúng với `default` trong `switch`: nếu người chơi nhập lựa chọn không hợp lệ, mình cũng giảm `i` đi một để chơi lại ván đang diễn ra.

---

### 🧩 computerWins và playerWins — không lặp lại chính mình

Ở phần xử lý thắng thua, thay vì viết mọi thứ bằng `if` như trước, mình tạo hai hàm mới:

* `computerWins` — nhận vào điểm hiện tại của máy tính, in ra thông báo và trả về điểm cộng thêm một.
* `playerWins` — làm điều tương tự với điểm của người chơi.

Hai hàm này rất đơn giản, mục đích chỉ là để mình **không phải lặp lại code** nhiều hơn cần thiết. Trong `switch`, mình gọi `computerWins` hoặc `playerWins` tùy theo kết quả, truyền vào giá trị điểm hiện có.

---

### 📊 Điểm cuối cùng và bước tiếp theo

Ở cuối chương trình, mình in ra thông tin điểm số cuối cùng, và dùng thêm một câu `if` để xác định ai thắng cả game rồi in thông báo tương ứng. Vậy là xong lời giải!

*Nếu lời giải của các bạn khác mình một chút cũng không sao — miễn là chương trình chạy đúng.*

Tiếp theo, chúng ta sẽ quay lại với **channel** và làm quen với một thứ mới toanh: câu lệnh **`select`**. Hẹn gặp lại các bạn! 🚀
