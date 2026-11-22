---
title: 'Bài 084 — Ví dụ CNN với ảnh RGB'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 84
status: edited
source: '084 - CNN Example with RGB.md'
categories:
- AI
tags: []
---

# 🦓 CNN hoàn chỉnh với ảnh RGB: feature map & feature extraction

> Nguồn: `084 - CNN Example with RGB.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979439)

Chào các bạn! Bài cuối của chặng lý thuyết CNN: một ví dụ trọn vẹn với **ảnh RGB** (con ngựa vằn). Từ đây bạn sẽ thấy toàn bộ pipeline lặp đi lặp lại thế nào, và làm quen hai thuật ngữ quan trọng: **feature map** và **feature extraction**.

### 🖼️ Ảnh đầu vào là RGB

Ví dụ dùng ảnh **zebra (ngựa vằn)** — ảnh **RGB** nên có **3 channel** (khác MNIST grayscale 1 channel). Mọi thứ còn lại vận hành y hệt phần lý thuyết đã học.

---

### 🔁 Pipeline: conv + ReLU + pooling lặp lại

Cấu trúc trong ví dụ:

```text
conv + ReLU → pool
conv + ReLU → pool
conv + ReLU → pool
→ flatten → fully connected → output (softmax)
```

Nhấn mạnh: **mỗi "convolution layer" = convolution + ReLU**. Trong ví dụ có **3 convolution layer** ghép với pooling, xếp chồng theo chiều ngang.

---

### 🗺️ Feature map

Output của mỗi filter sau convolution (và qua ReLU) được gọi là **feature map** — một bản đồ ghi lại đặc trưng mà filter đó phát hiện (cạnh, pattern, hình dạng…). Nhiều filter → nhiều feature map.

---

### 🧪 Feature extraction vs classification

Toàn bộ pipeline được chia làm hai nửa rõ rệt:

* **Feature extraction** — từ input, qua các cặp **conv + pooling** liên tiếp, mạng **trích ngày càng nhiều đặc trưng**.
* **Classification** — từ **flattening** + **fully connected layer** trở đi, ta dùng các đặc trưng đó để **phân loại**.

```text
Feature extraction:  input → [conv+pool] × 3
Classification:      flatten → FC → output(softmax)
```

---

### 🎯 Output và softmax

Giả sử cần phân biệt **3 lớp** (horse, zebra, dog) thì output layer có **3 neuron**, áp **softmax** để ra **xác suất** từng lớp — lớp xác suất cao nhất là dự đoán.

---

### 🔄 Train và backpropagation

Forward: ảnh đi qua conv + ReLU (ReLU giúp lấy được **đạo hàm** khi backprop), qua pooling, flatten, fully connected, softmax. Sau đó tính **loss** giữa `y` và `y_hat`, rồi **backpropagation** cập nhật:

* **Giá trị các filter** trong convolution layer.
* **Weights** của fully connected layer.

Cùng cơ chế optimizer (ví dụ **Adam**) như đã học ở ANN.

---

### 📌 Tổng kết chặng CNN lý thuyết

Ta đã đi hết: cảm hứng từ não (V1–V5) → **convolution** với filter → **padding** → **ReLU** → **pooling** → **flattening** → **fully connected** → **softmax**. Đây là nền tảng để bước vào **image classification**, **object detection** và **segmentation** trong các phần sau của khóa. Hẹn gặp lại!
