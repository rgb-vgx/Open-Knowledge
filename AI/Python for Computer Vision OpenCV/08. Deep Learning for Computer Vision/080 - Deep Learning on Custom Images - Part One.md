---
title: 'Huấn luyện trên ảnh tự thu thập: cấu trúc thư mục và ImageDataGenerator'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 80
status: edited
source: '080 - Deep Learning on Custom Images - Part One.md'
categories:
- AI
tags: []
---

# 🐕 Ảnh thật, kích thước lộn xộn: chuẩn bị dữ liệu với ImageDataGenerator

> Nguồn: `080 - Deep Learning on Custom Images - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257914)

MNIST và CIFAR-10 đều tải bằng một dòng lệnh, ảnh đã được chuẩn hóa sẵn. Thực tế thì không như vậy: ta có các file **JPEG/PNG thô**, kích thước khác nhau, số lượng rất lớn. Bài này chuẩn bị dữ liệu cho đúng, bắt đầu từ bộ ảnh cats and dogs có sẵn của khóa học.

### 📂 Tải và cấu trúc thư mục bắt buộc

File `CATS_DOGS.zip` nặng khoảng **730 MB**, tải qua link trong bài giảng trước. Giải nén ra thư mục `Cats and Dogs` với cấu trúc:

```text
Cats and Dogs/
├── test/
│   ├── cat/
│   └── dog/
└── train/
    ├── cat/
    └── dog/
```

Quy tắc bắt buộc khi làm việc với Keras và ảnh thật:

* Hai thư mục cấp cao nhất: **train** và **test**.
* Bên trong mỗi thư mục, **mỗi category một thư mục riêng** — ảnh mèo nằm trong `cat/`, ảnh chó trong `dog/`.

Nếu phân loại ba loại, chỉ cần thêm thư mục `bird/` với ảnh chim bên trong; Keras tự suy ra số lớp từ số thư mục con. Tên file giữa `test` và `train` có thể trùng nhau.

### 🖼️ Đọc thử để thấy vấn đề

```python
import matplotlib.pyplot as plt
import cv2

cat4 = cv2.imread('CATS_DOGS/train/cat/4.jpeg')
cat4 = cv2.cvtColor(cat4, cv2.COLOR_BGR2RGB)
plt.imshow(cat4)
```

`cv2.imread` trả về thứ tự **BGR**, nên phải đổi sang **RGB** bằng `cv2.cvtColor` trước khi hiển thị — nếu không ảnh sẽ bị sai màu.

```python
dog = cv2.imread('CATS_DOGS/train/dog/2.jpeg')
dog = cv2.cvtColor(dog, cv2.COLOR_BGR2RGB)
plt.imshow(dog)
```

Kích thước lộ ra ngay vấn đề: `cat4.shape` là `375 × 500`, còn `dog.shape` là `199 × 188`. **Ảnh thật có kích thước khác nhau**, và khi gom hàng chục nghìn ảnh, gần như không thể ép tất cả về cùng một kích thước bằng tay. Đó chính là lý do cần công cụ sinh dữ liệu của Keras.

### ⚡ ImageDataGenerator: vừa xử lý vừa tăng cường dữ liệu

Dữ liệu gần **1 GB** — quá lớn để nạp hết vào bộ nhớ một lúc. Keras có `ImageDataGenerator` trong package preprocessing, tự đọc và sinh **batch** từ thư mục:

```python
from keras.preprocessing.image import ImageDataGenerator

image_gen = ImageDataGenerator(
    rotation_range=30,
    width_shift_range=0.1,
    height_shift_range=0.1,
    rescale=1/255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
)
```

Từng tham số:

* **`rotation_range=30`** — xoay ngẫu nhiên tối đa 30 độ. Nên xoay ít; `180` sẽ tạo ra chó chổng ngược, hiếm khi hữu ích.
* **`width_shift_range=0.1`**, **`height_shift_range=0.1`** — dịch ảnh theo chiều ngang/dọc tối đa 10% kích thước (giá trị trong khoảng 0–1).
* **`rescale=1/255`** — chuẩn hóa pixel về 0–1 luôn trong lúc sinh dữ liệu, khỏi phải chia tay.
* **`shear_range=0.2`** — phép biến dạng trượt (shear) với biên độ góc, giúp ảnh bớt phụ thuộc vào góc chụp.
* **`zoom_range=0.2`** — phóng to ngẫu nhiên tối đa 20%.
* **`horizontal_flip=True`** — lật ngang: chó nhìn trái thành nhìn phải. Không bật lật dọc vì ảnh chó lộn ngược không giúp ích gì.
* **`fill_mode='nearest'`** — khi xoay/dịch/kéo giãn, các pixel trống ở rìa được lấp bằng giá trị gần nhất.

Mục đích của cả loạt biến đổi này: tạo thêm ảnh **biến thể** từ ảnh gốc, để mạng bớt học vẹt và bền hơn với ảnh mới.

### 🔄 Thử một phép biến đổi

```python
plt.imshow(image_gen.random_transform(dog))
```

`random_transform` trả về mảng ảnh đã biến đổi ngẫu nhiên: có thể kéo giãn, xoay nhẹ, lật ngang... Mỗi lần chạy lại ra một kết quả khác. Ảnh vẫn là con chó, chỉ khác góc nhìn — đúng thứ ta muốn.

### 📁 Sinh batch từ thư mục

```python
image_gen.flow_from_directory('CATS_DOGS/train')
```

Hàm này trỏ vào thư mục train, tự tìm từng thư mục con làm một class, trả về một **iterator** kèm thông tin số ảnh tìm được và số class. Với cấu trúc `train/{cat,dog}`, nó tự biết có **2 class**. Trong bài sau, ta sẽ gọi `flow_from_directory` cho cả train và test, kèm thêm vài tham số quan trọng như kích thước ảnh đích.

> ⚠️ Cần kiểm chứng: transcript mô tả `shear_range` như việc "cắt bớt/crop ảnh". Theo tài liệu Keras, `shear_range` là cường độ **phép shear** (biến dạng trượt, làm ảnh bị nghiêng), không phải crop. Ngoài ra `rescale` nhận hệ số nhân, nên `1/255` là cách viết đúng thay cho "chia 255".

Bước tiếp theo: dựng mô hình CNN cho bộ ảnh này, và vì train đủ lâu cần khoảng **100 epoch**, khóa học đã chuẩn bị sẵn model đã huấn luyện để nạp vào thay vì chờ cả tiếng đồng hồ.
