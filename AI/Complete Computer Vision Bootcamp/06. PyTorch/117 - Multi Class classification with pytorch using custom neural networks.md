---
title: 'Bài 117 — Phân loại đa lớp với PyTorch bằng mạng neural tự viết'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 117
status: edited
source: '117 - Multi Class classification with pytorch using custom neural networks.md'
categories:
- AI
tags: []
---

# 🌸 Multi-class classification với PyTorch trên bộ Iris

> Nguồn: `117 - Multi Class classification with pytorch using custom neural networks.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49093735)

Chào các bạn! Bài trước mình đã làm **regression** bằng mạng neural. Hôm nay mình chuyển sang bài toán **classification** nhiều lớp, dùng bộ dữ liệu **Iris** kinh điển và tự dựng một mạng neural nhỏ trong PyTorch từ đầu tới cuối: load dữ liệu, tiền xử lý, định nghĩa kiến trúc, train và dự đoán.

### 📊 Bộ dữ liệu Iris: bài toán ba lớp

**Iris** là bộ dữ liệu tabular thuộc lĩnh vực biology, task là **classification**. Nó có **4 feature** và **150 dòng**: **sepal length**, **sepal width**, **petal length**, **petal width** — đều là giá trị liên tục, đơn vị centimeter. Từ 4 feature này, mình phải dự đoán **class** thuộc một trong ba loài iris: **setosa**, **versicolor**, **virginica**.

Mỗi lớp có **50 dòng**, tổng 150 — dữ liệu khá **cân bằng**. Dimensionality là 4, tức đúng 4 feature. Vì là bài toán phân loại ba lớp nên mạng neural ở đầu ra sẽ cần **3 neuron** chứ không phải 1 neuron như bài regression.

Mình không tải CSV mà lấy trực tiếp từ sklearn qua `load_iris`, vì mục tiêu chính là học cách làm pipeline bằng PyTorch.

```python
import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target
```

### 🧹 Tiền xử lý: split, scale rồi chuyển thành tensor

Mình chia train/test với `test_size=0.2`, `random_state=42` và `stratify=df['target']` để giữ tỉ lệ các lớp. Sau đó tách `X` là toàn bộ cột trừ `target`, còn `y` là cột `target`. Lưu ý phải ghi `columns` (số nhiều) khi drop.

Tiếp theo là scale bằng **StandardScaler**: `fit_transform` trên train, chỉ `transform` trên test để tránh rò rỉ thông tin. Cuối cùng chuyển cả bốn mảng sang tensor: `X` dùng `dtype=torch.float32`, còn `y` dùng **`torch.long`** — kiểu long là bắt buộc cho nhãn phân loại.

```python
X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train.values, dtype=torch.long)
```

### 🧠 Tự dựng mạng neural ba lớp

Mình đặt tên class là **IrisClassifier**, kế thừa `nn.Module`. Trong `__init__` nhận ba tham số: **input dimension**, **hidden dimension**, **output dimension** (=3 vì có ba lớp). Nhớ gọi `super().__init__()` để khởi tạo đúng cho lớp cha.

Kiến trúc dùng `nn.Sequential`: `Linear(4 → 16)` → `ReLU` → `Linear(16 → 16)` → `ReLU` → `Linear(16 → 3)`. Tức 4 feature nối vào 16 neuron, 16 nối tiếp 16, rồi 16 nối ra 3 lớp. Hàm `forward` chỉ cần đưa `x` qua `self.network` và trả về output.

```python
class IrisClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, output_dim),
        )

    def forward(self, x):
        return self.network(x)
```

Lấy `input_dim = X_train.shape[1]` (=4), `hidden_dim = 16` (tùy chọn), `output_dim = 3`.

### ⚙️ Loss, optimizer và vòng train

Với phân loại nhiều lớp, mình dùng **`nn.CrossEntropyLoss`** — hàm này đã bao gồm softmax bên trong. Optimizer là **Adam** với `lr=0.01`, truyền `model.parameters()`.

Vòng train 500 epoch gồm bốn bước quen thuộc: `model.train()`, `optimizer.zero_grad()`, forward để ra `predictions`, tính `loss`, rồi `loss.backward()` và `optimizer.step()`. Cứ mỗi 50 epoch in `loss.item()` với độ chính xác 4 chữ số.

```python
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

for epoch in range(500):
    model.train()
    optimizer.zero_grad()
    predictions = model(X_train_tensor)
    loss = criterion(predictions, y_train_tensor)
    loss.backward()
    optimizer.step()
    if (epoch + 1) % 50 == 0:
        print(f"Epoch {epoch+1}/500 — loss {loss.item():.4f}")
```

Loss giảm từ khoảng **0.5** xuống **0.0003** sau 500 epoch — mô hình học được pattern rất tốt.

### ✅ Đánh giá và dự đoán một bông hoa mới

Để đánh giá, mình chuyển `model.eval()`, bọc trong `torch.no_grad()`, đưa `X_test_tensor` qua model rồi lấy **`torch.argmax(..., dim=1)`** để chọn lớp có xác suất cao nhất. Accuracy = số dự đoán đúng chia tổng số mẫu.

Cuối bài, mình viết hàm **`predict_iris(sepal_length, sepal_width, petal_length, petal_width)`**: gom 4 giá trị thành mảng, scale bằng scaler đã fit, chuyển sang tensor `float32`, đưa qua model, lấy `argmax(...).item()` rồi tra `iris.target_names` để ra tên loài. Thử với `(5.1, 3.5, 1.4, 0.2)` — model trả về **setosa**, đúng như kỳ vọng.

Vậy là mình đã đi trọn một pipeline **multi-class classification** bằng mạng neural tự viết trong PyTorch. Bài sau mình sẽ nâng cấp cách nạp dữ liệu bằng **Dataset** và **DataLoader** để xử lý dữ liệu lớn theo batch.
