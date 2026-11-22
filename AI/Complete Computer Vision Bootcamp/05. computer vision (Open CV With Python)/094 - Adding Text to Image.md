---
title: 'Bài 094 — Thêm chữ vào ảnh bằng OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 94
status: edited
source: '094 - Adding Text to Image.md'
categories:
- AI
tags: []
---

# 🔤 Thêm chữ vào ảnh bằng OpenCV

> Nguồn: `094 - Adding Text to Image.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48422907)

Chào các bạn! Sau khi đã nắm hệ tọa độ và cách vẽ hình, bài này mình dùng chính kiến thức đó để **ghi chữ lên ảnh** bằng OpenCV: chọn vị trí, chọn font, chỉnh cỡ chữ và độ đậm. Đây là kỹ năng rất hữu ích khi cần chú thích ảnh hoặc tạo nhãn cho demo.

### 🖼️ Chuẩn bị canvas

Mình vẫn bắt đầu với một canvas trống kích thước **500 x 700**, tô màu xanh da trời. Tương tự bài trước, màu phải viết theo thứ tự **BGR**:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

height, width = 500, 700
sky_blue = (255, 127, 0)  # BGR
canvas = np.full((height, width, 3), sky_blue, dtype=np.uint8)

# đổi sang RGB để hiển thị đúng màu bằng matplotlib
canvas = cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB)
```

Sau khi đổi sang RGB, `plt.imshow` sẽ cho đúng màu xanh da trời như mong muốn.

---

### ✍️ Hàm `cv2.putText` và điểm neo `org`

Hàm chính để ghi chữ là `cv2.putText`. Cú pháp:

```python
cv2.putText(canvas, text, org, fontFace, fontScale, color, thickness, lineType)
```

Trong đó tham số quan trọng nhất là **`org`** — tọa độ góc **dưới bên trái** của chuỗi chữ. Nói cách khác, điểm này là nơi chữ bắt đầu, tính từ đường baseline phía dưới, không phải từ đỉnh chữ.

```python
text = "Hello OpenCV"
cv2.putText(canvas, text, (50, 100), cv2.FONT_HERSHEY_COMPLEX,
            1.5, (255, 255, 255), 2, cv2.LINE_AA)
```

* `(50, 100)` là điểm neo góc dưới trái.
* `1.5` là **fontScale** — hệ số phóng to so với kích thước gốc của font.
* `2` là độ dày nét chữ.
* `cv2.LINE_AA` là kiểu vẽ **anti-aliasing** giúp chữ mượt hơn.

Nếu đổi `org` từ `(50, 100)` sang `(50, 200)`, chữ sẽ tụt xuống thấp hơn. Vì ta ghi trực tiếp lên canvas, chữ mới sẽ đè lên chữ cũ — muốn bắt đầu lại thì phải tạo canvas mới.

---

### 🔤 Các font Hershey có sẵn

OpenCV đi kèm bộ font **Hershey**. Mình đưa các font cần thử vào một list rồi vẽ từng font xuống một dòng:

```python
fonts = [
    cv2.FONT_HERSHEY_SIMPLEX,
    cv2.FONT_HERSHEY_COMPLEX,
    cv2.FONT_HERSHEY_SCRIPT_SIMPLEX,
    cv2.FONT_HERSHEY_SCRIPT_COMPLEX,
    cv2.FONT_HERSHEY_COMPLEX_SMALL,
]

y_offset = 50
for i, font in enumerate(fonts):
    cv2.putText(canvas, f"font {i}", (50, y_offset), font, 1,
                (255, 255, 255), 2, cv2.LINE_AA)
    y_offset += 50
```

Vòng lặp giữ nguyên `x = 50` và tăng dần `y_offset` thêm `50` mỗi lần, nhờ đó các font xếp thành một cột dọc để dễ so sánh. Đây là năm font mà bài giảng tập trung; OpenCV còn vài biến thể khác nhưng không cần đi hết.

---

### 🎚️ Thử nghiệm fontScale và độ dày

Để chọn cỡ chữ vừa ý, mình thử nhiều cặp **(fontScale, thickness)** trên cùng một canvas mới:

```python
styles = [(1, 2), (2, 2), (1, 4), (2, 4)]

y_offset = 50
for scale, thickness in styles:
    cv2.putText(canvas, "Sample text", (50, y_offset), cv2.FONT_HERSHEY_SIMPLEX,
                scale, (255, 255, 255), thickness, cv2.LINE_AA)
    y_offset += 50
```

Kết quả quan sát được khá thú vị:

* Cùng độ dày `2`, nhưng `fontScale = 2` trông **mảnh** hơn vì chữ to ra còn nét thì không dày thêm.
* `fontScale = 1` với `thickness = 4` trông **nhỏ nhưng đậm**.
* Cỡ chữ và độ dày là hai thứ độc lập, phải chỉnh cùng nhau mới cân.

---

### ✅ Tổng kết

Từ bài này, các bạn đã biết dùng `cv2.putText` để ghi chữ lên ảnh: nhớ `org` là góc dưới trái, `fontScale` phóng to font, `thickness` chỉnh độ đậm, và `cv2.LINE_AA` cho chữ mượt. Cùng với các font Hershey, đây là đủ bộ để chú thích ảnh trong mọi demo OpenCV. Hẹn gặp ở bài tiếp theo về **affine** và **perspective transformation**.
