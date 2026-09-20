# 🧪 Viết test cho Dining Philosophers: TestDine và bảng test theo độ trễ

> Nguồn: `031-Writing-a-test-for-our-program.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/33849964)

Mọi thứ đang chạy đúng như mong đợi, nhưng "có vẻ đúng" và "chắc chắn đúng" là hai chuyện khác nhau. Vậy nên hôm nay mình và các bạn viết một vài test đơn giản cho chương trình — và khép lại phần dining philosophers thật đẹp.

### 📄 Tạo file `main_test.go` và dọn dẹp trong `dine()`

Đầu tiên, tạo file `main_test.go` nằm cùng package `main`, với một hàm test cho hàm `dine`:

```go
func TestDine(t *testing.T) {
	// ...
}
```

Tham số `t *testing.T` là kiểu quen thuộc của package `testing` ([pkg.go.dev — testing](https://pkg.go.dev/testing)).

Sau đó, mở `main.go`, tìm các dòng set `eatTime`, `sleepTime`, `thinkTime` về `0` mà mình thêm trong giai đoạn phát triển: **copy chúng ra trước, rồi comment lại**. Chúng sẽ được dán vào file test — nơi mình toàn quyền quyết định tốc độ chạy. Quay lại `main_test.go`, dán các dòng đó vào và khai báo thêm `time` trong phần import.

### 🧪 `TestDine`: chạy 10 vòng và kiểm tra độ dài

Ý tưởng rất trực tiếp: gọi `dine()`, đợi mọi thứ xong (các WaitGroup đã lo phần đó), rồi kiểm tra `orderFinished` có đủ **5 phần tử** hay không.

```go
func TestDine(t *testing.T) {
	eatTime = 0 * time.Second
	sleepTime = 0 * time.Second
	thinkTime = 0 * time.Second

	for i := 0; i < 10; i++ {
		orderFinished = []string{}
		dine()

		if len(orderFinished) != 5 {
			t.Errorf("Incorrect length of slice; expected 5 but got %d", len(orderFinished))
		}
	}
}
```

Cách hoạt động:

* Lặp **10 lần** để tăng cơ hội "tóm" được lỗi nếu có.
* Trước mỗi vòng, **reset `orderFinished` về slice rỗng** để kết quả vòng trước không lẫn sang vòng sau.
* Nếu số phần tử khác 5, `t.Errorf` báo lỗi: mong đợi 5 nhưng nhận được bao nhiêu.

Chạy thử `go test -race .`: test chạy đủ 10 vòng và **pass** — vừa nhanh vừa gọn.

### 📊 Bảng test với độ trễ khác nhau

Biết nó đúng khi mọi độ trễ bằng 0 là chưa đủ — mình muốn thử cả khi triết gia ăn và suy nghĩ với tốc độ thật, nên viết thêm một **table test** (test theo bảng):

```go
func TestDineWithVaryingDelays(t *testing.T) {
	tests := []struct {
		name  string
		delay time.Duration
	}{
		{"zero delay", time.Second * 0},
		{"quarter second delay", time.Millisecond * 250},
		{"half second delay", time.Millisecond * 500},
	}

	for _, e := range tests {
		orderFinished = []string{}
		eatTime = e.delay
		sleepTime = e.delay
		thinkTime = e.delay
		dine()

		if len(orderFinished) != 5 {
			t.Errorf("%s: Incorrect length of slice; expected 5 but got %d", e.name, len(orderFinished))
		}
	}
}
```

Ba kịch bản độ trễ: **0**, **một phần tư giây** (250ms) và **nửa giây** (500ms). Với mỗi case: reset `orderFinished`, gán cả `eatTime`, `sleepTime`, `thinkTime` bằng đúng độ trễ, gọi `dine()` rồi kiểm tra độ dài. Thông báo lỗi có kèm tên case để khi fail là biết ngay case nào.

Chạy `go test -race .` lần nữa — lần này **lâu hơn một chút vì có độ trễ thật**, nhưng tất cả đều **pass**. Ít phút chờ đợi, đổi lấy sự yên tâm.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** File test cần được đặt tên thế nào và thuộc package nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `main_test.go`, cùng package `main` với chương trình.

Giải thích: File test cùng package truy cập trực tiếp được các biến như `orderFinished`, `eatTime`...

Tham chiếu: Mục Tạo file `main_test.go`.

</details>

**Câu 2:** Trước mỗi lần gọi `dine()`, `orderFinished` được reset về giá trị gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Một slice rỗng: `orderFinished = []string{}`.

Giải thích: Nhờ vậy kết quả của vòng trước không ảnh hưởng tới vòng sau.

Tham chiếu: Mục `TestDine`.

</details>

**Câu 3:** `TestDine` chạy `dine()` bao nhiêu lần?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** **10 lần**.

Giải thích: Vòng lặp `for i := 0; i < 10; i++` giúp tăng cơ hội phát hiện lỗi.

Tham chiếu: Mục `TestDine`.

</details>

**Câu 4:** Điều kiện để test pass là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `len(orderFinished)` phải bằng **5**; nếu khác, test gọi `t.Errorf` báo lỗi.

Giải thích: Danh sách hoàn thành phải có đủ tên của cả năm triết gia.

Tham chiếu: Mục `TestDine`.

</details>

**Câu 5:** Bảng test thứ hai dùng ba mức độ trễ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** **0**, **250ms** (một phần tư giây) và **500ms** (nửa giây).

Giải thích: Mỗi case gán cả `eatTime`, `sleepTime` và `thinkTime` bằng độ trễ tương ứng.

Tham chiếu: Mục Bảng test với độ trễ khác nhau.

</details>

Vậy là chương trình dining philosophers của chúng ta đã có logic đúng, có kiểm tra `-race` và có test hẳn hoi. Cảm ơn các bạn đã kiên nhẫn đi hết bài toán kinh điển này — hẹn gặp lại ở section tiếp theo, nơi chúng ta quay lại với một "nhân vật" quen thuộc: channel. 🚀

## Nguồn tham khảo

- [pkg.go.dev — package testing](https://pkg.go.dev/testing)
- [Data Race Detector — The Go Programming Language](https://go.dev/doc/articles/race_detector)
- [Udemy — Writing a test for our program](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/33849964)
