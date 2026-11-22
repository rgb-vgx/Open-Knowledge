---
title: 'Bài 296 — Đo tốc độ dự đoán với ViT'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 296
status: edited
source: '296 - Making and Timing Predictions with ViT.md'
categories:
- AI
tags: []
---

# 🐢 Đo tốc độ dự đoán với Vision Transformer

> Nguồn: `296 - Making and Timing Predictions with ViT.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055238)

ViT chính xác hơn — **148/150** so với 145/150 của EffNetB2 — nhưng đổi lại tốc độ chậm hơn rõ rệt. Bài này chạy `pred_and_store()` cho ViT, tính latency trung bình, và hoàn tất hai dictionary thống kê để chuẩn bị so sánh.

### 🏃 Chạy dự đoán với ViT

```python
vit_test_preds = pred_and_store(
    paths=test_data_paths,
    model=vit,
    transform=vit_transforms,
    class_names=class_names,
    device="cpu"
)
```

Vẫn hard-code **CPU** vì không chắc môi trường deploy có GPU. (Một bài tập mở rộng: đo trên cả CPU lẫn GPU để so sánh.)

Chỉ nhìn progress bar đã thấy ViT **chậm hơn khá rõ** so với EffNetB2. Câu hỏi đặt ra: vì sao? Hãy suy nghĩ trước khi xem bảng so sánh ở bài sau.

---

### 📋 DataFrame và độ chính xác

```python
import pandas as pd

vit_test_pred_df = pd.DataFrame(vit_test_preds)
vit_test_pred_df.correct.value_counts()
```

Kết quả: **148/150 đúng** → **~98.5% accuracy**, nhỉnh hơn 145/150 của EffNetB2. Không chênh nhiều, nhưng có.

Đáng chú ý: xác suất dự đoán của ViT nhìn chung **cao hơn** (model tự tin hơn) — nhưng đổi bằng **thời gian**.

---

### ⏱️ Latency trung bình

```python
vit_avg_time_per_pred = round(vit_test_pred_df.time_for_pred.mean(), 4)
print(f"ViT average time per prediction: {vit_avg_time_per_pred}")
```

Kết quả vẫn **dưới 1 giây/ảnh** nhưng **cao hơn hẳn** EffNetB2 (~0.1396s trên cùng Colab CPU). Transcript không nêu con số chính xác, chỉ nhận định "cao hơn nhiều".

---

### 📊 Ghi vào stats dictionary

```python
vit_results["time_per_pred_cpu"] = vit_avg_time_per_pred
effnetb2_results["time_per_pred_cpu"] = effnetb2_avg_time_per_pred
```

Giờ mỗi model có một bộ thống kê hoàn chỉnh:

| Chỉ số | EffNetB2 | ViT |
|---|---|---|
| Test accuracy | ~97% (145/150) | ~98.5% (148/150) |
| Tổng tham số | 7.7M | 85.8M |
| Model size | 29.8MB | 327MB |
| Latency (CPU) | ~0.1396s | cao hơn đáng kể |

Đến đây hai thực nghiệm đã hoàn tất. Việc còn lại là **đánh giá** — đặt hai dictionary cạnh nhau trong một DataFrame để thấy rõ trade-off.

---

Thử tự gộp `effnetb2_results` và `vit_results` vào một DataFrame trước, rồi bài sau mình so sánh cùng nhau.
