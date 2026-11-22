---
title: 'Watershed Algorithm (phần 2): distance transform và marker cho sáu đồng xu'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 51
status: edited
source: '051 - Watershed Algorithm - Part Two.md'
categories:
- AI
tags: []
---

# 🪙 Watershed Algorithm (phần 2): distance transform và marker cho sáu đồng xu

> Nguồn: `051 - Watershed Algorithm - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12333506)

Bài trước ta thất bại với sáu đồng xu dính nhau. Lần này mình chạy đúng thuật toán watershed: dùng **distance transform** để tìm chắc chắn đâu là foreground, tạo **marker** làm seed, rồi để watershed vẽ barrier giữa các đồng xu.

### 🧭 Toàn cảnh các bước

1. Đọc ảnh → blur mạnh → chuyển xám.
2. Threshold bằng **Otsu**.
3. (Tùy chọn) khử nhiễu bằng morphological opening.
4. **Distance transform** → threshold → `sure_fg`.
5. Dilate → `sure_bg`; hiệu hai vùng → `unknown`.
6. `connectedComponents` → marker; `cv2.watershed()`.
7. Tìm contour trên marker đã phân đoạn.

---

### 🌫️ Blur, gray và Otsu threshold

```python
import cv2
import numpy as np

image = cv2.imread('data/pennies.jpg')

image = cv2.medianBlur(image, 35)     # ảnh 4000x3000 nên blur rất mạnh
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
```

Kernel `35` là con số giảng viên thử nghiệm thấy hiệu quả với riêng ảnh này — không phải mặc định nên dùng. Với watershed, ảnh lớn thường phải blur rất mạnh, chỉ cần giữ lại sáu hình tròn.

Threshold nhị phân thường (127) vẫn để lọt nhiễu từ mặt in trên đồng xu, dù ảnh đã mờ. Thay vào đó dùng **Otsu**:

```python
ret, threshold = cv2.threshold(gray, 0, 255,
                               cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
```

Với Otsu, ta truyền giới hạn `0` và `255`; thuật toán tự chọn ngưỡng tối ưu. Kết quả là sáu hình tròn sạch hơn — nhưng vẫn **dính nhau**, đúng vấn đề cốt lõi.

---

### 🧹 Khử nhiễu (tùy chọn)

```python
kernel = np.ones((3, 3), np.uint8)
opening = cv2.morphologyEx(threshold, cv2.MORPH_OPEN, kernel,
                           iterations=2)
```

Với ảnh sáu đồng xu đơn giản này, bước mở (opening) gần như không đổi gì, nhưng đây là bước quen thuộc khi ảnh phức tạp hơn. Lưu ý: ở đây dùng `cv2.morphologyEx`; transcript chỉ nói "morphology" nên tên hàm đầy đủ là `cv2.morphologyEx`.

---

### 📐 Distance transform: tìm chắc chắn foreground

Ý tưởng: trên ảnh nhị phân, pixel càng **xa** điểm 0 (nền) thì giá trị càng **lớn**, tức càng sáng. Tâm mỗi đồng xu sẽ là điểm sáng nhất; càng ra rìa càng tối.

```python
dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)

ret, sure_fg = cv2.threshold(dist_transform,
                             0.7 * dist_transform.max(),
                             255, 0)
```

* `cv2.DIST_L2` và `5` là các giá trị mặc định tốt cho cách tính khoảng cách/mask size.
* Threshold lấy **70% giá trị lớn nhất** của distance transform. Kết quả `sure_fg` là **sáu chấm nhỏ** — những điểm ta chắc chắn 100% thuộc foreground.

---

### 🎯 sure_bg, unknown và marker

Vùng chắc chắn là nền được lấy bằng **dilate** foreground ra tới giới hạn:

```python
sure_bg = cv2.dilate(opening, kernel, iterations=3)

unknown = cv2.subtract(sure_bg, sure_fg)
```

`unknown` là phần **không chắc** — những "vành khuyên" quanh mỗi đồng xu: có thể là nền, có thể là foreground. Đây chính là phần watershed phải quyết định.

Tạo marker từ các điểm chắc chắn:

```python
ret, markers = cv2.connectedComponents(sure_fg)

markers = markers + 1              # để nền chắc chắn là 1, không phải 0
markers[unknown == 255] = 0        # vùng unknown đánh dấu 0
```

Cộng `1` vào toàn bộ marker để vùng nền **không** mang nhãn `0`, dành số `0` cho vùng unknown. Khi đó marker hiển thị: nền chắc chắn một màu xám, unknown màu đen, sáu điểm foreground mỗi điểm một sắc xám riêng.

---

### 🌊 Chạy watershed

```python
markers = cv2.watershed(image, markers)
```

Sau lệnh này, marker chứa **sáu vùng phân biệt** (sáu sắc xám). Tìm contour trên marker như bài Contour Detection:

```python
img, contours, hierarchy = cv2.findContours(markers.copy(),
                                            cv2.RETR_CCOMP,
                                            cv2.CHAIN_APPROX_SIMPLE)

for i in range(len(contours)):
    if hierarchy[0][i][3] == -1:
        cv2.drawContours(image, contours, i, (0, 0, 255), 10)
```

Kết quả: mỗi đồng xu được **khoanh riêng** — đúng điều mà blur + threshold + contour ở bài trước không làm được.

---

### ✅ Tóm lại

Công thức watershed: **distance transform** để có `sure_fg` → dilate để có `sure_bg` → `subtract` để có `unknown` → `connectedComponents` + điều chỉnh nhãn để có marker → `cv2.watershed()`. Phần nặng nhất là dựng marker đúng. Bài sau ta bỏ hẳn phần tự động này và tự click seed bằng chuột.
