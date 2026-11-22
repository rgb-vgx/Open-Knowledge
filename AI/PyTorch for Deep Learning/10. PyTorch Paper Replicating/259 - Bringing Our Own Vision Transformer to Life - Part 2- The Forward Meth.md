---
title: 'Lắp ráp Vision Transformer (phần 2): forward method hoàn chỉnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 259
status: edited
source: '259 - Bringing Our Own Vision Transformer to Life - Part 2- The Forward Meth.md'
categories:
- AI
tags: []
---

# 🎬 Lắp ráp Vision Transformer (phần 2): forward method hoàn chỉnh

> Nguồn: `259 - Bringing Our Own Vision Transformer to Life - Part 2- The Forward Meth.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34034340)

Bài trước ta dừng ở cliffhanger: viết `forward`. Giờ đã có đủ mọi thứ, ta tái hiện toàn bộ Vision Transformer (ViT) từng bước một. Input là một batch ảnh; nhờ đã gom mọi thứ vào transformer encoder, `forward` trở nên khá gọn.

### 📦 Bước 1: lấy batch size

```python
def forward(self, x):
    batch_size = x.shape[0]
```

Ta không hard-code batch size. Paper dùng batch size **4096**, ta thì bị giới hạn phần cứng nên dùng nhỏ hơn — nhưng code này chạy với **bất kỳ** batch size nào.

### 🐦 Bước 2: mở rộng class token cho cả batch

```python
    class_token = self.class_embedding.expand(batch_size, -1, -1)
```

Lúc demo ta làm việc với một ảnh, nhưng thực tế ta đưa vào **cả batch**. Vì vậy class token phải có mặt cho **từng ảnh**. `expand(batch_size, -1, -1)` nhân bản class embedding thành `batch_size` bản; hai số `-1` nghĩa là **giữ nguyên / suy ra** các chiều còn lại.

Ví dụ với `embedding_dim=768` và batch size `32`: class embedding gốc `(1, 1, 768)` được mở rộng thành `(32, 1, 768)`.

### 🔥 Bước 3: patch embedding (Equation 1)

```python
    x = self.patch_embedding(x)
    # (batch_size, 196, 768)
```

Đây là phép biến đổi đầu tiên của `forward`: ảnh batch → chuỗi patch embeddings.

### 🧷 Bước 4: nối class token vào đầu chuỗi

```python
    x = torch.cat((class_token, x), dim=1)
    # (batch_size, 197, 768)
```

Nối theo `dim=1` — chiều số patch. Kết quả tăng từ `196` lên `197`.

### ➕ Bước 5: cộng position embedding

```python
    x = self.position_embedding + x
```

Position embedding có shape `(1, num_patches + 1, 768)` — cố ý thiết kế để khớp với chuỗi đã có class token, nên chỉ cần cộng thẳng.

### 💧 Bước 6: embedding dropout

```python
    x = self.embedding_dropout(x)
```

Nhớ lại paper: dropout áp **ngay sau khi cộng position embedding vào patch embedding**, và trước mọi dense layer. Đây là chỗ ta đặt nó.

### 🏛️ Bước 7: qua transformer encoder

```python
    x = self.transformer_encoder(x)
    # (batch_size, 197, 768)
```

Một dòng là đi qua cả **12** encoder block đã xếp chồng — nhờ đã gói thành `nn.Sequential`. Đây là Equation 2 và 3 nhân lên cho nhiều lớp.

### 🎯 Bước 8: classifier trên class token (Equation 4)

```python
    logits = self.classifier(x[:, 0])
    return logits
```

Equation 4 chỉ lấy **class token** — phần tử ở vị trí `0` của chiều sequence: `x[:, 0]`. Vì thế Figure 1 chỉ vẽ mũi tên từ class token đi ra MLP head. Classifier (LayerNorm + Linear) biến class token thành **logits** trên các lớp.

### ✅ Toàn bộ forward

Ghép lại:

```python
def forward(self, x):
    batch_size = x.shape[0]
    class_token = self.class_embedding.expand(batch_size, -1, -1)
    x = self.patch_embedding(x)
    x = torch.cat((class_token, x), dim=1)
    x = self.position_embedding + x
    x = self.embedding_dropout(x)
    x = self.transformer_encoder(x)
    logits = self.classifier(x[:, 0])
    return logits
```

Ta đã dựng xong Vision Transformer đầu tiên — từ ảnh đến logits, tất cả bằng tay. Vỗ tay nào!

Khởi tạo thử `vit = ViT()` — nó khởi tạo trơn tru, in ra cả đống layer.

Thử thách còn lại: đưa một batch dữ liệu qua `ViT`, xem output có đúng shape mong muốn không, và thử `torchinfo.summary`. Bài sau ta kiểm tra cùng nhau. Tự vỗ vai một cái nhé, ta đã replicate một paper state-of-the-art!
