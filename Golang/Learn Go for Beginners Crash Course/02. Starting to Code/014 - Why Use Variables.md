# 🎲 Vì sao phải dùng biến? Khi trò chơi biết tự sinh số ngẫu nhiên

> Nguồn: `014-Why-Use-Variables.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161772)

Có thể các bạn đang tự hỏi: "Sao không gõ thẳng số 2, 5, 7 vào chuỗi cho nhanh?" — câu hỏi hoàn toàn hợp lý. Trong bài này mình sẽ trả lời nó, rồi cùng các bạn nâng cấp trò chơi để mỗi lượt chơi có bộ số khác nhau nhờ... biến.

### 🤔 "Gõ thẳng số vào chuỗi" có ổn không?

Thật ra mình hoàn toàn có thể gõ số 2 vào thẳng chuỗi và bỏ biến `firstNumber` đi, tương tự với `secondNumber`. Riêng `prompt` thì rõ ràng có lý do để tồn tại: nó xuất hiện ở nhiều chỗ, dùng hằng số giúp **đỡ phải gõ lại** đoạn "and press enter when ready".

Nhưng biến còn những lý do khác quan trọng hơn, và mình sẽ chứng minh bằng vài thay đổi nhỏ.

---

### ✏️ Cải thiện lời nhắc

Trước tiên, mình chỉnh hằng `prompt` để hướng dẫn rõ ràng hơn: người chơi **không cần gõ số của mình**, chỉ cần bấm Enter. Chạy lại bằng `go run main.go`, các bạn sẽ thấy lời hướng dẫn dễ hiểu hơn hẳn.

Chỉ một thay đổi nhỏ ở một nơi, cả chương trình được cập nhật — đó là lý do đầu tiên để dùng biến.

---

### 🎲 Sinh số ngẫu nhiên với `rand.Intn`

Lý do thứ hai mạnh mẽ hơn: thay vì cố định 2, 5, 7, chúng ta có thể dùng **bất kỳ số nguyên nào từ 1 đến 10**. Cách làm là sinh số ngẫu nhiên — chúng ta từng làm điều tương tự trong Eliza khi chọn ngẫu nhiên một chuỗi từ slice các câu trả lời.

Lần này mình dùng package [`rand`](https://pkg.go.dev/math/rand) có sẵn trong standard library, cụ thể là hàm `rand.Intn`. Theo phần hướng dẫn mà Visual Studio Code hiển thị, `Intn` trả về một số nguyên ngẫu nhiên (pseudo-random), không âm, từ nguồn mặc định — và nó sẽ **panic nếu tham số nhỏ hơn hoặc bằng 0**.

Mình chọn tham số **8**, nghe có vẻ lạ nhưng rất có lý:

* `rand.Intn` trả kết quả bắt đầu từ **0**, mà số 0 không dùng được cho phép toán — ví dụ chia cho 0 là điều không được phép.
* Mình muốn số từ 1 đến 10, và không muốn nhân với 1.

Vì `rand.Intn(8)` cho ra số trong khoảng **0 đến 8**, mình chỉ cần **cộng thêm 2** là có khoảng **2 đến 10**. Áp dụng y hệt cho cả ba biến:

```go
firstNumber = rand.Intn(8) + 2
secondNumber = rand.Intn(8) + 2
subtraction = rand.Intn(8) + 2
```

---

### 🌱 Seed bộ sinh số ngẫu nhiên

Nếu chạy chương trình ở trạng thái này, các bạn sẽ nhận ra điều bất ngờ: **lần nào cũng ra đúng ba con số đó**. Vấn đề nằm ở chỗ bộ sinh số ngẫu nhiên cần được "gieo hạt" (seed).

Cách làm rất dễ — gọi `rand.Seed` và truyền vào thời gian hiện tại lấy từ `time.Now`, dùng `UnixNano`:

```go
rand.Seed(time.Now().UnixNano())
```

`time.Now` là hàm có sẵn trong Go, còn thời gian thì thay đổi liên tục — nhờ đó mỗi lần chạy chương trình sẽ cho ra những con số khác nhau.

---

### 🧪 Chạy thử và rút ra kết luận

Một lượt chơi thực tế: nghĩ số **4**, nhân với 3 được 12, nhân kết quả với 4 được 48, chia cho số ban đầu được 12, trừ 4 còn **8** — và đáp án là 8. Chương trình chạy hoàn hảo.

Điều đáng nói là: nếu bỏ biến đi và cố làm tất cả những phép toán ngẫu nhiên này, chương trình sẽ trở nên **cực kỳ khó quản lý**. Biến giúp chương trình dễ đọc, dễ sửa và dễ mở rộng hơn rất nhiều.

Bài sau sẽ có một thử thách nho nhỏ để các bạn làm quen hơn với code này. Hẹn gặp lại! 🚀

## Nguồn tham khảo

- [Go Packages — math/rand](https://pkg.go.dev/math/rand)
- [Udemy — Why Use Variables?](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161772)
