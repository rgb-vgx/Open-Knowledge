---
title: 'Lời giải bài tập: phát hiện và làm mờ biển số xe Nga'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 56
status: edited
source: '056 - Detection Assessment Solutions.md'
categories:
- AI
tags: []
---

# 🧪 Lời giải bài tập: phát hiện và làm mờ biển số xe Nga

> Nguồn: `056 - Detection Assessment Solutions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257866)

Lời giải của project cuối section. Phần detect giống hệt face detection; phần khó nằm ở **NumPy slicing** để cắt đúng vùng biển số, blur nó rồi ghép lại vào ảnh gốc.

### 🖥️ Import và hàm hiển thị

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('data/carplate.jpg')

def display(img):
    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    ax.imshow(rgb)
```

`figsize=(10, 8)` chỉ để hiển thị ảnh lớn hơn; `cvtColor` sửa màu cho matplotlib. Không cần nhớ đoạn này — cứ copy từ các bài trước.

---

### 🚘 Nạp cascade và detect_plate

```python
plate_cascade = cv2.CascadeClassifier(
    'data/haarcascades/haarcascade_russian_plate_number.xml')

def detect_plate(img):
    plate_img = img.copy()
    plate_rects = plate_cascade.detectMultiScale(plate_img,
                                                 scaleFactor=1.3,
                                                 minNeighbors=3)

    for (x, y, w, h) in plate_rects:
        cv2.rectangle(plate_img, (x, y), (x + w, y + h), (255, 0, 0), 4)

    return plate_img
```

Gần như bản sao của `detect_face`, chỉ đổi file XML sang **biển số Nga** và tinh chỉnh tham số. Với ảnh này, **`scaleFactor=1.3`** và **`minNeighbors=3`** cho kết quả tốt. Copy ảnh trước khi vẽ, độ dày rectangle `4`.

Chạy `detect_plate(img)` sẽ thấy hình chữ nhật khoanh đúng biển số.

---

### 🌫️ detect_and_blur_plate

Ý tưởng: cắt vùng biển số ra thành **region of interest (ROI)**, blur ROI, rồi ghi đè lại vào ảnh gốc.

```python
def detect_and_blur_plate(img):
    plate_img = img.copy()
    roi = img.copy()

    plate_rects = plate_cascade.detectMultiScale(plate_img,
                                                 scaleFactor=1.3,
                                                 minNeighbors=3)

    for (x, y, w, h) in plate_rects:
        roi = roi[y:y+h, x:x+w]
        blurred_roi = cv2.medianBlur(roi, 7)
        plate_img[y:y+h, x:x+w] = blurred_roi

    return plate_img
```

Ba dòng trong vòng lặp là toàn bộ phần khó:

1. **Cắt ROI**: `roi[y:y+h, x:x+w]`.
2. **Blur**: `cv2.medianBlur(roi, 7)` với kernel `7` để đủ mờ.
3. **Ghép lại**: gán `plate_img[y:y+h, x:x+w] = blurred_roi`.

---

### ⚠️ Cạm bẫy slicing: Y trước, X sau

Đây là chỗ dễ sai nhất. Rectangle của OpenCV định nghĩa bằng `(x, y, w, h)`, nhưng **NumPy slicing lại theo thứ tự hàng-cột**:

* **Chiều thứ nhất = Y** (hàng) → cắt `y : y+h`.
* **Chiều thứ hai = X** (cột) → cắt `x : x+w`.

Nghĩa là phải viết `[y:y+h, x:x+w]`, **ngược** với thứ tự `(x, y, w, h)` của `cv2.rectangle`. Chỉ cần đảo hai cái là vùng blur lệch hoàn toàn.

---

### 🎉 Kết quả

Ảnh sau xử lý: biển số bị **làm mờ đúng vùng**, không đọc được nữa, còn toàn bộ phần còn lại của frame dashcam giữ nguyên độ nét. Đây là lần đầu trong khóa ghép mọi thứ — xử lý ảnh, detect bằng cascade, slicing NumPy — thành một ứng dụng thực tế hoàn chỉnh.

---

### ✅ Tóm lại

Công thức: `detectMultiScale` → lặp qua `(x, y, w, h)` → cắt `[y:y+h, x:x+w]` → blur → gán ngược lại. Nhớ **Y trước, X sau** khi slicing. Hết section Object Detection — bước tiếp theo của khóa là deep learning.
