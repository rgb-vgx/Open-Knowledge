# 🧠 Challenge: Tái cấu trúc Guess the Number theo tinh thần "một hàm, một nhiệm vụ"

> Nguồn: `015-Guess-the-Number-Challenge.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161776)

Đã đến lúc cho các bạn một thử thách — không quá khó, mình muốn các bạn "khởi động" từ từ thôi. Mở file `main.go` của trò chơi Guess the Number và cùng xem hai câu hỏi của mình nhé.

### 🎯 Câu hỏi 1: Phép tính `answer` cần nằm ở đâu?

Hiện tại, ở dòng 50 của chương trình, có dòng lệnh tính đáp án: `answer = firstNumber * secondNumber - subtraction`. Câu hỏi là: **có bắt buộc phải làm phép tính này ở đó không, hay có thể đặt nó ở chỗ khác?**

Các bạn thử dừng lại vài giây suy nghĩ trước khi đọc tiếp nhé.

Câu trả lời là **không** — và thật ra đặt ở đó không hợp lý chút nào, vì mọi logic khác của chương trình đều nằm ở phía trên, nơi các giá trị được gán. Các bạn có thể chuyển dòng lệnh lên trên. Thậm chí, mình còn làm gọn hơn một bước nữa bằng cách **vừa tạo biến vừa gán giá trị ngay**:

```go
answer := firstNumber * secondNumber - subtraction
```

Một lưu ý quan trọng: **không thể** đặt dòng này trước lúc `firstNumber`, `secondNumber` và `subtraction` có giá trị — lúc đó chúng chưa có gì để tính cả.

---

### 🧩 Câu hỏi 2: Tách trò chơi ra thành hàm riêng

Hiện mọi thứ đều nằm trong hàm `main`. Nhiệm vụ của các bạn lần này là dùng `main` **chỉ để tạo giá trị** cho `firstNumber`, `secondNumber`, `subtraction` và `answer`.

Sau đó, truyền **4 tham số** này vào một hàm mới — tên gì cũng được, do các bạn đặt — để hàm đó đảm nhiệm phần còn lại: hiển thị thông tin, chờ người chơi bấm Enter, và in kết quả.

Nói cách khác: hàm `main` làm càng ít càng tốt. Các bạn có thể phải xem lại vài video trước, nhưng mình tin là các bạn làm được.

---

### 🛠️ Cách mình giải quyết

Mình tạo một hàm trống tên là `playTheGame` — tên gọi viết liền, không có dấu cách. Hàm này nhận **4 tham số** đều kiểu `int`, và mình đặt tên chúng y như cũ:

* `firstNumber`
* `secondNumber`
* `subtraction`
* `answer`

Mình cố tình **không** đặt tên kiểu `a`, `b`, `c`, `d` vì như thế rất khó đọc — đây là thói quen tốt các bạn nên giữ. Toàn bộ phần thân trò chơi (in hướng dẫn, chờ Enter) được cắt từ `main` xuống hàm mới. Cuối cùng, trong `main`, mình chỉ còn một lời gọi:

```go
playTheGame(firstNumber, secondNumber, subtraction, answer)
```

Chạy `go run main.go` — chương trình hoạt động đúng như trước, và code gọn gàng hơn hẳn.

---

### 💡 Nguyên tắc vàng: một hàm, một nhiệm vụ

Các bạn sẽ thấy mình lặp lại điều này suốt khóa học: trong Go, hãy làm **càng ít việc càng tốt** trong mỗi hàm. Đừng nhồi 3–4 nhiệm vụ vào một hàm nếu có thể tránh.

Hãy giữ cho hàm của mình **ngắn, súc tích và tập trung vào một nhiệm vụ cụ thể**. Đó là câu chuyện của toàn bộ bài học hôm nay. Giờ thì đi tiếp thôi! 🚀
