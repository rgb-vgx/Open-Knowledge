---
title: 'Bài 309 — Chuyển hàm tạo EffNetB2 thành script model.py'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 309
status: edited
source: '309 - Turning Our EffNetB2 Model Creation Function Into a Python Script.md'
categories:
- AI
tags: []
---

# 🐍 Viết `model.py`: tái sử dụng hàm tạo EffNetB2

> Nguồn: `309 - Turning Our EffNetB2 Model Creation Function Into a Python Script.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34106534)

Chào các bạn. `app.py` sắp tới cần một instance EffNetB2 đúng kiến trúc lúc train. Thay vì viết lại, mình chuyển hàm `create_effnetb2_model` vào `model.py` để import.

### 🧩 Vì sao phải tách thành script?

Trong notebook, hàm `create_effnetb2_model` đã có sẵn. Nhưng khi chạy trên Hugging Face Spaces, môi trường chỉ có các file trong thư mục app, không có notebook. Vì vậy mọi thứ `app.py` cần phải nằm trong file `.py` đi kèm. Đây chính là lý do mình biến logic thành hàm từ trước.

---

### ✍️ Ghi file bằng magic `%%writefile`

Jupyter/Colab có magic `%%writefile` để ghi nội dung cell ra file:

```python
%%writefile demos/food_vision_mini/model.py
import torch
import torchvision
from torch import nn


def create_effnetb2_model(num_classes: int = 3, seed: int = 42):
    """Tạo EffNetB2 feature extractor và transforms tương ứng."""
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

Điểm quan trọng: bên trong file phải **import đủ dependency** (`torch`, `torchvision`, `nn`), vì script chạy độc lập, không thừa hưởng import của notebook.

---

### 🔎 Kiểm tra file vừa tạo

Sau khi chạy cell, trong `demos/food_vision_mini/` xuất hiện `model.py`. Thử import lại từ đó:

```python
from demos.food_vision_mini import model

effnetb2_model, effnetb2_transforms = model.create_effnetb2_model()
```

Chạy không lỗi nghĩa là script hoạt động độc lập. Từ giờ `app.py` chỉ cần `from model import create_effnetb2_model` là đủ.

---

### 📌 Tổng kết các mảnh đã có

* `examples/` — xong.
* model `.pth` — xong.
* `model.py` — xong.
* `app.py` — chưa.
* `requirements.txt` — chưa.

---

`app.py` sẽ là file lớn nhất nhưng không có gì ghê gớm: chỉ gồm phần import + class names, chuẩn bị model/transforms, hàm `predict`, và app Gradio. Mình để các bạn thử trước — bài sau ráp hoàn chỉnh.
