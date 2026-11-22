---
title: 'Bài 115 — Các thành phần của mạng nơ-ron trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 115
status: edited
source: '115 - Understanding Pytorch neural network components.md'
categories:
- AI
tags: []
---

# 🧠 Giải phẫu một mạng nơ-ron PyTorch từ những viên gạch đầu tiên

> Nguồn: `115 - Understanding Pytorch neural network components.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49093665)

Chào các bạn! Mạng nơ-ron trong PyTorch được lắp từ vài thành phần cốt lõi. Bài này mình bóc tách từng "viên gạch": input, weight, bias, activation, loss, gradient và optimizer — rồi xem PyTorch cung cấp sẵn những gì, và dựng thử một mạng đơn giản theo cả hai cách **Functional** và **Sequential**.

### 🧩 Một nút mạng nơ-ron gồm những gì?

Một mạng nơ-ron có **input** `x`, **weights** `w` (có thể là `w1, w2, w3...`), **bias** `b`, **activation function** `a` và **output** `y`. Với một nút, ta tính tổng có trọng số cộng bias:

```text
z = w1·x + b1
```

Rồi đưa `z` qua **hàm kích hoạt** để tạo **tính phi tuyến** — có thể là **sigmoid**, **ReLU** hay bất kỳ hàm nào:

```text
z' = a(z)
```

Nút tiếp theo nhận `z'`, nhân trọng số mới và cộng bias mới: `y = w2·z' + b2`. Trong ví dụ này nút đầu **có** activation, nút sau **không** — ghép lại thành một mạng đơn giản. Toàn bộ luồng từ `x` ra `y` gọi là **forward propagation**.

---

### 🔄 Loss, gradient và optimizer

Sau khi có dự đoán `y`, ta cần đo mô hình sai bao nhiêu — đó là **loss function**, tính từ chênh lệch giữa `y_prediction` và `y` thật. Từ loss, ta tính **gradient** bằng **backpropagation**, rồi dùng **optimizer** để cập nhật trọng số theo gradient.

Tóm lại, để huấn luyện ta cần: đưa **input** vào, tính **weight và bias**, có **activation**, chạy **forward propagation**, tính **loss**, lan truyền ngược lấy **gradient**, và một **optimizer** để cập nhật.

---

### 🧰 PyTorch cung cấp sẵn những gì?

| Thành phần | API PyTorch |
|---|---|
| Base class định nghĩa model tùy biến | `torch.nn.Module` |
| Lớp fully connected (dense) | `torch.nn.Linear` |
| Hàm kích hoạt | `torch.nn.ReLU` (và sigmoid, ...) |
| Optimizer | `torch.optim.SGD` (cùng nhiều loại khác) |
| Loss function | `torch.nn.CrossEntropyLoss` |
| Load dữ liệu theo batch | `torch.utils.data.DataLoader` |

`DataLoader` đặc biệt hữu ích khi làm việc với văn bản hoặc ảnh/frame — nó **load dữ liệu theo batch** và đưa lên GPU hiệu quả.

---

### 🏗️ Hai cách dựng mạng: Functional và Sequential

**Functional** linh hoạt: áp dụng phép toán trực tiếp lên tensor trong `forward`, cho phép kiến trúc phức tạp và phép tùy biến. **Sequential** có cấu trúc hơn: các lớp xếp tuyến tính trong container `nn.Sequential`.

Mạng đơn giản theo **Functional API**:

```python
import torch
import torch.nn as nn
import torch.optim as optim

class Simple(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()                      # khởi tạo nn.Module trước
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x
```

Cùng mạng đó viết lại bằng **Sequential API**:

```python
class SimpleSequential(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, output_size),
        )

    def forward(self, x):
        return self.network(x)
```

Functional giữ mỗi lớp là một thuộc tính riêng (`fc1`, `relu`, `fc2`) nên kiểm soát được luồng; Sequential chỉ có một biến `self.network` và **không đổi được thứ tự** các lớp.

**Khi nào bắt buộc phải dùng Functional?** Nếu mạng chỉ xếp lớp nối tiếp từng tầng, **Sequential là đủ** — gọn và rõ. Nhưng có kiến trúc **không tuần tự**: input của tầng trước dùng lại ở giữa mạng, hoặc output tầng này cộng vào output tầng khác — điển hình là **ResNet** với **residual connection**. Lúc này bạn cần giữ riêng từng output (`fc1`, `fc2`, `fc3`) để cộng trừ; Sequential không làm được, Functional thì thoải mái.

> Điều gì Sequential làm được thì Functional đều làm được; nhưng điều Functional làm được thì Sequential **không** làm được.

---

### 🧪 Huấn luyện thử với dữ liệu giả

Khởi tạo mạng Functional với input 4, hidden 8, output 3:

```python
model = Simple(input_size=4, hidden_size=8, output_size=3)
print(model)   # in ra kiến trúc các lớp
```

Tạo dữ liệu giả: 10 mẫu, mỗi mẫu 4 đặc trưng; nhãn là 10 số nguyên trong khoảng 0–2:

```python
x = torch.rand(10, 4)
y = torch.randint(0, 3, (10,))

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

for epoch in range(epochs):
    optimizer.zero_grad()
    output = model(x)
    loss = criterion(output, y)
    loss.backward()
    optimizer.step()
```

Một điểm đáng chú ý: khi dùng **`nn.CrossEntropyLoss`**, PyTorch **tự động** áp dụng bước activation ở đầu ra (một dạng softmax nâng cao), nên bạn **không cần** thêm softmax thủ công. Đó là lý do `criterion` là biến quen thuộc trong hầu hết repo PyTorch.

---

### ✅ Chốt lại

Một mạng nơ-ron PyTorch chỉ gồm vài thành phần: `nn.Module` làm nền, `nn.Linear` cho lớp kết nối, `nn.ReLU` cho phi tuyến, `optim` để cập nhật trọng số và `nn.CrossEntropyLoss` cho loss. Bạn dựng bằng **Functional** (linh hoạt, làm được residual) hoặc **Sequential** (gọn, tuyến tính). Và với PyTorch, bạn **không phải tự viết** optimizer, backprop hay loss — chỉ cần khai báo model rồi chạy vòng huấn luyện. Hẹn gặp ở bài tiếp theo, khi mình áp dụng tất cả vào một bài **hồi quy tuyến tính** hoàn chỉnh.
