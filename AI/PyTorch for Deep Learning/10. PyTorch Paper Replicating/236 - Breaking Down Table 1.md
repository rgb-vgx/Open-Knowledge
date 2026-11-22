---
title: 'Mổ xẻ Table 1: hyperparameter của các biến thể ViT'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 236
status: edited
source: '236 - Breaking Down Table 1.md'
categories:
- AI
tags: []
---

# 📊 Mổ xẻ Table 1: hyperparameter của các biến thể ViT

> Nguồn: `236 - Breaking Down Table 1.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975326)

Ta đã đi qua Figure 1 và bốn phương trình. Mảnh ghép cuối trước khi code: **Table 1** — chi tiết các **model variant** của ViT. Đây là bảng hyperparameter quyết định kích thước từng phiên bản.

### 🪜 Tóm tắt lại mạch phương trình

* Chia ảnh thành patch cố định, biến mỗi patch thành **learnable embedding** → Equation 1.
* Thêm **class token** học được vào đầu sequence, cộng **position embedding** để giữ thứ tự.
* Transformer encoder gồm các layer xen kẽ **MSA** và **MLP**, mỗi block có **layer norm** phía trước và **residual connection**.
* Nomenclature: `z_{ℓ-1}` là layer trước, `z_L` là layer cuối (chữ `L` hoa).

---

### 🔢 Ba biến thể

Table 1 có ba dòng: **ViT-Base**, **ViT-Large**, **ViT-Huge**. Số tham số tăng dần:

| Variant | Layers | Hidden size `D` | MLP size | Heads | Params |
|---|---|---|---|---|---|
| ViT-Base | 12 | 768 | 3072 | 12 | 86M |
| ViT-Large | 24 | 1024 | 4096 | 16 | 307M |
| ViT-Huge | 32 | 1280 | 5120 | 16 | 632M |

Paper ghi: "We base ViT configurations on those used for BERT... The Base and Large models are directly adopted from BERT and we add the larger Huge model." Đây là lý do các con số trông quen thuộc với dân NLP.

---

### 🔤 Đọc tên model: ViT-L/16

Paper dùng ký hiệu gọn: `ViT-L/16` = **Large** variant với **patch size 16×16**. Vậy khi cắt ảnh thành patch, mỗi patch là **16 × 16 pixel**.

Một điểm lý thuyết đáng nhớ: "the Transformer sequence length is inversely proportional to the square of the patch size. Thus models with smaller patch size are computationally more expensive." Vì `N = H·W / P²` — `P` càng nhỏ thì số patch càng nhiều, sequence càng dài, tính toán càng nặng.

---

### ⚙️ Các hyperparameter sẽ đưa vào code

Mình sẽ dựng **ViT-Base** trước vì đó là bản nhỏ nhất, và thiết kế class ViT nhận tham số để có thể scale lên:

* **`layers`** — số transformer encoder block (`L`). Base = **12**.
* **`hidden_size`** (`D`) — embedding size xuyên suốt kiến trúc. Base = **768**, nghĩa là mỗi patch 16×16 được biểu diễn bằng một vector 768 chiều, học được.
* **`mlp_size`** — số hidden unit/neuron trong MLP. Base = **3072**.
* **`num_heads`** — số head trong multi-head self-attention. Base = **12**.

PyTorch có sẵn `nn.MultiheadAttention` với tham số `embed_dim` và `num_heads` — khớp đúng hai con số trên.

---

### ✅ Chốt lại

Đủ nguyên liệu: Figure 1 (input/output/layer/block), bốn phương trình, và Table 1 (hyperparameter). Giờ phải code thôi — đọc thêm nữa chỉ rối thêm. Bài sau bắt đầu với việc biến ảnh thành **patch embedding**.
