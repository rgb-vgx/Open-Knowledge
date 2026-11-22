---
title: 'Bài 87 — Mảnh ghép còn thiếu: non-linearity'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 87
status: edited
source: '087 - Introducing the Missing Piece for Our Classification Model Non-Lineari.md'
categories:
- AI
tags: []
---

# 🌀 Mảnh ghép còn thiếu: non-linearity

> Nguồn: `087 - Introducing the Missing Piece for Our Classification Model Non-Lineari.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32865830)

Trên dữ liệu đường thẳng, model học ngon — chấm đỏ bám sát chấm xanh. Nhưng đó là **dữ liệu tuyến tính**. Còn dữ liệu vòng tròn thì sao? Cuối cùng mình cũng lật bài: mảnh ghép còn thiếu là **non-linearity**.

### 📏 Linear nghĩa là thẳng

Đơn giản thôi: search "linear" → **đường thẳng**. Search "non-linear" → **đường cong**. Vậy là đủ để thấy vấn đề. Model của mình toàn phép **linear**, nên chỉ vẽ được đường thẳng — mà dữ liệu lại là **đường cong khép kín**.

Hồi cấp ba các bạn học **line of best fit**, kiểu `y = mx + b` hay `y = x + c`, rồi đến hàm bậc hai và đủ thứ. Machine learning cũng từ ý tưởng đó mà ra, nhưng ở một tầm khác.

---

### 🍕 Neural network = chồng chất linear + non-linear

Đây là một trong những điều đẹp nhất của machine learning:

> Về bản chất, neural network chỉ là **một tổ hợp (có thể rất lớn) của hàm tuyến tính và phi tuyến tính** — tức các đường thẳng và đường cong.

Đó là lý do tồn tại khái niệm **non-linear activation** và đủ loại layer. Bên dưới, chúng vẫn chỉ là phép kết hợp đường thẳng với đường cong.

Model của mình thất bại vì mình chỉ cho nó **sức mạnh của đường thẳng**. Dữ liệu cong thì cần **non-linearity** mới mô hình hóa được — dù bài toán có vẻ đơn giản.

---

### 🍕 Nghĩ về một model nhận diện pizza

Thử tưởng tượng: có thể mô hình hóa một chiếc pizza chỉ bằng **đường thẳng** không? Nghe vô lý — model thị giác máy tính đâu có đi tìm đường thẳng? Mình cho rằng **có**, nhưng có thêm **đường cong** vào.

Thử tự viết luật tay: "chỗ này cong, nếu thấy màu đỏ thì…" — không, không ổn. Làm vậy với **100 món ăn** thì chương trình phình to khủng khiếp. Thay vào đó, ta đưa cho model **khả năng dùng cả hàm tuyến tính lẫn phi tuyến**, xếp chồng qua nhiều layer, để **model tự tìm ra pattern** — tự quyết định vẽ đường nào để nhận ra pizza, sushi, hay bất cứ món gì.

---

### ♾️ Câu hỏi lớn: vô số đường thẳng và đường cong vẽ được gì?

Nếu có **vô số** đường thẳng và đường cong (thực ra là **hữu hạn**, nhưng có thể là hàng triệu parameter), các bạn vẽ được những hình rất tinh xảo. Đó chính là thứ cho neural network khả năng không chỉ fit một đường thẳng hay tách hai vòng tròn, mà còn làm những việc điên rồ như **hệ thống thị giác của xe tự lái** (tất nhiên sau đó còn cần code để quyết định làm gì với những gì "nhìn" thấy).

---

### 🔁 Chuẩn bị lại dữ liệu vòng tròn

Để luyện non-linearity, mình tạo lại đúng dataset cũ:

```python
from sklearn.datasets import make_circles

# Make 1000 samples
n_samples = 1000

# Create circles
X, y = make_circles(n_samples,
                    noise=0.03,
                    random_state=42)
```

Rồi vẽ scatter với colormap (mình đổi sang tông đỏ-xanh đậm hơn cho đẹp — aesthetic cũng quan trọng mà):

```python
plt.scatter(x=X[:, 0],
            y=X[:, 1],
            c=y,
            cmap=plt.cm.RdYlBu)
```

---

### 🧱 Tensor hóa và chia tập

```python
import torch
from sklearn.model_selection import train_test_split

# Turn data into tensors
X = torch.from_numpy(X).type(torch.float)
y = torch.from_numpy(y).type(torch.float)

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X,
                                                    y,
                                                    test_size=0.2,
                                                    random_state=42)
```

Vì sao vẫn `.type(torch.float)`? Vì NumPy mặc định `float64`, còn PyTorch cần `float32`. NumPy có mặt khắp nơi (pandas, scikit-learn, matplotlib đều dựa trên nó), còn PyTorch được chọn để tận dụng **autograd** (động cơ của gradient descent) và **GPU**.

---

### 🎯 Thử thách

Mở `torch.nn` và tìm mục **non-linear activations**. Trong đó có **một hàm các bạn đã dùng rồi** — đoán xem là hàm nào? Bài sau mình dựng model đầu tiên có non-linearity.
