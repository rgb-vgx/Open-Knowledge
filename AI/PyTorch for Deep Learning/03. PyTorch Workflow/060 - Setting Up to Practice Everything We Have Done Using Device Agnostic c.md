---
title: 'Bài 60 — Chuẩn bị thực hành lại toàn bộ workflow với device-agnostic code'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 60
status: edited
source: '060 - Setting Up to Practice Everything We Have Done Using Device Agnostic c.md'
categories:
- AI
tags: []
---

# 🖥 Chuẩn bị thực hành lại toàn bộ workflow với device-agnostic code

> Nguồn: `060 - Setting Up to Practice Everything We Have Done Using Device Agnostic c.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32725750)

Đã đi qua trọn workflow: dữ liệu → build model → loss/optimizer → training loop → dự đoán → đánh giá → lưu/nạp. Giờ mình muốn làm lại tất cả một mạch, nhanh hơn, để thấy mọi thứ nằm cạnh nhau. Nhưng trước đó có một bước cần bổ sung: viết **device-agnostic code** — code tự chọn GPU nếu có, ngược lại dùng CPU.

### 🧠 Vì sao cần device-agnostic?

Nếu có GPU, code chạy nhanh hơn. Nếu không, tự động lùi về CPU. Dataset và model của mình nhỏ nên chưa cần GPU, nhưng viết theo kiểu này là **thói quen tốt** và sẽ dùng xuyên suốt khóa học từ đây.

---

### 🔥 Code chuẩn bị

```python
import torch
from torch import nn
import matplotlib.pyplot as plt

torch.__version__

# Setup device agnostic code
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
```

`torch.cuda.is_available()` trả về `True` nếu máy có GPU NVIDIA và PyTorch build kèm CUDA. **CUDA** là framework lập trình của NVIDIA cho GPU của họ.

Lúc này `device` có thể là `"cpu"` — hoàn toàn bình thường.

Kiểm tra nhanh bằng:

```python
torch.cuda.is_available()
```

`False` nghĩa là chưa có GPU; `True` nghĩa là `device` sẽ thành `"cuda"`.

---

### ⚡ Bật GPU trên Colab

Muốn thử GPU, vào `Runtime → Change runtime type → GPU`. Lưu lại thì runtime **khởi động lại** và mất hết biến đã chạy. Cách lấy lại: `Runtime → Run all` — vì model và dữ liệu nhỏ nên chạy lại rất nhanh.

Sau khi bật, `device` sẽ là `"cuda"`. Colab (bản trả phí của mình, bản miễn phí cũng có GPU nhưng có thể là dòng cũ hơn) tặng GPU miễn phí kèm tài khoản — quá đủ cho bài toán nhỏ này.

---

### ✅ Tạm kết

Đã có `device` để dùng về sau. Vài video tới mình sẽ dựng lại toàn bộ pipeline nhưng gắn device-agnostic code vào từng bước. Các bạn thử tự làm trước nhé — mọi thứ đều đã học rồi. Bài sau bắt đầu từ dữ liệu.
