---
title: 'Kéo chuột để vẽ hình chữ nhật theo thời gian thực'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 18
status: edited
source: '018 - Direct Drawing on Images with a mouse - Part Three.md'
categories:
- AI
tags: []
---

# 🎨 Kéo chuột để vẽ rectangle

> Nguồn: `018 - Direct Drawing on Images with a mouse - Part Three.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12292078)

Mục tiêu của phần ba: tạo một ảnh đen, nhấn chuột trái xuống rồi **kéo** để hình chữ nhật lớn dần, và nhả chuột thì dừng vẽ. Bài này làm lại từ đầu nên cũng là một lần ôn lại toàn bộ khái niệm của hai phần trước.

### 🧱 Chuẩn bị biến trạng thái

Khác các bài trước, lần này có thêm hai nhóm biến toàn cục ngay từ đầu:

```python
import cv2
import numpy as np

img = np.zeros((512, 512, 3))
drawing = False
ix, iy = -1, -1
```

* `drawing`: bằng `False` khi chuột chưa nhấn, chuyển `True` khi nhấn xuống và quay lại `False` khi nhả.
* `ix, iy`: tọa độ điểm bắt đầu kéo, khởi tạo `-1, -1`. Có thể viết thành hai dòng riêng thay vì gán tuple.

---

### 🔗 Nối cửa sổ với hàm draw_rectangle

```python
def draw_rectangle(event, x, y, flags, param):
    ...

cv2.namedWindow('my_drawing')
cv2.setMouseCallback('my_drawing', draw_rectangle)

while True:
    cv2.imshow('my_drawing', img)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cv2.destroyAllWindows()
```

Tên cửa sổ `my_drawing` vẫn phải trùng ở cả ba chỗ. Trong hàm cần khai báo để sửa các biến toàn cục:

```python
global ix, iy, drawing
```

---

### 🖱️ Ba event: nhấn xuống, di chuyển, nhả lên

**Nhấn chuột trái xuống** — bắt đầu vẽ và ghi nhớ điểm xuất phát:

```python
if event == cv2.EVENT_LBUTTONDOWN:
    drawing = True
    ix, iy = x, y
```

**Di chuyển chuột** — nếu đang vẽ thì vẽ rectangle từ điểm bắt đầu tới vị trí hiện tại:

```python
elif event == cv2.EVENT_MOUSEMOVE:
    if drawing:
        cv2.rectangle(img, (ix, iy), (x, y), (0, 255, 0), -1)
```

Phải kiểm tra `drawing` trước khi vẽ, nếu không thì chỉ cần di chuột là rectangle xuất hiện lung tung.

**Nhả chuột trái** — dừng vẽ và vẽ nốt hình cuối cùng:

```python
elif event == cv2.EVENT_LBUTTONUP:
    drawing = False
    cv2.rectangle(img, (ix, iy), (x, y), (0, 255, 0), -1)
```

Rectangle ở đây dùng `thickness=-1` nên là hình **tô đặc**, màu xanh lá.

---

### ⚙️ Logic chạy

1. Nhấn chuột trái: `drawing = True`, lưu `ix, iy`.
2. Kéo chuột: liên tục vẽ rectangle từ `(ix, iy)` tới `(x, y)` hiện tại.
3. Nhả chuột: `drawing = False`, vẽ lần cuối.

Vì rectangle được vẽ lại rất nhiều lần trong lúc kéo, từ góc nhìn người dùng nó trông như một hình đang lớn dần một cách mượt, chứ không phải hàng loạt hình chồng lên nhau.

---

### ⚠️ Giới hạn cần biết

Cách làm này giả định bạn luôn kéo từ **góc trên trái xuống góc dưới phải**. Nếu kéo ngược theo hướng không hợp lý, các pixel sẽ bắt đầu trông kỳ lạ. Cứ giữ thao tác từ trên trái xuống dưới phải là hình sẽ đúng.

Đến đây ta đã đi hết phần tương tác chuột: nối callback, xử lý nhiều event, và theo dõi trạng thái kéo thả. Bài tiếp theo là bài assessment của section Image Basics.
