---
title: 'Flatten feature map thành chuỗi patch embedding'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 242
status: edited
source: '242 - Flattening Our Convolutional Feature Maps into a Sequence of Patch Emb.md'
categories:
- AI
tags: []
---

# 🪜 Flatten feature map thành chuỗi patch embedding

> Nguồn: `242 - Flattening Our Convolutional Feature Maps into a Sequence of Patch Emb.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33982598)

Ta đang có 768 feature map 14×14 — đó chính là **patch embeddings**. Nhưng transformer encoder cần **sequence**, nên phải flatten hai chiều không gian. Đây có thể là phần quan trọng nhất của kiến trúc, nên đáng dành thời gian.

### 🎯 Đích cần đến

* Hiện tại: `(batch_size, embedding_dim, feature_map_height, feature_map_width)`.
* Mong muốn: `(batch_size, number_of_patches, embedding_dim)`.

Với số cụ thể: `(1, 768, 14, 14)` → `(1, 196, 768)`.

---

### 🔧 `nn.Flatten` với start_dim và end_dim

Trước đây mình dùng `Flatten` mà không truyền tham số. Lần này chỉ định rõ hai chiều cần gộp:

```python
flatten = nn.Flatten(start_dim=2, end_dim=3)
```

* `start_dim=2`, `end_dim=3` — gộp feature_map_height và feature_map_width.
* Giữ nguyên `dim 0` (batch) và `dim 1` (embedding).

Chạy thử:

```python
flattened = flatten(image_out_of_conv)
flattened.shape
```

Kết quả: `(1, 768, 196)`.

---

### 🔄 Đảo chiều bằng `permute`

Shape đã đúng các con số nhưng **sai thứ tự**: transformer cần `(batch, num_patches, embedding_dim)`. Ta đã dùng `permute` để đổi thứ tự chiều ảnh cho Matplotlib, hoàn toàn có thể làm tương tự:

```python
flattened.permute(0, 2, 1).shape
```

Kết quả: `(1, 196, 768)` — chính là input của transformer encoder.

---

### 🔗 Ghép toàn bộ luồng

```python
# 1. Ảnh gốc
print(f"Original image shape: {image.shape}")            # (3, 224, 224)

# 2. Cắt patch + tạo feature map
image_out_of_conv = conv2d(image.unsqueeze(0))
print(f"Image feature map shape: {image_out_of_conv.shape}")  # (1, 768, 14, 14)

# 3. Flatten
flattened = flatten(image_out_of_conv)
print(f"Flattened shape: {flattened.shape}")             # (1, 768, 196)

# 4. Đảo chiều
sequence = flattened.permute(0, 2, 1)
print(f"Sequence shape: {sequence.shape}")               # (1, 196, 768)
```

Vậy là từ một ảnh 2D đã ra một **chuỗi 1D của patch embeddings**.

---

### 🏋️ Thử thách

1. Visualize một trong các sequence đã flatten để xem nó trông thế nào.
2. Gộp `Conv2d` + `Flatten` (+ bước permute) thành **một PyTorch layer duy nhất**, để chỉ cần đưa ảnh hoặc batch ảnh vào là nhận đúng shape output.

---

### ✅ Chốt lại

`nn.Flatten(start_dim=2, end_dim=3)` + `permute(0, 2, 1)` cho ra `(1, 196, 768)`. Đây là input chuẩn cho transformer encoder. Bài sau mình đóng gói thành một layer hoàn chỉnh.
