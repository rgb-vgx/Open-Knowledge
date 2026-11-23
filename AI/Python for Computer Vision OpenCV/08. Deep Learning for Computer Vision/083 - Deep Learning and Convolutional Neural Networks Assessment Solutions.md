---
title: 'Lời giải Fashion MNIST: CNN đạt khoảng 90% độ chính xác'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 83
status: edited
source: '083 - Deep Learning and Convolutional Neural Networks Assessment Solutions.md'
categories:
- AI
tags: []
---

# 🩳 Lời giải: Fashion MNIST với CNN và Keras

> Nguồn: `083 - Deep Learning and Convolutional Neural Networks Assessment Solutions.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257922)

Cùng đi qua lời giải của bài tập, theo đúng thứ tự yêu cầu. Quy trình gần như giống hệt bài MNIST chữ số — đó chính là điểm cần nhận ra: mọi bộ dữ liệu ảnh nhỏ đều đi qua cùng một khuôn.

### 🖼️ Task 1–2: đọc và xem dữ liệu

Đọc dữ liệu vào `X_train`, `y_train`, `X_test`, `y_test` rồi hiển thị ảnh đầu tiên:

```python
import matplotlib.pyplot as plt

plt.imshow(X_train[0])
```

Ảnh trông giống một chiếc giày/bốt. Kiểm tra `y_train[0]` được `9` — tra bảng nhãn thì đó là **ankle boot**. Có thể truyền `cmap='gray'` hoặc bản đảo `gray_r` để nhìn rõ hơn.

---

### 📏 Task 3: chuẩn hóa

Giá trị lớn nhất của mảng ảnh là **255**:

```python
X_train = X_train / 255
X_test = X_test / 255
```

---

### 🧊 Task 4: reshape thêm chiều channel

```python
X_train = X_train.reshape(60000, 28, 28, 1)
X_test = X_test.reshape(10000, 28, 28, 1)
```

Đúng như bài MNIST chữ số, chỉ khác shape: 60.000 ảnh train và 10.000 ảnh test.

---

### 🏷️ Task 5: one-hot encoding

```python
from keras.utils import to_categorical

y_cat_train = to_categorical(y_train)
y_cat_test = to_categorical(y_test)
```

Có nhiều cách import `to_categorical`; đường dẫn `keras.utils` là cách dùng hiện hành.

---

### 🏗️ Task 6: dựng model

```python
from keras.models import Sequential
from keras.layers import Dense, Conv2D, MaxPooling2D, Flatten

model = Sequential()

model.add(Conv2D(filters=32, kernel_size=(4, 4),
                 input_shape=(28, 28, 1), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(10, activation='softmax'))
```

`MaxPool2D` hay `MaxPooling2D` đều được — cùng một class. Layer cuối **bắt buộc** 10 neuron và `softmax`, vì có đúng 10 lớp; đây là chỗ duy nhất không nên tùy biến.

```python
model.compile(loss='categorical_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])

model.summary()
```

---

### 🏃 Task 7: train và đánh giá

```python
model.fit(X_train, y_cat_train, epochs=10)

model.evaluate(X_test, y_cat_test)
model.metrics_names   # ['loss', 'accuracy']
```

Sau **10 epoch**, test set đạt khoảng **90%** accuracy.

```python
from sklearn.metrics import classification_report
import numpy as np

predictions = np.argmax(model.predict(X_test), axis=-1)
print(classification_report(y_test, predictions))
```

Precision, recall và F1 đều quanh **90%** — khá tốt với 10 lớp. Trong đó có những lớp rất khó phân biệt: **sneaker** và **ankle boot** trông gần như giống nhau, nhất là khi chỉ có ảnh xám `28 × 28`. Nhiều khả năng cả người cũng khó nói chính xác chiếc nào là sneaker, chiếc nào là bốt cổ cao.

> Ghi chú: Tại thời điểm quay khóa, code dùng `model.predict_classes()`, bị loại bỏ từ Keras/TensorFlow 2.6. Với Keras hiện tại, bài nhiều lớp dùng `np.argmax(model.predict(X_test), axis=-1)` như code trên.

Điều đáng nhớ từ bài này: khi đã nắm khuôn tiền xử lý (chuẩn hóa → reshape → one-hot), phần còn lại chỉ là chọn kiến trúc. Bài tiếp theo chuyển sang một họ mạng hoàn toàn khác: **YOLO v3** cho object detection.
