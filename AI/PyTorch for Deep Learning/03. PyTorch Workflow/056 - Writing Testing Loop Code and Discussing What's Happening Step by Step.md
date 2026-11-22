---
title: 'Bài 56 — Viết code testing loop và giải thích từng bước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 56
status: edited
source: '056 - Writing Testing Loop Code and Discussing What''s Happening Step by Step.md'
categories:
- AI
tags: []
---

# 🧪 Viết code testing loop và giải thích từng bước

> Nguồn: `056 - Writing Testing Loop Code and Discussing What's Happening Step by Step.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719898)

Training loop đã chạy và loss giảm. Giờ viết **testing loop** — nơi đánh giá model trên dữ liệu nó chưa từng thấy. Không nhất thiết phải viết hai loop cùng lúc, sau này sẽ gói thành hàm, nhưng lần đầu cứ viết cùng để thấy bức tranh đầy đủ.

### 🎛 `model_0.eval()` — tắt chế độ training

```python
model_0.eval()
```

Lệnh này tắt các thiết lập **chỉ dùng cho training**, không cần khi đánh giá — ví dụ **dropout** và **batch norm** (hai khái niệm sẽ gặp sau). Nhớ thành phản xạ: train thì `model.train()`, test thì `model.eval()`.

---

### 🚀 `torch.inference_mode()` — tắt theo dõi gradient

Đã nói ở bài 49, nhắc lại cho thành thói quen: khi test, ta chỉ đánh giá pattern model đã học, **không học thêm**. Vì thế tắt gradient tracking và vài thứ khác để code chạy nhanh hơn. PyTorch có thread và blog giải thích cơ chế này.

Mã cũ có thể dùng `torch.no_grad()`, tác dụng tương tự, nhưng `inference_mode()` là cách nhanh và được ưu tiên hiện nay.

---

### 🔥 Testing loop

```python
    ### Testing
    model_0.eval()

    with torch.inference_mode():
        # 1. Forward pass on test data
        test_pred = model_0(X_test)

        # 2. Calculate loss on test data
        test_loss = loss_fn(test_pred, y_test)
```

Điểm khác biệt duy nhất so với train: dùng `X_test`/`y_test` thay vì `X_train`/`y_train`.

---

### 🚫 Đừng để model "nhìn trước" đề thi

Cũng như thi đại học: học từ giáo trình (training data) rồi kiểm tra trên đề chưa từng thấy (test data). Nếu model thấy test data trước khi đánh giá thì kết quả vô nghĩa — chẳng khác gì gian lận.

---

### 🔁 Gộp cả hai vào một vòng lặp

```python
epochs = 100

for epoch in range(epochs):
    ### Training
    model_0.train()

    y_pred = model_0(X_train)
    loss = loss_fn(y_pred, y_train)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    ### Testing
    model_0.eval()

    with torch.inference_mode():
        test_pred = model_0(X_test)
        test_loss = loss_fn(test_pred, y_test)

    # Print out what's happening every 10 epochs
    if epoch % 10 == 0:
        print(f"Epoch: {epoch} | Loss: {loss} | Test loss: {test_loss}")
        print(model_0.state_dict())
```

`epoch % 10 == 0` để chỉ in mỗi 10 epoch, tránh rối màn hình. Có thể in thêm metric khác như accuracy sau này. Đây chính là điểm hay của PyTorch: dùng `print` của Python cũng đủ nhìn model đang làm gì.

---

### 📊 Kết quả sau 100 epoch

* Loss giảm đều qua từng mốc 10, 20, 30... epoch.
* Sau 100 epoch, loss đã giảm từ khoảng **0.31** lúc bắt đầu xuống còn khoảng **0.03**.
* `weight ≈ 0.562`, `bias ≈ 0.357` — đã tiến rất gần `0.7` và `0.3`.
* Dự đoán mới: chấm đỏ gần như phủ lên chấm xanh lá.

---

### 🧐 Một chi tiết đáng chú ý

**Test loss không thấp bằng training loss.** Vì sao? Model chưa thấy test data, nên kết quả kém hơn là bình thường. Muốn cải thiện thì huấn luyện lâu hơn — đó là bài tập cho các bạn: thử kéo dài training để đưa chấm đỏ trùng khít chấm xanh lá.

---

### ✅ Tạm kết

Đã có trọn bộ train + test. Bài sau mình mổ xẻ lại từng dòng của testing loop, và sau đó là lưu/nạp model.
