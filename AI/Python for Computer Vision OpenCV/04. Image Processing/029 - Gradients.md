---
title: 'Gradients với Sobel và Laplacian'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 29
status: edited
source: '029 - Gradients.md'
categories:
- AI
tags: []
---

# 📈 Gradients — bước đệm tới edge detection

> Nguồn: `029 - Gradients.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257666)

Gradient là phần mở rộng của morphological operators và là nền tảng để hiểu **edge detection**, từ đó đi tới object detection, object tracking và image classification. Bài này dùng **Sobel** và **Laplacian** trên ảnh Sudoku, rồi kết hợp gradient với các kỹ thuật đã học.

### 📈 Gradient là gì

Gradient là **sự thay đổi có hướng** về cường độ hoặc màu của ảnh. Ở vùng chuyển từ trắng sang đen, gradient lớn; ở vùng đồng màu, gradient gần như bằng 0. Vì vậy gradient thường xuất hiện đúng tại biên.

Gradient có thể tính theo một hướng cụ thể — x hoặc y. Bài dùng **Sobel-Feldman operator** (gọi tắt Sobel), gồm hai kernel 3 × 3: một cho thay đổi ngang, một cho thay đổi dọc. Hai kernel này xấp xỉ đạo hàm của ảnh.

### ↔️ Sobel x-gradient — thấy cạnh dọc

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

image = cv2.imread('DATA/sudoku.jpg', 0)

sobelx = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=5)
```

Tham số của `cv2.Sobel`:

* ảnh nguồn,
* `ddepth`: độ chính xác của pixel. Ở đây chọn `cv2.CV_64F` (64-bit float) để giữ đầy đủ chi tiết; bài trước ta hay truyền `-1` để giữ nguyên độ sâu đầu vào.
* `dx = 1`, `dy = 0`: đạo hàm theo x.
* `ksize = 5`: kích thước kernel, phải là số lẻ; có thể thử các giá trị khác.

Ảnh Sudoku có cả đường kẻ dọc và ngang. Với x-gradient, các **đường dọc** hiện rất rõ, còn đường ngang gần như biến mất.

### ↕️ Sobel y-gradient — thấy cạnh ngang

```python
sobely = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=5)
```

Chỉ đổi `dx, dy` thành `0, 1`. Lần này các đường ngang của bảng Sudoku hiện rõ. Không phải đường dọc biến mất hoàn toàn — các đường kẻ dày vẫn còn dấu vết — nhưng ưu thế của hướng ngang là rõ rệt.

### 🌀 Laplacian

```python
laplacian = cv2.Laplacian(image, cv2.CV_64F)
```

Toán tử Laplace là đạo hàm bậc hai theo x cộng đạo hàm bậc hai theo y. Với ảnh xám hai chiều, `cv2.Laplacian` tính cả hai hướng cùng lúc nên không cần truyền `dx`, `dy`. Kết quả gần như edge detection: biên trắng–đen–trắng hiện rõ, số trong ô Sudoku cũng rõ.

Nếu muốn hiểu sâu phần toán, có thể tra Wikipedia về Sobel operator và Laplace operator; tài liệu OpenCV cũng mô tả kỹ. Trong khóa, ta chỉ cần nắm cách dùng.

### 🧪 Kết hợp gradient với các kỹ thuật khác

Blend hai hướng gradient:

```python
blended = cv2.addWeighted(src1=sobelx, alpha=0.5,
                          src2=sobely, beta=0.5, gamma=0)
```

Cách này cho phép chọn hướng nào quan trọng hơn bằng `alpha` và `beta`. Ví dụ cần nhấn đường dọc thì tăng `alpha`.

Threshold trên ảnh gốc:

```python
ret, th1 = cv2.threshold(image, 100, 255, cv2.THRESH_BINARY)
```

Threshold cũng làm nổi biên, nhưng không thấy được các đường kẻ bên trong bảng.

Morphological gradient trên ảnh đã blend:

```python
kernel = np.ones((4, 4), np.uint8)
gradient = cv2.morphologyEx(blended, cv2.MORPH_GRADIENT, kernel)
```

Kết quả là ảnh đen trắng khá rõ, số bị mờ nhưng biên nổi bật. Từ đây có thể tiếp tục threshold hoặc khử noise.

### 💡 Ý nghĩa

Gradient là viên gạch nền: các hàm edge detection tổng quát về sau thực chất là tổ hợp của những phép như Sobel, Laplacian, threshold và morphology. Nắm được các mảnh này thì khi gọi một hàm edge detection "có sẵn", ta hiểu bên trong nó đang làm gì.

Bài tiếp theo chuyển sang **histogram** — cách đọc phân bố màu của ảnh.
