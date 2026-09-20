# 🛡️ WaitGroups to the Rescue: Chờ goroutine một cách đàng hoàng

> Nguồn: `010-WaitGroups-to-the-rescue.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32041218)

Bài trước, chúng ta "chữa cháy" bằng `time.Sleep` — và mình đã nói thẳng đó là lời giải tồi. Hôm nay mình sẽ chứng minh vì sao nó tồi, rồi giới thiệu công cụ đúng đắn để thay thế: **WaitGroup**. Các bạn cứ gõ theo mình, sai cũng không sao.

### 🧪 Vì sao time.Sleep không đáng tin

Mình xóa dòng `time.Sleep` và sinh nhiều goroutine hơn — lần này là một slice các từ tiếng Hy Lạp:

```go
words := []string{"alpha", "beta", "delta", "gamma", "pi", "zeta", "eta", "theta", "epsilon"}
```

Rồi mình range qua slice và gọi hàm in trong một goroutine, kèm cả chỉ số:

```go
for i, x := range words {
	go printSomething(fmt.Sprintf("%d: %s", i, x))
}
```

Chạy `go run .` — lần này **cả 9 từ đều được in ra**, nhưng **không theo thứ tự nào cả** (ví dụ mình nhận được thứ tự `8 2 3 4 5 6 7 0 1`). Đây là điều cực kỳ quan trọng cần hiểu về goroutine: **thứ tự bạn sinh ra chúng không quyết định thứ tự chúng chạy xong**.

Và đây mới là vấn đề thật sự: nếu slice của bạn có **1.000 từ**, hoặc tệ hơn — bạn đang **query database** và không biết slice sẽ dài bao nhiêu — thì bạn chờ bao lâu cho đủ? `time.Sleep` không thể trả lời câu hỏi đó.

| Tiêu chí | `time.Sleep` | `WaitGroup` |
|---|---|---|
| Cơ chế | Ngủ mù một khoảng thời gian cố định | Đếm số việc cần chờ, tự trả về khi đếm hết |
| Dữ liệu không biết trước | Không biết phải ngủ bao lâu | `Add(len(words))` linh hoạt theo dữ liệu |
| Rủi ro | Ngủ thiếu thì mất output, ngủ dư thì chậm | Đếm sai thì bộ đếm âm hoặc deadlock |

### 🏗️ WaitGroup: dễ như đếm

Mình xóa `time.Sleep` và khai báo trong `main`:

```go
var wg sync.WaitGroup
```

Cách dùng WaitGroup nằm gọn trong mấy bước:

1. **`wg.Add(n)`**: thêm `n` mục cần chờ — ở đây mình có 9 goroutine nên `wg.Add(9)`.
2. Trong mỗi goroutine, gọi `defer wg.Done()` khi xong việc.
3. Ở nơi cần chờ, gọi `wg.Wait()` — hàm này **block cho tới khi bộ đếm về 0**.

WaitGroup là một trong **ba cách xử lý concurrency** mà khóa học này sẽ đi qua, và thật ra đó là ba cách duy nhất bạn cần quan tâm trong Go. Với mình, đây là cách **dễ nhất**.

### 🔁 Truyền WaitGroup qua con trỏ

Để goroutine báo được "mình xong rồi", nó phải có quyền truy cập vào WaitGroup. Mình sửa `printSomething` để nhận thêm tham số:

```go
func printSomething(s string, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println(s)
}
```

Hai điểm cần nhớ:

* **Phải dùng con trỏ `*sync.WaitGroup`**. Tài liệu Go nói rõ: sau khi tạo WaitGroup, **đừng copy nó** rồi sửa — hãy truyền nó đi dưới dạng con trỏ. Cách này đơn giản và an toàn hơn nhiều.
* **`defer wg.Done()`** nghĩa là: đừng chạy `Done` tại đây, hãy chạy nó khi hàm hiện tại kết thúc.

Khi gọi, nhớ thêm dấu `&` trước biến:

```go
go printSomething(fmt.Sprintf("%d: %s", i, x), &wg)
```

### 💥 Đừng bao giờ để bộ đếm xuống dưới 0

Khi mình chạy thử, chương trình báo **bộ đếm WaitGroup bị âm** — một lỗi hoàn toàn có thể đoán trước, và mình tin nhiều bạn cũng thấy nó đến. Chuyện xảy ra khi số lần `Done` không khớp với số đã `Add`, khiến bộ đếm bị đẩy xuống dưới 0.

Mình chỉnh lại cho khớp và chương trình chạy trơn tru. Hai bài học vàng rút ra:

* **Không bao giờ để WaitGroup xuống dưới 0** — chuyện xấu sẽ xảy ra.
* Dù các goroutine gọi cùng một hàm, bạn **không có bảo đảm nào về thứ tự hoàn thành** — tất cả do **Go scheduler** quyết định. Lần chạy này từ in cuối cùng là `gamma`, lần sau là `delta` — vui vẻ mà chấp nhận thôi!

### 📏 Đừng hardcode số lượng

Cuối cùng, mình thay `wg.Add(9)` bằng:

```go
wg.Add(len(words))
```

Cách này hữu ích hơn hẳn: nếu `words` đến từ một **remote API**, từ **JSON**, hay từ bất cứ nguồn nào bạn không kiểm soát, bạn không bao giờ biết trước nó dài bao nhiêu — còn `len(words)` thì luôn đúng.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao 9 từ trong slice được in ra không theo thứ tự?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì thứ tự hoàn thành của goroutine do Go scheduler quyết định, không phụ thuộc vào thứ tự bạn sinh ra chúng.

Giải thích: Chạy nhiều lần sẽ thấy thứ tự khác nhau mỗi lần.

Tham chiếu: Mục Vì sao time.Sleep không đáng tin.

</details>

**Câu 2:** Ba bước cơ bản để dùng WaitGroup là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `wg.Add(n)` để đăng ký số việc, `defer wg.Done()` trong mỗi goroutine, và `wg.Wait()` để chờ tới khi bộ đếm về 0.

Giải thích: `Wait` sẽ block cho tới khi mọi việc đã đăng ký hoàn thành.

Tham chiếu: Mục WaitGroup: dễ như đếm.

</details>

**Câu 3:** Vì sao nên truyền `*sync.WaitGroup` thay vì truyền theo giá trị?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì tài liệu Go khuyến nghị không copy WaitGroup sau khi tạo — hãy truyền con trỏ.

Giải thích: Copy rồi chỉnh sửa sẽ không tác động tới WaitGroup gốc, gây lỗi khó lường.

Tham chiếu: Mục Truyền WaitGroup qua con trỏ.

</details>

**Câu 4:** `defer wg.Done()` có ý nghĩa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hoãn việc gọi `Done` cho tới khi hàm hiện tại kết thúc.

Giải thích: Nhờ đó goroutine luôn báo hoàn thành đúng lúc, kể cả khi hàm kết thúc sớm.

Tham chiếu: Mục Truyền WaitGroup qua con trỏ.

</details>

**Câu 5:** Vì sao nên dùng `wg.Add(len(words))` thay vì một số cố định?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì dữ liệu từ API, database hay JSON có thể dài ngắn tùy lúc; `len(words)` luôn khớp.

Giải thích: Đếm sai là nguyên nhân trực tiếp của lỗi bộ đếm âm hoặc deadlock.

Tham chiếu: Mục Đừng hardcode số lượng.

</details>

*Vậy là các bạn đã nắm được công cụ đầu tiên — và dễ dùng nhất — để xử lý concurrency. Chúng ta sẽ còn gặp WaitGroup dài dài, và bài sau sẽ là viết test cho nó!* 🚀
