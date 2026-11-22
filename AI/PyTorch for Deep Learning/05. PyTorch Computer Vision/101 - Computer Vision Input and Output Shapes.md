---
title: 'Bài 101 — Shape đầu vào và đầu ra của bài toán computer vision'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 101
status: edited
source: '101 - Computer Vision Input and Output Shapes.md'
categories:
- AI
tags: []
---

# 📐 Shape đầu vào và đầu ra của bài toán computer vision

> Nguồn: `101 - Computer Vision Input and Output Shapes.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32903012)

Mọi bài toán machine learning rồi cũng quy về hai câu hỏi: **đưa dữ liệu thành số** và **làm cho shape khớp nhau**. Với ảnh cũng vậy. Bài này mình sẽ lấy một bài phân loại ảnh nhiều lớp làm ví dụ, rồi mổ xẻ shape đầu vào và đầu ra.

### 🍣 Một ảnh được mã hóa thành gì?

Giả sử ta có ảnh món ăn kích thước **24 x 24** với **3 color channel** — một giá trị cho đỏ, một cho xanh lá, một cho xanh dương (ảnh RGB).

* Mỗi pixel là ba con số. Một pixel gần màu cam sẽ có nhiều đỏ, ít xanh dương, ít xanh lá hơn.
* Ghép tất cả pixel lại, ta được một tensor — đây chính là **input** cho model.

Cùng một logic lặp lại với mọi loại dữ liệu: biến dữ liệu thành tensor, đưa vào một machine learning algorithm, rồi định hình output cho đúng bài toán.

### 🎯 Output là xác suất cho từng lớp

Với 3 lớp sushi / steak / pizza, output mong muốn là 3 giá trị:

* xác suất dự đoán là **sushi**
* xác suất dự đoán là **steak**
* xác suất dự đoán là **pizza**

Nếu model gán 0.81 cho sushi ở ảnh thứ hai thì đó là dự đoán của nó — và đúng hay sai thì vẫn là chuyện xác suất. Số lớp có thể là 3, 5, 100 hay 1000, tùy bài toán.

Muốn model tốt lên thì cách cơ bản nhất là cho nó xem nhiều ảnh hơn, để nó xây dựng **internal representation** tốt hơn và tổng quát hóa được với ảnh chưa từng thấy.

### 🧠 Model nào hay dùng?

**Convolutional neural network (CNN)** thường cho kết quả tốt nhất với dữ liệu ảnh. Gần đây **transformer** cũng làm rất tốt với ảnh, nhưng trong section này mình tập trung vào CNN.

### 🔢 Shape cụ thể: `[batch_size, height, width, color_channels]`

Với ảnh steak, một biểu diễn điển hình là:

```text
[batch_size, height, width, color_channels]
[None, 224, 224, 3]
```

* `None` là batch size — chưa cố định vì mình có thể đặt tùy ý, ví dụ **32**.
* `height`, `width` là 224 — cũng tùy chỉnh được. 512 x 512 thì nhiều số hơn, tính toán nặng hơn nhưng nhiều thông tin hơn.
* `3` là số color channel.

`224 x 224` là điểm khởi đầu phổ biến cho ảnh; batch size 32 cũng rất thường gặp, nhưng có thể là 64, 512… tất cả phụ thuộc bài toán và phần cứng.

Với bài 3 lớp, output shape là `3`. Bài 100 lớp thì output là `100`.

### 🔄 Channels last và channels first

Mình cố ý vẽ hai kiểu biểu diễn:

* **NHWC** — channels last: `[batch, height, width, channels]`. Nhiều thư viện ngoài PyTorch dùng kiểu này.
* **NCHW** — channels first: `[batch, channels, height, width]`. PyTorch (tại thời điểm quay video) mặc định kiểu này.

Đây là điểm cực kỳ quan trọng: **sai thứ tự chiều là ăn lỗi ngay**. Có nhiều cách chuyển qua lại giữa hai format, và dữ liệu chỉ là một, khác nhau ở thứ tự biểu diễn. Có tranh luận format nào tốt hơn; channels last có vẻ thắng về hiệu năng dài hạn, nhưng nằm ngoài phạm vi bài này.

### 🖤 Ví dụ ảnh xám 28 x 28

Với ảnh xám (grayscale) món đồ thời trang 28 x 28, quy trình y hệt:

* Số hóa ảnh thành tensor.
* Đưa vào model.
* Model cho ra xác suất cho một trong mười loại quần áo: boot, shirt, pants, dress…

Vì ảnh xám và rất nhỏ, chi tiết ít, nên đây là bài vừa sức để bắt đầu.

### 🧭 Ghép vào workflow PyTorch

Các bước chuẩn bị code cũng theo đúng workflow đã học:

1. Chuẩn bị data → tensor, dùng `torchvision.transforms`.
2. Bọc bằng `torch.utils.data.Dataset` và `torch.utils.data.DataLoader`.
3. Dựng model hoặc dùng pretrained model (`torch.nn`, `torchvision.models`).
4. Chọn loss function và optimizer.
5. Đánh giá bằng `torchmetrics` hoặc tự viết metric.
6. Cải thiện qua thí nghiệm.
7. Lưu và tải lại model.

### ✅ Tạm kết

Điểm mấu chốt của bài: **numerically encode dữ liệu → đưa vào model → ép output shape khớp bài toán**. Shape sẽ thay đổi tùy bài, nhưng nguyên lý thì không đổi. Câu hỏi còn bỏ ngỏ — CNN thực chất là gì? Mình sẽ trả lời ở bài sau.
