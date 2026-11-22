---
title: 'Tạo patch embedding bằng convolutional layer'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 240
status: edited
source: '240 - Creating Patch Embeddings with a Convolutional Layer.md'
categories:
- AI
tags: []
---

# 🔲 Tạo patch embedding bằng convolutional layer

> Nguồn: `240 - Creating Patch Embeddings with a Convolutional Layer.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975338)

Đã cắt được ảnh thành 196 patch bằng vòng lặp — nhưng cách đó quá chậm. Giờ dùng **PyTorch layer** để vừa cắt patch vừa tạo embedding trong **một bước**.

### 🧠 Ý tưởng từ CNN Explainer

Nhớ lại CNN Explainer ở section PyTorch Computer Vision: **convolutional layer** có một kernel trượt qua ảnh. Nếu:

* **kernel size** = **patch size** (16×16),
* **stride** = **patch size** (16),

thì mỗi lần kernel nhảy đúng một patch. Mỗi patch được biến thành một **convolutional feature map** — mà feature map chính là một **learnable representation**, tức **embedding**.

### 📖 Paper xác nhận điều này

Phần *hybrid architecture* của Section 3.1 nói: "As an alternative to raw image patches, the input sequence can be formed from feature maps of a CNN" và "the patches can have a spatial size of 1×1, which means that the input sequence is obtained by simply flattening the spatial dimensions of the feature map and projecting to the transformer dimension." Đúng luồng ta đang làm.

### 🛠️ Code conv2d

```python
from torch import nn

conv2d = nn.Conv2d(
    in_channels=3,      # ảnh RGB
    out_channels=768,   # D từ Table 1 (hidden size)
    kernel_size=patch_size,  # 16
    stride=patch_size,       # 16
    padding=0,
)
```

`out_channels=768` chính là **embedding size** `D` của ViT-Base. Đổi con số này là đổi được biến thể model.

### 🚀 Chạy ảnh qua layer

Conv2d cần thêm **batch dimension**, nên dùng `unsqueeze`:

```python
image_out_of_conv = conv2d(image.unsqueeze(0))
image_out_of_conv.shape
```

Kết quả:

```text
torch.Size([1, 768, 14, 14])
```

Đọc shape:

* `1` — batch size.
* `768` — embedding dimension `D`.
* `14 × 14` — chính là **số patch** (196) xếp theo lưới, vì kernel trượt qua ảnh tạo ra 14×14 feature map.

Vậy ta đã có learnable representation của ảnh, đúng kích thước — chỉ còn cần **flatten** hai chiều cuối `14 × 14` thành một chiều `196`.

### 🏋️ Thử thách

Flatten `(1, 768, 14, 14)` thành `(1, 768, 196)` (hoặc tương đương) bằng **`torch.flatten`** hoặc các phép reshape. Bài sau làm cùng nhau.

---

### ✅ Chốt lại

Conv2d với kernel = stride = patch size vừa cắt patch vừa embed — nhanh hơn hẳn vòng lặp Matplotlib. Còn một bước flatten nữa là có chuỗi patch embedding đúng chuẩn Equation 1.
