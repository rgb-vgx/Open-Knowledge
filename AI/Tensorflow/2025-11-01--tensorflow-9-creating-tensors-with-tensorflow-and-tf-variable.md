---
title: 'TensorFlow 9: Creating tensors with TensorFlow and tf.Variable()'
date: '2025-11-01 15:48:42'
date_gmt: '2025-11-01 08:48:42'
modified: '2025-11-07 17:32:18'
status: publish
slug: tensorflow-9-creating-tensors-with-tensorflow-and-tf-variable
wordpress_id: 498
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-9-creating-tensors-with-tensorflow-and-tf-variable/
categories:
- Tensorflow
tags: []
---

Tuyệt vời! Chúng ta đã làm quen với **Tensor** cố định (constant). Bây giờ, chúng ta sẽ khám phá một loại Tensor khác cực kỳ quan trọng: **Tensor có thể thay đổi (variable)**.

---

## 🔁 Tạo Tensors với `tf.Variable()`

Trong khi `tf.constant()` tạo ra một Tensor có giá trị không thay đổi, thì `tf.Variable()` tạo ra một Tensor mà **giá trị của nó có thể được cập nhật**.

### 1. Tạo Tensor Có thể Thay đổi và Không thay đổi

Chúng ta hãy tạo hai Tensor tương đương, một dùng `tf.Variable` và một dùng `tf.constant`, sau đó so sánh chúng:

```
# Tensor có thể thay đổi (Variable)
changeable_tensor = tf.Variable([10, 7])
print(changeable_tensor)

# Tensor không thể thay đổi (Constant)
unchangeable_tensor = tf.constant([10, 7])
print(unchangeable_tensor)
```

| **Loại Tensor** | **Hàm** | **Khả năng Thay đổi** |
| --- | --- | --- |
| **Variable Tensor** | `tf.Variable()` | **Có thể thay đổi** |
| **Constant Tensor** | `tf.constant()` | **Không thể thay đổi** |

### 2. Thử nghiệm Thay đổi Giá trị

#### A. Tensor Có thể Thay đổi (`tf.Variable`)

Để thay đổi giá trị của một Tensor được tạo bằng `tf.Variable`, chúng ta phải sử dụng phương thức **`.assign()`**.

Python

```
# Thử thay đổi phần tử đầu tiên (index 0) thành 7
changeable_tensor[0].assign(7)

print(changeable_tensor)
# Kết quả: tf.Variable([ 7,  7], shape=(2,), dtype=int32)
```

Quá trình này thành công! Giá trị Tensor đã được cập nhật từ `[10, 7]` thành `[7, 7]`.

#### B. Tensor Không thể Thay đổi (`tf.constant`)

Bây giờ, hãy thử làm điều tương tự với Tensor không thay đổi.

**Lần thử 1: Sử dụng phép gán thông thường (`=`)**

Python

```
# Thử gán giá trị mới cho phần tử đầu tiên
try:
    unchangeable_tensor[0] = 7
except TypeError as e:
    print(f"Lỗi khi dùng phép gán thông thường: {e}")
# Kết quả: ... does not support item assignment
```

**Lần thử 2: Sử dụng phương thức `.assign()`**

Python

```
# Thử dùng .assign()
try:
    unchangeable_tensor.assign(7) # Dùng .assign() cho toàn bộ tensor
except AttributeError as e:
    print(f"Lỗi khi dùng .assign(): {e}")
# Kết quả: 'Tensor' object has no attribute 'assign'
```

Cả hai lần thử đều thất bại, xác nhận rằng Tensor `tf.constant` **không thể bị thay đổi** sau khi tạo.

### 3. Tại sao lại cần hai loại Tensor?

Sự khác biệt giữa **Variable Tensor** và **Constant Tensor** rất quan trọng trong Deep Learning:

- **Variable Tensors** đóng vai trò là các **Trọng số (Weights)** và **Độ lệch (Biases)** trong mạng nơ-ron. Trong quá trình huấn luyện, những giá trị này **phải được cập nhật (thay đổi)** để mô hình học được các quy luật.
- **Constant Tensors** thường được sử dụng cho dữ liệu đầu vào hoặc các tham số cố định không cần thay đổi trong quá trình học.

> **Lưu ý quan trọng:** Trong thực tế, bạn sẽ **hiếm khi phải tự quyết định** nên dùng `tf.Variable` hay `tf.constant` cho Trọng số. **TensorFlow (Keras) sẽ tự động** tạo ra các **Variable Tensors** (Trọng số) cho các lớp của mạng nơ-ron và quản lý việc cập nhật chúng.

---

### 🎲 Bước Tiếp theo: Tạo Tensors Ngẫu nhiên

Chúng ta đã tạo Tensors với các giá trị cố định. Trong video tiếp theo, chúng ta sẽ bắt đầu làm quen với việc tạo **Tensors Ngẫu nhiên (Random Tensors)**.

Tensors Ngẫu nhiên rất quan trọng vì đây là cách chúng ta **khởi tạo** các Trọng số ban đầu trong mạng nơ-ron trước khi quá trình học bắt đầu. Hẹn gặp lại bạn!
