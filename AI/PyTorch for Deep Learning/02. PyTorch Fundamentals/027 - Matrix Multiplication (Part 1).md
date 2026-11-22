---
title: 'Matrix multiplication (phần 1): element-wise vs dot product'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 27
status: edited
source: '027 - Matrix Multiplication (Part 1).md'
categories:
- AI
tags: []
---

# ✖️ Matrix multiplication (phần 1): element-wise vs dot product

> Nguồn: `027 - Matrix Multiplication (Part 1).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656970)

Bài trước chúng ta mới liệt kê các phép toán. Giờ mình sẽ đi sâu vào phép quan trọng nhất trong neural network: **matrix multiplication**, và phân biệt nó với **element-wise multiplication**.

### 🔀 Hai kiểu nhân

Trong neural network và deep learning có hai cách nhân chính:

1. **Element-wise multiplication** — nhân từng phần tử với một số (hoặc với phần tử tương ứng của tensor kia).
2. **Matrix multiplication** — nhân ma trận với ma trận bằng **dot product**.

Matrix multiplication có lẽ là **phép toán tensor phổ biến nhất** bên trong neural network. Nó còn được gọi là **dot product**, và ký hiệu là một dấu chấm đậm.

### 🧠 Dot product hoạt động thế nào?

Ví dụ trên trang Math is Fun: nhân ma trận `[[1,2,3],[4,5,6],[7,8,9]]` với `[[...]]` — kết quả phần tử đầu tiên là `58`.

Cách tính: lấy **hàng đầu** của ma trận thứ nhất nhân với **cột đầu** của ma trận thứ hai, từng cặp rồi cộng lại:

```text
(1 × 7) + (2 × 9) + (3 × 11) = 7 + 18 + 33 = 58
```

Làm tương tự cho từng vị trí còn lại sẽ ra toàn bộ ma trận kết quả. Đây là bài tập rất tốt: tự tay làm lại từng bước.

### 🔢 Element-wise trong PyTorch

```python
tensor = torch.tensor([1, 2, 3])

print(f"Element-wise multiplication: {tensor * tensor}")
```

Kết quả: `tensor([1, 4, 9])` — vì `1×1=1`, `2×2=4`, `3×3=9`. Đúng nghĩa "nhân từng phần tử".

### 🧮 Matrix multiplication trong PyTorch

PyTorch gói matrix multiplication trong **`torch.matmul`** — viết tắt của **mat**rix **mul**tiplication.

```python
torch.matmul(tensor, tensor)
```

Kết quả: `tensor(14)`, không phải `[1, 4, 9]`. Vì sao?

Tính tay theo dot product:

```text
(1 × 1) + (2 × 2) + (3 × 3) = 1 + 4 + 9 = 14
```

Element-wise **nhân rồi để nguyên từng vị trí**; dot product **nhân từng cặp rồi cộng dồn** lại thành một số. Đó là khác biệt cốt lõi.

### 🐢 Tự viết vòng lặp vs dùng `torch.matmul`

Thử làm matrix multiplication bằng tay:

```python
value = 0
for i in range(len(tensor)):
    value += tensor[i] * tensor[i]
value
```

Kết quả vẫn là 14, nhưng chậm hơn nhiều. Đo thời gian:

* Vòng lặp Python: khoảng **1.9 ms**.
* `torch.matmul`: khoảng **252 µs**.

Tức nhanh hơn **khoảng 10 lần** — dù tensor chỉ có 3 phần tử. Với tensor một triệu phần tử, khoảng cách sẽ còn khủng khiếp hơn.

Lý do: PyTorch triển khai các hàm này theo kiểu **vectorized** — xử lý cả mảng cùng lúc thay vì lặp từng phần tử. Đó là lý do với các phép phức tạp như matrix multiplication, bạn nên dùng hàm của PyTorch thay vì tự viết `for`.

### 🎯 Chốt lại

* **Element-wise**: `tensor * tensor` → `[1, 4, 9]`.
* **Matrix multiplication / dot product**: `torch.matmul(tensor, tensor)` → `14`.
* Hàm có sẵn của PyTorch nhanh hơn vòng lặp Python rất nhiều.

Nhưng đó mới là tensor một chiều đơn giản. Với ma trận lớn hơn, matrix multiplication có những **quy tắc shape** phải thỏa. Bài sau chúng ta sẽ đi sâu vào hai quy tắc đó. Hẹn gặp các bạn!
