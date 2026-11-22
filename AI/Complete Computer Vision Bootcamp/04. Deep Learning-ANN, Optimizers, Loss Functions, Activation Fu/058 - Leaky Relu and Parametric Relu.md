---
title: 'Bài 058 — Leaky ReLU và Parametric ReLU'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 58
status: edited
source: '058 - Leaky Relu and Parametric Relu.md'
categories:
- AI
tags: []
---

# 💧 Leaky ReLU và Parametric ReLU: chữa dead neuron

> Nguồn: `058 - Leaky Relu and Parametric Relu.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956821)

Chào các bạn! ReLU rất nhanh và dẹp được vanishing gradient, nhưng có tật **dead neuron** — neuron chết khi `x < 0`. Bài này mình giới thiệu hai biến thể sửa đúng tật đó: **Leaky ReLU** và **Parametric ReLU (PReLU)**.

### 🩹 Ý tưởng: đừng để nhánh âm bằng 0

Nhắc lại ReLU: `max(0, x)`, đạo hàm chỉ `0` hoặc `1`. Vì nhánh âm cho đạo hàm `0` nên neuron có thể chết.

Cách sửa: cho nhánh âm một **độ dốc nhỏ** thay vì phẳng lì bằng 0.

* **Leaky ReLU** — nhân một hằng số nhỏ (ví dụ `0.01`) cho phần âm:

```text
LeakyReLU(x) = max(0.01 * x, x)
```

* **Parametric ReLU (PReLU)** — thay hằng số bằng **alpha** học được:

```text
PReLU(x) = max(alpha * x, x)
```

Ở đây **alpha là hyperparameter**, giá trị có thể `0.01`, `0.02`, `0.03`… tùy bài toán, chọn bằng **hyperparameter tuning**. Cố định `alpha = 0.01` thì gọi là **Leaky ReLU**; để alpha tự do thì gọi là **Parametric ReLU**.

---

### 📐 Đạo hàm không còn bằng 0

Vì nhánh âm có độ dốc nhỏ, đạo hàm với `x < 0` là **một số dương nhỏ** thay vì `0`; với `x > 0` vẫn là `1`.

```text
x > 0  →  đạo hàm = 1
x < 0  →  đạo hàm = alpha (nhỏ, dương)  ≠ 0
```

Nhờ đó trong **backpropagation** không bao giờ gặp đạo hàm `0` → **dead neuron được khắc phục**. Vì đạo hàm dương nhỏ chứ không bóp về 0, **vanishing gradient** cũng được xử lý.

---

### ✅ Ưu điểm

* **Thừa hưởng toàn bộ ưu điểm của ReLU.**
* **Không còn dead ReLU.** Giải được cả vanishing gradient lẫn dead neuron — nên về lý thuyết tốt hơn ReLU.

---

### ⚠️ Lưu ý

Về mặt khái niệm thì Leaky/PReLU tốt hơn ReLU, nhưng khi giải bài toán thật vẫn phải **thử từng loại** mới biết cái nào hợp dữ liệu.

Còn một điểm chưa giải quyết: **không zero-centered** (output vẫn chỉ `0` hoặc dương). Ta sẽ xem **ELU** — exponential linear unit — ở bài sau, vì nó xử lý thêm được điểm này. Hẹn gặp lại!
