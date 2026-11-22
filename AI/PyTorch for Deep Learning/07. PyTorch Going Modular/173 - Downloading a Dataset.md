---
title: 'Tải dataset pizza, steak, sushi về máy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 173
status: edited
source: '173 - Downloading a Dataset.md'
categories:
- AI
tags: []
---

# ⬇️ Tải dataset pizza, steak, sushi về máy

> Nguồn: `173 - Downloading a Dataset.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32797030)

Chào các bạn! Video trước chúng ta đã xem bố cục tổng thể của section going modular và hai nơi tốt nhất để tra cứu: mục `05_pytorch_going_modular` và thư mục `going_modular`. Chúng ta cũng đã mở notebook part 1 (cell mode) trong Colab, copy sang Drive rồi chạy hết các cell.

### 🔄 Restart runtime để thấy rõ điều gì đang diễn ra

Mình restart runtime để chứng minh một điểm: **mọi thứ trong thư mục làm việc là do notebook sinh ra**. Trong cell có dấu `!` — dấu này nói rằng "chạy dòng này trên command line".

Mình xóa thư mục `data/` và `models/` vừa tạo, refresh lại thì chỉ còn notebook và `sample_data/` (Colab có sẵn, không phải lo).

---

### 📥 Cell "get data" làm gì?

Đây chính là cell ta đã dùng ở notebook 4. Các bước:

1. Import `os` và `zipfile`.
2. Tạo đường dẫn tới thư mục `data`.
3. Nếu thư mục ảnh chưa tồn tại thì tải và chuẩn bị dữ liệu.
4. Tải ảnh pizza, steak, sushi.
5. Giải nén.
6. Xóa file zip vì không cần nữa.

Chạy cell: nó in "didn't find", rồi tải và giải nén. Ta có thư mục `data/`.

---

### 🗂️ Cấu trúc dữ liệu sau khi giải nén

Đây là **standard image classification format**:

* Thư mục `train/` và `test/`.
* Trong mỗi thư mục là ảnh của từng class: `pizza/`, `steak/`, `sushi/`.
* **Tên thư mục chính là label** của ảnh.

Ta đã gặp kiểu này ở module trước, nên không cần giải thích lại.

---

### 🎁 Bài tập đầu tiên của section

Với những gì sắp học, các bạn có thể tự thử **biến riêng cell "get data" này thành một script hoàn chỉnh**. Đó là bài tập đầu tiên mình đặt ra cho section.

---

### 📍 Tiếp theo là gì?

Ta tạo đường dẫn tới thư mục train và test — cũng là code đã viết rồi, mục đích là tái sử dụng. Từ đây trở đi, mọi subsection của notebook sẽ được chuyển thành Python script.

Notebook **script mode (part 2)** chứa đúng những gì ta nhắm tới. Nếu đặt part 1 và part 2 cạnh nhau, bạn sẽ thấy phần "get data" giống hệt, còn từ section 2 trở đi part 2 có thêm mục **2.1 Create datasets and dataloaders in script mode**.

---

### ✅ Chốt lại

Dữ liệu đã có, đường dẫn đã sẵn. Việc còn lại là tạo script. Trong video tới, mình sẽ viết script tạo dataloader. Hẹn gặp các bạn!
