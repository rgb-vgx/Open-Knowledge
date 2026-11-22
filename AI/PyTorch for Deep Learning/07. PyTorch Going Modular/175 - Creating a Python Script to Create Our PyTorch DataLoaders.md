---
title: 'Viết script tạo PyTorch DataLoader'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 175
status: edited
source: '175 - Creating a Python Script to Create Our PyTorch DataLoaders.md'
categories:
- AI
tags: []
---

# 🧵 Viết script tạo PyTorch DataLoader

> Nguồn: `175 - Creating a Python Script to Create Our PyTorch DataLoaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32810596)

Chào các bạn! Video trước ta phác thảo `data_setup.py` — một hàm nhận `train_dir`, `test_dir`, `transform`, `batch_size` và `num_workers` để tạo dataloader. Giờ ta hoàn thiện phần thân hàm.

### 🔨 Hoàn thiện hàm `create_dataloaders`

Load dataset bằng `ImageFolder`:

```python
train_data = datasets.ImageFolder(train_dir, transform=transform)
test_data = datasets.ImageFolder(test_dir, transform=transform)

class_names = train_data.classes
```

Lưu ý: ở đây ta dùng **cùng một transform** cho train và test cho đơn giản. Trong thực tế không nhất thiết phải vậy.

Tạo dataloader:

```python
train_dataloader = DataLoader(
    train_data,
    batch_size=batch_size,
    shuffle=True,
    num_workers=num_workers,
    pin_memory=True,
)

test_dataloader = DataLoader(
    test_data,
    batch_size=batch_size,
    shuffle=False,
    num_workers=num_workers,
    pin_memory=True,
)
```

Điểm cần nhớ:

* **Train** thì `shuffle=True`, **test** thì `shuffle=False`.
* Tham số truyền vào là `num_workers` (không phải "numb workers" — đó chỉ là cách phát âm đùa trong transcript).

### 🧷 `pin_memory=True` là gì?

Đây là tham số mình chưa giới thiệu trước đó. Nếu chạy `Shift + Cmd + Space` để xem docstring `DataLoader` trong Colab khó đọc, có thể mở tài liệu PyTorch. Đại ý tài liệu khuyến nghị:

> Không nên trả về CUDA tensor trong multi-process; thay vào đó hãy bật **automatic memory pinning**, tức `pin_memory=True`, để chuyển dữ liệu nhanh hơn tới GPU CUDA.

Hiểu đơn giản: **phần lớn thời gian train bị tiêu vào việc chuyển dữ liệu từ CPU sang GPU**. `pin_memory=True` giữ bộ nhớ "ghim" lại, hạn chế chuyển đi chuyển lại, giúp tính toán nhanh hơn. Với dataset nhỏ có thể chưa thấy khác biệt, nhưng với dataset lớn thì rất đáng.

Mình có nhắc tới bài nói "How to make deep learning models go brrr" (về compute bandwidth) như tài nguyên mở rộng — nguyên tắc là: **tính toán nhiều nhất có thể, giảm số lần truyền bộ nhớ**.

### 💾 Ghi ra script

Thêm `%%writefile going_modular/data_setup.py` ở đầu cell, chạy — nó sẽ hỏi ghi đè. Đồng ý, và ta có file script đầu tiên hoàn chỉnh.

### 🧪 Dùng lại script vừa tạo

Đây là phần thú vị: ta có thể **import** hàm vừa viết.

```python
from going_modular import data_setup

train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=data_transform,
    batch_size=32,
)
```

Kết quả: `class_names` trả về `['pizza', 'steak', 'sushi']`.

Thêm nữa, gõ `data_setup.create_dataloaders` rồi mở docstring, bạn sẽ thấy **ngay docstring mình viết** hiện ra: mô tả, Args, Returns, Example usage. Đó chính là lý do ta viết docstring theo đúng style — công cụ hiển thị nó đẹp và dễ đọc.

### 🔁 Thay đổi tư duy

Thay vì mỗi notebook lại viết lại cả chục dòng tạo dataloader, giờ ta **import một script** và truyền đường dẫn train/test. Gọn hơn rất nhiều.

### ✅ Chốt lại

`data_setup.py` đã xong. Bài tập cho video sau: nhìn cell **TinyVGG** và thử tự biến nó thành script tên `model_builder.py`. Chúng ta sẽ làm cùng nhau. Hẹn gặp các bạn!
