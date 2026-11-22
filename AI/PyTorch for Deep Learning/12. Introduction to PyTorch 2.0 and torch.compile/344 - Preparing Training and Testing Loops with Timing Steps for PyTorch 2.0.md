---
title: 'Bài 344 — Thêm bấm giờ vào train/test loop'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 344
status: edited
source: '344 - Preparing Training and Testing Loops with Timing Steps for PyTorch 2.0.md'
categories:
- AI
tags: []
---

# ⏱️ Gắn đồng hồ vào vòng train và test

> Nguồn: `344 - Preparing Training and Testing Loops with Timing Steps for PyTorch 2.0.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745240)

Các bạn đã tự viết loop chưa? Giờ mình làm cùng nhau. Mục tiêu gọn thôi: **tạo training loop và test loop, mỗi loop có bước bấm giờ**, để biết model train/test mất bao lâu. Vì toàn bộ thực nghiệm của chương chính là so sánh con số thời gian này.

### 🎵 Nhắc lại "bài hát" train loop

Các bạn hẳn còn nhớ điệp khúc khi train PyTorch model:

1. `model.train()`
2. Forward pass
3. Tính `loss`
4. `optimizer.zero_grad()`
5. `loss.backward()`
6. `optimizer.step()`

Lần này ta tái dùng code từ phần **Going Modular** (mình thừa nhận là "phá luật" không tự viết lại), nhưng chỉ thêm vài thay đổi nhỏ.

### 🧩 Chỉ thêm vài dòng: đo thời gian

Ý tưởng rất đơn giản — import `time`, rồi **kẹp** mỗi bước train và test giữa hai mốc thời gian:

```python
import time

# ... trong epoch train
train_start = time.time()
# [train step]
train_end = time.time()
train_time = train_end - train_start

# ... trong epoch test
test_start = time.time()
# [test step]
test_end = time.time()
test_time = test_end - test_start
```

Rồi in ra:

```python
print(f"Train epoch time: {train_time:.3f}s")
print(f"Test epoch time: {test_time:.3f}s")
```

Và **cập nhật dict kết quả** trả về để chứa `train_time` / `test_time`.

So với bản gốc ở Going Modular, thay đổi chỉ là **vài dòng** ở mỗi loop: bọc `train step` bằng bấm giờ, bọc `test step` bằng bấm giờ, và thêm tham số tắt progress bar.

### ⚠️ Một vấn đề gặp phải: inference_mode

Khi thực nghiệm với PyTorch 2.0, mình **gặp lỗi với `torch.inference_mode`**, nên phải dùng **`torch.no_grad()`** trong test loop.

```python
with torch.no_grad():
    # test step
```

Nếu các bạn thấy `torch.inference_mode` chạy được (có thể do PyTorch 2.0 đã được cập nhật), hãy báo mình qua GitHub Discussions/Issues — mình sẽ cập nhật notebook. Còn hiện tại, cứ dùng `torch.no_grad()` cho chắc.

### 🔜 Thử thách: Experiment 1

Loop xong, giờ ta bước sang **Section 3: đo thời gian model qua single run**. Cụ thể **Experiment 1**:

* Dùng model, data, dataloader, transforms, batch size đã chuẩn bị.
* Train **5 epoch**.
* **Không** dùng `torch.compile` — train và đánh giá y như mọi khi.

Việc của các bạn: tự chạy thử **trước** khi xem bài sau. Hẹn gặp ở đó.
