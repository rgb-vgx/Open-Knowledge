---
title: 'Bài 107 — Chuyển dataset thành DataLoader'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 107
status: edited
source: '107 - Turning Our Datasets Into DataLoaders.md'
categories:
- AI
tags: []
---

# 🔄 Chuyển dataset thành DataLoader

> Nguồn: `107 - Turning Our Datasets Into DataLoaders.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920320)

Lý thuyết mini-batch đã xong, giờ code. Bài này mình tạo `train_dataloader` và `test_dataloader`, kiểm tra số batch, rồi lấy một batch ra xem shape — vì mọi thứ trong PyTorch bắt đầu và kết thúc bằng shape.

### ⌨️ Import và đặt batch size

```python
from torch.utils.data import DataLoader

BATCH_SIZE = 32
```

`BATCH_SIZE` là **hyperparameter** — giá trị bạn tự đặt, không phải model học ra. Dân PyTorch hay viết hoa tên hyperparameter để dễ phân biệt, bạn sẽ thấy pattern này nhiều.

Nguyên tắc chuẩn bị DataLoader áp dụng cho ảnh, text, audio — loại dữ liệu nào cũng vậy.

---

### 🧱 Tạo hai DataLoader

```python
train_dataloader = DataLoader(
    train_data,
    batch_size=BATCH_SIZE,
    shuffle=True,
)

test_dataloader = DataLoader(
    test_data,
    batch_size=BATCH_SIZE,
    shuffle=False,
)
```

Các tham số quan trọng của `DataLoader`:

* **`dataset`** — dataset cần chia batch.
* **`batch_size`** — mặc định là 1 (mỗi batch 1 ảnh); ta đặt 32.
* **`shuffle`** — có xáo trộn hay không.
* Ngoài ra còn `num_workers` (bao nhiêu core để load dữ liệu — nhìn chung càng cao càng tốt nhưng để mặc định cũng ổn), `drop_last` (có bỏ batch cuối nếu lẻ không), `pin_memory`…

Vì sao train `shuffle=True` còn test `shuffle=False`? Train cần xáo trộn để model không học thứ tự. Test thì model không bao giờ thấy lúc train, chỉ dùng để evaluate, nên thứ tự không ảnh hưởng chất lượng — giữ nguyên cho dễ so sánh giữa các lần đánh giá.

---

### 📏 Kiểm tra số batch

```python
len(train_dataloader)  # 1875
len(test_dataloader)   # 313
```

* `60.000 / 32 = 1875` — chia hết.
* `10.000 / 32 = 312.5` → làm tròn lên **313**. Batch cuối sẽ không đủ 32 mẫu, nhưng không sao.

Nếu đổi batch size, số batch đổi theo: batch size 128 thì còn khoảng 469 batch; batch size 1 thì thành 60.000 batch. Mình giữ 32. (Transcript gốc nói 169 batch với batch size 128 — con số đó nhẩm nhầm, vì `60.000 / 128 = 468,75`.)

---

### 🔍 Lấy một batch ra xem

```python
train_features_batch, train_labels_batch = next(iter(train_dataloader))
print(train_features_batch.shape)  # torch.Size([32, 1, 28, 28])
print(train_labels_batch.shape)    # torch.Size([32])
```

Giải nghĩa shape `[32, 1, 28, 28]`:

* **32** — batch size (số ảnh trong batch)
* **1** — color channel (ảnh xám)
* **28, 28** — height, width

Nhãn là tensor 32 phần tử, mỗi ảnh một nhãn. Đây chính là dạng **channels first** — PyTorch mặc định — trong khi slide input/output ban đầu vẽ channels last. Cùng dữ liệu, khác thứ tự chiều.

---

### 🖼️ Vẽ một ảnh bất kỳ trong batch

```python
random_idx = torch.randint(0, len(train_features_batch), size=[1]).item()
img, label = train_features_batch[random_idx], train_labels_batch[random_idx]

plt.imshow(img.squeeze(), cmap="gray")
plt.title(class_names[label])
plt.axis(False)
print(f"Image size: {img.shape}")
print(f"Label: {label}, label size: {label.shape}")
```

Kết quả `Image size: torch.Size([1, 28, 28])` — không có chiều batch vì đây là một ảnh đơn lẻ. `label` ở đây là tensor 0 chiều (lấy một phần tử từ batch), nên `label.shape` là `torch.Size([])`, đó là bình thường.

Với seed cố định, lần lượt ra bag, shirt, coat, coat, bag… Bag trông như một hình chữ nhật méo — đúng kiểu "khó tin nổi" nếu bắt viết rule-based.

---

### 💡 Mẹo in shape

Thói quen tốt: sau mỗi bước biến đổi, **in shape ra**. Đó là cách nhanh nhất để "làm một với dữ liệu" và phát hiện lệch shape sớm.

---

### ✅ Tạm kết

Dữ liệu đã sẵn sàng dưới dạng batch `[32, 1, 28, 28]`. Nhưng ta chưa có model. Bài sau mình dựng **Model 0** — baseline đơn giản nhất để làm mốc so sánh.
