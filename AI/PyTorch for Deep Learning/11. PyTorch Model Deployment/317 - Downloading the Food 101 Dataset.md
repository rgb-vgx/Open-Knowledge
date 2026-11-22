---
title: 'Bài 317 — Tải bộ dữ liệu Food101'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 317
status: edited
source: '317 - Downloading the Food 101 Dataset.md'
categories:
- AI
tags: []
---

# 🍱 Tải Food101: 101.000 ảnh, 101 lớp

> Nguồn: `317 - Downloading the Food 101 Dataset.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34121070)

Chào các bạn. Bộ dữ liệu lớn nhất từ đầu khóa đang chờ. Mình dùng `torchvision.datasets.Food101` để tải cả train và test, nhớ tách đúng `split` vì đây là chỗ dễ vấp.

### 📥 Tải tập train

```python
from torchvision import datasets
from pathlib import Path

data_dir = Path("data")

train_data = datasets.Food101(
    root=data_dir,
    split="train",
    transform=food101_train_transforms,
    download=True,
)
```

Theo tài liệu torchvision, mỗi lớp có **750 ảnh train**, nhân với 101 lớp cho **75.750** ảnh. Transform ở đây là bản có augmentation vì đang là tập train.

### 📥 Tải tập test

```python
test_data = datasets.Food101(
    root=data_dir,
    split="test",
    transform=food101_test_transforms,
    download=True,
)
```

Mỗi lớp có **250 ảnh test**, tức **25.250** ảnh. Transform dùng bản gốc, **không augment** — vì test phải mô phỏng dữ liệu chưa từng thấy ngoài đời.

Tổng cộng: **75.750 + 25.250 = 101.000 ảnh**.

### ⏳ Thời gian tải

Với 101.000 ảnh, Colab báo giới hạn khoảng 5 phút cho request tải. Thực tế trên máy mình mất gần **6 phút** để tải, và cell chạy tổng cộng khoảng **7 phút** gồm cả giải nén. `Food101` tự tải file nén rồi giải nén sẵn, không phải làm tay.

### 🏷️ Lấy danh sách tên lớp

```python
food101_class_names = train_data.classes
food101_class_names[:10]
```

Kết quả:

```python
['apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio', 'beef_tartare',
 'beet_salad', 'beignets', 'bibimbap', 'bread_pudding', 'breakfast_burrito']
```

Trong đó `beignets` là bánh rán kiểu Pháp (bột chiên giòn) — mình phải tra mới biết. Danh sách này sẽ được lưu lại và dùng làm nhãn cho app sau.

### 🧪 Muốn luyện thêm?

`torchvision.datasets` còn nhiều bộ khác như Flowers102. Cách luyện tốt nhất là tải một dataset bất kỳ rồi chạy lại chuỗi thí nghiệm như trong khóa.

---

101.000 ảnh hơi nhiều để thí nghiệm nhanh. Bài sau mình tạo **subset 20%** bằng `random_split`, giữ nguyên tinh thần "start small".
