---
title: 'Chạy tám experiment trong 5 phút'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 217
status: edited
source: '217 - Running Eight Different Modelling Experiments in 5 Minutes.md'
categories:
- AI
tags: []
---

# 🚀 Chạy tám experiment trong 5 phút

> Nguồn: `217 - Running Eight Different Modelling Experiments in 5 Minutes.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33132614)

All right. Bạn đã thử chạy code chưa? Có lỗi gì không? Hy vọng là chạy ngon, vì code cũng kha khá đấy. Giờ ta chạy **loạt experiment chính thức đầu tiên** của khóa học: thử các combo data size, training time và model size xem cái nào cho kết quả tốt nhất cho Food Vision Mini. Ba... hai... một!

### 🎬 Không lỗi!

Bấm chạy, và... **không lỗi nào cả**. Output:

```
[INFO] Experiment number: 1
[INFO] Model: effnetb0
[INFO] DataLoader: pizza_steak_sushi_10_percent
[INFO] Number of epochs: 5
[INFO] Created new effnetb0 model.
```

Nó tạo model mới, tạo SummaryWriter và lưu vào `.../10_percent/effnetb0/5_epochs`. Ta thấy "live commentary" của một lần train — và ngày trên máy đã sang **28/6** (hôm trước là 27/6).

---

### 🔁 Chạy hết cả loạt

Rồi lần lượt:

* Experiment 2: EffNetB2, 10%, 5 epoch — `.../effnetb2/5_epochs`.
* Experiment 3: mới gần nửa chặng...
* Cứ thế chạy tiếp.

Mình nhắc lại lý do muốn experiment chạy **thật nhanh**: để sớm biết cái nào hiệu quả. Lần này mình đoán các model sẽ khá giống nhau, vì đều là model tốt mà dữ liệu lại ít.

---

### ⏱️ Tất cả xong sau khoảng 5 phút

Và đây — tất cả experiment đã chạy xong, **không lỗi**. Ta có thể quay lại xem từng model. Quan trọng hơn: cuối mỗi experiment, **model được lưu ra file**. Giờ trong thư mục `models/` có cả loạt model.

Ta vừa:

* Chạy **8 experiment** với model size, lượng dữ liệu và training time khác nhau.
* Lưu **toàn bộ** model đã train ra file.
* Tất cả trong khoảng **5 phút**, trên GPU **Nvidia Tesla P100** của mình.

---

### ⚡ Bài học về tốc độ

Thời gian có thể khác tùy phần cứng và lượng dữ liệu. Nhưng thông điệp: **loạt experiment đầu tiên chỉ nên mất vài phút**. Nếu bắt đầu mà chờ hơn **10 phút** một experiment là đang chờ quá lâu. Trong thực tế nên nhắm **dưới 3 phút** để xoay model nhanh.

---

### 👀 Đừng nhìn số, hãy nhìn hình

Bạn có thể đã thấy model nào test accuracy cao nhất hay test loss thấp nhất — nhưng đừng "trawl" qua đống số trên trang. **Hãy visualize.** Video sau ta mở TensorBoard xem toàn bộ loạt experiment. Bạn thử trước xem. Hẹn gặp!
