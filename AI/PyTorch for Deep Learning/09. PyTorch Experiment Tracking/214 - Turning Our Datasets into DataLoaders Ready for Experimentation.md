---
title: 'Biến dataset thành DataLoader sẵn sàng thí nghiệm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 214
status: edited
source: '214 - Turning Our Datasets into DataLoaders Ready for Experimentation.md'
categories:
- AI
tags: []
---

# 🧺 Biến dataset thành DataLoader sẵn sàng thí nghiệm

> Nguồn: `214 - Turning Our Datasets into DataLoaders Ready for Experimentation.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33120484)

How did you go? Bạn đã biến hai dataset thành DataLoader chưa? Cùng làm nhé. Ta sẽ transform và tạo DataLoader cho cả bộ 10% lẫn 20%, dùng chung một test set.

### 🔄 Transform dữ liệu cho model pretrained

Vì dùng **EfficientNet-B0 và B2** (train trên ImageNet), dữ liệu custom phải cùng format:

1. **Resize** ảnh về `224×224`.
2. Đưa giá trị tensor về khoảng **0-1** (enter `ToTensor`).
3. **Normalize** để cùng phân phối dữ liệu với ImageNet.

Lưu ý: điều này đúng cho **mọi loại dữ liệu** khi dùng pretrained model — text, audio cũng vậy.

```python
from torchvision import transforms

simple_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])
```

Ta dùng transform **thủ công** cho nhất quán, dù có thể dùng automatic.

### 📁 Dựng đường dẫn dữ liệu

```python
train_dir_10_percent = data_10_percent_path / "train"
train_dir_20_percent = data_20_percent_path / "train"

# Chỉ cần một test dir, dùng chung cho mọi experiment
test_dir = data_10_percent_path / "test"
```

Vì mọi experiment dùng **cùng một test set**, ta chỉ cần `test_dir` từ bộ 10%. Điều này giữ việc đánh giá **nhất quán** — nếu mỗi experiment một test set thì không biết thay đổi nào mang lại lợi ích.

In ra kiểm tra đường dẫn: `...10%/train`, `...20%/train`, `.../test` — khớp.

### 🧺 Tạo DataLoader

```python
batch_size = 32

train_dataloader_10_percent, test_dataloader, class_names = \
    data_setup.create_dataloaders(
        train_dir=train_dir_10_percent,
        test_dir=test_dir,
        transform=simple_transform,
        batch_size=batch_size)

train_dataloader_20_percent, test_dataloader, class_names = \
    data_setup.create_dataloaders(
        train_dir=train_dir_20_percent,
        test_dir=test_dir,
        transform=simple_transform,
        batch_size=batch_size)
```

Cả hai đều trả về `test_dataloader` giống nhau (cùng `test_dir`). Dùng `batch_size=32` chung.

### 🔢 Kiểm tra số batch

```python
print(f"Số batch (size {batch_size}) trong 10% train: {len(train_dataloader_10_percent)}")
print(f"Số batch (size {batch_size}) trong 20% train: {len(train_dataloader_20_percent)}")
print(f"Số batch (size {batch_size}) trong test: {len(test_dataloader)}")
print(f"Class names: {class_names}")
```

Kết quả:

* 10% train: **8 batch**.
* 20% train: **15 batch** — gần gấp đôi (không đúng gấp đôi vì 32 có thể không chia hết số mẫu, nhưng đủ tốt).
* test: **3 batch**.
* Class names: `['pizza', 'steak', 'sushi']`.

### ✅ Tạm kết

Dữ liệu đã sẵn sàng. Bước tiếp theo: tạo **hai hàm** trả về feature extractor cho **EfficientNet-B0** và **EfficientNet-B2**. Vì sao hàm? Để mỗi experiment khởi tạo một **instance model mới** (chưa train), chứ không train tiếp model từ experiment trước. Bạn thử viết một hàm cho B0 và một cho B2 nhé — video sau ta làm cùng nhau. Hẹn gặp!
