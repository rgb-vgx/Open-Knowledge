---
title: 'Kiểm tra Vision Transformer: forward pass và model summary'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 260
status: edited
source: '260 - Getting a Visual Summary of Our Custom Vision Transformer.md'
categories:
- AI
tags: []
---

# 🔬 Kiểm tra Vision Transformer: forward pass và model summary

> Nguồn: `260 - Getting a Visual Summary of Our Custom Vision Transformer.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34038488)

Hai bài trước là một nhiệm vụ khổng lồ: gom mọi mảnh ghép từ paper ViT — Equation 1, 2, 3, 4, Table 1, Table 3, Figure 1 — thành kiến trúc tùy biến của riêng ta. Nhìn lại đúng là một tác phẩm đẹp. Giờ phải đảm bảo nó **chạy được**.

> Start small, increase when necessary — bắt đầu nhỏ, tăng khi cần.

### 🎲 Đưa một tensor ảnh ngẫu nhiên qua model

Tạo tensor với shape của **một** ảnh (thêm batch size 1):

```python
random_image_tensor = torch.randn(1, 3, 224, 224)
```

Khởi tạo ViT và chạy forward pass. Trước hết để `num_classes=1000` cho giống ImageNet, xem có chạy trơn không:

```python
vit = ViT(num_classes=1000)
logits = vit(random_image_tensor)

print(f"Output logits shape: {logits.shape}")
# torch.Size([1, 1000])
```

Kết quả: **1000 logits** cho 1000 lớp — đúng như ImageNet.

---

### 🍕 Chuyển sang bài toán 3 lớp

Ở Food Vision Mini, ta có **3 lớp** (pizza, steak, sushi). Chỉ cần đổi `num_classes`:

```python
vit = ViT(num_classes=3)
logits = vit(random_image_tensor)

print(f"Output logits shape: {logits.shape}")
# torch.Size([1, 3])
```

Vẫn chạy trơn, ra đúng **3 output**. Vậy là ta đã thích nghi ViT với dữ liệu của mình. Dĩ nhiên kết quả chưa có ý nghĩa gì vì **trọng số ngẫu nhiên** và **ảnh cũng ngẫu nhiên**.

---

### 🖼️ Visual summary bằng torchinfo

Đây là lúc `torchinfo` tỏa sáng. Xem toàn bộ kiến trúc trong một bảng:

```python
from torchinfo import summary

summary(
    model=ViT(num_classes=3),
    input_size=(1, 3, 224, 224),
    col_names=["input_size", "output_size", "num_params", "trainable"],
    col_width=20,
    row_settings=["var_names"],
)
```

Bảng này có thể mất chút thời gian vì nó chạy một forward pass thật. Nhìn vào ta thấy rõ từng chặng:

* **Input image** `(1, 3, 224, 224)` đi vào.
* Qua **PatchEmbedding**.
* Qua **embedding dropout**.
* Qua **TransformerEncoderBlock** lặp đi lặp lại — mỗi block là **MSA block** và **MLP block** xen kẽ, đúng như paper mô tả: "transformer encoder consists of alternating layers of MSAA and MLP blocks".
* Kết thúc bằng **classifier head**, ra `(1, 3)` với `num_classes=3`.

Tổng tham số: **85,800,963** — mô hình lớn nhất của ta từ trước tới nay. Chúc mừng, ta đã chính thức replicate Vision Transformer từ ảnh, công thức toán và văn bản thành code PyTorch dùng được.

---

### 🎯 Thử thách: train nó!

Nhưng chưa xong — phải xem nó có **học được trên dữ liệu thật** của ta không. Model này giống mọi model khác đã dựng: cần **loss function** và **optimizer**. Ta đã có sẵn hàm `train()` trong `engine.py` từ module Going Modular.

Thử thách: khởi tạo ViT, tạo loss, optimizer, rồi train trên dữ liệu pizza/steak/sushi. Liệu nó có đạt kết quả tốt như bản ViT gốc trên ImageNet (từng là state-of-the-art) không? Và vì sao có/không? Bài sau ta train cùng nhau.
