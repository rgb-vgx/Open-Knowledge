---
title: 'Tensorflow 11: Shuffling the order of tensors'
date: '2025-11-01 16:37:08'
date_gmt: '2025-11-01 09:37:08'
modified: '2025-11-07 17:32:12'
status: publish
slug: tensorflow-11-shuffling-the-order-of-tensors
wordpress_id: 504
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-11-shuffling-the-order-of-tensors/
categories:
- Tensorflow
tags: []
---

Bạn đã hoàn thành rất tốt việc tạo ra các **Tensor** cố định và ngẫu nhiên! Việc hiểu rõ vai trò của Tensor ngẫu nhiên (khởi tạo trọng số) là rất quan trọng.

Bây giờ, chúng ta sẽ khám phá một kỹ thuật cần thiết khác trong tiền xử lý dữ liệu: **Xáo trộn Tensor (Shuffling Tensors)**.

---

## 🔀 Xáo trộn Tensor (`tf.random.shuffle`)

**Xáo trộn Tensor** là hành động thay đổi ngẫu nhiên thứ tự của các phần tử trong Tensor dọc theo một chiều nhất định.

### Tại sao cần Xáo trộn dữ liệu?

Trong Deep Learning, việc xáo trộn dữ liệu đầu vào là vô cùng quan trọng:

- **Ngăn chặn Học Lệch (Preventing Bias):** Nếu tất cả ảnh **Ramen** nằm trước tất cả ảnh **Spaghetti** trong tập dữ liệu, mô hình có thể học quá nhiều về Ramen trước và bị lệch, ảnh hưởng đến khả năng học cách nhận diện Spaghetti sau này.
- **Cải thiện Tổng quát hóa:** Xáo trộn giúp mô hình thấy các ví dụ khác nhau (Ramen, Spaghetti, Ramen, Spaghetti,...) một cách ngẫu nhiên, giúp nó điều chỉnh các trọng số (patterns) một cách đồng đều hơn và học tốt hơn.

### Thực hành Xáo trộn

Chúng ta sẽ sử dụng hàm `tf.random.shuffle()` để xáo trộn Tensor.

Đầu tiên, tạo một Tensor mẫu 2D (Matrix) không bị xáo trộn:

```
# Tạo Tensor 2D chưa xáo trộn
not_shuffled = tf.constant([[10, 7],
                            [3, 4],
                            [2, 5]])
print("Tensor gốc:\n", not_shuffled)
# Shape: (3, 2). Có 3 "hàng" và 2 "cột"
```

Bây giờ, hãy xáo trộn nó:

```
# Xáo trộn Tensor
shuffled_tensor = tf.random.shuffle(value=not_shuffled)
print("\nTensor đã xáo trộn:\n", shuffled_tensor)
```

Khi bạn chạy đoạn code trên, thứ tự của các hàng (`[10, 7]`, `[3, 4]`, `[2, 5]`) sẽ bị thay đổi ngẫu nhiên.

> **Quan sát:** `tf.random.shuffle()` mặc định xáo trộn dọc theo **chiều đầu tiên** (first dimension), tức là các hàng của Matrix sẽ bị xáo trộn, nhưng thứ tự của các cột (`10, 7` hay `3, 4`) vẫn giữ nguyên.

### 💡 Vấn đề Tái lập Kết quả (Reproducibility)

Bạn đã nhận thấy khi chạy lại `tf.random.shuffle()`, kết quả thường thay đổi. Để đảm bảo kết quả **có thể tái lập** (luôn cho cùng một thứ tự xáo trộn), chúng ta cần thiết lập **Seed**.

Tuy nhiên, việc thiết lập Seed cho các thao tác ngẫu nhiên trong TensorFlow cần cả **Global Seed** và **Operational Seed**.

```
# Thiết lập Global Seed
tf.random.set_seed(42) # Seed cấp cao nhất

# Thiết lập Operational Seed (seed bên trong hàm shuffle)
shuffled_tensor_reproducible = tf.random.shuffle(value=not_shuffled, seed=42)
print("\nTensor đã xáo trộn (Seed=42):\n", shuffled_tensor_reproducible)

# Thử chạy lại sẽ cho cùng một kết quả (nếu tf.random.set_seed(42) vẫn được giữ)
```

> **Sự khác biệt giữa 2 loại Seed:**
>
> - `tf.random.set_seed()` (Global Seed): Thiết lập Seed cho toàn bộ chương trình TensorFlow.
> - Tham số `seed` trong hàm (`tf.random.shuffle(..., seed=42)`): Thiết lập Seed chỉ cho thao tác cụ thể đó.
>
> Để đảm bảo **tính tái lập hoàn toàn**, đặc biệt khi sử dụng GPU, bạn thường cần phải đặt cả **Global Seed** và **Operational Seed** (seed bên trong hàm).

---

## 📝 Bài tập về nhà (Homework Exercise)

Đây là bài tập quan trọng để củng cố sự hiểu biết của bạn về việc tạo và xáo trộn Tensor:

**Yêu cầu:**

1. **Đọc Tài liệu:** Đọc qua tài liệu của TensorFlow về **[tf.random.set\_seed]** và **[tf.random.shuffle]** để hiểu cách hai loại seed tương tác với nhau.
2. **Tạo và Thử nghiệm:**
   - Tạo 5 Tensor ngẫu nhiên khác nhau bằng `tf.constant`, `tf.Variable`, và `tf.random.normal`/`uniform`.
   - Sử dụng `tf.random.shuffle` để xáo trộn từng Tensor.
   - **Thử thách:** Tìm cách thiết lập cả Global Seed và Operational Seed để đảm bảo rằng kết quả xáo trộn của bạn **luôn luôn giống nhau** mỗi khi bạn chạy đoạn code.

Hãy nhớ phương châm: **"Nếu còn nghi ngờ, hãy chạy code!"** Bạn không thể làm hỏng bất cứ thứ gì.

Trong video tiếp theo, chúng ta sẽ xem xét thêm một vài cách khác để tạo Tensor, bao gồm sử dụng NumPy, và sau đó bắt đầu thao tác với chúng!
