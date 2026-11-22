---
title: 'Reshape, view và stack: thay đổi shape tensor'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 32
status: edited
source: '032 - Reshaping, Viewing and Stacking Tensors.md'
categories:
- AI
tags: []
---

# 🔀 Reshape, view và stack

> Nguồn: `032 - Reshaping, Viewing and Stacking Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656982)

Sau một hồi nghỉ, mở lại Colab thì mình hay bấm **Runtime → Run all** để chạy lại mọi cell — nhưng lưu ý nó sẽ **dừng ở những cell lỗi cố ý** (như shape error ở bài matrix multiplication), nên phải chạy tay các cell sau đó.

Giờ ta vào chủ đề chính: các method để **đổi shape và số chiều** của tensor — vì shape mismatch là một trong những lỗi số một của deep learning. Hôm nay: **reshape**, **view**, **stack**; bài sau: **squeeze**, **unsqueeze**, **permute**.

### 🔁 `reshape`: đổi shape

**Reshape** biến tensor thành shape mong muốn, với điều kiện **tổng số phần tử không đổi**.

```python
x = torch.arange(1, 10)
x, x.shape        # tensor([1..9]), torch.Size([9])
```

Thử reshape:

```python
x.reshape(1, 7)   # ❌ lỗi: 1*7 = 7, không khớp 9 phần tử
x.reshape(1, 9)   # ✅ thành shape (1, 9)
x.reshape(2, 9)   # ❌ lỗi: 2*9 = 18, gấp đôi số phần tử
x.reshape(9, 1)   # ✅ thành shape (9, 1)
```

Điểm cần nhớ: **số phần tử phải được bảo toàn**. `9 → 1×9` hợp lệ; `9 → 1×7` hay `9 → 2×9` thì không, vì thiếu/thừa phần tử.

Một số ví dụ khác:

```python
torch.arange(1, 11).reshape(5, 2)   # ✅ 5*2 = 10
torch.arange(1, 13).reshape(3, 4)   # ✅ 3*4 = 12
```

---

### 👁️ `view`: "nhìn" tensor theo shape khác

```python
z = x.view(1, 9)
z, z.shape        # tensor([[1..9]]), torch.Size([1, 9])
```

`view` trông giống `reshape`, nhưng có một khác biệt cực quan trọng: **view chia sẻ cùng bộ nhớ với tensor gốc**. Nó không tạo bản sao — chỉ là một "góc nhìn" khác của cùng dữ liệu.

Thử thay đổi một phần tử qua view:

```python
z[0, 0] = 5
z    # phần tử đầu = 5
x    # phần tử đầu của x cũng = 5!
```

Đúng vậy — sửa `z` là sửa luôn `x`, vì chúng cùng vùng nhớ. Đây là điểm mấu chốt cần nhớ.

---

### 📚 `stack`: xếp nhiều tensor lại

**Stack** ghép nhiều tensor thành một tensor mới theo một **chiều mới**:

```python
x_stacked = torch.stack([x, x, x, x], dim=0)
x_stacked.shape      # torch.Size([4, 9])
```

Mặc định `dim=0`. Thử đổi chiều:

```python
torch.stack([x, x, x, x], dim=1).shape   # torch.Size([9, 4])
torch.stack([x, x, x, x], dim=2)         # ❌ lỗi
```

`dim=2` lỗi vì tensor gốc chỉ có 1 chiều — không có "chiều thứ 2" để chèn vào.

Quan sát `dim=0` và `dim=1`: với `dim=0`, các tensor xếp **chồng lên nhau**; với `dim=1`, chúng xếp **cạnh nhau**. Muốn quen thì phải thử qua lại nhiều lần.

PyTorch cũng có:

* **`torch.vstack`** — stack theo chiều dọc (vertical).
* **`torch.hstack`** — stack theo chiều ngang (horizontal).

Hai hàm này tương tự `stack` với các `dim` khác nhau, các bạn tự thử nhé.

---

### 🛟 Mẹo khi Colab "trục trặc"

Trong video gặp lỗi **"Save failed — automatic saving failed"**. Cách xử lý:

* Cứ tiếp tục chạy vài cell, Colab thường tự khắc phục.
* Hoặc **restart/đóng rồi mở lại** notebook.
* Nếu sợ mất thay đổi lớn: **File → Download** notebook rồi upload lại.

---

### 🎯 Chốt lại

* **`reshape`** — đổi shape, tổng phần tử phải giữ nguyên.
* **`view`** — đổi shape nhưng **chia sẻ bộ nhớ** với gốc; sửa cái này là sửa cái kia.
* **`stack`** — ghép nhiều tensor theo một `dim` mới; `vstack`/`hstack` cho dọc/ngang.

Bài tập: tự tìm hiểu `torch.squeeze` và `torch.unsqueeze` — cách dùng khá giống những gì vừa học. Bài sau chúng ta sẽ làm cùng nhau! Hẹn gặp các bạn.
