---
title: 'Làm quen tensor: scalar, vector, matrix và tensor nhiều chiều'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 20
status: edited
source: '020 - Introduction to PyTorch Tensors.md'
categories:
- AI
tags: []
---

# 🧱 Làm quen tensor: scalar, vector, matrix và tensor nhiều chiều

> Nguồn: `020 - Introduction to PyTorch Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656950)

Giờ chúng ta bắt đầu với thứ quan trọng nhất của cả khóa: **tensor** — viên gạch chính để biểu diễn dữ liệu trong deep learning. Cách học hiệu quả nhất là mở một cửa sổ Colab bên cạnh video và **gõ lại từng dòng** cùng mình. Vấp chỗ nào thì mở notebook tham chiếu hoặc đặt câu hỏi.

### 🔢 Scalar: tensor một con số

Trong PyTorch, gần như mọi thứ đều được gọi là tensor, nhưng vẫn có những tên gọi riêng cho từng kiểu. Đầu tiên là **scalar**:

```python
scalar = torch.tensor(7)
scalar
```

Kết quả trả về `tensor(7)` — đúng kiểu dữ liệu tensor. `torch.tensor` là một trong những class phổ biến nhất của PyTorch, các bạn nên dành ít nhất 10 phút đọc tài liệu của nó sau bài này.

Scalar **không có chiều** (dimension) nào, chỉ là một con số đơn. Muốn lấy con số ra khỏi tensor:

```python
scalar.item()
```

Kết quả là `7` kiểu Python `int` bình thường.

---

### ➡️ Vector: tensor một chiều

```python
vector = torch.tensor([7, 7])
vector
```

Vector khác scalar ở chỗ **có nhiều hơn một con số**. Theo định nghĩa toán học, vector có **magnitude** (độ lớn) và **direction** (hướng). Nhưng cách mình hay nhớ: vector có nhiều hơn một số.

```python
vector.ndim
```

Trả về `1` — nghe hơi rối, nhưng sẽ rõ khi gặp tensor nhiều chiều.

Một mẹo để đếm số chiều: **đếm số cặp dấu ngoặc vuông**. Vector có một cặp, nên `ndim = 1`.

```python
vector.shape
```

Trả về `torch.Size([2])` — vector có hình dạng `2`, tức hai phần tử.

---

### 🔲 Matrix: tensor hai chiều

```python
MATRIX = torch.tensor([[7, 8],
                       [9, 10]])
MATRIX.ndim
```

Hai cặp ngoặc vuông → **2 chiều**.

```python
MATRIX.shape
```

Trả về `torch.Size([2, 2])` — 2 nhân 2, tổng cộng 4 phần tử.

Index theo trục 0:

```python
MATRIX[0]
```

Cho ra `tensor([7, 8])`; index `MATRIX[1]` cho `tensor([9, 10])`. Đây chính là lúc các cặp ngoặc phát huy tác dụng.

---

### 🧊 Tensor: ba chiều trở lên

```python
TENSOR = torch.tensor([[[1, 2, 3],
                        [3, 6, 9],
                        [2, 5, 4]]])
TENSOR.ndim
```

Ba cặp ngoặc vuông → **3 chiều**.

```python
TENSOR.shape
```

Trả về `torch.Size([1, 3, 3])`. Đọc thế nào?

* Số `1` ứng với cặp ngoặc ngoài cùng.
* Số `3` đầu ứng với ba hàng bên trong.
* Số `3` sau ứng với ba phần tử mỗi hàng.

Nói cách khác, đây là **một** khối hình `3 × 3`. Index `TENSOR[0]` sẽ lấy ra khối `3 × 3` đó.

---

### 🖼️ Hình dung các chiều

Mình hay nhìn một hình minh họa: cặp ngoặc ngoài cùng (màu xanh) ứng với `dim=0` và số đầu tiên trong shape; cặp giữa ứng với `dim=1` và số thứ hai; cặp trong cùng ứng với `dim=2` và số thứ ba.

Chuyện hiểu chiều của tensor cần rất nhiều luyện tập — bản thân mình cũng vậy. Vì thế bài tập của bài này: **tự viết một tensor với số ngoặc vuông tùy thích**, nhét bất kỳ con số nào, rồi tương tác với nó qua `ndim`, `shape` và indexing giống như mình vừa làm.

Thử đi nhé, rồi chúng ta sang chủ đề tiếp theo. Hẹn gặp các bạn!
