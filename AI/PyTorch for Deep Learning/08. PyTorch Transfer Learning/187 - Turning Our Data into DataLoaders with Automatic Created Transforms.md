---
title: 'Tạo DataLoader với transform tự động'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 187
status: edited
source: '187 - Turning Our Data into DataLoaders with Automatic Created Transforms.md'
categories:
- AI
tags: []
---

# 🤖 Tạo DataLoader với transform tự động

> Nguồn: `187 - Turning Our Data into DataLoaders with Automatic Created Transforms.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33006512)

Chào các bạn! Video trước ta tự tay ghép một pipeline transform. Nó linh hoạt, nhưng có một nhược điểm: nếu transform sai so với cách model được train, hiệu năng giảm. Từ **torchvision 0.13**, có cách tạo transform **tự động** từ chính pretrained weights.

### 🆕 Multi-Weight API

Từ 0.13, torchvision có **Multi-Weight Support API**. Cái hay: bạn có thể dùng **nhiều bộ weight khác nhau cho cùng một kiến trúc**.

Ví dụ `ResNet50` có `IMAGENET1K_V1` (accuracy ~76%) và bộ weight mới (accuracy gần 81%) — chênh gần 5%.

Cách cũ trông như:

```python
model = torchvision.models.efficientnet_b0(pretrained=True)  # đã bị deprecated
```

Khi chạy, bạn sẽ thấy cảnh báo: **`pretrained` deprecated từ 0.13, sẽ bị xóa ở 0.15**, hãy dùng `weights`. Cách mới:

```python
weights = torchvision.models.EfficientNet_B0_Weights.DEFAULT
model = torchvision.models.efficientnet_b0(weights=weights).to(device)
```

Lưu ý: tham số tên là **`weights`** (số nhiều) — đây là lỗi chính tả rất dễ mắc, mình cũng từng viết nhầm thành `weight`.

### 🎯 `DEFAULT` nghĩa là gì?

`EfficientNet_B0_Weights.DEFAULT` tương đương **bộ weight tốt nhất hiện có** — với EfficientNet B0 là `IMAGENET1K_V1` (train trên 1000 class ImageNet).

Cũng có bộ `IMAGENET1K_V2`, `IMAGENET21K` (21.000 class) cho một số model. Nhờ API mới, khi có "recipe" weight tốt hơn ra đời, bạn chỉ cần đổi biến — không phải sửa cách khởi tạo.

### 🧪 Lấy transform tự động

```python
auto_transforms = weights.transforms()
print(auto_transforms)
```

Kết quả gần như:

```text
Compose(
    Resize(size=256, interpolation=bilinear, max_size=None, antialias=True)
    CenterCrop(size=(224, 224))
    ToTensor()
    Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
)
```

So với bản manual ta tự viết: chỉ khác là nó **resize về 256 rồi center crop 224**, thay vì resize thẳng 224. Phần normalize y hệt — cùng mean/std ImageNet.

Điểm đẹp: bạn chỉ cần nói *"dùng EfficientNet B0"*, và transform tương ứng **đi kèm** bộ weight. Cùng logic áp dụng cho mọi model khác (ConvNeXt, ViT...).

### 🧵 Tạo dataloader với auto transforms

```python
train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=auto_transforms,
    batch_size=32,
)
```

Chạy xong, ta nhận được train/test dataloader và class names — kết quả giống hệt bản manual ở video trước.

### 📌 Tổng kết hai cách

| Cách | Ưu điểm | Nhược điểm |
|---|---|---|
| Manual | Linh hoạt vô hạn, thêm gì cũng được | Sai là giảm hiệu năng |
| Automatic | Chuẩn xác theo đúng pretrained model | Ít tùy biến hơn |

### ✅ Chốt lại

Khi chuẩn bị dữ liệu cho pretrained model, điều cốt lõi là **transform giống cách model được train**. Với torchvision 0.13+, `weights.transforms()` làm việc đó thay bạn. Tài nguyên mở rộng: đọc mục *Models and pre-trained weights* khoảng 10–15 phút. Video sau ta bàn cách **chọn model**. Hẹn gặp!
