---
title: 'Bài 019 — Hàm Lambda trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 19
status: edited
source: '019 - Python Lambda Functions.md'
categories:
- AI
tags: []

---

# ⚡ Hàm Lambda trong Python

> Nguồn: `019 - Python Lambda Functions.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084991)

Chào các bạn! Trong bài này mình cùng các bạn làm quen với **lambda function** — kiểu hàm nhỏ gọn, không có tên, dùng để viết nhanh những phép toán ngắn. Nắm chắc lambda sẽ là bước đệm để các bạn dùng thoải mái **map** và **filter** ở những bài tiếp theo.

### 🧩 Lambda là gì?

**Lambda function** là một **anonymous function** — hàm ẩn danh, hiểu đơn giản là hàm không có tên. Để tạo ra nó, các bạn dùng đúng từ khóa `lambda`.

Ba đặc điểm cần nhớ:

* Có thể nhận **bao nhiêu tham số cũng được**.
* Nhưng chỉ được có **một biểu thức** duy nhất — tức là một logic, một phép toán.
* Thường dùng cho các thao tác ngắn, hoặc truyền làm tham số cho **higher-order function**.

Cú pháp tổng quát mà giảng viên đưa ra:

`lambda arguments: expression`

Trong đó `arguments` là các tham số đầu vào, còn `expression` là việc các bạn muốn làm với chúng.

---

### ✍️ Chuyển một hàm đơn giản thành lambda

Mình bắt đầu bằng một hàm bình thường để các bạn thấy sự khác biệt. Giả sử có hàm `addition(a, b)` trả về `a + b`. Gọi `addition(2, 3)` thì kết quả là **5** — đúng là phép cộng cơ bản.

Nhưng để làm đúng một phép toán đó, các bạn phải viết cả một hàm hoàn chỉnh: từ khóa `def`, tên hàm, hai tham số, rồi câu `return`. Trong khi biểu thức chỉ có một, vậy tại sao phải viết dài dòng như thế?

Lambda cho phép rút gọn. Các bạn gán một biến bằng cú pháp `lambda a, b: a + b`. Lúc này biến đó chính là một lambda function. Nếu kiểm tra bằng `type(addition)`, Python sẽ báo đây là một `function` — một hàm ẩn danh không có tên riêng, chỉ được gắn vào biến.

Cách gọi cũng y hệt hàm thường: truyền `5, 6` vào biến đó và nhận về **11**. Toàn bộ phép tính diễn ra nhờ biểu thức lambda, không cần `def`.

---

### 🔍 Lambda cho điều kiện chẵn lẻ

Ví dụ tiếp theo là một hàm kiểm tra số chẵn. Hàm `even(num)` dùng điều kiện `num % 2 == 0`; nếu đúng thì trả về `True`. Gọi `even(24)` sẽ được `True` vì 24 là số chẵn.

Chuyển sang lambda, các bạn viết `even_one = lambda num: num % 2 == 0`. Gọi `even_one(12)` cũng trả về `True`. Các bạn để ý: biểu thức `num % 2 == 0` vừa là điều kiện, vừa là giá trị trả về — đúng kiểu "một biểu thức" của lambda.

Một điểm nhỏ nhưng đáng nhớ: tên tham số không bắt buộc phải là `num` hay một con số. Các bạn có thể đặt `a`, `b`, `c` hay bất cứ tên nào mình muốn, miền giá trị truyền vào cũng linh hoạt.

---

### 🔢 Lambda với nhiều tham số

Lambda không giới hạn ở hai tham số. Giảng viên lấy hàm `addition` với ba tham số `x, y, z`, trả về `x + y + z`. Gọi với `12, 13, 14` thì tổng là **39**.

Bản lambda tương ứng: `addition_one = lambda x, y, z: x + y + z`. Gọi `addition_one(12, 13, 14)` cũng cho **39**. Như vậy, với một biểu thức duy nhất, các bạn tiết kiệm được thời gian tạo cả một hàm đầy đủ mà vẫn làm đúng phép toán.

Điều kiện để chuyển hàm sang lambda rất rõ ràng: hàm chỉ có **một biểu thức**. Nếu logic phức tạp hơn, các bạn vẫn nên giữ hàm thường.

---

### 🚀 Sức mạnh của lambda khi đi với map

Phần thú vị nhất là khi lambda gặp **map**. Giả sử mình có list `[1, 2, 3, 4, 5, 6]` và muốn tính bình phương từng số. Cách thủ công là viết một hàm `square(number)` trả về `number ** 2`, rồi lặp qua list, tính và trả về kết quả.

Nhưng có cách gọn hơn: dùng `map` với lambda. `map` nhận tham số đầu tiên là một hàm, tham số thứ hai là **iterable**. Ở đây mình truyền `lambda x: x ** 2` và list các số.

Kết quả trả về là một **map object** nằm ở một địa chỉ bộ nhớ. Map dùng kỹ thuật **lazy loading**, nghĩa là nó chưa khởi tạo hoàn toàn. Để "ép" nó tính toán và xem kết quả, các bạn bọc ngoài bằng `list(...)`. Khi đó các bạn nhận được bình phương của từng số: **1, 4, 9, 16, 25, 36**.

Đó chỉ là một lát cắt nhỏ. Lambda còn nhiều tính năng hay ho hơn khi kết hợp với **map** và **filter** — hai hàm mà mình sẽ đào sâu ngay trong các bài tới. Hẹn gặp các bạn ở bài tiếp theo!
