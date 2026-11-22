---
title: 'Cấu trúc điều kiện if, else, elif trong Python'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 030
status: edited
source: '030 - Conditional Statements.md'
categories:
- AI
tags: []
---

# 🚦 Cấu trúc điều kiện if, else, elif trong Python

> Nguồn: `030 - Conditional Statements.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39564016)

Chào các bạn, bài này mình học **cấu trúc điều kiện**. Nhờ nó, chương trình chỉ thực hiện một khối lệnh khi điều kiện thỏa — đây chính là nền tảng để sau này xe tự hành quyết định đi thẳng, rẽ phải hay rẽ trái.

### ❓ Câu lệnh if

Cú pháp gồm `if` và một **điều kiện kiểm soát**. Nếu điều kiện đúng, khối lệnh bên trong được chạy; nếu sai, khối đó bị bỏ qua.

```python
x = 5
y = 10

if y > x:
    print("y is greater than x")
```

Điểm cần nhớ là **dấu hai chấm** sau điều kiện và **thụt lề** (indentation) cho khối lệnh bên trong. Trong ví dụ trên `y > x` đúng nên dòng `print` được thực thi.

---

### 🔁 Câu lệnh else

`else` dùng cho trường hợp điều kiện `if` **không** thỏa. Khối `else` không cần điều kiện riêng, và không thể đứng một mình — phải đi sau một `if`.

```python
x = 5
y = 5

if x > y:
    print(x)
else:
    print(y)
```

Ở đây `x > y` sai, nên chương trình nhảy vào `else` và in `y`.

---

### 🔀 Câu lệnh elif

Khi cần nhiều hơn hai nhánh, mình dùng `elif`. `elif` không dùng độc lập, phải đứng sau `if`.

Ví dụ kiểm tra một số là dương, bằng không hay âm:

```python
number = 0

if number > 0:
    print("value is positive")
elif number == 0:
    print("value is zero")
else:
    print("value is negative")
```

Chương trình xét `number > 0` — sai, nên bỏ qua `if`. Sang `elif`, `number == 0` đúng, nên in `value is zero`.

---

### 🚗 Liên hệ với xe tự hành

Sau này xe sẽ cần ba hành động: đi thẳng theo làn, rẽ phải, rẽ trái. Muốn vậy phải diễn giải được làn đường rồi dựng các điều kiện tương ứng — `if`/`elif`/`else` là công cụ để làm việc đó.

---

Mình đã nắm ba nhánh điều kiện cơ bản. Bài sau mình làm bài tập để luyện.
