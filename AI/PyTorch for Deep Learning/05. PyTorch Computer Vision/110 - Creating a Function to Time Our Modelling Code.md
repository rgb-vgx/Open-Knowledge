---
title: 'Bài 110 — Viết hàm đo thời gian huấn luyện'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 110
status: edited
source: '110 - Creating a Function to Time Our Modelling Code.md'
categories:
- AI
tags: []
---

# ⏱️ Viết hàm đo thời gian huấn luyện

> Nguồn: `110 - Creating a Function to Time Our Modelling Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920328)

Machine learning rất "experimental". Hai thứ bạn sẽ luôn muốn theo dõi: **hiệu năng** (loss, accuracy) và **tốc độ** (train nhanh hay chậm). Bài này mình viết một hàm nhỏ để đo thời gian train — chuẩn bị cho màn so sánh CPU và GPU sắp tới.

### ⚖️ Performance và speed thường đánh đổi nhau

Tăng hiệu năng thường kéo theo model to hơn — nhiều layer, nhiều hidden unit — nên chạy chậm hơn vì phải tính toán nhiều hơn. Tốc độ đặc biệt quan trọng khi chạy trên internet, trên GPU dùng chung hay trên thiết bị di động. Vì vậy cần đo cả hai, chứ không chỉ accuracy.

Mình cố ý để model trên CPU ở bài trước để lát nữa so sánh CPU vs GPU.

### ⌨️ Dùng `timeit.default_timer`

```python
from timeit import default_timer as timer
```

`timeit.default_timer()` trả về một mốc thời gian (thực chất là `time.perf_counter()`). Cách dùng: lấy mốc `start` trước khi chạy code, lấy mốc `end` sau khi chạy, hiệu hai mốc là thời gian đã trôi qua.

### 🧱 Hàm `print_train_time`

```python
def print_train_time(start: float, end: float, device: torch.device = None):
    """Prints difference between start and end time."""
    total_time = end - start
    print(f"Train time on {device}: {total_time:.3f} seconds")
    return total_time
```

Chi tiết:

* Type hint `start: float`, `end: float` giúp người đọc biết hàm nhận gì.
* `device: torch.device = None` — để mặc định `None` vì muốn so sánh model chạy trên nhiều thiết bị khác nhau.
* `{total_time:.3f}` in ra 3 chữ số thập phân.
* Hàm trả về `total_time` để lát nữa có thể lưu lại phục vụ so sánh.

### 🧪 Thử ngay

```python
start_time = timer()
# ... code cần đo ở đây ...
end_time = timer()

print_train_time(start=start_time, end=end_time, device="cpu")
```

Chạy với khoảng code rỗng thì ra một số rất nhỏ, cỡ `3.304e-05` giây — vì gần như chẳng có gì để tính. Khi nhét code train thật vào giữa hai mốc, ta sẽ đo được thời gian train thực tế.

### 🧩 Đã đủ mảnh ghép

Đến đây ta có: model, data (DataLoader), loss function, optimizer, accuracy metric và hàm bấm giờ. Đủ đồ để train.

### ✅ Tạm kết

Chỉ một hàm ngắn nhưng sẽ dùng xuyên suốt section: `print_train_time(start, end, device)`. Bài sau mình ghép tất cả lại thành **training loop và testing loop** cho dữ liệu dạng batch — phần code dài nhất từ đầu khóa.
