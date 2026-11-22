---
title: 'Bài 54 — Ôn lại từng bước trong training loop'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 54
status: edited
source: '054 - Reviewing the Steps in a Training Loop Step by Step.md'
categories:
- AI
tags: []
---

# 🔬 Ôn lại từng bước trong training loop

> Nguồn: `054 - Reviewing the Steps in a Training Loop Step by Step.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32719890)

Đã viết xong training loop, nhưng nhiều bước quá nên giờ mình tua lại từng bước một lần nữa, kèm hình dung trực quan. Nắm được phần này là hiểu luôn vì sao PyTorch "thần kỳ".

### 🔁 Vì sao gọi là "loop"?

Ta bước qua nhiều **epoch**. Một epoch là một lần đưa toàn bộ dữ liệu qua model. `epochs` là **hyperparameter**: có thể đặt 1, 100, hay 1000 tùy nhu cầu.

---

### 🏃 Forward pass

Đưa training data qua model, chạy đúng hàm `forward` mà mình tự viết. `forward propagation` nghĩa là dữ liệu đi từ input layer đến output layer. Đây là phần **model học pattern trên training data** — khác với testing loop, nơi ta chỉ đánh giá trên dữ liệu chưa thấy.

---

### 📉 Tính loss

So dự đoán trên training data với `y_train`. Loss bao nhiêu phụ thuộc vào loss function, kiểu dự đoán và kiểu giá trị thật.

---

### 🧹 `optimizer.zero_grad()`

Gradient mà optimizer tính ra sẽ **tích lũy** qua các vòng lặp, nên mỗi epoch phải reset về 0. Lý do PyTorch tích lũy gradient nằm sâu trong tài liệu, liên quan tới tối ưu tính toán; điều cần nhớ vẫn là zero trước mỗi vòng.

---

### ⛰ Backpropagation và đường cong loss

`loss.backward()` tính **gradient của mọi tham số có `requires_grad=True`** theo loss. Với mỗi tham số, PyTorch dựng ngầm một đường cong loss như hình một cái bát.

Với hai tham số thì dễ hình dung, nhưng với 10 triệu tham số thì không ai vẽ nổi — `torch.autograd` lo hết ở hậu trường.

Gradient chính là **độ dốc** của đường cong. Đứng ở sườn dốc, ta đi **ngược hướng gradient** để xuống đáy. Khi gradient về 0 thì loss cũng về 0.

---

### 🚶 `optimizer.step()` — bước xuống dốc

Optimizer nhận danh sách `params` (ở đây là `model_0.parameters()`) và dùng gradient để bước một bước về phía đáy. Điểm đáy gọi là **convergence**.

---

### 🎚 Learning rate như việc với đồng xu sau ghế sofa

`lr` quyết định **bước dài hay ngắn**:

* Bước quá lớn: nhảy qua đáy, lạc sang bên kia.
* Bước quá nhỏ: mãi không tới đáy.

Ví như thò tay xuống sau ghế sofa nhặt đồng xu: lúc còn xa thì với tay mạnh, càng gần càng rụt lại cho khéo, nếu không đồng xu sẽ trượt mất. Đó cũng là ý tưởng của **learning rate scheduling**: khởi đầu bước lớn, về sau giảm dần.

---

### ✅ Thứ tự chuẩn

1. Forward pass (bắt buộc trước, vì không có nó thì không có loss).
2. Tính loss.
3. `optimizer.zero_grad()`.
4. `loss.backward()`.
5. `optimizer.step()` (phải sau backward).

Toàn bộ có thể gói thành hàm để khỏi viết lại mỗi lần, nhưng lần đầu cứ viết tay cho hiểu. Bài sau mình sẽ chạy từng epoch và xem tham số thay đổi ra sao ngay trước mắt.
