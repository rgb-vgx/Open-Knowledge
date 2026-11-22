---
title: 'Squeeze, unsqueeze và permute: thêm, bớt và đổi trục tensor'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 33
status: edited
source: '033 - Squeezing, Unsqueezing and Permuting Tensors.md'
categories:
- AI
tags: []
---

# 🤏 Squeeze, unsqueeze và permute

> Nguồn: `033 - Squeezing, Unsqueezing and Permuting Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668422)

Bài trước mình giao các bạn tự tìm hiểu `torch.squeeze`. Giờ chúng ta làm cùng nhau — và thêm hai người bạn đồng hành: **`unsqueeze`** và **`permute`**. Cả ba đều để xử lý dimension, thứ gây ra không ít lỗi shape.

### 🤏 `squeeze`: bỏ các chiều có kích thước 1

Theo tài liệu: `torch.squeeze(input, dim)` trả về tensor với **tất cả các chiều kích thước 1 bị loại bỏ**.

```python
x_reshaped = x.reshape(1, 9)
x_reshaped.shape          # torch.Size([1, 9])

x_squeezed = x_reshaped.squeeze()
x_squeezed.shape          # torch.Size([9])
```

Chiều `1` biến mất, chỉ còn `9`. Nếu có nhiều chiều `1`, ví dụ shape `(1, 1, 9)`, thì **tất cả** các `1` đều bị bỏ, kết quả vẫn là `(9,)`.

**Mẹo in ra để hiểu:** mỗi lần biến đổi, in shape trước và sau:

```python
print(f"Previous tensor: {x_reshaped}")
print(f"Previous shape: {x_reshaped.shape}")

x_squeezed = x_reshaped.squeeze()
print(f"\nNew tensor: {x_squeezed}")
print(f"New shape: {x_squeezed.shape}")
```

Nghe có vẻ lắt nhắt, nhưng làm vài lần là thành phản xạ: thấy shape mismatch thì nghĩ ngay "có cần squeeze không?". Giống như tập đi xe đạp — lúc đầu lạng lách, sau thì quen.

### 🔍 `unsqueeze`: thêm một chiều kích thước 1

Ngược lại với squeeze, **`unsqueeze(dim)`** thêm một chiều `1` vào **đúng vị trí `dim`**:

```python
x_unsqueezed = x_squeezed.unsqueeze(dim=0)
x_unsqueezed.shape        # torch.Size([1, 9])
```

Thử đổi `dim=1`:

```python
x_squeezed.unsqueeze(dim=1).shape   # torch.Size([9, 1])
```

`dim=0` thêm ngoặc vuông ở **ngoài cùng**; `dim=1` thêm ở **trong**. Lại nhắc: Python đếm từ 0, nên "dimension 0" là chiều đầu tiên.

Lời khuyên: mỗi khi gặp tham số như `dim`, hãy **thử đổi giá trị** và in kết quả ra xem — cách học nhanh nhất.

### 🔀 `permute`: sắp xếp lại các chiều

**`permute`** trả về một **view** của tensor với các chiều được **sắp xếp lại theo thứ tự chỉ định**.

Ví dụ rất hay gặp với ảnh:

```python
x_original = torch.rand(size=(224, 224, 3))   # height, width, color_channels
x_permuted = x_original.permute(2, 0, 1)      # color_channels, height, width

x_original.shape    # torch.Size([224, 224, 3])
x_permuted.shape    # torch.Size([3, 224, 224])
```

Cách đọc `permute(2, 0, 1)`: chiều **2** (color channels) lên **vị trí 0**; chiều **0** (height) sang **vị trí 1**; chiều **1** (width) sang **vị trí 2**.

Ảnh thường được biểu diễn dưới dạng `height × width × color_channels` (RGB), nhưng nhiều model lại muốn **channels-first**. `permute` là công cụ để đổi qua lại.

### 🧠 Nhớ: permute cũng là view

Vì `permute` trả về **view**, nó **chia sẻ bộ nhớ** với tensor gốc. Nghĩa là cùng một dữ liệu, chỉ nhìn từ góc khác.

Bài tập: sau khi `permute`, thử **sửa một giá trị trong `x_original`** (ví dụ `x_original[0, 0, 0] = 123`) rồi kiểm tra `x_permuted` — bạn sẽ thấy giá trị tương ứng cũng đổi theo. Đó là bằng chứng chúng dùng chung bộ nhớ.

### 🎯 Chốt lại

| Method | Tác dụng |
|---|---|
| `squeeze()` | Bỏ **tất cả** chiều kích thước 1 |
| `unsqueeze(dim)` | Thêm một chiều kích thước 1 tại `dim` |
| `permute(*dims)` | Sắp xếp lại thứ tự các chiều |

Cả ba đều là công cụ để "chỉnh shape cho khớp" — kỹ năng bạn sẽ dùng suốt khóa. Hẹn gặp các bạn ở bài sau!
