---
title: 'Bài 103 — Cài đặt các thư viện computer vision cơ bản của PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 103
status: edited
source: '103 - Discussing and Importing the Base Computer Vision Libraries in PyTorch.md'
categories:
- AI
tags: []
---

# 🧰 Cài đặt các thư viện computer vision cơ bản của PyTorch

> Nguồn: `103 - Discussing and Importing the Base Computer Vision Libraries in PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920310)

Đủ slide rồi, giờ code. Bài này mình mở notebook mới, điểm danh những thư viện sẽ dùng suốt section, rồi import chúng và kiểm tra version — vì version là thứ hay làm code chạy được trên máy người này mà chết trên máy người khác.

### 📓 Khởi tạo notebook

Mình tạo notebook tên `03_pytorch_computer_vision_video.ipynb`, có gắn tag `_video` cho khớp cách đặt tên trong repo (các notebook video nằm ở thư mục `video_notebooks`, bản reference notebook là "ground truth" có chú thích đầy đủ). Trong notebook ghi sẵn hai link: reference notebook và online book (*Section 3: PyTorch Computer Vision*). Sau đó chuyển cell sang markdown bằng `command + M`.

---

### 📦 `torchvision` — thư viện domain chính

`torchvision` là thư viện domain của PyTorch dành cho computer vision. Theo docs tại thời điểm quay video, bản mới nhất là **torchvision 0.12**, còn Colab của Daniel thì đang chạy 0.11 (sẽ thấy ở phần kiểm tra version). Trong bộ PyTorch còn có các domain library khác:

* `torchaudio` — audio
* `torchtext` — text
* `torchrec` — recommendation system
* `torchdata` — data pipeline
* `torchserve` — serving model
* PyTorch/XLA (`torch_xla`) — tăng tốc phần cứng

Section này chỉ cần `torchvision`.

---

### 🗂️ Các module con của `torchvision`

* `torchvision.datasets` — tải dataset và data loading function cho computer vision.
* `torchvision.models` — các **pretrained model**. Đây là model đã train sẵn trên dữ liệu vision, có weight học được, mình tận dụng lại cho bài của mình (sẽ học kỹ ở section transfer learning).
* `torchvision.transforms` — hàm biến đổi ảnh cho phù hợp với model. Nhớ nguyên tắc: ảnh thô không đưa trực tiếp vào model được, phải biến thành số.

Ngoài ra, hai thứ không riêng vision mà cả PyTorch dùng:

* `torch.utils.data.Dataset` — base class để tạo dataset tùy chỉnh.
* `torch.utils.data.DataLoader` — tạo một **Python iterable** trên dataset (tức là chia batch, xáo trộn…).

---

### ⌨️ Import

```python
import torch
import torch.nn as nn
import torchvision
from torchvision import datasets
from torchvision.transforms import ToTensor
import matplotlib.pyplot as plt

print(torch.__version__)
print(torchvision.__version__)
```

`torch.nn` (viết tắt `nn`) chứa layer, loss function và mọi thứ để dựng mạng nơ-ron.

---

### 🔍 `ToTensor()` làm gì?

Mở docstring của `torchvision.transforms.ToTensor`:

> Converts a PIL Image or `numpy.ndarray` (H x W x C) in the range [0, 255] to a `torch.FloatTensor` of shape (C x H x W) in the range [0.0, 1.0].

Nói cách khác: đưa ảnh về tensor, đổi thứ tự chiều sang **channels first** và scale giá trị pixel từ 0–255 về 0–1 — vì neural network thích số trong khoảng 0 đến 1.

Module `transforms` còn rất nhiều phép biến đổi khác, gom lại bằng `Compose`. Bài tập mở rộng: dành 10 phút đọc từng mục trong package này, tổng cộng khoảng một giờ — rất đáng.

---

### 📊 Và Matplotlib

```python
import matplotlib.pyplot as plt
```

Matplotlib là công cụ visualization cốt lõi. Nhắc lại khẩu hiệu của dân khám phá dữ liệu: **visualize, visualize, visualize** — hãy "làm một với dữ liệu".

---

### ✅ Kiểm tra version

Sau khi chạy, máy của Daniel ra **PyTorch 1.10** (có CUDA) và **torchvision 0.11**. Đây là mức tối thiểu để học section này; máy bạn có thể mới hơn. Nếu code lỗi, hãy kiểm tra version trước tiên.

> ⚠️ Cần kiểm chứng: số version nêu trên là tại thời điểm quay video (2022). Hiện nay PyTorch/torchvision đã lên các bản 2.x, một số API vẫn giữ nguyên nhưng bạn nên đối chiếu docs của bản mình đang dùng.

---

### ✅ Tạm kết

Đã có đủ đồ nghề: `torch`, `torch.nn`, `torchvision` (datasets, transforms), `matplotlib`. Bài sau mình đi lấy dataset thật — FashionMNIST.
