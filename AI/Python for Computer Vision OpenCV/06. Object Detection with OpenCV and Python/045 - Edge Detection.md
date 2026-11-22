---
title: 'Canny Edge Detection: tìm cạnh với blur và threshold'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 45
status: edited
source: '045 - Edge Detection.md'
categories:
- AI
tags: []
---

# 🌊 Canny Edge Detection: tìm cạnh với blur và threshold

> Nguồn: `045 - Edge Detection.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257840)

Canny Edge Detector (John Canny, 1986) là một trong những thuật toán phát hiện cạnh phổ biến nhất. Nó nhiều bước bên trong nhưng khi dùng OpenCV thì chỉ là **một dòng lệnh**. Thử thách thật sự nằm ở chọn ngưỡng và làm mờ ảnh trước.

### 🔬 Năm bước bên trong Canny

1. **Gaussian filter** — làm mờ để giảm nhiễu.
2. **Tìm intensity gradient** của ảnh.
3. **Non-maximum suppression** — loại phản hồi thừa khi dò cạnh.
4. **Double threshold** — xác định các cạnh tiềm năng.
5. **Hysteresis** — loại cạnh yếu không nối với cạnh mạnh, chỉ giữ cạnh mạnh.

Toàn bộ quá trình là một phễu lọc: bỏ dần cạnh yếu, giữ lại cạnh rõ. Bạn không cần nhớ chi tiết, nhưng nên biết nó đã tự làm mờ bằng Gaussian — nghĩa là **làm mờ thêm bên ngoài** vẫn có ích với ảnh nhiều chi tiết.

---

### ▶️ Chạy Canny cơ bản

```python
import cv2
import numpy as np

img = cv2.imread('data/sammy_face.jpg')

edges = cv2.Canny(img, 128, 128)
```

Không cần đổi màu ảnh vì chỉ quan tâm sáng/tối. Hai tham số `threshold1`, `threshold2` là ngưỡng dưới và trên. Khởi đầu bằng giá trị giữa của pixel — `128` (pixel nằm trong khoảng 0–255).

Kết quả đã bắt được viền tai, một phần miệng của chú chó Sammy, nhưng kèm rất nhiều cạnh nhiễu. Thử `0` và `255` cũng không khá hơn nhiều.

---

### 📏 Công thức chọn ngưỡng theo median

Một cách khởi điểm tốt: lấy **median** của pixel rồi đặt ngưỡng dưới/trên quanh nó.

```python
med_val = np.median(img)
print(med_val)                      # ví dụ: 64

lower = int(max(0, 0.7 * med_val))   # 70% median
upper = int(min(255, 1.3 * med_val)) # 130% median
```

* **Ngưỡng dưới** = `max(0, 0.7 * median)` — tức 30% dưới median, nhưng không xuống dưới 0.
* **Ngưỡng trên** = `min(255, 1.3 * median)` — tức 30% trên median, nhưng không vượt 255.

```python
edges = cv2.Canny(img, lower, upper)
```

Với ảnh Sammy, median chỉ khoảng **64** (ảnh không quá sáng), nên ngưỡng trên ra khoảng 83 — khá thấp, dẫn tới bắt quá nhiều cạnh. Có thể nâng ngưỡng trên lên thêm (ví dụ +100) để nó tổng quát hơn.

---

### 💧 Làm mờ trước khi dò cạnh

Đây mới là bước cải thiện rõ rệt nhất. Dùng bất kỳ kỹ thuật blur nào đã học, ví dụ `cv2.blur` với kernel 5x5:

```python
blurred = cv2.blur(img, (5, 5))
edges = cv2.Canny(blurred, lower, upper)
```

Làm mờ giúp loại bỏ chi tiết vụn (lông, nếp nhăn) và chỉ giữ cạnh mạnh của khuôn mặt. Kết quả này là tốt nhất trong các lần thử.

Có thể tinh chỉnh tiếp:

* Tăng kernel lên (ví dụ 7x7) → mờ hơn, ít cạnh hơn. Quá tay sẽ mất cả cạnh cần tìm.
* Giảm kernel về 5x5 và tăng ngưỡng trên lên khoảng 50 → tìm được điểm cân bằng giữa "đủ cạnh" và "không quá nhiễu".

---

### ✅ Tóm lại

`cv2.Canny(ảnh, threshold1, threshold2)` với công thức `0.7 * median` / `1.3 * median` là điểm khởi đầu. Nhưng phần lớn trường hợp, **blur ảnh trước** mới là thứ tạo ra khác biệt lớn nhất, sau đó mới chỉnh ngưỡng cho tới khi hài lòng. Bài tiếp theo là grid detection — mở rộng trực tiếp từ ý tưởng góc và cạnh.
