---
title: 'Tìm vị trí min và max của tensor với argmin, argmax'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 31
status: edited
source: '031 - Finding The Positional Min and Max of Tensors.md'
categories:
- AI
tags: []
---

# 📍 Tìm vị trí min và max với argmin, argmax

> Nguồn: `031 - Finding The Positional Min and Max of Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656980)

Bài trước chúng ta tìm **giá trị** nhỏ nhất và lớn nhất. Nhưng đôi khi bạn không cần giá trị — bạn cần biết nó **nằm ở đâu**. Đó là lúc dùng **`argmin`** và **`argmax`**.

### 🔢 Nhắc lại tensor

```python
x = torch.arange(1, 100, 10)
x
```

Kết quả: `tensor([1, 11, 21, 31, 41, 51, 61, 71, 81, 91])` — mười phần tử, từ 1 đến 91.

### 🔽 `argmin`: vị trí của giá trị nhỏ nhất

```python
torch.argmin(x)    # tensor(0)
```

Trả về `0` — tức giá trị nhỏ nhất nằm ở **index 0**.

Kiểm chứng:

```python
x[0]    # tensor(1)
```

Đúng, phần tử nhỏ nhất là `1`, ở vị trí `0`.

Lưu ý: kết quả của `argmin` là **index**, không phải giá trị. Đây chính là ý nghĩa của "arg" — trả về **đối số** (vị trí) mà tại đó hàm đạt min.

### 🔼 `argmax`: vị trí của giá trị lớn nhất

```python
torch.argmax(x)    # tensor(9)
```

Trả về `9` — phần tử lớn nhất nằm ở index 9.

```python
x[9]    # tensor(91)
```

Đúng: index 9 (phần tử thứ mười) chứa `91`.

### 🤔 Khi nào dùng arg thay vì min/max?

* **`min`/`max`** → trả về **giá trị**.
* **`argmin`/`argmax`** → trả về **vị trí**.

Nếu bạn chỉ cần con số nhỏ nhất, dùng `min`. Nhưng nếu bạn cần biết **nó xuất hiện ở đâu**, dùng `argmin`/`argmax`.

Đặc biệt, **`argmax`** rất hữu ích khi dùng hàm kích hoạt **softmax** sau này — vì softmax cho ra xác suất của từng lớp, và ta thường muốn biết **lớp nào có xác suất cao nhất** (vị trí), chứ không chỉ con số xác suất. Phần này sẽ học kỹ sau.

### 🎯 Chốt lại

| Hàm | Trả về |
|---|---|
| `torch.min(x)` | giá trị nhỏ nhất |
| `torch.max(x)` | giá trị lớn nhất |
| `torch.argmin(x)` | **index** của giá trị nhỏ nhất |
| `torch.argmax(x)` | **index** của giá trị lớn nhất |

Vậy là xong phần aggregation. Bài sau chúng ta quay lại thao tác shape — **reshape, view và stack** tensor. Hẹn gặp các bạn!
