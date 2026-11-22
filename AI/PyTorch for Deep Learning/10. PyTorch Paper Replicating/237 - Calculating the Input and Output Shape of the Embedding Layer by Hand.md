---
title: 'Tính input và output shape của embedding layer bằng tay'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 237
status: edited
source: '237 - Calculating the Input and Output Shape of the Embedding Layer by Hand.md'
categories:
- AI
tags: []
---

# ✍️ Tính input và output shape của embedding layer bằng tay

> Nguồn: `237 - Calculating the Input and Output Shape of the Embedding Layer by Hand.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975328)

Đủ lý thuyết rồi, giờ chuẩn bị code. Việc đầu tiên khi replicate bất kỳ layer nào: xác định **input shape** và **output shape**. Một trong những lỗi phổ biến nhất của deep learning là **shape không khớp** — nên tính tay trước, rồi mới viết code.

### 📐 Nomenclature của paper

`ViT-B/16` = **ViT-Base**, patch size **16 × 16**. Tương tự `ViT-L/16` là bản Large. Vậy `P = 16` cho cả ba biến thể.

---

### 🧾 Công thức từ Section 3.1

* Input ảnh: `x ∈ R^(H×W×C)`.
* Sequence patch sau khi flatten: `x_p ∈ R^(N × (P²·C))`.
* Số patch: `N = H·W / P²`.
* Latent size: `D`, cũng chính là **embedding dimension** / **hidden size** trong Table 1.

---

### 🔢 Thay số cụ thể

Chọn các giá trị mẫu:

```python
height = 224
width = 224
color_channels = 3
patch_size = 16
```

Tính số patch:

```python
number_of_patches = int((height * width) / patch_size**2)
```

Kết quả: **196**. Vì `224 × 224 = 50176`, chia `16² = 256` được đúng 196.

Tính input shape của patch embedding layer:

```python
embedding_layer_input_shape = (height, width, color_channels)
```

→ `(224, 224, 3)` — một ảnh 2D đơn lẻ. Lưu ý PyTorch mặc định **channels first**, tức `(3, 224, 224)`; ở đây ta đang lý luận theo thứ tự height/width/channels.

Tính output shape — chuỗi patch 1D:

```python
embedding_layer_output_shape = (number_of_patches, patch_size**2 * color_channels)
```

→ `(196, 768)`.

Con số **768** đến từ đâu? Đúng là `P²·C = 16²·3 = 768` — và trùng khớp với **hidden size `D = 768`** của ViT-Base trong Table 1. Không hề hard-code, nó được suy ra từ patch size và số color channel.

---

### 🤔 Từ shape này sang shape kia bằng cách nào?

Input là `(224, 224, 3)`, output là `(196, 768)`. Làm sao biến đổi? Đoạn animation trong bài trước đã gợi ý (dùng một layer quen thuộc), và vài bài tới sẽ dùng PyTorch layer thật để làm việc này. Trước hết cứ tự nghĩ xem — gợi ý: cắt ảnh thành patch 16×16 rồi embed từng patch.

---

### 📈 Một chi tiết từ paper

ViT-B/16 trên ImageNet đạt khoảng **76–77%** trên 1000 class — khá ấn tượng. Đó là con số mình đang nhắm tới về mặt kiến trúc, dù bài toán thật của mình nhỏ hơn nhiều.

---

### ✅ Chốt lại

Input `(224, 224, 3)` → output `(196, 768)`, tính tay rõ ràng. Bài sau mình bắt đầu cắt ảnh thành patch — bắt đầu từ hàng trên cùng.
