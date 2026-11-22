---
title: 'Cắt một ảnh thành patch (phần 1): hàng trên cùng'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 238
status: edited
source: '238 - Turning a Single Image into Patches (Part 1- Patching the Top Row).md'
categories:
- AI
tags: []
---

# ✂️ Cắt một ảnh thành patch (phần 1): hàng trên cùng

> Nguồn: `238 - Turning a Single Image into Patches (Part 1- Patching the Top Row).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975332)

Đã biết input shape và output shape của Equation 1. Giờ đi từng bước nhỏ: lấy **một ảnh**, cắt thành **patch**, rồi tiến tới **patch embedding**. Mình vẫn theo hai châm ngôn: **visualize, visualize, visualize** và **if in doubt, code it out**.

### 🖼️ Nhìn lại ảnh

```python
plt.imshow(image.permute(1, 2, 0))
plt.title(class_names[label])
plt.axis(False)
```

Ảnh sẽ khác mỗi lần chạy vì DataLoader shuffle ngẫu nhiên — không sao. Ảnh đang có shape `(3, 224, 224)`; ta cần biến nó thành `(N, D)` — `N` là số patch, `D` là embedding size (`P²·C = 768`).

### ➡️ Chuyển sang channels last

```python
image_permuted = image.permute(1, 2, 0)  # (H, W, C)
```

Matplotlib cần **channels last**, nên `image_permuted` có shape `(224, 224, 3)`.

```python
patch_size = 16
```

Lấy **hàng trên cùng** — chỉ 16 pixel chiều cao, toàn bộ chiều rộng:

```python
plt.figure(figsize=(patch_size, patch_size))
plt.imshow(image_permuted[:patch_size, :, :])
```

Kết quả là một dải mỏng, chỉ thấy viền bánh pizza ở mép. Đó là 16 pixel đầu tiên theo chiều cao.

### 🧩 Cắt hàng trên thành từng patch

Số patch mỗi hàng:

```python
patches = image_size // patch_size
assert image_size % patch_size == 0, "Image size must be divisible by patch size"
```

Với 224 và 16: `patches = 14` — đúng 14 patch trên một hàng. Assertion đảm bảo ảnh chia hết cho patch size, tránh patch lẻ.

Tạo lưới subplot — mỗi patch một cột:

```python
fig, ax = plt.subplots(nrows=1,
                       ncols=image_size // patch_size,
                       sharex=True,
                       sharey=True,
                       figsize=(patch_size, patch_size))
```

`sharex`/`sharey` cho các subplot dùng chung trục tọa độ.

Lặp qua các patch, bước nhảy `patch_size`:

```python
for i, patch in enumerate(range(0, image_size, patch_size)):
    ax[i].imshow(image_permuted[:patch_size, patch:patch + patch_size, :])
    ax[i].set_xlabel(i + 1)
    ax[i].set_xticks([])
    ax[i].set_yticks([])
```

Vòng lặp cho ra các khoảng `0–16, 16–32, 32–48, ...` — mỗi đoạn là một patch 16×16. Kết quả: hàng trên cùng của ảnh được tách thành 14 ô riêng biệt.

### 🧠 Vì sao patch embedding quan trọng

Một người bạn ML engineer của mình hay nói: **"it's all about the embedding"**. Nếu biểu diễn được data thành một **learnable representation** tốt, kiến trúc model thường sẽ học được. Nên phần patch embedding đáng để hiểu kỹ.

### 🏋️ Thử thách

Mở rộng code trên cho **toàn bộ ảnh**, không chỉ hàng đầu. Gợi ý: cần thêm một vòng lặp theo chiều **height**, ngoài vòng lặp theo **width** hiện có.

---

### ✅ Chốt lại

Đã cắt được hàng trên thành 14 patch 16×16. Bài sau mình làm cho cả ảnh — 196 patch.
