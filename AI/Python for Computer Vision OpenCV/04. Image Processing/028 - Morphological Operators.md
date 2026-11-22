---
title: 'Morphological operators: erosion, opening, closing, gradient'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 28
status: edited
source: '028 - Morphological Operators.md'
categories:
- AI
tags: []
---

# 🧱 Morphological operators trên ảnh nhị phân

> Nguồn: `028 - Morphological Operators.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257664)

Morphological operators là các kernel chuyên dụng tạo hiệu ứng như khử noise, ăn mòn hoặc mở rộng vùng foreground. Bài này thực hành trên chữ trắng nền đen để thấy rõ từng phép: **erosion**, **opening**, **closing** và **morphological gradient**.

### 🖼️ Ảnh thử: chữ ABCDE

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

def load_img():
    img = np.zeros((600, 600))
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, text='ABCDE', org=(30, 300),
                fontFace=font, fontScale=10,
                color=(255, 255, 255), thickness=20)
    return img
```

Notebook của bài có sẵn hàm load và hàm display. Ảnh là nền đen 600 × 600 có chữ trắng cỡ lớn — đúng tinh thần "white text on a black background" của bài giảng. Điểm quan trọng là **foreground** (chữ, sáng) tách khỏi background (nền, tối).

Kernel dùng chung:

```python
kernel = np.ones((5, 5), np.uint8)
```

---

### 📉 Erosion — ăn mòn biên

```python
result = cv2.erode(img, kernel, iterations=1)
```

Erosion ăn mòn **biên của foreground**. Với một lần lặp, chỗ nối giữa các chữ yếu đi. Tăng `iterations` sẽ ăn mòn mạnh hơn:

```python
result = cv2.erode(img, kernel, iterations=4)
```

Bốn lần lặp đã lấy đi khá nhiều từ chữ; năm lần có thể làm mất hẳn chữ. Có thể đổi kernel sang `7 × 7` hoặc `9 × 9`, nhưng tham số thường được chỉnh nhất là `iterations`.

---

### 🧹 Opening — khử noise nền

Opening = **erosion rồi dilation**. Dilation là ngược của erosion: mở rộng foreground. Ghép hai phép lại, opening rất hiệu quả để xóa noise ở background.

Tạo ảnh nhiễu:

```python
img = load_img()

white_noise = np.random.randint(low=0, high=2, size=(600, 600))
white_noise = white_noise * 255
noise_img = white_noise + img
```

`np.random.randint(0, 2, ...)` sinh toàn 0 và 1; nhân 255 để cùng thang với ảnh gốc. Cộng vào ảnh tạo các đốm trắng ngẫu nhiên.

```python
opening = cv2.morphologyEx(noise_img, cv2.MORPH_OPEN, kernel)
```

Kết quả xóa phần lớn noise mà không làm méo chữ quá nhiều. Không hoàn hảo — vẫn còn chút noise quanh các lỗ của chữ B, còn chữ E vẫn bị kéo dài so với bản gốc — nhưng với mức noise lớn như vậy thì đây là kết quả tốt.

---

### 🧹 Closing — khử noise foreground

Khi noise nằm trong **foreground**, ta cần phép ngược lại. Tạo noise đen:

```python
img = load_img()

black_noise = np.random.randint(0, 2, size=(600, 600))
black_noise = black_noise * -255
black_noise_img = img + black_noise

black_noise_img[black_noise_img == -255] = 0
```

`np.random.randint` có `high` **không bao gồm** giá trị biên (khác với `low`). Nhân `-255` rồi cộng vào ảnh sẽ trừ 255 khỏi một số pixel; pixel nào thành `-255` được đưa về 0 bằng indexing, để ảnh chỉ còn 0 và 255.

```python
closing = cv2.morphologyEx(black_noise_img, cv2.MORPH_CLOSE, kernel)
```

Closing = **dilation rồi erosion**, giúp lấp các đốm đen trong foreground. Kết quả cũng không hoàn hảo: nét nối A–B dày lên, có thể xuất hiện đường trắng mảnh giữa B và C. Nhưng nhìn chung noise foreground đã được dọn.

---

### 🎯 Morphological gradient — lấy viền

```python
img = load_img()
gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)
```

Morphological gradient lấy **hiệu giữa dilation và erosion**, tức là chỉ giữ phần biên giữa foreground và background. Với chữ, kết quả là đường viền của các chữ — một dạng edge detection thô.

---

### 💡 Tóm tắt

```python
cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)      # khử noise nền
cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)     # khử noise foreground
cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)  # lấy biên
```

Cấu trúc chung: gọi `morphologyEx`, truyền ảnh, chọn `MORPH_*`, rồi truyền kernel. Việc tự tạo noise chỉ để minh họa; thực tế ta dùng các phép này để dọn ảnh trước khi xử lý tiếp. Bài sau đi sâu vào **gradients** với Sobel và Laplacian.
