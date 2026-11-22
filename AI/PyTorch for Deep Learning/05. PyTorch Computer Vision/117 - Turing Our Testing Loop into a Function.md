---
title: 'Bài 117 — Chuyển testing loop thành hàm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 117
status: edited
source: '117 - Turing Our Testing Loop into a Function.md'
categories:
- AI
tags: []
---

# 🧪 Chuyển testing loop thành hàm

> Nguồn: `117 - Turing Our Testing Loop into a Function.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920342)

Sau `train_step`, giờ đến `test_step`. Testing loop không có optimizer — chỉ đánh giá — nhưng có vài cái bẫy nhỏ về `inference_mode` và vị trí phép chia trung bình.

### 📝 Chữ ký hàm

```python
def test_step(
    model: torch.nn.Module,
    data_loader: torch.utils.data.DataLoader,
    loss_fn: torch.nn.Module,
    accuracy_fn,
    device: torch.device = device,
):
    """Performs a testing loop step on model going over data_loader."""
    test_loss, test_acc = 0, 0

    model.eval()

    with torch.inference_mode():
        for X, y in data_loader:
            X, y = X.to(device), y.to(device)

            test_pred = model(X)

            test_loss += loss_fn(test_pred, y)
            test_acc += accuracy_fn(y_true=y, y_pred=test_pred.argmax(dim=1))

        test_loss /= len(data_loader)
        test_acc /= len(data_loader)

    print(f"Test loss: {test_loss:.5f} | Test accuracy: {test_acc:.2f}%")
```

### 🔍 Ba điểm cần khớp

1. **`model.eval()`** — chuyển model sang chế độ đánh giá.
2. **`torch.inference_mode()`** — tắt autograd khi dự đoán. Inference là từ khác của "prediction"; dùng context manager này cho tốc độ và bộ nhớ tốt hơn.
3. **`pred.argmax(dim=1)`** — output thô là logit, phải chuyển sang nhãn dự đoán để `accuracy_fn` so sánh được với nhãn thật.

### ⚠️ Bẫy: phép chia phải nằm trong context manager

Hai dòng `test_loss /= len(data_loader)` và `test_acc /= len(data_loader)` phải nằm **bên trong** `with torch.inference_mode()`. Lý do: các giá trị được tạo ra trong context manager mà bị thay đổi bên ngoài có thể khiến PyTorch báo lỗi. Cứ giữ mọi thao tác liên quan trong cùng context cho an toàn.

Đây là điểm nhiều người sửa code mà quên — thử kéo hai dòng chia ra ngoài rồi chạy xem lỗi gì.

### 🧩 Ghép hai hàm thành một "optimization loop"

Từ nay, train một model chỉ còn:

```python
for epoch in tqdm(range(epochs)):
    train_step(
        model=model_1,
        data_loader=train_dataloader,
        loss_fn=loss_fn,
        optimizer=optimizer,
        accuracy_fn=accuracy_fn,
        device=device,
    )
    test_step(
        model=model_1,
        data_loader=test_dataloader,
        loss_fn=loss_fn,
        accuracy_fn=accuracy_fn,
        device=device,
    )
```

Không còn phải viết lại forward, backward, zero_grad… mỗi lần. Đây là lúc giá trị của function hóa lộ rõ.

### ✅ Tạm kết

Đã có đủ `train_step` và `test_step`. Bài sau mình dùng chúng để train Model 1 trong 3 epoch, đo thời gian trên GPU, và trả lời câu hỏi lớn: phi tuyến có giúp vượt baseline không.
