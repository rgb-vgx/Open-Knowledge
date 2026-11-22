---
title: 'Bài 55 — Chạy training loop từng epoch và xem điều gì xảy ra'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 55
status: edited
source: '055 - Running Our Training Loop Epoch by Epoch and Seeing What Happens.md'
categories:
- AI
tags: []
---

# 🏃 Chạy training loop từng epoch và xem điều gì xảy ra

> Nguồn: `055 - Running Our Training Loop Epoch by Epoch and Seeing What Happens.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719894)

Đây là lúc thực sự thấy gradient descent chạy. Mình sẽ chạy training loop từng epoch, in loss và `state_dict()` ra để xem tham số nhích dần về đâu. Chỉ khoảng mười lần chạy thôi mà đã đủ phấn khích.

### 🎲 Chuẩn bị lại model

```python
torch.manual_seed(42)
model_0 = LinearRegressionModel()
model_0.state_dict()
```

Ra giá trị ngẫu nhiên, ví dụ `weight ≈ 0.3367`, `bias ≈ 0.1288`. Nếu máy bạn ra số hơi khác cũng không sao — quan trọng là **hướng di chuyển**, không phải giá trị tuyệt đối.

Dự đoán lúc này vẫn tệ, vì tham số còn ngẫu nhiên. Loss function và optimizer vẫn là `L1Loss` + `SGD` với `lr=0.01` — bước khá lớn.

---

### 🔁 Chạy một epoch

Chạy đúng vòng lặp ở bài 53, in loss và tham số:

```python
print(loss)
print(model_0.state_dict())
```

Sau epoch đầu: `loss ≈ 0.301`, `weight ≈ 0.3445`, `bias ≈ 0.1488`.

Loss giảm, tham số nhích về gần giá trị thật (`0.7` và `0.3`). Lại chạy tiếp vài lần:

* Loss tiếp tục giảm.
* `weight` và `bias` tiếp tục tiến sát giá trị lý tưởng.

Mình hứng khởi lắm — đây là model machine learning đầu tiên tự tay train đấy. Nhỏ thôi nhưng quan trọng.

---

### 📉 Đo tiến bộ bằng loss

Lưu ý: ngoài đời bạn thường **không biết** giá trị đúng là bao nhiêu. Vậy đo tiến bộ thế nào? Bằng **loss value** — càng thấp càng tốt. Loss giảm nghĩa là model đang đi đúng hướng.

Khoảng mười lần chạy, mình kéo loss xuống dưới `0.1`. Từng bước nhỏ nhưng đều đặn.

---

### 🎯 Thử dự đoán lại

```python
with torch.inference_mode():
    y_preds_new = model_0(X_test)

plot_predictions(predictions=y_preds_new)
```

Trước đó chấm đỏ lệch hẳn một phía. Sau vài epoch, chấm đỏ **đã tiến gần chấm xanh lá rõ rệt**. Đó chính là backpropagation và gradient descent đang hoạt động — khái niệm trước đây chỉ là lý thuyết giờ thấy thành kết quả.

---

### 🧗 Gradient descent nhìn từ đường cong loss

Ta bắt đầu ở một điểm trên đường cong, đo gradient, rồi bước ngược hướng gradient về phía đáy. Khi gradient của `weight` nhỏ dần thì cost function (còn gọi là `J`, cũng là loss function) cũng nhỏ dần. PyTorch đo gradient giúp mình — không phải làm tay.

---

### ✅ Thử thách

Đổi `epochs = 100`, chạy lại, xem loss xuống được bao thấp, rồi dự đoán và vẽ lại. Đây là bài tập rất đáng làm trước khi chuyển sang testing loop — phần viết code đánh giá model sẽ có ở bài sau.
