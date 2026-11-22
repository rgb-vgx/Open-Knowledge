---
title: 'Bài 292 — Gom thống kê hiệu năng của ViT'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 292
status: edited
source: '292 - Collecting Stats About Our-ViT Feature Extractor.md'
categories:
- AI
tags: []
---

# 📊 Gom thống kê hiệu năng của ViT

> Nguồn: `292 - Collecting Stats About Our-ViT Feature Extractor.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055234)

ViT đang là model tốt nhất trên giấy, file 327MB — ổn nếu deploy lên cloud nhiều tài nguyên, nhưng có thể là vấn đề với thiết bị nhỏ. Bài này hoàn tất bộ thống kê của ViT để sẵn sàng so sánh trực tiếp.

### 🔢 Đếm tổng tham số

```python
vit_total_params = sum(
    torch.numel(param) for param in vit.parameters()
)
```

Kết quả: **85,800,963** — "just under 86 million". So với EffNetB2:

| Model | Tổng tham số |
|---|---|
| EfficientNet B2 | ~7.7 triệu |
| ViT-B/16 | ~85.8 triệu |

Vì sao đếm? Một trong hai mục tiêu là **model nhanh**. Nói chung, càng nhiều tham số thì càng nhiều phép tính khi dữ liệu đi qua, và nhiều compute hơn thường kéo theo **latency** cao hơn. Đây chỉ là quy tắc ngón tay cái — điều chắc chắn là ta sẽ **đo bằng code** ở bài sau.

---

### 🗂️ Dictionary thống kê của ViT

```python
vit_results = {
    "test_loss": results_vit["test_loss"][-1],
    "test_acc": results_vit["test_acc"][-1],
    "num_params": vit_total_params,
    "model_size_mb": round(vit_model_size / 1e6, 2),
}
```

`results_vit` là dictionary `engine.train()` trả về — lý do hàm train lưu kết quả lại chính là để kiểm tra thế này. Nếu có nhiều thực nghiệm hơn, sẽ dùng **TensorBoard** hoặc **Weights & Biases** thay vì theo dõi thủ công.

---

### 🆚 Bảng đối chiếu sơ bộ

| | EffNetB2 | ViT |
|---|---|---|
| Test accuracy | ~97% | ~98.5% |
| Test loss | (từ `results`) | (từ `results_vit`) |
| Tổng tham số | 7.7M | 85.8M |
| File size | 29.8MB | 327MB |

Cả hai đều vượt mốc **95% accuracy** — mục tiêu "performs well" đã đạt. Còn mục tiêu **30 FPS / ~30ms latency** thì chưa kiểm tra.

---

Việc tiếp theo: **đo thời gian dự đoán** của từng model. Ý tưởng là lặp qua toàn bộ test set, đo thời gian từng prediction, rồi tính **trung bình thời gian/prediction** để thêm vào dictionary stats. Bạn thử trước — mình đi qua từng bước ở các bài sau.
