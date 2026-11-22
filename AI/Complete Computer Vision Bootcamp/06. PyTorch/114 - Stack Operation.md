---
title: 'Bài 114 — Stack và Cat: ghép nhiều tensor trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 114
status: edited
source: '114 - Stack Operation.md'
categories:
- AI
tags: []
---

# 📚 Stack và Cat: khi nào thêm chiều, khi nào không

> Nguồn: `114 - Stack Operation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482311)

Chào các bạn! Bài này mình học cách **ghép nhiều tensor** thành một tensor duy nhất. PyTorch có hai hàm chính để làm việc này: `torch.stack` (thêm một chiều mới) và `torch.cat` (nối mà giữ nguyên số chiều). Hiểu rõ trục 0 và trục 1 thì mọi thứ sẽ rất trực quan.

### 🃏 Stack là gì?

**Stacking** là quá trình kết hợp nhiều tensor dọc theo **một chiều mới**. Cứ hình dung như xếp một chồng bài — mỗi lá bài là một tensor, chồng lên nhau tạo thành một khối mới.

Trước hết cần nhớ quy ước trục:

* **Trục 0 (`dim=0`)** = theo **hàng**.
* **Trục 1 (`dim=1`)** = theo **cột**.

Hai tensor 1D giống nhau shape `(3,)`, mỗi cái có 3 phần tử. Ghép chúng lại và cần chứa cả 6 phần tử — nên bắt buộc phải sinh thêm một chiều.

---

### ➕ Stack theo trục 0 (hàng)

Stack hai tensor 1D `[1, 2, 3]` và `[4, 5, 6]` theo `dim=0` sẽ tạo ra 2 hàng, mỗi hàng 3 cột:

```text
[[1, 2, 3],
 [4, 5, 6]]     shape: 2 × 3
```

Shape mới là **2 × 3**, vì ta thêm một chiều phía ngoài để chứa hai tensor ban đầu.

---

### ➕ Stack theo trục 1 (cột)

Nếu stack cùng hai tensor đó theo `dim=1`, các phần tử được lấy **theo cột**, cặp đôi từ hai tensor xếp cạnh nhau:

```text
[[1, 4],
 [2, 5],
 [3, 6]]        shape: 3 × 2
```

Lần này shape là **3 × 2** — số hàng bằng độ dài mỗi tensor (3), số cột bằng số tensor (2). Cùng dữ liệu, cùng phép stack, chỉ khác trục là ra kết quả khác hẳn.

---

### 🧪 Thực hành với torch.stack

```python
import torch

tensor_one = torch.tensor([1, 2, 3])
tensor_two = torch.tensor([4, 5, 6])

print(tensor_one.ndim)   # 1
print(tensor_one.shape)  # torch.Size([3])

# Stack theo trục 0
stacked_dim0 = torch.stack([tensor_one, tensor_two], dim=0)
print(stacked_dim0.shape)  # torch.Size([2, 3])
print(stacked_dim0)

# Stack theo trục 1
stacked_dim1 = torch.stack([tensor_one, tensor_two], dim=1)
print(stacked_dim1.shape)  # torch.Size([3, 2])
print(stacked_dim1)
```

Kết quả `stacked_dim0` là `[[1, 2, 3], [4, 5, 6]]`, còn `stacked_dim1` là `[[1, 4], [2, 5], [3, 6]]` — đúng như phần minh họa.

---

### 🔗 Cat khác stack ở điểm nào?

`torch.cat` cũng để **nối nhiều tensor**, nhưng điểm mấu chốt: **cat giữ nguyên số chiều**, trong khi **stack thêm một chiều mới**.

Nếu hai tensor đều là 2D, kết quả cat vẫn là 2D — không tự biến thành 3D. Đây là khác biệt cốt lõi giữa hai hàm.

Lấy hai tensor 2 × 2:

```python
tensor_one = torch.tensor([[1, 2], [3, 4]])
tensor_two = torch.tensor([[5, 6], [7, 8]])

# Nối theo hàng (dim=0)
cat_dim0 = torch.cat([tensor_one, tensor_two], dim=0)
print(cat_dim0.shape)  # torch.Size([4, 2])
print(cat_dim0)
# [[1, 2],
#  [3, 4],
#  [5, 6],
#  [7, 8]]

# Nối theo cột (dim=1)
cat_dim1 = torch.cat([tensor_one, tensor_two], dim=1)
print(cat_dim1.shape)  # torch.Size([2, 4])
print(cat_dim1)
# [[1, 2, 5, 6],
#  [3, 4, 7, 8]]
```

Với `dim=0`, các **hàng** của hai tensor được xếp nối tiếp nhau. Với `dim=1`, các **cột** được ghép: hàng đầu tiên của tensor một (`1, 2`) đứng cạnh hàng đầu tiên của tensor hai (`5, 6`), rồi đến `3, 4` cạnh `7, 8`.

---

### ✅ Chốt lại

* **`torch.stack`** — ghép tensor dọc theo **chiều mới**, luôn làm tăng số chiều (`ndim` tăng 1).
* **`torch.cat`** — ghép tensor dọc theo **chiều có sẵn**, giữ nguyên số chiều (`ndim` không đổi).
* Trục `dim=0` là hàng, `dim=1` là cột — chọn đúng trục là ra đúng kết quả.

Cả hai đều là công cụ ghép dữ liệu cực hữu ích khi làm việc với batch trong CNN. Hẹn gặp các bạn ở bài tiếp theo, khi mình đi vào **các thành phần của mạng nơ-ron trong PyTorch**.
