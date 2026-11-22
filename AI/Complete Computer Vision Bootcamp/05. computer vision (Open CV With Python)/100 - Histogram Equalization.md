---
title: 'Bài 100 — Cân bằng histogram để tăng tương phản'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 100
status: edited
source: '100 - Histogram Equalization.md'
categories:
- AI
tags: []
---

# ⚖️ Histogram Equalization — cân bằng sáng tối cho ảnh

> Nguồn: `100 - Histogram Equalization.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481381)

Chào các bạn! Bài này mình học cách **cân bằng độ sáng và độ tương phản** của ảnh bằng **histogram equalization**. Kỹ thuật này giúp ảnh trông sống động hơn, phân bố đều hơn về sáng tối và tương phản.

### 📖 Ý tưởng

**Histogram equalization** là kỹ thuật tăng **độ tương phản** của ảnh bằng cách **phân bố lại các giá trị cường độ** trên toàn bộ dải giá trị có thể. Nếu ảnh đang có cả giá trị cường độ cao lẫn thấp nhưng dồn cục, ta "trải đều" chúng ra để có ảnh tương phản tốt hơn.

---

### 🪜 Bốn bước thực hiện

1. **Tính histogram** — tần suất của từng giá trị cường độ (độ sáng).
2. **Tính CDF** (cumulative distribution function) — cộng dồn tần suất, cho biết các giá trị phân bố ra sao.
3. **Ánh xạ giá trị cũ sang giá trị mới** dùng CDF, để phân bố trải khắp toàn dải cường độ.
4. **Thay thế** các giá trị pixel cũ bằng giá trị mới đã ánh xạ.

---

### 🧮 Ví dụ tính tay

Giả sử ta flatten ảnh và có các pixel: `52, 55, 59, 52, 59, 55, 63, 52`. Đếm tần suất:

| Cường độ | Tần suất | Cộng dồn (CDF) | Chuẩn hóa (CDF / 8 × 255) |
|---|---|---|---|
| 52 | 3 | 3 | 3/8 × 255 ≈ **95** |
| 55 | 2 | 5 | 5/8 × 255 ≈ **159** |
| 59 | 2 | 7 | 7/8 × 255 ≈ **223** |
| 63 | 1 | 8 | 8/8 × 255 = **255** |

Tổng số pixel là 8, nên mỗi giá trị cộng dồn chia cho 8 rồi nhân 255 để **chuẩn hóa**. Kết quả: pixel tối nhất `52` (vốn rất tối) thành `95` (sáng hơn hẳn); pixel sáng nhất `63` thành `255`. Ta ánh xạ `52→95`, `55→159`, `59→223`, `63→255` rồi tạo ảnh mới. Đó chính là histogram equalization.

---

### ⚙️ Làm bằng OpenCV

Trong thực tế chỉ cần một hàm. Mình chuẩn bị ảnh grayscale (chỉ số nguyên 0–255) để cân bằng độ sáng:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread("images/giraffe.png")
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Histogram ảnh gốc
hist_original, bins = np.histogram(image_gray.flatten(), bins=256, range=(0, 256))

# Cân bằng histogram
equalized = cv2.equalizeHist(image_gray)

# Histogram ảnh đã cân bằng
hist_equalized, bins = np.histogram(equalized.flatten(), bins=256, range=(0, 256))
```

Ở đây mình dùng `np.histogram` của NumPy trên ảnh đã flatten, trả về hai thứ: mảng histogram và các bin. Còn `cv2.equalizeHist` nhận **ảnh grayscale** và trả về ảnh đã cân bằng — bên trong nó tự tính CDF và ánh xạ giá trị như ví dụ trên.

---

### 📈 Vẽ so sánh kết quả

Mình đặt ảnh gốc + histogram của nó ở hàng trên, ảnh đã cân bằng + histogram ở hàng dưới:

```python
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.imshow(image_gray, cmap="gray")
plt.title("Original image")

plt.subplot(2, 2, 2)
plt.plot(hist_original, color="gray")
plt.title("Original histogram")

plt.subplot(2, 2, 3)
plt.imshow(equalized, cmap="gray")
plt.title("Equalized image")

plt.subplot(2, 2, 4)
plt.plot(hist_equalized, color="green")
plt.title("Equalized histogram")

plt.tight_layout()
plt.show()
```

Một lỗi rất dễ mắc: khi tính histogram cho ảnh đã cân bằng, phải truyền **`equalized`** chứ không phải `image_gray`. Nếu truyền nhầm ảnh gốc, hai histogram sẽ trông giống hệt nhau.

Kết quả: histogram gốc dồn trong khoảng `150–200`, còn histogram sau cân bằng được trải rộng hơn hẳn. Ảnh mới có vùng tối sáng lên, vùng sáng dịu lại, độ tương phản tăng rõ rệt.

---

### 🌈 Cân bằng ảnh màu qua không gian YUV

Không nên equalize trực tiếp ảnh RGB: chỉ cần đổi một chút ở kênh đỏ là cả ba kênh giá trị đều lệch theo. Cách đúng là tách **kênh độ sáng** ra, cân bằng riêng nó, giữ nguyên kênh màu rồi gộp lại.

Có hai không gian phù hợp: **LAB** (`L` là lightness) và **YUV** (`Y` là luminance, `U` là chrominance xanh dương, `V` là chrominance đỏ — bộ này rất phổ biến trong truyền hình và trình phát media). Mình chọn YUV:

```python
image_yuv = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)

# Chỉ cân bằng kênh Y (kênh 0), giữ nguyên U và V
image_yuv[:, :, 0] = cv2.equalizeHist(image_yuv[:, :, 0])

equalized_bgr = cv2.cvtColor(image_yuv, cv2.COLOR_YUV2BGR)
equalized_rgb = cv2.cvtColor(equalized_bgr, cv2.COLOR_BGR2RGB)
```

Dòng `image_yuv[:, :, 0] = cv2.equalizeHist(image_yuv[:, :, 0])` là numpy slicing: giữ nguyên mọi hàng, mọi cột, chỉ thay **kênh 0 (Y)**, còn U và V để y nguyên. OpenCV có sẵn `cv2.COLOR_YUV2RGB`, nhưng ở đây mình đi vòng `YUV → BGR → RGB` cho quen với luồng BGR.

Kết quả: ảnh cân bằng có nhiều nhiễu hơn, nhưng những chi tiết trước đây mờ nhạt — như đám mây ở hậu cảnh — giờ hiện rõ; các đốm trên mình hươu cũng nổi bật và tương phản hơn.

---

### 🚀 Ứng dụng

Histogram equalization được dùng ở:

* **Medical imaging** — tăng cường ảnh X-quang, MRI.
* **Satellite imagery** — cải thiện tương phản ảnh vệ tinh thiếu sáng.
* **Document processing** — làm rõ tài liệu cũ, mờ.

Đơn giản nhưng rất mạnh: chỉ bằng cách phân bố lại cường độ pixel, nó "thổi sức sống mới" vào ảnh. Bài sau chúng ta sẽ gặp **CLAHE** — phiên bản nâng cao của kỹ thuật này. Hẹn gặp lại!
