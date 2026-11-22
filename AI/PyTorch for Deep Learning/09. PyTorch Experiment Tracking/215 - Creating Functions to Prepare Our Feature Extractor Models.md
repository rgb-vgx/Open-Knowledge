---
title: 'Viết hàm tạo feature extractor cho EfficientNet-B0 và B2'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 215
status: edited
source: '215 - Creating Functions to Prepare Our Feature Extractor Models.md'
categories:
- AI
tags: []
---

# 🏗️ Viết hàm tạo feature extractor cho EfficientNet-B0 và B2

> Nguồn: `215 - Creating Functions to Prepare Our Feature Extractor Models.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33120486)

How did you go? Bạn đã viết hai hàm tạo feature extractor EfficientNet-B0 và B2 chưa? Cùng làm và so code nhé. Ta có hai data loader (10% và 20%), giờ cần hai hàm, mỗi hàm trả về một feature extractor với **backbone frozen** và **classifier head custom**.

### 🎯 Hai hàm, một ý tưởng

* **Hàm 1** — `create_effnetb0()`: EfficientNet-B0, freeze base layer, đổi classifier thành 3 lớp.
* **Hàm 2** — `create_effnetb2()`: y hệt, chỉ khác kiến trúc B2.

Model mặc định có **1000 output class** (ImageNet); ta cần **3** (pizza/steak/sushi).

---

### 🧪 Trước tiên: khám phá B2

Để hiểu B2 khác B0 chỗ nào, mình tạo thử:

```python
effnetb2_weights = torchvision.models.EfficientNet_B2_Weights.DEFAULT
effnetb2 = torchvision.models.efficientnet_b2(weights=effnetb2_weights)
```

`DEFAULT` = best available (đúng tài liệu torchvision, phiên bản 0.13+). Cấu trúc B2 giống B0: `features` (nhiều layer), `avgpool` (biến feature tensor thành **feature vector**), và `classifier` head.

Điểm khác: B2 là bản **scale up** của B0 nên `features` cuối có **1408** giá trị (B0 là **1280**), và dropout cao hơn một chút để chống overfitting. Quy luật chung: cùng một dòng model tên na ná nhau (B0, B1, B2...) thường chỉ là cùng kiểu kiến trúc được scale lên — nhiều layer/parameter hơn.

> Bài học quan trọng: khi đổi model, phải chắc **input/output shape khớp** ở mọi layer, kể cả layer cuối. Lệch là lỗi shape ngay.

---

### 🏗️ Viết hàm `create_effnetb0`

```python
from torch import nn

def create_effnetb0():
    weights = torchvision.models.EfficientNet_B0_Weights.DEFAULT
    model = torchvision.models.efficientnet_b0(weights=weights).to(device)

    # Freeze base layers
    for param in model.features.parameters():
        param.requires_grad = False

    # Đổi classifier head
    set_seeds()
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.2, inplace=True),
        nn.Linear(in_features=1280, out_features=len(class_names), bias=True)
    ).to(device)

    model.name = "effnetb0"
    print(f"[INFO] Created new {model.name} model.")
    return model
```

Các ý chính:

* Lấy weights `DEFAULT`, tạo model với `weights=weights`.
* Freeze **chỉ `model.features`** (không phải mọi layer) bằng `requires_grad = False`.
* Set seed trước khi tạo `Linear` vì layer mới khởi tạo ngẫu nhiên.
* Gán `model.name` để tiện track model trong experiment.

Gọi `create_effnetb0()` rồi `summary(...)` thấy base layer frozen, chỉ classifier trainable — tổng khoảng **4 triệu** tham số và **dưới 4000** trainable.

---

### 🏗️ Viết hàm `create_effnetb2`

Y hệt, chỉ đổi ba chỗ: `EfficientNet_B2_Weights`, `efficientnet_b2`, và **`in_features=1408`**.

Nếu quên đổi `in_features` từ 1280 sang 1408, `torchinfo` sẽ báo lỗi kiểu **1408 và 1280 không nhân được** — đúng như mình cố ý thử để bạn thấy. Sửa thành 1408 là chạy ngon.

Sau khi sửa, summary B2 cho thấy:

* Tổng khoảng **7,7-7,8 triệu** tham số (gần gấp đôi B0).
* Khoảng **4000** (hơn một chút) trainable.
* Feature vector của classifier là **1408** thay vì 1280.

---

### ✅ Tạm kết

Mảnh ghép cuối đã xong: hai data loader (10%/20%), hai hàm tạo model (B0/B2), và số epoch thì chỉ là tham số truyền vào `train`. Vậy là đủ nguyên liệu để chạy loạt experiment. Video sau ta viết code chạy tất cả cùng lúc và track bằng TensorBoard. Bạn thử trước nhé — hẹn gặp!
