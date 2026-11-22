---
title: 'Biến dataset thành DataLoader để batch dữ liệu'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 144
status: edited
source: '144 - Turning Our Image Datasets into PyTorch Dataloaders.md'
categories:
- AI
tags: []
---

# 🚚 Biến dataset thành DataLoader để batch dữ liệu

> Nguồn: `144 - Turning Our Image Datasets into PyTorch Dataloaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32714692)

Đây là lời giải cho thử thách bài trước: biến `train_data`/`test_data` thành `DataLoader`. `DataLoader` giúp biến dataset thành dạng **iterable** và **batched** — model thấy `batch_size` ảnh một lần thay vì cả dataset. Bài này cũng giải thích vì sao batch lại quan trọng và tham số `num_workers` nghĩa là gì.

### 🧠 Vì sao phải batch?

Nhớ lại dataset Food 101 có tới **100.000 ảnh**. Nếu nạp hết một lượt vào bộ nhớ, khả năng cao **hết RAM/VRAM**. GPU mình đang dùng (Tesla T4, 16GB) không kham nổi 100.000 ảnh cùng lúc với một model nặng. Vì vậy ta **batchify**: cho model xem **32 ảnh một lần**, tận dụng bộ nhớ vừa phải mà không bị tràn.

Điều này áp dụng cho **mọi loại dữ liệu** trong PyTorch — ảnh, text, audio — không riêng gì ảnh.

---

### 🔥 Tạo DataLoader

```python
import os
from torch.utils.data import DataLoader

BATCH_SIZE = 32

train_dataloader = DataLoader(
    train_data,
    batch_size=BATCH_SIZE,
    num_workers=1,  # hoặc os.cpu_count()
    shuffle=True,
)

test_dataloader = DataLoader(
    test_data,
    batch_size=BATCH_SIZE,
    num_workers=1,
    shuffle=False,
)
```

Vài điểm cần nắm:

* **`batch_size`** — số mẫu mỗi batch. Mình bắt đầu với `1` để dễ thấy shape, rồi đổi sang `32`.
* **`num_workers`** — số **CPU core** dùng để nạp dữ liệu. Càng nhiều thường càng tốt; `os.cpu_count()` đếm số CPU của máy. Colab thường có 2 CPU, máy local có thể nhiều hơn.
* **`shuffle=True`** cho train — để model không học thuộc **thứ tự** dữ liệu.
* **`shuffle=False`** cho test — để khi đánh giá, dữ liệu luôn cùng một thứ tự.

---

### 📏 Độ dài DataLoader thay đổi theo batch

Với `batch_size=1`, `len(train_dataloader)` bằng số mẫu dataset. Với `batch_size=32`:

* Train: khoảng **8 batch** (225 ÷ 32 ≈ 7, dư nên làm tròn thành 8).
* Test: khoảng **3 batch**.

Các con số được làm tròn khi có batch lẻ.

---

### 🔍 Shape sau khi qua DataLoader

`DataLoader` **thêm một chiều batch** vào đầu:

```python
for image, label in train_dataloader:
    print(f"Image shape: {image.shape}")
    print(f"Label shape: {label.shape}")
    break
```

Với `batch_size=1`: image shape `[1, 3, 64, 64]`, label shape `[1]`. Với `batch_size=32`: image shape `[32, 3, 64, 64]`, label shape `[32]` — tức mỗi batch có **32 ảnh** đi kèm **32 nhãn**.

---

### ✅ Tạm kết

Vậy là ta đã đi hết chuỗi: tải custom dataset → nạp bằng `ImageFolder` → transform thành tensor → batch bằng `DataLoader`. Các bạn hoàn toàn có thể dựng luôn một CNN để tìm pattern trong tensor ảnh. Nhưng bài sau, mình giả vờ **không có** `ImageFolder` — tự viết một class nạp dữ liệu thay thế, để hiểu bản chất. Hẹn các bạn ở bài sau.
