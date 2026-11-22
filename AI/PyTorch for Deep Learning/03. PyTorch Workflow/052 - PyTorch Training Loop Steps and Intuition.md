---
title: 'Bài 52 — Các bước trong training loop và trực giác'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 52
status: edited
source: '052 - PyTorch Training Loop Steps and Intuition.md'
categories:
- AI
tags: []
---

# 🔁 Các bước trong training loop và trực giác

> Nguồn: `052 - PyTorch Training Loop Steps and Intuition.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708226)

Loss function đã có, optimizer đã có. Giờ ráp thành training loop. Lần đầu viết sẽ thấy rối, lần thứ hai thấy quen, đến lần thứ mấy chục thì viết nhắm mắt cũng được. Trước khi code, mình muốn các bạn thấy rõ các bước đã.

### 🎯 Mục tiêu chung

Giảm MAE của model. Mỗi vòng lặp, model dự đoán, so với nhãn thật, tính loss, rồi optimizer chỉnh tham số. Lặp lại nhiều lần.

---

### 0️⃣ Bước 0 — Lặp qua dữ liệu

Ta muốn model **nhìn dữ liệu nhiều lần**, chứ không chỉ một lần. Số lần đi hết toàn bộ dữ liệu gọi là **epoch**.

```python
epochs = 1

for epoch in range(epochs):
    ...
```

`epochs` do mình đặt, nên nó là **hyperparameter**. Thường người ta bắt đầu với một epoch rồi tăng sau.

---

### 1️⃣ Forward pass

Dữ liệu đi qua các hàm `forward` của model — từ input layer ra output layer. Còn gọi là **forward propagation**.

```python
y_pred = model_0(X_train)
```

Đây là lúc model "đoán" trên dữ liệu train.

---

### 2️⃣ Tính loss

So dự đoán ở forward pass với **ground truth labels**:

```python
loss = loss_fn(y_pred, y_train)
```

---

### 3️⃣ `optimizer.zero_grad()`

Xóa gradient cũ trước khi tính gradient mới.

---

### 4️⃣ Backward — lan truyền ngược

```python
loss.backward()
```

Dữ liệu đi ngược qua mạng để **tính gradient của từng tham số so với loss function**. Đây chính là **backpropagation**.

---

### 5️⃣ `optimizer.step()`

Optimizer dùng gradient vừa tính để chỉnh tham số nhằm cải thiện loss. Đây là lúc **gradient descent** chạy.

---

### ⛰ Gradient là gì?

Hình dung loss như độ cao một quả đồi, mục tiêu là đi xuống chân đồi (loss = 0). **Gradient** là độ dốc. Thuật toán tối ưu chỉnh tham số sao cho gradient tiến về 0 — và khi gradient của loss bằng 0 thì loss cũng đạt cực tiểu.

Toàn bộ phần toán của backpropagation đã được PyTorch cài sẵn; mình chỉ viết code để kích hoạt.

---

### 🎛 `model.train()` và `model.eval()`

Trước khi train phải đặt model vào **training mode**:

```python
model_0.train()
```

Training mode là chế độ mặc định, bật lại các hành vi dùng khi huấn luyện. Còn `model_0.eval()` chuyển sang **evaluation mode** — tắt các hành vi chỉ dành cho training (như dropout, batch norm). Lưu ý: `eval()` **không** tắt việc theo dõi gradient; muốn tắt thì dùng `torch.inference_mode()` hoặc `torch.no_grad()` như đã nói ở bài 49.

---

### 🧪 Thử nghiệm nho nhỏ

Mình thử in `requires_grad` của tham số khi bật/tắt `no_grad` để xem nó đổi không — kết quả là không đổi khi in ra. Nghĩa là `no_grad` tác động **bên trong lúc tính toán**, chứ không thay đổi thuộc tính `requires_grad` của parameter. Đây là kiểu thử nghiệm nên làm: đoán, chạy, xem, sửa hiểu biết.

---

### ✅ Tạm kết

Năm bước: forward → loss → zero_grad → backward → step, bọc trong vòng lặp epoch. Hiểu được vì sao từng bước có mặt là đã nắm 80% training loop. Video sau mình sẽ viết nốt phần code còn lại.
