---
title: 'Bài 053 — Vanishing gradient và vì sao sigmoid gây hại'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 53
status: edited
source: '053 - Vanishing Gradient Problem and Sigmoid.md'
categories:
- AI
tags: []
---

# 🫥 Vanishing gradient: khi weights "đứng im"

> Nguồn: `053 - Vanishing Gradient Problem and Sigmoid.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956167)

Chào các bạn! Ta đã biết chain rule và công thức cập nhật weight. Bài này mình chỉ ra một căn bệnh kinh điển của mạng sâu — **vanishing gradient** — và thủ phạm chính là **sigmoid activation function**.

### 🏗️ Mạng ví dụ

Một **input layer**, **hai hidden layer**, **một output layer**; mỗi hidden layer chỉ một neuron để dễ theo dõi. Ở mỗi neuron:

1. `Z = Σ(w_i * x_i) + b`
2. Áp **sigmoid**: `σ(z) = 1 / (1 + e^(-z))`

Sigmoid ép mọi giá trị về khoảng `0..1` (không bao giờ đúng bằng 0 hay 1 mà tiến rất sát), nên rất hợp cho **binary classification**. Output lần lượt đi qua `O1_1 → O2_1 → O3_1`, rồi tính loss và dùng **optimizers** để backpropagate, cập nhật `W3`, `W2`, `W1`.

### ⛓️ Bung chain rule cho W1

```text
∂loss/∂W1 = (∂loss/∂O3_1) * (∂O3_1/∂O2_1) * (∂O2_1/∂O1_1) * (∂O1_1/∂W1)
```

Giờ tập trung vào một mắt xích, ví dụ `∂O3_1/∂O2_1`. Vì `O3_1 = sigmoid(Z)` và `Z = W3*O2_1 + B3`, ta chèn thêm `Z` vào:

```text
∂O3_1/∂O2_1 = (∂sigmoid(Z)/∂Z) * (∂Z/∂O2_1)
```

Với `∂Z/∂O2_1 = W3` (bias là hằng số nên đạo hàm bằng 0).

### 🎯 Điểm mấu chốt: đạo hàm sigmoid chỉ nằm trong 0..0.25

Với **sigmoid**, output luôn trong `0..1`. Nhưng **đạo hàm** của nó — `σ'(z) = σ(z)(1 - σ(z))` — luôn nằm trong khoảng **0 đến 0.25** (cực đại `0.25` tại `z = 0`). Điều này đã được chứng minh toán học; ở đây ta dùng nó như một sự thật.

Vậy mỗi mắt xích `∂O/∂O_trước` xấp xỉ `(giá trị ≤ 0.25) * W`. Mà weights khởi tạo ban đầu cũng thường nhỏ (khoảng `0..1`, tùy kỹ thuật khởi tạo). Nhân một loạt số nhỏ với nhau qua nhiều lớp, kết quả **tiến dần về 0**.

### 📉 Hệ quả: weights không được cập nhật

Đạo hàm `∂loss/∂W1` trở nên cực nhỏ, ví dụ `0.0000001`. Nhân với **learning rate** nhỏ (`~0.001`) thì lượng cập nhật gần như bằng 0:

```text
W1_new ≈ W1_old
```

Weights **không nhúc nhích**, model **không tiến về global minima**, loss **đứng yên**. Đó chính là **vanishing gradient problem**: gradient biến mất khi lan ngược qua nhiều lớp.

Với mạng nông thì còn tạm; nhưng với mạng sâu — cỡ **100 hidden layer** — nhân hàng trăm số nhỏ với nhau thì gradient gần như triệt tiêu hoàn toàn.

```text
Gradient khi lan về lớp đầu:
lớp cuối  ──►  ...  ──►  lớp đầu
  ~0.25        càng nhỏ        ~0
```

---

### 🔧 Cách khắc phục: đổi activation function

Để chữa bệnh này, các nhà nghiên cứu tìm sang **activation function khác** có đạo hàm không bị kẹt trong khoảng quá nhỏ. Những cái tên sẽ học:

* **Tanh**
* **ReLU**
* **PReLU** (parametric ReLU)
* **Swish**

Cuối cùng cả loạt sẽ được so sánh để trả lời: dùng activation function nào cho **hidden layer**, cái nào cho **output layer**.

Tóm lại: sigmoid ổn cho mạng nhỏ, nhưng với mạng sâu thì chính đặc tính **đạo hàm ≤ 0.25** khiến nó gây vanishing gradient. Bài sau ta sẽ mổ xẻ sigmoid kỹ hơn. Hẹn gặp lại!
