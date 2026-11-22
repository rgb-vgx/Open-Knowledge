---
title: 'Shi-Tomasi Corner Detection với goodFeaturesToTrack'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 44
status: edited
source: '044 - Corner Detection - Part Two - Shi-Tomasi Detection.md'
categories:
- AI
tags: []
---

# 🎯 Shi-Tomasi Corner Detection với goodFeaturesToTrack

> Nguồn: `044 - Corner Detection - Part Two - Shi-Tomasi Detection.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12326766)

Thuật toán Shi-Tomasi ra đời năm 1994 từ bài báo "Good Features to Track", chỉnh lại một chút so với Harris và cho kết quả tốt hơn. Trong OpenCV, tên hàm giữ nguyên tiêu đề bài báo: **`cv2.goodFeaturesToTrack()`**. Cách dùng gọn hơn Harris, nhưng đổi lại nó không tự đánh dấu góc — ta phải tự vẽ.

### 🔧 Gọi goodFeaturesToTrack

```python
import cv2
import numpy as np

corners = cv2.goodFeaturesToTrack(gray_flat_chess, 5, 0.01, 10)
```

Ba tham số sau ảnh xám:

1. **Số góc tối đa** cần trả về — ở đây là `5`. Thuật toán sẽ chọn 5 góc "tốt nhất" theo chất lượng. Đây là tham số bạn quan tâm nhất khi dùng hàm.
2. **`qualityLevel = 0.01`** — ngưỡng chất lượng. Giá trị này nhân với chất lượng góc tốt nhất (về mặt toán học là **eigenvalue nhỏ nhất**, tức phản hồi của hàm Harris); góc nào dưới ngưỡng sẽ bị loại.
3. **`minDistance = 10`** — khoảng cách tối thiểu giữa các góc được chọn, tránh dồn cụm.

Nếu không muốn giới hạn số góc, truyền **số âm** — hàm sẽ trả về tất cả góc nó tìm thấy. Ngoài ra, tài liệu ghi rõ `0.01` và `10` là hai giá trị mặc định tốt, cứ dùng rồi tinh chỉnh sau.

---

### ⚠️ Phải tự vẽ góc

Khác với `cv2.cornerHarris()`, hàm này **không** tô sẵn góc lên ảnh. Kết quả trả về là mảng toạ độ dạng **float**, nên phải chuyển về integer trước khi vẽ:

```python
corners = np.int0(corners)

for i in corners:
    x, y = i.ravel()
    cv2.circle(flat_chess, (x, y), 3, (255, 0, 0), -1)
```

* **`np.int0()`** ép tất cả toạ độ thành integer để `cv2.circle()` nhận được.
* **`i.ravel()`** làm phẳng mảng con, tách ra cặp `(x, y)`.
* **`cv2.circle(..., 3, (255, 0, 0), -1)`** vẽ chấm bán kính 3, màu đỏ, `-1` để tô đầy.
* Vẽ lên **ảnh màu** `flat_chess`, không phải ảnh xám.

---

### 🔢 Thử với nhiều góc hơn

Đổi tham số đầu từ `5` thành `64` rồi chạy lại trên bàn cờ phẳng: hàm trả về toàn bộ góc tốt nhất nó tìm được, thực tế ít hơn 64. Điều này cho thấy tham số đầu chỉ là **giới hạn trên**, không phải số góc bắt buộc.

Với ảnh bàn cờ thật, dùng `80` góc:

```python
corners = cv2.goodFeaturesToTrack(gray_real_chess, 80, 0.01, 10)
```

Kết quả vẫn bỏ sót một số góc lớn trên bàn. Tăng lên **100** thì bắt được nhiều góc bàn hơn, nhưng đồng thời bắt thêm càng nhiều điểm trên quân cờ. Đây là đánh đổi quen thuộc: muốn nhiều góc hơn thì phải chấp nhận thêm "góc giả".

---

### ✅ Tóm lại

Chỉ cần một lời gọi `cv2.goodFeaturesToTrack(ảnh_xám, maxCorners, 0.01, 10)`, sau đó `np.int0()` + `ravel()` + `cv2.circle()` để hiển thị. Nhớ vẽ lên ảnh màu gốc, đừng vẽ lên ảnh xám. Bài tiếp theo ta mở rộng sang edge detection với Canny.
