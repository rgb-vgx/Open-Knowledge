---
title: 'Biến trong Python: khái niệm, quy tắc đặt tên và kiểu dữ liệu'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 017
status: edited
source: '017 - Variables.md'
categories:
- AI
tags: []
---

# 🐍 Biến trong Python: khái niệm, quy tắc đặt tên và kiểu dữ liệu

> Nguồn: `017 - Variables.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39496334)

Chào các bạn, mình tiếp tục phần **Python 3** với khái niệm nền tảng nhất: **biến**. Nếu các bạn chưa từng học Python thì đây là điểm khởi đầu phù hợp — mình sẽ đi qua định nghĩa, ba quy tắc đặt tên và các kiểu dữ liệu thường gặp.

### 💡 Biến là gì

Trong lập trình, **biến** (variable) là một tên mang tính biểu tượng đại diện cho một giá trị được lưu trong bộ nhớ máy tính. Có thể hình dung nó như một chiếc hộp đựng dữ liệu.

Biến rất cần thiết để lưu trữ và thao tác dữ liệu trong chương trình.

---

### ✅ Quy tắc đặt tên biến

1. **Chỉ dùng chữ cái, chữ số và dấu gạch dưới.** Chữ cái có thể viết hoa hoặc viết thường. Ví dụ hợp lệ: `name`, `age`, `animal`, `X123`, `name1`, `name_surname`.
2. **Phải bắt đầu bằng chữ cái hoặc dấu gạch dưới, không bắt đầu bằng chữ số.** Các bạn có thể đặt `company`, nhưng không thể đặt `123company`.
3. **Tên biến phân biệt chữ hoa chữ thường.** `name` và `Name` là hai biến khác nhau, vì chữ `n` đầu tiên một cái viết thường, một cái viết hoa.

---

### ⚙️ Gán giá trị cho biến

Để tạo biến và gán giá trị, các bạn dùng toán tử gán là dấu bằng `=`. Giá trị nằm bên phải dấu bằng sẽ được lưu vào biến bên trái.

```python
x = 5
```

Ở đây giá trị `5` được lưu vào biến `x`.

---

### 🧠 Kiểu dữ liệu và cơ chế dynamic typing

Python là ngôn ngữ **dynamically typed**: các bạn không cần khai báo tường minh kiểu dữ liệu của biến, Python tự suy ra kiểu dựa trên giá trị được gán.

Các kiểu dữ liệu phổ biến:

* **Integer** — số nguyên, ví dụ `0`, `-10`, `589`.
* **Float** — số thực, số thập phân, ví dụ `3.14`, `0.5`.
* **String** (`str`) — chuỗi ký tự, ví dụ `"hello world"`, tên của bạn, hay chữ cái đầu tiên trong tên.
* **Boolean** — chỉ có hai giá trị `True` và `False`.

Các cấu trúc dữ liệu này sẽ được mình nói kỹ hơn ở những bài sau.

---

Vậy là mình đã nắm được biến là gì và cách đặt tên đúng. Bài tiếp theo các bạn sẽ thực hành ngay với biến, từng quy tắc một.
