---
title: 'Bài 059 — ELU activation function'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 59
status: edited
source: '059 - ELU Activation Function.md'
categories:
- AI
tags: []
---

# 🌊 ELU: vừa chống dead neuron vừa zero-centered

> Nguồn: `059 - ELU Activation Function.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956885)

Chào các bạn! Leaky ReLU và PReLU đã chữa được **dead neuron** nhưng vẫn còn một tật: **không zero-centered**, khiến việc cập nhật weights kém hiệu quả. **ELU** (exponential linear unit) xử lý được cả hai. Bài này mình đi qua nó.

### 🔍 Nhắc lại tật còn sót của Leaky/PReLU

Ở bài trước mình có bỏ sót một điểm: Leaky ReLU và Parametric ReLU **không zero-centered** (output vẫn `0` hoặc dương). Không zero-centered thì **weight updation không hiệu quả** khi dùng gradient descent.

---

### 🧮 ELU hoạt động ra sao

ELU cũng là một biến thể để sửa các vấn đề của ReLU, nhưng có nhiều ưu điểm hơn Leaky/PReLU:

* Với `x > 0`: dùng `x`.
* Với `x <= 0`: dùng một hàm mũ (thay vì đường thẳng), nên đồ thị **mềm** chứ không gãy khúc như ReLU.

Vì vậy forward propagation không còn là đường thẳng gấp khúc; sang backward propagation, đạo hàm có dạng cong — với `x > 0` giá trị là `1`, với `x < 0` là `α·e^x` (α là hệ số của nhánh âm): **dương** và nhỏ dần về `0` (không phải giá trị âm).

---

### ✅ Ưu điểm

1. **Không còn dead ReLU** — nhánh âm không bao giờ bằng 0 nên neuron không chết.
2. **Zero-centered** — các giá trị âm kéo đường cong đi qua gốc, mean gần `0`. Trước đó Leaky/PReLU không có tính chất này.

---

### ⚠️ Nhược điểm

* **Tính toán nặng hơn** Leaky ReLU vì công thức có phép mũ. Đây là cái giá của việc có đường cong mềm.

```text
ELU: x > 0 → x        x ≤ 0 → hàm mũ (âm, tiến dần về một cận dưới)
     ưu: zero-centered + không dead neuron
     nhược: tốn tính toán hơn Leaky ReLU
```

---

### 🧭 Tóm lại

ELU chỉ dùng để sửa các vấn đề của ReLU, và nó cân bằng được hai mục tiêu: **không dead neuron** và **zero-centered**. Nhưng không có activation function nào "thắng tuyệt đối" — lựa chọn còn tùy loại dữ liệu và bài toán; bạn nên thử nhiều loại.

Bài sau mình sẽ tổng hợp: **dùng activation function nào ở đâu** — hidden layer nên dùng gì, output layer nên dùng gì. Hẹn gặp lại!
