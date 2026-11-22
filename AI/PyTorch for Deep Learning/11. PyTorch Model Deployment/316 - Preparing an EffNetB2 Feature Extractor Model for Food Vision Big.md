---
title: 'Bài 316 — Chuẩn bị EffNetB2 và data augmentation cho 101 lớp'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 316
status: edited
source: '316 - Preparing an EffNetB2 Feature Extractor Model for Food Vision Big.md'
categories:
- AI
tags: []
---

# 🧠 Model 101 lớp và vì sao cần data augmentation

> Nguồn: `316 - Preparing an EffNetB2 Feature Extractor Model for Food Vision Big.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34121066)

Chào các bạn. Với 101 lớp thay vì 3, mình cần chỉnh model một chút và thêm regularization. Bài này tạo `effnetb2_food101` và transform mới cho tập train.

### 🔧 Tạo model 101 lớp

Nhờ hàm `create_effnetb2_model` đã viết, chỉ cần đổi `num_classes`:

```python
effnetb2_food101, effnetb2_transforms = create_effnetb2_model(num_classes=101)
```

Kiểm tra bằng summary: input shape không đổi, **output shape = 101**, các lớp base vẫn **frozen**, chỉ classifier cuối là trainable. Số tham số trainable tăng so với bản 3 lớp vì output layer rộng hơn (101 thay vì 3) — với Food Vision Mini chỉ hơn **4.000** tham số trainable, còn 101 lớp nhiều hơn hẳn. Tổng tham số của model gần như giữ nguyên, vì phần lớn nằm ở backbone đã đóng băng.

### ⚠️ Vì sao thêm data augmentation?

Bộ Food101 có hơn **100.000 ảnh**. Dữ liệu càng nhiều, model càng dễ **overfitting** — train loss thấp hơn test loss vì model học thuộc tập train mà không generalize.

Cách chống overfitting phổ biến là **regularization**. Vài hướng:

* Lấy thêm dữ liệu.
* Đơn giản hoá model.
* Dùng **data augmentation**.

Data augmentation là cách dễ nhất (sau transfer learning): biến đổi ảnh train để model khó học hơn, từ đó tăng tính đa dạng.

### 🎨 Chọn `TrivialAugmentWide`

Mình tham khảo recipe huấn luyện model pretrained của đội torchvision. Ở đó có nhiều kỹ thuật (label smoothing, mixup, cutmix, random erasing...), nhưng mình chọn **TrivialAugmentWide** vì dễ áp dụng nhất:

```python
food101_train_transforms = torchvision.transforms.Compose([
    torchvision.transforms.TrivialAugmentWide(),
    effnetb2_transforms,
])
```

Với tập test/inference thì **không** augment, chỉ dùng transform gốc:

```python
food101_test_transforms = effnetb2_transforms
```

Lý do: augmentation chỉ dành cho train, nhằm làm dữ liệu "khó" hơn một cách nhân tạo. Tập test phải phản ánh dữ liệu thật ngoài đời, nên giữ nguyên.

### 📊 Tóm tắt cấu hình

* Model: `effnetb2_food101`, 101 output, backbone frozen.
* Train transform: `TrivialAugmentWide` + `effnetb2_transforms`.
* Test transform: `effnetb2_transforms`.
* Dataset: `torchvision.datasets.Food101`.

---

Mình đã thử train không augmentation và thấy augmentation giúp ích, nhưng các bạn cứ thử cả hai để tự kiểm chứng. Bài sau mình tải bộ Food101.
