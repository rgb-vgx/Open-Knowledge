---
title: 'Bài 054 — Sigmoid activation function: ưu và nhược điểm'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 54
status: edited
source: '054 - Sigmoid Activation Function.md'
categories:
- AI
tags: []
---

# 🎯 Sigmoid: hàm kích hoạt kinh điển và những lỗ hổng

> Nguồn: `054 - Sigmoid Activation Function.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47956463)

Chào các bạn! Ta bắt đầu chuỗi bài về **activation function**. Mở màn là **sigmoid** — hàm gắn liền với thuở sơ khai của deep learning. Mình có sẵn một notebook Jupyter minh họa cho toàn bộ phép toán: lấy input nhân weights, cộng bias, áp activation function, ra output.

### 🧮 Sigmoid làm gì?

Sigmoid nhận giá trị `z` và ép về khoảng `0..1`:

```text
σ(x) = 1 / (1 + e^(-x))
```

Ở đây `x` là kết quả của input nhân weights (cộng bias). Hàm được dùng ngay trong **hidden neuron**, sau bước nhân weights cộng bias. Một điểm quan trọng đã bàn: **đạo hàm của sigmoid luôn nằm trong khoảng 0 đến 0.25**.

### 🫥 Nhắc lại vanishing gradient

Vì đạo hàm ≤ `0.25`, khi backpropagate qua mạng sâu, các giá trị nhân dồn theo chain rule cứ nhỏ dần (`0.25 → 0.05 → 0.001 → ...`). Gradient gần như biến mất, `w_new ≈ w_old`, weights không cập nhật được. Đó là lý do phải tìm activation function khác.

### 📜 Sigmoid qua góc nhìn lịch sử

* Là hàm kích hoạt **dùng nhiều nhất thời kỳ đầu** của deep learning, khi mạng còn nông. Mạng càng sâu thì càng thành vấn đề.
* Là **hàm trơn (smoothing)** và **dễ lấy đạo hàm** — thuận lợi khi tính từ loss function.
* Output nằm trong `0..1` nên *có thể* nghĩ tới **xác suất**, nhưng đừng xem nó là xác suất theo nghĩa chặt chẽ.
* Có thể hiểu như **firing rate** của neuron: mức độ neuron nên bật/tắt.

### ⚠️ Ba nhược điểm chính

1. **Dễ vanishing gradient.** Khi input hơi lệch khỏi vùng quanh gốc, gradient gần như bằng 0. Vì đạo hàm chỉ trong `0..0.25`, qua chain rule giá trị teo dần và nhiều weight không bao giờ được cập nhật.
2. **Output không zero-centered.** Sigmoid đi qua mức `0.5` chứ không qua gốc `0`. Nhớ lại **standard scaler** trong machine learning: nó đưa dữ liệu về **mean = 0, std = 1**. Thực nghiệm cho thấy dữ liệu zero-centered giúp **cập nhật weights hiệu quả hơn**. Sigmoid không đáp ứng được điều đó.
3. **Phép toán exp tốn thời gian.** Công thức có `e^(-x)`; phép mũ chậm hơn trên máy tính.

### ✅ Ưu điểm

* **Gradient trơn**, hạn chế output nhảy vọt.
* Output trong `0..1`, **chuẩn hóa** output mỗi neuron.
* **Dự đoán rõ ràng** sát `0` hoặc `1`: đặt ngưỡng `0.5` — lớn hơn thành `1`, nhỏ hơn thành `0`.

---

### 🧾 Tổng kết

| Ưu điểm | Nhược điểm |
|---|---|
| Gradient trơn, ít nhảy vọt | Dễ vanishing gradient |
| Output `0..1`, chuẩn hóa được | Không zero-centered |
| Dự đoán gần `0`/`1` rõ ràng | Phép `exp` chậm |

Vì ba nhược điểm trên, người ta chuyển sang hàm tiếp theo: **tanh**. Bài sau ta sẽ xem **tanh** sửa được gì và còn yếu ở đâu. Hẹn gặp lại!
