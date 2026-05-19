---
title: 'Tensorflow 13: Getting information from your tensors (tensor attributes)'
date: '2025-11-01 21:52:07'
date_gmt: '2025-11-01 14:52:07'
modified: '2025-11-07 17:32:06'
status: publish
slug: tensorflow-13-getting-information-from-your-tensors-tensor-attributes
wordpress_id: 513
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-13-getting-information-from-your-tensors-tensor-attributes/
categories:
- Tensorflow
tags: []
---

Khi làm việc với Deep Learning, bạn sẽ thường xuyên cần phải kiểm tra các thuộc tính sau của Tensor:

| **Thuộc tính (Trong code)** | **Tên gọi** | **Ý nghĩa** |
| --- | --- | --- |
| **`tensor.shape`** | Shape (Hình dạng) | Chiều dài/số lượng phần tử của mỗi dimension (trục) của Tensor. |
| **`tensor.ndim`** | Rank (Hạng)/Number of Dimensions (Số chiều) | Số lượng dimension của Tensor (Scalar=0, Vector=1, Matrix=2, Tensor=N). |
| **`tensor.dtype`** | Dtype (Kiểu dữ liệu) | Kiểu dữ liệu của các phần tử (ví dụ: `float32`, `int32`). |
| **`tf.size(tensor)`** | Size (Kích thước) | Tổng số phần tử (item/element) trong Tensor. |

### 1. Tạo Tensor Mẫu (Rank 4)

Chúng ta sẽ tạo một Tensor Rank 4 (4 chiều) để thực hành:

```
# Tạo Tensor 4 chiều với tất cả các phần tử là 0
rank_4_tensor = tf.zeros(shape=[2, 3, 4, 5]) 
# 4 dimensions: (2 - 3 - 4 - 5)
```

> **Hình dung Shape:** Shape `(2, 3, 4, 5)` có nghĩa là:
>
> - **Dimension 0 (Axis 0):** Có 2 nhóm.
> - **Dimension 1 (Axis 1):** Mỗi nhóm có 3 đơn vị.
> - **Dimension 2 (Axis 2):** Mỗi đơn vị có 4 phần tử.
> - **Dimension 3 (Axis 3):** Mỗi phần tử có 5 giá trị.

### 2. Trích xuất Thuộc tính

Chúng ta có thể dễ dàng lấy các thuộc tính này:

```
# Lấy các thuộc tính cơ bản
print("Dữ liệu kiểu (Dtype) của mỗi phần tử:", rank_4_tensor.dtype)
print("Số chiều (Rank) của Tensor:", rank_4_tensor.ndim)
print("Shape (Hình dạng) của Tensor:", rank_4_tensor.shape)

# Lấy kích thước của một trục cụ thể
print("Số phần tử trên Trục 0 (Axis 0):", rank_4_tensor.shape[0])

# Lấy kích thước của trục cuối cùng (dùng -1 để tiện lợi)
print("Số phần tử trên Trục cuối cùng (Axis -1):", rank_4_tensor.shape[-1])

# Lấy tổng số phần tử (Size)
total_elements = tf.size(rank_4_tensor)
print("Tổng số phần tử (Size) trong Tensor:", total_elements)
```

> Mối liên hệ Size và Shape:
>
> Tổng số phần tử (Size) luôn bằng tích của các giá trị trong Shape.
>
> Ví dụ: 2x3x4x5 = 120 (Tương ứng với tf.size là 120).

### 3. Chuyển đổi Tensor Size sang NumPy Integer

Đôi khi, các hàm `tf.size()` trả về một Tensor. Nếu bạn chỉ muốn giá trị số nguyên đơn thuần, bạn có thể chuyển đổi nhanh chóng bằng `.numpy()`:

```
# In tổng số phần tử dưới dạng Integer thuần túy
print("Tổng số phần tử (dạng NumPy Integer):", total_elements.numpy())
```

---

## 🗂️ Tiếp theo: Indexing Tensors

Bạn đã biết cách kiểm tra các thuộc tính của Tensor. Bước tiếp theo là học cách **truy cập (indexing)** các phần tử và các phần của Tensor. Điều này là cốt lõi để thao tác và làm việc với dữ liệu trong Deep Learning.

**Trong video tiếp theo, chúng ta sẽ bắt đầu thực hành Indexing trên các Tensor!**
