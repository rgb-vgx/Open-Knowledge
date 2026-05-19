---
title: 'Tensorflow 12: Creating tensors from NumPy arrays'
date: '2025-11-01 17:22:24'
date_gmt: '2025-11-01 10:22:24'
modified: '2025-11-07 17:32:09'
status: publish
slug: tensorflow-12-creating-tensors-from-numpy-arrays
wordpress_id: 508
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-12-creating-tensors-from-numpy-arrays/
categories:
- Tensorflow
tags: []
---

Tuyệt vời! Chúng ta đã giải quyết được vấn đề quan trọng về **tính tái lập (reproducibility)** khi xáo trộn Tensor.

## 🔑 Tóm tắt về Seed Ngẫu nhiên

Bạn đã phát hiện ra rằng để có được kết quả xáo trộn **giống nhau** mỗi lần chạy, bạn cần thiết lập cả:

1. **Global Random Seed** (`tf.random.set_seed(42)`): Đặt Seed cho toàn bộ chương trình TensorFlow.
2. **Operational Random Seed** (`tf.random.shuffle(..., seed=42)`): Đặt Seed cho thao tác cụ thể đó.

```
# Tái lập hoàn toàn
# Global Seed
tf.random.set_seed(42) 
# Operational Seed
shuffled_tensor_reproducible = tf.random.shuffle(value=not_shuffled, seed=42)
```

Điều này rất quan trọng trong các thí nghiệm Deep Learning để đảm bảo rằng sự khác biệt trong kết quả là do thay đổi mô hình/dữ liệu, chứ không phải do sự ngẫu nhiên.

---

## 🏗️ Các Cách Khác để Tạo Tensor

Ngoài `tf.constant()`, `tf.Variable()`, và Tensor ngẫu nhiên, TensorFlow cung cấp các hàm tạo Tensor tiện lợi khác:

### 1. Tensor với tất cả các số 1 hoặc 0

Các hàm này rất hữu ích để khởi tạo trọng số hoặc tạo các mặt nạ (masks) trong các thao tác dữ liệu.

- **`tf.ones()`:** Tạo Tensor với tất cả các phần tử là 1.
- **`tf.zeros()`:** Tạo Tensor với tất cả các phần tử là 0.

```
# Tạo Tensor 2x2 với tất cả các phần tử là 1
ones_tensor = tf.ones(shape=(2, 2))
print("Tensor Ones:\n", ones_tensor)

# Tạo Tensor 3x4 với tất cả các phần tử là 0
zeros_tensor = tf.zeros(shape=(3, 4))
print("\nTensor Zeros:\n", zeros_tensor)
```

---

### 2. Chuyển đổi NumPy Arrays thành Tensors

**NumPy** là thư viện tính toán số phổ biến nhất trong Python. TensorFlow được xây dựng để tương thích chặt chẽ với NumPy.

> 🔑 **Lưu ý chính:** Sự khác biệt lớn nhất là **TensorFlow Tensors có thể được chạy trên GPU** để tính toán nhanh hơn, còn NumPy Arrays thì không. Nếu không dùng GPU, chúng gần như có thể thay thế cho nhau.

Chúng ta có thể dễ dàng chuyển đổi một NumPy Array thành Tensor bằng cách truyền nó vào hàm `tf.constant()` hoặc `tf.Variable()`.

```
import numpy as np

# 1. Tạo một NumPy Array (Vector 1D từ 1 đến 24)
numpy_A = np.arange(1, 25, dtype=np.int32) 
print("NumPy Array:\n", numpy_A)

# 2. Chuyển đổi NumPy Array thành Tensor
tensor_A = tf.constant(numpy_A)
print("\nTensor từ NumPy:\n", tensor_A)

# Output sẽ là tf.Tensor(..., shape=(24,), dtype=int32)
```

---

### 3. Thay đổi Hình dạng (Reshape) của Tensor

Bạn có thể thay đổi hình dạng của Tensor (số lượng chiều và kích thước mỗi chiều) miễn là **tổng số phần tử không đổi**.

```
# Tensor_A có 24 phần tử (Shape=(24,))

# Thử Reshape thành (2, 3, 4)
# 2 * 3 * 4 = 24 phần tử (Thành công)
tensor_B = tf.constant(numpy_A, shape=(2, 3, 4))
print("Tensor B (2, 3, 4):\n", tensor_B) 
print("Shape của Tensor B:", tensor_B.shape)
```

Tuy nhiên, nếu bạn cố gắng thay đổi hình dạng thành một kích thước không khớp với tổng số phần tử ban đầu, TensorFlow sẽ báo lỗi:

```
# Thử Reshape thành (3, 3, 3) = 27 phần tử (Thất bại)
# tensor_C = tf.constant(numpy_A, shape=(3, 3, 3)) # Lỗi!
```

> **Quy tắc Reshape:** Kích thước mới (`shape`) phải có tích bằng với tổng số phần tử của Tensor gốc.

---

## 🧠 Bước Tiếp theo: Thu thập Thông tin từ Tensors

Chúng ta đã tạo ra rất nhiều Tensor. Bây giờ là lúc tìm hiểu cách trích xuất thông tin quan trọng từ chúng, chẳng hạn như kích thước, hình dạng, và kiểu dữ liệu.

**Trong video tiếp theo, chúng ta sẽ học cách "Get Information from Tensors."** Hãy chuẩn bị để sử dụng các thuộc tính như `.shape`, `.ndim`, và `.dtype`!
