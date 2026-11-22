---
title: 'Bài 124 — Model 2: mẹo tìm shape vào/ra của từng lớp'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 124
status: edited
source: '124 - Mode 2- Using a Trick to Find the Input and Output Shapes of Each of O.md'
categories:
- AI
tags: []
---

# 🧮 Model 2: mẹo tìm shape vào/ra của từng lớp

> Nguồn: `124 - Mode 2- Using a Trick to Find the Input and Output Shapes of Each of O.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920358)

Câu hỏi lớn nhất khi dựng CNN: **classifier cần `in_features` bằng bao nhiêu?** Bạn có thể tính tay bằng công thức `H_out`, `W_out`, nhưng mình thích để code tính hộ. Bài này là "mẹo" mình dùng suốt: in shape sau từng block rồi suy ra con số.

### 🎬 Cho ảnh thật chạy qua model

```python
model_2(image.unsqueeze(0).to(device))
```

Sẽ ra một loạt lỗi quen thuộc, lần lượt:

1. **Shape mismatch** — ảnh chỉ `[1, 28, 28]` (3 chiều), model cần 4 chiều → thêm `.unsqueeze(0)`.
2. **Device mismatch** — model trên `cuda`, ảnh trên CPU → thêm `.to(device)`.
3. **`mat1 and mat2 shapes cannot be multiplied`** — classifier vẫn chưa biết `in_features`.

Cứ sửa từng cái một. Đó chính là ba lỗi lớn của deep learning: shape, device, dtype.

### 🔍 In shape qua từng block

Sửa `forward` để in shape ở mỗi chặng:

```python
def forward(self, x):
    x = self.conv_block_1(x)
    print(x.shape)       # torch.Size([1, 10, 14, 14])
    x = self.conv_block_2(x)
    print(x.shape)       # torch.Size([1, 10, 7, 7])
    x = self.classifier(x)
    print(x.shape)
    return x
```

Kết quả:

* Sau `conv_block_1`: `[1, 10, 14, 14]` — từ `28x28` qua hai conv (padding=1 giữ nguyên) và một max pool (chia đôi) → `14x14`.
* Sau `conv_block_2`: `[1, 10, 7, 7]` — tiếp tục nén một nửa.
* Classifier: chưa chạy được vì `in_features` sai.

### 💡 Suy ra `in_features`

Classifier bắt đầu bằng `Flatten`, nên tensor `[1, 10, 7, 7]` sẽ thành vector:

```text
10 * 7 * 7 = 490
```

Vậy:

```python
self.classifier = nn.Sequential(
    nn.Flatten(),
    nn.Linear(in_features=hidden_units * 7 * 7, out_features=output_shape),
)
```

Trong đó:

* `10` = `hidden_units` (số `out_channels` của block cuối).
* `7, 7` = chiều cao/rộng sau `conv_block_2`.

Chạy lại:

```text
torch.Size([1, 10])
```

Một vector **10 logit** — mỗi lớp một giá trị, đúng như CNN Explainer.

### 🧠 Vì sao mẹo này hữu ích?

Công thức `H_out = ⌊(H_in + 2*padding − kernel_size) / stride + 1⌋` đúng, nhưng dễ tính nhầm khi mạng nhiều layer. Cho dữ liệu chạy thật rồi in shape:

* Không cần nhớ công thức.
* Thấy ngay layer nào làm shape lệch.
* Áp dụng được cho mọi kiến trúc, kể cả model chép từ nơi khác.

Quy tắc nhớ nhanh: trong linear layer có **phép nhân ma trận**, nên "inner dimensions phải khớp". Nếu lỗi `mat1 and mat2` thì chính là `in_features` chưa khớp `Flatten` output.

### 🧹 Nhớ comment print khi train

Mấy dòng `print(x.shape)` rất hữu ích khi debug, nhưng lúc train thật sẽ in hàng nghìn dòng làm chậm và rối. Comment chúng lại trước khi chạy training loop (bài 126 sẽ minh họa hậu quả nếu quên).

### ✅ Tạm kết

`in_features = hidden_units * 7 * 7 = 490`, output `[1, 10]`. Model 2 giờ chạy được end-to-end với dummy tensor. Bài sau mình lắp loss function và optimizer để chuẩn bị train CNN đầu tiên.
