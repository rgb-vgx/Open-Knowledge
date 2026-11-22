---
title: 'Train model transfer learning đầu tiên'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 193
status: edited
source: '193 - Training Our First Transfer Learning Feature Extractor Model.md'
categories:
- AI
tags: []
---

# 🏋️ Train model transfer learning đầu tiên

> Nguồn: `193 - Training Our First Transfer Learning Feature Extractor Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33016300)

Chào các bạn! Đây là model ta vừa dựng: **EfficientNet feature extractor**, pretrain trên ImageNet, base layer đóng băng, classifier head đổi cho 3 class. Model trainable params chỉ còn vài nghìn — nên hy vọng train sẽ nhanh. Thử xem!

### 🎯 Chuẩn bị loss và optimizer

```python
loss_fn = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
```

* **CrossEntropyLoss** — chuẩn cho phân loại nhiều class.
* **Adam** với learning rate **0.001**.

### 🔌 Dùng lại `engine.py`

Vì đã import code going modular, ta có `engine.train` (bên trong gọi `train_step` và `test_step` sẵn). Không phải viết lại vòng lặp.

```python
from going_modular.going_modular import engine
```

### 🎲 Đặt seed và bấm giờ

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

from timeit import default_timer as timer
start_time = timer()
```

### 🚂 Train

```python
results = engine.train(
    model=model,
    train_dataloader=train_dataloader,
    test_dataloader=test_dataloader,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=5,
    device=device,
)
```

Chỉ **5 epoch** cho lần đầu. Nếu muốn lâu hơn, tăng `epochs` — đây cũng là bài tập mở rộng.

### 🐛 Một lỗi thừa dấu cách

Lần chạy đầu có lỗi — mình gõ thừa **một dấu cách** trong code. Đây là kiểu lỗi rất người: chỉ một khoảng trắng thừa là Python không hiểu. Sửa xong, train bắt đầu.

### 📈 Kết quả ấn tượng

Vài epoch in ra:

* Test accuracy: **54% → 81% → 85% → 86% → 88%**, gần **90%**.
* Chỉ mất **khoảng 13 giây** cho 5 epoch trên Colab.

Lưu ý: **đừng lo nếu số của bạn hơi khác**. Do tính ngẫu nhiên của deep learning (dù đã đặt seed, còn phụ thuộc hardware), con số có thể xê dịch — nhưng **xu hướng** phải giống: test accuracy tăng, test loss giảm.

### 🥊 So với TinyVGG

Nhớ lại section custom datasets: TinyVGG chỉ đạt khoảng **20% test accuracy** và mất **khoảng 65 giây**.

Kết quả lần này: **~90% trong 13 giây**. Transfer learning "thổi bay" model tự xây.

Thử tưởng tượng: hàng trăm layer của EfficientNet, mỗi layer đóng góp một chút, đưa model tới gần 90% chỉ với vài chục ảnh mỗi class. Mình sẽ rất vui nếu ship một model chính xác cỡ đó.

### 💡 Vì sao nhanh vậy?

Vì **chỉ classifier head được train** — vài nghìn tham số thay vì hàng triệu. Base layer đóng băng nên không tốn compute cập nhật. Đây là lợi ích kép của feature extraction: **nhanh và hiệu quả**.

### 📌 Chốt lại

Đây là **model tốt nhất từ đầu khóa** cho bài toán pizza/steak/sushi. Nhưng đừng dừng ở "những con số trên giấy" — video sau ta **vẽ loss curve** để xem model thực sự học tốt đến đâu.

Bài tập: thử tự `plot_loss_curves` từ `results` (dùng hàm có trong `helper_functions.py` trên GitHub của khóa). Hẹn gặp các bạn!
