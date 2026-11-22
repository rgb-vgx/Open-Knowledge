---
title: 'Bài 57 — Ôn lại testing loop và vẽ đường cong loss'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 57
status: edited
source: '057 - Reviewing What Happens in a Testing Loop Step by Step.md'
categories:
- AI
tags: []
---

# 📈 Ôn lại testing loop và vẽ đường cong loss

> Nguồn: `057 - Reviewing What Happens in a Testing Loop Step by Step.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32723800)

Sau 100 epoch, chấm đỏ đã gần chấm xanh lá. Lời thách thức đặt ra: làm sao khớp hẳn? Câu trả lời đơn giản nhất là **train lâu hơn**. Ta chạy thêm một lượt 100 epoch nữa, đồng thời học cách theo dõi quá trình huấn luyện bằng list và vẽ loss curve.

### 🔁 Chạy thêm 100 epoch

Rerun cell training: model nhớ tham số cũ và tiếp tục cải thiện từ đó.

Kết quả sau tổng cộng 200 epoch:

* Training loss: `0.0244` → `0.0089` (giảm thêm khoảng 3 lần).
* Test loss: `0.0565` → `0.005` (gần 10 lần cải thiện trong lượt chạy này).
* `weight ≈ 0.6990`, `bias ≈ 0.3093` — gần như trùng khít giá trị thật `0.7` và `0.3`.

Dự đoán mới bám sát đường thẳng gần như tuyệt đối. Có thể gán tay tham số cho đúng, nhưng viết code để máy tự học bằng backpropagation và gradient descent mới là điều đáng làm.

---

### 📝 Theo dõi thực nghiệm bằng list

Muốn so sánh các lần chạy sau này, phải lưu lại giá trị:

```python
epoch_count = []
loss_values = []
test_loss_values = []
```

Trong vòng lặp, mỗi epoch append giá trị hiện tại:

```python
epoch_count.append(epoch)
loss_values.append(loss)
test_loss_values.append(test_loss)
```

Đây là cách **tracking experiment** thô sơ nhưng hiệu quả: sau này đổi learning rate hay cấu hình, còn số liệu cũ để đối chiếu.

---

### 📉 Vẽ loss curve

Matplotlib làm việc với NumPy, còn loss đang là `torch.Tensor`, nên phải chuyển đổi:

```python
import numpy as np
import matplotlib.pyplot as plt

# Convert tensors to NumPy
plt.plot(epoch_count, np.array(torch.tensor(loss_values).cpu().numpy()),
         label="Train loss")
plt.plot(epoch_count, test_loss_values, label="Test loss")
plt.title("Training and test loss curves")
plt.ylabel("Loss")
plt.xlabel("Epochs")
plt.legend()
plt.show()
```

`loss_values` là list các tensor nên cần `torch.tensor(...)`. Vì chưa chạy trên GPU, có thể bỏ `.cpu()`, nhưng giữ lại để sau này chuyển sang GPU khỏi sửa.

---

### 🖼 Đọc loss curve

**Đường cong loss giảm dần là một trong những cảnh đẹp nhất trong machine learning.** Train loss đi từ `0.3` xuống gần 0. Điều quan trọng hơn: train loss và test loss **bám sát nhau**. Nếu hai đường tách quá xa thì có vấn đề (mình sẽ gặp sau). Bám sát nhau nghĩa là model đang **hội tụ** (converging), loss tiến gần 0 nhất có thể.

Train lâu hơn nữa, loss có thể gần 0 hơn — để dành làm thí nghiệm.

---

### 🔍 Ôn lại testing loop

1. Tạo list rỗng để lưu giá trị.
2. `model.eval()` — tắt chức năng chỉ dùng khi train (dropout, batch norm).
3. `with torch.inference_mode():` — tắt gradient tracking cho inference, giúp nhanh hơn.
4. Forward pass trên **test data**.
5. Tính test loss — càng thấp càng tốt.
6. In ra và lưu giá trị epoch/loss/test loss.

Toàn bộ có thể gói thành hàm, nhưng đáng viết tay vì cấu trúc này sẽ dùng lại cho mọi model trong khóa.

---

### ✅ Tạm kết

Chúc mừng các bạn đã đi qua phần khó nhất: train và đánh giá model. Từ đây trở đi, quy trình này lặp lại với mọi model. Bài sau mình học cách **lưu model** để đem đi dùng chỗ khác.
