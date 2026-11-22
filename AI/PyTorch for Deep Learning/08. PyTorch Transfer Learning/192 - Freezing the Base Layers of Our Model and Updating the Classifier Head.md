---
title: 'Đóng băng base layer và thay classifier head'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 192
status: edited
source: '192 - Freezing the Base Layers of Our Model and Updating the Classifier Head.md'
categories:
- AI
tags: []
---

# 🧊 Đóng băng base layer và thay classifier head

> Nguồn: `192 - Freezing the Base Layers of Our Model and Updating the Classifier Head.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33016296)

Chào các bạn! Ta đã xem summary: mọi base layer đều trainable, output 1000 class. Giờ ta làm hai việc để biến nó thành **feature extractor**:

1. **Freeze** toàn bộ base layer.
2. **Thay classifier head** cho khớp bài toán 3 class.

### 🧊 Freeze base layer

```python
for param in model.features.parameters():
    param.requires_grad = False
```

Cơ chế:

* `model.features` — phần trích đặc trưng.
* Mỗi tham số có thuộc tính **`requires_grad`**. Nếu `True`, PyTorch **theo dõi gradient** và optimizer có thể cập nhật nó.
* Đặt `requires_grad = False` → PyTorch **không** tính gradient → optimizer **không** cập nhật tham số đó trong train.

Chỉ một vòng lặp, toàn bộ "xương sống" bị đóng băng. Những weight này đã học từ ImageNet — ta giữ nguyên.

Mình có in thử `param` trước khi tắt: hàng loạt weight/bias, chính là **5 triệu tham số** đã học sẵn. Chúng là thứ "vận hành" backbone của EfficientNet.

### 🔍 Kiểm tra sau khi freeze

Chạy lại `torchinfo.summary(...)`:

* Cột **trainable** giờ ghi **partial** — thiên về `False`.
* Model vẫn **cùng tổng số tham số**, nhưng **số trainable giảm mạnh**.
* Chỉ **classifier head** còn trainable.

Nếu đẩy model qua training loop, base layer sẽ **đứng yên**, không cập nhật.

### 🎯 Thay classifier head

Xem classifier hiện tại:

```python
print(model.classifier)
```

Kết quả là `Sequential` gồm `Dropout` và `Linear(in_features=1280, out_features=1000)`.

Ta thay bằng:

```python
torch.manual_seed(42)

model.classifier = nn.Sequential(
    nn.Dropout(p=0.2, inplace=True),
    nn.Linear(in_features=1280, out_features=len(class_names), bias=True),
).to(device)
```

Điểm cần chú ý:

* **`in_features=1280`** phải **giữ nguyên** — đây là kích thước feature vector từ `avgpool`. Nếu đổi, sẽ **shape mismatch**.
* **`out_features=len(class_names)`** = 3.
* `torch.manual_seed(42)` trước khi tạo layer mới để tái lập kết quả.

### 💧 Dropout là gì?

Lớp `nn.Dropout(p=0.2, inplace=True)`:

* Trong lúc train, **ngẫu nhiên đưa một phần tử về 0** với xác suất `p` (ở đây 20%).
* Đây là **regularization** — kỹ thuật chống **overfitting**.
* Ý tưởng: bỏ ngẫu nhiên vài neuron, các neuron còn lại buộc phải học pattern **tổng quát hơn**.

Có thể đọc thêm về regularization và dropout trong tài liệu PyTorch.

Tương tự, muốn hiểu layer nào khác (ví dụ `SiLU` — còn gọi là swish activation, áp dụng sigmoid linear unit theo từng phần tử), cứ tra tài liệu.

### 📊 Kết quả

Chạy summary lần cuối:

* Base layer **frozen**.
* Classifier head đổi thành **3 class**.
* **Trainable params chỉ còn vài nghìn** — chính là head. Toàn bộ phần còn lại là weight ImageNet đóng băng.

Ta đã có một **feature extractor model** sẵn sàng train.

### ✅ Chốt lại

Chỉ hai thao tác — freeze `model.features` và thay `model.classifier` — là ta biến model pretrained 1000 class thành model 3 class cho bài toán riêng. Video sau ta **train thử** và xem nó có vượt TinyVGG không. Hẹn gặp!
