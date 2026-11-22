---
title: 'Nạp toàn bộ ảnh thành tensor bằng ImageFolder'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 142
status: edited
source: '142 - Loading All of Our Images and Turning Them Into Tensors With ImageFold.md'
categories:
- AI
tags: []
---

# 📦 Nạp toàn bộ ảnh thành tensor bằng `ImageFolder`

> Nguồn: `142 - Loading All of Our Images and Turning Them Into Tensors With ImageFold.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32711924)

Đến đây ta đã có dữ liệu và đã có transform biến ảnh thành tensor. Giờ là lúc nạp **toàn bộ** ảnh bằng một hàm dựng sẵn: `torchvision.datasets.ImageFolder`. Đây là "option 1" cho việc load dữ liệu; còn "option 2" — tự viết custom dataset class — sẽ để bài sau.

### 🗂️ Vì sao dùng `ImageFolder`?

Mỗi domain library đều có module `datasets` với hàm nạp dữ liệu. Với dữ liệu đã ở chuẩn **image classification format** (thư mục gốc → thư mục lớp → ảnh), ta dùng `ImageFolder` cho nhanh. Sau này sẽ thấy cách tự dựng một data loader riêng.

```python
from torchvision import datasets

train_data = datasets.ImageFolder(root=train_dir, transform=data_transform)
test_data = datasets.ImageFolder(root=test_dir, transform=data_transform)
```

---

### 🎛️ `transform` và `target_transform`

`ImageFolder` có hai tham số transform:

* **`transform`** — áp lên **ảnh** (dữ liệu). Ta truyền `data_transform` vào: resize 64×64, lật ngang ngẫu nhiên, rồi `ToTensor()`.
* **`target_transform`** — áp lên **nhãn**. Ta để `None` vì nhãn được **suy ra từ tên thư mục** (pizza, steak, sushi), không cần biến đổi gì.

Nếu dataset của các bạn **không** ở chuẩn này, có thể phải dùng data loader khác; nhiều loader vẫn có tham số transform cho dữ liệu.

---

### 📊 Kiểm tra dataset sau khi nạp

```python
print(train_data)
print(test_data)
```

Kết quả cho thấy `train_data` có **225 mẫu** (khoảng 75 ảnh/lớp), `test_data` ít hơn, cả hai đều là `ImageFolder`, kèm `root` và `transform`. Đúng như dự đoán từ lúc khám phá dữ liệu.

---

### 🏷️ Lấy tên lớp và mapping index

Một lợi ích của data loader dựng sẵn là có sẵn nhiều thuộc tính hữu ích:

```python
class_names = train_data.classes
# ['pizza', 'steak', 'sushi']

class_dict = train_data.class_to_idx
# {'pizza': 0, 'steak': 1, 'sushi': 2}
```

* **`classes`** — danh sách tên lớp, rất tiện khi vẽ ảnh kèm nhãn hoặc khi dự đoán.
* **`class_to_idx`** — map tên lớp sang chỉ số nguyên. Đây chính là chỗ `target_transform` sẽ phát huy tác dụng nếu muốn đổi nhãn.

---

### 🔢 Độ dài và các thuộc tính khác

```python
len(train_data)   # số mẫu
len(test_data)
```

Ngoài ra còn các thuộc tính như `samples` (toàn bộ đường dẫn + nhãn), `targets` (chỉ nhãn), `imgs`, `loader`. Xem `train_data.samples` sẽ thấy từng cặp `(đường_dẫn_ảnh, nhãn)`; `train_data.targets` cho danh sách nhãn **theo thứ tự** (`0, 0, ... 1, 1, ... 2, 2, ...`). Phần tử đầu tiên là một ảnh pizza với nhãn `0`.

---

### ✅ Tạm kết

Vậy là đã dùng `ImageFolder` biến toàn bộ ảnh thành tensor, sẵn sàng cho model. Bước tiếp theo vẫn là visualize — xem một mẫu và nhãn lấy ra từ `train_data` trông thế nào. Hẹn các bạn ở bài sau.
