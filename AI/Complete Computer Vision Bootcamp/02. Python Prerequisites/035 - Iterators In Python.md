---
title: 'Bài 035 — Iterator trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 35
status: edited
source: '035 - Iterators In Python.md'
categories:
- AI
tags: []
---

# 🔄 Iterator — duyệt tuần tự mà không phơi cấu trúc bên trong

> Nguồn: `035 - Iterators In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086865)

**Iterator** cho phép truy cập lần lượt từng phần tử của một collection mà không cần biết cấu trúc bên trong của nó. Đây là khái niệm đứng sau mọi vòng `for` bạn đã viết, và là nền tảng của **lazy loading** — chỉ sinh dữ liệu khi thực sự cần.

### 📋 Từ vòng lặp quen thuộc…

Cho một list:

```python
my_list = [1, 2, 3, 4, 5, 6]

for i in my_list:
    print(i)
```

Kết quả in ra 1 tới 6. `type(my_list)` cho `list`, và `print(my_list)` hiện toàn bộ phần tử — vì list là collection lưu sẵn mọi thứ.

---

### 🔁 Tạo iterator bằng `iter()`

```python
my_list = [1, 2, 3, 4, 5, 6]
iterator = iter(my_list)

print(type(iterator))   # <class 'list_iterator'>
print(iterator)         # <list_iterator object at 0x...>
```

Khác biệt rõ rệt: `print(iterator)` **không** hiện các phần tử. Iterator chỉ là "con trỏ" tới vị trí hiện tại trong collection, không phải bản sao dữ liệu.

---

### ⏳ Lazy loading và `next()`

Iterator dùng kỹ thuật **lazy loading**: chưa có phần tử nào được "rót ra" cho tới khi bạn hỏi. Muốn lấy phần tử kế tiếp, dùng `next()`:

```python
iterator = iter(my_list)

print(next(iterator))   # 1
print(next(iterator))   # 2
print(next(iterator))   # 3
```

Mỗi lần gọi `next()`, iterator nhả đúng một phần tử và nhớ vị trí — không lặp lại phần tử cũ. Cứ tiếp tục `next()` tới 6, rồi gọi thêm lần nữa:

```text
StopIteration
```

`StopIteration` là exception báo hiệu **đã hết phần tử**.

---

### 🛡️ Bắt `StopIteration` bằng try/except

Để duyệt an toàn đến hết, bọc `next()` trong `try`/`except`:

```python
try:
    print(next(iterator))
except StopIteration:
    print("There are no elements in the iterator")
```

Khi iterator cạn, chương trình in thông báo thay vì sập. Đây chính là cơ chế bên dưới của vòng `for`: nó gọi `next()` liên tục và tự dừng khi gặp `StopIteration`.

---

### 🔤 Iterator trên string

Không chỉ list — string cũng iterable:

```python
my_string = "Hello"
string_iterator = iter(my_string)

print(next(string_iterator))   # H
print(next(string_iterator))   # e
```

Mỗi lần `next()` nhả ra một ký tự.

---

### 🧠 Lợi ích: vòng lặp hiệu quả và quản lý bộ nhớ

* **Không nạp sẵn toàn bộ** dữ liệu: iterator chỉ giữ vị trí hiện tại, nên tiết kiệm bộ nhớ với collection lớn.
* **Không phơi cấu trúc** bên trong: người dùng chỉ cần gọi `next()`, không cần biết list hay cấu trúc phức tạp.
* **Duyệt tuần tự một chiều**: mỗi phần tử đi qua đúng một lần — đúng với tư duy xử lý dữ liệu kiểu pipeline.

---

### 📊 Tóm tắt nhanh

| Khái niệm | Vai trò |
|---|---|
| `iter(collection)` | Tạo ra iterator từ collection |
| `next(iterator)` | Lấy phần tử kế tiếp |
| `StopIteration` | Exception khi hết phần tử |
| Lazy loading | Chỉ sinh dữ liệu khi được hỏi |

---

Iterator là "động cơ" của vòng lặp trong Python. Bài sau mình đi tiếp sang **generator** — cách viết iterator gọn hơn nhiều, chỉ với một từ khóa `yield`.
