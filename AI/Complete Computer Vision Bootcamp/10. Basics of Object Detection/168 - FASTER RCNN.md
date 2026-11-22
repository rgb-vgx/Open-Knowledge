---
title: 'Bài 168 — Faster R-CNN và Region Proposal Network'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 168
status: edited
source: '168 - FASTER RCNN.md'
categories:
- AI
tags: []
---
# 🧠 Faster R-CNN: để mạng tự đề xuất vùng

> Nguồn: `168 - FASTER RCNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49150743)

Chào các bạn! **Faster R-CNN** là kiến trúc đến nay vẫn được dùng thực tế, trong khi R-CNN và Fast R-CNN gần như đã bị bỏ. Bước đột phá của nó là thay **selective search** bằng một mạng deep learning riêng — **Region Proposal Network (RPN)**. Bài này ta đi qua pipeline và cơ chế RPN.

### 🏗️ Pipeline tổng thể

1. **Convolution backbone** — ảnh đầu vào đi thẳng qua CNN (như **ResNet** hoặc **VGG**) để trích **feature map**. Feature map giữ thông tin không gian và là đầu vào cho các lớp sau.
2. **RPN** — mạng **fully convolutional** quét feature map để sinh **region proposals**, dự đoán vùng nào chứa object, đồng thời tinh chỉnh box.
3. **ROI pooling** — các proposal từ RPN được **chiếu lên feature map** rồi resize về một **feature kích thước cố định**, cho phép xử lý vùng ở nhiều kích thước khác nhau.
4. **Fully connected layers** — feature cố định đi qua lớp FC.
5. **Hai nhánh song song** — **classification head** (dog, car, person…) và **regression head** (toạ độ bounding box).

### 🔍 RPN hoạt động thế nào?

RPN là một **CNN hoàn chỉnh, tách biệt** nằm bên trong Faster R-CNN — trong một mạng lại có một mạng con. Cơ chế:

* **Sliding window** — một cửa sổ nhỏ **3×3** trượt trên feature map để tìm object.
* **Intermediate layer** — thông tin từ cửa sổ được đưa vào một lớp trung gian **256 chiều**.
* Từ lớp này rẽ ra hai head **nằm trong RPN**:
  1. **Classification** — xuất **2k** score, quyết định vùng là **foreground (có object)** hay **background**.
  2. **Regression** — xuất **4k** toạ độ, **tinh chỉnh box** và **điều chỉnh anchor box** cho khớp object.

Trong đó **k là số anchor tại mỗi vị trí**. Theo paper gốc, mặc định **k = 9** (3 scale × 3 aspect ratio).

### ⚓ Anchor Boxes

Anchor có thể hình dung như một sliding window nhưng gắn với **scale** và **aspect ratio** cụ thể. Vì object trong ảnh có thể **nhỏ, lớn, hẹp, rộng**, ta cần nhiều anchor để "phủ" các trường hợp đó.

Với feature map kích thước **W×H**, mỗi vị trí có **k anchor**, nên đầu ra RPN mang thêm chiều **k**. Bộ anchor mặc định dùng **3 scale** và **3 aspect ratio** — tổ hợp thành 9 box cho mỗi vị trí.

Đừng nhầm nhé: **2k** ở đây không phải 2000; nó là `2 × số anchor` (2 lớp foreground/background cho mỗi anchor).

### ✅ Ưu điểm

* **Độ chính xác detection cao**.
* **Train end-to-end** — có thể train cả mạng một lần; cũng có thể train RPN riêng.
* **RPN thay selective search** — region proposal giờ học được, hiệu quả hơn.
* **Xử lý được nhiều object và nhiều scale** nhờ anchor boxes.

### ⚠️ Nhược điểm

* **Tốn tính toán** — cần GPU mạnh cho ứng dụng real-time.
* **Không real-time**.
* **Nhạy cảm với object nhỏ** — object nhỏ có thể bị bỏ sót, hiệu năng hạn chế.

Dù vậy, Faster R-CNN vẫn được dùng rộng rãi trong production: **xe tự hành**, **phân tích ảnh y tế**, **hệ thống giám sát**. Mình khuyên các bạn đọc paper gốc — nó là điểm khởi đầu rất tốt cho hành trình object detection.

---
### ✅ Tóm lại

Faster R-CNN = backbone CNN + RPN (sliding window 3×3, anchor 9 box, head phân loại foreground/background và regression) + ROI pooling + hai head cuối. Đây là kiến trúc two-stage mạnh, chính xác, và là nền cho Mask R-CNN. Bài sau ta xem cách hiện thực nó bằng PyTorch. Hẹn gặp!
