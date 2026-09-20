# 🧮 Đáp án thử thách Hammer Bitcoin — 26 biểu thức Boolean

> Nguồn: `042-Hammer-Bitcoin-Challenge-Solution.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162046)

Ở bài trước mình đã giao cho các bạn một thử thách: đếm toàn bộ biểu thức Boolean trong file `bitcoinminer.go`. Hôm nay mình sẽ đếm cùng các bạn, và mình sẽ cố hết sức để đếm cho thật chính xác. Nếu có sai sót, như đã hứa, các bạn cứ thoải mái chỉ ra trong phần bình luận nhé.

### 📏 Trước khi đếm: luật đếm của mình

* Trong file **không có biểu thức Boolean nào trước khoảng dòng 38**.
* Một **biểu thức Boolean ghép (compound)** được mình đếm là **một** — dù về mặt kỹ thuật có thể tách thành hai. Hầu hết lập trình viên cũng đếm như vậy.
* Từ khóa `true` và `false` đứng một mình cũng là biểu thức Boolean.
* Mình đếm cả những câu lệnh `if`, `else if` và điều kiện của vòng lặp `for`.

---

### 🎮 Bốn biểu thức trong hàm `play`

Bài trước mình nói trong hàm này có **ba** biểu thức — thật ra mình đã nói nhầm, **có bốn**:

1. **Dòng 45** — từ khóa `true`, gán cho `stillInOffice`.
2. **Dòng 48** — cụm điều kiện của vòng lặp `for` (`stillInOffice` và `year <= 10`), đếm là một.
3. **Dòng 58** — câu lệnh `if`.
4. **Dòng 59** — từ khóa `false`, gán cho `stillInOffice`.

Từ đây, mình phải đi xuống tận **dòng 116** mới gặp biểu thức tiếp theo.

---

### 🔎 Đi hết phần còn lại của file

5. **Dòng 116** — `if` kiểm tra số nạn nhân của cú sập thị trường lớn hơn 0.
6. **Dòng 125** — `if` kiểm tra số bitcoin còn bị hacker lấy đi lớn hơn 0.
7. **Dòng 142** — trong hàm mua máy tính, vòng lặp `for` kiểm tra "cost lớn hơn cash".
8. Trong hàm bán máy tính — vòng lặp `for` kiểm tra số máy cần bán lớn hơn số máy đang có.
9. Trong hàm trả lương nhân viên — vòng lặp `for` so sánh số tiền cần trả với lượng cash.
10. **Dòng 192** — trong hàm bảo trì máy tính, vòng lặp `for` kiểm tra xem câu trả lời có hợp lệ hay không.
11. **Dòng 194** — câu lệnh `if`.
12. **Dòng 196** — `else if`.
13. **Dòng 198** — `else if`.
14. **Dòng 214** — trong hàm kiểm tra sập thị trường, `if` xúc xắc nhỏ hơn hoặc bằng 15.
15. **Dòng 224** — trong hàm đếm nhân viên mới, `if` kiểm tra số nhân viên chết đói lớn hơn 0.
16. **Dòng 235** — trong hàm kiểm tra hacker, `if` xúc xắc nhỏ hơn 40.

*Riêng hàm đào bitcoin thì không có biểu thức Boolean nào.*

17. **Dòng 257** — trong hàm đếm nhân viên chết đói, một câu lệnh `if`.
18. **Dòng 273** — trong hàm in điểm cuối, một câu lệnh `if`.
19. **Dòng 284** — `if` so sánh 20 lần số nhân viên với điểm của máy tính.
20. **Dòng 288** — `if` kiểm tra điểm máy tính nhỏ hơn 600.
21. **Dòng 294** — `else if` kiểm tra điểm máy tính nhỏ hơn 800.
22. **Dòng 311** — trong hàm xử lý câu trả lời yes/no, kiểm tra lỗi.
23. **Dòng 322** — lại kiểm tra lỗi.
24. **Dòng 325** — một biểu thức Boolean ghép, đếm là một.
25. **Dòng 334** — trong hàm xóa màn hình, `if` dùng `strings.Contains` với `runtime.GOOS` — phần này mình chưa nói tới, nhưng nếu nó trả về `true` thì đó là một biểu thức Boolean.
26. **Dòng 358** — trong hàm nhập số, `if` kiểm tra `error` khác `nil`.

---

### ✅ Chốt lại: 26 biểu thức Boolean

Đó là toàn bộ phép đếm của mình — **26 biểu thức Boolean**. Hy vọng các bạn cũng ra con số 26. Nếu các bạn đếm ra kết quả khác, hãy chỉ ra lỗi của mình trong phần bình luận của bài này; mình rất sẵn lòng nhận góp ý, và biết đâu chính các bạn mới là người đếm đúng.

Điều đáng mừng là chúng ta đã có thể "đọc" một file code game thật sự — nhận ra đâu là điều kiện, đâu là gán Boolean, đâu là vòng lặp — chỉ sau vài bài học về Boolean. Đó là tiến bộ rất lớn đấy, các bạn ạ.

---

Chúng ta sẽ còn quay lại Hammer Bitcoin trong khóa học, và mỗi lần như vậy file `bitcoinminer.go` sẽ bớt "bí ẩn" hơn. Ở bài tiếp theo, mình muốn nói về một trong những điểm khác biệt thú vị nhất giữa Go và các ngôn ngữ như Java, C# hay PHP: **composition**. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Udemy — Hammer Bitcoin Challenge Solution](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162046)
