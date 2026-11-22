---
title: 'Optimizer và loss function theo đúng paper ViT'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 261
status: edited
source: '261 - Creating a Loss Function and Optimizer from the ViT Paper.md'
categories:
- AI
tags: []
---

# 🛠️ Optimizer và loss function theo đúng paper ViT

> Nguồn: `261 - Creating a Loss Function and Optimizer from the ViT Paper.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34039184)

Ta đã replicate kiến trúc ViT. Giờ là lúc **train** nó trên dữ liệu Food Vision Mini để xem một kiến trúc computer vision state-of-the-art có "ăn" trên dữ liệu của riêng ta không. Mục đích của milestone project không chỉ là chép paper, mà là kiểm chứng nó trên dữ liệu custom.

### 🔍 Paper dùng optimizer gì?

Có thể dùng đại SGD hay Adam quen thuộc, nhưng vì đang replicate paper, hãy tra xem họ dùng gì. Tìm quanh mục **Training & Fine-tuning**: paper viết họ train mọi model **bằng Adam**, với:

* `beta1 = 0.9`
* `beta2 = 0.999`
* **batch size = 4096**
* **weight decay = 0.1**

Batch size 4096 quá lớn so với phần cứng của ta — và ta chỉ có khoảng **250 ảnh** train, nên không cần lớn vậy.

### 🎁 Vì sao betas gần như khỏi cần chỉnh?

Tra tài liệu `torch.optim.Adam`: hai hệ số `betas` mặc định chính là **`(0.9, 0.999)`** — đúng bằng paper dùng. Đây là ví dụ điển hình: hàm nào đã vào thư viện chuẩn PyTorch thường có default rất tốt, và paper cũng dùng đúng các giá trị đó.

Riêng **weight decay** mặc định là `0.0`, ta cần đặt `0.1`.

### 📏 Weight decay là gì?

Weight decay là một **kỹ thuật regularization**: cộng một **penalty nhỏ** (thường là L2 norm của trọng số) vào loss function. Mục đích là **chống overfitting** — khi trọng số có xu hướng phình to, weight decay "ghìm" lại một chút. Với `0.1`, nó chỉ tác động nhẹ nhàng, giúp mô hình không khớp quá mức vào train set.

### ⚙️ Viết optimizer

```python
optimizer = torch.optim.Adam(
    params=vit.parameters(),
    lr=1e-3,                 # Learning rate từ Table 3 (ViT-Base/16)
    betas=(0.9, 0.999),      # Đúng default của PyTorch và paper
    weight_decay=0.1,        # Paper dùng 0.1
)
```

Learning rate `1e-3` (tức `0.001`) lấy từ **Table 3**. Paper còn có **learning rate decay** và **learning rate warmup** — bạn có thể tìm hiểu thêm, nhưng ta bám theo công thức đơn giản nhất trước.

### 🎯 Loss function: cross entropy

Tra paper với các từ "loss function", "criterion", "cross entropy"... **không thấy kết quả**. Có vẻ paper ngầm giả định ta biết đây là bài toán **multiclass classification**, nên dùng cross entropy.

```python
loss_fn = torch.nn.CrossEntropyLoss()
```

Nếu bạn tìm ra chỗ paper nói rõ loss function, cho mình biết nhé.

### ✅ Chốt lại

Ta đã có optimizer (Adam theo paper) và loss (cross entropy). Đủ nguyên liệu: kiến trúc `ViT`, optimizer, loss, và hàm `train()` từ `engine.py` (Going Modular) với các tham số: model, train dataloader, test dataloader, optimizer, loss, số epoch (ví dụ `10`), device (GPU nếu có).

Thử thách: tự điền phần code train và xem điều gì xảy ra với **ViT custom đầu tiên** của bạn. Bài sau ta train cùng nhau!
