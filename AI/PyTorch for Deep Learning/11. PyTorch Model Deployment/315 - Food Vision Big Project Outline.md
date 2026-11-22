---
title: 'Bài 315 — Food Vision Big: nâng cấp lên 101 lớp món ăn'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 315
status: edited
source: '315 - Food Vision Big Project Outline.md'
categories:
- AI
tags: []
---

# 🍔 Food Vision Big: bước nhảy từ 3 lên 101 lớp

> Nguồn: `315 - Food Vision Big Project Outline.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34112134)

Chào các bạn. Food Vision Mini đã deploy thành công, nhưng nó chỉ nhận ra pizza, steak, sushi. Gửi cho bạn bè thì họ thử món khác là "tịt". Giờ mình mở rộng lên **101 lớp** — Food Vision Big, model lớn nhất khóa học.

### 🍕 Giới hạn của Food Vision Mini

Food Vision Mini dùng **3 trong tổng số 101 lớp** của bộ Food101. Đây là bộ dữ liệu *"a challenging data set of 101 food categories"*, có trên TensorFlow Datasets, Kaggle, Papers with Code và torchvision. Mình lấy qua `torchvision.datasets.Food101`.

Vì vậy bước tiếp theo rất tự nhiên: dùng **toàn bộ 101 lớp**.

### 🎯 Kế hoạch Food Vision Big

Mình sẽ lặp lại đúng workflow của Food Vision Mini nhưng với model lớn hơn:

1. Tạo **EffNetB2 feature extractor** với `num_classes=101`.
2. Tải bộ **Food101**.
3. Train trên một tập con cho nhanh.
4. Đóng gói thành app Gradio và deploy lên Hugging Face Spaces.

Đây là tinh thần xuyên suốt khóa: chạy thí nghiệm nhỏ để chắc chắn mọi thứ hoạt động, rồi mới **step things up a notch**.

### 🧪 Thử thách: model cho 101 lớp

Ở phần Food Vision Mini, mình có hàm `create_effnetb2_model`. Hàm này nhận tham số `num_classes`.

Câu hỏi: làm sao tạo model fit được **101 lớp**? Gợi ý nằm ngay trong chữ ký của hàm. Các bạn thử tự viết trước khi xem bài sau:

```python
model, transforms = create_effnetb2_model(num_classes=101)
```

Chỉ cần đổi `num_classes` là classifier head tự động xuất ra 101 chiều. Không cần sửa gì trong thân hàm — đó là lợi ích của việc viết hàm có tham số ngay từ đầu.

### 🍜 Vài lớp sẽ gặp

Food101 gồm những món như burger, chicken wings, gnocchi, apple pie, ramen, tacos, gyoza, paella, pancakes, chicken curry, ribs... đủ 101 món. Khi app chạy, người dùng có thể thử gần như mọi món ăn phổ biến.

---

Bài sau mình tạo model và thêm **data augmentation** cho tập train, vì dữ liệu lớn hơn rất dễ gây overfitting.
