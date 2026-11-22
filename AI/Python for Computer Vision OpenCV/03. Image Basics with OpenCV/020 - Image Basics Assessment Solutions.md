---
title: 'Lời giải bài tập Image Basics'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 20
status: edited
source: '020 - Image Basics Assessment Solutions.md'
categories:
- AI
tags: []
---

# ✅ Lời giải Image Basics Assessment

> Nguồn: `020 - Image Basics Assessment Solutions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257640)

Cùng đi qua lời giải của năm task và phần bonus. Tọa độ dưới đây chỉ là ước lượng — kết quả của các bạn có thể lệch một chút mà vẫn đúng.

### 📥 Đọc ảnh và sửa BGR sang RGB

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

img = cv2.imread('DATA/dog_backpack.jpeg')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img_rgb)
```

Tùy vị trí notebook và thư mục data, có thể phải thêm `../` vào đường dẫn. Nếu hiển thị thẳng ảnh đọc từ `cv2.imread` thì kênh xanh và đỏ bị đảo; `cv2.cvtColor` với `COLOR_BGR2RGB` sửa lại đúng.

### 🔁 Lật ngược ảnh

```python
new_img = img_rgb.copy()
new_img = cv2.flip(new_img, 0)
plt.imshow(new_img)
```

Tạo bản copy trước để không làm thay đổi ảnh gốc. `cv2.flip` với tham số `0` lật quanh trục ngang, cho ảnh lộn ngược.

### ▭ Rectangle đỏ quanh mặt chó

```python
pt1 = (200, 380)
pt2 = (600, 700)

cv2.rectangle(img_rgb, pt1=pt1, pt2=pt2, color=(255, 0, 0), thickness=10)
plt.imshow(img_rgb)
```

Cần ước lượng hai góc: trên trái khoảng `(200, 380)`, dưới phải khoảng `(600, 700)`. Vì ảnh đã được chuyển sang RGB nên kênh đỏ đứng đầu, màu đỏ là `(255, 0, 0)`. Nhớ thêm `thickness`, nếu không sẽ không thấy rectangle.

### 🔺 Tam giác xanh bằng polylines

```python
vertices = np.array(
    [[250, 700],
     [600, 700],
     [425, 400]],
    dtype=np.int32,
)

pts = vertices.reshape((-1, 1, 2))
pts.shape   # (3, 1, 2)

cv2.polylines(img_rgb, [pts], isClosed=True, color=(0, 0, 255), thickness=10)
plt.imshow(img_rgb)
```

Tam giác đều nên hai đỉnh đáy cùng Y = `700`; đỉnh trên ở khoảng `(425, 400)`. Phải ép `np.int32` vì có hệ điều hành báo lỗi nếu vertices là float. Shape ban đầu `(3, 2)` không phải định dạng OpenCV muốn, nên reshape về `(-1, 1, 2)`. Sau đó truyền **list** `[pts]` vào `polylines` và bật `isClosed=True`.

Lưu ý: rectangle đỏ của task trước vẫn còn trên ảnh. Muốn xóa thì đọc lại file ảnh và chạy lại bước chuyển màu để reset `img_rgb`.

### 🖌️ Bonus: tô kín tam giác bằng fillPoly

Tra cứu sẽ thấy `cv2.fillPoly` hoạt động gần giống `polylines`, chỉ khác là tô kín hình:

```python
cv2.fillPoly(img_rgb, [pts], color=(0, 0, 255))
plt.imshow(img_rgb)
```

`fillPoly` không có tham số `thickness` và cũng không có `isClosed` — đã tô kín thì mặc định hình phải khép kín.

### 🖱️ Script vẽ circle rỗng bằng chuột phải

```python
import cv2
import numpy as np

def create_circle(event, x, y, flags, param):
    if event == cv2.EVENT_RBUTTONDOWN:
        cv2.circle(img, (x, y), 100, (0, 0, 255), thickness=10)

img = cv2.imread('DATA/dog_backpack.jpeg')

cv2.namedWindow('dog')
cv2.setMouseCallback('dog', create_circle)

while True:
    cv2.imshow('dog', img)
    if cv2.waitKey(20) & 0xFF == 27:
        break

cv2.destroyAllWindows()
```

Khác các bài trước, lần này ảnh được đọc từ file thay vì tạo bằng `np.zeros`. Event cần bắt là `EVENT_RBUTTONDOWN`. Màu đỏ trong OpenCV là `(0, 0, 255)` vì thứ tự kênh là BGR; `thickness=10` cho hình tròn rỗng, còn `-1` sẽ tô đặc.

Một lỗi nhỏ dễ gặp: đặt tên hàm là `create_circle` nhưng lại nối callback với `draw_circle`, dẫn tới "draw_circles is not defined". Chỉ cần dùng đúng tên.

Đến đây section Image Basics kết thúc. Section tiếp theo đi vào **Image Processing**: color space, blending, thresholding, blurring, morphological operators, gradients và histogram.
