---
title: 'Chạy notebook Going Modular (phần 1) từ đầu đến cuối'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 172
status: edited
source: '172 - Going Modular Notebook (Part 1)- Running It End to End.md'
categories:
- AI
tags: []
---

# ▶️ Chạy notebook Going Modular (phần 1) từ đầu đến cuối

> Nguồn: `172 - Going Modular Notebook (Part 1)- Running It End to End.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32797028)

Chào các bạn! Đây là một trong những section mình thích nhất trong cả khóa. Viết code thôi. Trước khi code, mình muốn các bạn làm quen với vài tài nguyên sẽ dùng xuyên suốt section.

### 📚 Tài nguyên của section

Phần **going modular** nằm trong sách (ebook) của khóa, mục `05_pytorch_going_modular`. Ở đó có đủ: going modular là gì, vì sao nên làm, ưu nhược điểm của notebook so với Python script.

Điều này thú vị với mình vì — nếu giống mình — các bạn học Python trên Jupyter notebook, trong khi phần lớn code ngoài đời lại nằm trong **file .py**, không phải notebook. Section này chính là cây cầu đó.

---

### 📒 Hai notebook: cell mode và script mode

Section có hai notebook:

* **Part 1 — cell mode**: chạy như notebook bình thường, từ trên xuống dưới. Nó là bản rút gọn của notebook `04` (custom datasets) — toàn bộ code mình viết ở section trước được cô đọng lại thành vài cell hữu ích.
* **Part 2 — script mode**: dựa trên part 1, dùng magic command để tách code thành script.

Lý do làm hai phần: để các bạn **thấy rõ khác biệt** khi chuyển từ cell mode sang script mode.

---

### 📂 Mở notebook trong Colab

Cách mình làm:

1. Vào trang chủ khóa học, mở mục going modular, chọn `05_part_1_cell_mode.ipynb`.
2. Bấm **Open in Colab**.
3. Bấm **Copy to Drive** để có bản sao trong Google Drive của bạn (bản đang mở từ GitHub không lưu được).
4. Đặt tên có tag video để sau này biết notebook nào đã chạy trong video.
5. Chọn runtime **GPU**, rồi **Connect**.

Notebook này mở đầu thẳng bằng code, không phải phần "where can you get help" như mọi khi — vì code đã viết hết ở notebook 4 rồi.

---

### 🧱 Chạy hết các cell — có gì bên trong?

Section 1 **get the data**: tải file zip pizza/steak/sushi từ GitHub, giải nén, tạo thư mục train/test.

Tiếp theo:

* Tạo dataset và dataloader — cụ thể là `train_dataloader` và `test_dataloader`.
* Tạo model **TinyVGG**.
* Setup **device-agnostic code** và khởi tạo một instance TinyVGG.
* Một **dummy forward pass** để kiểm tra model chạy được.
* Viết `train_step` và `test_step`, rồi `train` gộp cả hai.

Điểm mới: mình đã thêm **docstring** cho các hàm, theo **Google Python Functions and Methods Style Guide**. Khi viết code để tái sử dụng và chia sẻ, docstring giúp người khác — và chính bạn trong tương lai — hiểu code làm gì.

* `train_step` — một vòng train.
* `test_step` — một vòng đánh giá.
* `train` — vòng lặp lớn gọi hai hàm trên qua các epoch.
* `save_model` — lưu model ra file.

Cuối cùng là các bước train, evaluate và save. Chạy hết: ta thấy vài epoch in ra, rồi model được lưu vào thư mục `models`.

---

### 📁 Kiểm tra kết quả

Sau khi chạy:

* Thư mục **data/** được tạo ở cell đầu tiên.
* Thư mục **sample_data/** — cái này Colab có sẵn, đừng bận tâm.
* Thư mục **models/** chứa model đã lưu.

Notebook chạy được từ đầu đến cuối chỉ bằng cell. Việc tiếp theo là biến các cell hữu ích thành Python script — đó là phần 2.

---

### 🎯 Đích đến

Sau section này, ta hướng tới thư mục **going_modular** chứa: `data_setup.py`, `engine.py`, `model_builder.py`, `train.py`, `utils.py`.

---

### ✅ Chốt lại

Part 1 đã chạy end-to-end và cho ta baseline bằng cell. Giờ là lúc tách từng phần ra. Trong video tới, mình sẽ bắt đầu chuyển những cell hữu ích nhất thành script. Hẹn gặp các bạn!
