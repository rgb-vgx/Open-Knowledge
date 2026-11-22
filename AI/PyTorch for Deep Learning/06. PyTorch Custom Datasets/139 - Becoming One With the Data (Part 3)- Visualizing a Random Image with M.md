---
title: 'Làm quen dữ liệu (phần 3): visualize ảnh bằng Matplotlib'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 139
status: edited
source: '139 - Becoming One With the Data (Part 3)- Visualizing a Random Image with M.md'
categories:
- AI
tags: []
---

# 📊 Làm quen dữ liệu (phần 3): visualize ảnh bằng Matplotlib

> Nguồn: `139 - Becoming One With the Data (Part 3)- Visualizing a Random Image with M.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32709558)

Đây là lời giải cho thử thách bài trước: dùng **Matplotlib** để hiển thị ảnh thay vì chỉ in metadata. Trên đường đi, mình sẽ nói về một trong những nguồn lỗi phổ biến nhất của deep learning — **shape mismatch** — và giải thích **color channels last** so với **color channels first**.

### 🧪 Mấu chốt: ảnh phải thành array

Matplotlib hiển thị được ảnh vì nó nhận **array số**. Ta đã mở ảnh bằng PIL ở bài trước, giờ chỉ cần chuyển sang NumPy array:

```python
import matplotlib.pyplot as plt
import numpy as np

img_as_array = np.asarray(img)
```

Transcript gốc nói "transform your image to an array" — đó là bước bắt buộc, và là chỗ nhiều bạn sẽ tự phát hiện ra khi gặp lỗi.

### 📈 Vẽ ảnh và tiêu đề

```python
plt.figure(figsize=(10, 7))
plt.imshow(img_as_array)
plt.title(f"Image class: {image_class} | Image shape: {img_as_array.shape} -> [height, width, color_channels]")
plt.axis(False)
```

`figsize=(10, 7)` đặt kích thước figure; `axis(False)` tắt trục tọa độ cho gọn.

### 🔍 Đọc shape: 512 × 363 × 3

Kết quả cho `Image shape: (512, 363, 3)`. Hiểu là:

* **height = 512 pixel**
* **width = 363 pixel**
* **3 color channels**

Đây là format **color channels last** — channel nằm cuối cùng. Đó cũng là mặc định của **PIL** và **Matplotlib**. Nhưng PyTorch mặc định là **color channels first** (channel đứng đầu). Có nhiều tranh luận về thứ tự nào tốt hơn, và xu hướng đang dần nghiêng về channels-last; nhưng hiện tại, ta cứ biết PyTorch dùng channels-first và có thể **hoán đổi chiều** khi cần.

Ba channel đó là **đỏ, xanh lá, xanh dương (RGB)** — trộn lại theo cách nào đó thì ra màu của ảnh.

### ⚠️ Vì sao shape lại quan trọng?

Mình nhấn mạnh: một trong những lỗi chính của machine learning/deep learning là **shape mismatch**. Biết shape dữ liệu giúp các bạn hình dung được các layer của model cần shape gì, dữ liệu khác cần shape gì. Đây là lý do phải in shape ra ngay khi khám phá dữ liệu.

### 🎨 Xem thêm một ảnh nữa

Mình vẽ thêm một ảnh pizza với shape `(512, 512, 3)` — lần này vuông, nhưng vẫn channels-last và 3 channel. Điều này cho thấy **kích thước ảnh thay đổi** giữa các ảnh, dù đều là ảnh màu 3 channel. Đó chính là lý do sau này ta phải **resize** về cùng một kích thước.

### ✅ Tạm kết

Vậy là ta đã "become one with the data" bằng cách visualize ảnh. Cùng ý tưởng này áp dụng được cho text (xem mẫu text) hay audio (nghe thử), tùy domain. Giờ dữ liệu đã quen mặt, nhưng vẫn là file ảnh — bước tiếp theo là **biến toàn bộ ảnh thành tensor** để PyTorch dùng được. Hẹn các bạn ở bài sau.
