---
title: 'Tạo model multiclass bằng PyTorch với tham số linh hoạt'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 93
status: edited
source: '093 - Creating a Multi-Class Classification Model with PyTorch.md'
categories:
- AI
tags: []
---

# 🧠 Tạo model multiclass bằng PyTorch với tham số linh hoạt

> Nguồn: `093 - Creating a Multi-Class Classification Model with PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32881828)

Dataset bốn cụm đã sẵn sàng. Trước khi code model, tự hỏi: **dữ liệu này có cần non-linearity không?** Các cụm khá chồng lấn, ranh giới chắc chắn phải uốn lượn — nhưng cứ thử có và không có để so. Giờ vào kiến trúc.

### 📐 Shape của model multiclass

| Thành phần | Giá trị |
|---|---|
| **Input layer** (`in_features`) | **2** (hai feature của `X_blob`) |
| **Hidden layers** | Tùy chọn, giữ nhỏ |
| **Neurons mỗi hidden layer** | Tùy chọn (mặc định **8**) |
| **Output layer** (`out_features`) | **4** — một cho mỗi lớp |
| **Output activation** | **Softmax** |
| **Loss function** | **Cross entropy** |
| **Optimizer** | SGD hoặc Adam |

Điểm mấu chốt: output phải có **một feature cho mỗi class**. Kiểm tra số lớp:

```python
torch.unique(y_blob_train)
# tensor([0., 1., 2., 3.])
```

Bốn giá trị → `out_features=4`.

### 🏗️ `BlobModel`: nhận hyperparameter qua constructor

Lần này mình làm model **linh hoạt hơn** — nhận `input_features`, `output_features`, `hidden_units` làm tham số, thay vì hard-code:

```python
class BlobModel(nn.Module):
    """Initializes multi-class classification model.

    Args:
        input_features (int): Number of input features to the model
        output_features (int): Number of output features (classes)
        hidden_units (int): Number of hidden units between layers, default 8
    """
    def __init__(self, input_features, output_features, hidden_units=8):
        super().__init__()
        self.linear_layer_stack = nn.Sequential(
            nn.Linear(in_features=input_features, out_features=hidden_units),
            nn.ReLU(),
            nn.Linear(in_features=hidden_units, out_features=hidden_units),
            nn.ReLU(),
            nn.Linear(in_features=hidden_units, out_features=output_features),
        )

    def forward(self, x):
        return self.linear_layer_stack(x)
```

Cách đọc chuỗi layer:

1. `input_features (2) → hidden_units (8)`, rồi **ReLU**.
2. `hidden_units (8) → hidden_units (8)`, rồi **ReLU**.
3. `hidden_units (8) → output_features (4)` — **không** ReLU sau layer cuối, để giữ **logits** thô cho softmax/cross entropy.

Mình dùng `nn.Sequential` ở đây vì chỉ cần bước tuần tự qua các layer — đơn giản hơn viết từng layer rồi gọi lồng nhau. `forward()` chỉ việc `return self.linear_layer_stack(x)`.

**Docstring** theo *Google Python Style Guide* (một quy ước phổ biến): câu mô tả, rồi `Args:`, `Returns:`, `Errors:`. Người dùng class sau này sẽ biết mỗi tham số là gì.

### 🚀 Khởi tạo

```python
model_4 = BlobModel(input_features=2,
                    output_features=4,
                    hidden_units=8).to(device)
```

### 🐛 Một lỗi gõ tên đáng nhớ

Lần đầu mình gọi `BlobModel(input_features=2, output_features=4, ...)` và Python báo **`unexpected keyword argument 'output_features'`**. Lý do: tên tham số của `nn.Linear` là **`out_features`**, không phải `output_features` — mình nhầm giữa tham số của *model* (`output_features`) và tham số của *layer* (`out_features`). Cẩn thận chỗ này.

Shape đã khớp dữ liệu. Bài sau mình dựng **loss function + optimizer** cho model multiclass, rồi tiến tới training loop.
