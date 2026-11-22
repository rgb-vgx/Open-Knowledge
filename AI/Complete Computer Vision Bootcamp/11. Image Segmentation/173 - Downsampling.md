---
title: 'Bài 173 — Downsampling: giảm độ phân giải có chủ đích'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 173
status: edited
source: '173 - Downsampling.md'
categories:
- AI
tags: []
---
# 📉 Downsampling: pooling dưới góc nhìn segmentation

> Nguồn: `173 - Downsampling.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49214083)

Chào các bạn! Trong module segmentation, ta dùng các thuật ngữ **downsampling** và **upsampling**. Bài này giải thích **downsampling** — thực chất chính là các phép **pooling** đã học, nhưng nhìn dưới lăng kính segmentation. Ta sẽ thấy vì sao nó cần thiết và thử nghiệm bằng PyTorch.

### 📖 Định nghĩa

**Downsampling** là quá trình **giảm spatial resolution** (độ phân giải không gian) của ảnh hoặc feature map — giảm số pixel nhưng giữ lại thông tin quan trọng nhất. Nếu đã học CNN, các bạn nhận ra ngay: đó chính là **max pooling** và **average pooling**.

Các kỹ thuật downsampling phổ biến:

* **Average pooling** — lấy trung bình các pixel lân cận.
* **Max pooling** — lấy giá trị lớn nhất trong một cửa sổ cục bộ.
* **Global average pooling** — pooling trên toàn ảnh, cho **một giá trị mỗi channel**.

Cần phân biệt: pooling **giảm spatial resolution**, không giảm số channel. Muốn giảm channel thì dùng **convolution 1×1**.

### ❓ Vì sao phải downsampling?

Lấy ảnh **640×640 RGB** — khoảng **1.2 triệu giá trị** (640 × 640 × 3). Nếu đưa thẳng vào một mạng neural dày đặc, lớp ẩn đầu tiên cũng phải có cỡ 1.2 triệu neuron, và còn cần nhiều lớp hơn nữa. Hậu quả:

* **Tính toán đắt** — độ phân giải cao khiến chi phí tăng vọt.
* **Dễ overfit** — quá nhiều chi tiết, model học luôn cả nhiễu (background, vật không liên quan).
* **Tốn bộ nhớ** — khó xử lý ảnh lớn trên GPU.

Downsampling giải quyết cả ba: thao tác **hiệu quả hơn** (train/inference nhanh), **giảm overfit** (ít tham số hơn, không học nhiễu), và **nhẹ bộ nhớ** (xử lý representation nén thay vì ảnh full-resolution).

### 🧮 Ví dụ max pooling 2×2, stride 2

Cho ma trận 4×4:

```text
1  3  2  4
5  6  7  8
9  2  3  1
4  0  6  2
```

Áp dụng max pooling **kernel 2×2, stride 2**:

* cửa sổ trên-trái → max = **6**
* cửa sổ trên-phải → max = **8**
* cửa sổ dưới-trái → max = **9**
* cửa sổ dưới-phải → max = **6**

Kết quả là ma trận 2×2 `[[6, 8], [9, 6]]` — từ 16 giá trị còn 4 giá trị đại diện nhất.

### 💻 Thử bằng PyTorch

```python
import torch
import torch.nn.functional as F

image = torch.tensor([
    [1, 3, 2, 4],
    [5, 6, 7, 8],
    [9, 2, 3, 1],
    [4, 0, 6, 2],
], dtype=torch.float).unsqueeze(0).unsqueeze(0)  # (1, 1, 4, 4)

pooled = F.max_pool2d(image, kernel_size=2)
print(pooled.squeeze())   # tensor([[6., 8.], [9., 6.]])
```

Hai lần `unsqueeze` thêm chiều **batch** và **channel**, biến tensor thành `(1, 1, 4, 4)` đúng định dạng ảnh. `F.max_pool2d` với `kernel_size=2` cho đúng kết quả `6896`.

Ta cũng có thể downsampling bằng **strided convolution** — một phép conv học được:

```python
conv = torch.nn.Conv2d(1, 1, kernel_size=3, stride=1)
conv_output = conv(image)
```

Với kernel 3, stride 1 trên đầu vào 4×4, đầu ra là 2×2. Khác biệt: **convolution có thể học** (trọng số train được), còn **max pooling** chỉ lấy max trong cửa sổ, không có tham số học.

### 🔧 Kernel và stride quyết định đầu ra

Muốn độ phân giải đầu ra thấp hơn, các bạn có thể:

* tăng **kernel size**, hoặc
* tăng **stride**, hoặc
* cả hai.

Kernel/stride càng lớn thì cửa sổ trượt càng ít lần, số giá trị đầu ra càng nhỏ.

---
### ✅ Tóm lại

Downsampling = pooling (hoặc strided conv) để giảm spatial resolution, giữ thông tin quan trọng, giúp mạng nhanh hơn, nhẹ hơn và bớt overfit. Nắm chắc nó rồi, bài sau ta đi ngược lại — **upsampling / transposed convolution**. Hẹn gặp!
