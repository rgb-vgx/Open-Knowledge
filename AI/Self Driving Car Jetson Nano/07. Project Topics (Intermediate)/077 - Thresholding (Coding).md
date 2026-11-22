---
title: 'Code thresholding trên Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 077
status: edited
source: '077 - Thresholding (Coding).md'
categories:
- AI
tags: []
---

# 🐍 Code thresholding trên Jetson Nano

> Nguồn: `077 - Thresholding (Coding).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43782798)

Chào các bạn, bài này mình sẽ viết code thresholding chạy trên Jetson Nano. Trong dự án xe tự lái, mình sẽ **kết hợp** ma trận từ thresholding với ma trận từ phát hiện biên — chính sự kết hợp này cho kết quả chính xác hơn.

### 🔌 Kết nối tới Jetson Nano

1. Mở kết nối tới **Jetson Nano** qua địa chỉ IP của board.
2. Nhập mật khẩu, bấm **OK** để vào board.
3. Di chuyển tới **project folder**, tạo file Python mới, ví dụ **thresholding.py**.

---

### 📥 Đọc ảnh và chuyển sang ảnh xám

Import OpenCV, đọc ảnh `img.jpg`, sau đó chuyển sang ảnh xám bằng `cv2.cvtColor` với cờ `cv2.COLOR_BGR2GRAY` — thresholding bắt buộc thực hiện trên ảnh xám.

```python
import cv2

image = cv2.imread("img.jpg")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
```

---

### ⚙️ Gọi hàm threshold

Tạo hai biến: biến đầu gán **`_`** vì không dùng, biến thứ hai là ma trận kết quả — mình đặt tên **thresh** (các bạn có thể đổi tên khác).

```python
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
```

Bốn tham số lần lượt là:

* Ảnh xám **gray**.
* Ngưỡng thứ nhất **127** — với ứng dụng đơn giản này mình để mặc định; thực tế nên chỉnh theo ảnh.
* Giá trị lớn nhất **255**.
* Kiểu threshold **`cv2.THRESH_BINARY`** — kiểu thường dùng nhất.

---

### 👁️ Hiển thị ảnh nhị phân và ảnh gốc

Mình hiển thị ma trận **thresh** ở cửa sổ **binary**, giữ ảnh bằng `cv2.waitKey(0)`, rồi hiển thị thêm ảnh gốc ở cửa sổ **original** để so sánh.

```python
cv2.imshow("binary", thresh)
cv2.imshow("original", image)
cv2.waitKey(0)
```

Khi chạy, cửa sổ **binary** chỉ còn đen trắng — các vùng sáng như vạch đường được tách hẳn ra; cửa sổ **original** là ảnh màu ban đầu.

---

Vậy là các bạn đã biết cách threshold một ảnh bất kỳ bằng OpenCV. Bài sau mình sẽ dùng hàm **add** để cộng ma trận Canny và ma trận threshold lại với nhau — bước quan trọng để tìm làn đường chính xác hơn.
