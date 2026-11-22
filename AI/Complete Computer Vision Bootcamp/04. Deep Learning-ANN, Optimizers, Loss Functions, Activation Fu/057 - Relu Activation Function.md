---
title: 'Bài 057 — ReLU activation function'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 57
status: edited
source: '057 - Relu Activation Function.md'
categories:
- AI
tags: []
---

# ⚡ ReLU: activation function phổ biến nhất

> Nguồn: `057 - Relu Activation Function.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956809)

Chào các bạn! Sigmoid và tanh đều dính **vanishing gradient**. Hàm thứ ba — **ReLU** (rectified linear unit) — là activation function được dùng nhiều nhất hiện nay và **dẹp được** vấn đề đó. Nhưng nó lại mang theo một căn bệnh mới: **dead neuron**.

### 🧮 Công thức đơn giản đến bất ngờ

```text
ReLU(x) = max(0, x)
```

* `x > 0` → giữ nguyên `x`.
* `x = 0` → `0`.
* `x < 0` → `0`.

Đạo hàm cũng đơn giản: **hoặc `1`, hoặc `0`**. Với `x > 0` thì `1` (và giá trị đạo hàm giữ nguyên `1`); với `x < 0` thì `0`.

### 🛠️ Vì sao ReLU sửa được vanishing gradient

Nhìn lại chain rule khi cập nhật `W2` trên mạng nhiều lớp. Trước đây mắt xích `∂(activation)/∂Z` nằm trong `0..0.25` (sigmoid) hay `0..1` (tanh), nên nhân dồn là teo dần.

Với ReLU, mắt xích này chỉ nhận **`0` hoặc `1`**:

* Nếu là **`1`**: giá trị **không bị thu nhỏ** → `w_new` khác `w_old` đủ rõ, **cập nhật weight diễn ra bình thường**.
* Nếu là **`0`**: xem phần dưới.

Vậy là gradient không còn bị bóp nhỏ một cách hệ thống → vanishing gradient được khắc phục.

### 💀 Nhược điểm: dead neuron

Nếu `Z` âm, đạo hàm ReLU `= 0`. Khi đó trong công thức:

```text
W2_new = W2_old - lr * (∂loss/∂W2_old)   (toàn bộ số hạng đạo hàm = 0)
→ W2_new ≈ W2_old
```

Toàn bộ đạo hàm bằng `0` kéo theo learning rate cũng nhân với `0`, nên weight **không cập nhật**. Neuron đó **chết** — mất chức năng, output luôn bằng `0` và không còn được cập nhật. Đó là **dead neuron**.

Điều kiện gây chết: `Z = O2*W3 + B3` **âm** → đạo hàm `= 0` → neuron chết. Nếu `Z` dương → đạo hàm `= 1` → hoạt động bình thường.

```text
Z > 0  →  ReLU'(Z) = 1  →  weight cập nhật
Z < 0  →  ReLU'(Z) = 0  →  dead neuron
```

---

### 📊 Ưu và nhược điểm

| Ưu điểm | Nhược điểm |
|---|---|
| Khắc phục vanishing gradient | Có thể tạo **dead neuron** |
| Tính toán cực nhanh (`max(0, x)`) | Không zero-centered (output `0` hoặc dương) |
| Quan hệ tuyến tính cả forward lẫn backward | |
| Nhanh hơn sigmoid và tanh | |

Vì là hàm tuyến tính từng khúc, cả forward lẫn backward đều là đường thẳng nên **tính toán nhanh hơn hẳn** sigmoid và tanh.

### 🔜 Hướng khắc phục dead neuron

Có những tình huống ta có thể xử lý để `Z` không bao giờ âm — và đó là tiền đề cho **Leaky ReLU**, phiên bản cải tiến của ReLU, sẽ học ở bài sau. Hẹn gặp lại!
