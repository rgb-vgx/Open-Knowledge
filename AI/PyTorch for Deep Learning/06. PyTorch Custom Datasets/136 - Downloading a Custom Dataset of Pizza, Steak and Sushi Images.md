---
title: 'Tải custom dataset pizza, steak, sushi từ Food 101'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 136
status: edited
source: '136 - Downloading a Custom Dataset of Pizza, Steak and Sushi Images.md'
categories:
- AI
tags: []
---

# 🍣 Tải custom dataset pizza, steak, sushi

> Nguồn: `136 - Downloading a Custom Dataset of Pizza, Steak and Sushi Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708238)

Muốn làm custom dataset thì phải có dữ liệu. Bài này mình tải về bộ ảnh pizza, steak, sushi — một tập con của **Food 101** — từ GitHub, giải nén và kiểm tra. Các bạn sẽ thấy cả một lỗi "file is not a zip file" rất đáng học, cùng cách sửa chỉ bằng một chữ.

### 🍽️ Food 101 là gì?

Trong `torchvision.datasets` có sẵn dataset **Food 101**: gồm **101 lớp món ăn**, tổng cộng khoảng **101.000 ảnh**. Mỗi lớp có **250 ảnh test** (đã được review thủ công) và **750 ảnh train**. Đây là một dataset khá "nặng".

Ta hoàn toàn có thể làm luôn trên cả 101 lớp. Nhưng để thực hành, mình đã tạo một **tập con nhỏ hơn** và khuyên các bạn cũng làm vậy với bài toán của mình: **start small, upgrade when necessary**. Cụ thể mình giảm còn **3 lớp** và **10% số ảnh** — đủ để bắt đầu, nếu chạy tốt thì tự mở rộng lên.

---

### 📁 Cấu trúc bộ dữ liệu nhỏ

Tập con được tạo theo đúng kiểu **image classification**:

* Thư mục gốc `pizza_steak_sushi/`.
* Bên trong có `train/` với các lớp `pizza/`, `steak/`, `sushi/`.
* Và `test/` cũng chia theo `pizza/`, `steak/`, `sushi/`.

Notebook tạo dữ liệu nằm ở `extras/custom_data_creation` trong repo khóa học, các bạn có thể xem như extra curriculum.

---

### 🔥 Import và chuẩn bị đường dẫn

```python
import requests
import zipfile
from pathlib import Path

# Setup path to a data folder
data_path = Path("data/")
image_path = data_path / "pizza_steak_sushi"
```

Mình dùng `pathlib.Path` vì thích làm việc với path kiểu này hơn chuỗi thường. Logic tải: nếu thư mục `image_path` **đã tồn tại** thì bỏ qua, không tải lại; nếu **chưa** thì tạo mới:

```python
if image_path.is_dir():
    print(f"{image_path} directory exists.")
else:
    print(f"Did not find {image_path} directory, creating one...")
    image_path.mkdir(parents=True, exist_ok=True)
```

`mkdir(parents=True, exist_ok=True)` tạo luôn các thư mục cha nếu cần và không báo lỗi khi thư mục đã có.

---

### 📥 Tải bằng `requests`

Mình dùng `requests.get()` lấy file zip từ GitHub rồi ghi nội dung xuống đĩa:

```python
with open(data_path / "pizza_steak_sushi.zip", "wb") as f:
    request = requests.get("https://github.com/mrdbourke/pytorch-deep-learning/raw/main/data/pizza_steak_sushi.zip")
    print("Downloading pizza, steak, sushi data...")
    f.write(request.content)
```

Chỗ này tiện hơn tải file về máy rồi upload: code chạy lại nhiều lần vẫn được, và file đi thẳng vào Colab.

---

### 🧰 Giải nén và cú lỗi "not a zip file"

Ta dùng `zipfile` để giải nén:

```python
with zipfile.ZipFile(data_path / "pizza_steak_sushi.zip", "r") as zip_ref:
    print("Unzipping pizza, steak, sushi data...")
    zip_ref.extractall(image_path)
```

Chạy lần đầu, mình nhận ngay lỗi: **`File is not a zip file`**. Nhìn lại URL thì ra mình đã dùng link dạng `github.com/.../blob/...` thay vì link **raw**. Sửa `blob` thành `raw` là xong — code vốn đúng, chỉ là tải nhầm dữ liệu. Đây đúng kiểu lỗi các bạn sẽ gặp: **không ai viết code đúng ngay lần đầu**.

---

### ✅ Tạm kết

Sau khi sửa, ta có `train/` và `test/` cùng các thư mục `pizza`, `steak`, `sushi` chứa đầy ảnh JPEG. Vậy là đã có dữ liệu thật để "làm quen". Bài sau mình sẽ khám phá cấu trúc và đếm xem mỗi lớp có bao nhiêu ảnh.
