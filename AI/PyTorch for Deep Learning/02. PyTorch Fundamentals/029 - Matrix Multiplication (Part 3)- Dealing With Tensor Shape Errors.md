---
title: 'Matrix multiplication (phần 3): xử lý lỗi shape bằng transpose'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 29
status: edited
source: '029 - Matrix Multiplication (Part 3)- Dealing With Tensor Shape Errors.md'
categories:
- AI
tags: []
---

# 🔧 Matrix multiplication (phần 3): xử lý lỗi shape

> Nguồn: `029 - Matrix Multiplication (Part 3)- Dealing With Tensor Shape Errors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656976)

Neural network gồm rất nhiều phép matrix multiplication. Nếu có một tensor sai shape ở đâu đó, gần như chắc chắn bạn sẽ nhận **shape error**. Bài này mình sẽ chỉ công cụ quan trọng nhất để sửa: **transpose**.

### 🧱 Dựng hai tensor cụ thể

```python
tensor_A = torch.tensor([[1, 2],
                         [3, 4],
                         [5, 6]])

tensor_B = torch.tensor([[7, 10],
                         [8, 11],
                         [9, 12]])
```

Cả hai đều có shape **`(3, 2)`**.

---

### ❌ Thử nhân trực tiếp

```python
torch.matmul(tensor_A, tensor_B)
```

Lỗi ngay:

```text
RuntimeError: mat1 and mat2 shapes cannot be multiplied (3x2 and 3x2)
```

Vì inner dimensions là `2` và `3` — không khớp. Lưu ý: `torch.mm` cũng là phép nhân ma trận (dành cho tensor 2 chiều) và cho kết quả tương tự `torch.matmul`; còn `torch.matmul` linh hoạt hơn với tensor nhiều chiều.

---

### 🔄 Transpose: đổi trục của tensor

**Transpose** hoán đổi các trục/chiều của tensor. Với tensor 2 chiều, nó biến hàng thành cột và ngược lại.

Cách viết ngắn gọn:

```python
tensor_B.T
```

Trước transpose, các số `7, 8, 9` chạy dọc; `10, 11, 12` chạy dọc. Sau transpose, `7, 8, 9` nằm ngang và `10, 11, 12` nằm dưới.

```python
tensor_B.shape      # torch.Size([3, 2]) — chưa đổi
tensor_B.T.shape    # torch.Size([2, 3]) — đã đổi
```

Điểm quan trọng: **transpose không đổi các phần tử**, chỉ **sắp xếp lại** chúng. Thông tin vẫn nguyên vẹn, chỉ là bố cục khác đi.

> Ghi chú: `tensor.T` là thuộc tính tiện dụng cho tensor 2 chiều. Với tensor nhiều chiều hơn, transpose cần chỉ rõ hai trục, ví dụ `torch.transpose(input, dim0=0, dim1=1)`.

---

### ✅ Nhân sau khi transpose

```python
torch.matmul(tensor_A, tensor_B.T)
```

Giờ inner dimensions khớp: `(3, 2) @ (2, 3)` → kết quả shape **`(3, 3)`**, đúng quy tắc 2.

Kết quả:

```python
tensor([[ 27,  30,  33],
        [ 61,  68,  75],
        [ 95, 106, 117]])
```

Kiểm tra phần tử đầu: `(1 × 7) + (2 × 10) = 27`. Đó chính là dot product của hàng đầu `tensor_A` với cột đầu `tensor_B.T`.

---

### 🔍 In ra để "visualize"

Theo đúng khẩu hiệu **visualize, visualize, visualize**, mình in từng bước:

```python
print(f"Original shapes: tensor_A = {tensor_A.shape}, tensor_B = {tensor_B.shape}")
print(f"New shapes: tensor_A = {tensor_A.shape}, tensor_B.T = {tensor_B.T.shape}")
print(f"Multiplying: {tensor_A.shape} @ {tensor_B.T.shape} <- inner dimensions must match")
output = torch.matmul(tensor_A, tensor_B.T)
print(f"\nOutput:\n{output}")
print(f"\nOutput shape: {output.shape}")
```

Kết quả:

```text
Original shapes: tensor_A = torch.Size([3, 2]), tensor_B = torch.Size([3, 2])
New shapes: tensor_A = torch.Size([3, 2]), tensor_B.T = torch.Size([2, 3])
Multiplying: torch.Size([3, 2]) @ torch.Size([2, 3]) <- inner dimensions must match
Output shape: torch.Size([3, 3])
```

---

### 🌐 Nhìn trực quan trên web

Nếu nhập `[[1,2],[3,4],[5,6]]` và `[[7,8,9],[10,11,12]]` vào **matrixmultiplication.xyz** rồi bấm nhân, các bạn sẽ thấy từng cặp số "nhảy" ra: `1×7 + 2×10 = 27`, rồi `30`, `33`, `61`, `68`... cho đến ma trận kết quả y hệt trên.

---

### 🎯 Bài tập

Tự tạo tensor với shape tùy ý, thử nhân, cố tình tạo lỗi shape, rồi sửa bằng transpose. Thử cả **transpose `tensor_A` thay vì `tensor_B`** xem kết quả ra sao. Càng nghịch nhiều, bạn càng hiểu matrix multiplication. Hẹn gặp các bạn ở bài sau!
