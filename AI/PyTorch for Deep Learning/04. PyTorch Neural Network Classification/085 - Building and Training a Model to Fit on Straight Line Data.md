---
title: 'Dựng và train model để fit dữ liệu đường thẳng'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 85
status: edited
source: '085 - Building and Training a Model to Fit on Straight Line Data.md'
categories:
- AI
tags: []
---

# 📏 Dựng và train model để fit dữ liệu đường thẳng

> Nguồn: `085 - Building and Training a Model to Fit on Straight Line Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32865820)

Mục tiêu: kiểm tra kiến trúc model có **khả năng học** thứ gì đó không. Nhưng model hiện tại nhận **2 feature** (dữ liệu vòng tròn), còn dữ liệu đường thẳng chỉ có **1 feature**. Vậy phải chỉnh shape — và đây đúng là chỗ lỗi input/output hay xuất hiện nhất (mình cũng sai hoài).

### 🧱 `ModelV2`: cùng kiến trúc, khác `in_features`

Dùng luôn `nn.Sequential` cho nhanh, vì model lần này đơn giản:

```python
# Same architecture as model_1 but using nn.Sequential
model_2 = nn.Sequential(
    nn.Linear(in_features=1, out_features=10),
    nn.Linear(in_features=10, out_features=10),
    nn.Linear(in_features=10, out_features=1)
).to(device)

model_2
```

Chỉ đổi mỗi `in_features=1` (vì `X_train_regression` có 1 feature), `out_features` vẫn là **1** để ra một con số dự đoán. Giữa hai lớp có **10 → 10** cho khớp shape. `nn.Sequential` đơn giản là đẩy dữ liệu qua từng lớp theo thứ tự — mỗi lớp tự gọi `forward` nội bộ của nó (với `nn.Linear` là phép linear transformation).

### ⚖️ Loss và optimizer cho regression

```python
# Create loss function
loss_fn = nn.L1Loss()  # MAE — phù hợp regression

# Create optimizer
optimizer = torch.optim.SGD(params=model_2.parameters(),
                            lr=0.1)
```

Khác biệt so với classification: dùng **`nn.L1Loss`** (mean absolute error) vì đây là **regression** — dự đoán một con số, không phải một class. Optimizer vẫn là **SGD**, `lr=0.1`.

### 🏋️ Loop train/test

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

epochs = 1000

# Put data on the target device
X_train_regression, y_train_regression = X_train_regression.to(device), y_train_regression.to(device)
X_test_regression, y_test_regression = X_test_regression.to(device), y_test_regression.to(device)

for epoch in range(epochs):
    ### Training
    y_pred = model_2(X_train_regression)  # forward pass
    loss = loss_fn(y_pred, y_train_regression)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    ### Testing
    model_2.eval()
    with torch.inference_mode():
        test_pred = model_2(X_test_regression)
        test_loss = loss_fn(test_pred, y_test_regression)

    if epoch % 100 == 0:
        print(f"Epoch: {epoch} | Loss: {loss:.5f} | Test loss: {test_loss:.5f}")
```

So với loop classification, điểm khác:

* **Không có accuracy** — regression không tính accuracy phần trăm.
* **Không có sigmoid/round** — regression xuất thẳng con số.
* `loss_fn(y_pred, y_train)` — ở đây prediction đã là output cuối, không cần logits vì `L1Loss` không đòi hỏi gì đặc biệt.

Một loop optimization gói gọn trong chục dòng — trước đây mình mất cả một buổi để viết lần đầu.

### 📉 Loss đi xuống — model học được!

Chạy lên, **loss giảm rõ rệt** ở cả train lẫn test. Điều đó xác nhận: kiến trúc model **có khả năng học**. Nếu thử hạ learning rate xuống **0.01**, loss trên test còn xuống thấp hơn nữa. Các bạn nên tự nghịch với learning rate và mọi thứ đã thay đổi — đó là cách học nhanh nhất về machine learning.

Vậy thủ phạm trên dữ liệu vòng tròn không phải code train. Thử thách cuối bài: dùng `plot_predictions` để vẽ prediction của model vừa train (nhớ bật **inference mode**), xem các chấm đỏ dự đoán có nằm sát các chấm xanh không. Bài sau mình làm cùng nhau.
