---
title: 'Khám phá output của convolutional patch embedding layer'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 241
status: edited
source: '241 - Exploring the Outputs of Our Convolutional Patch Embedding Layer.md'
categories:
- AI
tags: []
---

# 🔬 Khám phá output của convolutional patch embedding layer

> Nguồn: `241 - Exploring the Outputs of Our Convolutional Patch Embedding Layer.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975340)

Sau khi đưa một ảnh qua `Conv2d`, ta có tensor `(1, 768, 14, 14)`. Bài này mình giải thích từng chiều và ngó thử các **feature map** — trước khi flatten thành sequence.

### 🏷️ Đọc lại shape

* Chiều 1: **batch size**.
* Chiều 2: **embedding dimension** (768).
* Chiều 3–4: **feature map height** và **feature map width** (14 × 14).

Cả ba đều là **learnable**. Kiểm tra bằng:

```python
image_out_of_conv.requires_grad
```

Nếu `True`, PyTorch đang track gradient — nghĩa là các giá trị này sẽ được cập nhật khi gọi `optimizer.step()` trong vòng train, dần trở thành biểu diễn tốt hơn cho ảnh.

### 🎲 Visualize vài feature map ngẫu nhiên

Có 768 feature map 14×14, không thể vẽ hết. Chọn ngẫu nhiên 5 cái:

```python
import random

random_indexes = random.sample(range(0, 768), k=5)
```

```python
fig, ax = plt.subplots(nrows=1, ncols=5, figsize=(12, 12))

for i, index in enumerate(random_indexes):
    image_conv_feature_map = image_out_of_conv[:, index, :, :]
    ax[i].imshow(image_conv_feature_map.squeeze().detach().numpy())
    ax[i].set(xticklabels=[], yticklabels=[], xticks=[], yticks=[])
```

### ⚠️ Lỗi gặp phải: tensor requires grad

Lần đầu mình quên `detach()` và gặp lỗi:

```text
RuntimeError: Can't call numpy() on Tensor that requires grad. Use tensor.detach().numpy() instead.
```

Giải thích: tensor có `requires_grad=True` không thể chuyển thẳng sang NumPy. Phải **detach** khỏi grad tracking rồi mới `.numpy()`.

* `squeeze()` — bỏ chiều batch.
* `detach()` — rời khỏi grad tracking.
* `.numpy()` — chuyển sang NumPy cho Matplotlib.

### 🍕 Feature map trông thế nào

Ban đầu các feature map trông như "nothingness" — toàn nhiễu. Nhưng nhìn kỹ có thể thấy vài đường viền mờ của chiếc pizza. Đó là vì trọng số conv **khởi tạo ngẫu nhiên**; qua quá trình train, chúng sẽ dần học ra nét có ý nghĩa. Ta không cần tự hiểu từng feature map — máy sẽ tự tìm ra biểu diễn phù hợp.

### 🪜 Bước còn lại: flatten

Hai chiều cuối `14 × 14` cần gộp thành một chiều **196**, để có sequence như transformer cần. Paper nói: "the input sequence is obtained by simply flattening the spatial dimensions of the feature map". Dùng **`torch.flatten`**.

### 🏋️ Thử thách

Lấy input `(1, 768, 14, 14)` đưa qua `torch.flatten`, làm sao ra `(1, 768, 196)`.

---

### ✅ Chốt lại

Feature map là biểu diễn học được của ảnh, không phải ảnh gốc — muốn vẽ phải `detach().numpy()`. Bài sau mình flatten để có chuỗi 196 patch embedding.
