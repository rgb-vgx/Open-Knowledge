---
title: 'Bài 352 — So sánh Experiment 3 và 4: multi-run nói gì?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 352
status: edited
source: '352 - Comparing the Results of Experiment 3 and 4.md'
categories:
- AI
tags: []
---

# 📊 Multi-run: compile nhanh hơn bao nhiêu phần trăm?

> Nguồn: `352 - Comparing the Results of Experiment 3 and 4.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745256)

Video trước ta đã train compiled model qua nhiều run và thấy: nếu compile **một lần** ở đầu, các epoch sau nhanh hơn trung bình, qua nhiều run vẫn vậy — dùng cho cả train lẫn inference. Giờ mình viết code **so sánh Experiment 3 và 4**.

### ♻️ Tái dùng hàm vẽ

Như mọi "cooking show" machine learning, mình lấy lại code vẽ ở mục 4.2 — chỉ đổi đầu vào:

* `non_compiled_results` → `non_compile_results_multiple_runs_df`.
* `compiled_results` → `compiled_results_multiple_runs_df`.
* `multi_runs=True`.
* `num_runs=num_runs` (thay vì `false`/`0` như single run).

Hàm `plot_mean_epoch_times` vẫn lo phần còn lại.

### 🥇 Kết quả: train nhanh hơn ~5.3%

* **Mean train epoch time**: model compile **nhanh hơn trung bình ~5.2–5.3%**. Đây là nơi phần lớn thời gian huấn luyện nằm, nên đây là con số quan trọng nhất.
* **Test epoch time**: model compile **không nhanh hơn** — chậm hơn một chút.

Mình trực giác rằng con số 5.3% sẽ **tăng lên** nếu dataset lớn hơn hoặc train lâu hơn: trung bình bị kéo bởi epoch đầu chậm, còn các epoch sau thì nhanh hơn.

### 🤔 Vì sao test epoch không nhanh hơn?

Mình chưa giải thích chắc chắn được. Có thể còn chỗ tối ưu phía sau; có thể **inference mode** sẽ giúp test nhanh hơn. Nhưng vì thời gian test **ít hơn hẳn** thời gian train (dù cùng đơn vị đo), ta quan tâm tiết kiệm thời gian train hơn là test.

### 💾 Lưu kết quả multi-run

Y như single-run, ta tạo thư mục và lưu DataFrame ra CSV:

```python
os.makedirs("pytorch_2_results/multi_run_results", exist_ok=True)

non_compile_results_multiple_runs_df.to_csv(
    "pytorch_2_results/multi_run_results/"
    "multi_run_non_compiled_results_cifar10_resnet50_nvidia_a100_40GB.csv",
    index=False
)

compiled_results_multiple_runs_df.to_csv(
    "pytorch_2_results/multi_run_results/"
    "multi_run_compiled_results_cifar10_resnet50_nvidia_a100_40GB.csv",
    index=False
)
```

Tên file ghi rõ GPU/dataset/image size — vì kết quả phụ thuộc vào từng cấu hình.

### ✅ Chốt lại cả chương thực nghiệm

Ta đã có đủ 4 thực nghiệm:

| | Một lần chạy | Nhiều lần chạy |
|---|---|---|
| **Không compile** | Experiment 1 | Experiment 3 |
| **Có compile** | Experiment 2 | Experiment 4 |

**Kết luận chính**: `torch.compile` **có** tăng tốc epoch, **miễn là** các bạn train đủ lâu để bù lại thời gian tối ưu ở epoch đầu. Với model state-of-the-art của torchvision train tới **600 epoch**, lợi ích sẽ rất đáng kể theo thời gian.

### 🔜 Gợi ý mở rộng

Ta đã thử TF32 nhưng **chưa thử mixed precision training**. Các bạn thử xem tài liệu PyTorch hướng dẫn tích hợp mixed precision vào code hiện tại thế nào — đó là gợi ý cho video sau.
