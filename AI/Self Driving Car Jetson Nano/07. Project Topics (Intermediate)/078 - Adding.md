---
title: 'Cộng hai ảnh Canny và threshold bằng hàm add'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 078
status: edited
source: '078 - Adding.md'
categories:
- AI
tags: []
---

# ➕ Cộng hai ảnh Canny và threshold bằng hàm `add`

> Nguồn: `078 - Adding.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43813228)

Chào các bạn, bài này mình sẽ học hàm **`add`** trong OpenCV. Trong lane tracking, phát hiện biên và threshold là hai cấu trúc quan trọng; hàm `add` giúp mình **kết hợp** chúng lại thành một ảnh duy nhất, cho kết quả chính xác hơn.

### 🗂️ Chuẩn bị file code

Trong project folder, tạo file Python mới tên **add_function.py**. Đầu tiên import OpenCV rồi đọc ảnh `img.jpg`.

```python
import cv2

img = cv2.imread("img.jpg")
```

Cả phát hiện biên lẫn chuyển nhị phân đều làm trên ảnh xám, nên mình chuyển ảnh sang grayscale trước.

```python
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
```

---

### 🔍 Phát hiện biên bằng Canny

Tạo ma trận **canny** từ ảnh xám, với ngưỡng thứ nhất **127** và ngưỡng thứ hai **255**.

```python
canny = cv2.Canny(gray, 127, 255)
```

---

### ⚫ Chuyển nhị phân bằng threshold

Tiếp theo gọi `cv2.threshold` trên **cùng ảnh xám gray** — đây là điểm cần chú ý: cả hai phép toán đều dựa trên ảnh xám.

```python
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
```

Tham số lần lượt: ảnh xám **gray**, ngưỡng **127**, giá trị lớn nhất **255**, kiểu **`cv2.THRESH_BINARY`**.

---

### ➕ Kết hợp hai ma trận bằng `cv2.add`

Mình tạo ma trận mới tên **addition**, gọi **`cv2.add`** với hai tham số là hai ma trận cần cộng: **canny** và **thresh**.

```python
addition = cv2.add(canny, thresh)
```

Kết quả là một ma trận chứa **cả đặc trưng biên lẫn đặc trưng nhị phân** của ảnh — nền tảng để bám làn đường chính xác hơn.

---

### 👁️ Hiển thị kết quả

Hiển thị ma trận **addition** và giữ cửa sổ bằng `waitKey(0)`.

```python
cv2.imshow("addition", addition)
cv2.waitKey(0)
```

Khi chạy, các bạn sẽ thấy ảnh kết quả mang đồng thời nét của phép phát hiện biên và các mảng đen trắng của phép threshold.

---

Vậy là các bạn đã biết cách cộng hai ảnh bằng `cv2.add`. Bài sau mình sẽ học **ROI — Region of Interest**, cách chỉ tập trung xử lý đúng vùng ảnh chứa làn đường.
