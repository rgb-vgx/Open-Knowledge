---
title: 'Đọc thuộc tính tensor: dtype, shape và device'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 25
status: edited
source: '025 - Getting Tensor Attributes.md'
categories:
- AI
tags: []
---

# 🔎 Đọc thuộc tính tensor: dtype, shape và device

> Nguồn: `025 - Getting Tensor Attributes.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656964)

Ba lỗi lớn của PyTorch — sai **data type**, sai **shape**, sai **device** — đều được chẩn đoán bằng cách đọc ba **thuộc tính (attribute)** của tensor. Bài này mình sẽ chỉ cách đọc chúng, kèm một bất ngờ nho nhỏ về data type.

### 😅 Thử thách bài trước: nhân float16 với float32

Mình đã bảo các bạn thử nhân tensor `float16` với `float32` xem có lỗi không. Kết quả: **nó chạy được!**

Đây là một "gotcha" của PyTorch: đôi khi bạn tưởng sẽ lỗi vì khác data type, nhưng phép toán vẫn chạy. Lúc khác — nhất là khi train mạng lớn — bạn lại gặp lỗi data type thật. Điều quan trọng là **biết cách sửa** khi lỗi xảy ra.

Thử thêm vài kiểu số:

```python
int_32_tensor = torch.tensor([3, 6, 9], dtype=torch.int32)
float_32_tensor = torch.tensor([3.0, 6.0, 9.0], dtype=torch.float32)

int_32_tensor * float_32_tensor   # vẫn chạy
```

`int64` cũng chạy:

```python
long_tensor = torch.tensor([3, 6, 9], dtype=torch.long)   # torch.long = int64
long_tensor * float_32_tensor
```

Vậy là PyTorch "dễ tính" hơn mình tưởng. Nhưng cứ nhớ: khi train model thật, rất có thể các bạn sẽ đụng lỗi sai data type — và giờ thì đã biết cách đổi `dtype`.

---

### 🧭 Ba câu hỏi để chẩn đoán mọi tensor

Với ba lỗi lớn, ta cần trả lời ba câu hỏi:

1. Tensor có **shape** gì?
2. Tensor có **data type** gì?
3. Tensor nằm trên **device** nào (CPU hay GPU)?

Cách đọc:

```python
tensor.dtype     # data type
tensor.shape     # shape
tensor.device    # device
```

---

### 📐 `shape` (thuộc tính) vs `size()` (hàm)

Có một điểm dễ nhầm:

```python
some_tensor = torch.rand(3, 4)

some_tensor.shape      # torch.Size([3, 4]) — thuộc tính
some_tensor.size()     # torch.Size([3, 4]) — hàm/method
```

Cả hai cho cùng kết quả. Khác biệt:

* **`shape`** là **attribute** — viết không có ngoặc tròn.
* **`size`** là **method** — phải gọi bằng ngoặc tròn `size()`.

Mình quen dùng `shape` hơn, nhưng các bạn sẽ gặp cả `size()` trong code người khác.

---

### 🧪 Ví dụ đầy đủ

```python
some_tensor = torch.rand(3, 4)

print(f"Data type of tensor: {some_tensor.dtype}")
print(f"Shape of tensor: {some_tensor.shape}")
print(f"Device tensor is on: {some_tensor.device}")
```

Kết quả:

* **Data type**: `torch.float32` — mặc định vì ta không đổi.
* **Shape**: `torch.Size([3, 4])` — khớp với `torch.rand(3, 4)`.
* **Device**: `cpu` — mặc định, trừ khi ta chỉ định khác.

Mọi tensor tạo ra đều nằm trên **CPU** cho đến khi bạn chủ động đưa lên GPU — cách làm sẽ học ở phần sau.

---

### 🎯 Bài tập

Tạo một tensor ngẫu nhiên nhưng là `float16` thay vì `float32`, rồi đọc ba thuộc tính của nó. Phần nâng cao: thử tìm cách **đổi device** của tensor (dù chưa học) — cứ thử và xem chuyện gì xảy ra. Hẹn gặp các bạn ở bài sau!
