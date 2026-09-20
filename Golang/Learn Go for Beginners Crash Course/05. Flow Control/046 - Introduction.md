# 🔁 Flow Control mở màn — Khi chương trình Go không còn chạy "một đường thẳng"

> Nguồn: `046-Introduction.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162100)

Chào các bạn, mình quay lại đây để mở màn một chặng mới của khóa học: **Flow Control (kiểm soát luồng)**. Từ đầu khóa tới giờ, code của chúng ta gần như luôn chạy lặng lẽ từ trên xuống dưới; section này sẽ dạy chương trình cách lặp lại, rẽ nhánh và dừng theo ý mình. Nghe thì to tát, nhưng các bạn sẽ thấy mọi thứ đều xoay quanh đúng một từ khóa: `for`.

### 🎯 Code của chúng ta đang chạy tuần tự

Từ đầu khóa đến giờ, chương trình thực thi **từng bước một**:

1. Chúng ta vào hàm `main` trong package `main`.
2. Dòng đầu tiên trong `main` được chạy.
3. Rồi đến dòng tiếp theo, rồi dòng tiếp theo nữa...

Đúng là có vài ngoại lệ nhỏ — một vài câu lệnh `if` và một vài vòng lặp đơn giản — nhưng nhìn chung mọi chương trình vẫn đi thẳng một đường. Trong section này (và một hai section tới), chúng ta sẽ thay đổi điều đó.

Mình sẽ bắt đầu bằng việc **lặp (looping)**. Chúng ta từng **range** qua slice và map rồi, nhưng vòng lặp trong Go còn làm được nhiều hơn thế:

* Thực thi một đoạn code **một số lần cố định**.
* Thực thi một đoạn code **dựa trên một hoặc nhiều điều kiện** đúng/sai.

Và tất cả những việc đó đều xoay quanh `for`.

---

### 🐹 Vì sao Go chỉ có một loại vòng lặp?

Các ngôn ngữ khác như Java, PHP hay C# có rất nhiều loại vòng lặp: `for`, `while`, `do while` và nhiều biến thể khác nữa. Nhưng các tác giả của Go đã quyết định làm mọi thứ **đơn giản nhất có thể**, nên Go chỉ có đúng **một loại vòng lặp duy nhất: `for`**.

Nghe hơi thiếu thốn, nhưng thật ra `for` của Go làm được y hệt những gì `while` hay `do while` làm ở ngôn ngữ khác — chỉ là cú pháp hơi khác một chút. Đây cũng chính là tinh thần **"one problem, one solution"** mà mình rất thích ở Go.

---

### 🗺️ Bản đồ section này có gì?

Trong section Flow Control, chúng ta sẽ lần lượt đi qua:

1. **Three component loop** — vòng lặp `for` ba phần (khởi tạo, điều kiện, cập nhật).
2. **While kiểu Go** — dùng `for` để làm việc mà `while` vẫn làm ở ngôn ngữ khác.
3. **Infinite loop** — vòng lặp vô hạn, thứ chúng ta từng gặp, sẽ được ôn lại kỹ hơn.
4. **Range chi tiết hơn** — vòng lặp duyệt qua slice hoặc map.
5. **Cách thoát khỏi vòng lặp** khi cần thiết.

Mình hứa là đi hết section này, các bạn sẽ thấy `for` của Go vừa đơn giản vừa đủ dùng cho gần như mọi tình huống.

---

### 🔮 Nhìn trước: ra quyết định và debugger

Ngay sau section này, chúng ta sẽ học cách **ra quyết định** trong code. Câu lệnh `if` thì chúng ta đã gặp rồi, nhưng sẽ xem kỹ hơn; đặc biệt là câu lệnh `switch` — một cách khác để rẽ nhánh khi cần.

Section sau nữa, mình sẽ giới thiệu **debugger của Go** tên là `dlv`, thường được đọc là **"delve"**. Debugger cho phép chúng ta xem giá trị của các biến ngay khi chương trình đang chạy — một cách cực kỳ hữu ích để tìm lỗi trong code.

### ✅ Tự kiểm tra nhanh

**1. Go có bao nhiêu loại vòng lặp?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Đúng một loại — vòng lặp `for`.
Giải thích: Các tác giả Go chọn giữ ngôn ngữ đơn giản và gọn nhất có thể.
Tham chiếu: Mục "Vì sao Go chỉ có một loại vòng lặp?"

</details>

**2. Các ngôn ngữ như Java, PHP, C# có những loại vòng lặp nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `for`, `while`, `do while` và nhiều loại khác.
Giải thích: Go không đi theo hướng nhiều cú pháp như vậy.
Tham chiếu: Mục "Vì sao Go chỉ có một loại vòng lặp?"

</details>

**3. `for` trong Go có làm được việc của `while` và `do while` không?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — làm được y hệt, chỉ khác cú pháp.
Giải thích: Cùng chức năng, khác cách viết.
Tham chiếu: Mục "Vì sao Go chỉ có một loại vòng lặp?"

</details>

**4. Trước section này, code của chúng ta chủ yếu thực thi như thế nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tuần tự từng bước, từ dòng đầu đến dòng cuối của hàm `main`.
Giải thích: Chỉ có vài ngoại lệ nhỏ là các câu `if` và vài vòng lặp đơn giản.
Tham chiếu: Mục "Code của chúng ta đang chạy tuần tự"

</details>

**5. Debugger của Go tên là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `dlv`, thường đọc là "delve".
Giải thích: Nó cho phép xem giá trị biến khi chương trình đang chạy — cách rất hay để tìm lỗi.
Tham chiếu: Mục "Nhìn trước: ra quyết định và debugger"

</details>

---

Đó là tấm bản đồ cho chặng Flow Control. *Đừng lo nếu các bạn chưa hình dung hết mọi thứ ngay bây giờ* — mình sẽ đi chậm rãi, từng bước một, và mọi mảnh ghép sẽ khớp lại khi chúng ta gõ code.

Bài tiếp theo, mình sẽ viết vòng lặp **three-part loop** đầu tiên và cùng các bạn đếm từ 0 đến 10. Hẹn gặp lại! 🚀
