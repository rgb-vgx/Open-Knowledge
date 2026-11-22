---
title: 'Visualize một ảnh lấy từ train dataset'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 143
status: edited
source: '143 - Visualizing a Loaded Image From the Train Dataset.md'
categories:
- AI
tags: []
---

# 🖼️ Visualize một ảnh lấy từ train dataset

> Nguồn: `143 - Visualizing a Loaded Image From the Train Dataset.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32714674)

Bài trước ta đã có `train_data`/`test_data` kiểu `ImageFolder`. Giờ mình index vào dataset để lấy một cặp `(image, label)`, xem shape/dtype, đổi lại tên lớp và vẽ lên. Qua đó ôn lại ba lỗi kinh điển: **shape mismatch**, **device mismatch**, **dtype mismatch**.

### 🎯 Index vào dataset

```python
img, label = train_data[0]
```

Mỗi lần index trả về một **cặp** `(image_tensor, label)`. Phần tử `0` là ảnh pizza, nhãn `0`. Ảnh đã ở dạng **tensor** — đúng thứ model cần; nhãn ở dạng **số nguyên**.

Muốn đổi ngược nhãn số về tên chữ:

```python
class_names = train_data.classes
print(class_names[label])   # pizza
```

Vì `class_names` sắp theo `class_to_idx`, `class_names[0]` chính là `"pizza"`.

### 🔍 In shape và dtype

```python
print(f"Image tensor:\n{img}")
print(f"Image shape: {img.shape}")
print(f"Image datatype: {img.dtype}")
print(f"Image label: {label}")
print(f"Label datatype: {type(label)}")
```

Kết quả:

* **shape**: `torch.Size([3, 64, 64])` — **channels-first**.
* **dtype ảnh**: `torch.float32` — mặc định của PyTorch.
* **label**: `0`, kiểu **`int`**.

Mình nhấn mạnh: ba lỗi lớn hay gặp là **shape mismatch**, **device mismatch**, **dtype mismatch**. In sẵn shape và dtype từ đầu là cách phòng lỗi về sau.

### 📉 Vì sao ảnh bị vỡ hạt?

Ảnh gốc khoảng **512×512**, qua transform còn **64×64** nên trông rất **pixelated**. Đây là cái giá của việc giảm kích thước — đổi lấy tốc độ tính toán.

### 🎨 Vẽ ảnh: lại `permute`

Matplotlib cần **channels-last**, nên phải đổi thứ tự chiều:

```python
img_permute = img.permute(1, 2, 0)

print(f"Original shape: {img.shape} -> [color_channels, height, width]")
print(f"Permuted shape: {img_permute.shape} -> [height, width, color_channels]")

plt.figure(figsize=(10, 7))
plt.imshow(img_permute)
plt.axis(False)
plt.title(class_names[label], fontsize=14)
```

`permute(1, 2, 0)` đưa trục channel (0) về cuối: `(C, H, W)` → `(H, W, C)`. Mình cố tình **in cả shape trước và sau** để thấy rõ sự thay đổi — đó chính là giá trị của Jupyter Notebook.

### ✅ Thử thách của bài

Mình khuyên các bạn tự thử:

* Đổi sang một **ảnh ngẫu nhiên** thay vì `train_data[0]`.
* Đổi **transform pipeline** — tăng kích thước resize xem ảnh khác thế nào.
* Mạnh dạn hơn: mở `torchvision.transforms`, thử một transform khác xem tác dụng lên ảnh.

Và trước khi sang bài sau, hãy tự thử tạo `train_dataloader` và `test_dataloader` từ hai dataset này — kiến thức đã học ở section trước. Bài sau mình làm cùng nhau.
