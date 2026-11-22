---
title: 'Train ViT custom trên Food Vision Mini: kết quả khiêm tốn'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 262
status: edited
source: '262 - Training our Custom ViT on Food Vision Mini.md'
categories:
- AI
tags: []
---

# 🏋️ Train ViT custom trên Food Vision Mini: kết quả khiêm tốn

> Nguồn: `262 - Training our Custom ViT on Food Vision Mini.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34040106)

Đã đến lúc train Vision Transformer! Nếu bạn đã làm thử thách ở bài trước, kết quả thế nào? Còn chưa, ta làm cùng nhau ngay.

### 🧱 Gom mọi thứ vào một cell

Để optimizer và quá trình train dùng cùng một chỗ, ta gom tất cả lại. Đặt seed để cố gắng tái lập kết quả:

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)
```

Rồi gọi hàm `train()` từ `engine.py` (viết từ phần Going Modular):

```python
results = engine.train(
    model=vit,
    train_dataloader=train_dataloader,
    test_dataloader=test_dataloader,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=10,
    device=device,   # GPU / CUDA nếu có
)
```

Đó chính là lý do ta viết `engine.py`: không phải viết lại code train mỗi lần. `train_dataloader` và `test_dataloader` là những instance tạo từ phần "Create datasets and dataloaders" hồi đầu chương.

---

### 📉 Diễn biến training

Kết quả ban đầu khá hứa hẹn, rồi... lộn xộn:

* Mỗi epoch chỉ mất khoảng **5,5 giây** — mô hình to so với dữ liệu nhỏ.
* Training accuracy dần tăng lên, nhưng **test accuracy nhảy loạn xạ**: lúc đầu vượt 50%, có lúc tụt dưới 20%, lần khác vọt lên **26%**.
* Loss có lúc **tăng** thay vì giảm.

Vậy mô hình đang **overfit** hay **underfit**? Nhìn qua thì có vẻ **underfit** — ta muốn training accuracy cao hơn nhiều, còn các chỉ số test thì lung tung.

Thật đáng tiếc: bao công replicate một kiến trúc to đẹp mà nó chưa chạy tốt trên dữ liệu của ta.

---

### 🤔 Vì sao kém?

Hãy nghĩ xem setup của ta khác gì setup của paper. Gợi ý: đọc lại phần **Experiments** trong paper — mục **Datasets** để xem họ dùng dữ liệu gì, ngó qua **model variants** (ta mới dùng Base), rồi xem **Training & Fine-tuning** và **Results**.

Câu hỏi: vì sao ViT gốc đạt kết quả tốt như vậy, còn ta thì chưa?

---

### ✅ Nhìn mặt tích cực

Bạn nên thấy tự hào: ta đã **train được** Vision Transformer đầu tiên do chính mình dựng, trên dữ liệu Food Vision Mini. Kết quả chưa ngon, nhưng **quá trình train đã chạy** — giờ ta có nền tảng để nghĩ cách cải thiện.

Suy nghĩ trước nhé, bài sau ta mổ xẻ từng điểm khác biệt.
