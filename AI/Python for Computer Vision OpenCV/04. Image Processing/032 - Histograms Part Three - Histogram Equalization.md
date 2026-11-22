---
title: 'Histogram equalization với ảnh xám và ảnh màu HSV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 32
status: edited
source: '032 - Histograms Part Three - Histogram Equalization.md'
categories:
- AI
tags: []
---

# ✨ Equalize histogram bằng OpenCV

> Nguồn: `032 - Histograms Part Three - Histogram Equalization.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12322910)

Phần này đi vào code: dùng `cv2.equalizeHist` trên ảnh xám, xem histogram thay đổi ra sao, rồi áp lên ảnh màu bằng cách tách kênh **V** trong HSV.

### 🦍 Ảnh gorilla xám

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

gorilla = cv2.imread('DATA/gorilla.jpg', 0)
```

Ảnh khoảng `1300 × 2000`, chuyển sang grayscale. Histogram cho thấy phần lớn pixel là tông sáng — chủ yếu từ tảng đá phía sau; con gorilla cũng khá sáng, chỉ có một ít tông tối ở lông và mép ảnh.

```python
hist_values = cv2.calcHist([gorilla], [0], None, [256], [0, 256])
plt.plot(hist_values)
```

Vì ảnh xám chỉ có một kênh nên `channels=[0]`.

### ✨ equalizeHist

```python
eq_gorilla = cv2.equalizeHist(gorilla)
```

Chỉ cần một dòng, không cần tính histogram trước. Kết quả: các mảng sáng trở thành giá trị thấp, vùng lông và mép tối thành giá trị cao — tương phản tăng rõ rệt, ảnh có nhiều "độ sâu" xám hơn.

Tính lại histogram của ảnh đã equalize:

```python
hist_values = cv2.calcHist([eq_gorilla], [0], None, [256], [0, 256])
plt.plot(hist_values)
```

Histogram mới có nhiều cột rơi xuống 0 và trải rộng hơn. So với ảnh gốc, mức giảm sau giá trị 50 thoải hơn nhiều — đúng với mục tiêu làm phẳng phân bố.

### 🌈 Equalize ảnh màu qua kênh V

`cv2.equalizeHist` không nhận ảnh ba kênh trực tiếp. Cách OpenCV xử lý ảnh màu là chuyển sang **HSV**, equalize kênh **V** (value), rồi chuyển lại.

```python
color_gorilla = cv2.imread('DATA/gorilla.jpg')

hsv = cv2.cvtColor(color_gorilla, cv2.COLOR_BGR2HSV)
```

Tách kênh value:

```python
hsv[:, :, 2] = cv2.equalizeHist(hsv[:, :, 2])
```

Trong HSV: index `0` là hue, `1` là saturation, `2` là value. Ta chỉ equalize kênh value, giữ nguyên hue và saturation, nên màu sắc không bị lệch.

Chuyển lại RGB để hiển thị:

```python
eq_color_gorilla = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)
plt.imshow(eq_color_gorilla)
```

Kết quả có tương phản cao hơn ảnh gốc: tảng đá phía sau sáng hơn, vùng mép tối hơn. Đây là một trong số ít chỗ khóa học dùng HSV, và cũng là lý do cần biết chuyển đổi color space.

### ✅ Tóm tắt

* `cv2.equalizeHist` tăng tương phản bằng cách làm histogram tích lũy gần tuyến tính hơn.
* Ảnh xám: gọi trực tiếp trên ảnh.
* Ảnh màu: chuyển BGR → HSV, equalize kênh `V`, rồi HSV → RGB để hiển thị.

Như vậy là hết phần histogram. Bài tiếp theo là assessment của section Image Processing.
