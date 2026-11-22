---
title: 'Chọn loss function, optimizer và viết hàm đánh giá accuracy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 77
status: edited
source: '077 - Loss Function Optimizer and Evaluation Function for Our Classification.md'
categories:
- AI
tags: []
---

# ⚖️ Loss function, optimizer và hàm accuracy cho bài phân loại

> Nguồn: `077 - Loss Function Optimizer and Evaluation Function for Our Classification.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820612)

Model đã xong, giờ tới bước chọn **loss function** và **optimizer**. Ở phần regression mình dùng `nn.L1Loss` (mean absolute error) — nhưng với classification thì **không dùng được** như vậy. Mỗi loại bài toán cần loss phù hợp.

### 🧾 Chọn loss theo bài toán

| Problem type | Loss function (PyTorch) | Optimizer |
|---|---|---|
| **Regression** | `nn.L1Loss` (MAE), `nn.MSELoss` (MSE) | SGD, Adam |
| **Binary classification** | `nn.BCEWithLogitsLoss` | SGD, Adam |
| **Multiclass classification** | `nn.CrossEntropyLoss` | SGD, Adam |

Với classification, phổ biến là **binary cross entropy** (gọi tắt BCE) hoặc **categorical cross entropy** (thường gọi ngắn là cross entropy). Nhắc lại vai trò: **loss function đo model dự đoán sai bao nhiêu** so với ground truth. Optimizer phổ biến nhất vẫn là **SGD** và **Adam** — không phải lúc nào cũng tốt nhất, nhưng đưa các bạn đi khá xa. `torch.optim` có hàng chục lựa chọn khác, còn `torch.nn` có cả bộ loss function.

### 🤯 "Logit" là cái gì?

Mình dùng `nn.BCEWithLogitsLoss`, và chữ **logits** làm mình bối rối hồi mới học. Trong thống kê, logit là **log odds** — công thức toán học rắc rối. Nhưng trong **deep learning** nó mang nghĩa khác, đại loại: **lớp đưa vào softmax** — tức lớp cuối cùng, trước khi ra xác suất. Đầu ra của softmax là xác suất cho bài classification, còn đầu vào của nó là logits.

### 🎛️ Loss function: `BCEWithLogitsLoss`

```python
# Create loss function
loss_fn = nn.BCEWithLogitsLoss()  # also built-in sigmoid activation
```

Điểm hay: `BCEWithLogitsLoss` **gộp sẵn hàm sigmoid** — đúng loại activation cho output của binary classification. PyTorch đã cài đặt công thức phía sau, mình không phải viết tay.

Vì sao không dùng `nn.BCELoss`? Vì `nn.BCELoss` **yêu cầu input đã đi qua sigmoid trước đó**. Tức là phải làm thủ công:

```python
# nn.BCELoss: inputs must go through sigmoid first
# nn.Sequential(nn.Sigmoid(), ...) then nn.BCELoss()
```

Còn `BCEWithLogitsLoss` thì **ổn định số học hơn** — theo tài liệu chính thức, nó kết hợp sigmoid và BCE trong một lớp, tận dụng **log-sum-exp trick** để tăng độ ổn định. Vì vậy mình chọn bản "with logits".

### 🚀 Optimizer: SGD

```python
# Create optimizer
optimizer = torch.optim.SGD(params=model_0.parameters(),
                            lr=0.1)
```

`params=model_0.parameters()` nói với SGD: "hãy cập nhật các parameter này của model". `lr=0.1` là **learning rate**. Loss function và optimizer sẽ phối hợp trong training loop: SGD cập nhật parameter theo hướng làm loss giảm. Nguyên lý giữ nguyên dù model có 100 layer và hàng triệu parameter.

### 📏 Thêm một evaluation metric: accuracy

Ngoài loss, với classification nên tính **accuracy** — trong 100 mẫu thì model đoán đúng bao nhiêu phần trăm. Mình viết bằng PyTorch thuần:

```python
def accuracy_fn(y_true, y_pred):
    """Calculates accuracy between truth labels and predictions."""
    correct = torch.eq(y_true, y_pred).sum().item()
    acc = (correct / len(y_pred)) * 100
    return acc
```

Đi từng bước:

1. `torch.eq(y_true, y_pred)` — xem những mẫu nào dự đoán **bằng** label thật.
2. `.sum().item()` — đếm số mẫu đúng, đổi ra một số Python.
3. Chia cho **tổng số mẫu** rồi nhân **100** để ra phần trăm.

Giờ đã đủ ba mảnh: **loss function**, **optimizer**, **hàm accuracy**. Bài tới mình sẽ nối chúng vào một **training loop** hoàn chỉnh.
