---
title: 'Vẽ hình cơ bản trên ảnh: rectangle, circle và line'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 14
status: edited
source: '014 - Drawing on Images - Part One - Basic Shapes.md'
categories:
- AI
tags: []
---

# ✏️ Vẽ hình cơ bản trên ảnh với OpenCV

> Nguồn: `014 - Drawing on Images - Part One - Basic Shapes.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257624)

Phần này bắt đầu với những hình đơn giản nhất: hình chữ nhật, hình tròn và đường thẳng. Phần hai sẽ nối tiếp bằng chữ và polygon. Đây là nền tảng để sau này vẽ khung bao quanh vật thể khi làm object tracking.

### 🖼️ Tạo canvas đen bằng np.zeros

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

blank_img = np.zeros(shape=(512, 512, 3), dtype=np.int16)
plt.imshow(blank_img)
```

`512 × 512` là kích thước đủ nhỏ để hiển thị, `3` là số kênh màu. Vì mọi giá trị đều bằng 0 nên ảnh hiện ra **đen tuyệt đối**.

### ▭ Vẽ rectangle

```python
cv2.rectangle(
    blank_img,
    pt1=(384, 0),
    pt2=(510, 150),
    color=(0, 0, 255),
    thickness=10,
)
```

`cv2.rectangle` nhận ảnh cần vẽ và **hai điểm**:

* `pt1` là góc trên bên trái (đỉnh thứ nhất).
* `pt2` là góc dưới bên phải (đỉnh đối diện).

Chỉ cần hai góc, OpenCV tự nối các cạnh theo phương ngang và dọc. `color` là mã màu, `thickness` là độ dày tính bằng pixel.

Điểm quan trọng: hàm này **không trả về ảnh mới**, nó vẽ trực tiếp lên `blank_img` — giống như dùng bút vẽ vĩnh viễn lên ảnh. Vì vậy phải gọi `plt.imshow(blank_img)` lại mới thấy kết quả.

Nếu đặt các điểm quá sát biên, độ dày sẽ trông không đều: nét vẽ tính từ giữa đường rồi lan ra hai bên, nên phần bị biên cắt mất không hiện đủ. Dịch các điểm vào trong một chút (ví dụ `10` thay cho `0`, `500` thay cho `510`) sẽ cho các cạnh đều hơn.

### ⬜ Hình vuông ở giữa ảnh

```python
cv2.rectangle(
    blank_img,
    pt1=(200, 200),
    pt2=(300, 300),
    color=(255, 0, 0),
    thickness=10,
)
plt.imshow(blank_img)
```

Với ảnh `512 × 512`, cặp `(200, 200)` và `(300, 300)` cho một hình vuông nằm giữa ảnh, các cạnh đều nhau.

### ⭕ Vẽ circle

```python
cv2.circle(
    blank_img,
    center=(100, 100),
    radius=50,
    color=(255, 0, 0),
    thickness=8,
)
plt.imshow(blank_img)
```

Các tham số gồm:

* `img`: ảnh cần vẽ.
* `center`: tọa độ `(x, y)` của tâm.
* `radius`: bán kính tính bằng pixel.
* `color`: màu, ở đây là một màu nguyên (primary color).
* `thickness`: độ dày nét.

Hình tròn trông hơi "pixel" vì ảnh chỉ có độ phân giải `512 × 512`.

Muốn **tô đặc** hình tròn hoặc hình chữ nhật, chỉ cần truyền `thickness=-1`:

```python
cv2.circle(
    blank_img,
    center=(400, 400),
    radius=50,
    color=(255, 0, 0),
    thickness=-1,
)
```

Với hình chữ nhật cũng áp dụng y hệt: `thickness=-1` là tô kín.

### 📏 Vẽ line

```python
cv2.line(
    blank_img,
    pt1=(0, 0),
    pt2=(512, 512),
    color=(0, 255, 255),
    thickness=5,
)
plt.imshow(blank_img)
```

`cv2.line` nhận ảnh, điểm đầu, điểm cuối, màu và độ dày — cấu trúc rất giống rectangle. Ví dụ trên vẽ đường chéo từ góc trên trái `(0, 0)` xuống góc dưới phải `(512, 512)`.

Như vậy ta đã biết vẽ **line**, **rectangle**, **circle**, biết đổi màu và độ dày, biết tô đặc bằng `thickness=-1`. Bài tiếp theo sẽ thêm chữ và polygon tùy biến để khép lại phần vẽ hình.
