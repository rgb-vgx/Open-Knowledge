---
title: 'Bài 175 — Loss Functions cho Segmentation'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 175
status: edited
source: '175 - Segmentation Loss Functions.md'
categories:
- AI
tags: []
---
# 🎯 Loss Functions cho Segmentation: Dice và Cross Entropy

> Nguồn: `175 - Segmentation Loss Functions.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49214087)

Chào các bạn! Đã có kiến trúc down/upsampling, giờ ta cần đo model học tốt đến đâu. Bài này giải thích vì sao **MSE không dùng được** cho segmentation, rồi đi vào **cross entropy loss**, **IoU loss**, **dice loss** và cách **kết hợp** chúng.

### 📖 Loss function là gì?

**Loss function** đo khác biệt giữa dự đoán của model và **ground truth**, rồi backprop để cập nhật trọng số. Với segmentation, loss phải so sánh ở **mức pixel**.

Khác biệt cốt lõi:

* **Image classification** — một ảnh cho **một label** (dog/cat).
* **Segmentation** — ảnh 640×640 cho ra **640×640 dự đoán** (mỗi pixel một nhãn).

### ❗ Vì sao cần loss chuyên biệt?

**MSE** (mean squared error) là loss chuẩn nhưng **không phù hợp** với segmentation vì **class imbalance**:

* Vùng object thường **rất nhỏ** so với toàn ảnh — khối u trong ảnh y tế, nhà/cây trong ảnh vệ tinh.
* Phần lớn ảnh là **background**.

Nếu dùng MSE, model dễ "học" cách đoán toàn background (vì chiếm đa số) mà vẫn có loss thấp. Ta cần loss **tập trung vào pixel của object** — kể cả khi model chỉ đoán đúng một pixel foreground, cũng phải có trọng số lớn hơn nhiều so với background.

### 📊 Cross Entropy

**Cross entropy** phân loại từng pixel, nhưng **vẫn chịu ảnh hưởng class imbalance**.

```text
L_CE = -(1/N) Σ_i y_i · log(ŷ_i)
```

Trong đó `y` là nhãn thật (0/1 với binary), `ŷ` là xác suất model dự đoán. Khi chỉ có hai lớp, đây là **binary cross entropy**.

### 📐 IoU Loss

**IoU loss** tối ưu trực tiếp chỉ số **IoU** thay vì từng pixel. IoU giữa hai vùng A và B:

```text
IoU = |A ∩ B| / |A ∪ B|
```

với `|A ∪ B| = |A| + |B| - |A ∩ B|`. Vì IoU làm việc trên **toàn vùng**, nó không nhấn mạnh đúng mức thông tin pixel-level mà segmentation cần.

### 🎲 Dice Loss

**Dice** là phiên bản "nâng cấp" của IoU, **tập trung hơn vào phần giao**:

```text
Dice = 2|A ∩ B| / (|A| + |B|)
L_Dice = 1 - (2 Σ y·ŷ + smooth) / (Σ y + Σ ŷ + smooth)
```

Hệ số **2** ở tử số khiến Dice **ưu tiên vùng khớp** giữa dự đoán và ground truth, thay vì bị pha loãng bởi vùng không giao (đa phần là background). Đó là lý do Dice hợp với segmentation mất cân bằng.

`smoothed` là một hằng số rất nhỏ (ví dụ `1e-6`) cộng vào cả tử và mẫu để tránh **chia cho 0** khi ảnh không có object (ground truth toàn 0).

### 🧪 Cài đặt trong PyTorch

```python
import torch
import torch.nn.functional as F

def dice_loss(pred, target, smooth=1e-6):
    intersection = (pred * target).sum()
    union = pred.sum() + target.sum()
    return 1 - (2 * intersection + smooth) / (union + smooth)

def segmentation_loss(pred, target, weight=0.5):
    ce = F.binary_cross_entropy(pred, target)
    return weight * ce + dice_loss(pred, target)
```

* `pred * target` chỉ giữ giá trị ở vùng ground truth = 1, chính là phần giao.
* `.sum()` cộng toàn bộ để được `intersection` và `union`.
* **Lưu ý dtype**: target phải là float (`1.0`, `0.0`) thì `binary_cross_entropy` mới chạy — nếu truyền int sẽ báo `Found dtype Long but expected Float`.

Cách kết hợp: cộng **CE có trọng số** với **Dice**. Mặc định transcript đặt **weight = 0.5** cho CE và giữ nguyên Dice; có thể chỉnh tuỳ bài toán (đặt weight = 1 để cân bằng hai loss). Loss cuối cùng cần **minimize** là tổng này.

---
### ✅ Tóm lại

Segmentation cần loss nhạy với pixel foreground và chịu được class imbalance. **Dice** tập trung vào phần giao, **cross entropy** ổn định việc phân loại từng pixel; kết hợp cả hai (có trọng số) cho kết quả tốt. Bài sau ta đi vào **Fully Convolutional Networks (FCN)**. Hẹn gặp!
