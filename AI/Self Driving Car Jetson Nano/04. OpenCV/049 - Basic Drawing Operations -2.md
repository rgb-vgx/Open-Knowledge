---
title: 'Vẽ hình tròn trên ảnh bằng cv2.circle'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 049
status: edited
source: '049 - Basic Drawing Operations -2.md'
categories:
- AI
tags: []
---

# ⭕ Vẽ hình tròn trên ảnh với OpenCV

> Nguồn: `049 - Basic Drawing Operations -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39652668)

Chào các bạn, tiếp nối bài vẽ đường thẳng, lần này mình sẽ vẽ hình tròn bằng hàm **circle** của OpenCV. Cách làm tương tự, chỉ khác bộ tham số, nên các bạn sẽ thấy rất quen.

### 🐍 Chuẩn bị file Python

1. Mở **Visual Studio Code**, vào project folder cũ.
2. Tạo file Python mới, đặt tên ví dụ **drawing_functions2.py**.
3. Import **cv2**, rồi đọc ảnh vào biến ma trận **image**:

```python
import cv2

image = cv2.imread("image.jpg")
```

---

### 🔧 Hàm `cv2.circle` và năm tham số

Hàm **circle** cũng nhận **năm tham số**:

1. **Ma trận output** để vẽ hình tròn — ở đây là **image**.
2. **Tọa độ tâm** của hình tròn, dạng tuple `(x, y)`. Ví dụ `(100, 80)`.
3. **Bán kính** (radius) tính bằng pixel. Ví dụ `30`; nếu để `5` thì hình tròn rất nhỏ.
4. **Màu** của hình tròn, dạng tuple.
5. **Độ dày** (thickness) của nét vẽ, ví dụ `3` pixel.

---

### 🎨 Khai báo màu trắng

Mình khai báo sẵn một tuple màu trắng cho gọn: cả ba kênh đều đặt **255**.

```python
white = (255, 255, 255)

cv2.circle(image, (100, 80), 30, white, 3)
```

---

### 👁️ Hiển thị và kiểm tra kết quả

Hiển thị bằng **`cv2.imshow`** với cửa sổ `"circle"`, rồi giữ cửa sổ bằng **`cv2.waitKey(0)`**:

```python
cv2.imshow("circle", image)
cv2.waitKey(0)
```

Chạy code, các bạn sẽ thấy một hình tròn màu trắng vẽ trên ảnh gốc.

---

### 🔍 Thử thay đổi tham số

* Đổi **radius** từ `30` thành **`100`** — chạy lại, hình tròn to hơn hẳn.
* Đổi **tọa độ y của tâm** thành **`250`** — chạy lại, hình tròn dịch xuống dưới đúng như mong muốn.

---

Vậy là mình đã vẽ được hình tròn bằng `cv2.circle` và hiểu cách chỉnh tâm, bán kính, màu và độ dày. Bài sau mình sẽ tiếp tục với một phép vẽ cơ bản nữa.
