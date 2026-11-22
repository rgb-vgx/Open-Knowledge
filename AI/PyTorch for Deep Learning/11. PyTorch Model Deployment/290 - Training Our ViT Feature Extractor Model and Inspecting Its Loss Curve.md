---
title: 'Bài 290 — Train ViT feature extractor và soi loss curves'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 290
status: edited
source: '290 - Training Our ViT Feature Extractor Model and Inspecting Its Loss Curve.md'
categories:
- AI
tags: []
---

# 🚀 Train ViT feature extractor và đọc loss curves

> Nguồn: `290 - Training Our ViT Feature Extractor Model and Inspecting Its Loss Curve.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055232)

Thực nghiệm số hai: train ViT feature extractor trên **cùng dataset**, **cùng 10 epochs** với EfficientNet B2 để so sánh công bằng. Kết quả thậm chí còn cao hơn: **~98.5% test accuracy**. Và loss curves trông như "textbook".

### 🧱 Cấu hình train

Giống hệt bản EffNetB2:

```python
from going_modular import engine
from torch import nn
import torch

optimizer = torch.optim.Adam(vit.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

torch.manual_seed(42)

results_vit = engine.train(
    model=vit,
    train_dataloader=train_dataloader_vit,
    test_dataloader=test_dataloader_vit,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=10,
    device=device
)
```

`torch.optim` có rất nhiều optimizer (trong package `torch.optim`), nhưng Adam vẫn là lựa chọn ổn định. Optimizer chỉ cập nhật **~2,300 tham số trainable** — phần còn lại đã pretrained trên ImageNet.

---

### ⏱️ Thời gian

Khoảng **5–6 giây/epoch**, tức chừng một phút cho 10 epoch — tương đương EffNetB2. Mình dùng Colab Pro với GPU Tesla P100 (16 GB VRAM); bản miễn phí vẫn train được, chỉ chậm hơn.

---

### 📈 Loss curves

```python
from helper_functions import plot_loss_curves

plot_loss_curves(results_vit)
```

Kết quả:

* Train loss và test loss **cùng giảm**, accuracy **tăng**.
* **Train loss hơi cao hơn test loss** — gợi ý rằng train lâu hơn có thể giảm test loss và tăng test accuracy nữa.

Hướng mở rộng đáng thử: train **20 epochs**, hoặc thêm **data augmentation**.

---

### 📊 So sánh nhanh hai candidate

| | EfficientNet B2 | ViT-B/16 |
|---|---|---|
| Test accuracy | ~97% | ~98.5% |
| Thời gian/epoch | ~6 giây | ~5–6 giây |
| Tổng tham số | 7.7M | 85.8M |

ViT chính xác hơn, nhưng nhiều tham số hơn khoảng 11 lần — chưa biết kích thước file và latency ra sao.

---

Model này rất đáng hài lòng. Bước tiếp theo giống hệt những gì đã làm với EffNetB2: **lưu model**, **đo kích thước**, **gom stats**. Bài sau bắt đầu từ việc save ViT và xem file nặng bao nhiêu.
