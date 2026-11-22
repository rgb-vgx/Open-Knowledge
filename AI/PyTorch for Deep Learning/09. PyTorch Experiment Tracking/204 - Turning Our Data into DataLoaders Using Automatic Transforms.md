---
title: 'Transform tự động từ model weights'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 204
status: edited
source: '204 - Turning Our Data into DataLoaders Using Automatic Transforms.md'
categories:
- AI
tags: []
---

# 🤖 Transform tự động từ model weights

> Nguồn: `204 - Turning Our Data into DataLoaders Using Automatic Transforms.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33081404)

All righty. Bài trước mình giao thử thách tạo DataLoader với **transform tạo tự động**. Nguyên tắc vẫn y nguyên: dữ liệu custom phải cùng format với model pretrained được train — điều này đảm bảo hiệu năng tốt nhất có thể.

### 📚 API "multi-weight support" mới

Mình mở tài liệu torchvision phiên bản **0.13+** (lúc ghi hình là bản unstable/nightly), vào mục *Models and pre-trained weights*. Đây là API mới: ta có thể khởi tạo transform cần thiết **từ chính weights** của model pretrained.

Ví dụ với `ResNet50`: lấy `weights` (mặc định `DEFAULT` = best available), rồi gọi `weights.transforms()` để lấy transform dùng lúc train model đó. Extra curriculum của bạn: đọc kỹ phần *models and pre-trained weights*, cực kỳ hữu ích cho transfer learning.

---

### 🎯 Chọn EfficientNet-B0

Ta dùng **EfficientNet-B0** vì đã thấy nó chạy tốt, và nó cân bằng giữa độ chính xác và số tham số. Trong mục *classification* của tài liệu, mình tìm tới `torchvision.models.EfficientNet_B0_Weights` và copy cho đúng chữ hoa chữ thường (sai là lỗi ngay).

```python
import torchvision

# Lấy weights mặc định (default = best available)
weights = torchvision.models.EfficientNet_B0_Weights.DEFAULT

# Tạo model với weights đó
model = torchvision.models.efficientnet_b0(weights=weights).to(device)
```

---

### 🔄 Lấy transform từ weights

```python
auto_transforms = weights.transforms()
```

Điểm hay của API mới: nếu PyTorch cập nhật recipe train EfficientNet-B0 (hoặc bất kỳ model nào trong torchvision), ta dùng luôn weights mới cải tiến. Và transform đi kèm chính là transform đã dùng để tạo bộ weights ấy — nên chắc chắn dữ liệu của ta được xử lý y như lúc model được train.

---

### 🧺 Tạo DataLoader với transform tự động

```python
train_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=train_dir,
    test_dir=test_dir,
    transform=auto_transforms,
    batch_size=32)
```

Tốc độ nhanh hơn vì ta đã làm việc này nhiều lần, nhưng vẫn nên luyện tay. Kết quả in ra train/test DataLoader, `class_names`, và ta thấy **transform tự động gần như giống hệt transform thủ công** ở bài trước.

---

### ⚖️ Thủ công vs tự động

* **Thủ công** — linh hoạt hơn, có thể thêm bớt bước (ví dụ augmentation), nhưng phải tự đảm bảo không lệch quá xa so với model pretrained, nếu không hiệu năng giảm.
* **Tự động** — chắc chắn đúng format vì đây là transform đi kèm weights của model bạn muốn dùng.

> Lưu ý nhỏ mình gặp: một cell bị thiếu `f` trong f-string nên in ra chữ thay vì giá trị — sửa lại là xong. Bạn để ý được lỗi này không?

---

### ✅ Tạm kết

Nói đến pretrained model thì bài sau ta sẽ **lấy một model pretrained, đóng băng các base layer và thay classifier head** cho hợp bài toán 3 lớp. Thực ra ta đã làm điều này ở section 6 (transfer learning), nên đây là dịp luyện lại. Thử tự làm với EfficientNet-B0 trước nhé — mình sẽ làm cùng bạn ở video sau.
