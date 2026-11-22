---
title: 'Cắt một ảnh thành patch (phần 2): toàn bộ ảnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 239
status: edited
source: '239 - Turning a Single Image into Patches (Part 2- Patching the Entire Image.md'
categories:
- AI
tags: []
---

# 🧩 Cắt một ảnh thành patch (phần 2): toàn bộ ảnh

> Nguồn: `239 - Turning a Single Image into Patches (Part 2- Patching the Entire Image.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975334)

Bài trước mới cắt hàng trên cùng. Giờ mở rộng ra **toàn bộ ảnh** — bước đầu tiên của patch + position embedding. Ảnh có thể là pizza, steak hay sushi tùy lần chạy; code phải chạy được với mọi ảnh.

### 🔢 Tính số patch

```python
image_size = 224
patch_size = 16
num_patches = image_size // patch_size
assert image_size % patch_size == 0, "Image size must be divisible by patch size"
```

In ra thông tin:

```text
Number of patches per row: 14
Number of patches per column: 14
Total patches: 196 (14 x 14)
```

196 patch, khớp đúng con số `N` đã tính bằng tay. Mỗi patch là **16 × 16 pixel**.

---

### 🖼️ Tạo lưới subplot 14 × 14

Lần này cần **cả chiều cao lẫn chiều rộng**:

```python
fig, ax = plt.subplots(nrows=image_size // patch_size,
                       ncols=image_size // patch_size,
                       figsize=(num_patches, num_patches),
                       sharex=True,
                       sharey=True)
```

Vì có tới **196 subplot**, việc vẽ khá nặng CPU — trên Colab mất khoảng **40 giây**. Đây chỉ là code visualize, không phải code chạy trong model.

---

### 🔁 Hai vòng lặp lồng nhau

```python
for i, patch_height in enumerate(range(0, image_size, patch_size)):
    for j, patch_width in enumerate(range(0, image_size, patch_size)):
        ax[i, j].imshow(image_permuted[
            patch_height:patch_height + patch_size,
            patch_width:patch_width + patch_size,
            :
        ])
        ax[i, j].set_ylabel(i + 1, rotation="vertical", va="center")
        ax[i, j].set_xlabel(j + 1)
        ax[i, j].set_xticks([])
        ax[i, j].set_yticks([])
        ax[i, j].label_outer()

fig.suptitle(f"{class_names[label]} -> Patchified", fontsize=16)
plt.show()
```

Điểm mấu chốt là indexing: chiều đầu tiên là **patch_height → patch_height + patch_size**, chiều thứ hai là **patch_width → patch_width + patch_size**, chiều cuối lấy **toàn bộ color channels**. `ax[i, j]` đi qua lần lượt `(0,0), (0,1), ... (1,0), ...` cho đủ 196 ô.

Mấy tham số `rotation`, `va`, `label_outer` là mình phải mò trong **Matplotlib docs** khá lâu mới ra — không tự nhiên mà biết được.

Kết quả: ảnh được "patchified" — 14 hàng × 14 cột, mỗi ô là một mẩu ảnh.

---

### ⚡ Vấn đề: code này quá chậm

Nếu phải vẽ 196 plot cho mỗi ảnh, với hàng nghìn ảnh thì mạng sẽ không chạy nổi. Ta cần cách biến mỗi patch thành **embedding** — từ 196 patch thành 196 vector 768 chiều — bằng một layer chạy nhanh.

Gợi ý: layer nào đã dùng mà **trượt qua ảnh như một cửa sổ**? Đã học ở section **PyTorch Computer Vision**. Đó là **convolutional layer**, và bài sau mình sẽ dùng nó.

---

### ✅ Chốt lại

Toàn bộ ảnh đã cắt thành 196 patch, nhưng cách này chỉ để nhìn. Bước tiếp theo là dùng convolution để vừa cắt patch vừa embed, nhanh gấp nhiều lần.
