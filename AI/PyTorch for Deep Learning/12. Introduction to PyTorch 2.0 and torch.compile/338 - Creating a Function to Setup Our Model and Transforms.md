---
title: 'Bài 338 — Hàm tạo ResNet50 và transforms dùng chung'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 338
status: edited
source: '338 - Creating a Function to Setup Our Model and Transforms.md'
categories:
- AI
tags: []
---

# 🏗️ Viết hàm `create_model` để tái dùng cho mọi thực nghiệm

> Nguồn: `338 - Creating a Function to Setup Our Model and Transforms.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745226)

Video trước ta đã chốt bốn thực nghiệm, cùng model, data, batch size và image size; chỉ khác ở single/multi run và có/không `torch.compile`. Giờ mình dựng phần **tạo model và transforms**. Mục tiêu là gói gọn mọi thứ vào **một hàm**, để chạy nhiều thực nghiệm mà không phải lặp code.

### 🏛️ Chọn ResNet50 và Weights API

Ta lấy `resnet50` từ `torchvision.models`. Danh sách model pre-trained có sẵn rất dài; mình chọn ResNet50 vì đây là "ông tổ" của computer vision, đã được thử thách kỹ.

Với **Weights API** của torchvision (bản 0.14 trở lên), mình chọn bộ trọng số:

```python
from torchvision.models import resnet50, ResNet50_Weights

model_weights = ResNet50_Weights.IMAGENET1K_V2
# hoặc ResNet50_Weights.DEFAULT — bộ tốt nhất hiện có
```

### 🖼️ Transforms đi kèm weights

Một điểm quan trọng: **transforms đi kèm luôn với weights**. Đây là các phép biến đổi cần áp lên ảnh để tiền xử lý đúng với cách model được train. Nếu dùng model pre-trained, dữ liệu của các bạn phải được transform **giống hệt** lúc train (như đã bàn ở phần transfer learning).

```python
transforms = model_weights.transforms()
model = resnet50(weights=model_weights)
```

Lần đầu chạy sẽ **tải weights** về. Xong là ta có một ResNet50 hoàn chỉnh chỉ trong vài dòng.

### 🔢 Đếm tham số: 25 triệu

Mình đếm số parameter để thấy model lớn cỡ nào:

```python
total_params = sum(p.numel() for p in model.parameters())
print(total_params)  # 25,557,032
```

`p.numel()` = number of elements. Nếu chỉ muốn đếm tham số **trainable** (sau khi freeze bớt):

```python
sum(p.numel() for p in model.parameters() if p.requires_grad)
```

ResNet50 có **25.557.032 tham số**. Vì sao lại đếm? Vì mức tăng tốc của PyTorch 2.0 **rõ nhất khi dùng càng nhiều GPU càng tốt** — tức model càng lớn, nhiều tham số trainable thì **tăng tốc tương đối** càng đáng thấy.

### 🚀 Vì sao model lớn không train chậm gấp 25 lần?

Đây là chỗ hay: model 1 triệu tham số train mất, ví dụ, **10 phút**. Model 25 triệu tham số không mất 25 × 10 = 250 phút, mà có thể chỉ **20 phút** (mình bịa số để minh họa). Vì GPU giỏi **parallel computing** — nhiều phép tính chạy đồng thời. Dù làm gấp 25 lần phép tính, chúng xảy ra song song, nên tăng tốc tương đối mới lộ ra.

### 🧰 Gói thành hàm `create_model`

Để khỏi viết lại code cho từng thực nghiệm:

```python
import torch
import torchvision
from torchvision.models import resnet50, ResNet50_Weights

def create_model(num_classes=10):
    """Tạo ResNet50 với transforms, trả về cả hai."""
    model_weights = ResNet50_Weights.DEFAULT
    transforms = model_weights.transforms()
    model = resnet50(weights=model_weights)

    # Đổi lớp head cho đúng số class của CIFAR10
    model.fc = torch.nn.Linear(in_features=2048, out_features=num_classes)
    return model, transforms
```

Vì sao `num_classes=10`? Vì **CIFAR10 có 10 lớp**: airplane, automobile, bird, cat, dog, frog, horse, ship, truck... (đủ 10). Đổi dataset thì chỉnh số này.

Lưu ý về lớp cuối: ở ResNet50 nó tên là **`fc`** (fully connected). Model khác có thể đặt tên khác như `classifier` hay `head`. Vì pre-trained trên ImageNet, lớp này mặc định có **1000 output feature**; ta thay bằng `Linear(2048, num_classes)` — **2048** là số feature đầu vào giữ nguyên.

```python
model, transforms = create_model()
```

Chạy thử, transforms sẽ crop, resize và chuẩn hóa phân phối ảnh như mong đợi.

---

Hàm đã sẵn sàng. Video sau, mình bàn kỹ hơn về **tăng tốc tương đối** và tiếp tục dựng thực nghiệm.
