---
title: 'Bài 112 — Tổng hợp ma trận (matrix aggregation) trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 112
status: edited
source: '112 - Matrix Aggregation.md'
categories:
- AI
tags: []
---

# 📊 Matrix aggregation: tóm tắt dữ liệu từ tensor

> Nguồn: `112 - Matrix Aggregation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482179)

Chào các bạn! Bài này mình học **matrix aggregation (tổng hợp ma trận)** — tức trích ra những **bản tóm tắt có ý nghĩa** từ ma trận/tensor như tổng, trung bình hay giá trị lớn nhất. Những phép này rất cần để **hiểu pattern dữ liệu** và **giảm chiều**. Mình sẽ đi từ phép cơ bản đến nâng cao.

### 🧮 Chuẩn bị ma trận đầu vào

```python
import torch

matrix = torch.tensor([[1., 2., 3.],
                       [4., 5., 6.],
                       [7., 8., 9.]])
```

Đây là ma trận `3 x 3` với các giá trị từ 1 đến 9.

---

### ➕ Các phép tổng hợp cơ bản

Trên toàn bộ ma trận, mình gọi trực tiếp các method:

```python
print(matrix.sum())      # 45
print(matrix.min())      # 1
print(matrix.max())      # 9
print(matrix.median())   # 5
print(matrix.mean())     # 5
```

Kết quả: tổng là **45**, nhỏ nhất **1**, lớn nhất **9**, median **5**, mean **5**. Đây là những phép "tóm tắt" toàn cục nhanh nhất.

**Tổng hợp theo một chiều cụ thể**

Thay vì trên toàn ma trận, mình có thể chỉ định `dim`. Quy ước cần nhớ:

* `dim=0` → thao tác **dọc theo hàng** (gộp các hàng lại, cho kết quả theo từng cột).
* `dim=1` → thao tác **dọc theo cột** (gộp các cột lại, cho kết quả theo từng hàng).

```python
print(matrix.max(dim=0))     # mỗi cột: [7, 8, 9]
print(matrix.sum(dim=0))     # mỗi cột: [12, 15, 18]
print(matrix.sum(dim=1))     # mỗi hàng: [6, 15, 24]
```

Với `dim=0`, cột 0 gồm `1, 4, 7` → max là **7**, tổng là **12**. Với `dim=1`, hàng đầu `1+2+3 = 6`, hàng hai `4+5+6 = 15`, hàng ba `7+8+9 = 24`.

> Mẹo nhớ: tham số `dim` là **chiều bị "gộp mất"**. `dim=0` gộp các hàng → còn lại vector theo cột.

---

### 📈 Tổng hợp tích lũy (cumulative)

**Cumulative sum** cộng dồn qua từng phần tử. Với `dim=1`, cộng dồn theo cột trong mỗi hàng:

```python
cumsum = matrix.cumsum(dim=1)
# hàng 1: [1, 3, 6]
# hàng 2: [4, 9, 15]
# hàng 3: [7, 15, 24]
```

Phần tử đầu là `1`; tiếp theo `1+2 = 3`; rồi `1+2+3 = 6`. Các hàng sau lặp lại logic tương tự.

**Cumulative product** nhân dồn. Với `dim=0`, nhân dồn theo hàng trong từng cột:

```python
cumprod = matrix.cumprod(dim=0)
# cột 0: [1, 4, 28]
```

`1`, rồi `1*4 = 4`, rồi `1*4*7 = 28`.

---

### 🎭 Tổng hợp có điều kiện (masked) và đếm phần tử khác 0

Mình có thể tạo **mask** bằng một biểu thức điều kiện rồi cộng các giá trị thỏa mãn:

```python
print(matrix[matrix > 5].sum())   # 30  (6+7+8+9)
print(matrix[matrix > 8].sum())   # 9   (chỉ có 9)
```

Biểu thức `matrix > 5` sinh ra một ma trận `True/False`; dùng nó làm mask để chọn phần tử rồi `.sum()`.

Đếm số phần tử **khác 0** bằng `nonzero`:

```python
count = matrix.nonzero().size(0)
print(count)   # 9
```

`nonzero()` trả về chỉ số các phần tử khác 0, và `.size(0)` cho biết có bao nhiêu chỉ số như vậy. Nếu mình đổi ba phần tử thành 0, kết quả sẽ là **6**.

---

### 📐 Chuẩn hóa ma trận về khoảng 0..1

Từ `min` và `max`, mình dựng công thức **min-max normalization**:

```python
max_v = matrix.max()
min_v = matrix.min()
normalized = (matrix - min_v) / (max_v - min_v)
```

Với ma trận này, giá trị nhỏ nhất `1` thành `0`, lớn nhất `9` thành `1`, mọi giá trị ở giữa rơi vào khoảng `(0, 1)`. Đây là bước tiền xử lý quen thuộc trước khi đưa dữ liệu vào model.

---

### ✅ Chốt lại

Mình đã đi từ những phép đơn giản — `sum`, `min`, `max`, `median`, `mean` — đến tổng hợp **theo chiều** (`dim=0/1`), **tích lũy** (`cumsum`, `cumprod`), **có điều kiện** (masked sum, `nonzero`) và **chuẩn hóa min-max**. Đây là bộ công cụ để tóm tắt và phân tích dữ liệu gọn gàng trước khi huấn luyện. Hẹn gặp các bạn ở bài tiếp theo!
