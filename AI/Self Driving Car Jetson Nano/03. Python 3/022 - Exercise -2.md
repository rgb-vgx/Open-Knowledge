---
title: 'Bài tập toán tử: tính toán, gán và so sánh trong file operators1.py'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 022
status: edited
source: '022 - Exercise -2.md'
categories:
- AI
tags: []
---

# 🧮 Bài tập toán tử: tính toán, gán và so sánh trong file operators1.py

> Nguồn: `022 - Exercise -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39524896)

Chào các bạn, bài này mình thực hành cả ba nhóm toán tử vừa học: số học, gán và so sánh. Mình mở lại project **Python Basics** và tạo file mới tên `operators1.py`.

### 📂 Mở project và tạo file

1. Mở **VS Code**.
2. Vào **File → Open Folder**, chọn thư mục **Python Basics**.
3. Bấm **Open**.
4. Tạo file mới tên `operators1.py` và Enter.

### ➕ Thực hành toán tử số học

Mình khai báo `x = 5`, `y = 3` rồi làm các phép tính:

```python
x = 5
y = 3

addition = x + y        # 8
subtraction = x - y     # 2
division = x / y
```

Ngoài biến, có thể tính trực tiếp với hằng số. Ví dụ `p = 2`, rồi:

```python
t = p % 1   # 0
```

Vì `2 % 1` bằng `0`, nên biến `t` nhận giá trị `0`.

### 📥 Thực hành toán tử gán

Tạo hai biến `a = 2`, `b = 3`. Muốn cộng thêm vào chính biến `a`, dùng toán tử **add and assign**:

```python
a += 2   # a = 4
b *= 3   # b = 9
```

Sau `a += 2`, biến `a` thành `4`. Sau `b *= 3`, biến `b` thành `9`. Chạy code không có lỗi — các phép toán này khá đơn giản.

### ⚖️ Thực hành toán tử so sánh

Mình thử với dữ liệu chuỗi. Gán `name = "Mahmoud"` và `name2 = "mahmoud"` (chữ đầu viết thường).

```python
name = "Mahmoud"
name2 = "mahmoud"

control1 = (name == name2)   # False
control2 = (10 > 8)          # True
control3 = (2 < -8)          # False
```

* `control1` là `False` vì hai chuỗi khác nhau — nghe giống nhau không có nghĩa là giống nhau.
* `control2` là `True` vì `10` lớn hơn `8`.
* `control3` là `False` vì `2` lớn hơn `-8`.

---

Ba nhóm toán tử đã chạy được trong cùng một file. Bài sau mình tiếp tục với phần toán tử nâng cao hơn.
