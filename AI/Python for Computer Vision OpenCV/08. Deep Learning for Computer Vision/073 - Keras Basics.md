---
title: 'Keras cơ bản: xây mô hình phân loại tiền thật và tiền giả'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 73
status: edited
source: '073 - Keras Basics.md'
categories:
- AI
tags: []
---

# 🧱 Keras cơ bản: mô hình đầu tiên với dữ liệu tiền giấy

> Nguồn: `073 - Keras Basics.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257898)

Đây là bài code đầu tiên với **Keras** (backend TensorFlow). Dữ liệu là các tờ tiền giấy, một phần là tiền giả, phần còn lại là tiền thật. Các nhà nghiên cứu chụp ảnh `400 × 400` pixel rồi trích ra các **feature dạng số** dựa trên wavelet của ảnh.

Lưu ý quan trọng: bài này **không** đưa ảnh trực tiếp vào mạng, mà dùng feature đã trích xuất. Ta đang học cú pháp Keras và quy trình machine learning tổng quát — đọc dữ liệu, chia train/test, fit, dự đoán. Đến phần **CNN** mới đưa pixel vào trực tiếp.

### 📥 Đọc dữ liệu bằng genfromtxt

```python
import numpy as np
from numpy import genfromtxt

data = genfromtxt('bank_note_data.txt', delimiter=',')
```

`genfromtxt` tạo mảng từ file text; file CSV nên phải truyền `delimiter=','`.

Cột cuối cùng là **label**: `0` là tiền giả, `1` là tiền thật. Tách label ra khỏi feature:

```python
labels = data[:, 4]
features = data[:, 0:4]
```

Các label đang xếp theo thứ tự — chuyện này sẽ được xử lý ngay ở bước chia dữ liệu. Theo quy ước trong các paper machine learning, feature đặt là `X` (ma trận 2 chiều) và label là `y` (vector):

```python
X = features
y = labels
```

---

### ✂️ Chia train/test bằng scikit-learn

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.33, random_state=42
)
```

`train_test_split` **shuffle ngẫu nhiên** trước khi chia, nên không cần lo label bị sắp xếp. `test_size=0.33` dành một phần ba dữ liệu cho test. `random_state=42` cố định kết quả shuffle — con số 42 chỉ là giá trị tuỳ chọn, nhưng vì là "câu trả lời cho mọi thứ trong vũ trụ" (theo *The Hitchhiker's Guide to the Galaxy*) nên xuất hiện khắp nơi trong code Python.

Kiểm tra lại: `X` có 1372 dòng, `X_train` có 919 dòng, tức khoảng 67% — phần còn lại nằm trong `X_test`.

---

### 📏 Chuẩn hóa dữ liệu với MinMaxScaler

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
scaler.fit(X_train)

scaled_X_train = scaler.transform(X_train)
scaled_X_test = scaler.transform(X_test)
```

`fit` chỉ đi tìm min và max; `transform` mới thực sự co dữ liệu về khoảng mong muốn.

Câu hỏi rất hay gặp: **tại sao chỉ fit trên `X_train`?** Vì nếu fit trên toàn bộ dữ liệu thì scaler đã "nhìn thấy" test set — đó là **data leakage**, hay nói thẳng là gian lận. Trong thực tế ta không bao giờ có thông tin về dữ liệu tương lai, nên chỉ được fit trên train rồi transform cả train lẫn test.

Với bộ dữ liệu nhỏ này, min khoảng `-13` và max khoảng `17` — cùng bậc độ lớn nên scale không thực sự bắt buộc. Nhưng nếu có feature max tới cả triệu trong khi feature khác chỉ quanh `-13`, việc scale là bắt buộc. Máy tính làm hết, nên cứ làm cho chắc.

---

### 🏗️ Dựng mạng bằng Sequential

```python
from keras.models import Sequential
from keras.layers import Dense

model = Sequential()

model.add(Dense(4, input_dim=4, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))
```

* Layer đầu: `4` neuron vì có `4` feature, `input_dim=4`, activation **ReLU**.
* Layer giữa (hidden): `8` neuron — một mẹo trong bài là chọn khoảng **1x đến 2x** số input; quá lớn hay quá nhỏ đều cho kết quả kém. Layer này không cần khai báo `input_dim`.
* Layer cuối: **một** neuron vì output chỉ là `0` hoặc `1`, activation **sigmoid** để ép giá trị về khoảng 0–1.

---

### ⚙️ Compile và fit

```python
model.compile(
    loss='binary_crossentropy',
    optimizer='adam',
    metrics=['accuracy'],
)

model.fit(scaled_X_train, y_train, epochs=50, verbose=1)
```

Compile cần ba thứ: **loss**, **optimizer** và **metrics** cần theo dõi. Ở đây loss là `binary_crossentropy` (bài toán hai lớp), optimizer là `adam`, metric là `accuracy`.

**Một epoch** là một lần đi hết toàn bộ training data. Sau 50 epoch, độ chính xác trên tập train đạt khoảng **99%** — nhưng đó mới là train, chưa nói lên điều gì về dữ liệu mới.

---

### 🔮 Dự đoán và đánh giá

```python
predictions = (model.predict(scaled_X_test) > 0.5).astype("int32")

from sklearn.metrics import confusion_matrix, classification_report
print(confusion_matrix(y_test, predictions))
print(classification_report(y_test, predictions))
```

Test set đóng vai trò dữ liệu hoàn toàn mới. Trước đó ta có thể xem `model.metrics_names` để biết hai metric đang theo dõi là `loss` và `accuracy`.

Confusion matrix cho thấy mô hình chỉ đoán nhầm **7 tờ tiền**; classification report cho precision, recall và F1 đều khoảng **98%**.

> Ghi chú: Tại thời điểm quay khóa, code dùng `model.predict_classes()`, bị loại bỏ khỏi Keras/TensorFlow từ bản 2.6. Với Keras hiện tại, bài hai lớp dùng ngưỡng `(model.predict(...) > 0.5).astype("int32")` như code trên; bài nhiều lớp dùng `np.argmax(model.predict(...), axis=-1)`.

---

### 💾 Lưu và nạp lại mô hình

```python
model.save('mysupermodel.h5')

from keras.models import load_model
new_model = load_model('mysupermodel.h5')
```

`save` ghi cả kiến trúc lẫn weight; `load_model` nạp lại và có thể gọi dự đoán ngay. Đó là toàn bộ vòng đời cơ bản của một mô hình Keras: đọc dữ liệu → scale → dựng mạng → compile → fit → đánh giá → lưu.
