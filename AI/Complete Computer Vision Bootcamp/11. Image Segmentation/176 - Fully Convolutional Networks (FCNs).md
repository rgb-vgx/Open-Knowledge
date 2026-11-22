---
title: 'Bài 176 — Fully Convolutional Networks (FCN)'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 176
status: edited
source: '176 - Fully Convolutional Networks (FCNs).md'
categories:
- AI
tags: []
---
# 🧱 FCN: kiến trúc segmentation đầu tiên

> Nguồn: `176 - Fully Convolutional Networks (FCNs).md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49214093)

Chào các bạn! **FCN (Fully Convolutional Network)** là một trong những kiến trúc deep learning đầu tiên dành riêng cho image segmentation. Bài này ta xem FCN giải quyết hạn chế của CNN truyền thống thế nào, các thành phần trong paper, và tự dựng một bản FCN-8 bằng PyTorch với backbone VGG16.

### ❗ Vấn đề với CNN truyền thống

Một **vanilla CNN** nhận ảnh, qua các block conv + ReLU + maxpool, rồi **flatten** và nối vào **fully connected layers**, cuối cùng dùng softmax để ra vài neuron class. Kết quả là **một label cho cả ảnh** — tốt cho classification nhưng **không** cho segmentation, vì segmentation cần **một nhãn cho mỗi pixel**.

### 💡 FCN là gì?

**FCN** là kiến trúc deep learning trong đó **fully connected layers được thay bằng convolution layers**. Bất kỳ mạng nào thay FC bằng conv đều có thể gọi là fully convolutional.

Nhờ vậy FCN **giữ được spatial information** (độ phân giải không gian) xuyên suốt mạng — điều kiện tiên quyết cho pixel-wise segmentation.

Thay vì FC, phần cuối dùng một **convolution block 1×1** với **số output channel = số class** (1×1 conv còn gọi là bottleneck, dùng để giảm số feature về số class mong muốn). Ví dụ feature map **16×16×512** qua 1×1 conv thành **16×16×3**: channel 0 cho person, channel 1 cho cat, channel 2 cho aeroplane. Mỗi channel là mask của một class.

### 📄 Các thành phần trong paper

Paper *Fully Convolutional Networks for Semantic Segmentation* (CVPR 2015) định nghĩa: biến FC layer thành conv layer, cho phép mạng classification **xuất ra spatial map**; kèm **interpolation layer khả vi** và **spatial loss** (kiểu dice loss) để tối ưu pixel-level.

Kiến trúc: `conv1-pool1 … conv5-pool5`, rồi thêm `conv6`, `conv7`. Sau **5 lần pooling**, độ phân giải giảm **32 lần** → dự đoán **32× upsample** là **FCN-32**. Nhưng có ba biến thể:

* **FCN-32** — chỉ dùng output cuối, upsample 32×.
* **FCN-16** — thêm **skip connection** từ **pool4**, upsample 16×.
* **FCN-8** — gộp cả **pool3**, **pool4** và output cuối, upsample 8×.

Ý tưởng **skip architecture**: tận dụng **full feature spectrum** — các tầng sớm giữ nhiều spatial detail hơn tầng sau. Kết quả: FCN-32 thô, FCN-16 tốt hơn, **FCN-8 tốt nhất** trong ba (dù vẫn còn xa ground truth).

### 💻 Dựng FCN-8 với VGG16

Backbone là **VGG16 pretrained** (khoảng 528 MB) — ta chỉ thay phần output. Dùng `summary` để xác định vị trí các lớp cần lấy feature: **maxpool3** ở index **17**, **maxpool4** ở index **24**, và output cuối (`vgg.features`).

Với input **224×224**:

* pool3 → **28×28×256**,
* pool4 → **14×14×512**,
* pool5 (output cuối) → **7×7×512**.

Mỗi nhánh được đưa qua một **1×1 conv** để cùng số output channel = số class, nhờ đó cộng/merge được.

### ⬆️ Chọn kernel và stride cho conv transpose

Công thức output của transposed convolution (khi `output_padding=0`):

```text
O = (I - 1) × S + K - 2P
```

Cần hệ số upscale:

* **32×** cho pool5 (224/7),
* **16×** cho pool4 (224/14),
* **8×** cho pool3 (224/28).

Dùng **kernel 4, stride 2, padding 1** → mỗi lần **×2**. Vậy áp dụng hai lần được ×4? Không — mỗi block là một lần ×2, và ta dùng các block nối tiếp có chủ đích. Với **8×**, dùng **kernel 16, stride 8, padding 4**.

### 🔗 Forward pass

```python
pool3_out = self.pool3(x)     # 28x28
pool4_out = self.pool4(x)     # 14x14
pool5_out = self.pool5(x)     # 7x7

p3 = self.conv1x1_3(pool3_out)
p4 = self.conv1x1_4(pool4_out)
p5 = self.conv1x1_5(pool5_out)

x = self.upsample32(p5)       # 7x7 -> 14x14
x = x + p4                    # merge pool4
x = self.upsample16(x)        # 14x14 -> 28x28
x = x + p3                    # merge pool3
x = self.upsample8(x)         # 28x28 -> 224x224
return x
```

Kết quả với dummy input `(1, 3, 224, 224)` và `num_classes=2`: output `(1, 2, 224, 224)` — đúng spatial size, số channel bằng số class.

---
### ✅ Tóm lại

FCN thay FC bằng conv, giữ spatial info, xuất mask cùng kích thước ảnh. Skip connection từ pool3/pool4 giúp FCN-8 khôi phục chi tiết tốt hơn. Đây là nền móng cho các kiến trúc sau. Bài tiếp theo: **U-Net**. Hẹn gặp!

> ⚠️ Cần kiểm chứng: Tên lớp/kiến trúc `FCN-32/16/8` và công thức transposed conv đúng theo paper và PyTorch; nhưng chỉ số layer (17, 24) phụ thuộc phiên bản `torchvision`, nên các bạn nên kiểm tra lại bằng `summary` trước khi dùng.
