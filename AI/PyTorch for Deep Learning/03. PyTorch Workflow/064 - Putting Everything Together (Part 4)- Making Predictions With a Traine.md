---
title: 'Bài 64 — Ghép mọi thứ lại (Phần 4): Dự đoán với model đã train'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 64
status: edited
source: '064 - Putting Everything Together (Part 4)- Making Predictions With a Traine.md'
categories:
- AI
tags: []
---

# 🎯 Ghép mọi thứ lại (Phần 4): Dự đoán với model đã train

> Nguồn: `064 - Putting Everything Together (Part 4)- Making Predictions With a Traine.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775590)

Đã train xong model V2 với device-agnostic code. Loss giảm, tham số gần đúng. Nhưng câu hỏi thực sự là: khi dự đoán, kết quả trông thế nào? Video này trả lời bằng hình ảnh — và vấp thêm một lỗi device nữa.

### 🎛 Đặt model về eval mode

```python
model_1.eval()

with torch.inference_mode():
    y_preds = model_1(X_test)
```

Nguyên tắc bất di bất dịch: train thì `model.train()`, dự đoán/inference thì `model.eval()` + `torch.inference_mode()`.

Kết quả `y_preds` là tensor **nằm trên `cuda`**. Vì sao? Vì ở bài trước, cả model lẫn `X_test` đều đã được đưa lên device. Dự đoán sinh ra từ dữ liệu trên GPU thì cũng nằm trên GPU.

---

### 💥 Lỗi "can't convert CUDA device type tensor to NumPy"

Gọi `plot_predictions(predictions=y_preds)` sẽ báo:

> `TypeError: can't convert cuda:0 device type tensor to numpy. Use Tensor.cpu() to copy the tensor to host memory first.`

Nguyên nhân: hàm `plot_predictions` dùng **matplotlib**, mà matplotlib làm việc với **NumPy** — NumPy chạy trên CPU. Tensor đang ở GPU thì không chuyển thẳng được.

Cách sửa đơn giản:

```python
y_preds = y_preds.cpu()
plot_predictions(predictions=y_preds)
```

`.cpu()` copy tensor từ bộ nhớ GPU về host memory (CPU). Sau này khi vẽ dữ liệu khác trên GPU, nhớ nhắc lại mình chuyển về CPU trước.

---

### 🖼 Kết quả trực quan

Chấm đỏ (dự đoán) **gần như phủ khít lên chấm xanh lá** (test data). Không cần chỉnh tay gì cả — tham số ngẫu nhiên đã tự cập nhật nhờ backpropagation và gradient descent, tiến sát giá trị lý tưởng.

Muốn thử độ nhạy: đổi `weight`/`bias` hoặc `lr` xem kết quả lệch ra sao. Con số có thể khác giữa các máy, quan trọng là hướng đi đúng.

---

### 🐛 Hai lỗi device đã gặp

1. Bài 63: model trên GPU, dữ liệu trên CPU.
2. Bài 64: tensor dự đoán trên GPU, matplotlib cần CPU.

Cả hai đều cùng một gốc: **mọi thứ tham gia phép tính phải cùng device, và thư viện hiển thị cần CPU**. Gặp vài lần là thành phản xạ.

---

### ✅ Tạm kết

Model đã dự đoán chuẩn. Nhưng nếu notebook ngắt kết nối ngay lúc này thì công train đổ sông đổ biển. Bài tập: tự lưu `state_dict` của `model_1` rồi nạp lại, xem có ra cùng kết quả không. Bài sau mình làm chính thức phần lưu/nạp cho model V2.
