---
title: 'Cost function: squared error và cross-entropy'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 71
status: edited
source: '071 - Cost Functions.md'
categories:
- AI
tags: []
---

# 💰 Cost function: đo mô hình sai bao xa

> Nguồn: `071 - Cost Functions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12618026)

Đã có neuron và activation function, câu hỏi tiếp theo là làm sao biết mạng đang dự đoán tốt hay dở. Câu trả lời là **cost function** — một con số đo khoảng cách giữa dự đoán và giá trị thật. Càng nhỏ càng tốt, và mục tiêu của quá trình học chính là kéo nó xuống.

### 🔤 Quy ước ký hiệu

Trước khi viết công thức, thống nhất các ký hiệu để khỏi lẫn:

* `y` — giá trị **thật**.
* `a` — **dự đoán** của neuron.
* `z = w * x + b` — tổng weight nhân input cộng bias.
* `a = σ(z)` — đưa `z` qua activation function, ví dụ sigmoid, ra dự đoán.

Nói cách khác: input nhân weight, cộng bias thành `z`, đưa `z` qua activation để có `a`, và `a` là dự đoán cuối cùng của neuron.

---

### 📐 Squared error cost

Cost function đầu tiên là bình phương sai số:

```text
cost = Σ (y - a)^2 / N
```

Có thể bỏ luôn hệ số `1/N` nếu muốn, không ảnh hưởng bản chất.

Điểm hay của bình phương: **sai số lớn bị phóng đại**. Chênh lệch giữa `y` và `a` càng lớn thì bình phương càng nổi bật, nên hàm này "trừng phạt" mạnh những dự đoán lệch xa.

---

### 🚀 Cross-entropy: học nhanh hơn

Vấn đề của squared error khi triển khai thực tế là nó có thể **làm chậm tốc độ học**. Vì vậy trong deep learning người ta thường dùng **cross-entropy**:

```text
cost = -(1/N) * Σ [ y * log(a) + (1 - y) * log(1 - a) ]
```

Ưu điểm: **học nhanh hơn**. Lý do nằm ở chỗ, với cross-entropy, khoảng cách giữa `y` và `a` càng lớn thì neuron học càng nhanh. Nếu lúc khởi đầu dự đoán lệch hẳn so với giá trị thật, hàm này cho phép "nhảy" tới rất nhanh thay vì bò từng bước nhỏ.

---

### 🧩 Còn thiếu một mảnh ghép

Đến đây ta đã có hai thành phần cơ bản của việc học:

1. **Neuron với activation function** — cỗ máy tạo ra dự đoán; nhiều neuron nối lại thành neural network.
2. **Cost function** — thước đo mức sai.

Nhưng vẫn chưa biết **cách sửa sai**. Biết mình lệch bao nhiêu chưa đủ; cần cơ chế dùng con số đó để chỉnh weight và bias. Đó là việc của **gradient descent** và **back propagation** trong bài tiếp theo — thuật ngữ chắc hẳn các bạn đã gặp nếu từng đọc về machine learning.
