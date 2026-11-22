---
title: 'Bài 340 — Tự động chọn batch size và image size theo VRAM'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 340
status: edited
source: '340 - Setting the Batch Size and Data Size Programmatically.md'
categories:
- AI
tags: []
---

# 💾 Đọc VRAM bằng PyTorch và tự chỉnh batch size

> Nguồn: `340 - Setting the Batch Size and Data Size Programmatically.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745230)

Video trước ta bàn rằng tăng tốc tương đối rõ nhất khi dùng nhiều GPU. Giờ mình viết code **đọc bộ nhớ GPU** để chọn batch size và image size phù hợp — khỏi phải chạy rồi hứng `CUDA out of memory`.

### 🌐 Nguyên tắc này không riêng PyTorch 2.0

Trước khi vào code, một lưu ý: ý tưởng "dùng càng nhiều GPU càng tốt" **không chỉ đúng với PyTorch 2.0**. Nó đúng với **mọi phiên bản PyTorch** và gần như **mọi model train trên GPU**. Khi dataset và model lớn dần, chúng thậm chí có thể **không vừa một chiếc A100**, lúc đó các bạn sẽ phải nghĩ đến nhiều GPU.

### 📏 Đọc tổng và số VRAM còn trống

PyTorch có sẵn hàm `torch.cuda.mem_getinfo()` trong nhóm `torch.cuda`:

```python
import torch

info = torch.cuda.mem_getinfo()
# trả về (theo byte): total, free, used, ...
```

Từ đó:

* **Total free GPU memory** = tổng trừ phần đã dùng.
* **Total GPU memory** = tổng bộ nhớ.

Giá trị trả về tính bằng **byte**, nên mình nhân với **`1e-9`** để đổi sang **gigabyte** cho dễ đọc (`1e-9` chính là `10^-9`, tương đương chia cho 10^9).

```python
total_free = info["free"] * 1e-9
print(f"Total free GPU memory: {total_free:.2f} GB")
```

Trên A100, số ra khoảng **41GB** — hợp lý. GPU khác sẽ cho số khác.

### 🎚️ Logic chọn batch size và image size

Đây là bộ quy tắc mình dùng (kinh nghiệm chạy A100, các bạn có thể phải chỉnh theo phần cứng và kích thước dữ liệu thật):

* Nếu GPU còn **hơn 16GB** bộ nhớ trống:
  * `batch_size = 128`
  * `image_size = 224`
* Nếu **dưới 16GB**:
  * `batch_size = 32`
  * `image_size` nhỏ hơn, để vừa GPU

Nếu batch size quá lớn, các bạn sẽ gặp **`CUDA out of memory`** — một trong những lỗi phổ biến nhất của deep learning. Đó là lý do phải hạ cả batch size lẫn image size.

```python
if total_free > 16:
    batch_size = 128
    image_size = 224
else:
    batch_size = 32
    image_size = 224  # giảm thêm nếu vẫn OOM

print(f"Memory available: {total_free:.1f}GB — using batch size {batch_size}, image size {image_size}")
```

Trên A100: `41GB — batch size 128, image size 224`.

### 🖼️ Nhớ cập nhật transforms

Một điểm quan trọng: **nếu đổi image size thì phải đổi transform tương ứng**, để dữ liệu được resize đúng kích thước.

```python
transforms.crop_size = image_size
transforms.resize_size = image_size
```

Transform gốc vốn đã dùng 224 nên crop size không thực sự phải đổi, nhưng mình vẫn set cho đầy đủ. Phần **thật sự thay đổi** là `resize_size` — từ 232 xuống 224.

> Các giá trị 16GB / 128 / 224 là đặc thù cho A100. GPU khác thì nên thử nghiệm lại.

---

Transforms đã xong và được set programmatically theo lượng VRAM. Video sau, ta xem thêm một cơ hội tăng tốc nữa — không hẳn riêng PyTorch 2.0, nhưng đáng nhắc vì đang bàn về speed: **TF32 (TensorFloat-32)**.
