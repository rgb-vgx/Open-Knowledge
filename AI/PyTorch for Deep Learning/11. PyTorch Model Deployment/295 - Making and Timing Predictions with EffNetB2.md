---
title: 'Bài 295 — Đo tốc độ dự đoán với EfficientNet B2'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 295
status: edited
source: '295 - Making and Timing Predictions with EffNetB2.md'
categories:
- AI
tags: []
---

# ⏱️ Đo tốc độ dự đoán với EfficientNet B2

> Nguồn: `295 - Making and Timing Predictions with EffNetB2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055237)

Hàm `pred_and_store()` đã sẵn sàng. Giờ chạy nó trên toàn bộ 150 ảnh test với EfficientNet B2 để xem **latency trung bình**. Kết quả: khoảng **120ms/ảnh** — chậm hơn mục tiêu 30ms 3–4 lần, nhưng không có nghĩa là không deploy được.

### 💡 Hai lưu ý trước khi chạy

1. **Chạy trên CPU** — khi deploy lên mobile hoặc Internet, không phải lúc nào cũng có GPU CUDA. Thiết bị có GPU thường to và đắt hơn; không phải cấm dùng GPU, chỉ cần biết rõ môi trường đích.
2. **Dùng đúng transforms** — EffNetB2 phải đi với **`effnetb2_transforms`**, ViT với **`vit_transforms`**. Dùng lẫn sẽ cho kết quả lệch.

---

### 🏃 Chạy dự đoán

```python
effnetb2_test_preds = pred_and_store(
    paths=test_data_paths,
    model=effnetb2,
    transform=effnetb2_transforms,
    class_names=class_names,
    device="cpu"
)
```

Progress bar cho thấy tốc độ khoảng **887 instances/second**, không lỗi. Mỗi phần tử là một dictionary đầy đủ: `image_path`, `class_name`, `pred_prob`, `pred_class`, `time_for_pred`, `correct`.

---

### 📋 Đưa vào DataFrame để phân tích

Đây là lý do chọn "list of dictionaries" — chuyển sang pandas rất gọn:

```python
import pandas as pd

effnetb2_test_pred_df = pd.DataFrame(effnetb2_test_preds)
```

Cũng chính vì pandas chạy trên CPU mà trong hàm ta phải `.cpu()` các tensor trước khi lưu — nếu không sẽ lỗi khi dùng pandas, numpy, matplotlib.

---

### ✅ Kiểm tra độ chính xác

```python
effnetb2_test_pred_df.correct.value_counts()
```

Kết quả: **145/150 đúng**, tức 5 ảnh sai — khớp với **~97% test accuracy** đã đo khi train.

---

### ⏱️ Latency trung bình

```python
effnetb2_avg_time_per_pred = round(effnetb2_test_pred_df.time_for_pred.mean(), 4)
print(f"EffNetB2 average time per prediction: {effnetb2_avg_time_per_pred}")
```

Trên Colab CPU: khoảng **0.1396 giây (~120–140ms/ảnh)**, chậm hơn mục tiêu ~30ms khoảng 3–4 lần.

| Môi trường | Thời gian/ảnh |
|---|---|
| PC local (Intel i9) | ~0.031s — sát mục tiêu |
| Google Colab (CPU) | ~0.1396s |

Thời gian dự đoán thay đổi theo **phần cứng**, giống thời gian train. Máy nhanh hơn cho kết quả nhanh hơn. Nếu số của bạn lệch vài lần, hãy kiểm tra lại code; nếu nhanh hơn — cứ tận hưởng.

---

Giờ đến lượt ViT. Bài tập: lặp lại y hệt với `vit` và `vit_transforms`, rồi so sánh average time per prediction giữa hai model. Mình làm cùng ở bài sau.
