---
title: 'Lưu ViT pre-trained và kiểm tra kích thước file (327 MB)'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 268
status: edited
source: '268 - Saving Our Pretrained ViT Model to File and Inspecting Its Size.md'
categories:
- AI
tags: []
---

# 💾 Lưu ViT pre-trained và kiểm tra kích thước file (327 MB)

> Nguồn: `268 - Saving Our Pretrained ViT Model to File and Inspecting Its Size.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049500)

Pre-trained ViT đã cho những loss curve đẹp. Giờ hãy **lưu model** để có thể dùng trong ứng dụng Food Vision Mini — ví dụ deploy lên mobile hay trình duyệt, cho người dùng chụp ảnh món ăn và model nói "bạn đang ăn pizza" hay "sushi".

### 💾 Lưu model

Dùng `utils.save_model` từ Going Modular:

```python
from going_modular import utils

utils.save_model(
    model=pretrained_vit,
    target_dir="models",
    model_name="08_pretrained_vit_feature_extractor_pizza_steak_sushi.pth",
)
```

Tên file theo quy ước: **08** (section), `pretrained_vit_feature_extractor`, tên dữ liệu, và đuôi `.pth`. Nếu chạy trơn, ta thấy dòng "Saving model to models/08_pretrained_vit_feature_extractor_pizza_steak_sushi.pth" và file xuất hiện trong thư mục `models`.

---

### 📏 Kiểm tra kích thước file

Dùng `pathlib` để lấy kích thước file, đổi ra megabyte:

```python
from pathlib import Path

pretrained_vit_model_size = (
    Path("models/08_pretrained_vit_feature_extractor_pizza_steak_sushi.pth")
    .stat()
    .st_size
    // (1024 * 1024)
)

print(f"Pretrained ViT feature extractor model size: {pretrained_vit_model_size} MB")
```

Kết quả: **327 MB**.

---

### 🤔 327 MB — quá lớn?

Trong machine learning, nhìn chung **model càng lớn càng tốt**. Nhưng khi deploy lên **mobile** hay **trình duyệt**, ta có giới hạn về compute. GPU 16 GB của Colab không có trên điện thoại, nên model có thể cần **nhỏ hơn**.

Để so sánh: model tốt nhất ở Section 7 — **EfficientNetB2** — chỉ nặng **29 MB**.

Vậy câu hỏi là: 327 MB có quá lớn để deploy không? Suy nghĩ nhé — bài sau ta bàn tiếp, so sánh kết quả và kích thước của EfficientNetB2 với ViT pre-trained.
