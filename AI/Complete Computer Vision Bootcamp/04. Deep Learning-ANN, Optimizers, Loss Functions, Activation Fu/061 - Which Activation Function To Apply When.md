---
title: 'Bài 061 — Dùng activation function nào, ở đâu'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 61
status: edited
source: '061 - Which Activation Function To Apply When.md'
categories:
- AI
tags: []
---

# 🧭 Chọn activation function: hidden layer vs output layer

> Nguồn: `061 - Which Activation Function To Apply When.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957285)

Chào các bạn! Ta đã đi qua cả loạt activation function. Câu hỏi còn treo: **dùng cái nào, ở đâu?** Bài này mình chốt bằng một quy tắc đơn giản nhưng áp dụng cho mọi mạng ANN, bất kể sâu bao nhiêu, nhiều neuron bao nhiêu.

### 🏗️ Bối cảnh mạng ví dụ

Input `X1, X2, X3` → **hidden layer 1** → **hidden layer 2** → **output layer**. Trong hidden neuron, ta nhân input với weights (`W1..W6`), cộng **bias** (ví dụ hằng số `1`), rồi ở bước hai **áp activation function**.

Câu hỏi: bước hai đó dùng hàm gì?

### 🧠 Hidden layer: tránh sigmoid và tanh

Nếu dùng **sigmoid** trong hidden layer của mạng **sâu** (5–10 hidden layer, nhiều neuron), ta sẽ dính **vanishing gradient**. **Tanh** cũng vậy — vẫn có thể gây vanishing gradient.

Vì thế trong thực hành, hidden layer nên dùng **ReLU** hoặc **biến thể của ReLU**:

* **ReLU**
* **Leaky ReLU**
* **PReLU** (parametric ReLU)

Lý do: ReLU và biến thể xử lý được vấn đề **dead neuron** của ReLU thuần (đạo hàm chỉ `0`/`1`). Đây là lựa chọn mặc định cho **hidden layer 1, 2, …**.

### 🎯 Output layer: phân biệt theo bài toán

* **Binary classification** → **sigmoid**.
* **Multi-class classification** → **softmax**.

Sigmoid/softmax đặt ở **lớp cuối** để phân biệt nhị phân và đa lớp. Nếu dùng softmax hay tanh trong hidden layer thì lại có nguy cơ vanishing gradient — nên tránh.

```text
Hidden layer  : ReLU / Leaky ReLU / PReLU
Output layer  : sigmoid  (binary)
                softmax  (multi-class)
```

---

### 📌 Chốt lại

Chỉ cần nhớ bảng trên là đủ dựng một ANN với độ sâu, số neuron tùy ý. Toàn bộ phần lý thuyết này sẽ "khớp" khi ta bắt tay vào implement bằng **TensorFlow**.

Các bạn đừng nản nếu thấy lý thuyết dày — cứ xem lại nhiều lần, rồi mọi thứ sẽ rõ khi code. Bài sau ta chuyển sang **loss function và cost function**. Hẹn gặp lại!
