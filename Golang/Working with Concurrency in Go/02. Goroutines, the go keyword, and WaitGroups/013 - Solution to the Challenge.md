# ✅ Lời giải Challenge: WaitGroup thực chiến và những điều cần nhớ

> Nguồn: `013-Solution-to-Challenge.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32052520)

Các bạn làm challenge thế nào? Mình đoán là không quá khó nhỉ. Mình có "vọc" chương trình giữa hai bài nên số dòng có hơi khác, nhưng chương trình hoàn toàn giống bài trước: chạy `go run .` vẫn ra lần lượt `Universe`, `cosmos`, `world`, chỉ khác chút khoảng trắng mà thôi.

### ⚡ Phần 1: Thêm chữ go — chưa đủ!

Đầu tiên, mình thêm chữ `go` vào trước **tất cả** các lời gọi `updateMessage`. Chạy thử vài lần, các bạn sẽ thấy có đủ ba dòng output, nhưng thứ tự **sai bét** — ví dụ ra `Hello World` trước rồi mới tới `Hello Universe`. Tất nhiên rồi, vì goroutine chạy không theo thứ tự bạn sinh ra chúng.

### 🛡️ Phần 2: WaitGroup giữ trật tự

Mình thêm một biến ở **cấp package** (package-level variable):

```go
var wg sync.WaitGroup
```

Và trong hàm `updateMessage`, báo xong việc bằng `defer`:

```go
func updateMessage(s string) {
	defer wg.Done()
	message = s
}
```

Rồi với từng message, mình làm đúng một khuôn mẫu:

```go
wg.Add(1)
go updateMessage("Hello Universe")
wg.Wait()
```

Lặp lại y hệt với `Hello Cosmos` và `Hello World` (mỗi lần đều chờ xong mới đi tiếp). Chạy `go run .` — lần nào cũng ra `Universe`, `cosmos`, `world` đúng thứ tự.

*Một lời khen thật lòng:* nếu bạn giải theo cách khác — ví dụ cho cả ba từ vào một slice rồi range qua nó — thì **cũng hoàn toàn đúng**, thậm chí còn thanh lịch hơn. Nếu bạn làm vậy, xin chúc mừng!

### 🧪 Phần 3: Test

File `main_test.go` import `io`, `strings` và `testing`. Mình test từng phần:

* **Test `updateMessage`**: mình test nó **chạy nền** đúng như cách code mong đợi. Bất cứ khi nào viết test, mình cố mô phỏng môi trường production càng sát càng tốt: dùng biến `wg` cấp package, `Add(1)`, chạy `go updateMessage("Epsilon")`, chờ bằng `wg.Wait()`, rồi kiểm tra `message == "Epsilon"`, không khớp thì báo lỗi.

```go
wg.Add(1)
go updateMessage("Epsilon")
wg.Wait()

if message != "Epsilon" {
	t.Errorf("Expected Epsilon, but got %s", message)
}
```

* **Test `printMessage` và `main`**: dùng lại đúng logic bài trước — lưu `os.Stdout`, thay bằng pipe, đặt biến `message` thành `Epsilon`, gọi hàm, bắt output, **khôi phục trạng thái cũ**, rồi kiểm tra output có chứa `Epsilon` (với `main` thì kiểm tra đủ `Hello Universe`, `Hello Cosmos`, `Hello World`).

Chạy `go test -v .` để có output chi tiết — tất cả pass, đúng như mong đợi.

### 🚀 Nhìn về phía trước

Chúng ta sẽ còn làm nhiều bài testing với concurrency nữa, đặc biệt là khi **tìm race condition (tranh chấp dữ liệu)** — nhưng chưa tới lúc, còn một quãng đường phía trước.

Tổng kết về `sync.WaitGroup`: đây là cách **dễ nhất** để xử lý concurrency, và trong rất nhiều trường hợp, **chỉ cần thế là đủ**. Nhưng cũng có tình huống WaitGroup "bó tay", nên khóa học còn hai phương pháp nữa:

| Phương pháp | Đặc điểm |
|---|---|
| `WaitGroup` | Dễ nhất, nhiều trường hợp chỉ cần nó là đủ |
| `Mutex` | Gần dễ như WaitGroup nhưng không bằng |
| `Channels` | Phức tạp nhất, nhưng cũng mạnh mẽ nhất |

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao chỉ thêm chữ `go` vào các lời gọi `updateMessage` là chưa đủ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì thứ tự hoàn thành của goroutine không được đảm bảo, output có thể sai thứ tự.

Giải thích: Cần WaitGroup để chờ từng goroutine xong trước khi đi tiếp.

Tham chiếu: Mục Phần 1.

</details>

**Câu 2:** Vì sao `wg` được khai báo ở cấp package trong lời giải?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để cả hàm `updateMessage` lẫn các test đều truy cập được cùng một WaitGroup.

Giải thích: Nhờ vậy `updateMessage` gọi được `wg.Done()` mà không cần truyền tham số.

Tham chiếu: Mục Phần 2.

</details>

**Câu 3:** Khuôn mẫu lặp lại cho mỗi message trong `main` là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `wg.Add(1)` → `go updateMessage(...)` → `wg.Wait()`.

Giải thích: Chờ xong message này mới sang message kế tiếp nên thứ tự luôn đúng.

Tham chiếu: Mục Phần 2.

</details>

**Câu 4:** Test `updateMessage` có gì khác so với test thông thường?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nó chạy hàm dưới dạng goroutine với `wg` cấp package, mô phỏng đúng môi trường production.

Giải thích: Mình luôn cố viết test sát với cách code chạy thật.

Tham chiếu: Mục Phần 3.

</details>

**Câu 5:** Ba cách xử lý concurrency trong Go và đặc điểm của chúng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `WaitGroup` dễ nhất; `Mutex` gần dễ như WaitGroup nhưng không bằng; `Channels` phức tạp nhất nhưng mạnh mẽ nhất.

Giải thích: WaitGroup không giải quyết được mọi tình huống, nên cần học thêm hai phương pháp kia.

Tham chiếu: Mục Nhìn về phía trước.

</details>

*Hết section này rồi! Hẹn gặp các bạn ở section sau, nơi chúng ta bắt đầu giải những bài toán concurrency cổ điển.* 🚀
