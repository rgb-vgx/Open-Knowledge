---
title: 'Viết các hàm train_step và test_step dùng chung'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 156
status: edited
source: '156 - Creating Training and Testing loop Functions.md'
categories:
- AI
tags: []
---

# 🔁 Viết các hàm `train_step` và `test_step` dùng chung

> Nguồn: `156 - Creating Training and Testing loop Functions.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32748164)

Ta sẽ viết lại hai hàm **`train_step`** và **`test_step`** — lần này cho custom dataset, nhưng vì thiết kế ban đầu đã **generic** nên gần như không đổi. Viết một lần, gọi được cho nhiều model và data loader.

### 🎯 Thiết kế generic

* `train_step(model, dataloader, loss_fn, optimizer, device)` — huấn luyện model trên dataloader.
* `test_step(model, dataloader, loss_fn, device)` — đánh giá model, **không** cần optimizer vì không tối ưu gì cả.

### 🔥 Hàm `train_step`

```python
def train_step(model, dataloader, loss_fn, optimizer, device):
    model.train()  # bật train mode
    train_loss, train_acc = 0, 0

    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        # 1. Forward pass
        y_pred = model(X)

        # 2. Tính loss
        loss = loss_fn(y_pred, y)
        train_loss += loss.item()

        # 3. Optimizer zero grad
        optimizer.zero_grad()

        # 4. Backpropagation
        loss.backward()

        # 5. Optimizer step
        optimizer.step()

        # Tính accuracy
        y_pred_class = torch.argmax(torch.softmax(y_pred, dim=1), dim=1)
        train_acc += (y_pred_class == y).sum().item() / len(y_pred)

    # Chia trung bình theo số batch
    train_loss = train_loss / len(dataloader)
    train_acc = train_acc / len(dataloader)
    return train_loss, train_acc
```

Đây chính là "bài ca tối ưu PyTorch" quen thuộc: **forward → loss → zero_grad → backward → step**. Accuracy tính bằng cách lấy `argmax` trên `softmax`, so sánh với nhãn thật, đếm số đúng rồi chia cho tổng.

### 🔥 Hàm `test_step`

```python
def test_step(model, dataloader, loss_fn, device):
    model.eval()
    test_loss, test_acc = 0, 0

    with torch.inference_mode():
        for batch, (X, y) in enumerate(dataloader):
            X, y = X.to(device), y.to(device)

            test_pred_logits = model(X)
            loss = loss_fn(test_pred_logits, y)
            test_loss += loss.item()

            test_pred_labels = torch.argmax(torch.softmax(test_pred_logits, dim=1), dim=1)
            test_acc += (test_pred_labels == y).sum().item() / len(test_pred_labels)

    test_loss = test_loss / len(dataloader)
    test_acc = test_acc / len(dataloader)
    return test_loss, test_acc
```

Điểm khác biệt so với train:

* **`model.eval()`** — chuyển sang eval mode.
* **`torch.inference_mode()`** — tắt các thứ không cần khi đánh giá, như theo dõi gradient.
* **Không** có `zero_grad`/`backward`/`step` — không tối ưu.

### 💡 Có cần `softmax` trước `argmax` không?

Mình lưu ý một điểm hay: **không bắt buộc**. `argmax` của **logit** thô và `argmax` của `softmax(logit)` cho cùng kết quả, vì softmax đơn điệu tăng. Ta dùng `softmax` chỉ để đầy đủ (có được **xác suất dự đoán**). Các bạn thử bỏ `softmax` xem kết quả có giống không.

### ✅ Tạm kết

Hai hàm đã xong trong khoảng 10 phút — nhanh hơn hẳn so với lần đầu ở section trước. Thử thách bài sau: gộp `train_step` + `test_step` thành một hàm **`train`** nhận số `epoch` cùng model, hai dataloader, loss, optimizer, device và lặp qua các epoch. Các bạn thử trước nhé; bài sau mình làm cùng.
