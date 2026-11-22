---
title: 'Tensor aggregation: tìm min, max, mean và sum'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 30
status: edited
source: '030 - Finding the Min Max Mean and Sum of Tensors (Tensor Aggregation).md'
categories:
- AI
tags: []
---

# 📊 Tensor aggregation: min, max, mean, sum

> Nguồn: `030 - Finding the Min Max Mean and Sum of Tensors (Tensor Aggregation).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656978)

Đã nắm matrix multiplication, giờ chúng ta chuyển sang **tensor aggregation** — gom nhiều số lại thành ít số: tìm **min**, **max**, **mean**, **sum**. Nghe đơn giản, nhưng đây là chỗ một trong ba lỗi lớn của PyTorch lộ diện.

### 🧮 Aggregation là gì?

Aggregation nghĩa là đi từ **một lượng lớn số** xuống **một lượng nhỏ số**. Ví dụ lấy mean của một tensor chín phần tử biến nó thành **một** phần tử. Đó là aggregation.

### 🏗️ Tạo tensor để thử

```python
x = torch.arange(0, 100, 10)
x
```

Kết quả: `tensor([0, 10, 20, 30, 40, 50, 60, 70, 80, 90])`.

### 🔽 Min và max

Có hai cách viết tương đương:

```python
torch.min(x)    # tensor(0)
x.min()         # tensor(0)

torch.max(x)    # tensor(90)
x.max()         # tensor(90)
```

### ⚠️ Mean: cẩn thận data type!

Thử ngay:

```python
torch.mean(x)
```

Và... lỗi:

```text
RuntimeError: mean(): could not infer output dtype. Input dtype must be either a floating point or complex dtype. Got: Long
```

Đây chính là lỗi **sai data type** mà mình đã cảnh báo! Kiểm tra:

```python
x.dtype    # torch.int64
```

`torch.arange` với các số nguyên tạo ra tensor `int64` (còn gọi là **`long`**), không phải float. Mà `torch.mean` **không nhận** tensor kiểu long.

Điểm hay: tài liệu `torch.mean` có tham số `dtype` tùy chọn, nhưng **không nói rõ** input bắt buộc phải là floating point. Chỉ khi chạy code và đọc thông báo lỗi, bạn mới biết. Đây là kiểu "hidden thing" chỉ gặp khi thực hành.

Cách sửa — ép kiểu:

```python
torch.mean(x.type(torch.float32))    # tensor(45.)
x.type(torch.float32).mean()         # tensor(45.)
```

Và mean của dãy `0, 10, ..., 90` đúng là **45**.

> Ghi chú: `torch.mean` yêu cầu tensor có dtype **floating point** hoặc **complex**. Tensor số nguyên phải ép sang `torch.float32` (hoặc float khác) trước.

### ➕ Sum

```python
torch.sum(x)    # tensor(450)
x.sum()         # tensor(450)
```

Tổng `0 + 10 + ... + 90 = 450`.

### 🎨 Dùng hàm hay method?

Cả `torch.min(x)` lẫn `x.min()` đều chạy, vì bên dưới chúng gọi cùng một cơ chế. Mình thường dùng `torch.max(x)`, nhưng các bạn sẽ thấy mình lúc khác lại viết `x.sum()`.

Lời khuyên: **chọn một style và giữ nhất quán** trong code của mình.

### 🎯 Chốt lại

| Phép | Cách viết |
|---|---|
| Min | `torch.min(x)` / `x.min()` |
| Max | `torch.max(x)` / `x.max()` |
| Mean | `torch.mean(x)` — cần dtype float |
| Sum | `torch.sum(x)` / `x.sum()` |

Đến đây chúng ta đã gặp **hai** trong ba lỗi lớn: **sai data type** và **sai shape**. Còn **sai device** — sẽ tới sau.

Bài tập cho bài sau: làm sao tìm **vị trí** của min và max (index nào chứa giá trị lớn nhất/nhỏ nhất)? Gợi ý: tìm hiểu `torch.argmin` và `torch.argmax`. Hẹn gặp các bạn!
