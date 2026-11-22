---
title: 'Harris Corner Detection: tìm góc trong ảnh'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 43
status: edited
source: '043 - Corner Detection - Part One - Harris Corner Detection.md'
categories:
- AI
tags: []
---

# 📐 Harris Corner Detection: tìm góc trong ảnh

> Nguồn: `043 - Corner Detection - Part One - Harris Corner Detection.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257838)

Corner detection là bước tiếp theo sau khi đã biết tìm cạnh. Bài này mình đi qua ý tưởng của **Harris Corner Detection** (Chris Harris và Mike Stephens, 1988), rồi áp dụng lên bàn cờ phẳng và bàn cờ thật để thấy nó hoạt động ra sao.

### 🤔 Góc là gì?

Một cách hình thức, **góc** là điểm mà lân cận cục bộ của nó nằm theo **hai hướng cạnh khác nhau**. Nói đơn giản: góc là chỗ hai cạnh gặp nhau, còn cạnh là chỗ độ sáng thay đổi đột ngột.

Trực giác của Harris: nếu trượt một cửa sổ nhỏ trên ảnh mà **hướng nào cũng thấy thay đổi lớn**, chỗ đó là góc.

* Vùng **phẳng** → không đổi theo hướng nào.
* Trên **cạnh** → đổi mạnh theo phương vuông góc với cạnh, nhưng gần như không đổi dọc theo cạnh.
* Trên **góc** → đổi mạnh ở mọi hướng.

Điểm khác biệt giữa Harris và Shi-Tomasi (bài sau) nằm ở **hàm chấm điểm**: Harris dùng biểu thức chứa `λ1 * λ2 - k * (λ1 + λ2)`, còn Shi-Tomasi chỉ lấy `min(λ1, λ2)` — một chỉnh sửa nhỏ nhưng cho kết quả tốt hơn.

---

### 🖼️ Chuẩn bị ảnh

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

flat_chess = cv2.imread('data/flat_chessboard.png')
flat_chess = cv2.cvtColor(flat_chess, cv2.COLOR_BGR2RGB)
gray_flat_chess = cv2.cvtColor(flat_chess, cv2.COLOR_BGR2GRAY)

real_chess = cv2.imread('data/real_chessboard.jpeg')
real_chess = cv2.cvtColor(real_chess, cv2.COLOR_BGR2RGB)
gray_real_chess = cv2.cvtColor(real_chess, cv2.COLOR_BGR2GRAY)
```

Ảnh bàn cờ phẳng là lưới 8x8 rất rõ góc, dùng để kiểm chứng thuật toán. Ảnh bàn cờ thật khó hơn: có quân cờ, và các đường cong của quân có thể bị nhận nhầm thành góc.

---

### ⚙️ Chạy cornerHarris

Thuật toán cần ảnh đầu vào kiểu **float**, nên bước đầu là ép kiểu:

```python
gray = np.float32(gray_flat_chess)

dst = cv2.cornerHarris(src=gray, blockSize=2, ksize=3, k=0.04)
```

Ba tham số:

* **`blockSize=2`** — kích thước lân cận dùng để tính eigenvalue/vector. `2` là giá trị phổ biến, có thể thử nghiệm.
* **`ksize=3`** — aperture size cho **Sobel operator** bên trong (tính gradient theo X, Y).
* **`k=0.04`** — tham số tự do của Harris, `0.04` là mặc định tốt.

Nếu muốn xem công thức đầy đủ, đặt con trỏ vào hàm và nhấn Shift+Tab để đọc docstring.

---

### 🟥 Dilate và tô màu góc

Kết quả `dst` chưa phải ảnh để xem. Ta cần làm dày các điểm góc rồi tô màu:

```python
dst = cv2.dilate(dst, None)

flat_chess[dst > 0.01 * dst.max()] = [255, 0, 0]

plt.imshow(flat_chess)
```

* **`cv2.dilate(dst, None)`** — morphological operator làm dày điểm sáng. Bước này **không** thuộc thuật toán, chỉ để nhìn rõ kết quả.
* **`dst > 0.01 * dst.max()`** — lấy các điểm có phản hồi lớn hơn **1% giá trị lớn nhất**. Ngưỡng này tùy ảnh, có thể chỉnh.
* Gán `[255, 0, 0]` (đỏ) cho các pixel thỏa điều kiện, vẽ trực tiếp lên ảnh màu.

Với ảnh bàn cờ thật, làm y hệt nhưng thay `gray_flat_chess` bằng `gray_real_chess` và tô lên `real_chess`.

---

### 👀 Kết quả

Trên bàn cờ phẳng: mọi góc bên trong lưới được đánh dấu đỏ chính xác. Các góc mép ngoài **không** được phát hiện — vì phía ngoài không còn gì để so sánh, thuật toán coi đó là vùng phẳng. Muốn bắt cả góc mép, ta sẽ phải tự thêm viền cho ảnh trước.

Trên bàn cờ thật: phát hiện đủ các góc chính của bàn, nhưng **cũng bắt rất nhiều góc trên quân cờ đen**. Đây là điều cần lưu ý khi dùng Harris — nó không phân biệt đâu là "góc có ý nghĩa", chỉ quan tâm tới sự thay đổi cường độ.

---

### ✅ Tóm lại

Quy trình gồm bốn bước: ép ảnh xám về `np.float32` → `cv2.cornerHarris()` với `blockSize`, `ksize`, `k` → `cv2.dilate()` → threshold theo `0.01 * dst.max()` và tô màu. Bài sau ta chuyển sang Shi-Tomasi, cách dùng còn gọn hơn.
