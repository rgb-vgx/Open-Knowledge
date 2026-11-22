---
title: 'Bài 99 — Bài tập và tài liệu mở rộng cho phần classification'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 99
status: edited
source: '099 - PyTorch Classification- Exercises and Extra-Curriculum.md'
categories:
- AI
tags: []
---

# 🏋️ Bài tập và tài liệu mở rộng cho phần classification

> Nguồn: `099 - PyTorch Classification- Exercises and Extra-Curriculum.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32896496)

Đã đi hết một chặng dài. Giờ tới lúc các bạn **tự luyện** — vì đọc code chưa đủ, phải tự tay viết mới nhớ.

### 📚 Bài tập nằm ở đâu?

Bản sách của khóa (*Learn PyTorch for Deep Learning*) có **mục bài tập ở cuối mỗi chương**. Chương classification này có **7 bài tập**, phủ toàn bộ những gì mình vừa học:

1. Setup `import torch` và **device-agnostic code**.
2. **Tạo dataset**.
3. Chuyển dữ liệu sang **DataFrame** để khám phá.
4. … và tiếp tục theo đúng các bước của workflow classification.

Các bạn sẽ có **skeleton code** để điền dần.

---

### 🗂️ Skeleton và solution

Trong repo `mrdbourke/pytorch-deep-learning`, thư mục **`extras/`** chứa:

* **`exercises/`** — notebook bài tập với code khung.
* **`solutions/`** — notebook lời giải.

---

### 🥇 Thứ tự làm bài (quan trọng)

Mình khuyên đúng trình tự này:

1. **Tự làm bài tập** trước — dựa vào notebook đã code cùng nhau trong module này.
2. **Đọc tài liệu chính thức** của PyTorch khi bí.
3. **Solution chỉ là phương án cuối** — và nhớ rằng đó chỉ là *một* cách giải, không phải cách duy nhất.

---

### 🎉 Chúc mừng

Chúc mừng các bạn đã hoàn thành **Section 2: PyTorch Classification**! Chúng ta đã đi qua:

* Classification là gì — binary, multiclass, multi-label.
* Input/output shape và kiến trúc model.
* Dựng data, chia train/test, code model bằng `nn.Module` lẫn `nn.Sequential`.
* Loss function, optimizer, training/testing loop.
* Chuyển **logits → probabilities → labels** cho cả hai bài toán.
* **Non-linearity** với ReLU, đủ để tách dữ liệu phi tuyến.
* Nhiều metric đánh giá: accuracy, precision, recall, F1…

Giờ hãy làm bài tập cho chắc tay. Xong rồi thì mình gặp nhau ở phần tiếp theo — còn nhiều thứ hay ho của deep learning với PyTorch đang chờ.
