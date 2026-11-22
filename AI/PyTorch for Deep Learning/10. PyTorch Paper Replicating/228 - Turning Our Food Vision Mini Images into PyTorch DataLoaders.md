---
title: 'Biến ảnh Food Vision Mini thành PyTorch DataLoader'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 228
status: edited
source: '228 - Turning Our Food Vision Mini Images into PyTorch DataLoaders.md'
categories:
- AI
tags: []
---

# 🍽️ Biến ảnh Food Vision Mini thành PyTorch DataLoader

> Nguồn: `228 - Turning Our Food Vision Mini Images into PyTorch DataLoaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975304)

Bài trước mình giao thử thách dùng `create_dataloaders` để đưa ảnh thành tensor rồi thành DataLoader. Giờ làm cùng nhau — và đây là lần đầu tiên ta thật sự bước vào việc replicate paper, vì phải chọn đúng thông số mà paper dùng.

### 📐 Tìm image size trong paper

Transform dùng để biến data thành dạng phù hợp với neural network. Ta tự viết transform bằng `torchvision.transforms`:

```python
from torchvision import transforms

manual_transforms = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
])
```

Nhưng `IMAGE_SIZE` là bao nhiêu? Nếu replicate cho đúng thì phải xem paper dùng kích thước nào. Thông tin này nằm khá sâu — tận **trang 13** — nên mình phải đọc ít nhất một lần rồi quay lại các bảng lớn để tìm chi tiết. Kết quả: **training resolution là 224** (224 × 224 cho height và width), nằm trong **Table 3** của paper.

Đây là lý do vì sao replicating là quá trình nhảy qua nhảy lại giữa paper và code.

---

### 🧮 Batch size: paper vs. máy của mình

Cũng trong chỗ đó có **batch size 4096** — một con số khổng lồ. Chia cho 32 (batch size mình hay dùng) thì lớn hơn **128 lần**. Colab với một GPU không đủ bộ nhớ cho batch 4096 (máy mình là Colab Pro, 16GB, vẫn không đủ so với compute của Google).

Nên phương châm là: **start small, scale up when necessary**. Giữ resolution **224**, nhưng hạ batch size xuống **32** để bắt đầu.

---

### 🔁 Tạo DataLoader

```python
BATCH_SIZE = 32
train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=manual_transforms,
    batch_size=BATCH_SIZE,
)
```

Đây là cái hay của việc đóng code thành script: dùng lại `data_setup.py`, không phải viết lại. Kiểm tra kết quả:

* `len(train_dataloader)` — khoảng **8 batch** (32 ảnh mỗi batch).
* `len(test_dataloader)` — khoảng **3 batch**.
* `class_names` — `['pizza', 'steak', 'sushi']`.

Một chi tiết nữa: ba biến thể ViT trong **Table 1** có số tham số khác nhau; mình sẽ dựng **bản nhỏ nhất** trước, vì dựng nhỏ rồi mới scale up được.

---

### 👀 Visualize, visualize, visualize

DataLoader đã có, nhưng theo thói quen mình vẫn muốn nhìn tận mắt. Thử thách bài sau: lặp qua `train_dataloader`, lấy **một ảnh**, lưu ảnh và label vào biến, rồi plot bằng **Matplotlib** với label làm title. Ảnh đó sẽ được dùng làm ảnh demo xuyên suốt notebook.

---

### ✅ Chốt lại

Data đã chảy qua transform đúng chuẩn paper (224×224), batch size hạ xuống 32 cho vừa phần cứng. Bài sau mình visualize một ảnh để chắc chắn mọi thứ ổn.
