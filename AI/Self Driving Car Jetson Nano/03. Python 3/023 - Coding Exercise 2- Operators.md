---
title: 'Coding exercise 2: viết lại ba nhóm toán tử trong operators1.py'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 023
status: edited
source: '023 - Coding Exercise 2- Operators.md'
categories:
- AI
tags: []
---

# ⌨️ Coding exercise 2: viết lại ba nhóm toán tử trong operators1.py

> Nguồn: `023 - Coding Exercise 2- Operators.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/6028432)

Chào các bạn, bài coding exercise này mình gõ lại toàn bộ ví dụ về ba nhóm toán tử để quen tay: **arithmetic**, **assignment** và **comparison**. Các bạn làm theo từng bước, sau đó tự đổi số liệu để xem kết quả thay đổi ra sao.

### 🗂️ Mở workspace

1. Khởi động **VS Code**.
2. **File → Open Folder**, chọn thư mục **Python Basics**, bấm **Open**.
3. Trong project, tạo file mới `operators1.py`.

### 🔢 Nhóm số học

Khai báo hai biến và tính:

```python
x = 5
y = 3

addition = x + y
subtraction = x - y
division = x / y
```

Kết quả lần lượt là `8`, `2` và thương của `5 / 3`. Bên cạnh biến, mình cũng có thể tính với hằng số:

```python
p = 2
t = p % 1   # 0
```

`p % 1` cho phần dư `0`, nên `t` bằng `0`.

### 📥 Nhóm gán

```python
a = 2
b = 3

a += 2   # a = 4
b *= 3   # b = 9
```

`a += 2` cộng thêm `2` vào `a`; `b *= 3` nhân `b` với `3`. Chạy file không báo lỗi.

### ⚖️ Nhóm so sánh

Mình dùng chuỗi để thấy rõ sự khác biệt chữ hoa chữ thường:

```python
name = "Mahmoud"
name2 = "mahmoud"

control1 = (name == name2)
control2 = (10 > 8)
control3 = (2 < -8)
```

Kết quả: `control1` là `False`, `control2` là `True`, `control3` là `False`. Riêng `control1` sai vì `Mahmoud` và `mahmoud` là hai giá trị khác nhau — chỉ nghe giống nhau thôi không đủ.

---

Bài thực hành này trùng nội dung với bài exercise trước, nên các bạn có thể xem đây là lần gõ lại để nhớ. Tiếp theo mình học tiếp các toán tử còn lại.
