---
title: 'Coding exercise 3: dựng lại if/else trong condition_example.py'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 032
status: edited
source: '032 - Coding Exercise 3- Conditional Statements and Type Conversion.md'
categories:
- AI
tags: []
---

# ⌨️ Coding exercise 3: dựng lại if/else trong condition_example.py

> Nguồn: `032 - Coding Exercise 3- Conditional Statements and Type Conversion.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/6032152)

Chào các bạn, đây là bài coding exercise cho phần **cấu trúc điều kiện**. Nội dung trùng với bài exercise trước, nên mình dùng đây như một lần gõ lại từ đầu. Mình mở VS Code, chọn thư mục **Python_basics**, tạo file `condition_example.py`.

### 🧱 Bước 1: điều kiện với biến boolean

```python
control1 = True

if control1:
    print("I am in the condition")
```

Chạy được kết quả `I am in the condition`. Sau khi đổi `control1 = False` và chạy lại, dòng trong `if` không còn xuất hiện vì điều kiện sai.

### 🔁 Bước 2: bổ sung else

```python
control1 = False

if control1:
    print("I am in the condition")
else:
    print("I am in the else condition")
```

Kết quả `I am in the else condition`. Lý do: `control1` là `False`, chương trình chuyển sang khối thụt lề của `else`.

Lưu ý khi gõ: ở cuối dòng `if`/`else` phải có dấu hai chấm; Enter sau dấu hai chấm, VS Code tự thụt lề 4 dấu cách.

### ⚖️ Bước 3: so sánh hai giá trị

```python
x = 5
y = 7

if x > y:
    print("x is greater than y")
else:
    print("y is greater than x")
```

Với `5` và `7`, kết quả là `y is greater than x`. Đổi `x` thành `10` rồi chạy lại, kết quả thành `x is greater than y`.

### ✅ Kiểm tra

Chạy file sau mỗi lần đổi giá trị để thấy nhánh thực thi thay đổi. Đây là cách nhanh nhất để hiểu `if`/`else` hoạt động ra sao.

---

Vậy là điều kiện đã chạy đúng trong cả hai trường hợp. Tiếp theo mình học vòng lặp.
