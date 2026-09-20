# 🎯 Challenge: Tự tay luyện WaitGroup với ba hàm nhỏ

> Nguồn: `012-Challenge-working-with-WaitGroup.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32064952)

Đã đến lúc mang lý thuyết ra thực hành! Các bạn có thể xem mình làm đi làm lại cả trăm lần, nhưng cho tới khi **tự tay làm vài trăm lần**, nó vẫn chưa thực sự hữu ích cho bạn. Vì vậy hôm nay mình có một challenge nho nhỏ — và mình tin các bạn sẽ không gặp khó khăn gì nhiều.

### 📦 Chuẩn bị

Trong **course resources** của bài này, các bạn sẽ thấy file **`challenge-1.zip`**. Hãy:

1. Tải file về và giải nén.
2. Mở thư mục đó bằng Visual Studio Code.
3. Bạn sẽ thấy file `main.go` — chạy `go run .` thì chương trình in ra ba dòng: `Hello Universe`, `Hello Cosmos`, `Hello World` theo đúng thứ tự đó.

### 🔧 Nhiệm vụ 1: Biến mọi lời gọi thành goroutine

Mình muốn các bạn sửa code sao cho **mọi lời gọi hàm `updateMessage`** (trong file là các dòng 27, 33 và 39 — mình có một lỗi gõ ở đó nhưng không quan trọng, nó nằm trong comment) đều chạy dưới dạng **goroutine**, tức chạy đồng thời với goroutine hiện tại là `main`.

### 🏁 Nhiệm vụ 2: Dùng WaitGroup để giữ đúng thứ tự

Chỉ thêm chữ `go` là chưa đủ: các bạn cần **triển khai WaitGroup** để chương trình chạy đúng — nghĩa là **mỗi lần chạy, ba dòng luôn xuất hiện theo đúng thứ tự** Universe → Cosmos → World.

### 🧪 Nhiệm vụ 3: Viết test cho cả ba hàm

Tạo file `main_test.go` và viết **ba test**:

* Một test cho `updateMessage` — hàm này chạy như goroutine, nên hãy test nó đúng như vậy.
* Một test cho `printMessage` — hàm này đơn giản hơn.
* Một test cho `main`.

Các bạn dùng lại đúng kiểu logic mình đã dùng ở bài trước để **bắt standard output**, và *đừng quên trả `os.Stdout` về trạng thái ban đầu khi test kết thúc*.

### 💪 Đừng lo nếu chưa chạy được ngay

Bài này chắc các bạn mất một hai lần thử mới chạy ngon. Nếu gặp trục trặc, **đừng lo** — mọi thứ các bạn cần đều đã có trong tay, và bài sau mình sẽ trình bày cách mình giải.

*Chúc may mắn nhé — hẹn gặp các bạn ở bài giải!* 🚀
