---
title: 'Color space: RGB, HSL và HSV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 22
status: edited
source: '022 - Color Mappings.md'
categories:
- AI
tags: []
---

# 🎨 Color space — RGB, HSL và HSV

> Nguồn: `022 - Color Mappings.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257650)

Từ đầu khóa ta chỉ làm việc với **RGB**. Bài này giải thích vì sao còn có **HSL** và **HSV**, chúng khác RGB ở đâu, và cách chuyển ảnh sang các không gian màu đó bằng `cv2.cvtColor`.

### 🎨 RGB — mô hình cũ nhưng quen thuộc

Trong RGB, mỗi màu là tổ hợp của **red, green, blue**. Có thể hình dung đây là một khối lập phương: mỗi trục là một kênh với giá trị từ 0 đến 255.

Ví dụ một màu xanh teal được mô tả bằng vị trí trên từng trục:

* Red = `1/5 × 255`
* Green = `3/5 × 255`
* Blue = `4/5 × 255`

RGB là mô hình rất cũ. Đến thập niên 1970, **HSL** (hue, saturation, lightness) và **HSV** (hue, saturation, value) ra đời như các lựa chọn thay thế, gần với cách con người cảm nhận màu hơn. Trong khóa ta vẫn chủ yếu dùng ảnh RGB (hoặc BGR khi OpenCV đọc vào), và quy tắc vẫn chỉ là tổ hợp của ba kênh.

### 🔵 HSL và HSV — mô hình hình trụ

Có thể hình dung HSL/HSV như một **hình trụ**:

* **Hue**: vòng quanh hình trụ, là màu thực sự — xanh lá, vàng, đỏ...
* **Saturation**: mức độ "đậm" của hue đó.
* **Lightness** (HSL) hoặc **Value** (HSV): độ sáng.

Với HSL, đỉnh hình trụ là **trắng tuyệt đối** (độ sáng tối đa), đáy là **đen tuyệt đối** (không có ánh sáng), bất kể hue hay saturation.

HSV tương tự, chỉ thay lightness bằng value. Điểm khác đáng chú ý: trong HSV, màu trắng nằm ở **tâm** hình trụ — saturation bằng 0 với bất kỳ hue nào sẽ cho màu trắng. Nhiều color picker quen thuộc dùng đúng mô hình này.

### 🔄 Chuyển color space bằng cvtColor

```python
import cv2
import matplotlib.pyplot as plt
%matplotlib inline

img = cv2.imread('DATA/puppy.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img)
```

Bước đầu vẫn là sửa BGR sang RGB để hiển thị đúng. Muốn sang HSV:

```python
img_hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
plt.imshow(img_hsv)
```

Kết quả hiển thị trông rất lạ, vì Matplotlib đang diễn giải ba kênh như thể chúng là RGB, trong khi dữ liệu thực ra là hue, saturation, value. Điều này là bình thường: ảnh đã được chuyển đổi đúng, chỉ là không nên hiển thị trực tiếp mà không có cách đọc phù hợp.

Tương tự có thể đi từ BGR gốc sang HSV, hoặc sang HLS:

```python
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
img_hls = cv2.cvtColor(img, cv2.COLOR_RGB2HLS)
```

OpenCV hỗ trợ rất nhiều cặp chuyển đổi. Gõ `cv2.COLOR_` rồi nhấn Tab để xem toàn bộ; thực tế chỉ cần một vài cặp cho các trường hợp cụ thể.

### 💡 Kết luận

Phần lớn khóa học chỉ dùng chuyển đổi **BGR → RGB**. HSL/HSV sẽ quay lại ở một chỗ: khi equalize histogram trên ảnh màu, ta tách kênh **V** của HSV ra xử lý. Bài sau chuyển sang ghép và blend ảnh.
