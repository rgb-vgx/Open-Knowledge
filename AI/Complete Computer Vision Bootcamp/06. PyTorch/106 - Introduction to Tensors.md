---
title: 'Bài 106 — Tensor: khối dữ liệu cơ bản của PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 106
status: edited
source: '106 - Introduction to Tensors.md'
categories:
- AI
tags: []
---

# 🧩 Tensor — khối dữ liệu cơ bản của PyTorch

> Nguồn: `106 - Introduction to Tensors.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481959)

Chào các bạn! Trong bài này mình sẽ làm rõ một trong những khái niệm nền tảng nhất của PyTorch: **tensor**. Từ một số vô hướng đến dữ liệu nhiều chiều phức tạp, mọi thứ trong PyTorch đều được biểu diễn bằng tensor. Mình sẽ đi từ **scalar**, **vector**, **matrix** đến **tensor 3 chiều**, rồi đưa tensor lên GPU.

### 🔢 Tensor là gì?

**Tensor** là mảng nhiều chiều, rất giống `numpy` array nhưng có thêm khả năng như **tính toán trên GPU**. Tensor dùng để biểu diễn dữ liệu trong PyTorch, từ những con số đơn giản đến các tập dữ liệu đa chiều phức tạp.

```python
import torch
```

Mình tạo một cell mới và bắt đầu với tensor đầu tiên.

---

### 0️⃣ Tensor 0 chiều — scalar

Mảng 0 chiều, hay tensor 0 chiều, trong PyTorch gọi là **scalar**. Nó giống như một biến Python bình thường, chỉ chứa một giá trị đơn.

```python
scalar = torch.tensor(42)

print("Scalar tensor:", scalar)
print("Dimension:", scalar.dim())
print("Shape:", scalar.shape)
```

Kết quả: giá trị là `tensor(42)`, **dimension bằng 0**, còn `shape` là `torch.Size([])` — rỗng, vì tensor 0 chiều không có shape.

---

### ➡️ Tensor 1 chiều — vector

Tensor 1 chiều gọi là **vector**. Cách tạo vẫn là `torch.tensor`, nhưng giá trị truyền vào đổi từ một số thành một **list**.

```python
vector = torch.tensor([1, 2, 3])

print("Vector tensor:", vector)
print("Dimension:", vector.dim())
print("Shape:", vector.shape)
```

Lần này dimension là `1`, và shape là `torch.Size([3])` — tổng số phần tử là 3. Shape thực chất được `Tensor.size()` trả về dưới dạng `torch.Size`.

---

### 🔲 Tensor 2 chiều — matrix

Tensor 2 chiều gọi là **matrix**. Cách làm: lấy hai list 1 chiều rồi bọc thêm một cặp ngoặc vuông ở đầu và cuối để tạo thêm một chiều.

```python
matrix = torch.tensor([[1, 2], [3, 4]])

print("Matrix tensor:", matrix)
print("Dimension:", matrix.dim())
print("Shape:", matrix.shape)
```

Kết quả dimension là `2`, shape là `torch.Size([2, 2])`. Mỗi list con là một chiều 1, bọc thêm một lớp ngoặc nữa thành 2 chiều.

---

### 🧊 Tensor 3 chiều

Quy ước đặt tên: 0 chiều là **scalar**, 1 chiều là **vector**, 2 chiều là **matrix**, còn lớn hơn 2 chiều thì chỉ gọi chung là **tensor**. Mình lấy hai matrix 2x2 rồi bọc thêm một chiều mới:

```python
tensor_3d = torch.tensor([
    [[1, 2], [3, 4]],
    [[1, 2], [3, 4]]
])

print("3D tensor:", tensor_3d)
print("Dimension:", tensor_3d.dim())
print("Shape:", tensor_3d.shape)
```

Dimension là `3`, shape là `torch.Size([2, 2, 2])` — tức hai khối 2x2.

---

### ⚡ Đưa tensor lên GPU

Điểm khác biệt lớn so với NumPy là PyTorch chạy được tính toán trên GPU. Mình kiểm tra trước, chỉ khi có CUDA mới đẩy tensor lên:

```python
if torch.cuda.is_available():
    gpu_tensor = vector.to("cuda")
    print("Tensor on GPU:", gpu_tensor)
else:
    print("CUDA is not available on this machine.")
```

Trên instance không có GPU, chương trình in ra thông báo không có CUDA. Sau khi đổi runtime sang **Tesla T4 GPU** và chạy lại toàn bộ cell, kết quả sẽ là tensor kèm thuộc tính `device='cuda:0'` — dấu hiệu tensor đang nằm trên GPU.

Qua bài này, các bạn đã nắm được cách tạo tensor theo số chiều và cách đưa nó lên GPU. Bài tiếp theo chúng ta sẽ học **indexing và slicing** để truy cập dữ liệu bên trong tensor.
