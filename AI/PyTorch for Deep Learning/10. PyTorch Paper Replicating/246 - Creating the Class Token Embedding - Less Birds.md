---
title: 'Class token embedding: bản chạy lại từng bước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 246
status: edited
source: '246 - Creating the Class Token Embedding - Less Birds.md'
categories:
- AI
tags: []
---

# 🔁 Class token embedding: bản chạy lại từng bước

> Nguồn: `246 - Creating the Class Token Embedding - Less Birds.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34001590)

Đây là bản ghi lại gọn gàng ("less birds") của cùng nội dung bài trước: thêm **class token** vào chuỗi patch embedding. Mình vẫn đi lại từng bước, vì chạy lại và nhìn lại luôn giúp hiểu chắc hơn.

### 🐛 Assertion trong patch embedding module

Tạo một tensor ảnh ngẫu nhiên hợp lệ:

```python
rand_image_tensor = torch.randn(1, 3, 224, 224)
patchify(rand_image_tensor)
```

Rồi thử một tensor không hợp lệ:

```python
rand_image_tensor_bad = torch.randn(1, 3, 250, 250)
patchify(rand_image_tensor_bad)
```

Lần đầu sẽ gặp `AttributeError: 'PatchEmbedding' object has no attribute 'patch_size'` — vì trong `__init__` chưa gán `self.patch_size = patch_size`. Sửa xong thì assertion báo đúng:

```text
AssertionError: Input image size must be divisible by patch size,
image shape: 250, patch size: 16
```

Đây là ví dụ điển hình của việc kiểm tra shape sớm: 250 không chia hết cho 16.

### 📖 Nhắc lại vai trò class token

Paper: "In order to perform classification, we use the standard approach of adding an extra **learnable** classification token to the sequence." Token này được **prepend** — thêm vào **đầu** sequence, ngược với **append** (thêm vào cuối).

Ký hiệu: `z_0^0 = x_class`, và trạng thái của nó ở output của transformer encoder (`z_L^0`) chính là biểu diễn ảnh `y` (Eq. 4). Vì vậy chuỗi sau khi thêm token sẽ dài **197** thay vì 196.

### 🔧 Vì sao dùng `nn.Parameter`

Từ hồi PyTorch Workflow, `nn.Parameter` là cách tạo trọng số học được: nó có `requires_grad=True`, nên PyTorch track gradient và gradient descent cập nhật nó. Với `nn.Module`, `requires_grad=True` thường là mặc định cho parameter.

### 🧩 Tạo và gắn token

Lấy kích thước từ tensor thay vì hard-code:

```python
batch_size = patch_embedded_image.shape[0]
embedding_dimension = patch_embedded_image.shape[-1]

class_token = nn.Parameter(
    torch.ones(batch_size, 1, embedding_dimension),
    requires_grad=True,
)
print(class_token[:, :, :10])   # xem 10 giá trị đầu
print(class_token.shape)        # torch.Size([1, 1, 768])
```

Dùng `torch.ones` để nhìn rõ trong demo; bản thật nên dùng `torch.randn` để token khởi tạo ngẫu nhiên rồi được tối ưu.

Gắn vào đầu chuỗi:

```python
patch_embedded_image_with_class_embedding = torch.cat(
    (class_token, patch_embedded_image), dim=1
)
print(patch_embedded_image_with_class_embedding.shape)  # torch.Size([1, 197, 768])
```

`torch.cat` với `dim=1` nối theo chiều **number of patches**. Đây là chi tiết giải thích vì sao position embedding trong paper có shape `(N + 1) × D`: phải khớp cả 196 patch lẫn 1 class token.

---

### ✅ Chốt lại

Chuỗi patch embedding giờ có 197 phần tử, phần tử đầu là class token học được. Còn **position embedding** — mảnh cuối của Equation 1. Thử tự làm trước nhé.
