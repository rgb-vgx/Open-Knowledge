---
title: 'Bài 071 — Adadelta và RMSprop'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 71
status: edited
source: '071 - RMSPROP.md'
categories:
- AI
tags: []
---

# 🧯 RMSprop / Adadelta: chặn learning rate tụt về 0

> Nguồn: `071 - RMSPROP.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979275)

Chào các bạn! Adagrad làm learning rate động nhưng có tật: trong mạng sâu, `alpha_t` phình quá lớn khiến learning rate teo gần về `0` (`~0.00001`), weight gần như đứng im. **Adadelta** và **RMSprop** sửa đúng chỗ đó. Bài này mình đi qua cách chúng làm.

### 🧠 Nhắc lại vấn đề của Adagrad

Adagrad chia learning rate cho `sqrt(alpha_t + epsilon)`, với `alpha_t = Σ (∂loss/∂w)²` cộng dồn **toàn bộ** quá khứ. Vì cộng dồn mãi và còn bình phương, `alpha_t` tăng không giới hạn → learning rate động teo dần về `0` → không cập nhật được weight → không hội tụ.

---

### 🩹 Cách sửa: thay tổng cộng dồn bằng trung bình có trọng số

RMSprop/Adadelta thay `alpha_t` bằng một đại lượng **`s_dw(t)`** được làm mượt bằng **exponential weighted average**:

```text
lr' = lr / sqrt(s_dw(t) + epsilon)

s_dw(t) = beta * s_dw(t-1) + (1 - beta) * (∂loss/∂w(t-1))²
```

* Khởi tạo `s_dw = 0` ở thời điểm đầu.
* `beta` (ví dụ `0.95`) **giới hạn** ảnh hưởng của quá khứ; phần đóng góp mới chỉ còn `1 - beta = 0.05`.

Điểm mấu chốt: `s_dw` **không cộng dồn vô hạn** như `alpha_t`, mà chỉ là trung bình có trọng số → **không phình lên mãi** → learning rate không bị bóp về 0.

---

### ✅ Hai thứ RMSprop/Adadelta đem lại

1. **Vẫn giữ learning rate động** (lớn lúc đầu, nhỏ dần khi gần đích).
2. **Làm mượt** (EWA) để giá trị không tăng vô hạn, tránh learning rate sụp về 0.

Weight vẫn cập nhật theo công thức quen thuộc với learning rate động:

```text
w(t) = w(t-1) - lr' * (∂loss/∂w(t-1))
```

---

### 🤔 Adadelta và RMSprop khác gì nhau

Về cơ chế gần như **giống hệt**. Hai cái tên đến từ **hai nhóm nghiên cứu khác nhau**, chỉ khác chút ít trong công thức — nhưng cách vận hành tương đương.

---

### ⚠️ Điều còn thiếu

RMSprop/Adadelta lo phần **dynamic learning rate + smoothing**, nhưng **chưa có momentum cho bản thân weight** (chưa gộp SGD with momentum). Việc **ghép cả hai** — momentum + RMSprop — chính là **Adam**, optimizer tốt nhất hiện nay. Hẹn gặp lại!
