---
title: 'Coding exercise 1: luyện biến qua 8 quy tắc trong VS Code'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 020
status: edited
source: '020 - Coding Exercise 1- Variables.md'
categories:
- AI
tags: []
---

# 🧪 Coding exercise 1: luyện biến qua 8 quy tắc trong VS Code

> Nguồn: `020 - Coding Exercise 1- Variables.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/6027660)

Chào các bạn, đây là bài **coding exercise** đầu tiên về biến. Mục tiêu là gõ lại từng quy tắc, chạy thử và nhìn tận mắt thông báo lỗi để nhớ lâu hơn. Các bạn nên tự tạo thêm ví dụ của mình sau khi làm theo bài.

### 🛠️ Chuẩn bị project

1. Đăng nhập hệ điều hành (mật khẩu trong bài là **1234**).
2. Mở **VS Code** từ ô tìm kiếm.
3. Vào **File → Open Folder**, bấm **Create Folder**, đặt tên ví dụ `Python_project_basics`.
4. Bấm **Create**, rồi **Open**.
5. Chọn **"Yes, I trust the authors"**.
6. Bấm **New File**, đặt tên `var.py` rồi Enter.

Để chạy: bấm chuột phải, chọn **Run Python**, sau đó chọn **Run Python File in Terminal**.

---

### 🚫 Những trường hợp báo lỗi

**Bắt đầu bằng chữ số.** Viết `12name` rồi chạy sẽ ra **syntax error**, vì Python hiểu phần mở đầu là một con số bình thường.

**Tạo biến mà không gán giá trị.** Chạy một dòng chỉ có tên biến sẽ lỗi. Sau khi tạo biến, phải dùng dấu `=` để định nghĩa giá trị:

```python
name1 = "Yilmaz"
```

**Dùng từ khóa của Python.** `for` là một cấu trúc của ngôn ngữ, nên `for = 12` sẽ báo lỗi.

**Có khoảng trắng trong tên.** `name surname = "Yilmaz Alija"` lỗi; phải viết `name_surname` với dấu gạch dưới.

---

### ✅ Những trường hợp hợp lệ

**Bắt đầu bằng chữ cái hoặc dấu gạch dưới, sau đó thêm số:**

```python
name1 = "Yilmaz"
_name2 = "example"
x = 1
y = 2
animal = "cat"
```

**Gán số nguyên trực tiếp:**

```python
x1 = 0
```

**Gán số thực:**

```python
age = 7.5
```

**Chuỗi phải nằm trong dấu nháy kép** khi gán tên hay bất kỳ văn bản nào.

---

### 🌍 Lưu ý về ký tự tiếng Việt

Tên biến chỉ nên dùng ký tự tiếng Anh. Giảng viên lấy ví dụ ở Thổ Nhĩ Kỳ có những chữ cái riêng; dùng chúng trong tên biến có thể làm code chạy lỗi. Với tiếng Việt, các bạn cũng nên giữ tên biến không dấu. Lưu ý: Python 3 thực tế cho phép chữ cái Unicode trong tên biến (PEP 3131), nên đây là khuyến nghị để tránh nhầm lẫn chứ không phải giới hạn bắt buộc.

---

Bài này gần như là bản thực hành chi tiết của bài exercise trước, nhưng chạy lại từ đầu giúp mình quen tay với VS Code và các lỗi thường gặp. Tiếp theo mình học **toán tử**.
