---
title: 'Bài 102 — Mạng nơ-ron tích chập (CNN) là gì?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 102
status: edited
source: '102 - What Is a Convolutional Neural Network (CNN).md'
categories:
- AI
tags: []
---

# 🧩 Mạng nơ-ron tích chập (CNN) là gì?

> Nguồn: `102 - What Is a Convolutional Neural Network (CNN).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32903018)

Bài trước mình đã chỉ ra rằng CNN rất giỏi tìm pattern trong ảnh, nhưng để câu hỏi "CNN là gì" lơ lửng. Bài này mình trả lời ở mức high-level — đủ để các bạn đọc được kiến trúc mình sắp code.

### 📖 Học CNN ở đâu?

Có vô số tài liệu: bài "A comprehensive guide to convolutional neural networks", video của Code Basics, hàng loạt hình minh họa. Nhưng câu trả lời đúng nhất là **cái bạn hiểu nhất**. Mình chọn học bằng cách viết code — vì là machine learning engineer, 99% thời gian mình viết code.

Lưu ý vui: trong khóa này **CNN** là *convolutional neural network*, không phải đài tin tức.

### 🏗️ Kiến trúc điển hình của một CNN

Một CNN cơ bản nhất gồm các lớp nối tiếp:

1. **Input layer** — nhận `in_channels` và input shape. Nhắc lại: shape input/output phải khớp, đây là lỗi số một của dân ML.
2. **Convolutional layer** — thực hiện phép toán có cửa sổ (window) trượt trên ảnh/tensor để tìm pattern.
3. **Hidden activation / non-linear activation** — thường là ReLU, để model vẽ được đường cong, không chỉ đường thẳng.
4. **Pooling layer** — ví dụ max pooling, nén thông tin.
5. **Output layer** — thường là linear layer, đưa output về đúng shape mong muốn.

### 🪟 Bên trong convolutional layer có gì?

Công thức (chỗ Daniel mở tài liệu tham khảo trong video — caption nghe không rõ tên miền):

```text
output = bias + Σ (weight tensor ⊛ input)
```

Trong đó có một **bias term** (như đã gặp) và một **weight matrix**. `torch.nn` lo hết phần tính toán này cho mình; việc của mình là chỉnh các **hyperparameter** cho khớp bài toán.

Cốt lõi: mỗi layer thực hiện một phép toán trên input, rồi chuyển kết quả cho layer sau, đến khi ra output dùng được.

### 🔁 Luồng forward

Khi đưa ảnh vào:

* Ảnh đi qua `nn.Sequential` gồm các layer trên.
* Hàm `forward` trả về `x` ở dạng dùng được — có thể chuyển thành **class names**.
* Từ đó tích hợp vào app computer vision.

### ⚠️ Không có một kiến trúc CNN duy nhất

Đây là điều mình muốn các bạn nhớ: **gần như vô số cách xếp các layer lại với nhau**. Slide chỉ trình bày *một* kiến trúc điển hình, đơn giản nhất có thể. Theo thời gian các bạn sẽ học cách dựng model phức tạp hơn, và cả cách dùng lại model có sẵn (transfer learning ở section sau).

Cách luyện tốt nhất không phải nhìn slide, mà là **code ra**.

### ✅ Tạm kết

CNN = input layer → nhiều hidden layer (convolution + non-linear activation + pooling) → output linear layer. Mỗi layer làm một phép toán, nối tiếp nhau để nén và biến đổi dữ liệu thành dự đoán. Giờ thì vào Colab thôi — bài sau mình bắt đầu code.
