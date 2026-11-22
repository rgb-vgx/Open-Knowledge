---
title: 'Code phát hiện biên Canny trên ảnh cao tốc'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 070
status: edited
source: '070 - Edge Detection Algorithm (Coding).md'
categories:
- AI
tags: []
---

# 📷 Code phát hiện biên Canny với ảnh cao tốc

> Nguồn: `070 - Edge Detection Algorithm (Coding).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39900148)

Chào các bạn, bài này mình sẽ thực hành thuật toán Canny trên một ảnh đường cao tốc thật, để các bạn thấy rõ các đường biên được tách ra như thế nào. Mục tiêu là có một file Python nhỏ, chạy lên và quan sát kết quả bằng mắt.

### 🖼️ Chuẩn bị ảnh cao tốc

Mình cần một ảnh đường cao tốc để thực hiện phát hiện biên — nhìn trên ảnh highway sẽ dễ hiểu dự án hơn.

1. Mở **Google**, tìm **highway** và vào mục hình ảnh.
2. Chọn một ảnh ưng ý, bấm chuột phải, chọn **Save image as**.
3. Đặt tên file, ví dụ **highway**, và lưu ra **Desktop**.
4. Kiểm tra lại phần mở rộng: nếu không phải **jpg** hay **png** thì cần chuyển đổi — file **JPG** là phù hợp nhất cho bài này.
5. Mở **cloudconvert.com**, kéo ảnh vào, bấm **Convert** rồi tải file kết quả về Desktop.
6. Mở **VS Code**, kéo file ảnh vào **project folder**.

Lưu ý nhỏ: kết quả phát hiện biên có thể đúng hoặc sai tùy vào **độ sáng** của ảnh và các tham số mình nhập. Vì vậy cách tìm kết quả chính xác nhất là **thử và chỉnh dần** (trial and error).

### 🐍 Đọc ảnh và chuyển sang ảnh xám

Trong project folder, mình tạo file Python mới, ví dụ **h.py**. Bước đầu là import OpenCV và đọc ảnh với tham số thứ hai bằng **0** để nhận luôn ảnh xám.

```python
import cv2

image = cv2.imread("highway.jpg", 0)
```

Vì phát hiện biên chỉ thực hiện trên ảnh xám, tham số **0** giúp mình bỏ qua bước gọi `cvtColor` riêng.

### ⚙️ Gọi hàm Canny với hai ngưỡng

Mình tạo một ma trận mới tên **output** và gọi **`cv2.Canny`** với ba tham số:

* Tham số 1: ma trận đầu vào — biến `image`.
* Tham số 2: ngưỡng thứ nhất — ví dụ **100**; pixel dưới mức này không được coi là biên.
* Tham số 3: ngưỡng thứ hai — ví dụ **500**; pixel từ mức này trở lên được coi là biên.

```python
output = cv2.Canny(image, 100, 500)
```

Chạy thử thì không có lỗi — nghĩa là các tham số đã hợp lệ.

### 👁️ Hiển thị ảnh gốc và ảnh biên

Để so sánh, mình hiển thị cả hai ma trận bằng **`cv2.imshow`**, rồi giữ cửa sổ bằng **`cv2.waitKey(0)`**.

```python
cv2.imshow("original", image)
cv2.imshow("h detection", output)
cv2.waitKey(0)
```

Khi chạy, cửa sổ **original** là ảnh xám gốc, còn cửa sổ **h detection** là kết quả phát hiện biên — các đường viền của làn đường và cảnh vật hiện lên rõ ràng.

---

Vậy là các bạn đã biết cách phát hiện biên trên ảnh bằng OpenCV, từ khâu chuẩn bị ảnh đến hai ngưỡng của Canny. Bài sau mình chuyển sang một khái niệm mới: **contour** — công cụ để tìm và phân tích đường bao của vật thể.
