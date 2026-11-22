---
title: 'CNN với Keras trên CIFAR-10: bài toán ảnh màu 32×32'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 78
status: edited
source: '078 - Keras Convolutional Neural Networks with CIFAR-10.md'
categories:
- AI
tags: []
---

# 🐸 CNN với CIFAR-10: khi ảnh có màu và phức tạp hơn

> Nguồn: `078 - Keras Convolutional Neural Networks with CIFAR-10.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257908)

MNIST chỉ có ảnh xám 28×28 với một nét chữ. **CIFAR-10** khó hơn: ảnh màu `32 × 32`, mười loại vật thể khác nhau. Đây là bài kiểm tra đầu tiên cho câu hỏi "CNN có chịu được ảnh thật không".

### 📥 Dữ liệu đã có sẵn 3 channel

```python
from keras.datasets import cifar10

(x_train, y_train), (x_test, y_test) = cifar10.load_data()
```

Shape: `(50000, 32, 32, 3)` cho train và `(10000, 32, 32, 3)` cho test. Khác MNIST, dữ liệu **đã ở dạng 3 color channel** nên không cần reshape.

```python
import matplotlib.pyplot as plt
plt.imshow(x_train[0])
```

Ảnh rất nhỏ nên hơi mờ — ảnh đầu tiên là con ếch, có ảnh khác là con ngựa. Chỉ nhìn được hình dáng tổng thể, nhưng đủ để thấy ưu điểm: **có màu**.

---

### ⚙️ Tiền xử lý

Hai bước, y hệt MNIST:

```python
x_train = x_train / 255
x_test = x_test / 255

from keras.utils import to_categorical

y_cat_train = to_categorical(y_train, 10)
y_cat_test = to_categorical(y_test, 10)
```

Chia 255 để đưa pixel về 0–1. Label chuyển sang one-hot với 10 lớp. Về import `to_categorical`, có hai đường dẫn từng gặp trong tài liệu — `keras.utils.np_utils` (cũ) và `keras.utils` — bài giảng cố ý nhắc cả hai.

Mười lớp của CIFAR-10 (theo Wikipedia, do **Canadian Institute for Advanced Research** công bố): máy bay, ô tô, chim, mèo, hươu, chó, ếch, ngựa, tàu thủy và xe tải. Không chỉ toàn động vật, mà có cả phương tiện giao thông.

Cũng trên trang Wikipedia đó có bảng lịch sử error rate: tháng 8/2010 là **21,1%**, còn state-of-the-art hiện tại khoảng **1,48%**. Mục tiêu của bài chỉ là vượt mốc 21,1% bằng một mô hình Keras đơn giản.

---

### 🏗️ Mô hình: hai cặp Conv + Pool

```python
from keras.models import Sequential
from keras.layers import Conv2D, MaxPool2D, Flatten, Dense

model = Sequential()

model.add(Conv2D(filters=32, kernel_size=(4, 4),
                 input_shape=(32, 32, 3), activation='relu'))
model.add(MaxPool2D(pool_size=(2, 2)))

model.add(Conv2D(filters=32, kernel_size=(4, 4), activation='relu'))
model.add(MaxPool2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dense(10, activation='softmax'))
```

Khác biệt so với MNIST:

* `input_shape=(32, 32, 3)` — có ba channel.
* **Hai** cặp convolution + pooling thay vì một: ảnh lớn hơn và phức tạp hơn nên cần thêm layer để học đặc trưng.
* `Dense(256)` thay vì `128`. Một thói quen phổ biến khi làm ảnh là tăng số neuron theo lũy thừa 2: `128 → 256 → 512...`.

---

### ⚙️ Compile và train

```python
model.compile(
    loss='categorical_crossentropy',
    optimizer='rmsprop',
    metrics=['accuracy'],
)

model.summary()
model.fit(x_train, y_cat_train, verbose=1, epochs=10)
```

Tác giả chạy **10 epoch** — khá lâu trên máy chậm. Khóa học có sẵn file weight `cifar_10_epoch.h5` đã train sẵn để nạp bằng `load_model` thay vì tự train lại.

Kết quả: khoảng **80%** accuracy trên tập train sau 10 epoch.

---

### 📉 Kết quả test và bài học overfit

```python
model.evaluate(x_test, y_cat_test)

predictions = model.predict_classes(x_test)
from sklearn.metrics import classification_report
print(classification_report(y_test, predictions))
```

Test set chỉ đạt khoảng **63%**. Chênh lệch 80% so với 63% là dấu hiệu rõ của việc mô hình **chưa tổng quát hóa tốt** — nó học khá tốt trên train nhưng chưa chuyển được sang ảnh mới.

Classification report cho thấy các lớp khá **đồng đều**: không lớp nào vượt trội, cũng không lớp nào thảm hại; lớp 2 và 3 (chim và mèo) nhỉnh hơn một chút về mức kém.

Notebook của bài có thêm một **mô hình lớn hơn** để thử: nhiều layer hơn và dense layer `512` neuron, lưu thành `larger_CIFAR_10_model.h5`. Mô hình này vẫn chưa thật tốt nhưng cải thiện nhẹ, accuracy quanh **70%**. Có thể thử tăng epoch (ví dụ chạy qua đêm) — nhưng nếu accuracy tăng rất chậm thì nghĩa là đã chạm giới hạn của kiến trúc hiện tại và cần thay đổi cách làm.

> ⚠️ Cần kiểm chứng: `model.predict_classes()` đã bị loại bỏ từ Keras/TensorFlow 2.6; với Keras mới dùng `np.argmax(model.predict(x_test), axis=-1)`.

Bài tiếp theo rời khỏi dữ liệu có sẵn: ta sẽ tải một bộ ảnh bên ngoài và tự xử lý để đưa vào Keras.
