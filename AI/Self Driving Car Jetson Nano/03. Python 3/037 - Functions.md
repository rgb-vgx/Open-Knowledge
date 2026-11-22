---
title: 'Hàm trong Python: định nghĩa, tham số, đối số và return'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 037
status: edited
source: '037 - Functions.md'
categories:
- AI
tags: []
---

# 🏭 Hàm trong Python: định nghĩa, tham số, đối số và return

> Nguồn: `037 - Functions.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39587348)

Chào các bạn, bài này mình học **hàm** (function). Hàm là một khối code có tổ chức, tái sử dụng được, dùng để thực hiện một nhiệm vụ cụ thể. Nhờ hàm, bài toán lớn được chia thành những phần nhỏ dễ quản lý, code cũng dễ đọc và dễ bảo trì hơn.

### 🏗️ Hình dung hàm như một nhà máy

Mình có nguyên liệu thô — đó là **input**. Thứ xử lý nguyên liệu là nhà máy — đó là **hàm**. Sau khi xử lý, ta có sản phẩm — đó là **output**. Quá trình biến nguyên liệu thành sản phẩm chính là gọi hàm.

---

### 📝 Định nghĩa hàm bằng def

Hàm được định nghĩa bằng từ khóa `def`, sau đó là tên hàm, cặp ngoặc tròn chứa các tham số tùy chọn, rồi dấu hai chấm. Khối code của hàm thụt lề bên dưới.

```python
def greetings():
    print("Hello")
```

Hàm này không có tham số. Khi **gọi** `greetings()`, chương trình in ra `Hello`.

---

### 🎯 Tham số và đối số

* **Parameter** (tham số) là chỗ giữ chỗ cho giá trị mà hàm mong nhận khi được gọi.
* **Argument** (đối số) là giá trị thực tế truyền vào khi gọi hàm.

```python
def greet(name):
    print("Hello " + name)

greet("Alice")
```

Ở đây `name` là tham số, còn `"Alice"` là đối số. Kết quả in ra `Hello Alice`.

---

### ↩️ Trả về giá trị bằng return

Hàm có thể trả về một giá trị bằng `return`, và giá trị đó dùng được ở nơi khác trong chương trình.

```python
def add(a, b):
    return a + b

result = add(3, 5)
```

`add(3, 5)` trả về `8`, và `8` được gán cho biến `result`.

Muốn dùng hàm, các bạn gọi tên hàm và truyền các đối số cần thiết trong ngoặc tròn.

---

Vậy là mình đã nắm cách định nghĩa và gọi hàm. Bài sau mình thực hành với ba ví dụ: chào người dùng, cộng hai số và đếm phần tử.
