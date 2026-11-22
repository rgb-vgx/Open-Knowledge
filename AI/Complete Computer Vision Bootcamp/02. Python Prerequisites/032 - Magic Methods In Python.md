---
title: 'Bài 32 — Magic methods (dunder methods) trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 32
status: edited
source: '032 - Magic Methods In Python.md'
categories:
- AI
tags: []
---

# ✨ Magic methods — cho object hành xử như kiểu dữ liệu built-in

> Nguồn: `032 - Magic Methods In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086831)

Bạn đã gặp `__init__` nhiều lần mà có thể chưa biết nó thuộc một họ đặc biệt: **magic methods**, còn gọi là **dunder methods** (double underscore). Chúng bắt đầu và kết thúc bằng hai dấu gạch dưới, và cho phép bạn định nghĩa cách object phản ứng với các phép toán built-in như cộng, so sánh, in ra màn hình...

### 🔍 Dunder method là gì?

Magic methods là các method đặc biệt mà Python tự gọi trong những tình huống nhất định. Chúng quyết định **hành vi của object** với các thao tác built-in: số học, so sánh, chuyển thành chuỗi, và nhiều hơn nữa.

Một class rỗng đã có sẵn rất nhiều dunder method:

```python
class Person:
    pass

person = Person()
print(dir(person))
```

Kết quả `dir()` liệt kê hàng loạt tên như `__init__`, `__str__`, `__repr__`, `__eq__`... — đó chính là các magic method mặc định của Python.

Hai cái quan trọng nhất trong bài này:

* **`__init__`** — khởi tạo instance mới (constructor).
* **`__str__`** — trả về biểu diễn chuỗi của object.

### 🖨️ `__str__` — thay đổi cách object hiện ra khi `print`

Mặc định, in một object sẽ ra dạng thông báo kèm địa chỉ bộ nhớ:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Krish", 34)
print(person)
# <__main__.Person object at 0x7f...>
```

Muốn thay đổi, override `__str__`:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name}, {self.age} years old"
```

```python
person = Person("Krish", 34)
print(person)   # Krish, 34 years old
```

`print(person)` bây giờ gọi tới `__str__` của bạn thay vì biểu diễn mặc định. Đây là cách "dạy" object tự mô tả mình.

### 🧾 `__repr__` — biểu diễn "chính thức"

`__repr__` trả về **biểu diễn chính thức** (official string representation) của object, thường hướng tới lập trình viên và lý tưởng nhất là chuỗi có thể dùng để tái tạo object.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"Person(name={self.name}, age={self.age})"
```

```python
person = Person("Krish", 34)
print(repr(person))   # Person(name=Krish, age=34)
```

Khác biệt cần nhớ:

| Method | Dùng cho | Gọi khi |
|---|---|---|
| `__str__` | Người dùng cuối, dễ đọc | `print(obj)`, `str(obj)` |
| `__repr__` | Lập trình viên, chính xác | `repr(obj)`, hiển thị trong console/debugger |

### 🛠️ Tinh thần chung

Mọi magic method đều có triển khai mặc định. Muốn object của mình hành xử khác, chỉ cần **định nghĩa lại method đó trong class** — đúng như cách `__str__` và `__repr__` được override ở trên. Ngoài ra còn rất nhiều dunder khác như `__eq__`, `__len__`, `__add__`... tùy nhu cầu.

---

Magic methods là cầu nối giữa class tự viết và cú pháp Python. Bài sau mình đi sâu vào một ứng dụng nổi bật của chúng: **operator overloading** — định nghĩa lại ý nghĩa của các toán tử như `+`, `-` cho object của bạn.
