---
title: 'Code vòng lặp chạy cả loạt experiment'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 216
status: edited
source: '216 - Coding Out the Steps to Run a Series of Modelling Experiments.md'
categories:
- AI
tags: []
---

# 🔁 Code vòng lặp chạy cả loạt experiment

> Nguồn: `216 - Coding Out the Steps to Run a Series of Modelling Experiments.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33124664)

Put your hand up if you're ready to run some modelling experiments! Bạn không thấy nhưng tay mình đang giơ lên. Ta đã có đủ: hai data loader, hai hàm tạo feature extractor, và `train` function biết track writer. Giờ gộp tất cả lại thành một vòng lặp chạy 8 experiment.

### 📋 Ba list/dict điều khiển vòng lặp

```python
# Các giá trị epoch cần thử
num_epochs = [5, 10]

# Các model, dùng hàm tạo model mới mỗi lần
models = ["effnetb0", "effnetb2"]

# Dict các train data loader
train_dataloaders = {
    "pizza_steak_sushi_10_percent": train_dataloader_10_percent,
    "pizza_steak_sushi_20_percent": train_dataloader_20_percent,
}
```

Vì sao dùng **hàm** tạo model? Để mỗi experiment khởi tạo một **instance mới**, cùng điểm xuất phát — không train tiếp model đã train ở experiment trước.

Cách setup bằng list/dict đơn giản, dễ đọc. Với ~8 experiment thì đủ tốt; nếu chạy nhiều hơn có thể cần cách "elegant" hơn.

### 💾 Import `save_model`

Ta muốn **lưu từng model đã train ra file** để sau này load lại model tốt nhất. Nếu không lưu mà chỉ chạy, xem xong là mất model.

```python
from going_modular import utils
# utils.save_model(model=..., target_dir=..., model_name=...)
```

### 🔁 Ba vòng lặp lồng nhau

```python
set_seeds()          # tái lập kết quả
experiment_number = 0

# 1) duyệt từng data loader
for dataloader_name, train_dataloader in train_dataloaders.items():

    # 2) duyệt từng số epoch
    for epochs in num_epochs:

        # 3) duyệt từng model
        for model_name in models:
            experiment_number += 1
            print(f"[INFO] Experiment number: {experiment_number}")
            print(f"[INFO] Model: {model_name}")
            print(f"[INFO] DataLoader: {dataloader_name}")
            print(f"[INFO] Number of epochs: {epochs}")

            # Chọn và tạo model MỚI
            if model_name == "effnetb0":
                model = create_effnetb0()
            else:
                model = create_effnetb2()

            # Bộ loss + optimizer MỚI cho từng experiment
            loss_fn = nn.CrossEntropyLoss()
            optimizer = torch.optim.Adam(params=model.parameters(), lr=0.001)

            # Train, track writer, lưu model
            train(model=model,
                  train_dataloader=train_dataloader,
                  test_dataloader=test_dataloader,
                  optimizer=optimizer,
                  loss_fn=loss_fn,
                  epochs=epochs,
                  device=device,
                  writer=create_writer(
                      experiment_name=dataloader_name,
                      model_name=model_name,
                      extra=f"{epochs}_epochs"))

            # Lưu model ra file
            save_filepath = f"07_{model_name}_{dataloader_name}_{epochs}_epochs.pth"
            utils.save_model(model=model,
                             target_dir="models",
                             model_name=save_filepath)
            print("-" * 50)
```

### 🔑 Những điểm quan trọng

1. **`train` bản trong notebook** — không phải `engine.train`, vì bản này đã có tham số `writer`.
2. **Một writer mới mỗi experiment** — nhờ `create_writer`, mỗi cái vào thư mục riêng: `.../effnetb0/5_epochs`, `.../effnetb2/10_epochs`...
3. **Loss và optimizer mới mỗi experiment** — để mọi thứ cùng xuất phát.
4. **Test data loader cố định** — cùng một test set cho tất cả.
5. **Tên file `.pth`** — gồm model, data loader, epoch để dễ phân biệt.

### 🧩 Có thể mở rộng

* Vary **learning rate** thay vì cố định `0.001`.
* Thử **optimizer khác** như SGD thay Adam.
* Thêm `assert` để chắc `model_name` hợp lệ.

### ✅ Tạm kết

Đây là một trong những phần mình thích nhất của machine learning — viết một loạt experiment để xem model transfer learning nào tốt nhất. Code dài, chắc chắn sẽ có lỗi đâu đó, nhưng cứ chạy rồi sửa. Video sau ta **chạy thật** loạt experiment này. Bạn thử trước nhé, hẹn gặp!
