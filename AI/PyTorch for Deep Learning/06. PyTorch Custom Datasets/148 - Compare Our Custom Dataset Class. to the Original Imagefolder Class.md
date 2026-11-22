---
title: 'So sánh custom Dataset class với ImageFolder gốc'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 148
status: edited
source: '148 - Compare Our Custom Dataset Class. to the Original Imagefolder Class.md'
categories:
- AI
tags: []
---

# 🧪 So sánh custom Dataset class với `ImageFolder` gốc

> Nguồn: `148 - Compare Our Custom Dataset Class. to the Original Imagefolder Class.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719914)

Đã có `ImageFolderCustom` ở bài trước, giờ là lúc kiểm chứng: tạo transform, khởi tạo dataset từ class tự viết, rồi so sánh `len`, `classes`, `class_to_idx` với dataset tạo bằng `ImageFolder`. Nếu khớp, coi như ta đã tái tạo thành công phần chính của `ImageFolder`.

### 🔥 Tạo transform riêng cho train và test

```python
from torchvision import transforms

train_transforms = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ToTensor(),
])

test_transforms = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
])
```

Điểm cần chú ý: **test không có `RandomHorizontalFlip`**. Bình thường ta **không** data-augment tập test — chỉ chuyển sang tensor, không xoay/lật/đổi kích thước tùy tiện, để đánh giá khách quan.

---

### 🏗️ Khởi tạo dataset custom

```python
train_data_custom = ImageFolderCustom(targ_dir=train_dir, transform=train_transforms)
test_data_custom = ImageFolderCustom(targ_dir=test_dir, transform=test_transforms)
```

Lúc thử, mình gõ nhầm tên biến (`train transforms` thay vì `train_transforms`) — sửa lại là chạy. In `train_data_custom` ra thì thấy nó **không giàu thông tin** như `ImageFolder` (vì ta chưa viết `__repr__`), nhưng vẫn inspect được.

---

### 📏 So sánh độ dài

```python
len(train_data), len(train_data_custom)
len(test_data), len(test_data_custom)
```

Kết quả khớp nhau: custom dataset đếm đúng số mẫu như bản gốc. Vậy `__len__` hoạt động.

---

### 🏷️ Kiểm tra các attribute

```python
train_data_custom.classes
train_data_custom.class_to_idx
```

Kết quả cho đúng list `['pizza', 'steak', 'sushi']` và dict `{'pizza': 0, 'steak': 1, 'sushi': 2}`. Khi gõ `train_data_custom.` và bấm tab, Colab gợi ý các attribute `classes`, `class_to_idx`, `load_image`, `paths`, `transform` — đều đến từ code ta tự viết.

---

### ✅ So sánh trực tiếp bằng `==`

```python
print(train_data_custom.classes == train_data.classes)
print(test_data_custom.classes == test_data.classes)
# True
# True
```

Custom dataset cho kết quả **trùng khớp** với `ImageFolder` gốc. Các bạn có thể tự so sánh thêm những thuộc tính khác như một bài tập nhỏ.

---

### 💡 Bài học rút ra

Điều quan trọng không phải là tái tạo `ImageFolder`, mà là **pattern**: bất kể dữ liệu gì, chỉ cần kế thừa `Dataset`, override `__len__` và `__getitem__` trả về `(data, label)`, là các bạn tự dựng được hàm nạp dữ liệu cho PyTorch. Đây là chìa khóa để làm việc với custom dataset.

---

### ✅ Tạm kết

Đã chứng minh bằng phân tích là custom dataset tương đương bản gốc. Nhưng mình vẫn muốn **visualize** cho chắc — bài sau mình viết hàm hiển thị ảnh ngẫu nhiên từ `train_data_custom`. Hẹn các bạn ở đó.
