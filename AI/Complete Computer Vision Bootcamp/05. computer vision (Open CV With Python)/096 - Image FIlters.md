---
title: 'Bài 096 — Bộ lọc ảnh và kernel tự chế trong OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 96
status: edited
source: '096 - Image FIlters.md'
categories:
- AI
tags: []
---

# 🧪 Bộ lọc ảnh và kernel tự chế trong OpenCV

> Nguồn: `096 - Image FIlters.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48423023)

Chào các bạn! Bài này mình sẽ hiểu **image filter** từ gốc: filter là gì, kernel là gì, phép **convolution** diễn ra thế nào, rồi tự tay tạo **kernel ngang, dọc, chéo** để tách đặc trưng khỏi ảnh. Đây chính là nền tảng cho các bộ lọc mạnh hơn như Sobel hay Gaussian sau này.

### 🧩 Filter và kernel khác nhau thế nào?

**Filter** là một tập luật áp lên ảnh để làm nổi bật hoặc tách một đặc trưng nào đó. Ví dụ: filter **edge detection** làm rõ cạnh, filter **Gaussian blur** làm mượt da hoặc xóa phông.

**Kernel** là **ma trận 3 x 3, 5 x 5... (n x n)** quy định cách filter tác động lên ảnh. Nói cách khác, kernel là phần lõi tính toán, còn tên gọi như "horizontal filter" là tên gắn cho kernel đó. Trong thực tế hai từ thường được dùng lẫn nhau, nhưng cần nhớ: kernel là **ma trận**, filter là **khái niệm/luật**.

---

### 🔍 Convolution hoạt động ra sao?

Giả sử ảnh có kích thước **4 x 5**, kernel kích thước **3 x 3**. Ta **đặt kernel lên trên ảnh**, sao cho nó phủ 9 pixel.

Với mỗi vị trí, ta nhân từng phần tử kernel với pixel tương ứng rồi **cộng tất cả lại** để ra một giá trị mới.

Ví dụ với kernel ngang:

```text
-1 -1 -1
 0  0  0
 1  1  1
```

Đặt lên vùng ảnh có giá trị `50` ở hàng trên, `150` ở giữa, `250` ở dưới:

* Hàng trên: `-1*50 + -1*50 + -1*50 = -150`
* Hàng giữa: `0*150 + 0*150 + 0*150 = 0`
* Hàng dưới: `1*250 + 1*250 + 1*250 = 750`

Tổng lại: `-150 + 0 + 750 = 600`. Con số `600` này là giá trị đầu ra tại vị trí đó.

Sau đó ta **trượt kernel sang một pixel** và lặp lại. Cứ thế cho hết ảnh. Quá trình trượt và tính toán này gọi là **convolution**.

---

### 📏 Stride, padding và chuẩn hóa giá trị

Khi kernel trượt, số pixel dịch mỗi bước gọi là **stride**. Đi một pixel là **stride 1**; nhảy hai pixel là **stride 2**. Với stride 1 trên ảnh 4 x 5, kernel 3 x 3 sẽ cho ra ảnh nhỏ hơn (ở ví dụ là 2 x 3 = 6 giá trị) vì mép ảnh không đủ chỗ đặt kernel.

**Padding** là việc thêm viền quanh ảnh để kernel có thể phủ cả mép, giúp đầu ra giữ nguyên kích thước đầu vào. Khi dùng OpenCV, stride và padding được xử lý tự động, nên ảnh ra **cùng kích thước** ảnh vào.

Một vấn đề nữa: pixel ảnh hợp lệ chỉ nằm trong khoảng **0 – 255**, nhưng phép tính vừa rồi cho ra `600` (vượt 255) hoặc có lúc ra số âm. Có hai cách xử lý:

1. **Clipping**: giá trị dưới 0 gán thành 0, trên 255 gán thành 255.
2. **Min-max normalization**: lấy `(giá trị - min) / (max - min) * 255` để co toàn bộ dải giá trị về `0 – 255`, giữ được tương quan giữa các pixel.

---

### 💡 Vì sao kernel dò được cạnh?

Nhìn lại kernel ngang `-1 -1 -1 / 0 0 0 / 1 1 1`. Nó chia ảnh thành ba dải: trên (âm), giữa (trung tính), dưới (dương).

* Nếu vùng ảnh phía trên và phía dưới có **cùng độ sáng**, tổng âm và tổng dương triệt tiêu nhau → kết quả gần 0.
* Nếu phía trên tối, phía dưới sáng (hoặc ngược lại), tổng sẽ **lệch lớn** → kết quả lớn.

Mà "cạnh" (edge) chính là chỗ có **sự chuyển tiếp độ sáng** — ví dụ từ trắng (255) sang đen (0). Tại vị trí có cạnh ngang, kernel cho ra giá trị lớn; tại vùng phẳng, giá trị nhỏ. Vì vậy giá trị đầu ra cao = dấu hiệu có cạnh ngang.

Độ chênh giữa hai phía càng lớn thì cạnh càng rõ. Nếu trên là 255 và dưới là 200, vẫn có cạnh nhưng yếu hơn so với 255 và 0.

---

### 💻 Tự tạo kernel ngang, dọc, chéo

Mình đọc ảnh ở chế độ **grayscale** cho dễ quan sát, rồi áp kernel bằng `cv2.filter2D`:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread("filter.jpg", cv2.IMREAD_GRAYSCALE)
```

