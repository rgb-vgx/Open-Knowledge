---
title: 'Custom Seeds với Watershed: click chuột để tự phân đoạn ảnh'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 52
status: edited
source: '052 - Custom Seeds with Watershed Algorithm.md'
categories:
- AI
tags: []
---

# 🖱️ Custom Seeds với Watershed: click chuột để tự phân đoạn ảnh

> Nguồn: `052 - Custom Seeds with Watershed Algorithm.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257856)

Bài trước ta tự động dựng marker bằng distance transform. Nhưng nhiều khi **tự click seed** lại dễ hơn: bạn chỉ vài điểm trên bầu trời, ngọn núi, mặt biển, rồi watershed tự lan ra và tô màu từng vùng. Bài này mình xây đúng ứng dụng đó — vừa là một project hoàn chỉnh, vừa là bước đệm cho cách tiếp cận tương tác.

### 🎬 Chương trình sẽ làm gì

Mở ảnh phong cảnh có bầu trời, biển, núi và cây cầu. Cửa sổ bên trái là ảnh gốc để click; cửa sổ bên phải hiển thị kết quả phân đoạn, cập nhật liên tục. Bấm số để đổi màu seed, click để đặt seed, bấm **C** để xoá sạch, **ESC** để thoát.

---

### 🧱 Chuẩn bị dữ liệu

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm

road = cv2.imread('data/road_image.jpg')
road_copy = np.copy(road)

marker_image = np.zeros(road.shape[:2], dtype=np.int32)
segments = np.zeros(road.shape, dtype=np.uint8)
```

* **`road_copy`** — bản sao để vẽ các chấm seed lên, không đụng ảnh gốc.
* **`marker_image`** — ảnh marker một kênh, shape `(600, 800)`, kiểu `int32`, dùng làm input cho watershed.
* **`segments`** — ảnh ba kênh `uint8` cùng shape ảnh gốc, nơi tô màu các vùng kết quả.

Không cần đổi `BGR2RGB` vì lần này hiển thị bằng `cv2.imshow`, không dùng matplotlib.

---

### 🎨 Bảng màu từ matplotlib

Dùng **colormap định tính** (`tab10`) có 10 màu phân biệt rõ, tra được theo index:

```python
def create_rgb(i):
    return tuple(np.array(cm.tab10(i)[:3]) * 255)

colors = []
for i in range(10):
    colors.append(create_rgb(i))
```

`cm.tab10(i)` trả về 4 giá trị RGBA trong khoảng 0–1. Lấy `[:3]` (RGB), nhân `255` để đưa về thang 0–255, rồi đổi thành **tuple**. Vì OpenCV dùng BGR nên kênh đỏ/xanh bị hoán đổi — không sao, miễn mỗi seed có một màu khác nhau.

---

### 🌐 Global variable và callback

Hai biến điều khiển:

```python
n_markers = 10
current_marker = 1
marks_updated = False
```

* `current_marker` — index màu đang chọn (1–9), đổi bằng phím số.
* `marks_updated` — cờ báo đã có seed mới, cần chạy lại watershed.

Callback vẽ **hai** vòng tròn mỗi lần click: một lên `marker_image` (giá trị = `current_marker`, dùng cho watershed) và một lên `road_copy` (màu thật, để người dùng thấy):

```python
def mouse_callback(event, x, y, flags, param):
    global marks_updated

    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.circle(marker_image, (x, y), 10, current_marker, -1)
        cv2.circle(road_copy, (x, y), 10, colors[current_marker], -1)
        marks_updated = True
```

---

### 🔁 Vòng lặp chính

```python
cv2.namedWindow('Road Image')
cv2.setMouseCallback('Road Image', mouse_callback)

while True:
    cv2.imshow('Watershed Segments', segments)
    cv2.imshow('Road Image', road_copy)

    k = cv2.waitKey(1)

    if k == 27:                       # ESC
        break
    elif k == ord('c'):               # xoá toàn bộ seed
        road_copy = road.copy()
        marker_image = np.zeros(road.shape[:2], dtype=np.int32)
        segments = np.zeros(road.shape, dtype=np.uint8)
    elif k > 0 and chr(k).isdigit():  # đổi màu seed
        current_marker = int(chr(k))

    if marks_updated:
        marker_copy = marker_image.copy()
        cv2.watershed(road, marker_copy)

        segments = np.zeros(road.shape, dtype=np.uint8)
        for color_ind in range(n_markers):
            segments[marker_copy == color_ind] = colors[color_ind]

cv2.destroyAllWindows()
```

Điểm cần chú ý:

1. **`k == 27`** là phím Escape; `ord('c')` là phím C để reset cả ba ảnh về trạng thái ban đầu.
2. Phím số gửi về **mã nội bộ**, không phải ký tự. Ví dụ bấm `2` có thể trả mã 51, nên phải `chr(k)` rồi `isdigit()` rồi `int()` để lấy đúng số.
3. Phải **copy** `marker_image` trước khi đưa vào `cv2.watershed`, vì ảnh gốc vẫn đang được callback chỉnh sửa.
4. Tô màu segments bằng NumPy: `segments[marker_copy == color_ind] = colors[color_ind]` — gán màu cho toàn bộ pixel có nhãn tương ứng.

---

### 🖌️ Trải nghiệm

Click một điểm vào bầu trời (màu 2), đổi sang màu 3 click vào biển, màu 4 click vào núi, màu 5 click vào đường. Cửa sổ bên phải sẽ dần được tô màu theo từng vùng. Thực tế **không cần nhiều seed** — một vài điểm là đủ, nhưng thêm vài điểm giúp ích khi ảnh nhiễu.

---

### ✅ Tóm lại

Ứng dụng ghép ba mảnh: **bảng màu tab10**, **callback chuột** đặt seed, và **vòng lặp** chạy watershed mỗi khi có seed mới. Cốt lõi chỉ là `cv2.watershed(road, marker_copy)` rồi tô màu theo nhãn. Bài tiếp theo chuyển sang face detection với Haar cascade.
