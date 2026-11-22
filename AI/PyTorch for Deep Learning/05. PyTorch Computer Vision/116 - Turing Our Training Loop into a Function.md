---
title: 'Bài 116 — Chuyển training loop thành hàm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 116
status: edited
source: '116 - Turing Our Training Loop into a Function.md'
categories:
- AI
tags: []
---

# 🧰 Chuyển training loop thành hàm

> Nguồn: `116 - Turing Our Training Loop into a Function.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920340)

Ta đã viết training loop vài lần rồi. Function hóa không chỉ là best practice mà còn **giảm lỗi**: một khi đã có bản chạy đúng, lưu lại và gọi lại thay vì gõ lại từ đầu. Bài này mình tạo `train_step`.

### 📝 Chữ ký hàm `train_step`

Cần gì để chạy một bước train?

* `model` — model cần train
* `data_loader` — dữ liệu
* `loss_fn` — hàm tính loss
* `optimizer` — optimizer
* `accuracy_fn` — để đo accuracy (nice-to-have)
* `device` — chạy trên thiết bị nào

```python
def train_step(
    model: torch.nn.Module,
    data_loader: torch.utils.data.DataLoader,
    loss_fn: torch.nn.Module,
    optimizer: torch.optim.Optimizer,
    accuracy_fn,
    device: torch.device = device,
):
    """Performs a training step with model trying to learn on data_loader."""
    train_loss, train_acc = 0, 0

    model.train()

    for batch, (X, y) in enumerate(data_loader):
        X, y = X.to(device), y.to(device)

        y_pred = model(X)
        loss = loss_fn(y_pred, y)
        train_loss += loss
        train_acc += accuracy_fn(y_true=y, y_pred=y_pred.argmax(dim=1))

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    train_loss /= len(data_loader)
    train_acc /= len(data_loader)

    print(f"Train loss: {train_loss:.5f} | Train accuracy: {train_acc:.2f}%")
```

### 🔍 Những chỗ khác bản gốc

* **Bỏ `model_0`** — thay bằng tham số `model`, hàm dùng được cho mọi model.
* **Bỏ `train_dataloader` cứng** — thay bằng `data_loader`.
* **Thêm `X, y = X.to(device), y.to(device)`** — đưa dữ liệu lên cùng thiết bị với model. Đây là best practice bắt buộc: lệch device là lỗi runtime ngay.
* **Thêm accuracy cho training** — trước đây chỉ đo accuracy cho test, lần này cộng dồn cả `train_acc` để thấy model học tốt lên trong lúc train.
* **Bỏ print theo batch** — dời ra cuối hàm, in gọn một dòng mỗi step.

### 💡 Type hint

`model: torch.nn.Module`, `data_loader: torch.utils.data.DataLoader`, `optimizer: torch.optim.Optimizer`… Type hint không bắt buộc, nhưng giúp người đọc biết hàm mong đợi gì, và bạn sẽ thấy chúng ngày càng phổ biến trong Python hiện đại.

`device: torch.device = device` — mặc định dùng luôn biến `device` đã khai báo từ trước, nhưng vẫn có thể truyền thiết bị khác nếu muốn.

### ⚠️ Chỗ dễ sai: vị trí phép chia

Cộng dồn `train_loss` **bên trong** vòng lặp batch, chia trung bình **bên ngoài**. Nếu chia bên trong, loss sẽ bị chia nhiều lần và ra số vô nghĩa.

### 🎯 Thử thách

Tương tự cách mình vừa làm, hãy thử tự viết `test_step` từ testing loop trước đó. Gợi ý: testing loop **không cần optimizer**.

### ✅ Tạm kết

`train_step` đã sẵn sàng. Bài sau mình hoàn thiện `test_step`, để sau đó chỉ cần một vòng `for epoch in range(epochs)` gọi hai hàm này là train xong.
