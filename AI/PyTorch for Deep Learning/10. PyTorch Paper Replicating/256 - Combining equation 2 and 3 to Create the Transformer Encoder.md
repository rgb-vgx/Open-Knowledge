---
title: 'Ghép Equation 2 và 3 thành TransformerEncoderBlock'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 256
status: edited
source: '256 - Combining equation 2 and 3 to Create the Transformer Encoder.md'
categories:
- AI
tags: []
---

# 🧩 Ghép Equation 2 và 3 thành TransformerEncoderBlock

> Nguồn: `256 - Combining equation 2 and 3 to Create the Transformer Encoder.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34033728)

Nếu bạn đã tự làm thử thách và thấy chạy được, cứ nhảy sang bài sau. Còn không, ta viết **transformer encoder block** cùng nhau — và bạn sẽ thấy nó gọn đến mức nào nhờ đã đóng gói Equation 2 và 3 thành các block tái sử dụng.

### ⚙️ Khởi tạo với hyperparameters từ paper

```python
class TransformerEncoderBlock(nn.Module):
    """Creates a Transformer Encoder block."""

    def __init__(
        self,
        embedding_dim: int = 768,   # Hidden size D from Table 1
        num_heads: int = 12,        # Heads from Table 1
        mlp_size: int = 3072,       # MLP size from Table 1
        mlp_dropout: float = 0.1,   # Dropout from Table 3
        attn_dropout: float = 0.0,  # Paper: no attention dropout
    ):
        super().__init__()
```

Vì block này chứa cả MSA block và MLP block, nó cần đủ tham số cho cả hai: embedding dimension (`768`), số head (`12`), MLP size (`3072`), MLP dropout (`0.1` từ Table 3) và attention dropout (`0.0`, để sẵn phòng khi muốn thử).

---

### 🧱 Tái sử dụng hai block đã viết

```python
        # Equation 2: MSA block
        self.msa_block = MultiHeadSelfAttentionBlock(
            embedding_dim=embedding_dim,
            num_heads=num_heads,
            attn_dropout=attn_dropout,
        )

        # Equation 3: MLP block
        self.mlp_block = MLPBlock(
            embedding_dim=embedding_dim,
            mlp_size=mlp_size,
            dropout=mlp_dropout,
        )
```

Nhìn xem ta tạo chúng nhanh thế nào — đây chính là lý do mình tách Equation 2 và 3 thành các block riêng. Cả hai đều chưa có residual; ta thêm ở `forward`.

---

### ➕ Forward với residual connection

```python
    def forward(self, x):
        # Equation 2 + residual (skip connection)
        x = self.msa_block(x) + x

        # Equation 3 + residual (skip connection)
        x = self.mlp_block(x) + x

        return x
```

Mỗi dòng chỉ là "cho `x` qua block rồi cộng lại chính `x`" — đó chính là **residual / skip connection**. Cái tên **ResNet** cũng xuất phát từ đây: mạng residual nổi tiếng đã phổ biến residual connection trong computer vision. Toàn bộ encoder block gói trong **23 dòng**, còn có thể rút ngắn hơn nếu nhét luôn residual vào bên trong từng block.

---

### 🧪 Kiểm tra bằng `torchinfo.summary`

Đây là lý do ta cài `torchinfo` ngay từ đầu khóa. Khởi tạo block với mặc định rồi tóm tắt:

```python
transformer_encoder_block = TransformerEncoderBlock()

summary = torchinfo.summary(
    transformer_encoder_block,
    input_size=(1, 197, 768),
    col_names=["input_size", "output_size", "num_params", "trainable"],
    col_width=20,
    row_settings=["var_names"],
)
```

`input_size=(1, 197, 768)` không phải kích thước ảnh, mà là **output của patch embedding**: batch size, số patch trong chuỗi, và embedding dimension. Phần `col_names` cho ta xem input/output size từng layer, số tham số, và layer có trainable không (phải là `True` vì mọi layer đều `requires_grad=True`).

Kết quả bắt đầu từ `(1, 197, 768)`, đi qua MLP block thì **shape phình lên rồi nén lại**: tại `nn.Linear` đầu tiên, chiều feature tăng lên `3072`, rồi layer sau thu về `768`. Chỉ với **một** encoder block mà số tham số đã rất lớn — và ta dựng nó cực nhanh nhờ tính module của PyTorch.

---

### ✅ Chốt lại

Ta đã replicate **ba equation đầu** và ghép thành transformer encoder block. Trong kiến trúc ViT đầy đủ, có **nhiều encoder block xếp chồng** lên nhau. Bạn thử nghĩ xem nên xếp chúng thế nào.

Bài sau, mình sẽ chỉ một cách viết còn ngắn hơn nữa — bí mật để dành, hẹn gặp ở đó.
