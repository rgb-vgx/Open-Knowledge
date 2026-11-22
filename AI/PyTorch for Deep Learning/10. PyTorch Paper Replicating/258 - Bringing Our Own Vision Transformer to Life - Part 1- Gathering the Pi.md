---
title: 'Lắp ráp Vision Transformer (phần 1): khởi tạo các thành phần'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 258
status: edited
source: '258 - Bringing Our Own Vision Transformer to Life - Part 1- Gathering the Pi.md'
categories:
- AI
tags: []
---

# 🚀 Lắp ráp Vision Transformer (phần 1): khởi tạo các thành phần

> Nguồn: `258 - Bringing Our Own Vision Transformer to Life - Part 1- Gathering the Pi.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34033732)

"Alright, alright, alright" — ta đã đi một chặng rất dài: Equation 1 cho patch embedding, Equation 2 cho MSA block, Equation 3 cho MLP block, rồi transformer encoder. Còn thiếu **MLP head** và **Equation 4** — nhưng so với những gì đã làm, Equation 4 nhẹ như trở bàn tay.

### 🎯 Equation 4 chỉ là LayerNorm + Linear

Đọc paper: classification head được hiện thực bằng một **MLP một hidden layer** lúc pre-training, và bằng **một linear layer duy nhất** lúc fine-tuning. Cộng với phần LayerNorm trong Equation 4, tab chỉ cần một `nn.LayerNorm` và một `nn.Linear` để chiếu ra **số lớp**.

Bạn có thể dừng video và tự thử trước — ta đã có đủ mảnh ghép. Nếu muốn theo cùng, mình bắt đầu từ class kế thừa `nn.Module`.

### ⚙️ Bộ hyperparameters (đa phần từ Table 1 và 3)

```python
class ViT(nn.Module):
    def __init__(
        self,
        img_size: int = 224,               # Table 3
        in_channels: int = 3,              # ảnh màu
        patch_size: int = 16,
        num_transformer_layers: int = 12,  # Layers from Table 1
        embedding_dim: int = 768,          # Hidden size D from Table 1
        mlp_size: int = 3072,              # MLP size from Table 1
        num_heads: int = 12,               # Heads from Table 1
        attn_dropout: float = 0.0,         # Paper: no attention dropout
        mlp_dropout: float = 0.1,          # Table 3
        embedding_dropout: float = 0.1,    # Paper: dropout on patch+position embeddings
        num_classes: int = 1000,           # ImageNet mặc định
    ):
        super().__init__()
```

Vài điểm:

* **`num_transformer_layers`** là "L" trong Table 1 — số encoder block xếp chồng. ViT-Base là `12`.
* **`attn_dropout=0.0`** vì paper không dùng dropout cho attention (các phép chiếu Q, K, V).
* **`embedding_dropout`** là một "kho báu" khác trong paper: dropout áp **ngay sau khi cộng position embedding vào patch embedding**.
* **`num_classes=1000`** vì kiến trúc gốc train trên ImageNet. Với Food Vision Mini, ta sẽ đặt `3` (pizza, steak, sushi).

### ✅ Assertion: image size chia hết cho patch size

Để chắc chắn ảnh cắt được thành patch vuông vắn:

```python
        assert img_size % patch_size == 0, (
            f"Image size must be divisible by patch size, "
            f"image size: {img_size}, patch size: {patch_size}."
        )
```

Mình từng nhắc: đây là chỗ nên đưa vào logic, không hard-code.

### 🔢 Số patch và các embedding

```python
        self.num_patches = (img_size * img_size) // patch_size**2

        # Learnable class embedding, đặt ở đầu chuỗi
        self.class_embedding = nn.Parameter(
            torch.randn(1, 1, embedding_dim), requires_grad=True
        )

        # Learnable position embedding
        self.position_embedding = nn.Parameter(
            torch.randn(1, self.num_patches + 1, embedding_dim), requires_grad=True
        )

        # Dropout ngay sau patch + position embedding
        self.embedding_dropout = nn.Dropout(p=embedding_dropout)
```

Khác với lúc minh họa, giờ cả class embedding và position embedding đều khởi tạo bằng **`torch.randn`** — bắt đầu ngẫu nhiên rồi tối ưu bằng gradient descent. Class embedding có shape `(1, 1, embedding_dim)`, position embedding `(1, num_patches + 1, embedding_dim)`.

### 🧱 Patch embedding và transformer encoder

```python
        self.patch_embedding = PatchEmbedding(
            in_channels=in_channels,
            patch_size=patch_size,
            embedding_dim=embedding_dim,
        )
```

Phần **transformer encoder** là nơi xếp chồng 12 block. Bí quyết là **`nn.Sequential`** kết hợp **list comprehension** với cú pháp `*` (unpack):

```python
        self.transformer_encoder = nn.Sequential(
            *[
                TransformerEncoderBlock(
                    embedding_dim=embedding_dim,
                    num_heads=num_heads,
                    mlp_size=mlp_size,
                    mlp_dropout=mlp_dropout,
                )
                for _ in range(num_transformer_layers)
            ]
        )
```

List comprehension tạo ra **12 encoder block**, còn `*` trải chúng ra thành một chuỗi layer tuần tự. Muốn một mô hình lớn hơn, chỉ cần tăng `num_transformer_layers`.

### 🎯 Classifier head (Equation 4)

```python
        self.classifier = nn.Sequential(
            nn.LayerNorm(normalized_shape=embedding_dim),
            nn.Linear(in_features=embedding_dim, out_features=num_classes),
        )
```

`in_features=embedding_dim` vì output của encoder có chiều `768`; `out_features=num_classes` vì đây là layer cuối, chiếu ra số lớp phân loại.

### ✅ Chốt lại

Ta vừa khởi tạo **toàn bộ** các mảnh ghép: class embedding, position embedding, embedding dropout, patch embedding layer, transformer encoder xếp chồng, và classifier head. Còn đúng một việc: `forward`.

Thử thách: tự viết `forward` — ghép các mảnh trên lại để tái hiện kiến trúc Vision Transformer hoàn chỉnh. Bài sau ta làm cùng nhau, và đây sẽ là khoảnh khắc đẹp nhất!
