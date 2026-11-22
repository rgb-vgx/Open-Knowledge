---
title: 'Bài 284 — Train EfficientNet B2 và đọc loss curves'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 284
status: edited
source: '284 - Training Our EffNetB2 Feature Extractor and Inspecting the Loss Curves.md'
categories:
- AI
tags: []
---

# 🔥 Train EfficientNet B2 và soi loss curves

> Nguồn: `284 - Training Our EffNetB2 Feature Extractor and Inspecting the Loss Curves.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055226)

Đến giờ train candidate đầu tiên. Ta chỉ cần một loss function, một optimizer và hàm `train()` từ `engine.py` — cả ba đều đã có sẵn từ section going modular. Kết quả: gần 97% test accuracy chỉ sau vài epoch, minh chứng cho sức mạnh của transfer learning.

### 🧱 Chuẩn bị train

* **Loss function** — bài toán multiclass nên dùng **cross entropy loss** (`nn.CrossEntropyLoss`).
* **Optimizer** — **Adam**, learning rate **1e-3** (`1e-3` là điểm bắt đầu tốt; có thể tune).
* **Training function** — `engine.train()` từ `going_modular/engine.py`, viết từ section 05.

```python
from going_modular import engine
from torch import nn
import torch

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(effnetb2.parameters(), lr=1e-3)
```

### 🏋️ Cấu hình và chạy

```python
torch.manual_seed(42)

results = engine.train(
    model=effnetb2,
    train_dataloader=train_dataloader_effnetb2,
    test_dataloader=test_dataloader_effnetb2,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=10,
    device=device
)
```

Chọn **10 epochs** vì đó là cấu hình của model tốt nhất ở section 07 và là điểm cân bằng giữa thời gian và kết quả. Trên Colab của mình, mỗi epoch chỉ mất khoảng **6 giây** (GPU Tesla P100).

Đừng quá bận tâm nếu số của bạn lệch chút — hãy nhìn **xu hướng**: test accuracy tăng, test loss giảm.

### 📈 Đọc loss curves

Dùng `plot_loss_curves` trong `helper_functions.py`:

```python
from helper_functions import plot_loss_curves

plot_loss_curves(results)
```

Kết quả đẹp: **loss đi xuống, accuracy đi lên**. Đáng chú ý là **test loss thấp hơn train loss** — dấu hiệu cho thấy nếu train lâu hơn, hai đường có thể gặp nhau và kết quả còn tốt hơn (không phải lúc nào cũng chắc chắn, nhưng là gợi ý).

Nếu muốn đẩy xa hơn, hai hướng mình sẽ thử:

1. **Train lâu hơn** (nhiều epoch hơn).
2. **Thêm data augmentation** — ví dụ **TrivialAugmentWide**, kiểu augmentation mà "state of the art recipe" của PyTorch dùng.

### ✅ Đối chiếu mục tiêu

| Mục tiêu | Kết quả |
|---|---|
| ≥ 95% accuracy | ~97% — đạt |
| ≥ 30 FPS | chưa đo, làm ở phần sau |

Vậy là tiêu chí "performs well" đã xong; còn "fast" sẽ đo latency ở các bài sau.

---

Với mục tiêu deploy nhanh để thử nghiệm, model này là quá đủ. Bài sau mình thu thập các thống kê quan trọng của nó để lát nữa so sánh với ViT.
