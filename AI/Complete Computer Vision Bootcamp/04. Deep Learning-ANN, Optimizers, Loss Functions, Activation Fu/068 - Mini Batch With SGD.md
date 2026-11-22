---
title: 'Bài 068 — Mini-batch SGD'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 68
status: edited
source: '068 - Mini Batch With SGD.md'
categories:
- AI
tags: []
---

# 🧺 Mini-batch SGD: cân giữa tốc độ và nhiễu

> Nguồn: `068 - Mini Batch With SGD.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979247)

Chào các bạn! SGD nhẹ tài nguyên nhưng sinh **noise** vì cập nhật theo từng điểm. **Mini-batch SGD** thêm khái niệm **batch** để dung hòa: không cầm cả triệu điểm, cũng không cầm một điểm, mà cầm **một lô**.

### 🧩 Thêm khái niệm batch size

Ba khái niệm đi kèm nhau giờ là **epoch**, **iteration** và **batch size**.

Ví dụ dataset có **100K điểm**, chọn **batch size = 1000**:

```text
số iteration mỗi epoch = 100000 / 1000 = 100
```

Mỗi **iteration**:

1. Đưa **1000 điểm** vào forward propagation.
2. Tính **cost function** trên lô 1000 điểm (`Σ` chạy `i = 1..1000`, ví dụ với MSE).
3. Dùng optimizer (**mini-batch SGD**) cập nhật weights.

Vậy **một epoch = 100 iteration**, mỗi iteration xử lý 1000 điểm.

---

### 🎛️ Batch size ảnh hưởng tài nguyên thế nào

* Batch **1000** → RAM **8GB** là đủ.
* Batch **5000** → cần khoảng **16GB** RAM.

Batch size lớn hơn thì mỗi iteration nặng hơn, nhưng **số iteration giảm** → tổng thời gian và noise giảm.

---

### ✅ Ưu điểm

1. **Hội tụ nhanh hơn** SGD (nhờ xử lý theo lô).
2. **Noise ít hơn** so với SGD một điểm.
3. **Dùng tài nguyên hiệu quả** — chọn batch vừa RAM.

```text
Gradient Descent:  mượt, nhưng ngốn RAM
SGD:               nhẹ RAM, nhiều noise
Mini-batch SGD:    nhẹ vừa phải, noise giảm
```

---

### ⚠️ Nhược điểm còn lại

Noise **giảm nhưng chưa hết** — đường hội tụ vẫn còn zigzag, chỉ ít hơn SGD. Nó hiệu quả hơn SGD nhưng vẫn mất thời gian để converge.

---

### ➡️ Bước kế tiếp

Mục tiêu tiếp theo: **làm mượt** đường nhiễu để hội tụ nhanh hơn nữa. Công cụ là **SGD with Momentum**, dùng **exponential weighted average** để "vuốt phẳng" dao động. Bài sau ta sẽ mổ xẻ nó. Hẹn gặp lại!
