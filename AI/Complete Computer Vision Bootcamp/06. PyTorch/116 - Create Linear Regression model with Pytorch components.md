---
title: 'Bài 116 — Hồi quy tuyến tính với PyTorch trên dữ liệu bảo hiểm'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 116
status: edited
source: '116 - Create Linear Regression model with Pytorch components.md'
categories:
- AI
tags: []
---

# 📈 Dựng mô hình hồi quy tuyến tính bằng PyTorch từ A đến Z

> Nguồn: `116 - Create Linear Regression model with Pytorch components.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49093699)

Chào các bạn! Lần này mình làm **hồi quy tuyến tính** nhưng không dùng scikit-learn để huấn luyện, mà tự dựng mô hình bằng **PyTorch**. Mình sẽ đi trọn quy trình chuẩn của một bài machine learning trên bộ dữ liệu chi phí bảo hiểm y tế.

### 🗺️ Quy trình chuẩn của một bài ML

Các bước chuẩn gồm: **data gathering** (gom dữ liệu từ web, SQL), **data preprocessing** (đổi kiểu, bỏ/giữ cột, làm sạch), **feature engineering** (từ ngày sinh tạo ra tuổi, thứ trong tuần...), **model training**, rồi **evaluation** trên tập test. Bài này đi đúng các bước đó, chỉ khác là huấn luyện bằng PyTorch thay vì sklearn.

---

### 🏥 Dữ liệu và tiền xử lý

Bộ dữ liệu **Medical Cost Personal** gồm **1338 dòng** với các cột `age`, `sex`, `bmi`, `children`, `smoker`, `region` và `charges` (chi phí bảo hiểm). `charges` là **biến mục tiêu** (y), 6 cột còn lại là **đặc trưng** (X); dữ liệu sạch sẵn, không có null.

Tải ngay trong Colab rồi đọc bằng pandas:

```python
!pip install kagglehub
import os, pandas as pd, kagglehub

path = kagglehub.dataset_download("mirichoi0218/insurance")
df = pd.read_csv(os.path.join(path, "insurance.csv"))
print(df.info())       # 1338 entry, không có null, xem thống kê bằng df.describe()
```

Điểm quan trọng: **chia train/test trước khi encode**, để encoder chỉ học trên train rồi áp dụng cho test.

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)
# 80% train (1070 dòng), 20% test (268 dòng)

encoders = {}
for col in ["sex", "smoker", "region"]:            # 3 cột phân loại
    le = LabelEncoder()
    train_df[col] = le.fit_transform(train_df[col])
    test_df[col] = le.transform(test_df[col])      # test chỉ transform
    encoders[col] = le

X_train = train_df.drop(columns=["charges"])
y_train = train_df["charges"]
X_test = test_df.drop(columns=["charges"])
y_test = test_df["charges"]

scaler = StandardScaler()                          # chỉ chuẩn hóa X, không đụng y
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

Đổi sang tensor vì PyTorch làm việc với tensor chứ không phải numpy/pandas:

```python
import torch
X_train_tensor = torch.tensor(X_train, dtype=torch.float32)   # 1070 × 6
X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train.values, dtype=torch.float32).view(-1, 1)
y_test_tensor = torch.tensor(y_test.values, dtype=torch.float32).view(-1, 1)
```

---

### 🏗️ Định nghĩa mô hình

Mạng hồi quy gồm các lớp 6 → 64 → 128 → 1, dùng `nn.Sequential`. Vì là **hồi quy**, lớp cuối chỉ có **một nút** (không phải nhiều nút như phân loại):

```python
import torch.nn as nn

class SimpleRegression(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 64), nn.ReLU(),
            nn.Linear(64, 128), nn.ReLU(),
            nn.Linear(128, 1),          # hồi quy nên đầu ra chỉ 1 nút
        )
    def forward(self, x):
        return self.network(x)

model = SimpleRegression(X_train_tensor.shape[1])   # input_dim = 6
```

---

### 🏋️ Huấn luyện và đánh giá

Chọn loss và optimizer, rồi chạy vòng huấn luyện:

```python
import torch.optim as optim
criterion = nn.MSELoss()                            # hồi quy dùng MSE
optimizer = optim.Adam(model.parameters(), lr=0.01)

model.train()
for epoch in range(10000):
    optimizer.zero_grad()
    loss = criterion(model(X_train_tensor), y_train_tensor)
    loss.backward()
    optimizer.step()
```

Lúc đầu loss rất lớn (khoảng **45,536,816**) vì đây là MSE, rồi giảm dần; khi huấn luyện lâu hơn, loss xuống còn khoảng **1,286,447**. Đánh giá trên tập test — chuyển sang `eval`, dự đoán rồi `detach()` khỏi đồ thị và đổi sang numpy:

```python
model.eval()
y_pred = model(X_test_tensor).detach().numpy()

from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
mse = mean_squared_error(y_test_tensor.numpy(), y_pred)
rmse = mse ** 0.5                    # căn bậc hai của MSE
mae = mean_absolute_error(y_test_tensor.numpy(), y_pred)
r2 = r2_score(y_test_tensor.numpy(), y_pred)
print(mse, rmse, mae, r2)
```

---

### 🔮 Dự đoán và chốt lại

Để dự đoán cho một người cụ thể, phải lặp lại đúng các bước tiền xử lý — tạo DataFrame, label encode, chuẩn hóa, đổi sang tensor — rồi đưa vào model:

```python
def predict_single(age, sex, bmi, children, smoker, region):
    row = pd.DataFrame([{"age": age, "sex": sex, "bmi": bmi,
                         "children": children, "smoker": smoker, "region": region}])
    for col in ["sex", "smoker", "region"]:
        row[col] = encoders[col].transform(row[col])
    row_tensor = torch.tensor(scaler.transform(row), dtype=torch.float32)
    model.eval()
    print(model(row_tensor).detach().numpy())
```

Khi tăng dần tuổi, chi phí dự đoán tăng theo **xu hướng tuyến tính**; so người **hút thuốc** với **không hút thuốc**, mô hình cho thấy rõ chênh lệch chi phí. Các bạn vừa đi trọn một pipeline ML bằng PyTorch: gom dữ liệu → tiền xử lý (split trước, encode đúng cách, chuẩn hóa) → dựng mạng `nn.Sequential` → huấn luyện với `MSELoss` + `Adam` → đánh giá bằng MSE/RMSE/MAE/R². Điểm cốt lõi là **không để rò rỉ dữ liệu** khi encode/scale, và nhớ `model.eval()` + `detach().numpy()` khi dự đoán.
