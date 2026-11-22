---
title: 'Bài 341 — Bật TF32 để tăng tốc nhân ma trận'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 341
status: edited
source: '341 - Getting More Potential Speedups with TensorFloat-32.md'
categories:
- AI
tags: []
---

# ⚡ TF32: lấy độ chính xác của float32, tốc độ của float16

> Nguồn: `341 - Getting More Potential Speedups with TensorFloat-32.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745232)

Ta đã dọn xong transforms. Giờ xem thêm một cơ hội tăng tốc nữa: **TF32**. Nó không hẳn riêng PyTorch 2.0, nhưng vì cả chương đang xoay quanh tốc độ nên rất đáng bàn.

### 🧮 Float32, float16 và bài toán đánh đổi

Trong máy tính, `float32` biểu diễn một số bằng **32 bit**, còn `float16` bằng **16 bit**. Ít bit hơn nghĩa là tính toán ít hơn, nên `float16` **train nhanh hơn**; nhưng ít bit cũng nghĩa là **độ chính xác thấp hơn**.

> Trong transcript gốc Daniel nhầm lẫn giữa "byte" và "bit" và tự nhận điều đó; điểm cốt lõi là 32 bit so với 16 bit.

Điều ta quan tâm trong machine learning chỉ có hai: **model train nhanh bao lâu** và **hiệu năng tốt đến đâu**. Lý tưởng là có cả hai — train nhanh mà vẫn chính xác, vì train nhanh mà model sai thì vô nghĩa.

### 🌟 TensorFloat-32 là gì?

**TF32** (TensorFloat-32) là một **kiểu dữ liệu của NVIDIA**, kết hợp `float32` và `float16`: lấy **độ chính xác của `float32`** và **tốc độ của `float16`**.

Cụ thể hơn, nó lấy **dải biểu diễn (range)** của `float32` và **độ chính xác (precision)** của `float16` — 10 bit thay vì 23 bit.

TF32 có trên GPU NVIDIA kiến trúc **Ampere** trở lên (A100 là ví dụ). Đây lại đúng chủ đề xuyên suốt: phần lớn tăng tốc đến từ việc **phần mềm tận dụng phần cứng mới**.

### ⚠️ Mặc định đã đổi từ PyTorch 1.12

Khi TF32 mới được đưa vào PyTorch, nó **mặc định bật**. Nhưng **từ PyTorch 1.12**, nó **mặc định tắt**.

Lý do: người dùng gặp kết quả khác nhau trên phần cứng khác nhau. Họ muốn API PyTorch **nhất quán**, thay vì phải lo GPU cũ có chạy được TF32 hay không. Vì thế nó bị tắt mặc định.

Lưu ý: nếu kết quả lạ, có thể do GPU không tương thích đủ tốt. Hãy thử cả bật và tắt để so sánh.

### 🐍 Bật TF32 trong code

Kiểm tra GPU có hỗ trợ không dựa vào compute capability **≥ 8.0** (như đã lấy ở bài trước):

```python
import torch

if score >= 8.0:
    print(f"Using GPU with score {score} — enabling TensorFloat-32")
    torch.backends.cuda.matmul.allow_tf32 = True
else:
    print(f"Using GPU with score {score} — TensorFloat-32 not available")
```

TF32 phát huy tác dụng ở **phép nhân ma trận** — thuật toán nặng nhất, cũng là nền tảng của hầu hết mạng neural. Bật cờ này, PyTorch sẽ dùng TF32 cho các phép nhân ma trận trên GPU khi có thể, **hoàn toàn tự động phía sau**.

```python
print(torch.backends.cuda.matmul.allow_tf32)  # mặc định là False từ 1.12
```

Đặt thành `True` trên A100, ta hy vọng tận dụng được phần tăng tốc mà các bài viết NVIDIA mô tả.

> Nếu thấy kết quả không nhất quán, cân nhắc để lại `False`. Lý do PyTorch đổi mặc định được bàn trong diễn đàn developer của PyTorch.

---

Thế là đã gom đủ các "vũ khí" tăng tốc. Video sau, ta bắt đầu chuẩn bị dữ liệu.
