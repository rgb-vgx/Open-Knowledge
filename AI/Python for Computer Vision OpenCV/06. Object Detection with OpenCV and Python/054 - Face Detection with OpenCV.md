---
title: 'Face Detection với Haar Cascade trong OpenCV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 54
status: edited
source: '054 - Face Detection with OpenCV.md'
categories:
- AI
tags: []
---

# 😀 Face Detection với Haar Cascade trong OpenCV

> Nguồn: `054 - Face Detection with OpenCV.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12335654)

Giờ áp dụng lý thuyết Viola-Jones vào thực tế. Mình dùng các file XML có sẵn của OpenCV để phát hiện khuôn mặt và đôi mắt trên ba ảnh chân dung, rồi thử trên webcam trực tiếp.

### 🖼️ Chuẩn bị ảnh

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# ảnh mẫu trong thư mục data: hai chân dung người đoạt giải Nobel Hòa bình
# và ảnh hội nghị Solvay 1912
nadia  = cv2.imread('data/nadia.jpg', 0)
dennis = cv2.imread('data/dennis.jpg', 0)
solvay = cv2.imread('data/solvay_conference.jpg', 0)
```

Cả ba ảnh đều đọc ở chế độ **grayscale** (cờ `0`) — Haar cascade chỉ cần sáng/tối. Tên file chính xác không được transcript nêu rõ; điểm quan trọng là chúng nằm trong `data`.

Ảnh của Nadia là chân dung bình thường. Ảnh của Dennis đã được **chỉnh sửa nghệ thuật**: có quầng sáng quanh mặt, vùng tròng mắt bị làm tối, góc ảnh tối hơn. Ảnh Solvay là ảnh nhóm nhiều khuôn mặt, nhiều người không nhìn thẳng camera.

---

### 🏗️ Nạp cascade classifier

```python
face_cascade = cv2.CascadeClassifier(
    'data/cascades/haarcascade_frontalface_default.xml')
```

Đây là danh sách khoảng **6000 classifier** — tức 6000 feature sẽ được thử lần lượt trên ảnh. Chỉ cần nạp file XML một lần rồi tái sử dụng. Trong thư mục cascade còn nhiều file XML khác, nhưng ở đây ta dùng bản `frontalface_default`.

Truyền **đường dẫn file XML** vào `cv2.CascadeClassifier` — nếu sai đường dẫn, object rỗng và detect sẽ không ra gì.

---

### 🔍 Hàm detect_face

```python
def detect_face(img):
    face_img = img.copy()
    face_rects = face_cascade.detectMultiScale(face_img)

    for (x, y, w, h) in face_rects:
        cv2.rectangle(face_img, (x, y), (x + w, y + h), (255, 255, 255), 10)

    return face_img
```

* `detectMultiScale()` trả về danh sách hình chữ nhật, mỗi phần tử là `(x, y, w, h)` — góc trên trái cộng width/height.
* Copy ảnh trước khi vẽ để không làm hỏng ảnh gốc.
* Vì đang làm việc với ảnh xám, rectangle dùng màu **trắng** `(255, 255, 255)`; độ dày `10`.

Chạy lần lượt trên Dennis, Nadia và Solvay. Dennis và Nadia đều **nhận đúng mặt**. Với ảnh Solvay, nó bắt được nhiều mặt nhưng **cũng có false positive** — một chi tiết kiến trúc bị nhận nhầm là mặt, và một số mặt bị khoanh **hai lần**.

---

### ⚙️ Tinh chỉnh scaleFactor và minNeighbors

Hai tham số quan trọng của `detectMultiScale`:

* **`scaleFactor`** — mức thu nhỏ ảnh ở mỗi bước quét. `1.2` là giá trị hợp lý.
* **`minNeighbors`** — số "hàng xóm" tối thiểu mà mỗi hình chữ nhật ứng viên phải giữ. Nhiều ứng viên chồng lên cùng vùng giúp khẳng định đây đúng là mặt.

```python
def detect_face(img):
    face_img = img.copy()
    face_rects = face_cascade.detectMultiScale(face_img,
                                               scaleFactor=1.2,
                                               minNeighbors=5)
    for (x, y, w, h) in face_rects:
        cv2.rectangle(face_img, (x, y), (x + w, y + h), (255, 255, 255), 10)
    return face_img
```

Kết quả sạch hơn hẳn: không còn false positive, không khoanh trùng. Cái giá: người **nhìn nghiêng** không còn được phát hiện. Đây là đánh đổi điển hình — bắt nhiều mặt nhưng lẫn rác, hay bắt ít nhưng chắc. Cứ chỉnh hai tham số để tìm điểm cân bằng.

Với ảnh đông người nhìn nhiều hướng, file XML dành cho **frontal face** sẽ không hoạt động tốt.

---

### 👁️ Eye detection

Làm y hệt nhưng đổi file XML sang `haarcascade_eye.xml`, đổi tên hàm thành `detect_eyes`, còn lại giữ nguyên. Hàm sẽ trả về các cặp mắt.

* Trên Nadia: phát hiện mắt, nhưng **nhầm cả lỗ mũi** thành mắt. Áp dụng `scaleFactor=1.2`, `minNeighbors=5` thì hết nhầm.
* Trên Dennis: **không phát hiện được mắt nào**. Lý do là ảnh đã bị chỉnh sửa — lòng trắng mắt tối gần bằng màu da, trong khi đặc trưng chính cascade tìm là **lòng trắng mắt sáng hơn vùng da xung quanh**. Đồng tử cũng bị phóng to bất thường. Đây là một trong những cạm bẫy khi dùng Haar cascade.

---

### 🎥 Chạy trên webcam

Video chỉ là chuỗi frame, nên mọi thứ làm được trên ảnh đều dùng được cho từng frame:

```python
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    frame = detect_face(frame)
    cv2.imshow('Video Face Detection', frame)

    if cv2.waitKey(1) & 0xFF == 27:   # ESC
        break

cap.release()
cv2.destroyAllWindows()
```

Kết quả: nhận mặt tốt khi nhìn thẳng, kể cả khi hơi quay đầu. Nhưng nếu đưa tay che mặt hoặc quay nghiêng quá nhiều, detector mất dấu — đúng như thiết kế, nó chỉ làm việc trong khoảng **±45 độ** phía trước.

---

### ✅ Tóm lại

Hai dòng cốt lõi: `cv2.CascadeClassifier(đường_dẫn_xml)` và `detectMultiScale(ảnh, scaleFactor, minNeighbors)`, sau đó vẽ rectangle. Nhớ ảnh phải là grayscale và khuôn mặt hướng về camera. Bài sau là project cuối section: tự động làm mờ biển số xe Nga.
