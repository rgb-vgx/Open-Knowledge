---
title: 'TransformerEncoderLayer có sẵn của PyTorch và vì sao nên tự viết trước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 257
status: edited
source: '257 - Creating a Transformer Encoder Layer with In-Built PyTorch Layer.md'
categories:
- AI
tags: []
---

# ⚡ TransformerEncoderLayer có sẵn của PyTorch và vì sao nên tự viết trước

> Nguồn: `257 - Creating a Transformer Encoder Layer with In-Built PyTorch Layer.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34033730)

Ta vừa tự tay dựng transformer encoder block từ Equation 2 và 3, thêm residual, và xem summary khi một chuỗi patch đi qua. Trong paper, **L** (số layer) ở Table 1 với ViT-Base là **12** — tức 12 encoder block xếp chồng. Giờ mình "bật mí" một mẹo PyTorch: có thể làm gọn cả Equation 2, 3 và encoder block thành vài dòng.

### 🏗️ PyTorch có sẵn TransformerEncoderLayer

PyTorch có module `nn.TransformerEncoderLayer` — "standard encoder layer" dựa trên paper **"Attention Is All You Need"**, chính là nền tảng của ViT. Nó gồm **self attention** và **feedforward network** (một tên khác của MLP). Bộ tham số của nó khớp gần như 1-1 với những gì ta tự dựng:

```python
torch_transformer_encoder_layer = nn.TransformerEncoderLayer(
    d_model=768,          # embedding dimension
    nhead=12,             # Heads from Table 1
    dim_feedforward=3072, # MLP size from Table 1
    dropout=0.1,          # from Table 3
    activation="gelu",    # GELU như ta đã dùng
    batch_first=True,
    norm_first=True,      # LayerNorm TRƯỚC block
)
```

Vài điểm cần chú ý:

* `activation` nhận string `"relu"` hoặc `"gelu"`, hoặc một callable. Ta dùng `"gelu"` cho khớp bản tự viết.
* `batch_first=True` để input theo thứ tự batch → sequence → feature.
* `norm_first` mặc định là `False` (norm **sau**), vì bản transformer gốc làm vậy. ViT làm **norm trước** nên ta đặt `norm_first=True`.

### 📊 So sánh với bản tự viết

Nếu chạy `torchinfo.summary` trên `nn.TransformerEncoderLayer`, ta thấy nó cũng gồm multi-head attention, linear, dropout, norm — các phép toán y hệt. Thứ tự các layer hiển thị có thể hơi khác vì bản của PyTorch viết theo kiểu tuần tự, nhưng:

* Số tham số **7.087.872** — **giống hệt** bản tự viết của ta.
* Cùng các operation, chỉ khác cách bố trí.

### 🤔 Vậy sao phải tự viết làm gì?

Mình "thú nhận": mình biết có sẵn layer này từ đầu, nhưng vẫn cố tình tự dựng từng equation. Lý do: **practice, practice, practice**. Khi tự tay biến equation thành code, bạn hiểu bên trong có gì. Đến khi gọi layer có sẵn, bạn suy ra được nó làm gì; gặp paper khác có biến thể lạ, bạn biết chỉnh ở đâu.

Lợi ích của layer dựng sẵn:

1. **Ít lỗi hơn** — mọi layer trong PyTorch đều qua kiểm thử kỹ càng.
2. **Có thể nhanh hơn** — từ PyTorch 1.12, `nn.TransformerEncoderLayer` có **fast path** tối ưu (BetterTransformer) cho inference, có thể tăng tốc và throughput **hơn 2x** trong nhiều tình huống, mà không cần sửa model.

### 📚 Stack nhiều layer

Muốn chồng nhiều encoder layer? Dùng `nn.TransformerEncoder`, truyền vào một encoder layer và `num_layers`. Với ViT-Base, `num_layers=12`.

### ✅ Chốt lại

Ta giờ có **hai** cách dựng transformer encoder: bản custom tự viết, và bản `nn.TransformerEncoderLayer` có sẵn. Cả hai cho cùng số tham số. Các mảnh ghép đã đủ — patch embedding, class token, position embedding, transformer encoder. Chỉ còn thiếu vài thứ nhỏ để lắp thành **toàn bộ Vision Transformer**. Bài sau ta làm một mạch!
