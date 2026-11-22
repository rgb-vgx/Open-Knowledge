---
title: 'Bài 127 — So sánh kết quả các thí nghiệm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 127
status: edited
source: '127 - Comparing the Results of Our Modelling Experiments.md'
categories:
- AI
tags: []
---

# 📊 So sánh kết quả các thí nghiệm

> Nguồn: `127 - Comparing the Results of Our Modelling Experiments.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32890032)

Ta có ba model, ba dictionary kết quả. Bước quan trọng không kém việc train: **so sánh chúng**. Bài này mình gom vào một DataFrame, thêm cột thời gian train, rồi vẽ biểu đồ — để thấy rõ trade-off giữa hiệu năng và tốc độ.

### 🐼 Gom kết quả bằng pandas

```python
import pandas as pd

compare_results = pd.DataFrame([
    model_0_results,
    model_1_results,
    model_2_results,
])
```

Vì cả ba dictionary có cùng key (`model_name`, `model_loss`, `model_acc`), truyền list là pandas tự dựng bảng gọn gàng.

Đọc bảng:

* **Model 0** (baseline, hai linear layer): accuracy khoảng **83.4**, loss **0.47**.
* **Model 1** (có phi tuyến, train GPU): **kém hơn** baseline.
* **Model 2** (TinyVGG CNN): **tốt nhất** từ trước tới giờ.

### ⏱️ Thêm cột training time

```python
compare_results["training_time"] = [
    total_train_time_model_0,
    total_train_time_model_1,
    total_train_time_model_2,
]
```

Giờ bảng cho thấy bức tranh đầy đủ: model tốt nhất cũng là model **train lâu nhất**.

### ⚖️ Performance-speed trade-off

Đây là khái niệm đáng nhớ. Giả sử CNN hơn baseline khoảng 5% accuracy nhưng train (và inference) chậm hơn nhiều lần. Trong nhiều bối cảnh, **5% đó có thể không đáng**.

Ví dụ thực tế:

* Ứng dụng mobile cần phản hồi tức thì → model nhẹ, nhanh quan trọng hơn vài % accuracy.
* Hệ thống offline, chạy batch qua đêm → accuracy quan trọng hơn tốc độ.

Không có câu trả lời chung. Tùy bài toán.

### 📉 Vẽ biểu đồ cột ngang

```python
compare_results.set_index("model_name")["model_acc"].plot(kind="barh")
plt.xlabel("accuracy (%)")
plt.ylabel("model")
```

Đặt `model_name` làm index để trục y hiển thị tên model. `kind="barh"` là cột ngang (Daniel thấy dễ đọc hơn cột dọc).

Biểu đồ này rất tiện để chia sẻ: ai hỏi "các thí nghiệm FashionMNIST của bạn thế nào?", gửi hình là xong.

### 🔁 Nhắc lại về tính tái lập

Nếu số của bạn không khớp chính xác:

* Lệch vài chữ số thập phân → bình thường, do tính ngẫu nhiên.
* Lệch lớn → kiểm tra manual seed, `torch.cuda.manual_seed`, và xem cell đã chạy đúng thứ tự chưa.
* Thời gian train lệch nhiều → do phần cứng (Colab free vs Pro, GPU khác nhau).

### 🎯 Hướng thí nghiệm tiếp theo

Từ bảng này, có thể thử:

* Tăng `hidden_units` của TinyVGG lên 30.
* Comment các ReLU của Model 1 (vì phi tuyến có vẻ không giúp).
* Đổi `kernel_size`, `padding`, `MaxPool2d`.
* Train lâu hơn 10 epoch.

Đây chính là "improve through experimentation" — vòng lặp không có điểm dừng.

### ✅ Tạm kết

CNN thắng về accuracy nhưng chậm nhất. Baseline đơn giản vẫn là lựa chọn hợp lý nếu tốc độ quan trọng. Giờ model đã train xong — nhưng toàn là số. Bài sau mình **nhìn** dự đoán thật của nó trên ảnh.
