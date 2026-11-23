---
title: 'Train CNN trên ảnh cats and dogs và dự đoán ảnh mới'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 81
status: edited
source: '081 - Deep Learning on Custom Images - Part Two.md'
categories:
- AI
tags: []
---

# 🐱🐶 Train CNN trên cats/dogs và dự đoán một ảnh mới

> Nguồn: `081 - Deep Learning on Custom Images - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12345422)

Phần hai của bài custom images: dựng model, dùng `flow_from_directory` để nạp batch, train trên gần 19.000 ảnh, rồi dự đoán một con chó chưa từng thấy. Bài giảng dùng **Keras 2.2** nên có vài thay đổi cú pháp nhỏ so với các bài trước — `MaxPooling2D` thay vì `MaxPool2D`, và tách `Activation` thành layer riêng.

### 🔀 Những thay đổi cú pháp cần biết

* `MaxPooling2D` và `MaxPool2D` là **cùng một class**, chỉ khác cách viết (alias). Tài liệu mới dùng dạng có đuôi `-ing`, còn Keras đi kèm TensorFlow vẫn dùng `MaxPool2D`. Trong các bài trước ta đã gặp `MaxPool2D`; cả hai đều chạy được.
* `Activation` cho phép thêm activation **như một layer riêng**, tách khỏi `Dense` — tiện khi muốn đổi nhanh hàm kích hoạt mà không sửa layer.
* `Dropout` là layer mới trong Keras: tắt ngẫu nhiên một phần neuron khi train để giảm overfit.

---

### 🏗️ Mô hình

```python
from keras.models import Sequential
from keras.layers import (Conv2D, MaxPooling2D, Flatten,
                          Dense, Dropout, Activation)

input_shape = (150, 150, 3)

model = Sequential()

model.add(Conv2D(32, (3, 3), input_shape=input_shape, activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(128))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(1))
model.add(Activation('sigmoid'))
```

Giải thích các lựa chọn:

* **`input_shape = (150, 150, 3)`** — chọn gần mức trung bình của các ảnh trong bộ dữ liệu. Ảnh lớn hơn sẽ bị thu nhỏ, ảnh nhỏ hơn bị kéo giãn, tất cả về đúng `150 × 150`; không cần resize tay.
* **Ba cặp Conv2D + MaxPooling2D** thay vì một: ảnh cats/dogs phức tạp hơn nhiều so với chữ số MNIST. Số filter có thể thử từ `32` lên `64` (hoặc ngược lại) — đây là chỗ nên thử nghiệm và đọc các paper mới.
* **`Dense(128)` rồi `Activation('relu')`** — cách viết tương đương `Dense(128, activation='relu')`, nhưng tách ra để dễ hoán đổi activation.
* **`Dropout(0.5)`** — tắt ngẫu nhiên 50% neuron trong lúc train.
* **`Dense(1)` + sigmoid** — bài toán **binary**: `0` là mèo, `1` là chó, nên chỉ cần một output.

```python
model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])
```

Loss là `binary_crossentropy` vì chỉ có hai lớp; optimizer `adam`.

---

### 📦 Sinh batch cho train và test

```python
batch_size = 16

train_image_gen = image_gen.flow_from_directory(
    'CATS_DOGS/train',
    target_size=input_shape[:2],   # (150, 150)
    batch_size=batch_size,
    class_mode='binary',
)

