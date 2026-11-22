---
title: 'Làm quen dữ liệu (phần 1): khám phá cấu trúc thư mục ảnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 137
status: edited
source: '137 - Becoming One With the Data (Part 1)- Exploring the Data Format.md'
categories:
- AI
tags: []
---

# 🔍 Làm quen dữ liệu (phần 1): khám phá cấu trúc thư mục

> Nguồn: `137 - Becoming One With the Data (Part 1)- Exploring the Data Format.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708246)

Ta đã có dữ liệu trong tay, giờ là lúc "become one with the data" — cách mình hay gọi vui cho việc chuẩn bị và khám phá dữ liệu. Bài này mình đi qua từng thư mục bằng `os.walk`, đếm số ảnh mỗi lớp, và giải thích chuẩn **image classification format** mà các thư viện như `torchvision` dựa vào.

### 💬 "Nếu có 8 tiếng..." — câu quote nổi tiếng

Mình rất thích một câu (mà mình tự chế, gán cho nhân vật "Abraham Loss-function" — nghe như dân machine learning thứ thiệt):

> If I had 8 hours to build a machine learning model, I'd spend the first 6 hours preparing my dataset.

Ý nói: chuẩn bị dữ liệu chiếm phần lớn thời gian, và đó chính là việc ta sắp làm. (Mình thừa nhận luôn: "Abraham Loss-function" không có thật, câu đó do mình bịa.)

---

### 🗂️ Dữ liệu đến từ đâu?

Bộ ảnh này lấy từ **Food 101** (có sẵn trong `torchvision.datasets`), rồi mình chia nhỏ từ 101 lớp xuống **3 lớp** cho một thí nghiệm nhỏ. Cấu trúc sau khi giải nén:

```text
data/pizza_steak_sushi/
├── test/
│   ├── pizza/
│   ├── steak/
│   └── sushi/
└── train/
    ├── pizza/
    ├── steak/
    └── sushi/
```

Đây là **standard image classification format**: thư mục cha chứa `train`/`test` (có thể thêm `validation`), và **tên thư mục con chính là tên lớp**.

---

### 🚶 Khám phá bằng `os.walk`

Mình viết một helper để đi qua cây thư mục và in ra thông tin. Theo docstring, `os.walk` là **directory tree generator**: với mỗi thư mục trong cây (kể cả gốc, bỏ `.` và `..`), nó trả về một **three-tuple** `(dirpath, dirnames, filenames)`.

```python
import os

def walk_through_dir(dir_path):
    """Walks through dir_path returning its contents."""
    for dirpath, dirnames, filenames in os.walk(dir_path):
        print(f"There are {len(dirnames)} directories and {len(filenames)} images in '{dirpath}'.")

walk_through_dir(image_path)
```

Kết quả cho thấy: thư mục gốc có **2 thư mục** (`train`, `test`) và **0 ảnh**; mỗi thư mục `test`/`train` có **3 thư mục** (pizza, steak, sushi); và mỗi thư mục lớp chứa các ảnh JPEG.

---

### 🔢 Đếm số ảnh mỗi lớp

Từ kết quả, mình đọc ra được phân bố:

* **Test**: lớp steak có **19 ảnh**; trung bình khoảng **25 ảnh/lớp**.
* **Train**: **75 ảnh steak**, **72 ảnh sushi**, **78 ảnh pizza** — khoảng **75 ảnh/lớp**.

Các con số không đều tuyệt đối nhưng xấp xỉ nhau. Đây là **10% của 3 lớp** được chọn ngẫu nhiên từ Food 101.

---

### 📐 Chuẩn image classification đến từ đâu?

Mình đặt hai đường dẫn train/test:

```python
train_dir = image_path / "train"
test_dir = image_path / "test"
```

Chuẩn này bắt nguồn từ `torchvision.datasets.ImageFolder` — một **generic data loader** mặc định sắp xếp ảnh theo kiểu: thư mục gốc → thư mục lớp → ảnh. Ví dụ phân loại chó/mèo thì có `root/dog/...` và `root/cat/...`. Ta chỉ khác ở chỗ dùng ảnh món ăn và 3 lớp pizza/steak/sushi. Nếu muốn dùng cả Food 101 thì sẽ có **101 thư mục** — hoàn toàn làm được, nhưng ta cứ giữ nhỏ trước.

---

### ✅ Tạm kết

Vậy là đã hiểu cấu trúc dữ liệu và biết mỗi lớp có bao nhiêu ảnh. Bước khám phá tiếp theo là **visualize** — nhìn tận mắt xem ảnh trông thế nào. Nhưng không phải click từng file, mà viết code để chọn ảnh ngẫu nhiên. Hẹn các bạn ở bài sau.
