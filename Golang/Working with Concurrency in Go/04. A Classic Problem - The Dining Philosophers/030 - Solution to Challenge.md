# 🔒 Lời giải challenge: Khoá orderMutex và ghi lại thứ tự rời bàn

> Nguồn: `030-Solution-to-challenge.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/33849958)

Các bạn làm challenge thế nào? *Mình nghi là các bạn thấy nó không quá khó.* Dù kết quả ra sao thì sau đây là cách mình giải — như mọi khi, mình đánh dấu các thay đổi bằng comment trong code để các bạn dễ dò theo.

### 🧱 Thêm hai biến ở đầu chương trình

Ngay chỗ khai báo biến, mình thêm một mutex và một slice:

```go
var orderMutex sync.Mutex
var orderFinished []string
```

* `orderMutex`: ổ khoá dành riêng cho `orderFinished`.
* `orderFinished`: danh sách tên các triết gia theo thứ tự hoàn thành bữa ăn.
* Cơ chế ghi: mỗi khi một người ăn xong, mình **append tên người đó vào cuối slice**. Nhờ `append`, thứ tự luôn được giữ đúng: ai xong trước nằm trước, ai xong sau nằm sau.
* Vì việc ghi này đến từ các **goroutine** chạy đồng thời, mình **khoá trước khi ghi và mở khoá ngay sau khi ghi xong** — bước này không thể bỏ qua.

### 🥱 Tìm việc cho `sleepTime`

Ở gần chỗ gọi `dine()`, mình thêm một giấc ngủ ngắn:

```go
time.Sleep(sleepTime)
```

Lý do rất "con người": biến `sleepTime` được khai báo từ trước mà chưa ai dùng, điều đó **làm mình khó chịu**. Giờ thì sau thông báo "The table is empty" ban đầu, chương trình nghỉ một giây rồi mới gọi `dine()`.

### 🔐 Điểm chốt: khoá — append — mở khoá

Thay đổi quan trọng nhất nằm ở cuối hàm `diningProblem`, khi một triết gia đã hoàn thành cả ba lượt ăn:

```go
orderMutex.Lock()
orderFinished = append(orderFinished, philosopher.name)
orderMutex.Unlock()
```

Chỉ ba dòng: khoá lại, thêm tên vào danh sách, mở khoá. Đó gần như là **toàn bộ những gì mình sửa**. Khi bữa ăn kết thúc, danh sách `orderFinished` chính là câu trả lời cho challenge — in nó ra là các bạn có thứ tự kết thúc của từng triết gia.

### 🏁 Kiểm tra lần cuối

* Các timeout vẫn đang đặt bằng 0 nên chương trình chạy rất nhanh.
* Mình chạy lại bằng `go run -race .`: không có lỗi nào xuất hiện → **không có race condition**. *Life is good!*
* Mình sẽ đăng bản code hoàn chỉnh lên phần tài nguyên của bài giảng. Nếu các bạn dùng cách khác mà chương trình vẫn chạy đúng, **đừng bận tâm** — mỗi người có một lời giải riêng, miễn kết quả đúng là được.

Challenge kết thúc tốt đẹp rồi. Còn một việc cuối cùng trước khi rời khỏi bài toán kinh điển này: viết test cho chương trình. Hẹn các bạn ở bài sau! 🚀
