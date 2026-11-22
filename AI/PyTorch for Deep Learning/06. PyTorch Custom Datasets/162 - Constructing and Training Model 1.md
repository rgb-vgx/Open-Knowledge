---
title: 'Dựng và train Model 1 (có data augmentation)'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 162
status: edited
source: '162 - Constructing and Training Model 1.md'
categories:
- AI
tags: []
---

# 🏗️ Dựng và train Model 1 (có data augmentation)

> Nguồn: `162 - Constructing and Training Model 1.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32753926)

Thí nghiệm thứ hai: **cùng kiến trúc TinyVGG**, khác ở chỗ **tập train đã được augmentation**. Ta sẽ train Model 1 với `train_dataloader_augmented` và `test_dataloader_simple`, rồi so với Model 0. Trực giác khi làm thí nghiệm: bắt đầu đơn giản nhất, chỉ thêm phức tạp khi cần.

### 🏗️ Tạo Model 1

```python
torch.manual_seed(42)

model_1 = TinyVGG(
    input_shape=3,
    hidden_units=10,
    output_shape=len(train_data_augmented.classes),
).to(device)
```

Lợi thế của việc đã tự viết TinyVGG: giờ chỉ cần gọi class với tham số mới, không phải dựng lại từ đầu.

---

### 🔥 Train với hàm `train`

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

num_epochs = 5
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(params=model_1.parameters(), lr=0.001)

from timeit import default_timer as timer
start_time = timer()

model_1_results = train(
    model=model_1,
    train_dataloader=train_dataloader_augmented,
    test_dataloader=test_dataloader_simple,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=num_epochs,
    device=device,
)

end_time = timer()
print(f"Total training time for model_1: {end_time - start_time:.3f} seconds")
```

Cùng optimizer (`Adam`, `lr=0.001`), cùng loss (`CrossEntropyLoss`), cùng 5 epoch — chỉ đổi dataloader train sang bản **augmented**.

---

### 📉 Kết quả: augmentation không giúp lần này

Train xong (khoảng **7 giây** trên GPU của mình), kết quả cho thấy **Model 1 kém hơn Model 0** về accuracy trên cả train lẫn test. Điều này có thể đoán trước: loss của Model 0 vốn đã **giảm**, tức chưa overfit — mà augmentation chủ yếu để chống **overfitting**. Khi model đang underfit, thêm augmentation (làm dữ liệu khó hơn) có thể phản tác dụng.

---

### 💡 Bài học

Không phải cứ thêm kỹ thuật "xịn" là tốt hơn. Phải **chẩn đoán đúng** vấn đề (underfit hay overfit) rồi mới chọn cách xử lý tương ứng.

---

### ✅ Tạm kết

Model 1 đã có kết quả để so sánh. Trước khi kết luận, hãy vẽ **loss curve** của nó để xem xu hướng — bài sau mình làm cùng, và đặt câu hỏi: model này đang underfit, overfit, hay cả hai?
