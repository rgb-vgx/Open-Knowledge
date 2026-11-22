---
title: 'Bài tập if/else: kiểm tra biến điều kiện và so sánh hai số'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 031
status: edited
source: '031 - Exercise -6.md'
categories:
- AI
tags: []
---

# 🔀 Bài tập if/else: kiểm tra biến điều kiện và so sánh hai số

> Nguồn: `031 - Exercise -6.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39576060)

Chào các bạn, bài này mình làm ví dụ về **cấu trúc điều kiện**. Mình kết nối board, mở VS Code, chọn thư mục **Python_basics** và tạo file `condition_example.py`.

### 🧱 Dùng biến boolean làm điều kiện

```python
control1 = True

if control1:
    print("I am in the condition")
```

Vì `control1` là `True`, chương trình in ra `I am in the condition`.

Giờ đổi giá trị thành `False`:

```python
control1 = False
```

Chạy lại, dòng bên trong `if` không được in — điều kiện sai nên khối lệnh bị bỏ qua.

### 🔁 Thêm nhánh else

Khi điều kiện `if` sai, ta có thể xử lý bằng `else`:

```python
control1 = False

if control1:
    print("I am in the condition")
else:
    print("I am in the else condition")
```

Kết quả: `I am in the else condition`, vì `control1` bằng `False` nên chương trình nhảy vào khối `else`.

### ⚖️ So sánh hai số

Mình tạo `x = 5`, `y = 7` rồi kiểm tra số nào lớn hơn:

```python
x = 5
y = 7

if x > y:
    print("x is greater than y")
else:
    print("y is greater than x")
```

Kết quả là `y is greater than x`, đúng với `7 > 5`. Khi đổi `x` thành `10` và chạy lại, kết quả đổi thành `x is greater than y`.

### 💡 Điều cần nhớ

* Sau `if`/`else` phải có dấu hai chấm.
* Khối lệnh bên trong phải thụt lề; VS Code tự thêm 4 dấu cách khi các bạn Enter sau dấu hai chấm.
* `else` không có điều kiện riêng.

---

Mình đã thấy rõ luồng chạy khi điều kiện đúng và sai. Bài sau là bản coding exercise của cùng nội dung.
