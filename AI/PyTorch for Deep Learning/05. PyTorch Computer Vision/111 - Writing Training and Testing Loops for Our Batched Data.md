---
title: 'Bài 111 — Viết training loop và testing loop cho dữ liệu dạng batch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 111
status: edited
source: '111 - Writing Training and Testing Loops for Our Batched Data.md'
categories:
- AI
tags: []
---

# 🔁 Viết training loop và testing loop cho dữ liệu dạng batch

> Nguồn: `111 - Writing Training and Testing Loops for Our Batched Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920330)

Đây là bài dài nhất section: viết trọn một optimization loop cho dữ liệu đã chia batch. Khác với các loop trước, lần này **loss được tính và cộng dồn theo từng batch**, rồi mới chia trung bình ở cuối epoch. Mình sẽ đi từng dòng.

### 🌅 Chuyện nhỏ trước khi code: Colab bị ngắt

Sáng ra mở notebook, runtime đã disconnect (qua đêm Colab luôn vậy). Cách xử lý nhanh: bấm **Reconnect**, rồi vào cell đang làm và chọn **Run before** để chạy lại toàn bộ cell phía trên — tải lại data, helper function, v.v. Mình cũng tự ghi note lại đang ở đâu để không lạc.

### 🗺️ Bốn bước của loop lần này

1. Lặp qua các **epoch**, trong mỗi epoch lặp qua các **training batch**.
2. Với mỗi batch: forward pass, tính loss, zero grad, backward, optimizer step. **Cộng dồn train loss.**
3. Lặp qua các **testing batch**: forward pass, tính loss, cộng dồn test loss và test accuracy. Không có optimizer step.
4. In ra thông tin, đo thời gian.

Điểm khác biệt cốt lõi: **optimizer cập nhật tham số model một lần mỗi batch, chứ không phải một lần mỗi epoch**. Đó chính là lợi ích của mini-batch.

### 📊 Thêm progress bar với tqdm

```python
from tqdm.auto import tqdm
```

`tqdm` là progress bar phổ biến, ít overhead, và Colab có sẵn. `tqdm.auto` tự chọn kiểu hiển thị phù hợp với môi trường (Jupyter, terminal…). Cách dùng: bọc iterator bằng `tqdm`.

### 🧱 Chuẩn bị

```python
torch.manual_seed(42)
train_time_start_on_cpu = timer()

epochs = 3   # giữ nhỏ để thí nghiệm chạy nhanh
```

Vì sao chỉ 3 epoch? Để thí nghiệm chạy trong khoảng 30 giây đến 1 phút. Chạy nhanh thì thử được nhiều, sai thì không mất thời gian chờ. Sau này muốn thì tăng lên 100.

### 🔁 Vòng lặp chính

```python
for epoch in tqdm(range(epochs)):
    print(f"Epoch: {epoch}\n-------")

    # --- Training ---
    train_loss = 0
    model_0.train()

    for batch, (X, y) in enumerate(train_dataloader):
        y_pred = model_0(X)

        loss = loss_fn(y_pred, y)
        train_loss += loss

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if batch % 400 == 0:
            print(f"Looked at {batch * len(X)}/{len(train_dataloader.dataset)} samples")

    train_loss /= len(train_dataloader)

    # --- Testing ---
    test_loss, test_acc = 0, 0
    model_0.eval()

    with torch.inference_mode():
        for X_test, y_test in test_dataloader:
            test_pred = model_0(X_test)
            test_loss += loss_fn(test_pred, y_test)
            test_acc += accuracy_fn(
                y_true=y_test,
                y_pred=test_pred.argmax(dim=1),
            )

        test_loss /= len(test_dataloader)
        test_acc /= len(test_dataloader)

    print(f"Train loss: {train_loss:.4f} | Test loss: {test_loss:.4f} | Test acc: {test_acc:.4f}")
```

### 🔍 Giải thích từng mảnh

* **`enumerate(train_dataloader)`** cho biết đang ở batch thứ mấy — cần cho việc in tiến độ.
* **`model_0.train()`** đặt model vào training mode (dù đây là mặc định, vẫn nên gọi cho chắc).
* **`train_loss`** cộng dồn loss của mọi batch; cuối epoch chia cho `len(train_dataloader)` để ra **loss trung bình mỗi batch**.
* **In mỗi 400 batch**: `batch * len(X)` là số mẫu đã xem, `len(train_dataloader.dataset)` là tổng số mẫu. 60.000/32 = 1875 batch nên in khoảng 5 lần.
* **`argmax(dim=1)`**: output thô của model là **logit**; `accuracy_fn` cần nhãn dự đoán nên phải lấy vị trí có logit cao nhất. Từ logit sang nhãn, không cần qua softmax.
* **`torch.inference_mode()`**: tắt autograd khi đánh giá, nhanh và nhẹ hơn.
* **Chia trung bình phải nằm ngoài vòng lặp batch** — đây là chỗ dễ lệch thụt đầu dòng nhất.

### ⏱️ Đo thời gian và kiểm tra device

```python
train_time_end_on_cpu = timer()
total_train_time_model_0 = print_train_time(
    start=train_time_start_on_cpu,
    end=train_time_end_on_cpu,
    device=str(next(model_0.parameters()).device),
)
```

`next(model_0.parameters()).device` lấy parameter đầu tiên rồi hỏi nó đang nằm trên thiết bị nào — mẹo hay để biết model đang ở CPU hay `cuda` mà không cần nhớ.

### ✅ Tạm kết

Toàn bộ code đã sẵn sàng, nhưng mình cố tình dừng ở đây để bài sau chạy thử và xem có lỗi không. Spoiler: lần đầu sẽ có lỗi indentation. Nhưng đó là chuyện bình thường — cứ chạy, sửa, chạy lại.
