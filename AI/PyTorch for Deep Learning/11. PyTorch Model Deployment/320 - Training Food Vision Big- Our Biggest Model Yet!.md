---
title: 'Bài 320 — Train Food Vision Big: model lớn nhất khóa học'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 320
status: edited
source: '320 - Training Food Vision Big- Our Biggest Model Yet!.md'
categories:
- AI
tags: []
---

# 🔥 Train Food Vision Big và vượt mốc của paper gốc

> Nguồn: `320 - Training Food Vision Big- Our Biggest Model Yet!.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34125250)

Chào các bạn. Đây là màn chính: train 101 lớp, 5 epoch, và thử xem có vượt nổi **56.4%** của paper Food101 không. Mình cũng giới thiệu thêm một kỹ thuật regularization rất rẻ: **label smoothing**.

### ⚙️ Optimizer và loss

```python
optimizer = torch.optim.Adam(params=effnetb2_food101.parameters(), lr=1e-3)

loss_fn = torch.nn.CrossEntropyLoss(label_smoothing=0.1)
```

* **Adam** với `lr=1e-3` — công thức quen thuộc.
* **CrossEntropyLoss** với `label_smoothing=0.1`. Theo tài liệu PyTorch, `label_smoothing` nhận float trong `[0.0, 1.0]`, mặc định `0.0`.

### 🧠 Label smoothing là gì?

Label smoothing là kỹ thuật **regularization** (chống overfitting) đưa một chút "nhiễu" vào nhãn. Ví dụ với 5 lớp, thay vì model dự đoán:

```text
[0.01, 0.01, 0.99, 0.01, 0.01]
```

thì làm mượt thành:

```text
[0.01, 0.01, 0.96, 0.01, 0.01]
```

Nó ngăn model quá **tự tin** vào một lớp duy nhất và luôn để ngỏ các lớp khác. Điều này hữu ích khi dataset lớn, có thể có nhãn sai.

Đội torchvision dùng `label_smoothing=0.1` khi train model pretrained, và ghi nhận cải thiện accuracy. Với 101 lớp, mình cũng áp thử.

### 🚂 Gọi training loop

```python
from going_modular.going_modular import engine

results = engine.train(
    model=effnetb2_food101,
    train_dataloader=train_dataloader_food101_20_percent,
    test_dataloader=test_dataloader_food101_20_percent,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=5,
    device=device,
)
```

Mình chạy trên **Nvidia Tesla P100** (Colab Pro): khoảng **264 giây/epoch**, tổng gần **17 phút**. Trong lúc chờ, mình chuẩn bị sẵn code plot loss curves và save/load model.

### 📊 Kết quả

* Epoch 1: train accuracy chưa tới 30%, test đã gần 50% (trên 101 lớp!).
* Sau 5 epoch: test accuracy **gần 58%**.

Vậy là **vượt 56.4%** của paper gốc, chỉ với **20% dữ liệu train**. Đổi lại, mình dùng network hiện đại + transfer learning. Paper gốc train **6 ngày** trên Tesla K20X; của mình khoảng 17 phút.

### 💾 Lưu và load model

```python
effnetb2_food101_model_path = "09_pretrained_effnetb2_feature_extractor_food101_20_percent.pth"
torch.save(effnetb2_food101.state_dict(), effnetb2_food101_model_path)

loaded_effnetb2_food101, effnetb2_transforms = create_effnetb2_model(num_classes=101)
loaded_effnetb2_food101.load_state_dict(
    torch.load(effnetb2_food101_model_path, map_location=torch.device("cpu"))
)
```

### 📏 Kích thước model

Model chỉ khoảng **30 MB** — gần như không tăng so với bản 3 lớp (~29.8 MB). Lý do: mình chỉ mở rộng **lớp cuối** từ 3 lên 101 output, toàn bộ backbone giữ nguyên. Tổng tham số chỉ hơn bản cũ khoảng **100.000**, nên tốc độ inference vẫn nhanh.

Loss curves cũng rất đẹp: test loss vẫn thấp hơn train loss, cho thấy model còn dư địa học nếu train lâu hơn. Nếu tiếp tục train, kết quả có thể còn tốt hơn.

---

Đã có model mạnh. Việc còn lại là đóng gói thành app và deploy — bài sau mình phác thảo cấu trúc file cho Food Vision Big.
