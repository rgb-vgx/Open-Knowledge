---
title: 'Bài 055 — Sigmoid Activation Function (phần 2): ba điều phải nhớ'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 55
status: edited
source: '055 - Sigmoid Activation Function part -2.md'
categories:
- AI
tags: []
---

# 🔍 Sigmoid (tiếp): ba điều phải nhớ và cái giá phải trả

> Nguồn: `055 - Sigmoid Activation Function part -2.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956707)

Chào các bạn! Bài trước đã điểm qua sigmoid. Bài này mình tổng hợp lại cho chặt, rồi làm rõ **vì sao nó gây vanishing gradient** trên một mạng sâu ba hidden layer, trước khi sang **tanh**.

### 📌 Ba điều bắt buộc nhớ về một activation function

Với bất kỳ activation function nào, hãy nắm được:

1. **Công thức dùng khi forward propagation.** Với sigmoid: `σ(x) = 1 / (1 + e^(-x))`, áp lên `z = WᵀX + b`.
2. **Nó biến đổi giá trị về khoảng nào.** Sigmoid ép về `0..1`.
3. **Đạo hàm của nó nằm trong khoảng nào.** Sigmoid: `0..0.25`.

Chính điều thứ ba quyết định số phận của sigmoid trong mạng sâu.

### 🧮 Mổ xẻ đạo hàm trên mạng sâu

Mạng có **hidden layer 1, 2, 3** rồi **output layer**; tính loss, dùng optimizer để backpropagate và cập nhật weights. Muốn cập nhật `W2`:

```text
W2_new = W2_old - lr * (∂loss/∂W2_old)
```

Bung chain rule (loss phụ thuộc `O3`, `O3` phụ thuộc `O2`, `O2` phụ thuộc `W2`):

```text
∂loss/∂W2 = (∂loss/∂O3) * (∂O3/∂O2) * (∂O2/∂W2)
```

Xét `∂O3/∂O2`: đặt `Z = O2*W3 + B3`, và `O3 = sigmoid(Z)`. Chèn `Z`:

```text
∂O3/∂O2 = (∂sigmoid(Z)/∂Z) * (∂Z/∂O2) = (giá trị trong 0..0.25) * W3
```

Vì `∂Z/∂O2 = W3` (bias là hằng số nên đạo hàm bằng 0). Kết quả là **một số nhỏ nhân với `W3`** — mà `W3` khởi tạo ban đầu cũng nhỏ (kỹ thuật khởi tạo thường cho giá trị `0..1`, sẽ bàn sau).

### 📉 Hệ quả: loss đứng yên

Ghép dần qua các lớp, ta được một tích toàn số nhỏ (`0.2 → 0.01 → 0.002 → ...`). Đem nhân với **learning rate** nhỏ (`~0.001`) thì lượng cập nhật gần như bằng không:

```text
W2_new ≈ W2_old
```

Weights không đổi → **convergence không xảy ra**, loss kẹt ở một mức. Đây đúng là **vanishing gradient**, và gốc rễ là đạo hàm sigmoid chỉ trong `0..0.25`.

---

### ✅ Ưu điểm thực sự của sigmoid

* Phù hợp **binary classification** vì output là `0`/`1`.
* Cho **dự đoán rõ ràng**, sát `1` hoặc `0`.
* Train tốt cho mạng **nhỏ / trung bình**.

### ❌ Ba nhược điểm lớn

1. **Dễ vanishing gradient** — càng sâu càng nặng.
2. **Output không zero-centered.** Hàm đi qua `0.5`, không qua gốc. Nhớ **standardization** trong machine learning: đưa dữ liệu về **mean = 0** (std có thể `= 1`) để gradient descent cập nhật **coefficients** hiệu quả hơn. Sigmoid không có tính chất này nên việc cập nhật weight kém hiệu quả.
3. **Phép mũ tốn thời gian** — `e^(-x)` chậm hơn trên CPU.

```text
zero-centered:  mean = 0  → cập nhật weight hiệu quả
sigmoid:        đi qua 0.5 → không zero-centered
```

Vì vậy không nên dùng sigmoid cho mọi hidden layer trong mạng sâu. Các nhà nghiên cứu cho ra hàm tiếp theo — **tanh** — và ta sẽ xem nó vá được gì. Hẹn gặp lại!
