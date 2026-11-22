---
title: 'Chuyển đổi giữa PyTorch tensor và NumPy array'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 35
status: edited
source: '035 - PyTorch Tensors and NumPy.md'
categories:
- AI
tags: []
---

# 🔄 Chuyển đổi giữa PyTorch tensor và NumPy array

> Nguồn: `035 - PyTorch Tensors and NumPy.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668444)

Bài trước mình giao các bạn index để lấy ra `9` và `3, 6, 9`. Lời giải của mình:

```python
x[0, 2, 2]    # tensor(9)
x[0, :, 2]    # tensor([3, 6, 9])
```

Giờ sang chủ đề mới: **chuyển đổi qua lại giữa PyTorch và NumPy**. NumPy là thư viện tính toán số rất phổ biến, và dữ liệu của bạn có thể đang nằm ở dạng NumPy array. PyTorch có sẵn công cụ để làm việc với nó.

### ➡️ NumPy array → tensor: `torch.from_numpy`

```python
import torch
import numpy as np

array = np.arange(1.0, 8.0)
tensor = torch.from_numpy(array)

array    # array([1., 2., ..., 7.])
tensor   # tensor([1., 2., ..., 7.], dtype=torch.float64)
```

`torch.from_numpy` nhận một **ndarray** — kiểu dữ liệu chính của NumPy — và trả về tensor.

### ⚠️ Cẩn thận data type: float64 vs float32

Tensor nhận được có `dtype=torch.float64`, vì **NumPy mặc định dùng float64** cho số thực, và `from_numpy` **giữ nguyên** dtype đó.

Trong khi đó, **PyTorch mặc định là float32**. Đây là nguồn gốc của nhiều lỗi data type khi trộn hai hệ sinh thái.

Cách sửa:

```python
tensor = tensor.type(torch.float32)
tensor.dtype    # torch.float32
```

> Ghi chú: NumPy mặc định float64 **với số thực**; nếu mảng toàn số nguyên (ví dụ `np.arange(1, 8)`), dtype sẽ là `int64`, và tensor nhận được cũng là `int64`. Hãy kiểm tra `.dtype` thay vì mặc định đoán.

### 🧠 Có chia sẻ bộ nhớ không?

Trong video, thử:

```python
array = array + 1     # array thành [2..8]
tensor                # vẫn là [1..7]
```

Tensor **không đổi**. Nhưng lưu ý: theo tài liệu PyTorch, `torch.from_numpy` **chia sẻ bộ nhớ** với ndarray gốc — sửa ndarray **tại chỗ** thì tensor cũng đổi theo, và ngược lại.

Lý do kết quả trên không đổi: `array = array + 1` **tạo ra một mảng mới** rồi gán lại biến `array`, chứ không sửa mảng cũ tại chỗ. Nếu bạn viết `array += 1` hoặc `array[0] = 99`, tensor sẽ thay đổi.

> ⚠️ Cần kiểm chứng: kết luận "không share memory" trong video không chính xác với tài liệu PyTorch (`torch.from_numpy` và `Tensor.numpy()` đều share memory); kết quả quan sát được giải thích bằng việc phép `+` tạo object mới.

### ⬅️ Tensor → NumPy array: `.numpy()`

```python
tensor = torch.ones(7)
numpy_tensor = tensor.numpy()

tensor.dtype          # torch.float32
numpy_tensor.dtype    # float32
```

Dtype của NumPy array **phản chiếu dtype của tensor** — ở đây là float32 (khác với mặc định float64 của NumPy khi tự tạo mảng).

Tương tự, khi bạn viết:

```python
tensor = tensor + 1
```

`numpy_tensor` vẫn giữ giá trị cũ, vì phép `+` tạo tensor mới. Nhưng nếu sửa **tại chỗ** (`tensor += 1`), ndarray — vốn dùng chung bộ nhớ với tensor CPU — cũng đổi theo.

### 🧭 Bảng nhớ nhanh

| Chuyển đổi | Cách làm |
|---|---|
| NumPy → PyTorch | `torch.from_numpy(ndarray)` |
| PyTorch → NumPy | `tensor.numpy()` |
| Default float NumPy | `float64` |
| Default float PyTorch | `float32` |
| Bộ nhớ | Chia sẻ (trừ khi bạn tạo object mới bằng phép gán) |

### 🎯 Chốt lại

Hai hệ sinh thái nói chuyện được với nhau rất dễ, nhưng **data type khác nhau** (float64 vs float32) và **chia sẻ bộ nhớ** là hai điều phải luôn nhớ.

Bài sau chúng ta sẽ nói về **reproducibility** — làm sao để kết quả random có thể tái lập. Các bạn có thể Google trước "PyTorch reproducibility" nhé. Hẹn gặp lại!
