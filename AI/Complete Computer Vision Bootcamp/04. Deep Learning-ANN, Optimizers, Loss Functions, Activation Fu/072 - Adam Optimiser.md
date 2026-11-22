---
title: 'Bài 072 — Adam optimizer'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 72
status: edited
source: '072 - Adam Optimiser.md'
categories:
- AI
tags: []
---

# 👑 Adam: optimizer tốt nhất cho phần lớn bài toán

> Nguồn: `072 - Adam Optimiser.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979279)

Chào các bạn! **Adam** là optimizer được dùng nhiều nhất hiện nay vì nó **gom toàn bộ ưu điểm** của các optimizer trước: **momentum** của SGD with Momentum và **learning rate động + làm mượt** của RMSprop. Bài này mình ghép hai mảnh đó lại thành công thức cập nhật của Adam.

### 🧩 Adam = Momentum + RMSprop

* Từ **SGD with Momentum**: giữ **vận tốc** `v_dw` (EWA của gradient) để làm mượt cập nhật weight.
* Từ **RMSprop**: learning rate **động** chia cho `sqrt(h_dw + epsilon)`, với `h_dw` là EWA của **bình phương** gradient để tránh phình vô hạn.

Nhờ gộp cả hai, Adam vừa **mượt** vừa **tự điều chỉnh learning rate**.

---

### 🧮 Công thức cập nhật

```text
w(t)  = w(t-1) - lr' * v_dw
b(t)  = b(t-1) - lr' * v_db
```

với learning rate động:

```text
lr' = lr / sqrt(h_dw + epsilon)
```

Phần **momentum** (làm mượt gradient):

```text
v_dw(t) = beta * v_dw(t-1) + (1 - beta) * (∂loss/∂w(t-1))
v_db(t) = beta * v_db(t-1) + (1 - beta) * (∂loss/∂b(t-1))
```

Phần **RMSprop** (làm mượt bình phương gradient):

```text
h_dw(t) = beta * h_dw(t-1) + (1 - beta) * (∂loss/∂w(t-1))²
```

* Khởi tạo `h_dw = 0` ở thời điểm đầu.
* `beta` giới hạn ảnh hưởng quá khứ; phần mới chỉ `1 - beta`. Adam chuẩn dùng hai hệ số riêng: `beta1` cho momentum và `beta2` cho bình phương gradient (thường `0.9` và `0.999`).
* **`epsilon`** rất nhỏ để tránh chia cho 0.

Điểm cần để ý: công thức viết cho thời điểm `t` thì các số hạng quá khứ dùng `t-1`; nếu viết cho `t+1` thì chúng thành `t`. Chỉ là đổi chỉ số thời gian, bản chất không đổi.

---

### 🧠 Hai lớp làm mượt

Adam có **tới hai** phép **EWA**:

1. Làm mượt **gradient** → `v_dw`, `v_db` (tinh thần momentum).
2. Làm mượt **bình phương gradient** → `h_dw` (tinh thần RMSprop), để learning rate động không sụp về 0.

Cả hai áp cho **cả weight lẫn bias**.

---

### 🏆 Vì sao chọn Adam

Adam kết hợp **SGD with Momentum**, **RMSprop**, **batch size**, **learning rate động** cùng **làm mượt learning rate** — nên **hội tụ nhanh** và hợp với đa số use case: **CNN**, **RNN**, v.v. Bạn vẫn có thể thử optimizer khác, nhưng Adam là lựa chọn mặc định đáng tin.

Điều thú vị: suốt chuỗi bài, ta chỉ **xoay quanh công thức cập nhật weight**. Nếu bạn tìm được cách cập nhật weight tốt hơn, bạn cũng có thể trở thành nhà nghiên cứu. Hẹn gặp lại ở bài tiếp theo!

> ⚠️ Cần kiểm chứng: công thức Adam trong transcript là bản rút gọn, bỏ qua **bias correction**. Adam chuẩn (và `torch.optim.Adam` / `tf.keras.optimizers.Adam`) còn chia moment bậc một và bậc hai cho `(1 - beta1^t)` và `(1 - beta2^t)` trước khi cập nhật.
