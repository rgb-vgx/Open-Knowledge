---
title: 'Accuracy, precision, recall, F1 và confusion matrix'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 67
status: edited
source: '067 - Understanding Classification Metrics.md'
categories:
- AI
tags: []
---

# 📊 Đánh giá mô hình phân loại: accuracy, precision, recall và F1-score

> Nguồn: `067 - Understanding Classification Metrics.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12607030)

Sau khi huấn luyện xong, ta cần đo xem mô hình làm tốt đến đâu. Bốn độ đo cần nắm là **accuracy**, **precision**, **recall** và **F1-score** — đều sẽ được Keras và Python in ra khi làm bài tập cuối section. Bài này dùng bài toán hai lớp (binary) "chó hay mèo" để giải thích, nhưng ý tưởng áp dụng được cho cả bài nhiều lớp.

### 🔁 Từ dự đoán đến so sánh với nhãn thật

Ta chia dữ liệu, khoảng 30% làm test set và 70% làm training set. Mô hình học trên training set, rồi được đưa từng ảnh trong `X_test` — không kèm nhãn — để tự dự đoán. Sau đó ta lấy nhãn đúng từ `y_test` so sánh với nhãn mô hình dự đoán.

Lặp lại cho toàn bộ `X_test`, cuối cùng ta có số lần dự đoán đúng và số lần sai. Nhưng điểm mấu chốt: **không phải mọi lần đúng/sai đều có giá trị như nhau**. Ví dụ kinh điển là ảnh chụp nốt ruồi để phát hiện ung thư — báo nhầm một người ung thư là "bình thường" nguy hiểm hơn nhiều so với báo nhầm người khỏe thành có bệnh. Vì vậy mới cần nhiều độ đo khác nhau, và chúng gắn với **confusion matrix**.

---

### ✅ Accuracy và cái bẫy mất cân bằng

Accuracy là tỷ lệ dự đoán đúng trên tổng số dự đoán:

```text
accuracy = (TP + TN) / tổng số mẫu
```

Ví dụ test set có 100 ảnh, mô hình đoán đúng 80 ảnh thì accuracy = 0.8, tức 80%.

Accuracy chỉ đáng tin khi các lớp **cân bằng**. Nếu test set có 99 ảnh chó và 1 ảnh mèo, một mô hình "ngu" luôn miệng nói "dog" vẫn đạt 99% accuracy — vì chỉ có đúng một trường hợp nó có thể sai. Đó là lý do phải xem thêm precision và recall.

---

### 🎯 Precision, recall và đánh đổi giữa chúng

* **Recall** đo khả năng tìm ra **tất cả** các ca liên quan trong dữ liệu.
* **Precision** đo khả năng chỉ ra **đúng** những điểm dữ liệu thật sự liên quan.

Công thức:

```text
recall    = TP / (TP + FN)
precision = TP / (TP + FP)
```

Recall cao nghĩa là bỏ sót ít; precision cao nghĩa là ít báo nhầm. Hai thứ này thường **đánh đổi nhau**: muốn vét hết các ca bệnh thì phải chấp nhận báo động nhầm nhiều hơn, và ngược lại.

---

### ⚖️ F1-score: trung bình điều hòa

Khi cần một con số gộp cả hai, dùng **F1-score** — trung bình điều hòa (harmonic mean) của precision và recall:

```text
F1 = 2 * (precision * recall) / (precision + recall)
```

Tại sao không lấy trung bình cộng? Vì trung bình cộng không trừng phạt giá trị cực đoan. Một mô hình có precision = 1.0 nhưng recall = 0.0 sẽ được 0.5 nếu tính trung bình cộng, trong khi công thức F1 cho ra 0 — đúng với thực tế là mô hình vô dụng. F1 phạt nặng sự lệch giữa hai độ đo.

---

### 🧩 Confusion matrix

Confusion matrix đặt **điều kiện thật** (condition positive/negative) đối chiếu với **điều kiện dự đoán**, cho ra bốn ô:

| | Dự đoán positive | Dự đoán negative |
|---|---|---|
| **Thật positive** | True Positive (TP) | False Negative (FN) |
| **Thật negative** | False Positive (FP) | True Negative (TN) |

* **True positive**: có bệnh, mô hình nói có bệnh.
* **True negative**: không bệnh, mô hình nói không bệnh.
* **False positive**: không bệnh nhưng mô hình nói có bệnh.
* **False negative**: có bệnh nhưng mô hình nói không bệnh.

FN và FP còn được gọi là **type II error** và **type I error** — cách gọi rất phổ biến trong y khoa. Từ bốn ô này có thể suy ra vô số thống kê: accuracy, false discovery rate, negative predictive value, recall... nhưng trong khóa ta chỉ cần precision, recall, accuracy, rồi từ đó tính F1.

Ví dụ trong bài: test set 165 bệnh nhân, trong đó **true negatives = 50**. Accuracy của mô hình trên tập này là **91%**, tức error rate (misclassification rate) **9%**:

```text
accuracy = (TP + TN) / tổng   → 91%
error    = (FP + FN) / tổng   → 9%
```

Với bài toán ung thư, ưu tiên là **giảm false negative**, kể cả phải hy sinh precision — thà báo nhầm rồi cho làm sinh thiết, còn hơn để một người có bệnh ra về với suy nghĩ "mình không sao". Ngược lại, với ảnh chó/mèo trong khóa học thì mọi sai số đều nhẹ nhàng, không cần tinh chỉnh gắt gao như vậy.

Trong code, ta thường in một **classification report** để có đủ accuracy, precision, recall và F1-score cùng lúc. Còn nếu vẫn thấy confusion matrix khó nhớ, có thể xem lại trang Wikipedia về nó — có sẵn sơ đồ và công thức cho mọi độ đo. Bài tiếp theo bắt đầu phần lý thuyết deep learning.
