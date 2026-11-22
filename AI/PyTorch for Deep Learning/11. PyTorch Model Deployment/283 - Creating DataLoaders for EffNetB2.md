---
title: 'Bài 283 — Tạo DataLoader cho EfficientNet B2'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 283
status: edited
source: '283 - Creating DataLoaders for EffNetB2.md'
categories:
- AI
tags: []
---

# 📦 Tạo DataLoader cho EfficientNet B2

> Nguồn: `283 - Creating DataLoaders for EffNetB2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055225)

Đây có lẽ là bài ngắn nhất section — vì code đã có sẵn trong script `data_setup.py` từ section going modular. Chỉ cần gọi đúng hàm, truyền đúng transforms, là có DataLoader cho cả train lẫn test.

### 📂 Dùng lại `create_dataloaders`

Hàm `create_dataloaders` nằm trong `going_modular/data_setup.py`, được viết từ trước và đã dùng nhiều lần. Nó nhận:

* `train_dir`
* `test_dir`
* `transform` — lưu ý tên tham số là **`transform`** (số ít), không phải `transforms`.
* `batch_size` — giữ **32**.

```python
from going_modular import data_setup

train_dataloader_effnetb2, test_dataloader_effnetb2, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=effnetb2_transforms,
    batch_size=32
)
```

### ✅ Kiểm tra nhanh

* `len(train_dataloader_effnetb2)` → khoảng **15 batch** (32 mẫu/batch).
* `len(test_dataloader_effnetb2)` → khoảng **5 batch**.
* `class_names` → `['pizza', 'steak', 'sushi']`.

Khớp là ổn. Nếu sai tên tham số, Python sẽ báo ngay — cứ "if in doubt, try it out".

### 🎯 Chuyện gì tiếp theo?

DataLoader xong rồi thì đến lúc train EfficientNet B2 feature extractor. Bạn sẽ cần:

1. Một **loss function**.
2. Một **optimizer**.
3. Một **training function** — gợi ý: nằm trong `engine.py`.

---

Toàn bộ phần còn lại của section này sẽ tăng tốc, vì ta đã quá quen với các bước train. Bài sau mình train candidate đầu tiên cho Food Vision Mini.
