---
title: 'So sánh loss curve của tất cả các model với nhau'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 164
status: edited
source: '164 - Plotting the Loss Curves of All of Our Models Against Each Other.md'
categories:
- AI
tags: []
---

# 📊 So sánh loss curve của tất cả các model với nhau

> Nguồn: `164 - Plotting the Loss Curves of All of Our Models Against Each Other.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32763712)

Đánh giá từng model riêng lẻ chưa đủ — điều quan trọng là **so sánh chúng với nhau**. Bài này mình gom kết quả Model 0 và Model 1 vào một figure nhiều ô để thấy ai "thắng" ở từng metric, và điểm qua các công cụ tracking chuyên nghiệp.

### 🛠️ Ba cách so sánh kết quả thí nghiệm

1. **Hard coding** — tự viết hàm, tự vẽ bằng Matplotlib (cách ta đang làm).
2. **PyTorch + TensorBoard** — theo dõi experiment chuyên nghiệp (sẽ học ở section sau).
3. **Weights & Biases (W&B)** — một trong những tool tracking mình thích nhất; log tham số, learning rate, metric... rất tiện. Ngoài ra còn **MLflow**.

Khóa này tập trung vào **PyTorch thuần**, nên giờ ta hard code trước, sau này muốn dùng tool thì thêm.

### 📋 Vì sao hard code lại "cồng kềnh"?

Kết quả mỗi model là một **dict**. Muốn so sánh nhiều model, phải tự viết code cho từng cái — tưởng tượng có 5 hay 10 model thì rất mệt. Đó chính là lý do các tool tracking ra đời.

### 🔥 Vẽ 4 ô so sánh

```python
import pandas as pd
import matplotlib.pyplot as plt

model_0_df = pd.DataFrame(model_0_results)
model_1_df = pd.DataFrame(model_1_results)

epochs = range(len(model_0_df))

plt.figure(figsize=(15, 10))

# 1. Train loss
plt.subplot(2, 2, 1)
plt.plot(epochs, model_0_df["train_loss"], label="Model 0")
plt.plot(epochs, model_1_df["train_loss"], label="Model 1")
plt.title("Train Loss")
plt.xlabel("Epochs")
plt.legend()

# 2. Test loss
plt.subplot(2, 2, 2)
plt.plot(epochs, model_0_df["test_loss"], label="Model 0")
plt.plot(epochs, model_1_df["test_loss"], label="Model 1")
plt.title("Test Loss")
plt.xlabel("Epochs")
plt.legend()

# 3. Train accuracy
plt.subplot(2, 2, 3)
plt.plot(epochs, model_0_df["train_acc"], label="Model 0")
plt.plot(epochs, model_1_df["train_acc"], label="Model 1")
plt.title("Train Accuracy")
plt.xlabel("Epochs")
plt.legend()

# 4. Test accuracy
plt.subplot(2, 2, 4)
plt.plot(epochs, model_0_df["test_acc"], label="Model 0")
plt.plot(epochs, model_1_df["test_acc"], label="Model 1")
plt.title("Test Accuracy")
plt.xlabel("Epochs")
plt.legend()
```

### 👀 Đọc kết quả

* **Train loss**: Model 0 đi xuống đúng hướng; Model 1 có một cú "nổ" ở epoch thứ 2 rồi giảm lại. Nếu train lâu hơn, cả hai có thể tiếp tục giảm.
* **Test loss**: Model 0 **thắng** ở đây; Model 1 có dấu hiệu **overfit** (test loss không giảm như train loss) — xác nhận rằng augmentation lần này **không phải** thay đổi tốt.
* **Accuracy**: cả hai tăng dần (đúng hướng), nhưng Model 1's train accuracy cao hơn test accuracy — lại là dấu hiệu overfit; kết quả trên train không chuyển sang test.

Nhắc lại: có thay đổi (chống overfit/underfit) **không đảm bảo** metric đi đúng hướng. Lý tưởng vẫn là loss đi từ trái-trên xuống phải-dưới, accuracy đi từ dưới-trái lên phải-trên.

### 📈 Khi có nhiều model

Với 5 hay 10 model (chuyện thường khi làm ML), figure sẽ rối với hàng loạt đường. Đó là lúc TensorBoard / W&B / MLflow phát huy tác dụng. Nhưng nguyên tắc vẫn vậy: **vẽ các experiment cạnh nhau** để xem cái nào hiệu quả.

### 💡 Nếu là mình

Với cả hai model, mình sẽ **train lâu hơn** và **tăng hidden units** ở mỗi layer rồi xem kết quả. Đó cũng là gợi ý cho các bạn thử.

### ✅ Tạm kết

Đã so sánh hai thí nghiệm. Giờ chuyển sang phần thú vị nhất: dùng model đã train để **dự đoán trên một ảnh hoàn toàn mới** — không nằm trong train hay test, kiểu ảnh các bạn upload vào app. Hẹn các bạn ở bài sau.
