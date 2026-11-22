---
title: 'Các kiểu transfer learning khác nhau'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 190
status: edited
source: '190 - Different Kinds of Transfer Learning.md'
categories:
- AI
tags: []
---

# 🌳 Các kiểu transfer learning khác nhau

> Nguồn: `190 - Different Kinds of Transfer Learning.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33011486)

Chào các bạn! Ta đã tải và soi một model từ torchvision. Giờ mình muốn bàn rộng hơn: **có những kiểu transfer learning nào**.

### 🧠 Nhắc lại cấu trúc feature extractor

Model ta đang có là EfficientNet B0, gồm:

* **`features`** — trích đặc trưng từ ảnh.
* **`avgpool`** — nén thành vector.
* **`classifier`** — phân loại.

Với EfficientNet B0, vector đó có **kích thước 1280**. Classifier hiện xuất ra **1000 class** vì pretrain trên ImageNet.

Ta sẽ đổi thành **3** cho pizza/steak/sushi — hoặc 10, 100 tùy số class bài toán.

---

### 🧊 "Frozen" nghĩa là gì?

Khi nói **base layers stay frozen**, nghĩa là các layer nền **không được cập nhật** tham số trong quá trình train. Chúng đã học trên ImageNet rồi, giữ nguyên.

Chỉ phần **output head** được train trên dữ liệu mới. Đó là **phần duy nhất trainable** của một feature extractor.

---

### 🥇 Kiểu 1 — Original model (không đổi gì)

Nếu dữ liệu của bạn **đúng y như** dữ liệu model được train (ví dụ ImageNet 1000 class), bạn dùng nguyên model, không chỉnh sửa.

---

### 🥈 Kiểu 2 — Feature extraction

Phù hợp khi bạn có **ít dữ liệu custom** — như ta, chỉ khoảng 100 ảnh mỗi class.

Cách làm:

* Giữ **frozen** toàn bộ base layer.
* Đổi **output head** cho khớp số class của mình.
* Train **chỉ head** trên dữ liệu mới.

Ta thay đổi **input data** (dữ liệu riêng) và **output head** (3 class), còn feature layer giữ nguyên.

---

### 🥉 Kiểu 3 — Fine-tuning

Phù hợp khi bạn có **lượng lớn dữ liệu** — ví dụ 1000 ảnh mỗi class chứ không phải 100.

Cách làm: **unfreeze** một phần base layer và cập nhật weight của chúng theo dữ liệu custom. Với ít dữ liệu, fine-tune dễ làm hỏng pattern đã học — nên thường chỉ nên làm khi có nhiều dữ liệu.

---

### 🔢 Thứ tự quan trọng

Quy trình điển hình:

1. Bắt đầu từ **original model** (còn gọi là foundation model).
2. Chuyển sang **feature extraction**: đóng băng base layer, train head.
3. Khi cần, **fine-tune**: mở khóa dần từ **trên xuống dưới** (top-down).

---

### 📊 Bảng tóm tắt

| Kiểu | Base layer | Output head | Khi nào dùng |
|---|---|---|---|
| Original | Giữ nguyên | Giữ nguyên | Dữ liệu giống hệt model gốc |
| Feature extraction | Frozen | Train mới | Ít dữ liệu custom |
| Fine-tuning | Unfreeze dần | Train | Nhiều dữ liệu custom |

---

### 🎯 Chốt lại

Section này ta tập trung **feature extraction** — hợp với dữ liệu nhỏ. Nếu muốn, sau khi xong module, hãy tự tìm hiểu **fine-tuning** như bài tập mở rộng.

Điểm cần khắc cốt: **bắt đầu từ model gốc → feature extraction → fine-tune dần**. Video sau ta bắt tay chuẩn bị model cho feature extraction. Hẹn gặp!
