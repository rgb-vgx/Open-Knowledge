---
title: 'Biến hàm tiện ích lưu model thành script utils.py'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 178
status: edited
source: '178 - Turning Our Utility Function to Save a Model into a Python Script.md'
categories:
- AI
tags: []
---

# 🧰 Biến hàm tiện ích lưu model thành script utils.py

> Nguồn: `178 - Turning Our Utility Function to Save a Model into a Python Script.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32830510)

Chào các bạn! Video trước ta tạo `engine.py` — script lớn nhất từ đầu section. Nhìn lại lượng thời gian từng bỏ ra để viết vòng lặp train, giờ chỉ cần import là xong.

### 🤔 Vì sao không làm điều này từ đầu?

Câu hỏi hay: *Sao không lưu hết code train/test vào file ngay từ đầu?*

Hoàn toàn có thể. Nhưng mình cố tình đi chậm, vì **import hàm từ file là một chuyện, còn tự viết được code mới hiểu sâu**. Viết đi viết lại nhiều lần là cách luyện. Giờ đã đủ thực hành, ta mới "đóng gói".

### 📚 Nhìn cách PyTorch team tổ chức code

Mình mở tham khảo repo **torchvision references**. Trong `references/classification` có:

* `train.py`
* `transforms.py`
* `utils.py`

Mở `utils.py` ra: có các hàm tiện ích như `save_on_master` (lưu model weights), và **docstring theo style tương tự** ta đang luyện. Đây là minh chứng: **nguyên tắc là đem code hữu ích lưu vào file Python**.

Bản của ta là phiên bản đơn giản hóa, nhưng tinh thần y hệt.

### 📄 Tạo `utils.py`

Mình đặt tiểu mục **"Create a file called utils.py with utility functions"**. Trong Python, `utils` thường dành cho các hàm tiện ích. Hiện chỉ có một hàm `save_model`, nhưng sau này code lớn dần sẽ có thêm nhiều.

```python
%%writefile going_modular/utils.py
"""
Contains various utility functions for PyTorch model training.
"""
import torch

def save_model(model: torch.nn.Module, target_dir: str, model_name: str):
    ...
```

### ⚠️ Nhớ import `torch`

Lần đầu ghi file, Colab báo lỗi đỏ: thiếu `import torch`. Đây là lỗi rất phổ biến khi tách code ra script — **script phải tự import mọi thứ nó dùng**. Ta đã nhắc điều này ở video trước, và giờ gặp lại thực tế.

Thêm `import torch` rồi ghi đè lại, file sạch, không còn gạch đỏ.

### 🗂️ Script hiện có

Sau video này, thư mục `going_modular` có bốn file:

1. `data_setup.py`
2. `model_builder.py`
3. `engine.py`
4. `utils.py`

Chỉ còn thiếu `train.py` — file ghép tất cả lại và cho phép train từ một dòng lệnh.

### 💡 Một mẹo nhỏ

Bạn có thể tạo script bằng `%%writefile`, hoặc mở file trong Colab và **sửa trực tiếp bằng tay**. Cả hai đều ổn. Chỉ cần cẩn thận: mỗi lần chạy `%%writefile` là nó ghi đè toàn bộ file — nên đừng vô tình lưu đè lên `engine.py` chẳng hạn.

### ✅ Chốt lại

Bốn script đã sẵn sàng, mỗi cái một nhiệm vụ rõ ràng. Bài tập cuối cho video sau: thử tự biến phần code **train, evaluate và save model** thành `train.py`, sao cho chạy `python going_modular/train.py` là model được train. Hẹn gặp các bạn!
