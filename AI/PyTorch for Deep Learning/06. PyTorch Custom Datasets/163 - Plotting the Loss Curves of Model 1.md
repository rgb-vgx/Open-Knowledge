---
title: 'Vẽ loss curve của Model 1'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 163
status: edited
source: '163 - Plotting the Loss Curves of Model 1.md'
categories:
- AI
tags: []
---

# 📉 Vẽ loss curve của Model 1

> Nguồn: `163 - Plotting the Loss Curves of Model 1.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32754772)

Model 1 (có augmentation) cho kết quả không tốt hơn định lượng. Giờ mình vẽ **loss curve** của nó — cách tốt nhất để xem model đang **underfit** hay **overfit** theo thời gian, và để thấy rõ tại sao lần này augmentation không cứu được.

### 🔥 Vẽ loss curve

```python
plot_loss_curves(model_1_results)
```

Dùng lại đúng hàm `plot_loss_curves` đã viết ở bài 159.

---

### 👀 Đọc kết quả

Đường cong lần này khá **bất thường**:

* **Test loss đi lên** — trái với xu hướng lý tưởng (loss phải đi xuống, vì nó đo mức "sai").
* **Đường accuracy** lộn xộn — có tăng chút nhưng không ổn định.

Vậy có thể kết luận gì? Theo mình, model **vừa underfit vừa overfit**:

* **Underfit** vì loss vẫn có thể thấp hơn nữa.
* **Overfit** vì **test loss cao hơn train loss** khá nhiều.

Chỉ 5 epoch có thể chưa đủ để thấy xu hướng rõ — nên thử train lâu hơn.

---

### 🔧 Hướng thử tiếp

Nhớ lại phần xử lý overfit/underfit:

* Nếu **underfit**: thêm layer (ví dụ `conv_block_3`), tăng hidden units (từ 10 lên 64), **train lâu hơn** (20 epoch).
* Nếu **overfit**: thêm dữ liệu, đơn giản hóa model, transfer learning, early stopping.

Việc **dễ thử nhất** với hàm `train` hiện có: tăng `num_epochs` lên 20.

---

### ✅ Tạm kết

Ta đã có hai thí nghiệm (Model 0 và Model 1), mỗi cái có loss curve riêng và đều còn dư địa cải thiện. Cách tốt để **so sánh các thí nghiệm** là đặt kết quả **cạnh nhau** — bài sau mình làm việc đó. Hẹn các bạn ở đó.
