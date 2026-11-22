---
title: 'Bài 111 — Thao tác biến đổi tensor trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 111
status: edited
source: '111 - Tensor Manuplation.md'
categories:
- AI
tags: []
---

# 🧩 Tensor manipulation: reshape, slice, ghép, tách, transpose và clone

> Nguồn: `111 - Tensor Manuplation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482111)

Chào các bạn! Bài này mình khám phá **tensor manipulation** — các phép biến đổi **cấu trúc, shape hoặc nội dung** của tensor, gồm: **reshaping**, **slicing**, **joining/splitting**, **transposing** và **permuting**. Mình đi lần lượt từng nhóm.

### 🔁 Reshape và view — đổi shape, giữ nguyên dữ liệu

```python
import torch

original_tensor = torch.arange(12)   # 0..11 (vector 1 chiều)
```

Vì có 12 phần tử, mình đổi sang shape có tích bằng 12, ví dụ `2 x 6` hoặc `3 x 4`:

```python
reshaped_tensor = original_tensor.reshape(2, 6)   # ndim = 2
```

`view` làm được điều tương tự nhưng yêu cầu bộ nhớ **liên tục (contiguous)**; nếu tensor gốc không contiguous, `view` báo lỗi còn `reshape` vẫn chạy.

```python
print(original_tensor.is_contiguous())   # True
flattened = original_tensor.view(-1)      # -1 => tự suy ra chiều còn lại = 12
```

Truyền `-1` nghĩa là "để PyTorch tự suy ra kích thước chiều này".

---

### ✂️ Slicing — trích xuất phần cụ thể

```python
tensor_a = torch.tensor([[1, 2, 3],
                         [4, 5, 6],
                         [7, 8, 9]])

print(tensor_a[0])        # hàng đầu:  [1, 2, 3]
print(tensor_a[:, 0])     # cột đầu:   [1, 4, 7]
print(tensor_a[:, 2])     # cột ba:    [3, 6, 9]
```

Lấy ma trận con `2 x 2` bằng cách bỏ hàng 0 và cột 0:

```python
sub_tensor = tensor_a[1:, 1:]
print(sub_tensor.shape)   # torch.Size([2, 2])
```

---

### 🔗 Ghép tensor: `torch.cat` và `torch.stack`

```python
tensor_one = torch.tensor([[1, 2], [3, 4]])
tensor_two = torch.tensor([[5, 6], [7, 8]])
```

**`torch.cat`** ghép dọc theo một **chiều đã tồn tại**, không tạo chiều mới:

```python
rows    = torch.cat((tensor_one, tensor_two), dim=0)   # 4 x 2
columns = torch.cat((tensor_one, tensor_two), dim=1)   # 2 x 4
```

**`torch.stack`** thì **tạo ra một chiều mới**, làm tăng rank:

```python
stacked = torch.stack((tensor_one, tensor_two), dim=0)
print(stacked.shape)   # torch.Size([2, 2, 2])
```

Thay vì `4 x 2`, `stack` cho `2 x 2 x 2` — một chiều mới bao lấy cả hai ma trận. Đây là khác biệt cốt lõi giữa `cat` và `stack`.

---

### 🪓 Tách tensor: `torch.chunk` và `torch.split`

**`torch.chunk`** chia thành các phần **đều nhau** (kết quả là một tuple):

```python
chunks = torch.chunk(original_tensor, 3, dim=0)   # 3 phần, mỗi phần 4 phần tử
```

Nếu truyền số không chia hết như `5`, `chunk` tự chọn kích thước phần — với 12 phần tử và `chunks=5`, nó trả **4 phần**, mỗi phần **3 phần tử** (có thể trả ít hơn số chunk yêu cầu).

**`torch.split`** cho phép chia **không đều**:

```python
parts = torch.split(original_tensor, 5, dim=0)
# phần 0: 5 phần tử, phần 1: 5 phần tử, phần 2: 2 phần tử
```

`split` trả đúng kích thước yêu cầu ở các phần đầu; phần cuối nhận phần còn lại.

---

### 🔄 Transpose, permute, clone và detach

**`transpose`** hoán đổi **hai chiều** cụ thể (`m x n` → `n x m`):

```python
t = torch.arange(24).reshape(12, 2)
t_t = t.transpose(0, 1)       # [12, 2] -> [2, 12]
```

**`permute`** **sắp xếp lại toàn bộ các chiều** theo thứ tự chỉ định:

```python
x = torch.arange(24).reshape(2, 3, 4)
p = x.permute(2, 0, 1)        # shape: [4, 2, 3]
```

Chiều ban đầu `(2, 3, 4)` ứng với index `(0, 1, 2)`. `permute(2, 0, 1)` đưa chiều 2 (`4`) lên đầu, rồi chiều 0 (`2`), rồi chiều 1 (`3`) → `(4, 2, 3)`. `transpose` chỉ đổi chỗ hai chiều; `permute` tổng quát hơn.

**Clone và detach — bản sao và computation graph**

Như list Python, `b = a` chỉ là **tham chiếu** cùng vùng nhớ; muốn bản sao độc lập phải dùng `copy.deepcopy`. Với tensor:

```python
t = torch.ones(3, 3, requires_grad=True)
cloned = t.clone()      # bản sao độc lập, vùng nhớ mới
detached = t.detach()   # tách khỏi computation graph
```

* **`clone()`** tạo tensor mới **cùng giá trị nhưng vùng nhớ riêng**, vẫn nằm trong computation graph.
* **`detach()`** trả về tensor **không còn thuộc computation graph**, nhưng **chia sẻ cùng storage** với tensor gốc.

`requires_grad=True` khiến PyTorch theo dõi tensor trong đồ thị tính toán. `clone` giữ nó trong đồ thị với bộ nhớ mới; `detach` đưa nó ra khỏi đồ thị nhưng dùng chung storage.

---

### ✅ Chốt lại

Mình đã đi qua trọn bộ công cụ biến đổi tensor: **reshape/view** đổi shape, **slicing** lấy phần con, **cat/stack** ghép (khác nhau ở việc tạo chiều mới hay không), **chunk/split** tách (đều hay không đều), **transpose/permute** đổi thứ tự chiều, và **clone/detach** kiểm soát bản sao cùng computation graph. Đây là những thao tác các bạn sẽ dùng liên tục khi xử lý dữ liệu cho model. Hẹn gặp ở bài tiếp theo về **matrix aggregation**!
