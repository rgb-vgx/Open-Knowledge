---
title: 'Chuẩn bị môi trường viết code PyTorch với Google Colab'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 19
status: edited
source: '019 - Getting Setup to Write PyTorch Code.md'
categories:
- AI
tags: []
---

# ⚙️ Chuẩn bị môi trường viết code PyTorch với Google Colab

> Nguồn: `019 - Getting Setup to Write PyTorch Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656948)

Đủ lý thuyết rồi, giờ vào code! Bài này mình sẽ giới thiệu công cụ chính chúng ta dùng suốt khóa: **Google Colab**. Các bạn mở trình duyệt lên và làm theo mình nhé — nhớ nguyên tắc "code along".

### 📒 Google Colab là gì?

Vào **colab.research.google.com**, các bạn sẽ tạo được một **notebook** mới. Đây là nơi chúng ta luyện viết code PyTorch.

Nếu muốn hiểu Colab từ đầu, có thể đọc mục **Overview of Colaboratory features**. Nhưng về cơ bản, một notebook gồm hai loại cell:

* **Code cell** — nơi viết Python.
* **Text cell** — nơi viết ghi chú, tiêu đề.

Ví dụ, trong code cell:

```python
print("Hello, I'm excited to learn PyTorch")
```

Bấm **Shift + Enter** là chạy. Muốn đổi một cell thành text cell, dùng phím tắt (trên Mac là **Cmd + M, M**), rồi **Shift + Enter**.

Cuốn sách online **learnpytorch.io** thực chất cũng là các notebook Colab được chuyển sang dạng sách. Mỗi module mới, chúng ta bắt đầu một notebook mới. Module đầu tiên đặt tên **`00_pytorch_fundamentals`** — vì code Python bắt đầu từ số 0.

---

### ⚡ Bật GPU trong Colab

Lợi thế lớn của Colab: vào **Runtime → Change runtime type → Hardware accelerator**, chọn **GPU** (hoặc **TPU**), bấm **Save**.

Mình dùng bản **Colab Pro** (khoảng 10 USD/tháng, giá có thể khác tùy nơi). Các bạn **không bắt buộc** phải trả phí — bản miễn phí vẫn đủ để học hết khóa, chỉ là GPU thường không nhanh bằng.

Kiểm tra GPU đang có bằng lệnh shell:

```bash
nvidia-smi
```

Máy của mình lúc đó là **Tesla P100** — một GPU khá tốt. Bản trả phí thường được GPU xịn hơn.

---

### 📦 PyTorch và các thư viện có sẵn

Colab cài sẵn PyTorch và nhiều package data science quen thuộc. Kiểm tra phiên bản:

```python
import torch
print(torch.__version__)
```

Và nạp thêm các thư viện nền:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

Lúc quay video, kết quả là **PyTorch 1.10.0**, kèm hậu tố **CUDA 11.1**. Bản PyTorch mới nhất khi đó là 1.10.2, nên yêu cầu tối thiểu để học khóa là **PyTorch 1.10** và **CUDA 11.3**.

> ⚠️ Cần kiểm chứng: các con số phiên bản PyTorch/CUDA ở trên là tại thời điểm quay khóa (khoảng 2022). Hiện nay PyTorch đã lên các phiên bản 2.x, nên các bạn chỉ cần cài bản mới nhất từ pytorch.org; code trong khóa vẫn chạy được với phiên bản mới.

---

### 🧭 Colab hay chạy local?

Colab là cách **dễ nhất** để bắt đầu: không cài đặt, có GPU miễn phí, toàn bộ khóa học chạy được trên đó.

Nếu muốn chạy trên máy local, hãy xem tài liệu **"Getting set up to code PyTorch"** của khóa — nhưng đó không thay thế tài liệu cài đặt chính thức trên pytorch.org. Muốn bắt đầu càng sớm càng tốt thì mình khuyên dùng Colab.

---

### ✅ Sẵn sàng

PyTorch đã sẵn sàng, các package nền đã có. Bài sau chúng ta bắt đầu viết code PyTorch thật sự. Mình rất háo hức — hẹn gặp các bạn!
