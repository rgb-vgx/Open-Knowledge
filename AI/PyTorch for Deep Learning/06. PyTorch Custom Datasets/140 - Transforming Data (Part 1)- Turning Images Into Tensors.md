---
title: 'Transform dữ liệu (phần 1): biến ảnh thành tensor với torchvision.transforms'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 140
status: edited
source: '140 - Transforming Data (Part 1)- Turning Images Into Tensors.md'
categories:
- AI
tags: []
---

# 🔄 Transform dữ liệu (phần 1): biến ảnh thành tensor

> Nguồn: `140 - Transforming Data (Part 1)- Turning Images Into Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32709560)

Ta đã biến ảnh thành NumPy array và thấy được nó dưới dạng số. Nhưng PyTorch không nhận array hay file JPEG — nó nhận **tensor**. Bài này mình dựng một **transform pipeline** bằng `torchvision.transforms` để resize, lật ngang và cuối cùng chuyển ảnh thành tensor.

### 🎯 Hai bước cốt lõi của mọi pipeline dữ liệu

Bất kể dữ liệu là ảnh, text hay audio, quy trình luôn là:

1. **Chuyển dữ liệu đích thành tensor** — với ảnh là biểu diễn số của pixel.
2. **Bọc nó vào `torch.utils.data.Dataset`**.

Sau đó, từ `Dataset` ta tạo `DataLoader` — thứ tạo ra phiên bản **iterable/batched** của dataset. (Hai tên `Dataset` và `DataLoader` sẽ xuất hiện suốt.)

### 🧰 Tham số `transform` của `ImageFolder`

Mở tài liệu `torchvision.datasets`, mình chỉ vào **`ImageFolder`** — một base class cho custom dataset. Nó có tham số **`transform`**: khi nạp dataset từ thư mục, nó sẽ áp transform lên từng mẫu. Tham số này gần như phổ quát cho mọi loại dữ liệu.

Import lại các thư viện chính:

```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
```

### 🔥 Dựng transform pipeline

```python
data_transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ToTensor(),
])
```

`transforms.Compose` ghép nhiều transform thành một chuỗi (cũng có thể dùng `nn.Sequential`, nhưng bài này dùng `Compose`). Ba bước:

* **`Resize((64, 64))`** — vì **TinyVGG** ở section Computer Vision (bản CNN Explainer) nhận ảnh **64×64**, nên resize để sau này dùng lại được model đó.
* **`RandomHorizontalFlip(p=0.5)`** — lật ngang ảnh với xác suất **50%**. Đây là một dạng **data augmentation** — tức là làm tăng độ đa dạng của dữ liệu một cách nhân tạo.
* **`ToTensor()`** — chuyển ảnh sang tensor.

### 🔬 `ToTensor()` làm gì chính xác?

Đọc docstring: `ToTensor()` chuyển một **PIL image** hoặc **NumPy array** có shape `(H, W, C)` với giá trị trong khoảng **0–255** thành **`torch.FloatTensor`** có shape **`(C, H, W)`** với giá trị trong khoảng **0.0–1.0**. Nó cũng ghi chú: transform này **không hỗ trợ TorchScript**. Nói cách khác, nó đổi thứ tự channel sang channels-first và chuẩn hóa pixel về 0–1.

### 🧪 Thử transform với dữ liệu sai kiểu

Mình thử đưa `img_as_array` (NumPy array) vào `data_transform` và nhận lỗi: **`Image should be PIL Image. Got <class 'numpy.ndarray'>`**. Đưa đúng **PIL image** `img` vào thì chạy ngon. Đây là lỗi rất đáng nhớ — `ToTensor` nhận PIL image hoặc array, nhưng cả pipeline ở đây kỳ vọng PIL image.

```python
transformed_image = data_transform(img)
transformed_image.shape
# torch.Size([3, 64, 64])
```

Shape ra `[3, 64, 64]` — **channels first**. Thử đổi `Resize((224, 224))` (một kích thước phổ biến khác cho các model vision) thì shape thành `[3, 224, 224]`; đổi lại `64` thì về như cũ.

### 🧾 Kiểm tra dtype

```python
transformed_image.dtype
# torch.float32
```

Vậy là đã có cách transform ảnh thành tensor đúng chuẩn PyTorch.

### ✅ Tạm kết

Hiện mới transform **một** ảnh. Bước tiếp theo là mở rộng ra **toàn bộ ảnh trong thư mục**. Và trước khi làm, mình muốn visualize xem ảnh sau transform trông thế nào, so với ảnh gốc. Hẹn các bạn ở bài sau, mình viết code visualization.
