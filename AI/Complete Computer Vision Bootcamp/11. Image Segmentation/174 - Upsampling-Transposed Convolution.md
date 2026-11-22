---
title: 'Bài 174 — Upsampling và Transposed Convolution'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 174
status: edited
source: '174 - Upsampling-Transposed Convolution.md'
categories:
- AI
tags: []
---
# 📈 Upsampling và Transposed Convolution

> Nguồn: `174 - Upsampling-Transposed Convolution.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49214085)

Chào các bạn! Bài trước ta **nén** ảnh bằng downsampling; bài này làm ngược lại — **tăng spatial resolution** bằng **upsampling**. Đây là kỹ thuật bắt buộc cho segmentation và image generation. Ta sẽ so sánh interpolation (không học) với **transposed convolution** (học được).

### 📖 Upsampling là gì?

**Upsampling** là quá trình **tăng spatial resolution** của ảnh hoặc feature map. Giống như kéo giãn một ảnh nhỏ thành lớn hơn nhưng vẫn giữ cấu trúc gốc.

Các phương pháp phổ biến (đã gặp ở module OpenCV):

* **Nearest neighbor interpolation** — lặp lại giá trị pixel gần nhất.
* **Bilinear interpolation** — lấy trung bình có trọng số của các pixel lân cận.
* Và một số phương pháp khác.

Ví dụ ảnh 2×2

```text
1  2
3  4
```

được upscale thành 4×4; cách điền các pixel mới phụ thuộc thuật toán.

### 🧠 Vì sao cần upsampling?

Sau nhiều lần convolution + pooling, feature map bị nén xuống rất nhỏ. Giả sử input **640×640** nhưng feature map chỉ còn **16×16×512**. Trong khi đó, segmentation cần output gần với kích thước ảnh gốc (ví dụ **512×512×3**) để phân loại từng pixel.

Nếu chỉ downsampling, model sẽ mắc kẹt ở biểu diễn độ phân giải thấp, không xuất được ảnh chi tiết. **Upsampling khôi phục spatial detail** sau chuỗi convolution. Kiến trúc **U-Net** (dùng cho semantic segmentation) chính là sự kết hợp downsampling và upsampling để đưa feature map độ phân giải thấp về kích thước ảnh gốc.

Ứng dụng: **image segmentation**, **GAN / super-resolution**, **generative models**, **medical imaging**, **image denoising**, **style transfer**.

### ⚙️ Transposed Convolution là gì?

**Transposed convolution** (còn gọi là *deconvolution*) là convolution dùng để **upsample** feature map. Điểm mấu chốt: nó **học cách upscale bằng trainable filters**.

* Nearest neighbor, bilinear… là **thuật toán cố định**, không có tham số học → **không thể** là một phần của CNN.
* Transposed convolution có **tham số học được**, train bằng **backpropagation** và **gradient descent** → gắn vào CNN như một layer bình thường.

### 💻 Thử bằng PyTorch

```python
import torch
import torch.nn.functional as F

image = torch.tensor([[1., 2.], [3., 4.]]).unsqueeze(0).unsqueeze(0)  # (1,1,2,2)

# 1) Nearest neighbor
up_nn = F.interpolate(image, scale_factor=2, mode="nearest")
print(up_nn.squeeze())   # 4x4, giá trị được lặp lại

# 2) Transposed convolution
conv_t = torch.nn.ConvTranspose2d(1, 1, kernel_size=3, stride=2, padding=1, output_padding=1)
up_conv = conv_t(image)
print(up_conv.squeeze()) # 4x4, giá trị học được
```

`F.interpolate(..., scale_factor=2, mode="nearest")` biến 2×2 thành 4×4 bằng cách **lặp lại** giá trị gần nhất. `ConvTranspose2d` với `kernel_size=3, stride=2, padding=1` cũng cho đầu ra 4×4 nhờ thêm `output_padding=1` (nếu thiếu tham số này, output sẽ là 3×3).

### 🔄 Khác biệt cốt lõi

* **Interpolation** đơn thuần **kéo giãn** ma trận, lặp lại các giá trị có sẵn.
* **Transposed convolution** **mở rộng** ma trận bằng cách **học giá trị pixel mới** qua convolution có trọng số. Giá trị điền vào được tối ưu qua backprop để **giảm loss** — không phải phép nhân bản máy móc.

Có thể hình dung: từ feature map nén 2×2, transposed conv ánh xạ ngược về 4×4 với các giá trị do mạng **học** ra, sao cho kết quả cuối cùng khớp nhất với ảnh gốc/mask mục tiêu.

---
### ✅ Tóm lại

Upsampling tăng độ phân giải; interpolation thì cố định, transposed convolution thì học được và là lựa chọn cho CNN segmentation. U-Net sẽ dùng cả hai chiều down/up để tái tạo chi tiết. Bài sau ta học **các hàm loss cho segmentation**. Hẹn gặp!
