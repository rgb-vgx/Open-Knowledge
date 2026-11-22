---
title: 'Bài 062 — Loss function và cost function khác nhau thế nào'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 62
status: edited
source: '062 - Loss Function Vs Cost Function.md'
categories:
- AI
tags: []
---

# 🧾 Loss function vs cost function: khác nhau ở đâu?

> Nguồn: `062 - Loss Function Vs Cost Function.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957839)

Chào các bạn! Ta đã xong loạt activation function, giờ chuyển sang **loss function** và **cost function**. Trong nhiều paper, hai khái niệm này bị dùng lẫn lộn, nhưng chúng khác nhau ở **số điểm dữ liệu** đưa vào mỗi lần cập nhật weights.

### 🏗️ Nhắc lại mạch forward → loss → backward

Mạng **two-layer**: input `X1, X2, X3` → hidden layer → output layer. Forward propagation nhân input với weights, cộng **bias** (`B1`, `B2`) rồi áp activation function, ra `y_hat`. Mục tiêu là giảm `y - y_hat`, được xử lý bởi **optimizers** (ví dụ **gradient descent**) trong backpropagation.

Mình khuyên khi luyện tập nên **vẽ lại sơ đồ** mạng liên tục — vẽ nhiều sẽ hiểu sâu hơn.

---

### 1️⃣ Loss function: cập nhật theo từng điểm

**Loss function** lấy **một điểm dữ liệu**, chạy forward propagation, ra `y_hat`, tính sai số rồi **backpropagate ngay** để cập nhật weights. Với **mean squared error** (dạng đơn điểm):

```text
loss = (y - y_hat)²
```

Mỗi điểm dữ liệu → một lần forward + backward → một lần cập nhật weights.

---

### 2️⃣ Cost function: gộp toàn bộ (hoặc cả batch)

**Cost function** đưa **nhiều điểm** (hoặc cả batch) vào cùng lúc, tính sai số cho **từng điểm**, lấy tổng rồi chia trung bình:

```text
cost = (1/n) * Σ (y_i - y_hat_i)²
```

Sau khi tính xong mới **backpropagate và cập nhật weights đúng một lần**.

```text
Loss: mỗi điểm → cập nhật ngay
Cost: gộp n điểm → cập nhật một lần
```

---

### 📌 Chọn dùng cái nào

* Muốn **cập nhật theo từng điểm dữ liệu** → dùng **loss function**.
* Muốn gộp **toàn bộ (hoặc batch) điểm** rồi cập nhật **một lần** → dùng **cost function**.

Cả hai đều nhằm giảm sai số, chỉ khác cách gom dữ liệu. Phần **batch** sẽ được bàn kỹ khi nói về optimizers.

Bài sau ta điểm qua các **loss function cho regression**: **MSE**, **MAE**, **Huber**, **RMSE** — và ưu nhược điểm từng cái. Hẹn gặp lại!
