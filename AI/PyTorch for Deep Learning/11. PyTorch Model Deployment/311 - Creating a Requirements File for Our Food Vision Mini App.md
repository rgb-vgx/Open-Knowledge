---
title: 'Bài 311 — Viết requirements.txt cho app Food Vision Mini'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 311
status: edited
source: '311 - Creating a Requirements File for Our Food Vision Mini App.md'
categories:
- AI
tags: []
---

# 📋 `requirements.txt` — khai báo dependency cho Spaces

> Nguồn: `311 - Creating a Requirements File for Our Food Vision Mini App.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34106544)

Chào các bạn. Còn đúng một file để hoàn tất thư mục demo: `requirements.txt`. File này nói cho Hugging Face Spaces biết cần cài những gì để app chạy.

### 📌 Vì sao cần file này?

Khi build app, Spaces sẽ cài các thư viện trong `requirements.txt`. Môi trường mặc định không chắc có sẵn `torch`, `torchvision`, `gradio`, nên phải khai báo tường minh.

---

### 📦 Ba dependency chính

* **`torch`** — core PyTorch.
* **`torchvision`** — model pretrained và transforms.
* **`gradio`** — framework giao diện.

---

### ✍️ Ghi file kèm phiên bản

```python
%%writefile demos/food_vision_mini/requirements.txt
torch==1.12.0
torchvision==0.13.0
gradio==3.1.4
```

Mình **ghim phiên bản** dù không bắt buộc. Lý do: nếu để trống, sau này các thư viện cập nhật có thể phá vỡ app đang chạy. Chỉ cần đúng combo phiên bản đã kiểm chứng là yên tâm.

Ba phiên bản này lấy từ chính môi trường đang chạy:

```python
import torch, torchvision, gradio
print(torch.__version__, torchvision.__version__, gradio.__version__)
```

`torch 1.12.0` đi với `torchvision 0.13.0` là cặp tương thích. `gradio 3.1.4` là bản mà demo đã chạy ổn — Gradio ra bản mới khá nhanh, nên ghim lại cho chắc.

---

### ✅ Checklist thư mục

```text
demos/food_vision_mini/
├── app.py              ✅
├── model.py            ✅
├── examples/           ✅
├── 09_pretrained_....pth  ✅
└── requirements.txt    ✅
```

Đủ cả rồi. Thư mục này có thể tải về và upload thẳng lên Hugging Face Spaces.

---

### 🔮 Nếu chạy trong tương lai

Nếu các bạn xem bài này sau này và thấy `torch` đã lên bản cao hơn nhiều, đừng lo nếu có breaking change — cứ thử, nếu lỗi thì báo lại để mình cập nhật. Còn trong phạm vi khóa, cứ bám đúng ba phiên bản trên.

---

Giờ chỉ còn thao tác đóng gói và upload. Các bạn có thể thử tải file lên Space bằng giao diện web hoặc dòng lệnh trước. Bài sau mình nén thư mục và tải từ Colab về máy.
