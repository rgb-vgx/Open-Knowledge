---
title: 'Template Matching: tìm ảnh mẫu chính xác trong ảnh lớn'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 42
status: edited
source: '042 - Template Matching.md'
categories:
- AI
tags: []
---

# 🐶 Template Matching: tìm ảnh mẫu chính xác trong ảnh lớn

> Nguồn: `042 - Template Matching.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257836)

Template matching là dạng **object detection** đơn giản nhất: trượt một ảnh mẫu nhỏ khắp ảnh lớn để tìm chỗ khớp. Cái giá của sự đơn giản là mẫu phải gần như **bản sao chính xác** của vùng cần tìm. Bài này mình sẽ thử sáu phương pháp so khớp khác nhau của OpenCV và xem cái nào đáng tin.

### 🧩 Ý tưởng và giới hạn

Ta có một ảnh lớn (ảnh gốc) và một **template** — một ảnh con cắt ra từ chính ảnh lớn đó, ví dụ khuôn mặt chú chó Sammy. Thuật toán trượt template qua từng vị trí và so sánh từng pixel.

* Ảnh gốc `sammy.jpg` có shape **1367 x 1025**.
* Template `sammy_face.jpg` có shape **375 x 486** — đúng bằng kích thước khuôn mặt trong ảnh lớn.

Chính vì phải có sẵn đúng vùng ảnh cần tìm nên template matching khá hạn chế so với object detection thực thụ. Nó vẫn hữu ích khi bạn đã biết chính xác mình tìm gì.

---

### 📐 Sáu cách so khớp

Mỗi phương pháp là một cách tính **correlation** giữa template và vùng ảnh đang xét. Trong notebook, danh sách phương pháp được lưu dưới dạng **chuỗi**:

```python
methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED',
           'cv2.TM_CCORR', 'cv2.TM_CCORR_NORMED',
           'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']
```

Vì chúng là chuỗi, ta dùng **`eval()`** để biến chuỗi thành hàm thật. Ví dụ `mystring = "sum"` thì `eval(mystring)` cho ra chính hàm `sum`, gọi được như bình thường. Nhờ vậy vòng lặp chỉ cần duyệt danh sách chuỗi là đủ, không phải gọi tay từng hàm.

---

### 🖼️ Đọc ảnh và xem trước

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

full = cv2.imread('data/sammy.jpg')
full = cv2.cvtColor(full, cv2.COLOR_BGR2RGB)

face = cv2.imread('data/sammy_face.jpg')
face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
```

Đổi `BGR2RGB` chỉ để matplotlib hiển thị đúng màu. Template chính là khuôn mặt Sammy đã cắt sẵn — nhỏ hơn ảnh gốc rất nhiều.

---

### 🔍 matchTemplate và heat map

Hàm chính chỉ có một dòng:

```python
res = cv2.matchTemplate(full, face, method)
```

Kết quả `res` là một **heat map**: vùng càng sáng là nơi thuật toán tin rằng khớp càng tốt. Với phần lớn phương pháp, ta tìm **giá trị lớn nhất**; riêng hai phương pháp square difference (`TM_SQDIFF`, `TM_SQDIFF_NORMED`) thì tìm **giá trị nhỏ nhất** — vì bình phương hiệu số càng nhỏ càng khớp.

---

### 🟥 Vẽ rectangle quanh vùng khớp

```python
for m in methods:
    full_copy = full.copy()
    method = eval(m)

    res = cv2.matchTemplate(full_copy, face, method)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

    if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
        top_left = min_loc
    else:
        top_left = max_loc

    height, width, channels = face.shape
    bottom_right = (top_left[0] + width, top_left[1] + height)

    cv2.rectangle(full_copy, top_left, bottom_right, (255, 0, 0), 10)
```

Điểm cần nhớ:

1. **Copy ảnh** trước khi vẽ, để không làm hỏng ảnh gốc cho vòng lặp sau.
2. **`cv2.minMaxLoc()`** trả về bốn giá trị: min value, max value, min location, max location.
3. Chọn `top_left` theo phương pháp: square difference dùng **min**, còn lại dùng **max**.
4. Bottom-right = `top_left` cộng **width** và **height** của template.

Để so sánh trực quan, dùng hai subplot cạnh nhau:

```python
plt.subplot(121)
plt.imshow(res)
plt.title('HEATMAP OF TEMPLATE MATCHING')

plt.subplot(122)
plt.imshow(full_copy)
plt.title('DETECTION OF TEMPLATE')

plt.suptitle(m)
plt.show()
```

`plt.show()` là bắt buộc — thiếu nó các subplot sẽ ghi đè lên nhau và bạn chỉ thấy hình cuối.

---

### 📊 Kết quả

Phần lớn phương pháp đều khoanh đúng khuôn mặt Sammy. Hai ngoại lệ đáng chú ý:

* **`TM_CCORR`** thường khớp sai — nó bị đánh lừa bởi vùng lông chó và các mảng màu tương tự, dù template là bản sao chính xác.
* Nhóm **normalized** cho heat map gọn hơn, gần như chỉ một điểm sáng duy nhất.

Bài học: ngay cả khi có bản sao chính xác, vẫn phải chọn đúng phương pháp cho từng cặp ảnh.

---

### ✅ Tóm lại

Công thức chỉ gồm `cv2.matchTemplate(ảnh_lớn, template, method)`, sau đó `cv2.minMaxLoc()` để lấy vị trí — nhớ đảo chiều min/max với họ `SQDIFF`. Ở bài sau, feature matching sẽ giải quyết đúng điểm yếu của phương pháp này: không cần template trùng khít.
