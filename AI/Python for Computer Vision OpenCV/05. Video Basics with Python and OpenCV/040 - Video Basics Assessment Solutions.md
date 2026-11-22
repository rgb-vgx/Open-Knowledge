---
title: 'Lời giải bài tập Video Basics: vòng tròn xanh theo click chuột'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 40
status: edited
source: '040 - Video Basics Assessment Solutions.md'
categories:
- AI
tags: []
---

# 🧪 Lời giải bài tập Video Basics: vòng tròn xanh theo click chuột

> Nguồn: `040 - Video Basics Assessment Solutions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257714)

Cùng đi qua lời giải của bài assessment. Điểm mới so với các bài trước là ta theo dõi **hai** sự kiện chuột — nhấn xuống và nhả lên — thay vì chỉ một.

### 🖱️ Callback và hai sự kiện chuột

Bắt đầu với skeleton code có sẵn và thêm `import cv2`. Hai biến toàn cục đã được khai báo sẵn: `center` và `clicked`.

```python
def draw_circle(event, x, y, flags, param):
    global center, clicked

    if event == cv2.EVENT_LBUTTONDOWN:
        center = (x, y)
        clicked = False

    if event == cv2.EVENT_LBUTTONUP:
        clicked = True
```

Logic ở đây:

* **`EVENT_LBUTTONDOWN`** — vừa nhấn chuột trái: lưu tọa độ vào `center`, đặt `clicked = False`.
* **`EVENT_LBUTTONUP`** — nhả chuột: đặt `clicked = True`.

Nghĩa là chương trình **chỉ vẽ vòng tròn sau khi bạn nhả chuột**, chứ không vẽ ngay lúc nhấn. Cách này là chủ ý của đề bài.

Nếu bạn làm theo hướng chỉ dùng `EVENT_LBUTTONDOWN` (vẽ ngay khi nhấn) thì cũng chấp nhận được — khi đó bỏ hẳn phần theo dõi `EVENT_LBUTTONUP`. Đề bài linh hoạt ở chỗ này.

---

### 🎥 Kết nối camera và bind callback

```python
cap = cv2.VideoCapture(0)

cv2.namedWindow('Test')
cv2.setMouseCallback('Test', draw_circle)
```

Ở đây hàm được đặt tên là `draw_circle` thay vì `draw_rectangle` như bài trước, và bind vào cửa sổ tên **`Test`**. Tên này phải khớp với `imshow` bên dưới.

---

### 🔁 Vòng lặp vẽ và hiển thị

```python
if clicked:
    cv2.circle(frame, center, 50, (255, 0, 0), 5)

cv2.imshow('Test', frame)

if cv2.waitKey(1) & 0xFF == ord('q'):
    break
```

Mỗi frame:

1. Đọc frame bằng `cap.read()`.
2. Nếu `clicked` là `True` (đã nhả chuột) → vẽ vòng tròn tại `center`.
3. `cv2.imshow()` **luôn** chạy, kể cả khi chưa click — lệnh này nằm **ngoài** khối `if`.
4. Bấm **q** để thoát vòng lặp.

Thông số vòng tròn:

* **Tâm** là `center`.
* **Bán kính** `50` — tùy bạn chọn.
* **Màu** `(255, 0, 0)` — trong BGR đây là **xanh dương (blue)**, đúng như đề bài.
* **Độ dày** `5` pixel.

Cuối cùng dọn dẹp:

```python
cap.release()
cv2.destroyAllWindows()
```

---

### ⚠️ Chỗ dễ vướng nhất

Điểm khác biệt duy nhất so với các bài trước là **theo dõi cả hai sự kiện** `EVENT_LBUTTONDOWN` và `EVENT_LBUTTONUP`. Trước giờ ta quen vẽ ngay khi nhấn chuột; ở đây phải chờ tới lúc nhả chuột. Mọi kỹ năng còn lại — global variable, capture, callback, `imshow` — đều đã dùng rồi.

---

### ✅ Tóm lại

Cấu trúc chương trình: khai báo global variable → capture video → gắn callback → trong vòng lặp, nếu đã click thì vẽ vòng tròn rồi hiển thị. Chạy thử sẽ thấy: nhấn và nhả chuột ở đâu, một vòng tròn xanh xuất hiện ở đó. Hết section Video Basics — hẹn gặp ở phần Object Detection.
