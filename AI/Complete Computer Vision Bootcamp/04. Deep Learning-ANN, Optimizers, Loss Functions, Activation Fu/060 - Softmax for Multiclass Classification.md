---
title: 'Bài 060 — Softmax cho bài toán phân loại nhiều lớp'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 60
status: edited
source: '060 - Softmax for Multiclass Classification.md'
categories:
- AI
tags: []
---

# 🎲 Softmax: biến output thành xác suất nhiều lớp

> Nguồn: `060 - Softmax for Multiclass Classification.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957147)

Chào các bạn! Đây là bài rất quan trọng: **softmax**. Nếu **binary classification** dùng **sigmoid** ở output layer thì **multi-class classification** phải dùng **softmax**. Phần lớn bài toán thực tế là multi-class, nên nắm chắc hàm này là bắt buộc.

### 🔀 Vì sao không dùng sigmoid cho nhiều lớp

Ví dụ mạng có input layer 3 node, hai hidden layer, rồi **output layer một neuron**. Đây là **binary classification** → output layer dùng **sigmoid**, ép về `0..1`; đặt ngưỡng `0.5` để ra `0`/`1`. Ổn.

Nhưng nếu output layer có **4 neuron**, bài toán thành **multi-class**: từ `X1, X2, X3` (feature ảnh) dự đoán **cat**, **dog**, **monkey**, **horse**. Mỗi neuron output ứng với một lớp và cần ra **xác suất** của lớp đó. Sigmoid không làm được việc này vì nó chỉ cho nhị phân trên một neuron — nên ta dùng **softmax**.

### 🧮 Công thức softmax

```text
softmax(y_i) = e^(y_i) / Σ_k e^(y_k)
```

với `y_i` là output thô (input × weights + bias) của node thứ `i`, và tổng ở mẫu chạy trên **toàn bộ node output** (`k` từ 1 đến số lớp). Nhờ chia cho tổng, các giá trị sau softmax **cộng lại bằng 1** — đúng tính chất của phân bố xác suất.

### 🔢 Ví dụ số

Giả sử output thô trước softmax của 4 lớp là `-1, 0, 3, 5`. Tính:

```text
e^-1 = 0.3679   e^0 = 1.0   e^3 = 20.0855   e^5 = 148.4132
tổng = 169.8666

cat    = 0.3679 / 169.8666 ≈ 0.002
dog    = 1.0000 / 169.8666 ≈ 0.006
monkey = 20.0855 / 169.8666 ≈ 0.118
horse  = 148.4132 / 169.8666 ≈ 0.874
```

Cộng lại xấp xỉ `1.0`. **Horse** có xác suất cao nhất (~`87%`), nên model dự đoán **horse**.

### 🏁 Kết luận

Softmax ở **output layer** biến output thô thành **xác suất của từng lớp**; lớp có xác suất lớn nhất là dự đoán cuối cùng.

Quy tắc cần nhớ:

* **Binary classification** → **sigmoid**.
* **Multi-class classification** → **softmax**.

Bài sau mình sẽ chốt lại **dùng activation function nào ở đâu**, tổng hợp toàn bộ chuỗi bài vừa rồi. Hẹn gặp lại!
