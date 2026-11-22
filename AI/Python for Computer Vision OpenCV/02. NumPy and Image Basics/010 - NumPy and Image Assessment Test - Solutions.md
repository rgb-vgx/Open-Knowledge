---
title: 'Lời giải bài kiểm tra NumPy và Image'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 10
status: edited
source: '010 - NumPy and Image Assessment Test - Solutions.md'
categories:
- AI
tags: []
---

# 🔍 Lời giải bài kiểm tra NumPy và Image

> Nguồn: `010 - NumPy and Image Assessment Test - Solutions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257494)

Đây là phần giải chi tiết cho bài assessment trước. Các bạn có thể tự làm trước rồi đối chiếu, hoặc theo dõi như một buổi code-along. Mình sẽ đi qua từng bài và giải thích vì sao lệnh đó cho ra kết quả như vậy.

### 🐍 Import và tạo array 5 × 5 toàn số 10

Import NumPy, thường đặt alias cho ngắn gọn:

```python
import numpy as np
```

Để tạo array 5 × 5 mà mọi phần tử bằng 10, có nhiều cách, nhưng cách gọn là bắt đầu từ `np.ones` rồi nhân lên:

```python
np.ones((5, 5)) * 10
```

Phép nhân được áp dụng **element-wise** trên từng phần tử, nên mọi số 1 thành 10. Cùng logic đó, chia array toàn 1 cho 2 sẽ ra toàn 0.5. Mẹo này rất tiện khi cần nhanh một array toàn một giá trị: muốn "màu tối đa" thì dùng `np.ones(...) * 255`, còn giá trị 0 thì dùng `np.zeros(...)`.

---

### 🎲 Random array và seed

Cell tạo số ngẫu nhiên gồm hai phần. Phần đầu đặt **seed**:

```python
np.random.seed(101)
```

Số `101` là tùy ý — chọn số nào cũng được, miễn **nhất quán**. Cùng một seed sẽ sinh ra cùng một dãy số ngẫu nhiên mỗi lần chạy. Nếu đổi thành `42` thì ra dãy khác, nhưng vẫn lặp lại được.

Phần sau sinh array:

```python
arr = np.random.randint(0, 100, (5, 5))
```

`np.random.randint` nhận **low**, **high**, **size**: trả về số nguyên ngẫu nhiên trong khoảng từ `0` (bao gồm) đến `100` (không bao gồm), định dạng thành array 5 × 5. Chạy lại với seed `101` sẽ luôn cho cùng kết quả.

---

### 📊 Tìm max và min

Chỉ cần gọi hai thuộc tính `arr.max()` (lớn nhất) và `arr.min()` (nhỏ nhất) — không cần vòng lặp gì cả.

---

### 🖼️ Đọc, hiển thị và chuyển ảnh sang NumPy array

Đây là thao tác lặp lại từ bài giảng:

```python
import matplotlib.pyplot as plt
%matplotlib inline

from PIL import Image
pic = Image.open('DATA/00-puppy.jpg')
```

Đường dẫn phụ thuộc vị trí thư mục `data` so với notebook. Nếu Tab không tự động hoàn thành đường dẫn thì nhiều khả năng đang trỏ sai thư mục. Chạy `pic` trong cell, Jupyter sẽ hiển thị luôn ảnh chú cún. `type(pic)` vẫn là file JPEG (`PIL.JpegImagePlugin.JpegImageFile`), chưa phải array, nên ta chuyển tiếp:

```python
arr = np.asarray(pic)
type(arr)      # numpy.ndarray
arr.shape      # (1300, 1950, 3)
```

`type` xác nhận đã là `numpy.ndarray`; `shape` cho thấy 1300 × 1950 pixel với ba kênh màu.

---

### 🔵 Tách kênh xanh dương bằng slicing

Trước hết xem ảnh đầy đủ:

```python
plt.imshow(arr)
```

Rồi tạo bản copy để chỉnh mà không ảnh hưởng array gốc:

```python
my_copy = arr.copy()
```

Thứ tự kênh là **red (0) → green (1) → blue (2)**. Đề bài yêu cầu zero out kênh đỏ và xanh lá. Làm lần lượt:

```python
my_copy[:, :, 0] = 0
plt.imshow(my_copy)
```

Sau khi tắt kênh đỏ, ảnh chỉ còn xanh lá và xanh dương nên trông ngả **xanh ngọc (aqua)**. Tiếp tục tắt kênh xanh lá:

```python
my_copy[:, :, 1] = 0
plt.imshow(my_copy)
```

Giờ chỉ còn kênh xanh dương. Ảnh sẽ khá tối, đặc biệt vùng tai chú cún — vì tai cún vốn đỏ nhiều, gần như không có xanh dương.

---

### ✅ Những điều cần nhớ

* Tạo array một giá trị: `np.ones` / `np.zeros` rồi nhân hoặc dùng trực tiếp.
* **Random array** hầu như không dùng lại trong phần còn lại của khóa — điều quan trọng là tạo được `np.ones` và đặc biệt `np.zeros` với mọi shape.
* Không cần quá bận tâm chuyện mở ảnh bằng **PIL**; khi sang **OpenCV**, ta sẽ dùng một hàm riêng của OpenCV thay cho hai dòng này. Việc dùng PIL ở đây chỉ để thấy cách đi thẳng từ file JPEG sang NumPy array.
* Ảnh màu có **ba kênh R, G, B**; zero out một kênh là loại bỏ hoàn toàn màu đó.

Section này khép lại phần nền tảng. Bài tiếp theo mở ra chương mới: thư viện **OpenCV** (Open Computer Vision).
