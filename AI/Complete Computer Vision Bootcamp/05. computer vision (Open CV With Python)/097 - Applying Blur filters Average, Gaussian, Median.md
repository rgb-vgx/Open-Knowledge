---
title: 'Bài 097 — Làm mờ ảnh với Average, Gaussian và Median blur'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 97
status: edited
source: '097 - Applying Blur filters Average, Gaussian, Median.md'
categories:
- AI
tags: []
---

# 🌫️ Ba kiểu làm mờ ảnh trong OpenCV: Average, Gaussian, Median

> Nguồn: `097 - Applying Blur filters Average, Gaussian, Median.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48423157)

Chào các bạn! Sau khi đã tự tay tạo filter tùy chỉnh với OpenCV, bài này mình đi vào những bộ lọc mờ (blur) có sẵn. Có ba kiểu mình sẽ dùng: **average blur**, **Gaussian blur** và **median blur**. Nhưng trước hết, hãy hiểu blur là gì.

### 💡 Blurring thực chất làm gì?

Blurring là kỹ thuật **giảm những chuyển sắc đột ngột** trong ảnh bằng cách lấy trung bình các giá trị pixel trong một vùng lân cận cục bộ (local neighborhood). Hãy tưởng tượng một đường zíc zắc sắc nét: nếu mình chọn một lưới nhỏ rồi lấy trung bình các pixel bên trong, chỗ cao và chỗ thấp sẽ hòa vào nhau thành một giá trị ở giữa. Kết quả là ảnh mượt hơn.

Blur đem lại hai lợi ích:

* **Giảm nhiễu (noise):** nếu ảnh có những pixel nhảy loạn 0, 155, 255 ở các vị trí ngẫu nhiên, lấy trung bình sẽ kéo chúng về khoảng giữa, không còn gắt.
* **Làm mượt ảnh:** các mảng màu chuyển tiếp mềm mại hơn.

---

### 🧮 Average blur — trung bình đơn giản

Với **average blur**, mỗi pixel ở ảnh đầu ra là **trung bình của các pixel xung quanh** trong cửa sổ kernel. Mình chọn một lưới, lấy trung bình toàn bộ giá trị trong lưới đó và gán cho pixel trung tâm.

Trong OpenCV, hàm là `cv2.blur`:

```python
import cv2
import matplotlib.pyplot as plt
import numpy as np

image = cv2.imread("images/giraffe.png")
image_rgb  = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

kernel = 5
average_blur = cv2.blur(image_gray, (kernel, kernel))
```

`cv2.blur` nhận ảnh và **kernel size** dưới dạng tuple `(width, height)`. **Kernel càng lớn, độ mờ càng mạnh.**

---

### 🌫️ Gaussian blur — trung bình có trọng số

**Gaussian blur** dùng trung bình có trọng số: những pixel **càng gần tâm càng có ảnh hưởng lớn hơn**. Nhờ vậy blur trông tự nhiên và mượt hơn — giống kiểu ảnh chụp từ máy DSLR, hậu cảnh mờ dần theo độ sâu chứ không mờ đều một cục.

```python
gaussian_blur = cv2.GaussianBlur(image_gray, (kernel, kernel), 0)
```

Các tham số:

* **`sigmaX`** — độ lệch chuẩn của Gaussian theo trục x; **`sigmaY`** theo trục y. `sigmaX` càng lớn thì blur càng mượt. Mặc định chỉ cần điều khiển `sigmaX`, ở đây mình để `0`.
* **Kernel size bắt buộc là số lẻ.** Nếu truyền số chẵn, OpenCV báo lỗi kiểu "ksize width should be greater than zero and ksize width modulus two should be equal to one".

Mình thử `3`, rồi `15`, rồi `31` — càng tăng càng thấy rõ độ mờ.

---

### 🧪 Median blur — khử nhiễu muối tiêu

**Median blur** thay mỗi pixel bằng **trung vị (median)** của các pixel xung quanh. Nó đặc biệt hiệu quả với **salt and pepper noise** — loại nhiễu đốm hồng, đỏ, trắng, xanh lá xuất hiện ngẫu nhiên mà ảnh gốc không có.

```python
median_blur = cv2.medianBlur(image_gray, 11)
```

Khác với hai hàm trước, `cv2.medianBlur` chỉ nhận **một giá trị kernel duy nhất**, không phải tuple. Giá trị càng lớn, blur càng mạnh, nhưng khử nhiễu mạnh quá có thể làm biến dạng kết quả.

---

### 📊 So sánh bốn ảnh trên một figure

Để nhìn cùng lúc, mình vẽ bốn ảnh bằng `plt.subplot`:

```python
plt.figure(figsize=(14, 12))

plt.subplot(2, 2, 1)
plt.title("Original grayscale")
plt.imshow(image_gray, cmap="gray")
plt.axis("off")

plt.subplot(2, 2, 2)
plt.title("Average blur")
plt.imshow(average_blur, cmap="gray")
plt.axis("off")

plt.subplot(2, 2, 3)
plt.title("Gaussian blur")
plt.imshow(gaussian_blur, cmap="gray")
plt.axis("off")

plt.subplot(2, 2, 4)
plt.title("Median blur")
plt.imshow(median_blur, cmap="gray")
plt.axis("off")

plt.show()
```

Lưu ý: với kernel trong OpenCV, ảnh nên được đưa về **grayscale** trước khi xử lý, và khi hiển thị bằng Matplotlib phải thêm `cmap="gray"`.

---

### ✅ Chọn kiểu blur nào?

Nhìn kết quả: average blur làm mượt nhẹ, Gaussian blur mờ đều và mạnh, còn median blur có thể đổi cả ảnh vì nó lấy trung vị — giá trị sáng nhất hoặc tối nhất có thể bị mất. Tóm lại:

* Muốn **làm mượt ảnh**: average, median hay Gaussian đều được.
* Muốn **khử nhiễu**: ưu tiên **median blur**.
* Muốn **blur tự nhiên, có chiều sâu**: chọn **Gaussian blur**.

Đó là toàn bộ về blur filter. Hẹn các bạn ở bài tiếp theo, khi chúng ta chuyển sang phát hiện cạnh.
