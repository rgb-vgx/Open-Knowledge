---
title: 'Tự viết custom Dataset class: tổng quan trước khi code'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 145
status: edited
source: '145 - Creating a Custom Dataset Class in PyTorch High Level Overview.md'
categories:
- AI
tags: []
---

# 🧱 Tự viết custom Dataset class: tổng quan trước khi code

> Nguồn: `145 - Creating a Custom Dataset Class in PyTorch High Level Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719904)

`ImageFolder` có sẵn thì tiện, nhưng nếu một ngày các bạn gặp dataset mà không có hàm dựng sẵn phù hợp thì sao? Bài này mình giả vờ `ImageFolder` không tồn tại và tự viết một class nạp dữ liệu tương đương. Trước khi code, ta cùng nhìn bức tranh lớn: mục tiêu, các class nền, và ưu/nhược điểm của việc tự viết.

### 🎯 Ba mục tiêu của class custom

Ta muốn class của mình làm được:

1. **Nạp ảnh từ file** → tensor.
2. **Lấy class names** dưới dạng list.
3. **Lấy class names** dưới dạng dict (ánh xạ tên → chỉ số).

Đủ ba thứ đó thì class dùng được với `DataLoader` y như `ImageFolder` — vốn cũng cung cấp `.classes` và `.class_to_idx`.

### 🧬 Class nền: `torch.utils.data.Dataset`

Tầng gốc của mọi thứ là **`torch.utils.data.Dataset`** — một **abstract class** đại diện cho dataset, và nhiều dataset dựng sẵn của PyTorch đều kế thừa nó. Docstring của nó nói rõ:

* Mọi subclass **nên override `__getitem__`**.
* **Tùy chọn override `__len__`**.

Đây chính là hai phương thức mà custom dataset của ta sẽ cài đặt ở các bài sau.

### 📦 Import những gì cần

```python
import os
import pathlib
import torch
from PIL import Image
from torch.utils.data import Dataset
from torchvision import transforms
from typing import Tuple, Dict, List
```

* `os`, `pathlib` — làm việc với file hệ thống và đường dẫn.
* `Image` từ `PIL` — mở ảnh.
* `Dataset` — class nền để kế thừa.
* `transforms` — biến ảnh thành tensor.
* `Tuple`, `Dict`, `List` từ `typing` — viết type hints khi định nghĩa class/hàm.

### ⚖️ Ưu và nhược của custom dataset

**Ưu điểm:**

* Có thể tạo dataset từ **gần như bất cứ thứ gì**, miễn viết đúng code nạp vào.
* Không bị giới hạn ở các hàm dựng sẵn của PyTorch.

**Nhược điểm:**

* "Làm được" không có nghĩa là "tự động chạy đúng" — phải kiểm chứng kỹ bằng test và bằng việc xem model có học được không.
* Viết nhiều code hơn → dễ phát sinh lỗi hoặc vấn đề performance.

Mình nhấn mạnh: thứ gì đã nằm trong thư viện chuẩn/domain library của PyTorch thì thường đã được test **rất nhiều lần** và đáng tin hơn code tự viết. Nhưng hiểu cách tự dựng vẫn rất quan trọng.

### 🗺️ Kế hoạch cho các bài tiếp theo

Ta sẽ dựng custom dataset theo từng bước:

* Một **helper function** nhận vào đường dẫn thư mục (như `pizza_steak_sushi`) và trả về **class names dạng list** cùng **dict tên → index**.
* Một **custom `Dataset` subclass** cài `__getitem__`/`__len__`, dùng helper trên, để nạp ảnh từ file thành tensor.
* Ghép với `DataLoader` y như với `ImageFolder`.

### ✅ Tạm kết

Đây mới là phần "setting the scene" — chưa code. Bài sau mình bắt tay viết helper function lấy class names từ thư mục đích. Hẹn các bạn ở bài sau.
