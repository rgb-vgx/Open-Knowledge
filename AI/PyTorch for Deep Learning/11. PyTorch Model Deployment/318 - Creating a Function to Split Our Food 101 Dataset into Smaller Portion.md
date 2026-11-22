---
title: 'Bài 318 — Chia Food101 thành subset 20% để thí nghiệm nhanh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 318
status: edited
source: '318 - Creating a Function to Split Our Food 101 Dataset into Smaller Portion.md'
categories:
- AI
tags: []
---

# ✂️ `random_split`: lấy 20% dữ liệu cho thí nghiệm đầu

> Nguồn: `318 - Creating a Function to Split Our Food 101 Dataset into Smaller Portion.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34121074)

Chào các bạn. Đây là lần đầu mình train với 101 lớp, nên chưa biết pipeline có ổn không. Nguyên tắc: chạy thí nghiệm nhỏ trước, ổn rồi mới scale. Mình lấy **20%** Food101, giống cách đã làm với Food Vision Mini.

### 🎯 Đặt mốc so sánh: paper Food101

Trước khi train, mình cần một con số để hướng tới. Paper gốc Food101 (Bossard et al.) báo cáo:

* **Random Forest:** khoảng **50.76%** accuracy.
* **CNN:** **56.4%** accuracy.

Mục tiêu của mình: **vượt 56.4%** trên test set, nhưng chỉ dùng **20% dữ liệu train**. Paper gốc dùng 100% dữ liệu và train tới **6 ngày**; mình có lợi thế là network hiện đại và transfer learning.

### 📉 Vì sao 20%?

* 20% của 75.750 train ≈ **15.150 ảnh**.
* 20% của 25.250 test ≈ **5.050 ảnh**.

Như vậy mỗi epoch nhanh hơn nhiều, đủ để biết hướng đi đúng hay sai. Khi mọi thứ ổn, các bạn có thể train lại trên toàn bộ dữ liệu như bài tập mở rộng.

### 🧰 Hàm `split_dataset`

PyTorch có sẵn `torch.utils.data.random_split(dataset, lengths, generator=...)`. Mình bọc lại thành hàm:

```python
import torch
from torch.utils.data import random_split

def split_dataset(dataset, split_size: float = 0.2, seed: int = 42):
    length_1 = int(len(dataset) * split_size)
    length_2 = len(dataset) - length_1
    print(f"[INFO] Splitting dataset of length {len(dataset)} "
          f"into splits of size: {length_1}, {length_2}")
    random_split_1, random_split_2 = random_split(
        dataset,
        lengths=[length_1, length_2],
        generator=torch.manual_seed(seed),
    )
    return random_split_1, random_split_2
```

Điểm quan trọng: **tổng `lengths` phải bằng độ dài dataset**. Nếu dataset có 10 phần tử mà chia `[3, 7]` thì được; `[3, 6]` sẽ lỗi. Ở đây `length_2 = len(dataset) - length_1` đảm bảo điều đó.

`generator=torch.manual_seed(42)` giúp kết quả chia **tái lập được** giữa các lần chạy.

### 🚀 Áp dụng cho train và test

```python
train_data_food101_20_percent, _ = split_dataset(train_data, split_size=0.2)
test_data_food101_20_percent, _ = split_dataset(test_data, split_size=0.2)

len(train_data_food101_20_percent), len(test_data_food101_20_percent)
```

Kết quả:

```text
(15150, 5050)
```

Đúng như tính toán. Hai biến này là dữ liệu sẽ dùng để train Food Vision Big ở các bài sau.

---

Còn một bước nữa trước khi train: biến dataset thành **DataLoader**. Các bạn thử trước nhé — bài sau mình làm cùng.
