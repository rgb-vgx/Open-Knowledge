---
title: 'Bài 342 — Tải CIFAR10 và tạo dataset train/test'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 342
status: edited
source: '342 - Downloading the CIFAR10 Dataset.md'
categories:
- AI
tags: []
---

# 🖼️ Tải CIFAR10 bằng torchvision để benchmark

> Nguồn: `342 - Downloading the CIFAR10 Dataset.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745234)

Video trước ta đã bật TF32 (GPU Ampere trở lên, score ≥ 8.0), hy vọng có thêm chút tốc độ từ kiểu dữ liệu "best of both worlds". Giờ đến phần quen thuộc: chuẩn bị dữ liệu. Mình dùng **CIFAR10** vì dễ tải và là dataset benchmark kinh điển.

### 🎯 Vì sao lại là CIFAR10?

Nếu PyTorch 2.0 hứa tăng tốc mà không chạy tốt trên CIFAR10, thì sao ta dám chắc nó chạy tốt trên dataset riêng của các bạn? Dùng một dataset đơn giản, dễ kiểm chứng là cách hợp lý.

Về CIFAR10:

* **10 lớp ảnh**.
* Tổng **60.000 ảnh**, kích thước gốc **32×32**.
* Ta sẽ **upscale lên 224×224** để "vắt" GPU nhiều dữ liệu nhất có thể.

---

### 📥 Tạo train và test dataset

CIFAR10 có sẵn trong `torchvision.datasets`. Ta dùng transforms đã tạo và chỉnh ở các bài trước (crop và resize về 224):

```python
import torchvision

train_dataset = torchvision.datasets.CIFAR10(
    root=".",            # lưu vào thư mục hiện tại
    train=True,          # tập train
    download=True,       # tải về máy/Colab
    transform=transforms
)

test_dataset = torchvision.datasets.CIFAR10(
    root=".",
    train=False,         # tập test
    download=True,
    transform=transforms
)
```

Vài lưu ý:

* `root="."` là **thư mục hiện tại**. Colab là **ephemeral** — đóng/ngắt phiên là dữ liệu mất, nên phải chạy lại cell để tải. Vì thế ta tải programmatically.
* `train=True/False` chọn tập train hay test.
* `download=True` bảo tải về.
* Ưu điểm của torchvision datasets: **việc chia train/test đã làm sẵn** cho ta.

CIFAR10 gốc là ảnh màu 32×32, 10 lớp. Nhờ transform crop/resize 224, ảnh của ta thành **224×224** — kích thước này được set programmatically dựa trên dung lượng VRAM (bài 340).

---

### 📏 Kiểm tra kích thước split

Mình luôn thích khám phá dữ liệu trước:

```python
print("Train length:", len(train_dataset))
print("Test length:", len(test_dataset))
```

Kết quả: **50.000** ảnh train, **10.000** ảnh test — khớp với kỳ vọng. Dù 60.000 ảnh, torchvision tải và giải nén khá nhanh, tất cả diễn ra sau hậu trường.

> Nhân đây: nếu các bạn tên là "Len" (như hàm `len()`), chắc mỗi lần gõ code lại thấy như đang tự gọi mình. Mình gõ chữ này cả nghìn lần rồi — chào các Len nhé!

---

### 🔍 Xem thử một mẫu

```python
image, label = train_dataset[0]
print(image.shape)   # torch.Size([3, 224, 224])
print(label)         # ví dụ 6
```

Ta có **3 kênh màu**, **224×224**. Label là một số từ 0–9; ví dụ `6` có thể là **frog** (thứ tự lớp: airplane, automobile, bird, cat, dog, frog, horse, ship, truck...). Mình khuyên các bạn tự visualize để xem nó ra hình gì.

---

### 🧩 Thử thách: tự viết DataLoader

Bài tập cho các bạn — việc ta đã làm nhiều lần trong khóa: **biến dataset thành DataLoader** cho train và test, dùng đúng `batch_size` đã tính programmatically ở bài trước. Hãy thử trước, video sau ta làm cùng nhau.
