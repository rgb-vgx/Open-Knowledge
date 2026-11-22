---
title: 'Bài 093 — Vẽ đường thẳng và hình khối bằng OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 93
status: edited
source: '093 - Drawing lines and shapes using opencv.md'
categories:
- AI
tags: []
---

# ✏️ Vẽ đường thẳng và hình khối bằng OpenCV

> Nguồn: `093 - Drawing lines and shapes using opencv.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48422791)

Chào các bạn! Biết vẽ **line**, **rectangle**, **circle**, **ellipse** và **polygon** là kỹ năng rất cần cho việc trực quan hóa dữ liệu, chú thích ảnh (annotate) và tạo các lớp phủ đồ họa. Bài này mình sẽ dựng một **canvas** trống rồi vẽ từng loại hình lên đó bằng OpenCV.

### 🎨 Dựng canvas trước khi vẽ

Muốn vẽ gì thì cũng cần một mặt phẳng để vẽ. Mình bắt đầu bằng việc import thư viện:

* `import cv2`
* `import matplotlib.pyplot as plt` — để hiển thị hình trong notebook.
* `import numpy as np` — để tạo canvas.

Canvas là một mảng NumPy với chiều cao, chiều rộng và 3 kênh màu. Mình chọn kích thước **500 x 700** và tô màu xanh dương (BGR).

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

height, width = 500, 700
blue = (255, 0, 0)  # BGR
canvas = np.full((height, width, 3), blue, dtype=np.uint8)
```

Lưu ý: **matplotlib** hiển thị ảnh theo thứ tự **RGB**, còn OpenCV lưu theo **BGR**. Vì vậy khi xem canvas bằng `plt.imshow`, phải đổi màu trước, nếu không màu sẽ bị lệch:

```python
canvas_rgb = cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB)
plt.imshow(canvas_rgb)
```

Nếu bỏ dòng `cvtColor` và chỉ gọi `plt.imshow(canvas)`, các kênh bị hoán đổi nên bạn sẽ thấy màu cam thay vì xanh dương.

---

### ➖ Vẽ đường thẳng với `cv2.line`

Hàm `cv2.line` cần điểm đầu, điểm cuối, màu và độ dày:

```python
cv2.line(canvas, (50, 50), (650, 450), (255, 255, 255), 5)
```

* `(50, 50)` là điểm đầu, nằm gần góc trên trái.
* `(650, 450)` là điểm cuối, nằm gần góc dưới phải.
* `(255, 255, 255)` là màu trắng.
* `5` là độ dày nét (thickness).

Điều đáng chú ý: `cv2.line` vẽ **trực tiếp lên** canvas và cập nhật luôn mảng đó. Nếu bạn vẽ tiếp một đường khác trên cùng canvas, đường cũ vẫn còn. Muốn có ảnh sạch thì phải tạo lại canvas từ đầu.

---

### ⬛ Hình chữ nhật, hình tròn và ellipse

**Hình chữ nhật** dùng hai góc đối nhau:

```python
cv2.rectangle(canvas, (100, 100), (300, 300), (0, 255, 255), 2)
```

Nếu đặt `thickness=-1`, OpenCV sẽ tô kín toàn bộ hình. Với `thickness` dương, đó chỉ là viền. Trong ví dụ, hai cạnh bằng nhau nên hình chữ nhật trông như hình vuông.

**Hình tròn** chỉ cần tâm và bán kính:

```python
cv2.circle(canvas, (500, 150), 100, (255, 255, 255), 5)
```

Bán kính `100` nghĩa là đường kính khoảng `200` pixel.

**Ellipse** cần tâm, độ dài hai trục, góc nghiêng và góc bắt đầu/kết thúc:

```python
cv2.ellipse(canvas, (350, 350), (120, 60), 45, 0, 360, (0, 255, 0), 3)
```

* `(350, 350)` là tâm.
* `(120, 60)` là trục lớn và trục nhỏ.
* `45` là góc nghiêng của ellipse.
* `0, 360` là góc bắt đầu và kết thúc — vẽ đủ một vòng.

---

### 🔺 Polygon và tham số `isClosed`

Polygon là hình có nhiều hơn hai điểm. Mình tạo mảng điểm bằng NumPy, ép kiểu `int32`, rồi reshape về dạng `(-1, 1, 2)` mà OpenCV mong đợi:

```python
points = np.array([[150, 400], [300, 400], [225, 300]], dtype=np.int32)
points = points.reshape(-1, 1, 2)
cv2.polylines(canvas, [points], True, (255, 0, 255), 3)
```

Hàm `cv2.polylines` nhận danh sách các đường (vì vậy phải bọc `[points]`), cờ `isClosed`, màu và độ dày.

Cờ `isClosed` quyết định hình có được khép kín hay không:

* `False` (mặc định): OpenCV nối điểm 1 → 2 → 3 rồi dừng, không nối điểm cuối về điểm đầu. Với ba điểm bạn chỉ được hai đoạn thẳng.
* `True`: OpenCV nối thêm điểm cuối với điểm đầu, tạo thành tam giác khép kín.

---

### ✅ Tổng kết

Bài này mình đã đi qua năm hàm vẽ cơ bản của OpenCV: `cv2.line`, `cv2.rectangle`, `cv2.circle`, `cv2.ellipse` và `cv2.polylines`. Điểm chung cần nhớ là mọi hàm đều vẽ trực tiếp lên canvas và nhận màu theo thứ tự **BGR**. Hẹn gặp các bạn ở bài tiếp theo, khi ta dùng kiến thức tọa độ này để thêm chữ vào ảnh.
