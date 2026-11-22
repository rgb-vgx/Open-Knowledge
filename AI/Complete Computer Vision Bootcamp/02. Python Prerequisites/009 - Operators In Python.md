---
title: 'Bài 009 — Toán tử trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 9
status: edited
source: '009 - Operators In Python.md'
categories:
- AI
tags: []

---

# 🧮 Toán tử trong Python

> Nguồn: `009 - Operators In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084909)

Chào các bạn! Bài trước mình đã điểm qua các kiểu dữ liệu, giờ là lúc dùng chúng để tính toán. Bài này mình đi qua ba nhóm **toán tử** của Python: **số học**, **so sánh** và **logic** — kèm demo trực tiếp trên notebook. Mục tiêu là các bạn thấy được từng toán tử hoạt động ra sao, chứ không chỉ đọc định nghĩa.

### ➕ Nhóm toán tử số học

Mở một code cell mới; giảng viên chỉ một mẹo nhanh: nhấn `Escape` rồi `A` để tự động thêm cell phía trên.

Mình tạo hai biến `a` và `b`, rồi thử lần lượt các phép toán:

* Cộng: `result = a + b`.
* Trừ: `subtract_result = a - b`.
* Nhân: `multiplication_result = a * b`.
* Chia: `division_result = a / b`.
* Chia lấy phần nguyên: `floor_div_result = a // b`.
* Chia lấy dư: `modulus_result = a % b`.
* Lũy thừa: `exponential_result = a ** b` — giảng viên gọi là "a mũ b".

Sau khi in cả loạt kết quả cạnh nhau, buổi demo cho ra: phép cộng là **15**, phép trừ là **5**, phép nhân là **50**, phép chia là **2.0**, chia lấy phần nguyên là **2**, và modulus là **0**.

---

### ➗ Phân biệt `/`, `//` và `%`

Ba phép chia này rất dễ lẫn, nên mình tách riêng ra.

**Chia thường `/`** trả về số thực. Ví dụ `21 / 5` cho `4.2`.

**Chia lấy phần nguyên `//`** (floor division) với số dương thì bỏ phần thập phân và chỉ giữ phần nguyên. Cùng ví dụ `21 // 5` cho `4`. Giảng viên giải thích: với floor division, phần thập phân bị bỏ đi, chỉ lấy giá trị nguyên. Chính xác hơn về mặt tài liệu: `//` **làm tròn xuống** (floor), nên với số âm kết quả khác phép cắt phần lẻ — ví dụ `-21 // 5` cho `-5`.

**Modulus `%`** trả về **số dư**. Trong buổi demo, `10` chia `5` không dư nên modulus cho `0` — đúng như kết quả đã thấy ở trên.

Còn **lũy thừa `**`** thì nhân cơ số với chính nó theo số mũ; giảng viên nhắc ví dụ `10` mũ `5` để minh họa.

---

### ⚖️ Nhóm toán tử so sánh

So sánh trong Python gồm: `==` (bằng), `!=` (khác), `>` (lớn hơn), `<` (nhỏ hơn), `>=` (lớn hơn hoặc bằng), `<=` (nhỏ hơn hoặc bằng). Điều quan trọng: **mọi phép so sánh đều trả về `True` hoặc `False`**.

Vài ví dụ từ bài giảng:

* `a = 10`, `b = 10`, rồi `a == b` cho `True` vì giá trị hai bên bằng nhau.
* So sánh chuỗi cũng dùng `==`: `"Krish" == "Krish"` cho `True`.
* Đổi thành chữ `k` thường, kết quả thành `False` — phép so sánh **phân biệt hoa thường**.
* `!=` làm ngược lại: hai chuỗi giống nhau cho `False`, khác nhau cho `True`.
* Với `num1 = 45`, `num2 = 55`: `num1 > num2` cho `False`, còn `num1 < num2` cho `True`.
* Khi cả hai cùng bằng `45`, `num1 >= num2` và `num1 <= num2` đều cho `True` vì có một vế của điều kiện được thỏa.
* Nếu `num1 = 44` và `num2 = 45`, `num1 <= num2` vẫn `True` vì `44` nhỏ hơn `45`.

---

### 🔗 Nhóm toán tử logic: `and`, `or`, `not`

Có ba toán tử logic, và giảng viên liên hệ với **cổng logic** đã học ở trường.

**`and`** chỉ trả `True` khi **cả hai** vế đều đúng. Với `x = True`, `y = True`, biểu thức `x and y` cho `True`. Đổi `y = False`, kết quả thành `False` dù `x` vẫn đúng.

**`or`** thì dễ tính hơn: chỉ cần **một trong hai** vế đúng là `True`. Nó chỉ trả `False` khi cả hai vế đều `False`.

**`not`** là phép đảo: `not True` thành `False`, `not False` thành `True`. Giảng viên mô tả nó như lấy giá trị nghịch đảo của một biến boolean.

Ba toán tử này sẽ cực kỳ hữu ích khi ghép điều kiện — và đó chính là nội dung bài sau.

---

### 🧪 Ứng dụng: chiếc máy tính nhỏ

Cuối bài, giảng viên demo một chương trình máy tính đơn giản: dùng `float(input(...))` để nhập hai số, chọn phép toán (`+`, `-`, `*`, `/`, `%`, `**`), rồi in kết quả. Buổi chạy thử nhập `12` và cho ra output tương ứng.

Các bạn thử tự viết lại phiên bản của mình trước khi xem code mẫu. Đây là bài tập nối tiếp rất tự nhiên: vừa luyện toán tử, vừa làm quen nhập xuất.

Hẹn gặp ở bài tiếp theo — **câu lệnh điều kiện `if`, `elif`, `else`** — nơi chúng ta bắt đầu cho chương trình biết "nếu thế này thì làm thế kia".

> ⚠️ Cần kiểm chứng: transcript gốc đọc `b = 15` nhưng chuỗi kết quả in ra (15, 5, 50, 2.0, 2, 0) lại khớp với `a = 10`, `b = 5`. Bài giữ nguyên kết quả như lời giảng; các bạn tự chạy lại để đối chiếu.
