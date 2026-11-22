---
title: 'Bài 119 — Tự viết custom Image Dataset loader và sử dụng'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 119
status: edited
source: '119 - Defining custom Image Dataset loader and usage.md'
categories:
- AI
tags: []
---

# 📷 Custom Image Dataset: nạp ảnh phi cấu trúc bằng PyTorch

> Nguồn: `119 - Defining custom Image Dataset loader and usage.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49093839)

Chào các bạn! Bài trước mình làm DataLoader cho dữ liệu số có cột, có hàng. Lần này mình xử lý thứ khó hơn nhiều: **ảnh** — dữ liệu phi cấu trúc không có CSV, không có header. Mình sẽ tự viết một `ImageDataset` để biến cấu trúc thư mục thành cặp `(ảnh, nhãn)`.

### 🗂️ Cấu trúc thư mục thay cho bảng dữ liệu

Bộ dữ liệu của mình tên `classification_dataset_v3`, cấu trúc:

```text
classification_dataset_v3/
└── images/
    ├── train/
    │   ├── cat/    → cat_0001.jpeg, ...
    │   ├── dog/    → dog_0001.jpeg, ...
    │   └── person/ → person_0001.jpeg, ...
    └── test/
        ├── cat/
        ├── dog/
        └── person/
```

Dataset được mình ghép từ hai nguồn Kaggle: **cat vs dog** và **human images** (gộp man + woman thành lớp **person**), sau đó làm sạch và giữ lại ba lớp **cat, dog, person**.

### 🧠 Vì sao ảnh cần xử lý riêng

Với dữ liệu số, `x1..x6` chính là feature và cột `target` là nhãn — rõ ràng ngay khi đọc DataFrame. Với ảnh thì folder chỉ cho biết **feature là ảnh**, nhưng nhãn phải suy ra từ **tên thư mục cha**. Model không hiểu "cat/dog/person", nó chỉ hiểu **index 0, 1, 2**. Vì vậy trước khi train, mình phải tự tạo cấu trúc `(image_path, label)` từ folder.

Ảnh được nạp qua **PIL** hoặc OpenCV thành numpy array (grayscale hoặc RGB). Model sẽ nhận numpy/tensor và trả về index lớp.

### 🏗️ ImageDataset với ba phương thức

```python
import os
from PIL import Image
from torchvision import transforms
from torch.utils.data import Dataset, DataLoader

class ImageDataset(Dataset):
    def __init__(self, image_dir, transform=None):
        self.image_dir = image_dir
        self.image_paths = []
        self.labels = []
        self.class_name = {}
        self.transform = transform

        for label, class_dir in enumerate(os.listdir(image_dir)):
            self.class_name[label] = class_dir
            class_path = os.path.join(image_dir, class_dir)
            for image_name in os.listdir(class_path):
                self.image_paths.append(os.path.join(class_path, image_name))
                self.labels.append(label)

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        image = Image.open(self.image_paths[idx]).convert("RGB")
        label = self.labels[idx]
        if self.transform:
            image = self.transform(image)
        return image, label
```

Điểm quan trọng: `enumerate(os.listdir(image_dir))` gán nhãn **theo thứ tự alphabet** của tên thư mục (person → 0, cat → 1, dog → 2 trong lần chạy của mình). Mình lưu mapping này vào `self.class_name` để lúc dự đoán dịch ngược index ra tên lớp.

### 🔄 Transform: resize và chuyển sang tensor

Ảnh gốc có kích thước và độ phân giải khác nhau, nên phải chuẩn hóa ngay khi tạo batch. `torchvision.transforms` làm việc này:

```python
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

train_dataset = ImageDataset(train_dir, transform=transform)
test_dataset = ImageDataset(test_dir, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
```

`Resize((128, 128))` đưa mọi ảnh về cùng kích thước; `ToTensor()` đổi PIL Image thành tensor và scale pixel về **[0, 1]**. Transform được truyền vào `__init__` với mặc định `None`: nếu có thì áp dụng, nếu không thì bỏ qua.

### ✅ Kiểm tra batch và vẽ ảnh xác thực

Duyệt `train_loader` cho ra `images.shape = torch.Size([32, 3, 128, 128])` và `labels.shape = torch.Size([32])` — đúng 32 ảnh, 3 kênh, 128×128. Batch cuối có thể lẻ (ví dụ 10 ảnh) nếu không chia hết.

Để chắc DataLoader đúng, mình lấy ảnh đầu batch, chuyển tensor sang numpy, và **transpose** từ `(C, H, W)` sang `(H, W, C)` để matplotlib vẽ được:

```python
import numpy as np
import matplotlib.pyplot as plt

for images, labels in train_loader:
    img = images[0].numpy().transpose(1, 2, 0)
    label = labels[0].item()
    plt.imshow(img, vmin=0, vmax=255)
    print(train_dataset.class_name[label])
    break
```

Vì `shuffle=True`, mỗi lần chạy lại sẽ ra ảnh khác. Mình thử vài lần và khớp đúng nhãn: person, cat, dog đều hiển thị đúng — xác nhận custom loader cho ảnh hoạt động chuẩn.

Giờ mình đã có công cụ nạp dữ liệu ảnh. Bài sau sẽ dùng chính loader này để **train một mạng CNN** hoàn chỉnh.
