---
title: 'Huấn luyện model đầu tiên và lưu kết quả vào TensorBoard'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 207
status: edited
source: '207 - Training a Single Model and Saving the Results to TensorBoard.md'
categories:
- AI
tags: []
---

# 🏋️ Huấn luyện model đầu tiên và lưu kết quả vào TensorBoard

> Nguồn: `207 - Training a Single Model and Saving the Results to TensorBoard.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33111090)

Bốn... ba... hai... một. Chào mừng trở lại. Bài trước ta đã dựng xong: loss function, optimizer, `SummaryWriter`, và sửa `train` function để ghi giá trị vào writer. Writer tạo ra thư mục `runs/` với tên mặc định là ngày giờ + tên máy (Colab của mình là một chuỗi số). Giờ ta train thật.

### ⚠️ Dùng đúng `train` function

Lưu ý quan trọng: **không** dùng `engine.train` nữa, vì ta đã sửa bản `train` ở trên (bản có tracking). Ta gọi trực tiếp hàm `train` đã copy vào notebook.

Đầu tiên set seed, rồi train:

```python
set_seeds()

results = train(model=model,
                train_dataloader=train_dataloader,
                test_dataloader=test_dataloader,
                optimizer=optimizer,
                loss_fn=loss_fn,
                epochs=5,
                device=device)
```

Model là EfficientNet-B0 feature extractor, train trong **5 epoch**.

---

### 🚀 Chạy và xem kết quả

Ba... hai... một... chạy! Kết quả khá tốt với feature extractor: **85% test accuracy**. Nhìn vào thư mục `runs/` thấy xuất hiện các mục `Train Accuracy`, `Train Loss`, `Test Loss`... Nhưng này, có gì đó sai.

---

### 🐛 Bắt lỗi tag trùng tên

Mình lỡ ghi nhầm nhãn: mục "test loss" lại bị đặt tên là "train loss". Nếu để vậy sẽ rất khó hiểu khi xem TensorBoard. Sửa lại tag thành `test_loss` rồi chạy lại — vì train cũng nhanh nên không sao.

Chạy lại xong, refresh thư mục, ta thấy đúng bốn mục:

* **Accuracy**: `train_acc`, `test_acc`
* **Loss**: `train_loss`, `test_loss`

Kết quả cuối cùng đạt gần **88% accuracy**. Rất ổn.

---

### 🎥 Bước tiếp theo: xem event file thế nào?

Trong thư mục `runs/` giờ có các **event file**. Thử thách cho bạn trước video sau: tìm cách **xem các file này bằng TensorBoard ngay trong notebook**. Vì đang dùng Google Colab (bạn có thể dùng môi trường khác), hãy search "how to view tensorboard experiments in a colab notebook" — có tài liệu tốt hướng dẫn.

---

### ✅ Tạm kết

Ta đã train model đầu tiên và lưu kết quả vào TensorBoard, thấy được bốn đường metric quen thuộc. Giờ chỉ còn mở TensorBoard ra xem trực quan. Video sau ta sẽ khám phá performance của model với TensorBoard. Hẹn gặp!
