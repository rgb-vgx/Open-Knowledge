---
title: 'Bài 050 — ANN: trực giác và cách hoạt động'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 50
status: edited
source: '050 - ANN intuition and Working.mov.md'
categories:
- AI
tags: []
---

# 🧠 Mạng neuron nhiều lớp hoạt động như thế nào

> Nguồn: `050 - ANN intuition and Working.mov.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47940523)

Chào các bạn! Bài trước ta đã thấy perceptron một lớp chỉ biết **feed forward** và mò weights. Bài này mình cho các bạn cái nhìn **từ trên cao (1000 feet)** về **multi-layer perceptron** — tức **mạng neuron nhiều lớp** — với hai trụ cột **forward propagation** và **backward propagation**, cùng **loss function**, **optimizers** và **activation function**.

Nhắc nhanh: **backward propagation** được phát minh bởi **Geoffrey Hinton** — người được xem là cha đẻ của cộng đồng deep learning. Chính kỹ thuật này mới cho phép tạo ra những mạng neuron thực sự sâu.

### 🏗️ Kiến trúc trong ví dụ

Bộ dữ liệu: **IQ**, **số giờ học mỗi ngày**, **số giờ chơi** → output **pass (1)** hoặc **fail (0)**. Có ba feature `X1, X2, X3`.

* **Input layer** nhận ba feature.
* **Hidden layer 1** có một neuron; thực tế có thể có bao nhiêu neuron và bao nhiêu hidden layer tùy ý.
* **Output layer** là lớp cuối, cũng một neuron.

Ở ví dụ này có hai lớp neuron (một hidden + một output) nên gọi là **two-layer neural network**. Mỗi lớp đều có **bias** riêng (`B1`, `B2`), hằng số đi kèm thường là `1`, và weights khởi tạo **ngẫu nhiên**.

---

### ➡️ Forward propagation: chạy xuôi qua từng neuron

**Forward propagation** là áp hai bước quen thuộc cho **mọi neuron** trong mạng:

1. **Bước một:** `Z = Σ(x_i * w_i) + b`, viết gọn là `WᵀX + b`.
2. **Bước hai:** đưa `Z` qua **activation function**.

Ví dụ số với bản ghi đầu `(IQ=95, study=4, play=4)`, weights `W1=0.01`, `W2=0.02`, `W3=0.03`, bias `0.001`:

```text
Z = 95*0.01 + 4*0.02 + 4*0.03 + 0.001 = 1.151
```

Đưa `Z` qua **sigmoid** — hàm ép mọi giá trị về khoảng `0..1`, có dạng `σ(z) = 1 / (1 + e^(-z))`:

```text
O1 = 1 / (1 + e^(-1.151)) ≈ 0.759
```

Output `O1 = 0.759` truyền sang hidden layer 2. Với `W4 = 0.02`, `B2 = 0.03`:

```text
Z' = 0.759*0.02 + 0.03 = 0.04518
O2 = 1 / (1 + e^(-0.04518)) ≈ 0.51129
```

Vậy `O2 ≈ 0.511` là **output dự đoán** của model cho bản ghi này.

---

### ⚡ Vì sao cần activation function

Hãy nghĩ tới việc đặt tay lên vật nóng. Neuron phải **kích hoạt** để báo "có vật nóng, rụt tay lại". Activation function quyết định neuron **bật (1)** hay **tắt (0)**. Và cũng nhờ weights đúng mà chỉ neuron ở bàn tay bị nóng kích hoạt, còn tay kia thì không. Việc **train** chính là tìm bộ weights chuẩn đó.

Ngoài **sigmoid**, còn nhiều activation function như **ReLU**; mỗi loại phù hợp một tình huống và sẽ được bàn kỹ sau.

---

### 📉 Loss function: đo mức sai

Output dự đoán ký hiệu `y_hat ≈ 0.511`, nhãn thật `y = 1`. Sai số:

```text
loss = y - y_hat = 1 - 0.511 ≈ 0.49
```

Đây chính là **loss function** — mức lỗi của model. Loss còn cao nghĩa là dự đoán chưa khớp; mục tiêu train là **giảm loss** bằng cách **cập nhật toàn bộ weights**.

---

### ⬅️ Backward propagation và vòng lặp train

Việc cập nhật đi **từ cuối về đầu**: sửa `W4` trước, rồi tới `W1, W2, W3`. Đó là **backward propagation**. Cơ chế cập nhật weights dựa trên **optimizers** — thành phần giúp giảm loss và chỉnh weights hợp lý.

Sau khi cập nhật xong, bản ghi tiếp theo lại đi qua forward propagation, tính loss, rồi backward propagation. Vòng lặp **forward → loss → backward** lặp mãi cho tới khi loss giảm đủ.

---

### 🔀 Loss function vs cost function

Một điểm dễ nhầm:

* **Loss function** — tính sai số cho **từng điểm** dữ liệu rồi cập nhật weights.
* **Cost function** — tính sai số gộp cho **toàn bộ điểm** (ví dụ `Σ(y - y_hat)²`) rồi mới cập nhật weights **một lần**.

Chi tiết này mình sẽ đào sâu ở các bài về loss function. Bài sau ta sẽ đi vào **backward propagation** chi tiết hơn. Hẹn gặp lại!
