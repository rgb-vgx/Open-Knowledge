---
title: 'Làm quen dữ liệu (phần 2): visualize ảnh ngẫu nhiên bằng PIL'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 138
status: edited
source: '138 - Becoming One With the Data (Part 2)- Visualizing a Random Image.md'
categories:
- AI
tags: []
---

# 🖼️ Làm quen dữ liệu (phần 2): visualize ảnh ngẫu nhiên

> Nguồn: `138 - Becoming One With the Data (Part 2)- Visualizing a Random Image.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708248)

Bài trước ta biết mỗi lớp train có khoảng 75 ảnh, test khoảng 25 ảnh, và đã nắm cấu trúc thư mục chuẩn. Giờ mình viết code chọn **một ảnh ngẫu nhiên**, đọc metadata và mở nó bằng **PIL (Pillow)**. Mình cũng dành cho các bạn một thử thách nhỏ ở cuối bài: làm lại bằng Matplotlib.

### 🎲 5 bước visualize một ảnh

Mình phác ra kế hoạch trước khi code:

1. Lấy **tất cả** đường dẫn ảnh (dùng `pathlib`).
2. Chọn ngẫu nhiên một đường dẫn (`random.choice`).
3. Lấy **tên lớp** — chính là tên thư mục chứa ảnh.
4. Mở ảnh bằng **PIL**.
5. Lấy metadata rồi hiển thị ảnh.

---

### 🔥 Import và cố định seed

```python
import random
from PIL import Image

random.seed(42)
```

"Máy học là chuyện khai thác sức mạnh của randomness" — và mình cũng thích dùng randomness để khám phá dữ liệu. Đặt `random.seed(42)` để hai bên ra **cùng một ảnh**; không đặt thì mỗi lần chạy ra một ảnh khác.

---

### 📋 Lấy toàn bộ đường dẫn ảnh

```python
image_path_list = list(image_path.glob("*/*/*.jpg"))
```

`glob` ghép các path khớp pattern lại với nhau. Pattern `*/*/*.jpg` đọc là:

* `*` đầu tiên = `train` hoặc `test`.
* `*` thứ hai = `pizza`, `steak`, `sushi`.
* `*` cuối = tên file bất kỳ trước `.jpg`.

Kết quả là danh sách **mọi ảnh** nằm trong `pizza_steak_sushi`. (Transcript gốc viết là `*.JPG`; trên Linux tên file là chữ thường `.jpg`.)

---

### 🎯 Chọn ảnh ngẫu nhiên và lấy nhãn

```python
random_image_path = random.choice(image_path_list)
print(random_image_path)

image_class = random_image_path.parent.stem
print(image_class)
```

`parent` lấy thư mục cha của ảnh, `.stem` lấy phần cuối của path đó — chính là **tên lớp**. Với seed `42`, mình ra một ảnh `test/pizza/...` và nhãn `pizza`.

---

### 🖼️ Mở ảnh và in metadata

```python
img = Image.open(random_image_path)
print(f"Random image path: {random_image_path}")
print(f"Image class: {image_class}")
print(f"Image height: {img.height}")
print(f"Image width: {img.width}")
```

Một mẹo hữu ích: nếu ảnh **bị hỏng (corrupt)**, `Image.open` có thể báo lỗi — dùng nó như một cách dọn dẹp dataset. Ở bộ dữ liệu này, mình chưa thấy ảnh hỏng.

---

### 🔁 Chạy lại nhiều lần để "thấy" dữ liệu

Mình lặp lại việc chọn ảnh ngẫu nhiên khá nhiều lần: lúc ra pizza, lúc sushi, lúc steak. Có ảnh trông giống steak nhưng thực ra là sushi — đúng lý do vì sao phải xem nhiều ảnh. Cứ visualize đủ nhiều (20 lần, 100 lần) đến khi các bạn thấy tự tin "mình hiểu dữ liệu này rồi" thì mới đánh giá model.

---

### ✅ Thử thách của bài

Trước khi sang bài sau, mình đặt challenge: hãy visualize một ảnh ngẫu nhiên y như vậy, nhưng **bằng Matplotlib** thay vì in ra metadata. Thử đi, rồi bài sau mình làm cùng nhau.
