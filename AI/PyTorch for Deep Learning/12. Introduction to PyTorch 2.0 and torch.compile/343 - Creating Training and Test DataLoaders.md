---
title: 'Bài 343 — Tạo DataLoader train/test với num_workers'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 343
status: edited
source: '343 - Creating Training and Test DataLoaders.md'
categories:
- AI
tags: []
---

# 🚚 DataLoader: nạp dữ liệu nhanh nhất có thể lên GPU

> Nguồn: `343 - Creating Training and Test DataLoaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745238)

Đã có CIFAR10 trong tay, giờ ta biến nó thành **DataLoader**. Đây là chỗ ta giảm **bandwidth cost** — nạp dữ liệu lên GPU nhanh nhất có thể — đúng tinh thần tăng tốc của chương.

### 🧵 `num_workers` là gì?

`num_workers` là số **core/CPU thread** mà DataLoader dùng để nạp dữ liệu song song. Vì mục tiêu là đẩy data lên GPU càng nhanh càng tốt, ta muốn con số này cao.

Mình lấy `os.cpu_count()`:

```python
import os
from torch.utils.data import DataLoader

num_workers = os.cpu_count()
print(f"Using {num_workers} workers to load data. More is generally better (có điều kiện).")
```

Trên Colab bản mình đang dùng (Pro/premium) có **12 CPU**. Bản Colab trước đây chỉ có **2 worker** — tùy máy mà khác nhau.

---

### ⚠️ Có phải càng nhiều càng tốt?

Kinh nghiệm của mình: **nhiều thường tốt hơn**. Nhưng không phải lúc nào cũng vậy — có người thấy nó **bão hòa ở khoảng 4× số GPU**. Với một GPU, khoảng **4 worker** thường là đủ. Đây chỉ là quy tắc ngón tay cái; hãy thử nghiệm.

> Mình để link một discussion thread của PyTorch về chủ đề này nếu các bạn muốn đọc thêm.

---

### 🏋️ Train DataLoader

```python
train_dataloader = DataLoader(
    dataset=train_dataset,
    batch_size=batch_size,   # 128, set programmatically
    shuffle=True,             # xáo trộn để model không học thuộc thứ tự
    num_workers=num_workers
)
```

`shuffle=True` rất quan trọng: tránh model chỉ **ghi nhớ thứ tự** dữ liệu.

---

### 🧪 Test DataLoader

```python
test_dataloader = DataLoader(
    dataset=test_dataset,
    batch_size=batch_size,
    shuffle=False,            # đánh giá không cần xáo trộn
    num_workers=num_workers
)
```

`shuffle=False` vì khi đánh giá, ta chỉ cần đo trên dữ liệu model chưa từng thấy — không cần ngẫu nhiên.

---

### 📊 Kiểm tra số batch

```python
print(f"Train dataloader: {len(train_dataloader)} batches of {batch_size}")
print(f"Test dataloader: {len(test_dataloader)} batches of {batch_size}")
```

Với batch size 128:

* **391 batch** train (50.000 ảnh).
* **79 batch** test (10.000 ảnh).

Đó là khá nhiều dữ liệu: 60.000 ảnh cỡ 224. (A100 có 40GB, các bạn có thể thử nâng batch size lên **256**; máy khác thì tùy.)

---

### 🔜 Bước tiếp: train/test loop có bấm giờ

Việc tiếp theo là tạo **training loop và test loop** — ta đã làm ở phần "Going Modular". Nhưng lần này có thêm chức năng: **đo thời gian** mỗi bước train và test, rồi trả về trong dict kết quả. Vì toàn bộ thực nghiệm của ta chính là so sánh thời gian có/không `torch.compile`.

Thử thách: các bạn tự viết trước, video sau làm cùng nhau.
