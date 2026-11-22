---
title: 'Bài 051 — Lan truyền ngược và công thức cập nhật trọng số'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 51
status: edited
source: '051 - Back Propogation and Weight Updation.md'
categories:
- AI
tags: []
---

# 🔄 Backpropagation và công thức cập nhật weights

> Nguồn: `051 - Back Propogation and Weight Updation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47940531)

Chào các bạn! Bài trước là cái nhìn tổng quan. Bài này ta đi sâu vào **backward propagation** — xem weights được cập nhật ra sao, và vì sao công thức cập nhật chắc chắn hội tụ.

### 🧱 Mạng hai lớp trong ví dụ

Input layer có **3 feature độc lập** (independent): **IQ**, **study hours**, **play hours**. Output là **dependent feature** — thay đổi theo input.

* **Hidden layer** có **2 neuron**, mỗi neuron có **bias**.
* Mọi input nối tới mọi hidden neuron: weights `W1..W6`.
* Từ hidden layer tới output layer: weights `W7`, `W8`.
* **Output layer** chỉ cần **1 neuron** vì đây là bài toán nhị phân (ra `0` hoặc `1`). Với bài toán **multi-class**, cần nhiều neuron output hơn — ví dụ bài toán 3 lớp có thể dùng **2 neuron** để mã hóa các output `0, 1, 2`.

Vì có 3 input và 2 hidden neuron, **ma trận weights `W`** có dạng **3×2** (3 input × 2 hidden neuron); nhân `X` (1×3) với `W` (3×2) cho ra 2 giá trị `Z` ứng với hai hidden neuron.

---

### ➡️ Forward rồi tính loss

Forward propagation nhân input với weights, cộng bias, áp activation function, ra output. Sau đó tính **loss function**. Với bài toán nhị phân có các lựa chọn phổ biến:

* **Regression:** mean squared error, mean absolute error, Huber loss.
* **Classification:** binary cross entropy, cross entropy, categorical cross entropy.

Dạng đơn giản nhất là bình phương sai lệch `(y - y_hat)²`. Mục tiêu: **giảm loss bằng cách cập nhật weights** trong backward propagation.

---

### 🧮 Công thức cập nhật weights

Bắt đầu từ lớp gần output nhất, cập nhật `W7`, `W8` trước:

```text
w_new = w_old - learning_rate * (∂loss / ∂w_old)
```

Đạo hàm `∂loss / ∂w_old` chính là **độ dốc (slope)** của đồ thị loss theo weight — nền tảng của **gradient descent**.

---

### 📉 Vì sao công thức này luôn kéo về global minima

Đồ thị loss theo weight thường có dạng một đường cong lồi, đáy là **global minima** — nơi slope bằng `0`.

* Nếu điểm hiện tại nằm **bên trái** đáy: tiếp tuyến dốc xuống → **slope âm**. `w_new = w_old - lr * (âm)` → `w_new > w_old`, tức là **tăng** weight, tiến về đáy.
* Nếu điểm nằm **bên phải** đáy: tiếp tuyến dốc lên → **slope dương**. `w_new = w_old - lr * (dương)` → `w_new < w_old`, tức là **giảm** weight, cũng tiến về đáy.

Khi weight tới đáy, slope `= 0` nên `w_new = w_old` — **hội tụ**, không cần cập nhật nữa. Lúc này loss gần `0`.

---

### 🎚️ Learning rate: bước nhảy tới đáy

**Learning rate** quyết định **bước nhảy** mỗi lần cập nhật:

* **Quá nhỏ** (ví dụ `0.001`): mỗi bước rất ngắn, converge chậm nhưng ổn định.
* **Quá lớn**: bước nhảy lớn, dao động qua lại quanh đáy, thậm chí **văng ra ngoài** và **không bao giờ hội tụ**.

Vì vậy thực hành thường khởi tạo learning rate **nhỏ**.

```text
w_new = w_old - lr * slope
```

---

### 🔗 Còn các lớp phía trước thì sao?

Ta mới cập nhật `W7`, `W8`. Nhưng `W7` phụ thuộc vào `W1`, `W8` phụ thuộc vào `W2`… vì các neuron liên kết với nhau. Muốn cập nhật `W1, W2, W3` phải dùng **chain rule of derivatives** — chủ đề của bài sau.

Hiểu chắc phần lý thuyết này thì khi code sẽ rất nhẹ nhàng. Hẹn gặp các bạn ở bài tiếp theo!
