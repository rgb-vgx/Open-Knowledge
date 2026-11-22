---
title: 'Train ViT feature extractor: transfer learning thắng lớn'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 267
status: edited
source: '267 - Training a Pretrained ViT Feature Extractor Model for Food Vision Mini.md'
categories:
- AI
tags: []
---

# 🏆 Train ViT feature extractor: transfer learning thắng lớn

> Nguồn: `267 - Training a Pretrained ViT Feature Extractor Model for Food Vision Mini.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049496)

Đã chuẩn bị dữ liệu đúng transform, giờ train pre-trained ViT và xem nó có đánh bại bản custom không. Theo paper và những gì đã làm, ta vẫn dùng **Adam** với **lr = 1e-3** và **cross entropy loss**:

```python
optimizer = torch.optim.Adam(
    params=pretrained_vit.parameters(),
    lr=1e-3,
)
loss_fn = torch.nn.CrossEntropyLoss()
```

Lưu ý: `pretrained_vit.parameters()` chỉ cập nhật các tham số **trainable** — tức phần **head classifier** mới. Backbone đã bị đóng băng.

### 🚀 Train 10 epoch

```python
pretrained_vit_results = engine.train(
    model=pretrained_vit,
    train_dataloader=train_dataloader_pretrained,
    test_dataloader=test_dataloader_pretrained,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=10,
    device=device,
)
```

Dùng đúng `train_dataloader_pretrained` và `test_dataloader_pretrained` — bộ dataloader đã được transform khớp với model pre-trained.

### 📊 Kết quả: khác một trời một vực

Ngay từ đầu đã **hơn 90%** test accuracy, train accuracy lên **95-97%**, loss đi xuống đúng hướng. Có lúc dao động quanh 90 rồi vượt gần 94, kết thúc vững vàng.

So sánh trực tiếp:

| | Custom ViT | Pre-trained ViT |
|---|---|---|
| Test accuracy | **~26%** | **~90%+** |
| Thời gian/iteration | ~5,4 giây | ~3,3 giây |

Model pre-trained **vừa chính xác hơn hẳn, vừa nhanh hơn**. Đây có lẽ là model tốt nhất từ trước tới nay của ta.

### 📈 Loss curve rất đẹp

```python
from helper_functions import plot_loss_curves

plot_loss_curves(pretrained_vit_results)
```

Loss đi đúng hướng, accuracy đi đúng hướng. Chưa nằm đúng "Goldilocks zone" hoàn hảo, nhưng đẹp hơn hẳn lần trước. Cách cải thiện thêm số một vẫn là **thêm dữ liệu** — biện pháp hiệu quả nhất cho deep learning.

### 💡 Sức mạnh của transfer learning

Ta mất cả một section để replicate ViT từ đầu. Còn bản pre-trained: khoảng **20 dòng code** (thậm chí ít hơn) kết hợp `torchvision.models` và weights có sẵn, đã cho kết quả vượt trội trên lượng dữ liệu nhỏ. Đó là sức mạnh của transfer learning.

### 🎁 Thử thách và nơi tìm model pre-trained

* Thử bộ weights **SWAG** (trong `torchvision`) — quy trình tương tự, kết quả trên ImageNet còn tốt hơn.
* Nguồn model pre-trained: **torchvision**, **Hugging Face Hub**, **`timm`** (PyTorch Image Models), và **Papers with Code** (research state-of-the-art kèm code).

### ✅ Tiếp theo

Model đã chạy tốt, giờ hãy **lưu lại** model tốt nhất (bản pre-trained) và **kiểm tra kích thước file** — vì dù chính xác nhất, file có thể quá lớn để deploy. Bài sau ta làm việc đó.
