---
title: 'Matrix multiplication (phần 2): hai quy tắc về shape'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 28
status: edited
source: '028 - Matrix Multiplication (Part 2)- The Two Main Rules of Matrix Multiplic.md'
categories:
- AI
tags: []
---

# 🧮 Matrix multiplication (phần 2): hai quy tắc về shape

> Nguồn: `028 - Matrix Multiplication (Part 2)- The Two Main Rules of Matrix Multiplic.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656974)

Ở bài trước matrix multiplication chạy ngon vì tensor của chúng ta quá đơn giản. Nhưng khi làm với tensor lớn hơn, các bạn sẽ đụng **một trong những lỗi phổ biến nhất của deep learning: shape error**. Bài này mình sẽ chỉ ra hai quy tắc quyết định phép nhân ma trận có hợp lệ hay không.

### 🎯 Quy tắc 1: inner dimensions phải khớp

Khi nhân hai ma trận, **inner dimensions** (chiều bên trong) phải bằng nhau.

Ví dụ shape `(3, 2)` nhân với `(3, 2)`:

```python
torch.matmul(torch.rand(3, 2), torch.rand(3, 2))
```

Sẽ lỗi, vì inner dimensions là `2` và `3` — không khớp.

Nhưng `(3, 2)` nhân với `(2, 3)` thì chạy, vì inner dimensions đều là `2`:

```python
torch.matmul(torch.rand(3, 2), torch.rand(2, 3))
```

Cách nhớ: viết shape cạnh nhau, cặp số **ở giữa** phải giống nhau.

```text
(3, 2) @ (2, 3)
    └──┬──┘
   phải khớp
```

### 📏 Quy tắc 2: kết quả có shape của outer dimensions

Kết quả của phép nhân mang shape của **outer dimensions** — hai số ở ngoài cùng.

```text
(3, 2) @ (2, 3)  →  (3, 3)
 └┬─┘        └┬─┘      └─┬─┘
  lấy        lấy      outer dims
```

Vài ví dụ mình đã thử:

| Phép nhân | Kết quả |
|---|---|
| `(2, 3) @ (3, 2)` | `(2, 2)` |
| `(3, 2) @ (2, 3)` | `(3, 3)` |
| `(3, 10) @ (10, 3)` | `(3, 3)` |
| `(10, 10) @ (10, 10)` | `(10, 10)` |
| `(3, 10) @ (7, 3)` | ❌ lỗi: inner dims `10` và `7` không khớp |

Đúng vậy: đổi `2` thành `10` ở inner dimensions, phép nhân vẫn hợp lệ; nhưng đổi một bên thành `7` thì vỡ ngay.

### ⚠️ Thông báo lỗi quen thuộc

Khi vi phạm quy tắc 1, PyTorch báo đại ý:

```text
RuntimeError: mat1 and mat2 shapes cannot be multiplied (3x10 and 7x3)
```

Hãy nhớ khuôn mặt của lỗi này — các bạn sẽ gặp nó rất nhiều. Cách sửa: chỉnh shape để inner dimensions khớp nhau.

### @ hay `torch.matmul`?

PyTorch hỗ trợ cả hai:

```python
a @ b                 # toán tử @
torch.matmul(a, b)    # hàm đầy đủ
```

Mình khuyên dùng **`torch.matmul`** vì rõ nghĩa hơn. `@` tiện và ngắn gọn, nhưng ít người nhận ra ngay đó là matrix multiplication.

### 🎯 Chốt lại

1. **Inner dimensions phải khớp** — nếu không, `mat1 and mat2 shapes cannot be multiplied`.
2. **Kết quả mang shape của outer dimensions**.

Bài tập: mở trang **matrixmultiplication.xyz**, nhập thử vài ma trận với số tùy thích, bấm nhân và **xem điều gì xảy ra**. Bài sau chúng ta sẽ tái hiện đúng trò đó bằng code PyTorch — và xử lý lỗi shape một cách bài bản. Hẹn gặp các bạn!
