---
title: 'Bài 281 — Dựng EfficientNet B2 feature extractor'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 281
status: edited
source: '281 - Creating an EffNetB2 Feature Extractor Model.md'
categories:
- AI
tags: []
---

# 🧠 Dựng EfficientNet B2 feature extractor

> Nguồn: `281 - Creating an EffNetB2 Feature Extractor Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055223)

Thực nghiệm số một: **EfficientNet B2 feature extractor**. Nếu đã tự thử từ section 07 thì tuyệt, còn không thì cùng làm — vì đây là mẫu transfer learning dùng đi dùng lại rất nhiều.

### 🔍 Feature extractor là gì?

**Feature extractor** là một cách gọi của **transfer learning model**: lấy pattern từ một model có sẵn, **đóng băng (freeze) các base layer**, và **thay phần head/output layer** cho bài toán của mình.

Câu hỏi nên hỏi đầu mỗi dự án deep learning: *đã có model nào giải bài toán tương tự chưa?* Với ảnh, câu trả lời thường nằm trong `torchvision.models`.

---

### ⚙️ Lấy pretrained weights và transforms

```python
import torchvision

# EffNetB2 pretrained weights (cần torchvision >= 0.13)
effnetb2_weights = torchvision.models.EfficientNet_B2_Weights.DEFAULT
effnetb2_transforms = effnetb2_weights.transforms()

effnetb2 = torchvision.models.efficientnet_b2(weights=effnetb2_weights)
```

`DEFAULT` tương đương "best available" — bộ weights tốt nhất trên dataset gốc. Phần **transforms** rất quan trọng: nó chuẩn hóa ảnh custom của bạn về đúng định dạng mà model pretrained từng thấy khi train. Bỏ qua bước này, kết quả có thể kém hơn hẳn.

API cũng chấp nhận `weights="default"` (transcript thử và xác nhận chạy được).

---

### ❄️ Đóng băng base layers

```python
for param in effnetb2.parameters():
    param.requires_grad = False
```

`requires_grad=False` khiến PyTorch không theo dõi gradient cho các tham số này — chúng **không bị cập nhật** bởi gradient descent trong training loop.

---

### 🎯 Thay classifier head cho 3 class

Model gốc có **1000 output class**, ta chỉ có **3**: pizza, steak, sushi.

```python
from torch import nn

effnetb2.classifier = nn.Sequential(
    nn.Dropout(p=0.3, inplace=True),
    nn.Linear(in_features=1408, out_features=3, bias=True)
)
```

`in_features` của EfficientNet B2 là **1408** (transcript đọc nhầm thành "10408" — kiểm tra output shape là ra ngay). Sau khi thay head:

* Các base layer: `requires_grad=False`.
* Chỉ output layer trainable.
* Tổng **trainable parameters = 4227** — đúng bằng `1408 * 3 + 3`.

Đây là lý do phải **luôn kiểm tra input/output shape** của model sau khi chỉnh sửa. Nhìn summary mà thấy số tham số lạ là biết mình vừa gõ sai.

---

### 🧾 Kiểm tra bằng `torchinfo`

```python
from torchinfo import summary

summary(effnetb2,
        input_size=(1, 3, 224, 224),
        col_names=["input_size", "output_size", "num_params", "trainable"],
        col_width=20,
        row_settings=["var_names"])
```

Kết quả mong đợi: base layers `False` ở cột trainable, chỉ head là `True`.

---

Model đã sẵn sàng để train. Nhưng lặp lại mấy bước này mỗi lần thì mệt — nên bài tập của bạn: gói tất cả vào một hàm `create_effnetb2_model()` trả về **transforms** và **model**. Bài sau mình làm cùng nhau.
