---
title: 'Bài 345 — Experiment 1: train ResNet50 không torch.compile'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 345
status: edited
source: '345 - Experiment 1 - Single Run without torch.compile.md'
categories:
- AI
tags: []
---

# 🥇 Experiment 1: baseline không compile

> Nguồn: `345 - Experiment 1 - Single Run without torch.compile.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745242)

Các bạn thử được Experiment 1 chưa? Loop và hàm bấm giờ có chạy không? Giờ mình làm cùng. Đây là **baseline**: train một lần ResNet50 trên CIFAR10, **không** `torch.compile` — giống hệt cách train trước thời PyTorch 2.0. Ta quan tâm **speed**, không phải độ chính xác.

### ⚙️ Thiết lập chung

```python
num_epochs = 5
learning_rate = 0.003
```

Mình dùng `learning_rate=0.003` vì thấy nó chạy khá tốt; các bạn có thể thử `0.001` hay bất kỳ giá trị nào. Nhưng nhớ: ta tập trung vào **tốc độ**.

Tạo model bằng hàm `create_model` cũ (transforms lần này không cần vì dữ liệu đã transform rồi), rồi:

```python
model = model.to(device)
loss_fn = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
```

* **Loss**: `CrossEntropyLoss` cho bài **multi-class classification** (CIFAR10). (Binary classification mới dùng `BCE`.)
* **Optimizer**: `Adam` — "anh bạn trung thành", chạy tốt trong phần lớn tình huống.

> Ta vẫn dùng `.to(device)` kiểu cổ điển, dù PyTorch 2.0 cho phép set device toàn cục. Trong thực nghiệm, **giữ mọi thứ giống nhau** giữa các lần chạy là điều quan trọng nhất để so sánh công bằng.

### 🏃 Chạy và đo

Gọi hàm `train` với model, train/test dataloader, loss, optimizer, `num_epochs=5`, device. Kết quả lưu vào `single_run_no_compile_results`.

> Cảnh báo: vì dùng nhiều dữ liệu, tùy GPU/máy mà đoạn này **chạy khá lâu** — trên A100 khoảng **7 phút** cho 5 epoch. Cứ để nó chạy, đừng đóng Colab kẻo phiên bị ngắt.

### 📊 Kết quả trên A100

* Tổng: **dưới 7 phút** cho 5 epoch.
* **Epoch train đầu tiên ~75 giây** — chậm hơn các epoch sau. Đây là xu hướng chung: epoch đầu tốn thời gian vì nhiều thứ diễn ra sau hậu trường (tối ưu dữ liệu, copy qua lại...). Các bạn sẽ thấy điều này cả với `torch.compile`.
* **Epoch test ~7.69 giây** — nhanh hơn khoảng **10 lần** vì ít dữ liệu hơn và **không cần tính gradient**.
* **Test accuracy cuối: ~87%**. Không phải state-of-the-art, nhưng ổn — và ta không nhắm tới nó.

Kết quả (thời gian từng epoch, loss, accuracy) được lưu lại để vẽ đồ thị so sánh sau này.

### 🔜 Thử thách: Experiment 2

Giờ thêm `torch.compile`. Chỉ **một dòng**:

```python
compiled_model = torch.compile(model)
```

Các bạn thử tự làm trước — tạo model y như trên, rồi bọc `torch.compile`. Đó sẽ là Experiment 2. Video sau ta làm cùng nhau.
