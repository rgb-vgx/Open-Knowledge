---
title: 'Gamma correction, filter2D và các kiểu blur trong OpenCV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 27
status: edited
source: '027 - Blurring and Smoothing - Part Two.md'
categories:
- AI
tags: []
---

# 🛠️ Gamma correction và các kỹ thuật blur

> Nguồn: `027 - Blurring and Smoothing - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12315302)

Phần hai đi vào code: gamma correction bằng NumPy, tự tạo kernel và áp bằng `cv2.filter2D`, rồi các hàm có sẵn là `cv2.blur`, `GaussianBlur`, `medianBlur` và `bilateralFilter`. Ảnh dùng trong bài là tường gạch xanh, vì các đường viên gạch rất rõ nên dễ thấy tác dụng của blur.

### 🧰 Hai hàm tiện ích

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

def load_img():
    img = cv2.imread('DATA/bricks.jpg')
    return img

def display_img(img):
    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111)
    ax.imshow(img)
```

`load_img` đọc lại ảnh gạch mỗi lần gọi, vì blur xảy ra **tại chỗ** (in place) và làm thay đổi ảnh gốc. Tùy vị trí thư mục data, có thể phải sửa đường dẫn trong hàm. `display_img` chỉ phóng to ảnh cho dễ nhìn — ta đã gặp hàm này ở các bài trước.

Vì blur thay đổi ảnh gốc, sau mỗi phép blur phải load lại ảnh nếu muốn so sánh công bằng.

### ☀️ Gamma correction bằng np.power

```python
i = load_img()
gamma = 1/4
result = np.power(i, gamma)
display_img(result)
```

`np.power` lấy từng pixel trong mảng, nâng lên lũy thừa `gamma`. Với `gamma < 1`, ảnh sáng hơn; càng nhỏ càng tiến tới trắng hoàn toàn. Với `gamma > 1`, ảnh tối hơn; `gamma = 2` đã thấy rõ, `gamma = 8` gần như đen.

Có thể gặp cảnh báo về giá trị vượt ngoài khoảng 0–255. Không cần lo: NumPy đang cắt (clip) các giá trị vượt biên.

### ✍️ Viết chữ lên ảnh gạch

Để thấy khác biệt giữa các kiểu blur, viết chữ lên ảnh:

```python
img = cv2.imread('DATA/bricks.jpg')

font = cv2.FONT_HERSHEY_COMPLEX
cv2.putText(img, text='bricks', org=(10, 600),
            fontFace=font, fontScale=10,
            color=(255, 0, 0), thickness=4)
display_img(img)
```

Chữ này có những khe hở nhỏ giữa các nét. Khi blur, các khe sẽ bị lấp ở mức độ khác nhau — đó là cách so sánh trực quan.

### 🔲 Lowpass filter tự tạo với filter2D

```python
kernel = np.ones((5, 5), np.float32) / 25
dst = cv2.filter2D(img, -1, kernel)
display_img(dst)
```

Kernel `5 × 5` toàn số 1, chia cho 25 để tổng bằng 1 — mỗi phần tử thành `0.04`. Đây là kernel trung bình đơn giản.

`cv2.filter2D` nhận:

* ảnh nguồn,
* `ddepth`: độ sâu mong muốn của đầu ra; `-1` nghĩa là giữ nguyên độ sâu đầu vào,
* kernel.

Kết quả là ảnh mờ đi, các khe trong chữ bị lấp và xuất hiện tông hồng ở một số chỗ. Tăng kích thước kernel sẽ làm blur mạnh hơn.

### 🌫️ Blur có sẵn: cv2.blur

```python
blurred = cv2.blur(img, (5, 5))
display_img(blurred)
```

`cv2.blur` dùng kernel trung bình mặc định, chỉ cần truyền kích thước kernel. Về bản chất giống ví dụ `filter2D` phía trên, nhưng OpenCV đã chọn sẵn giá trị. Kernel `(10, 10)` cho blur rõ hơn nhiều.

### 🌫️ GaussianBlur

```python
blurred_img = cv2.GaussianBlur(img, (5, 5), 10)
display_img(blurred_img)
```

Tham số: ảnh nguồn, kích thước kernel, và **sigma**. Sigma là độ lệch chuẩn; thường chỉ đặt `sigmaX`, còn `sigmaY` tự động lấy bằng `sigmaX`. Trong bài chọn sigma = 10.

Không có kernel size hay sigma "đúng" tuyệt đối — phần lớn là thử và kiểm tra theo pipeline cụ thể. Nếu mục tiêu là edge detection, hãy thử nhiều kiểu blur rồi xem cách nào cho kết quả edge tốt nhất.

### 🌫️ medianBlur và khử noise

```python
median_result = cv2.medianBlur(img, 5)
display_img(median_result)
```

`cv2.medianBlur` chỉ nhận một tham số kích thước vì kernel phải là **hình vuông**; `5` tương đương `5 × 5`. Cách này lấy trung vị của vùng lân cận thay vì trung bình.

Điểm hay: median blur giữ chi tiết chữ tốt hơn, trong khi vẫn làm mờ nền. Đây là kỹ thuật rất tốt để **khử noise** mà vẫn giữ cạnh. Nhiều filter "remove noise" trong Photoshop thực chất là median blur.

Ví dụ thực tế hơn với ảnh chó Sammy bị thêm noise:

```python
noise_img = cv2.imread('DATA/sammy_noise.jpg')

median = cv2.medianBlur(noise_img, 5)
display_img(median)
```

Noise giảm rõ rệt. Cái giá là mất một ít chi tiết nhỏ, ví dụ từng sợi cỏ hay tán cây phía sau. Nhưng với mắt người, ảnh trông dễ chịu hơn nhiều so với ảnh đầy pixel nhiễu. `5` là giá trị khởi đầu phổ biến; cần mờ hơn thì tăng lên.

### 🎯 bilateralFilter

```python
blur = cv2.bilateralFilter(img, 9, 75, 75)
display_img(blur)
```

`cv2.bilateralFilter` nhận ảnh nguồn, `d`, `sigmaColor`, `sigmaSpace`. Nó cố gắng giảm noise mà vẫn giữ cạnh khá sắc, nhưng thường **chậm hơn** các filter khác. Trên ảnh gạch, các đường giữa chữ được giữ tốt hơn, tương tự median blur.

### ✅ Tóm tắt

* Cùng kích thước và sigma, các kiểu blur cho cảm giác khác nhau; cứ thử và so sánh.
* Muốn tự kiểm soát: tạo kernel rồi dùng `filter2D`.
* Muốn nhanh: `cv2.blur`, `GaussianBlur`, `medianBlur`.
* Khử noise mà giữ cạnh: `medianBlur` hoặc `bilateralFilter`.

Blur không chỉ để ảnh đẹp — nó còn giảm chi tiết thừa trước khi chạy edge detection hoặc các bước xử lý nặng hơn.
