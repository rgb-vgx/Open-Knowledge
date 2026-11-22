---
title: 'Khởi tạo pretrained model với TorchVision'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 189
status: edited
source: '189 - Setting Up a Pretrained Model with Torchvision.md'
categories:
- AI
tags: []
---

# 🏗️ Khởi tạo pretrained model với TorchVision

> Nguồn: `189 - Setting Up a Pretrained Model with Torchvision.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33009168)

Chào các bạn! Video trước ta bàn tiêu chí chọn model và quyết định dùng **EfficientNet B0**. Giờ ta khởi tạo nó.

### 🕰️ Cách cũ (đã deprecated)

Trước torchvision 0.13:

```python
model = torchvision.models.efficientnet_b0(pretrained=True)
```

Chạy cell này, nó tải weight về (có thanh tiến trình), nhưng in cảnh báo:

```text
The parameter 'pretrained' is deprecated since 0.13
and will be removed in 0.15. Please use 'weights' instead.
```

Bạn vẫn có thể gặp cách này trong code cũ trên mạng — nhận ra nó, nhưng đừng viết mới.

### ✨ Cách mới (0.13+)

```python
weights = torchvision.models.EfficientNet_B0_Weights.DEFAULT
model = torchvision.models.efficientnet_b0(weights=weights).to(device)
```

* `weights` là **bộ pattern model đã học trên ImageNet**.
* `DEFAULT` = bộ weight tốt nhất hiện có cho kiến trúc này.
* Tham số của hàm là **`weights=`** — nhớ số nhiều.

Chỉ hai dòng, ta có một model pretrained sẵn sàng. In `model` ra, bạn sẽ thấy **cực kỳ nhiều layer**: `Conv2d`, `SiLU` (activation), `BatchNorm2d`... Mình khuyên mở tài liệu PyTorch để tra từng layer nếu tò mò.

### 🔍 So sánh với TinyVGG

Nhớ lại khi tự xây TinyVGG, ta chỉ có vài layer. Còn EfficientNet B0 thì... rất nhiều. Đây chính là lợi ích transfer learning: **ai đó đã thiết kế tay hàng trăm layer**, ta được dùng lại cho bài toán của mình.

### 🧩 Ba phần của model

Khi cuộn xuống cuối, ta thấy ba phần chính:

1. **`model.features`** — toàn bộ layer tích chập trích xuất đặc trưng.
2. **`model.avgpool`** — gộp các feature thành một vector.
3. **`model.classifier`** — lớp phân loại cuối.

### 🎯 Vì sao classifier có 1000 đầu ra?

```python
print(model.classifier)
```

Kết quả có `Linear(in_features=1280, out_features=1000, bias=True)`.

`1000` là vì model pretrain trên **ImageNet-1K** — 1000 class. Nhưng bài toán của ta chỉ có **3 class**: pizza, steak, sushi.

Vậy cần đổi `out_features` từ **1000 → 3**. Input của classifier vẫn giữ **1280** — đó là kích thước feature vector mà `avgpool` tạo ra.

### 🧠 Feature extractor hoạt động thế nào?

* **`features`** nhìn ảnh và trích ra đặc trưng. Feature có thể là bất cứ thứ gì: pizza có hình tròn, steak màu tối hơn, sushi thường là nhiều miếng nhỏ. **Ta không nói cho model biết feature là gì — nó tự học.**
* **`avgpool`** nén các feature thành **một vector kích thước 1280**.
* **`classifier`** biến vector 1280 thành **xác suất cho từng class** — 1000 hay 3 tùy bài toán.

### 🏷️ Vì sao gọi là "feature extractor"?

Vì ta **giữ nguyên** toàn bộ layer trích xuất đặc trưng và **chỉ đổi layer cuối**. Model trở thành một bộ trích xuất đặc trưng dùng pattern học từ ImageNet, rồi phân loại theo dữ liệu của ta.

Nó còn được gọi là **EfficientNet B0 backbone** — "xương sống" là phần feature.

### ✅ Chốt lại

Ta đã có EfficientNet B0 pretrained, hiểu ba phần `features` / `avgpool` / `classifier`, và biết phải đổi `out_features` thành 3. Video sau ta bàn các **kiểu transfer learning** khác nhau trước khi tự tay custom model. Hẹn gặp!
