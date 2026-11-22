---
title: 'Bài 048 — Trực giác về Perceptron'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 48
status: edited
source: '048 - Perceptron Intuition.md'
categories:
- AI
tags: []
---

# 🧩 Perceptron: đơn vị neural network đầu tiên

> Nguồn: `048 - Perceptron Intuition.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47940475)

Chào các bạn! Bài này mình nói về **perceptron** — một đơn vị neural network rất đơn giản, còn được gọi là **single-layer neural network**. Đây là viên gạch cơ bản của **ANN** (artificial neural network). Ta sẽ bóc tách từng thành phần: **input layer**, **hidden layer**, **weights**, **bias** và **activation function**.

### 🎯 Bài toán: dự đoán đậu hay rớt

Perceptron dùng để giải bài toán **binary classification**. Lấy ví dụ bộ dữ liệu nhỏ gồm hai feature: **IQ** và **số giờ học**. Output là **pass** hoặc **fail**.

| IQ | Số giờ học | Kết quả |
|---|---|---|
| 95 | 3 | Fail |
| 110 | 4 | Pass |
| 100 | 5 | Pass |

Ta cần một perceptron dự đoán được người đó đậu hay rớt từ hai feature trên.

### 🏗️ Kiến trúc: input layer và hidden layer

Perceptron có:

* **Input layer** — ở đây là hai input `x1` (IQ) và `x2` (số giờ học). Số input bằng số feature, không giới hạn.
* **Hidden layer** — nối các input tới **một neuron** duy nhất. Vì chỉ có một hidden layer với một neuron nên mới gọi là **single-layer neural network** (input layer không được tính là một layer riêng).
* **Weights** `W1`, `W2` — gắn trên các kết nối input → neuron.

Mình minh họa ý nghĩa của **weights** bằng ví dụ đời thường: đặt tay lên một vật nóng, tín hiệu được neuron xử lý và báo lên não rằng sắp bị bỏng. Khi đó **weights được kích hoạt, giá trị cao**, nên bạn rụt đúng bàn tay đó chứ không phải tay còn lại. Con người được "train" weights từ nhỏ: nhìn thấy con mèo thì biết là mèo, con vật lạ thì được bố mẹ dạy "đây là con chó, đây là con gà".

---

### 🧮 Bước 1: tổng có trọng số cộng bias

Trong neuron có **hai bước xử lý**. Bước một là tính:

```text
z = Σ (w_i * x_i) + b
```

với hai input thì `z = W1*X1 + W2*X2 + b`. Nếu có `n` feature thì cứ cộng dồn `W1X1 + W2X2 + ... + WnXn` rồi cộng **bias**.

**Bias `b`** đóng vai trò rất quan trọng. Weights thường được khởi tạo ngẫu nhiên; nếu khởi tạo bằng 0 thì mọi phép tính đều ra 0 và neuron "chết". Bias được thêm vào như một lượng **noise** nhỏ để tránh điều đó, đồng thời giúp model tổng quát hóa trước dữ liệu khác biệt. Theo ngôn ngữ **linear regression**, bias chính là **intercept** (hệ số chặn).

Công thức này gần như trùng với dạng `y = mx + c`, hay `β1X1 + β2X2 + ... + βnXn` trong hồi quy tuyến tính — nên nó dùng để giải các bài toán **tuyến tính**.

### ⚡ Bước 2: áp activation function

Lấy giá trị `z` vừa tính, ta đưa qua **activation function** để biến đổi output về một khoảng giá trị, ví dụ `0..1` hoặc `-1..+1`. Có nhiều loại:

* **Step function** — nếu `z <= 0` thì ra `0`, nếu `z > 0` thì ra `1`. Ngưỡng (threshold) là **0**.
* **Sigmoid** — ép giá trị về khoảng `0..1`; nếu `z > 0.5` thì coi là `1`, ngược lại là `0`. Ngưỡng ở đây là **0.5**.
* Ngoài ra còn **ReLU** và nhiều hàm khác, mỗi hàm có chức năng riêng.

Mục đích cuối cùng: với bài toán binary classification, sau bước này ta phải thu được **0 hoặc 1**.

---

### 🔁 Sai số và vòng cập nhật weight

Giả sử đưa mẫu `(95, 3)` vào, nhân weights, qua activation và nhận output `0`. Nếu nhãn thật cũng là `0` thì **error = 0**, weights khởi tạo đang tốt. Nhưng nếu nhãn thật là `1` mà ta ra `0` thì **error = 1 - 0 = 1**; ta phải **cập nhật `W1`, `W2`** để giảm sai số.

Quá trình này lặp liên tục cho tới khi tìm được bộ weights thỏa mãn mọi bản ghi và cho accuracy tốt hơn. Sai số đó chính là **loss function**; nếu tính trên toàn bộ bản ghi một lượt thì gọi là **cost function**. Việc lan truyền xuôi rồi ngược để cập nhật weights chính là **forward propagation** và **backward propagation**.

### 📏 Vì sao gọi là linear classifier

Với hai bước trên, perceptron tạo được một **đường thẳng** tách hai nhóm điểm trong bài toán phân loại. Nói cách khác, **perceptron là một linear classifier** — mục tiêu cuối cùng là tìm **best fit line** để giải bài toán.

Đó là perceptron. Bài sau mình sẽ chỉ ra **ưu và nhược điểm** của nó, rồi giải thích vì sao phải chuyển từ mạng một lớp sang **mạng nhiều lớp**. Hẹn gặp lại!
