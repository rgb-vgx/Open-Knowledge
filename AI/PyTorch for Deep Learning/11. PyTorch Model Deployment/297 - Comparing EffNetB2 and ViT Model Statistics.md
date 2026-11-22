---
title: 'Bài 297 — So sánh thống kê EffNetB2 và ViT'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 297
status: edited
source: '297 - Comparing EffNetB2 and ViT Model Statistics.md'
categories:
- AI
tags: []
---

# ⚖️ So sánh EffNetB2 và ViT: đổi 11 lần kích thước lấy 1.5% accuracy?

> Nguồn: `297 - Comparing EffNetB2 and ViT Model Statistics.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055239)

Đến lúc chấm điểm. Hai model đều đạt mục tiêu hiệu năng, nhưng chênh lệch về **chi phí** rất lớn: ViT có **11 lần tham số**, **11 lần kích thước file**, **5.5 lần thời gian dự đoán**. Bài này dựng bảng so sánh và trả lời câu hỏi: trade-off đó có đáng?

### 📊 Dựng DataFrame so sánh

```python
import pandas as pd

df = pd.DataFrame([effnetb2_results, vit_results])
df["model"] = ["EffNetB2", "ViT"]

# Đổi accuracy sang % cho dễ đọc
df["test_acc"] = round(df["test_acc"] * 100, 2)
```

---

### 🧭 Chỉ số nào tốt hơn?

| Chỉ số | Hướng tốt | Model thắng |
|---|---|---|
| Test loss | **Lower is better** | ViT (thấp hơn) |
| Test accuracy | **Higher is better** | ViT (~98.5% vs ~97%) |
| Số tham số | Thường lower is better* | EffNetB2 |
| Model size | Thường lower is better* | EffNetB2 |
| Time per pred (CPU) | Lower is better | EffNetB2 |

\* Số tham số và model size là **tùy tình huống**: nhiều tham số hơn không phải lúc nào cũng chậm hơn. Nhưng nhìn chung model nhiều tham số tốn nhiều phép tính hơn, và với mục tiêu đưa lên mobile thì nhỏ vẫn hơn.

Về trực giác: nếu có compute vô hạn thì chẳng cần quan tâm kích thước. Nhưng Tesla cũng không nhét được máy to tùy thích — model càng lớn, xe càng nặng, càng tốn điện, pin càng nhanh cạn. Luôn là **đánh đổi** giữa model lớn nhất có thể và hiệu năng/pin.

---

### 📐 Tính tỉ lệ ViT / EffNetB2

```python
ratio_df = df.set_index("model").loc[["ViT"]].div(
    df.set_index("model").loc[["EffNetB2"]]
)
ratio_df.columns = ["ViT to EffNetB2 ratios"]
ratio_df = ratio_df.T
```

Kết quả:

* **Test accuracy**: hơn khoảng **0.01** (tức ~1.5 điểm %) — rất nhỏ.
* **Test loss**: ViT tốt hơn.
* **Số tham số**: ViT **~11×**.
* **Model size**: ViT **~11×**.
* **Time per prediction (CPU)**: ViT **~5.5×**.

---

### 🤔 Trade-off có đáng không?

Cả hai model đều **không đạt 30 FPS** trên phần cứng Colab — mục tiêu lý tưởng chưa ai chạm tới.

Với Food Vision Mini, mình chọn **EfficientNet B2**:

* Hiệu năng chỉ thấp hơn ~1.5%, vẫn vượt xa mốc 95%.
* Nhỏ hơn 11 lần, dự đoán nhanh hơn 5.5 lần.

Nếu EffNetB2 chỉ đạt 70% thì câu chuyện khác. Nhưng vì hiệu năng quá sát nhau còn chi phí thì chênh rất lớn, **ưu tiên tốc độ** là hợp lý.

---

Quyết định: **deploy EffNetB2**. Còn một việc thú vị nữa — trực quan hóa các tỉ lệ này để "thấy" trade-off bằng mắt. Bài sau mình vẽ.
