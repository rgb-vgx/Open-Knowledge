---
title: 'Bài 53 — Viết code cho training loop PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 53
status: edited
source: '053 - Writing Code for a PyTorch Training Loop.md'
categories:
- AI
tags: []
---

# ✍️ Viết code cho training loop PyTorch

> Nguồn: `053 - Writing Code for a PyTorch Training Loop.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32713318)

Bài trước mình nói sẽ có nhiều code mà chưa viết được, vì phải giải thích các bước trước. Giờ thì viết thật. Đây đúng là phần cốt lõi của cách model học, nên đáng để dành thời gian. Sau này mình có thể gói nó thành hàm cho gọn, nhưng lần này viết tay từng dòng.

### 1️⃣ Forward pass

Học pattern trên training data, sau đó đánh giá trên test data. Vì vậy forward pass lúc train dùng `X_train`:

```python
y_pred = model_0(X_train)
```

`y_pred` là dự đoán của model trên tập train.

---

### 2️⃣ Tính loss

```python
loss = loss_fn(y_pred, y_train)
```

`loss_fn` là `L1Loss`. Công thức không đổi dù có 10 hay 10.000 điểm: đo khoảng cách rồi lấy trung bình.

Về thứ tự tham số: theo tài liệu `torch.nn` loss functions, **input (predictions) trước, target (labels) sau**. Với MAE thì đảo thứ tự cũng không ảnh hưởng kết quả, nhưng mình giữ đúng docs cho cả khóa.

---

### 3️⃣ `optimizer.zero_grad()`

Bước này dễ thắc mắc nhất. Mặc định, gradient do optimizer tính ra sẽ **tích lũy** qua các vòng lặp. Nếu không reset, đến vòng sau nó cộng dồn vào giá trị cũ, cứ thế tăng mãi.

`zero_grad()` đưa gradient về 0 để mỗi vòng lặp bắt đầu lại từ đầu. Vì sao PyTorch chọn cơ chế tích lũy? Nghe nói liên quan tới hiệu quả tính toán, nhưng đó là chi tiết rất sâu trong tài liệu; điều cần nhớ là **phải zero**.

---

### 4️⃣ `loss.backward()` — backpropagation

```python
loss.backward()
```

Tính gradient của loss **theo từng tham số của model**. Đây là backpropagation, phần "lan truyền ngược".

---

### 5️⃣ `optimizer.step()` — gradient descent

```python
optimizer.step()
```

Optimizer dùng gradient vừa có để chỉnh tham số. Đây là lúc gradient descent chạy.

---

### 🔄 Ráp lại thành vòng lặp

```python
epochs = 1

for epoch in range(epochs):
    ### Training
    model_0.train()

    # 1. Forward pass
    y_pred = model_0(X_train)

    # 2. Calculate loss
    loss = loss_fn(y_pred, y_train)

    # 3. Optimizer zero grad
    optimizer.zero_grad()

    # 4. Perform backpropagation
    loss.backward()

    # 5. Step the optimizer
    optimizer.step()
```

Thứ tự: forward pass và loss luôn đi đầu; `optimizer.step()` phải sau `loss.backward()`. Còn `zero_grad()` đặt trước backward để gradient sạch sẽ. Giữ đúng thứ tự này là chạy được.

Có một chút mơ hồ về vị trí chính xác của `zero_grad()` trong vòng lặp, nhưng cách sắp xếp trên là cách mình dùng và nó hoạt động.

---

### 🎵 Mẹo nhớ bài

Có một bài hát gọi là "unofficial PyTorch optimization loop song" của chính Daniel, hát theo nhịp: *forward pass, calculate the loss, optimizer zero grad, loss backward, optimizer step, step, step*. Kỳ quặc nhưng hiệu quả — mình vẫn dùng nó để nhớ thứ tự.

---

### ✅ Tạm kết

Bài tập cho các bạn: **tự gõ lại training loop, chạy thử xem chuyện gì xảy ra**. Chưa cần testing loop, cứ comment phần đó lại. Nếu muốn thêm, xem trước hai video về backpropagation và gradient descent. Bài sau mình sẽ đi từng bước một lần nữa.
