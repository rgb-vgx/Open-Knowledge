---
title: 'Bài 073 — Exploding gradient problem'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 73
status: edited
source: '073 - Exploding Gradient Problem.md'
categories:
- AI
tags: []
---

# 💥 Exploding gradient: khi gradient phình quá lớn

> Nguồn: `073 - Exploding Gradient Problem.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979299)

Chào các bạn! Ta đã gặp **vanishing gradient** — gradient teo về 0. Bài này là người anh em sinh đôi của nó: **exploding gradient** — gradient **phình quá lớn**. Cùng một cơ chế chain rule, nhưng thủ phạm lần này là **weights khởi tạo quá lớn**.

### 🏗️ Mạng và chain rule

Mạng có hai hidden layer rồi output layer. Từ input tới hidden layer 1 dùng weights `W1, W2, W3`; qua activation function ra `O1`; rồi tới hidden layer 2 và output; vì là binary classification nên áp **sigmoid** ở bước cuối. Muốn cập nhật `W1`:

```text
W1_new = W1_old - lr * (∂loss/∂W1_old)
```

Bung chain rule (loss → `O3` → `O2` → `O1` → `W1`):

```text
∂loss/∂W1 = (∂loss/∂O3) * (∂O3/∂O2) * (∂O2/∂O1) * (∂O1/∂W1)
```

### 🔍 Mổ xẻ một mắt xích

Tách `∂O3/∂O2` bằng cách chèn `Z = O2*W3 + B3` với `O3 = sigmoid(Z)`:

```text
∂O3/∂O2 = (∂sigmoid(Z)/∂Z) * (∂Z/∂O2)
```

* `∂sigmoid(Z)/∂Z` nằm trong `0..0.25`.
* `∂Z/∂O2 = W3` (bias là hằng số → đạo hàm 0; `O2` đạo hàm = 1).

Vậy mắt xích này là **một số ≤ 0.25 nhân với `W3`**.

### 📈 Khi W3 quá lớn

Giả sử lúc khởi tạo, các weights được gán giá trị **rất lớn** — ví dụ `500` hay `1000`. Khi đó mỗi mắt xích trở thành `(≤0.25) * (số lớn)` = **số lớn**, và nhân dồn qua các lớp thành **cực lớn**.

Gradient khổng lồ × learning rate (dù nhỏ) vẫn ra một lượng cập nhật khổng lồ:

```text
W1_new >> W1_old   (hoặc W1_new << W1_old)
```

Trên đồ thị loss theo weight, weight **nhảy vọt** qua lại:

* May mắn thì dao động quanh global minima rồi vào được.
* Không may thì **văng ra ngoài** đường cong và **không bao giờ hội tụ**.

Đó là **exploding gradient** — đối xứng với vanishing gradient:

```text
Vanishing : đạo hàm nhỏ (sigmoid) → nhân dồn → 0
Exploding : weights lớn          → nhân dồn → ∞
```

### 🎯 Nguyên nhân và cách chữa

Exploding gradient đến từ **kỹ thuật khởi tạo weights** — cụ thể là khởi tạo **giá trị quá lớn**. Cách chữa: dùng các **kỹ thuật khởi tạo weights** đã được nghiên cứu chứng minh, thay vì gán số tùy tiện.

Bài sau mình sẽ đi qua **các kỹ thuật khởi tạo weights** — uniform, Xavier/Glorot, He — để không còn dính exploding gradient. Hẹn gặp lại!
