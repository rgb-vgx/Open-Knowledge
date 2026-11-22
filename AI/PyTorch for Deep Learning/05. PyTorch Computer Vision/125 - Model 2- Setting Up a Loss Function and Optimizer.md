---
title: 'Bài 125 — Model 2: thiết lập loss function và optimizer'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 125
status: edited
source: '125 - Model 2- Setting Up a Loss Function and Optimizer.md'
categories:
- AI
tags: []
---

# ⚙️ Model 2: thiết lập loss function và optimizer

> Nguồn: `125 - Model 2- Setting Up a Loss Function and Optimizer.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920360)

Model 2 đã dựng xong và chạy được với dummy tensor. Còn một câu chưa có lời đáp: **nó có train được không?** Không phải lúc nào cũng chắc — nên trước hết cần loss function và optimizer.

### 🗺️ Đang ở đâu trong workflow

Ta đã có data, đã dựng architecture. Bước tiếp theo: chọn **loss function**, **evaluation metrics** và **optimizer**.

---

### 🎯 Chọn ba thứ

```python
from helper_functions import accuracy_fn

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(params=model_2.parameters(), lr=0.1)
```

* **`nn.CrossEntropyLoss()`** — vẫn là bài multiclass classification nên dùng lại loss này.
* **`torch.optim.SGD`** — giữ nguyên optimizer quen thuộc, `lr=0.1`, chỉ đổi `params` sang `model_2.parameters()`.
* **`accuracy_fn`** — import lại cho đủ bộ (dù đã import trước đó).

Việc giữ loss/optimizer y hệt các model trước là có chủ đích: thí nghiệm chỉ đổi **kiến trúc**, nhờ vậy kết quả khác biệt đến từ CNN chứ không phải từ loss hay learning rate.

---

### 🔍 Model 2 có gì để học?

```python
model_2.state_dict()
```

In ra sẽ thấy cực nhiều **weight** và **bias** — vì model này có nhiều layer hơn hẳn. Tất cả đang là số ngẫu nhiên, và toàn bộ việc train là chỉnh chúng để dự đoán đúng ảnh quần áo.

Vì không có convolution layer nào là "đã biết trước phải học gì", chính các weight này sẽ dần mã hóa các feature mà model tự khám phá.

---

### 💡 Không chắc thì cứ chạy

Điểm mình muốn nhấn: có những thứ **không thể biết trước** bằng suy luận, chỉ biết bằng thí nghiệm. Loss thấp, accuracy cao hay không — phải chạy mới biết. Đó là lý do ta xây dựng quy trình đo đạc cẩn thận từ đầu section: loss, accuracy, thời gian, dictionary kết quả.

---

### 🎯 Thử thách

Trước khi xem bài sau, dùng `train_step` và `test_step` đã viết để tự train Model 2 trong 3 epoch. Nhớ **comment các dòng `print(x.shape)`** trong `forward` trước, không thì output sẽ ngập.

Cách gọi sẽ giống hệt Model 1, chỉ đổi `model=model_2`:

```python
for epoch in tqdm(range(epochs)):
    train_step(model=model_2, data_loader=train_dataloader,
               loss_fn=loss_fn, optimizer=optimizer,
               accuracy_fn=accuracy_fn, device=device)
    test_step(model=model_2, data_loader=test_dataloader,
              loss_fn=loss_fn, accuracy_fn=accuracy_fn, device=device)
```

Nếu chạy được, bạn đã tự tay train CNN đầu tiên — phần thưởng xứng đáng cho mấy bài mổ xẻ layer vừa rồi.

---

### ✅ Tạm kết

Loss function và optimizer đã sẵn sàng. Bài sau mình train CNN đầu tiên, xem nó có vượt baseline 83.4% không — và lần này có một cái bẫy print shape đang chờ.
