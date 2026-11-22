---
title: 'Chạy thử MSA block: lỗi thiếu super() và kiểm tra shape'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 252
status: edited
source: '252 - Checking the Inputs and Outputs of Equation.md'
categories:
- AI
tags: []
---

# 🧪 Chạy thử MSA block: lỗi thiếu super() và kiểm tra shape

> Nguồn: `252 - Checking the Inputs and Outputs of Equation.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34006530)

Ta đã xong Equation 1 và Equation 2, còn hai equation nữa là ghép được Vision Transformer. Nhưng khoan, đừng chạy trước — trước hết phải **test MSA block** đã. Kế hoạch: khởi tạo một instance của block, rồi cho chuỗi patch+position embedding đi qua nó.

### 🏗️ Khởi tạo và chạy thử

```python
multihead_self_attention_block = MultiHeadSelfAttentionBlock(
    embedding_dim=768,
    num_heads=12,
    attn_dropout=0.0,
)

patched_image_through_msa_block = multihead_self_attention_block(
    patch_and_position_embedding
)
```

Ta giữ cấu hình **ViT-Base** với `num_heads=12` và dropout bằng 0. Đây chính là lúc đưa chuỗi patch và position embedding qua hai layer norm và attention.

### 🐛 Lỗi kinh điển: quên `super().__init__()`

Lần chạy đầu, mình gặp ngay:

```text
AttributeError: cannot assign module before Module.__init__() call
```

Nguyên nhân: trong `__init__` của class mình **quên gọi `super().__init__()`**. Khi kế thừa `nn.Module`, phải gọi `super().__init__()` trước khi gán các submodule như `self.layer_norm`. Mình hay quên cái này — nhưng đó chính là chuyện thường ngày của việc code. Thêm vào là chạy ngay.

### 📐 Input và output shape

In shape ra:

```python
print(f"Input shape of MSA block: {patch_and_position_embedding.shape}")
print(f"Output shape of MSA block: {patched_image_through_msa_block.shape}")
```

Kết quả:

```text
Input shape of MSA block: torch.Size([1, 197, 768])
Output shape of MSA block: torch.Size([1, 197, 768])
```

Shape **không đổi** `(1, 197, 768)` — điều này hợp lý vì MSA block ánh xạ một chuỗi thành một chuỗi cùng kích thước. Nhưng shape giữ nguyên **không có nghĩa giá trị giữ nguyên**.

### 🔢 Giá trị đã thay đổi

Quan sát tensor output, mọi con số đều bị điều chỉnh so với input. Với mắt người thì đống số này gần như vô nghĩa — nhưng đó **không phải việc của ta** giải mã. Việc của mạng nơ-ron là học một biểu diễn tốt của ảnh.

Và vì các layer vừa khởi tạo với **giá trị ngẫu nhiên**, mô hình chưa học gì cả. Hy vọng là sau khi ảnh đi qua nhiều MSA block và nhiều transformer encoder, nhìn trên nhiều mẫu ảnh, biểu diễn `patched_image_through_msa_block` sẽ trở thành biểu diễn chất lượng cao.

### ✅ Sẵn sàng cho Equation 3

MSA block chạy được, shape đúng, giá trị được biến đổi — vậy là block đã sẵn sàng. Giờ chuyển sang **Equation 3**, tức **MLP block**.

Thử thách: tự replicate MLP block. Gợi ý — nó rất giống cái vừa làm, chỉ thay `nn.MultiheadAttention` bằng một **MLP layer**. Cứ thử đi, bài sau ta bắt tay vào Equation 3.
