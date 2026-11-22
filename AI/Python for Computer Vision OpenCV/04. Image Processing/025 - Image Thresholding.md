---
title: 'Image thresholding: binary, trunc, tozero và adaptive'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 25
status: edited
source: '025 - Image Thresholding.md'
categories:
- AI
tags: []
---

# 🔲 Image thresholding — từ ảnh xám sang đen trắng

> Nguồn: `025 - Image Thresholding.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257656)

Nhiều ứng dụng computer vision chỉ cần **hình dạng và cạnh**, không cần màu — ví dụ để lấy viền một chiếc áo thì không cần biết áo màu gì. Thresholding biến ảnh thành hai giá trị đen/trắng, hoặc giữ lại một số mức xám tùy kiểu. Bài này đi qua các kiểu threshold cơ bản và adaptive threshold.

### 🔲 Threshold là gì

Thresholding là cách đơn giản để **phân đoạn** ảnh. Với ảnh màu, trước hết chuyển sang grayscale, sau đó áp ngưỡng để mỗi pixel thành đen hoặc trắng. Lợi ích: chỉ cần một kênh thay vì ba, dữ liệu giảm mạnh mà vẫn giữ được hình dạng tổng thể.

---

### ⚙️ cv2.threshold cơ bản

```python
import cv2
import matplotlib.pyplot as plt
%matplotlib inline

image = cv2.imread('DATA/rainbow.jpg')
image_gray = cv2.imread('DATA/rainbow.jpg', 0)
plt.imshow(image_gray, cmap='gray')
```

Truyền `0` làm tham số thứ hai tương đương đọc thẳng ở chế độ grayscale.

```python
ret, thresh1 = cv2.threshold(
    image_gray, 127, 255, cv2.THRESH_BINARY
)
plt.imshow(thresh1, cmap='gray')
```

Hai giá trị trả về:

* `ret`: ngưỡng thực tế đã dùng.
* `thresh1`: ảnh kết quả.

Tham số:

* `127` là ngưỡng, chọn điểm giữa của thang 0–255 (`255 / 2 = 127.5`, làm tròn thành 127).
* `255` là giá trị lớn nhất.
* `cv2.THRESH_BINARY`: dưới ngưỡng thành 0, trên ngưỡng thành max.

Có thể kiểm tra `image_gray.max()`; ảnh rainbow có max là `214`, nhưng giá trị tối đa có thể vẫn là 255. Việc kiểm tra max hữu ích nếu ảnh được normalize về 0–1, còn ảnh đọc bằng `cv2.imread` mặc định nằm trong 0–255.

---

### 🔄 Các kiểu threshold

```python
ret, thresh_bin_inv = cv2.threshold(image_gray, 127, 255, cv2.THRESH_BINARY_INV)
ret, thresh_trunc = cv2.threshold(image_gray, 127, 255, cv2.THRESH_TRUNC)
ret, thresh_tozero = cv2.threshold(image_gray, 127, 255, cv2.THRESH_TOZERO)
```

* **THRESH_BINARY**: trên ngưỡng → max, dưới ngưỡng → 0.
* **THRESH_BINARY_INV**: ngược lại.
* **THRESH_TRUNC**: trên ngưỡng → kéo về đúng mức ngưỡng, dưới ngưỡng giữ nguyên giá trị gốc.
* **THRESH_TOZERO**: trên ngưỡng giữ nguyên, dưới ngưỡng → 0.
* **THRESH_TOZERO_INV**: ngược của TOZERO.

Hai kiểu dùng nhiều nhất là `THRESH_BINARY` và `THRESH_BINARY_INV`. Tài liệu OpenCV có bảng công thức cho từng kiểu; cách đọc là: bên trái là kết quả, bên phải là điều kiện quyết định kết quả đó.

---

### 📰 Ví dụ thực tế: ảnh crossword

```python
image = cv2.imread('DATA/crossword.jpg', 0)

def show_pic(img):
    fig = plt.figure(figsize=(15, 15))
    ax = fig.add_subplot(111)
    ax.imshow(img, cmap='gray')

show_pic(image)
```

Ảnh crossword có nhiều mảng xám không cần thiết — ví dụ phần giấy báo quanh ô trắng. Ta muốn chỗ có mực thành đen, chỗ không mực thành trắng.

Áp binary threshold:

```python
ret, th1 = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
show_pic(th1)
```

Kết quả chưa tốt: một số vùng xám bị đẩy thành trắng trong khi đáng lẽ phải là đen. Hai hướng xử lý:

1. Thử kiểu threshold khác.
2. Thử mức ngưỡng khác — tăng ngưỡng sẽ "bắt" được nhiều vùng xám đậm hơn thành mực, nhưng có thể ăn cả vùng giấy tối màu.

---

### 🧠 Adaptive threshold

```python
th2 = cv2.adaptiveThreshold(
    image,
    255,
    cv2.ADAPTIVE_THRESH_MEAN_C,
    cv2.THRESH_BINARY,
    11,    # blockSize: phải là số lẻ, thử 3, 5, 7, 11...
    3,     # C: hằng số trừ đi, giá trị minh họa — cần thử để chọn
)
show_pic(th2)
```

Adaptive threshold tự điều chỉnh ngưỡng theo **vùng lân cận** của từng pixel. Các tham số:

* `maxValue`: giá trị lớn nhất, thường 255.
* `adaptiveMethod`: `ADAPTIVE_THRESH_MEAN_C` hoặc `ADAPTIVE_THRESH_GAUSSIAN_C`.
* `thresholdType`: kiểu kết quả sau khi đã adaptive, ví dụ `THRESH_BINARY`.
* `blockSize`: kích thước vùng lân cận dùng để tính ngưỡng; phải là **số lẻ**, thường bắt đầu với 3, 5, 7, 11...
* `C`: hằng số bị trừ khỏi mean/weighted mean; thường dương, có thể bằng 0 hoặc âm.

Kết quả: các ô đen trong crossword vẫn được nhận ra, nhưng do nhìn theo vùng lân cận, một số ô không được tô kín như khi dùng binary threshold. Đổi lại, phần chữ có vẻ rõ hơn.

---

### 🎛️ Blend hai kết quả threshold

Có thể kết hợp ưu điểm của hai cách bằng `addWeighted`:

```python
blended = cv2.addWeighted(src1=th1, alpha=0.6,
                          src2=th2, beta=0.4, gamma=0)
show_pic(blended)
```

Kết quả thường dễ nhìn hơn từng ảnh riêng lẻ. Trong ứng dụng thực tế, người ta hay dùng adaptive threshold rồi chỉnh `blockSize` và `C` cho tới khi hài lòng, hoặc blend nhiều kết quả lại.

---

### 💡 Tóm tắt

Thresholding đưa ảnh xám về ảnh nhị phân hoặc chỉnh giá trị theo ngưỡng. Có nhiều kiểu threshold; hai kiểu phổ biến nhất là `BINARY` và `BINARY_INV`. Khi ngưỡng cố định không đủ tốt, adaptive threshold với `blockSize` lẻ và hằng số `C` là lựa chọn tiếp theo. Bài sau chuyển sang làm mờ và làm trơn ảnh.
