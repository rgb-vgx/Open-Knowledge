---
title: 'Viết hàm tải dữ liệu pizza, steak, sushi'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 202
status: edited
source: '202 - Creating a Function to Download Data.md'
categories:
- AI
tags: []
---

# 📥 Viết hàm tải dữ liệu pizza, steak, sushi

> Nguồn: `202 - Creating a Function to Download Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33081394)

Ta đã có set seed, device-agnostic code và code going modular. Bước quan trọng tiếp theo sau setup là **lấy dữ liệu** — ảnh pizza, steak, sushi để chạy thí nghiệm cho Food Vision Mini. Mình đã giao thử thách biến phần tải dữ liệu thành helper function từ bài transfer learning, và mình cũng tự làm thử để "practice what I preach". Cùng xem nhé.

### 🧰 Ý tưởng về hàm `download_data`

Ta muốn một hàm nhận vào **nguồn** (ví dụ link GitHub), một **đích** (nơi lưu), và có tùy chọn xóa file nguồn sau khi tải. Mình dùng `zipfile` và `pathlib`:

```python
import zipfile
from pathlib import Path
import requests
import os

def download_data(source: str,
                  destination: str,
                  remove_source: bool = True) -> Path:
    """Downloads a zipped dataset from source and unzips to destination."""
    ...
```

Docstring cho gọn: *Downloads a zipped dataset from source and unzips to destination.*

---

### 📁 Tạo thư mục đích nếu chưa có

Đầu tiên dựng đường dẫn tới thư mục data và thư mục ảnh:

```python
data_path = Path("data/")
image_path = data_path / destination

if image_path.is_dir():
    print(f"[INFO] {image_path} directory already exists, skipping download.")
else:
    print(f"[INFO] Did not find {image_path} directory, creating one...")
    image_path.mkdir(parents=True, exist_ok=True)
```

Nếu thư mục đã tồn tại thì bỏ qua; nếu chưa thì tạo, kèm `parents=True` để tạo luôn thư mục cha và `exist_ok=True` cho an toàn.

---

### ⬇️ Tải file zip về

Từ chuỗi `source`, ta chuyển thành `Path` rồi lấy tên file (`target_file`). Sau đó mở file để ghi nhị phân (`"wb"`) và dùng `requests.get` tải nội dung:

```python
target_file = Path(source).name

with open(data_path / target_file, "wb") as f:
    request = requests.get(source)
    print(f"[INFO] Downloading {target_file} from {source}...")
    f.write(request.content)
```

Lưu ý: dùng link **raw** từ GitHub thì mới tải đúng file.

---

### 🗜️ Giải nén và dọn file nguồn

Mở file zip để đọc (`"r"`) rồi giải nén hết vào `image_path`, cuối cùng xóa file zip nếu `remove_source=True`:

```python
with zipfile.ZipFile(data_path / target_file, "r") as zip_ref:
    print(f"[INFO] Unzipping {target_file} data...")
    zip_ref.extractall(image_path)

if remove_source:
    os.remove(data_path / target_file)

return image_path
```

---

### 🧪 Chạy thử và... gặp lỗi

Gọi hàm với link 10% pizza/steak/sushi:

```python
image_path = download_data(
    source="https://github.com/mrdbourke/pytorch-deep-learning/raw/main/data/pizza_steak_sushi.zip",
    destination="pizza_steak_sushi")
```

Lần đầu chạy, mình gõ nhầm ba chữ "L" trong `[INFO]` nên không khớp điều kiện. Sửa xong thì nó nhảy vào nhánh "skipping download" vì thư mục đã tồn tại nhưng **rỗng**. Đây là điểm yếu thật sự của hàm: nếu thư mục đích rỗng, nó vẫn không tải lại. Mình xóa sạch trong `data/` rồi chạy lại — lần này tải và giải nén đúng, cuối cùng có `data/pizza_steak_sushi/` và ảnh pizza bên trong.

> **Bài tập nhỏ:** cải tiến hàm để kiểm tra thư mục đích có **rỗng** hay không, nếu rỗng thì vẫn tải lại. Bạn làm được thì báo mình biết nhé.

---

### ✅ Tạm kết và thử thách

Ta đã có dữ liệu và hàm `download_data` dùng lại được về sau. Thử thách tiếp theo: biến ảnh vừa tải thành **PyTorch DataLoader** — chọn kiểu manual hoặc automatic đều được. Bài sau mình sẽ làm cùng các bạn.
