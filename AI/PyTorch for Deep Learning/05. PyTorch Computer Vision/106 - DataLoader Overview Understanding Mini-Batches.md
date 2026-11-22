---
title: 'Bài 106 — Tổng quan DataLoader và hiểu về mini-batch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 106
status: edited
source: '106 - DataLoader Overview Understanding Mini-Batches.md'
categories:
- AI
tags: []
---

# 📦 Tổng quan DataLoader và hiểu về mini-batch

> Nguồn: `106 - DataLoader Overview Understanding Mini-Batches.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920318)

Ta có 60.000 ảnh quần áo, 10 lớp. Câu hỏi mở đầu bài này khá thú vị: liệu có thể model hóa dữ liệu này bằng **đường thẳng thuần** hay cần **phi tuyến**? Cứ ghi câu hỏi đó lại, ta sẽ kiểm chứng bằng thực nghiệm. Còn trước mắt, cần chuẩn bị dữ liệu: chuyển `Dataset` thành `DataLoader`.

### 🧾 Dataset hiện tại là gì?

```python
train_data
# Dataset FashionMNIST
#     Number of datapoints: 60000
#     Root location: data
#     Split: Train
#     StandardTransform
# Transform: ToTensor()
```

`test_data` tương tự, chỉ khác số điểm và split. Cả hai đã được `ToTensor()` chuyển thành tensor rồi.

### 🔁 Vì sao cần DataLoader?

`DataLoader` biến dataset thành một **Python iterable**, cụ thể hơn là chia dữ liệu thành các **batch** (mini-batch). Hai lý do chính:

1. **Hiệu quả tính toán và bộ nhớ.** 60.000 ảnh 28x28 nghe nhỏ, nhưng dataset deep learning hiện đại có thể tới hàng triệu ảnh. Không phải máy nào cũng nhét nổi tất cả vào RAM/GPU memory. Chia thành nhóm, ví dụ **32 ảnh một lần**, là vừa.
2. **Nhiều cơ hội cập nhật gradient hơn mỗi epoch.** Nếu nhìn cả 60.000 ảnh một lượt, mỗi epoch chỉ có **một** lần cập nhật weight. Chia thành batch 32 thì cứ 32 ảnh, optimizer lại cập nhật một lần. Điều này sẽ rõ hơn khi viết training loop.

**Batch size** là hyperparameter — bạn tự đặt. 32 là giá trị phổ biến cho bài nhập môn; thực tế có thể 64, 128, 512… tùy bài toán và phần cứng.

Nếu muốn hiểu lý thuyết sâu hơn, từ khóa là **mini-batch gradient descent** (Andrew Ng có bài giảng rất hay).

### 🗺️ Hình dung dữ liệu sau khi chia batch

Với batch size 32 trên 60.000 ảnh train:

* Batch 0: 32 mẫu, batch 1: 32 mẫu, …
* Tổng số batch ≈ `60.000 / 32` ≈ **1875**.

Tương tự cho test (10.000 ảnh), số batch ≈ 313.

### 🧩 Code sẽ viết ở bài sau

Phác thảo trước để các bạn thấy hướng:

```python
from torch.utils.data import DataLoader

BATCH_SIZE = 32

train_dataloader = DataLoader(
    dataset=train_data,
    batch_size=BATCH_SIZE,
    shuffle=True,
)

test_dataloader = DataLoader(
    dataset=test_data,
    batch_size=BATCH_SIZE,
    shuffle=False,
)
```

Vì sao train thì `shuffle=True`? Vì nếu dữ liệu vô tình có thứ tự (ví dụ toàn ảnh quần, rồi toàn ảnh áo), ta không muốn model học cái thứ tự đó. Xáo trộn giúp model chỉ học pattern giữa các lớp. Test thì thường để nguyên thứ tự cho dễ so sánh kết quả giữa các lần đánh giá — sẽ bàn kỹ ở bài sau.

### ✅ Tạm kết

Mini-batch = chia dữ liệu thành từng nhóm nhỏ để vừa bộ nhớ và cập nhật gradient nhiều lần hơn. Bài này mới là lý thuyết; bài sau mình code thật và in ra shape của từng batch để kiểm chứng.
