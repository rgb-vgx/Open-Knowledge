---
title: 'Bài 82 — Tạo model mới với nhiều layer và hidden unit hơn'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 82
status: edited
source: '082 - Creating a New Model with More Layers and Hidden Units.md'
categories:
- AI
tags: []
---

# 🧱 Tạo model mới với nhiều layer và hidden unit hơn

> Nguồn: `082 - Creating a New Model with More Layers and Hidden Units.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32830492)

Bài trước mình bàn các cách cải thiện model **từ góc độ model**. Còn một hướng khác là **từ góc độ data** — nhiều mẫu hơn thì model thường học tốt hơn. Nhưng lần này mình tập trung vào model.

### 🏷️ Parameter và hyperparameter khác nhau chỗ nào?

Đây là phân biệt quan trọng:

* **Parameter** — những con số **bên trong** model, tức **weight và bias**, do model **tự cập nhật** khi train.
* **Hyperparameter** — những giá trị **chính các bạn** chọn: số layer, số hidden unit, số epoch, activation function, learning rate, loss function.

Mọi thứ mình sắp đổi đều là **hyperparameter**.

---

### 🔧 Ba thay đổi cho `CircleModelV1`

1. Tăng **hidden unit** từ **5 → 10**.
2. Tăng **số layer** từ **2 → 3** (thêm một layer).
3. Tăng **epoch** từ **100 → 1000**.

Nhắc lại lời cảnh báo: đổi cả ba cùng lúc thì không biết cái nào tạo ra cải thiện (hoặc tệ đi). Nhưng cứ thử cho biết.

Mình vẫn **subclass `nn.Module`** thay vì `nn.Sequential` — để luyện tay và vì các bạn sẽ gặp kiểu viết này rất nhiều ngoài thực tế, nhất là với model phức tạp.

---

### ⌨️ Code

```python
class CircleModelV1(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer_1 = nn.Linear(in_features=2, out_features=10)
        self.layer_2 = nn.Linear(in_features=10, out_features=10)  # extra layer
        self.layer_3 = nn.Linear(in_features=10, out_features=1)

    def forward(self, x):
        # performs all operations at once for speed ups
        return self.layer_3(self.layer_2(self.layer_1(x)))
```

Đọc shape cho kỹ:

* `layer_1`: `2 → 10` (`X_train` có 2 feature).
* `layer_2`: `10 → 10` — `in_features` **phải khớp** `out_features` của layer trước.
* `layer_3`: `10 → 1` — output một số, khớp với `y`.

---

### ⚡ Vì sao viết `self.layer_3(self.layer_2(self.layer_1(x)))`?

Có hai cách trong `forward()`:

```python
# Cách 1: từng bước, gán biến trung gian
def forward(self, x):
    z = self.layer_1(x)
    z = self.layer_2(z)
    z = self.layer_3(z)
    return z

# Cách 2: gọi lồng nhau một lần
def forward(self, x):
    return self.layer_3(self.layer_2(self.layer_1(x)))
```

Hai cách cho cùng kết quả. Mình dùng cách hai vì **PyTorch tính toán cả chuỗi một lượt**, tận dụng được các **speed up** phía sau. Chữ `z` là tên thường dùng cho **logits** (đầu ra thô) — nhưng biến trung gian đặt tên gì cũng được.

---

### 🚀 Khởi tạo

```python
model_1 = CircleModelV1().to(device)
model_1
```

Model đã có **ba layer** và nhiều hidden unit hơn, sẵn sàng lên device. Thử thách cho các bạn: tạo loss function (gần giống cái cũ), optimizer, rồi viết training/testing loop cho `model_1`. Bài sau mình làm cùng nhau và xem model "to hơn" này có học tốt hơn không.
