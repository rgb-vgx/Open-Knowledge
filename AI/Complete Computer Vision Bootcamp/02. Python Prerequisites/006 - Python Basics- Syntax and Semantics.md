---
title: 'Bài 006 — Cú pháp và ngữ nghĩa trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 6
status: edited
source: '006 - Python Basics- Syntax and Semantics.md'
categories:
- AI
tags: []

---

# 🧩 Cú pháp và ngữ nghĩa trong Python

> Nguồn: `006 - Python Basics- Syntax and Semantics.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084899)

Chào các bạn! Trong bài này mình cùng làm rõ hai khái niệm nền tảng nhất của Python: **syntax** (cú pháp) và **semantics** (ngữ nghĩa). Nghe có vẻ lý thuyết, nhưng mình sẽ gắn từng ý với một đoạn code chạy được, để các bạn thấy ngay lỗi quen thuộc đến từ đâu và sửa thế nào.

### 🎯 Syntax và semantics khác nhau ở đâu?

**Syntax** là tập hợp các quy tắc định nghĩa cách kết hợp ký hiệu để tạo thành một chương trình được xem là đúng cấu trúc. Nói gọn: syntax là cách sắp xếp từ và ký hiệu cho đúng trong code.

**Semantics** là ý nghĩa hay cách diễn giải các ký hiệu, ký tự và câu lệnh trong ngôn ngữ. Nó trả lời câu hỏi: khi chạy, đoạn code này *phải làm gì*?

Các bạn có thể nhớ theo cách này:

* **Syntax** — viết đúng hình thức, đúng chỗ.
* **Semantics** — viết ra thì chương trình thực sự thực hiện việc gì.

Mình gặp **syntax error** rất thường khi mới code, chẳng hạn dùng một biến mà chưa gán giá trị cho nó. Hiểu hai khái niệm này sẽ giúp các bạn đọc thông báo lỗi nhanh hơn nhiều.

---

### 💬 Comment: một dòng và nhiều dòng

Muốn ghi chú trong code, Python có hai cách.

**Comment một dòng** dùng dấu `#`. Trong Jupyter Notebook hay file `.py` đều dùng được:

* `# Đây là comment một dòng`
* `print("Hello World")` — khi chạy chỉ in ra `Hello World`, phần comment bị bỏ qua.

Comment rất hữu ích khi các bạn muốn mô tả một hàm sắp viết, hoặc đánh dấu đoạn code đang làm.

**Comment nhiều dòng** dùng **triple quotes** (ba dấu nháy). Giảng viên minh họa bằng một file `test.py`:

* Viết vài dòng mô tả nằm giữa cặp triple quotes.
* Cách này phù hợp khi comment kéo dài nhiều dòng.

Một lưu ý giảng viên nêu: triple quotes dùng được trong file `.py`, còn trong Jupyter Notebook thì không; riêng comment một dòng bằng `#` thì chạy được ở cả hai nơi.

---

### 🔠 Case sensitivity — Python phân biệt hoa thường

Đây là quy tắc đầu tiên và cực kỳ quan trọng: **Python is case sensitive**, tức là phân biệt chữ hoa và chữ thường.

Mình thử hai biến:

* `name = "Chris"`
* `Name = "Nick"`

Nhìn thì giống nhau, nhưng đây là **hai identifier khác nhau**. Khi in `name` ta được `Chris`, in `Name` ta được `Nick`. Vì vậy đừng ngạc nhiên nếu đổi một chữ cái hoa/thường mà chương trình coi như một biến mới.

---

### 📐 Indentation — thay cho dấu ngoặc nhọn

**Indentation** (thụt lề) trong Python dùng để định nghĩa cấu trúc và thứ bậc của code. Nhiều ngôn ngữ khác dùng dấu ngoặc nhọn `{ }` để giới hạn một block; Python thì dùng thụt lề để xác định các câu lệnh thuộc cùng một nhóm, thường là **4 dấu cách** hoặc một **tab**, và phải nhất quán.

Ví dụ mình khai báo `age = 32` rồi viết:

