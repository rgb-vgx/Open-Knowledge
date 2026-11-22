---
title: 'Phác thảo Python script đầu tiên để chuẩn bị dữ liệu'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 174
status: edited
source: '174 - Writing the Outline for Our First Python Script to Setup the Data.md'
categories:
- AI
tags: []
---

# 📝 Phác thảo Python script đầu tiên để chuẩn bị dữ liệu

> Nguồn: `174 - Writing the Outline for Our First Python Script to Setup the Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32810580)

Chào các bạn! Video trước ta chạy cell lấy dữ liệu. Giờ mình tiếp tục tiến về phía **part 2** của notebook — tức là từ cell mode chuyển sang script mode.

### 🧪 Chạy thử phần tạo dataset và dataloader

Ta đang ở mục "create datasets and dataloaders" của notebook. Dữ liệu đang ở standard image classification format. Ở section 04 ta đã học dùng `torchvision.datasets` và `transforms` để load dữ liệu thành dataset, rồi biến dataset thành dataloader.

Nhưng code đó viết nhiều lần rồi — **sao không biến nó thành hàm hoặc một Python script để tái dùng?**

Chạy các cell với `Shift + Enter`:

* Lấy ra **class names**.
* Lấy **class dictionary** nếu muốn.
* Kiểm tra độ dài dataset.
* Biến train/test dataset thành dataloader.
* Kiểm tra một ảnh đơn: size và shape.

---

### 📄 Tạo file script bằng Jupyter magic

Đây chỉ là **một cách** tạo script — bạn hoàn toàn có thể copy code vào file `.py` bằng tay. Nhưng mình dùng magic command của Jupyter là `writefile`.

Trước hết, vì sao Jupyter mà không phải Colab? Vì **Colab chạy một phiên bản Jupyter bên dưới**. Notebook vẫn được lưu dạng `.ipynb`.

Phân biệt hai loại magic:

* Một dấu `%` — **line magic**, tác dụng trên một dòng.
* Hai dấu `%%` — **cell magic**, tác dụng trên cả cell.

Ta cần `%%writefile`: ghi nội dung cell ra file. Cú pháp: `%%writefile` rồi tới tên file.

---

### 🛠️ Bắt đầu viết `data_setup.py`

Mình tạo file trong thư mục `going_modular`:

```python
%%writefile going_modular/data_setup.py
"""
Contains functionality for creating PyTorch DataLoaders for
image classification data.
"""
import os

from torchvision import datasets, transforms
from torch.utils.data import DataLoader

NUM_WORKERS = os.cpu_count()

def create_dataloaders(
    train_dir: str,
    test_dir: str,
    transform: transforms.Compose,
    batch_size: int,
    num_workers: int = NUM_WORKERS,
):
    ...
```

Mấy điểm cần chú ý:

* Ở đầu file đặt **docstring** mô tả file làm gì — người dùng đọc là biết ngay.
* Script cần **import đủ module** mà code bên trong dùng: `datasets`, `transforms`, `DataLoader`, `os`.
* `NUM_WORKERS = os.cpu_count()` — số worker bằng số CPU có được.

---

### ✍️ Viết docstring theo Google style

Docstring của hàm nên có:

1. Một dòng mô tả ngắn hàm làm gì.
2. Mô tả dài hơn nếu cần.
3. **Args** — từng tham số và ý nghĩa (`train_dir`, `test_dir`, `transform`, `batch_size`, `num_workers`).
4. **Returns** — trả về gì (ở đây là tuple: train dataloader, test dataloader, class names).
5. **Example** — ví dụ sử dụng.

Mình dành thời gian viết kỹ docstring cho file đầu tiên để các bạn thấy nó trông thế nào. Với hàm bạn làm tiếp theo, hãy thử tự viết.

Vì sao phải viết docstring? Không chỉ để chia sẻ code cho người khác, mà còn **cho chính bạn vài tháng sau** — mở code cũ ra mà không hiểu gì thì rất mệt.

> Lưu ý: dòng mô tả dài quá 79 ký tự thì nên xuống dòng cho đúng chuẩn Python.

---

### ❗ Lỗi thư mục chưa tồn tại

Khi chạy `%%writefile` lần đầu, có thể gặp lỗi kiểu *No such file or directory: going_modular* — vì thư mục chưa có. Cách xử lý:

```python
import os
os.makedirs("going_modular", exist_ok=True)
```

Tạo xong thư mục rỗng, chạy lại là ghi file được.

---

### ✅ Chốt lại

Ta đã có khung `data_setup.py` với docstring chuẩn Google style. Bài tập cho các bạn: **tự viết phần thân hàm** — load `train_data` và `test_data` bằng `datasets.ImageFolder`, lấy class names, tạo hai dataloader, rồi trả về cả ba thứ. Sang video sau chúng ta làm cùng nhau.
