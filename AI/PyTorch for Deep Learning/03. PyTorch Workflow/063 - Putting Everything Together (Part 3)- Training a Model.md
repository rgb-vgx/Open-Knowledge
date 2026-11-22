---
title: 'Bài 63 — Ghép mọi thứ lại (Phần 3): Train model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 63
status: edited
source: '063 - Putting Everything Together (Part 3)- Training a Model.md'
categories:
- AI
tags: []
---

# 🏋️ Ghép mọi thứ lại (Phần 3): Train model

> Nguồn: `063 - Putting Everything Together (Part 3)- Training a Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32763708)

Model V2 dùng `nn.Linear` đã sẵn sàng. Giờ viết training code cho nó, có device-agnostic từ đầu. Đây là chỗ mình gặp một lỗi kinh điển của PyTorch — và rất đáng gặp, vì sau này bạn chắc chắn sẽ gặp lại.

### 📦 Đưa model lên device

```python
next(model_1.parameters()).device   # cpu

model_1.to(device)
next(model_1.parameters()).device   # cuda
```

`model_1.to(device)` chuyển model lên GPU (nếu có). Lúc này `model_1` có `weight`/`bias` nằm trong linear layer.

---

### ⚖️ Loss và optimizer

```python
loss_fn = nn.L1Loss()
optimizer = torch.optim.SGD(params=model_1.parameters(), lr=0.01)
```

Vẫn bài toán regression nên `L1Loss` (MAE). Optimizer vẫn `SGD`, nhưng nhớ truyền `params` trước — mình suýt quên. `Adam` cũng là lựa chọn phổ biến, dùng sau.

`lr` quyết định bước lớn hay nhỏ: `0.001` là bước nhỏ, `0.1` là bước lớn. Quá lớn thì model "nổ", quá nhỏ thì mãi không học được gì.

---

### 🔥 Training + testing loop

```python
torch.manual_seed(42)
epochs = 200

for epoch in range(epochs):
    ### Training
    model_1.train()

    y_pred = model_1(X_train)
    loss = loss_fn(y_pred, y_train)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    ### Testing
    model_1.eval()

    with torch.inference_mode():
        test_pred = model_1(X_test)
        test_loss = loss_fn(test_pred, y_test)

    if epoch % 10 == 0:
        print(f"Epoch: {epoch} | Train loss: {loss} | Test loss: {test_loss}")
```

Vẫn đúng thứ tự: forward → loss → zero_grad → backward → step, kèm eval + inference mode khi test.

---

### 💥 Lỗi kinh điển: "Expected all tensors to be on the same device"

Chạy lần đầu sẽ báo `RuntimeError: Expected all tensors to be on the same device, but found at least two devices, cuda and cpu!`.

Lý do: model đã được đưa lên **GPU**, nhưng `X_train`, `y_train` vẫn nằm trên **CPU**. PyTorch bắt buộc mọi thứ tham gia phép tính phải cùng một device — ngoài lỗi shape, đây là lỗi phổ biến nhất.

Cách sửa: viết device-agnostic code cho **dữ liệu**:

```python
X_train = X_train.to(device)
y_train = y_train.to(device)
X_test = X_test.to(device)
y_test = y_test.to(device)
```

Có GPU thì chạy CUDA, không có thì tự lùi về CPU — code vẫn chạy được ở cả hai nơi.

---

### 📉 Kết quả sau 200 epoch

* Train loss và test loss đều giảm mạnh, hai đường bám sát nhau.
* `weight ≈ 0.6968` (gần `0.7`).
* `bias ≈ 0.3025` (gần `0.3`).

Model tự tìm ra tham số chỉ kém giá trị thật chút xíu. Ngoài đời bạn thường không biết giá trị thật, nhưng đây là ví dụ minh họa model đang làm gì.

---

### ✅ Tạm kết

Chúc mừng — đã train model thứ hai với đầy đủ device-agnostic code. Bài tập: tự dự đoán, vẽ lại bằng `plot_predictions` và xem chấm đỏ khớp chấm xanh lá đến đâu. Bài sau mình sẽ làm đúng việc đó.
