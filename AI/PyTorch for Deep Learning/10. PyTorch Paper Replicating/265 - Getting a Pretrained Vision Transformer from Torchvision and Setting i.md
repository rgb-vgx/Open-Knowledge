---
title: 'Transfer learning: lấy ViT pre-trained từ torchvision và thay head'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 265
status: edited
source: '265 - Getting a Pretrained Vision Transformer from Torchvision and Setting i.md'
categories:
- AI
tags: []
---

# 🎁 Transfer learning: lấy ViT pre-trained từ torchvision và thay head

> Nguồn: `265 - Getting a Pretrained Vision Transformer from Torchvision and Setting i.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049490)

Loss curve cho thấy model ta vừa underfit vừa overfit. Điểm chung của cách xử lý cả hai — ở Section 6 — là **transfer learning**: lấy một model đã học trên bài toán tương tự rồi tinh chỉnh cho bài toán của ta. Với deep learning, nếu có sẵn model pre-trained trên dữ liệu lớn, đó thường là **điểm khởi đầu tốt**.

### 💡 Vì sao dùng model pre-trained?

* Dữ liệu của ta **hạn chế** (225 ảnh).
* Tài nguyên huấn luyện **hạn chế**.
* Muốn **kết quả tốt nhanh hơn**.

Nhìn vào paper ViT: model lớn nhất **L/16** pre-train trên ImageNet-21k mất **khoảng 30 ngày** trên TPU v3 8 nhân. Thuê TPU v3 8 nhân trên Google Cloud khoảng **$8/giờ**, nên:

```python
cost = 30 * 24 * 8   # $5,760
```

Đó là chưa kể các model khổng lồ khác như BLOOM (hơn **3 tháng** train). Với người mới, con số này quá đắt. Ta cần chạy nhanh, tận dụng GPU miễn phí. Dùng model pre-trained là hợp lý.

---

### 📥 Lấy weights từ torchvision

Từ torchvision **0.13+** có API mới cho pretrained weights. Yêu cầu torchvision ≥ 0.12, nhưng ta dùng 0.13+.

```python
import torch
import torchvision
from torchvision.models import vit_b_16, ViT_B_16_Weights

device = "cuda" if torch.cuda.is_available() else "cpu"

# weights tốt nhất hiện có (mặc định)
pretrained_vit_weights = ViT_B_16_Weights.DEFAULT

# khởi tạo model với weights pre-trained
pretrained_vit = vit_b_16(weights=pretrained_vit_weights).to(device)
```

`ViT_B_16_Weights.DEFAULT` nghĩa là **best available** — nếu weights được cập nhật, ta tự động dùng bản tốt nhất. Ngoài ViT-Base, torchvision còn có ViT-L và ViT-Huge, nhưng ta bắt đầu với Base.

---

### 🧊 Đóng băng backbone

Ta muốn **giữ nguyên** phần base (đã học trên ImageNet) và chỉ huấn luyện phần **head** cho bài toán của mình. Đóng băng bằng cách tắt gradient:

```python
for param in pretrained_vit.parameters():
    param.requires_grad = False
```

Kiểm tra bằng `torchinfo.summary`: tổng tham số **86.567.656** (do head có 1000 lớp), nhưng tất cả đều **không trainable**.

---

### 🔄 Thay classifier head

ViT trong torchvision có hai phần chính: backbone và `heads`. Ta thay `heads` bằng một `nn.Linear` mới, chiếu từ **embedding dimension 768** ra **số lớp của ta**:

```python
torch.manual_seed(42)
pretrained_vit.heads = nn.Linear(in_features=768, out_features=len(class_names)).to(device)
```

Đây chính là chỗ ta sửa **MLP head (Equation 4)** của bản pre-trained cho hợp bài toán. Kết quả:

* Tổng tham số: **85,800,963**.
* Chỉ **2.307** tham số là **trainable** (3 × 768 + 3) — phần head mới.

Ta dùng phần base để **trích xuất biểu diễn ảnh**, rồi đưa vào layer top mới học.

---

### 🤯 Một phát hiện thú vị

Số tham số **85.800.963** giống hệt bản ViT ta tự dựng từ đầu! Nghĩa là ta đã dựng ra **cùng loại kiến trúc** như đội PyTorch làm. Tuyệt chưa!

---

### ✅ Tiếp theo

Giờ hãy thử **train** pre-trained ViT theo đúng cách ta đã train bản custom, rồi so sánh kết quả: model pre-trained có khắc phục được underfitting/overfitting không? Thử trước nhé, bài sau ta làm cùng nhau.
