---
title: 'Đóng gói patch embedding layer thành PyTorch module'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 244
status: edited
source: '244 - Creating the Patch Embedding Layer with PyTorch.md'
categories:
- AI
tags: []
---

# 🧱 Đóng gói patch embedding layer thành PyTorch module

> Nguồn: `244 - Creating the Patch Embedding Layer with PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34001586)

Code hiện tại đang rải rác nhiều cell. Giờ gom lại thành **một PyTorch module** tái sử dụng — đúng mục tiêu biến paper thành code. Ta đang lắp từng viên Lego: layer, block, rồi model.

### 📋 Sáu bước thiết kế module

1. Tạo class tên `PatchEmbedding`.
2. Khởi tạo (`__init__`) với hyperparameter: `in_channels`, `embedding_dim`, `patch_size`.
3. Tạo layer biến ảnh thành embedded patch — dùng `nn.Conv2d`.
4. Tạo layer flatten feature map — `nn.Flatten`.
5. Định nghĩa `forward` — mọi class kế thừa `nn.Module` đều cần.
6. Đảm bảo output shape đúng thứ tự: `(batch, num_patches, embedding_dim)`.

### 🧩 Code hoàn chỉnh

```python
from torch import nn

class PatchEmbedding(nn.Module):
    """Turns a 2D input image into a 1D sequence of patch embeddings.

    Args:
        in_channels (int): Số color channels của ảnh, mặc định 3 (RGB).
        patch_size (int): Kích thước patch, mặc định 16.
        embedding_dim (int): Embedding dimension, mặc định 768 (D của ViT-Base).
    """

    def __init__(self, in_channels: int = 3, patch_size: int = 16,
                 embedding_dim: int = 768):
        super().__init__()
        self.patch_size = patch_size

        # Cắt ảnh thành patch + tạo learnable embedding trong một bước
        self.patcher = nn.Conv2d(
            in_channels=in_channels,
            out_channels=embedding_dim,
            kernel_size=patch_size,
            stride=patch_size,
            padding=0,
        )

        # Flatten feature map thành sequence
        self.flatten = nn.Flatten(start_dim=2, end_dim=3)

    def forward(self, x):
        image_resolution = x.shape[-1]
        assert image_resolution % self.patch_size == 0, \
            f"Input image size must be divisible by patch size, " \
            f"image shape: {image_resolution}, patch size: {self.patch_size}"

        x_patched = self.patcher(x)
        x_flattened = self.flatten(x_patched)
        return x_flattened.permute(0, 2, 1)
```

### 🔍 Giải thích từng phần

* **`self.patcher`** — Conv2d với `kernel_size = stride = patch_size`, `out_channels = embedding_dim`. Dùng lại đúng những gì đã làm tay.
* **`self.flatten`** — `start_dim=2, end_dim=3` gộp hai chiều feature map.
* **Assertion** — kiểm tra ảnh chia hết cho patch size, báo lỗi rõ ràng nếu không. Mismatched shape là lỗi phổ biến nhất, nên chặn sớm.
* **`permute(0, 2, 1)`** — đưa `(batch, embedding_dim, num_patches)` về `(batch, num_patches, embedding_dim)`.

### ✅ Test module

```python
torch.manual_seed(42)

patchify = PatchEmbedding(patch_size=16, embedding_dim=768)

print(f"Input image size: {image.unsqueeze(0).shape}")
patch_embedded_image = patchify(image.unsqueeze(0))
print(f"Output patch embedding sequence shape: {patch_embedded_image.shape}")
```

Kết quả:

```text
Input image size: torch.Size([1, 3, 224, 224])
Output patch embedding sequence shape: torch.Size([1, 196, 768])
```

Đúng shape mong muốn. Một layer duy nhất giờ biến ảnh thành sequence patch embedding.

### 🧠 Trích dẫn vui

Yann LeCun: *"Creation of a deep neural network starts with the first layer."* Và đây là layer đầu tiên của ViT.

---

### ✅ Chốt lại

Xong phần lớn Equation 1 — linear projection of flattened patches. Còn **class token** và **position embedding**. Thử tự nghĩ cách thêm hai thứ đó trước khi xem bài sau.
