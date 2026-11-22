---
title: 'Vẽ loss curve: model của ta đang underfit hay overfit?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 264
status: edited
source: '264 - Plotting a Loss Curve for Our ViT Model.md'
categories:
- AI
tags: []
---

# 📈 Vẽ loss curve: model của ta đang underfit hay overfit?

> Nguồn: `264 - Plotting a Loss Curve for Our ViT Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049488)

Bài trước ta đã liệt kê những gì training setup còn thiếu — lớn nhất là **scale** (dữ liệu). Giờ hãy nhìn thẳng vào model qua **loss curve**, cách tốt nhất để biết nó đang underfit hay overfit.

### 🧾 Tóm tắt những gì còn thiếu

* **Dữ liệu**: ta có **225 ảnh train**, paper có hàng triệu ảnh. Đây là thứ đầu tiên nên tăng — có thể tải trọn Food 101 từ `torchvision.datasets` (một extension đáng thử, làm xong chia sẻ lên GitHub discussions nhé).
* **Gradient clipping**: chặn gradient khỏi quá lớn (chống overfitting).
* **Learning rate warmup**: bắt đầu lr thấp rồi tăng tới base lr (chống overfitting).
* **Learning rate decay**: khi gần hội tụ thì **giảm dần lr**.

Hình dung learning rate decay dễ như thế này: giống lúc với đồng xu ở cuối ghế sofa — càng gần, bạn càng bước **những bước nhỏ hơn**. Vậy mới không vượt qua nó.

---

### 📊 Tải loss curve

Dùng helper có sẵn:

```python
from helper_functions import plot_loss_curves

plot_loss_curves(results)
```

Biểu đồ cho thấy:

* **Training loss** giảm dần rồi **phẳng ra**.
* **Test loss**: một "ngọn núi" — ta muốn nó đi xuống kia.
* **Accuracy**: gần như không nhúc nhích.

Tăng thời gian train có thể cải thiện chút, nhưng nhìn kỹ: train loss giảm còn test loss vẫn cao — ta có cả **underfitting** (chưa học đủ) lẫn **overfitting** (train tốt hơn test).

Model "Goldilocks" lý tưởng là khi **train loss và test loss cùng giảm song song**.

---

### 🎁 Kỹ thuật đã học ở Section 6

Bạn có nhớ kỹ thuật ở Section 6 giúp xử lý cả overfitting lẫn underfitting không? Đó là **transfer learning**.

Giả sử ta bị kẹt với đúng 225 ảnh — công ty hỏi "kết quả tốt nhất với chừng này ảnh là gì?" — thì transfer learning là thứ mình sẽ với tới đầu tiên.

---

### 🔍 Tìm một ViT pre-trained

Ta đã tự dựng ViT, nhưng cũng có thể dùng bản **pre-trained**. Trong `torchvision.models`, có **ViT-B/16** — đúng kiến trúc ta vừa làm. Nó có sẵn **weights** train trên **ImageNet-1k**:

* Đạt **81% top-1 accuracy** trên 1000 lớp.
* Ảnh đầu vào **224×224**.
* Weights được train từ đầu bằng một biến thể của **DeiT** (Data-efficient Image Transformer) recipe.

---

### 🎯 Thử thách

Dùng weights của `vit_b_16` để làm **feature extractor** trên Food Vision Mini. Các bước rất giống phần transfer learning đã học (tìm "setting up a pretrained model"), chỉ thay bằng `torchvision.models.vit_b_16`. Bài sau ta làm cùng nhau.
