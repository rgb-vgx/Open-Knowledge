---
title: 'Viết train.py — train model bằng một dòng lệnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 179
status: edited
source: '179 - Creating a Training Script to Train Our Model in One Line of Code.md'
categories:
- AI
tags: []
---

# 🚀 Viết train.py — train model bằng một dòng lệnh

> Nguồn: `179 - Creating a Training Script to Train Our Model in One Line of Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32852230)

Chào các bạn! Ta đã có bốn script: `data_setup.py`, `engine.py`, `model_builder.py`, `utils.py`. Giờ là lúc ghép tất cả thành **`train.py`** — và biến giấc mơ "train bằng một dòng lệnh" thành hiện thực.

### 🧾 Code gốc cần tái hiện

Cell trong notebook làm những việc sau:

1. Đặt random seed để tái lập kết quả.
2. `num_epochs = 5` — ngắn thôi để kiểm tra code chạy.
3. Tạo instance TinyVGG (lúc này vẫn lấy từ cell, chưa dùng `model_builder`).
4. Tạo loss function và optimizer.
5. Bấm giờ, gọi `train`, dừng giờ.
6. Lưu model bằng `save_model`.

Mục tiêu: tái hiện đúng các bước trên, nhưng **dùng các script đã tách**.

### 📄 Tạo `train.py`

Mình đặt tiểu mục **6.1 — train, evaluate and save the model**, tạo file:

```python
%%writefile going_modular/train.py
"""
Trains a PyTorch image classification model using device-agnostic code.
"""
import os
import torch

import data_setup, engine, model_builder, utils

from torchvision import transforms
```

Điểm rất quan trọng về **đường dẫn import**: vì `train.py` nằm **trong** thư mục `going_modular`, ta import trực tiếp:

```python
import data_setup, engine, model_builder, utils
```

chứ không phải `from going_modular import data_setup`. Đây là chi tiết dễ sai — nhớ kỹ.

### 🔢 Hyperparameters và đường dẫn

```python
NUM_EPOCHS = 5
BATCH_SIZE = 32
HIDDEN_UNITS = 10
LEARNING_RATE = 0.001

train_dir = "data/pizza_steak_sushi/train"
test_dir = "data/pizza_steak_sushi/test"
```

### 📱 Device-agnostic code

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
```

Cái hay: **mọi script khác đều đã dùng device-agnostic code**, nên chỉ cần đặt một lần ở đây là cả pipeline "rơi vào chỗ".

### 🖼️ Transform

Với bài toán đơn giản này, ta tạo tại chỗ (dùng 64×64 như các section trước):

```python
data_transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
])
```

Thực tế có thể tách thành `transforms.py` riêng, nhưng ở đây cho gọn.

### 🧵 Gọi `data_setup.create_dataloaders`

```python
train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=data_transform,
    batch_size=BATCH_SIZE,
)
```

Không truyền `num_workers` vì `data_setup` đã tự đặt mặc định.

### 🏗️ Tạo model, loss, optimizer

```python
model = model_builder.TinyVGG(
    input_shape=3,
    hidden_units=HIDDEN_UNITS,
    output_shape=len(class_names),
).to(device)

loss_fn = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)
```

`output_shape = len(class_names)` = 3, vì có ba class pizza/steak/sushi.

### ⏱️ Train và lưu model

```python
from timeit import default_timer as timer

start_time = timer()

engine.train(
    model=model,
    train_dataloader=train_dataloader,
    test_dataloader=test_dataloader,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=NUM_EPOCHS,
    device=device,
)

end_time = timer()
print(f"Total training time: {end_time - start_time:.3f} seconds")

utils.save_model(
    model=model,
    target_dir="models",
    model_name="05_going_modular_script_mode_tinyvgg_model.pth",
)
```

Phần lớn công việc nặng nằm trong `engine.train` — ta chỉ "lắp ghép các mảnh puzzle".

### 🎬 Chạy một dòng lệnh

```bash
python going_modular/train.py
```

Kết quả: chạy 5 epoch, in ra từng epoch, rồi lưu model vào `models/05_going_modular_script_mode_tinyvgg_model.pth`. Refresh thư mục, `models/` xuất hiện.

### 📁 Cấu trúc cuối cùng

```
going_modular/
├── going_modular/
│   ├── data_setup.py
│   ├── engine.py
│   ├── model_builder.py
│   ├── train.py
│   └── utils.py
├── data/
└── models/
```

* **data_setup** — chuẩn bị dữ liệu.
* **engine** — vòng lặp train/test.
* **model_builder** — kiến trúc model (có thể thay bằng model khác, miễn hợp dữ liệu).
* **utils** — tiện ích, hiện một hàm nhưng có thể mở rộng.
* **models** — nơi lưu model.

### 🎉 Chốt lại

Chúng ta đã **đi từ notebook tới Python script** và train model bằng một dòng lệnh — một bước rất quan trọng trên đường thành machine learning engineer. Tự vỗ vai một cái! Video sau ta tổng kết và bàn bài tập mở rộng.
