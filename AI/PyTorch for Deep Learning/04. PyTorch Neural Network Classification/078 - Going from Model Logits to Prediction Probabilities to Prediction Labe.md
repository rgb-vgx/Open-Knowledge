---
title: 'Bài 78 — Từ logits sang xác suất rồi sang nhãn dự đoán'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 78
status: edited
source: '078 - Going from Model Logits to Prediction Probabilities to Prediction Labe.md'
categories:
- AI
tags: []
---

# 🎚️ Từ logits sang xác suất rồi sang nhãn dự đoán

> Nguồn: `078 - Going from Model Logits to Prediction Probabilities to Prediction Labe.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820614)

Trước khi viết training loop, mình phải làm rõ một chuỗi chuyển đổi: **logits → prediction probabilities → prediction labels**. Vì đầu ra thô của model không dùng được trực tiếp để so với label.

### 📜 Ba bước của đầu ra

* **Logits** — đầu ra **thô** của model, **chưa qua activation function** nào.
* **Prediction probabilities** — logits đi qua một activation function: **sigmoid** cho binary, **softmax** cho multiclass.
* **Prediction labels** — xác suất chuyển thành nhãn bằng cách **làm tròn (round)** với binary, hoặc **lấy argmax** với đầu ra của softmax.

---

### 🧮 Logit ra đời thế nào?

Một lớp `nn.Linear` thực hiện **linear transformation**: `output = x @ weight.T + bias` (weight và bias chính là các tensor trong `state_dict`). Đó là toàn bộ phép tính bên trong hai lớp của mình — raw output chính là **logits**.

Xem thử 5 logit đầu tiên:

```python
# View the first 5 outputs of the forward pass on the test data
y_logits = model_0(X_test.to(device))[:5]
y_logits
```

Chúng nằm trên **CUDA device** và vẫn **track gradient**. Vì đang chỉ dự đoán, mình bọc trong `torch.inference_mode()` để tắt gradient tracking.

---

### 🧪 Bước 2: sigmoid để ra xác suất

```python
# Use sigmoid on model logits
y_pred_probs = torch.sigmoid(y_logits)
y_pred_probs
```

Vì kiến trúc binary classification có **output activation là sigmoid**, đây chính là bước biến logit thành **prediction probability** — giá trị trong khoảng **0 đến 1**, càng gần 1 càng chắc thuộc một lớp.

Lưu ý: không thể làm tròn thẳng trên logits. Phải qua sigmoid trước thì mới có ý nghĩa xác suất.

---

### 🎯 Bước 3: làm tròn để ra nhãn

Với binary cross entropy, mình áp **decision boundary** tại **0.5**:

* `y_pred_probs >= 0.5` → nhãn **1** (class 1 — chấm đỏ hoặc xanh).
* `y_pred_probs < 0.5` → nhãn **0** (class 0).

Có thể dời boundary, ví dụ lấy mốc 0.7, nhưng **0.5** là mặc định phổ biến nhất. `torch.round` làm đúng việc này.

```python
# Find predicted labels
y_preds = torch.round(torch.sigmoid(model_0(X_test.to(device))))

# Remove extra dimension(s) from y_preds
y_preds[:5].squeeze(), y_test[:5]
```

`.squeeze()` bỏ chiều thừa (`[n, 1]` → `[n]`) để cùng shape với `y_test`.

---

### ✅ Kiểm tra chéo

```python
torch.eq(y_preds.squeeze(), y_test)
```

Hai kết quả — `y_pred_probs` làm tròn và `y_preds` tính một mạch — **khớp nhau**, đúng như mong đợi. Nhãn giờ đã cùng format với `y_test`, tuy giá trị còn sai bét vì model vẫn dùng **trọng số ngẫu nhiên**.

---

### 🧭 Vì sao phải làm chuỗi này?

Vì loss function dùng khi train (`BCEWithLogitsLoss`) cần đầu vào là **logits**, còn lúc đánh giá thì mình cần **nhãn** để so với ground truth. Nắm rõ ba mức này là hiểu được luồng dữ liệu ra khỏi model.

Mình gợi ý các bạn tự thử viết trước các bước cho training và testing loop — bài sau mình sẽ code cùng nhau.
