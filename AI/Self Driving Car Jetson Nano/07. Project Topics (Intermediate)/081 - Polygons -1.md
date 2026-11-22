---
title: 'Tạo polygon ROI — bước đầu với mảng toạ độ'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 081
status: edited
source: '081 - Polygons -1.md'
categories:
- AI
tags: []
---

# 📐 Tạo polygon ROI — bước đầu với mảng toạ độ

> Nguồn: `081 - Polygons -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43845782)

Chào các bạn, bài này mình sẽ học cách tạo **polygon** — vùng không gian do chính mình chọn trong ảnh. Ở các bài ROI trước, mình cắt ảnh bằng hình chữ nhật đơn giản; lần này mình sẽ cắt chi tiết và "đẹp" hơn bằng đa giác.

### 🔺 Polygon là gì

* Có thể hiểu **polygon** là những **vùng không gian được chọn** trong ảnh.
* Trước đây, khi làm ROI mình cắt trực tiếp bằng slicing.
* Bây giờ mình thực hiện việc cắt theo cách **chi tiết hơn**, dùng các đỉnh của đa giác.

Với xe tự lái, polygon cho phép vùng quan tâm ôm đúng hình dạng làn đường thay vì một khung chữ nhật thô.

---

### 🐍 Chuẩn bị file và hàm `roi`

Tạo file Python mới tên **polygons.py**. Import hai module: **cv2** và **numpy** (dùng tắt là **np**).

```python
import cv2
import numpy as np
```

Tiếp theo định nghĩa một hàm tên **roi**, nhận **một tham số** là ảnh **img**.

```python
def roi(img):
    pass
```

---

### 📏 Lấy chiều cao ảnh

Camera của xe được đặt hướng xuống, nên ảnh nhận được có toạ độ gắn với **chiều cao tổng** của ảnh. Nhớ rằng điểm trên cùng bên trái của ảnh là **`(0, 0)`**.

Vì vậy mình lấy chiều cao ảnh bằng phần tử thứ **0** của thuộc tính **shape**:

```python
height = img.shape[0]
```

---

### 🔷 Tạo mảng bốn đỉnh polygon

Mình tạo biến **polygons** bằng **`np.array`**, với **hai cặp ngoặc vuông lồng nhau** — vì ảnh là hai chiều, cần hai chiều để biểu diễn.

```python
polygons = np.array([[
    (310, 225),
    (390, 225),
    (390, height),
    (310, height),
]])
```

Bốn điểm mô tả một hình thang:

1. Điểm trên trái — **`(310, 225)`**.
2. Điểm trên phải — **`(390, 225)`**.
3. Điểm dưới phải — **`(390, height)`**.
4. Điểm dưới trái — **`(310, height)`**.

Các bạn lưu ý: đây là những giá trị mình đã tính trước cho ảnh cụ thể của mình. **Ảnh khác sẽ cần toạ độ khác** — các bạn phải chỉnh lại theo ảnh và vị trí camera của mình.

---

Vậy là các bạn đã có bước đầu tiên của polygon: hàm `roi`, chiều cao ảnh và mảng bốn đỉnh. Bài sau mình sẽ dùng polygon này để tạo mask và chỉ giữ lại vùng làn đường.
