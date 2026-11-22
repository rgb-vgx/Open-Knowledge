---
title: 'Viết hàm hiển thị ảnh ngẫu nhiên từ custom dataset'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 149
status: edited
source: '149 - Writing a Helper Function to Visualize Random Images from Our Custom D.md'
categories:
- AI
tags: []
---

# 🎞️ Viết hàm hiển thị ảnh ngẫu nhiên từ custom dataset

> Nguồn: `149 - Writing a Helper Function to Visualize Random Images from Our Custom D.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32723166)

Lại là khẩu hiệu "visualize, visualize, visualize". Custom dataset đã khớp về số lượng và class names, nhưng như mình hay nói: chưa nhìn tận mắt thì chưa yên tâm. Bài này mình viết hàm `display_random_images`, nhận vào một dataset và vẽ ra các ảnh ngẫu nhiên kèm nhãn — dùng được cho cả `ImageFolder` lẫn `ImageFolderCustom`.

### 📋 Các bước của hàm

1. Nhận vào một **dataset**, danh sách **class names**, số ảnh **n** (mặc định 10), cờ hiển thị shape và **seed**.
2. **Giới hạn n ≤ 10** để hình không bị rối.
3. Đặt **random seed** để tái lập.
4. Lấy **chỉ số ngẫu nhiên** từ dataset.
5. Tạo figure Matplotlib.
6. Lặp qua các chỉ số, lấy `(image, label)` và vẽ.
7. **Đổi shape** ảnh cho khớp Matplotlib (channels-last).

### 🔥 Code đầy đủ

```python
import random

def display_random_images(dataset, classes=None, n=10, display_shape=True, seed=None):
    if n > 10:
        n = 10
        display_shape = False
        print(f"For display purposes, n shouldn't be larger than 10, setting to 10 and removing shape display.")

    if seed:
        random.seed(seed)

    random_samples_idx = random.sample(range(len(dataset)), k=n)

    plt.figure(figsize=(16, 8))
    for i, targ_sample in enumerate(random_samples_idx):
        targ_image, targ_label = dataset[targ_sample][0], dataset[targ_sample][1]

        targ_image_adjust = targ_image.permute(1, 2, 0)

        plt.subplot(1, n, i + 1)
        plt.imshow(targ_image_adjust)
        plt.axis("off")
        if classes:
            title = f"Class: {classes[targ_label]}"
            if display_shape:
                title = title + f"\nshape: {targ_image_adjust.shape}"
        plt.title(title)
```

### 🔍 Giải thích các điểm chính

* **Giới hạn `n`**: nếu truyền 20, hàm tự hạ về `10` và tắt hiển thị shape — vì 20 ảnh trên một hàng sẽ không đọc được.
* **`random.sample(range(len(dataset)), k=n)`** — lấy **n chỉ số không trùng** trong khoảng `0..len-1`.
* **`dataset[targ_sample][0]` và `[1]`** — mỗi mẫu là tuple `(image, label)`; tách lấy ảnh và nhãn.
* **`permute(1, 2, 0)`** — lại đổi channels-first `(C, H, W)` về channels-last `(H, W, C)` cho Matplotlib.
* **`plt.subplot(1, n, i + 1)`** — một hàng, `n` cột, vị trí `i+1`.

### 🖼️ Dùng với cả hai loại dataset

```python
# Dataset tạo bằng ImageFolder
display_random_images(train_data, n=5, classes=class_names, seed=None)

# Dataset tạo bằng ImageFolderCustom
display_random_images(train_data_custom, n=10, classes=class_names, seed=42)
```

Với cả hai, ảnh hiện ra kèm nhãn (sushi, pizza, steak...) và shape `[64, 64, 3]`. Truyền `n=20` thì hàm in dòng "n shouldn't be larger than 10..." và chỉ hiển thị 10.

### ✅ Tạm kết

Vậy là custom dataset đã được kiểm chứng **cả định lượng lẫn định tính** — số lượng khớp, ảnh trông giống hệt bản `ImageFolder`. Còn một bước cuối để dùng được: biến `train_data_custom`/`test_data_custom` thành `DataLoader`. Các bạn thử trước nhé, bài sau mình làm cùng.
