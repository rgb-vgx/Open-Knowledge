---
title: 'Cài bản PyTorch và TorchVision mới nhất'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 183
status: edited
source: '183 - Installing the Latest Versions of Torch and Torchvision.md'
categories:
- AI
tags: []
---

# 📦 Cài bản PyTorch và TorchVision mới nhất

> Nguồn: `183 - Installing the Latest Versions of Torch and Torchvision.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32987004)

Chào các bạn! Tới lúc code rồi. Mình mở Google Colab và bắt đầu setup môi trường.

### 🧾 Vì sao cần bản mới?

Section này cần **torchvision 0.13+** vì có **Multi-Weight API** — API cho phép dùng nhiều bộ weight khác nhau cho cùng một kiến trúc. Lúc quay, 0.13 còn beta; notebook `V2` được tạo để chạy code mới này. Khi bạn học, có thể chỉ còn một bản `pytorch_transfer_learning`.

Mình tạo notebook mới, đặt tên `06_pytorch_transfer_learning`, thêm ghi chú:

> **Transfer learning** là lấy tham số một model đã học trên dataset khác rồi áp dụng cho bài toán của mình.
>
> **Pre-trained model** còn được gọi là **foundation model** — hai thuật ngữ dùng thay nhau.

---

### 🖥️ Chọn GPU

Vào **Runtime → Change runtime type**, chọn GPU.

---

### 🔢 Kiểm tra phiên bản

```python
import torch
import torchvision
print(torch.__version__, torchvision.__version__)
```

Mục tiêu:

* `torch` **1.12+**
* `torchvision` **0.13+**

Nếu đã đủ thì bỏ qua bước cài bên dưới. Lúc quay, Colab chưa có nên phải nâng cấp.

---

### 🌙 Cài bản nightly

Vào trang **PyTorch Get Started**, chọn **Preview (nightly)**. Bản nightly có thể chưa ổn định, nhưng thường đã "gần stable" và có API mới nhất.

Đoạn code mình dùng (lấy từ notebook V2) làm như sau:

1. Import `torch`, `torchvision`.
2. **Assert** phiên bản đạt yêu cầu.
3. Nếu không, cài bản nightly bằng `pip`.

Đại ý:

```python
import torch, torchvision

assert int(torch.__version__.split(".")[1]) >= 12, "torch version should be 1.12+"
assert int(torchvision.__version__.split(".")[1]) >= 13, "torchvision version should be 0.13+"
print(f"torch version: {torch.__version__}")
print(f"torchvision version: {torchvision.__version__}")
```

Nếu phiên bản chưa đạt, cell in ra thông báo *"torchvision versions not as required, installing nightly versions"* rồi cài bản nightly bằng `pip`.

---

### ⏳ Quá trình cài

Có thể mất **4–5 phút** tùy tốc độ mạng của Colab. Nó sẽ:

* Gỡ bản cài hiện tại.
* Tải và cài bản nightly của `torch` và `torchvision`.
* (Không cần `torchaudio` cho section này.)

---

### 🔁 Restart runtime

Sau khi cài package mới trong Colab, **phải restart runtime**. Restart xong, chạy lại hai cell kiểm tra phiên bản. Lúc này ta thấy bản `dev` kèm ngày build, ví dụ torch **1.13**, torchvision **0.14** — thỏa yêu cầu.

Chạy lại phần `assert`, lần này pass.

---

### 💡 Lưu ý thực tế

* Nếu Colab của bạn đã có sẵn phiên bản phù hợp, **không cần** chạy block cài đặt.
* Nhưng nếu mở lại notebook sau này mà thiếu phiên bản, phải chạy lại — nếu không API mới sẽ lỗi.
* Dần dần Colab sẽ có sẵn các phiên bản này mặc định.

---

### ✅ Chốt lại

Môi trường đã sẵn sàng với torch/torchvision đủ mới. Video sau ta import code đã viết từ các section trước vào notebook. Hẹn gặp các bạn!
