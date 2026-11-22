---
title: 'Bài 065 — Ghép activation function với loss function'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 65
status: edited
source: '065 - Which Loss Function To Use When.md'
categories:
- AI
tags: []
---

# 🔗 Bộ ba: activation ở output + loss function

> Nguồn: `065 - Which Loss Function To Use When.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957913)

Chào các bạn! Nhiều người hay thắc mắc **dùng loss function nào khi nào**. Thực ra nó đi thành cặp với **activation function ở output layer**: output layer quyết định loại bài toán, và loại bài toán quyết định loss function. Bài này mình chốt các tổ hợp.

### 🧱 Nền chung: hidden layer

Mọi tổ hợp dưới đây đều dùng **ReLU hoặc biến thể** (Leaky ReLU, PReLU, ELU) ở hidden layer. Chỉ khác nhau ở **output layer** và **loss function** đi kèm.

### 1️⃣ Output sigmoid → Binary Cross Entropy

Output layer dùng **sigmoid** → bài toán **binary classification** → loss là **binary cross entropy**.

```text
hidden: ReLU (+ biến thể)
output: sigmoid
loss  : binary cross entropy
```

### 2️⃣ Output softmax → Categorical / Sparse Categorical Cross Entropy

Output layer dùng **softmax** → bài toán **multi-class classification** → loss là **categorical cross entropy** hoặc **sparse categorical cross entropy** (tùy biểu diễn nhãn one-hot hay index).

```text
hidden: ReLU (+ biến thể)
output: softmax
loss  : categorical / sparse categorical cross entropy
```

### 3️⃣ Output linear → Loss của regression

Output layer dùng **linear** (không ép về khoảng xác suất) → bài toán **regression** → loss là một trong: **MSE**, **MAE**, **Huber loss**, **RMSE**.

```text
hidden: ReLU (+ biến thể)
output: linear
loss  : MSE / MAE / Huber / RMSE
```

---

### 📊 Bảng tổng hợp

| Output activation | Bài toán | Loss function |
|---|---|---|
| **sigmoid** | Binary classification | Binary cross entropy |
| **softmax** | Multi-class classification | Categorical / sparse categorical cross entropy |
| **linear** | Regression | MSE / MAE / Huber / RMSE |

Nhớ kỹ: **"output layer" ở đây nói về activation function áp ở lớp cuối**. Ghép đúng tổ hợp thì mạng train hiệu quả và loss giảm đều.

Ta đã xong **activation function** và **loss function**. Còn **optimizers** — mảnh ghép cuối trước khi sang **weight initialization** và thực hành. Hẹn gặp lại!
