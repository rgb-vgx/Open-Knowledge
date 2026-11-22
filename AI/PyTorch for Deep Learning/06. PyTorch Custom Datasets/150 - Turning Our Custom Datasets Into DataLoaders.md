---
title: 'Biến custom dataset thành DataLoader'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 150
status: edited
source: '150 - Turning Our Custom Datasets Into DataLoaders.md'
categories:
- AI
tags: []
---

# 🚚 Biến custom dataset thành DataLoader

> Nguồn: `150 - Turning Our Custom Datasets Into DataLoaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32723172)

Bước cuối để custom dataset dùng được với model: bọc nó trong `DataLoader` y như ta đã làm với dataset từ `ImageFolder`. Bài này ngắn gọn — tạo `train_dataloader_custom`/`test_dataloader_custom`, kiểm tra shape batch, và nói về việc đóng gói class thành module tái sử dụng.

### 🔥 Tạo DataLoader từ custom dataset

```python
from torch.utils.data import DataLoader

BATCH_SIZE = 32
NUM_WORKERS = 0  # hoặc 1, hoặc os.cpu_count()

train_dataloader_custom = DataLoader(
    train_data_custom,
    batch_size=BATCH_SIZE,
    num_workers=NUM_WORKERS,
    shuffle=True,
)

test_dataloader_custom = DataLoader(
    test_data_custom,
    batch_size=BATCH_SIZE,
    num_workers=NUM_WORKERS,
    shuffle=False,
)
```

Lưu ý về `num_workers`: có thể để `0`, `1`, hoặc `os.cpu_count()` — tùy phần cứng. Mình thử `os.cpu_count()` rồi đưa về `0` cho đồng bộ với ví dụ trước. `shuffle=True` cho train, `False` cho test, đúng nguyên tắc.

---

### 📏 Kiểm tra shape một batch

```python
img_custom, label_custom = next(iter(train_dataloader_custom))
print(f"Image shape: {img_custom.shape}")
print(f"Label shape: {label_custom.shape}")
```

Kết quả: image shape `[32, 3, 64, 64]`, label shape `[32]` — khớp `BATCH_SIZE = 32`, 3 channel, ảnh 64×64 như transform đã đặt. Đổi `BATCH_SIZE` thành `64` hay `1` thì chiều đầu thay đổi tương ứng.

---

### 💡 Ghi chú về batch size

Mình nhắc một mẹo: batch size đẹp thường là **bội số của 8** vì có lợi cho tính toán trên phần cứng. Kích thước ảnh thì tùy model — ảnh lớn hơn mã hóa nhiều thông tin hơn.

---

### 🧰 Đóng gói để tái sử dụng

`ImageFolderCustom` khá dài, nhưng viết **một lần** rồi dùng lại nhiều lần nếu dữ liệu vẫn đúng format. Mình gợi ý đặt nó vào một file helper (ví dụ `dataset.py`) rồi import khi cần — chính là cách PyTorch làm với `torchvision.datasets.ImageFolder`.

---

### ✅ Tạm kết

Vậy là trọn vẹn chuỗi nạp dữ liệu **hai cách**: một bằng hàm dựng sẵn (`ImageFolder`) và một bằng class tự viết (`ImageFolderCustom`), cả hai đều ra `DataLoader` dùng được. Nếu cần, các bạn luôn có thể kế thừa `torch.utils.data.Dataset` và tự thêm chức năng. Bài sau mình quay lại chủ đề **data augmentation** — kỹ thuật làm tăng độ đa dạng dữ liệu train một cách nhân tạo. Hẹn các bạn ở đó.
