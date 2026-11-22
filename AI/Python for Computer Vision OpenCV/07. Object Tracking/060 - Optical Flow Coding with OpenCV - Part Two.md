---
title: 'Dense optical flow với Farneback — tô màu theo hướng chuyển động'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 60
status: edited
source: '060 - Optical Flow Coding with OpenCV - Part Two.md'
categories:
- AI
tags: []
---

# 🌈 Dense optical flow với Farneback trong OpenCV

> Nguồn: `060 - Optical Flow Coding with OpenCV - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12503982)

Tiếp nối phần sparse, bài này mình tính **dense optical flow** cho toàn bộ ảnh bằng `cv2.calcOpticalFlowFarneback()`, rồi chuyển vector chuyển động sang hệ tọa độ cực để tô màu: hướng quyết định **hue**, độ lớn quyết định **value**.

### 🧮 Chuẩn bị frame và mask HSV

```python
import numpy as np
import cv2

cap = cv2.VideoCapture(0)
ret, first_frame = cap.read()
prev_gray = cv2.cvtColor(first_frame, cv2.COLOR_BGR2GRAY)

hsv_mask = np.zeros_like(first_frame)
hsv_mask[:, :, 1] = 255
```

Ta giữ frame đầu làm `prev_gray`. `hsv_mask` là ảnh cùng kích thước frame, khởi tạo toàn 0, sau đó đặt **kênh saturation (kênh 1) bằng 255** — tức là mọi pixel đều bão hòa tối đa, sẵn sàng nhận hue và value ở các bước sau.

---

### 🌊 Tính dense flow

```python
while True:
    ret, frame = cap.read()
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    flow = cv2.calcOpticalFlowFarneback(prev_gray, frame_gray, None,
                                        0.5, 3, 15, 3, 5, 1.2, 0)
```

Hàm nhận ảnh xám trước và hiện tại, `None` cho flow đầu ra, cùng một loạt tham số mặc định: `pyr_scale=0.5`, `levels=3`, `winsize=15`, `iterations=3`, `poly_n=5`, `poly_sigma=1.2`, `flags=0`. Giảng viên khuyến khích dùng luôn bộ mặc định này vì nó chạy tốt với phần lớn video đầu vào.

Kết quả `flow` chứa thông tin vector Descartes: với mỗi pixel là một vector `(x, y)` chỉ hướng và độ lớn chuyển động.

---

### 🧭 Từ Descartes sang cực

```python
    mag, ang = cv2.cartToPolar(flow[..., 0], flow[..., 1],
                               angleInDegrees=True)
```

`cv2.cartToPolar()` nhận hai kênh `x`, `y` và trả về **magnitude** cùng **angle**. Mặc định góc trả về bằng radian, nên phải bật `angleInDegrees=True` để có độ.

---

### 🎨 Gán màu theo hướng

```python
    hsv_mask[..., 0] = ang / 2
    hsv_mask[..., 2] = cv2.normalize(mag, None, 0, 255, cv2.NORM_MINMAX)

    bgr = cv2.cvtColor(hsv_mask, cv2.COLOR_HSV2BGR)
    cv2.imshow('frame', bgr)
```

Với ảnh HSV 8-bit, hue của OpenCV nằm trong khoảng 0–179, còn góc là 0–360, nên chia đôi góc để vừa thang. Việc này cũng giúp phân biệt trái/phải/trên/dưới rõ hơn so với dùng góc thô.

Độ lớn được chuẩn hóa về 0–255 bằng `cv2.normalize()` với `NORM_MINMAX` để làm value. Cuối cùng chuyển `hsv_mask` về BGR vì `cv2.imshow()` hiển thị theo BGR.

---

### ⌨️ Thoát và cập nhật

```python
    k = cv2.waitKey(10) & 0xFF
    if k == 27:
        break

    prev_gray = frame_gray

cap.release()
cv2.destroyAllWindows()
```

Nhấn **Escape** để thoát. Sau mỗi vòng, frame hiện tại thành frame trước để so sánh ở vòng kế tiếp.

---

### 👀 Kết quả quan sát được

Khi giảng viên di chuyển từ trái sang phải, vùng chuyển động hiện **màu đỏ**; đi ngược từ phải sang trái thì thành **màu xanh**. Di chuyển lên cho màu **tím**, xuống cho màu **xanh lá**. Cùng một hướng thì cùng một màu, bất kể vật thể là gì.

Nền đứng yên sẽ đen hoàn toàn, nên bạn chỉ thấy những gì đang chuyển động. Nếu cố đứng yên tuyệt đối, thuật toán vẫn bắt được các rung động rất nhỏ.

---

### 💡 Tóm lại

* `calcOpticalFlowFarneback` cho flow dày đặc trên toàn ảnh.
* `cartToPolar` đổi vector sang độ lớn và góc.
* Hue = góc/2, value = độ lớn chuẩn hóa, saturation = 255.

Bài sau mình chuyển sang nhóm thuật toán tracking cổ điển khác: **MeanShift** và **CamShift**.

> ⚠️ Cần kiểm chứng: transcript gốc của bài này là bản dịch máy sang tiếng Ả Rập, một số con số tham số của `calcOpticalFlowFarneback` có thể bị sai lệch khi chuyển ngữ; các giá trị ghi trên đây khớp với chữ ký hàm trong tài liệu OpenCV nhưng nên đối chiếu lại notebook gốc trước khi dùng cho video khác.
