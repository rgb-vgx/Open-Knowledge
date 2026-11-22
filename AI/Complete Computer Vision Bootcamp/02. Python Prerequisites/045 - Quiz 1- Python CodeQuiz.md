---
title: 'Bài 45 — Quiz 1: ôn tập Python qua bài logging'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 45
status: edited
source: '045 - Quiz 1- Python CodeQuiz.md'
categories:
- AI
tags: []
---

# 🧠 Quiz 1 — kiểm tra kiến thức Python qua bài logging

> Nguồn: `045 - Quiz 1- Python CodeQuiz.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/6890895)

Đây là bài **quiz tổng hợp** cuối phần Python Prerequisites. Video đi lại toàn bộ quy trình dựng một ứng dụng nhỏ có logging — từ cấu hình, đặt logger, viết các hàm tính toán, tới bắt lỗi chia cho 0. Xem như một bài tự kiểm tra: nếu bạn giải thích được từng bước dưới đây mà không cần mở lại bài cũ, bạn đã nắm khá chắc.

### 🧩 Câu hỏi 1: Cấu hình logging cần những gì?

Một cấu hình đầy đủ gồm **level**, **format**, **date format** và **nơi nhận log**:

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

* `level=logging.DEBUG` — ghi từ mức DEBUG trở lên.
* `format` + `datefmt` — định hình mỗi dòng log.
* `handlers` — danh sách đích nhận log: `FileHandler` ghi file, `StreamHandler` in console.

Tự hỏi: nếu bỏ `StreamHandler` thì log còn hiện ra màn hình không? (Không.)

### 🏷️ Câu hỏi 2: Logger đặt tên thế nào?

```python
logger = logging.getLogger("arithmetic_app")
```

Tên `arithmetic_app` xuất hiện ở cột tên logger trong mỗi dòng log. Khác với `root` mặc định, tên riêng giúp lọc log theo module.

### 🔢 Câu hỏi 3: Viết hàm có log

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

Điểm cần nhớ: log **trước khi** `return`, và nhớ `return` — thiếu `return` là lỗi kinh điển (giảng viên từng mắc đúng lỗi này trong video).

### 🚨 Câu hỏi 4: Bắt lỗi chia cho 0 và ghi log

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

* Thành công → log mức `DEBUG`.
* Thất bại → log mức `ERROR`, không làm sập chương trình.

Đây là sự kết hợp của hai chủ đề lớn trong phần này: **exception handling** và **logging**.

### ▶️ Câu hỏi 5: Kết quả khi chạy

```python
print(add(10, 15))        # 25
print(subtract(15, 10))   # 5
print(multiply(10, 20))   # 200
print(divide(20, 10))     # 2.0
print(divide(20, 0))      # None
```

File `app1.log` ghi lại từng phép tính kèm kết quả, và dòng cuối là:

```text
... arithmetic_app ERROR Division by zero attempted: 20 / 0
```

### 🐞 Câu hỏi 6: Vì sao gặp lỗi "not all arguments converted during string formatting"?

Lỗi này xuất hiện khi chuỗi log và tham số không khớp — thường do **thiếu dấu ngoặc đóng** trong f-string hoặc truyền sai tham số. Giảng viên gặp lỗi ngay trong video và sửa bằng cách kiểm tra lại cặp ngoặc của `f"..."`.

Bài học: **đọc kỹ thông báo lỗi, sửa từng chỗ**; lỗi cú pháp nhỏ là chuyện bình thường khi viết code.

### ✅ Checklist tự đánh giá

1. Giải thích được 5 mức log và thứ tự nghiêm trọng.
2. Biết `basicConfig` chỉ có hiệu lực **một lần** (Jupyter cần restart kernel).
3. Biết phân biệt `FileHandler` và `StreamHandler`.
4. Viết được logger riêng theo tên module.
5. Kết hợp được `try/except` với `logger.error`.
6. Tự chạy lại toàn bộ `app.py` và mở file log kiểm tra.

Nếu trả lời trôi cả 6 mục, bạn đã sẵn sàng rời phần Python Prerequisites để bước vào các phần tiếp theo của khóa Computer Vision.

---

> ⚠️ Cần kiểm chứng: transcript của bài quiz này trùng nội dung với video "Logging With a Real World Examples" (bài 44) — có thể bản ghi bị lặp. Nội dung bài viết bám theo transcript đó; nếu khóa học cập nhật câu hỏi quiz khác, hãy đối chiếu lại với bài giảng gốc trên Udemy.
