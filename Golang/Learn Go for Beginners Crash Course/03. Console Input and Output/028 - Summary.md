# 🧾 Tổng kết Console Input and Output — nhìn lại chặng đường đã qua

> Nguồn: `028-Summary.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161928)

Vậy là chúng ta đã đi hết chương **Console Input and Output** — một chương khá dày đặc kiến thức. Mình muốn dành bài này để cùng các bạn nhìn lại những gì đã học, và quan trọng hơn là trấn an nếu có phần nào chưa thật sự "ngấm" ngay.

*Nếu bạn thấy có đoạn vẫn chưa rõ, đừng lo nhé* — chuyện hoàn toàn bình thường. Chúng ta sẽ còn dùng lại toàn bộ những kỹ thuật này xuyên suốt khóa học, và chúng sẽ dần trở thành phản xạ của bạn.

---

### 🧰 Package bên thứ ba và những phím bấm đơn

Lần đầu tiên trong khóa, chúng ta biết cách **import một package bên thứ ba** — như package `keyboard` — để bổ sung chức năng mới cho ứng dụng. Nhờ nó, chương trình có thể **lắng nghe từng phím bấm đơn** mà người dùng không cần nhấn Return.

Đây là cánh cửa quan trọng: thế giới Go có vô vàn package cộng đồng, và bạn đã biết cách tải chúng về bằng `go get` để dùng khi cần.

---

### 🗺️ Kiểu dữ liệu `map`

Chúng ta cũng làm quen với `map` — kiểu dữ liệu lưu trữ thông tin theo **cặp key và value**, giúp tra cứu thật nhanh. Trong bài menu cà phê, `map` biến con số người dùng bấm thành tên món gần như tức thì.

---

### ⛏️ Game Hammer Bitcoin

Game **hammer bitcoin** là nơi chúng ta áp dụng kỹ thuật lắng nghe phím đơn vào một chương trình thực tế: nhận câu trả lời **yes/no** từ người chơi để tiếp tục hoặc thoát game. Đây cũng là dịp chúng ta tập tành mở/đóng tài nguyên cẩn thận với `defer`.

---

### ✨ String interpolation và package `fmt`

Cuối cùng, chúng ta học **string interpolation** cùng package `fmt` — cách định dạng thông tin in ra console đẹp đẽ, hiệu quả hơn hẳn việc nối chuỗi thô. Từ đây, những placeholder như `%s`, `%d`, `%t`, `%.2f` sẽ là bạn đồng hành thường xuyên của các bạn.

| Kỹ thuật | Ứng dụng trong chương |
|---|---|
| Package bên thứ ba | `keyboard` — lắng nghe phím đơn |
| `map` | Menu cà phê — tra cứu key/value siêu nhanh |
| Lắng nghe phím đơn | Hammer Bitcoin — trả lời yes/no |
| String interpolation | `fmt.Sprintf`, `fmt.Printf` — in đẹp và hiệu quả |

---

### ✅ Tự kiểm tra nhanh

**1. Package bên thứ ba đầu tiên chúng ta dùng có tên là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `keyboard` — `github.com/eiannone/keyboard`.
Giải thích: Nó cho phép lắng nghe từng phím bấm đơn, không cần nhấn Enter.
Tham chiếu: Mục "Package bên thứ ba và những phím bấm đơn".

</details>

**2. `map` lưu dữ liệu theo dạng nào và hữu ích ở đâu?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Theo cặp key–value, giúp tra cứu thông tin rất nhanh.
Giải thích: Trong chương, map được dùng để tra tên cà phê từ con số người dùng bấm.
Tham chiếu: Mục "Kiểu dữ liệu map".

</details>

**3. Game Hammer Bitcoin nhận câu trả lời yes/no bằng cách nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lắng nghe một phím bấm đơn — bấm `n` để dừng, phím khác để chơi tiếp.
Giải thích: Hàm `GetYesOrNo` trả về `false` khi bấm n/N, ngược lại trả về `true`.
Tham chiếu: Mục "Game Hammer Bitcoin".

</details>

**4. Placeholder `%t` dùng để in kiểu dữ liệu nào?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kiểu `bool` — in ra `true` hoặc `false`.
Giải thích: Đây là placeholder bạn cần cho thử thách "owns a dog".
Tham chiếu: Mục "String interpolation và package fmt".

</details>

**5. Vì sao nên dùng `Sprintf`/`Printf` thay vì nối chuỗi bằng `+`?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hiệu quả hơn, ít bộ nhớ hơn, nhanh hơn — và `+` không nối được string với int.
Giải thích: Trong Go, bạn hiếm khi thấy dấu `+` dùng để nối chuỗi.
Tham chiếu: Mục "String interpolation và package fmt".

</details>

---

Đó là khá nhiều thứ trong một chương! Một số phần có thể vẫn còn hơi mơ hồ, *nhưng đừng bận tâm* — mình sẽ dùng lại tất cả những kiến thức này ở phần còn lại của khóa, và rồi chúng sẽ trở thành **bản năng thứ hai** của các bạn. Cứ đi tiếp, mọi thứ sẽ dần sáng tỏ. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀

## Nguồn tham khảo

- [eiannone/keyboard — GitHub](https://github.com/eiannone/keyboard)
- [fmt — pkg.go.dev](https://pkg.go.dev/fmt)
