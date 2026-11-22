---
title: 'Bài 61 — Ghép mọi thứ lại (Phần 1): Dữ liệu'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 61
status: edited
source: '061 - Putting Everything Together (Part 1)- Data.md'
categories:
- AI
tags: []
---

# 🧱 Ghép mọi thứ lại (Phần 1): Dữ liệu

> Nguồn: `061 - Putting Everything Together (Part 1)- Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32725752)

Bắt đầu chuỗi video tổng hợp. Lần này mình làm nhanh hơn — phần nào đã học thì lướt, phần mới mới dừng lại. Video này tạo lại dữ liệu và chia train/test, có thêm device-agnostic code ở nền.

### 📐 Tạo dữ liệu bằng công thức hồi quy

Công thức `y = weight * X + bias` quen thuộc, còn viết theo nhiều kiểu khác nhau như `y = mx + c`, `y = mx + b`, `y = bx + a`... tất cả cùng một thứ.

```python
weight = 0.7
bias = 0.3
start = 0
end = 1
step = 0.02

X = torch.arange(start, end, step).unsqueeze(dim=1)
y = weight * X + bias
```

Về `unsqueeze(dim=1)`: nếu bỏ đi, sau này sẽ gặp lỗi về **dimensionality** (số chiều). Bạn có thể tự thử bỏ `unsqueeze` để thấy lỗi xuất hiện — cách học rất hiệu quả.

`X` là **features**, `y` là **labels**. Chữ `X` viết hoa vì trong machine learning `X` thường là feature matrix, dù ở đây nó chỉ là vector.

---

### ✂️ Chia train/test

Dùng lại tỉ lệ 80/20:

```python
train_split = int(0.8 * len(X))
X_train, y_train = X[:train_split], y[:train_split]
X_test, y_test = X[train_split:], y[train_split:]

len(X_train), len(y_train), len(X_test), len(y_test)
```

Kết quả `40, 40, 10, 10`. Con số tuyệt đối sẽ thay đổi khi dữ liệu lớn hơn (100.000 train / 20.000 test chẳng hạn), nhưng tỉ lệ thường vẫn tương tự. 80/20, 70/30, 90/10 đều được — machine learning khá linh hoạt ở khoản này.

---

### 🖼 Vẽ lại dữ liệu

```python
plot_predictions(X_train, y_train, X_test, y_test)
```

**Cảnh báo:** nếu bạn chạy notebook bắt đầu từ cell này mà chưa chạy cell định nghĩa `plot_predictions`, hàm sẽ báo lỗi. Cách xử lý: chạy lại cell định nghĩa hàm ở trên (hoặc `Run all`).

Kết quả như cũ: chấm xanh dương (train) để model học, chấm xanh lá (test) để dự đoán.

---

### 🔍 Nhìn lại workflow

Dữ liệu đã tạo xong, đã ở dạng tensor vì dùng PyTorch để sinh ra. Bước tiếp theo trong workflow là **build model**.

Tên gọi "linear model" vì **linear** nghĩa là đường thẳng; phi tuyến (nonlinear) là không thẳng. Bài tập cho các bạn: thử tự dựng một model linear bằng PyTorch trước khi xem video sau.
