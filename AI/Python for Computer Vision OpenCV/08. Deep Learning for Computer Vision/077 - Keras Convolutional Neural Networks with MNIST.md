---
title: 'CNN với Keras trên MNIST: Conv2D, MaxPool2D và Flatten'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 77
status: edited
source: '077 - Keras Convolutional Neural Networks with MNIST.md'
categories:
- AI
tags: []
---

# 🔎 CNN đầu tiên với Keras trên MNIST

> Nguồn: `077 - Keras Convolutional Neural Networks with MNIST.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257902)

Đến lúc dựng convolutional neural network thật sự. Bài này đi từ tải MNIST, xử lý dữ liệu, dựng mạng bằng **Keras**, huấn luyện, tới đánh giá — và quan trọng là giải thích vì sao từng bước xử lý dữ liệu lại cần thiết.

### 📥 Tải và xem dữ liệu

```python
from keras.datasets import mnist

(x_train, y_train), (x_test, y_test) = mnist.load_data()
```

Shape ban đầu: `(60000, 28, 28)` — chưa có chiều color channel. Xem thử ảnh đầu tiên:

```python
single_image = x_train[0]
plt.imshow(single_image, cmap='gray_r')
```

Phần lớn giá trị bằng `0` — hợp lý vì nền ảnh chiếm phần lớn diện tích. Dùng `cmap='gray_r'` (`_r` là đảo colormap) sẽ thấy chữ số **tối trên nền sáng**, đúng như ảnh gốc.

---

### 🏷️ One-hot encoding cho label

`y_train` hiện là 60.000 số từ 0 đến 9. Nếu đưa thẳng vào mạng, mạng sẽ hiểu nhầm đây là bài **hồi quy** — như thể `5` và `4` nằm trên một trục liên tục và có cả giá trị `4.5` ở giữa. Với mạng, đó không phải là các hạng mục riêng biệt.

Chuyển sang one-hot:

```python
from keras.utils import to_categorical

y_cat_train = to_categorical(y_train, 10)
y_cat_test = to_categorical(y_test, 10)
```

`10` là số lớp (chữ số 0–9). Kiểm tra `y_cat_train[0]` — ảnh đầu tiên là số 5 — sẽ thấy mảng 10 phần tử với số `1` tại index 5. Giờ label đã rõ ràng là hạng mục, và khớp với output 10 neuron dùng activation đưa về 0/1.

---

### 📏 Chuẩn hóa pixel về 0–1

```python
x_train = x_train / x_train.max()   # max = 255
x_test = x_test / x_test.max()
```

Chỉ cần chia cho giá trị lớn nhất là đủ chuẩn hóa về khoảng 0–1 (không cần scikit-learn). Giá trị pixel lên tới 255 có thể làm mạng "nổ" khi tính toán; scale lại thì tỷ lệ giữa các pixel vẫn giữ nguyên, ảnh hiển thị không khác gì.

---

### 🧊 Reshape thêm chiều channel

```python
x_train = x_train.reshape(60000, 28, 28, 1)
x_test = x_test.reshape(10000, 28, 28, 1)
```

Việc này không làm méo dữ liệu, chỉ nói rõ rằng có **một** color channel — để mạng dùng được cho mọi loại ảnh, kể cả ảnh màu với chiều cuối bằng 3. Kết quả: `(60000, 28, 28, 1)` và `(10000, 28, 28, 1)`.

---

### 🏗️ Dựng mô hình

```python
from keras.models import Sequential
from keras.layers import Conv2D, MaxPool2D, Flatten, Dense

model = Sequential()

model.add(Conv2D(filters=32, kernel_size=(4, 4),
                 input_shape=(28, 28, 1), activation='relu'))
model.add(MaxPool2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(10, activation='softmax'))
```

Đọc từng layer:

* **`Conv2D`** — `filters=32`, `kernel_size=(4, 4)`. Đây là các giá trị chuẩn hay dùng (kernel thường `3 × 3` hoặc `4 × 4`, filters `32`); ảnh càng phức tạp càng nên tăng số filter. `input_shape=(28, 28, 1)` là thứ duy nhất **không thể tùy tiện đổi** — phải khớp đúng ảnh đầu vào.
* **`MaxPool2D`** — `pool_size=(2, 2)`, mức mặc định tốt để bắt đầu; có thể thử nghiệm hoặc học từ các paper mới.
* **`Flatten`** — chuyển từ dữ liệu 2D sang 1D, vì các layer convolution hiểu ảnh 2D còn layer dense thì không.
* **`Dense(128)`** — số neuron không có đáp án tuyệt đối, `128` là giá trị chạy tốt với MNIST.
* **`Dense(10, activation='softmax')`** — layer phân loại cuối, 10 neuron cho 10 chữ số, softmax trả về xác suất từng lớp.

---

### ⚙️ Compile, train và đánh giá

```python
model.compile(
    loss='categorical_crossentropy',
    optimizer='rmsprop',
    metrics=['accuracy'],
)

model.summary()
model.fit(x_train, y_cat_train, epochs=2)
```

`categorical_crossentropy` là loss cho bài nhiều lớp với label one-hot, optimizer `rmsprop`. `model.summary()` in ra từng layer kèm output shape và số tham số — rất đáng xem để hiểu dữ liệu "co" dần qua mạng.

Chỉ **2 epoch** (hai lượt chạy hết training set) đã cho khoảng **98%** accuracy trên tập train. Đánh giá trên test set:

```python
model.metrics_names
model.evaluate(x_test, y_cat_test)
```

Test cũng đạt khoảng **98%** — thậm chí nhỉnh hơn train một chút. Điều cần chú ý là **train và test phải xấp xỉ nhau**: nếu train rất tốt mà test kém hẳn thì nhiều khả năng đã **overfit**.

```python
import numpy as np

predictions = np.argmax(model.predict(x_test), axis=-1)

from sklearn.metrics import classification_report
print(classification_report(y_test, predictions))
```

Lưu ý phải so với `y_test` **gốc** chứ không phải `y_cat_test`: kết quả `np.argmax(...)` trả về nhãn dạng số, không phải one-hot — và ta vẫn còn giữ `y_test` ban đầu nên dùng luôn. Precision, recall và F1 đều khoảng **99%**. Một bài toán nghe có vẻ phức tạp — nhận dạng chữ số viết tay — được CNN giải gọn như vậy.

> Ghi chú: Tại thời điểm quay khóa, code dùng `from keras.utils.np_utils import to_categorical` (đường dẫn cũ) và `model.predict_classes()`. Keras hiện tại dùng `from keras.utils import to_categorical`; `model.predict_classes()` bị loại bỏ từ Keras/TensorFlow 2.6, thay bằng `np.argmax(model.predict(x_test), axis=-1)` như code trên.

Bài tiếp theo áp dụng đúng quy trình này cho một bộ dữ liệu ảnh khác: **CIFAR-10**.
