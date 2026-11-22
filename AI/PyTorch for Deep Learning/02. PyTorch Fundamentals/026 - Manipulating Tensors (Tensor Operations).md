---
title: 'Các phép toán trên tensor: cộng, trừ, nhân, chia'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 26
status: edited
source: '026 - Manipulating Tensors (Tensor Operations).md'
categories:
- AI
tags: []
---

# ➕ Các phép toán trên tensor

> Nguồn: `026 - Manipulating Tensors (Tensor Operations).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656966)

Chúng ta đã biết đọc thuộc tính tensor. Giờ là lúc **thao tác** trên chúng. Đây chính là cách neural network hoạt động: kết hợp các phép toán để biến đổi số.

### 🧮 Neural network = tổ hợp các phép toán

Neural network gồm rất nhiều **hàm toán học** mà PyTorch chạy ngầm. Các phép toán tensor bao gồm:

* **Addition** (cộng)
* **Subtraction** (trừ)
* **Multiplication** (nhân) — có hai loại: element-wise và matrix
* **Division** (chia)
* **Matrix multiplication** (nhân ma trận)

Để tìm pattern trong dữ liệu, mạng neural lấy một tensor chứa số ngẫu nhiên, thực hiện một **tổ hợp bất kỳ** các phép trên, rồi điều chỉnh số để biểu diễn dữ liệu tốt hơn. Không nhất thiết phải dùng hết — chỉ cần một tổ hợp phù hợp.

### ➕ Cộng và trừ

```python
tensor = torch.tensor([1, 2, 3])

tensor + 10       # tensor([11, 12, 13])
tensor - 10       # tensor([-9, -8, -7])
torch.add(tensor, 10)
```

Dùng operator `+`/`-` quen thuộc như trong Python. PyTorch cũng có hàm có sẵn như **`torch.add`**.

### ✖️ Nhân

```python
tensor * 10       # tensor([10, 20, 30])
torch.mul(tensor, 10)
```

Cẩn thận: `tensor * 10` **không làm thay đổi** `tensor` gốc trừ khi bạn gán lại:

```python
tensor = tensor * 10
tensor            # tensor([10, 20, 30])
```

`torch.mul` là tên đầy đủ của `mul` — viết tắt của multiply.

### 🧭 Nên dùng operator hay hàm?

Lời khuyên của mình: với phép cộng, trừ, nhân, chia cơ bản, **cứ dùng operator của Python** (`+`, `-`, `*`, `/`) vì dễ đọc hơn.

Nhưng khi bạn thấy code người khác dùng `torch.mul` hay `torch.add`, cũng đừng ngạc nhiên — chúng tương đương. Và với các phép phức tạp hơn như **matrix multiplication**, thì nên dùng hàm của PyTorch thay vì viết vòng lặp — lý do sẽ rõ ở bài sau.

### 🎯 Chốt lại

* `+`, `-`, `*`, `/` chạy trực tiếp trên tensor.
* `torch.add`, `torch.mul`... là các hàm tương đương.
* Phép toán **không sửa tại chỗ** trừ khi gán lại.

Bài tập (và cũng là teaser cho bài sau): hãy Google **"matrix multiplication"** — trang **Math is Fun** có hướng dẫn rất dễ hiểu. Xem thử rồi nghĩ cách làm nó bằng PyTorch. Hẹn gặp các bạn ở bài sau!
