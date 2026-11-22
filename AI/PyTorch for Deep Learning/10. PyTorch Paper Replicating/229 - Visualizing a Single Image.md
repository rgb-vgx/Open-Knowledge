---
title: 'Visualize một ảnh và kiểm tra shape'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 229
status: edited
source: '229 - Visualizing a Single Image.md'
categories:
- AI
tags: []
---

# 🖼️ Visualize một ảnh và kiểm tra shape

> Nguồn: `229 - Visualizing a Single Image.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975306)

Thử thách bài trước: lấy một ảnh từ DataLoader ra và plot. Ảnh của bạn là pizza, steak hay sushi? Ảnh sẽ khác nhau mỗi lần chạy vì DataLoader **shuffle** randomly — không sao cả, mình chỉ cần một mẫu để ngó.

### 📦 Lấy một ảnh ra khỏi batch

DataLoader trả về **batch ảnh** và **batch label**. Muốn lấy một ảnh, ta biến DataLoader thành **Python iterator** rồi gọi `next()`:

```python
image_batch, label_batch = next(iter(train_dataloader))
image, label = image_batch[0], label_batch[0]
```

### 🔍 Kiểm tra shape

Luôn kiểm tra shape cho chắc:

```python
image.shape, label
```

Kết quả:

* `image.shape` → `torch.Size([3, 224, 224])` — **3 color channels** (red, green, blue), chiều cao và rộng **224 × 224**, đúng như `IMAGE_SIZE` đã set và đúng **Table 3** của paper (training resolution 224).
* `label` → một scalar, ví dụ `0`.

### 🎨 Plot ảnh với Matplotlib

```python
import matplotlib.pyplot as plt

plt.imshow(image.permute(1, 2, 0))
plt.title(class_names[label])
plt.axis(False)
```

Chỗ quan trọng: phải **`permute(1, 2, 0)`**. Matplotlib thích **color channels last**, còn tensor của PyTorch đang là **channels first** — tức `[color_channels, height, width]`. `permute(1, 2, 0)` đổi thứ tự dimension để channel nằm cuối. Không làm bước này là ảnh hiển thị sai màu hoặc báo lỗi.

Plot ra một chiếc pizza trông ổn, hoặc steak — miễn là thấy đúng món thì data đã load chuẩn.

---

### ✅ Chốt lại

Ảnh đã hiển thị đúng, shape khớp paper. Giờ đến phần khó: ghép các mảnh của kiến trúc **ViT** lại. Bài sau mình phác tổng quan trước khi viết code.
