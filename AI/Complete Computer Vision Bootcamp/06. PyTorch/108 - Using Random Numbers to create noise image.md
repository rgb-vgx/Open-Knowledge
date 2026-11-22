---
title: 'Bài 108 — Sinh số ngẫu nhiên và tạo ảnh nhiễu bằng PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 108
status: edited
source: '108 - Using Random Numbers to create noise image.md'
categories:
- AI
tags: []
---

# 🎲 Sinh số ngẫu nhiên và tạo ảnh nhiễu bằng PyTorch

> Nguồn: `108 - Using Random Numbers to create noise image.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482047)

Chào các bạn! **Randomness** là một phần quan trọng trong nhiều workflow machine learning — từ khởi tạo trọng số neural network đến mô phỏng biến thiên của dữ liệu thực tế. Bài này mình sẽ học cách sinh số ngẫu nhiên bằng PyTorch, rồi dùng chúng để làm một thứ vui mắt: **tạo ảnh nhiễu**.

### 🎲 Sinh số ngẫu nhiên với torch.rand

```python
import torch

random_tensor = torch.rand(5)
print(random_tensor)
print(random_tensor.dim())     # 1
```

`torch.rand` sinh các giá trị **float** trong khoảng `[0, 1)`. Truyền `5` thì được một vector 5 phần tử, dimension là `1`.

Muốn tạo tensor nhiều chiều, thay một con số bằng một shape:

```python
random_tensor = torch.rand(2, 5, 3)
print(random_tensor.shape)   # torch.Size([2, 5, 3])
```

Kết quả là hai khối `5x3` — đúng như shape đã truyền.

### 🌱 Seed và khả năng tái lập

Mỗi lần chạy, `torch.rand` cho giá trị khác nhau. Muốn tái lập đúng kết quả, đặt seed:

```python
torch.manual_seed(42)
print(torch.rand(5))
```

Chạy lại nhiều lần với cùng seed sẽ ra cùng một dãy số; bỏ dòng `manual_seed` thì giá trị đổi. Đây là cách để nhiều người, nhiều repo làm việc cùng nhau và tái tạo đúng kết quả của nhau.

### 🔢 Số nguyên ngẫu nhiên với torch.randint

Cú pháp `torch.randint(low, high, size)`: cận trên `high` **bị loại trừ**, và tham số thứ ba là **shape** của tensor (không phải step size).

```python
random_integers = torch.randint(0, 10, (5,))
print(random_integers)   # các số 0..9, không có 10
```

Có thể truyền shape 2 chiều, hoặc thậm chí dải âm:

```python
print(torch.randint(0, 10, (5, 5)).shape)   # torch.Size([5, 5])
print(torch.randint(-10, 10, (5,)))         # giá trị từ -10 đến 9
```

### 📈 Sinh số theo phân phối chuẩn

Không chỉ phân phối đều, PyTorch còn sinh theo **normal distribution** bằng `torch.normal(mean, std, size)`:

```python
random_numbers_normal = torch.normal(0.5, 2, (5,))
print(random_numbers_normal)
```

Các giá trị này có **mean = 0.5** và **standard deviation = 2** — khác với `torch.rand` vốn lấy mẫu đều trong `[0, 1)`.

### 🖼️ Tạo ảnh nhiễu đen trắng

Giờ đến phần thú vị: dùng số ngẫu nhiên để tạo **noise image**. Mình dùng `matplotlib` để hiển thị.

```python
import matplotlib.pyplot as plt

height, width = 256, 256
uniform_noise = torch.rand(height, width)

plt.imshow(uniform_noise, cmap="gray")
plt.title("Uniform noise image")
plt.axis("off")
plt.show()
```

Một ảnh thực chất chỉ là **matrix** (tensor). Với ảnh xám một kênh, phải truyền `cmap="gray"`. Kết quả là ảnh nhiễu đen trắng y như nhiễu trên tivi ngày xưa. Mỗi lần chạy lại, `torch.rand` sinh nhiễu mới — nếu lưu nhiều frame như vậy, các bạn có thể ghép thành video nhiễu "đang chuyển động".

### 🌈 Ảnh nhiễu RGB và kiểm tra thuộc tính

Để tạo ảnh màu, thêm chiều kênh thứ ba:

```python
uniform_noise_rgb = torch.rand(256, 256, 3).numpy()

plt.imshow(uniform_noise_rgb)
plt.title("RGB noise image")
plt.axis("off")
plt.show()
```

Vì ảnh RGB có 3 kênh (`h, w, c`), không cần `cmap`. Mình gọi `.numpy()` để chuyển tensor sang NumPy — đây là thói quen tốt vì `matplotlib` và `OpenCV` chủ yếu làm việc với NumPy, tránh lỗi chuyển đổi.

Kiểm tra thuộc tính của tensor:

```python
print(uniform_noise_rgb.shape)     # (256, 256, 3)
print(uniform_noise_rgb.dtype)
print(torch.min(torch.tensor(uniform_noise_rgb)))   # gần 0
print(torch.max(torch.tensor(uniform_noise_rgb)))   # 1.0
```

Vì `torch.rand` lấy mẫu đều trong `[0, 1)`, giá trị nhỏ nhất rất gần `0` còn lớn nhất xấp xỉ `1`.

Vậy là mình đã biết sinh số ngẫu nhiên theo phân phối đều, phân phối chuẩn, đặt seed để tái lập, và biến chúng thành ảnh nhiễu. Đây là nền tảng để hiểu các thao tác tensor nâng cao hơn ở những bài sau.
