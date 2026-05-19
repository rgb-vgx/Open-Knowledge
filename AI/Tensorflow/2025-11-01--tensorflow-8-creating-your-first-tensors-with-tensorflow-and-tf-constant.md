---
title: 'Tensorflow 8: Creating your first tensors with TensorFlow and tf.constant()'
date: '2025-11-01 15:25:54'
date_gmt: '2025-11-01 08:25:54'
modified: '2025-11-07 17:32:21'
status: publish
slug: tensorflow-8-creating-your-first-tensors-with-tensorflow-and-tf-constant
wordpress_id: 490
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-8-creating-your-first-tensors-with-tensorflow-and-tf-constant/
categories:
- Tensorflow
tags: []
---

## 💻 Thiết lập Môi trường: Bắt đầu với Google Colab

Chúng ta sẽ sử dụng **Google Colab (Colaboratory)** trong suốt khóa học này. Colab là một công cụ dựa trên trình duyệt, cho phép bạn viết và chạy code Python. Quan trọng nhất, nó cho phép chúng ta truy cập miễn phí vào **GPU và TPU**—những con chip tính toán nhanh mà chúng ta đã thảo luận.

Bạn có thể truy cập Colab tại: **`colab.research.google.com`**

Bây giờ, hãy mở một **Notebook mới** và đặt tên cho nó: `00_tensorflow_fundamentals`. (Con số `00_` giúp chúng ta giữ các notebook theo thứ tự).

### 🚀 TensorFlow Fundamentals: Giới thiệu về Tensors

Trong notebook này, chúng ta sẽ khám phá các khái niệm cơ bản nhất của **Tensors**.

### 1. Khởi động và Kiểm tra TensorFlow

Bước đầu tiên, luôn luôn là **Import TensorFlow** và kiểm tra phiên bản:

`import tensorflow as tf  
print(tf.version)`

**Lưu ý:** Chúng ta sử dụng **`tf`** làm **alias** (tên gọi tắt) cho TensorFlow. Đây là quy ước phổ biến toàn cầu.

### 2. Tạo Tensors với `tf.constant()`

Như đã học, **Tensor** là cách biểu diễn dữ liệu bằng số. `tf.constant()` là cách đơn giản nhất để tạo một Tensor cố định.

#### A. Scalar (0 Chiều)

**Scalar** là một số duy nhất, không có chiều (0 chiều).

```
# Tạo một Scalar (một số duy nhất)
scalar = tf.constant(7)
print(scalar)
# Kết quả: tf.Tensor(7, shape=(), dtype=int32)
```

Kiểm tra số chiều (**ndim** - number of dimensions):

```
print(scalar.ndim)
# Kết quả: 0
```

#### B. Vector (1 Chiều)

**Vector** là một chuỗi số có hướng, có 1 chiều (1D).

```
# Tạo một Vector (một danh sách các số)
vector = tf.constant([10, 10])
print(vector)
# Kết quả: tf.Tensor([10 10], shape=(2,), dtype=int32)
```

Kiểm tra số chiều:

```
print(vector.ndim)
# Kết quả: 1
```

#### C. Matrix (2 Chiều)

**Matrix** là một mảng số hai chiều (2D), có hàng và cột.

```
# Tạo một Matrix (một danh sách chứa các danh sách)
matrix = tf.constant([[10, 7],
                      [7, 10]])
print(matrix)
# Kết quả: tf.Tensor([[10  7], [ 7 10]], shape=(2, 2), dtype=int32)
```

Kiểm tra số chiều:

```
print(matrix.ndim)
# Kết quả: 2
```

#### D. Tensor (N Chiều)

Trong TensorFlow, **Tensor** là thuật ngữ chung, nhưng thường dùng để chỉ mảng có 3 chiều trở lên.

```
# Tạo một Tensor 3 chiều
tensor = tf.constant([[[1, 2, 3],
                       [4, 5, 6]],
                      [[7, 8, 9],
                       [10, 11, 12]]])
print(tensor)
# Kết quả: shape=(2, 2, 3), ndim=3
```

Kiểm tra số chiều:

```
print(tensor.ndim)
# Kết quả: 3
```

> 💡 Quy luật đã tìm thấy:
>
> .ndim (số chiều) của một Tensor chính là số lượng phần tử trong thuộc tính shape của nó.

---

### 3. Tùy chỉnh Kiểu Dữ liệu (Dtype)

Kiểu dữ liệu (dtype) quyết định cách các số được lưu trữ trong bộ nhớ máy tính. Mặc định là `int32` (số nguyên) hoặc `float32` (số thực).

Chúng ta có thể chỉ định dtype để tiết kiệm bộ nhớ hoặc tránh lỗi tương thích.

Tạo Matrix với kiểu dữ liệu float16 (precision thấp hơn, tiết kiệm bộ nhớ)

```
another_matrix = tf.constant([[10., 7.],
                              [3., 2.],
                              [8., 9.]], dtype=tf.float16) 
# Lưu ý dấu chấm ('.') để tạo float
print(another_matrix)
# Kết quả: Dtype=float16
```

> **Lưu ý về Dtype:** `float16` (16-bit precision) sử dụng bộ nhớ ít hơn so với `float32`. Điều này quan trọng khi bạn xử lý lượng lớn dữ liệu (như hình ảnh/video) trên các thiết bị giới hạn bộ nhớ.

---

### Tóm tắt các định nghĩa cơ bản

| **Thuật ngữ** | **Định nghĩa** | **Chiều (ndim)** | **Ví dụ (Shape)** |
| --- | --- | --- | --- |
| **Scalar** | Một số đơn lẻ. | 0 | `()` |
| **Vector** | Một mảng số 1 chiều (có hướng). | 1 | `(5,)` |
| **Matrix** | Một mảng số 2 chiều (bảng). | 2 | `(3, 2)` |
| **Tensor** | Một mảng số N chiều. | N>=0 | Bất kỳ `shape` nào. |

Trong TensorFlow, tất cả những thứ trên đều được gọi là **Tensors**.

Trong video tiếp theo, chúng ta sẽ tìm hiểu cách tạo Tensors bằng **`tf.Variable`** và cách chúng khác với **`tf.constant`**!
