---
title: 'Train model nâng cấp: thêm layer liệu có khá hơn?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 83
status: edited
source: '083 - Writing Training and Testing Code to See if Our Upgraded Model Perform.md'
categories:
- AI
tags: []
---

# 🧪 Train model nâng cấp: thêm layer liệu có khá hơn?

> Nguồn: `083 - Writing Training and Testing Code to See if Our Upgraded Model Perform.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32865814)

`CircleModelV1` đã có: thêm hidden unit (5 → 10), thêm một layer, và sắp train tới **1000 epoch**. Lý thuyết phía sau: nhiều neuron, nhiều layer nghĩa là **nhiều con số để chỉnh hơn**, cho model nhiều cơ hội biểu diễn dữ liệu. Nhìn `state_dict()` của V1 so với V0 là thấy số parameter phình lên rõ rệt.

### 🎛️ Loss function và optimizer

Dùng lại y nguyên:

```python
# Create a loss function
loss_fn = nn.BCEWithLogitsLoss()

# Create an optimizer
optimizer = torch.optim.SGD(params=model_1.parameters(),
                            lr=0.1)
```

Chú ý: `params=model_1.parameters()` — **model mới thì phải truyền parameter của model mới**. `lr=0.1` giữ như cũ để càng ít biến càng tốt (dù có thể 0.1 hơi lớn).

### 🏋️ Setup và loop

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

epochs = 1000  # fit longer

X_train, y_train = X_train.to(device), y_train.to(device)
X_test, y_test = X_test.to(device), y_test.to(device)

for epoch in range(epochs):
    ### Training
    model_1.train()

    # 1. Forward pass
    y_logits = model_1(X_train).squeeze()  # squeeze bỏ chiều thừa
    y_pred = torch.round(torch.sigmoid(y_logits))  # logits -> probs -> labels

    # 2. Calculate loss/accuracy
    loss = loss_fn(y_logits, y_train)  # BCEWithLogitsLoss cần logits
    acc = accuracy_fn(y_true=y_train, y_pred=y_pred)

    # 3. Optimizer zero grad
    optimizer.zero_grad()
    # 4. Loss backward
    loss.backward()
    # 5. Optimizer step
    optimizer.step()

    ### Testing
    model_1.eval()
    with torch.inference_mode():
        test_logits = model_1(X_test).squeeze()
        test_pred = torch.round(torch.sigmoid(test_logits))
        test_loss = loss_fn(test_logits, y_test)
        test_acc = accuracy_fn(y_true=y_test, y_pred=test_pred)

    # Print out what's happening every 100 epochs
    if epoch % 100 == 0:
        print(f"Epoch: {epoch} | Loss: {loss:.5f}, Acc: {acc:.2f}% | "
              f"Test loss: {test_loss:.5f}, Test acc: {test_acc:.2f}%")
```

Các bạn để ý: phần lớn code **giống hệt** loop của `model_0`, chỉ đổi tên biến model và số epoch, in mỗi **100 epoch**. Mình cố tình gõ lại từ đầu thay vì hàm hóa, để luyện phản xạ các bước trước khi đóng gói thành hàm sau này.

Lại nhắc: đừng lo nếu loss/accuracy trên máy bạn không khớp tuyệt đối với máy mình — tính ngẫu nhiên là bản chất của machine learning. Điều cần quan tâm là **xu hướng**.

### 😤 Kết quả: vẫn như tung đồng xu

1000 epoch, thêm một layer, gấp đôi hidden unit — và accuracy vẫn **quanh 50%**. Model vẫn không học được gì trên dataset vòng tròn này.

### 🖼️ Vẽ lại decision boundary

```python
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.title("Train")
plot_decision_boundary(model_1, X_train, y_train)
plt.subplot(1, 2, 2)
plt.title("Test")
plot_decision_boundary(model_1, X_test, y_test)
```

Kết quả vẫn là **một đường thẳng** cắt đôi dữ liệu — y như `model_0`. To hơn, sâu hơn, train lâu hơn… vẫn là đường thẳng. Vì model cấu tạo từ **`nn.Linear`** — mà linear thì mãi là **tuyến tính**, chồng bao nhiêu lớp tuyến tính vẫn ra một biểu diễn tuyến tính. Trong khi dữ liệu vòng tròn là **non-linear**.

Đây là lúc bực mình thật. Train model mà nó không học được gì thì rất ức chế — mình cũng từng như vậy nhiều lần.

### 🎯 Thử thách: kiểm chứng model có học được gì không

Trước khi kết luận model "vô dụng", cần chắc nó **có khả năng học** ít nhất một thứ gì đó. Mình gợi ý: lấy lại **dataset đường thẳng** mình đã tạo trong notebook *PyTorch Workflow Fundamentals* (phần 01), rồi viết code để fit chính `model_1` vào đó. Nếu model học được dữ liệu đường thẳng thì vấn đề không nằm ở code train, mà ở chỗ: **model thiếu thứ gì đó để học dữ liệu phi tuyến**. Thử đi, rồi xem bài sau.
