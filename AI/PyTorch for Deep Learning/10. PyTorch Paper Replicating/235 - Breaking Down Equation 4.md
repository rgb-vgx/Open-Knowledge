---
title: 'Mổ xẻ Equation 4: classification head'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 235
status: edited
source: '235 - Breaking Down Equation 4.md'
categories:
- AI
tags: []
---

# 🎯 Mổ xẻ Equation 4: classification head

> Nguồn: `235 - Breaking Down Equation 4.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975322)

Figure 1 và bốn phương trình từ Section 3.1 đã được biến thành một mớ đầy màu sắc — nhưng là "organized chaos". Mục tiêu vẫn là biến **figure, math, text** thành code chạy được. Còn lại Equation 4.

### 🧠 Nhắc lại MLP

Equation 4 có `LN` — **Layer Norm**. Nhưng trước đó nhắc lại: **MLP = Multi-Layer Perceptron**, một **feedforward artificial neural network** nhận input và sinh output. Số layer tùy ý — có thể 2, có thể 10.

---

### 🏷️ Class token và BERT

Text paper mở đầu: "similar to BERT's class token". **BERT** là một kiến trúc transformer mã nguồn mở cho **natural language processing** — tức transformer gốc vốn xử lý chuỗi text 1D. Vision Transformer đã "xoay" kiến trúc đó để dùng cho ảnh 2D.

Class token nằm ở đầu Equation 1, đại diện cho **class mà sample thuộc về**. Paper nói: "we append a learnable embedding to the sequence of embedded patches" — chính là class token đó.

---

### 📐 Đọc Equation 4 từ paper

Text gốc:

> ... whose state at the output of the Transformer encoder `z_L^0` serves as the image representation `y` (Eq. 4).

Nói cách khác, **token thứ 0** của output ở layer cuối cùng (ký hiệu `z_L^0`) là biểu diễn của ảnh, gọi là `y`. Đây là nội dung Equation 4:

```text
y = LN(z_L^0)
```

Rồi phần classification head (không nằm trong Eq 4) được gắn lên token đó: "A classification head is attached to `z_L^0` of the last layer". Head là một **MLP với một hidden layer** khi pre-training, và **một single layer** khi fine-tuning.

---

### 🪜 Pseudocode

Transcript diễn giải Equation 4 hơi rộng hơn một chút — coi cả head nằm trong phương trình:

```text
y_output = Linear(LN(x_output_mlp_block))
```

Tức lấy output của Equation 3, đưa qua Layer Norm, rồi qua một **linear layer** (classification head). Với bài toán của mình, dùng một **linear layer** là đủ, miễn chỉnh `out_features` theo số class.

Lưu ý nhỏ: trong paper, Equation 4 chỉ là `y = LN(z_L^0)`, còn classifier head được mô tả riêng ngay sau đó. Cách hiểu "LN + linear head" vẫn đúng về mặt luồng dữ liệu.

---

### ✅ Chốt lại

Cả bốn phương trình đã có pseudocode: patch embedding → MSA block → MLP block → head. Bài sau mình mổ **Table 1** để lấy hyperparameter, rồi bắt đầu viết PyTorch. Các bạn có thể thử tự đọc Table 1 (mục "Model variants") trước.
