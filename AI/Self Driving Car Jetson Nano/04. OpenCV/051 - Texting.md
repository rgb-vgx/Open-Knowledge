---
title: 'Viết chữ lên ảnh bằng cv2.putText'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 051
status: edited
source: '051 - Texting.md'
categories:
- AI
tags: []
---

# 🔤 Viết chữ lên ảnh với OpenCV

> Nguồn: `051 - Texting.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39664740)

Chào các bạn, bài này mình sẽ in một dòng chữ lên ảnh bằng hàm **putText** của OpenCV. Kỹ năng này sẽ dùng khi cần ghi chú trạng thái hay kết quả xử lý trực tiếp lên khung hình.

### 🐍 Chuẩn bị file Python

1. Mở **Visual Studio Code**, vào project folder cũ.
2. Tạo file Python mới, đặt tên ví dụ **texting.py**.
3. Import **cv2** và đọc ảnh vào biến **img**:

```python
import cv2

img = cv2.imread("image.jpg")
```

### 🔧 Hàm `cv2.putText` và bảy tham số

Hàm **putText** nhận **bảy tham số**:

1. **Ma trận output** — ở đây là **img**.
2. **Chuỗi text** cần vẽ, dạng chuỗi. Ví dụ `"hello"`.
3. **Tọa độ góc dưới bên trái** của dòng chữ, dạng tuple `(x, y)`. Ví dụ `(30, 100)`.
4. **Kiểu font** — ví dụ **`cv2.FONT_HERSHEY_SIMPLEX`**.
5. **Font scale** — hệ số nhân với kích thước nền của font. Ví dụ `1`.
6. **Màu** của chữ, dạng tuple. Màu xanh dương theo BGR là `(255, 0, 0)`.
7. **Độ dày** (thickness) của chữ. Ví dụ `3`.

```python
cv2.putText(img, "hello", (30, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)
```

### 👁️ Hiển thị và kiểm tra kết quả

Hiển thị ảnh bằng **`cv2.imshow`** rồi giữ cửa sổ bằng **`cv2.waitKey(0)`**:

```python
cv2.imshow("text", img)
cv2.waitKey(0)
```

Chạy code, các bạn sẽ thấy dòng chữ **"hello"** màu xanh dương nằm trên ảnh.

### 🔍 Thử tăng kích thước chữ

Đổi **font scale** từ `1` thành **`2`** rồi chạy lại — chữ sẽ to hơn hẳn so với trước.

---

Vậy là mình đã in được chữ lên ảnh bằng `cv2.putText`, nắm được vị trí góc dưới bên trái, font, scale, màu và độ dày. Bài sau mình sẽ xem cách đọc luồng hình từ **CSI camera**.
