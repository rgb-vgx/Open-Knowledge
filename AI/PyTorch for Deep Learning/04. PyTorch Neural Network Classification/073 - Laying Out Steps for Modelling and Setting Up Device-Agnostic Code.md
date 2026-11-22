---
title: 'Bài 73 — Lên các bước modelling và dựng code device-agnostic'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 73
status: edited
source: '073 - Laying Out Steps for Modelling and Setting Up Device-Agnostic Code.md'
categories:
- AI
tags: []
---

# ⚙️ Lên các bước modelling và dựng code device-agnostic

> Nguồn: `073 - Laying Out Steps for Modelling and Setting Up Device-Agnostic Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820604)

Data đã chia xong: khoảng **800 mẫu train** và **200 mẫu test** (tỉ lệ 80/20). Train set để model học pattern — chấm đỏ hay chấm xanh; test set để đánh giá pattern đó. Giờ bước sang phần hai: **building a model**. Không có gì mới, chỉ là ghép lại những thứ đã học.

### 🧭 Bốn bước dựng model

Trước khi gõ, mình phác ra giấy cho rõ:

1. **Set up device-agnostic code** — để code chạy được trên **GPU** (accelerator) nếu có, không thì CPU.
2. **Construct a model** — subclass `nn.Module`.
3. **Define loss function và optimizer**.
4. **Tạo training và test loop** (phần này để bài sau).

Ba bước cuối khớp với workflow tổng quát: chọn/xây model phù hợp bài toán, chọn loss function và optimizer, rồi xây training loop.

---

### 🔌 Device-agnostic code

```python
import torch
from torch import nn  # nn là alias của torch.nn

# Setup device agnostic code
device = "cuda" if torch.cuda.is_available() else "cpu"
device
```

Mặc định — khi không có GPU — mọi code PyTorch sẽ chạy trên **CPU**. Nếu `torch.cuda.is_available()` trả về `True`, mình dùng **CUDA** (GPU của NVIDIA).

Mình đang chạy trên Colab nên bật GPU bằng **Runtime → Change runtime type → GPU → Save**. Runtime sẽ khởi động lại và kết nối lại. Vì đã reset, phải **Run all** (hoặc **Run before**) để chạy lại các cell phía trên — nếu không `X_train` sẽ chưa được định nghĩa.

Sau khi chạy lại, `device` ra `"cuda"` và dữ liệu đã sẵn sàng.

---

### 💡 Vì sao phải device-agnostic?

Đây là thói quen tốt nên luyện ngay từ đầu. Code được viết để **mặc định chạy trên CPU**, nhưng nếu máy có accelerator thì tự động tận dụng **GPU** — nhanh hơn nhiều. Quan trọng hơn: người khác (hoặc chính các bạn sau này) chạy lại code trên máy khác nhau vẫn chạy được, không phải sửa gì.

Mình sẽ dùng `device` này cho cả **model** lẫn **dữ liệu** ở các bước sau. Bài tới mình bắt tay dựng model đầu tiên — `CircleModelV0` — để tách hai vòng tròn đỏ xanh.
