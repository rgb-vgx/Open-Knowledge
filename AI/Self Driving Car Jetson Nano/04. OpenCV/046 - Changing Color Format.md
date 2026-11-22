---
title: 'Chuyển đổi định dạng màu với cv2.cvtColor'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 046
status: edited
source: '046 - Changing Color Format.md'
categories:
- AI
tags: []
---

# 🎨 Chuyển đổi định dạng màu của ảnh

> Nguồn: `046 - Changing Color Format.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39649070)

Chào các bạn, bài này mình sẽ học cách đổi định dạng màu của ảnh bằng OpenCV. Việc này rất quan trọng với dự án xe tự lái của mình, nên các bạn chú ý phần vì sao phải dùng ảnh xám nhé.

### 🧠 Vì sao cần quan tâm đến định dạng màu

* Trong OpenCV, **color format** dùng để biểu diễn và thao tác thông tin màu của ảnh. Thư viện hỗ trợ nhiều định dạng khác nhau.
* Định dạng mặc định của ảnh trong OpenCV là **BGR**, tương đương với **RGB** mà mình vẫn biết.
* Với dự án xe bám làn, mình cần định dạng **gray** (ảnh xám): đường cao tốc vốn chỉ gồm màu đen và trắng, nên xử lý ảnh xám sẽ "lành" hơn.
* Nếu không xử lý đúng định dạng, chương trình có thể gặp lỗi và xe không bám được làn.

---

### 🐍 Chuẩn bị file Python

1. Mở **Visual Studio Code**, vào project folder cũ.
2. Tạo file Python mới, đặt tên ví dụ **color_format.py**.
3. Import **cv2**, rồi đọc ảnh vào một biến ma trận, ví dụ **image**:

```python
import cv2

image = cv2.imread("image.jpg")
```

---

### 🔁 Đổi sang ảnh xám bằng `cv2.cvtColor`

Mình tạo biến ma trận mới, có thể là **gray**, **RGB** hoặc **HSV** — bài này bắt đầu với **gray**. Hàm cần dùng là **cvtColor** (chữ **C** thứ hai viết hoa), nhận **hai tham số**:

1. **Ảnh nguồn** muốn đổi định dạng — ở đây là **image**.
2. **Giá trị chuyển đổi** đặc biệt, bắt đầu bằng `cv2.COLOR_`. Để ra ảnh xám, dùng **`cv2.COLOR_BGR2GRAY`**.

Lý do phải ghi **BGR** ở đầu: vì định dạng mặc định của OpenCV là BGR.

```python
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
```

---

### 👁️ Hiển thị ảnh gốc và ảnh xám

Gọi **`cv2.imshow`** hai lần, lần lượt với cửa sổ `"original"` cho ảnh gốc và `"gray color"` cho ảnh xám, rồi giữ cửa sổ bằng **`cv2.waitKey(0)`**:

```python
cv2.imshow("original", image)
cv2.imshow("gray color", gray)
cv2.waitKey(0)
```

Chạy lên, các bạn thấy cửa sổ ảnh xám và cửa sổ ảnh gốc cạnh nhau.

---

### 🌈 Thêm một biến đổi sang RGB

Muốn thử thêm RGB, mình sao chép đoạn code vừa viết, đổi tên biến ma trận thành **RGB** và thay tham số thứ hai thành **`cv2.COLOR_BGR2RGB`**. Như vậy là chuyển được từ BGR sang RGB.

```python
RGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

cv2.imshow("RGB", RGB)
```

Chạy lại, màn hình sẽ có ba cửa sổ: **original**, **gray color** và **RGB**.

---

Vậy là mình đã biết đổi định dạng màu bằng `cv2.cvtColor` với các hằng số `COLOR_BGR2GRAY` và `COLOR_BGR2RGB`. Bài sau mình sẽ đi vào các phép vẽ hình cơ bản trên ảnh.
