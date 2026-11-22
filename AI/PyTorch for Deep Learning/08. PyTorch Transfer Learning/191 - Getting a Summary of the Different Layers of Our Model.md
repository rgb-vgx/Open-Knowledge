---
title: 'Xem summary các layer của model với torchinfo'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 191
status: edited
source: '191 - Getting a Summary of the Different Layers of Our Model.md'
categories:
- AI
tags: []
---

# 🔬 Xem summary các layer của model với torchinfo

> Nguồn: `191 - Getting a Summary of the Different Layers of Our Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33011488)

Chào các bạn! Video trước ta bàn các kiểu transfer learning và thống nhất tập trung **feature extraction**. Trước khi chuẩn bị model, hãy xem **summary** của nó — điều này giúp hiểu rõ khái niệm feature extraction.

### 📦 Vì sao cài `torchinfo` từ đầu

Ở phần setup, ta đã đảm bảo có **`torchinfo`**. Package này cho ta bảng tóm tắt chi tiết hơn `print(model)`.

---

### 🧾 Gọi `summary`

```python
from torchinfo import summary

summary(model=model,
        input_size=(1, 3, 224, 224),
        col_names=["input_size", "output_size", "num_params", "trainable"],
        col_width=20,
        row_settings=["var_names"])
```

Giải thích:

* **`input_size=(1, 3, 224, 224)`** — batch size 1, 3 kênh màu, cao × rộng 224×224.
* **`col_names`** — các cột muốn in: shape input, shape output, số tham số, và **trainable** hay không.
* **`col_width`** — chỉ để định dạng cột.
* **`row_settings=["var_names"]`** — hiện tên biến.

Tài liệu `torchinfo` nằm trên GitHub (cảm ơn Tyler Yep đã tạo package này).

---

### 📊 Đọc kết quả

Bảng in ra:

* **`features`** — một `Sequential` gồm rất nhiều layer.
* Input vào shape `(1, 3, 224, 224)`.
* Output **toàn model** shape `(1, 1000)`.

Từng layer biến đổi shape: input → output → input → output... Bạn có thể đi từng dòng để xem ảnh bị "nhào nặn" thế nào. Mỗi layer có số parameter khác nhau — hy vọng chúng học được điều gì đó hữu ích.

---

### 🧠 Điểm quan trọng: `AdaptiveAvgPool2d`

Đến gần cuối:

* Input shape `(1, 1280, 7, 7)`.
* Được nén thành `(1, 1280, 1, 1)`, rồi `(1, 1280)`.

Đây là **feature vector của một ảnh**, đưa vào classifier head. Vector này tiếp tục được nén thành **1000 class**.

Vì sao 1000? Vì EfficientNet B0 pretrain trên **ImageNet-1000**. Ta sẽ đổi thành **3** cho pizza/steak/sushi.

---

### 🔓 Cột trainable

Hiện tại **mọi layer đều trainable = True**. Nhưng với feature extraction, ta muốn **freeze base layer**, chỉ để **classifier head** trainable.

Nói cách khác: mọi layer thành `trainable=False`, chỉ layer cuối giữ `True`.

---

### 📏 Thông tin hữu ích khác

* **Total params**: hơn **5 triệu** — nhiều hơn hẳn TinyVGG.
* **Trainable params**: hiện bằng total, vì chưa freeze gì.
* **Estimated total size (MB)**: ước lượng kích thước model — hữu ích khi deploy.

Lưu ý:

* Càng nhiều **trainable params**, train càng lâu. Feature extraction ít trainable params → train nhanh.
* Kích thước ước lượng **không phải lúc nào cũng chính xác 100%**. Muốn biết chính xác, hãy lưu model ra file và xem dung lượng thật.

Nhắc lại ba tiêu chí chọn model: **nhanh, nhỏ, performance tốt**.

---

### ✅ Chốt lại

Ta đã thấy từng layer, hiểu feature vector 1280, biết cần đổi output thành 3 và freeze base layer. Video sau ta làm đúng hai việc đó: **freeze base layer và thay classifier head**. Hẹn gặp!
