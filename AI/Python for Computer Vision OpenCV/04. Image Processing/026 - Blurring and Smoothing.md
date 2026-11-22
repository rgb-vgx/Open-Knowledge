---
title: 'Blurring và smoothing: kernel hoạt động như thế nào'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 26
status: edited
source: '026 - Blurring and Smoothing.md'
categories:
- AI
tags: []
---

# 🌫️ Blurring và smoothing — hiểu kernel trước khi code

> Nguồn: `026 - Blurring and Smoothing.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257660)

Làm mờ (blurring) và làm trơn (smoothing) là thao tác rất phổ biến: giúp khử noise hoặc giúp ứng dụng computer vision tập trung vào chi tiết tổng quát. Phần một này chưa viết code — mình giải thích vì sao cần blur, gamma correction là gì, và kernel hoạt động ra sao.

### 🌫️ Vì sao cần blur trước edge detection

Edge detection trên ảnh độ phân giải cao mà không blur sẽ phát hiện **quá nhiều cạnh**, phần lớn là nhiễu. Ví dụ với ảnh mặt chó:

* Ảnh gốc: mặt chó rõ ràng.
* Edge detection trực tiếp: quá nhiều chi tiết, đầy nhiễu.
* Blur trước rồi edge detection: các cạnh chính của khuôn mặt hiện ra rõ hơn nhiều.

Vì edge detection sẽ học ở section sau, hiểu blur từ bây giờ là hợp lý.

---

### ☀️ Gamma correction

Gamma correction không hẳn là blur hay smoothing, nhưng thường được nhắc cùng nhóm. Nó làm ảnh sáng hơn hoặc tối hơn tùy giá trị gamma:

* `gamma = 1`: giữ nguyên ảnh gốc.
* `gamma < 1`: ảnh sáng hơn.
* `gamma > 1`: ảnh tối hơn.

Đây chính là thứ đứng sau các nút tăng/giảm độ sáng trong app chỉnh ảnh. Sang phần code ta sẽ làm bằng `np.power`.

---

### 🔢 Kernel là gì

**Kernel** là một ma trận nhỏ dùng để áp hiệu ứng lên ảnh. Tùy kernel mà hiệu ứng là blur, sharpen, vẽ viền... Trong loạt bài này ta chỉ quan tâm kernel làm mờ và làm trơn.

Để hình dung, hãy mở trang visualization **setosa.io/ev/image-kernels**. Trang hiển thị một ảnh xám phóng to để nhìn từng pixel với giá trị 0–255.

---

### 🧮 Quét kernel 3x3

Với kernel blur 3x3:

1. Lấy một khối **3 × 3 pixel** trên ảnh gốc.
2. Nhân từng pixel với giá trị tương ứng trong kernel.
3. Cộng tất cả lại.
4. Tổng đó trở thành pixel mới ở ảnh đầu ra.

Ví dụ ở góc ảnh: `206 × 0.0625 + 205 × 0.125 + ...` rồi cộng hết, cho ra `178` — giá trị pixel mới. Quét kernel đi khắp ảnh sẽ thu được ảnh đã blur.

Các giá trị `0.0625` và `0.125` trong kernel blur được chọn qua nhiều nghiên cứu để làm mờ hiệu quả. Kernel khác có thể dùng để sharpen hoặc làm outline.

---

### ⚠️ Biên ảnh

Khi quét tới sát biên, không đủ pixel để nhân với cả kernel 3x3. Có nhiều cách xử lý biên; chủ đề này sẽ quay lại kỹ khi học **convolutional neural network**, vì CNN dựa nhiều vào phép kernel để học các đặc trưng ngày càng lớn. Hiện tại chỉ cần nắm ý tưởng: kernel trượt qua ảnh, nhân rồi cộng, tạo pixel mới.

Trang setosa cũng có sẵn các kernel **Sobel** — sẽ dùng ở bài gradients. Ở đó có thể thấy kernel Sobel làm nổi cạnh theo chiều ngang hoặc dọc.

Phần hai sẽ áp những ý tưởng này bằng OpenCV: gamma correction, tự tạo kernel với `filter2D`, rồi các hàm blur có sẵn.
