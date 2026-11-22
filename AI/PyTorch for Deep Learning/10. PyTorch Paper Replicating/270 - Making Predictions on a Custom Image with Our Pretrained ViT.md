---
title: 'Dự đoán ảnh custom với ViT pre-trained'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 270
status: edited
source: '270 - Making Predictions on a Custom Image with Our Pretrained ViT.md'
categories:
- AI
tags: []
---

# 🍕 Dự đoán ảnh custom với ViT pre-trained

> Nguồn: `270 - Making Predictions on a Custom Image with Our Pretrained ViT.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049740)

Bài trước ta đã cân nhắc đánh đổi: ViT pre-trained cho kết quả tốt nhất từ trước tới nay, nhưng file lớn gấp ~11 lần model xếp sau, có thể **khó deploy** hoặc **chậm hơn** (giả thuyết, ta chưa đo). Giờ hãy thử đúng thứ ta muốn hướng tới — dự đoán trên **ảnh tự chụp**.

### 🔁 Tái dùng code dự đoán

Ta đã làm việc này nhiều lần (ở "Make predictions on a custom image"), nên lần này tận dụng lại code cũ, chỉ thay model sang `pretrained_vit`:

```python
# (tái dùng hàm dự đoán từ Learn PyTorch, đổi sang pretrained_vit)
# - tải ảnh custom
# - transform với vit_transforms
# - thêm batch dimension
# - đưa qua model, lấy softmax, in nhãn và xác suất
```

Điều quan trọng: dùng đúng `vit_transforms` — bộ transform khớp với lúc pre-train.

---

### 🎉 Kết quả: "Pizza Dad"

Ảnh "Pizza Dad" quen thuộc được tải về và cho qua model. Kết quả: **pizza**, với độ tin cậy **0.988** — cực cao. Hai ngón cái giơ lên!

---

### 🏁 Nhìn lại chặng đường (Milestone Project 2)

Ta đã chính thức đi tới cuối milestone project của mình:

1. **Replicate kiến trúc ViT từ đầu**, chỉ dựa vào paper.
2. Nhận ra kết quả chưa tốt (thiếu scale dữ liệu).
3. Chuyển sang **ViT pre-trained** — đúng kiến trúc ta tự dựng — và có kết quả **tốt nhất từ trước tới nay** (test loss thấp nhất, dự đoán tự tin nhất).

---

### 🎯 Thử thách

Hãy thử dự đoán trên **ảnh của chính bạn** (pizza, steak hoặc sushi) và chia sẻ kết quả. Bạn cũng có thể nghĩ cách **tăng số lớp** lên nhiều hơn 3.

Bài sau ta tổng kết **main takeaways** và đi qua các **exercise** của section này. Hẹn gặp!
