---
title: 'Bài 307 — Tạo thư mục examples và ảnh mẫu cho demo'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 307
status: edited
source: '307 - Creating an Examples Directory with Example Food Vision Mini Images.md'
categories:
- AI
tags: []
---

# 🍕 Copy ảnh mẫu vào thư mục `examples`

> Nguồn: `307 - Creating an Examples Directory with Example Food Vision Mini Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34096544)

Chào các bạn. Một demo mà không có ví dụ thì khó gọi là demo. Bài này mình tạo thư mục `examples/` và copy ba ảnh pizza, steak, sushi từ test set vào đó.

### 📁 Tạo thư mục examples

```python
import shutil
import os
from pathlib import Path

food_vision_mini_examples_path = food_vision_mini_demo_path / "examples"
food_vision_mini_examples_path.mkdir(parents=True, exist_ok=True)
```

`parents=True` để tạo luôn thư mục cha nếu thiếu, `exist_ok=True` để không lỗi khi thư mục đã có. Sau bước này, dưới `demos/food_vision_mini/` có thêm một thư mục `examples` rỗng.

### 🖼️ Chọn ba ảnh đại diện

Mình muốn mỗi lớp một ảnh: pizza, steak, sushi. Có thể random, nhưng mình chọn tay ba ảnh trông bắt mắt hơn:

```python
random_test_dataset_image_paths = [
    Path("data/pizza_steak_sushi_20_percent/test/sushi/2537151.jpg"),
    Path("data/pizza_steak_sushi_20_percent/test/pizza/1160965.jpg"),
    Path("data/pizza_steak_sushi_20_percent/test/steak/2748844.jpg"),
]
```

Tên biến là "random" cho vui thôi, thực tế mình chọn sẵn để hình demo đẹp.

### 📄 Copy bằng `shutil.copy2`

Mình **copy** chứ không **move**, vì vẫn muốn giữ ảnh trong test set:

```python
for example in random_test_dataset_image_paths:
    destination_file = food_vision_mini_examples_path / example.name
    print(f"[INFO] Copying {example} to {destination_file}")
    shutil.copy2(src=example, dst=destination_file)
```

Vì sao `copy2` thay vì `copy`? Theo tài liệu Python, `copy2` giống `copy` nhưng **cố gắng giữ nguyên metadata** của file (thời gian sửa, quyền...). Không thực sự quan trọng ở đây, nhưng mình dùng cho chắc.

`example.name` lấy phần tên file cuối cùng của path — tiện để đặt tên đích. Kết quả: trong `examples/` có đúng ba ảnh, mỗi lớp một ảnh.

### 🔁 Định dạng "list of lists" cho Gradio

Gradio cần examples dạng **list of lists**. Vì `app.py` sẽ nằm cùng cấp với `examples/`, đường dẫn phải bắt đầu bằng `"examples/"`:

```python
example_list = [
    ["examples/" + example] for example in os.listdir(food_vision_mini_examples_path)
]
```

`os.listdir` trả về tên các file trong thư mục, mình ghép tiền tố `"examples/"` để API đọc được khi chạy trong thư mục app. Kết quả cuối cùng:

```python
[['examples/2537151.jpg'], ['examples/1160965.jpg'], ['examples/2748844.jpg']]
```

Đúng cấu trúc Gradio mong đợi. Một ô nữa trong sơ đồ file đã được tick.

---

Còn thiếu model `.pth`. Các bạn thử tự move file model vào thư mục demo nhé — bằng lệnh `mv` cũng được. Bài sau mình làm bằng code Python.
