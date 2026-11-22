---
title: 'Bài 069 — SGD with Momentum'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 69
status: edited
source: '069 - SGD with Momentum.md'
categories:
- AI
tags: []
---

# 🏄 SGD with Momentum: làm mượt đường hội tụ

> Nguồn: `069 - SGD with Momentum.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979257)

Chào các bạn! Mini-batch SGD đã giảm noise nhưng đường hội tụ vẫn còn zigzag. **SGD with Momentum** xử lý nốt phần noise đó bằng **exponential weighted average** — kỹ thuật quen thuộc trong time series. Bài này mình đi qua công thức và vì sao nó làm mượt.

### 🔁 Viết lại công thức theo thời gian

Công thức cập nhật weight (và cả **bias**) viết dưới dạng "thời điểm `t`":

```text
w(t)   = w(t-1) - lr * (∂loss/∂w(t-1))
bias(t)= bias(t-1) - lr * (∂loss/∂bias(t-1))
```

Tức weight mới phụ thuộc weight **ngay trước đó** (`t-1`) trừ đi learning rate nhân đạo hàm. Cách viết này tiện để chèn **momentum**.

---

### 📈 Exponential weighted average (EWA)

Xét chuỗi giá trị `a1, a2, a3, ...` theo thời gian `t1, t2, t3, ...`. Để làm mượt, đưa vào một tham số **beta** (trong khoảng `0..1`):

```text
v(t1) = a1
v(t2) = beta * v(t1) + (1 - beta) * a2
v(t3) = beta * v(t2) + (1 - beta) * a3
...
```

Với **beta = 0.95**:

```text
v(t2) = 0.95*a1 + 0.05*a2
v(t3) = 0.95*(0.95*a1 + 0.05*a2) + 0.05*a3
```

Ý nghĩa: **beta càng lớn thì giá trị trước chi phối càng nhiều**, giá trị hiện tại ít ảnh hưởng hơn. Kết quả là đường **mượt** thay vì zigzag.

---

### 🛠️ Áp vào cập nhật weight

Thay vì dùng trực tiếp đạo hàm tại thời điểm `t`, momentum giữ một **trung bình có trọng số** của các gradient quá khứ (chính là áp EWA cho từng mắt xích đạo hàm trong chain rule). Nhờ "quán tính" này, các dao động nhỏ bị triệt bớt, đường đi có **hướng ổn định** hơn về global minima.

```text
Mini-batch SGD:  /\/\/\_   (vẫn còn nhiễu)
+ Momentum:      ~~~~~~\    (mượt, đi thẳng hơn)
```

---

### ✅ Ưu điểm

1. **Giảm noise** — nhờ làm mượt các giá trị đạo hàm.
2. **Hội tụ nhanh hơn** — đường đi ngắn và có định hướng.

Điểm cần nhớ: không có gì mới ngoài việc đưa **EWA** vào phần tính đạo hàm của weights; cách này giống các kỹ thuật làm mượt trong time series (ARIMA, SARIMA).

---

### ➡️ Bước kế tiếp

Tới giờ ta mới "chơi" với công thức cập nhật weight; **learning rate vẫn cố định**. Optimizer tiếp theo — **Adagrad** — sẽ làm **learning rate động**: lớn lúc đầu, nhỏ dần khi tới gần global minima. Hẹn gặp lại!
