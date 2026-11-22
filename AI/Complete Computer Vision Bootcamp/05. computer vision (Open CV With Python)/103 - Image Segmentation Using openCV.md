---
title: 'Bài 103 — Image segmentation với OpenCV: thresholding, K-means và watershed'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 103
status: edited
source: '103 - Image Segmentation Using openCV.md'
categories:
- AI
tags: []
---

# 🧩 Image segmentation bằng OpenCV — ba kỹ thuật kinh điển

> Nguồn: `103 - Image Segmentation Using openCV.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481479)

Chào các bạn! Bài này dài và rất đáng giá: mình sẽ học **image segmentation** — chia ảnh thành các vùng có ý nghĩa — và cài đặt ba kỹ thuật trong OpenCV là **thresholding**, **K-means clustering** và **watershed**. Cuối bài, ba kỹ thuật này sẽ cùng xuất hiện trên ba bài toán khác nhau: làm sạch nét chữ viết tay, gom màu, và tách các đồng xu chồng lên nhau.

### 👁️ Segmentation là gì?

**Image segmentation** là quá trình chia ảnh thành những vùng có ý nghĩa, ví dụ **foreground** và **background**, hoặc các vùng theo từng vật thể. Nó được dùng trong object detection, medical imaging và autonomous driving.

Ví dụ trực quan nhất là **portrait mode** trên điện thoại. Điện thoại không có cảm biến to như DSLR, nhưng vẫn cho ảnh xóa phông đẹp nhờ segmentation: thuật toán gán nhãn **1** cho các pixel thuộc về người, **0** cho phần còn lại, tạo ra một **binary mask**. Nơi nào mask bằng 0 thì áp **blur**, nơi nào bằng 1 thì giữ nguyên. Kết quả là người sắc nét, nền mờ dần — đúng kiểu ảnh DSLR.

Có nhiều biến thể:

* **Semantic segmentation** — phân loại **từng pixel** vào một lớp (ví dụ não, vùng giữa, nền trong ảnh MRI; hay đường, vỉa hè, cây cối, bầu trời trong ảnh lái xe tự hành). Mỗi lớp có một class ID riêng, nhờ đó xe có thể được lệnh "chỉ chạy trên vùng đường màu cam".
* Segmentation cũng xuất hiện trong thuật toán **selective search** của họ **R-CNN** — nó tìm các vùng có khả năng chứa vật thể rồi đưa cho CNN phân loại.

### 📊 Kỹ thuật 1 — Thresholding

**Simple thresholding** áp một ngưỡng toàn cục, ví dụ **127**, lên toàn ảnh. Pixel nào trên ngưỡng thành 255 (hoặc ngược lại tùy kiểu), dưới ngưỡng thành 0. Đây là cách segmentation đơn giản nhất.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

image = cv2.imread('images/handwritten.jpg', 0)  # đọc thẳng dạng grayscale
ret, binary = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY)
```

Lưu ý: `cv2.threshold` **bắt buộc** phải có tham số kiểu (`cv2.THRESH_BINARY` hoặc `cv2.THRESH_BINARY_INV`). `THRESH_BINARY` biến pixel trên ngưỡng thành 255; `THRESH_BINARY_INV` làm ngược lại.

**Adaptive thresholding** thì tính ngưỡng riêng cho từng vùng nhỏ (**block**), dựa trên cường độ các pixel lân cận. Nhờ vậy nó làm nổi các cạnh ở cả vùng sáng lẫn vùng tối. Có hai cách tính:

* **Mean** — lấy trung bình cường độ vùng trừ đi hằng số C.
* **Gaussian** — lấy tổng có trọng số, pixel gần tâm có ảnh hưởng lớn hơn, nên tính toán "robust" hơn.

```python
adaptive_mean = cv2.adaptiveThreshold(
    image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 9)
adaptive_gaussian = cv2.adaptiveThreshold(
    image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 9)
```

Hai tham số cuối là **blockSize = 11** và **C = 9**. C dùng để tinh chỉnh ngưỡng: cộng thêm hoặc bớt đi để đổi kết quả mà không cần đổi blockSize. Khi so sánh trên ảnh nét chữ viết tay, threshold đơn giản để lọt nhiễu (vết mực của trang phía sau), adaptive mean còn thấy vết mờ, còn adaptive Gaussian sạch nhất; tăng **C** lên **15** cho kết quả còn sạch hơn nữa.

### 🎨 Kỹ thuật 2 — K-means clustering

**K-means** là thuật toán học máy dạng clustering. Với ảnh xám, mình coi mỗi pixel là một điểm dữ liệu có cường độ; với ảnh màu, mỗi pixel là một vector **RGB** ba chiều. K-means khởi tạo ngẫu nhiên **K** tâm cụm, gán mỗi pixel vào cụm gần nhất, rồi lặp lại tới khi hội tụ.

