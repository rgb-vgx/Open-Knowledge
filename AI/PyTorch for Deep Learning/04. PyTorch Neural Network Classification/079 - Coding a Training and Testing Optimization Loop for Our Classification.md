---
title: 'Bài 79 — Code training loop và testing loop cho model phân loại'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 79
status: edited
source: '079 - Coding a Training and Testing Optimization Loop for Our Classification.md'
categories:
- AI
tags: []
---

# 🔁 Code training loop và testing loop cho model phân loại

> Nguồn: `079 - Coding a Training and Testing Optimization Loop for Our Classification.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820616)

Đã có model, loss function, optimizer và hàm accuracy. Giờ ghép tất cả thành **training loop**. Notebook bị ngắt kết nối sau giờ nghỉ, nên mình **Run all** các cell phía trên trước. Kiểm tra GPU vẫn còn đó bằng `device` (ra `cuda`) và `!nvidia-smi` (Colab cấp cho mình một **Tesla P100** — quá đã).

### 🌱 Seed cho tái lập

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)  # nếu chạy trên CUDA
```

Mình dùng số yêu thích **42**. Có hai loại seed: `torch.manual_seed` cho PyTorch chung và `torch.cuda.manual_seed` cho phép toán trên CUDA. Đặt cả hai để cố gắng tái lập được kết quả. Nhưng các bạn đừng ám ảnh chuyện số trên máy mình phải khớp y hệt máy các bạn — điều quan trọng hơn là **xu hướng** loss đi xuống hay đi lên.

---

### 📦 Đưa dữ liệu lên device

```python
# Put data on the target device
X_train, y_train = X_train.to(device), y_train.to(device)
X_test, y_test = X_test.to(device), y_test.to(device)
```

Model nằm trên GPU thì dữ liệu cũng phải nằm trên GPU, nếu không sẽ lỗi. Code viết theo hướng **device-agnostic** nên chạy đâu cũng được.

---

### 🏋️ Phần training

```python
epochs = 100

for epoch in range(epochs):
    ### Training
    model_0.train()  # train mode (default)

    # 1. Forward pass
    y_logits = model_0(X_train).squeeze()
    y_pred = torch.round(torch.sigmoid(y_logits))  # logits -> probs -> labels

    # 2. Calculate loss/accuracy
    loss = loss_fn(y_logits, y_train)  # BCEWithLogitsLoss expects raw logits
    acc = accuracy_fn(y_true=y_train, y_pred=y_pred)

    # 3. Optimizer zero grad
    optimizer.zero_grad()

    # 4. Loss backward (backpropagation)
    loss.backward()

    # 5. Optimizer step (gradient descent)
    optimizer.step()
```

Điểm khác biệt quan trọng so với phần regression: mình truyền **`y_logits`** chứ không phải `y_pred` vào `loss_fn`. Vì `BCEWithLogitsLoss` **nhận logits thô**.

Nếu đang dùng `nn.BCELoss` (không có "with logits"), phải tự gọi sigmoid trước:

```python
# loss_fn_alt = nn.BCELoss()
# loss = loss_fn_alt(torch.sigmoid(y_logits), y_train)
```

Lý do mình chọn bản "with logits": theo tài liệu PyTorch, nó gộp sigmoid và BCE vào một lớp, **ổn định số học hơn** nhờ log-sum-exp trick.

Hàm `accuracy_fn` là hàm Python thuần mình tự viết, nhét thẳng vào loop được — đúng chất Python của PyTorch.

---

### 🧪 Phần testing

```python
    ### Testing
    model_0.eval()  # eval mode for testing/inference
    with torch.inference_mode():
        # 1. Forward pass
        test_logits = model_0(X_test).squeeze()
        test_pred = torch.round(torch.sigmoid(test_logits))  # logits -> probs -> labels

        # 2. Calculate test loss/accuracy
        test_loss = loss_fn(test_logits, y_test)
        test_acc = accuracy_fn(y_true=y_test, y_pred=test_pred)
```

Khi test thì chuyển sang **eval mode** và bọc trong **`torch.inference_mode()`** — đang inference nên không cần gradient.

---

### ⚠️ Thứ tự tham số: cẩn thận!

Đây là chỗ dễ sai nhất:

* **Loss function** (`torch.nn`): **prediction trước, label thật sau** — `loss_fn(y_logits, y_train)`.
* **Hàm accuracy mình viết**: **label thật trước, prediction sau** — `accuracy_fn(y_true, y_pred)`.

Không phải mình cố làm rối. Mình đặt `accuracy_fn` theo thứ tự của **scikit-learn** (`accuracy_score(y_true, y_pred)`) vì gói metrics của scikit-learn rất tiện. Còn loss function của PyTorch lại ngược lại. Nhớ kỹ hai thứ tự này.

---

### 🖨️ In kết quả mỗi 10 epoch

Với 100 epoch, in mỗi epoch thì quá dài, nên in **mỗi 10 epoch**:

```python
    if epoch % 10 == 0:
        print(f"Epoch: {epoch} | Loss: {loss:.5f}, Accuracy: {acc:.2f}% | "
              f"Test loss: {test_loss:.5f}, Test acc: {test_acc:.2f}%")
```

`loss`/`test_loss` in 5 chữ số thập phân, accuracy in 2 chữ số kèm dấu **%** — tức phần trăm dự đoán đúng trên train và test.

Code khá dài và chắc chắn sẽ có vài lỗi gõ tay. Thử thách của mình: các bạn tự chạy và sửa trước. Bài sau mình cùng debug và train model phân loại đầu tiên.
