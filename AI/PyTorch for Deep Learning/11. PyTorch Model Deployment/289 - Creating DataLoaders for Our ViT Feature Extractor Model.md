---
title: 'Bài 289 — Tạo DataLoader cho ViT feature extractor'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 289
status: edited
source: '289 - Creating DataLoaders for Our ViT Feature Extractor Model.md'
categories:
- AI
tags: []
---

# 📦 Tạo DataLoader cho ViT feature extractor

> Nguồn: `289 - Creating DataLoaders for Our ViT Feature Extractor Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055231)

Bài ngắn thôi: dùng lại `create_dataloaders` như với EfficientNet B2, nhưng lần này truyền **`vit_transforms`** thay vì `effnetb2_transforms`. Điểm mấu chốt chỉ nằm ở transforms.

### 🎯 Điều duy nhất cần chú ý

Khi đưa dữ liệu custom vào model pretrained, dữ liệu phải **cùng định dạng** với lúc model gốc được train. Với ViT, đó là `vit_transforms`.

```python
from going_modular import data_setup

train_dataloader_vit, test_dataloader_vit, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=vit_transforms,
    batch_size=32
)
```

`batch_size=32` giữ nguyên — "our trusty old 32". Bạn có thể thử giá trị khác, nhưng đây là mặc định hợp lý.

### ✅ Kiểm tra

* `len(train_dataloader_vit)` — số batch train.
* `len(test_dataloader_vit)` — số batch test.
* `class_names` — `['pizza', 'steak', 'sushi']`.

### 🔁 Khác biệt so với bản EffNetB2

Kết quả **giống hệt** DataLoader của EfficientNet B2, vì cùng dataset và cùng batch size. Khác biệt duy nhất nằm ở chỗ dữ liệu được biến đổi bằng **ViT transforms**, không phải EffNetB2 transforms.

---

Vậy là đủ để train. Thử thách cho bạn: chạy tiếp đến khi có **loss curves** cho ViT trước khi xem bài sau. Mình sẽ làm cùng nhau ở video tiếp theo.
