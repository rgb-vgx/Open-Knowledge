---
title: 'Bài 036 — Generator trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 36
status: edited
source: '036 - Generators In Python.md'
categories:
- AI
tags: []
---

# 🌱 Generator — viết iterator chỉ với một chữ `yield`

> Nguồn: `036 - Generators In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086879)

**Generator** là cách đơn giản để tạo iterator. Nó dùng từ khóa `yield` để sinh ra chuỗi giá trị một cách lười (lazy) — tạo giá trị ngay khi cần và **không lưu tất cả trong bộ nhớ**. Vì thế generator rất hợp để duyệt dữ liệu lớn mà vẫn tiết kiệm RAM.

### ⚠️ Vấn đề khi dùng `return` trong vòng lặp

Xét hàm "bình phương" viết bằng `return`:

```python
def square(n):
    for i in range(n):
        return i ** 2
```

Gọi `square(3)` chỉ trả về **0** — vì `return` thoát khỏi hàm ngay lần lặp đầu tiên, không bao giờ chạm tới các phần tử sau. Muốn trả về cả dãy, phải đổi `return` thành `yield`.

---

### ✨ `yield` biến hàm thành generator

```python
def square(n):
    for i in range(n):
        yield i ** 2
```

Gọi `square(3)` bây giờ **không** trả về giá trị, mà trả về một **generator object**:

```python
print(square(3))   # <generator object square at 0x...>
```

`yield` đóng vai trò như một "điểm dừng": mỗi lần generator được hỏi giá trị, nó chạy tới `yield`, trả giá trị đó ra, **lưu lại trạng thái** (biến cục bộ, vị trí vòng lặp) rồi tạm dừng. Lần sau gọi tiếp, nó chạy tiếp từ đúng chỗ đã dừng.

---

### 🔁 Duyệt generator bằng `for`

```python
for i in square(3):
    print(i)
```

Kết quả:

```text
0
1
4
```

Đúng như mong đợi: 0², 1², 2². Mỗi giá trị được sinh ra khi vòng `for` cần, không sinh sẵn cả loạt.

---

### ➡️ Duyệt generator bằng `next()`

Generator cũng là iterator, nên `next()` dùng được:

```python
a = square(3)

print(next(a))   # 0
print(next(a))   # 1
print(next(a))   # 4
print(next(a))   # StopIteration
```

Gọi quá số phần tử sẽ nhận `StopIteration` — đúng hành vi chuẩn của iterator.

---

### 📚 Nhiều `yield` trong một hàm

Một hàm generator có thể `yield` nhiều lần, mỗi lần một giá trị:

```python
def my_generator():
    yield 1
    yield 2
    yield 3
```

```python
gen = my_generator()

print(next(gen))   # 1
print(next(gen))   # 2
print(next(gen))   # 3
print(next(gen))   # StopIteration
```

Hoặc gọn hơn bằng vòng `for val in my_generator(): print(val)` → in ra 1, 2, 3.

---

### 📂 Ứng dụng thực tế: đọc file lớn

Generator đặc biệt hữu ích khi đọc file lớn — xử lý **từng dòng một** mà không nạp cả file vào bộ nhớ:

```python
def read_large_file(file_path):
    with open(file_path, "r") as file:
        for line in file:
            yield line
```

Dùng:

```python
file_path = "large_file.txt"

for line in read_large_file(file_path):
    print(line.strip())
```

Với file hàng trăm MB, cách này chỉ giữ một dòng trong bộ nhớ tại mỗi thời điểm. Toàn bộ file không bao giờ bị nạp một lần.

---

### ⚖️ Iterator và generator khác nhau thế nào?

| Tiêu chí | Iterator | Generator |
|---|---|---|
| Cách tạo | `iter(collection)` hoặc class tự cài `__iter__`/`__next__` | Hàm có `yield` |
| Từ khóa chính | `iter`, `next` | `yield` |
| Cú pháp | Dài, phải quản lý trạng thái | Ngắn gọn, tự lưu trạng thái |
| Bộ nhớ | Tiết kiệm | Tiết kiệm (sinh giá trị khi cần) |

> ⚠️ Cần kiểm chứng: transcript có câu "Python iterator is much more efficient when compared to the generators". Theo tài liệu Python, generator *là một loại* iterator; hiệu năng còn tùy tình huống, không có kết luận chung "iterator hiệu quả hơn generator". Bài viết giữ phần so sánh theo nội dung video, riêng nhận định hiệu năng nên xem lại.

---

Generator là công cụ đắc lực cho pipeline dữ liệu: đọc, biến đổi, truyền tiếp mà không phình bộ nhớ. Bài sau mình quay lại hàm — với **closure** và **decorator**, hai kỹ thuật nâng cao giúp code gọn và tái sử dụng hơn.
