---
title: 'Dùng torchinfo để xem summary của model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 155
status: edited
source: '155 - Using the Torchinfo Package to Get a Summary of Our Model.md'
categories:
- AI
tags: []
---

# 📋 Dùng `torchinfo` để xem summary của model

> Nguồn: `155 - Using the Torchinfo Package to Get a Summary of Our Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32741774)

Trước đó ta kiểm tra model bằng `print` shape thủ công. Cách đó thô và khi train sẽ in ra rất nhiều. Bài này mình giới thiệu **`torchinfo`** — một trong những package mình thích nhất — để in **bảng summary** gọn gàng: shape từng lớp, số tham số, kích thước model.

### 🧹 Dọn các `print` debug

Trước khi dùng summary, mình **comment out** các `print(x.shape)` trong `forward` của TinyVGG, để khi train không bị spam output.

### 📦 Cài đặt

Colab không có sẵn `torchinfo`, nên cài hoặc import có kiểm tra:

```python
try:
    import torchinfo
except ImportError:
    !pip install torchinfo
    import torchinfo

from torchinfo import summary
```

### 🔥 In summary

```python
summary(model_0, input_size=[1, 3, 64, 64])
```

`input_size` là một **ví dụ** về shape dữ liệu sẽ đi qua model — ở đây là **1 ảnh** batch, 3 channel, 64×64. (Có thể truyền `32` thay cho `1` nếu muốn, hoặc đổi `64` thành `224`.)

Bên trong, `torchinfo` chạy một **forward pass** với input đó. Nếu `input_size` không khớp model, nó **cũng báo lỗi shape** y như forward pass thủ công — nên đây còn là công cụ kiểm chứng shape rất tiện.

### 🔍 Đọc kết quả

Bảng cho thấy:

* `TinyVGG` gồm **3 block `Sequential`**: hai conv block (Conv2d, ReLU, MaxPool2d) và một classifier (Flatten, Linear).
* **Shape thay đổi** qua từng lớp, khớp với CNN Explainer.
* **Total params**: hơn **8.000** tham số. Mỗi lớp conv/linear có số tham số khác nhau.
* **Model size**: dưới **1 MB**.

Nhắc lại: **parameter** là các giá trị (weight, bias) trong mỗi lớp, khởi tạo ngẫu nhiên, và mục tiêu của deep learning là **điều chỉnh** chúng để biểu diễn dữ liệu tốt hơn.

### 📏 Vì sao quan tâm số tham số và kích thước?

Model càng lớn (nhiều lớp) → càng nhiều tham số → input size và dung lượng ước tính càng tăng. Model của ta chỉ dưới 1 MB, nhưng trên thực tế có model **hàng trăm MB**, thậm chí **trên 1 GB**, hay hiện đại là **hàng tỷ** tham số. Cân nhắc điều này khi bị giới hạn bộ nhớ lưu trữ.

### ✅ Tạm kết

`torchinfo` dùng được với hầu hết model PyTorch, chỉ cần truyền đúng `input_size`. Nó vừa cho summary đẹp, vừa giúp xác nhận shape. Tiếp theo là **train** TinyVGG — mình sẽ viết lại các hàm `train_step`/`test_step` (đã học ở section trước) cho custom dataset. Ai muốn thử trước thì cứ làm; bài sau mình làm cùng.