```python
image = cv2.imread('images/shapes.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

pixel_values = image.reshape((-1, 3)).astype(np.float32)

criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
ret, labels, centers = cv2.kmeans(
    pixel_values, 3, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
```

Giải thích các tham số:

* **`criteria`** — điều kiện dừng: dừng khi sai khác giữa hai vòng lặp ≤ **0.2** (`EPS`), hoặc chạy tối đa **100** vòng (`MAX_ITER`).
* **`attempts = 10`** — chạy K-means 10 lần với khởi tạo khác nhau rồi lấy kết quả tốt nhất.
* **`cv2.KMEANS_RANDOM_CENTERS`** — khởi tạo tâm cụm ngẫu nhiên.

Sau khi có `labels` và `centers`, mình ép `centers` về `np.uint8`, dùng `centers[labels.flatten()]` để tạo lại ảnh đã gán màu theo cụm, rồi `reshape` về kích thước ảnh gốc. Với `K = 3`, ảnh được gom thành ba nhóm màu — trong đó một nhóm chính là nền trắng bao quanh các hình.

### 🌊 Kỹ thuật 3 — Watershed algorithm

**Watershed** coi ảnh xám như một **bề mặt địa hình (topographical surface)**: pixel sáng là đỉnh núi, pixel tối là thung lũng, gradient là sườn dốc. Thuật toán tách các vật thể chồng lấn bằng cách tìm **watershed line** — đường ranh giới giữa các vùng.

Cách hình dung: mỗi **local minima** (điểm thấp nhất của thung lũng) là một **seed point**. Mình "xả nước" đồng thời từ các seed này vào các **catchment basin**. Khi nước từ hai vùng gặp nhau, chỗ gặp tạo thành **watershed line** — và đó chính là biên giữa hai vật thể.

Điều hay là watershed gán **nhãn (label)** cho từng vùng: mỗi catchment basin nhận một giá trị nguyên riêng, còn các pixel trên watershed line được gán **-1**. Nhờ vậy mình đếm được số vật thể và tách được từng instance — điều mà thresholding không làm được, và K-means cũng không tự gán nhãn.

### 🪙 Cài đặt watershed trên ảnh đồng xu

Quy trình gồm các bước:

1. **Grayscale** ảnh, rồi **binary threshold** (ví dụ ngưỡng **130**, `THRESH_BINARY_INV`) để tạo mask.
2. **Loại nhiễu** bằng morphology: dùng kernel `np.ones((3, 3), np.uint8)` và `cv2.morphologyEx(..., cv2.MORPH_OPEN, kernel, iterations=4)`.
3. **Sure background**: `cv2.dilate` mask đã mở, iterations **3**.
4. **Distance transform**: `cv2.distanceTransform(opening, cv2.DIST_L2, 5)` — đo khoảng cách từ mỗi pixel tới nền gần nhất. Mask size **5** cho ước lượng chính xác hơn.
5. **Sure foreground**: threshold distance transform tại **0.7 × max**, lấy pixel trên ngưỡng thành 255, rồi ép về `np.int8`.
6. **Unknown region**: `cv2.subtract(sure_background, sure_foreground)` — vùng chưa chắc là tiền cảnh hay hậu cảnh.
7. **Markers**: `cv2.connectedComponents(sure_foreground)`, cộng **1** cho mọi nhãn, rồi gán vùng unknown bằng 0.
8. **`cv2.watershed(image, markers)`** để tạo watershed line (gán -1).

Sau đó mình lọc lại: chỉ giữ các contour **tròn**. Với từng nhãn, tạo mask riêng, tìm contour bằng `findContours`, tính **diện tích** (`cv2.contourArea`) và **chu vi** (`cv2.arcLength`). Công thức **circularity** là `4 * pi * area / (perimeter ** 2)`; chỉ giữ contour có circularity trong khoảng **0.7–1.2** và area lớn hơn **1000**. Cuối cùng vẽ contour, bounding box và ghi số thứ tự lên từng đồng xu.

Kết quả là **6 đồng xu** được phát hiện và dán nhãn, tất cả chỉ bằng OpenCV thuần, không cần deep learning. Nhưng các bạn nên nhớ: đổi nền, đổi loại xu là có thể phải chỉnh lại ngưỡng, tỉ lệ distance transform và các tham số morphology.

Vậy là mình đã đi qua ba kỹ thuật, mỗi cái giải một bài toán riêng: thresholding làm rõ nét chữ, K-means gom màu, watershed tách vật chồng lấn. Bài sau mình sẽ dùng **Haar Cascade** để phát hiện khuôn mặt.
