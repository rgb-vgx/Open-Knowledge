---
title: 'Bài 288 — Dựng Vision Transformer feature extractor'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 288
status: edited
source: '288 - Creating a Vision Transformer Feature Extractor Model.md'
categories:
- AI
tags: []
---

# 🤖 Dựng Vision Transformer (ViT) feature extractor

> Nguồn: `288 - Creating a Vision Transformer Feature Extractor Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055230)

Thực nghiệm thứ hai: **ViT feature extractor**. Các bước giống hệt EfficientNet B2, chỉ khác tên head layer và con số `in_features`. Bài này dựng hàm `create_vit_model()` và kiểm tra số tham số — bạn sẽ thấy ViT "nặng" hơn EffNetB2 rất nhiều.

### 🧬 Chọn biến thể ViT

Trong `torchvision.models` có nhiều biến thể: **vit_b_16**, **vit_b_32**, **vit_l_16/l_32**, **vit_h_14**. Transcript dùng cách gọi "base / large / huge" để chỉ độ lớn:

| Biến thể | Tham số (xấp xỉ) |
|---|---|
| ViT Base | ~86 triệu |
| ViT Huge | ~633 triệu |

Model càng lớn, hiệu năng có thể tốt hơn nhưng **càng khó deploy** lên thiết bị. Ta chọn **ViT Base, patch size 16**.

### 🧱 Viết hàm

```python
import torch
import torchvision
from torch import nn

def create_vit_model(num_classes: int = 3,
                     seed: int = 42):
    """Tạo ViT-B/16 feature extractor, trả về (model, transforms)."""

    weights = torchvision.models.ViT_B_16_Weights.DEFAULT
    transforms = weights.transforms()
    model = torchvision.models.vit_b_16(weights=weights)

    # Đóng băng toàn bộ base layers
    for param in model.parameters():
        param.requires_grad = False

    # Thay head layer — với ViT tên là `heads`, không phải `classifier`
    torch.manual_seed(seed)
    model.heads = nn.Sequential(
        nn.Linear(in_features=768, out_features=num_classes)
    )

    return model, transforms
```

Điểm khác biệt then chốt so với EfficientNet B2:

* Head layer tên là **`heads`** (EffNetB2 dùng `classifier`).
* `in_features = 768` (EffNetB2 là 1408).
* Không cần thêm `Dropout` trong head như bản EffNetB2 ở transcript.

### 🔍 Kiểm tra model

```python
vit, vit_transforms = create_vit_model(num_classes=3, seed=42)
```

* **Transforms**: mean và standard deviation gần như — có thể là **giống hệt** — của EfficientNet B2, vì cả hai đều pretrained trên **ImageNet**. Kích thước ảnh đầu vào hơi khác (ViT-B/16 dùng 224×224), có thể chỉnh cho khớp nhưng tạm để nguyên.
* **Summary**: có layer **patchify** chia ảnh thành các patch, rồi chồng **encoder layers**, và cuối cùng là `heads`.
* **85,800,963 tổng tham số**, nhưng chỉ **~2,307 trainable** (`768 * 3 + 3`) — phần còn lại đã đóng băng.

### ⚖️ Feature extractor hay fine-tuning?

Vẫn nguyên tắc cũ: feature extractor thì đóng băng hết base layers. Fine-tuning thì mở một phần để model thích nghi — nhưng thường chỉ hiệu quả khi có **dataset lớn hơn nhiều**.

---

Có model rồi, bước tiếp theo là DataLoader cho ViT. Code gần như y hệt bản EffNetB2, chỉ đổi transforms — các bạn thử trước nhé.
