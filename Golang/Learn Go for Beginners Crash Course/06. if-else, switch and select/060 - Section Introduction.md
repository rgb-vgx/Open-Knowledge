# 🐹 Ra quyết định trong Go — Mở đầu chương if/else, switch và select

> Nguồn: `060-Introduction.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162244)

Chào các bạn, chúng ta gặp lại nhau ở một chương mới. Ở chương trước, mình và các bạn đã học cách **lặp lại** những đoạn code bằng các biến thể khác nhau của vòng lặp `for`. Lần này, chúng ta sẽ nói về một việc mà chương trình nào cũng phải làm: **ra quyết định** — chọn xem khi nào thì làm gì.

Nghe có vẻ to tát, nhưng thật ra các bạn đã gặp một phần của nó rồi. Mình sẽ đi thật chậm và kiên nhẫn, nên các bạn cứ thoải mái nhé.

---

### 🎯 Ba cách ra quyết định trong chương này

Mục tiêu của chương này rất gọn gàng: mình sẽ giới thiệu ba công cụ để chương trình Go đưa ra quyết định.

1. **`if` / `else`** — công cụ kiểm tra điều kiện cơ bản. Chương trình dùng các **biểu thức Boolean (Boolean expression)** để xét một điều kiện đúng hay sai, rồi quyết định bước tiếp theo.
2. **`switch`** — một cách ra quyết định thay thế, hữu ích và phù hợp hơn trong một số trường hợp, đồng thời giúp code của các bạn **dễ đọc hơn**.
3. **`select`** — thứ đặc biệt chỉ có ở Go: ra quyết định với **channel**.

Các bạn cứ hình dung ba công cụ này như ba kiểu "ngã rẽ" khác nhau trong chương trình. Cùng mục đích là chọn hướng đi, nhưng mỗi kiểu phù hợp với một hoàn cảnh riêng.

---

### 🧠 Ôn lại câu lệnh if

Các bạn đã ít nhiều quen với câu lệnh `if` qua vài bài trước, nên chắc không còn lạ lẫm. Tuy nhiên, lần này mình muốn cùng các bạn đi qua `if` và `else` chi tiết hơn một chút, để chắc chắn ai cũng nắm chắc cách nó hoạt động.

Chúng ta sẽ xem lại cách dùng biểu thức Boolean để kiểm tra điều kiện và quyết định chương trình sẽ làm gì. *Nếu các bạn chưa nhớ hết cú pháp, đừng lo — mình sẽ đi từ đầu.*

---

### 🧩 switch — khi nào nên dùng thay cho if?

`switch` cũng là một cách ra quyết định, nhưng không phải bản sao của `if`. Trong một số trường hợp, `switch` **hữu ích hơn**, **phù hợp hơn**, và quan trọng nhất là làm code của các bạn **dễ đọc hơn hẳn**. Mình sẽ chỉ cho các bạn thấy điều đó bằng ví dụ cụ thể trong các bài tới.

---

### 🐹 Điểm đặc biệt của Go: quyết định với channel

Phần cuối chương là một chủ đề rất "Go": làm sao để ra quyết định liên quan tới **channel**. Công cụ dành cho việc này là câu lệnh **`select`**, và mình để dành nó cho cuối chương, sau khi các bạn đã quen với `if` và `switch`.

---

Vậy là chúng ta đã có bản đồ của cả chương: `if`/`else` để làm quen, `switch` để code gọn gàng hơn, và `select` để làm việc với channel. *Cứ từ từ, không cần nhớ hết ngay lập tức.* Nào, chúng ta bắt đầu thôi! 🚀
