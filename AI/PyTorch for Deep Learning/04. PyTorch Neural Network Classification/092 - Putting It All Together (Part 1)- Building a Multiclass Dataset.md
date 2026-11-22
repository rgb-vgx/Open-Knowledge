---
title: 'Bài 92 — Ghép tất cả lại (phần 1): tạo dataset multiclass'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 92
status: edited
source: '092 - Putting It All Together (Part 1)- Building a Multiclass Dataset.md'
categories:
- AI
tags: []
---

# 🧩 Ghép tất cả lại (phần 1): tạo dataset multiclass

> Nguồn: `092 - Putting It All Together (Part 1)- Building a Multiclass Dataset.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32873950)

Mình đã đi hết binary classification. Giờ lặp lại **toàn bộ workflow** nhưng cho **multiclass classification**. Nhắc lại khác biệt: binary là *một trong hai* (mèo/chó, spam/không, gian lận/không); multiclass là *một trong nhiều* (mèo/chó/gà, có thể 25, 1000, 5000 lớp).

### 🔀 Hai khác biệt kỹ thuật cốt lõi

So với binary, multiclass chỉ đổi hai chỗ quan trọng:

| | Binary | Multiclass |
|---|---|---|
| **Output activation** | sigmoid | **softmax** |
| **Loss function** | binary cross entropy | **cross entropy** |

Phần còn lại (data, model, training loop) gần như giữ nguyên.

---

### 🫧 Tạo dữ liệu bằng `make_blobs`

```python
import torch
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split

# Set the hyperparameters for data creation
NUM_CLASSES = 4
NUM_FEATURES = 2
RANDOM_SEED = 42

# 1. Create multi-class data
X_blob, y_blob = make_blobs(n_samples=1000,
                            n_features=NUM_FEATURES,
                            centers=NUM_CLASSES,
                            cluster_std=1.5,
                            random_state=RANDOM_SEED)
```

`make_blobs` sinh các cụm (blob) điểm — mỗi cụm một lớp. Vài tham số:

* `n_samples=1000` — tổng số mẫu.
* `n_features=2` — giữ 2 feature như cũ để vẽ được trên mặt phẳng.
* `centers=NUM_CLASSES` — số cụm/lớp (ở đây **4**).
* `cluster_std=1.5` — độ "xáo trộn" của cụm; càng lớn các cụm càng chồng lấn, bài càng khó.
* `random_state` — tái lập.

Tên biến viết **HOA** (`NUM_CLASSES`, `NUM_FEATURES`, `RANDOM_SEED`) là quy ước phổ biến cho các **setting đặt ở đầu notebook** — cho người đọc biết đây là thứ có thể chỉnh.

---

### 🧱 Tensor hóa và chia tập

```python
# 2. Turn data into tensors
X_blob = torch.from_numpy(X_blob).type(torch.float)
y_blob = torch.from_numpy(y_blob).type(torch.float)

# 3. Split into train and test sets
X_blob_train, X_blob_test, y_blob_train, y_blob_test = train_test_split(X_blob,
                                                                        y_blob,
                                                                        test_size=0.2,
                                                                        random_state=RANDOM_SEED)
```

Vẫn `.type(torch.float)` vì NumPy mặc định `float64`, PyTorch cần `float32`. `test_size=0.2` → 80/20, `random_state` để cố định cách chia.

---

### 📊 Visualize, visualize, visualize

```python
plt.figure(figsize=(10, 7))
plt.scatter(X_blob[:, 0], X_blob[:, 1], c=y_blob, cmap=plt.cm.RdYlBu)
```

Mình dùng `figsize=(10, 7)` — theo kinh nghiệm là tỉ lệ đẹp. Hình ra **bốn cụm màu** khác nhau.

---

### 🎚️ Nghịch `cluster_std` để thấy độ khó

Mình thử chỉnh `cluster_std`:

* **= 0** → các cụm tách bạch hoàn toàn, quá dễ.
* **= 1.5** → các cụm chồng lấn, có điểm đỏ lẫn vào vùng xanh — bài khó hơn, ranh giới phải **uốn lượn** để tách **bốn lớp trên hai trục**.

Và lưu ý: **không có ranh giới nào hoàn hảo** khi các cụm đã chồng lấn. Model sẽ phải chấp nhận sai một ít.

Dữ liệu đã sẵn sàng. Bài sau mình dựng model multiclass đầu tiên — nhớ sẵn sàng cho **4 output feature**, một cho mỗi lớp.
