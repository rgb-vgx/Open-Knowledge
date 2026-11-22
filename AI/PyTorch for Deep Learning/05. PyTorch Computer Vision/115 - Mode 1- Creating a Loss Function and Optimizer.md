---
title: 'Bài 115 — Model 1: tạo loss function và optimizer'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 115
status: edited
source: '115 - Mode 1- Creating a Loss Function and Optimizer.md'
categories:
- AI
tags: []
---

# 🧪 Model 1: tạo loss function và optimizer

> Nguồn: `115 - Mode 1- Creating a Loss Function and Optimizer.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920338)

Model 1 chỉ khác Model 0 ở chỗ có thêm các lớp phi tuyến. Vì vậy loss function và optimizer cũng giữ nguyên — đúng tinh thần "mỗi thí nghiệm chỉ đổi một thứ" để biết cái gì thực sự tạo ra khác biệt.

### 🎯 Loss và optimizer

```python
from helper_functions import accuracy_fn

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(params=model_1.parameters(), lr=0.1)
```

* Vẫn là bài **multiclass classification** → `nn.CrossEntropyLoss()`.
* Vẫn là `torch.optim.SGD` với `lr=0.1`, lần này truyền `params=model_1.parameters()`.
* `accuracy_fn` import lại cho đủ bộ, dù đã import trước đó.

---

### 🔬 Quy tắc thí nghiệm: đổi một biến mỗi lần

Đây là điểm mình muốn các bạn nhớ: khi chạy nhiều experiment, chỉ nên chỉnh **một hoặc hai** thứ mỗi lần. Như vậy mới biết chính xác cái gì ảnh hưởng đến kết quả.

Ở đây mình đổi **kiến trúc** (thêm ReLU) và **device** (CPU → GPU). Nếu kết quả tốt hơn, sẽ khó nói là do phi tuyến hay do GPU nhanh hơn — nhưng đó là một phần của thực nghiệm, và các bạn có thể tự tách ra thử.

---

### 🧪 Đoán trước hay chạy thật?

Có thể đoán hoặc dựa vào kinh nghiệm để biết các lớp phi tuyến có giúp ích không, và theo thời gian bạn sẽ dần hiểu các hàm khác nhau ảnh hưởng đến mạng ra sao. Nhưng Daniel thích cách chạy thật nhiều thí nghiệm hơn — cứ code ra rồi xem kết quả.

---

### ❓ Ôn nhanh

* **Loss function** làm gì? Đo model sai bao nhiêu.
* **Optimizer** làm gì? Cập nhật tham số model để giảm loss.
* **Accuracy** làm gì? Đo độ chính xác — một trong những metric cơ bản của classification.

Ba câu hỏi này sẽ quay lại mỗi khi bạn debug một model không chịu học.

---

### 🔁 Bước tiếp: lại training loop?

Đúng, nhưng ta đã viết training loop khá nhiều lần. Trước đó còn **function hóa** được hàm `eval_model`, nên lần này sẽ function hóa luôn training loop và testing loop:

* `train_step(...)`
* `test_step(...)`

Mỗi hàm sẽ nhận vài tham số (model, dataloader, loss, optimizer, accuracy, device…). Các bạn thử tự đoán danh sách tham số trước khi xem bài sau. Nhờ vậy, lần train sau chỉ còn là chuyện gọi hàm với đúng tham số.

---

### ✅ Tạm kết

Loss và optimizer đã sẵn sàng cho Model 1. Bài sau mình biến toàn bộ training loop thành hàm `train_step`, rồi `test_step` — để từ nay chỉ cần gọi vài dòng là train xong một model.
