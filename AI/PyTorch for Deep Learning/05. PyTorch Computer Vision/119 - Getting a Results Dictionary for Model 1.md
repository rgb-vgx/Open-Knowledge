---
title: 'Bài 119 — Lấy dictionary kết quả cho Model 1'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 119
status: edited
source: '119 - Getting a Results Dictionary for Model 1.md'
categories:
- AI
tags: []
---

# 📋 Lấy dictionary kết quả cho Model 1

> Nguồn: `119 - Getting a Results Dictionary for Model 1.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920346)

Để so sánh các model, mỗi model cần một dictionary kết quả cùng cấu trúc. Model 0 đã có, giờ tạo cho Model 1 — và trong lúc làm sẽ vấp đúng cái bẫy **device mismatch** kinh điển.

### 📊 Tạo kết quả

```python
model_1_results = eval_model(
    model=model_1,
    data_loader=test_dataloader,
    loss_fn=loss_fn,
    accuracy_fn=accuracy_fn,
)
```

Nhìn code thì đúng. Nhưng chạy thì lỗi:

```text
RuntimeError: Expected all tensors to be on the same device, but found at least two devices, cuda:0 and cpu!
```

### 🐛 Vì sao? (Và vì sao lỗi này khó thấy)

Model 1 nằm trên **CUDA**, nhưng dữ liệu lấy từ `test_dataloader` vẫn ở **CPU**. Khi forward pass, PyTorch cố nhân ma trận giữa hai tensor khác thiết bị → nổ.

Ngành này có câu: *deep learning models fail silently* — nhiều lỗi không báo rõ ràng. Đây là một ví dụ: code trông y hệt bản chạy được, chỉ khác ngữ cảnh device.

Ba lỗi lớn nhất khi làm deep learning, đáng nhớ:

1. **Shape mismatch**
2. **Device mismatch** — chính là ca này
3. **Dtype mismatch** — dữ liệu sai kiểu

### 🔧 Sửa `eval_model`

Ta đã làm đúng việc này trong `train_step`/`test_step`, chỉ là quên trong `eval_model`. Thêm hai thứ:

```python
def eval_model(model, data_loader, loss_fn, accuracy_fn, device=device):
    """Returns a dictionary containing the results of model predicting on data_loader."""
    loss, acc = 0, 0
    model.eval()
    with torch.inference_mode():
        for X, y in data_loader:
            X, y = X.to(device), y.to(device)

            y_pred = model(X)
            loss += loss_fn(y_pred, y)
            acc += accuracy_fn(y_true=y, y_pred=y_pred.argmax(dim=1))

        loss /= len(data_loader)
        acc /= len(data_loader)

    return {
        "model_name": model.__class__.__name__,
        "model_loss": loss.item(),
        "model_acc": acc,
    }
```

Hai thay đổi:

* Thêm tham số `device=device`.
* Thêm `X, y = X.to(device), y.to(device)` — đưa dữ liệu lên cùng thiết bị với model.

Chạy lại cell gọi `eval_model` là xong.

### 📈 So sánh nhanh

Sau khi có `model_1_results`, đặt cạnh `model_0_results`:

* Baseline Model 0 vẫn **nhỉnh hơn** Model 1.
* Nhưng khoảng cách không lớn.

Điều này củng cố nhận định ở bài trước: với bài này, thêm ReLU chưa giúp gì.

Nếu số của bạn lệch vài chữ số thập phân thì bình thường — do tính ngẫu nhiên. Nếu lệch cả chục điểm accuracy thì nên kiểm tra lại cell đã chạy đúng chưa.

### 💡 Bài học

Bất cứ khi nào đưa model lên GPU, hãy chắc chắn **mọi tensor đi vào model cũng được đưa lên cùng device**. Viết một lần trong hàm rồi dùng lại — đó là lý do device-agnostic code nên nằm trong các hàm helper, không rải rác khắp notebook.

### ✅ Tạm kết

Đã có `model_1_results` và một bài học xương máu về device. Baseline vẫn dẫn đầu — nghĩa là đã đến lúc mang "hàng nặng" ra: **convolutional neural network**. Bài sau mình xem tổng quan kiến trúc CNN trước khi code.
