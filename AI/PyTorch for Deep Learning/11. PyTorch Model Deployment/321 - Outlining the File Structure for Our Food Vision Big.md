---
title: 'Bài 321 — Cấu trúc file cho app Food Vision Big'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 321
status: edited
source: '321 - Outlining the File Structure for Our Food Vision Big.md'
categories:
- AI
tags: []
---

# 🗂️ Lên khung thư mục cho Food Vision Big

> Nguồn: `321 - Outlining the File Structure for Our Food Vision Big.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34125254)

Chào các bạn. Food Vision Big đạt gần **58%** trên test, vượt paper gốc dù chỉ dùng 20% dữ liệu. Giờ mình deploy nó, giống hệt cách đã làm với Food Vision Mini.

### 🎯 Vì sao deploy?

Deploy là **bài test cuối cùng** — đưa model ra thế giới thật. Ở đó sẽ lộ ra những lỗi mà tập train/test không bao giờ cho thấy. Đó là lý do mình đầu tư công đoạn này chứ không dừng ở notebook.

---

### 📁 Cấu trúc đích

```text
demos/
└── food_vision_big/
    ├── app.py
    ├── model.py
    ├── class_names.txt
    ├── examples/
    │   └── 04-pizza-dad.jpeg
    ├── 09_pretrained_effnetb2_feature_extractor_food101_20_percent.pth
    └── requirements.txt
```

Khác Food Vision Mini ở chỗ có thêm **`class_names.txt`**. Vì có tới 101 tên lớp, nhét cả list vào `app.py` sẽ rất cồng kềnh. Mình lưu ra file text, mỗi dòng một tên, rồi đọc lại khi chạy app.

---

### 🧱 Tạo thư mục bằng code

```python
from pathlib import Path

food_vision_big_demo_path = Path("demos/food_vision_big")
food_vision_big_demo_path.mkdir(parents=True, exist_ok=True)

food_vision_big_demo_examples_path = food_vision_big_demo_path / "examples"
food_vision_big_demo_examples_path.mkdir(parents=True, exist_ok=True)
```

`parents=True, exist_ok=True` giúp không lỗi khi thư mục đã tồn tại. Sau đó kiểm tra:

```python
import os
os.listdir(food_vision_big_demo_path)
```

Kết quả chỉ có `['examples']` — đúng như dự kiến, các file khác sẽ được lấp dần.

---

### 📌 Thành phần từng file

* **`app.py`** — toàn bộ giao diện Gradio + `predict`, file mặc định Spaces chạy.
* **`model.py`** — hàm `create_effnetb2_model` (dùng lại y nguyên từ Food Vision Mini).
* **`class_names.txt`** — 101 tên lớp, mỗi dòng một tên.
* **`examples/`** — ảnh mẫu cho demo.
* **`*.pth`** — state dict Food Vision Big.
* **`requirements.txt`** — dependency (giống bản Mini).

---

Thử thách nhỏ: các bạn thử đặt một ảnh vào `examples/`. Mình sẽ dùng lại ảnh **`04-pizza-dad.jpeg`** quen thuộc từ đầu khóa. Bài sau mình tải ảnh đó và move model vào thư mục.
