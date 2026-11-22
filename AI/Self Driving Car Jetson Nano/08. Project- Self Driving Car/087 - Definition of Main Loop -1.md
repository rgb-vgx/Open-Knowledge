---
title: 'Vòng lặp chính — đọc frame, Canny, threshold và tìm contour'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 087
status: edited
source: '087 - Definition of Main Loop -1.md'
categories:
- AI
tags: []
---

# 🔁 Vòng lặp chính — đọc frame, Canny, threshold và tìm contour

> Nguồn: `087 - Definition of Main Loop -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/44111264)

Chào các bạn, bài này mình sẽ đi qua nửa đầu của **vòng lặp chính** (main loop). Đây là đoạn code chạy liên tục: lấy từng khung hình từ webcam, xử lý ảnh và tìm ra làn đường.

### 📥 Đọc một frame từ webcam

Mình lấy một frame từ luồng video bằng biến **`ret, frame`**.

* **`cap`** là đối tượng đại diện cho nguồn video.
* Hàm **`read`** đọc một frame và gán vào biến **`frame`**.
* Biến **`ret`** cho biết thao tác đọc **thành công hay không**.

```python
ret, frame = cap.read()
```

---

### 🎨 Chuyển frame sang ảnh xám

Frame nhận được được chuyển sang grayscale bằng **`cv2.cvtColor`** và lưu vào biến **`gray`**.

Lý do: ảnh xám **đơn giản hơn**, phù hợp cho **phát hiện biên** và các phép xử lý tiếp theo.

```python
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
```

---

### 🔍 Phát hiện biên bằng Canny

Áp dụng thuật toán **Canny** trên ảnh xám, lưu vào biến **`canny`**, với hai ngưỡng:

* Ngưỡng dưới: **130**.
* Ngưỡng trên: **150**.

Thuật toán này xác định các **biên của làn đường** trong ảnh.

```python
canny = cv2.Canny(gray, 130, 150)
```

---

### ⚫ Threshold ảnh xám

Tiếp theo thực hiện **threshold** trên chính ảnh xám **gray**, lưu kết quả vào **`thresh`**:

* Ngưỡng: **140**.
* Giá trị pixel lớn nhất: **255**.

```python
_, thresh = cv2.threshold(gray, 140, 255, cv2.THRESH_BINARY)
```

Quá trình này chuyển ảnh thành **nhị phân** — pixel chỉ còn **đen hoặc trắng**. Đây chính là cấu trúc cần thiết để tìm làn đường trên sa bàn mình đã dựng.

---

### 🎯 Áp ROI lên ảnh threshold

Mình gọi hàm **`roi`** với biến **thresh** để lấy **vùng quan tâm** của ảnh đã threshold. Hàm `roi` đã học ở bài trước.

---

### ➕ Cộng Canny và threshold

Mình tạo biến **`final`**, gọi hàm **`cv2.add`** để cộng ảnh **Canny** với ảnh **threshold**.

Mục đích: gom **đặc trưng của cả hai ảnh** vào một ảnh duy nhất, cho kết quả chính xác hơn.

```python
final = cv2.add(canny, roi(thresh))
```

---

### 🔎 Tìm contour trên ảnh đã gộp

Để tìm contour tốt, mình gọi hàm **`roi`** thêm lần nữa trên ảnh đã gộp, rồi dùng **`cv2.findContours`**:

* Chỉ lấy contour ngoài cùng với **`cv2.RETR_EXTERNAL`**.
* Nén các điểm contour bằng **`cv2.CHAIN_APPROX_SIMPLE`** để tốn ít bộ nhớ hơn.

```python
contours, edge = cv2.findContours(
    roi(final),
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE,
)
```

Biến **`contours`** chứa các contour tìm được, còn **`edge`** chứa cấu trúc phân cấp của contour.

---

Vậy là nửa đầu vòng lặp đã xong: lấy frame, chuyển xám, Canny, threshold, áp ROI, cộng hai ảnh và tìm contour. Bài sau mình sẽ xử lý từng contour, tính diện tích, vẽ khung và điều khiển động cơ.
