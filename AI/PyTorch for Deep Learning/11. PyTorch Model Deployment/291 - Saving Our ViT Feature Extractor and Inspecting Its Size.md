---
title: 'Bài 291 — Lưu ViT xuống file và sốc với kích thước 327MB'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 291
status: edited
source: '291 - Saving Our ViT Feature Extractor and Inspecting Its Size.md'
categories:
- AI
tags: []
---

# 💾 Lưu ViT và cú sốc 327MB

> Nguồn: `291 - Saving Our ViT Feature Extractor and Inspecting Its Size.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055233)

ViT đạt kết quả tốt hơn trên test set, nhưng có một cái giá: **file 327MB** so với 29.8MB của EfficientNet B2. Bài này lưu model, đo kích thước, và bắt đầu thấy rõ trade-off giữa hiệu năng và khả năng deploy.

### 💾 Lưu model

Vẫn dùng `utils.save_model`:

```python
from going_modular import utils

utils.save_model(
    model=vit,
    target_dir="models",
    model_name="09_pretrained_vit_feature_extractor_pizza_steak_sushi_20_percent.pth"
)
```

Tên file theo cùng pattern với EffNetB2 để dễ nhận diện. Trong thư mục `models/` giờ có cả hai model.

---

### 📏 Đo kích thước

```python
from pathlib import Path

vit_model_size = Path("models/09_pretrained_vit_feature_extractor_pizza_steak_sushi_20_percent.pth").stat().st_size

print(f"ViT feature extractor model size: {round(vit_model_size / 1e6, 2)}MB")
```

Kết quả: **327MB**.

| Model | Kích thước |
|---|---|
| EfficientNet B2 | 29.8 MB |
| ViT-B/16 | 327 MB |

---

### ⚠️ Vì sao chuyện này quan trọng?

ViT có **85.8 triệu tham số** so với 7.7 triệu của EffNetB2 — gấp hơn 11 lần, nên file cũng lớn hơn khoảng 11 lần. Dù hiệu năng nhỉnh hơn, **footprint lớn** có thể quyết định nơi ta deploy được:

* Nếu muốn Food Vision Mini chạy **nhanh trên mobile** hoặc **mobile web**, không thể dùng model quá lớn.
* Trên thiết bị nhỏ như **Raspberry Pi**, thậm chí có thể **không đủ chỗ lưu**, chứ chưa nói tới chạy.

Nếu có compute vô hạn, ta sẽ chọn model to nhất, tốt nhất. Nhưng tài nguyên hữu hạn thì kích thước phải nằm trong bài toán.

---

Còn một việc: gom stats của ViT giống hệt EffNetB2 — **test loss, test accuracy, số tham số, model size** — để lát so sánh trực tiếp. Bạn thử trước, bài sau mình làm cùng.
