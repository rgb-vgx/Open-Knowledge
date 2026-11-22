---
title: 'Hàm input và print: nhập xuất chuẩn trong Python'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 026
status: edited
source: '026 - Standart INPUT and OUTPUT Functions.md'
categories:
- AI
tags: []
---

# 📟 Hàm input và print: nhập xuất chuẩn trong Python

> Nguồn: `026 - Standart INPUT and OUTPUT Functions.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39541392)

Chào các bạn, mấy bài trước mình đã thao tác với biến và toán tử, nhưng chưa xem được kết quả và cũng chưa có chỗ cho người dùng nhập dữ liệu. Bài này mình học **hàm nhập xuất chuẩn** để giao tiếp với console/terminal: hiển thị kết quả và nhận dữ liệu người dùng.

### ⌨️ Hàm input

Hàm `input()` cho phép người dùng nhập dữ liệu từ bàn phím trên terminal. Dữ liệu nhập vào có kiểu **string**, nên nếu cần số hay kiểu khác thì phải chuyển đổi kiểu — đó là nội dung bài sau.

Cách dùng: khai báo biến, gọi `input()`, và truyền thông điệp hướng dẫn trong dấu nháy kép.

```python
name = input("Please enter your name: ")
```

Ngoài ra có thể để trống:

```python
x = input()
```

Cả hai cách đều hợp lệ.

---

### 🖨️ Hàm print

Hàm `print()` dùng để thông báo cho người dùng. Vài điểm cần nhớ:

* Thông điệp dạng văn bản phải là string, đặt trong dấu nháy kép:

```python
print("Hello")
```

* Muốn hiển thị một biến, ghi tên biến trực tiếp:

```python
a = 20
print(a)     # 20
```

* Số và giá trị logic có thể viết trực tiếp:

```python
print(True)  # True
```

* Biến boolean cũng in ra bình thường:

```python
b = False
print(b)     # False
```

---

Vậy là mình đã có cách nói chuyện hai chiều với chương trình: `input()` để nhận dữ liệu, `print()` để trả kết quả. Bài sau mình thực hành riêng hàm output.
