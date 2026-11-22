---
title: 'Thực hành print: in biến, in dữ liệu trực tiếp và nối bằng dấu phẩy'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 027
status: edited
source: '027 - Exercise -4.md'
categories:
- AI
tags: []
---

# 🖨️ Thực hành print: in biến, in dữ liệu trực tiếp và nối bằng dấu phẩy

> Nguồn: `027 - Exercise -4.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39552404)

Chào các bạn, bài này mình thực hành riêng hàm **output** — tức `print()`. Mình kết nối Jetson Nano (mật khẩu trong bài là **123456**), mở VS Code và tạo file `output_func.py`.

### 🧱 Khai báo bốn biến khác kiểu

```python
name = "Yilmaz"
number1 = 50
number2 = 10.5
boolean_value = True
```

Lần lượt là **string**, **integer**, **float** và **boolean**.

### 📤 In từng biến

Muốn in một biến qua `print()`, ghi trực tiếp tên biến trong ngoặc:

```python
print(name)
print(number1)
print(number2)
print(boolean_value)
```

Kết quả trên terminal: `Yilmaz`, `50`, `10.5`, `True`.

### 🧾 In dữ liệu trực tiếp

Khi in giá trị trực tiếp thay vì qua biến:

* Văn bản phải đặt trong dấu nháy kép: `print("Hello")` → `Hello`.
* Số nguyên, số thực viết thẳng: `print(20)` → `20`, `print(25.75)` → `25.75`.
* Boolean viết thẳng: `print(True)` → `True`.

### ➕ In nhiều giá trị trong một lần gọi

Đây là chỗ dễ sai. Nếu viết:

```python
x = 10
print("value of x: x")
```

kết quả sẽ là nguyên văn `value of x: x`, không phải giá trị `10`. Nguyên nhân: biến nằm bên trong dấu nháy kép nên bị coi là văn bản.

Cách sửa: đặt dấu phẩy để ngăn cách phần chuỗi và phần biến, đưa biến ra ngoài ngoặc kép:

```python
print("value of x:", x)
```

Kết quả đúng là `value of x: 10`. Có thể nối nhiều dữ liệu trong cùng một lệnh `print()` miễn là ngăn cách bằng dấu phẩy.

---

Vậy là mình đã nắm cách dùng `print()`. Bài sau mình chuyển sang hàm `input()`.
