---
title: 'Blend ảnh khác kích thước bằng mask'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 24
status: edited
source: '024 - Blending and Pasting Images Part Two - Masks.md'
categories:
- AI
tags: []
---

# 🎭 Blend ảnh khác kích thước bằng mask

> Nguồn: `024 - Blending and Pasting Images Part Two - Masks.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12313088)

Bài trước dán đè cả ảnh nhỏ lên ảnh lớn. Nhưng nếu ảnh nhỏ có nền trắng và ta chỉ muốn lấy phần hình (ví dụ logo "do not copy"), cần dùng **mask**. Giảng viên nói thẳng: đây là một trong những việc OpenCV làm không dễ, code hơi rối, và sẽ không xuất hiện nhiều về sau — cứ đi chậm và đừng lo nếu chưa thấm hết.

### 🎯 Ý tưởng ba bước

1. Chọn **ROI** trên ảnh lớn, đúng kích thước ảnh nhỏ.
2. Tạo **mask**: vùng trắng là phần được phép đi qua.
3. Ghép phần foreground đã lọc qua mask vào ROI.

---

### 📍 Chọn ROI ở góc dưới phải

Giả sử ảnh lớn có shape `1401 × 934`, ảnh nhỏ `600 × 600`. Muốn dán vào góc dưới phải thì offset phải lùi vào đúng 600 pixel:

```python
x_offset = 934 - 600
y_offset = 1401 - 600

roi = img1[y_offset:1401, x_offset:934]
plt.imshow(roi)
```

ROI nhận được chính là vùng góc dưới phải của ảnh lớn. Có thể unpacks shape cho dễ đọc:

```python
rows, cols, channels = img2.shape
```

Với ảnh vuông, `rows` và `cols` đều bằng 600, `channels` bằng 3.

---

### ⬜ Tạo grayscale và mask nghịch

```python
img2gray = cv2.cvtColor(img2, cv2.COLOR_RGB2GRAY)
plt.imshow(img2gray, cmap='gray')
```

Ảnh xám này sẽ chặn phần màu đỏ (giá trị thấp) và cho phần nền trắng đi qua. Ta cần điều ngược lại, nên đảo mask:

```python
mask_inv = cv2.bitwise_not(img2gray)
plt.imshow(mask_inv, cmap='gray')
```

`cv2.bitwise_not` đảo từng bit: đen thành trắng, trắng thành đen. Kết quả là vùng **trắng** chính là phần logo ta muốn giữ.

---

### 🧱 Tạo nền trắng đủ ba kênh

`mask_inv` đã mất chiều kênh màu nên không ghép trực tiếp được với ảnh ba kênh. Tạo một nền trắng cùng shape với ảnh nhỏ:

```python
import numpy as np

white_background = np.full(img2.shape, 255, dtype=np.uint8)
```

`np.full` nhận shape, giá trị muốn điền, và dtype. Có thể làm bằng `np.ones(img2.shape) * 255`, nhưng `np.full` gọn hơn. Nên chỉ định `dtype=np.uint8`; nếu quên, có thể không lỗi ngay nhưng dễ phát sinh vấn đề về kiểu dữ liệu.

```python
bk = cv2.bitwise_or(white_background, white_background, mask=mask_inv)
```

`cv2.bitwise_or` tính OR từng phần tử. Truyền nền trắng hai lần rồi áp `mask_inv` sẽ tạo ra ảnh nền trắng ba kênh, trong đó phần logo hiện rõ. Có thể làm thủ công bằng cách nhân mask cho từng kênh, nhưng cách `bitwise_or` tổng quát hơn khi hình có nhiều màu.

---

### 🔗 Lấy foreground

```python
foreground = cv2.bitwise_or(img2, img2, mask=mask_inv)
plt.imshow(foreground)
```

Áp cùng mask lên ảnh gốc: chỉ phần nằm trong vùng trắng của mask được giữ, phần còn lại thành đen. Kết quả là logo với màu gốc, không còn nền trắng.

---

### 🖼️ Ghép vào ROI và trả về ảnh lớn

```python
final_roi = cv2.bitwise_or(roi, foreground)

large_img = img1
small_img = final_roi

large_img[y_offset:y_offset + small_img.shape[0],
          x_offset:x_offset + small_img.shape[1]] = small_img

plt.imshow(large_img)
```

`cv2.bitwise_or` giữa ROI và foreground (không truyền mask) sẽ chồng phần logo lên vùng ảnh đã chọn. Cuối cùng dùng lại NumPy slicing của bài trước để ghi `final_roi` vào đúng vị trí.

Kết quả: logo "do not copy" nằm gọn trong ảnh mà không mang theo nền trắng.

---

### 💡 Nhận xét

Đây là quy trình khá phức tạp và không phải thế mạnh của OpenCV. Với công việc watermark thực tế, thường dùng Photoshop hay Adobe Illustrator sẽ nhanh hơn. Tuy vậy, hiểu mask và bitwise operation rất có ích: cùng cơ chế này quay lại khi tính histogram trên một vùng ảnh ở bài sau.
