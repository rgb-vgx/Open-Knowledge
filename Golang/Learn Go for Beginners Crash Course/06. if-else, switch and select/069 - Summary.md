# 📌 Tổng kết chương — if, switch, select và khi nào dùng cái nào

> Nguồn: `069-Summary.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162288)

Chúng ta đã đi qua khá nhiều kiến thức trong chương này. Ngoại trừ `select`, phần lớn nội dung khá dễ nắm — nhưng mình vẫn muốn cùng các bạn nhìn lại một lượt để mọi thứ thật chắc.

*Các bạn thấy mình nhấn mạnh chữ "nhất quán" và "dễ đọc" hơi nhiều không? Đó là tinh thần của Go đấy.*

---

### 🔍 if và else: một biểu thức, một nhánh

Chúng ta đã gặp `if` từ trước, nhưng lần này đi sâu hơn và làm quen với `else`. Điều cần nhớ:

* Với bất kỳ câu `if` nào, để phần ngay sau `if` hoặc `else if` được chạy, thì **toàn bộ biểu thức Boolean** phải đúng — chứ không phải chỉ một phần.
* **Chỉ một nhánh `else`** được chạy. Kể cả khi một điều kiện phía sau cũng đúng, chỉ điều kiện **khớp đầu tiên** được thực thi.

---

### 🔀 switch: người anh em dễ đọc hơn

`switch` là một biến thể của `if`, hữu ích khi các bạn có **nhiều nhánh `else`**. Nó làm code của các bạn **dễ đọc hơn hẳn** — và điều đó lúc nào cũng là chuyện tốt.

* Giống như chuỗi `else`, trong `switch` **chỉ một `case`** được chạy. Các ngôn ngữ khác xử lý khác, nhưng Go thì chỉ một mà thôi.
* `switch` có thể có một **`case default`**, luôn nằm ở **cuối danh sách case**.
* Dù `default` rỗng, **để nó ở đó vẫn là thói quen tốt** — khi đó sẽ không có gì được chạy.

---

### 📡 select: phức tạp nhất, chỉ dành cho channel

`select` là thứ **phức tạp nhất** trong chương này — và điều đó cũng dễ hiểu, vì khi làm việc với **lập trình đồng thời (concurrent programming)** thì mọi thứ luôn phức tạp hơn.

* `select` **chỉ hoạt động với channel**.
* Nó hoạt động rất giống `switch`, nhưng dành cho channel.

---

### 🎮 Nhìn lại game rock paper scissors

Chúng ta đã sửa lại game rock paper scissors để dùng `select` và channel. Một lời nhắc quan trọng: **không nhất thiết phải dùng `select` và channel cho game này**. Nó vẫn chạy tốt như một chương trình tuần tự, không có gì chạy đồng thời cả. Nhưng đây là cơ hội tuyệt vời để thực hành `select` và channel — và đó mới là mục đích chính.

| Công cụ | Dùng với | Số nhánh được chạy | Ghi chú |
|---|---|---|---|
| `if` / `else if` / `else` | Biểu thức Boolean | Nhánh `true` đầu tiên | Nhiều `else` sẽ khó đọc |
| `switch` / `case` / `default` | Một giá trị so sánh | `case` khớp đầu tiên | `default` nằm cuối, nên để kể cả khi rỗng |
| `select` / `case` | Channel | `case` nhận được thông tin | Chỉ dùng cho channel |

---

### 🎯 Tự kiểm tra nhanh

**1. Điều kiện để phần code ngay sau `if` hoặc `else if` được chạy là gì?**

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Toàn bộ biểu thức Boolean phải đúng.
Giải thích: Chỉ cần một phần sai là nhánh đó không chạy.
Tham chiếu: Mục "if và else: một biểu thức, một nhánh".

</details>

**2. Nếu hai điều kiện trong chuỗi `if`/`else if` đều đúng thì chuyện gì xảy ra?**

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ điều kiện khớp đầu tiên được thực thi, các nhánh sau bị bỏ qua.
Giải thích: Đây là điều mình kiểm chứng bằng debugger ở bài `else`.
Tham chiếu: Mục "if và else: một biểu thức, một nhánh".

</details>

**3. Khi nào `switch` hữu ích hơn chuỗi `if`/`else`, và nó chạy bao nhiêu `case`?**

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hữu ích khi có nhiều nhánh `else`; chỉ một `case` được chạy.
Giải thích: `switch` giúp code dễ đọc hơn hẳn, và Go chỉ cho phép một `case` khớp.
Tham chiếu: Mục "switch: người anh em dễ đọc hơn".

</details>

**4. `default` nằm ở đâu và có nên để lại không?**

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nằm ở cuối danh sách `case`; nên để lại kể cả khi rỗng.
Giải thích: Khi không `case` nào khớp, phần sau `default` được chạy; nếu rỗng thì không có gì xảy ra.
Tham chiếu: Mục "switch: người anh em dễ đọc hơn".

</details>

**5. `select` khác `switch` ở điểm nào và vì sao nó phức tạp nhất chương?**

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `select` chỉ làm việc với channel; nó phức tạp vì gắn với lập trình đồng thời.
Giải thích: `select` hoạt động rất giống `switch` nhưng dành cho channel.
Tham chiếu: Mục "select: phức tạp nhất, chỉ dành cho channel".

</details>

---

Chương này khép lại với ba công cụ ra quyết định: `if`/`else`, `switch` và `select`. Ở chương tiếp theo, chúng ta sẽ chuyển sang một chủ đề mới: **làm toán trong Go** — và bắt đầu bằng các **toán tử (operators)**. Hẹn gặp lại các bạn ở chương sau! 🚀

## Nguồn tham khảo

- [The Go Programming Language Specification](https://go.dev/ref/spec)
- [Effective Go](https://go.dev/doc/effective_go)
- [A Tour of Go — Flow control](https://go.dev/tour/flowcontrol/1)
