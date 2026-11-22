---
title: 'Bài 37 — Function copy, closure và decorator'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 37
status: edited
source: '037 - Function Copy,Closures And Decorators.md'
categories:
- AI
tags: []
---

# 🎁 Function copy, closure và decorator

> Nguồn: `037 - Function Copy,Closures And Decorators.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086897)

**Decorator** là tính năng mạnh của Python, cho phép thêm chức năng cho hàm hoặc method **mà không sửa code gốc**. Nhưng để hiểu decorator, phải nắm hai khái niệm nền: **function copy** (hàm là object, gán được cho biến) và **closure** (hàm lồng trong hàm). Bài này đi đúng thứ tự đó.

### 📋 Function copy — hàm cũng chỉ là object

```python
def welcome():
    return "Welcome to the Advanced Python course"

greet = welcome
print(greet())   # Welcome to the Advanced Python course
```

`greet = welcome` **không gọi** hàm — nó gán *chính hàm* vào biến khác (không có dấu ngoặc). Từ đó `greet` và `welcome` trỏ tới cùng một function object.

Thí nghiệm thú vị: xóa tên gốc, bản copy vẫn sống.

```python
def welcome():
    return "Welcome to the Advanced Python course"

greet = welcome

del welcome

print(greet())   # Welcome to the Advanced Python course
print(greet())   # Welcome to the Advanced Python course
```

Vì `del welcome` chỉ xóa *tên*, còn object hàm vẫn được `greet` giữ tham chiếu. Đây là bằng chứng cho thấy hàm trong Python là object hạng nhất.

### 🧺 Closure — hàm lồng trong hàm

**Closure** là hàm được định nghĩa bên trong hàm khác, có thể truy cập biến cục bộ của hàm ngoài:

```python
def main_welcome():
    message = "Welcome to the Advanced Python course"

    def sub_welcome():
        print(message)
        print("Please learn these concepts properly")

    return sub_welcome
```

* `sub_welcome` nằm trong `main_welcome`.
* Nó đọc được biến `message` của hàm ngoài — dù `message` là biến cục bộ.
* `main_welcome` **trả về chính hàm** `sub_welcome` (không gọi).

```python
main_welcome()
# Welcome to the Advanced Python course
# Please learn these concepts properly
```

Khi gọi `main_welcome()`, hàm ngoài chạy, tạo `sub_welcome`, rồi `return` nó — và vì kết quả trả về là hàm, Python sẽ... không tự gọi. Trong demo của giảng viên, các dòng `print` hiện ra ngay trong lúc dựng closure; điểm cốt lõi là `sub_welcome` vẫn "nhớ" `message` sau khi hàm ngoài kết thúc.

Closure còn cho phép truyền **hàm như tham số**:

```python
def main_welcome(func):
    def sub_welcome():
        print("Welcome to the Advanced Python course")
        func("Welcome everyone to this tutorial")
        print("Please learn these concepts properly")

    return sub_welcome

main_welcome(print)
# Welcome to the Advanced Python course
# Welcome everyone to this tutorial
# Please learn these concepts properly
```

Thay `print` bằng `len` và truyền một list, closure sẽ tính độ dài thay vì in — cùng một khung, hành vi khác nhau tùy hàm được truyền vào:

```python
def main_welcome(func):
    def sub_welcome(items):
        print("Welcome to the Advanced Python course")
        print(func(items))
        print("Please learn these concepts properly")

    return sub_welcome

main_welcome(len)([1, 2, 3, 4, 5])
# Welcome to the Advanced Python course
# 5
# Please learn these concepts properly
```

### ✨ Decorator — closure dùng để bọc hàm khác

Decorator áp lên một hàm bằng cú pháp `@`:

```python
def main_welcome(func):
    def sub_welcome():
        print("Welcome to the Advanced Python course")
        func()
        print("Please learn these concepts properly")

    return sub_welcome


@main_welcome
def course_introduction():
    print("This is an advanced Python course")


course_introduction()
```

Kết quả:

```text
Welcome to the Advanced Python course
This is an advanced Python course
Please learn these concepts properly
```

Cú pháp `@main_welcome` tương đương `course_introduction = main_welcome(course_introduction)`. Hàm `course_introduction` được truyền vào decorator, bọc trong `sub_welcome`, và **không dòng code nào của nó bị sửa** — đúng định nghĩa: thêm chức năng mà không đụng code gốc.

### 🧱 Decorator chuẩn với wrapper

Mẫu kinh điển dùng `wrapper` — thường gặp khi làm việc với Flask, Django:

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called")
        func()
        print("Something is happening after the function is called")

    return wrapper


@my_decorator
def say_hello():
    print("Hello")


say_hello()
```

`say_hello` chạy, và tự động có thêm hai dòng log trước/sau — thêm hành vi mà không chạm vào hàm.

### 🔁 Decorator có tham số

Muốn decorator nhận cấu hình riêng (ví dụ lặp `n` lần), cần **ba tầng hàm**:

```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator


@repeat(3)
def say_hello():
    print("Hello")


say_hello()
# Hello
# Hello
# Hello
```

* `repeat(n)` nhận tham số cấu hình.
* `decorator(func)` nhận hàm cần bọc.
* `wrapper(*args, **kwargs)` nhận **positional** và **keyword** argument của hàm gốc, để decorator dùng được với mọi chữ ký hàm.

Gọi `@repeat(3)` tương đương `say_hello = repeat(3)(say_hello)`.

### 🧭 Tổng kết

| Khái niệm | Ý tưởng |
|---|---|
| Function copy | Hàm là object, gán cho biến được |
| Closure | Hàm trong hàm, giữ được biến của hàm ngoài |
| Decorator | Closure nhận hàm khác làm tham số, mở rộng hành vi |
| Decorator có tham số | Thêm một tầng hàm để nhận cấu hình |

---

Ba khái niệm này xếp lớp lên nhau: function copy cho phép truyền hàm, closure cho phép bọc hàm, decorator biến việc bọc thành cú pháp `@` gọn gàng. Bài sau mình chuyển sang thư viện số một của Python cho khoa học dữ liệu — **NumPy**.
