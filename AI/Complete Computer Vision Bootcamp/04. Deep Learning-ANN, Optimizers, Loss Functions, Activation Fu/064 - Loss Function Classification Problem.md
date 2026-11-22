---
title: 'Bài 064 — Loss function cho bài toán classification'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 64
status: edited
source: '064 - Loss Function Classification Problem.md'
categories:
- AI
tags: []
---

# 🧮 Cross entropy: loss cho phân loại

> Nguồn: `064 - Loss Function Classification Problem.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47957885)

Chào các bạn! Bài trước là loss cho **regression**; bài này là loss cho **classification**. Cả họ dùng chung cái tên **cross entropy**, chia làm ba loại: **binary cross entropy (BCE)**, **categorical cross entropy (CCE)** và **sparse categorical cross entropy**. Đây là câu hỏi phỏng vấn rất hay gặp.

### 1️⃣ Binary Cross Entropy (BCE)

Dùng cho **binary classification**. Công thức cùng dạng **log loss** của logistic regression:

```text
loss = -y * log(y_hat) - (1 - y) * log(1 - y_hat)
```

Tách hai trường hợp:

* Nếu **`y = 0`**: số hạng đầu bằng `0`, còn `loss = -log(1 - y_hat)`.
* Nếu **`y = 1`**: số hạng sau bằng `0`, còn `loss = -log(y_hat)`.

`y_hat` được tính thế nào? Với mạng nhỏ (2 input → hidden → 1 output), output layer áp **sigmoid**:

```text
y_hat = sigmoid(O1 * W3 + b)
```

`y_hat` chính là output sau sigmoid; so với `y` thật để ra loss, rồi optimizer backpropagate giảm loss. Vòng lặp lặp tới khi loss đủ nhỏ.

### 2️⃣ Categorical Cross Entropy (CCE)

Dùng cho **multi-class classification**. Ví dụ với output `good` / `bad` / `neutral` — nhiều hơn hai lớp nên không dùng BCE.

Bước đầu: **one-hot encode** nhãn. Với ba lớp, nhãn `good` thành `[1,0,0]`, `bad` thành `[0,1,0]`, `neutral` thành `[0,0,1]`. Gọi `y_ij = 1` nếu điểm `i` thuộc lớp `j`, ngược lại `0`.

Hàm loss:

```text
loss = -Σ_j y_ij * log(y_hat_ij)
```

Với `y_hat` tính bằng **softmax** ở output layer (chính là softmax đã học). Kết quả là **xác suất từng lớp** (cộng lại bằng `1`), ví dụ `20% / 30% / 50%`. Vector xác suất này là output chung của cả CCE lẫn sparse CCE; hai bản chỉ khác định dạng nhãn.

### 3️⃣ Sparse Categorical Cross Entropy

Cũng cho **multi-class**, công thức loss giống hệt CCE, nhưng khác ở cách biểu diễn nhãn: **không cần one-hot**. Nhãn là **chỉ số lớp** (index `0, 1, 2, ...`). Output của model vẫn là **vector xác suất** như CCE — sparse chỉ đổi định dạng nhãn, không đổi output.

```text
CCE    : nhãn one-hot, output đầy đủ xác suất các lớp
Sparse : nhãn là index, output vẫn đầy đủ xác suất các lớp
```

**Ưu điểm của sparse:** nhãn gọn hơn, tiết kiệm bộ nhớ khi số lớp nhiều. Nhược điểm: không dùng được khi nhãn đã ở dạng one-hot.

---

### 🧭 Chọn loại nào

* **Binary classification** → **binary cross entropy**.
* **Multi-class, nhãn đã one-hot** → **categorical cross entropy**.
* **Multi-class, nhãn là index** → **sparse categorical cross entropy**.

Ba loại này sẽ xuất hiện lại khi vào phần thực hành. Bài sau mình sẽ ghép **activation function ở output** với **loss function** cho từng loại bài toán. Hẹn gặp lại!

> ⚠️ Cần kiểm chứng: transcript gốc mô tả sparse CCE chỉ trả về index và "mất xác suất các lớp khác"; theo tài liệu TensorFlow, `SparseCategoricalCrossentropy` dùng cùng output xác suất như CCE, chỉ nhận nhãn là số nguyên thay vì one-hot.
