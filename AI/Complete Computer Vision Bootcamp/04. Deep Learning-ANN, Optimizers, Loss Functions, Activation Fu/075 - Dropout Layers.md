---
title: 'Bài 075 — Dropout layer chống overfitting'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 75
status: edited
source: '075 - Dropout Layers.md'
categories:
- AI
tags: []
---

# 🎭 Dropout: tắt neuron ngẫu nhiên để mô hình bớt học vẹt

> Nguồn: `075 - Dropout Layers.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979315)

Chào các bạn! Một mạng nhiều weights rất dễ **overfitting** — học thuộc training set mà kém trên test. **Dropout layer** là kỹ thuật kinh điển để có **model tổng quát hơn**. Bài này mình giải thích cơ chế huấn luyện và cả cách xử lý lúc dự đoán.

### 🔍 Overfitting là gì?

Huấn luyện một model, nếu **training accuracy ~90%** mà **test accuracy ~60%** thì model học quá khớp với dữ liệu train và **không tổng quát hóa**. Mục tiêu luôn là một model chạy tốt trên **cả train lẫn test**.

Ví dụ quen thuộc ở machine learning: **decision tree** xây hết độ sâu sẽ overfit; người ta giảm bằng **pre-pruning**/**post-pruning**, hoặc dùng **random forest** — nơi mỗi cây chỉ nhận một **tập con feature** (**feature sampling**) và một **tập con dòng dữ liệu** (**row sampling**), rồi bỏ phiếu theo đa số. Việc "chỉ cho thấy một phần dữ liệu" giúp mô hình bớt phụ thuộc, tổng quát hơn.

ANN cũng vậy: vô số weights và bias khiến nó dễ overfit. Dropout mượn đúng ý tưởng "lấy mẫu con" đó.

---

### 🎚️ Dropout hoạt động thế nào (khi train)

Chọn một xác suất **p** (trong `0 <= p <= 1`). Ở **mỗi lượt forward propagation**, **tắt ngẫu nhiên** một phần neuron theo `p`:

* Input layer: nếu `p = 0.5` và có 4 input → tắt 2 node (2/4).
* Hidden layer có 5 node, tắt 2 → `p = 2/5`.
* Hidden layer khác có 4 node, tắt 2 → `p = 0.5`.

Neuron bị tắt **không nối, không xử lý gì**; trong **backpropagation** chúng cũng không được cập nhật.

Điểm quan trọng: mỗi **iteration/epoch** việc tắt là **ngẫu nhiên lại** — lượt trước tắt `x2, x4` thì lượt sau có thể tắt `x1, x3`. Nhờ vậy model không thể "ỷ lại" vào một neuron cụ thể, buộc phải học **đặc trưng tổng quát**.

```text
Epoch 1:  x1 x2 x3 x4  → tắt x2, x4
Epoch 2:  x1 x2 x3 x4  → tắt x1, x3
```

---

### 🧪 Lúc dự đoán (test/inference): KHÔNG dropout

Khi suy luận trên test data, **không tắt neuron nào** — mọi kết nối được bật. Nhưng lúc train, mỗi neuron chỉ hoạt động với xác suất `1 - p` (bị tắt với xác suất `p`), nên để kỳ vọng khớp, ta **nhân weights với xác suất giữ lại** (`keep probability`):

```text
Test:  weights * (xác suất giữ lại)  →  output bình thường, không dropout
```

Ví dụ lớp có `p = 0.5` (giữ lại `0.5`) thì nhân weights với `0.5`; lớp có `p = 2/5` (giữ `3/5`) thì nhân với `3/5`, v.v.

---

### ⚙️ Chọn p thế nào

`p` là **hyperparameter**. Ta thử nhiều giá trị và xem giá trị nào cho model chạy tốt nhất. Việc này sẽ làm rõ ở phần thực hành.

---

### 📌 Tóm lại

* **Train:** tắt neuron ngẫu nhiên theo `p` ở mỗi lượt → chống overfit, tạo model **tổng quát**.
* **Test:** bật toàn bộ, **nhân weights với keep probability** để bù lại.

Bài sau ta chính thức bước vào **CNN** — mạng nơ-ron tích chập. Hẹn gặp lại!
