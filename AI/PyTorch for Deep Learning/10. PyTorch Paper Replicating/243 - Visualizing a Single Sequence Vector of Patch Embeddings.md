---
title: 'Visualize một vector trong chuỗi patch embedding'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 243
status: edited
source: '243 - Visualizing a Single Sequence Vector of Patch Embeddings.md'
categories:
- AI
tags: []
---

# 🎨 Visualize một vector trong chuỗi patch embedding

> Nguồn: `243 - Visualizing a Single Sequence Vector of Patch Embeddings.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33982600)

Đã có input shape đúng cho transformer encoder — một cột mốc lớn. Nhưng trước khi đi tiếp, mình muốn nhìn tận mắt một vector trong chuỗi patch embedding.

### 📌 Lấy một vector ra

Lưu ý có hai biến: bản gốc `image_out_of_conv_flattened` shape `(1, 768, 196)` và bản đã `permute` shape `(1, 196, 768)`. Ta muốn bản đã permute, rồi lấy **patch index 0**:

```python
single_flattened_feature_map = image_out_of_conv_flattened_permuted[:, 0, :]
```

Chỗ indexing đọc là: `:` — toàn bộ batch; `0` — patch đầu tiên; `:` — toàn bộ embedding dimension (768). Kết quả shape `(1, 768)`.

Đây chính là **embedding vector** đại diện một patch. Một ảnh được biểu diễn bởi 196 vector như vậy, mỗi vector 768 chiều.

### 👀 Plot vector đó

```python
plt.figure(figsize=(22, 22))
plt.imshow(single_flattened_feature_map.detach().numpy())
plt.title(f"Flattened feature map shape: {single_flattened_feature_map.shape}")
plt.axis(False)
```

Lại phải `detach().numpy()` — Matplotlib không nhận tensor đang track gradient. Hình ra là một dải 1×768 trông chẳng giống gì cả. Và điều đó ổn: **không phải mình cần hiểu nó**, mà model cần dùng nó. Đây là biểu diễn **learnable**, sẽ được cập nhật dần qua train.

### 🧱 Ta đang ở đâu trong Equation 1

Đã xong phần **patch embedding**:

* Ảnh → cắt patch → **linear projection** (conv2d) → chuỗi patch embeddings.

Còn thiếu hai thứ nữa của Equation 1:

* **Class token embedding** (learnable).
* **Position embedding**.

Sẽ làm ở các bài sau.

### 🏋️ Thử thách

Gộp **convolutional layer** và **flatten layer** thành một **PyTorch layer duy nhất**, để chỉ cần đưa ảnh (hoặc batch ảnh) vào là nhận thẳng chuỗi patch embedding.

---

### ✅ Chốt lại

Một patch embedding là vector 768 chiều, khó nhìn nhưng học được. Bài sau mình đóng gói conv + flatten thành một layer hoàn chỉnh.
