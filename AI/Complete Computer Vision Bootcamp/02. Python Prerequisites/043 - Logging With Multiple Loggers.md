---
title: 'Bài 043 — Logging với nhiều logger'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 43
status: edited
source: '043 - Logging With Multiple Loggers.md'
categories:
- AI
tags: []
---

# 🧵 Nhiều logger — tách log theo từng module

> Nguồn: `043 - Logging With Multiple Loggers.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086963)

Khi ứng dụng lớn lên, mọi log đổ về một logger `root` sẽ rất khó lần. Bài này mình tạo **nhiều logger riêng** cho từng module, mỗi logger có level và nhãn tên riêng — nhìn log là biết ngay đoạn code nào phát ra.

### 🏷️ Tạo logger bằng `getLogger`

```python
import logging

logger1 = logging.getLogger("module1")
logger1.setLevel(logging.DEBUG)

logger2 = logging.getLogger("module2")
logger2.setLevel(logging.WARNING)
```

* `logging.getLogger("module1")` trả về logger có **tên** `module1`. Gọi lại cùng tên sẽ trả về **đúng logger đó** (không tạo mới).
* `.setLevel(...)` đặt ngưỡng riêng cho từng logger: `module1` ghi từ DEBUG trở lên, `module2` chỉ ghi từ WARNING trở lên.

Nhớ viết chữ hoa cho hằng số: `logging.DEBUG`, `logging.WARNING` — viết thường sẽ lỗi vì đó là tên hàm chứ không phải level.

---

### ⚙️ Vẫn cần `basicConfig` cho format

```python
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
```

`basicConfig` lo **format và handler** chung; `setLevel` trên từng logger quyết định **mức nào được phát**. Thiếu `basicConfig` (và chưa gắn handler nào) thì Python chỉ còn **last-resort handler**: các bản ghi từ `WARNING` trở lên vẫn ra stderr với format mặc định, còn `DEBUG`/`INFO` có thể không hiện — nên trong thực tế cứ cấu hình `basicConfig` tử tế.

---

### 📝 Phát log qua từng logger

```python
logger1.debug("This is a debug message for module1")
logger2.warning("This is a warning message for module2")
logger2.error("This is an error message for module2")
```

Output:

```text
2026-11-23 10:15:02 module1 DEBUG This is a debug message for module1
2026-11-23 10:15:02 module2 WARNING This is a warning message for module2
2026-11-23 10:15:02 module2 ERROR This is an error message for module2
```

Khác với bài trước, cột tên logger không còn là `root` mà là **`module1`**, **`module2`** — đúng tên bạn đặt trong `getLogger`.

---

### 🎯 Lợi ích thực tế

1. **Truy vết theo module**: đọc log biết ngay thành phần nào phát ra.
2. **Điều chỉnh mức riêng**: module ồn ào (ví dụ parse dữ liệu) có thể để `WARNING`, module quan trọng để `DEBUG`.
3. **Mở rộng dễ**: thêm module mới chỉ cần `getLogger("module3")`, không đụng tới cấu hình cũ.

---

Tách logger theo module là bước đầu của logging "chuyên nghiệp". Bài sau mình gộp tất cả lại trong một **ví dụ thực tế hoàn chỉnh** — ứng dụng nhỏ có logging xuyên suốt.
