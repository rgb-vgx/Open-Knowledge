---
title: 'Biến code train model thành Python script engine.py'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 177
status: edited
source: '177 - Turning Our Model Training Code into a Python Script.md'
categories:
- AI
tags: []
---

# ⚙️ Biến code train model thành Python script engine.py

> Nguồn: `177 - Turning Our Model Training Code into a Python Script.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32830508)

Chào các bạn! Hai video qua ta đã có `data_setup.py` và `model_builder.py`. Giờ tới bước tiếp theo: đưa `train_step`, `test_step` và `train` vào script riêng để khỏi viết lại vòng lặp train mỗi lần.

### 🔁 Code lấy từ đâu

Ba hàm này lấy từ notebook 04, mục "create train and test loop functions". Mình chỉ thêm **docstring** theo Google style cho từng hàm.

### 🔤 Type annotations

Trong cell có thêm **Python type annotations**. Chúng chỉ là **gợi ý** (hint), không ép buộc runtime. Ví dụ:

* `model` là `torch.nn.Module`.
* Hàm trả về một **tuple chứa hai float**.

Type hint không được enforce, nhưng giúp người đọc (và chính bạn) biết kiểu dữ liệu mong đợi. Đây là tài nguyên mở rộng đáng đọc.

### 📄 Tạo `engine.py`

Mình đặt tiểu mục **4.1 — turn training functions into a script** và tạo file:

```python
%%writefile going_modular/engine.py
"""
Contains functions for training and testing a PyTorch model.
"""
from typing import Dict, List, Tuple

import torch
from tqdm.auto import tqdm
```

Điểm quan trọng: **phải import đủ module** mà code trong script dùng. Nếu thiếu, class/hàm sẽ lỗi khi chạy. Ở đây cần:

* `Dict`, `List`, `Tuple` từ `typing` cho type annotations.
* `torch`.
* `tqdm` từ `tqdm.auto` cho progress bar.

### 🧩 Ghép ba hàm vào file

Thay vì viết lại, mình chép từ notebook xuống theo thứ tự:

1. `train_step`
2. `test_step`
3. `train` — hàm lớn nhất, gộp hai hàm trên.

Đây là script dài nhất từ đầu section, vì nó chứa khá nhiều chức năng. Nhưng nhờ vậy, lần sau không phải viết lại.

Sau khi `%%writefile` chạy xong và refresh, ta có `engine.py` hoàn chỉnh.

### 🔌 Import và dùng thử

```python
from going_modular import engine

engine.train(...)
```

Thử gọi khi chưa truyền đủ tham số, ta gặp lỗi:

```text
train() missing 7 required positional arguments: 'model',
'train_dataloader', 'test_dataloader', 'optimizer',
'loss_fn', 'epochs', 'device'
```

Đây là lỗi tốt — nó cho thấy hàm đã import được và PyTorch đang nhắc ta những gì cần truyền vào. Chi tiết cách dùng sẽ thấy khi train thật.

### 💡 Vì sao tách riêng `engine.py`

`engine` nghĩa là "động cơ" — phần lõi vận hành quá trình train: một bước train, một bước test, và vòng lặp lớn. Tách ra giúp:

* Notebook gọn hơn nhiều.
* Dùng lại được cho model khác.
* Dễ sửa một chỗ, áp dụng mọi nơi.

### ✅ Chốt lại

Ta đã có ba script: `data_setup.py`, `model_builder.py`, `engine.py`. Bài tập cho video sau: thử tự biến hàm `save_model` (hoặc cả cell chứa nó) thành script `utils.py` — viết tắt của "utilities". Hẹn gặp các bạn!
