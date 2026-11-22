---
title: 'Bài tập Image Processing: sáu task thực hành'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 33
status: edited
source: '033 - Image Processing Assessment.md'
categories:
- AI
tags: []
---

# 📝 Bài tập Image Processing — sáu task

> Nguồn: `033 - Image Processing Assessment.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257672)

Đây là assessment kết thúc section Image Processing, dùng notebook có sẵn phần import và hàm `display_img` (có thể chỉnh `figsize` cho ảnh nhỏ hơn hoặc lớn hơn). Bài sau sẽ đi qua lời giải. Các bạn có thể tự làm hết rồi mới xem, hoặc coi bài sau như code-along.

### 1️⃣ Mở và hiển thị ảnh giraffes

Mở `giraffes.jpg` trong thư mục data và hiển thị đúng màu. Nhớ dùng **color space conversion** để sửa thứ tự kênh; nếu không, màu đỏ và xanh sẽ bị hoán đổi. Kết quả là ảnh hai chú hươu cao cổ.

---

### 2️⃣ Áp binary threshold

Áp **binary threshold** lên ảnh. Có thể chọn ngưỡng tùy ý, nhưng nên bắt đầu ở điểm giữa thang 0–255 giống bài giảng. Sau khi threshold, mọi giá trị phải là **0 hoặc 255** — đen hoặc trắng.

---

### 3️⃣ Chuyển sang HSV

Mở lại `giraffes.jpg`, lần này chuyển color space sang **HSV** và hiển thị. Ảnh sẽ trông kỳ lạ, kiểu tím tím, vì Matplotlib đang hiển thị ba kênh hue/saturation/value như thể là RGB. Điều đó là bình thường.

---

### 4️⃣ Lowpass filter 4×4

Tạo một **lowpass filter** với kernel `4 × 4` chứa toàn giá trị `1/10` (tức `0.1`), rồi dùng **2D convolution** để blur ảnh giraffes. Ảnh đầu vào cho bước này là ảnh **RGB bình thường**, không phải ảnh HSV.

Kernel kỳ vọng:

```text
[[0.1, 0.1, 0.1, 0.1],
 [0.1, 0.1, 0.1, 0.1],
 [0.1, 0.1, 0.1, 0.1],
 [0.1, 0.1, 0.1, 0.1]]
```

Kết quả trông sáng hơn và mờ hơn: vùng mây/trời trắng bị blur thành trắng thuần, các chú hươu mất nét.

---

### 5️⃣ Sobel ngang trên ảnh xám

Tạo **horizontal Sobel filter** (`sobelx`) với kernel size `5`, áp lên phiên bản **grayscale** của ảnh giraffes, rồi hiển thị kết quả gradient. Kết quả làm nổi các cạnh đứng của hươu và một phần nền; bầu trời gần như không còn cạnh.

---

### 6️⃣ Histogram ba kênh

Task cuối: vẽ histogram cho các kênh **red, blue, green** của ảnh giraffes, chú ý đặc biệt tới **thứ tự kênh**.

Nếu đọc ảnh trực tiếp bằng OpenCV, thứ tự là BGR nên kênh đỏ và xanh có thể bị đảo nếu gán sai index. Hãy kiểm tra lại thứ tự trước khi vẽ.

Chúc các bạn làm tốt; bài sau sẽ giải chi tiết từng task.
