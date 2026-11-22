---
title: 'Bài 083 — Flattening và Fully Connected Layer'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 83
status: edited
source: '083 - Flattening and Fully Connected Layers.md'
categories:
- AI
tags: []
---

# 🧱 Flattening & Fully Connected: từ feature map tới dự đoán

> Nguồn: `083 - Flattening and Fully Connected Layers.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979431)

Chào các bạn! Bài này ghép toàn bộ các mảnh CNN lại thành **kiến trúc hoàn chỉnh**, dùng ví dụ kinh điển **MNIST** (chữ số viết tay 0–9). Ta sẽ theo dõi kích thước ảnh qua từng lớp conv + pooling, rồi tới bước **flattening** và **fully connected layer**.

### 🔢 Ví dụ MNIST: nhận diện chữ số

Ảnh đầu vào là **grayscale 28×28**, nên kích thước **`28 × 28 × 1`** (số 1 là số channel). Mục tiêu: dự đoán ảnh chứa chữ số nào (0–9).

### 🔁 Chuỗi conv + pooling

**Convolution layer 1** — filter **5×5**, có `N1` filter, **không padding** (*valid padding*):

```text
28 - 5 + 1 = 24   →  24×24, N1 channel
```

Sau convolution áp **ReLU**. Nếu dùng `N1` filter (ví dụ 10 hoặc 15) thì output có `N1` channel.

**Max pooling 2×2** — chia đôi kích thước:

```text
24 / 2 = 12   →  12×12, N1 channel
```

Pooling áp cho **mọi** channel nên số channel giữ nguyên.

**Convolution layer 2** — lại filter **5×5**, không padding:

```text
12 - 5 + 1 = 8   →  8×8
```

**Max pooling 2×2**:

```text
8 / 2 = 4   →  4×4
```

Như vậy **mỗi lần conv + maxpool** vừa **giảm kích thước**, vừa **giữ lại đặc trưng mạnh** (nhờ ReLU + pooling). Có thể xếp thêm **nhiều cặp conv + pooling** nữa; mỗi pool 2×2 lại chia đôi kích thước.

```text
28×28 → conv → 24×24 → pool → 12×12 → conv → 8×8 → pool → 4×4
```

### 📏 Flattening

Sau các lớp conv/pool, ta có nhiều **feature map** (mỗi filter một map, kích thước `4×4`). **Flatten** "trải dài" mỗi feature map thành một vector một chiều:

```text
[1, 2, 3, 4]  →  hàng ngang 1, 2, 3, 4
```

Nối các vector lại (feature map 1, map 2, …) thành **một vector phẳng** duy nhất.

### 🧠 Fully Connected Layer

Vector phẳng này được đưa vào **fully connected layer** — đúng loại layer đã học ở ANN: các neuron nối đầy đủ với nhau, có thể bao nhiêu hidden neuron tùy ý, dùng **ReLU**.

Sau đó tới **output layer (dense)**. Với MNIST có **10 lớp (0–9)**, output cần **10 neuron**, áp **softmax** để ra xác suất từng chữ số.

```text
conv → pool → conv → pool → flatten → fully connected → output (softmax)
```

### 🔄 Huấn luyện

Toàn bộ mạng chạy forward propagation, tính **loss**, rồi **backpropagation** cập nhật **cả giá trị filter** lẫn weights của fully connected layer. Optimizer có thể dùng **Adam** như đã học. Vì đâu đâu cũng dùng ReLU nên việc lấy đạo hàm thuận lợi.

### ➡️ Tiếp theo

Ta đã có kiến trúc đầy đủ. Bài sau mình minh họa CNN với **ảnh RGB** thật (ví dụ con ngựa vằn) và giới thiệu hai khái niệm gọn: **feature map** và **feature extraction**. Hẹn gặp lại!
