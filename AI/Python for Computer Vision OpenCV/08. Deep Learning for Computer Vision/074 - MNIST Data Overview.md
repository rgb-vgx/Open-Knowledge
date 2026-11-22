---
title: 'Bộ dữ liệu MNIST và one-hot encoding'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 74
status: edited
source: '074 - MNIST Data Overview.md'
categories:
- AI
tags: []
---

# 🔢 MNIST: bộ dữ liệu kinh điển và cách tổ chức mảng 4 chiều

> Nguồn: `074 - MNIST Data Overview.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12342646)

Trước khi bước vào CNN với Keras, cần làm quen với **MNIST** — bộ dữ liệu nổi tiếng nhất trong deep learning, mà ai từng học qua cũng gặp. Quan trọng hơn, cách tổ chức dữ liệu ở đây (mảng 4 chiều) sẽ được dùng lại nhiều lần trong khóa, nên bài này dành thời gian làm rõ.

### 📦 MNIST có gì

MNIST dễ lấy vì Keras có sẵn hàm tải về. Quy mô:

* **60.000** ảnh training
* **10.000** ảnh test

Nội dung là chữ số viết tay từ `0` đến `9`, với đủ kiểu nét viết khác nhau của mỗi người.

### 🖼️ Mỗi ảnh là một mảng 28×28

* Mỗi ảnh là mảng **28 × 28** pixel, ảnh xám — chỉ **một** color channel.
* Dữ liệu đã được **chuẩn hóa** sẵn: mọi giá trị nằm trong khoảng 0 đến 1 thay vì 0 đến 255. Việc này giúp mạng neural học tốt hơn, và thường khi làm việc với ảnh ta cũng tự chuẩn hóa về khoảng này. Với MNIST thì Keras đã làm hộ.

### 🧊 Mảng 4 chiều: (samples, X, Y, channels)

Gộp toàn bộ 60.000 ảnh (hoặc 10.000 ảnh test) lại thành một mảng 4 chiều:

```text
(60000, 28, 28, 1)
```

Đọc theo thứ tự:

1. **Số ảnh** — 60.000 samples.
2. **X** — chiều rộng 28.
3. **Y** — chiều cao 28.
4. **Số color channel** — ở đây là `1` vì ảnh xám.

Nếu là ảnh màu, chiều cuối sẽ là `3` — một giá trị cho red, một cho green, một cho blue, tất cả chuẩn hóa trong khoảng 0 đến 1. Cấu trúc `(samples, height, width, channels)` này chính là định dạng mà các layer CNN sẽ nhận vào.

### 🏷️ Label và one-hot encoding

Khi tải trong Keras, label ban đầu là danh sách số: ảnh đầu tiên vẽ số 5 thì label là `5`.

Ta chuyển sang **one-hot encoding**: label trở thành một mảng có độ dài bằng số lớp, với `1` tại đúng vị trí index của lớp đó và `0` ở mọi vị trí còn lại.

Ví dụ ảnh vẽ số 4 thì label là:

```text
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
#                          ^ index 4
```

Lý do dùng one-hot: nó khớp hoàn hảo với output layer **10 neuron**, mỗi neuron ứng với một chữ số và "bật" theo sigmoid thành 0 hoặc 1.

Kết quả là `y_train` trở thành mảng 2 chiều rất lớn: **60.000 × 10**, vì mỗi label giờ là một mảng 10 phần tử. Nhìn trong NumPy sẽ thấy toàn các dòng one-hot như vậy — hàng thứ hai có số `1` ở index 0 nghĩa là ảnh đó là số 0.

> ⚠️ Cần kiểm chứng: transcript nói giá trị `0` là màu trắng và `1` là màu đen. Với Matplotlib colormap `gray` (mặc định khi `imshow` ảnh xám), `0` ứng với đen và giá trị cao nhất ứng với trắng — đúng với hình ảnh MNIST quen thuộc là nét chữ trắng trên nền đen. Nên hiểu phần này theo chiều ngược lại so với câu trong bài giảng.

Hiểu xong MNIST và one-hot encoding là đủ nền để áp CNN lên bộ dữ liệu này trong bài tiếp theo.
