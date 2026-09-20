# 📦 Buffered Channels: Khi channel có "sức chứa" và bạn cần xếp hàng công việc

> Nguồn: `035-Buffered-Channels.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32160080)

Trước khi mang channel vào Sleeping Barber, mình muốn các bạn nắm nốt một khái niệm cuối: **buffered channel** (channel có bộ đệm). Nghe thì đơn giản, nhưng nó chính là "vũ khí" giải quyết cả bài toán hớt tóc sắp tới đấy. Cùng xem một thí nghiệm nhỏ để thấy rõ sự khác biệt nhé.

### 🐌 Thí nghiệm đầu tiên: channel không buffer

Mình tạo project **buffered-channels** (`go mod init buffered-channel`) với một hàm sẽ chạy dưới dạng goroutine, tên là `listenToChan`. Hàm này nhận một channel of `int`, lặp vô tận và mỗi lần nhận được dữ liệu thì in thông báo, rồi ngủ **1 giây** để giả lập một công việc nặng:

```go
func listenToChan(ch chan int) {
	for {
		i := <-ch
		fmt.Println("Got", i, "from channel")
		time.Sleep(1 * time.Second)
	}
}
```

Ở `main`, mình tạo channel, chạy goroutine trên rồi gửi vào đó **100 giá trị**:

```go
ch := make(chan int)
go listenToChan(ch)

for i := 0; i <= 100; i++ {
	fmt.Println("Sending", i, "to channel...")
	ch <- i
	fmt.Println("Sent", i, "to channel")
}
fmt.Println("Done")
close(ch)
```

Chạy `go run .` và các bạn sẽ thấy điều thú vị: giữa mỗi lần gửi và lúc dữ liệu thực sự "đi" là **một khoảng dừng đúng 1 giây**. Nguyên nhân là goroutine nhận đang bận rộn (ngủ 1 giây mỗi vòng), còn channel không có chỗ đệm nên bên gửi buộc phải **block** — chờ cho đến khi bên nhận lấy được giá trị rồi mới gửi tiếp.

### 🚀 Thêm 10 chỗ đệm: tốc độ thay đổi hoàn toàn

Giờ mình sửa đúng một chỗ: thêm tham số thứ hai cho `make`:

```go
ch := make(chan int, 10)
```

Chạy lại và... **10 giá trị đầu tiên vụt qua gần như tức thì**. Sau đó tốc độ trở về 1 giây một giá trị, vì mỗi lần goroutine nhận "rút" một giá trị khỏi buffer thì có thêm một chỗ trống, và bên gửi bỏ thêm một giá trị vào.

* Channel thường chỉ nhận một thứ; nếu đang chờ nhận thì mọi thứ "đứng hình".
* Buffered channel cho phép tích trữ nhiều giá trị (ở đây là 10) trước khi bên nhận kịp xử lý.

### 💡 Vậy buffered channel hữu ích khi nào?

Câu trả lời khá đơn giản — khi bạn cần một trong ba điều sau:

1. **Biết chắc mình đã chạy bao nhiêu goroutine** (trong ví dụ này là một).
2. **Muốn giới hạn số lượng goroutine** được chạy.
3. **Muốn giới hạn lượng công việc đang xếp hàng chờ xử lý.**

Ở ví dụ của chúng ta chính là trường hợp thứ ba: công việc cứ xếp dần trong buffer, những thứ khác tạm dừng, và dữ liệu nằm chờ cho tới khi có "tài nguyên" để xử lý.

Phần lớn trường hợp các bạn sẽ dùng **unbuffered channel**, nhưng buffered channel có chỗ đứng rất hợp lý trong nhiều tình huống — Sleeping Barber là một ví dụ đẹp.

| Tiêu chí | Unbuffered channel | Buffered channel |
|---|---|---|
| Sức chứa | Đúng 1 giá trị tại một thời điểm | Nhiều giá trị, tùy kích thước buffer |
| Bên gửi | Block cho đến khi bên nhận lấy được | Chỉ block khi buffer đã đầy |
| Tạo bằng | `make(chan T)` | `make(chan T, n)` |
| Dùng khi | Phần lớn trường hợp thông thường | Giới hạn goroutine hoặc giới hạn lượng việc xếp hàng |

```mermaid
flowchart LR
    P[Goroutine gửi 100 giá trị] -->|đẩy vào khi còn chỗ| B[Buffer 10 chỗ]
    B -->|mỗi giây rút một giá trị| C[Goroutine nhận]
```

Vậy là đã đủ hành trang về channel. Mình là người tin chắc rằng **học code tốt nhất là bằng cách viết code** — nên tiếp theo chúng ta sẽ học channel bằng cách viết code dùng channel. Đã đến lúc bắt đầu bài toán Sleeping Barber rồi!

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao chương trình chạy "chậm như rùa" với channel không buffer?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì bên nhận ngủ 1 giây mỗi vòng, còn bên gửi phải block cho đến khi giá trị được lấy đi.

Giải thích: Channel không có chỗ trữ nên nhịp gửi bị khóa theo nhịp nhận.

Tham chiếu: Mục Thí nghiệm đầu tiên.

</details>

**Câu 2:** `make(chan int, 10)` khác `make(chan int)` ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `make(chan int, 10)` tạo buffered channel chứa tối đa 10 giá trị; `make(chan int)` là unbuffered, mỗi lần chỉ một giá trị.

Giải thích: Tham số thứ hai chính là kích thước buffer.

Tham chiếu: Mục Thêm 10 chỗ đệm.

</details>

**Câu 3:** Vì sao 10 giá trị đầu tiên đi qua rất nhanh sau khi thêm buffer?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì buffer còn chỗ trống nên bên gửi không cần chờ bên nhận.

Giải thích: Sau khi đầy, mỗi lần bên nhận rút một giá trị thì bên gửi mới có thêm chỗ để đẩy vào.

Tham chiếu: Mục Thêm 10 chỗ đệm.

</details>

**Câu 4:** Buffered channel hữu ích trong những tình huống nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi biết chắc số goroutine đã chạy, muốn giới hạn số goroutine, hoặc giới hạn lượng công việc đang xếp hàng.

Giải thích: Trong ví dụ, mục đích là giới hạn lượng công việc chờ xử lý.

Tham chiếu: Mục Vậy buffered channel hữu ích khi nào.

</details>

**Câu 5:** Phần lớn các trường hợp nên dùng loại channel nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Unbuffered channel.

Giải thích: Dù vậy, buffered channel vẫn rất hợp lý trong nhiều tình huống, chẳng hạn Sleeping Barber.

Tham chiếu: Mục Vậy buffered channel hữu ích khi nào.

</details>

Từ đây, chúng ta sẽ vận dụng toàn bộ kiến thức về channel vào một bài toán kinh điển: **Sleeping Barber**. Hẹn gặp các bạn ở bài tiếp theo! 🚀

## Nguồn tham khảo

- [A Tour of Go — Buffered Channels](https://go.dev/tour/concurrency/3)
