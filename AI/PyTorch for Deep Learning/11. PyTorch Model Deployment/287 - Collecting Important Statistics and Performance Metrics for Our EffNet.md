---
title: 'Bài 287 — Gom thống kê hiệu năng của EfficientNet B2'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 287
status: edited
source: '287 - Collecting Important Statistics and Performance Metrics for Our EffNet.md'
categories:
- AI
tags: []
---

# 📊 Gom thống kê hiệu năng của EfficientNet B2

> Nguồn: `287 - Collecting Important Statistics and Performance Metrics for Our EffNet.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055229)

Ta đã có test loss, test accuracy và kích thước file. Còn thiếu một thông số quan trọng: **số lượng tham số**. Bài này đếm chúng rồi gom tất cả vào một dictionary — nền tảng để so sánh với ViT ở các bài sau.

### 🔢 Đếm số tham số

```python
effnetb2_total_params = sum(
    torch.numel(param) for param in effnetb2.parameters()
)
```

`torch.numel()` trả về **tổng số phần tử** trong một tensor — đúng nghĩa "number of elements". Kết quả:

```text
7,705,221
```

Vì sao quan tâm? Số tham số **góp phần vào kích thước model**, và nói chung model càng nhiều tham số thì càng nhiều phép tính khi dữ liệu chảy qua — có thể tốn thời gian hơn. Không phải quy luật tuyệt đối, nhưng là chỉ dấu đáng để ý.

Lưu ý: đây là **tổng** tham số (gồm cả base layers đã đóng băng), khác với **4,227 trainable parameters** ở classifier head.

### 🗂️ Gom vào dictionary

Vì chỉ có hai thực nghiệm, ta có thể theo dõi thủ công. Nếu nhiều hơn, nên dùng **TensorBoard** hoặc **Weights & Biases**.

```python
effnetb2_results = {
    "test_loss": results["test_loss"][-1],
    "test_acc": results["test_acc"][-1],
    "num_params": effnetb2_total_params,
    "model_size_mb": round(effnetb2_model_size / 1e6, 2),
}
```

Các key trong `results` được `engine.train()` trả về:

* `train_loss`
* `train_acc`
* `test_loss`
* `test_acc`

`[-1]` lấy giá trị của epoch cuối cùng.

### 📋 Bộ thống kê hoàn chỉnh

| Chỉ số | Giá trị |
|---|---|
| Test loss | từ `results` |
| Test accuracy | ~97% |
| Số tham số | 7,705,221 |
| Kích thước file | ~29.8 MB |

Dictionary này sẽ được đặt cạnh kết quả ViT để so sánh trực tiếp.

---

Việc của EfficientNet B2 đã xong. Bài tập của bạn: **lặp lại y hệt các bước cho Vision Transformer feature extractor** — tạo hàm tạo model, DataLoader, train, lưu, đo size, gom stats. Gợi ý: xem lại section 08 *PyTorch Paper Replicating*, phần "Putting it all together". Vài bài tới mình làm cùng.
