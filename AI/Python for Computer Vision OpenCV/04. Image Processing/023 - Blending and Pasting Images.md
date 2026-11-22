---
title: 'Blend và paste ảnh với addWeighted'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 23
status: edited
source: '023 - Blending and Pasting Images.md'
categories:
- AI
tags: []
---

# 🖼️ Blend và paste ảnh chồng lên nhau

> Nguồn: `023 - Blending and Pasting Images.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257654)

OpenCV có nhiều cách ghép ảnh. Bài này đi qua hai việc: **blend** hai ảnh cùng kích thước bằng `cv2.addWeighted`, và **overlay** một ảnh nhỏ lên ảnh lớn bằng NumPy slicing. Phần blend ảnh khác kích thước dùng mask sẽ để bài sau.

### 🧮 Công thức addWeighted

Ảnh blend được tính theo weighted sum:

```text
new_pixel = alpha × pixel_1 + beta × pixel_2 + gamma
```

* `alpha` càng lớn thì ảnh thứ nhất càng hiện rõ.
* `beta` càng lớn thì ảnh thứ hai càng hiện rõ.
* `gamma` là hệ số cộng thêm tùy chọn.

---

### 📥 Chuẩn bị hai ảnh

```python
import cv2
import matplotlib.pyplot as plt
%matplotlib inline

img1 = cv2.imread('DATA/dog_backpack.jpg')
img2 = cv2.imread('DATA/watermark_no_copy.png')

img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
```

Hai ảnh này **không cùng kích thước**: ảnh dog backpack khoảng `1400 × 800`, ảnh watermark gần vuông, hơn `1200 × 1200`. Vì vậy trước tiên resize cả hai về cùng cỡ để làm ví dụ đơn giản:

```python
img1 = cv2.resize(img1, (1200, 1200))
img2 = cv2.resize(img2, (1200, 1200))
```

Resize sẽ làm ảnh dog backpack bị méo — chấp nhận trong ví dụ này, vì mục tiêu là thấy cách blend hoạt động.

---

### ⚖️ Blend hai ảnh cùng kích thước

```python
blended = cv2.addWeighted(src1=img1, alpha=0.5,
                          src2=img2, beta=0.5, gamma=0)
plt.imshow(blended)
```

Với `alpha = beta = 0.5`, hai ảnh hiện ngang nhau. Ảnh watermark có nền trắng nên phần trắng hiện lên trên ảnh dog backpack, khiến ảnh trông nhạt hơn.

Muốn ảnh thứ nhất nổi bật, tăng `alpha` và giảm `beta`:

```python
blended = cv2.addWeighted(src1=img1, alpha=0.8,
                          src2=img2, beta=0.2, gamma=0)
```

Lúc này gần như chỉ còn thấy ảnh dog backpack. `alpha` và `beta` là hai tham số quan trọng nhất; `gamma` có thể thử thêm nhưng thường ít ảnh hưởng hơn.

---

### 📌 Overlay ảnh nhỏ lên ảnh lớn

`cv2.addWeighted` chỉ dùng được khi hai ảnh **cùng kích thước**. Nếu khác kích thước, làm theo cách khác: chọn một vùng trên ảnh lớn rồi gán giá trị của ảnh nhỏ vào.

```python
img2 = cv2.resize(img2, (600, 600))

large_img = img1
small_img = img2

x_offset = 0
y_offset = 0

y_end = y_offset + small_img.shape[0]
x_end = x_offset + small_img.shape[1]

large_img[y_offset:y_end, x_offset:x_end] = small_img
plt.imshow(large_img)
```

Cách đọc:

* `x_offset`, `y_offset` là điểm bắt đầu dán ảnh nhỏ; `0, 0` là góc trên trái.
* Chiều kết thúc = offset + kích thước ảnh nhỏ.
* `shape[0]` là số hàng (chiều cao), `shape[1]` là số cột (chiều rộng).

Lưu ý thứ tự slice hơi ngược trực giác: NumPy coi **hàng là trục Y**, **cột là trục X**, nên phải viết `large_img[y_offset:y_end, x_offset:x_end]`. Ở đây ta không blend gì cả, chỉ thay hẳn pixel của vùng đó bằng ảnh nhỏ.

Có thể viết gọn trong một dòng thay vì tách `x_end`, `y_end`; trong bài tách ra chỉ để dễ đọc.

---

### 💡 Tóm tắt

* Ảnh cùng kích thước: `cv2.addWeighted` với `alpha`, `beta`, `gamma`.
* Ảnh khác kích thước: chọn ROI bằng NumPy slicing rồi gán đè — không có blend.
* `addWeighted` sẽ báo lỗi nếu hai ảnh khác kích thước.

Bài sau sẽ blend ảnh khác kích thước bằng **mask**, để chỉ phần cần thiết của ảnh nhỏ được dán lên.
