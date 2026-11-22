---
title: 'Bài 038 — NumPy: mảng, vector hóa và thao tác dữ liệu'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 38
status: edited
source: '038 - Numpy In Python.md'
categories:
- AI
tags: []
---

# 🔢 NumPy — trụ cột tính toán số học của Python

> Nguồn: `038 - Numpy In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086905)

Bắt đầu chặng **data analysis**, thư viện đầu tiên và quan trọng nhất là **NumPy**. Nó hỗ trợ mảng, ma trận cùng bộ hàm toán học thao tác trên đó, và tốc độ rất nhanh. Kể cả khi học deep learning, bạn vẫn sẽ gặp NumPy ở đâu đó — nên nắm chắc từ đầu.

### ⚙️ Cài đặt và import

NumPy không có sẵn khi tạo môi trường mới. Hai cách cài:

* Thêm `numpy` vào `requirements.txt` rồi chạy `pip install -r requirements.txt`.
* Hoặc cài trực tiếp trong notebook: `pip install numpy`.

Sau đó import với alias quen thuộc:

```python
import numpy as np
```

`np` là alias, để khỏi phải viết `numpy.` ở mọi chỗ.

---

### 🧱 Tạo mảng 1 chiều

```python
r1 = np.array([1, 2, 3, 4, 5])
print(r1)         # [1 2 3 4 5]
print(type(r1))   # <class 'numpy.ndarray'>
print(r1.shape)   # (5,)
```

`np.array` nhận list hoặc tuple. Kết quả không phải `list` mà là **`numpy.ndarray`** — mảng n chiều.

`shape` trả về tuple `(5,)`: chỉ một con số, nghĩa là mảng 1 chiều gồm 5 phần tử. Đừng hiểu nhầm thành "1 hàng 5 cột" — mảng 1 chiều không có khái niệm hàng/cột.

---

### 🔄 `reshape` sang 2 chiều

```python
r2 = r1.reshape(1, 5)
print(r2)         # [[1 2 3 4 5]]
print(r2.shape)   # (1, 5)
```

`reshape(1, 5)` = 1 hàng, 5 cột = 5 phần tử, khớp với số phần tử ban đầu. Nếu gọi `reshape(1, 4)` sẽ lỗi: 4 khác 5, không thể chia lại 5 phần tử thành 1×4.

Quy tắc nhận diện số chiều: đếm số cặp ngoặc vuông lồng nhau. Một cặp → 1D, hai cặp → 2D, ba cặp → 3D.

Cách khác để tạo 2D trực tiếp bằng list lồng list:

```python
r2 = np.array([[1, 2, 3, 4, 5],
               [2, 3, 4, 5, 6]])
print(r2.shape)   # (2, 5) — 2 hàng, 5 cột
```

---

### 🏭 Hàm tạo mảng có sẵn

```python
print(np.arange(0, 10, 2))     # [0 2 4 6 8]
print(np.ones((3, 4)))         # ma trận 3x4 toàn số 1
print(np.zeros((2, 3)))        # ma trận 2x3 toàn số 0
print(np.eye(3))               # ma trận đơn vị 3x3
```

* `np.arange(start, stop, step)` giống `range` nhưng trả về mảng.
* `np.ones` / `np.zeros` tạo mảng toàn 1 / toàn 0 — cực hữu ích khi cần **khởi tạo trọng số** trong deep learning.
* `np.eye` tạo **ma trận đơn vị**: đường chéo bằng 1, còn lại bằng 0.

> ⚠️ Cần kiểm chứng: transcript đọc là "NP dot I" cho ma trận đơn vị. Theo tài liệu NumPy, hàm tương ứng là **`np.eye`** (và `np.identity`); không có `np.I` dạng hàm tạo ma trận đơn vị.

---

### 📏 Thuộc tính của mảng

```python
r = np.array([[1, 2, 3], [4, 5, 6]])

print(r.shape)      # (2, 3)
print(r.ndim)       # 2
print(r.size)       # 6
print(r.dtype)      # int64 (có thể là int32 tùy hệ thống)
print(r.itemsize)   # số byte mỗi phần tử
```

`dtype` phụ thuộc nền tảng (32-bit hay 64-bit), nên giá trị có thể khác giữa các máy.

---

### ⚡ Vectorized operations

NumPy cho phép thao tác **trên cả mảng một lúc**, không cần vòng lặp:

```python
r1 = np.array([1, 2, 3, 4, 5])
r2 = np.array([10, 20, 30, 40, 50])

print(r1 + r2)   # [11 22 33 44 55]
print(r1 - r2)   # [-9 -18 -27 -36 -45]
print(r1 * r2)   # [ 10  40  90 160 250]
print(r1 / r2)
```

Mỗi phép toán áp lên từng cặp phần tử **cùng index**. Kết quả luôn là mảng mới.

---

### 🧮 Universal functions (ufunc)

Các hàm áp dụng cho toàn bộ mảng, từng phần tử:

```python
arr = np.array([5, 5, 6])

print(np.sqrt(arr))   # căn bậc hai
print(np.exp(arr))    # e mũ
print(np.sign(arr))   # dấu của từng phần tử
print(np.log(arr))    # log tự nhiên
```

---

### ✂️ Indexing và slicing

Với mảng 2 chiều `3×4`:

```python
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

print(arr[0, 0])       # 1 — hàng 0, cột 0
print(arr[2, 2])       # 11
print(arr[:, 1])       # [2 6 10] — toàn bộ cột 1
print(arr[1:, :])      # hai hàng cuối
print(arr[1:, 2:])     # [[7 8] [11 12]]
print(arr[1:, 1:3])    # [[6 7] [10 11]]
```

Chỉ số bắt đầu từ **0**. Cú pháp `start:stop` lấy từ `start` đến **trước** `stop`.

Gán lại phần tử cũng đơn giản:

```python
arr[0, 0] = 100
arr[1:, :] = 100
```

Dòng thứ hai gán 100 cho toàn bộ các hàng từ hàng 1 trở đi.

---

### 📊 Ứng dụng thống kê

**Normalization** (chuẩn hóa) đưa dữ liệu về phân phối chuẩn có mean = 0, std = 1:

```python
data = np.array([1, 2, 3, 4, 5])

mu = np.mean(data)
sigma = np.std(data)
normalized = (data - mu) / sigma
```

Các hàm thống kê cơ bản:

```python
print(np.mean(data))      # trung bình
print(np.median(data))    # trung vị
print(np.std(data))       # độ lệch chuẩn
print(np.var(data))       # phương sai
```

---

### 🎯 Logical operations

Áp điều kiện lên mảng trả về mảng boolean:

```python
data = np.arange(1, 11)   # [1..10]

print(data > 5)           # [False ... False True True ...]
print(data[data > 5])     # [ 6  7  8  9 10]
```

`data[data > 5]` là **boolean indexing** — lọc ra phần tử thoả điều kiện. Kết hợp nhiều điều kiện phải dùng toán tử bitwise `&` / `|` và bọc từng điều kiện trong ngoặc, vì `and`/`or` của Python không hoạt động theo phần tử:

```python
print(data[(data >= 5) & (data <= 8)])   # [5 6 7 8]
```

Đây là kỹ thuật sẽ gặp lại liên tục khi lọc dữ liệu trong **pandas**.

---

NumPy là "xương sống" của mọi thư viện khoa học dữ liệu. Nắm vững tạo mảng, reshape, vectorized ops và boolean indexing là nền tảng bắt buộc. Bài sau mình bước sang **pandas** — nơi DataFrame và Series biến NumPy thành công cụ phân tích dữ liệu thực thụ.
