---
title: 'Viết hàm tạo SummaryWriter cho từng experiment'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 209
status: edited
source: '209 - Creating a Function to Create SummaryWriter Instances.md'
categories:
- AI
tags: []
---

# 🗂️ Viết hàm tạo SummaryWriter cho từng experiment

> Nguồn: `209 - Creating a Function to Create SummaryWriter Instances.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33111814)

Ta mới chỉ "cào" bề mặt của TensorBoard. Mình muốn bạn tự khám phá phần còn lại, còn trọng tâm section này là track experiment **programmatic**. Ta đã làm được với một model; giờ viết code để làm với nhiều model. Nguyên tắc: **một experiment = một folder**.

### 📂 Đặt tên thư mục experiment thế nào?

Mặc định `SummaryWriter` lưu vào `log_dir` dạng `runs/current_date_hostname`. Mình muốn mỗi experiment vào một thư mục riêng, gồm:

* **timestamp** — biết experiment chạy khi nào (năm-tháng-ngày).
* **experiment name** — tên cụ thể.
* **model name** — dùng kiến trúc nào (B0, B2...).
* **extra** — bất kỳ thông tin thêm nào.

Không có cách đặt tên "chuẩn" nào — bao nhiêu experiment thì bấy nhiêu cách track. Đây chỉ là một gợi ý.

---

### 🧩 Hàm `create_writer`

```python
from datetime import datetime
import os

def create_writer(experiment_name: str,
                  model_name: str,
                  extra: str = None):
    """Creates a torch.utils.tensorboard.writer.SummaryWriter instance
    tracking to a specific directory."""
    timestamp = datetime.now().strftime("%Y-%m-%d")  # năm-tháng-ngày

    if extra:
        log_dir = os.path.join("runs", timestamp, experiment_name, model_name, extra)
    else:
        log_dir = os.path.join("runs", timestamp, experiment_name, model_name)

    print(f"[INFO] Created SummaryWriter, saving to: {log_dir}...")
    return SummaryWriter(log_dir=log_dir)
```

Tham số: `experiment_name` và `model_name` là bắt buộc, `extra` mặc định `None` (có thể bỏ trống).

---

### 🧪 Thử tạo writer

```python
example_writer = create_writer(
    experiment_name="data_10_percent",
    model_name="effnetb0",
    extra="5_epochs")
```

Đặt tên `data_10_percent` vì ta đang dùng 10% dữ liệu Food 101 cho 3 lớp pizza/steak/sushi; model là EfficientNet-B0; extra ghi rõ train 5 epoch. Kết quả in ra:

```
[INFO] Created SummaryWriter, saving to: runs/2022-06-27/data_10_percent/effnetb0/5_epochs...
```

Như vậy khi mở TensorBoard, ta có thể lọc theo "5 epochs" hay "data 10%" đều được.

---

### 🐛 Lỗi nhỏ: quên trả về writer

Ban đầu mình chỉ `return log_dir` (một string), nên chưa phải writer. Sửa lại: import `SummaryWriter` rồi trả về `SummaryWriter(log_dir=log_dir)`. Giờ mới đúng thứ ta cần.

---

### 🚀 Tiến tới track nhiều experiment

Thấy sức mạnh chưa? Ta đã có cách **programmatic** tạo writer cho từng experiment. Có thể nhét hàm này vào `train` function qua tham số `writer`: mỗi lần gọi `train` sẽ tạo writer mới, lưu vào folder riêng. Thư mục vừa tạo (`runs/2022-06-27/data_10_percent/effnetb0/5_epochs`) đã xuất hiện trong TensorBoard đang mở (dù chưa có file bên trong).

---

### ✅ Tạm kết và thử thách

Thử thách cho video sau: **sửa `train` function để dùng `create_writer`**, để ta track nhiều experiment programmatic. Bạn thử trước nhé — mình sẽ làm cùng bạn ở video tiếp theo. Hẹn gặp!
