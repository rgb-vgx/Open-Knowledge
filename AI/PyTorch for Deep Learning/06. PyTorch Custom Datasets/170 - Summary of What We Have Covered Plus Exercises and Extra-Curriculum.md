---
title: 'Tổng kết section, bài tập và tài liệu mở rộng'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 170
status: edited
source: '170 - Summary of What We Have Covered Plus Exercises and Extra-Curriculum.md'
categories:
- AI
tags: []
---

# 🎓 Tổng kết section Custom Datasets, bài tập và tài liệu mở rộng

> Nguồn: `170 - Summary of What We Have Covered Plus Exercises and Extra-Curriculum.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32779786)

Ta đã đi hết section Custom Datasets — từ tải dữ liệu, làm quen, transform, tự viết dataset class, đến dự đoán trên ảnh mới. Bài cuối này mình **tổng kết** các ý chính, nhắc lại "ba lỗi lớn", và giới thiệu bộ **bài tập** cùng tài liệu mở rộng để các bạn tự luyện.

### 🖼️ Bài học lớn nhất: tiền xử lý cho đúng format

Khi dự đoán ảnh "Pizza Dad" (dù khá vỡ hạt), model **định lượng** chưa tốt nhưng **định tính** lại đoán đúng. Bài học cốt lõi: phải **tiền xử lý** dữ liệu mới cho **giống hệt** format lúc train. Đây cũng chính là việc mà app Nutrify của mình làm phía sau: ảnh upload được xử lý tương tự rồi đưa qua model phân loại.

---

### ⚠️ Ba điều phải nhớ khi predict custom data

Bất kể ảnh, text hay audio:

1. **Đúng dtype** — với ta là `torch.float32`.
2. **Đúng device** — dữ liệu và model phải cùng nơi (cả hai lên GPU).
3. **Đúng shape** — ảnh gốc `[3, 64, 64]` nhưng cần thêm **chiều batch** thành `[1, 3, 64, 64]`.

Sai dtype, sai shape, sai device — ba lỗi này sẽ **theo bạn suốt** quá trình làm deep learning.

---

### 🧠 Các ý chính của section

* **PyTorch có nhiều hàm dựng sẵn** cho mọi domain: `torchvision`, `torchaudio`, `torchtext`, `torchrec`, và `torchdata` (đang beta). Hãy quen dần với chúng.
* **Tự viết được custom dataset**: nếu hàm dựng sẵn không đủ đáp ứng, kế thừa `torch.utils.data.Dataset` và override `__len__`/`__getitem__`.
* **Cân bằng overfitting / underfitting**: đây là "lằn ranh mong manh" và là phần lớn nghiên cứu ML. Xem lại phần loss curve, cách xử lý overfit và underfit.
* **Ba lỗi lớn** khi predict: dtype, shape, device.

---

### 🏋️ Bài tập để tự luyện

Đây là "thời điểm tỏa sáng" của các bạn:

* Mở **exercise template** cho notebook 4 trong repo (thư mục Extras), tự làm hết các câu hỏi trước.
* Kẹt thì xem **example solutions** — chỉ là *một cách* làm tham khảo, không nhất thiết là tốt nhất.
* Có cả **walkthrough trên YouTube**: Daniel live-stream giải toàn bộ, kể cả các lỗi gặp phải.

---

### 📚 Tài liệu mở rộng

Nhiều chủ đề nhắc trong khóa được gom vào mục **extra curriculum** — đáng xem khi có thời gian. Xong phần này, các bạn đã nắm trọn quy trình đưa dữ liệu của riêng mình vào PyTorch.

---

### ✅ Tạm kết

Chúng ta đã đi một chặng dài và viết rất nhiều code. Hẹn gặp các bạn ở section tiếp theo!
