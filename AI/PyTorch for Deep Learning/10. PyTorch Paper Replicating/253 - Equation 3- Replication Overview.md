---
title: 'Equation 3: MLP block, GELU và dropout'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 253
status: edited
source: '253 - Equation 3- Replication Overview.md'
categories:
- AI
tags: []
---

# 🔗 Equation 3: MLP block, GELU và dropout

> Nguồn: `253 - Equation 3- Replication Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34011358)

Tiếp đà Equation 2, ta sang **Equation 3 — MLP block** (multi-layer perceptron block). Cấu trúc rất giống MSA block: vẫn có layer norm đứng trước, chỉ thay **multi-head attention** bằng một **MLP layer**. Ta đang biến hình ảnh, công thức toán và văn bản trong paper thành code PyTorch tái sử dụng được.

### 🧱 Transformer encoder = MSA và MLP xen kẽ

Một lần nữa nhìn lại bức tranh lớn: transformer encoder gồm các block **MSA (Equation 2)** và **MLP (Equation 3)** xếp xen kẽ. **LayerNorm** đứng trước mỗi block, **residual connection** nằm sau mỗi block.

Residual connection chính là cộng input vào output của block. Nó cho phép xây **mô hình lớn và sâu hơn** vì ngăn gradient và weight update bị co nhỏ dần. Ta chưa code nó, sẽ làm khi ghép transformer encoder hoàn chỉnh.

---

### 📖 MLP trong paper gồm những gì?

Trong mục **3.1** (Model overview), có đúng một dòng mô tả MLP: gồm **hai layer** với **GELU nonlinearity**. Dạng giả mã:

```text
MLP = Linear → GELU → Dropout → Linear → Dropout
```

Vài điểm cần làm rõ:

* "Layer" ở đây nghĩa là **fully connected / dense / linear / feedforward** — nhiều tên cho cùng một thứ. PyTorch gọi là **linear** (`nn.Linear`), TensorFlow gọi là dense.
* **GELU** = Gaussian Error Linear Unit, hàm kích hoạt chuẩn trong paper. Khác với **ReLU** (đẩy mọi input âm về 0), GELU **mượt hơn**, cho một khoảng nhỏ các giá trị âm đi qua. Có cả **SiLU** với đặc tính khác nữa — điểm chung của các activation function là thêm **tính phi tuyến**, để mạng vẽ được những đường phức tạp thay vì chỉ đường thẳng.
* In PyTorch: `nn.GELU()`.
* **Dropout**: đây là một "kho báu" phải lần trong paper — nó nói rõ dropout **áp sau mỗi dense layer**. Vậy trong MLP block ta đặt dropout sau các linear layer.

---

### 💡 Vì sao cần phi tuyến?

Mình hay hỏi vui: nếu chỉ có đường thẳng thì bạn vẽ được gì? Còn khi có cả đường cong, bạn vẽ được những hình thù tinh xảo. Mạng nơ-ron cũng vậy — activation function chính là thứ cho phép nó biểu diễn các pattern phức tạp.

---

### 🎯 Thử thách

Giờ đến lượt bạn. Tạo class **`MLPBlock`** kế thừa `nn.Module`, gồm:

1. Một `nn.LayerNorm`.
2. Hai `nn.Linear` với `nn.GELU` ở giữa.
3. `nn.Dropout` sau các linear layer.

Trong `forward`, cho `x` qua norm layer, rồi qua MLP, trả về output để lát nữa ta gắn residual connection.

Các mảnh ghép đã có đủ. Thử đi, bài sau ta làm cùng nhau.
