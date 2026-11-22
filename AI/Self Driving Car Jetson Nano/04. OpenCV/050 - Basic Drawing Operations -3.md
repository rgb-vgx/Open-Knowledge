---
title: 'Vẽ hình chữ nhật trên ảnh bằng cv2.rectangle'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 050
status: edited
source: '050 - Basic Drawing Operations -3.md'
categories:
- AI
tags: []
---

# 🔲 Vẽ hình chữ nhật trên ảnh với OpenCV

> Nguồn: `050 - Basic Drawing Operations -3.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39652670)

Chào các bạn, bài này mình sẽ vẽ hình chữ nhật bằng OpenCV. Với dự án xe tự lái, hàm này rất đáng chú ý vì khi phát hiện làn đường mình sẽ bao quanh vùng phát hiện bằng một hình chữ nhật — nên các bạn theo dõi kỹ nhé.

### 🐍 Chuẩn bị file Python

1. Vào project folder, tạo file Python mới, đặt tên ví dụ **drawing_functions3.py**.
2. Import **cv2**, rồi đọc ảnh vào biến ma trận **matrix**:

```python
import cv2

matrix = cv2.imread("image.jpg")
```

### 🔧 Hàm `cv2.rectangle` và năm tham số

Hàm **rectangle** nhận **năm tham số**. Mình khai báo sẵn các giá trị ra ngoài cho dễ đọc:

1. **Ma trận output** để vẽ — ở đây là **matrix**.
2. **Điểm bắt đầu** — chính là **góc trên bên trái** của hình chữ nhật.
3. **Điểm kết thúc** — chính là **góc dưới bên phải**.
4. **Màu** của hình chữ nhật, dạng tuple.
5. **Độ dày** (thickness) của nét vẽ.

```python
start_point = (100, 50)
end_point = (300, 350)
green = (0, 255, 0)
thickness = 3

cv2.rectangle(matrix, start_point, end_point, green, thickness)
```

Với tuple màu xanh lá là `(0, 255, 0)`, mình sẽ có một hình chữ nhật viền xanh.

### 👁️ Hiển thị kết quả

Mình khai báo tên cửa sổ thành biến cho gọn, rồi hiển thị và giữ cửa sổ:

```python
window_name = "rectangle"

cv2.imshow(window_name, matrix)
cv2.waitKey(0)
```

Chạy code, không báo lỗi, và các bạn sẽ thấy hình chữ nhật xanh bao quanh vùng `(100, 50)` đến `(300, 350)` trên ảnh gốc.

---

Vậy là mình đã vẽ được hình chữ nhật bằng `cv2.rectangle` — đúng thứ sẽ dùng để bao vùng phát hiện làn đường về sau. Bài sau mình chuyển sang viết chữ lên ảnh.
