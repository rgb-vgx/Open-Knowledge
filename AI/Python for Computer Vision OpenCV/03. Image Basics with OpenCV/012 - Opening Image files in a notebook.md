---
title: 'Mở ảnh trong notebook bằng OpenCV và Matplotlib'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 12
status: edited
source: '012 - Opening Image files in a notebook.md'
categories:
- AI
tags: []
---

# 🖼️ Mở ảnh trong notebook — ít bước hơn với OpenCV

> Nguồn: `012 - Opening Image files in a notebook.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257620)

Bài trước ta mở ảnh bằng Python Imaging Library, chuyển sang NumPy array rồi mới hiển thị bằng Matplotlib — khá nhiều bước. Lần này mình dùng **OpenCV** để đọc thẳng file ảnh thành array, kết hợp Matplotlib để hiển thị trong notebook.

### 🐍 Import và đọc ảnh bằng cv2.imread

```python
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

import cv2
```

Lưu ý `%matplotlib inline` chỉ dành cho Jupyter Notebook, không dùng trong file `.py`.

```python
img = cv2.imread('DATA/puppy.jpg')
type(img)   # numpy.ndarray
```

`cv2.imread` nhận trực tiếp đường dẫn tới file JPEG hoặc PNG và trả về luôn một **NumPy array**, nên không cần bước trung gian chuyển đổi như trước. Ảnh puppy trong bài có shape `(1300, 1950, 3)`.

---

### ⚠️ Cái bẫy NoneType khi sai đường dẫn

Nếu truyền sai đường dẫn, OpenCV **không báo lỗi**:

```python
img = cv2.imread('wrong/path/doesnotexist.jpg')
type(img)   # NoneType
```

Rất nhiều bạn mới bị kẹt ở đây vì thấy lệnh chạy không lỗi nên tưởng đường dẫn đúng. Nếu nghi ngờ, hãy kiểm tra `type()` của biến; trả về `NoneType` nghĩa là đường dẫn chưa đúng.

---

### 🎨 BGR và RGB — vì sao ảnh bị ám xanh

Hiển thị thẳng `plt.imshow(img)` sẽ thấy ảnh ám một màu xanh lạ. Nguyên nhân: **Matplotlib** mong thứ tự kênh **RGB**, còn **OpenCV** đọc theo thứ tự **BGR**. Hai kênh đỏ và xanh bị hoán đổi cho nhau.

```python
fix_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(fix_img)
```

`cv2.cvtColor` nhận ảnh nguồn và mã chuyển đổi. OpenCV chuyển được từ bất kỳ color space nào sang bất kỳ color space nào; trong bài chỉ cần `COLOR_BGR2RGB`.

---

### 🖤 Đọc thẳng ảnh grayscale

```python
img_gray = cv2.imread('DATA/puppy.jpg', cv2.IMREAD_GRAYSCALE)
img_gray.shape   # (1300, 1950)
```

Khi đọc ở chế độ grayscale, array mất chiều thứ ba vì không còn ba kênh màu; mỗi pixel chỉ là giá trị từ 0 đến 255. Trong ảnh này min là `1`, max là `209` — không có đen tuyệt đối lẫn trắng tuyệt đối.

`plt.imshow(img_gray)` mặc định dùng colormap **viridis** nên trông không phải đen trắng. Thêm `cmap='gray'` để hiển thị đúng:

```python
plt.imshow(img_gray, cmap='gray')
```

Matplotlib còn nhiều colormap khác, ví dụ `magma` cho tông tím đen sang cam, nhưng với bài này `gray` là đủ.

---

### 📐 Resize ảnh

```python
new_img = cv2.resize(fix_img, (1000, 400))
```

`cv2.resize` nhận ảnh nguồn và **dsize** — cặp (width, height). Chú ý thứ tự này ngược với cách NumPy nghĩ về shape: `1000` ứng với số cột (chiều rộng, gốc 1950), `400` ứng với số hàng (chiều cao, gốc 1300).

Resize theo tỉ lệ:

```python
new_img = cv2.resize(fix_img, (0, 0), fx=0.5, fy=0.5)
new_img.shape   # (650, 975)
```

Với cách này truyền `(0, 0)` cho dsize rồi cho **fx**, **fy** là tỉ lệ theo chiều rộng và chiều cao. Tỉ lệ là "bao nhiêu phần của kích thước gốc", không phải "giảm bao nhiêu phần trăm": `fy=0.2` nghĩa là cao bằng 20% ban đầu. Ví dụ `fx=0.8, fy=0.2` cho shape `(260, 1560)`.

---

### 🔁 Flip và lưu ảnh

```python
new_img = cv2.flip(fix_img, 0)   # lật quanh trục ngang -> ảnh lộn ngược
new_img = cv2.flip(fix_img, 1)   # lật quanh trục dọc giữa ảnh
new_img = cv2.flip(fix_img, -1)  # lật cả hai
```

Lệnh `flip` này về sau còn được dùng để tạo thêm ảnh cho deep learning.

Lưu ảnh là thao tác ngược của `imread`:

```python
cv2.imwrite('totally_new.jpg', fix_img)
```

`cv2.imwrite` ghi NumPy array ra file với đường dẫn tùy chọn, hỗ trợ khá nhiều định dạng file.

---

### 🖼️ Hiển thị ảnh lớn hơn trong notebook

Notebook tự thu nhỏ ảnh cho vừa khung. Muốn có canvas rộng hơn, dùng ba dòng Matplotlib sau:

```python
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111)
ax.imshow(fix_img)
```

`figsize` tính bằng inch và quyết định khoảng canvas trống. Phần còn lại chỉ là tạo một subplot duy nhất rồi vẽ ảnh lên. Ba dòng này sẽ được đóng gói thành hàm tiện ích ở các bài sau, nên chưa cần hiểu sâu ngay.

Tóm lại, để hiển thị ảnh trong notebook ta chỉ cần **OpenCV + Matplotlib**: `imread` đọc thẳng thành array, `cvtColor` sửa thứ tự kênh, `imshow` hiển thị. Bài tiếp theo sẽ chuyển sang môi trường script với cửa sổ riêng của OpenCV.
