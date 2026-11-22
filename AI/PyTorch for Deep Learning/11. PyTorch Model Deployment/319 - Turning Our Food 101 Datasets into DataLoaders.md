---
title: 'Bài 319 — Tạo DataLoader cho Food101 subset 20%'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 319
status: edited
source: '319 - Turning Our Food 101 Datasets into DataLoaders.md'
categories:
- AI
tags: []
---

# 🔄 DataLoader cho 15.150 ảnh train và 5.050 ảnh test

> Nguồn: `319 - Turning Our Food 101 Datasets into DataLoaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34121080)

Chào các bạn. Dataset đã có, giờ biến thành `DataLoader` để đưa vào vòng train. Lưu ý nhỏ: lần này mình **không** dùng `create_dataloaders` của phần *going modular*, vì dữ liệu đã ở dạng `Dataset` chứ không phải thư mục ảnh.

### 🧱 Vì sao không dùng `create_dataloaders`?

Hàm cũ nhận đường dẫn thư mục rồi tự dựng `ImageFolder`. Ở đây `train_data_food101_20_percent` đã là một `Dataset` (thực chất là `Subset`), nên chỉ cần `torch.utils.data.DataLoader` trực tiếp.

---

### 📦 Cấu hình chung

```python
import os
import torch

BATCH_SIZE = 32
NUM_WORKERS = 2
```

---

### 🚂 DataLoader cho train

```python
train_dataloader_food101_20_percent = torch.utils.data.DataLoader(
    train_data_food101_20_percent,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=NUM_WORKERS,
)
```

Với tập train, `shuffle=True` để model không học theo thứ tự cố định.

---

### 🧪 DataLoader cho test

```python
test_dataloader_food101_20_percent = torch.utils.data.DataLoader(
    test_data_food101_20_percent,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS,
)
```

Tập test **không cần shuffle** vì chỉ dùng để đánh giá.

---

### ⚙️ `num_workers` — tham số rất "experimental"

`num_workers` quyết định số tiến trình con dùng để load dữ liệu. Theo tài liệu PyTorch:

* `num_workers=0` — load trong main process, không đa xử lý.
* `num_workers > 0` — bật **multiprocessing data loading**.

Mình hay set bằng **số CPU** (ở đây là 2). Kinh nghiệm chung: 2–4 là hợp lý; vượt 4 thì lợi ích giảm dần (diminishing returns) và phụ thuộc mạnh vào phần cứng. Đây cũng là lý do mình đặt biến `NUM_WORKERS` riêng để dễ chỉnh.

Nếu gặp lỗi **CPU memory**, một trong những cách xử lý là **giảm `batch_size`** (ví dụ chia đôi).

---

### 🔢 Kiểm tra số batch

```python
len(train_dataloader_food101_20_percent), len(test_dataloader_food101_20_percent)
```

Kết quả:

```text
(474, 158)
```

* Train: 15.150 / 32 ≈ **474 batch**.
* Test: 5.050 / 32 ≈ **158 batch**.

Đã đủ nguyên liệu để train. Bài sau mình chạy **model lớn nhất từ đầu khóa**.