test_image_gen = image_gen.flow_from_directory(
    'CATS_DOGS/test',
    target_size=input_shape[:2],
    batch_size=batch_size,
    class_mode='binary',
)
```

* `batch_size=16` là điểm khởi đầu hợp lý cho ảnh cỡ này — batch quá lớn sẽ làm mỗi vòng train lâu hơn nhiều.
* `class_mode='binary'` cho bài hai lớp.
* Sau khi chạy, generator báo số ảnh tìm được và số class. Thuộc tính `class_indices` cho biết thứ tự gán nhãn: `cat → 0`, `dog → 1` (theo thứ tự thư mục).

---

### 🏃 Train với steps_per_epoch

```python
model.fit(
    train_image_gen,
    epochs=1,
    steps_per_epoch=150,
    validation_data=test_image_gen,
    validation_steps=12,
)
```

Ý nghĩa từng tham số:

* **Bình thường một epoch** là đi hết toàn bộ tập train — gần 19.000 ảnh, quá lâu cho mỗi vòng.
* **`steps_per_epoch=150`** giới hạn epoch chỉ gồm 150 batch: `150 × 16 ≈ 2.400` ảnh. Đây là cách cắt bớt thời gian train, đánh đổi bằng kết quả kém hơn một chút.
* **`validation_data`** trỏ vào test generator, nên trong lúc train ta đồng thời thấy kết quả trên tập test.
* **`validation_steps=12`** giới hạn số batch dùng để validate mỗi lần.

Chạy thử một epoch mất khoảng một phút và chỉ đạt khoảng **53%** accuracy — hoàn toàn hợp lý vì mới thấy một phần rất nhỏ dữ liệu, một lần.

Trong lúc train có thể xuất hiện warning về ảnh không đọc được — thường là ảnh quá nhỏ (có ảnh chỉ `1 × 1` pixel) hoặc ảnh trắng/đen tuyền. Đây chỉ là warning, generator bỏ qua ảnh đó, không phải lỗi; muốn ẩn thì `import warnings; warnings.filterwarnings('ignore')`.

---

### 📈 Kết quả khi train đủ lâu

Notebook của bài chạy **100 epoch**, mỗi epoch 150 step — mất khoảng **2 giờ**. Accuracy tăng dần rồi chững lại quanh **80%** trên tập train. Có thể lấy mảng lịch sử từ `results.history['acc']` và vẽ bằng `plt.plot` để thấy đường cong này.

Vì không ai muốn chờ 2 tiếng, khóa học cung cấp sẵn model đã train: `cat_dog_100_epochs.h5`, khoảng **30 MB** — khá lớn so với một model thông thường.

```python
from keras.models import load_model
new_model = load_model('cat_dog_100_epochs.h5')
```

---

### 🔮 Dự đoán một ảnh mới

Quy trình cho một file ảnh bất kỳ, gồm bốn bước dễ quên:

```python
from keras.preprocessing import image
import numpy as np

dog_file = 'CATS_DOGS/test/dog/4.jpeg'

dog_image = image.load_img(dog_file, target_size=(150, 150))  # 1. resize
dog_image = image.img_to_array(dog_image)                     # 2. ra mảng
dog_image = np.expand_dims(dog_image, axis=0)                 # 3. thêm batch
dog_image = dog_image / 255                                   # 4. chuẩn hóa
```

1. **`load_img` với `target_size=(150, 150)`** — resize đúng kích thước mạng đã học.
2. **`img_to_array`** — đổi ảnh thành mảng.
3. **`np.expand_dims(..., axis=0)`** — mạng luôn kỳ vọng một **batch** ảnh, kể cả khi chỉ có một ảnh; shape thành `(1, 150, 150, 3)`. Đừng chạy lại cell này nhiều lần, nếu không chiều sẽ bị mở rộng chồng lên nhau.
4. **Chia 255** — chuẩn hóa về 0–1 như lúc train.

Dự đoán:

```python
(new_model.predict(dog_image) > 0.5).astype("int32")   # → 1 (dog)
new_model.predict(dog_image)           # → xác suất, khoảng 0.57
```

`predict` trả về xác suất thuộc lớp "dog". Ngưỡng phân chia là **0.5**: nhỏ hơn thì mô hình cho là mèo. Ở ví dụ này mô hình đoán đúng là chó với độ tự tin khoảng **57%** — đúng, nhưng không quá chắc.

> Ghi chú: Tại thời điểm quay khóa (Keras 2.2), code dùng `model.fit_generator()` và `model.predict_classes()`. Keras hiện tại đã bỏ cả hai: thay bằng `model.fit(...)` với generator (giữ nguyên `steps_per_epoch`/`validation_data`/`validation_steps`), và thay `predict_classes` bằng ngưỡng `(model.predict(...) > 0.5).astype("int32")` cho bài hai lớp (hoặc `np.argmax(..., axis=-1)` cho bài nhiều lớp).

> ⚠️ Cần kiểm chứng: transcript chỉ nêu rõ `Conv2D` đầu tiên dùng `filters=32` và gợi ý tăng lên `64`; giá trị `64` cho hai lớp Conv2D sau trong khối code là suy ra, chưa được đọc rõ trong transcript.

Như vậy là đã đi hết một pipeline thực tế: ảnh thô → cấu trúc thư mục → generator → CNN → model đã lưu → dự đoán ảnh mới.
