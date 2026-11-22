---
title: 'Bài 122 — Model 2: mổ xẻ Conv2d từng bước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 122
status: edited
source: '122 - Model 2- Breaking Down Conv2D Step by Step.md'
categories:
- AI
tags: []
---

# 🔬 Model 2: mổ xẻ `Conv2d` từng bước

> Nguồn: `122 - Model 2- Breaking Down Conv2D Step by Step.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920354)

Bài trước ta đã dùng `nn.Conv2d` mà chưa hiểu bên trong. Bài này mình mổ xẻ nó bằng một dummy image — cách học mình thích nhất: **if in doubt, code it out**. Ta sẽ thấy kernel, stride, padding ảnh hưởng đến output shape ra sao.

### 📐 Công thức trong docs

`nn.Conv2d` áp một phép tích chập 2 chiều. Docs mô tả output gần đúng:

```text
out = bias + Σ (weight ⊛ input)
```

Input có shape `(N, C_in, H, W)` hoặc `(C_in, H, W)`; output `(N, C_out, H_out, W_out)`. Docs cũng có công thức tính `H_out`, `W_out` — hữu ích, nhưng mình có "mẹo" riêng ở bài 124.

---

### 🎲 Tạo dữ liệu giả giống CNN Explainer

CNN Explainer dùng ảnh `64 x 64 x 3` (channels last). Ta làm lại theo kiểu PyTorch (channels first):

```python
torch.manual_seed(42)

images = torch.randn(size=(32, 3, 64, 64))
test_image = images[0]

print(images.shape)      # torch.Size([32, 3, 64, 64])
print(test_image.shape)  # torch.Size([3, 64, 64])
```

Đây chỉ là số ngẫu nhiên, không phải ảnh thật — mục đích là kiểm tra shape.

---

### 🧱 Tạo một `Conv2d` giống layer đầu của CNN Explainer

```python
conv_layer = nn.Conv2d(
    in_channels=3,     # 3 kênh màu của ảnh
    out_channels=10,   # 10 hidden units
    kernel_size=3,     # tương đương (3, 3)
    stride=1,
    padding=0,
)
```

* `in_channels=3` vì ảnh có 3 kênh màu. Lưu ý thứ tự chiều bị đảo so với `test_image.shape = [3, 64, 64]`.
* `out_channels=10` — 10 "hidden unit", giống CNN Explainer.
* `kernel_size=3` — viết một số là viết tắt của tuple `(3, 3)`.

---

### 🐛 Lỗi đầu tiên: thiếu chiều batch

```python
conv_output = conv_layer(test_image)
```

Báo lỗi: `Conv2d` mong đợi input **4 chiều** nhưng nhận input 3 chiều `[3, 64, 64]`.

Cách sửa: thêm chiều batch bằng `unsqueeze(0)`:

```python
conv_output = conv_layer(test_image.unsqueeze(0))
print(conv_output.shape)  # torch.Size([1, 10, 62, 62])
```

> ⚠️ Cần kiểm chứng: transcript ghi rằng lỗi này có thể không xuất hiện ở PyTorch 1.11. Thực tế các bản PyTorch mới cho phép `Conv2d` nhận input không có batch (`(C, H, W)`), nhưng thêm `.unsqueeze(0)` luôn an toàn và giữ code tương thích.

---

### 🔍 Đọc output shape `[1, 10, 62, 62]`

* `1` — batch size (một ảnh).
* `10` — `out_channels` mình đặt.
* `62, 62` — chiều cao/rộng sau convolution.

Vì sao từ `64` xuống `62`? Vì kernel `3x3`, padding `0`, stride `1`: kernel không thể đặt ở mép ngoài cùng nên mỗi chiều mất `3 - 1 = 2` pixel. Đây là lý do ta thấy kích thước giảm dần qua các layer.

---

### 🎛️ Thay hyperparameter, xem output đổi

* **`kernel_size=5`** → output nhỏ hơn nữa (mất `5 - 1 = 4` mỗi chiều).
* **`stride=2`** → output gần như **giảm một nửa**, vì kernel nhảy 2 pixel một lần, bỏ qua pixel.
* **`padding=1`** → output trở lại `64 x 64`, vì thêm một viền pixel quanh ảnh để kernel xử lý được cả mép.

Đây chính là phần "Understanding hyperparameters" trên CNN Explainer: kernel quyết định "nhìn rộng bao nhiêu", stride quyết định "nhảy xa bao nhiêu", padding quyết định "có xử lý mép không".

---

### 💡 Vì sao phải nén?

Mạng tích chập cố tình **nén** input thành biểu diễn nhỏ hơn. Nếu chỉ ghi nhớ nguyên pattern thì vô nghĩa — mục tiêu là học pattern **tổng quát hóa** được, rồi dùng để dự đoán ảnh mới.

---

### ✅ Tạm kết

`Conv2d` = kernel trượt + phép nhân weight với input + bias. Output shape phụ thuộc kernel/stride/padding, và luôn cần chiều batch. Bài sau mình mổ xẻ lớp còn lại: `MaxPool2d`.
