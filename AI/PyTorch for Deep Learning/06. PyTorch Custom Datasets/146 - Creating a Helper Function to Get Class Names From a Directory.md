---
title: 'Viết helper function lấy class names từ thư mục'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 146
status: edited
source: '146 - Creating a Helper Function to Get Class Names From a Directory.md'
categories:
- AI
tags: []
---

# 🏷️ Viết helper function lấy class names từ thư mục

> Nguồn: `146 - Creating a Helper Function to Get Class Names From a Directory.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719908)

Bước đầu tiên để tự dựng custom dataset là một helper function nhận vào đường dẫn thư mục và trả về **class names dạng list** cùng **dict tên → index** — tái tạo đúng chức năng `.classes` và `.class_to_idx` của `ImageFolder`. Hàm này dùng `os.scandir` để quét thư mục.

### 📋 Ba việc cần làm

1. **Quét thư mục** bằng `os.scandir` để lấy tên các lớp — dữ liệu phải đang ở chuẩn **image classification format** (giống `ImageFolder` yêu cầu).
2. **Báo lỗi** nếu không tìm thấy class name — dấu hiệu cấu trúc thư mục có vấn đề.
3. **Trả về** class names dưới dạng **list** và **dict**.

---

### 🔍 Thử `os.scandir` trước

```python
target_directory = train_dir  # ví dụ dùng thư mục train

class_names_found = sorted(
    [entry.name for entry in list(os.scandir(target_directory))]
)
print(class_names_found)
# ['pizza', 'steak', 'sushi']
```

Mình lưu ý một lỗi nhỏ lúc thử: ban đầu định dùng `os.scandir(image_path / target_directory)` nhưng thừa `image_path` — chỉ cần truyền đúng `target_directory` là đủ. Kết quả quét thư mục train ra ba entry: `pizza`, `sushi`, `steak`.

---

### 🔥 Đóng gói thành hàm `find_classes`

```python
import os
from typing import Tuple, List, Dict

def find_classes(directory: str) -> Tuple[List[str], Dict[str, int]]:
    """Finds the class folder names in a target directory."""
    # 1. Get the class names by scanning the target directory
    classes = sorted(entry.name for entry in os.scandir(directory) if entry.is_dir())

    # 2. Raise an error if class names could not be found
    if not classes:
        raise FileNotFoundError(f"Couldn't find any classes in {directory}... please check file structure.")

    # 3. Create a dictionary of index labels
    class_to_idx = {class_name: i for i, class_name in enumerate(classes)}
    return classes, class_to_idx
```

Điểm đáng chú ý:

* **`if entry.is_dir()`** — chỉ lấy các **thư mục** (bỏ qua file lẻ).
* **`sorted(...)`** — đảm bảo thứ tự class names ổn định, để index không xáo trộn giữa các lần chạy.
* **`FileNotFoundError`** — nếu `classes` rỗng, báo lỗi kèm gợi ý "kiểm tra cấu trúc file".
* **Dict comprehension với `enumerate`** — biến list thành dict. Máy tính thích **số** hơn **chuỗi** làm nhãn, nên bước này cần thiết.

---

### ✅ Kết quả

```python
find_classes(target_directory)
# (['pizza', 'steak', 'sushi'], {'pizza': 0, 'steak': 1, 'sushi': 2})
```

Vậy là đã tái tạo được cả `.classes` lẫn `.class_to_idx` của `ImageFolder`. Hàm `find_classes` sẽ được dùng ngay trong custom dataset class ở bài sau. Hẹn các bạn ở đó.
