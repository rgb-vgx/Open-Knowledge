---
title: 'Viết custom Dataset class từ đầu để nạp ảnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 147
status: edited
source: '147 - Writing a PyTorch Custom Dataset Class from Scratch to Load Our Images.md'
categories:
- AI
tags: []
---

# 🛠️ Viết custom Dataset class từ đầu để nạp ảnh

> Nguồn: `147 - Writing a PyTorch Custom Dataset Class from Scratch to Load Our Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719910)

Đây là bài "nặng đô" nhất chương: mình viết class `ImageFolderCustom` kế thừa `torch.utils.data.Dataset` để tái tạo `ImageFolder`. Class sẽ có đủ `paths`, `transform`, `classes`, `class_to_idx`, một hàm `load_image`, cùng `__len__` và `__getitem__`. Mình cũng nhắc lại: nếu đã có hàm dựng sẵn thì nên dùng, vì nó được test kỹ; nhưng tự viết là cách hiểu bản chất.

### 🧬 Kế thừa `Dataset`

Trong tài liệu, `Dataset` mô tả một **map từ key sang data sample**. Mọi subclass **nên override `__getitem__`** (lấy một mẫu theo key/index) và **tùy chọn override `__len__`** (trả về kích thước dataset). Ta sẽ override cả hai vì muốn dùng với `DataLoader`.

Sáu bước:

1. Kế thừa `torch.utils.data.Dataset`.
2. Khởi tạo (`__init__`) nhận **target directory** và **transform** (mặc định `None`).
3. Tạo các attribute: `paths`, `transform`, `classes`, `class_to_idx`.
4. Viết hàm **`load_image`**.
5. Override **`__len__`**.
6. Override **`__getitem__`**.

### 🔥 Code đầy đủ

```python
import pathlib
import torch
from PIL import Image
from torch.utils.data import Dataset
from torchvision import transforms
from typing import Tuple, Dict, List


class ImageFolderCustom(Dataset):
    def __init__(self, targ_dir: str, transform=None) -> None:
        # Lấy tất cả đường dẫn ảnh
        self.paths = list(pathlib.Path(targ_dir).glob("*/*.jpg"))
        self.transform = transform
        # Lấy classes và class_to_idx từ helper function bài trước
        self.classes, self.class_to_idx = find_classes(targ_dir)

    def load_image(self, index: int) -> Image.Image:
        """Opens an image via a path and returns it."""
        image_path = self.paths[index]
        return Image.open(image_path)

    def __len__(self) -> int:
        """Returns the total number of samples."""
        return len(self.paths)

    def __getitem__(self, index: int) -> Tuple[torch.Tensor, int]:
        """Returns one sample of data, data and label (X, y)."""
        img = self.load_image(index)
        class_name = self.paths[index].parent.name  # expects: data_folder/class_name/image.jpg
        class_idx = self.class_to_idx[class_name]

        if self.transform:
            return self.transform(img), class_idx
        else:
            return img, class_idx
```

### 🔍 Giải thích từng phần

* **`glob("*/*.jpg")`** — lấy mọi ảnh: `*` đầu = `train`/`test`, `/`, `*` sau = lớp, `.jpg` = file. (Transcript nói `*/*.jpg` theo cấu trúc `train/pizza/xxx.jpg`.)
* **`find_classes(targ_dir)`** — tái dùng hàm bài trước, gán vào `self.classes` và `self.class_to_idx`.
* **`load_image`** — mở ảnh bằng `Image.open` từ `self.paths[index]`.
* **`__len__`** — trả về `len(self.paths)`, tức số mẫu.
* **`__getitem__`** — trả về tuple `(data, label)`:
  * `img` = ảnh đã nạp.
  * `class_name = self.paths[index].parent.name` — tên lớp lấy từ thư mục cha.
  * `class_idx = self.class_to_idx[class_name]` — nhãn số.
  * Nếu có `transform` thì trả `(self.transform(img), class_idx)`, ngược lại trả ảnh gốc kèm nhãn.

Chỗ `parent.name` giả định dữ liệu theo đúng chuẩn `data_folder/class_name/image.jpg` — nếu format khác, phải chỉnh.

### ⚖️ Cái giá của tự viết

Ưu điểm là tùy biến gần như vô hạn, nạp được nhiều loại dữ liệu. Nhược điểm là **nhiều code → dễ lỗi**. Vì vậy bài sau ta sẽ **test** class này, đối chiếu với `ImageFolder` gốc.

### ✅ Tạm kết

Class đã viết xong, giờ câu hỏi là nó có chạy đúng không. Bài sau mình tạo `train_data_custom`/`test_data_custom` từ class này và so sánh trực tiếp với dataset tạo bằng `ImageFolder`. Hẹn các bạn ở đó.
