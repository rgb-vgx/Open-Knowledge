# ⚖️ Cách nào tốt hơn? — Đọc được hay chạy nhanh?

> Nguồn: `057-Which-way-is-better.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162226)

Chào các bạn! Có một câu hỏi mình nghe rất thường xuyên: **"Cách nào tốt hơn?"** Khi có hai, ba, bốn cách cùng giải quyết một bài toán và cùng cho ra một kết quả, chúng ta nên chọn cách nào? Hôm nay chúng ta sẽ trả lời câu hỏi đó bằng một ví dụ rất cụ thể — kèm theo một chút toán đếm thú vị.

### 🤔 Khi hai cách ngang sức nhau

Lấy chính menu app làm ví dụ. Nó có hai phiên bản:

* Bản dùng **`for` kiểu while** với điều kiện `char != 'q'` và `char != 'Q'`.
* Bản dùng **infinite loop** rồi kiểm tra `q`/`Q` để `break` (mình đã comment nó lại).

Cả hai cách **chạy số dòng tương đương nhau**, độ phức tạp cũng tương đương. Bản while kiểm tra hai điều kiện trong đầu vòng lặp; bản vô hạn cũng kiểm tra đúng hai điều kiện đó trong câu `if`. Về mặt chức năng, chúng giống hệt nhau — nên trong trường hợp này, **không cách nào thật sự "hơn"**.

Khi độ phức tạp và số phép tính ngang nhau, tiêu chí tiếp theo để cân nhắc là: **bản nào dễ đọc hơn?**

---

### 📖 Dễ đọc — tiêu chí tiếp theo

Với menu app, hai bản cũng dễ đọc ngang nhau. Nhưng có những trường hợp khác biệt rõ hơn. Ví dụ đoạn tra cứu map mà chúng ta làm ở bài trước:

* Cách một: tra map bằng `l, ok := coffees[i]`, rồi viết câu `if ok` riêng ở dưới.
* Cách hai: viết gọn lại thành một dòng `if _, ok := coffees[i]; ok {`.

Hai đoạn code này **làm chính xác cùng một việc**, nhưng cách viết thì khác hẳn.

---

### 😅 Idiom mình từng "chống cự" suốt 12–18 tháng

Thú thật với các bạn: khi mới làm việc với Go, mình **không thích** cách viết gọn `if _, ok := ...; ok {` — mình thấy nó khó đọc hơn cách tách thành hai câu. Vậy mà idiom này xuất hiện **khắp mọi nơi** trong code Go.

Mình đã "chống cự" nó suốt **12 đến 18 tháng**, rồi cuối cùng cũng phải gật đầu: nó phổ biến, nó ít dòng hơn, và thật ra đọc cũng không khó đến thế. Hai cách này **tương đương về chức năng** — nếu bạn thấy cách nào dễ đọc hơn thì dùng cách đó.

Nhưng không phải lúc nào chuyện cũng rõ ràng như vậy. Có những trường hợp bạn phải **suy nghĩ thật kỹ** mới biết cách nào hiệu quả hơn.

---

### 🧮 Ví dụ đếm: 15 lần hay 101 lần?

Đây là bài tập mình muốn các bạn thử: hai đoạn code cùng in ra **các số từ 0 đến 100 chia hết cho 7**. Trước tiên, một lưu ý về **modulus operator (toán tử chia lấy dư)** trong Go — ký hiệu `%`. Phép `i % 7` trả về **phần dư** của phép chia; nếu phần dư bằng 0, tức là 7 chia hết cho số đó. Vậy điều kiện cần kiểm tra là `i % 7 == 0`.

Hai đoạn code cho kết quả giống nhau, nhưng khác nhau ở chỗ "chạy bao nhiêu lần". Các bạn thử tự đếm xem mỗi vòng lặp chạy bao nhiêu lần, điều kiện được kiểm tra bao nhiêu lần, rồi tự trả lời xem cách nào "tốt hơn".

| Tiêu chí | Bản chạy 15 lần | Bản chạy 101 lần |
|---|---|---|
| Số vòng lặp | 15 lần | 101 lần |
| Điều kiện mỗi vòng | Chỉ `i <= 100` | `i <= 100` **và** `i % 7 == 0` |
| Tổng phép kiểm tra | 15 | 101 (kèm một phép chia dư mỗi vòng) |
| Số dòng code | Ít hơn | Nhiều hơn |

Bản chạy 101 lần bắt đầu từ 0 với điều kiện `i <= 100`; mỗi vòng nó còn phải tính thêm `i % 7` và kiểm tra kết quả — tức **thêm một phép chia và một phép test, nhân lên 101 lần**. Còn bản 15 lần chỉ kiểm tra đúng một điều kiện `i <= 100` mỗi vòng.

---

### 🏆 Kết luận

Trong ví dụ này, bản **15 lần** thắng ở cả hai mặt:

* **Dễ đọc hơn** vì ít dòng code hơn.
* **Ít việc hơn** vì chỉ chạy 15 vòng thay vì 101, và chỉ test một điều kiện thay vì hai.

Nhưng các bạn nhớ cho: đây là trường hợp khá rõ ràng. Ngoài thực tế, không phải lúc nào cũng dễ so sánh như vậy — có khi bạn phải **đo đạc và suy nghĩ rất kỹ** mới tìm ra cách tối ưu. Và tiêu chí "tốt hơn" còn tùy: nếu bạn ưu tiên code dễ đọc thì một cách thắng, nếu ưu tiên tốc độ thì có thể là cách khác.

### ✅ Tự kiểm tra nhanh

**1. Khi hai cách cùng độ phức tạp, tiêu chí tiếp theo nên xét là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cách nào dễ đọc hơn.
Giải thích: Nếu số phép tính ngang nhau, readability là tiêu chí tiếp theo.
Tham chiếu: Mục "Khi hai cách ngang sức nhau"

</details>

**2. Toán tử `%` trong Go dùng để làm gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trả về phần dư của phép chia — modulus operator.
Giải thích: Nếu `i % 7 == 0` thì 7 chia hết cho `i`.
Tham chiếu: Mục "Ví dụ đếm: 15 lần hay 101 lần?"

</details>

**3. Bản "101 lần" phải làm thêm gì mỗi vòng lặp?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tính `i % 7` và kiểm tra `i % 7 == 0` — thêm một phép chia và một phép test.
Giải thích: Cộng dồn qua 101 vòng, đây là khối lượng việc đáng kể so với bản 15 vòng.
Tham chiếu: Mục "Ví dụ đếm: 15 lần hay 101 lần?"

</details>

**4. Trong ví dụ, bản nào thắng và vì sao?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bản 15 lần — ít dòng hơn, ít vòng lặp hơn, ít phép kiểm tra hơn.
Giải thích: Nó thắng cả về dễ đọc lẫn khối lượng công việc.
Tham chiếu: Mục "Kết luận"

</details>

**5. Trevor từng "chống cự" idiom nào của Go suốt 12–18 tháng?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cách viết gọn `if _, ok := coffees[i]; ok {`.
Giải thích: Ban đầu thấy khó đọc, nhưng idiom này xuất hiện khắp nơi và ít dòng hơn nên cuối cùng mình cũng dùng.
Tham chiếu: Mục "Idiom mình từng chống cự suốt 12–18 tháng"

</details>

---

*Đừng lo nếu các bạn thấy câu hỏi "cách nào tốt hơn" khó trả lời* — mình cũng mất khá lâu mới quen với việc cân đo này. Cứ viết code, đọc code, và trực giác sẽ đến.

Bài tiếp theo, chúng ta khép lại các biến thể vòng lặp bằng **do-while** — thứ Go không có cú pháp riêng, nhưng vẫn làm được bằng `for`. Hẹn gặp lại! 🚀
