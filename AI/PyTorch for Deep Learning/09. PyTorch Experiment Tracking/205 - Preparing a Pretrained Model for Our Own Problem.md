---
title: 'Chuẩn bị pretrained model cho bài toán của mình'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 205
status: edited
source: '205 - Preparing a Pretrained Model for Our Own Problem.md'
categories:
- AI
tags: []
---

# 🔧 Chuẩn bị pretrained model cho bài toán của mình

> Nguồn: `205 - Preparing a Pretrained Model for Our Own Problem.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33081406)

Giờ ta lấy một **pretrained model**: đóng băng (freeze) các base layer và thay classifier head cho vừa bài toán. Ta từng làm việc này ở section trước, nhưng bài này mình còn chỉ luôn cách cũ để bạn nhận ra sự khác biệt của API mới.

### 🕰️ Cách cũ: `pretrained=True`

Trước torchvision 0.13, người ta tạo model như sau:

```python
model = torchvision.models.efficientnet_b0(pretrained=True)
```

Chạy được, nhưng in ra cảnh báo: tham số `pretrained` đã **deprecated từ 0.13** và sẽ bị bỏ từ 0.15 — hãy dùng `weights` thay thế. Mình cố ý cho xem cách cũ vì bạn sẽ gặp nó trong nhiều demo PyTorch cũ, và đây là thay đổi khá lớn cần biết.

---

### 🆕 Cách mới: `weights=...`

```python
weights = torchvision.models.EfficientNet_B0_Weights.DEFAULT
model = torchvision.models.efficientnet_b0(weights=weights).to(device)
```

`DEFAULT` = best available weights. Một số model có nhiều loại weights — bạn xem trong tài liệu (mục *classification*), phiên bản 0.13 trở lên. Nhắc lại: ngoài torchvision còn có **Hugging Face Hub** để tìm pretrained model.

> Mẹo nhỏ: nhớ viết là `weights`, **không** phải `weight`. Mình từng mắc lỗi tên tham số này rất lâu.

---

### ❄️ Đóng băng base layer

PyTorch tự động track gradient của tham số để optimizer cập nhật chúng khi model nhìn dữ liệu. Muốn "đóng băng", ta đặt `requires_grad = False`:

```python
for param in model.features.parameters():
    param.requires_grad = False
```

Trước khi freeze, mình in tham số ra và thấy toàn bộ features đã học từ ImageNet — những pattern số học rất tốt cho thị giác (như đã nói ở section 0.6). Freeze xong chúng sẽ không có gradient để cập nhật.

---

### 🎛️ Thay classifier head

Mỗi model có tên head khác nhau, nên phải biết cách *inspect*. Với EfficientNet, cấu trúc gồm `features`, `avgpool` và `classifier`. Ta thay `classifier` để đầu ra còn **3 lớp** thay vì 1000:

```python
model.classifier = torch.nn.Sequential(
    torch.nn.Dropout(p=0.2, inplace=True),
    torch.nn.Linear(in_features=1280, out_features=len(class_names), bias=True)
).to(device)
```

`in_features=1280` là kích thước feature vector trước classifier của B0. `len(class_names)` = 3. Ta cũng set seed vì layer `Linear` mới được khởi tạo ngẫu nhiên, và gửi cả model lẫn classifier lên thiết bị đích (nhớ gửi cả model vừa tải lên device — dễ quên).

---

### 📋 Kiểm tra bằng `torchinfo`

```python
from torchinfo import summary

summary(model,
        input_size=(32, 3, 224, 224),
        verbose=0,
        col_names=["input_size", "output_size", "num_params", "trainable"],
        col_width=20,
        row_settings=["var_names"])
```

Thông tin rất quan trọng cần xem là **input/output shape** từng layer. Kết quả cho thấy base layer đều frozen, chỉ classifier trainable. Đó chính là một **feature extractor**: chỉ layer cuối (vừa đổi thành 3 output) được train.

---

### 🧮 Bao nhiêu tham số trainable?

Trong video, tổng tham số khoảng **4 triệu**, và **dưới 4000 tham số trainable**. Vì phần lớn layer bị đóng băng, số phép tính PyTorch phải làm giảm mạnh — nên training cũng nhanh hơn.

> Nếu bài toán có **10 lớp**, giá trị `out_features` sẽ là 10 thay vì 3.

---

### ✅ Tạm kết

Ta đã có feature extractor 3 lớp, phần lớn base layer frozen. Giờ là lúc train — nhưng lần này thay vì lưu kết quả vào dictionary, ta sẽ **lưu ra file**. Thử thách: tìm hiểu cách dùng TensorBoard với PyTorch (có tutorial chính thức) và thử ghép với code hiện có. Bài sau mình sẽ hướng dẫn. Hẹn gặp!
