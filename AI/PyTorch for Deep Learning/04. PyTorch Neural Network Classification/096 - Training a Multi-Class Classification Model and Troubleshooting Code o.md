---
title: 'Train model multiclass và debug data type, shape trên đường chạy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 96
status: edited
source: '096 - Training a Multi-Class Classification Model and Troubleshooting Code o.md'
categories:
- AI
tags: []
---

# 🛠️ Train model multiclass và debug data type, shape trên đường chạy

> Nguồn: `096 - Training a Multi-Class Classification Model and Troubleshooting Code o.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32998126)

Bài này là một bài học **troubleshooting** thật sự — mình lần lượt đụng đủ loại lỗi kinh điển của deep learning: **data type**, **device**, **shape**, **typo biến**. Sau đó model vẫn train tốt. Đây chính là cảnh thật khi làm việc, không phải "cooking show" hoàn hảo.

### 🏋️ Training loop (bản viết đúng)

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

epochs = 100

X_blob_train, y_blob_train = X_blob_train.to(device), y_blob_train.to(device)
X_blob_test, y_blob_test = X_blob_test.to(device), y_blob_test.to(device)

for epoch in range(epochs):
    ### Training
    model_4.train()

    # 1. Forward pass
    y_logits = model_4(X_blob_train)
    y_pred = torch.softmax(y_logits, dim=1).argmax(dim=1)  # logits -> probs -> labels

    # 2. Calculate loss/accuracy
    loss = loss_fn(y_logits, y_blob_train)  # CrossEntropyLoss expects logits
    acc = accuracy_fn(y_true=y_blob_train, y_pred=y_pred)

    # 3. Optimizer zero grad
    optimizer.zero_grad()
    # 4. Backpropagation
    loss.backward()
    # 5. Gradient descent
    optimizer.step()

    ### Testing
    model_4.eval()
    with torch.inference_mode():
        test_logits = model_4(X_blob_test)
        test_pred = torch.softmax(test_logits, dim=1).argmax(dim=1)
        test_loss = loss_fn(test_logits, y_blob_test)
        test_acc = accuracy_fn(y_true=y_blob_test, y_pred=test_pred)

    if epoch % 10 == 0:
        print(f"Epoch: {epoch} | Loss: {loss:.4f}, Acc: {acc:.2f}% | "
              f"Test loss: {test_loss:.4f}, Test acc: {test_acc:.2f}%")
```

Mẹo nhỏ: thực ra **argmax của logits** cũng cho cùng kết quả với argmax của softmax (vì softmax đơn điệu). Nhưng mình vẫn viết đủ `softmax` → `argmax` vì các bạn sẽ thấy pattern này rất nhiều trong thực tế.

### 🐛 Bốn lỗi, bốn bài học

**1. Data type: label phải là `torch.long`**

```text
RuntimeError: nll_loss_forward_reduce_cuda_kernel_2d_index not implemented for 'Float'
```

Đọc kỹ: **"not implemented for Float"** — dấu hiệu **data type sai**. Nguyên nhân gốc từ lúc tạo tensor:

```python
# SAI cho multiclass targets
y_blob = torch.from_numpy(y_blob).type(torch.float)

# ĐÚNG: nhãn phải là long (int64)
y_blob = torch.from_numpy(y_blob).type(torch.long)
```

Vì `nn.CrossEntropyLoss` cần **target là class index dạng integer** (`torch.long`). Trong tài liệu, nó ghi "performance tốt hơn khi target chứa class indices"; nhìn vào **sample code** của docs sẽ thấy `dtype=torch.long`. Bài học: **câu trả lời đôi khi chôn sâu trong sample code**, cứ kiên trì đọc.

> Lưu ý: đổi sang `torch.long` rồi nhớ đưa lại lên device — vì tensor mới tạo ra nằm trên CPU, không còn trên GPU.

**2. Device lại lệch**

```text
Expected all tensors to be on the same device, but found at least two devices
```

Sau khi tạo lại `y_blob` (trên CPU), phải gọi `.to(device)` lại. Đúng cảnh "đổi shape xong quên chuyển device".

**3. Shape: `800` lẫn với `200`**

```text
ValueError: Expected input batch_size (200) to match target batch_size (800)
```

`test_logits` có 200 mẫu nhưng `y_blob_test` lại là **800** — mình đã gán nhầm biến, lấy cả tập train. Debug:

```python
print(test_logits.shape, y_blob_test.shape)
```

Rồi **gán lại** `X_blob_test, y_blob_test = X_blob_test.to(device), y_blob_test.to(device)` cho đúng.

**4. Typo biến**

Trong phần test mình gọi `test_pred = ...` nhưng khi tính `test_acc` lại truyền `y_pred` (của train) thay vì `test_pred`. Đổi thành `test_pred` là hết lỗi.

### 📈 Cuối cùng: loss giảm, accuracy tăng

Sau khi dọn hết lỗi, chạy 100 epoch: **loss đi xuống**, **accuracy đi lên** — model multiclass học được. Đi qua đủ **data type** và **shape error** — hai loại lỗi phổ biến nhất — là một buổi học quý. Đừng nghĩ "code sai là dở": mình code sai suốt, và bạn cũng sẽ vậy; kỹ năng là **biết cách tìm**.

Bài sau mình đánh giá model bằng **decision boundary**, như đã làm với binary.
