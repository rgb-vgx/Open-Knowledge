---
title: 'Cài loss function và optimizer cho model multiclass'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 94
status: edited
source: '094 - Setting Up a Loss Function and Optimizer for Our Multi-Class Model.md'
categories:
- AI
tags: []
---

# 🎯 Cài loss function và optimizer cho model multiclass

> Nguồn: `094 - Setting Up a Loss Function and Optimizer for Our Multi-Class Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32881830)

`BlobModel` đã có, với `input_features`/`output_features` nhận qua constructor — nên nếu sau này có **10 lớp** thì chỉ cần truyền `output_features=10`, không phải sửa kiến trúc. Giờ chọn **loss function** và **optimizer**.

### 📚 Tìm loss function ở đâu

Trong `torch.nn` (bộ building block cho neural network) có mục loss functions. Đã biết:

* **Regression** → `nn.L1Loss`, `nn.MSELoss`.
* **Binary classification** → BCE.
* **Multiclass classification** → **cross entropy**.

Trong PyTorch, loss function còn được gọi là **criterion** (đôi khi "cost function"). `nn.CrossEntropyLoss` "tính cross entropy loss giữa input và target", dùng để train bài classification có **C lớp**.

### ⚖️ Về tham số `weight`

Tài liệu `nn.CrossEntropyLoss` có tham số tùy chọn **`weight`** — một tensor 1 chiều gán trọng số cho từng lớp. Hữu ích khi dataset **mất cân bằng**: ví dụ chỉ 10 chấm vàng nhưng 500 chấm xanh, 100 đỏ… Lúc đó gán trọng số cao hơn cho lớp ít mẫu giúp model chú ý tới chúng.

Dataset của mình **cân bằng** nên không cần — chỉ cần biết để dùng sau này.

### ⌨️ Code

```python
# Create a loss function for multi-class classification
loss_fn = nn.CrossEntropyLoss()

# Create an optimizer for multi-class classification
optimizer = torch.optim.SGD(params=model_4.parameters(),
                            lr=0.1)
```

Optimizer của multiclass **vẫn dùng được** các lựa chọn phổ biến như binary: **SGD** hoặc **Adam**. Không có "optimizer riêng cho multiclass" — optimizer khá linh hoạt, dùng chung được cho nhiều loại bài toán. `lr=0.1` lại là hyperparameter các bạn nên tự nghịch thử.

Vậy là đã có đủ **loss function** và **optimizer**. Nhưng trước khi viết training loop, mình cần xem **output của model multiclass** trông ra sao — đây là chỗ khác biệt lớn so với binary. Thử thách: tự chạy một forward pass với `X_blob_test` và xem có gì lạ không. Bài sau mình làm cùng nhau (và có một lỗi được cài sẵn để debug).
