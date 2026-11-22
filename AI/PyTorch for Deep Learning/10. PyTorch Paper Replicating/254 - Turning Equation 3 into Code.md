---
title: 'Hiện thực Equation 3 bằng code: MLP block'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 254
status: edited
source: '254 - Turning Equation 3 into Code.md'
categories:
- AI
tags: []
---

# 🧮 Hiện thực Equation 3 bằng code: MLP block

> Nguồn: `254 - Turning Equation 3 into Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34011360)

Giơ tay lên nếu bạn sẵn sàng biến Equation 3 thành code PyTorch tái sử dụng — mình đang giơ tay đây! Nếu bạn đã thử thách bài trước, tuyệt vời; nếu chưa, ta làm cùng nhau ngay bây giờ.

### ⚙️ Lấy tham số từ Table 1 và Table 3

Transformer giữ **embedding dimension** không đổi xuyên suốt. Ngoài ra MLP cần **hidden size**, lấy từ **MLP size** trong Table 1: ViT-Base là `3072`. Dropout lấy từ **Table 3** (hyperparameters huấn luyện): với Base/16 là `0.1`.

Lần này mình **không quên** `super().__init__()` nữa nhé!

---

### 🧱 Dựng layer norm và MLP

```python
class MLPBlock(nn.Module):
    """Creates a multilayer perceptron block ("MLP block" for short)."""

    def __init__(
        self,
        embedding_dim: int = 768,   # Hidden size D from Table 1
        mlp_size: int = 3072,       # MLP size from Table 1
        dropout: float = 0.1,       # Dropout from Table 3
    ):
        super().__init__()

        self.layer_norm = nn.LayerNorm(normalized_shape=embedding_dim)

        self.mlp = nn.Sequential(
            nn.Linear(in_features=embedding_dim, out_features=mlp_size),
            nn.GELU(),
            nn.Dropout(p=dropout),
            nn.Linear(in_features=mlp_size, out_features=embedding_dim),
            nn.Dropout(p=dropout),
        )
```

`nn.Sequential` chỉ là một chuỗi layer chạy lần lượt. Đọc theo paper mục 3.1: **hai layer với GELU**, và theo Appendix B: **dropout sau mỗi dense layer**.

Chú ý sự khớp chiều: `out_features` của layer đầu (`3072`) phải bằng `in_features` của layer sau — nếu lệch sẽ lỗi shape mismatch. Layer thứ hai chiếu **ngược về** `embedding_dim` (`768`).

---

### 💡 Vì sao phình lên 3072 rồi thu về 768?

Ta dùng layer đầu để **chiếu lên không gian lớn hơn** nhằm hy vọng nắm bắt thêm thông tin, rồi layer sau **nén lại** về embedding dimension. Liệu cách này có hiệu quả không? Kết quả của paper cho thấy kiến trúc này đạt kết quả rất tốt so với state-of-the-art — chắc hẳn các tác giả có lý do.

---

### 🚀 Forward method

```python
    def forward(self, x):
        x = self.layer_norm(x)
        x = self.mlp(x)
        return x
```

Có thể viết gọn thành `return self.mlp(self.layer_norm(x))` — cách này có thể được hưởng lợi từ operator fusion. Nhưng ở đây vẫn thiếu **residual connection**; ta sẽ thêm khi ghép transformer encoder.

---

### 🧪 Test forward pass

"If in doubt, run the code" — luôn làm một forward pass thử:

```python
mlp_block = MLPBlock(embedding_dim=768, mlp_size=3072, dropout=0.1)

patched_image_through_mlp_block = mlp_block(patched_image_through_msa_block)

print(f"Input shape of MLP block: {patched_image_through_msa_block.shape}")
print(f"Output shape of MLP block: {patched_image_through_mlp_block.shape}")
```

Kết quả: shape vào và ra đều `(1, 197, 768)`, nhưng **gần như mọi giá trị đều thay đổi**. Lưu ý lần test này chưa đúng thứ tự tuyệt đối vì chưa có residual — ta chỉ kiểm tra xem output của block trước có đi lọt qua block sau không.

Đừng lo nếu giá trị của bạn khác mình — tất cả đều ngẫu nhiên vì mô hình chưa học gì.

---

### ✅ Chốt lại

Ta đã replicate phần lớn Figure 1: MSA block và MLP block, cho chuỗi patch đi qua và bị biến đổi bởi các equation bên trong. Hy vọng sau nhiều vòng train, biểu diễn này sẽ thật sự đại diện tốt cho ảnh đầu vào — để rồi dùng nó dự đoán trên dữ liệu chưa thấy (test set, ảnh tự chụp).

Đủ mảnh ghép rồi! Thử thách: tự tạo một class PyTorch **xếp chồng Equation 2 và Equation 3**, và thử thêm cả **residual connection**. Bài sau ta bắt tay vào transformer encoder hoàn chỉnh.
