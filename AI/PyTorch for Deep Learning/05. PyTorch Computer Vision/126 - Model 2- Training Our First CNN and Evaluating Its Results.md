---
title: 'Bài 126 — Model 2: huấn luyện CNN đầu tiên và đánh giá kết quả'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 126
status: edited
source: '126 - Model 2- Training Our First CNN and Evaluating Its Results.md'
categories:
- AI
tags: []
---

# 🎉 Model 2: huấn luyện CNN đầu tiên và đánh giá kết quả

> Nguồn: `126 - Model 2- Training Our First CNN and Evaluating Its Results.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920364)

Đây là khoảnh khắc đáng chờ: train CNN đầu tiên của khóa học. Nhờ `train_step`/`test_step`, cả optimization loop chỉ còn vài dòng. Và lần này, kết quả có vượt baseline 83.4% không?

### ⚠️ Cái bẫy: print shape trong `forward`

Lần chạy đầu, output ngập tràn shape — vì các dòng `print(x.shape)` trong `forward` chưa được comment. Với 1875 batch mỗi epoch, mỗi batch in 3 dòng, Colab phải cắt "streaming output truncated to the last 5000 lines".

Cách xử lý: mở lại class Model 2, comment các dòng print, chạy lại cell khởi tạo model, rồi train lại. Nhắc nhở: debug thì in, train thật thì tắt.

### ⚙️ Setup và train

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)

train_time_start_model_2 = timer()

epochs = 3
for epoch in tqdm(range(epochs)):
    print(f"Epoch: {epoch}\n---------")
    train_step(
        model=model_2,
        data_loader=train_dataloader,
        loss_fn=loss_fn,
        optimizer=optimizer,
        accuracy_fn=accuracy_fn,
        device=device,
    )
    test_step(
        model=model_2,
        data_loader=test_dataloader,
        loss_fn=loss_fn,
        accuracy_fn=accuracy_fn,
        device=device,
    )

train_time_end_model_2 = timer()
total_train_time_model_2 = print_train_time(
    start=train_time_start_model_2,
    end=train_time_end_model_2,
    device=device,
)
```

`torch.cuda.manual_seed(42)` giúp tái lập kết quả trên GPU — thiếu nó thì kể cả set `manual_seed` vẫn có thể lệch.

### 📈 Kết quả

Sau 3 epoch:

* **Test accuracy ≈ 88.5%** — vượt baseline 83.4%.
* Thời gian train khoảng **42 giây** (Tesla P100), tức khoảng **14 giây/epoch**.

Đây là lần đầu tiên một model vượt baseline. CNN thực sự "ăn tiền" ở bài toán ảnh.

Nhưng nhớ: số của bạn có thể khác. Daniel lúc quay dùng Tesla P100; bạn có thể dùng GPU khác. Lệch vài phần trăm hoặc gấp đôi thời gian là chuyện bình thường; lệch cả chục điểm accuracy thì nên kiểm tra code.

### 📋 Lấy dictionary kết quả

```python
model_2_results = eval_model(
    model=model_2,
    data_loader=test_dataloader,
    loss_fn=loss_fn,
    accuracy_fn=accuracy_fn,
    device=device,
)
```

Kết quả `model_acc` quanh **88**. Giờ ta có ba dictionary — `model_0_results`, `model_1_results`, `model_2_results` — cùng cấu trúc, sẵn sàng để so sánh.

### 🧠 Vì sao CNN thắng?

Vì convolution khai thác được **cấu trúc không gian** của ảnh: pixel gần nhau có liên quan, cạnh và texture lặp lại ở nhiều vị trí. Linear layer phá vỡ cấu trúc đó ngay từ bước `Flatten`. CNN giữ cấu trúc, học feature theo vùng, rồi mới nén dần.

### 💡 Nhưng đừng dừng ở đây

88.5% chưa phải trần. Có nhiều hướng thí nghiệm:

* Tăng `hidden_units` (ví dụ 30).
* Bỏ/giữ ReLU để xem tác động.
* Đổi `kernel_size`, `padding`, `MaxPool2d`.
* Train lâu hơn (10 epoch).

Mình khuyến khích các bạn tự thử — chính những lần thử đó mới dạy được nhiều.

### ✅ Tạm kết

CNN đầu tiên đạt **~88.5%**, vượt baseline. Bài sau mình gom cả ba model vào một bảng để so sánh accuracy, loss và thời gian train — và bàn về trade-off giữa hiệu năng và tốc độ.
