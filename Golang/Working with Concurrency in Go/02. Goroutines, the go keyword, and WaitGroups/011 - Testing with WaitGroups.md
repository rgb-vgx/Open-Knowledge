# 🧪 Viết test cho code concurrent: Bắt goroutine chạy như thật

> Nguồn: `011-Writing-tests-with-WaitGroups.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32066582)

Chúng ta đã đi khá sâu với `sync.WaitGroup`. Ôn lại nhanh: đây là cách **dễ nhất** để xử lý concurrency — không phải lúc nào cũng là cách tốt nhất, nhưng chắc chắn dễ nhất. Hôm nay, mình sẽ chỉ ra điều gì xảy ra khi các bạn đếm sai, và cách viết **test** cho một goroutine.

### 💣 Đếm sai một chút là deadlock ngay

Nhắc lại cách dùng: khai báo `var wg sync.WaitGroup`, `Add` đúng bằng số phần tử của slice, gọi `defer wg.Done()` trong mỗi goroutine, và `wg.Wait()` ở cuối.

Giờ giả sử mình lỡ tay cho `Add(12)` trong khi chỉ có **9 goroutine** được sinh ra. Theo logic thông thường, bạn sẽ nghĩ chương trình cứ đứng chờ mãi mãi. Nhưng thực tế, `go run .` sẽ cho bạn một lỗi:

> **`fatal error: all goroutines are asleep - deadlock!`**

Đây là **lỗi rất dễ gặp**, và cũng là lý do bạn gần như **không bao giờ nên hardcode** những giá trị như `12` — chỉ cần dùng `len(words)` là xong. Mình sửa lại và mọi thứ chạy đúng như mong đợi.

### 🧲 Test một hàm in ra console: chuyện không dễ

Chắc các bạn tự nghĩ ra được, nhưng mình sẽ đi nhanh qua cách viết test cho hàm `printSomething` vì có "một chút phép thuật" cần biết. Mình tạo file `main_test.go` trong `package main`:

```go
func TestPrintSomething(t *testing.T) {
	stdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	var wg sync.WaitGroup
	wg.Add(1)
	go printSomething("Epsilon", &wg)
	wg.Wait()
	w.Close()

	result, _ := io.ReadAll(r)
	output := string(result)
	os.Stdout = stdout

	if !strings.Contains(output, "Epsilon") {
		t.Errorf("Expected to find Epsilon, but it is not there")
	}
}
```

Điều "ma thuật" ở đây là **bắt lại standard output**:

1. Lưu giá trị hiện tại của `os.Stdout` vào một biến.
2. Tạo `os.Pipe()` để lấy cặp **read/write** (bỏ qua tham số lỗi).
3. Gán `os.Stdout = w` để mọi thứ in ra đi vào pipe của mình.
4. Chạy hàm cần test **dưới dạng goroutine**, đúng như cách nó chạy thật trong chương trình: `go printSomething(...)` với WaitGroup **dạng con trỏ** (nhớ nhé: không bao giờ truyền WaitGroup theo giá trị).
5. `wg.Wait()` để chờ goroutine xong, rồi đóng pipe bằng `w.Close()`.
6. Đọc kết quả với `io.ReadAll` rồi chuyển thành string.

*Lưu ý nhỏ cho các bạn dùng Go cũ: ngày xưa ta phải dùng `ioutil.ReadAll` — hàm này đã bị **deprecated (ngừng khuyến nghị)**, nên hãy cập nhật Go mới nhất và dùng `io.ReadAll`.*

7. **Trả `os.Stdout` về giá trị đã lưu** — đừng quên bước này!
8. Kiểm tra bằng `strings.Contains(output, "Epsilon")`; nếu không thấy thì gọi `t.Errorf(...)` để báo test thất bại.

### 😅 Đến mình cũng gõ sai chính tả

Lần chạy `go test` đầu tiên của mình **thất bại** — vì mình gõ sai chữ "Epsilon" ở đâu đó. Sửa lại chính tả rồi chạy `go test` lần nữa là pass ngay.

Điểm mấu chốt cần nhớ khi viết test cho code concurrent: **hàm của bạn chạy trong goroutine, thì hãy test nó đúng như vậy** — chạy nền, chờ bằng WaitGroup, rồi kiểm tra kết quả.

### ✅ Tổng kết

Viết console app thì việc bắt output hơi rắc rối một chút, nhưng hoàn toàn không khó. Đến đây, các bạn đã biết cách test cả một goroutine lẫn một hàm in ra màn hình.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Điều gì xảy ra nếu bạn gọi `Add(12)` nhưng chỉ sinh ra 9 goroutine?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chương trình báo lỗi `fatal error: all goroutines are asleep - deadlock!`

Giải thích: Bộ đếm không bao giờ về 0, nên chương trình chờ mãi — Go phát hiện và báo deadlock.

Tham chiếu: Mục Đếm sai một chút là deadlock ngay.

</details>

**Câu 2:** Vì sao nên tránh hardcode số đếm cho WaitGroup?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chỉ cần lệch một chút là deadlock hoặc bộ đếm sai; hãy dùng `len(words)`.

Giải thích: Số lượng thực thi thường phụ thuộc dữ liệu, không nên viết cứng.

Tham chiếu: Mục Đếm sai một chút là deadlock ngay.

</details>

**Câu 3:** Vì sao trong test ta nên chạy hàm bằng `go` kèm WaitGroup?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để mô phỏng đúng môi trường production — hàm vốn chạy như goroutine.

Giải thích: Test sát thực tế sẽ bắt được lỗi mà cách gọi tuần tự bỏ qua.

Tham chiếu: Mục Test một hàm in ra console.

</details>

**Câu 4:** Cách bắt standard output trong test gồm những bước nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lưu `os.Stdout` cũ, tạo `os.Pipe()`, gán `os.Stdout` bằng đầu ghi, chạy hàm, đọc từ đầu đọc rồi khôi phục `os.Stdout`.

Giải thích: Nhờ đó test đọc được nội dung hàm in ra console.

Tham chiếu: Mục Test một hàm in ra console.

</details>

**Câu 5:** Vì sao bước khôi phục `os.Stdout` lại quan trọng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nếu không khôi phục, môi trường test sẽ hỏng về trạng thái ban đầu, ảnh hưởng các test sau.

Giải thích: Mình luôn set mọi thứ về như trước khi test chạy.

Tham chiếu: Mục Test một hàm in ra console.

</details>

*Chuẩn bị tinh thần nhé — bài sau là một **challenge** để các bạn tự tay làm, và mình tin là không quá khó đâu!* 🚀
