---
title: 'Tạo tensor theo range và tensor "like" một tensor khác'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 23
status: edited
source: '023 - Creating a Tensor Range and Tensors Like Other Tensors.md'
categories:
- AI
tags: []
---

# 🔢 Tạo tensor theo range và tensor "like"

> Nguồn: `023 - Creating a Tensor Range and Tensors Like Other Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656960)

Hai cách tạo tensor rất hay gặp nữa là tạo theo **range** (dải số) và tạo tensor **giống shape của tensor khác**. Bài này chúng ta sẽ làm cả hai.

### ⚠️ `torch.range` đã bị deprecated

Trước đây người ta dùng:

```python
torch.range(0, 9)
```

Nhưng với PyTorch 1.10, `torch.range` **đã bị deprecated** và sẽ bị gỡ trong một bản phát hành tương lai. Nếu gặp code cũ dùng nó, hãy cẩn thận.

Cách thay thế đúng là dùng **`torch.arange`**.

---

### 📏 `torch.arange`: tạo dải số

```python
torch.arange(0, 10)
```

Kết quả: `tensor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])`. Mặc định bắt đầu từ 0, và dừng ở **end - 1** (không bao gồm `end`).

Muốn từ 1 đến 10, đặt start và end:

```python
one_to_ten = torch.arange(start=1, end=11)
```

Và có thể chỉ định **step** (bước nhảy):

```python
torch.arange(start=0, end=1000, step=77)
```

Kết quả: `0, 77, 154, 231, ...` cộng dồn 77 cho đến khi chạm 1000.

Ba tham số cần nhớ của `arange`:

1. **`start`** — bắt đầu.
2. **`end`** — kết thúc (không tính).
3. **`step`** — bước nhảy (mặc định là 1).

---

### 🪞 Tạo tensor "like": cùng shape, không cần khai báo lại

Giả sử bạn có `one_to_ten` với shape `(10,)`. Bạn muốn tạo một tensor toàn 0 **cùng shape** mà không phải gõ lại `10`.

Dùng **`torch.zeros_like`**:

```python
ten_zeros = torch.zeros_like(input=one_to_ten)
ten_zeros
```

Kết quả là tensor toàn 0 với đúng shape của `one_to_ten` — tức 10 số 0.

Nguyên tắc chung: các method có hậu tố **`_like`** nhận vào một tensor khác và tạo ra tensor mới **cùng shape** (và thường cùng `dtype`/`device`). Ví dụ `torch.ones_like`, `torch.rand_like`.

---

### 🛠️ Khi Colab "đơ"

Trong video, có lúc cell chạy mãi không xong. Vài mẹo xử lý:

* Bấm **Stop** để dừng cell đang chạy.
* Vào **Runtime → Restart runtime** để khởi động lại máy tính phía sau notebook, rồi chạy lại các cell (`Runtime → Restart and run all`).

Không có công thức cố định để sửa lỗi — chủ yếu là **đoán và kiểm tra** (guess and check).

---

### 🎯 Chốt lại

* Cần dải số: dùng **`torch.arange`** (đừng dùng `torch.range` đã deprecated), với `start`, `end`, `step`.
* Cần tensor cùng shape với tensor khác: dùng method **`*_like`**, ví dụ `torch.zeros_like(input=...)`.

Bài tập: tạo một range tùy ý, rồi dùng `torch.zeros_like` để tạo tensor 0 cùng shape với nó. Hẹn gặp các bạn ở bài sau!
