---
title: 'Baseline model (phần 1): nạp và transform dữ liệu'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 152
status: edited
source: '152 - Building a Baseline Model (Part 1)- Loading and Transforming Data.md'
categories:
- AI
tags: []
---

# 🧱 Baseline model (phần 1): nạp và transform dữ liệu

> Nguồn: `152 - Building a Baseline Model (Part 1)- Loading and Transforming Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32731658)

Đã đủ lý thuyết và dữ liệu — giờ build **model đầu tiên** cho custom dataset. Ta tái sử dụng kiến trúc **TinyVGG** (từ CNN Explainer, đã học ở section Computer Vision) và huấn luyện **baseline Model 0 không có data augmentation**. Sau này mới so sánh với model có augmentation. Bài này là bước chuẩn bị: transform đơn giản và hai DataLoader.

### 🎯 Chiến lược thí nghiệm

Ta sẽ so sánh hai model:

* **Model 0** — baseline, huấn luyện **không** data augmentation.
* **Model 1** (sau) — có data augmentation (ví dụ `TrivialAugmentWide`).

Làm baseline trước giúp ta có mốc để biết augmentation có thực sự giúp ích không. Kiến trúc vẫn là **TinyVGG** từ CNN Explainer: input **64×64×3**, qua các lớp conv/ReLU/max-pool, rồi output khớp số lớp — với ta là **3 lớp** pizza, steak, sushi (không phải 10 như bản gốc).

### 🔥 Transform đơn giản

```python
from torchvision import transforms

simple_transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
])
```

Chỉ resize về **64×64** (khớp input TinyVGG) rồi `ToTensor()` — pixel chuyển về khoảng **0–1**. Không có augmentation, đúng tinh thần baseline. Mình khuyên các bạn tự thử nạp dữ liệu trước khi xem tiếp.

### 📦 Nạp dữ liệu bằng ImageFolder

```python
from torchvision import datasets

train_data_simple = datasets.ImageFolder(root=train_dir, transform=simple_transform)
test_data_simple = datasets.ImageFolder(root=test_dir, transform=simple_transform)
```

Cả train và test dùng **cùng** `simple_transform`. (Tên biến có hậu tố `simple` để phân biệt với phiên bản augmentation về sau.)

### 🚚 Tạo DataLoader

```python
import os
from torch.utils.data import DataLoader

BATCH_SIZE = 32
NUM_WORKERS = os.cpu_count()

train_dataloader_simple = DataLoader(
    train_data_simple,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=NUM_WORKERS,
)

test_dataloader_simple = DataLoader(
    test_data_simple,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS,
)
```

`num_workers = os.cpu_count()` — Colab của mình thường có 2 CPU. `shuffle=True` cho train, `False` cho test.

### ✅ Tạm kết

Nhìn lại sẽ thấy: sau khi dữ liệu đã đúng format, việc nạp rất nhanh — tạo transform, nạp bằng `ImageFolder`, bọc `DataLoader` là xong. Giờ đã sẵn sàng cho model. Mình khuyên các bạn thử tự viết lại TinyVGG (đã làm ở notebook 3), hoặc xem bài sau mình dựng cùng.