**Kernel ngang** — làm nổi các đường ngang:

```python
horizontal_kernel = np.array([
    [-1, -1, -1],
    [ 0,  0,  0],
    [ 1,  1,  1],
])
horizontal_filtered = cv2.filter2D(image, -1, horizontal_kernel)
```

**Kernel dọc** — xoay kernel ngang 90 độ:

```python
vertical_kernel = np.array([
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1],
])
vertical_filtered = cv2.filter2D(image, -1, vertical_kernel)
```

**Kernel chéo** — các phần tử âm và dương xếp theo đường chéo:

```python
diagonal_kernel = np.array([
    [-1, -1,  0],
    [-1,  0,  1],
    [ 0,  1,  1],
])
diagonal_filtered = cv2.filter2D(image, -1, diagonal_kernel)
```

Tham số thứ hai `-1` trong `cv2.filter2D` nghĩa là **độ sâu ảnh ra giữ nguyên như ảnh vào** (ở đây là `uint8`).

Điểm mấu chốt khi tự chế kernel: **phần âm và phần dương phải đặt đối nhau**, và **độ chênh giữa chúng phải đủ lớn** thì mới tách được đặc trưng. Trong bài, giảng viên thử tăng hệ số từ `1` lên `5`, `10`, `15`, `20` để cạnh hiện rõ hơn — càng lớn thì càng nét nhưng cũng dễ bắt cả nhiễu. Đây là phần thực nghiệm tùy nhu cầu.

Cuối cùng, gom ảnh gốc và ba kết quả vào một figure 2 x 2 để so sánh trực quan:

```python
plt.figure(figsize=(10, 10))
plt.subplot(2, 2, 1); plt.imshow(image, cmap="gray"); plt.title("Original")
plt.subplot(2, 2, 2); plt.imshow(horizontal_filtered, cmap="gray"); plt.title("Horizontal")
plt.subplot(2, 2, 3); plt.imshow(vertical_filtered, cmap="gray"); plt.title("Vertical")
plt.subplot(2, 2, 4); plt.imshow(diagonal_filtered, cmap="gray"); plt.title("Diagonal")
plt.show()
```

Kết quả: ảnh lọc ngang chỉ còn các đường ngang; ảnh lọc dọc nổi đường dọc; ảnh lọc chéo nổi đường chéo.

---

### ✅ Tổng kết

Bài này đã làm rõ ba tầng: **filter** là luật, **kernel** là ma trận, **convolution** là phép trượt kernel và tính tổng. Từ đó mình tự tạo được kernel ngang, dọc, chéo và áp bằng `cv2.filter2D` để tách từng loại đặc trưng. Hẹn gặp các bạn ở bài sau, nơi ta dùng các bộ lọc blur và edge detection có sẵn của OpenCV.
