---
title: 'Tạo DataLoader với transform viết tay'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 186
status: edited
source: '186 - Turning Our Data into DataLoaders with Manually Created Transforms.md'
categories:
- AI
tags: []
---

# 🎛️ Tạo DataLoader với transform viết tay

> Nguồn: `186 - Turning Our Data into DataLoaders with Manually Created Transforms.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33006510)

Chào các bạn! Video trước ta đã tải dữ liệu và có đường dẫn train/test. Giờ ta biến chúng thành PyTorch dataloader. Ta đã làm việc này nhiều lần, nhưng lần này có **một điểm phải chú ý** khi dùng pretrained model.

### 🧩 Dùng lại `data_setup.py`

Ta dùng hàm `create_dataloaders` trong `data_setup.py` — tạo ở section going modular. Hàm này nhận `train_dir`, `test_dir`, `transform`, rồi:

1. Dùng `ImageFolder` tạo train/test dataset.
2. Biến dataset thành dataloader.
3. Trả về `train_dataloader`, `test_dataloader`, `class_names`.

Vậy thứ ta cần bàn là **transform**.

---

### ⚠️ Nguyên tắc quan trọng nhất

Khi dùng pretrained model, **dữ liệu của bạn — kể cả dữ liệu custom — phải được transform giống hệt cách dữ liệu mà model được train đã được transform**.

Nếu không, hiệu năng có thể bị giảm sút.

---

### 🛠️ Hai cách tạo transform (torchvision 0.13+)

1. **Manual** — bạn tự định nghĩa pipeline transform.
2. **Automatic** — transform được định nghĩa bởi chính model bạn chọn.

Đây là lý do ta cài torchvision 0.13+. Video này làm cách **manual**.

---

### 📖 Đọc yêu cầu từ tài liệu

Trong tài liệu torchvision (bản 0.12) mục **Models and pre-trained weights**, có ghi các yêu cầu với input:

* Batch ảnh **3 kênh** (RGB), shape `(3, H, W)`.
* `H`, `W` **tối thiểu 224**.
* Giá trị pixel trong khoảng **0–1**.
* Chuẩn hóa (**normalize**) theo **mean** và **std** của ImageNet.

Các giá trị chuẩn của ImageNet:

```python
mean = [0.485, 0.456, 0.406]
std  = [0.229, 0.224, 0.225]
```

Chúng được **học ra từ dataset ImageNet**, không phải số ngẫu nhiên.

---

### 🧱 Tạo `manual_transforms`

```python
from torchvision import transforms

manual_transforms = transforms.Compose([
    transforms.Resize((224, 224)),           # 1. resize về 224x224
    transforms.ToTensor(),                    # 2. đưa giá trị về 0-1
    transforms.Normalize(mean=mean, std=std), # 3. cùng phân phối với ImageNet
])
```

Có thể đổi `224x224` thành kích thước khác nếu model của bạn yêu cầu (ví dụ 300x300).

---

### ⚖️ Ưu và nhược điểm của manual transform

* **Ưu**: linh hoạt vô cùng — bạn thêm gì cũng được: data augmentation, các bước tiền xử lý tùy ý.
* **Nhược**: nếu bạn transform **sai** so với cách model được train, hiệu năng sẽ giảm.

---

### 🧵 Tạo dataloader

```python
train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=manual_transforms,
    batch_size=32,
)
```

Chạy xong, ta có dataloader và `class_names`. Bản thân transform diễn ra **ngầm** — không nhìn thấy trực tiếp, nhưng nó đã áp lên từng ảnh.

---

### ✅ Chốt lại

Ta vừa tạo dataloader với transform viết tay. Video sau ta xem cách **tự động tạo transform** từ chính pretrained weights — tiện hơn nhiều. Hẹn gặp các bạn!
