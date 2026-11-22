---
title: 'Vẽ bằng chuột với callback: click để vẽ hình tròn'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 16
status: edited
source: '016 - Direct Drawing on Images with a mouse - Part One.md'
categories:
- AI
tags: []
---

# 🖱️ Vẽ trực tiếp bằng chuột với callback

> Nguồn: `016 - Direct Drawing on Images with a mouse - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257626)

Ba bài liên tiếp sẽ nói về việc vẽ trực tiếp lên ảnh bằng chuột. Phần một là nối một **callback function** vào ảnh, phần hai thêm nhiều event, phần ba mở rộng sang thao tác kéo chuột. Với cả ba phần, nên chạy bằng **Python script** thay vì cell notebook — đặc biệt trên macOS và Linux.

### 🧩 Cấu trúc code

Toàn bộ code nên nằm trong một cell hoặc một script, chia làm hai khối:

1. Khối định nghĩa function xử lý sự kiện.
2. Khối hiển thị ảnh bằng OpenCV.

```python
import cv2
import numpy as np

img = np.zeros((512, 512, 3), dtype=np.int8)

# --- phần function ---
def draw_circle(event, x, y, flags, param):
    pass

# --- phần hiển thị ---
```

### 🪟 namedWindow và setMouseCallback

Điểm mấu chốt là **tên cửa sổ** phải trùng khớp ở ba nơi: `namedWindow`, `setMouseCallback` và `imshow`.

```python
cv2.namedWindow('my_drawing')
cv2.setMouseCallback('my_drawing', draw_circle)
```

`cv2.setMouseCallback` nhận tên cửa sổ và **hàm callback** — truyền tên hàm, không gọi hàm, nên không có cặp ngoặc tròn thứ hai sau `draw_circle`. Nhờ tên cửa sổ trùng nhau, ảnh đang hiển thị được nối với hàm này.

Hàm callback luôn nhận các tham số:

* `event`: chuột vừa làm gì — click trái, click phải, double click...
* `x`, `y`: vị trí chuột.
* `flags`, `param`: thông tin phụ.

OpenCV tự điền các giá trị này khi sự kiện xảy ra, nên ta chỉ định nghĩa hàm mà không tự gọi.

### ⭕ Bắt EVENT_LBUTTONDOWN và vẽ circle

```python
def draw_circle(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.circle(
            img,
            center=(x, y),
            radius=30,   # bán kính tự chọn, bài giảng không nêu con số cụ thể
            color=(0, 255, 0),
            thickness=-1,
        )
```

`EVENT_LBUTTONDOWN` là sự kiện **nhấn nút trái xuống**, không phải lúc nhả nút. Đây là khác biệt quan trọng vì các bài sau còn dùng cả `LBUTTONDOWN` lẫn `LBUTTONUP`. Khi sự kiện khớp, lấy ngay `x, y` hiện tại làm tâm và vẽ một hình tròn xanh lá đặc (`thickness=-1`). Bán kính có thể chọn tùy ý.

### ▶️ Vòng lặp hiển thị

```python
while True:
    cv2.imshow('my_drawing', img)
    if cv2.waitKey(20) & 0xFF == 27:
        break

cv2.destroyAllWindows()
```

Chờ 20 milliseconds mỗi vòng và thoát khi nhấn Escape. Chạy code, click vào cửa sổ là một hình tròn xanh xuất hiện đúng vị trí; nhấn Escape để đóng.

Cần lưu ý: tên cửa sổ nếu có dấu cách sẽ lỗi, và rất dễ gõ sai — có thể copy trực tiếp từ notebook đi kèm khóa học.

### 💡 Vì sao nền ảnh hơi xám

Nếu ảnh nền trông không đen tuyệt đối, đó là do dùng `np.int8`. Bỏ chỉ định integer (để NumPy mặc định) rồi chạy lại sẽ thấy nền đen hẳn. Tùy nhu cầu, nhưng cần biết để không bối rối ở các bài sau.

Bài tiếp theo sẽ thêm event thứ hai để phân biệt chuột trái và chuột phải.
