---
title: 'Bài 017 — Bắt đầu với Functions trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 17
status: edited
source: '017 - Getting Started With Functions.md'
categories:
- AI
tags: []

---

# ⚙️ Bắt đầu với Functions trong Python

> Nguồn: `017 - Getting Started With Functions.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084963)

Chào các bạn! **Function** là một trong những khối quan trọng nhất khi học Python — dự án data science hay Python nào rồi cũng sẽ đầy function. Hôm nay mình đi từ con số không: function là gì, vì sao cần, cú pháp định nghĩa và gọi, tham số, tham số mặc định, `*args`/`**kwargs`, cho tới câu lệnh `return`.

### 🧩 Function là gì và vì sao cần?

**Function** là một khối code thực hiện một nhiệm vụ cụ thể. Nó giúp **tổ chức code**, **tái sử dụng** và **tăng khả năng đọc**.

Ví dụ: code kiểm tra số chẵn/lẻ bằng `if num % 2 == 0` rồi in ra "số chẵn" hay "số lẻ". Nếu dùng ở nhiều nơi mà cứ copy-paste thì rất mệt và dễ lệch. Cách hay hơn: gói đoạn logic đó vào một function rồi gọi lại mỗi khi cần.

---

### ✍️ Định nghĩa và gọi hàm

Một function gồm:

1. Từ khóa `def`.
2. Tên hàm.
3. Danh sách tham số trong ngoặc tròn (nếu có).
4. **Docstring** mô tả function — không bắt buộc, nhưng nên có để người khác đọc hiểu.
5. Thân hàm — phần code xử lý, phải **thụt lề** đúng.
6. `return` giá trị nếu cần (không phải hàm nào cũng có).

Ví dụ hàm `even_or_odd(number)`: bên trong kiểm tra `number % 2 == 0` rồi in "số chẵn", ngược lại in "số lẻ". Gọi bằng `even_or_odd(24)` là tự động chạy và in kết quả.

Nhớ kỹ: nếu **sai thụt lề**, Python báo lỗi kiểu *"expected an indented block"*. Indentation là thứ phải chuẩn trong Python.

---

### 🔢 Tham số và nhiều tham số

Function nhận **tham số (parameter)** để xử lý. Có thể có bao nhiêu tham số tùy ý, kiểu gì cũng được.

Ví dụ hàm `add(a, b)` chỉ đơn giản `return a + b`. Gọi `result = add(2, 4)` thì `result` nhận `6`. Thay vì tạo biến trung gian `c = a + b` rồi `return c`, viết thẳng `return a + b` gọn hơn.

Đây là nền móng: sau này các bạn sẽ gặp những function phức tạp hơn nhiều, nhưng đều xoay quanh tham số và giá trị trả về.

---

### 🎯 Tham số mặc định (default parameters)

Function có thể gán **giá trị mặc định** cho tham số. Ví dụ hàm `greet(name="guest")` in ra "Hello guest, welcome to the Paradise".

* Gọi `greet("Krish")` → in "Hello Krish...".
* Gọi `greet()` mà không truyền gì → dùng giá trị mặc định `"guest"`.

Nếu tham số **không có** giá trị mặc định mà các bạn gọi hàm thiếu đối số, Python báo lỗi *"missing 1 required positional argument"*. Đây là lý do default parameter rất hữu ích khi muốn function "chạy được kể cả khi thiếu đầu vào".

---

### 📦 Variable length arguments: *args và **kwargs

Khi số lượng tham số không cố định, ta dùng hai dạng đặc biệt:

* **`*args`** — nhận các **positional arguments** (đối số vị trí), không có tên khóa. Có thể đặt tên khác, nhưng quy ước chung là `args`. Ví dụ hàm `print_numbers(*args)` rồi `for num in args: print(num)`; gọi `print_numbers(1, 2, 3, 4, 5, 6)` thì `args` gom hết các số đó.
* **`**kwargs`** — nhận các **keyword arguments** (đối số theo khóa), dạng **key-value**. Quy ước chung là `kwargs`. Truy cập bằng `kwargs.items()` giống dictionary. Gọi `print_detail(name="Krish", age=32, country="India")` thì mỗi cặp khóa-giá trị được đưa vào `kwargs`.

Khi kết hợp cả hai, có một quy tắc bắt buộc: **positional arguments phải đứng trước keyword arguments**. Nếu đặt positional sau keyword, Python báo lỗi *"positional argument cannot appear after keyword argument"*.

---

### 🔁 Câu lệnh return và trả nhiều giá trị

`return` đưa giá trị ra khỏi function sau khi thân hàm chạy xong. Ví dụ `multiply(a, b)` với `return a * b`; gọi `multiply(2, 3)` nhận về `6`.

Điều thú vị: Python cho phép một function **trả về nhiều giá trị** cùng lúc, ví dụ `return a, b, a`. Về bản chất Python gói chúng lại thành một tuple — đúng kiểu packing mà các bạn vừa học ở bài tuple.

Function giúp code **có tổ chức, tái sử dụng được và dễ đọc**. Các bạn đã nắm: định nghĩa và gọi hàm, tham số thường, tham số mặc định, `*args`/`**kwargs`, thứ tự positional trước keyword, và `return` (kể cả trả nhiều giá trị).

Bài sau mình sẽ cùng làm một loạt ví dụ thực tế để những khái niệm này "vào tay" — từ chuyển đổi nhiệt độ, kiểm tra mật khẩu, tính tiền giỏ hàng, cho tới đệ quy. Hẹn gặp các bạn!
