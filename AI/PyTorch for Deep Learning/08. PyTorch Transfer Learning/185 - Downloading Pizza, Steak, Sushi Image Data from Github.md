---
title: 'Tải dữ liệu ảnh pizza, steak, sushi từ GitHub'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 185
status: edited
source: '185 - Downloading Pizza, Steak, Sushi Image Data from Github.md'
categories:
- AI
tags: []
---

# 🍕 Tải dữ liệu ảnh pizza, steak, sushi từ GitHub

> Nguồn: `185 - Downloading Pizza, Steak, Sushi Image Data from Github.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33006508)

Chào các bạn! Giờ ta lấy dữ liệu. Mình nhận ra lúc clone repo PyTorch deep learning ở video trước, ta đã xóa mất thư mục `data/` chứa file zip pizza/steak/sushi. Đáng lẽ có thể giữ lại, nhưng thôi — viết lại code tải dữ liệu cũng là dịp luyện tập.

### 🔗 Hai hướng tiếp cận

* Lấy **raw URL** của file zip rồi tải trực tiếp.
* Hoặc khi clone repo, **giữ luôn thư mục `data/`** thay vì xóa hết.

Đây cũng là hai bài tập mở rộng hay:

1. Viết hàm `download_data()` nhận URL và tự làm hết các bước.
2. Sửa đoạn clone để giữ lại cả `data/` lẫn `going_modular/`.

---

### 🧱 Setup đường dẫn

```python
import os
import requests
import zipfile
from pathlib import Path

data_path = Path("data/")
image_path = data_path / "pizza_steak_sushi"
```

Dữ liệu là **một tập con** các class của **Food 101**. Ta khởi đầu nhỏ — đó là lý do có "Food Vision Mini".

---

### 📥 Tải nếu chưa có

```python
if image_path.is_dir():
    print(f"{image_path} directory exists, skipping re-download.")
else:
    print(f"Did not find {image_path}, downloading it...")
    image_path.mkdir(parents=True, exist_ok=True)

    with open(data_path / "pizza_steak_sushi.zip", "wb") as f:
        request = requests.get("https://github.com/mrdbourke/pytorch-deep-learning/raw/main/data/pizza_steak_sushi.zip")
        print("Downloading pizza, steak, sushi data...")
        f.write(request.content)

    with zipfile.ZipFile(data_path / "pizza_steak_sushi.zip", "r") as zip_ref:
        print("Unzipping pizza, steak, sushi data...")
        zip_ref.extractall(image_path)

    os.remove(data_path / "pizza_steak_sushi.zip")
```

Giải thích các điểm:

* `image_path.is_dir()` — nếu thư mục đã tồn tại thì bỏ qua.
* `mkdir(parents=True, exist_ok=True)` — tạo cả thư mục cha nếu cần, và không lỗi nếu đã có.
* Mở file ở chế độ **`"wb"`** (write binary) vì ta ghi file nhị phân.
* `requests.get(url)` tải nội dung; `.content` là bytes; ghi vào file.
* Dùng **raw URL** của GitHub, không phải link trang web.
* `zipfile.ZipFile(..., "r")` mở file zip để đọc; `extractall(image_path)` giải nén.
* Xóa file `.zip` sau khi xong.

---

### 🖼️ Kiểm tra kết quả

Chạy cell:

```text
Did not find pizza_steak_sushi, downloading it...
Downloading pizza, steak, sushi data...
Unzipping pizza, steak, sushi data...
```

Mở `data/pizza_steak_sushi/` ta thấy ảnh pizza, steak, sushi — có cả một ảnh pizza trông không được ngon mắt lắm, nhưng vẫn là pizza. Làm việc với food vision đúng là thử thách vì... đói.

---

### 📁 Đường dẫn train/test

```python
train_dir = image_path / "train"
test_dir = image_path / "test"
```

In ra để chắc chắn đúng.

---

### ✅ Chốt lại

Dữ liệu đã về, đường dẫn train/test đã có. Bước tiếp theo — chắc các bạn đoán được — là biến thư mục ảnh thành dataloader. Nhưng lần này có một "mẹo" nhỏ liên quan tới pretrained model. Hẹn gặp ở video sau!
