---
title: 'Track khuôn mặt bằng MeanShift và CamShift với OpenCV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 62
status: edited
source: '062 - MeanShift and CamShift Tracking with OpenCV.md'
categories:
- AI
tags: []
---

# 🎯 Track khuôn mặt bằng MeanShift và CamShift

> Nguồn: `062 - MeanShift and CamShift Tracking with OpenCV.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12503641)

Bài này mình áp MeanShift vào bài toán thực tế: detect khuôn mặt trên **frame đầu tiên**, lấy vùng mặt làm mục tiêu, rồi để MeanShift bám theo vùng pixel đó. Sau đó đổi sang CamShift để cửa sổ tự co giãn theo khoảng cách.

### 📷 Lấy frame và detect mặt lần đầu

```python
import numpy as np
import cv2

cap = cv2.VideoCapture(0)
ret, frame = cap.read()

face_cascade = cv2.CascadeClassifier(
    'haarcascades/haarcascade_frontalface_default.xml')
face_rects = face_cascade.detectMultiScale(frame)

(face_x, face_y, w, h) = tuple(face_rects[0])
track_window = (face_x, face_y, w, h)
```

`detectMultiScale()` trả về danh sách các mảng NumPy, mỗi mảng là một hình chữ nhật `(x, y, w, h)`. Vì code này chỉ track **một** khuôn mặt, ta lấy phần tử `[0]` rồi chuyển thành tuple bằng `tuple()` — đây là dạng mà các bước sau yêu cầu.

### 🎨 Tính histogram màu của vùng mặt

```python
roi = frame[face_y:face_y + h, face_x:face_x + w]

hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

roi_hist = cv2.calcHist([hsv_roi], [0], None, [180], [0, 180])
cv2.normalize(roi_hist, roi_hist, 0, 255, cv2.NORM_MINMAX)
```

Vùng ROI được cắt theo cú pháp slicing quen thuộc. Ta chuyển sang **HSV** vì bước sau cần làm việc trên kênh hue.

`cv2.calcHist()` lấy **kênh 0 (hue)**, không mask, **180 bin**, range `[0, 180]`. Sau đó chuẩn hóa histogram về khoảng 0–255 bằng `cv2.normalize()` với `NORM_MINMAX` để dùng làm đầu vào cho back projection.

### ⏱️ Điều kiện dừng

```python
term_crit = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1)
```

Giống phần optical flow: dừng khi đủ **10 vòng lặp** hoặc khi epsilon đạt **1**, tùy cái nào tới trước. Đây là những giá trị có thể chỉnh, nhưng mặc định đủ tốt cho phương pháp cơ bản này.

### 🔁 Vòng lặp MeanShift

```python
while True:
    ret, frame = cap.read()
    if ret:
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        dst = cv2.calcBackProject([hsv], [0], roi_hist, [0, 180], 1)

        ret, track_window = cv2.meanShift(dst, track_window, term_crit)

        x, y, w, h = track_window
        img2 = cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 5)
        cv2.imshow('img', img2)

        k = cv2.waitKey(1) & 0xFF
        if k == 27:
            break
    else:
        break

cv2.destroyAllWindows()
cap.release()
```

**`cv2.calcBackProject()`** tạo ảnh xác suất: pixel nào có màu giống histogram mục tiêu thì sáng. Đó là "bản đồ nhiệt" để MeanShift tìm vùng khớp nhất.

**`cv2.meanShift()`** nhận ảnh back projection, cửa sổ hiện tại và điều kiện dừng; trả về cửa sổ mới. Ta vẽ hình chữ nhật đỏ dày 5 lên frame theo cửa sổ đó.

Khối `if ret / else break` chỉ để phòng camera lỗi, tránh kẹt kernel — bình thường không cần.

### 🔄 Chuyển sang CamShift

Chỉ cần đổi hàm và cách vẽ, vì CamShift trả về một hình chữ nhật xoay:

```python
        ret, track_window = cv2.CamShift(dst, track_window, term_crit)

        pts = cv2.boxPoints(ret)
        pts = np.int0(pts)
        img2 = cv2.polylines(frame, [pts], True, (0, 0, 255), 5)
```

`cv2.CamShift()` trả về `rotatedRect`; `cv2.boxPoints()` đổi nó thành **4 đỉnh**. Vì tọa độ là số thực, ta ép về integer trước khi vẽ. `cv2.polylines()` nối 4 đỉnh thành đa giác khép kín (`True`).

### 💡 Kết quả và mẹo

* **MeanShift**: hình vuông giữ nguyên kích thước dù mặt lại gần hay ra xa.
* **CamShift**: hình chữ nhật phóng to khi mặt tiến lại gần, thu nhỏ khi lùi ra xa.
* Cả hai đều có thể bị "lừa": che mặt đi thì thuật toán có thể bắt đầu track tay hoặc vật khác cùng màu.
* Khi khởi động, hãy để **chỉ khuôn mặt** trong khung hình. Nếu lọt cả người vào ROI ban đầu, cửa sổ sẽ bám luôn phần cơ thể và kết quả rất tệ.

Giảng viên cũng nhấn mạnh đây không phải cách track mặt tốt nhất; bài sau ta sẽ dùng **tracking API** dựng sẵn của OpenCV, hoạt động ổn định hơn nhiều.

> ⚠️ Cần kiểm chứng: `np.int0` đã bị loại bỏ khỏi NumPy 2.x; nếu chạy với NumPy mới, thay bằng `pts.astype(np.int32)`. Ngoài ra tên file cascade trong transcript bị auto-caption đọc sai (`frontalface_default.xml`), tên đúng là `haarcascade_frontalface_default.xml`.
