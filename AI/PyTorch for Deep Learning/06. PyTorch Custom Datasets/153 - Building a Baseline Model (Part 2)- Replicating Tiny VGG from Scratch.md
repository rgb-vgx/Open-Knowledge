---
title: 'Baseline model (phần 2): tái tạo TinyVGG từ đầu'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 153
status: edited
source: '153 - Building a Baseline Model (Part 2)- Replicating Tiny VGG from Scratch.md'
categories:
- AI
tags: []
---

# 🧠 Baseline model (phần 2): tái tạo TinyVGG từ đầu

> Nguồn: `153 - Building a Baseline Model (Part 2)- Replicating Tiny VGG from Scratch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32738160)

Bài này mình dựng lại class **TinyVGG** từ đầu, lần này đầu vào là ảnh **màu 3 channel** (khác bản cũ dùng ảnh đen trắng). Một điểm hay: ta tạm để hệ số `in_features` của lớp Linear là `hidden_units` rồi **cố tình để nó lỗi** — lỗi sẽ tự "mách" shape đúng. Cuối bài cũng nhắc tới **operator fusion**.

### 🧬 Class TinyVGG

```python
import torch
from torch import nn

class TinyVGG(nn.Module):
    """Model architecture copying TinyVGG from CNN Explainer."""
    def __init__(self, input_shape: int, hidden_units: int, output_shape: int) -> None:
        super().__init__()
        self.conv_block_1 = nn.Sequential(
            nn.Conv2d(in_channels=input_shape, out_channels=hidden_units,
                      kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.Conv2d(in_channels=hidden_units, out_channels=hidden_units,
                      kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        self.conv_block_2 = nn.Sequential(
            nn.Conv2d(in_channels=hidden_units, out_channels=hidden_units,
                      kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.Conv2d(in_channels=hidden_units, out_channels=hidden_units,
                      kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(in_features=hidden_units, out_features=output_shape),
        )

    def forward(self, x):
        x = self.conv_block_1(x)
        print(x.shape)
        x = self.conv_block_2(x)
        print(x.shape)
        x = self.classifier(x)
        return x
```

### 🔍 Vài điểm cần nắm

* **`conv_block_1`** — `Conv2d(input → hidden, kernel=3, stride=1, padding=1)` ×2, kèm `ReLU`, kết bằng `MaxPool2d(kernel_size=2, stride=2)`. Với MaxPool, **stride mặc định bằng kernel size**.
* **`conv_block_2`** — copy block 1, chỉ đổi `in_channels` đầu vào thành `hidden_units` (để khớp output của block trước).
* **`classifier`** — `Flatten()` để duỗi output các conv block thành **feature vector**, rồi `Linear`.
* **`in_features=hidden_units`** — đây là chỗ **cố tình sai**. Shape thật sau hai lần max-pool (64→32→16) là `hidden_units × 16 × 16`, không phải `hidden_units`. Ta để tạm rồi để `forward` báo lỗi cho biết shape đúng — cách sửa shape "programmatic" mình thích hơn tính tay.

### 🏗️ Khởi tạo Model 0

```python
model_0 = TinyVGG(
    input_shape=3,              # số color channels
    hidden_units=10,
    output_shape=len(class_names),  # 3 lớp
).to(device)
```

`input_shape=3` vì ảnh màu; `output_shape` = số lớp = **3**; `hidden_units=10` (có thể thử 100 hoặc 64 — bội số của 8). Chuyển model lên `device` (CUDA) mất vài giây — bình thường với model lớn.

### ⚡ Operator fusion là gì?

Có thể viết gọn `forward` bằng:

```python
return self.classifier(self.conv_block_2(self.conv_block_1(x)))
```

Cách này tương đương nhưng hưởng lợi từ **operator fusion**: GPU gộp các phép tính lại, giảm việc đi đi lại lại giữa **memory** và **compute** (thay vì gán lại `x` sau mỗi lớp). Chủ đề này ngoài phạm vi khóa; ai muốn đọc thêm thì tìm blog *"How to make your GPUs go BRRR from first principles"* (BR = nhanh).

### ✅ Tạm kết

Kiến trúc đã dựng xong, nhưng khả năng cao `in_features` đang sai. Cách kiểm tra tốt nhất: đẩy một batch **dummy data** qua model và đọc shape ở từng lớp — lỗi sẽ chỉ ra chỗ cần sửa. Đó chính là nội dung bài sau. Hẹn các bạn ở đó.
