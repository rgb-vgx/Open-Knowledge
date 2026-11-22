---
title: 'Bài 42 — Logging trong Python: cấu hình và ghi log ra file'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 42
status: edited
source: '042 - Logging Practical Implementation In Python.md'
categories:
- AI
tags: []
---

# 🪵 Logging — ghi lại mọi thứ chương trình đang làm

> Nguồn: `042 - Logging Practical Implementation In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086957)

Trong dự án end-to-end, **logging** gần như bắt buộc: bạn cần biết chương trình đã chạy gì, cảnh báo gì, lỗi gì để debug. Module `logging` có sẵn của Python cung cấp framework linh hoạt để phát log message — cấu hình level, format, và ghi ra file.

### ⚙️ `basicConfig` — cấu hình ban đầu

```python
import logging

logging.basicConfig(level=logging.DEBUG)
```

`level` là **ngưỡng thấp nhất** được ghi. Ở đây là `logging.DEBUG`, tức là mọi mức từ debug trở lên đều được in. Lưu ý viết **chữ hoa** `logging.DEBUG` — nếu viết `logging.debug` (tên hàm, không phải hằng số) sẽ lỗi.

### 📶 Năm mức log

| Level | Ý nghĩa |
|---|---|
| `DEBUG` | Thông tin chi tiết, chỉ cần khi chẩn đoán lỗi |
| `INFO` | Xác nhận mọi thứ chạy như mong đợi |
| `WARNING` | Có gì đó bất thường, nhưng chương trình **vẫn chạy** |
| `ERROR` | Lỗi nghiêm trọng, chương trình không thực hiện được một chức năng |
| `CRITICAL` | Lỗi rất nghiêm trọng, chương trình có thể **không tiếp tục chạy** |

Phát log ở từng mức:

```python
logging.debug("This is a debug message")
logging.info("This is an info message")
logging.warning("This is a warning message")
logging.error("This is an error message")
logging.critical("This is a critical message")
```

Output mặc định có dạng:

```text
DEBUG:root:This is a debug message
INFO:root:This is an info message
WARNING:root:This is a warning message
ERROR:root:This is an error message
CRITICAL:root:This is a critical message
```

Gồm **level**, **tên logger** (`root`), và **message**.

### 🎨 Tùy biến format và thời gian

```python
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
```

* `format` dùng các placeholder: `%(asctime)s` (thời gian), `%(name)s` (tên logger), `%(levelname)s` (mức), `%(message)s` (nội dung).
* `datefmt` định dạng thời gian theo `strftime`: `%Y` năm, `%m` tháng, `%d` ngày, `%H` giờ, `%M` phút, `%S` giây.

Kết quả mỗi dòng log có timestamp đầy đủ, dễ đọc và dễ lọc sau này.

### 💾 Ghi log ra file

Thêm `filename` và `filemode`:

```python
logging.basicConfig(
    filename="app.log",
    filemode="w",
    level=logging.DEBUG,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
```

* `filename="app.log"` → log ghi vào file thay vì console.
* `filemode="w"` → ghi đè mỗi lần chạy; muốn **nối thêm** thì dùng `filemode="a"`.

Sau khi chạy, file `app.log` chứa toàn bộ các dòng debug/info/warning/error/critical.

> ⚠️ Lưu ý quan trọng: `basicConfig` **chỉ có tác dụng lần đầu**. Nếu đã cấu hình rồi mà gọi lại, thay đổi sẽ bị bỏ qua. Trong Jupyter notebook, phải **restart kernel** trước khi chạy cấu hình mới; ngoài script thì mỗi lần chạy là một process mới nên không vướng.

### 📦 Tách cấu hình logging thành module riêng

Mẫu phổ biến trong dự án: cấu hình một lần trong `logger.py`, các file khác import dùng lại.

`logs/logger.py`:

```python
import logging

logging.basicConfig(
    filename="logs/app.log",
    level=logging.DEBUG,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
```

`test.py`:

```python
from logs import logger
import logging


def add(a, b):
    logging.debug("The addition operation is taking place")
    return a + b


logging.debug("The addition function is called")
print(add(10, 15))
```

Chạy `python test.py` từ đúng thư mục, file `logs/app.log` sẽ chứa các dòng:

```text
... DEBUG root The addition function is called
... DEBUG root The addition operation is taking place
```

Không có gì in ra console vì log đã chuyển vào file — nhưng khi cần debug, mở file là thấy toàn bộ lịch sử thực thi.

### 🧭 Kết luận

* `basicConfig` đặt level, format, file đầu ra — **chỉ một lần**.
* Năm mức `DEBUG < INFO < WARNING < ERROR < CRITICAL` quyết định mức độ nghiêm trọng.
* Ghi ra file để giữ lại vết chạy; tách `logger.py` để dùng chung toàn dự án.
* Đặt `level=logging.DEBUG` khi phát triển, cân nhắc `INFO` hoặc cao hơn khi production.

---

Cấu hình logging một chỗ, dùng khắp nơi — đó là nền tảng để theo dõi ứng dụng thật. Bài sau mình mở rộng sang **nhiều logger** trong cùng ứng dụng, phục vụ các module khác nhau.
