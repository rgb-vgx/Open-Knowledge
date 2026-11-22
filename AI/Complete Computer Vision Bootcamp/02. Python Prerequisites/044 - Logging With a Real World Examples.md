---
title: 'Bài 044 — Logging trong ứng dụng thực tế: máy tính bốn phép'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 44
status: edited
source: '044 - Logging With a Real World Examples.md'
categories:
- AI
tags: []
---

# 🧮 Logging thực chiến — ứng dụng arithmetic

> Nguồn: `044 - Logging With a Real World Examples.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086971)

Lý thuyết logging đã đủ; giờ ghép lại thành một ứng dụng nhỏ trong file `app.py`: bốn phép tính cộng, trừ, nhân, chia, mỗi phép đều ghi log, riêng chia còn bắt `ZeroDivisionError` và ghi log lỗi. Đây là mẫu bạn sẽ gặp lại ở mọi dự án thật.

### 🧰 Cấu hình bằng `handlers`

Thay vì chỉ `filename`, bài này dùng tham số **`handlers`** — danh sách các nơi nhận log:

```python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler("app1.log"),
        logging.StreamHandler(),
    ],
)
```

* `logging.FileHandler("app1.log")` ghi log ra file.
* `logging.StreamHandler()` in log ra console (stderr).
* Truyền cả hai trong list → log **vừa ra file vừa ra màn hình**.

Cách này tương đương dùng `filename=` nhưng linh hoạt hơn: muốn thêm nơi nhận (ví dụ gửi lên server log) chỉ cần thêm handler vào list.

---

### 🎯 Logger theo tên module

```python
logger = logging.getLogger("arithmetic_app")
```

Toàn bộ log của module này sẽ mang nhãn `arithmetic_app`, giúp lọc khi đọc file.

---

### ➕ Các hàm tính toán có log

```python
def add(a, b):
    result = a + b
    logger.debug(f"Adding {a} + {b} = {result}")
    return result


def subtract(a, b):
    result = a - b
    logger.debug(f"Subtracting {a} - {b} = {result}")
    return result


def multiply(a, b):
    result = a * b
    logger.debug(f"Multiplying {a} * {b} = {result}")
    return result
```

Mỗi hàm ghi lại phép tính vừa thực hiện. Khi có bug số học, mở log là thấy ngay input và output.

---

### ➗ Hàm chia có xử lý lỗi

```python
def divide(a, b):
    try:
        result = a / b
        logger.debug(f"Dividing {a} / {b} = {result}")
        return result
    except ZeroDivisionError:
        logger.error(f"Division by zero attempted: {a} / {b}")
        return None
```

Khi `b = 0`, `logger.error` ghi lỗi vào file thay vì để chương trình sập với traceback khó hiểu. Đây là chỗ logging và exception handling gặp nhau.

---

### ▶️ Chạy thử

```python
print(add(10, 15))        # 25
print(subtract(15, 10))   # 5
print(multiply(10, 20))   # 200
print(divide(20, 10))     # 2.0
print(divide(20, 0))      # None + log error
```

File `app1.log` sẽ có dạng:

```text
2026-11-23 10:20:03 arithmetic_app DEBUG Adding 10 + 15 = 25
2026-11-23 10:20:03 arithmetic_app DEBUG Subtracting 15 - 10 = 5
2026-11-23 10:20:03 arithmetic_app DEBUG Multiplying 10 * 20 = 200
2026-11-23 10:20:03 arithmetic_app DEBUG Dividing 20 / 10 = 2.0
2026-11-23 10:20:03 arithmetic_app ERROR Division by zero attempted: 20 / 0
```

Nhìn là biết module nào, phép gì, kết quả bao nhiêu, lỗi ở đâu.

---

### 🐞 Bài học debug từ chính video

Trong lúc viết, giảng viên gặp hai lỗi — đều đáng nhớ:

1. **"not all arguments converted during string formatting"** — do log dùng f-string nhưng thiếu dấu ngoặc đóng, hoặc tham số sai. Kiểm tra lại cú pháp `f"..."`.
2. **Thiếu `return result`** trong hàm `add` → hàm trả `None` dù đã log đúng.

Giảng viên nhấn mạnh: gặp lỗi cứ bình tĩnh đọc thông báo và sửa; **debug là kỹ năng quan trọng**, không có gì phải ngại.

---

### 🧭 Tổng kết

* `handlers` cho phép ghi log đồng thời nhiều đích.
* Mỗi module đặt logger riêng theo tên.
* Log cả **thành công** (debug) lẫn **thất bại** (error) — khi sự cố mới có đủ dữ liệu đối chiếu.
* Chạy script từ đúng thư mục để file log được tạo đúng chỗ.

---

Vậy là logging đã đi từ cấu hình cơ bản, tách logger, tới ứng dụng hoàn chỉnh. Bài cuối của phần Python Prerequisites là một **quiz tổng hợp** — dịp tốt để tự kiểm tra mình nắm được bao nhiêu.
