---
title: 'Bài 070 — Adagrad: learning rate động'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 70
status: edited
source: '070 - Adagard.md'
categories:
- AI
tags: []
---

# 📉 Adagrad: để learning rate tự điều chỉnh

> Nguồn: `070 - Adagard.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979267)

Chào các bạn! Các optimizer trước đều dùng **learning rate cố định** (`~0.001`). Nhưng điều ta thực sự muốn là **bước lớn lúc đầu, bước nhỏ khi gần đích** — tức learning rate **động**. **Adagrad** (adaptive gradient) làm đúng việc đó. Bài này mình giới thiệu công thức và cái giá của nó.

### 🎯 Vì sao cần learning rate động

Trên đường loss theo weight, nếu xuất phát xa global minima, bước lớn sẽ hội tụ **nhanh**; khi đã sát đáy thì bước nhỏ để khỏi vọt qua. Learning rate cố định không đáp ứng được cả hai, nên ta muốn nó **thay đổi theo quá trình**.

---

### 🧮 Công thức Adagrad

```text
w(t) = w(t-1) - lr' * (∂loss/∂w(t-1))
```

với `lr'` là learning rate **động**:

```text
lr' = lr / sqrt(alpha_t + epsilon)
alpha_t = Σ_{i=1..t} (∂loss/∂w_i)²
```

* **`alpha_t`** là tổng **bình phương** các đạo hàm tích lũy từ đầu tới thời điểm `t`. Càng lan qua nhiều lớp, `alpha_t` **càng lớn**.
* **`epsilon`** là một số rất nhỏ, thêm vào để tránh **chia cho 0** khi `alpha_t = 0`.

Vì `alpha_t` nằm ở mẫu và luôn tăng, `lr'` sẽ **giảm dần** theo thời gian:

```text
t=1:  lr' ≈ 0.01
t=2:  lr' ≈ 0.005
t=3:  lr' ≈ 0.003
...
```

Ban đầu học nhanh (bước lớn), càng về sau bước càng ngắn — đúng điều ta muốn.

---

### ✅ Ưu điểm

* **Learning rate động**: tự điều chỉnh, lớn lúc đầu và nhỏ dần khi tiến về global minima.

---

### ❌ Nhược điểm

Trong mạng **rất sâu**, `alpha_t` có thể tăng **quá lớn** khiến `lr'` trở nên **cực nhỏ, gần 0**. Khi đó:

```text
w(t) ≈ w(t-1)
```

Lượng cập nhật gần bằng 0 → weight **gần như đứng im** → hội tụ chậm hoặc kẹt. Đây là điểm yếu của Adagrad.

---

### ➡️ Bước kế tiếp

Vấn đề "learning rate teo dần về 0" sẽ được các optimizer sau xử lý — cụ thể là **Adadelta** và **RMSprop**. Đó là mạch phát triển quen thuộc: mỗi optimizer ra đời để vá điểm yếu của cái trước. Hẹn gặp lại!
