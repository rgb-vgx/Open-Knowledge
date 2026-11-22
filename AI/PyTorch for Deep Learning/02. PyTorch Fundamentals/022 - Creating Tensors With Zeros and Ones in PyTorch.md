---
title: 'Tạo tensor toàn số 0 và toàn số 1: ứng dụng làm mask'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 22
status: edited
source: '022 - Creating Tensors With Zeros and Ones in PyTorch.md'
categories:
- AI
tags: []
---

# ⬜ Tạo tensor toàn số 0 và toàn số 1

> Nguồn: `022 - Creating Tensors With Zeros and Ones in PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656956)

Ngoài random tensor, PyTorch còn cho tạo tensor toàn **số 0** hoặc toàn **số 1**. Nghe có vẻ nhàm, nhưng chúng có ứng dụng rất thực tế — đặc biệt là **mask**. Bài này mình sẽ giải thích.

### ✍️ Nhắc lại: tham số `size`

Ở bài trước mình có lúc dùng `size=` lúc không. Cả hai đều được:

```python
torch.rand(size=(3, 3))
torch.rand(3, 3)
```

Kết quả tương đương — shape bạn đưa vào quyết định kết quả.

---

### ⬜ Tensor toàn số 0: `torch.zeros`

```python
zeros = torch.zeros(size=(3, 4))
zeros
```

Tạo tensor `3 × 4` toàn số 0.

**Dùng để làm gì?** Để tạo **mask** — mặt nạ che đi một phần dữ liệu.

Nguyên lý rất đơn giản: **nhân bất kỳ số nào với 0 cũng bằng 0**.

```python
zeros * random_tensor
```

Toàn bộ kết quả thành 0. Nghĩa là nếu bạn muốn "tắt" một cột số nào đó trong tensor mục tiêu, bạn tạo một tensor 0 ở cột đó rồi nhân vào. Kết quả là bảo model: "Bỏ qua đám số này đi, tôi đã zero hóa chúng rồi."

---

### ⬛ Tensor toàn số 1: `torch.ones`

```python
ones = torch.ones(size=(3, 4))
ones
```

Tạo tensor `3 × 4` toàn số 1.

---

### 🏷️ Một tham số quan trọng: `dtype`

Khi tạo tensor, PyTorch có một **data type mặc định**. Kiểm tra bằng:

```python
ones.dtype
```

Kết quả: `torch.float32`.

Vì mặc định mọi tensor tạo bằng method của PyTorch đều là **`torch.float32`**, trừ khi bạn chỉ định rõ `dtype`. Đây là kiểu số thực 32-bit — chúng ta sẽ nói kỹ về data type ở bài sau.

---

### 🎯 Chốt lại

* `torch.zeros` — tensor toàn 0, hữu ích để làm **mask**.
* `torch.ones` — tensor toàn 1.
* Mặc định `dtype` là `torch.float32`.

Trong thực tế, `torch.zeros` gặp nhiều hơn `torch.ones`. Nhưng cả hai đều là những method tạo tensor bạn sẽ gặp trên đường.

Bài tập: tự tạo một tensor toàn 0 và một tensor toàn 1 với kích thước tùy thích. Hẹn gặp các bạn ở bài sau — chúng ta sẽ tạo **range**!
