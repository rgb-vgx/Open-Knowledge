# 🧭 Tổng quan Section 2: Goroutines, chữ go và WaitGroups

> Nguồn: `008-What-well-cover-in-this-section.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32032420)

Ở section này, chúng ta sẽ nói về **goroutines**. Nếu các bạn đã làm việc với Go một thời gian, có thể bạn đã dùng chúng ở mức nào đó rồi — nhưng mình vẫn sẽ đi lại từ đầu, để chỉ ra việc dùng goroutine dễ đến mức nào, và vì sao phải hết sức cẩn thận khi dùng chúng.

### 🐹 Goroutine là gì?

Goroutine đơn giản là **một phần trong chương trình của bạn chạy ở chế độ nền** (hoặc chạy concurrently — đồng thời). Bạn có thể có nhiều goroutine chạy cùng lúc, và chúng dễ dùng đến kinh ngạc: chỉ cần gõ **hai ký tự và một khoảng trắng** — chữ `go` — là bạn đã có ngay một goroutine.

### ⚠️ Dễ dùng, nhưng cũng dễ sinh lỗi

Đúng vậy, chỉ hai ký tự thôi. Nhưng chính vì quá dễ nên việc tạo goroutine **có thể sinh ra đủ loại vấn đề** — và may mắn là có nhiều cách để giải quyết:

* **Mutex**
* **WaitGroup**
* **Channels**

### 🛠️ Section này chọn WaitGroup

Trong section này, mình sẽ tập trung vào **WaitGroup** — theo mình đánh giá, đây là cách **dễ hiểu nhất** và cũng **dễ triển khai nhất**. Hai phương án còn lại sẽ được dành cho những phần sau của khóa học.

*Goroutine không đáng sợ đâu — cứ học chắc từng bước là được.* Bắt đầu thôi! 🚀
