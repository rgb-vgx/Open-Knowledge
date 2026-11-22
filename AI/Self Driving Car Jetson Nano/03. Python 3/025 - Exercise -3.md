---
title: 'Thực hành toán tử logic với and, or, not trong operators2.py'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 025
status: edited
source: '025 - Exercise -3.md'
categories:
- AI
tags: []
---

# 🧪 Thực hành toán tử logic với and, or, not trong operators2.py

> Nguồn: `025 - Exercise -3.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39531780)

Chào các bạn, giờ mình đưa **toán tử logic** vào môi trường code. Trong Python, ta có thể tạo trực tiếp kiểu **boolean**, và các phép so sánh cũng trả về `True`/`False` — rất tiện để thử logic.

### 🔌 Kết nối và mở file

1. Kết nối tới **NVIDIA Jetson**, nhập mật khẩu (trong bài là **123456**).
2. Mở ô tìm kiếm, gõ **vs code** và mở trình soạn thảo.
3. Tạo file mới tên `operators2.py`, bấm Enter.

---

### 🧱 Khai báo biến boolean

```python
x = True
y = False
z = False
```

---

### 🔗 Kiểm tra and

```python
control1 = (x and y)     # False
control2 = (x and True)  # True
control3 = (y and z)     # False
control4 = (False and True)  # False
```

* `x and y`: `x` là `True`, `y` là `False` → `False`.
* `x and True`: cả hai vế đều `True` → `True`.
* `y and z`: cả hai đều `False` → `False`.
* `False and True` → `False`.

---

### 🔀 Kiểm tra or

```python
control5 = (x or y)      # True
control6 = (True or True)    # True
control7 = (False or z)  # False
control8 = (False or True)   # True
```

* `x or y`: `True` hoặc `False` → `True`.
* `True or True` → `True`.
* `False or z`: cả hai đều `False` → `False`.
* `False or True` → `True`.

---

### 🔄 Kiểm tra not

```python
a = True
control9 = not a     # False

b = False
control10 = not b    # True
```

`not True` thành `False`; `not False` thành `True`.

Chạy cả file và các bạn sẽ thấy không có lỗi nào — kết quả đúng như lý thuyết ở bài trước.

---

Toán tử logic đã chạy được trong code thật. Tiếp theo mình chuyển sang nhập xuất dữ liệu chuẩn.
