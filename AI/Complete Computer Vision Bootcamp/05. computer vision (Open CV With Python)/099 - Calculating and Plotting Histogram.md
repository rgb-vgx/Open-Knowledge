---
title: 'Bài 099 — Tính và vẽ histogram của ảnh'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 99
status: edited
source: '099 - Calculating and Plotting Histogram.md'
categories:
- AI
tags: []
---

# 📊 Histogram — "tia X" nhìn vào bên trong ảnh

> Nguồn: `099 - Calculating and Plotting Histogram.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48423251)

Chào các bạn! Bài này mình nói về một công cụ nền tảng của xử lý ảnh: **histogram**. Hãy nghĩ histogram như "tia X" của một bức ảnh — nó cho ta nhìn lén vào thành phần bên trong: độ sáng, độ tương phản, dynamic range, và cả khả năng cân bằng (equalization) của ảnh.

### 🧭 Histogram là gì?

**Histogram** là biểu diễn đồ họa về **phân bố các pixel** trong ảnh. Trong ảnh grayscale, pixel giá trị `0` là đen, `255` là trắng, ở giữa là xám. Với ảnh RGB thì đó là cường độ của kênh đỏ, xanh lá và xanh dương.

* Ảnh rất tối/đen → cột tại giá trị `0` rất cao.
* Ảnh trắng → cột tại `255` rất cao.

Từ histogram ta đọc được nhiều thứ:

* **Độ sáng:** nhiều pixel trong khoảng `200–255` → ảnh sáng; dồn trong `0–100` → ảnh tối.
* **Độ tương phản:** histogram trải rộng → tương phản tốt.
* **Dynamic range:** mức phân bố đều của các giá trị cường độ, không bị lệch hẳn về tối hay sáng.
* **Equalization:** xem có thể cân bằng lại độ sáng để ảnh không bị thiên lệch về một cường độ nào không.

---

### 🎨 Histogram cho ảnh RGB

Đầu tiên mình đọc ảnh, chuyển sang RGB rồi tách kênh bằng `cv2.split`:

```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread("images/giraffe.png")
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

channels = cv2.split(image_rgb)
colors = ("r", "g", "b")
```

Với ảnh RGB, `cv2.split` trả về các kênh theo thứ tự **R, G, B**. Giờ tính histogram cho từng kênh bằng `cv2.calcHist`:

```python
for channel, color in zip(channels, colors):
    hist = cv2.calcHist([channel], [0], None, [256], [0, 256])
    plt.plot(hist, color=color)

plt.title("Color histogram")
plt.xlabel("Pixel intensity")
plt.ylabel("Frequency")
plt.show()
```

Các tham số của `cv2.calcHist(images, channels, mask, histSize, ranges)`:

* **`[channel]`** — danh sách ảnh đầu vào, ở đây là một kênh đơn.
* **`[0]`** — chỉ số kênh cần tính; vì đang xét một kênh như ảnh grayscale nên dùng `0`.
* **`None`** — mask; `None` nghĩa là tính cho toàn bộ ảnh.
* **`[256]`** — số bin, vì cường độ chạy từ 0 đến 255.
* **`[0, 256]`** — khoảng giá trị.

Nhìn kết quả với ảnh hươu cao cổ: kênh **blue** có đỉnh ở vùng sáng `230–240` (xanh nhạt); **green** đỉnh quanh `170–200`; **red** thấp hơn, dồn ở vùng tối `100–150`. Như vậy ta thấy được tông màu chủ đạo của ảnh.

---

### 🔄 Chuyển sang HSV để hiểu sâu hơn

Muốn hiểu rõ **độ sáng** của ảnh, ta chuyển từ RGB sang **HSV** (hue, saturation, value):

```python
image_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
h, s, v = cv2.split(image_hsv)
```

Điểm khác biệt quan trọng: trong OpenCV, **hue chỉ chạy từ 0 đến 179** (không phải 0–360; dải bin vẫn tính là `[0, 180)`), còn **saturation** và **value** chạy 0–255 như pixel thường. Vì vậy histogram của ba kênh có range khác nhau:

```python
hist_h = cv2.calcHist([h], [0], None, [180], [0, 180])
hist_s = cv2.calcHist([s], [0], None, [256], [0, 256])
hist_v = cv2.calcHist([v], [0], None, [256], [0, 256])
```

Mình vẽ ba histogram trên một hàng bằng `plt.subplots`:

```python
fig, ax = plt.subplots(1, 3, figsize=(15, 5))

ax[0].plot(hist_h, color="orange")
ax[0].set_title("Hue histogram")
ax[0].set_xlabel("bins")
ax[0].set_ylabel("frequency")

ax[1].plot(hist_s, color="green")
ax[1].set_title("Saturation histogram")
ax[1].set_xlabel("bins")

ax[2].plot(hist_v, color="blue")
ax[2].set_title("Value histogram")
ax[2].set_xlabel("bins")

plt.tight_layout()
plt.show()
```

Lưu ý khi dùng `subplots`: phải gọi `set_title`, `set_xlabel`, `set_ylabel` trên từng `axes`, không dùng `plt.title` như trước.

---

### ✅ Đọc thông tin từ histogram

Với ảnh hươu cao cổ:

* **Hue** tập trung ở một vùng hẹp → ảnh chỉ dùng vài tông màu trên bánh xe màu, không đa dạng.
* **Saturation** có đỉnh trong khoảng `80–200` → màu không quá rực cũng không quá nhạt, nhưng nghiêng về phía đậm.
* **Value** phần lớn nằm trong `220–240` → ảnh **không tối**, khá sáng. Quy tắc nhanh: nếu phần lớn pixel lớn hơn `150` thì ảnh sáng, nhỏ hơn `150` thì ảnh tối.

Chỉ từ histogram ta đã kết luận được ảnh sáng hay tối, màu chủ đạo là gì, độ tương phản ra sao.

Histogram cực kỳ linh hoạt và là nền tảng cho nhiều kỹ thuật xử lý ảnh nâng cao như **contrast enhancement** và **thresholding**. Bài sau chúng ta sẽ đi vào **histogram equalization**, rồi tới **CLAHE**. Hẹn gặp các bạn!
