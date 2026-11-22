---
title: 'Nhiều event chuột: chuột trái một màu, chuột phải màu khác'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 17
status: edited
source: '017 - Direct Drawing on Images with a mouse - Part Two.md'
categories:
- AI
tags: []
---

# 🔀 Xử lý nhiều event chuột trong cùng một callback

> Nguồn: `017 - Direct Drawing on Images with a mouse - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12292074)

Bài trước chỉ kiểm tra một sự kiện: nhấn chuột trái xuống. Bài này mở rộng hàm callback để phản ứng với **nhiều loại event** khác nhau, mỗi event vẽ một màu riêng.

### 🔀 Thêm nhánh elif cho chuột phải

Code vẫn giữ nguyên cấu trúc cũ — hàm nhận `event, x, y, flags, param`, kiểm tra sự kiện rồi vẽ lên `img`, với `namedWindow` và `setMouseCallback` nối theo tên cửa sổ. Chỉ thêm một nhánh:

```python
def draw_circle(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.circle(img, (x, y), 30, (0, 255, 0), -1)
    elif event == cv2.EVENT_RBUTTONDOWN:
        cv2.circle(img, (x, y), 30, (0, 0, 255), -1)
```

`EVENT_RBUTTONDOWN` là sự kiện nhấn **nút phải** xuống. Có thể gõ `cv2.EVENT_` rồi nhấn Tab để xem toàn bộ event OpenCV hỗ trợ: di chuyển chuột, nhấn phím, nhả nút trái, nhả nút phải...

### 🎨 Vì sao màu hiện ra khác lời giảng

Khi chạy thử: click trái cho các hình tròn xanh lá, click phải cho các hình tròn **xanh dương** dù trong bài nói là đỏ. Lý do là OpenCV dùng thứ tự kênh **BGR**, không phải RGB — hai kênh đỏ và xanh bị hoán đổi. Đây là lỗi nói nhầm của giảng viên, và cũng là lời nhắc rất tốt: khi chọn màu trong OpenCV, luôn nhớ thứ tự **blue, green, red**.

### 🧭 Điều kiện để nhiều event hoạt động

Cả hai nhánh chỉ chạy khi callback được nối đúng vào cửa sổ đang hiển thị. Ba nơi phải dùng **cùng một tên cửa sổ**: `cv2.namedWindow`, `cv2.setMouseCallback` và `cv2.imshow`. Chỉ cần lệch một ký tự là sự kiện chuột không bao giờ tới được hàm xử lý.

Ngoài ra, toàn bộ code nên nằm trong một cell hoặc một script, và trên macOS/Linux nên chạy dạng script để tránh lỗi kernel khi đóng cửa sổ.

### 💡 Giới hạn hiện tại

Hiện mỗi lần chỉ có một cú click được xử lý. Nếu **giữ chuột và kéo** thì không có gì xảy ra, vì ta chưa lắng nghe sự kiện di chuyển chuột.

Bài tiếp theo sẽ thêm biến trạng thái và các global variable để theo dõi lúc chuột đang được kéo, từ đó vẽ hình chữ nhật theo thao tác kéo thả.
