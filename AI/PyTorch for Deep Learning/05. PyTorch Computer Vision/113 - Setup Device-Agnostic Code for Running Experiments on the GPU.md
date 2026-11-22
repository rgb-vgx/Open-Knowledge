---
title: 'Bài 113 — Thiết lập device-agnostic code để chạy trên GPU'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 113
status: edited
source: '113 - Setup Device-Agnostic Code for Running Experiments on the GPU.md'
categories:
- AI
tags: []
---

# 🖥️ Thiết lập device-agnostic code để chạy trên GPU

> Nguồn: `113 - Setup Device-Agnostic Code for Running Experiments on the GPU.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920334)

Model 0 đạt 83% trên CPU. Giờ mình bật GPU và viết **device-agnostic code** — code tự chọn phần cứng phù hợp, không hard-code CPU hay CUDA — để chuẩn bị cho model tiếp theo.

### 🔌 Kiểm tra có GPU không

Hai cách:

```bash
!nvidia-smi
```

```python
torch.cuda.is_available()
```

Lúc đầu cả hai đều thất bại vì Colab chưa bật GPU. Cách bật: `Runtime` → `Change runtime type` → chọn **GPU** → Save. Notebook sẽ restart và reconnect.

Sau khi bật, `nvidia-smi` cho thấy **Tesla T4** với **16GB memory**; `torch.cuda.is_available()` trả `True`.

### 🔄 Nhớ chạy lại các cell phía trên

Khi runtime reset, mọi biến mất hết. Dùng **Run before** (hoặc Run all) để tải lại data và helper function. Dataset nhỏ nên tải nhanh — đây là lợi thế của dataset có sẵn trên `torchvision.datasets`. Với dataset lớn, việc tải lại có thể tốn kha khá thời gian, cần lưu ý.

### 🧭 Device-agnostic code

```python
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print(device)
# cuda
```

Pattern này xuất hiện gần như ở đầu mọi notebook PyTorch. Mình cố ý để nó ở giữa notebook để các bạn thấy: hoàn toàn có thể train trên CPU trước, rồi "nâng cấp" lên GPU sau mà không phải viết lại code.

Sau này, mỗi khi tạo model hay tensor, chỉ cần `.to(device)` là code chạy được trên bất kỳ phần cứng nào.

### 🤔 Baseline đã 83%, có cần phi tuyến không?

Quay lại câu hỏi treo từ đầu section. Nhìn ảnh quần áo, có vẻ nhiều thứ khá tuyến tính, nhưng cũng có hình dạng phi tuyến. Baseline không có phi tuyến mà vẫn đạt 83% — vậy thêm phi tuyến có giúp không?

Không ai biết trước. Đó chính là lý do phải **thí nghiệm**. Model tiếp theo sẽ có phi tuyến và chạy trên GPU, để so sánh cả **accuracy** lẫn **thời gian train**.

### 🎯 Thử thách

Trước khi xem bài sau, các bạn thử tự dựng một model có `nn.ReLU` chen giữa các linear layer, đẩy lên `device`, rồi tự đặt câu hỏi: nó có tốt hơn 83.4% không?

### ✅ Tạm kết

Đã có `device` tự động chọn `cuda` hoặc `cpu`. Bài sau mình dựng **Model 1** — giống Model 0 nhưng thêm các lớp phi tuyến — và chạy trên GPU.
