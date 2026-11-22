---
title: 'Bài 056 — Tanh activation function'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 56
status: edited
source: '056 - Tanh Activation Function.md'
categories:
- AI
tags: []
---

# 🌗 Tanh: đưa output về quanh gốc

> Nguồn: `056 - Tanh Activation Function.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956727)

Chào các bạn! Ta đã thấy sigmoid có ba bệnh: **output 0..1**, đạo hàm `0..0.25` gây vanishing gradient, và **không zero-centered**. Hàm thứ hai — **tanh** (hyperbolic tangent) — sửa được một trong số đó. Bài này so sánh nó với sigmoid.

### 🧮 Công thức và khoảng giá trị

```text
tanh(z) = (e^z - e^(-z)) / (e^z + e^(-z))
```

với `z = Σ(WᵀX) + b`. Tanh biến đổi `z` về khoảng **-1 đến +1** (thay vì `0..1` như sigmoid). Đường cong của tanh và sigmoid khá giống nhau, chỉ khác dải giá trị.

---

### 📐 Đạo hàm: 0..1

Điểm khác biệt then chốt: **đạo hàm của tanh nằm trong `0..1`**, rộng hơn nhiều so với `0..0.25` của sigmoid. Đó là tiến bộ, nhưng chưa đủ.

---

### ✅ Ưu điểm

* Output **-1..+1**.
* **Zero-centric** (đi qua gốc 0) — tốt hơn hẳn sigmoid. Nhớ lại: hàm zero-centered giúp **cập nhật weights hiệu quả hơn** khi dùng gradient descent.

---

### ❌ Vẫn còn vấn đề

1. **Vanishing gradient vẫn tồn tại với mạng sâu.** Đạo hàm `0..1` vẫn có thể nhân dồn thành số nhỏ: một mắt xích có thể là `0.5 → 0.23 → 0.01 → 0.005 → ...`. Nhân qua nhiều lớp thì `w_new ≈ w_old`, weights đứng im. Với mạng **trung bình** có thể chưa thấy bệnh rõ, nhưng mạng rất sâu thì vẫn dính.
2. **Tính toán chậm** — công thức có `e^z` và `e^(-z)`, phép mũ tốn thời gian.

```text
sigmoid:  output 0..1    đạo hàm 0..0.25   không zero-centered
tanh:     output -1..1   đạo hàm 0..1      zero-centered
```

---

### ➡️ Bước tiếp theo

Tanh vá được lỗi **zero-centered** và nới rộng đạo hàm, nhưng **chưa trị dứt vanishing gradient** vì đạo hàm vẫn bị chặn `≤ 1` và teo dần khi nhân dồn.

Câu hỏi đặt ra: làm sao có activation function **không bóp nhỏ gradient**? Câu trả lời là **ReLU** — hàm phổ biến nhất hiện nay — sẽ được bàn ở bài sau. Hẹn gặp lại!
