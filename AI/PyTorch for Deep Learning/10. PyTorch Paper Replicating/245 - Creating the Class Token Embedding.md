---
title: 'Thêm class token embedding vào đầu chuỗi patch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 245
status: edited
source: '245 - Creating the Class Token Embedding.md'
categories:
- AI
tags: []
---

# 🏷️ Thêm class token embedding vào đầu chuỗi patch

> Nguồn: `245 - Creating the Class Token Embedding.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34001588)

Đã có patch embedding layer — layer đầu tiên của kiến trúc. Giờ thêm **class token**, mảnh thứ hai của Equation 1.

### 🐛 Kiểm tra assertion (và sửa một lỗi nhỏ)

Thử với tensor hợp lệ và không hợp lệ:

```python
rand_image_tensor_bad = torch.randn(1, 3, 250, 250)
patchify(rand_image_tensor_bad)
```

Lỗi đầu tiên gặp phải: `AttributeError: ... has no attribute 'patch_size'` — vì trong `__init__` quên gán `self.patch_size = patch_size`. Đây là lỗi rất dễ gặp khi đóng gói module. Sửa xong thì assertion hoạt động:

```text
AssertionError: Input image size must be divisible by patch size, image shape: 250, patch size: 16
```

---

### 📖 Paper nói gì về class token

> In order to perform classification, we use the standard approach of adding an extra **learnable** classification token to the sequence.

> Similar to BERT's `[class]` token, we **prepend** a learnable embedding to the sequence of embedded patches (`z_0^0 = x_class`), whose state at the output of the Transformer encoder (`z_L^0`) serves as the image representation `y` (Eq. 4).

Hai điểm cần nhớ:

* **Prepend** — thêm vào **đầu**, không phải append vào cuối.
* **Learnable** — token này học được, không phải hằng số.

---

### 🔧 `nn.Parameter` — cách tạo tham số học được

Nhớ lại hồi PyTorch Workflow: `nn.Parameter` có `requires_grad=True`, nên PyTorch track gradient cho nó và gradient descent sẽ cập nhật nó.

Lấy batch size và embedding dimension **từ chính tensor** thay vì hard-code:

```python
batch_size = patch_embedded_image.shape[0]
embedding_dimension = patch_embedded_image.shape[-1]
```

Tạo class token:

```python
class_token = nn.Parameter(
    torch.ones(batch_size, 1, embedding_dimension),
    requires_grad=True,
)
```

`requires_grad=True` là mặc định của `nn.Parameter`, ở đây viết ra cho rõ ràng. Dùng `torch.ones` chỉ để dễ nhìn trong demo — thực tế nên khởi tạo ngẫu nhiên (`torch.randn`) để nó được tối ưu từ một điểm random.

Shape: `(1, 1, 768)` — một token duy nhất, 768 chiều.

---

### 🔗 Nối token vào đầu chuỗi bằng `torch.cat`

```python
patch_embedded_image_with_class_embedding = torch.cat(
    (class_token, patch_embedded_image), dim=1
)
```

`dim=1` là chiều **number of patches** — nối class token vào trước 196 patch. Kết quả:

```text
torch.Size([1, 197, 768])
```

Số patch tăng từ **196 → 197** (196 patch + 1 class token). Đây cũng là lý do trong paper `E_pos` có shape `(N + 1) × D`: position embedding phải khớp cả class token.

---

### ✅ Chốt lại

Class token là một `nn.Parameter` shape `(1, 1, 768)`, prepend vào chiều patch. Chuỗi giờ dài 197. Còn **position embedding** — thử tự làm trước, bài sau mình làm cùng.
