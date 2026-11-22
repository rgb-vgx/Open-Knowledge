---
title: 'Bài 50 — Trực giác về training: những thứ cần có'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 50
status: edited
source: '050 - Training a Model Intuition (The Things We Need).md'
categories:
- AI
tags: []
---

# 🏋️ Trực giác về training: những thứ cần có

> Nguồn: `050 - Training a Model Intuition (The Things We Need).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32699346)

Model hiện tại dự đoán rất tệ: chấm đỏ chẳng nằm trên chấm xanh lá nào. Trước khi lao vào code training, mình muốn dựng trực giác trước — sắp tới mình sẽ huấn luyện model machine learning đầu tiên đấy.

### 🎯 Training là gì?

Mục tiêu: model đi từ **unknown parameters** (có thể là ngẫu nhiên) đến **known parameters** — hay nói cách khác, từ biểu diễn dữ liệu tệ sang biểu diễn tốt hơn.

Một lưu ý: không bắt buộc phải khởi tạo ngẫu nhiên. Có thể bắt đầu từ `0`, hoặc dùng tham số của model khác — đó là **transfer learning**, mình sẽ gặp sau.

---

### 📏 Loss function — thước đo cái sai

Làm sao biết biểu diễn hiện tại tệ đến mức nào? Dùng **loss function**:

> Loss function là hàm đo xem dự đoán của model sai bao nhiêu so với output lý tưởng. **Càng thấp càng tốt.**

Cách đo đơn giản nhất: lấy khoảng cách giữa từng chấm đỏ và chấm xanh lá (ví dụ khoảng `0.45`), lặp lại cho mọi điểm rồi lấy trung bình. Nếu bạn đã biết về loss function, chắc nhận ra mình vừa mô tả **mean absolute error (MAE)** — lát nữa sẽ dùng.

PyTorch có sẵn rất nhiều loss function trong `torch.nn`, nhưng bản chất khá giống nhau.

Mẹo thuật ngữ: loss function còn được gọi là **cost function** hoặc **criterion** tùy tài liệu. Mình dùng "loss function" cho thống nhất.

---

### ⚙️ Optimizer — người chỉnh tham số

Cần thêm một thứ nữa:

> Optimizer nhận vào loss của model và **chỉnh tham số** — ở đây là `weight` và `bias` — để cải thiện loss.

Kiểm tra tham số hiện tại:

```python
model_0.state_dict()
```

Ra các giá trị ngẫu nhiên của `weight` và `bias`. Chỉ có hai tham số, nhưng nguyên lý sẽ y hệt với model hàng triệu tham số: lấy loss, tối ưu để nó giảm xuống.

---

### 🔁 Và cần vòng lặp

Với PyTorch cụ thể, mình cần:

* **Training loop** — vòng lặp huấn luyện.
* **Testing loop** — vòng lặp đánh giá.

Hai thứ này sẽ được dựng trong vài video tới, bắt đầu bằng loss function và optimizer cho bài toán của mình.

---

### ✅ Tạm kết

Nắm chắc bộ ba: **loss function** (đo cái sai), **optimizer** (chỉnh tham số), **vòng lặp training/testing** (lặp đi lặp lại quá trình). Nguyên lý này áp dụng cho mọi model, từ hai tham số đến computer vision đồ sộ. Bài sau mình chọn loss function và optimizer cụ thể.
