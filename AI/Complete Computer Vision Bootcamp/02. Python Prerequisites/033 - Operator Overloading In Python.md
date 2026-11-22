---
title: 'Bài 033 — Nạp chồng toán tử (operator overloading) trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 33
status: edited
source: '033 - Operator Overloading In Python.md'
categories:
- AI
tags: []
---

# ➕ Operator overloading — dạy `+`, `-`, `*` hiểu object của bạn

> Nguồn: `033 - Operator Overloading In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086833)

`1 + 1` là phép cộng, `==` là so sánh bằng, `>` là so sánh lớn. Nhưng nếu object của bạn là một **vector** thì "cộng hai vector" nghĩa là gì? **Operator overloading** cho phép định nghĩa lại ý nghĩa các toán tử cho class của mình — thông qua chính các magic method đã học ở bài trước.

### 🧰 Các dunder tương ứng với toán tử

| Toán tử | Magic method | Ý nghĩa |
|---|---|---|
| `+` | `__add__` | cộng hai object |
| `-` | `__sub__` | trừ hai object |
| `*` | `__mul__` | nhân |
| `/` | `__truediv__` | chia thực |
| `==` | `__eq__` | so sánh bằng |
| `<` | `__lt__` | nhỏ hơn |
| `>` | `__gt__` | lớn hơn |

Mỗi method nhận `self` và `other` (object bên phải toán tử), rồi trả về kết quả theo cách bạn muốn.

---

### 🧮 Class `Vector` với `__init__`

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
```

Mỗi vector có hai toạ độ `x`, `y`. Python mặc định không biết "cộng hai vector" là gì — ta phải tự định nghĩa.

---

### ➕ `__add__` — cộng hai vector theo từng toạ độ

```python
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
```

`other` chính là vector bên phải. Kết quả là vector mới với `x` cộng `x`, `y` cộng `y`.

---

### ➖ `__sub__` và ✖️ `__mul__`

Trừ tương tự cộng:

```python
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
```

Nhân với một số vô hướng:

```python
    def __mul__(self, other):
        return Vector(self.x * other, self.y * other)
```

Ở đây `other` là một **số** (scalar), nên nhân thẳng vào từng toạ độ.

---

### ⚖️ `__eq__` — so sánh hai object

Mặc định `==` giữa hai object chỉ so sánh danh tính. Muốn so sánh theo giá trị:

```python
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
```

Kết quả là `True`/`False` dựa trên việc cả hai toạ độ có bằng nhau không.

---

### 🖨️ `__repr__` để in cho dễ đọc

```python
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
```

---

### 🧪 Chạy thử toàn bộ

```python
v1 = Vector(2, 3)
v2 = Vector(4, 5)

print(v1 + v2)     # Vector(6, 8)
print(v1 - v2)     # Vector(-2, -2)
print(v1 * 3)      # Vector(6, 9)
print(v1 == v2)    # False
```

* `v1 + v2` → (2+4, 3+5) = **(6, 8)**.
* `v1 - v2` → (2-4, 3-5) = **(-2, -2)**.
* `v1 * 3` → (2×3, 3×3) = **(6, 9)**.

Đây chính là ý nghĩa của operator overloading: bạn tự định nghĩa phép toán cho kiểu dữ liệu **không có sẵn** trong Python, theo đúng logic của bài toán.

---

### 🧭 Vì sao nên dùng

* Code đọc tự nhiên như toán học: `v1 + v2` thay vì `v1.add(v2)`.
* Toàn quyền quyết định ngữ nghĩa toán tử theo nhu cầu ứng dụng.
* Kết hợp ăn ý với `__repr__` để debug dễ dàng.

---

### 🏋️ Bài tập giảng viên gợi ý

Tự cài đặt operator overloading cho **số phức** (complex number): mỗi số có phần thực và phần ảo, overload `+`, `-`, `*`, `/` (`__truediv__`)... Giảng viên đã demo sẵn một phiên bản, việc của bạn là mổ xẻ và tự viết lại.

---

Operator overloading là mặt nổi bật nhất của magic methods, và là kỹ năng không thể thiếu khi xây dựng các kiểu dữ liệu riêng. Bài sau mình chuyển sang một chủ đề khác: **custom exception** — tự tạo loại lỗi cho riêng chương trình của mình.
