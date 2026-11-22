---
title: 'Chuyển dữ liệu sang tensor và chia train/test'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 72
status: edited
source: '072 - Turning Our Data into Tensors and Making a Training and Test Split.md'
categories:
- AI
tags: []
---

# 🔁 Chuyển dữ liệu sang tensor và chia train/test

> Nguồn: `072 - Turning Our Data into Tensors and Making a Training and Test Split.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820602)

Mình đã có dữ liệu hai vòng tròn. Bước tiếp theo trong workflow: kiểm tra **input/output shapes**, đưa dữ liệu về **tensor** của PyTorch, rồi chia **train/test**. Nghe đơn giản nhưng đây là chỗ lỗi shape xuất hiện nhiều nhất, nên mình làm kỹ từ đầu.

### 📏 Kiểm tra shape trước đã

Machine learning làm việc với biểu diễn số dưới dạng tensor, và **mismatch shape** giữa đầu vào với lớp phía sau là lỗi cực thường gặp. Vì vậy bước đầu tiên luôn là xem shape:

```python
# Check the shapes of our features and labels
X.shape, y.shape
```

Kết quả: `X` có **1000 mẫu × 2 feature**, còn `y` có **1000 mẫu**, mỗi mẫu là một **scalar** (số đơn, không có shape).

Cần nhớ: số feature cho một label rất linh hoạt. Với bài toán lớn hơn, các bạn có thể có 1000 mẫu nhưng mỗi mẫu là 128, 200 hay 10 con số — tùy.

### 🔬 Xem thử một mẫu

```python
# View the first example of features and labels
X_sample = X[0]
y_sample = y[0]

print(f"Values for one sample of X: {X_sample} and the same for y: {y_sample}")
print(f"Shapes for one sample of X: {X_sample.shape} and the same for y: {y_sample.shape}")
```

Một mẫu `X` là **2 feature**; một mẫu `y` là **scalar**. Cách nói cho dễ: **2 feature của X dùng để dự đoán 1 con số của y**.

### 🧱 Chuyển NumPy array sang tensor

```python
import torch
torch.__version__  # cần tối thiểu 1.10
```

Dữ liệu hiện là **NumPy array**, mà PyTorch thì muốn **tensor**:

```python
# Turn data into tensors
X = torch.from_numpy(X).type(torch.float)
y = torch.from_numpy(y).type(torch.float)

# View the first five samples
X[:5], y[:5]
```

### ⚠️ Vì sao phải `.type(torch.float)`?

Đây là cái bẫy nhỏ rất dễ dính. Mặc định NumPy dùng **`float64`**, còn PyTorch mặc định là **`float32`** (viết tắt `torch.float`). Nếu không ép kiểu, tensor của các bạn sẽ là `float64` và **có thể gây lỗi về sau**.

```python
X.dtype, y.dtype
# torch.float32, torch.float32
```

Giờ dữ liệu đã là tensor — kiểm tra bằng `type(X)` sẽ ra `torch.Tensor`.

### ✂️ Chia train/test

Cách phổ biến nhất là chia **ngẫu nhiên**. Các điểm dữ liệu đang rải rác khắp mặt phẳng, nên chia random là hợp lý. Mình dùng `train_test_split` của scikit-learn:

```python
from sklearn.model_selection import train_test_split

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X,
                                                    y,
                                                    test_size=0.2,
                                                    random_state=42)
```

Vài điểm cần nhớ về hàm này:

* **Thứ tự trả về** rất dễ lộn: `X_train, X_test, y_train, y_test` — **feature trước, train trước**, rồi mới tới label. Mình cũng phải làm đủ nhiều lần mới nhớ nổi.
* **`test_size=0.2`** — 20% dữ liệu dành cho test, 80% cho train. Muốn chia 50/50 thì để `0.5`, dù kiểu chia đó ít khi dùng.
* **`random_state`** — tương đương random seed, để lần chạy nào cũng chia giống nhau.

### 🌱 Một lưu ý về seed

Có một chi tiết dễ quên: `torch.manual_seed()` **chỉ tác động lên code PyTorch**, không đụng tới scikit-learn. Nên khi chia bằng `train_test_split`, mình đặt `random_state` ngay trong hàm để cố định kết quả.

Với 1000 mẫu và 20% test, các bạn sẽ có **800 mẫu train** và **200 mẫu test**. Kiểm lại bằng `len(X_train)` và `len(X_test)` là thấy ngay. Bài sau mình sẽ phác các bước modelling và dựng code **device-agnostic**.
