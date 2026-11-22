---
title: 'Đưa tensor lên và xuống GPU với device-agnostic code'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 38
status: edited
source: '038 - Setting up Device-Agnostic Code and Putting Tensors On and Off the GPU.md'
categories:
- AI
tags: []
---

# 🚀 Đưa tensor lên và xuống GPU

> Nguồn: `038 - Setting up Device-Agnostic Code and Putting Tensors On and Off the GPU.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668450)

Bài trước chúng ta đã có `device` và biết GPU có sẵn. Giờ là lúc thực sự **đưa tensor lên GPU** — và xử lý lỗi khi đưa chúng trở lại CPU.

### 🤔 Vì sao cần GPU?

Tensor operation — cộng, nhân, matrix multiplication... — là các phép tính số học, và GPU rất giỏi loại này. Chạy nhanh hơn nghĩa là **tìm pattern nhanh hơn**, làm được nhiều thí nghiệm hơn, tiến tới model tốt nhất nhanh hơn.

---

### 🏠 Mặc định: tensor nằm trên CPU

```python
tensor = torch.tensor([1, 2, 3])
tensor.device    # device(type='cpu')
```

Bạn có thể chỉ định rõ:

```python
tensor = torch.tensor([1, 2, 3], device="cpu")
```

Nhưng dù không ghi, mặc định vẫn là CPU.

---

### ⬆️ Đưa tensor lên thiết bị đích: `.to(device)`

```python
tensor_on_gpu = tensor.to(device)
tensor_on_gpu.device
```

Nếu GPU có sẵn, kết quả:

```text
device(type='cuda', index=0)
```

`cuda:0` là **index của GPU** đang dùng. Vì ta chỉ có một GPU nên index là `0`; khi làm việc với nhiều GPU, các tensor có thể nằm trên các index khác nhau.

Điểm hay: nhờ **device-agnostic code**, đoạn code này chạy được **cả khi có GPU lẫn khi chỉ có CPU** — tensor tự đi tới thiết bị phù hợp, không lỗi.

Method **`.to()`** dùng được cho cả **model** (sẽ học sau), không chỉ tensor.

---

### ⬇️ Đưa tensor về CPU

NumPy **chỉ làm việc với CPU**. Thử chuyển tensor đang ở GPU sang NumPy:

```python
tensor_on_gpu.numpy()
```

Lỗi ngay:

```text
TypeError: can't convert cuda:0 device type tensor to numpy.
Use Tensor.cpu() to copy the tensor to host memory first.
```

Đây chính là lỗi **sai device** — lỗi lớn thứ ba của PyTorch! Thông báo lỗi còn chỉ luôn cách sửa.

```python
tensor_back_on_cpu = tensor_on_gpu.cpu()
tensor_back_on_cpu.numpy()
```

Gọi **`.cpu()`** để copy tensor về host memory trước, rồi `.numpy()` mới chạy được.

Lưu ý: `.cpu()` trả về một tensor **mới** trên CPU; `tensor_on_gpu` vẫn ở GPU và không bị thay đổi.

---

### 🧾 Bốn việc chính khi làm với GPU

1. Có quyền truy cập GPU (Colab).
2. Kiểm tra **`torch.cuda.is_available()`**.
3. Viết **device-agnostic code** với biến `device`.
4. Dùng **`.to(device)`** / **`.cpu()`** để di chuyển tensor.

Còn nhiều chủ đề nâng cao như **multi-GPU**, nhưng khóa này chỉ dùng một GPU.

---

### 🎯 Bài tập

* Bật GPU trên Colab, kiểm tra `torch.cuda.is_available()`.
* Set up `device`, tạo vài tensor, thử đổi `device="cpu"` và `device="cuda"`.
* Cố tình gọi `.numpy()` trên tensor GPU để thấy lỗi, rồi sửa bằng `.cpu()`.

Vậy là xong phần **fundamentals**! Chúng ta đã đi qua intro tensor, min/max/mean/sum, argmin/argmax, reshape, indexing, NumPy, reproducibility và GPU. Bài cuối sẽ là **bài tập và extra curriculum** để các bạn luyện tập. Hẹn gặp các bạn!
