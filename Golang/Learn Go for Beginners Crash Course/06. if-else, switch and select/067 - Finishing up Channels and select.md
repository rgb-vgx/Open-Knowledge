# 🖨️ Hoàn thiện game — Hàm PrintSummary và lời xin lỗi nho nhỏ

> Nguồn: `067-Finishing-up-channels-and-select-in-rock-paper-scissors.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162274)

Chúng ta đã tiến khá xa trong việc chuyển game rock paper scissors sang dùng channel và `select`. Lần trước mình có gợi ý rằng chương trình đang gặp vấn đề trong việc đếm số ván — nhưng sau khi xem lại video của bài đó, mình phát hiện ra mọi thứ **chạy đúng như thiết kế**.

*Xin lỗi các bạn một chút nhé: ván đầu tiên thực ra là một ván hòa, nên lần chơi thứ hai vẫn nằm ở round one. Các bạn có thể đã nhận ra điều đó còn mình thì không. Mình xin lỗi vì chuyện này.*

Vậy nên hôm nay mình chỉ cần làm nốt phần điểm số cuối cùng, rồi giao cho các bạn một challenge mới.

---

### 🧹 Dọn dẹp và mở lại phần điểm cuối

Trước hết, mình xóa những dòng comment không còn cần thiết, rồi **bỏ comment** phần in điểm cuối đã bị mình tạm khóa lần trước. Việc này sẽ tạo ra một số lỗi vì đoạn code đó đang tham chiếu tới những biến không còn tồn tại — nhưng không sao, mình cắt nó ra khỏi `main.go` và chuyển sang `game.go`.

---

### 🖨️ Hàm PrintSummary và điểm cuối cùng

Trong `game.go`, mình tạo một hàm mới:

```go
func (g *Game) PrintSummary() { ... }
```

Hàm này được gắn với **con trỏ tới type `Game`**, không nhận tham số và không trả về gì — nó chỉ in thông tin ra thôi. Tất nhiên, mình phải sửa lại các biến bên trong cho khớp với cấu trúc mới:

* `playerScore` ngày trước giờ thành `g.Round.PlayerScore`.
* `computerScore` ngày trước giờ thành `g.Round.ComputerScore`.

Vì đây là hàm đã được **export (xuất ra ngoài package)**, mình có thể quay lại `main.go` và gọi nó sau vòng lặp — tức sau khi đã thoát khỏi ván thứ ba — bằng `game.PrintSummary()`.

---

### 🧪 Chạy thử: thua 0-3 nhưng mọi thứ đều đúng

Mình chạy `go run main.go` và chơi thử một ván dài:

1. Round one, mình chọn `rock` → hòa. Vẫn ở round one.
2. Mình chọn `rock` lần nữa → lần này máy tính thắng.
3. Mình chọn `paper` → hòa. Vẫn ở round two.
4. Mình chọn `paper` lần nữa → máy tính thắng. Mình chơi dở thật.
5. Sang round three, mình chọn `scissors` → hòa.
6. Cuối cùng mình chọn `rock` → ván đấu kết thúc.

Kết quả hiện ra: **Final score** — mình được `0`, máy tính được `3`, computer thắng cả game. Mọi thứ chạy đúng như mong đợi.

*Mình có thể thêm một dòng trống trước phần điểm cuối cho đẹp, nhưng chuyện đó không quan trọng lắm trong phạm vi bài học hôm nay.*

---

### 🏋️ Challenge: mọi thông báo đều phải đi qua channel

Bây giờ đến phần bài tập. Trong file `game.go`, các bạn sẽ thấy còn khá nhiều chỗ mình vẫn dùng `fmt.Println` trực tiếp. Nhiệm vụ của các bạn:

* Sửa chương trình sao cho **chỗ duy nhất** dùng `fmt.Println` là khi **nhắc người chơi nhập dữ liệu** — và ở đó thật ra là `fmt.Print`, không phải `fmt.Println`.
* Mọi chỗ khác, các bạn hãy dùng **channel kèm `select`** để in thông tin ra màn hình.

Nghe xong chắc các bạn sẽ tự hỏi: *"Vậy còn `fmt.Println` không có tham số thì làm sao?"* — rất đơn giản, các bạn chỉ cần **gửi một chuỗi rỗng** vào channel, thế là xong.

Bài này sẽ tốn của các bạn một chút thời gian, nhưng không khó lắm đâu. Các bạn chỉ cần sửa trong file `game.go` là đủ. *Cứ thử sức, sai cũng không sao* — bài sau mình sẽ chỉ cách mình làm. Hẹn gặp lại các bạn! 🚀
