---
title: 'Bài 095 — Biến đổi affine và perspective trong OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 95
status: edited
source: '095 - Affine.md'
categories:
- AI
tags: []
---

# 🧭 Biến đổi affine và perspective trong OpenCV

> Nguồn: `095 - Affine.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48422945)

Chào các bạn! Ở các bài trước ta mới xoay, lật ảnh ở mức cơ bản. Bài này mình đi vào **affine** và **perspective transformation** — hai phép biến đổi nền tảng để **scale**, **xoay**, **shearing**, **dịch chuyển** và thay đổi **góc nhìn** của ảnh. Chúng được dùng nhiều khi nắn méo, căn chỉnh ảnh hoặc chuẩn bị dữ liệu cho bước sau.

### 🧭 Vì sao cần affine và perspective?

Khi xoay ảnh portrait sang landscape đơn thuần, một điểm ở góc có thể bị đẩy ra ngoài khung và biến mất; phần bị xoay ra ngoài cũng để lại vùng trống. Ta không kiểm soát được điểm nào đi đâu, mất bao nhiêu thông tin. Affine và perspective giải quyết đúng chỗ đó: chúng **ánh xạ từng điểm** từ ảnh gốc sang vị trí mới dựa trên một **ma trận biến đổi**.

---

### 🧮 Ma trận biến đổi

Cả hai đều dựa trên ma trận **M**. Với điểm gốc `(x, y)`, nhân với M cho ra điểm mới `(x', y')`.

Với **affine**, M là ma trận **2 x 3** gồm sáu giá trị:

```text
[ a  b  tx ]
[ c  d  ty ]
```

* `a`, `b` điều khiển **scaling** và **shearing** theo trục **x**.
* `c`, `d` điều khiển **scaling** và **shearing** theo trục **y**.
* `tx`, `ty` là **translation** — dịch ảnh theo x, y mà không đổi hình dạng.

Shearing giống như nắm hai mép miếng vải và kéo lệch: hình bị nghiêng/stretch nhưng đường thẳng vẫn thẳng. Các trường hợp riêng: **scale** dùng `a`, `d`; **rotation** đặt `a = cosθ`, `b = -sinθ`, `c = sinθ`, `d = cosθ`; **shear trục x** cho `b ≠ 0`; **shear trục y** cho `c ≠ 0`; **translation** chỉ dùng `tx`, `ty` với `a = d = 1`, `b = c = 0`.

Với **perspective**, M là ma trận **3 x 3**:

```text
[ a  b  c ]
[ d  e  f ]
[ g  h  1 ]
```

`a, b, c` lo phần **horizontal**; `d, e, f` lo phần **vertical**; còn `g, h` là **perspective component** — xử lý **độ sâu (depth)** và **độ nghiêng (skewness)**, thứ mà ma trận 2 x 3 không làm được.

---

### 🔲 Affine khác perspective ở đâu?

**Affine** là ánh xạ tuyến tính, giữ nguyên đường thẳng, giữ nguyên tính **song song** (dù có thể không còn song song với trục tọa độ), và áp dụng được **rotation, scaling, translation, shearing**. Nó cần **3 cặp điểm** gốc → đích.

**Perspective** ánh xạ một **tứ giác** sang một **tứ giác** khác: đường thẳng vẫn thẳng nhưng **song song không được bảo toàn** — hai đường song song có thể hội tụ và ngược lại. Nó dùng để **đổi góc nhìn** hoặc **mô phỏng độ sâu**, và cần **4 cặp điểm**.

Ví dụ: vạch kẻ bãi đỗ xe nhìn từ camera CCTV trông như hình thang; nhìn từ trên cao (drone) lại thành hình vuông. Perspective transformation giúp "nhìn lại" ảnh theo góc khác mà không cần đổi camera.

---

### 💻 Thực hành perspective transformation

Mình dùng một ảnh hươu cao cổ, đọc và đổi sang RGB để hiển thị:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread("giraffe.jpg")
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
rows, cols, channels = image_rgb.shape
```

Định nghĩa **4 điểm gốc** và **4 điểm đích**, ép kiểu `float32` vì OpenCV yêu cầu:

```python
input_points = np.float32([[50, 50], [cols - 50, 50],
                           [50, rows - 50], [cols - 50, rows - 50]])
output_points = np.float32([[10, 100], [cols - 100, 50],
                            [100, rows - 10], [cols - 50, rows - 50]])

M = cv2.getPerspectiveTransform(input_points, output_points)
perspective_image = cv2.warpPerspective(image_rgb, M, (cols, rows))
```

Lỗi rất dễ gặp: `cv2.warpPerspective` nhận kích thước đầu ra theo thứ tự **`(width, height)`**, tức `(cols, rows)`. Truyền nhầm `(rows, cols)` sẽ làm ảnh méo; đổi đúng thứ tự là ổn.

---

### 🔄 Affine, xoay, shearing và translation

**Affine** chỉ cần 3 điểm, dùng `cv2.getAffineTransform` và `cv2.warpAffine`:

```python
input_points = np.float32([[50, 50], [200, 50], [50, 200]])
output_points = np.float32([[10, 100], [200, 50], [100, 250]])

M = cv2.getAffineTransform(input_points, output_points)
affine_image = cv2.warpAffine(image_rgb, M, (cols, rows))
```

Kết quả vừa xoay vừa **shear** nhẹ — đúng như các cặp điểm chỉ định.

**Xoay ảnh bằng affine** gọn hơn nhờ `cv2.getRotationMatrix2D(center, angle, scale)`:

```python
center = (cols / 2, rows / 2)
M = cv2.getRotationMatrix2D(center, 45, 1)
rotated = cv2.warpAffine(image_rgb, M, (cols, rows))
```

**Shearing** không có hàm dựng sẵn, ta tự tạo ma trận và nhớ tăng kích thước đầu ra:

```python
shear_x, shear_y = 0.5, 0
M = np.float32([[1, shear_x, 0], [shear_y, 1, 0]])
new_cols = cols + int(shear_x * rows)
sheared = cv2.warpAffine(image_rgb, M, (new_cols, rows))
```

**Translation** cũng tự dựng ma trận với `tx`, `ty`:

```python
tx, ty = 200, 300
M = np.float32([[1, 0, tx], [0, 1, ty]])
translated = cv2.warpAffine(image_rgb, M, (cols, rows))
```

Ảnh dịch phải 200 pixel, xuống 300 pixel, hình dạng giữ nguyên.

---

### ✅ Tổng kết

| Tiêu chí | Affine | Perspective |
|---|---|---|
| Số điểm cần | 3 cặp | 4 cặp |
| Đường thẳng | Giữ nguyên | Giữ nguyên |
| Song song | Giữ nguyên | Không bảo toàn |
| Ứng dụng | scale, xoay, shear, dịch | đổi góc nhìn, mô phỏng độ sâu |
| Hàm tính M | `cv2.getAffineTransform`, `cv2.getRotationMatrix2D` | `cv2.getPerspectiveTransform` |

Nắm được ma trận biến đổi là nắm được phần cốt lõi của hai phép này. Hẹn gặp các bạn ở bài tiếp theo về **image filters**.
