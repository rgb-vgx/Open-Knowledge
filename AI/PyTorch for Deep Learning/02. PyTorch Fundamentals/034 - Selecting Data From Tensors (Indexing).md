---
title: 'Chọn dữ liệu từ tensor bằng indexing'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 34
status: edited
source: '034 - Selecting Data From Tensors (Indexing).md'
categories:
- AI
tags: []
---

# 🎯 Chọn dữ liệu từ tensor bằng indexing

> Nguồn: `034 - Selecting Data From Tensors (Indexing).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668426)

Squeeze, unsqueeze, permute — mấy khái niệm bài trước khá nặng, nhưng mục đích chung của chúng là **sửa lỗi shape/dimension**, lỗi phổ biến nhất khi làm neural network. Bài này ta học **indexing** — cách lấy dữ liệu ra khỏi tensor, kỹ năng rất giống NumPy.

### 🧱 Dựng tensor 3 chiều

```python
x = torch.arange(1, 10).reshape(1, 3, 3)
x, x.shape
```

`arange(1, 10)` cho 9 giá trị (`1..9`), `reshape(1, 3, 3)` hợp lệ vì `1 × 3 × 3 = 9`.

```text
tensor([[[1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]]])
```

Ba cặp ngoặc: ngoài cùng là shape `1`, giữa là `3` hàng, trong là `3` phần tử mỗi hàng.

### 🔎 Index từng cấp

```python
x[0]        # tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]])  — bỏ ngoặc ngoài
x[0][0]     # tensor([1, 2, 3])                         — hàng đầu
x[0][0][0]  # tensor(1)                                 — phần tử đầu tiên
```

Cùng kết quả với cách viết gộp:

```python
x[0][0]     # giống x[0, 0]
x[0][0][0]  # giống x[0, 0, 0]
```

Tùy sở thích: viết từng ngoặc giúp bạn thấy rõ đang "bóc" lớp nào.

### ⚠️ Giới hạn của từng chiều

Thử:

```python
x[1]    # ❌ IndexError: index 1 is out of bounds for dimension 0 with size 1
```

Vì chiều ngoài cùng chỉ có **kích thước 1**, nên chỉ index được `0`. Đây là chỗ dễ nhầm nhất.

Nhưng `x[0, 1, 1]` thì được:

```python
x[0, 1, 1]    # tensor(5)
```

### ✂️ Dấu `:` — lấy tất cả một chiều

Dấu hai chấm `:` nghĩa là "lấy hết chiều này".

```python
x[:, 0]        # tensor([[1, 2, 3]])       — mọi giá trị chiều 0, hàng 0
x[:, :, 1]     # tensor([[2, 5, 8]])       — mọi chiều 0 và 1, chỉ index 1 của chiều 2
x[:, 1, 1]     # tensor([5])               — mọi chiều 0, index 1 của chiều 1 và 2
x[0, 0, :]     # tensor([1, 2, 3])         — index 0 của chiều 0 và 1, mọi giá trị chiều 2
```

Đọc `x[:, :, 1]`: "lấy tất cả ở chiều 0 và chiều 1, nhưng ở chiều 2 chỉ lấy phần tử index 1". Kết quả `2, 5, 8` — đúng là cột thứ hai của ma trận `3 × 3`.

Còn `x[:, 1, 1]` về bản chất giống `x[0, 1, 1]`, nhưng có `:` ở đầu nên trả về dạng mảng `[5]` thay vì số `5`.

### 🏆 Thử thách

Với tensor trên:

1. Làm sao lấy ra số **9**?
2. Làm sao lấy ra dãy **`3, 6, 9`**?

Đáp án (thử trước khi xem nhé):

```python
x[0, 2, 2]    # tensor(9)
x[0, :, 2]    # tensor([3, 6, 9])
```

### 🎯 Chốt lại

* `x[i]`, `x[i, j]`, `x[i, j, k]` — index theo từng chiều, đếm từ 0.
* `:` — lấy toàn bộ một chiều.
* Kích thước mỗi chiều quyết định index hợp lệ — vượt quá là `IndexError`.

Indexing hơi rối lúc đầu, nhưng luyện vài lần là quen. Hẹn gặp các bạn ở bài sau!
