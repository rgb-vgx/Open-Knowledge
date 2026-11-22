---
title: 'Tự viết module my_module.py và dùng lại trong main.py'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 043
status: edited
source: '043 - Exercise -10.md'
categories:
- AI
tags: []
---

# 🧱 Tự viết module my_module.py và dùng lại trong main.py

> Nguồn: `043 - Exercise -10.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39604892)

Chào các bạn, bài này mình tự tạo **custom module**. Mục tiêu là viết một file Python chứa vài hàm, rồi import nó sang file khác để dùng.

### 📝 Tạo file my_module.py

Tạo file mới tên `my_module.py`, bên trong định nghĩa hai hàm.

Hàm chào nhận **name** và **surname**:

```python
def greetings(name, surname):
    print("Hello", name, surname)
```

Hàm lũy thừa nhận **base** và **exp_value**, trả về kết quả:

```python
def exp(base, exp_value):
    return base ** exp_value
```

Sau khi viết xong, lưu file bằng **Ctrl + S**. Chạy file để kiểm tra — không có lỗi nào là ổn.

---

### 🔗 Dùng module trong file khác

Tạo file mới `main.py`, import module và đặt bí danh:

```python
import my_module as m

m.greetings("Yilmaz", "Alija")
```

Kết quả: `Hello Yilmaz Alija`.

Vì hàm `exp` chỉ `return` chứ không in, muốn thấy kết quả phải bọc trong `print()`:

```python
print(m.exp(2, 3))
```

Kết quả: `8`, tức `2` mũ `3`.

---

### 💡 Điều rút ra

* Module tự viết cũng chỉ là một file `.py`.
* Import bằng tên file **không kèm** `.py`.
* Có thể gọi hàm qua bí danh (`m.`) sau khi import.
* Hàm dùng `return` thì nơi gọi phải tự in nếu muốn thấy giá trị.

---

Vậy là mình đã đóng gói code thành module và tái sử dụng được. Đây cũng là cách các thư viện như OpenCV được tổ chức — chuẩn bị cho phần lane tracking phía sau.
