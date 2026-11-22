---
title: 'Train model phi tuyến đầu tiên và debug lỗi shape'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 89
status: edited
source: '089 - Writing Training and Testing Code for Our First Non-Linear Model.md'
categories:
- AI
tags: []
---

# 🚀 Train model phi tuyến đầu tiên và debug lỗi shape

> Nguồn: `089 - Writing Training and Testing Code for Our First Non-Linear Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32869496)

Thử thách TensorFlow Playground ở bài trước đáng giá vô cùng: khi đổi activation từ **linear** sang **ReLU**, loss tụt gần như **tức thì** — train loss về 0, test loss cũng sát 0. Nhìn đường loss đi xuống là một trong những cảnh đẹp nhất của machine learning.

### 🎛️ Learning rate qua con mắt Playground

Mình thử nghịch learning rate:

* **Nhỏ** → loss giảm rất chậm, cần nhiều epoch mới nhích.
* **Lớn gấp nhiều lần** → hội tụ nhanh hơn hẳn, có thể về 0 trong **dưới 100 epoch**.

Đây là minh họa trực quan cho sức mạnh của **learning rate**. Giờ mang nó vào code PyTorch.

### ⚖️ Loss và optimizer

```python
# Setup loss and optimizer
loss_fn = nn.BCEWithLogitsLoss()  # binary classification
optimizer = torch.optim.SGD(params=model_3.parameters(),
                            lr=0.1)
```

Binary classification (đỏ/xanh) → **BCEWithLogitsLoss**. Ví dụ khác về binary classification ngoài đời: email spam/không spam, thẻ tín dụng gian lận/không, bảo hiểm — ai có lỗi trong tai nạn hay không.

### 🔍 Vì sao ReLU "rẻ"?

Xem `model_3.state_dict()` — chỉ có `weight` và `bias` của **layer 1, 2, 3**; **ReLU không có parameter nào**.

ReLU định nghĩa là `max(0, x)`: input âm thì `max(0, số âm)` ra 0; input dương thì giữ nguyên. Không có trọng số để chỉnh, nên **không tốn compute để cập nhật**. Đó là lý do nó hiệu quả. Mỗi parameter trong model đều cần tính toán để điều chỉnh — càng nhiều parameter càng nhiều compute. Đánh đổi kinh điển: nhiều parameter → *có thể* học tốt hơn, nhưng cần nhiều compute hơn.

### 🏋️ Training loop

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

epochs = 1000

X_train, y_train = X_train.to(device), y_train.to(device)
X_test, y_test = X_test.to(device), y_test.to(device)

for epoch in range(epochs):
    ### Training
    model_3.train()

    # 1. Forward pass
    y_logits = model_3(X_train).squeeze()
    y_pred = torch.round(torch.sigmoid(y_logits))  # logits -> probs -> labels

    # 2. Calculate loss/accuracy
    loss = loss_fn(y_logits, y_train)
    acc = accuracy_fn(y_true=y_train, y_pred=y_pred)

    # 3. Optimizer zero grad
    optimizer.zero_grad()
    # 4. Backpropagation
    loss.backward()
    # 5. Gradient descent
    optimizer.step()

    ### Testing
    model_3.eval()
    with torch.inference_mode():
        test_logits = model_3(X_test).squeeze()
        test_pred = torch.round(torch.sigmoid(test_logits))
        test_loss = loss_fn(test_logits, y_test)
        test_acc = accuracy_fn(y_true=y_test, y_pred=test_pred)

    if epoch % 100 == 0:
        print(f"Epoch: {epoch} | Loss: {loss:.4f}, Acc: {acc:.2f}% | "
              f"Test loss: {test_loss:.4f}, Test acc: {test_acc:.2f}%")
```

Vẫn chuỗi quen thuộc: **logits → probabilities (sigmoid) → labels (round)**. Loss nhận **logits**; accuracy nhận **labels**.

### 🐛 Debug ngay trên đường chạy

Chạy lên, gặp vài lỗi thật:

1. **`AttributeError`** — mình gõ `torch.manuals_eed` thay vì `torch.manual_seed`. Typo kinh điển.
2. **`ValueError: Target size ... must be the same as input size`** — lỗi shape. Kiểm tra:

```python
test_logits.shape, y_test.shape
# torch.Size([200, 1]), torch.Size([200])
```

À, **thiếu `.squeeze()` trên `test_logits`**! Lúc train mình có `squeeze()` nên chạy được, nhưng phần test thì quên. Chiều thừa `1` khiến `[200, 1]` không khớp với `[200]`. Thêm `.squeeze()` vào là xong.

Đúng như mình nói từ đầu module: **lỗi shape là lỗi phổ biến nhất trong deep learning**. Và cũng đúng như mình nhắc suốt mấy bài trước: nhớ `squeeze()`.

### 📈 Kết quả: accuracy đi lên

Sau khi sửa, **accuracy tăng** — chưa hoàn hảo (chưa về 100%), loss còn cần thấp hơn, nhưng rõ ràng model hoạt động tốt hơn hẳn. Tất cả chỉ nhờ thêm **hai lớp ReLU** — cho model sức mạnh của **cả đường thẳng lẫn đường cong**.

Bài sau mình vẽ **decision boundary** để xem model có thật sự tách được hai vòng tròn không.
