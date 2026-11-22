---
title: 'Dự đoán trên dữ liệu mới (phần 2): đọc ảnh bằng torchvision.io'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 166
status: edited
source: '166 - Predicting on Custom Data (Part 2)- Loading In a Custom Image With PyT.md'
categories:
- AI
tags: []
---

# 🖼️ Dự đoán trên dữ liệu mới (phần 2): đọc ảnh bằng `torchvision.io`

> Nguồn: `166 - Predicting on Custom Data (Part 2)- Loading In a Custom Image With PyT.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32763718)

Ảnh custom đã tải về. Giờ ta cần đưa nó về **cùng format** với dữ liệu model đã học: tensor **`torch.float32`**, shape **64×64×3**, và nằm trên **đúng device**. Bài này là bước đọc ảnh vào PyTorch bằng `torchvision.io.read_image`.

### 🎯 Yêu cầu về format

Model được train trên ảnh **64×64**, kiểu `torch.float32`, 3 kênh. Ảnh mới (rất lớn, `uint8`) khác hẳn — nên phải resize và đổi dtype.

---

### 📖 Tìm hàm đọc ảnh trong tài liệu

Trong `torchvision`, mục **reading and writing images and videos**. Hàm **`torchvision.io.read_image`**: đọc JPEG/PNG thành tensor 3 chiều (RGB hoặc grayscale), giá trị **`uint8`**, có thể chuyển sang mode mong muốn.

```python
import torchvision

custom_image_uint8 = torchvision.io.read_image(str(custom_image_path))
```

---

### ⚠️ Cú lỗi: cần `str`, không phải `PosixPath`

Lần đầu chạy báo lỗi kiểu **"expected value type of string but found posix path"**. `read_image` cần **đường dẫn dạng string**, còn `custom_image_path` là `PosixPath`. Sửa bằng `str(custom_image_path)`. Đây là lý do mình luôn thích `pathlib`, nhưng đôi khi phải nhớ chuyển đổi khi gọi hàm cũ.

---

### 🎨 Hiển thị ảnh

```python
plt.imshow(custom_image_uint8.permute(1, 2, 0))
plt.axis(False)
```

`read_image` trả về **channels-first** `(C, H, W)`, nên phải `permute(1, 2, 0)` về channels-last cho Matplotlib. (Nếu không, lỗi "invalid shape" quen thuộc.) Một lần nữa: đây là bố Daniel giơ hai ngón cái với chiếc pizza.

---

### 🔍 Kiểm tra metadata

```python
print(f"Custom image tensor:\n{custom_image_uint8}")
print(f"Custom image shape: {custom_image_uint8.shape}")
print(f"Custom image dtype: {custom_image_uint8.dtype}")
```

Kết quả:

* **Shape**: ảnh rất lớn (hàng nghìn pixel), khác 64×64 model đã học.
* **dtype**: `torch.uint8` — chưa phải `float32`.

Cả hai đều sẽ gây lỗi khi đưa vào model nếu không xử lý.

---

### ✅ Thử thách của bài

Thử tự **resize tensor về 64×64** bằng một transform của `torchvision`, và **đổi `uint8` sang `torch.float32`**. Đó chính là các bước chuẩn bị trước khi dự đoán — bài sau mình làm cùng. Hẹn các bạn ở đó.

> ⚠️ Cần kiểm chứng: tài liệu torchvision hiện đánh dấu `torchvision.io.read_image` là deprecated (khuyến nghị `decode_image`/TorchCodec); code trong khóa dùng theo phiên bản cũ nên vẫn chạy được.
