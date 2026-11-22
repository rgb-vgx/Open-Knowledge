---
title: 'Bài 026 — Xử lý ngoại lệ trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 26
status: edited
source: '026 - Exception Handling.md'
categories:
- AI
tags: []
---

# 🧯 Xử lý ngoại lệ với try, except, else và finally

> Nguồn: `026 - Exception Handling.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086773)

Chương trình chạy tốt khi mọi thứ đúng, nhưng người dùng thì luôn nhập sai. **Exception handling** cho phép bạn xử lý lỗi một cách "graceful": báo cho người dùng biết chuyện gì xảy ra thay vì để cả chương trình sập giữa chừng. Bài này mình đi qua cả bốn khối **`try` / `except` / `else` / `finally`** kèm ví dụ thực tế.

### ⚡ Error và exception khác nhau thế nào?

**Exception** là những sự kiện phá vỡ luồng chạy bình thường của chương trình, xảy ra khi gặp lỗi lúc thực thi. Vài ngoại lệ quen thuộc:

* `ZeroDivisionError` — chia cho 0
* `FileNotFoundError` — file không tồn tại
* `ValueError` — giá trị không hợp lệ
* `TypeError` — sai kiểu dữ liệu
* `NameError` — dùng biến chưa khai báo

Ví dụ, đoạn này chạy ổn:

```python
a = 10
```

Nhưng đoạn này thì không:

```python
a = b
```

Python báo **"name 'b' is not defined"** — một `NameError`. Với lập trình viên, thông báo này đủ hiểu; nhưng với người dùng cuối thì không. Vì vậy mới cần bắt nó lại và thay bằng thông điệp dễ hiểu.

---

### 🛡️ Khối `try` / `except` cơ bản

Ý tưởng giống `try`/`catch` ở ngôn ngữ khác: đặt code có khả năng lỗi trong `try`, xử lý ở `except`.

```python
try:
    a = b
except NameError:
    print("The variable has not been assigned")
```

Khi `NameError` xảy ra, khối `except` bắt lấy và in ra thông báo thân thiện thay vì traceback.

Muốn xem chi tiết lỗi, gán ngoại lệ vào một biến (alias) rồi in ra:

```python
try:
    a = b
except NameError as x:
    print(x)   # name 'b' is not defined
```

Ở đây `NameError` là một **class** đại diện cho loại ngoại lệ đó, `x` chỉ là tên tạm để tham chiếu.

---

### 🎯 Bắt nhiều loại ngoại lệ

Mỗi loại lỗi có class riêng. Ví dụ với phép chia:

```python
try:
    result = 1 / 0
except ZeroDivisionError as x:
    print(x)  # division by zero
    print("Please enter a denominator greater than zero")
```

Có thể có nhiều khối `except` cho nhiều tình huống khác nhau:

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("Not a valid number")
except ZeroDivisionError:
    print("Enter denominator greater than zero")
except Exception as x:
    print(x)
```

Thử nhập `0` → rơi vào `ZeroDivisionError`; nhập một chuỗi như `"abc"` → rơi vào `ValueError`; nhập `34` → chạy trơn tru.

Điểm quan trọng: gốc của cây ngoại lệ là **`BaseException`**; **`Exception`** là lớp con của nó và là cha của hầu hết lỗi thường gặp (`ZeroDivisionError`, `ValueError`, `NameError`...). Vì vậy `except Exception` bắt được các lỗi thông thường — nhưng **không** bắt `KeyboardInterrupt` hay `SystemExit` (hai lớp này kế thừa trực tiếp `BaseException`). Và dù bắt lớp nào, `except` cụ thể phải đặt **trước** `except Exception`. Nếu đặt `except Exception` trước `ZeroDivisionError` hay `NameError`, các nhánh cụ thể phía sau sẽ không bao giờ được chạm tới.

---

### ✅ Khối `else` — chỉ chạy khi không có lỗi

`else` nằm sau các `except`, và chỉ thực thi khi khối `try` chạy xong **không có ngoại lệ nào**:

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("Not a valid number")
except ZeroDivisionError:
    print("Enter denominator greater than zero")
else:
    print(f"The result is {result}")
```

Nhập `23` → in kết quả. Nhập `0` → `except` xử lý và `else` bị bỏ qua hoàn toàn.

---

### 🔒 Khối `finally` — luôn luôn chạy

`finally` chạy **bất kể có lỗi hay không**:

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("Not a valid number")
except ZeroDivisionError:
    print("Enter denominator greater than zero")
else:
    print(f"The result is {result}")
finally:
    print("Execution complete")
```

Nhập `12` → thấy cả kết quả lẫn "Execution complete". Nhập `0` → thấy lỗi chia 0 **và vẫn** thấy "Execution complete", còn `else` thì không chạy.

Trong thực tế, `finally` dùng cho việc **dọn dẹp**: ví dụ mở kết nối database trong `try`, dù thao tác thành công hay gặp exception thì cuối cùng vẫn phải đóng kết nối — đặt đoạn đóng trong `finally`.

---

### 📂 Áp dụng vào file handling

Kết hợp với bài đọc/ghi file, đây là mẫu rất hay gặp:

```python
try:
    file = open("example1.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("The file does not exist")
finally:
    if "file" in locals() and not file.closed:
        file.close()
        print("File closed")
```

* `except FileNotFoundError` bắt trường hợp file chưa tồn tại.
* `locals()` trả về dictionary các biến trong scope hiện tại — dùng để kiểm tra biến `file` đã được tạo chưa (vì nếu `open` lỗi ngay thì `file` thậm chí chưa tồn tại).
* `file.closed` kiểm tra file đã đóng chưa, tránh đóng hai lần.
* `finally` đảm bảo file luôn được đóng, kể cả khi lỗi xảy ra ở bước `read()`.

---

Bốn khối này là bộ công cụ chuẩn để code không "chết" vì một input xấu. Lời khuyên của giảng viên: cứ viết đi viết lại nhiều biến thể, chú ý **indentation** vì Python dựa hoàn toàn vào thụt lề để xác định khối. Bài sau mình bước vào thế giới **lập trình hướng đối tượng** với class và object.
