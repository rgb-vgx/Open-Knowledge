---
title: 'Bài tập và extra curriculum cho phần PyTorch Fundamentals'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 39
status: edited
source: '039 - PyTorch Fundamentals- Exercises and Extra-Curriculum.md'
categories:
- AI
tags: []
---

# 🏋️ Bài tập và extra curriculum cho phần PyTorch Fundamentals

> Nguồn: `039 - PyTorch Fundamentals- Exercises and Extra-Curriculum.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32668454)

Chúc mừng các bạn! Chúng ta đã đi hết một chặng đường dài của **PyTorch fundamentals** — những viên gạch nền sẽ dùng suốt khóa học. Trước khi sang section tiếp theo, đây là lúc **luyện tập**.

### 📚 Bài tập nằm ở đâu?

Mở **learnpytorch.io**, vào đúng section đang học → notebook **PyTorch Fundamentals** → kéo xuống **table of contents** ở cuối. Ở đó luôn có mục **Exercises và Extra Curriculum**. Điều này đúng cho **mọi module** trong khóa.

### ✏️ Vài bài tập tiêu biểu

* **Bài 1 — Đọc tài liệu.** Dành khoảng 10 phút đọc tài liệu `torch.Tensor`. Các bạn đã thấy mình tham chiếu docs liên tục; làm quen với nó là kỹ năng bắt buộc.
* **Bài 2 — Tạo tensor random shape `7, 7, 3`.** Đơn giản:

```python
torch.rand(7, 7, 3)
```

* **Bài 3 — Lấy tensor vừa tạo, thực hiện matrix multiplication với một tensor random khác.**

Các bài tập đều dựa trên những gì đã học; càng về sau sẽ càng sâu.

### 🗂️ Cách làm bài tập

1. Mở một notebook mới trong Colab (**File → New notebook**).
2. Đặt tên kiểu `00_pytorch_exercises`.
3. `import torch` rồi bắt đầu.
4. Mẹo: để notebook bài tập một bên màn hình, notebook bài giảng một bên — vừa đọc đề vừa code.

### 📋 Template và lời giải

Trong **GitHub repo của khóa** (nơi chứa toàn bộ tài liệu), vào thư mục **extras → exercises**, có **template** cho từng bài. Mở template: đó là các heading gợi ý, bạn điền code vào.

Cách mở template trong Colab:

1. Copy link file template trên GitHub.
2. Trong Colab: **File → Open notebook → GitHub**.
3. Dán link, bấm **Search**.

Và trong **extras → solutions** có **lời giải mẫu**.

Lời khuyên của mình: **tự làm trước**, bí lắm mới xem lời giải. Bài tập là "open book" — được dùng lại notebook đã code cùng mình — nhưng hãy thử sức độc lập trước.

### 🎓 Extra curriculum

Cuối mỗi module, ngoài bài tập code còn có **extra curriculum** — thường là **đọc/tài liệu**:

* Dành một giờ đi qua **PyTorch Basics tutorial** — mình khuyên phần **Quickstart**.
* Xem video **"What's a tensor"** để hiểu sâu hơn cách tensor biểu diễn dữ liệu — tài liệu này đã được nhắc xuyên suốt phần trước.

### 🎯 Chốt lại

* Bài tập nằm cuối mỗi notebook trên **learnpytorch.io**.
* Template ở **extras/exercises**, lời giải ở **extras/solutions** trong GitHub repo.
* Extra curriculum là các tài liệu đọc, giúp đào sâu.

Các bạn đã hoàn thành phần fundamentals — một nỗ lực lớn đấy! Hẹn gặp các bạn ở **section tiếp theo**!
