---
title: 'Bài 007 — Biến trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 7
status: edited
source: '007 - Variables In Python.md'
categories:
- AI
tags: []

---

# 📦 Biến trong Python

> Nguồn: `007 - Variables In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084901)

Chào các bạn! Bài trước mình đã nói về cú pháp và ngữ nghĩa, bài này ta đi vào thứ dùng hằng ngày: **biến**. Mình sẽ đi từ cách khai báo, quy tắc đặt tên, kiểu dữ liệu, chuyển đổi kiểu, cho tới `input()` và một chiếc máy tính mini — tất cả đều chạy trực tiếp trong notebook.

### 📦 Biến là gì và khai báo thế nào?

**Biến** là phần tử nền tảng trong lập trình, dùng để lưu dữ liệu mà chương trình có thể tham chiếu và thao tác sau đó.

Điểm hay của Python: biến được tạo ra **khi bạn gán giá trị cho nó**, không cần khai báo tường minh hay xin cấp phát bộ nhớ trước. Việc khai báo diễn ra tự động ngay tại lúc gán.

Một mẹo nhỏ giảng viên nhắc: mỗi khi mở notebook mới, nhớ **chọn kernel** trước khi chạy code.

Ví dụ khai báo:

* `a = 100` — tạo biến `a`, gán giá trị `100`.
* `age = 32` — số nguyên.
* `height = 6.1` — số thực.
* `name = "Chris"` — chuỗi.
* `is_student = True` — boolean.

Đó là toàn bộ cú pháp: tên biến, dấu `=`, rồi giá trị. Các kiểu dữ liệu chi tiết sẽ có ở bài sau; ở đây mình chỉ cần thấy cách gán.

---

### 🖨️ In biến ra console

Sau khi gán, các bạn in giá trị bằng `print()`. Giảng viên minh họa nhiều cách trình bày:

* `print("age:", age)` → hiện `age: 32`
* `print("height:", height)` → hiện `height: 6.1`
* `print("name:", name)` → hiện `name: Chris`

Điểm cần nhớ: khi in, ta có thể gọi thẳng tên biến đã định nghĩa, và thêm nhãn phía trước để kết quả dễ đọc. Đây cũng là cách nhanh nhất để kiểm tra một biến đang giữ gì.

---

### 🏷️ Quy tắc đặt tên biến

Đây là phần giảng viên nhấn mạnh là quan trọng nhất. Tên biến cần:

1. **Mô tả đúng** nội dung nó lưu.
2. **Bắt đầu bằng chữ cái hoặc dấu gạch dưới** `_`.
3. **Ở giữa** được chứa chữ cái, chữ số và dấu gạch dưới.
4. **Phân biệt hoa thường** — `name` và `Name` là hai biến khác nhau.

Vài tên hợp lệ:

* `first_name = "Chris"`
* `last_name = "Nayak"`

Chúng bắt đầu bằng chữ cái, chứa chữ và dấu gạch dưới — hoàn toàn ổn. Số thì được nằm ở giữa, nhưng **không được đứng đầu**.

Còn đây là các tên không hợp lệ và lỗi tương ứng:

* `25age = 30` → báo *invalid decimal literal*, vì bắt đầu bằng chữ số.
* `first-name = "Krish"` → báo *cannot assign to expression here. Maybe you meant `==` instead of `=`?* — dấu gạch nối không được dùng trong tên biến.
* `@name = "Krish"` → báo *invalid syntax*.

Về case sensitivity, nếu `name = "Krish"` và `Name = "Nayak"` thì đây là hai identifier khác nhau; so sánh `name == Name` cho `False`.

---

### 🔎 Kiểu dữ liệu và kiểm tra kiểu

Python là ngôn ngữ **dynamically typed**: kiểu của biến được xác định **tại runtime**. Một số kiểu quan trọng:

| Kiểu | Ví dụ | Ý nghĩa |
|---|---|---|
| `int` | `age = 25` | số nguyên |
| `float` | `height = 6.1` | số thực |
| `str` | `name = "Chris"` | chuỗi |
| `bool` | `is_student = True` | đúng/sai |

Muốn biết một biến thuộc kiểu gì, dùng `type()`:

* `type(age)` → `int`
* `type(height)` → `float`
* `type(name)` → `str`

Kết quả trả về dạng lớp, ví dụ `<class 'int'>`. Giảng viên lưu ý các biến này sẽ còn được dùng lại ở nhiều bài sau, nên các bạn cứ gõ theo và chạy thử.

---

### 🔄 Chuyển đổi kiểu dữ liệu

**Type conversion** là đổi giá trị từ kiểu này sang kiểu khác. Python làm được khá nhiều phép đổi.

Từ số sang chuỗi:

* `age = 25`, `type(age)` là `int`.
* `age_str = str(age)` — dùng hàm `str()`.
* In `age_str` vẫn thấy `25`, nhưng `type(age_str)` giờ là `str`.

Từ chuỗi số sang số:

* Nếu `age = "25"`, có thể dùng `int(age)` để đổi thành số nguyên, và `type()` xác nhận `int`.

Nhưng không phải chuỗi nào cũng đổi được:

* `int("Krish")` báo lỗi *invalid literal for int() with base 10: 'Krish'*, vì `"Krish"` không phải một giá trị số. Chuỗi `"25"` thì đổi được vì bản chất nó là số.

Với số thực:

* `height = 5.11`, `type(height)` là `float`.
* `int(height)` → `5`, tức là **bỏ phần thập phân**.
* Đổi ngược `float(5)` → `5.0`.

---

### 🎛️ Dynamic typing, input() và máy tính mini

**Dynamic typing** cho phép kiểu của biến thay đổi ngay khi chương trình chạy:

1. `var = 10` → in ra `10`, `type(var)` là `int`.
2. `var = "Hello"` → cùng biến đó, giờ là `str`.
3. `var = 3.14` → lại thành `float`.

Về nhập dữ liệu, hàm `input()` mở một ô cho người dùng gõ:

* `age = input("What is the age?")`
* Gõ `23` rồi Enter, in `age` ra `23`.
* Nhưng `type(age)` là `str` — **input luôn trả về chuỗi**.

Muốn dùng như số, các bạn ép kiểu lại, ví dụ bọc `int(input(...))`; khi đó `type()` mới là `int`.

Cuối cùng, giảng viên ghép mọi thứ thành một **simple calculator**:

* Nhập hai số bằng `input()` và ép về kiểu số.
* Tính `num1 + num2` (tổng), `num1 - num2` (hiệu), `num1 * num2` (tích), `num1 / num2` (thương).
* In cả bốn kết quả ra console.

Chạy thử với hai số như `56` và `43`, các bạn sẽ thấy đủ tổng, hiệu, tích, thương. Các phép toán này sẽ được nói kỹ hơn ở bài operators.

Vậy là mình đã nắm được biến từ khai báo tới chuyển kiểu và nhập liệu. Bài tiếp theo chúng ta sẽ đào sâu **data types**, rồi tới **operators** — hẹn gặp các bạn!
