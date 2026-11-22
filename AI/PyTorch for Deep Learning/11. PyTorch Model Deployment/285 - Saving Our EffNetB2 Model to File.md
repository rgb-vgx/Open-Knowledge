---
title: 'Bài 285 — Lưu model EfficientNet B2 xuống file'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 285
status: edited
source: '285 - Saving Our EffNetB2 Model to File.md'
categories:
- AI
tags: []
---

# 💾 Lưu model ra file để chuẩn bị deploy

> Nguồn: `285 - Saving Our EffNetB2 Model to File.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055227)

Muốn deploy thì model phải nằm trong file — app không thể import notebook của bạn. May mắn là ta đã có hàm `save_model` trong `utils.py`, và chỉ cần một dòng để gọi.

### ✅ Model đã đủ tốt

EfficientNet B2 feature extractor đạt **~97% accuracy**, vượt tiêu chí 95%. Loss curves còn cho thấy nếu train lâu hơn, hiệu năng có thể tăng — đáng thử, nhưng nhớ thêm **data augmentation** để tránh overfitting.

### 📁 Gọi `utils.save_model`

```python
from going_modular import utils

utils.save_model(
    model=effnetb2,
    target_dir="models",
    model_name="09_pretrained_effnetb2_feature_extractor_pizza_steak_sushi_20_percent.pth"
)
```

Hàm này nằm trong `going_modular/utils.py`, viết từ section 05. Tên file hơi dài nhưng **mô tả rõ ràng** — người khác (và chính bạn sáu tháng sau) nhìn vào là biết đây là model gì, kiến trúc gì, train trên dữ liệu nào.

Lưu ý: `utils.save_model` tạo thư mục nếu chưa có, rồi ghi model vào `models/`.

### 🤔 Hai câu hỏi trước khi sang bài sau

Đây là bài tập nhỏ mình để lại:

1. **File model nặng bao nhiêu MB?**
2. **Vì sao kích thước file model lại quan trọng khi deploy** — nhất là với Food Vision Mini?

Gợi ý: nghĩ lại bài về **on-device vs cloud**. Nếu model chạy trên điện thoại, bạn bị giới hạn **storage** và **compute**; một file nặng vài trăm MB vừa tốn chỗ vừa load chậm. Còn nếu deploy lên cloud thì kích thước ít cấn hơn, nhưng thời gian download/cold start vẫn bị ảnh hưởng.

---

Thử tự đo kích thước file trước, rồi bài sau mình giải cả hai câu cùng nhau.
