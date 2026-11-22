---
title: 'Equation 1 trong một cell: từ ảnh đến patch embedding đầy đủ'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 248
status: edited
source: '248 - Equation 1- Putting it All Together.md'
categories:
- AI
tags: []
---

# 🧱 Equation 1 trong một cell: từ ảnh đến patch embedding đầy đủ

> Nguồn: `248 - Equation 1- Putting it All Together.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34001598)

Các bạn thân mến, ta đã đi một chặng dài từ việc biến ảnh thành chuỗi patch embeddings. Giờ là lúc gộp tất cả lại thành **một cell duy nhất** để thấy nó chạy end-to-end. Nhìn toàn bộ trong một chỗ sẽ giúp hiểu sâu hơn nhiều — mình hứa đấy.

### 🎲 Chuẩn bị: seed và ảnh đầu vào

Đầu tiên mình set seed để kết quả có thể tái lập. Không bắt buộc, nhưng nếu bạn dùng ảnh khác mình thì kết quả sẽ khác — cứ biết vậy.

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)
```

Ảnh ví dụ là một tấm steak lấy từ training dataloader. Mỗi lần chạy lại notebook, ảnh sẽ đổi vì dataloader lấy mẫu ngẫu nhiên.

Ta đặt **patch size = 16** (paper còn dùng patch size 14; patch càng nhỏ thì số patch càng nhiều). Tiếp theo lấy kích thước ảnh:

```python
image_shape = image.shape
height, width = image_shape[1], image_shape[2]
```

---

### 📦 Thêm batch dimension

Ảnh thường đi qua mạng theo batch, nên ta thêm một chiều batch vào đầu:

```python
x = image.unsqueeze(0)
# torch.Size([1, 3, 224, 224])
```

Từ đây, mỗi bước ta đều in shape ra để thấy dữ liệu biến đổi thế nào — kiểm tra input/output shape là một trong những việc quan trọng nhất của deep learning.

---

### 🔥 Patch embedding layer

Dùng lại class `PatchEmbedding` đã viết:

```python
patch_embedding_layer = PatchEmbedding(
    in_channels=3,
    patch_size=patch_size,
    embedding_dim=768,
)

patch_embedding = patch_embedding_layer(x)
# torch.Size([1, 196, 768])
```

`in_channels=3` cho ảnh màu, `patch_size=16`, `embedding_dim=768` đúng theo **Table 1** của paper với cấu hình **ViT-Base**.

---

### 🐦 Class token

Class token cần biết batch size và embedding dimension, và ta muốn tính **programmatically**:

```python
batch_size = patch_embedding.shape[0]
embedding_dimension = patch_embedding.shape[-1]

class_token = nn.Parameter(
    torch.ones(batch_size, 1, embedding_dimension),
    requires_grad=True,
)
```

Mình dùng `torch.ones` chỉ để minh họa. Khi dựng kiến trúc ViT thật, ta sẽ dùng `torch.randn` để khởi tạo ngẫu nhiên. Điểm mấu chốt: bọc trong `nn.Parameter` thì nó mới **learnable**; nếu chỉ `torch.ones` thì không.

Gắn class token vào **đầu** chuỗi:

```python
patch_embedding_class_token = torch.cat(
    (class_token, patch_embedding), dim=1
)
# torch.Size([1, 197, 768])
```

Shape tăng từ `196` lên `197` — đúng như mong đợi.

---

### ➕ Position embedding

Tính số patch từ chính dữ liệu, không hard-code:

```python
number_of_patches = int((height * width) / patch_size**2)

position_embedding = nn.Parameter(
    torch.ones(1, number_of_patches + 1, embedding_dimension),
    requires_grad=True,
)
```

Vì là `nn.Parameter`, PyTorch sẽ tự track gradient và cập nhật bằng gradient descent qua optimizer step. Embedding dimension `768` được giữ nhất quán xuyên suốt layer ViT.

Cuối cùng cộng vào:

```python
patch_and_position_embedding = patch_embedding_class_token + position_embedding
# torch.Size([1, 197, 768])
```

Không lỗi, đúng shape. Tiếng vỗ tay nào!

---

### ✅ Toàn bộ Equation 1 trong một cell

Nhìn lại chặng đường: ảnh → learnable patch embeddings → learnable class token gắn lên đầu → position embedding cộng vào. Ta vừa biến **Equation 1** thành code PyTorch tái sử dụng được.

Thử thách: gộp cả phần tạo class token, gắn nó, tạo position embedding và cộng vào — tất cả vào bên trong class `PatchEmbedding`. Nếu làm được, post lên GitHub của khóa cho mình xem nhé.

Bài sau ta sang **Equation 2**. Nếu muốn chạy trước, cứ thử tự ghép xem Equation 2 nằm ở đâu trong Figure 1.