* `if age > 30:` — sau dấu hai chấm, khi nhấn Enter, editor tự thụt vào trong block.
* Thụt lề rồi `print(30)` và `print(age)` — hai lệnh này chỉ chạy khi điều kiện đúng.
* Ra ngoài, viết `print(age)` không thụt lề — lệnh này nằm ngoài `if`, luôn chạy.

Kết quả là `32` hiện hai lần: một lần bên trong `if`, một lần bên ngoài. Đây chính là cách indentation cho biết đoạn code thuộc block nào.

Nếu bỏ thụt lề, các bạn sẽ gặp lỗi kiểu: *"IndentationError: expected an indented block after 'if' statement on line 2"*. Giảng viên nhấn mạnh: dù viết class, hàm, `if`, `for` hay `while`, hễ có block là bắt buộc thụt lề; Python không cần ngoặc nhọn.

Một ví dụ lồng nhau cho thấy thứ bậc rõ hơn:

1. `if True:` rồi thụt lề `print(...)` — dòng này chạy.
2. Bên trong, thêm `if False:` và thụt lề sâu hơn một lần nữa cho `print(...)` — dòng này **không** chạy vì điều kiện sai.
3. Các lệnh thẳng hàng với block ngoài vẫn chạy bình thường.

Trong ví dụ này, giảng viên đếm được **ba lần** câu lệnh `print` thực sự được thực thi.

---

### ↩️ Line continuation và nhiều câu lệnh trên một dòng

Khi một phép tính dài dần, các bạn có thể ngắt dòng bằng **dấu gạch chéo ngược** `\`. Ví dụ:

* `total = 1 + 2 + 3 + 4 + 5 + 6 + 7` — viết trên một dòng thì quá dài.
* Thêm `\` ở cuối dòng rồi Enter, câu lệnh sẽ tiếp tục ở dòng mới, rồi cộng tiếp `+ 4 + 5 + 6`.
* In `total` vẫn ra kết quả đúng như khi viết liền.

Ngược lại, Python cũng cho phép **nhiều câu lệnh trên cùng một dòng**, ngăn bằng dấu chấm phẩy `;`:

* `x = 5; y = 10; z = x + y`
* In `z` được `15`.

Đây là thủ thuật gọn, nhưng mình khuyên dùng tiết chế để code dễ đọc.

---

### 🧠 Semantics: gán biến, type inference và dynamic typing

Phần này giải thích *ý nghĩa* đằng sau cú pháp.

Khi viết `age = 32`, Python **không** cần khai báo kiểu trước như `int age` hay `float age` ở nhiều ngôn ngữ khác. Kernel tự hiểu trong lúc chạy rằng `age` là số nguyên, vì giá trị gán vào là số nguyên. Tương tự, `name = "Chris"` cho ta một chuỗi.

Các bạn kiểm tra bằng hàm `type()`:

* `type(age)` → `int`
* `type(name)` → `str` (string)

Cơ chế này gọi là **type inference**: Python suy ra kiểu của biến tại runtime. Và vì suy ra lúc chạy, Python còn cho phép **dynamic typing** — kiểu của một biến có thể đổi khi chương trình tiếp tục:

* `var = 10` → `type(var)` là `int`
* `var = "Hello"` → cùng biến đó, `type(var)` thành `str`
* `var = 3.14` → lại thành `float`

Đây là một trong những điểm mình thấy thú vị nhất của Python.

Cuối cùng, hai lỗi thường gặp giúp phân biệt syntax và semantics:

* **IndentationError** — thiếu thụt lề sau `if` (lỗi cấu trúc).
* **NameError** — viết `a = b` khi `b` chưa được định nghĩa; lúc này `b` là biến không tồn tại. Giảng viên sẽ nói kỹ hơn về cách xử lý các lỗi này ở phần exception handling.

Vậy là mình đã đi qua comment, case sensitivity, indentation, line continuation và semantics. Bài sau chúng ta bắt tay vào **biến**, rồi tới **data types** và **operators** — hẹn gặp các bạn ở đó!

> ⚠️ Cần kiểm chứng: tài liệu Python chính thức định nghĩa comment chỉ bằng dấu `#`; cú pháp ba dấu nháy là string literal nhiều dòng, thường được dùng như comment. Cách giảng viên mô tả hành vi trong Jupyter Notebook nên được kiểm tra lại trên phiên bản notebook các bạn dùng.
