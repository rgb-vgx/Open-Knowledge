---
title: 'Contour Detection: tách contour trong và contour ngoài'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 47
status: edited
source: '047 - Contour Detection.md'
categories:
- AI
tags: []
---

# 🍕 Contour Detection: tách contour trong và contour ngoài

> Nguồn: `047 - Contour Detection.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257848)

**Contour** là đường cong nối các điểm liên tục trên biên của vùng có cùng màu hoặc cùng cường độ. Đây là công cụ rất mạnh cho phân tích hình dạng và nhận dạng vật thể. Điểm hay của `cv2.findContours()` là nó còn cho biết contour nào **nằm trong** contour nào.

### 🖼️ Ảnh thử

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread('data/internal_external.png', 0)
print(image.shape)   # chỉ có x, y — ảnh xám
```

Ảnh gồm: một tam giác, một mặt cười (hai mắt và miệng là hình tròn đen), và một hình tròn kiểu "bánh pizza" với các lát pepperoni. Nền đen, vật thể trắng. Ta sẽ tách được cả **contour ngoài** (tam giác, hình tròn) lẫn **contour trong** (mắt, miệng, pepperoni).

---

### 🔎 findContours

```python
img, contours, hierarchy = cv2.findContours(image,
                                            cv2.RETR_CCOMP,
                                            cv2.CHAIN_APPROX_SIMPLE)
```

* **`cv2.RETR_CCOMP`** — lấy cả contour trong và ngoài, tổ chức thành **hierarchy hai tầng** để tra cứu. Nếu chỉ cần contour ngoài thì dùng `cv2.RETR_EXTERNAL`.
* **`cv2.CHAIN_APPROX_SIMPLE`** — phương pháp xấp xỉ contour, giữ các điểm cần thiết.

Hàm trả về ba thứ: ảnh, **danh sách contour**, và **hierarchy**. `contours` là list có **22 phần tử** đúng bằng số hình dạng (pepperoni + mắt + miệng + các hình ngoài). `hierarchy` là một NumPy array, mỗi dòng mô tả quan hệ của một contour; cột thứ tư (index 3) cho biết contour đó **nằm trong contour nào**.

---

### 🟩 Vẽ contour ngoài

```python
external_contours = np.zeros(image.shape)

for i in range(len(contours)):
    if hierarchy[0][i][3] == -1:
        cv2.drawContours(external_contours, contours, i, 255, -1)
```

Giải thích:

* **`np.zeros(image.shape)`** — ảnh đen cùng kích thước để vẽ lên.
* **`hierarchy[0][i][3] == -1`** — giá trị `-1` ở cột thứ tư nghĩa là contour **không nằm trong** contour nào khác, tức là **contour ngoài**.
* **`cv2.drawContours(..., i, 255, -1)`** — vẽ contour thứ `i`, màu `255` (trắng), `-1` để tô đầy.

Kết quả: chỉ còn tam giác và hai hình tròn — những hình có biên chạm nền.

---

### 🟨 Vẽ contour trong

Làm y hệt nhưng đổi điều kiện thành **khác `-1`**:

```python
internal_contours = np.zeros(image.shape)

for i in range(len(contours)):
    if hierarchy[0][i][3] != -1:
        cv2.drawContours(internal_contours, contours, i, 255, -1)
```

Kết quả là mắt, miệng và các lát pepperoni — những hình **nằm bên trong** một vật thể khác chứ không chạm nền.

---

### 🗂️ Hierarchy nhóm theo vật chứa

Cột thứ tư còn cho biết contour trong thuộc về hình ngoài nào. Trong ảnh mẫu:

* **`-1`** → contour ngoài.
* **`0`** → mắt và miệng của mặt cười.
* **`4`** → toàn bộ pepperoni.

Nhờ vậy có thể lọc rất mịn: chỉ vẽ contour trong có giá trị `== 4` sẽ ra đúng các lát pepperoni, còn `== 0` sẽ ra đúng mặt cười. Đây là điểm mạnh so với việc chỉ tách trong/ngoài — nó còn phân nhóm theo **vật chứa**.

---

### ✅ Tóm lại

`cv2.findContours(ảnh, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)` trả về `contours` và `hierarchy`. Duyệt `range(len(contours))`, xét `hierarchy[0][i][3]`: bằng `-1` là contour ngoài, khác `-1` là contour trong, và giá trị cụ thể nhóm các contour trong theo hình chứa. Vẽ bằng `cv2.drawContours()`. Bài sau ta chuyển sang feature matching — kỹ thuật nhận diện vật thể mạnh hơn hẳn.
