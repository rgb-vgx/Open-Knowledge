---
title: 'Bài 324 — Tạo model.py cho Food Vision Big'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 324
status: edited
source: '324 - Turning Our EffNetB2 Feature Extractor Creation Function into a Python.md'
categories:
- AI
tags: []
---

# 🐍 `model.py` cho Food Vision Big: dùng lại gần như nguyên vẹn

> Nguồn: `324 - Turning Our EffNetB2 Feature Extractor Creation Function into a Python.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34126626)

Chào các bạn. Tin vui: `model.py` cho Food Vision Big gần như **y hệt** bản Food Vision Mini. Cùng một kiến trúc EffNetB2, chỉ khác `num_classes` truyền vào lúc gọi.

### ♻️ Copy file cũ

Mình copy nguyên file `demos/food_vision_mini/model.py` và đổi đường dẫn ghi thành `demos/food_vision_big/model.py`:

```python
%%writefile demos/food_vision_big/model.py
import torch
import torchvision
from torch import nn


def create_effnetb2_model(num_classes: int = 3, seed: int = 42):
    weights = torchvision.models.EfficientNet_B2_Weights.DEFAULT
    transforms = weights.transforms()
    model = torchvision.models.efficientnet_b2(weights=weights)

    for param in model.parameters():
        param.requires_grad = False

    torch.manual_seed(seed)
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features=1408, out_features=num_classes),
    )
    return model, transforms
```

Chỉ dòng `%%writefile` thay đổi. Thân file giữ nguyên vì hàm đã được viết linh hoạt với tham số `num_classes` — đây chính là lợi ích của việc tham số hoá ngay từ đầu.

---

### 🔍 Kiểm tra file

```bash
ls demos/food_vision_big/
```

Phải thấy `model.py` bên cạnh `class_names.txt`, `examples/`, file `.pth`.

---

### 🎯 Bước tiếp theo: `app.py`

Các bạn có thể thử tự viết `app.py` cho Food Vision Big dựa trên bản Mini. Có vài chỗ cần đổi:

* Đọc `class_names` từ `class_names.txt` thay vì hard-code list.
* Gọi `create_effnetb2_model(num_classes=101)`.
* Cập nhật `title`/`description`/`article`.
* Đổi số `num_top_classes` phù hợp.

Mình thích làm thẳng ra file `app.py` thay vì dựng demo trong notebook trước, vì đã quen quy trình. Bài sau mình viết cùng nhau và chỉ ra các điểm khác biệt so với bản Mini.
