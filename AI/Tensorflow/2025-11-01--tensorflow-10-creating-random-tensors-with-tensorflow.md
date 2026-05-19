---
title: 'Tensorflow 10: Creating random tensors with TensorFlow'
date: '2025-11-01 16:08:27'
date_gmt: '2025-11-01 09:08:27'
modified: '2025-11-07 17:32:15'
status: publish
slug: tensorflow-10-creating-random-tensors-with-tensorflow
wordpress_id: 501
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-10-creating-random-tensors-with-tensorflow/
categories:
- Tensorflow
tags: []
---

Thật thú vị! Chúng ta đã học cách tạo các **Tensor** cố định và biến thiên. Bây giờ, chúng ta sẽ đi sâu vào việc tạo **Tensor Ngẫu nhiên (Random Tensors)**—một kỹ thuật nền tảng cho việc huấn luyện mạng nơ-ron.

---

## 🎲 Tạo Tensor Ngẫu nhiên (Random Tensors)

**Tensor Ngẫu nhiên** là các Tensor có kích thước tùy ý chứa các giá trị số ngẫu nhiên.

### Tại sao cần Tensor Ngẫu nhiên?

Tensor Ngẫu nhiên đóng vai trò cực kỳ quan trọng trong Deep Learning. Chúng được sử dụng để **khởi tạo Trọng số (Weights)** của mạng nơ-ron.

Hãy hình dung mạng nơ-ron đang học các quy luật:

1. **Khởi tạo:** Ban đầu, mạng nơ-ron không biết gì. Nó **khởi tạo** các Trọng số (các mẫu mà nó sẽ học) bằng **Tensor Ngẫu nhiên**.
2. **Học:** Khi thấy ví dụ về dữ liệu, mạng nơ-ron sẽ **cập nhật** các Trọng số ngẫu nhiên này để chúng phù hợp hơn với các quy luật thực tế trong dữ liệu (ví dụ: làm thế nào để phân loại Ramen và Spaghetti).
3. **Lặp lại:** Quá trình này lặp đi lặp lại hàng nghìn lần cho đến khi các Trọng số ngẫu nhiên ban đầu trở thành các mẫu chính xác giúp mô hình dự đoán đúng.

### 1. Tạo Tensor Ngẫu nhiên cùng kích thước

Chúng ta sẽ tạo hai Tensor ngẫu nhiên cùng hình dạng (`shape=(3, 2)`) bằng cách sử dụng `tf.random.Generator.from_seed()` và phương thức `.normal()`.

```
# Thiết lập seed ngẫu nhiên cho tính tái lập (reproducibility)
# Seed giúp đảm bảo rằng cùng một đoạn code sẽ tạo ra cùng một kết quả ngẫu nhiên
# Tương tự như random seed trong NumPy
tf.random.set_seed(42)

# Tạo generator
random_1 = tf.random.Generator.from_seed(42)
# Tạo tensor từ phân phối chuẩn (normal)
random_1 = random_1.normal(shape= (3, 2)) 

random_2 = tf.random.Generator.from_seed(42)
random_2 = random_2.normal(shape= (3, 2))
```

### 2. So sánh Tính bằng nhau

Bây giờ, hãy kiểm tra xem hai Tensor ngẫu nhiên này có bằng nhau không.

```
# So sánh tính bằng nhau (element-wise)
random_1 == random_2
# Kết quả sẽ là một Tensor Boolean (True/False)
# tf.Tensor([[ True,  True], [ True,  True], [ True,  True]], shape=(3, 2), dtype=bool)
```

Kết quả là `True` cho mọi phần tử. Điều này chứng minh rằng khi bạn **đặt cùng một seed** (`42`), bạn sẽ luôn tạo ra **cùng một Tensor ngẫu nhiên**.

> 🔑 **Lưu ý quan trọng:** Việc sử dụng **Seed** ngẫu nhiên là cần thiết để **tái lập kết quả (reproducibility)**. Nếu không đặt seed, mỗi lần bạn chạy code, các Tensor ngẫu nhiên sẽ khác nhau, khiến việc so sánh các thử nghiệm mô hình của bạn trở nên bất khả thi.

### 3. Hiểu về Phân phối (`normal` vs `uniform`)

Bạn đã thấy các hàm như `normal()` và `uniform()`:

- **`tf.random.normal()`:** Tạo ra các giá trị ngẫu nhiên từ **phân phối Chuẩn (Normal Distribution)**, thường được gọi là phân phối "hình chuông" (bell-shaped curve).
- **`tf.random.uniform()`:** Tạo ra các giá trị ngẫu nhiên từ **phân phối Đồng nhất (Uniform Distribution)**, nơi mỗi giá trị trong một phạm vi nhất định có xác suất xuất hiện bằng nhau.

Trong thực tế, bạn sẽ thường thấy các kỹ thuật khởi tạo sử dụng một trong hai phân phối này, nhưng TensorFlow sẽ quản lý hầu hết những chi tiết này cho bạn.

---

## 🔀 Tiếp theo: Xáo trộn (Shuffling) các Tensor

Nếu chúng ta có một Tensor chứa dữ liệu (ví dụ: danh sách các mẫu huấn luyện), đôi khi chúng ta cần xáo trộn thứ tự của nó.

Điều này rất quan trọng khi huấn luyện mô hình để đảm bảo rằng mô hình không học các quy luật dựa trên **thứ tự** của dữ liệu. Ví dụ: nếu tất cả các ảnh Ramen đều xuất hiện trước tất cả các ảnh Spaghetti, mô hình có thể học sai.

Trong video tiếp theo, chúng ta sẽ xem cách **xáo trộn (shuffle)** các Tensor trong TensorFlow!
