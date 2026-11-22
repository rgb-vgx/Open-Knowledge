---
title: 'Bài 282 — Viết hàm create_effnetb2_model()'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 282
status: edited
source: '282 - Create a Function to Make an EffNetB2 Feature Extractor Model and Tran.md'
categories:
- AI
tags: []
---

# 🧩 Gói mọi bước vào hàm `create_effnetb2_model()`

> Nguồn: `282 - Create a Function to Make an EffNetB2 Feature Extractor Model and Tran.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055224)

Bài tập của bài trước là biến các bước tạo EfficientNet B2 feature extractor thành một hàm. Đây là câu trả lời của mình — hàm nhận số class, trả về **transforms** và **model**, dùng lại được cho bất kỳ bài toán nào.

### 🔁 Vì sao phải đóng gói thành hàm?

Vì ta sẽ tạo model này nhiều lần: lúc train, lúc tạo bản sao để kiểm tra, lúc export sang script deploy. Viết một lần, gọi nhiều lần — đúng tinh thần **going modular**.

### 🛠️ Viết hàm

```python
import torch
import torchvision
from torch import nn

def create_effnetb2_model(num_classes: int = 3,
                          seed: int = 42):
    """Tạo EfficientNetB2 feature extractor, trả về (model, transforms)."""

    # 1, 2, 3: lấy weights, transforms và model pretrained
    weights = torchvision.models.EfficientNet_B2_Weights.DEFAULT
    transforms = weights.transforms()
    model = torchvision.models.efficientnet_b2(weights=weights)

    # 4: đóng băng toàn bộ base layers
    for param in model.parameters():
        param.requires_grad = False

    # 5: thay classifier head
    torch.manual_seed(seed)
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features=1408, out_features=num_classes, bias=True)
    )

    return model, transforms
```

`num_classes` mặc định 3 cho pizza/steak/sushi nhưng có thể chỉnh khi dùng cho bài khác. Seed 42 giúp tái lập kết quả ở mức tối đa có thể.

### 📸 Kiểm tra output

```python
effnetb2, effnetb2_transforms = create_effnetb2_model(num_classes=3, seed=42)
```

* **`effnetb2_transforms`** — crop, resize, mean và standard deviation đúng như khi pretrained model được train. Mọi ảnh đi qua model đều phải qua bộ này.
* **`summary(effnetb2, input_size=(1, 3, 224, 224))`** — base layers `False` (frozen), chỉ head `True`, tổng **4,227 trainable parameters**, đúng như kỳ vọng.

### 🎓 Feature extractor vs fine-tuning

Một câu hỏi nhanh: khác nhau ở đâu?

* **Feature extractor** — **đóng băng toàn bộ** base layers, chỉ train phần head.
* **Fine-tuning** — **không đóng băng hết**, mở một số layer trong base để model thích nghi thêm với dữ liệu mới.

Chỉ một dòng `requires_grad = False` là đủ chuyển từ fine-tuning sang feature extractor.

---

Đã có model tạo trong vài giây, đã có dataset. Bước tiếp theo: biến dữ liệu thành **DataLoader**. Các bạn thử trước nhé, không thì bài sau làm cùng.
