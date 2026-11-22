---
title: 'Bài 286 — Đo kích thước model EfficientNet B2 bằng MB'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 286
status: edited
source: '286 - Getting the Size of Our EffNetB2 Model in Megabytes.md'
categories:
- AI
tags: []
---

# 📏 Model nặng bao nhiêu MB và vì sao phải quan tâm?

> Nguồn: `286 - Getting the Size of Our EffNetB2 Model in Megabytes.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055228)

Bài trước ta lưu model — cụ thể là **state dict** — xuống file. Giờ đo kích thước file đó. Câu trả lời: khoảng **29.8 MB**. Nhưng câu hỏi hay hơn là: tại sao kích thước lại quan trọng đến vậy khi deploy?

### 🧐 Vì sao kích thước file model quan trọng?

Với Food Vision Mini, model sẽ chạy trên **mobile app hoặc website**, nơi tài nguyên compute có thể hạn chế.

* File quá lớn → **không đủ chỗ lưu** hoặc **không chạy nổi** trên thiết bị đích.
* "Quá lớn" tùy thiết bị: xem bạn có bao nhiêu storage và compute. Edge device càng yếu thì model càng phải gọn.

Không thể lưu một model bất kỳ rồi mong nó chạy trên mọi thiết bị. Vì thế ta thu thập thông số để lát nữa **so sánh** EfficientNet B2 với Vision Transformer: model nào **nhỏ nhất**, **chính xác nhất**, **latency thấp nhất** — tất cả góp phần vào quyết định chọn model cho Food Vision Mini.

### 🐍 Đo bằng `pathlib`

```python
from pathlib import Path

model_path = Path("models/09_pretrained_effnetb2_feature_extractor_pizza_steak_sushi_20_percent.pth")

effnetb2_model_size = model_path.stat().st_size  # bytes
print(f"EffNetB2 feature extractor model size: {round(effnetb2_model_size / 1e6, 2)}MB")
```

`Path.stat().st_size` trả về **kích thước file tính bằng byte**. Chia cho `1e6` để ra megabyte (quy đổi byte → MB), làm tròn 2 chữ số thập phân cho gọn.

Kết quả:

```text
EffNetB2 feature extractor model size: 29.8MB
```

Có thể tải file từ Colab rồi xem trực tiếp, nhưng đo bằng code nhanh và tái lập được hơn.

### 📊 Con số để so sánh sau này

EfficientNet B2 feature extractor:

* **~97% test accuracy**
* **~29.8 MB**

Đây là baseline. Model còn lại sẽ phải so với những con số này.

---

Bài sau mình gom các thống kê đã có vào một dictionary để tiện so sánh về sau.
