---
title: 'Code optical flow thưa với Lucas-Kanade và goodFeaturesToTrack'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 59
status: edited
source: '059 - Optical Flow Coding with OpenCV - Part One.md'
categories:
- AI
tags: []
---

# 🎯 Track điểm góc bằng Lucas-Kanade trong OpenCV

> Nguồn: `059 - Optical Flow Coding with OpenCV - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12503638)

Bài này mình code **sparse optical flow** bằng phương pháp Lucas-Kanade: chọn 10 góc mạnh nhất trên frame đầu bằng corner detection, rồi track chúng qua từng frame và vẽ lại vệt di chuyển.

### ⚙️ Cấu hình corner detection và Lucas-Kanade

Bắt đầu với hai dictionary tham số. Cái đầu là của **Shi-Tomasi Corner Detection** (`cv2.goodFeaturesToTrack`), cái sau là của hàm optical flow:

```python
import numpy as np
import cv2

corner_track_params = dict(maxCorners=10, qualityLevel=0.3,
                           minDistance=7, blockSize=7)

lk_params = dict(winSize=(200, 200), maxLevel=2,
                 criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT,
                           10, 0.03))
```

Ý nghĩa các tham số:

* **`maxCorners`** — số góc tối đa cần lấy, ở đây là 10.
* **`qualityLevel`** — ngưỡng chất lượng, 0.3.
* **`minDistance`** — khoảng cách tối thiểu giữa các góc, 7.
* **`blockSize`** — kích thước vùng xét, 7.

Trong `lk_params`, **`winSize`** là cửa sổ tìm kiếm. Đây là một đánh đổi: cửa sổ nhỏ thì nhạy với nhiễu và dễ bỏ lỡ chuyển động lớn giữa hai frame; cửa sổ lớn bắt được chuyển động lớn nhưng lại kém nhạy với chuyển động nhỏ. Giảng viên dùng 200×200.

**`maxLevel=2`** cho phép dùng **image pyramid**: level 1 là ảnh giảm nửa độ phân giải, level 2 là một phần tư. Để 0 thì chỉ dùng ảnh gốc.

**`criteria`** ghép hai điều kiện dừng bằng toán tử `|`: tối đa 10 vòng lặp (`TERM_CRITERIA_COUNT`) hoặc epsilon 0.03 (`TERM_CRITERIA_EPS`). Cái nào tới trước thì dừng — tức là đánh đổi giữa tốc độ và độ chính xác.

---

### 📷 Lấy frame đầu và chọn điểm

```python
cap = cv2.VideoCapture(0)
ret, prev_frame = cap.read()

prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)

prevPts = cv2.goodFeaturesToTrack(prev_gray, mask=None, **corner_track_params)

mask = np.zeros_like(prev_frame)
```

Frame đầu tiên được đóng vai "previous frame". Ta chuyển sang grayscale vì optical flow làm việc trên ảnh xám. `goodFeaturesToTrack` nhận ảnh xám, không mask, và toàn bộ tham số trong `corner_track_params` nhờ cú pháp `**`.

`mask` là ảnh đen cùng kích thước frame, chỉ dùng để **vẽ các đường tracking** rồi cộng lại vào frame — không liên quan đến việc track.

---

### 🔁 Vòng lặp: tính optical flow

```python
while True:
    ret, frame = cap.read()
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    nextPts, status, err = cv2.calcOpticalFlowPyrLK(
        prev_gray, frame_gray, prevPts, None, **lk_params)
```

Hàm **`cv2.calcOpticalFlowPyrLK`** (Pyramid Lucas-Kanade) trả về ba thứ: điểm mới, trạng thái và sai số. Ta truyền `None` cho `nextPts` vì muốn hàm tự tính và trả về.

`status` là vector mà mỗi phần tử bằng **1** nếu tìm thấy flow cho điểm tương ứng, ngược lại bằng **0**. Dựa vào đó ta lọc ra các cặp điểm còn track được:

```python
    good_new = nextPts[status == 1]
    good_prev = prevPts[status == 1]
```

Một lỗi đánh máy rất dễ mắc mà giảng viên nhắc lại: phải viết `status == 1` (so sánh), không phải `status = 1` (gán).

---

### 🖍️ Vẽ đường và điểm

```python
    for i, (new, prev) in enumerate(zip(good_new, good_prev)):
        x_new, y_new = new.ravel()
        x_prev, y_prev = prev.ravel()

        mask = cv2.line(mask, (int(x_new), int(y_new)),
                        (int(x_prev), int(y_prev)), (0, 255, 0), 3)
        frame = cv2.circle(frame, (int(x_new), int(y_new)),
                           8, (0, 0, 255), -1)
```

`ravel()` của NumPy làm phẳng mảng 2 chiều thành 1 chiều, tương đương `reshape(-1)` và giữ nguyên thứ tự — nhờ đó lấy được cặp `x, y`.

Mỗi điểm mới được nối với vị trí cũ bằng đường xanh trên `mask`, còn vị trí hiện tại được đánh dấu bằng chấm đỏ đặc (`thickness=-1`) trên frame.

---

### 🪟 Hiển thị và cập nhật trạng thái

```python
    img = cv2.add(frame, mask)
    cv2.imshow('tracking', img)

    k = cv2.waitKey(30) & 0xFF
    if k == 27:
        break

    prev_gray = frame_gray.copy()
    prevPts = good_new.reshape(-1, 1, 2)

cv2.destroyAllWindows()
cap.release()
```

Bước quan trọng nhất là **cập nhật** `prev_gray` và `prevPts` sau mỗi vòng: frame hiện tại trở thành frame trước, và các điểm tốt trở thành điểm cần track tiếp. `reshape(-1, 1, 2)` đưa mảng về đúng dạng mà hàm Lucas-Kanade yêu cầu.

---

### 💡 Kết quả và lưu ý

Khi chạy, các bạn nên nhìn thẳng vào camera để bộ detect góc bắt được mắt, lỗ mũi và vài góc trên mặt. Kết quả là các điểm được track kèm vệt xanh nối vị trí cũ và mới.

Nếu bạn di chuyển quá nhanh hoặc một điểm biến mất khỏi khung hình, thuật toán sẽ mất dấu điểm đó — như trường hợp giảng viên quay mặt đi và mất một bên mắt. Đây là giới hạn cố hữu của sparse optical flow.

Bài sau mình thay đúng một dòng để chuyển sang dense optical flow với Farneback.
