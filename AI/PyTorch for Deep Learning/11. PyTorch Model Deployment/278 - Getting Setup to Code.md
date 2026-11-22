---
title: 'Bài 278 — Cài đặt môi trường và import code cũ để deploy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 278
status: edited
source: '278 - Getting Setup to Code.md'
categories:
- AI
tags: []
---

# 🛠️ Getting setup: chuẩn bị Colab và tái sử dụng code cũ

> Nguồn: `278 - Getting Setup to Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055220)

Lý thuyết đủ rồi, giờ mở Google Colab lên. Bước đầu tiên luôn giống nhau: dựng môi trường, lấy lại các script đã viết, và bật **device-agnostic code**. Bài này ngắn gọn nhưng là nền cho mọi thứ phía sau.

### 📓 Mở notebook

Mở notebook mới trên Colab. Bộ materials của section nằm ở **learnpytorch.io** phần số 9 — *PyTorch model deployment*. Mình tạo heading `PyTorch model deployment` và đánh dấu `_video` để biết notebook nào thuộc phần video.

Nhắc lại định nghĩa cho chắc: **model deployment** là làm cho model của bạn **available cho một người (someone)** hoặc **một chương trình (something else)**.

Nếu có thắc mắc, dùng tab **Discussions** → **New Discussion**. Materials còn có cả slide cho section này.

### ⚙️ Đặt runtime và kiểm tra phiên bản

Chuyển runtime sang **CPU** cho phần giới thiệu cho nhanh. Đoạn setup dùng `try`/`except` để đảm bảo có tối thiểu **torch 1.12** và **torchvision 0.13**; nếu thiếu thì cài. Google Colab vốn đã có sẵn đúng hai phiên bản này nên thường không cần cài thêm.

### 📦 Clone repo để lấy script "going modular"

Một trong những điểm mạnh của khóa là tái sử dụng code. Cell tiếp theo **clone GitHub repo** để lấy các script đã tạo ở section *going modular*:

* **`data_setup.py`** — logic load data.
* **`engine.py`** — training loop và testing loop.
* **`utils.py`** — hàm tiện ích.
* cùng nhiều thứ khác.

Thay vì viết lại từ đầu mỗi lần, ta gọi lại các script này. Đây là thực hành chung của software engineering, không riêng machine learning: **turn most useful notebook cells into reusable Python scripts**.

Kiểm tra thư mục bằng `ls going_modular` — nếu vào nhầm chỗ thì lùi lại một cấp cho tới khi thấy các file `.py`.

### 🖥️ Device-agnostic code

Bước quen thuộc: kiểm tra có GPU không, nếu có thì gán `device = "cuda"`, ngược lại dùng `"cpu"`. Đoạn này đã làm nhiều lần nên mình không nhắc lại chi tiết.

```python
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
```

---

Phần còn lại là **get data** — lấy bộ **pizza, steak, sushi** (20% mẫu ngẫu nhiên từ Food101). Mình để các bạn tự thử cell đó trước, rồi bài sau cùng chuẩn bị dataset cho Food Vision Mini.
