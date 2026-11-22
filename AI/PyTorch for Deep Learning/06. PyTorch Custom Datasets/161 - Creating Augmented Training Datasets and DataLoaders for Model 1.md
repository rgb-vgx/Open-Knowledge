---
title: 'Tạo dataset và DataLoader có augmentation cho Model 1'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 161
status: edited
source: '161 - Creating Augmented Training Datasets and DataLoaders for Model 1.md'
categories:
- AI
tags: []
---

# 🎛️ Tạo dataset và DataLoader có augmentation cho Model 1

> Nguồn: `161 - Creating Augmented Training Datasets and DataLoaders for Model 1.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32753924)

Giờ là thí nghiệm thứ hai: **Model 1** — cùng TinyVGG nhưng có **data augmentation** (`TrivialAugmentWide`) trên tập train. Mình thẳng thắn nói trước: đây chưa phải thí nghiệm lý tưởng, vì Model 0 có vẻ đang **underfitting** chứ không phải overfitting — mà augmentation vốn để chống overfit. Nhưng cứ thử, vì thí nghiệm là vậy.

### 🧪 Vì sao vẫn thử augmentation?

Data augmentation giúp model học pattern **tổng quát hóa** bằng cách làm tập train khó hơn (xoay, đổi màu, dịch ảnh...) mà không cần thêm dữ liệu thật. Tất nhiên nó không phải "viên đạn bạc" — có lúc giúp, có lúc không.

### 🔥 Transform cho train (có augmentation)

```python
from torchvision import transforms

train_transform_trivial = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.TrivialAugmentWide(num_magnitude_bins=31),
    transforms.ToTensor(),
])
```

`num_magnitude_bins=31` (mặc định) — augmentation áp ở cường độ **ngẫu nhiên 0–31**. Hạ về `5` thì mức biến đổi nhẹ hơn nhiều.

### 🔥 Transform cho test (không augmentation)

```python
test_transform_simple = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
])
```

Test **không** augmentation — ta chỉ đánh giá, không tạo pattern mới từ tập test. Mọi augmentation chỉ dành cho train.

### 📦 Tạo dataset và DataLoader

```python
train_data_augmented = datasets.ImageFolder(root=train_dir, transform=train_transform_trivial)
test_data_simple = datasets.ImageFolder(root=test_dir, transform=test_transform_simple)

BATCH_SIZE = 32
NUM_WORKERS = os.cpu_count()

torch.manual_seed(42)

train_dataloader_augmented = DataLoader(
    train_data_augmented,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=NUM_WORKERS,
)

test_dataloader_simple = DataLoader(
    test_data_simple,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS,
)
```

Điểm khác duy nhất so với lần trước: train dataloader dùng transform **có** `TrivialAugmentWide`, test dataloader dùng transform **simple**. `NUM_WORKERS = os.cpu_count()` — một worker mỗi CPU. `torch.manual_seed(42)` trước khi `shuffle=True` để tái lập thứ tự.

Lúc chạy mình gõ sai tên biến (`train_transform_trivial` thành `train_transform...`) nên Colab báo lỗi — sửa xong là được.

### ✅ Tạm kết

Ta đã có cặp dataset + dataloader mới: train **có augmentation**, test **simple**. Thử thách bài sau: tạo `model_1` bằng class TinyVGG rồi train bằng hàm `train` với `train_dataloader_augmented` và `test_dataloader_simple`. Các bạn thử trước nhé, bài sau mình làm cùng.
