---
title: 'Bài tập: phân loại Fashion MNIST bằng CNN với Keras'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 82
status: edited
source: '082 - Deep Learning and Convolutional Neural Networks Assessment.md'
categories:
- AI
tags: []
---

# 👕 Bài tập: phân loại ảnh quần áo Fashion MNIST

> Nguồn: `082 - Deep Learning and Convolutional Neural Networks Assessment.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257920)

Đã đủ công cụ để tự làm một bài từ đầu. Nhiệm vụ: xây image classifier bằng Keras và CNN trên **Fashion MNIST** — bộ dữ liệu gồm 10 loại quần áo, cấu trúc gần giống MNIST chữ số.

### 📦 Dữ liệu

* Ảnh xám **28 × 28**, 10 nhãn từ `0` đến `9`.
* **60.000** ảnh train và **10.000** ảnh test.
* Nhãn gồm: T-shirt, pullover, giày, sneaker, túi xách... (bảng mô tả đầy đủ có trong notebook).

Code tải dữ liệu đã được cung cấp sẵn trong notebook bài tập.

### ✅ Các bước cần làm

1. **Visualize dữ liệu** — dùng Matplotlib xem một ảnh bất kỳ, ví dụ một đôi bốt/sneaker, để chắc chắn dữ liệu đọc đúng.
2. **Chuẩn hóa** — chia `x_train`, `x_test` cho giá trị lớn nhất của mảng ảnh (255) để đưa pixel về 0–1.
3. **Reshape** — thêm chiều thứ tư cho **một** color channel, giống hệt cách đã làm với MNIST chữ số.
4. **One-hot encoding** — chuyển `y_train`, `y_test` bằng `to_categorical` để Keras xử lý như bài phân loại nhiều lớp.

### 🏗️ Kiến trúc gợi ý

```python
model = Sequential()

model.add(Conv2D(filters=32, kernel_size=(4, 4),
                 input_shape=(28, 28, 1), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(10, activation='softmax'))
```

Thứ tự layer: convolution → pooling → flatten → dense 128 → dense 10. Đây chỉ là gợi ý, hoàn toàn có thể thử filter, kernel, số neuron khác — notebook có sẵn phần summary để tham khảo.

### 🏃 Train và đánh giá

1. Fit model trên `x_train`; số epoch tùy chọn. Ví dụ trong bài chạy **10 epoch** và đạt khoảng **95%** accuracy.
2. Đánh giá trên `x_test` và báo cáo đủ **accuracy, precision, recall, F1-score** — có thể dùng đúng quy trình của bài MNIST đầu tiên: dự đoán trên test, rồi in confusion matrix và classification report.

Lời khuyên của giảng viên: cố gắng làm mà không mở lại bài cũ; nếu bí thì xem lại các bài trước, hoặc cùng lắm mở bài giải ngay sau đây và làm theo kiểu code-along.

Mục tiêu của bài này không phải độ chính xác tuyệt đối, mà là tự đi trọn vòng: hiểu dữ liệu → tiền xử lý → xây mạng → train → đánh giá bằng các metric đã học.
