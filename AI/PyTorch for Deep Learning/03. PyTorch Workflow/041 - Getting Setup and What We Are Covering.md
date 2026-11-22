---
title: 'Bài 41 — Chuẩn bị môi trường và những gì sẽ học'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 41
status: edited
source: '041 - Getting Setup and What We Are Covering.md'
categories:
- AI
tags: []
---

# 🛠 Chuẩn bị môi trường và những gì sẽ học

> Nguồn: `041 - Getting Setup and What We Are Covering.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32686046)

Giờ thì vào code. Mình mở một notebook Colab mới tinh, đặt tên theo video để dễ đối chiếu, gắn link tài liệu tham khảo, rồi điểm qua sáu bước của workflow trước khi import PyTorch. Từ đây trở đi, cách học là **code cùng nhau**, gặp gì giải thích nấy.

### 📓 Dựng notebook mới

Mở [Google Colab](https://colab.research.google.com), tạo notebook mới, đặt tên kiểu `PyTorch Workflow` kèm số video để biết notebook thuộc bài nào. Trong notebook, tạo một cell markdown ghi lại:

* Link **ground truth notebook** (notebook gốc của khóa, có hình ảnh và chú thích).
* Link **book version** (bản sách của cùng notebook).
* Chỗ đặt câu hỏi: tab Discussions của repo.

Repo khóa học là tài liệu chuẩn; notebook mình viết trong video chỉ tập trung vào code.

---

### 🗂 Sáu bước sẽ đi qua

Tạo một dictionary nhỏ để tra lại sau này, liệt kê các bước:

1. **Data preparing and loading** — chuẩn bị và nạp dữ liệu.
2. **Build a model** — dựng model machine learning/deep learning trong PyTorch.
3. **Fit the model to data** — còn gọi là **training**.
4. **Make predictions and evaluate** — dự đoán còn gọi là **inference**; đánh giá model.
5. **Save and load a model**.
6. **Put it all together** — ghép mọi thứ.

Sơ đồ workflow đầy đủ còn có bước **improve through experimentation** (cải thiện bằng thực nghiệm), mình sẽ đào sâu ở phần sau. Trong phần này chỉ lướt qua từng bước một chút, rồi các phần sau sẽ đi sâu.

---

### 📥 Import thư viện

```python
import torch
from torch import nn   # nn contains all of PyTorch's building blocks for neural networks
import matplotlib.pyplot as plt
```

Ba thứ cần nhớ:

* `torch` — thư viện chính.
* `torch.nn` — toàn bộ building block cho neural network.
* `matplotlib.pyplot` — để vẽ, theo đúng khẩu hiệu *visualize, visualize, visualize*.

`torch.nn` chứa đủ loại layer (input layer, hidden layer, output layer). Ghép các viên gạch đó lại là cách xây neural network — và PyTorch cho phép ghép gần như tùy ý.

---

### 🔢 Kiểm tra phiên bản

```python
torch.__version__
```

Kết quả ví dụ: `1.10.0+cu111`. Đuôi `+cu111` nghĩa là bản build kèm **CUDA 11.1** — tức có hỗ trợ GPU NVIDIA. Tuy nhiên runtime Colab hiện tại chưa bật GPU.

Nếu phiên bản của bạn thấp hơn, ví dụ `1.8.0`, nên nâng lên ít nhất `1.10`. Cao hơn thì code vẫn chạy được.

---

### ✅ Tạm kết

Notebook đã sẵn sàng, tài nguyên đã gắn, dependency đã import. Bài sau mình bắt đầu bước đầu tiên: chuẩn bị và nạp dữ liệu.
