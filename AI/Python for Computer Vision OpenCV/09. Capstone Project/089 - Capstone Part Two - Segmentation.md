---
title: 'Capstone phần 2 — segmentation bàn tay bằng absdiff và threshold'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 89
status: edited
source: '089 - Capstone Part Two - Segmentation.md'
categories:
- AI
tags: []
---

# ✂️ Capstone phần 2 — tách bàn tay khỏi nền

> Nguồn: `089 - Capstone Part Two - Segmentation.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12787371)

Mục tiêu phần này: từ ảnh xám trong ROI, tạo ra ảnh nhị phân với **bàn tay màu trắng trên nền đen**, rồi lấy contour lớn nhất làm `hand_segment`. Đầu ra của hàm là cặp `(ảnh thresholded, contour bàn tay)`.

### 🔧 Khung hàm segment

```python
def segment(frame, threshold_min=25):
```

Hàm nhận frame (grayscale) và ngưỡng tối thiểu, mặc định **25**. Nếu nền trong ROI không đồng đều hoặc có nhiều hình dạng lạ, bạn sẽ phải chỉnh giá trị này — tăng lên nếu detect quá nhiều nhiễu.

---

### ➖ Hiệu ảnh tuyệt đối với nền

```python
    diff = cv2.absdiff(background.astype("uint8"), frame)
```

`cv2.absdiff()` lấy trị tuyệt đối hiệu hai ảnh: pixel nào khác nền sẽ có giá trị lớn. Điều kiện bắt buộc là `background` phải ở kiểu **uint8** — vì `accumulateWeighted` giữ nó dạng float, ta phải ép lại.

---

### ⚫️ Threshold nhị phân

```python
    ret, thresholded = cv2.threshold(diff, threshold_min, 255,
                                     cv2.THRESH_BINARY)
```

`cv2.threshold()` nhận ảnh diff, ngưỡng dưới, giá trị lớn nhất **255** và kiểu `THRESH_BINARY`: pixel lớn hơn ngưỡng thành 255 (trắng), còn lại thành 0 (đen). `ret` là ngưỡng thực tế được dùng.

Đừng nhầm ba khái niệm trùng tên: `thresholded` (có "ed") là **ảnh kết quả**, `cv2.threshold` là **hàm**, còn `threshold_min` là **giá trị ngưỡng**.

---

### 🔍 Lấy contour ngoài cùng

```python
    contours, hierarchy = cv2.findContours(
        thresholded.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
```

Ta truyền bản copy để không làm hỏng ảnh thresholded gốc, chỉ lấy **contour ngoài cùng** (`RETR_EXTERNAL`) và xấp xỉ đơn giản (`CHAIN_APPROX_SIMPLE`).

---

### 🖐️ Chọn contour lớn nhất

```python
    if len(contours) == 0:
        return None

    hand_segment = max(contours, key=cv2.contourArea)
    return (thresholded, hand_segment)
```

Nếu không có contour nào, trả `None` để phần gọi hàm biết mà bỏ qua frame này.

Ngược lại, giả định **contour ngoài lớn nhất là bàn tay**. Dùng `max()` với `key=cv2.contourArea` để chọn contour có diện tích lớn nhất, tránh bắt nhầm các đốm trắng nhiễu nhỏ trong nền.

Giả định này có thể bị phá nếu bạn đưa thêm vật khác to hơn bàn tay vào ROI — khi đó hàm sẽ tách nhầm vật đó.

---

### 💡 Tóm tắt pipeline

```text
frame (gray) → absdiff(background) → threshold → findContours
             → chọn contour diện tích lớn nhất → (thresholded, hand_segment)
```

Hàm trả về cả ảnh nhị phân (để hiển thị/debug) và contour bàn tay (để đếm ngón ở bước sau).

> ⚠️ Cần kiểm chứng: transcript ghi `image, contours, hierarchy = cv2.findContours(...)` theo API OpenCV 3. Với OpenCV 4, hàm chỉ trả về **hai** giá trị `contours, hierarchy` như code trên; nếu chạy đúng bản OpenCV 4 mà viết ba biến sẽ lỗi unpack.

Phần 3 sẽ dùng convex hull để đếm số ngón từ `hand_segment`.
