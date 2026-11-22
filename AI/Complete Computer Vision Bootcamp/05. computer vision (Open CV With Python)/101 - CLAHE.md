---
title: 'Bài 101 — CLAHE: cân bằng histogram thích ứng có giới hạn'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 101
status: edited
source: '101 - CLAHE.md'
categories:
- AI
tags: []
---

# 🔦 CLAHE — cân bằng histogram cục bộ, không làm ảnh bị "cháy"

> Nguồn: `101 - CLAHE.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481431)

Chào các bạn! Bài trước mình đã làm **histogram equalization** toàn ảnh, và các bạn thấy nó làm ảnh nét hơn nhưng cũng khuếch đại nhiễu ở những vùng đều màu như bầu trời. Hôm nay mình giới thiệu **CLAHE** — viết tắt của **Contrast Limited Adaptive Histogram Equalization** — một phiên bản "có kiểm soát" và mang tính cục bộ hơn.

### 🧠 CLAHE khác histogram equalization ở đâu?

**Histogram equalization** thường (global) chỉ tăng tương phản cho toàn bộ ảnh, không quan tâm vùng nào sáng vùng nào tối. **CLAHE** thì áp dụng histogram equalization trên từng vùng nhỏ (**tile**) của ảnh, nhờ vậy nó tập trung vào tương phản cục bộ và tránh được các artifact như **noise amplification**. Nó còn **giới hạn mức tăng tương phản** trong mỗi tile để không làm vùng nào bị quá sáng.

### ⚙️ CLAHE hoạt động theo bốn bước

1. **Chia ảnh thành các tile** — ví dụ chia ảnh thành lưới các ô nhỏ.
2. **Áp dụng histogram equalization trên từng tile**, thay vì trên toàn ảnh.
3. **Áp dụng contrast limit** — đặt ngưỡng tối đa cho mức khuếch đại cường độ trong mỗi tile, để kết quả mượt hơn.
4. **Ghép các tile lại bằng bilinear interpolation** — mục đích là xóa các đường nối (seam) giữa các tile, vì nếu ghép thô sẽ thấy vệt lạ ở ranh giới.

Ví dụ trong bài: ảnh xám có cường độ chỉ nằm trong khoảng **50–100**, tức là khá tối và thiếu chi tiết. CLAHE chia ảnh thành các block **8×8 pixel**, mỗi block được equalize để map giá trị về **0–255**, rồi bị **clip** ở một ngưỡng (ví dụ **180**) để không đẩy mọi thứ lên 255 và làm ảnh cháy.

### 📷 Cài đặt trên ảnh xám

Mình load ảnh, chuyển sang grayscale vì các kỹ thuật histogram chỉ làm việc trên ảnh một kênh, rồi so sánh ba phiên bản: ảnh gốc, ảnh equalize thường, và ảnh CLAHE.

```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread('images/giraffe.jpg')
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# equalize toàn ảnh để so sánh
equalized_image = cv2.equalizeHist(image_gray)

# tạo đối tượng CLAHE
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(4, 4))
clahe_equalized = clahe.apply(image_gray)
```

Hai tham số quan trọng:

* **`clipLimit`** — ngưỡng giới hạn tương phản. Tăng lên thì tăng tương phản mạnh hơn; giảm xuống để tránh over-enhancement. Mình để **2.0**.
* **`tileGridSize`** — số tile theo chiều rộng và cao. Tile nhỏ làm nổi tương phản cục bộ nhưng dễ sinh nhiễu; tile lớn cho kết quả mượt hơn nhưng có thể mất chi tiết.

### 👁️ So sánh kết quả

Khi plot ba ảnh cạnh nhau:

* **Ảnh gốc** — tương phản thấp, các vùng chênh lệch cường độ nhẹ rất khó phân biệt chi tiết.
* **Ảnh equalize toàn ảnh** — trông nét hơn, tương phản tăng rõ, nhưng bầu trời và các vùng đều màu bị **nhiễu/artifact** do bị khuếch đại.
* **Ảnh CLAHE** — tương phản được cải thiện nhưng cân bằng hơn: chi tiết như vân lông hươu cao cổ được làm nổi mà không khuếch đại nhiễu ở vùng trời.

Đó chính là điểm mạnh: CLAHE làm việc trên từng vùng nhỏ, equalize cục bộ và chặn mức tăng bằng clip limit, nên kết quả "dễ nhìn" và ít nhiễu hơn.

### 🎨 Áp dụng CLAHE cho ảnh màu qua không gian YUV

Không thể equalize trực tiếp trên ảnh màu, nên mình chuyển ảnh **BGR** sang **YUV** — ở đây kênh **Y** đại diện cho độ sáng (luminance), còn **U, V** là chrominance (màu). Ta chỉ áp CLAHE lên kênh Y.

```python
yuv_image = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)

# chỉ áp CLAHE lên kênh Y (kênh 0)
yuv_image[:, :, 0] = clahe.apply(yuv_image[:, :, 0])

# YUV -> BGR, rồi BGR -> RGB để hiển thị
yuv_bgr = cv2.cvtColor(yuv_image, cv2.COLOR_YUV2BGR)
image_rgb = cv2.cvtColor(yuv_bgr, cv2.COLOR_BGR2RGB)
```

Vì chỉ đụng vào kênh độ sáng, thông tin màu được giữ nguyên, nên ảnh sau khi chuyển lại RGB vẫn tự nhiên và cân bằng. Trong ví dụ, vân lông hươu và thảm thực vật rõ hơn, bầu trời có thêm tương phản, và nhiễu không bị khuếch đại nhiều như equalize toàn ảnh — dấu hiệu của một lần tăng cường "có kiểm soát".

Nếu muốn ảnh "đã" tay hơn hoặc chấp nhận thêm nhiễu, các bạn cứ chỉnh **`clipLimit`** và **`tileGridSize`** cho tới khi vừa mắt. Hẹn gặp ở bài sau, khi mình chuyển sang tìm **contour** — bước đầu để đếm và khoanh vùng vật thể.
