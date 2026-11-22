---
title: 'Tạo dataset đường thẳng để kiểm tra model có học được gì không'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 84
status: edited
source: '084 - Creating a Straight Line Dataset to See if Our Model is Learning Anyth.md'
categories:
- AI
tags: []
---

# 📉 Tạo dataset đường thẳng để kiểm tra model có học được gì không

> Nguồn: `084 - Creating a Straight Line Dataset to See if Our Model is Learning Anyth.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32865818)

Model cứ đoán như tung đồng xu trên dữ liệu vòng tròn, dù đã thêm layer, thêm hidden unit và train lâu hơn. Trước khi đổ lỗi cho dữ liệu, mình cần chắc **code train không hỏng**. Cách troubleshoot hiệu quả nhất của mình: **thu nhỏ bài toán** — thử một bài mà mình biết chắc model từng giải được.

### 🧪 Triết lý troubleshoot: test bài nhỏ trước

Ở phần 01 (*PyTorch Workflow Fundamentals*) mình đã dựng một model fit được **đường thẳng**. Vậy giờ mình tạo lại đúng loại dữ liệu đó, xem model hiện tại có học nổi không. Nếu có, vấn đề nằm ở **dữ liệu vòng tròn** chứ không phải code. Nguyên tắc này dùng được cả đời: gặp dataset lớn thì bắt đầu bằng một phần nhỏ; gặp model lớn thì bắt đầu bằng model nhỏ rồi tăng dần độ phức tạp.

### 🧵 Sinh dữ liệu đường thẳng

```python
# Create linear regression parameters
weight = 0.7
bias = 0.3

# Create data
start = 0
end = 1
step = 0.01
X_regression = torch.arange(start, end, step).unsqueeze(dim=1)
y_regression = weight * X_regression + bias  # y = weight * x + bias

# Check the data
print(len(X_regression))
X_regression[:5], y_regression[:5]
```

* `torch.arange(0, 1, 0.01)` sinh các giá trị từ 0 đến gần 1, bước **0.01** → **100 mẫu**.
* `.unsqueeze(dim=1)` thêm một chiều để `X` thành shape `[100, 1]` — đúng dạng feature ma trận.
* `y_regression = weight * X_regression + bias` chính là công thức **linear regression** (dạng rút gọn, không có epsilon/noise).

Mỗi `x` ứng với một `y` — một feature đi với một label.

### ✂️ Chia train/test

```python
# Create train and test splits
train_split = int(0.8 * len(X_regression))  # 80% of data used for training

X_train_regression, y_train_regression = X_regression[:train_split], y_regression[:train_split]
X_test_regression, y_test_regression = X_regression[train_split:], y_regression[train_split:]

len(X_train_regression), len(X_test_regression), len(y_train_regression), len(y_test_regression)
# 80, 20, 80, 20
```

Tỉ lệ 80/20 quen thuộc: 80 mẫu train, 20 mẫu test. Mình đặt tên biến có hậu tố `_regression` để không đụng với `X`, `y` của dữ liệu vòng tròn.

### 📊 Visualize, visualize, visualize

Đây là lúc `helper_functions.py` phát huy tác dụng — hàm `plot_predictions` viết ở phần 01 đã nằm sẵn trong đó:

```python
plot_predictions(train_data=X_train_regression,
                 train_labels=y_train_regression,
                 test_data=X_test_regression,
                 test_labels=y_test_regression)
```

Vì chưa có prediction nên chỉ vẽ train (một cụm điểm) và test (cụm còn lại) — nhìn vào là thấy ngay đó là một đường thẳng. Bài sau mình chỉnh model hiện tại cho khớp shape dữ liệu này (1 feature thay vì 2) và train thử.
