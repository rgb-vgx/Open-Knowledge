---
title: 'Bài 089 — Color Thresholding: tách màu bằng không gian HSV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 89
status: edited
source: '089 - Color Thresholding.md'
categories:
- AI
tags: []
---

# 🎯 Color Thresholding: tách màu bằng HSV trong OpenCV

> Nguồn: `089 - Color Thresholding.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48420971)

Chào các bạn! Đây là một trong những chủ đề thú vị nhất của OpenCV: **color thresholding**. Với kỹ thuật này, các bạn có thể lọc ra một khoảng màu cụ thể trong ảnh, rồi tô lại, xóa đi hoặc cô lập nó. Hãy cùng đi từ khái niệm tới code.

### 🧩 Color thresholding là gì?

**Color thresholding** là kỹ thuật lọc ra một khoảng màu xác định trong ảnh bằng cách đặt **lower bound** và **upper bound** trong một **color space**. Mục đích thường gặp:

* **Segment** — tách vùng màu.
* **Replace** — thay màu này bằng màu khác (ví dụ đổi màu da).
* **Isolate** — giữ lại đúng vùng màu cần quan tâm.

Ví dụ vui: có ảnh nhiều người, bạn muốn đổi màu da thành đỏ, xanh hay trắng — tất cả đều có thể làm bằng thresholding. Nhưng trước hết cần chọn **color space** phù hợp trong số **RGB**, **HSV**, **BGR**, **Lab**...

---

### 🎨 Vì sao nên dùng HSV thay cho RGB?

Hãy thử thay đổi **độ sáng** của một màu đỏ trong RGB: cả ba kênh **R, G, B** đều thay đổi theo, nên bạn khó cô lập đúng màu mục tiêu.

Trong **HSV** thú vị hơn: đổi độ sáng chỉ làm kênh **V** thay đổi, còn màu (**H**) tách khỏi độ sáng. Chính vì vậy HSV hợp để "target" màu:

* **H** (hue) — màu sắc.
* **S** (saturation) — độ sống động (độ bão hòa).
* **V** (value) — độ sáng.

Hình dung HSV như chiếc nón ngược: phần vành tròn là **hue** từ **0–360 độ**, S và V chạy theo trục ngang/dọc.

---

### 📏 Thang HSV trong OpenCV

Trong lý thuyết, H là **0–360 độ**, S và V là **0–100%**. Nhưng **OpenCV** dùng thang đã scale lại cho tiện tính toán:

| Kênh | Lý thuyết | Trong OpenCV |
|---|---|---|
| **H** | 0–360° | **0–179** |
| **S** | 0–100% | **0–255** |
| **V** | 0–100% | **0–255** |

Nghĩa là 30 độ thực tế tương ứng khoảng 15 trong OpenCV (do scale một nửa). Saturation 100% và value 100% tương ứng **255**.

---

### 🔲 Tạo binary mask từ hue

Ý tưởng tạo mask rất đơn giản: duyệt ma trận ảnh, pixel nào nằm trong khoảng [lower, upper] thì gán **1**, còn lại gán **0**.

Ví dụ muốn target màu xanh lá quanh 120 độ: chọn lower **119** và upper **121**, mọi giá trị trong khoảng đều được chấp nhận. Kết quả là một **binary mask** — chỉ có hai mức 0 và 1, khi hiển thị sẽ ra đen và trắng, không có sắc xám.

Sau khi có mask, ta áp điều kiện:

1. Chỗ nào mask **> 0** → tô màu mới.
2. Chỗ nào mask **= 0** → giữ nguyên ảnh gốc.

Vì ảnh gốc là ba kênh, màu thay thế cũng phải là ba kênh. Ta tạo màu mong muốn bằng **NumPy** (theo BGR), chuyển sang HSV để so khớp, rồi ghép lại.

---

### 💻 Thực hành: đổi họa tiết trắng của hươu cao cổ

Mình dùng ảnh hươu cao cổ: có nhiều mảng nâu nhưng ít mảng trắng, nên target màu trắng bằng HSV sẽ dễ hơn.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread("duong_dan_anh.png")          # OpenCV đọc mặc định BGR
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

# Target màu trắng ngà (có chút nâu/đỏ)
lower_white = np.array([0, 0, 190])
upper_white = np.array([30, 80, 255])

mask = cv2.inRange(image_hsv, lower_white, upper_white)
```

Vì màu trắng không tinh khiết mà ngả nâu cam, mình chọn hue **0–30** theo thang OpenCV (tương đương **0–60 độ** gốc), saturation tới **80**, và quan trọng nhất là **brightness từ 190 đến 255**.

Tiếp theo tạo màu thay thế (đen) và áp mask:

```python
black_hsv = np.uint8([[[180, 255, 0]]])
black_bgr = cv2.cvtColor(black_hsv, cv2.COLOR_HSV2BGR)[0][0]

image_result = image.copy()
image_result[mask > 0] = black_bgr

image_result_rgb = cv2.cvtColor(image_result, cv2.COLOR_BGR2RGB)
```

Lưu ý: khi tạo `np.uint8` phải chỉ rõ kiểu dữ liệu, nếu không `cvtColor` sẽ báo lỗi về **depth**. Cuối cùng vẽ ba ảnh cạnh nhau bằng `plt.subplot` (một hàng, ba cột) để so sánh **ảnh gốc – mask – ảnh kết quả**, rồi `plt.tight_layout()` và `plt.show()`.

---

### ✅ Kết quả và chốt bài

Trên plot, mask hiện rõ họa tiết trắng của hươu (dù còn chút nhiễu), và ảnh kết quả đã thay toàn bộ vùng trắng bằng màu đen trong khi vẫn giữ nguyên phần còn lại. Đó chính là sức mạnh của **color thresholding** với **HSV**.

Mẹo thực hành: nếu muốn target màu khác, cứ thử nhiều tổ hợp lower/upper cho tới khi mask khớp ý. Bài sau mình sẽ chuyển sang các phép biến đổi hình học trên ảnh.

> Ghi chú: transcript gốc gọi hàm là "cv2 dot in range" — đây là `cv2.inRange`; và "size" khi tạo `np.uint8` thực chất là vấn đề **dtype/depth**, đã diễn giải lại cho đúng.
