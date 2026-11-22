---
title: 'Images và NumPy: mở ảnh, xem kênh màu và tách màu'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 8
status: edited
source: '008 - Images and NumPy.md'
categories:
- AI
tags: []
---

# 🎨 Images và NumPy — mở ảnh và tách từng kênh màu

> Nguồn: `008 - Images and NumPy.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257486)

NumPy tự nó không mở được file `.jpg` hay `.png`. Ta phải ghép nó với thư viện **Pillow** (Python Imaging Library, viết tắt **PIL**) để đọc ảnh, rồi chuyển thành array cho NumPy xử lý. Bài này làm đúng quy trình đó và dùng **Matplotlib** để hiển thị ảnh ngay trong notebook.

### 🖼️ Import NumPy, Matplotlib và PIL

```python
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
```

**Matplotlib** cho phép vẽ và hiển thị ảnh ngay trong notebook. Dòng `%matplotlib inline` giúp hiển thị plot inline; các bản Jupyter/Jupyter Lab mới không bắt buộc dòng này, nhưng để lại cũng không hại gì và đôi khi tránh được vài lỗi hiển thị.

Để mở ảnh:

```python
from PIL import Image
```

Chú ý chữ `I` trong `Image` phải viết hoa.

---

### 📂 Mở ảnh và chuyển thành NumPy array

```python
pic = Image.open('DATA/00-puppy.jpg')
```

Trong notebook của khóa học có thư mục `data` chứa file `00-puppy.jpg`. Đường dẫn phải đúng với vị trí notebook: nếu thư mục `data` nằm cùng chỗ notebook thì dùng `DATA/00-puppy.jpg`; nếu notebook nằm sâu hơn một cấp có thể cần `../`. Không chắc thì cứ truyền đường dẫn tuyệt đối. Sai đường dẫn sẽ báo lỗi.

Kiểm tra kiểu đối tượng:

```python
type(pic)
# PIL.JpegImagePlugin.JpegImageFile
```

Đây vẫn là file JPEG, NumPy chưa xử lý được. Chuyển sang array:

```python
pic_arr = np.asarray(pic)
type(pic_arr)      # numpy.ndarray
pic_arr.shape      # (1300, 1950, 3)
```

Ảnh có kích thước 1300 × 1950 pixel với **3 kênh màu**. Hiển thị bằng:

```python
plt.imshow(pic_arr)
```

`plt.imshow` là hàm chuyên để hiển thị array dưới dạng ảnh.

---

### 🔍 Xem riêng từng kênh màu

Để hiểu từng kênh, tạo một bản copy rồi truy cập theo index:

```python
pic_red = pic_arr.copy()

plt.imshow(pic_red[:, :, 0], cmap='gray')   # kênh đỏ
plt.imshow(pic_red[:, :, 1], cmap='gray')   # kênh xanh lá
plt.imshow(pic_red[:, :, 2], cmap='gray')   # kênh xanh dương
```

Thứ tự kênh là **red → green → blue**, tương ứng index 0, 1, 2. Mỗi kênh là một ma trận 1300 × 1950 với giá trị 0–255.

Nếu bỏ `cmap`, Matplotlib sẽ dùng **colormap mặc định viridis** — dải màu từ tím đến vàng, được thiết kế để người mù màu vẫn phân biệt được. Nhưng nó không phản ánh đúng ý nghĩa dữ liệu, nên dùng `cmap='gray'` sẽ trực quan hơn: càng trắng nghĩa là càng nhiều cường độ của kênh đó.

Ví dụ ở kênh đỏ, tai chú cún khá sáng (nhiều đỏ); ở kênh xanh dương, vùng tai lại rất tối (gần như không có xanh dương).

---

### 🧪 Zero out kênh để tách màu

`pic_red` sau khi copy vẫn còn đủ ba kênh, nên hiển thị y hệt ảnh gốc. Giờ ta "tắt" kênh xanh lá bằng cách gán toàn bộ về 0:

```python
pic_red[:, :, 1] = 0
plt.imshow(pic_red)
```

Kết quả trông ngả **tím** — vì chỉ còn đỏ và xanh dương, mà đỏ + xanh dương tạo ra tím. Tiếp tục tắt kênh xanh dương:

```python
pic_red[:, :, 2] = 0
plt.imshow(pic_red)
```

Lúc này chỉ còn kênh đỏ, ảnh hiển thị toàn sắc đỏ.

Một điểm dễ nhầm: `pic_red` sau khi zero out vẫn có `shape` ba kênh `(1300, 1950, 3)`, chỉ là hai kênh đã bị đặt về 0. Còn khi ta index một kênh duy nhất như `pic_red[:, :, 0]`, shape chỉ còn `(1300, 1950)` — đó là một kênh đơn. Sự khác biệt này chính là lý do ảnh "chỉ đỏ" và ảnh "một kênh hiển thị grayscale" trông khác nhau.

---

### ✅ Tóm lại

Quy trình: dùng **PIL** mở ảnh → `np.asarray()` chuyển thành array → `plt.imshow()` hiển thị. Ảnh màu có ba kênh **R, G, B**; gán một kênh về 0 là ta loại bỏ hoàn toàn đóng góp màu đó. Nếu thấy phần này hơi rối, cứ xem lại bài **"What is an image"** để nắm chắc nền tảng. Bài tiếp theo là bài assessment nhỏ để ôn lại toàn bộ section.
