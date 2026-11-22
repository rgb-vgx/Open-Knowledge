---
title: 'Lời giải bài tập Image Processing'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 34
status: edited
source: '034 - Image Processing Assessment Solutions.md'
categories:
- AI
tags: []
---

# ✅ Lời giải Image Processing Assessment

> Nguồn: `034 - Image Processing Assessment Solutions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257674)

Toàn bộ code dưới đây là tổ hợp các lệnh đã xuất hiện trong những bài trước. Nếu chỗ nào chưa rõ, xem lại bài tương ứng.

### 📥 Mở ảnh và sửa màu

```python
img = cv2.imread('DATA/giraffes.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
display_img(img)
```

Kết quả là hai chú hươu cao cổ trên nền savannah.

---

### 🔲 Binary threshold

```python
ret, thresh1 = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
display_img(thresh1)
```

Nếu áp trực tiếp lên ảnh màu, threshold sẽ chạy trên **cả ba kênh** — vẫn là binary threshold nhưng không đúng ý đồ. Muốn đúng kỳ vọng của notebook, đọc lại ảnh ở grayscale:

```python
img_gray = cv2.imread('DATA/giraffes.jpg', 0)
ret, thresh1 = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)
display_img(thresh1)
```

Kết quả chỉ còn đen và trắng.

---

### 🎨 Chuyển sang HSV

```python
img = cv2.imread('DATA/giraffes.jpg')
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
display_img(img_hsv)
```

Ảnh hiển thị trông lạ vì ba kênh giờ là hue, saturation, value chứ không phải RGB.

---

### 🔲 Lowpass filter 4×4

```python
kernel = np.ones(shape=(4, 4), dtype=np.float32) / 10

img = cv2.imread('DATA/giraffes.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

result = cv2.filter2D(img, -1, kernel)
display_img(result)
```

`np.ones` tạo kernel toàn 1, chia 10 để mỗi phần tử thành `0.1`. `ddepth = -1` giữ nguyên độ sâu đầu vào. Ảnh sáng và mờ hơn, phần trời/ mây thành trắng thuần.

---

### 📐 Sobel ngang trên ảnh xám

```python
img_gray = cv2.imread('DATA/giraffes.jpg', 0)

sobelx = cv2.Sobel(img_gray, cv2.CV_64F, 1, 0, ksize=5)
display_img(sobelx)
```

Nhớ đọc ảnh ở grayscale (`0` làm tham số thứ hai). `dx = 1`, `dy = 0`, `ksize = 5`. Nếu quên grayscale, kết quả sẽ khó hiểu vì gradient tính trên cả ba kênh màu. Hiển thị với `cmap='gray'` để thấy rõ.

---

### 📊 Histogram ba kênh

```python
img = cv2.imread('DATA/giraffes.jpg')

colors = ('b', 'g', 'r')

for i, col in enumerate(colors):
    histr = cv2.calcHist([img], [i], None, [256], [0, 256])
    plt.plot(histr, color=col)
    plt.xlim([0, 256])

plt.title('MY HISTO')
```

Thứ tự `('b', 'g', 'r')` khớp với index kênh của OpenCV: `0` blue, `1` green, `2` red. Nhờ vậy đường histogram màu đỏ thực sự là kênh đỏ, không bị hoán đổi. Màu mặc định của Matplotlib có thể khác, nên truyền `color=col` để đường vẽ đúng màu.

Đến đây section Image Processing kết thúc. Các mảnh đã ghép lại: color space, blend, mask, threshold, blur, morphology, gradient và histogram — toàn bộ đều là đầu vào cho những phần nặng hơn như edge detection, contour và object detection ở các section sau.
