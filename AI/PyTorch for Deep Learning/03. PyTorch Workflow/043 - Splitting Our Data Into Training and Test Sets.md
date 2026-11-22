---
title: 'Bài 43 — Chia dữ liệu thành training set và test set'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 43
status: edited
source: '043 - Splitting Our Data Into Training and Test Sets.md'
categories:
- AI
tags: []
---

# ✂️ Chia dữ liệu thành training set và test set

> Nguồn: `043 - Splitting Our Data Into Training and Test Sets.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32686050)

Bài trước mình đã tạo ra vài con số bằng công thức hồi quy tuyến tính với tham số biết trước. Giờ đến một khái niệm mà xét về mặt dữ liệu thì có lẽ là quan trọng **nhất** trong machine learning: chia dữ liệu thành các tập. Các bạn làm đúng bước này thì mọi thứ sau đó mới có ý nghĩa.

### 🎓 Ví như chuyện thi đại học

Hãy tưởng tượng ba tập dữ liệu như ba loại tài liệu ôn thi:

* **Training set** — toàn bộ giáo trình. Model học pattern từ đây.
* **Validation set** — đề thi thử giữa kỳ. Dùng để chỉnh model, xem nó học ổn chưa.
* **Test set** — đề thi cuối kỳ. Bài kiểm tra quan trọng nhất, để xem model có thật sự học được kỹ năng và xử lý được tài liệu chưa từng gặp hay không.

Điểm mấu chốt: model **không bao giờ** được thấy validation set hay test set trong lúc học. Nếu thấy thì kết quả chẳng còn ý nghĩa gì.

---

### 🧠 Generalization — mục tiêu thật sự

**Generalization** là khả năng của model thực hiện tốt trên dữ liệu nó chưa từng thấy. Đó mới là toàn bộ mục đích: huấn luyện trên training data, đem model ra production, rồi dữ liệu mới ùa vào và model vẫn ra quyết định đúng nhờ pattern đã học.

---

### 📊 Tỷ lệ chia bao nhiêu?

* **Training set**: thường **60–80%** dữ liệu.
* **Validation set**: **10–20%** nếu có.
* **Test set**: **10–20%**.

Nguyên tắc dễ nhớ: **training luôn có, testing luôn có, validation thường có nhưng không bắt buộc**. Dataset của mình đơn giản nên chỉ cần hai tập thiết yếu là training và test.

---

### 🔥 Chia tập với 50 điểm dữ liệu

Mình có 50 cặp `X`–`y` theo tỉ lệ 1-1. Chọn luôn mốc 80/20:

```python
train_split = int(0.8 * len(X))
print(train_split)  # 40
```

Lấy 40 mẫu đầu làm training, 10 mẫu còn lại làm test:

```python
X_train, y_train = X[:train_split], y[:train_split]
X_test, y_test = X[train_split:], y[train_split:]

len(X_train), len(y_train), len(X_test), len(y_test)
```

Kết quả là `40, 40, 10, 10`: 40 feature và 40 label để train, 10 feature và 10 label để test. Dấu `:` ở đây là cú pháp indexing quen thuộc — lấy mọi phần tử tính từ `train_split` trở đi.

Model sẽ học trên 40 mẫu và cố dự đoán 10 mẫu còn lại.

---

### 🧪 Còn cách chia khác?

Có nhiều cách. Cách của mình đơn giản vì dataset đơn giản. Một cách phổ biến được nhắc tới là `train_test_split` của **scikit-learn** — nó thêm chút ngẫu nhiên vào việc chia dữ liệu, nhưng để dành cho video khác.

Một lưu ý: "training set" và "training split" là cùng một thứ. Machine learning có nhiều tên gọi khác nhau cho cùng một khái niệm, các bạn sẽ quen dần.

---

### ✅ Tạm kết

Tạo được training và test set đúng là một trong những rào cản lớn nhất khi làm machine learning, nên hãy nhớ kỹ khái niệm này. Nhưng hiện tại dữ liệu vẫn chỉ là những con số khô khan trên trang giấy. Thử nghĩ xem làm sao để nhìn chúng trực quan hơn — có lẽ `matplotlib` sẽ giúp được. Hẹn các bạn ở bài sau.
