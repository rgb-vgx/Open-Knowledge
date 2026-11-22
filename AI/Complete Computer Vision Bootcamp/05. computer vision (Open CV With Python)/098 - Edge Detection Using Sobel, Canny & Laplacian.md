---
title: 'Bài 098 — Phát hiện cạnh với Sobel, Laplacian và Canny'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 98
status: edited
source: '098 - Edge Detection Using Sobel, Canny & Laplacian.md'
categories:
- AI
tags: []
---

# 🪄 Phát hiện cạnh: Sobel, Laplacian và Canny

> Nguồn: `098 - Edge Detection Using Sobel, Canny & Laplacian.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48423213)

Chào các bạn! **Edge detection** (phát hiện cạnh) là một thành phần rất quan trọng của computer vision: nó giúp xác định **ranh giới vật thể** và các đặc trưng cấu trúc trong ảnh. Bài này mình sẽ hiểu "cạnh" là gì, vì sao phải phát hiện cạnh, rồi đi qua ba phương pháp: **Sobel**, **Laplacian** và **Canny**.

### 🔍 Cạnh là gì?

Một **cạnh** đại diện cho sự **thay đổi đột ngột về cường độ sáng hoặc màu** trong ảnh. Những thay đổi này thường tương ứng với **ranh giới vật thể**, **kết cấu (texture)** hoặc các đặc trưng quan trọng khác.

Hãy tưởng tượng ảnh có ba vùng màu: trắng → xám → xám đậm. Có hai chỗ chuyển màu rõ rệt, tức hai cạnh. Chỗ nào màu "nhảy" mạnh thì đó là cạnh.

---

### 🎯 Vì sao phải phát hiện cạnh?

Ta dùng edge detection cho **feature extraction**, **shape analysis** và **pre-processing**.

Ví dụ một người đứng trước hậu cảnh phức tạp nhiều màu. Nếu muốn huấn luyện CNN hay mô hình AI, ta không quan tâm màu sắc và gradient — ta quan tâm **cấu trúc** của người đó. Tương tự, nếu vẽ lại ngôi nhà gỗ với nhiều sắc nâu, các bạn sẽ không tô màu mà chỉ **phác đường viền**. Edge detection chính là việc "dùng bút chì tô lại đường viền" của ảnh: bỏ đi các mảng đổ bóng thừa, chỉ giữ cấu trúc.

---

### 📐 Sobel filter

**Sobel** phát hiện cạnh theo **hướng ngang và dọc**: trước tiên theo x, sau đó theo y, rồi gộp lại. Nó tính cạnh bằng **gradient**, và gradient đã được "mô phỏng toán học" sẵn trong kernel — ta không phải tự tính đạo hàm, chỉ cần convolution.

Các bước của Sobel:

1. Convolution ảnh với kernel ngang → `Ig_x`, và kernel dọc → `Ig_y`.
2. Tính **magnitude** cho từng pixel: `G = sqrt(Ig_x² + Ig_y²)`.
3. Áp một **ngưỡng (threshold)**: giá trị trên ngưỡng thành 1 (cạnh), dưới ngưỡng thành 0.

```python
sobel_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=3)
sobel_combined = cv2.magnitude(sobel_x, sobel_y)
```

`cv2.Sobel` nhận ảnh, **độ sâu đầu ra** (`cv2.CV_64F` cho số thực), rồi `dx`, `dy` (1 nếu lấy đạo hàm theo hướng đó), và `ksize`. Ngưỡng là thứ ta phải "vọc" để có cạnh đẹp nhất.

---

### 🌀 Laplacian filter

**Laplacian** phát hiện cạnh bằng cách tìm vùng **thay đổi cường độ nhanh**, nhưng khác Sobel, nó **gộp đạo hàm theo x và y vào một phép toán duy nhất**. Đây cũng là đạo hàm đã được mô phỏng sẵn trong kernel (đạo hàm bậc hai), không phải tính tay.

```python
laplacian = cv2.Laplacian(image, cv2.CV_64F, ksize=3)
laplacian_abs = np.absolute(laplacian)
```

Vì cạnh chỉ là thay đổi cường độ, **dấu âm hay dương không quan trọng**. Laplacian cho cả giá trị âm lẫn dương, nên ta lấy trị tuyệt đối (`np.absolute`) để hiển thị. Chính việc biến số âm thành dương này tạo ra khá nhiều nhiễu trong kết quả.

---

### 🧠 Canny edge detector

**Canny** là thuật toán tiên tiến nhất trong ba, dùng **xử lý nhiều bước** và kết hợp Sobel với thresholding. Các bước:

1. **Chuyển sang grayscale** — vì cạnh nằm ở thông tin thay đổi màu, không phải màu itself.
2. **Gaussian blur** — làm mượt, giảm nhạy với thay đổi màu nhỏ và nhiễu.
3. **Tính gradient bằng Sobel** theo x và y (xấp xỉ đạo hàm bậc một), rồi tính **magnitude** và **góc cạnh** bằng `arctan(Gy / Gx)`.
4. **Non-maximum suppression** — so magnitude của mỗi pixel với hai pixel lân cận **dọc theo hướng gradient**; nếu không phải lớn nhất thì triệt tiêu về 0. Mục tiêu là bỏ thông tin dư thừa quanh cạnh chính.
5. **Double thresholding** — pixel trên **ngưỡng cao** là cạnh mạnh; giữa ngưỡng thấp và cao là cạnh yếu; dưới ngưỡng thấp bị loại hẳn.
6. **Edge tracking by hysteresis** — cạnh yếu được giữ nếu **nối liền với cạnh mạnh**, ngược lại bị bỏ.

```python
canny_edges = cv2.Canny(image, 100, 200)
```

Canny là phương pháp tốn tính toán nhất trong ba, nhưng đổi lại cho cạnh sạch và ít nhiễu nhất.

---

### 🧪 Chạy thử và so sánh

Sau khi tính `sobel_x`, `sobel_y`, `laplacian` và `canny`, mình vẽ tất cả bằng vòng lặp:

```python
titles = ["Original", "Sobel", "Laplacian", "Canny"]
images = [image, sobel_combined, laplacian_abs, canny_edges]

plt.figure(figsize=(20, 16))
for i in range(len(titles)):
    plt.subplot(2, 2, i + 1)
    plt.imshow(images[i], cmap="gray")
    plt.title(titles[i])
    plt.axis("off")
plt.show()
```

Kết quả: **Sobel** cho cạnh khá tốt so với chi phí tính toán; **Laplacian** (sau khi lấy trị tuyệt đối) nhiều nhiễu; còn **Canny** cho cạnh rõ nhất vì nó đã xử lý luôn phần nhiễu. Với Sobel, nếu chưa thấy cạnh nổi bật thì có thể thử chuẩn hóa, còn không thì Canny vẫn là lựa chọn đẹp nhất.

Đó là toàn bộ về edge detection. Hẹn các bạn ở bài tiếp theo!
