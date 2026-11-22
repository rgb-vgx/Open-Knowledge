---
title: 'Bài 118 — Hiểu các thành phần của custom DataLoader trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 118
status: edited
source: '118 - Understanding components of custom data loader in pytorch.md'
categories:
- AI
tags: []
---

# 🚚 DataLoader: nạp dữ liệu theo batch thay vì cả núi một lúc

> Nguồn: `118 - Understanding components of custom data loader in pytorch.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49093765)

Chào các bạn! Ở các bài trước mình vẫn đưa toàn bộ dữ liệu vào model trong một lần. Hôm nay mình sẽ chỉ ra vấn đề của cách làm đó, rồi dựng **custom Dataset** và **DataLoader** để nạp dữ liệu theo **mini-batch** — kỹ năng gần như chắc chắn bị hỏi khi phỏng vấn.

### 😰 Vấn đề với cách nạp dữ liệu hiện tại

Mình dùng lại bộ **insurance dataset** (tải qua KaggleHub) với 1338 dòng. Cách cũ: chuyển cả `X_train_tensor` — 1070 dòng × 6 cột — vào model trong **một iteration**. Với dữ liệu nhỏ thì ổn, nhưng hình dung dữ liệu **1 triệu dòng** chiếm 2–10 GB: GPU/VRAM của bạn có thể **out of memory (OOM)** ngay.

Vấn đề thứ hai là tốc độ học. Nếu chỉ một lần cập nhật trọng số sau khi quét hết 1 triệu dòng, mạng học rất chậm. Mình ví như đưa học sinh đọc **1000 trang sách** rồi mới hỏi "hiểu không?" — trong khi bạn ấy có thể tắc ngay từ trang thứ 5. Ta muốn **feedback sớm hơn** để cập nhật weight/bias thường xuyên hơn.

Chia nhỏ ra thì sao? 1000 trang, cứ **10 trang** lấy feedback một lần → 100 lần feedback cho một "epoch" đọc hết sách. Với 100 epoch, tổng cộng **100 × 100 = 10.000 iteration**. Đó chính là tinh thần của mini-batch: đỡ tốn bộ nhớ mà cập nhật trọng số dày hơn.

### 🧩 Hai thành phần cốt lõi: Dataset và DataLoader

**Dataset** — import từ `torch.utils.data.Dataset` — chịu trách nhiệm **nạp và xử lý** dữ liệu: đọc CSV, transform, chuẩn hóa, encode và chuyển sang tensor. Nó mô tả dữ liệu được lưu/thứ tự truy cập, cách biến đổi (preprocessing), và cách lấy **một mẫu** duy nhất.

**DataLoader** — import từ `torch.utils.data.DataLoader` — **bọc** Dataset thành một iterable và **nạp theo batch**. Muốn 32 dòng một lần? DataLoader sẽ yêu cầu Dataset trả 32 dòng. Nó cũng lo **shuffle** và **parallel processing** qua nhiều worker.

### 🏗️ Ba phương thức bắt buộc của custom Dataset

Đây là phần hay được hỏi khi phỏng vấn. Một custom Dataset phải implement:

1. **`__init__`** — khởi tạo dataset, nạp dữ liệu và áp dụng transform nếu cần.
2. **`__len__`** — trả về **tổng số mẫu**; PyTorch dùng nó để biết dataset bắt đầu/kết thúc ở đâu.
3. **`__getitem__`** — trả về **một mẫu** khi được cấp index, giống truy cập `list[5]`.

```python
from torch.utils.data import Dataset, DataLoader

class InsuranceDataset(Dataset):
    def __init__(self, X, y):
        self.x = X
        self.y = y

    def __len__(self):
        return len(self.x)

    def __getitem__(self, idx):
        features = torch.tensor(self.x[idx], dtype=torch.float32)
        target = torch.tensor(self.y[idx], dtype=torch.float32)
        return features, target
```

Lưu ý: mình truyền thẳng `X_train`/`y_train` (đã scale, encode) vào Dataset thay vì đọc lại CSV trong `__init__` — vì preprocessing đã làm trước đó rồi. Mục tiêu của bài là học cách nạp theo batch.

### 📦 Bọc bằng DataLoader và kiểm tra batch

```python
dataset = InsuranceDataset(X_train, y_train)
loader = DataLoader(dataset, batch_size=32, shuffle=True, num_workers=4)

for batch_idx, (features, targets) in enumerate(loader):
    print(f"Batch {batch_idx}: {features.shape}")
    break
```

Đặt `batch_size=32` thì mỗi batch trả về `torch.Size([32, 6])` — 32 dòng, 6 cột. Với 1070 dòng sẽ có **34 batch**; batch cuối chỉ còn lẻ vài dòng. Đổi `batch_size=1000` thì batch 1 đủ 1000, batch 2 chỉ còn 70 — cho thấy ta **kiểm soát được bộ nhớ** đưa vào model.

Công thức tính iteration: `số_dòng / batch_size = số batch mỗi epoch`. Ví dụ 1000 dòng, batch 100 → 10 iteration/epoch; nhân 100 epoch → 1000 iteration tổng.

### ⚡ num_workers và lợi ích của mini-batch

Tham số **`num_workers=4`** bật xử lý song song: PyTorch tạo 4 process nạp trước các batch kế tiếp trong khi model vẫn đang train batch hiện tại, nhờ đó giảm thời gian chờ (đổi lại tốn thêm CPU/GPU).

Khi chuyển vòng train sang dùng batch, mỗi batch phải `optimizer.zero_grad()`, tính loss, `loss.backward()` và `optimizer.step()` — thay vì một lần cho cả dataset.

Ba lợi ích chính của mini-batch:
* **Ổn định training** — cập nhật gradient thường xuyên hơn.
* **Giảm bộ nhớ** — không nạp toàn bộ dữ liệu một lúc.
* **Tổng quát hóa tốt hơn** — shuffle tạo ngẫu nhiên, giảm overfitting.

Bài sau mình sẽ áp dụng đúng bộ khung này cho **dữ liệu ảnh** — loại dữ liệu phi cấu trúc phức tạp hơn nhiều.
