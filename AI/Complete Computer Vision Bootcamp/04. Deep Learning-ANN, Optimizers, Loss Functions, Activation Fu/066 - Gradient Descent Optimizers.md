---
title: 'Bài 066 — Gradient Descent optimizer'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 66
status: edited
source: '066 - Gradient Descent Optimizers.md'
categories:
- AI
tags: []
---

# 🪜 Optimizer: Gradient Descent và bài toán tài nguyên

> Nguồn: `066 - Gradient Descent Optimizers.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957983)

Chào các bạn! Ta đã xong **activation function** và **loss function**. Mảnh ghép cuối để mạng "học" là **optimizer** — bộ phận chịu trách nhiệm **giảm loss** trong backpropagation. Bài này mở màn bằng **gradient descent** và hai khái niệm dễ nhầm: **epoch** và **iteration**.

### 🎯 Optimizer làm gì?

Trong mạng hai lớp, forward propagation nhân input với weights, cộng bias, áp activation function, ra `y_hat`; rồi tính loss. **Optimizer** làm việc trong **backward propagation**: nó **cập nhật toàn bộ weights** theo công thức:

```text
w_new = w_old - learning_rate * (∂loss/∂w_old)
```

Công thức này thay đổi tùy từng optimizer. `learning_rate` quyết định **tốc độ hội tụ** về global minima.

Vẽ loss theo weights ta được đường parabol gọi là **gradient descent curve**; đáy là **global minima**. Dù weight khởi đầu ở đâu, công thức luôn kéo nó về đáy. Tới đáy, slope `= 0` nên `w_new ≈ w_old` — dấu hiệu loss đã giảm hết mức.

---

### 🔁 Epoch và Iteration (kiểu gradient descent)

Giả sử có **1000 điểm dữ liệu**:

1. **Forward propagation** chạy trên **toàn bộ 1000 điểm**, tính `y_hat_1 ... y_hat_1000`, tính **cost function**.
2. **Backward propagation** cập nhật weights **một lần**.

Một lượt forward + một lượt backward như vậy = **một epoch**. Lặp nhiều epoch (100, …), mỗi epoch lại quét toàn bộ 1000 điểm, cost giảm dần.

Điểm quan trọng: trong **gradient descent thuần**, cả 1000 điểm được đưa vào **cùng một lần** → mỗi epoch tương ứng **một iteration**. (Khi chia dữ liệu thành nhiều phần, số iteration mới lớn hơn — sẽ thấy ở các biến thể sau.)

```text
Gradient Descent (1000 điểm):
1 epoch = 1 lượt forward (toàn bộ) + 1 lượt backward = 1 iteration
```

---

### ⚖️ Ưu và nhược điểm

**Ưu điểm:** hội tụ về global minima nhờ công thức cập nhật weight.

**Nhược điểm: ngốn tài nguyên.** Với **1 triệu điểm** dữ liệu, forward propagation phải nạp cả 1 triệu điểm vào bộ nhớ cùng lúc và cập nhật lượng weight tương ứng → cần **RAM và GPU** rất lớn. Máy yếu sẽ treo cứng; chạy trên cloud (AWS…) thì tốn tiền.

Vì vậy gradient descent dễ **hội tụ** nhưng **rất tốn tài nguyên**. Bài sau ta xem **stochastic gradient descent (SGD)** — liệu có giải được bài toán tài nguyên này không. Hẹn gặp lại!
