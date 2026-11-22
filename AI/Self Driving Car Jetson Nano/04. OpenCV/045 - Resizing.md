---
title: 'Thay đổi kích thước ảnh với cv2.resize'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 045
status: edited
source: '045 - Resizing.md'
categories:
- AI
tags: []
---

# 📐 Thay đổi kích thước ảnh với OpenCV

> Nguồn: `045 - Resizing.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39615606)

Chào các bạn, bài này mình sẽ học cách đổi kích thước một ảnh bất kỳ bằng OpenCV. Đây là thao tác rất hay dùng khi ảnh đầu vào quá lớn và mình cần thu nhỏ lại cho dễ xử lý.

### 🐍 Chuẩn bị file Python

1. Mở editor, vào lại **project folder** cũ.
2. Tạo file Python mới, đặt tên ví dụ **resizing.py**.

Để đổi kích thước ảnh, mình cần học một hàm mới là **resize**. Trước khi gọi hàm này, phải đọc ảnh vào trước, và gán kết quả cho một biến mới. Ngoài **cv2**, bài này mình import thêm module **time** để tạo khoảng chờ khi hiển thị.

```python
import cv2
import time

img = cv2.imread("image.jpg")
```

---

### 🔧 Gọi hàm `cv2.resize` với hai tham số

Mình tạo biến mới, ví dụ **resized_image**, rồi gọi `cv2.resize`. Hàm nhận **hai tham số**:

1. **Biến ma trận ảnh** cần đổi kích thước — ở đây là **img**.
2. **Kích thước mới**, định nghĩa dưới dạng **tuple** gồm **width** và **height**.

Khai báo hai biến kích thước trước cho gọn, ví dụ **width = 320** và **height = 240**, rồi truyền vào tuple theo đúng thứ tự width trước, height sau:

```python
width = 320
height = 240

resized_image = cv2.resize(img, (width, height))
```

Chạy thử, code không báo lỗi.

---

### 👁️ Hiển thị ảnh gốc và ảnh đã resize

Để thấy rõ khác biệt, mình hiển thị lần lượt cả hai ảnh, giữa hai lần có một khoảng chờ:

1. Gọi **`cv2.imshow`** với cửa sổ tên `"original size"` để hiện ảnh gốc **img**.
2. Gọi **`time.sleep`** chờ **2 giây**.
3. Gọi **`cv2.imshow`** lần nữa với cửa sổ `"resized image"` để hiện ảnh đã resize.
4. Cuối cùng gọi **`cv2.waitKey(0)`** để giữ cửa sổ lại đến khi bấm phím.

```python
cv2.imshow("original size", img)
time.sleep(2)
cv2.imshow("resized image", resized_image)
cv2.waitKey(0)
```

Chạy code, các bạn sẽ thấy cửa sổ ảnh gốc hiện trước, sau 2 giây đến ảnh đã thu nhỏ. So sánh hai cửa sổ là thấy ngay tác dụng của `resize`.

---

Vậy là mình đã biết đổi kích thước ảnh bằng `cv2.resize` với tuple width, height. Bài sau mình sẽ chuyển sang làm việc với các định dạng màu của ảnh.
