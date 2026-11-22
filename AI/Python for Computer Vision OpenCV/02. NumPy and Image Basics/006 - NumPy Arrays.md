---
title: 'NumPy Arrays: tạo, tính toán, index và slice'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 6
status: edited
source: '006 - NumPy Arrays.md'
categories:
- AI
tags: []
---

# 🐍 NumPy Arrays — nền tảng cho mọi image sau này

> Nguồn: `006 - NumPy Arrays.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257482)

Khi đọc dữ liệu ảnh, máy tính sẽ đọc nó vào dưới dạng **array** — nên trước hết ta cần nắm NumPy thật chắc. Bài này là một crash course: tạo array, vài phép toán thông dụng, cùng indexing và slicing. Quan hệ giữa ảnh và array sẽ được nói kỹ ở bài sau.

### 🐍 Import và tạo array từ list

```python
import numpy as np

mylist = [1, 2, 3]
type(mylist)          # list

myarray = np.array(mylist)
type(myarray)         # numpy.ndarray
```

NumPy đã có sẵn trong môi trường khóa học. Điều hay của NumPy array là nó nhận được nhiều chiều, không chỉ một list phẳng.

---

### 🔢 np.arange, np.zeros và np.ones

**`np.arange`** trả về các giá trị cách đều trong một khoảng — phiên bản NumPy của hàm `range`. Cú pháp gồm start, stop (không bao gồm) và step tùy chọn:

```python
np.arange(0, 10)        # 0..9
np.arange(0, 10, 2)     # 0, 2, 4, 6, 8
```

**`np.zeros`** nhận vào **shape**, ví dụ `np.zeros((5, 5))` hay `np.zeros((10, 5))`. Chiều thứ nhất (vị trí 0) là **số hàng**, chiều thứ hai là **số cột**. Mặc định nó tạo ra **float** (có dấu chấm thập phân), khác với `np.arange` tạo integer. **`np.ones`** tương tự, chỉ khác là toàn số 1 — ví dụ `np.ones((2, 4))`; tham số `shape=` có thể lược bớt, chỉ cần truyền tuple.

Hai hàm dùng xuyên suốt khóa là **`np.zeros`** và **`np.ones`**. Nhớ giá trị đầu của shape là số hàng (chiều cao), giá trị sau là số cột (chiều rộng) — ban đầu hơi phản trực giác, nhưng sẽ rất hợp lý khi bắt đầu đọc ảnh.

---

### 🎲 Random có seed

Đặt **seed** trước để dữ liệu ngẫu nhiên vẫn tái lập được:

```python
np.random.seed(101)
arr = np.random.randint(0, 100, 10)
```

`np.random.randint` trả về số nguyên ngẫu nhiên từ **low** (bao gồm) đến **high** (không bao gồm). Số `101` chỉ là seed tùy ý — phải dùng cùng một số thì mới ra cùng kết quả. Nếu không khớp với giảng viên, cứ chạy lại các cell theo đúng thứ tự.

---

### 📊 Max, min, mean và reshape

```python
arr.max()     # giá trị lớn nhất
arr.argmax()  # index của giá trị lớn nhất
arr.min()     # giá trị nhỏ nhất
arr.argmin()  # index của giá trị nhỏ nhất
arr.mean()    # trung bình
```

`argmax` / `argmin` trả về index, đếm từ 0 giống list Python. Với array ở trên: max là `95` tại index `0`, min là `9` tại index `7`, mean là `60.8`.

Kiểm tra shape bằng thuộc tính, **không có dấu ngoặc**: `arr.shape` cho `(10,)`, còn `arr.reshape((2, 5))` đưa về 2 hàng × 5 cột. Nếu shape không khớp số phần tử, NumPy báo lỗi — array 10 phần tử mà reshape thành `(2, 10)` (cần 20 phần tử) sẽ không hợp lệ, còn `(5, 2)` thì chạy tốt.

---

### 🧩 Indexing và slicing trên ma trận

Tạo ma trận 10×10 chứa các số 0–99 rồi lấy phần tử theo **hàng, cột**:

```python
mat = np.arange(0, 100).reshape(10, 10)

mat[0, 1]   # 1
mat[4, 6]   # 46
mat[:, 1]   # toàn bộ cột 1
mat[2, :]   # toàn bộ hàng 2
mat[0:3, 0:3]   # khối 3x3 góc trên trái
```

Vì ma trận chứa đúng các số từ 0 đến 99, nhìn là thấy ngay index từng ô — rất tiện để luyện tập. Thử tự tay lấy một số bất kỳ trước khi xem đáp án.

Lưu ý `mat[:, 1]` trả về shape `(10,)`; muốn có shape `(1, 10)` thì phải `reshape` lại. Còn `mat[0:3, 0:3]` dùng slice notation giống list Python, nhưng chạy trên hai chiều: lấy các hàng 0, 1, 2 và các cột 0, 1, 2 (không bao gồm 3).

---

### 💡 Gán lại giá trị và copy

Muốn đổi giá trị một vùng, gán trực tiếp — thao tác này **sửa luôn ma trận gốc**:

```python
mat[0:3, 0:3] = 0
```

Muốn giữ bản gốc thì tạo bản copy trước:

```python
mynewmat = mat.copy()
mynewmat[0:6, :] = 999
```

Đây là thao tác sẽ gặp lại nhiều lần, đặc biệt khi muốn đổi giá trị một số **pixel** của ảnh.

---

### ✅ Tóm lại

Các bạn đã biết tạo array (`np.array`, `np.arange`, `np.zeros`, `np.ones`), tạo dữ liệu ngẫu nhiên có seed, tính max/min/mean/argmax/argmin, `reshape`, cùng indexing và slicing trên hai chiều. Slice 2 chiều có thể hơi rối lúc đầu, nhưng khóa học không dùng quá thường xuyên — chủ yếu để gán lại pixel. Bài tiếp theo: **một image thực chất là gì** dưới góc nhìn của máy tính.
