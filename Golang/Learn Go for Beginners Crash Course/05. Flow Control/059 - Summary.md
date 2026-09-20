# 🎓 Tổng kết Flow Control — Một vòng lặp, bốn kiểu dùng

> Nguồn: `059-Summary.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162236)

Chào các bạn! Chúng ta vừa đi hết một section khá dày đặc kiến thức. Trong bài tổng kết này, mình sẽ cùng các bạn nhìn lại toàn bộ hành trình: từ ba phần của vòng lặp `for`, tới debugger, nested loop, và cả những câu hỏi về code "tốt hơn". *Thắt dây an toàn một chút nhé* — nội dung ôn tập sẽ nhanh và gọn.

### 🐹 Một ngôn ngữ, một vòng lặp duy nhất

Điểm quan trọng nhất cần nhớ: **Go chỉ có một loại vòng lặp duy nhất — `for`**. Các ngôn ngữ như Java hay C# có `for`, `while`, `do while`; Go thì không.

Nhưng đừng để điều đó đánh lừa: `for` của Go làm được **mọi thứ** mà `while`, `do while` hay `for` truyền thống làm — chỉ khác cú pháp một chút. Đây là quyết định có chủ đích của các tác giả Go: giữ ngôn ngữ **đơn giản và gọn nhẹ nhất có thể**.

---

### 🔁 Ôn lại các biến thể của for

**Three-part loop (vòng lặp ba phần)** gồm đủ ba thành tố:

* **Initializer** — ví dụ `i := 0`, bắt đầu đếm từ 0.
* **Condition** — ví dụ `i < 10`.
* **Iterator** — ví dụ `i++`, tăng `i` lên 1 mỗi vòng.

Với ví dụ trên, vòng lặp bắt đầu từ 0 và **kết thúc ngay khi `i` đạt 10** — lúc đó ta rời vòng lặp và không làm gì bên trong nữa.

**Kiểu while** thậm chí còn đơn giản hơn: `for` cộng một biểu thức Boolean; chừng nào biểu thức còn đúng, vòng lặp còn chạy.

**Infinite loop** là dạng đơn giản nhất: chỉ `for` trơ trọi, chạy mãi cho đến khi bạn thoát bằng `break` — và **do-while** cũng làm được, với vô hạn + `break` hoặc `for ok`, như bài trước chúng ta đã bàn.

| Biến thể | Ví dụ | Đặc điểm |
|---|---|---|
| Three-part loop | `for i := 0; i < 10; i++` | Khởi tạo, điều kiện, cập nhật — chạy số lần xác định |
| While-style | `for i > 100` | Chạy khi điều kiện còn đúng |
| Infinite loop | `for` | Chạy mãi, thoát bằng `break` |
| Do-while mô phỏng | `for` vô hạn + `break`, hoặc `for ok` | Thân vòng chạy ít nhất một lần rồi mới kiểm tra |

---

### 🐞 Delve — debugger giúp bạn nhìn thấu code

Chúng ta đã làm quen với **delve**, debugger của Go. Nó giúp tập trung vào code và quan sát chi tiết: **xem giá trị biến** và **step qua từng dòng** khi cần. Thay vì đoán mò bằng `fmt.Print`, bạn thấy chương trình đang thật sự làm gì.

Chúng ta cũng đã hiểu **nested loop** — vòng lặp nằm trong vòng lặp — và dùng debugger để xem `i`, `j` thay đổi ra sao qua từng cú step.

---

### 🧰 Debugger cho console application

Một kỹ năng đáng nhớ: debug các ứng dụng **đọc input từ bàn phím** cần cấu hình thêm hai file `launch.json` và `tasks.json`. Bạn sẽ cần chúng bất cứ khi nào viết console app trong tương lai và muốn debug — lời khuyên của mình là **giữ một bản copy hai file này bên mình**.

Chúng ta cũng đã khám phá kỹ hơn hai project quen thuộc: **Hammer Bitcoin** và **Eliza** — xem tận mắt code của chúng chạy như thế nào.

---

### ⚖️ "Better" phụ thuộc vào tiêu chí của bạn

Cuối cùng, chúng ta dành thời gian cho câu hỏi "code nào tốt hơn". Kết luận thật ra rất đơn giản: **tùy tiêu chí**.

* Nếu bạn muốn code **dễ đọc tối đa** — chọn cách rõ ràng, ít dòng.
* Nếu bạn muốn **chạy nhanh nhất có thể** — chọn cách ít phép tính, ít vòng lặp.
* Và trong nhiều trường hợp, câu trả lời **tùy vào tình huống cụ thể**.

### ✅ Tự kiểm tra nhanh

**1. Go có những loại vòng lặp nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ một — vòng lặp `for`.
Giải thích: Nó làm được vai trò của `while`, `do while` và `for` truyền thống nhờ cú pháp linh hoạt.
Tham chiếu: Mục "Một ngôn ngữ, một vòng lặp duy nhất"

</details>

**2. Three-part loop gồm ba thành tố nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Initializer (khởi tạo), condition (điều kiện), iterator (cập nhật).
Giải thích: Ví dụ `for i := 0; i < 10; i++` bắt đầu từ 0 và thoát khi `i` đạt 10.
Tham chiếu: Mục "Ôn lại các biến thể của for"

</details>

**3. Delve giúp chúng ta làm gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Xem giá trị biến và step qua từng dòng code khi chương trình chạy.
Giải thích: Nó giúp hiểu code đang làm gì, thay vì đoán bằng các câu lệnh in.
Tham chiếu: Mục "Delve — debugger giúp bạn nhìn thấu code"

</details>

**4. Debug console application cần thêm hai file nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `launch.json` và `tasks.json`.
Giải thích: Nên giữ một bản copy để dùng lại cho các project sau này.
Tham chiếu: Mục "Debugger cho console application"

</details>

**5. Kết luận của section về chuyện code nào "tốt hơn" là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tùy tiêu chí — dễ đọc hay chạy nhanh — và tùy từng tình huống cụ thể.
Giải thích: Không có một câu trả lời cố định cho mọi trường hợp.
Tham chiếu: Mục "Better phụ thuộc vào tiêu chí của bạn"

</details>

---

Section Flow Control khép lại ở đây. Các bạn giờ đã nắm trong tay công cụ mạnh nhất của Go để điều khiển luồng chương trình — và biết cả cách "soi" chúng bằng debugger khi có gì đó không ổn. *Tự hào một chút cũng được, các bạn đã đi được một quãng kha khá rồi.*

Bài tiếp theo, chúng ta bước sang phần **ra quyết định** để tiếp tục khám phá thêm về flow control. Hẹn gặp lại! 🚀

## Nguồn tham khảo

- [A Tour of Go — Flow control statements](https://go.dev/tour/flowcontrol/1)
- [The Go Programming Language Specification — For statements](https://go.dev/ref/spec#For_statements)
