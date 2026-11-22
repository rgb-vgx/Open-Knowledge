---
title: 'Capstone phần 4 — ghép mọi thứ thành chương trình đếm ngón tay'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 91
status: edited
source: '091 - Capstone Part Four - Bringing it all together.md'
categories:
- AI
tags: []
---

# 🎬 Capstone phần 4 — chạy chương trình đếm ngón tay

> Nguồn: `091 - Capstone Part Four - Bringing it all together.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12787377)

Phần cuối: nối `calc_accum_avg`, `segment` và `count_fingers` vào một vòng lặp đọc camera. Chương trình có hai giai đoạn — 60 frame đầu để **học nền**, sau đó mới bắt đầu đếm ngón khi bàn tay đi vào ROI.

### 🎥 Khởi động và giai đoạn học nền

```python
cap = cv2.VideoCapture(0)
num_frames = 0

while True:
    ret, frame = cap.read()
    frame_copy = frame.copy()

    roi = frame[roi_top:roi_bottom, roi_right:roi_left]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (7, 7), 0)

    if num_frames < 60:
        calc_accum_avg(gray, accumulated_weight)
        if num_frames <= 59:
            cv2.putText(frame_copy, "WAIT! GETTING BACKGROUND",
                        (200, 400), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 0, 255), 2)
            cv2.imshow("Finger Count", frame_copy)
```

Ta luôn làm việc trên **ROI** chứ không phải toàn frame: cắt theo `roi_top:roi_bottom, roi_right:roi_left`, chuyển xám, rồi `cv2.GaussianBlur()` với kernel **7×7** và sigma 0 để giảm nhiễu, giúp trung bình nền ổn định hơn.

Trong 60 frame đầu, `background` chưa có nên chỉ cập nhật trung bình và hiện dòng chữ **"WAIT! GETTING BACKGROUND"**. Vị trí, font, màu, độ dày đều tùy chỉnh được theo camera.

---

### ✋ Giai đoạn đếm ngón

```python
    else:
        hand = segment(gray)

        if hand is not None:
            thresholded, hand_segment = hand

            cv2.drawContours(frame_copy,
                             [hand_segment + (roi_right, roi_top)],
                             -1, (255, 0, 0), 5)

            fingers = count_fingers(thresholded, hand_segment)

            cv2.putText(frame_copy, str(fingers), (70, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

            cv2.imshow("Thresholded", thresholded)
```

`segment()` có thể trả `None` (không có contour), nên phải kiểm tra trước khi unpack. Đây là lý do ta không thể unpack ngay từ đầu.

`hand_segment` có tọa độ **tương đối trong ROI**, nên khi vẽ lên frame gốc phải cộng offset `(roi_right, roi_top)`. `cv2.drawContours()` vẽ đường bao quanh bàn tay thật trong luồng video.

Số ngón được ghi lên góc trái bằng `cv2.putText()` — nhớ ép `str(fingers)` vì `putText` cần chuỗi. Cửa sổ **"Thresholded"** hiển thị ảnh nhị phân, rất hữu ích để chỉnh `threshold_min` hoặc ánh sáng.

---

### 🟥 Vẽ ROI và thoát

```python
    cv2.rectangle(frame_copy, (roi_left, roi_top),
                  (roi_right, roi_bottom), (0, 0, 255), 5)

    num_frames += 1
    cv2.imshow("Finger Count", frame_copy)

    k = cv2.waitKey(1) & 0xFF
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
```

Ô ROI đỏ được vẽ **sau** khi xử lý, để không ảnh hưởng lên ảnh đầu vào. `num_frames` tăng mỗi vòng; sau 60 frame, dòng "wait" biến mất và chương trình sẵn sàng nhận bàn tay. Nhấn **Escape** để thoát và giải phóng camera.

---

### 🐛 Lỗi chính tả và cách sửa

Khi chạy lần đầu, giảng viên gõ nhầm `tresholded` thay vì `thresholded` ngay sau dòng `hand_segment = max(...)`. Cách sửa: sửa tên biến, **Restart Kernel**, rồi chạy lại toàn bộ cell để định nghĩa lại các hàm.

---

### 👀 Kết quả

Sau khi hết giai đoạn chờ, đưa bàn tay vào ô đỏ. Cửa sổ Thresholded hiện bàn tay trắng trên nền đen, còn cửa sổ chính hiện số ngón.

Trong bản demo, ánh sáng phòng thay đổi và bán kính chọn hơi lớn nên phải **duỗi thẳng ngón út** mới đếm đủ 4; co út lại thì chỉ còn 3. Đây là hành vi đúng với thiết kế: bán kính 90% càng lớn thì càng đòi ngón duỗi xa.

Một số điều cần tinh chỉnh theo tay và ánh sáng của bạn:

* Giảm bán kính xuống 80% nếu ngón ngắn.
* Chỉnh `threshold_min` nếu nền bị bắt nhiễu.
* Đảm bảo nền trong ROI tương đối đồng nhất trong 60 frame đầu.

---

### 💡 Tổng kết capstone

Chỉ từ những ý tưởng đơn giản — trung bình nền, hiệu ảnh, threshold, contour, convex hull và một chút hình học — ta đã ghép thành một ứng dụng thị giác máy tính chạy thời gian thực. Đây cũng là lời kết của khóa học; hy vọng các bạn thấy được cách các mảnh ghép nhỏ tạo nên phần mềm thực tế.
