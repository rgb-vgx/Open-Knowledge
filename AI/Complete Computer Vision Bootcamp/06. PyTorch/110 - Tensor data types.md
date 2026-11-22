---
title: 'Bài 110 — Các kiểu dữ liệu tensor trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 110
status: edited
source: '110 - Tensor data types.md'
categories:
- AI
tags: []
---

# 🎛️ Kiểu dữ liệu tensor: chọn sao cho vừa nhanh, vừa chuẩn, vừa tiết kiệm bộ nhớ

> Nguồn: `110 - Tensor data types.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482085)

Chào các bạn! Bài này mình tìm hiểu các **kiểu dữ liệu (dtype)** khác nhau trong PyTorch, và xem chúng ảnh hưởng thế nào tới **hiệu năng**, **độ chính xác** và **lượng bộ nhớ** tiêu thụ. Đừng xem nhẹ chuyện chọn dtype — nó là một trong những quyết định đánh đổi quan trọng nhất khi huấn luyện model.

### 🗂️ Bốn nhóm kiểu dữ liệu cơ bản

PyTorch cung cấp cho tensor bốn nhóm dtype chính:

* **Floating (số thực)** — dùng cho **hầu hết các tác vụ deep learning**.
* **Integer (số nguyên)** — dùng cho **dữ liệu phân loại (categorical)** và **chỉ số (index)** của tensor.
* **Boolean** — dùng để tạo **mask** hoặc thực hiện **phép toán logic**.
* **Complex (số phức)** — dùng cho các **tính toán nâng cao**.

Trong mỗi nhóm lại có nhiều độ chính xác khác nhau, ví dụ:

| Nhóm | Các dtype tiêu biểu |
|---|---|
| Floating | `torch.float32`, `torch.float64`, `torch.float16` |
| Integer | `torch.int32`, `torch.int64`, `torch.int8`, `torch.int16`, `torch.uint8` |
| Boolean | `torch.bool` (true/false) |
| Complex | `torch.complex64`, `torch.complex128` |

---

### ⚖️ Ba yếu tố đánh đổi: bộ nhớ, tốc độ, độ chính xác

Chọn dtype là chọn sự cân bằng giữa ba yếu tố:

1. **Bộ nhớ:** `float16` dùng ít bộ nhớ hơn `float32`, và `float32` ít hơn `float64`.
2. **Tính toán:** độ chính xác càng thấp thì trên GPU chạy càng nhanh.
3. **Độ chính xác số học:** `float64` biểu diễn được nhiều chữ số sau dấu phẩy hơn `float32`, nên "chuẩn" hơn.

Nói cách khác: **precision thấp → nhanh và nhẹ hơn, nhưng kém chính xác hơn**. Tùy giới hạn bộ nhớ và mức chính xác cần cho thuật toán mà mình chọn `float16`, `float32` hay `float64`.

---

### 🧪 Tạo tensor và kiểm tra dtype mặc định

Bắt đầu bằng việc import và tạo một tensor "thử":

```python
import torch

default_tensor = torch.tensor([1.5, 2.5, 3.5])
print(default_tensor.dtype)   # torch.float32
```

Với số thực, **dtype mặc định của PyTorch là `float32`**. Còn nếu mình truyền số nguyên, mặc định sẽ là `int64`:

```python
int_default = torch.tensor([1, 2, 3])
print(int_default.dtype)      # torch.int64
```

Muốn chỉ định rõ ràng, mình dùng tham số `dtype`:

```python
float_tensor = torch.tensor([1.5, 2.5, 3.5], dtype=torch.float64)
int_tensor   = torch.tensor([1.5, 2.5, 3.5], dtype=torch.int32)
```

Lưu ý ở dòng `int32`: các giá trị thực `1.5, 2.5, 3.5` bị **cắt phần thập phân**, chỉ còn `1, 2, 3`. Với boolean, chỉ cần truyền giá trị đúng/sai:

```python
bool_tensor = torch.tensor([True, False, True], dtype=torch.bool)
print(bool_tensor.dtype)      # torch.bool
```

**Ép kiểu bằng `.to()`**

Để chuyển một tensor từ dtype này sang dtype khác, mình dùng `.to()`:

```python
original   = torch.tensor([1.5, 2.5, 3.5])          # float32
int_tensor = original.to(torch.int64)
print(original.dtype, int_tensor.dtype)             # float32, int64
```

Điều thú vị là khi ép sang **boolean**, quy tắc rất đơn giản: **chỉ có 0 là `False`, mọi giá trị khác 0 (kể cả số âm) đều là `True`**:

```python
vals = torch.tensor([0, 1, 2, 0, -1])
print(vals.to(torch.bool))    # tensor([False, True, True, False, True])
```

---

### 📏 Đo bộ nhớ thực tế của tensor

Hai hàm cần nhớ:

* `.element_size()` — trả về **số byte của một phần tử**.
* `.nelement()` — trả về **tổng số phần tử** trong tensor.

Nhân hai giá trị này ra tổng bộ nhớ:

```python
f32 = torch.ones(1000, dtype=torch.float32)
f64 = torch.ones(1000, dtype=torch.float64)

print(f32.element_size(), f64.element_size())   # 4, 8
print(f32.element_size() * f32.nelement())      # 4000 bytes
print(f64.element_size() * f64.nelement())      # 8000 bytes
```

`float64` có độ chính xác gấp đôi nên tốn **gấp đôi bộ nhớ** — 8000 byte so với 4000 byte cho cùng 1000 phần tử.

---

### 🧭 Bảng chọn dtype theo mục đích

| dtype | Vai trò |
|---|---|
| `float32` | Mặc định cho hầu hết model neural network |
| `float64` | Tính toán cần độ chính xác cao |
| `float16` | Half precision, giảm bộ nhớ trên GPU |
| `int32` | Số nguyên đa dụng |
| `int64` | Chỉ số tensor, slicing |
| `int8` / `int16` | Giảm bộ nhớ |
| `bool` | Mask và phép toán logic |
| `complex64` / `complex128` | Tính toán nâng cao (số phức) |

---

### ✅ Chốt lại

Chọn dtype là **đánh đổi có ý thức** giữa bộ nhớ, tốc độ và độ chính xác. Nắm được `.dtype`, `dtype=` khi tạo tensor, `.to()` khi ép kiểu, cùng `.element_size()`/`.nelement()` để đo bộ nhớ — các bạn đã có đủ công cụ để tối ưu tensor cho model của mình. Bài tiếp theo mình sẽ bước vào **thao tác biến đổi tensor** (reshape, slice, join, split...). Hẹn gặp lại!
