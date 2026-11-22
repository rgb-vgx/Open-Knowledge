---
title: 'Bài 95 — Logits sang xác suất sang nhãn với model multiclass'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 95
status: edited
source: '095 - Logits to Prediction Probabilities to Prediction Labels with a Multi-C.md'
categories:
- AI
tags: []
---

# 🎲 Logits sang xác suất sang nhãn với model multiclass

> Nguồn: `095 - Logits to Prediction Probabilities to Prediction Labels with a Multi-C.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32881832)

Trước khi train, mình cần hiểu đầu ra của model multiclass. Và — có lẽ cố ý — mình đưa các bạn một đoạn code **sẽ lỗi** để xem có bắt được không.

### 🐛 Lỗi đầu tiên: device mismatch

```python
model_4.eval()
with torch.inference_mode():
    y_logits = model_4(X_blob_test)
```

Văng **`RuntimeError: Expected all tensors to be on the same device`**. Vì `model_4` đã được đưa lên **CUDA** (lúc khởi tạo), còn `X_blob_test` vẫn nằm trên **CPU**. Data phải cùng device với model — đúng điều mình cảnh báo suốt từ đầu module.

Sửa bằng cách đưa data lên device (thường làm một lần trước training loop):

```python
X_blob_test = X_blob_test.to(device)
X_blob_train = X_blob_train.to(device)
y_blob_test = y_blob_test.to(device)
y_blob_train = y_blob_train.to(device)
```

---

### 🔢 Mỗi mẫu có 4 logit, không phải 1

```python
y_logits = model_4(X_blob_test)[:5]
y_logits
```

Nhìn kỹ: mỗi mẫu là **bốn con số**, không phải một. Vì model có `out_features=4` — **một logit cho mỗi lớp**. Đó là **raw output** của model, trước mọi activation.

---

### 🌀 Bước 2: softmax để ra xác suất

```python
# Convert model logits to prediction probabilities
y_pred_probs = torch.softmax(y_logits, dim=1)
y_pred_probs
```

Khác với sigmoid (binary), multiclass dùng **softmax**. Đặc tính quan trọng:

* **Không có giá trị âm** — đều nằm trong khoảng 0-1.
* **Tổng các giá trị bằng 1** — kiểm tra bằng `torch.sum(y_pred_probs[0])`.

Mỗi con số là xác suất model gán cho lớp 0, lớp 1, lớp 2, lớp 3 (theo thứ tự index). Softmax về bản chất là:

```text
softmax(x)_i = exp(x_i) / sum(exp(x_j))
```

Tức `torch.exp(x)` chia cho tổng `torch.exp` của mọi phần tử — các bạn tự code lại được nếu muốn (giống bài replicate activation).

---

### 🎯 Bước 3: argmax để ra nhãn

```python
# Convert prediction probabilities to prediction labels
y_preds = torch.argmax(y_pred_probs, dim=1)
y_preds
```

Với binary mình **làm tròn**; với multiclass mình lấy **argmax** — vị trí (index) của xác suất lớn nhất. Ví dụ nếu xác suất cao nhất ở index **1**, lớp dự đoán là **1**.

Giờ `y_preds` đã **cùng format** với `y_blob_test` (đều là nhãn). Dù lúc này model chưa train nên đoán **bừa** — sai rất nhiều — nhưng format đã khớp. Sau khi train, chúng sẽ dần khớp cả giá trị.

---

### 📋 Tóm tắt chuỗi chuyển đổi

| Bước | Công cụ | Kết quả |
|---|---|---|
| **Logits** | `model(x)` | 4 logit/mẫu (raw output) |
| **Prediction probabilities** | `torch.softmax(..., dim=1)` | 4 xác suất, tổng = 1 |
| **Prediction labels** | `torch.argmax(..., dim=1)` | 1 nhãn/mẫu |

Vậy là nắm đủ cách đi từ logits → probs → labels cho multiclass. Giờ viết **training/testing loop** thôi — nó giống hệt loop đã viết trước đó, các bạn thử tự làm trước xem.
