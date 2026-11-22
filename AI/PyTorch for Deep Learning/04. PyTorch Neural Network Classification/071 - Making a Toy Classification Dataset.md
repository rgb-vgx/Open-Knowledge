---
title: 'Tạo toy dataset hình hai vòng tròn để luyện classification'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 71
status: edited
source: '071 - Making a Toy Classification Dataset.md'
categories:
- AI
tags: []
---

# 🎨 Tạo toy dataset hai vòng tròn để luyện classification

> Nguồn: `071 - Making a Toy Classification Dataset.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820600)

Đủ lý thuyết rồi — giờ mình mở **Google Colab** và gõ code. Mình tạo notebook mới tinh, đặt tên "Neural Network Classification with PyTorch", gắn link tới bản sách và trang Discussions để khi kẹt là có chỗ hỏi. Bước đầu tiên trong mọi workflow machine learning luôn là **data** — không có dữ liệu thì không có pattern để học.

### 🎲 Vì sao tự tạo dữ liệu?

Lần này mình làm **custom dataset** cho gọn, để tập trung vào quy trình. Colab đã cài sẵn **scikit-learn** — thư viện machine learning rất phổ biến (PyTorch thiên về deep learning, còn scikit-learn phủ nhiều mảng khác). Trong đó có hàm `make_circles` để sinh dữ liệu hai vòng tròn lồng nhau.

```python
from sklearn.datasets import make_circles

# Make 1000 samples
n_samples = 1000

# Create circles
X, y = make_circles(n_samples,
                    noise=0.3,
                    random_state=42)
```

* Chữ **X** hoa thường để chỉ **matrix of features**, **y** là **labels**.
* `noise=0.3` thêm chút ngẫu nhiên — mình thấy mức này khá ổn.
* `random_state=42` giống như đặt **random seed**, để lần sau chạy ra đúng kết quả đó.

### 🔍 Khám phá dữ liệu: visualize, visualize, visualize

Kiểm tra nhanh độ dài — `len(X)` và `len(y)` đều ra **1000** mẫu, feature đi cặp với label. Xem 5 mẫu đầu của `X` và `y`:

```python
print(f"First 5 samples of X:\n {X[:5]}")
print(f"First 5 samples of y:\n {y[:5]}")
```

Dữ liệu **đã ở dạng số** sẵn — một lý do mình chọn tự tạo dataset. Mỗi mẫu có **2 feature** (ứng với một label). Nhìn toàn bộ `y`, mình chỉ thấy **0 và 1** → đây là **binary classification**. Nếu có 0, 1, 2 thì mới là multiclass.

Mình gói vào **pandas DataFrame** để dễ nhìn:

```python
import pandas as pd
circle_data = pd.DataFrame({"X1": X[:, 0],
                            "X2": X[:, 1],
                            "label": y})
circle_data.head(10)
```

Cột `X1`, `X2` là hai feature (nhớ zero-indexing: `X[:, 0]` là feature 1, `X[:, 1]` là feature 2), cột `label` là `y`. Nhìn bảng số thì… mình chịu, không thấy pattern gì cả. Đã đến lúc vẽ.

### 📊 Scatter plot: pattern lộ ra

```python
import matplotlib.pyplot as plt

plt.scatter(x=X[:, 0],
            y=X[:, 1],
            c=y,
            cmap=plt.cm.RdYlBu)
```

Kết quả là hai vòng tròn lồng nhau rõ ràng: một vòng xanh, một vòng đỏ. Bài toán của mình: cho một cặp tọa độ `(x1, x2)`, dự đoán điểm đó là **chấm xanh** hay **chấm đỏ**. Đây chính là lý do chọn `make_circles` — pattern nhìn bằng mắt được, nhưng không thể tách bằng một đường thẳng.

### 🧸 "Toy dataset" là gì?

Trong machine learning các bạn sẽ nghe cụm này hoài, nên mình ghi lại:

> **Toy dataset** — dataset đủ nhỏ để thử nghiệm thoải mái, nhưng vẫn đủ lớn để luyện các kiến thức nền tảng.

Mình đang cần đúng thứ đó để nắm vững neural network classification. À, và nếu muốn mò thêm hàm sinh dữ liệu khác, scikit-learn có cả một bộ dataset nhỏ trong module `datasets` — mình chỉ thích `make_circles` thôi.

Bước sau: biến `X`, `y` thành **tensor** và chia train/test.
