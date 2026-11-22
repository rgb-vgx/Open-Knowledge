---
title: 'Transform dữ liệu (phần 2): visualize ảnh gốc và ảnh sau transform'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 141
status: edited
source: '141 - Transforming Data (Part 2)- Visualizing Transformed Images.md'
categories:
- AI
tags: []
---

# 🔬 Transform dữ liệu (phần 2): visualize ảnh gốc và ảnh sau transform

> Nguồn: `141 - Transforming Data (Part 2)- Visualizing Transformed Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32711922)

Theo đúng khẩu hiệu "visualize, visualize, visualize", bài này mình so sánh **ảnh gốc** với **ảnh sau transform** đặt cạnh nhau. Trên đường đi sẽ gặp lại lỗi shape quen thuộc — `ToTensor()` trả về channels-first, còn Matplotlib lại muốn channels-last — và cách hoán đổi chiều bằng `permute`.

### 📚 Tài liệu tham khảo

Mở tài liệu `torchvision.transforms`, mục **transforming and augmenting images**, các bạn sẽ thấy rất nhiều transform, ghép được với nhau qua `Compose`. Đây là **extra curriculum** của bài: có cả bộ **illustration of transforms** để xem trực quan từng loại (resize, center crop, grayscale, đổi màu...). Nhưng trước hết, cứ viết code visualize cái transform của mình đã.

---

### 🛠️ Viết hàm `plot_transformed_images`

Hàm nhận vào danh sách đường dẫn ảnh, một `transform`, số ảnh muốn lấy và một `seed` tùy chọn:

```python
def plot_transformed_images(image_paths, transform, n=3, seed=None):
    """Selects random images from a path of images and loads/transforms
    them then plots the original vs the transformed version."""
    if seed:
        random.seed(seed)
    random_image_paths = random.sample(image_paths, k=n)
    for image_path in random_image_paths:
        with Image.open(image_path) as f:
            fig, ax = plt.subplots(nrows=1, ncols=2)
            # Plot the original
            ax[0].imshow(f)
            ax[0].set_title(f"Original\nSize: {f.size}")
            ax[0].axis(False)

            # Transform and plot target image
            transformed_image = transform(f).permute(1, 2, 0)  # <- lưu ý dòng này
            ax[1].imshow(transformed_image)
            ax[1].set_title(f"Transformed\nShape: {transformed_image.shape}")
            ax[1].axis("off")

            fig.suptitle(f"Class: {image_path.parent.stem}", fontsize=16)
```

`random.sample(image_paths, k=n)` lấy ra **n** đường dẫn **không trùng** từ danh sách. `seed=None` mặc định để mỗi lần chạy có thể ra ảnh khác; truyền `42` thì kết quả cố định.

---

### ⚠️ Cú lỗi "invalid shape" và phép `permute`

Chạy lần đầu, Matplotlib báo **invalid shape**. Lý do: `transform(f)` (với `ToTensor()`) trả về tensor **channels-first** `(C, H, W)`, còn Matplotlib cần **channels-last** `(H, W, C)`. Cách sửa là hoán đổi thứ tự trục:

```python
transformed_image = transformed_image.permute(1, 2, 0)
```

`permute(1, 2, 0)` đưa trục `0` (channel) về cuối: từ `(C, H, W)` thành `(H, W, C)`. Dữ liệu bên trong **không đổi**, chỉ đổi thứ tự chiều.

---

### 👀 Kết quả nhìn thấy gì?

Sau khi sửa, ảnh gốc và ảnh transform hiện cạnh nhau. Ví dụ một ảnh pizza:

* **Ảnh gốc**: `512 × 512`, sắc nét.
* **Ảnh transform**: `64 × 64`, trông **pixelated** (bị vỡ hạt), bởi vì chỉ còn 64×64 pixel.

Ảnh steak thì thấy rõ bị **lật ngang** — đúng hiệu ứng của `RandomHorizontalFlip`.

---

### ⚖️ Đánh đổi của việc resize

Vì sao resize về 64×64? Vì **ít thông tin hơn** thì model **tính toán nhanh hơn**. Cái giá là có thể **mất một phần performance** do không còn nhiều chi tiết như ảnh gốc. Kích thước ảnh là một **hyperparameter**: các bạn có thể thử nhiều size để xem cái nào tốt nhất. Mình chọn 64×64 để khớp với **CNN Explainer** — dấu hiệu cho thấy ta sắp tái tạo model đó.

---

### ✅ Tạm kết

Vậy là transform đã được visualize trước khi đem đi dùng — đúng thói quen tốt. Bài sau mình sẽ dùng `data_transform` này khi nạp **toàn bộ** dữ liệu bằng một hàm có sẵn của `torchvision.datasets`. Hẹn các bạn ở bài sau.
