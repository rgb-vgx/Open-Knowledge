---
title: 'Bài 107 — Indexing và slicing trên tensor'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 107
status: edited
source: '107 - indexing Tensors.md'
categories:
- AI
tags: []
---

# 🔍 Indexing và slicing tensor trong PyTorch

> Nguồn: `107 - indexing Tensors.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481949)

Chào các bạn! Bài này mình sẽ học cách **indexing** và **slicing** trên tensor — kỹ năng giúp truy cập, thao tác và phân tích dữ liệu trong tensor một cách hiệu quả. Cú pháp rất giống list Python hay `numpy` array, nhưng linh hoạt hơn cho dữ liệu nhiều chiều.

### 🔢 Tạo tensor để thực hành

Mình tạo một tensor 2 chiều 3x3:

```python
import torch

tensor = torch.tensor([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

print(tensor.dim())    # 2
print(tensor.shape)    # torch.Size([3, 3])
```

Tensor có **3 hàng, 3 cột**. Cú pháp truy cập một phần tử là `tensor[row, column]`.

### 🎯 Truy cập một phần tử

Muốn lấy phần tử ở hàng 0, cột 1:

```python
print(tensor[0, 1])   # 20
```

`tensor[0, 1]` trả về giá trị `20` — một **scalar**, vì nó trỏ đúng vào một ô.

### 📏 Lấy nguyên hàng hoặc nguyên cột

Nếu chỉ truyền một chỉ số, mặc định đó là hàng:

```python
print(tensor[0])      # tensor([10, 20, 30])  → cả hàng đầu
```

Muốn lấy cả **cột** thì giữ lại tất cả hàng bằng dấu `:` ở vị trí hàng:

```python
print(tensor[:, 0])   # tensor([10, 40, 70])
```

Nghĩa là: lấy mọi hàng, nhưng chỉ cột 0.

### ✂️ Slicing

Slicing cho phép lấy một khoảng. Lấy **hai hàng đầu**:

```python
print(tensor[:2])
# tensor([[10, 20, 30],
#         [40, 50, 60]])
```

Chỉ số `2` bị loại trừ, nên chỉ nhận hàng 0 và 1. Lấy **hai cột đầu** của mọi hàng:

```python
print(tensor[:, :2])
# tensor([[10, 20],
#         [40, 50],
#         [70, 80]])
```

Muốn lấy phần tử ở giữa — hàng 1, các cột 1 và 2:

```python
print(tensor[1, 1:3])   # tensor([50, 60])
```

`3` bị loại trừ nên chỉ nhận cột 1 và 2. Nếu cố truy cập `tensor[1, 3]` sẽ báo lỗi **out of bounds**, vì index chỉ chạy từ 0 đến 2.

### 🎲 Fancy indexing — chọn phần tử không liền nhau

Giả sử mình cần lấy hai giá trị `20` và `90` — không nằm liền nhau. Cách làm là truyền hai list chỉ số tương ứng:

```python
# 20 nằm ở hàng 0, cột 1; 90 nằm ở hàng 2, cột 2
print(tensor[[0, 2], [1, 2]])   # tensor([20, 90])
```

List thứ nhất chọn hàng, list thứ hai chọn cột theo từng cặp tương ứng. Cách này hơi "lạ mắt" nên giảng viên gọi vui là **fancy indexing**.

### 🔦 Boolean indexing

Có thể tạo **mask** bằng một biểu thức điều kiện:

```python
mask = tensor > 50
print(mask)
# tensor([[False, False, False],
#         [False, False,  True],
#         [ True,  True,  True]])
```

Các phần tử lớn hơn `50` là `True`, nhỏ hơn hoặc bằng `50` là `False`. Dùng mask để lấy các giá trị thỏa điều kiện:

```python
print(tensor[mask])   # tensor([60, 70, 80, 90])
```

### ✏️ Cập nhật giá trị, index_select và bước nhảy

**Cập nhật một ô** — đổi hàng 0, cột 1 thành `25`:

```python
tensor[0, 1] = 25
```

**Cập nhật cả một cột** bằng cách gán một tensor mới:

```python
tensor[:, 0] = torch.tensor([100, 200, 300])
```

**Chọn theo index bằng `torch.index_select`** — chọn các hàng 0 và 2:

```python
indices = torch.tensor([0, 2])
selected = torch.index_select(tensor, dim=0, index=indices)
```

`dim=0` là chọn theo hàng, `dim=1` là theo cột.

**Lấy phần tử theo bước nhảy** — mọi hàng, cột cách nhau 2:

```python
print(tensor[:, ::2])   # lấy cột 0 và 2
```

### 🔄 Đảo tensor bằng torch.flip

Trong NumPy, `tensor[::-1]` đảo mảng. Nhưng trong PyTorch cú pháp đó **không hoạt động** — phải dùng `torch.flip`:

```python
print(torch.flip(tensor, dims=[0]))   # đảo thứ tự hàng
print(torch.flip(tensor, dims=[1]))   # đảo thứ tự cột
```

`dims=0` đảo theo hàng, `dims=1` đảo theo cột. Lưu ý nhỏ: cú pháp NumPy thuần như `tensor[::-1]` không chạy trên tensor, nên hãy nhớ `torch.flip` cho việc đảo.

Vậy là mình đã đi qua indexing, slicing, fancy indexing, boolean indexing và các thao tác biến đổi cơ bản trên tensor. Bài sau chúng ta sẽ chuyển sang tạo **random number** và dùng chúng để sinh ảnh nhiễu.
