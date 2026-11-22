---
title: 'Bài 44 — Viết hàm trực quan hóa dữ liệu'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 44
status: edited
source: '044 - Building a function to Visualize Our Data.md'
categories:
- AI
tags: []
---

# 📊 Viết hàm trực quan hóa dữ liệu

> Nguồn: `044 - Building a function to Visualize Our Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32699332)

Đã chia xong training và test set. Nhưng như mình nói, nhìn một đống số trên trang giấy thì khó hiểu lắm. Lúc này khẩu hiệu của dân khám phá dữ liệu lại vang lên: **visualize, visualize, visualize**. Không hiểu khái niệm gì, cách tốt nhất là vẽ nó ra.

### 🧠 Vì sao gọi là `plot_predictions`?

Mình viết một hàm tên `plot_predictions` để vẽ cả training data, test data lẫn dự đoán. Hiện tại chưa có dự đoán nào, nhưng đặt tên sẵn như vậy để lát nữa dùng lại — có kế hoạch trước thì làm video mới mượt.

```python
import matplotlib.pyplot as plt

def plot_predictions(train_data=X_train,
                     train_labels=y_train,
                     test_data=X_test,
                     test_labels=y_test,
                     predictions=None):
    """Plots training data, test data and compares predictions."""
```

Docstring ngắn gọn: vẽ training data, test data và so sánh với dự đoán.

---

### 🔥 Vẽ training và test data

Tạo figure với kích thước `(10, 7)` rồi scatter hai tập dữ liệu:

```python
    plt.figure(figsize=(10, 7))

    # Plot training data in blue
    plt.scatter(train_data, train_labels, c="b", s=4, label="Training data")

    # Plot testing data in green
    plt.scatter(test_data, test_labels, c="g", s=4, label="Testing data")
```

* `c` là **color**, `"b"` là xanh dương.
* `s` là **size** của điểm.
* `label` là tên hiển thị trong legend.

Không nhớ tham số thì tra docstring ngay trong notebook: trên Mac bấm `Shift + Command + Space`, hoặc rê chuột lên tên hàm. Ngoài ra trang chính thức `matplotlib.pyplot.scatter` có giải thích đầy đủ và ví dụ.

---

### 🎯 Phần dự đoán

Nếu `predictions` không phải `None` thì vẽ thêm chấm đỏ. Điểm cần hiểu: **dự đoán được so với test labels**, vì scatter nhận cặp `(x, y)`.

```python
    if predictions is not None:
        plt.scatter(test_data, predictions, c="r", s=4, label="Predictions")

    plt.legend(prop={"size": 14})
```

`plt.legend()` hiện chú thích; `prop={"size": 14}` chỉnh cỡ chữ (prop là properties).

---

### 🔍 Chạy thử và đọc kết quả

Vì chưa có dự đoán nên không có chấm đỏ nào. Ta thấy một đường thẳng gần như hoàn hảo: chấm xanh (training) và chấm xanh lá (testing) nằm trên cùng một đường. Dataset đơn giản đến mức khó tưởng.

Bức tranh cần nhớ:

* Chấm xanh = **input**, model học pattern từ đây.
* Chấm xanh lá = **ideal output** (test set).
* Chấm đỏ = **predictions**. Model hoàn hảo sẽ đặt chấm đỏ trùng khít lên chấm xanh lá.

---

### ✅ Tạm kết

Ta biết chính xác quan hệ `X`–`y` vì đã tự tạo nó bằng `y = weight * X + bias` — dạng `y = mx + c` quen thuộc từ đại số phổ thông, với `m` là gradient và `c` là intercept. Nhiệm vụ của model là học lại đường thẳng đó từ 40 chấm xanh, rồi dự đoán 10 chấm xanh lá. Bài sau mình sẽ dựng model đầu tiên.
