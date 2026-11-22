---
title: 'Code tìm và vẽ contour trên ảnh cao tốc'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 074
status: edited
source: '074 - Contours (Coding).md'
categories:
- AI
tags: []
---

# 🐍 Code tìm và vẽ contour trên ảnh cao tốc

> Nguồn: `074 - Contours (Coding).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43703690)

Chào các bạn, bài này mình sẽ code trọn quy trình contour trên ảnh highway: đọc ảnh, chuyển ảnh xám, phát hiện biên, tìm contour rồi vẽ chúng ra. Quy trình khá đơn giản, các bạn làm theo đúng thứ tự là được.

### 🗺️ Bốn bước của quy trình

1. Chuyển ảnh sang **định dạng xám**.
2. Thực hiện **phát hiện biên** — bước rất quan trọng cho contour.
3. **Tìm contour** từ ảnh biên.
4. **Vẽ contour** lên ảnh.

Mình dùng ảnh **highway** đã thêm vào project folder. Trong project, tạo file Python mới, ví dụ **cnt.py**.

---

### 📥 Đọc ảnh, chuyển xám và phát hiện biên

Đầu tiên import OpenCV, đọc ảnh `img.jpg`, rồi chuyển sang ảnh xám bằng **`cv2.cvtColor`** với cờ **`cv2.COLOR_BGR2GRAY`**.

```python
import cv2

image = cv2.imread("img.jpg")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

canny = cv2.Canny(gray, 100, 255)
```

Hàm Canny nhận ba tham số như bài trước: ảnh xám **gray**, ngưỡng thứ nhất **100**, ngưỡng thứ hai **255**.

---

### 🔍 Tìm contour từ ảnh biên

Mình tạo hai biến: một biến giữ **contours**, một biến dùng dấu gạch dưới **`_`** vì không cần hierarchy.

```python
contours, _ = cv2.findContours(
    canny,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE,
)
```

* **`canny`** là ảnh đầu vào.
* **`cv2.RETR_EXTERNAL`** chỉ lấy contour ngoài cùng.
* **`cv2.CHAIN_APPROX_SIMPLE`** nén số điểm của contour.

---

### 🖍️ Vẽ contour lên ảnh gốc

Tiếp theo gọi **`cv2.drawContours`** với năm tham số:

* Ảnh cần vẽ: **`image`**.
* Danh sách contour: **`contours`**.
* Chỉ số contour: **`-1`** để vẽ tất cả.
* Màu: xanh lá — **`(0, 255, 0)`**.
* Độ dày: **2** pixel.

```python
cv2.drawContours(image, contours, -1, (0, 255, 0), 2)
```

---

### 👁️ Hiển thị kết quả

Mình hiển thị hai cửa sổ: một cho ảnh contour, một cho ảnh Canny để đối chiếu, và gọi `waitKey(0)` giữ ảnh trên màn hình.

```python
cv2.imshow("contours", image)
cv2.imshow("canny", canny)
cv2.waitKey(0)
```

Khi chạy code, cửa sổ **canny** cho thấy kết quả phát hiện biên, còn cửa sổ **contours** cho thấy các đường bao được vẽ đè lên ảnh gốc.

---

Vậy là các bạn đã hoàn thành thao tác contour bằng OpenCV trên Jetson Nano, từ ảnh gốc tới ảnh có đường bao xanh lá. Bài sau mình sẽ chuyển sang **thresholding** — kỹ thuật giúp các vạch đường nổi bật hơn nữa.
