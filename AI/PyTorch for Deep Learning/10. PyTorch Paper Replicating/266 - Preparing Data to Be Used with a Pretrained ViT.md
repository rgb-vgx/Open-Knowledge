---
title: 'Chuẩn bị dữ liệu đúng transform cho ViT pre-trained'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 266
status: edited
source: '266 - Preparing Data to Be Used with a Pretrained ViT.md'
categories:
- AI
tags: []
---

# 📦 Chuẩn bị dữ liệu đúng transform cho ViT pre-trained

> Nguồn: `266 - Preparing Data to Be Used with a Pretrained ViT.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049492)

Bài trước ta đã lấy ViT pre-trained và thay head cho Food Vision Mini. Mục tiêu: tận dụng lợi thế model pre-trained, vì dữ liệu của ta rất hạn chế so với paper (chỉ khoảng **225 ảnh**) và tài nguyên chỉ có một GPU. Dùng model pre-trained thường **nhanh hơn** thu thập thêm dữ liệu. Giờ kiểm chứng xem nó có cho kết quả tốt hơn không.

### ⚠️ Quy tắc vàng: transform phải khớp lúc train

Khi dùng model pre-trained, dữ liệu phải được **định dạng giống hệt** lúc model được huấn luyện. Model page của ViT-B/16 (trên ImageNet-1k) mô tả các phép **inference transforms**: crop, resize, mean, standard deviation.

May mắn là ta lấy được chúng **tự động** từ weights:

```python
# Lấy transform tự động khớp với weights
vit_transforms = pretrained_vit_weights.transforms()
print(vit_transforms)
```

Kết quả gồm **resize**, **crop size**, **mean**, **standard deviation** — rất giống bộ transform ta tự viết hồi trước, nhưng đảm bảo **khớp chính xác** với lúc model được train. Cứ dùng cái này cho chắc.

### 🔄 Tạo dataloader

Dùng lại `create_dataloaders` từ `data_setup` (phần Going Modular):

```python
from going_modular import data_setup

train_dataloader_pretrained, test_dataloader_pretrained, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=vit_transforms,
    batch_size=32,
)
```

Lưu ý: tham số là `transform` (số ít), không phải `transforms` — mình gọi nhầm vài lần trong lúc gõ.

### 📈 Vì sao có thể dùng batch size lớn hơn?

Ta có thể tăng batch size lớn hơn 32 khi dùng model pre-trained vì **phải cập nhật ít trọng số hơn**. Ở feature extractor, chỉ có khoảng **2.300** trọng số trainable, thay vì cập nhật cả **86 triệu** tham số. Ít phép tính hơn, tốn ít bộ nhớ hơn — nên batch size có thể lớn hơn. Bạn cứ thử nghiệm.

### ✅ Chốt lại

Dữ liệu đã sẵn sàng với transform chuẩn của ViT-B/16. Giờ đến bước **train feature extractor**. Code sẽ rất giống phần train trước đó.

Thử thách: tự viết phần training cho pre-trained ViT và xem nó so với bản custom thế nào. Bài sau ta cùng train và so sánh!
