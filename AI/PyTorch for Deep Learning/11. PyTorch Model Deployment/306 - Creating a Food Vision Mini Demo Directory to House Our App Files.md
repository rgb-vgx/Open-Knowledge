---
title: 'Bài 306 — Tạo thư mục demos/food_vision_mini bằng code'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 306
status: edited
source: '306 - Creating a Food Vision Mini Demo Directory to House Our App Files.md'
categories:
- AI
tags: []
---

# 📂 Tạo thư mục demo: `demos/food_vision_mini`

> Nguồn: `306 - Creating a Food Vision Mini Demo Directory to House Our App Files.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34096540)

Chào các bạn. Mình đã có bản thiết kế thư mục, giờ dựng nó bằng code để chạy lại notebook lần nào cũng ra kết quả giống nhau, thay vì tạo tay.

### 🤔 Vì sao dùng đúng cấu trúc này?

Không có lý do gì cao siêu — đây là một trong những cấu trúc **đơn giản nhất** để bắt đầu. Khi demo, app, model phức tạp hơn, các bạn hoàn toàn có thể mở rộng. Nguyên tắc ở giai đoạn này là giữ mọi thứ gọn để **experiment, experiment, experiment**, cái gì chưa ổn thì sửa dần.

---

### 🧰 Hai thư viện cần dùng

```python
import shutil
from pathlib import Path
```

* **`shutil`** — thao tác file/directory cấp cao: copy, move, xoá cây thư mục.
* **`pathlib.Path`** — biểu diễn đường dẫn theo hướng object, ghép path bằng dấu `/`.

---

### 🧱 Tạo thư mục, có dọn cũ trước

Đoạn code dưới đây đảm bảo mỗi lần chạy lại đều **bắt đầu từ trạng thái sạch**: nếu thư mục đã tồn tại thì xoá cả cây, rồi tạo mới.

```python
food_vision_mini_demo_path = Path("demos/food_vision_mini")

if food_vision_mini_demo_path.exists():
    shutil.rmtree(food_vision_mini_demo_path)
    food_vision_mini_demo_path.mkdir(parents=True, exist_ok=True)
else:
    food_vision_mini_demo_path.mkdir(parents=True, exist_ok=True)
```

Giải thích tham số của `mkdir`:

* `parents=True` — tạo luôn thư mục cha `demos/` nếu chưa có.
* `exist_ok=True` — không báo lỗi nếu thư mục đã tồn tại.

Lưu ý là `shutil.rmtree` sẽ xoá **toàn bộ** nội dung bên trong, nên chỉ dùng với thư mục do chính notebook này tạo ra. Đây là thói quen tốt khi làm việc lặp đi lặp lại: chạy lại cell là có môi trường mới tinh.

---

### ✅ Kiểm tra kết quả

```python
import os
os.listdir(food_vision_mini_demo_path)
```

Kết quả là list rỗng — đúng như mong đợi, thư mục vừa tạo chưa có gì. Mảnh ghép đầu tiên đã xong.

---

Giờ thư mục đã có, việc còn lại là **lấp đầy** nó bằng `app.py`, `model.py`, `examples/`, model `.pth` và `requirements.txt`. Các bạn thử tự điền trước nhé — bài sau mình bắt đầu với thư mục `examples`.
