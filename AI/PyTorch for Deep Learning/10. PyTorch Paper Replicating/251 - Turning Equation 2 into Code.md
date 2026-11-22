---
title: 'Hiện thực Equation 2 bằng code: MSA block'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 251
status: edited
source: '251 - Turning Equation 2 into Code.md'
categories:
- AI
tags: []
---

# 💻 Hiện thực Equation 2 bằng code: MSA block

> Nguồn: `251 - Turning Equation 2 into Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34006522)

Đã đến lúc viết code! Mấy bài trước ta mổ xẻ Equation 2 — thấy nó gồm những equation nhỏ hơn đến từ "Attention Is All You Need" và paper giới thiệu LayerNorm. Nếu vẫn hơi mơ hồ thì cũng dễ hiểu, vì ta mới lướt qua. Nhưng đúng như câu cửa miệng của mình: **nghi ngờ thì cứ code ra**. Ta sẽ hiện thực nguyên **MSA block** chỉ trong khoảng 24 dòng.

### ⚙️ Đọc Table 1 để lấy tham số

Từ **Table 1** của paper, cấu hình **ViT-Base** cho ta:

* **Hidden size D** = `768` (embedding dimension).
* **Heads** = `12` (số self attention head).
* **MLP size** = `3072` (dùng sau này cho Equation 3).

Ta viết class linh hoạt để có thể đổi sang cấu hình khác nếu muốn.

Về **dropout**: paper hơi giấu thông tin này, phải lần tới **Appendix B** mới thấy. Kết luận là **không dùng dropout cho attention** (tức các phép chiếu Q, K, V). Dropout, khi có, chỉ áp sau mỗi **dense layer** (linear/feedforward/MLP). Vì vậy `attn_dropout=0.0`.

### 🧱 Dựng layer norm và attention

```python
class MultiHeadSelfAttentionBlock(nn.Module):
    """Creates a multi-head self-attention block ("MSA block" for short)."""

    def __init__(
        self,
        embedding_dim: int = 768,   # Hidden size D from Table 1 (ViT-Base)
        num_heads: int = 12,        # Heads from Table 1
        attn_dropout: float = 0.0,  # Paper: no dropout on attention
    ):
        super().__init__()

        self.layer_norm = nn.LayerNorm(normalized_shape=embedding_dim)

        self.multihead_attn = nn.MultiheadAttention(
            embed_dim=embedding_dim,
            num_heads=num_heads,
            dropout=attn_dropout,
            batch_first=True,
        )
```

`nn.LayerNorm` chuẩn hóa trên **D chiều cuối**, với `normalized_shape=embedding_dim` tức `768`. Tham số `eps` ta để mặc định vì paper không nêu, và giá trị mặc định của PyTorch thường đã là điểm khởi đầu tốt.

### 🔀 `batch_first` và thứ tự chiều

`nn.MultiheadAttention` mặc định `batch_first=False`, nghĩa là input theo thứ tự **sequence → batch → feature**. Ta đặt `batch_first=True` để input/output là **batch → sequence → feature**.

Ánh xạ với dữ liệu của ta — tensor `(1, 197, 768)`:

| PyTorch | Ta |
|---|---|
| batch | batch (1) |
| sequence | number of patches (197) |
| feature | embedding dimension (768) |

"Sequence" là chuỗi patch, "feature" là các learnable features — ở ta gọi là embedding dimension. Đây lại là ví dụ cho việc deep learning dùng nhiều tên cho cùng một khái niệm.

### 🚀 Forward: Q, K, V đều là x

```python
    def forward(self, x):
        # LayerNorm trước
        x_norm = self.layer_norm(x)

        # Multi-head self attention: Q = K = V = x_norm
        attn_output, _ = self.multihead_attn(
            query=x_norm,
            key=x_norm,
            value=x_norm,
            need_weights=False,
        )

        return attn_output
```

`forward` của attention trả về hai thứ: **attention output** và **attention weights**. Ta chỉ cần output nên dùng `_` để bỏ weights, và đặt `need_weights=False`.

Điểm mấu chốt của **self attention**: `query`, `key`, `value` là **ba bản sao của cùng một chuỗi**. Mạng tự học phần nào của chuỗi nên chú ý tới chính nó; nếu học được biểu diễn đó, mô hình hy vọng nắm được biểu diễn tốt của ảnh.

### ✅ Chốt lại

Ta vừa hiện thực trọn vẹn **Equation 2**: MSA bọc lấy output của LayerNorm trên input layer trước. Còn thiếu **skip connection** (cộng input vào output) — ta sẽ thêm khi lắp transformer encoder hoàn chỉnh, để hai mảnh code này tái sử dụng được.

Bài sau ta chạy thử block này với chính tensor `(1, 197, 768)` để xem input/output ra sao. Bạn thử nghĩ trước xem residual connection sẽ được cài thế nào nhé.
